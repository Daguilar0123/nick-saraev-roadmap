"use client";

import { DAILY_RITUAL } from "@/data/journey";
import { useRoadmapActions, useRoadmapState } from "@/lib/store";
import { streak, todayKey } from "@/lib/derive";

const SLOTS = [
  { id: "morning", label: "Morning", hint: "The one that includes Upwork" },
  { id: "afternoon", label: "Afternoon", hint: "" },
  { id: "evening", label: "Evening", hint: "" },
] as const;

function last(n: number) {
  const out: string[] = [];
  const d = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const c = new Date(d);
    c.setDate(d.getDate() - i);
    const off = c.getTimezoneOffset();
    out.push(new Date(c.getTime() - off * 60_000).toISOString().slice(0, 10));
  }
  return out;
}

export function DailyRitual() {
  const s = useRoadmapState();
  const { toggleDaily } = useRoadmapActions();
  const day = todayKey();
  const done = s.daily[day] ?? [];
  const run = streak(s, DAILY_RITUAL.length);
  const days = last(35);

  const bookingLink = s.blanks["booking_link"];

  return (
    <div className="space-y-6">
      <section className="card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-fog-0">The daily sales ritual</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-fog-2">
              Step 14 of the roadmap is the only step that repeats forever, and the board
              is blunt about why: at 0 customers your only priority is sales, and
              misprioritisation here is why 90%+ of businesses fail. Under two hours a
              day — the highest leverage two hours you&apos;ll have.
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold tabular-nums text-cash">{run}</div>
            <div className="text-[11px] uppercase tracking-wider text-fog-3">
              day streak
            </div>
          </div>
        </div>
      </section>

      <section className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-ink-3 px-5 py-3">
          <h3 className="text-sm font-semibold text-fog-0">Today · {day}</h3>
          <span className="font-mono text-xs text-fog-3">
            {done.length}/{DAILY_RITUAL.length}
          </span>
        </div>

        <div className="grid gap-px bg-ink-3 sm:grid-cols-3">
          {SLOTS.map((slot) => {
            const tasks = DAILY_RITUAL.filter((t) => t.slot === slot.id);
            const blockLabel = s.blanks[`block_${slot.id}`];
            return (
              <div key={slot.id} className="bg-ink-1 p-4">
                <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-fog-3">
                  {slot.label}
                </div>
                {blockLabel && (
                  <div className="mb-2 font-mono text-[11px] text-lift-soft">
                    {blockLabel}
                  </div>
                )}
                <ul className="space-y-1">
                  {tasks.map((t) => {
                    const checked = done.includes(t.id);
                    return (
                      <li key={t.id}>
                        <label className="flex cursor-pointer items-start gap-2.5 rounded-md px-1.5 py-1.5 transition hover:bg-ink-2">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleDaily(day, t.id)}
                            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[var(--color-cash)]"
                          />
                          <span
                            className={`text-[13px] leading-snug ${
                              checked ? "text-fog-3 line-through" : "text-fog-1"
                            }`}
                          >
                            {t.label}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {bookingLink && (
          <div className="border-t border-ink-3 px-5 py-3 text-xs text-fog-3">
            Booking link:{" "}
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-lift-soft underline underline-offset-4"
            >
              {bookingLink}
            </a>
          </div>
        )}
      </section>

      <section className="card p-5">
        <h3 className="mb-3 text-sm font-semibold text-fog-0">Last 35 days</h3>
        <div className="flex flex-wrap gap-1.5">
          {days.map((d) => {
            const n = (s.daily[d] ?? []).length;
            const ratio = n / DAILY_RITUAL.length;
            return (
              <div
                key={d}
                title={`${d} — ${n}/${DAILY_RITUAL.length}`}
                className="size-5 rounded-[4px] border border-ink-3"
                style={{
                  background:
                    ratio === 0
                      ? "var(--color-ink-2)"
                      : `color-mix(in oklab, var(--color-cash) ${Math.round(
                          20 + ratio * 80,
                        )}%, var(--color-ink-2))`,
                }}
              />
            );
          })}
        </div>
        <p className="mt-3 text-[11px] text-fog-3">
          Darker means more of the ritual completed. The board&apos;s whole thesis is
          that this grid, not the setup steps, is what produces $25K/month.
        </p>
      </section>
    </div>
  );
}
