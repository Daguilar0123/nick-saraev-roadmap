"use client";

import { useMemo, useState } from "react";
import { PHASES } from "@/data/roadmap";
import type { Step } from "@/data/types";
import {
  useIsOverlay,
  useRoadmapActions,
  useRoadmapState,
  type StepStatus,
} from "@/lib/store";
import {
  campaignLaunch,
  dkimDue,
  hourlyRate,
  money,
  positioning,
  stepProgress,
} from "@/lib/derive";
import { BlankField } from "./BlankField";
import { LinkChips, LinkList } from "./LinkCard";
import { SectionHeading, SourceBadge } from "./Provenance";
import { AskClaudeStep } from "./AskClaude";

const STATUS_LABEL: Record<StepStatus, string> = {
  todo: "Not started",
  doing: "In progress",
  done: "Done",
};

function StatusToggle({ id, status }: { id: string; status: StepStatus }) {
  const { setStepStatus } = useRoadmapActions();
  const readOnly = useIsOverlay();
  const order: StepStatus[] = ["todo", "doing", "done"];

  return (
    <div className="no-print flex shrink-0 overflow-hidden rounded-lg border border-ink-4">
      {order.map((s) => (
        <button
          key={s}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setStepStatus(id, s);
          }}
          disabled={readOnly}
          aria-pressed={status === s}
          className={`px-2.5 py-1 text-[11px] font-medium transition ${
            status === s
              ? s === "done"
                ? "bg-cash/20 text-cash"
                : s === "doing"
                  ? "bg-warn/20 text-warn"
                  : "bg-ink-4 text-fog-1"
              : "text-fog-3 hover:bg-ink-3 hover:text-fog-1"
          }`}
        >
          {STATUS_LABEL[s]}
        </button>
      ))}
    </div>
  );
}

/**
 * Values the roadmap implies but never states: the +20 day campaign date, the
 * +48hr DKIM date, the positioning sentence, the realised hourly rate.
 */
