"use client";

import { useMemo, useState } from "react";
import { PHASES, STEPS } from "@/data/roadmap";
import { useRoadmapState } from "@/lib/store";
import { stepProgress } from "@/lib/derive";
import { StepCard } from "./StepCard";

type Filter = "all" | "open" | "blanks";

export function RoadmapList({
  focused,
  onFocus,
}: {
  focused: number | null;
  onFocus: (n: number) => void;
}) {
  const s = useRoadmapState();
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return STEPS.filter((st) => {
      if (filter === "open" && s.steps[st.id] === "done") return false;
      if (filter === "blanks") {
        const p = stepProgress(st, s);
        if (p.blanksTotal === 0 || p.blanksDone === p.blanksTotal) return false;
      }
      if (!needle) return true;
      const hay = [
        st.title,
        st.source ?? "",
        st.why ?? "",
        ...st.subs.map((x) => x.text),
        ...(st.links ?? []).map((l) => l.label),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [filter, q, s]);

  return (
    <div className="grid gap-6 lg:grid-cols-[210px_minmax(0,1fr)]">
      {/* Rail ---------------------------------------------------------- */}
      <aside className="no-print hidden lg:block">
        <div className="sticky top-[calc(var(--header-h)+1rem)] space-y-4">
          {PHASES.map((phase) => {
            const steps = STEPS.filter((st) => st.phase === phase.id);
            return (
              <div key={phase.id}>
                <div
                  className="mb-1.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: phase.accent }}
                >
                  {phase.title}
                </div>
                <ul className="space-y-px">
                  {steps.map((st) => {
                    const status = s.steps[st.id] ?? "todo";
                    const active = focused === st.n;
                    return (
                      <li key={st.id}>
                        <button
                          type="button"
                          onClick={() => onFocus(st.n)}
                          className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition ${
                            active ? "bg-ink-3" : "hover:bg-ink-2"
                          }`}
                        >
                          <span
                            className="size-1.5 shrink-0 rounded-full"
                            style={{
                              background:
                                status === "done"
                                  ? "var(--color-cash)"
                                  : status === "doing"
                                    ? "var(--color-warn)"
                                    : "var(--color-ink-5)",
                            }}
                          />
                          <span className="w-4 shrink-0 font-mono text-[10px] text-fog-3">
                            {st.n}
                          </span>
                          <span
                            className={`truncate text-[12px] leading-tight ${
                              status === "done" ? "text-fog-3" : "text-fog-1"
                            }`}
                          >
                            {st.title}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Steps --------------------------------------------------------- */}
      <div className="min-w-0 space-y-3">
        <div className="no-print flex flex-wrap items-center gap-2">
          <input
            className="field max-w-xs flex-1"
            placeholder="Search steps, checklist items, resources…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="flex overflow-hidden rounded-lg border border-ink-4">
            {(
              [
                ["all", "All"],
                ["open", "Not done"],
                ["blanks", "Missing blanks"],
              ] as [Filter, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                className={`px-3 py-1.5 text-xs font-medium transition ${
                  filter === id
                    ? "bg-ink-4 text-fog-0"
                    : "text-fog-3 hover:bg-ink-3 hover:text-fog-1"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="text-xs text-fog-3">
            {visible.length} of {STEPS.length}
          </span>
        </div>

        {visible.length === 0 ? (
          <p className="card p-8 text-center text-sm text-fog-3">
            Nothing matches that filter.
          </p>
        ) : (
          visible.map((st) => (
            <StepCard
              key={`${st.id}-${focused === st.n ? "focus" : "idle"}`}
              step={st}
              defaultOpen={focused === st.n}
            />
          ))
        )}
      </div>
    </div>
  );
}
