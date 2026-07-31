"use client";

import { useMemo, useState } from "react";
import { STEPS } from "@/data/roadmap";
import { useOwnState } from "@/lib/store";
import { encodeShare, scanForSecrets, type Leak } from "@/lib/share";
import { buildShowcase, candidates, showcaseFile } from "@/lib/showcase";

function LeakWarning({ leaks }: { leaks: Leak[] }) {
  if (!leaks.length) return null;
  return (
    <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3">
      <div className="text-xs font-bold uppercase tracking-wider text-red-400">
        {leaks.length === 1
          ? "1 field looks like a secret"
          : `${leaks.length} fields look like secrets`}
      </div>
      <ul className="mt-2 space-y-1">
        {leaks.map((l) => (
          <li key={l.field + l.kind} className="text-xs text-fog-1">
            <span className="font-mono text-red-300">{l.sample}</span> —{" "}
            {l.kind} in <span className="font-mono">{l.field}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11px] leading-relaxed text-fog-2">
        Remove these before sharing. Anyone with the link can read them, and a
        published example is permanent.
      </p>
    </div>
  );
}

function ShareLink() {
  const own = useOwnState();
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const leaks = useMemo(
    () => scanForSecrets({ ...own.blanks, ...own.notes }),
    [own],
  );

  async function make() {
    const payload = await encodeShare(own);
    const base = `${window.location.origin}${window.location.pathname}`;
    setLink(`${base}#s=${payload}`);
    setCopied(false);
  }

  return (
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-semibold text-fog-0">
          Share a private link
        </h4>
        <p className="mt-1 text-xs leading-relaxed text-fog-2">
          Encodes your <strong>entire</strong> run — including notes — into the
          link itself. Nothing is uploaded, but anyone holding the link sees
          everything. Use it for a mentor or a friend, not a public post.
        </p>
      </div>

      <LeakWarning leaks={leaks} />

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={make}
          className="rounded-lg border border-ink-4 px-3 py-1.5 text-xs font-medium text-fog-1 transition hover:border-lift hover:text-fog-0"
        >
          Generate link
        </button>
        {link && (
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(link);
              setCopied(true);
            }}
            className="rounded-lg border border-lift/50 bg-lift/10 px-3 py-1.5 text-xs font-medium text-lift-soft transition hover:bg-lift/20"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>

      {link && (
        <div className="rounded-lg border border-ink-4 bg-ink-1 p-2">
          <code className="block max-h-24 overflow-auto break-all font-mono text-[10px] leading-relaxed text-fog-2">
            {link}
          </code>
          <p className="mt-1 text-[10px] text-fog-3">
            {(link.length / 1024).toFixed(1)} KB
            {link.length > 30000 && " — long links can break in some chat apps"}
          </p>
        </div>
      )}
    </div>
  );
}

function ShowcaseBuilder() {
  const own = useOwnState();
  const all = useMemo(() => candidates(own), [own]);

  const [label, setLabel] = useState("");
  const [blurb, setBlurb] = useState("");
  const [picked, setPicked] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(all.map((c) => [c.key, c.safe])),
  );
  const [headlines, setHeadlines] = useState<Record<string, string>>({});
  const [out, setOut] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const includeKeys = all.filter((c) => picked[c.key]).map((c) => c.key);

  const leaks = useMemo(() => {
    const vals: Record<string, string> = {};
    for (const c of all) if (picked[c.key]) vals[c.label] = c.value;
    for (const [k, v] of Object.entries(headlines)) vals[`headline ${k}`] = v;
    if (blurb) vals["blurb"] = blurb;
    return scanForSecrets(vals);
  }, [all, picked, headlines, blurb]);

  const touched = STEPS.filter(
    (s) => own.steps[s.id] && own.steps[s.id] !== "todo",
  );

  function generate() {
    const showcase = buildShowcase(own, {
      label: label.trim() || "A worked example",
      blurb,
      includeKeys,
      headlines,
      today: new Date().toISOString().slice(0, 10),
    });
    setOut(showcaseFile(showcase));
    setCopied(false);
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-fog-0">
          Publish a worked example
        </h4>
        <p className="mt-1 text-xs leading-relaxed text-fog-2">
          Builds a <strong>headline-level</strong> snapshot for the live site.
          Your notes are never included — the format has no field for them.
          Every other value is opt-in below, and only tool choices and headline
          figures are pre-ticked.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-fog-1">
            Whose run is this?
          </label>
          <input
            className="field"
            placeholder="Danny's run"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-fog-1">
            One-line framing
          </label>
          <input
            className="field"
            placeholder="Where I actually am, as of this month"
            value={blurb}
            onChange={(e) => setBlurb(e.target.value)}
          />
        </div>
      </div>

      {/* Headlines ---------------------------------------------------- */}
      <div>
        <div className="mb-1.5 text-xs font-semibold text-fog-1">
          Headline per step{" "}
          <span className="font-normal text-fog-3">
            — what you actually did or picked, in a sentence
          </span>
        </div>
        {touched.length === 0 ? (
          <p className="rounded-lg border border-ink-4 bg-ink-1 p-3 text-xs text-fog-3">
            Mark some steps as in progress or done first — they&apos;ll appear
            here for you to describe.
          </p>
        ) : (
          <div className="space-y-2">
            {touched.map((s) => (
              <div key={s.id} className="flex items-start gap-2">
                <span className="mt-2 w-5 shrink-0 text-right font-mono text-[10px] text-fog-3">
                  {s.n}
                </span>
                <input
                  className="field"
                  placeholder={`${s.title} — what you did`}
                  value={headlines[s.id] ?? ""}
                  onChange={(e) =>
                    setHeadlines((h) => ({ ...h, [s.id]: e.target.value }))
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Field opt-in ------------------------------------------------- */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-semibold text-fog-1">
            Fields to include{" "}
            <span className="font-normal text-fog-3">
              ({includeKeys.length} of {all.length})
            </span>
          </span>
          <button
            type="button"
            onClick={() =>
              setPicked(Object.fromEntries(all.map((c) => [c.key, false])))
            }
            className="text-[11px] text-fog-3 underline underline-offset-2 hover:text-fog-1"
          >
            Uncheck all
          </button>
        </div>

        {all.length === 0 ? (
          <p className="rounded-lg border border-ink-4 bg-ink-1 p-3 text-xs text-fog-3">
            Nothing filled in yet.
          </p>
        ) : (
          <div className="max-h-72 space-y-px overflow-auto rounded-lg border border-ink-4 bg-ink-1 p-1.5">
            {all.map((c) => (
              <label
                key={c.key}
                className="flex cursor-pointer items-start gap-2.5 rounded-md px-2 py-1.5 hover:bg-ink-2"
              >
                <input
                  type="checkbox"
                  checked={!!picked[c.key]}
                  onChange={() =>
                    setPicked((p) => ({ ...p, [c.key]: !p[c.key] }))
                  }
                  className="mt-0.5 size-3.5 shrink-0 cursor-pointer accent-[var(--color-lift)]"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] text-fog-1">
                    <span className="font-mono text-[10px] text-fog-3">
                      {c.stepN}
                    </span>{" "}
                    {c.label}
                    {!c.safe && (
                      <span className="ml-1.5 rounded bg-warn/15 px-1 py-px align-middle text-[9px] font-bold uppercase tracking-wider text-warn">
                        review
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[10px] text-fog-3">
                    {c.value}
                  </span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <LeakWarning leaks={leaks} />

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={generate}
          className="rounded-lg border border-ink-4 px-3 py-1.5 text-xs font-medium text-fog-1 transition hover:border-lift hover:text-fog-0"
        >
          Generate showcase file
        </button>
        {out && (
          <>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(out);
                setCopied(true);
              }}
              className="rounded-lg border border-lift/50 bg-lift/10 px-3 py-1.5 text-xs font-medium text-lift-soft transition hover:bg-lift/20"
            >
              {copied ? "Copied" : "Copy"}
            </button>
            <span className="text-[11px] text-fog-3">
              paste over <code className="font-mono">src/data/showcase.ts</code>
              , then commit
            </span>
          </>
        )}
      </div>

      {out && (
        <pre className="max-h-72 overflow-auto rounded-lg border border-ink-4 bg-ink-1 p-3 font-mono text-[10px] leading-relaxed text-fog-2">
          {out}
        </pre>
      )}
    </div>
  );
}

export function ShareTools() {
  const [tab, setTab] = useState<"link" | "showcase">("link");

  return (
    <section className="no-print card overflow-hidden">
      <div className="flex border-b border-ink-3">
        {(
          [
            ["link", "Share a private link"],
            ["showcase", "Publish a worked example"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`px-4 py-2.5 text-xs font-medium transition ${
              tab === id
                ? "bg-ink-2 text-fog-0"
                : "text-fog-3 hover:bg-ink-2/50 hover:text-fog-1"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="p-5">
        {tab === "link" ? <ShareLink /> : <ShowcaseBuilder />}
      </div>
    </section>
  );
}
