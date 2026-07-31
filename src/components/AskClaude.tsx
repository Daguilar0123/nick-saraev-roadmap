"use client";

import { useMemo, useState } from "react";
import type { Step } from "@/data/types";
import { useRoadmapState } from "@/lib/store";
import {
  GENERIC_ASKS,
  MAX_DEEPLINK_CHARS,
  buildOverviewPrompt,
  buildStepPrompt,
  claudeDeepLink,
} from "@/lib/prompt";

/**
 * Hands the reader's context to Claude without needing a server or an API key.
 * The prompt is assembled in the browser, shown in full, and editable before
 * it goes anywhere — so nothing is transmitted that the reader hasn't read.
 */
function Panel({
  asks,
  build,
  hasNotes,
  label,
}: {
  asks: string[];
  build: (ask: string, includeNotes: boolean) => string;
  hasNotes: boolean;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [ask, setAsk] = useState<string | null>(null);
  const [includeNotes, setIncludeNotes] = useState(true);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);

  function choose(a: string) {
    setAsk(a);
    setDraft(build(a, includeNotes));
    setCopied(false);
  }

  function toggleNotes(next: boolean) {
    setIncludeNotes(next);
    if (ask) setDraft(build(ask, next));
  }

  const tooLong = draft.length > MAX_DEEPLINK_CHARS;

  return (
    <div className="no-print rounded-lg border border-lift/25 bg-lift/6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left"
      >
        <span className="text-base leading-none">🧠</span>
        <span className="flex-1 text-[13px] font-semibold text-lift-soft">
          {label}
        </span>
        <span className="text-xs text-fog-3">{open ? "▾" : "▸"}</span>
      </button>

      {open && (
        <div className="space-y-3 border-t border-lift/20 p-3">
          <div className="flex flex-wrap gap-1.5">
            {asks.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => choose(a)}
                className={`rounded-md border px-2 py-1 text-left text-[11px] leading-snug transition ${
                  ask === a
                    ? "border-lift bg-lift/20 text-fog-0"
                    : "border-ink-4 text-fog-2 hover:border-lift/60 hover:text-fog-0"
                }`}
              >
                {a.length > 74 ? `${a.slice(0, 72)}…` : a}
              </button>
            ))}
          </div>

          {ask && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-fog-3">
                  Everything below is built in your browser. Read it, edit it,
                  then send it wherever you like.
                </span>
                {hasNotes && (
                  <label className="flex cursor-pointer items-center gap-1.5 text-[11px] text-fog-2">
                    <input
                      type="checkbox"
                      checked={includeNotes}
                      onChange={(e) => toggleNotes(e.target.checked)}
                      className="size-3.5 cursor-pointer accent-[var(--color-lift)]"
                    />
                    include my private notes
                  </label>
                )}
              </div>

              <textarea
                className="field min-h-[13rem] resize-y font-mono text-[11px] leading-relaxed"
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  setCopied(false);
                }}
                spellCheck={false}
              />

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(draft);
                    setCopied(true);
                  }}
                  className="rounded-lg border border-lift/50 bg-lift/10 px-3 py-1.5 text-xs font-medium text-lift-soft transition hover:bg-lift/20"
                >
                  {copied ? "Copied" : "Copy prompt"}
                </button>

                {tooLong ? (
                  <span className="text-[11px] text-warn">
                    Too long to prefill a link ({draft.length.toLocaleString()}{" "}
                    chars) — copy it and paste into Claude instead.
                  </span>
                ) : (
                  <a
                    href={claudeDeepLink(draft)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-ink-4 px-3 py-1.5 text-xs font-medium text-fog-1 transition hover:border-lift hover:text-fog-0"
                  >
                    Open in Claude ↗
                  </a>
                )}

                <span className="text-[11px] text-fog-3">
                  {draft.length.toLocaleString()} chars
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function AskClaudeStep({ step }: { step: Step }) {
  const s = useRoadmapState();
  const asks = useMemo(
    () => [...(step.asks ?? []), ...GENERIC_ASKS],
    [step.asks],
  );
  const hasNotes = !!(s.notes[step.id] ?? "").trim();

  return (
    <Panel
      label="Work this step out with Claude"
      asks={asks}
      hasNotes={hasNotes}
      build={(ask, includeNotes) =>
        buildStepPrompt(step, s, ask, { includeNotes })
      }
    />
  );
}

const OVERVIEW_ASKS = [
  "Given exactly where I am, what should I do next? Rank by leverage, not by step order.",
  "What am I avoiding? Look at what's done versus undone and tell me honestly.",
  "Am I setting things up when I should be selling? Nick says at 0 customers the only priority is sales.",
  "Build me a realistic plan for the next two weeks based on where I actually am.",
];

export function AskClaudeOverview() {
  const s = useRoadmapState();
  return (
    <Panel
      label="Ask Claude what to do next"
      asks={OVERVIEW_ASKS}
      hasNotes={false}
      build={(ask) => buildOverviewPrompt(s, ask)}
    />
  );
}
