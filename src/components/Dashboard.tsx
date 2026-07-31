"use client";

import { PHASES, STEPS, SOURCE_URL } from "@/data/roadmap";
import { ROADMAP_INTRO } from "@/data/journey";
import { useRoadmapState } from "@/lib/store";
import {
  MRR_TARGET,
  campaignLaunch,
  currentStep,
  dkimDue,
  hourlyRate,
  money,
  mrr,
  overall,
  positioning,
  stepProgress,
  todayKey,
} from "@/lib/derive";
import { DAILY_RITUAL } from "@/data/journey";

function Ring({ ratio, label }: { ratio: number; label: string }) {
  const pct = Math.round(ratio * 100);
  const r = 34;
  const c = 2 * Math.PI * r;

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 80 80" className="size-20 shrink-0 -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--color-ink-3)" strokeWidth="7" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="var(--color-lift)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - ratio)}
          className="transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <div>
        <div className="text-3xl font-bold tabular-nums text-fog-0">{pct}%</div>
        <div className="text-xs text-fog-3">{label}</div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  tone = "default",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "default" | "cash" | "warn";
}) {
  return (
    <div className="card p-4">
      <div className="text-[10px] font-bold uppercase tracking-wider text-fog-3">
        {label}
      </div>
      <div
        className={`mt-1 text-xl font-semibold tabular-nums ${
          tone === "cash" ? "text-cash" : tone === "warn" ? "text-warn" : "text-fog-0"
        }`}
      >
        {value}
      </div>
      {sub && <div className="mt-0.5 text-[11px] leading-snug text-fog-3">{sub}</div>}
    </div>
  );
}

