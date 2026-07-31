import { STEPS } from "@/data/roadmap";
import type { Blank, Step } from "@/data/types";
import type { RoadmapState } from "./store";

export function blankKeys(b: Blank): string[] {
  if (b.type === "list") {
    return Array.from({ length: b.count ?? 1 }, (_, i) => `${b.id}.${i}`);
  }
  return [b.id];
}

export function stepBlankKeys(step: Step): string[] {
  return (step.blanks ?? []).flatMap(blankKeys);
}

export interface StepProgress {
  subsDone: number;
  subsTotal: number;
  blanksDone: number;
  blanksTotal: number;
  /** 0–1 across sub-items and blanks combined. */
  ratio: number;
  complete: boolean;
}

export function stepProgress(step: Step, s: RoadmapState): StepProgress {
  const subsTotal = step.subs.length;
  const subsDone = step.subs.filter((x) => s.subs[x.id]).length;

  const keys = stepBlankKeys(step);
  const blanksTotal = keys.length;
  const blanksDone = keys.filter(
    (k) => (s.blanks[k] ?? "").trim().length > 0,
  ).length;

  const total = subsTotal + blanksTotal;
  const done = subsDone + blanksDone;

  return {
    subsDone,
    subsTotal,
    blanksDone,
    blanksTotal,
    ratio: total === 0 ? 0 : done / total,
    complete: s.steps[step.id] === "done",
  };
}

export function overall(s: RoadmapState) {
  let subsDone = 0;
  let subsTotal = 0;
  let blanksDone = 0;
  let blanksTotal = 0;
  let stepsDone = 0;

  for (const step of STEPS) {
    const p = stepProgress(step, s);
    subsDone += p.subsDone;
    subsTotal += p.subsTotal;
    blanksDone += p.blanksDone;
    blanksTotal += p.blanksTotal;
    if (p.complete) stepsDone += 1;
  }

  return {
    subsDone,
    subsTotal,
    blanksDone,
    blanksTotal,
    stepsDone,
    stepsTotal: STEPS.length,
    ratio: (subsDone + blanksDone) / Math.max(1, subsTotal + blanksTotal),
  };
}

/** The lowest-numbered step that isn't marked done — i.e. where you are now. */
export function currentStep(s: RoadmapState): Step {
  return (
    STEPS.find((st) => s.steps[st.id] !== "done") ?? STEPS[STEPS.length - 1]
  );
}

// Derived business values ------------------------------------------------

export function positioning(s: RoadmapState) {
  const x = (s.blanks["system_type"] ?? "").trim();
  const y = (s.blanks["market_segment"] ?? "").trim();
  if (!x && !y) return null;
  return `I build ${x || "…"} systems for ${y || "…"}`;
}

export function addDays(iso: string, days: number) {
  if (!iso) return "";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function campaignLaunch(s: RoadmapState) {
  return addDays(s.blanks["warmup_start"] ?? "", 20);
}

export function dkimDue(s: RoadmapState) {
  return addDays(s.blanks["spf_dmarc_date"] ?? "", 2);
}

export function hourlyRate(s: RoadmapState) {
  const price = Number(
    (s.blanks["project_price"] ?? "").replace(/[^0-9.]/g, ""),
  );
  const hours = Number(
    (s.blanks["project_hours"] ?? "").replace(/[^0-9.]/g, ""),
  );
  if (!price || !hours) return null;
  return price / hours;
}

export function mrr(s: RoadmapState) {
  return Number((s.blanks["mrr_current"] ?? "").replace(/[^0-9.]/g, "")) || 0;
}

export const MRR_TARGET = 25_000;

// Daily ritual -----------------------------------------------------------

export function todayKey(d = new Date()) {
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60_000).toISOString().slice(0, 10);
}

export function streak(s: RoadmapState, required: number) {
  let n = 0;
  const cursor = new Date();
  // Today only counts once it's complete; an unfinished today shouldn't break
  // a streak that's still live, so start from yesterday if today is partial.
  const todays = s.daily[todayKey(cursor)] ?? [];
  if (todays.length < required) cursor.setDate(cursor.getDate() - 1);

  for (;;) {
    const done = s.daily[todayKey(cursor)] ?? [];
    if (done.length < required) break;
    n += 1;
    cursor.setDate(cursor.getDate() - 1);
    if (n > 3650) break;
  }
  return n;
}

export function money(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