function DerivedCallout({ step }: { step: Step }) {
  const s = useRoadmapState();

  const items: { label: string; value: string; tone?: "cash" | "warn" }[] = [];

  if (step.id === "niche") {
    const p = positioning(s);
    if (p) items.push({ label: "Your positioning statement", value: `“${p}”` });
  }
  if (step.id === "mailboxes") {
    const d = dkimDue(s);
    if (d)
      items.push({ label: "DKIM due (SPF + 48hrs)", value: d, tone: "warn" });
  }
  if (step.id === "coldemail") {
    const d = campaignLaunch(s);
    if (d)
      items.push({
        label: "Campaign launch (warmup + 20 days)",
        value: d,
        tone: "warn",
      });
    const target = s.blanks["daily_send_target"];
    if (target)
      items.push({
        label: "Monthly send volume",
        value: `${(Number(target) * 22).toLocaleString()} emails / 22 working days`,
      });
  }
  if (step.id === "retro") {
    const r = hourlyRate(s);
    if (r !== null)
      items.push({
        label: "Your realised hourly rate",
        value: `${money(r)}/hr`,
        tone: r >= 200 ? "cash" : "warn",
      });
  }

  if (!items.length) return null;

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((it) => (
        <div
          key={it.label}
          className={`rounded-lg border px-3 py-2 ${
            it.tone === "cash"
              ? "border-cash/30 bg-cash/8"
              : it.tone === "warn"
                ? "border-warn/30 bg-warn/8"
                : "border-lift/30 bg-lift/8"
          }`}
        >
          <div className="text-[10px] font-semibold uppercase tracking-wider text-fog-3">
            {it.label}
          </div>
          <div
            className={`mt-0.5 text-sm font-semibold ${
              it.tone === "cash"
                ? "text-cash"
                : it.tone === "warn"
                  ? "text-warn"
                  : "text-lift-soft"
            }`}
          >
            {it.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export function StepCard({
  step,
  defaultOpen = false,
}: {
  step: Step;
  defaultOpen?: boolean;
}) {
  const s = useRoadmapState();
  const { toggleSub, setSubs, setNote } = useRoadmapActions();
  const readOnly = useIsOverlay();
  const [open, setOpen] = useState(defaultOpen);

  const phase = useMemo(
    () => PHASES.find((p) => p.id === step.phase)!,
    [step.phase],
  );
  const p = stepProgress(step, s);
  const status: StepStatus = s.steps[step.id] ?? "todo";
  const allSubsDone = p.subsTotal > 0 && p.subsDone === p.subsTotal;

  return (
    <section
      id={`step-${step.n}`}
      className="card scroll-mt-24 overflow-hidden"
      style={{ borderLeft: `3px solid ${phase.accent}` }}
    >
      <header
        className="flex cursor-pointer items-start gap-3 p-4"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg font-mono text-sm font-bold"
          style={{
            background: `color-mix(in oklab, ${phase.accent} 18%, transparent)`,
            color: phase.accent,
          }}
        >
          {step.n}
        </span>

        <div className="min-w-0 flex-1">
          <h3
            className={`text-[15px] font-semibold leading-snug ${
              status === "done"
                ? "text-fog-2 line-through decoration-fog-3"
                : "text-fog-0"
            }`}
          >
            {step.title}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-fog-3">
            <span
              className="font-semibold uppercase tracking-wider"
              style={{ color: phase.accent }}
            >
              {phase.title}
            </span>
            {step.effort && (
              <span title="Effort estimate written for this edition — not on Nick's board.">
                ⏱ {step.effort}
              </span>
            )}
            <span>
              {p.subsDone}/{p.subsTotal} items
            </span>
            {p.blanksTotal > 0 && (
              <span
                className={
                  p.blanksDone === p.blanksTotal ? "text-cash" : undefined
                }
              >
                {p.blanksDone}/{p.blanksTotal} blanks filled
              </span>
            )}
          </div>

          <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink-3">
            <div
              className="h-full rounded-full transition-[width] duration-300"
              style={{
                width: `${Math.round(p.ratio * 100)}%`,
                background: phase.accent,
              }}
            />
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <StatusToggle id={step.id} status={status} />
          <span className="no-print text-xs text-fog-3">
            {open ? "▾" : "▸"}
          </span>
        </div>
      </header>

      {open && (
        <div className="space-y-5 border-t border-ink-3 px-4 pb-5 pt-4">
          {step.source && step.source !== step.title && (
            <p className="text-[11px] text-fog-3">
              Nick&apos;s wording:{" "}
              <span className="font-mono text-fog-2">“{step.source}”</span>
            </p>
          )}

          {/* Editorial. Labelled because everything else on this card is
              Nick's, and a reader should never have to guess which is which. */}
          {step.why && (
            <div className="border-l-2 border-ink-4 pl-3">
              <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-fog-3">
                Reader&apos;s note <SourceBadge source="edition" />
              </div>
              <p className="text-sm italic leading-relaxed text-fog-2">
                {step.why}
              </p>
            </div>
          )}

          {/* Sub-items --------------------------------------------------- */}
          <div>
            <SectionHeading
              source="nick"
              right={
                !readOnly ? (
                  <button
                    type="button"
                    onClick={() =>
                      setSubs(
                        step.subs.map((x) => x.id),
                        !allSubsDone,
                      )
                    }
                    className="no-print text-[11px] text-fog-3 underline underline-offset-2 hover:text-fog-1"
                  >
                    {allSubsDone ? "Clear all" : "Check all"}
                  </button>
                ) : undefined
              }
            >
              Checklist
            </SectionHeading>
            <ul className="space-y-1">
              {step.subs.map((sub) => {
                const checked = !!s.subs[sub.id];
                return (
                  <li
                    key={sub.id}
                    className="flex flex-wrap items-start gap-y-1 rounded-md px-2 py-1.5 transition hover:bg-ink-2"
                  >
                    {/* The label deliberately wraps only the checkbox and text —
                        resource chips sit outside it so clicking a link doesn't
                        also tick the item off. */}
                    <label className="flex cursor-pointer items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSub(sub.id)}
                        disabled={readOnly}
                        className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[var(--color-lift)]"
                      />
                      <span
                        className={`text-sm leading-relaxed ${
                          checked ? "text-fog-3 line-through" : "text-fog-1"
                        }`}
                      >
                        {sub.text}
                      </span>
                    </label>
                    <LinkChips links={sub.links} />
                  </li>
                );
              })}
            </ul>
          </div>

          <AskClaudeStep step={step} />

          {/* Blanks ------------------------------------------------------ */}
          {!!step.blanks?.length && (
            <div>
              <SectionHeading source="edition">
                Fill in the blanks
              </SectionHeading>
              <div className="grid gap-4 sm:grid-cols-2">
                {step.blanks.map((b) => (
                  <div
                    key={b.id}
                    className={
                      b.type === "textarea" || b.type === "list"
                        ? "sm:col-span-2"
                        : undefined
                    }
                  >
                    <BlankField blank={b} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <DerivedCallout step={step} />

          {/* Resources --------------------------------------------------- */}
          {!!step.links?.length && (
            <div>
              <SectionHeading source="nick">Resources</SectionHeading>
              <LinkList links={step.links} />
            </div>
          )}

          {/* Notes ------------------------------------------------------- */}
          <div>
            <SectionHeading source="yours">Your notes</SectionHeading>
            <textarea
              className="field min-h-[4.5rem] resize-y"
              placeholder={
                readOnly
                  ? "Notes are never included in a shared example"
                  : "What you actually did, what broke, what you'd do differently…"
              }
              readOnly={readOnly}
              value={s.notes[step.id] ?? ""}
              onChange={(e) => setNote(step.id, e.target.value)}
            />
          </div>
        </div>
      )}
    </section>
  );
}