export function Dashboard({ onGoto }: { onGoto: (n: number) => void }) {
  const s = useRoadmapState();
  const o = overall(s);
  const cur = currentStep(s);
  const pos = positioning(s);
  const rate = hourlyRate(s);
  const revenue = mrr(s);
  const today = s.daily[todayKey()] ?? [];

  const upcoming = [
    { label: "DKIM due", date: dkimDue(s), step: 7 },
    { label: "Cold email campaign launch", date: campaignLaunch(s), step: 8 },
  ].filter((d) => d.date);

  return (
    <div className="space-y-6">
      <section className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Ring ratio={o.ratio} label="of the roadmap worked through" />
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold tabular-nums text-fog-0">
                {o.stepsDone}
                <span className="text-base text-fog-3">/{o.stepsTotal}</span>
              </div>
              <div className="mt-0.5 text-[11px] text-fog-3">steps done</div>
            </div>
            <div>
              <div className="text-2xl font-bold tabular-nums text-fog-0">
                {o.subsDone}
                <span className="text-base text-fog-3">/{o.subsTotal}</span>
              </div>
              <div className="mt-0.5 text-[11px] text-fog-3">checklist items</div>
            </div>
            <div>
              <div className="text-2xl font-bold tabular-nums text-cash">
                {o.blanksDone}
                <span className="text-base text-fog-3">/{o.blanksTotal}</span>
              </div>
              <div className="mt-0.5 text-[11px] text-fog-3">blanks filled</div>
            </div>
          </div>
        </div>
      </section>

      {/* Where you are ------------------------------------------------- */}
      <section className="card overflow-hidden">
        <div className="border-b border-ink-3 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-fog-3">
          You are here
        </div>
        <button
          type="button"
          onClick={() => onGoto(cur.n)}
          className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-ink-2"
        >
          <span
            className="grid size-10 shrink-0 place-items-center rounded-xl font-mono text-base font-bold"
            style={{
              background: `color-mix(in oklab, ${
                PHASES.find((p) => p.id === cur.phase)!.accent
              } 18%, transparent)`,
              color: PHASES.find((p) => p.id === cur.phase)!.accent,
            }}
          >
            {cur.n}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base font-semibold text-fog-0">{cur.title}</span>
            <span className="mt-0.5 block text-xs text-fog-3">
              {stepProgress(cur, s).subsDone}/{cur.subs.length} checklist items ·{" "}
              {cur.effort ?? "—"}
            </span>
          </span>
          <span className="shrink-0 text-sm text-fog-3">Open →</span>
        </button>
      </section>

      {/* Business profile ---------------------------------------------- */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Positioning"
          value={pos ? "Defined" : "Not yet"}
          sub={pos ?? "Fill step 1 to generate this"}
          tone={pos ? "cash" : "default"}
        />
        <Stat
          label="Realised rate"
          value={rate !== null ? `${money(rate)}/hr` : "—"}
          sub={
            rate !== null
              ? rate >= 200
                ? "At or above the board's $200/hr benchmark"
                : "Board benchmark is $200/hr after ~a dozen projects"
              : "Fill step 16 after your first project"
          }
          tone={rate !== null ? (rate >= 200 ? "cash" : "warn") : "default"}
        />
        <Stat
          label="Monthly revenue"
          value={money(revenue)}
          sub={`${Math.round((revenue / MRR_TARGET) * 100)}% of the $25K target`}
          tone={revenue > 0 ? "cash" : "default"}
        />
        <Stat
          label="Today's sales ritual"
          value={`${today.length}/${DAILY_RITUAL.length}`}
          sub={
            today.length === DAILY_RITUAL.length
              ? "Complete — that's the highest-leverage 2 hrs done"
              : "Step 14: the work that actually produces customers"
          }
          tone={today.length === DAILY_RITUAL.length ? "cash" : "warn"}
        />
      </div>

      {/* Revenue meter --------------------------------------------------- */}
      <section className="card p-5">
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="text-sm font-semibold text-fog-0">Road to $25K/month</h3>
          <span className="font-mono text-xs text-fog-3">
            {money(revenue)} / {money(MRR_TARGET)}
          </span>
        </div>
        <div className="relative h-3 overflow-hidden rounded-full bg-ink-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-lift to-cash transition-[width] duration-500"
            style={{ width: `${Math.min(100, (revenue / MRR_TARGET) * 100)}%` }}
          />
          <div
            className="absolute inset-y-0 w-px bg-fog-3/60"
            style={{ left: "40%" }}
            title="$10K milestone (step 18)"
          />
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-[10px] text-fog-3">
          <span>$0</span>
          <span>$10K · step 18</span>
          <span>$25K · step 21</span>
        </div>
      </section>

      {/* Dates the roadmap implies -------------------------------------- */}
      {upcoming.length > 0 && (
        <section className="card p-5">
          <h3 className="mb-3 text-sm font-semibold text-fog-0">
            Dates the roadmap implies
          </h3>
          <ul className="space-y-2">
            {upcoming.map((u) => (
              <li key={u.label} className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onGoto(u.step)}
                  className="text-sm text-fog-1 underline decoration-ink-5 underline-offset-4 hover:decoration-lift"
                >
                  {u.label}
                </button>
                <span className="font-mono text-sm tabular-nums text-warn">{u.date}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] leading-relaxed text-fog-3">
            These aren&apos;t written on the board — they&apos;re computed from the waits
            it describes (SPF + 48hrs, warmup + 20 days). Put them in a real calendar too.
          </p>
        </section>
      )}

      {/* Phase map ------------------------------------------------------ */}
      <section className="card p-5">
        <h3 className="mb-4 text-sm font-semibold text-fog-0">Phases</h3>
        <div className="space-y-4">
          {PHASES.map((phase) => {
            const steps = STEPS.filter((st) => st.phase === phase.id);
            const done = steps.filter((st) => s.steps[st.id] === "done").length;
            return (
              <div key={phase.id}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: phase.accent }}
                  >
                    {phase.title}
                  </span>
                  <span className="font-mono text-[10px] text-fog-3">
                    {done}/{steps.length}
                  </span>
                </div>
                <p className="mb-2 text-xs leading-relaxed text-fog-3">{phase.blurb}</p>
                <div className="flex flex-wrap gap-1.5">
                  {steps.map((st) => {
                    const stStatus = s.steps[st.id] ?? "todo";
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => onGoto(st.n)}
                        title={st.title}
                        className="grid size-7 place-items-center rounded-md border font-mono text-[11px] font-semibold transition hover:scale-105"
                        style={{
                          borderColor:
                            stStatus === "todo" ? "var(--color-ink-4)" : phase.accent,
                          background:
                            stStatus === "done"
                              ? phase.accent
                              : stStatus === "doing"
                                ? `color-mix(in oklab, ${phase.accent} 22%, transparent)`
                                : "transparent",
                          color:
                            stStatus === "done"
                              ? "var(--color-ink-0)"
                              : stStatus === "doing"
                                ? phase.accent
                                : "var(--color-fog-3)",
                        }}
                      >
                        {st.n}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="card p-5">
        <h3 className="mb-2 text-sm font-semibold text-fog-0">
          What this roadmap claims
        </h3>
        {ROADMAP_INTRO.map((p, i) => (
          <p key={i} className="mb-2 text-sm leading-relaxed text-fog-2">
            {p}
          </p>
        ))}
        <a
          href={SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-xs text-fog-3 underline underline-offset-4 hover:text-fog-1"
        >
          Original Whimsical board ↗
        </a>
      </section>
    </div>
  );
}
