import { EMPTY, type RoadmapState } from "./store";

/**
 * Share links carry the whole state in the URL fragment. The fragment is never
 * sent to the server, so this works on a purely static host and nothing is
 * stored anywhere — the link IS the data.
 */

const b64urlEncode = (bytes: Uint8Array) => {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const b64urlDecode = (s: string) => {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};

async function gzip(text: string): Promise<Uint8Array> {
  const raw = new TextEncoder().encode(text);
  if (typeof CompressionStream === "undefined") return raw;
  const cs = new CompressionStream("gzip");
  const stream = new Blob([raw as BlobPart]).stream().pipeThrough(cs);
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function gunzip(bytes: Uint8Array): Promise<string> {
  if (typeof DecompressionStream === "undefined") {
    return new TextDecoder().decode(bytes);
  }
  const ds = new DecompressionStream("gzip");
  const stream = new Blob([bytes as BlobPart]).stream().pipeThrough(ds);
  return new Response(stream).text();
}

/** Marker distinguishes gzipped payloads from the uncompressed fallback. */
export async function encodeShare(state: RoadmapState): Promise<string> {
  const json = JSON.stringify({
    steps: state.steps,
    subs: state.subs,
    blanks: state.blanks,
    notes: state.notes,
    daily: state.daily,
  });
  const gz = typeof CompressionStream !== "undefined";
  return (gz ? "z" : "p") + b64urlEncode(await gzip(json));
}

export async function decodeShare(
  payload: string,
): Promise<RoadmapState | null> {
  try {
    const kind = payload[0];
    const bytes = b64urlDecode(payload.slice(1));
    const json =
      kind === "z" ? await gunzip(bytes) : new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json) as Partial<RoadmapState>;
    if (typeof parsed !== "object" || parsed === null) return null;
    return { ...EMPTY, ...parsed, v: 1 };
  } catch {
    return null;
  }
}

// Secret scanning ---------------------------------------------------------

export interface Leak {
  field: string;
  kind: string;
  sample: string;
}

const PATTERNS: [string, RegExp][] = [
  ["email address", /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/],
  ["OpenAI key", /\bsk-[A-Za-z0-9_-]{16,}/],
  [
    "GitHub token",
    /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}|\bgithub_pat_[A-Za-z0-9_]{20,}/,
  ],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{20,}/],
  ["Stripe key", /\b(?:pk|sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}/],
  ["Slack token", /\bxox[baprs]-[A-Za-z0-9-]{10,}/],
  ["JWT", /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\./],
  ["long hex string", /\b[A-Fa-f0-9]{32,}\b/],
  [
    "labelled credential",
    /(?:api[_-]?key|apikey|token|secret|password|passwd|pwd|bearer)\s*[:=]\s*\S{6,}/i,
  ],
  ["card-like number", /\b\d{13,19}\b/],
];

/** Scans any record of user text for things that should never be published. */
export function scanForSecrets(values: Record<string, string>): Leak[] {
  const out: Leak[] = [];
  for (const [field, raw] of Object.entries(values)) {
    const value = (raw ?? "").trim();
    if (!value) continue;
    for (const [kind, re] of PATTERNS) {
      const m = value.match(re);
      if (!m) continue;
      const hit = m[0];
      out.push({
        field,
        kind,
        sample: hit.length > 14 ? `${hit.slice(0, 6)}…${hit.slice(-4)}` : hit,
      });
      break;
    }
  }
  return out;
}
