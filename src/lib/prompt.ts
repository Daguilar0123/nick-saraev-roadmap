import { STEPS } from "@/data/roadmap";
import type { Step } from "@/data/types";
import { blankKeys, currentStep, hourlyRate, money, positioning } from "./derive";
import type { RoadmapState } from "./store";

/**
 * Builds the text handed off to Claude.
 *
 * Design rule: quote Nick's checklist verbatim so Claude answers against the
 * actual roadmap rather than its own idea of one, then layer the reader's own
 * answers on top. Everything is assembled client-side and shown to the reader
 * before it goes anywhere — the app never transmits it.
 */

const ROADMAP_CONTEXT =
  'I\'m working through Nick Saraev\'s roadmap "Roadmap to $25K/Month With Automation" — a 21-step plan for building an automation agency from nothing to $25K/month.';

function profileLines(s: RoadmapState): string[] {
  const out: string[] = [];
  const pos = positioning(s);
  if (pos) out.push(`- Positioning: "${pos}"`);

  const pairs: [string, string][] = [
    ["business_name", "Business name"],
    ["sending_tool", "Cold email tool"],
    ["crm_tool", "CRM"],
    ["booking_link", "Booking link"],
  ];
  for (const [id, label] of pairs) {
    const v = (s.blanks[id] ?? "").trim();
    if (v) out.push(`- ${label}: ${v}`);
  }

  const rate = hourlyRate(s);
  if (rate !== null) out.push(`- Realised hourly rate so far: ${money(rate)}/hr`);

  const rev = (s.blanks["mrr_current"] ?? "").trim();
  if (rev) out.push(`- Current monthly revenue: ${money(Number(rev) || 0)}`);

  return out;
}

export interface PromptOptions {
  includeNotes: boolean;
}

export function buildStepPrompt(
  step: Step,
  s: RoadmapState,
  ask: string,
  opts: PromptOptions,
): string {
  const parts: string[] = [];

  parts.push(
    `${ROADMAP_CONTEXT}\n\nI'm on **step ${step.n} of 21 — ${step.title}**.`,
  );

  parts.push(
    `Nick's own checklist for this step:\n` +
      step.subs
        .map((x) => `${s.subs[x.id] ? "- [x]" : "- [ ]"} ${x.text}`)
        .join("\n"),
  );

  const profile = profileLines(s);
  if (profile.length) {
    parts.push(`About my business so far:\n${profile.join("\n")}`);
  }

  // This step's own answers, split into filled and still-blank.
  const filled: string[] = [];
  const blank: string[] = [];
  for (const b of step.blanks ?? []) {
    const keys = blankKeys(b);
    const values = keys
      .map((k) => (s.blanks[k] ?? "").trim())
      .filter(Boolean);
    if (values.length) {
      filled.push(
        values.length > 1
          ? `- ${b.label}:\n${values.map((v) => `    - ${v}`).join("\n")}`
          : `- ${b.label}: ${values[0]}`,
      );
    } else {
      blank.push(`- ${b.label}`);
    }
  }
  if (filled.length) parts.push(`What I've filled in for this step:\n${filled.join("\n")}`);
  if (blank.length) parts.push(`Still blank on this step:\n${blank.join("\n")}`);

  const note = (s.notes[step.id] ?? "").trim();
  if (opts.includeNotes && note) {
    parts.push(`My own notes on this step:\n${note}`);
  }

  parts.push(`---\n\n${ask}`);

  return parts.join("\n\n");
}

export function buildOverviewPrompt(s: RoadmapState, ask: string): string {
  const parts: string[] = [ROADMAP_CONTEXT];

  const done = STEPS.filter((st) => s.steps[st.id] === "done");
  const doing = STEPS.filter((st) => s.steps[st.id] === "doing");
  const cur = currentStep(s);

  parts.push(
    `Where I am:\n` +
      `- Done (${done.length}/21): ${done.length ? done.map((x) => `${x.n}. ${x.title}`).join("; ") : "nothing yet"}\n` +
      `- In progress: ${doing.length ? doing.map((x) => `${x.n}. ${x.title}`).join("; ") : "nothing"}\n` +
      `- Next unfinished step: ${cur.n}. ${cur.title}`,
  );

  const profile = profileLines(s);
  if (profile.length) parts.push(`About my business:\n${profile.join("\n")}`);

  parts.push(`---\n\n${ask}`);
  return parts.join("\n\n");
}

/**
 * claude.ai accepts a prefilled message via ?q=. Long prompts blow past what
 * URLs reliably carry, so the UI falls back to copy-and-paste past this.
 */
export const MAX_DEEPLINK_CHARS = 6000;

export function claudeDeepLink(prompt: string) {
  return `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
}

export const GENERIC_ASKS = [
  "Pressure-test what I've got here. Where is it weak, and what would you change?",
  "What am I missing on this step that Nick's checklist doesn't spell out?",
  "What's the fastest honest path through this step? Assume I have limited time.",
  "Explain this step like I've never done it before, with a concrete example for my niche.",
];
