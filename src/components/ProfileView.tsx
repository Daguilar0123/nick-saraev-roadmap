"use client";

import { useRef, useState } from "react";
import { PHASES, STEPS } from "@/data/roadmap";
import { BlankField } from "./BlankField";
import { useRoadmapActions, useRoadmapState, exportState } from "@/lib/store";
import { blankKeys, positioning } from "@/lib/derive";
import { ShareTools } from "./ShareTools";
import { Attribution } from "./Attribution";

function Toolbar() {
  const s = useRoadmapState();
  const { importState, reset } = useRoadmapActions();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  function download() {
    const blob = new Blob([exportState(s)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `roadmap-25k-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMsg("Exported.");
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const ok = importState(JSON.parse(await f.text()));
      setMsg(ok ? "Imported." : "That file didn't look like a roadmap export.");
    } catch {
      setMsg("Couldn't parse that file.");
    }
    e.target.value = "";
  }

  return (
    <div className="no-print card flex flex-wrap items-center gap-2 p-4">
      <button
        type="button"
        onClick={download}
        className="rounded-lg border border-ink-4 px-3 py-1.5 text-xs font-medium text-fog-1 transition hover:border-lift hover:text-fog-0"
      >
        Export JSON
      </button>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="rounded-lg border border-ink-4 px-3 py-1.5 text-xs font-medium text-fog-1 transition hover:border-lift hover:text-fog-0"
      >
        Import
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-lg border border-ink-4 px-3 py-1.5 text-xs font-medium text-fog-1 transition hover:border-lift hover:text-fog-0"
      >
        Print / PDF
      </button>

      <div className="grow" />

      {confirming ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-warn">Erase everything?</span>
          <button
            type="button"
            onClick={() => {
              reset();
              setConfirming(false);
              setMsg("Cleared.");
            }}
            className="rounded-lg border border-red-500/50 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
          >
            Yes, erase
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="rounded-lg border border-ink-4 px-3 py-1.5 text-xs text-fog-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="rounded-lg border border-ink-4 px-3 py-1.5 text-xs font-medium text-fog-3 transition hover:border-red-500/50 hover:text-red-400"
        >
          Reset all
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        onChange={onFile}
        className="hidden"
      />
      {msg && <span className="w-full text-[11px] text-fog-3">{msg}</span>}
      {s.updatedAt && (
        <span className="w-full text-[11px] text-fog-3">
          Saved locally in this browser · last change{" "}
          {new Date(s.updatedAt).toLocaleString()}
        </span>
      )}
    </div>
  );
}

export function ProfileView({ onGoto }: { onGoto: (n: number) => void }) {
  const s = useRoadmapState();
  const pos = positioning(s);

  const profileBlanks = STEPS.flatMap((st) =>
    (st.blanks ?? [])
      .filter((b) => b.profile)
      .map((b) => ({ step: st, blank: b })),
  );

  return (
    <div className="space-y-6">
      <section className="card p-6">
        <h2 className="text-2xl font-bold text-fog-0">
          Your business, in one page
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-fog-2">
          Every answer below is defined once and reused across the roadmap. The
          positioning sentence in particular flows into your site copy, cold
          email angle and Upwork headline.
        </p>

        <div className="mt-5 rounded-xl border border-lift/30 bg-lift/8 p-5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-fog-3">
            Positioning statement
          </div>
          <div className="mt-1.5 text-xl font-semibold leading-snug text-lift-soft">
            {pos ? `“${pos}”` : "“I build … systems for …”"}
          </div>
          {!pos && (
            <button
              type="button"
              onClick={() => onGoto(1)}
              className="no-print mt-2 text-xs text-fog-3 underline underline-offset-4 hover:text-fog-1"
            >
              Fill step 1 to generate this →
            </button>
          )}
        </div>
      </section>

      <section className="card p-5">
        <h3 className="mb-4 text-sm font-semibold text-fog-0">Core details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {profileBlanks.map(({ step, blank }) => (
            <div
              key={blank.id}
              className={blank.type === "list" ? "sm:col-span-2" : undefined}
            >
              <BlankField blank={blank} />
              <button
                type="button"
                onClick={() => onGoto(step.n)}
                className="no-print mt-1 text-[10px] text-fog-3 underline underline-offset-2 hover:text-fog-1"
              >
                from step {step.n} · {step.title}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-5">
        <h3 className="mb-1 text-sm font-semibold text-fog-0">
          Every blank, by step
        </h3>
        <p className="mb-4 text-xs text-fog-3">
          A fill-status map of the whole roadmap. Click any row to jump to it.
        </p>
        <div className="space-y-1.5">
          {STEPS.filter((st) => st.blanks?.length).map((st) => {
            const keys = (st.blanks ?? []).flatMap(blankKeys);
            const filled = keys.filter((k) =>
              (s.blanks[k] ?? "").trim(),
            ).length;
            const phase = PHASES.find((p) => p.id === st.phase)!;
            const pct = Math.round((filled / keys.length) * 100);
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => onGoto(st.n)}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-ink-2"
              >
                <span
                  className="w-6 shrink-0 text-right font-mono text-xs font-bold"
                  style={{ color: phase.accent }}
                >
                  {st.n}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-fog-1">
                  {st.title}
                </span>
                <span className="h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-ink-3">
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background:
                        filled === keys.length
                          ? "var(--color-cash)"
                          : phase.accent,
                    }}
                  />
                </span>
                <span
                  className={`w-12 shrink-0 text-right font-mono text-[11px] tabular-nums ${
                    filled === keys.length ? "text-cash" : "text-fog-3"
                  }`}
                >
                  {filled}/{keys.length}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <ShareTools />

      <Toolbar />

      <Attribution />
    </div>
  );
}
