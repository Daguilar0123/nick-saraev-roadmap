/**
 * Provenance badges.
 *
 * The whole point of this edition is that Nick's roadmap stays auditable, so
 * anything a reader might mistake for his words carries a marker saying whose
 * it is. Three sources, three badges:
 *
 *   nick    — verbatim from the Whimsical board
 *   edition — written for this app; not on the board
 *   yours   — the reader's own input, never published
 */
export type Source = "nick" | "edition" | "yours";

const STYLE: Record<Source, { label: string; className: string; title: string }> = {
  nick: {
    label: "from Nick's board",
    className: "bg-fog-3/12 text-fog-2",
    title:
      "Verbatim from Nick Saraev's Whimsical board — wording unchanged.",
  },
  edition: {
    label: "added here",
    className: "bg-lift/15 text-lift-soft",
    title:
      "Not on Nick's board. Written for this interactive edition to help you work the step.",
  },
  yours: {
    label: "yours",
    className: "bg-cash/12 text-cash",
    title: "Your own input. Stays in this browser.",
  },
};

export function SourceBadge({ source }: { source: Source }) {
  const s = STYLE[source];
  return (
    <span
      title={s.title}
      className={`rounded px-1 py-px align-middle text-[9px] font-bold uppercase tracking-wider ${s.className}`}
    >
      {s.label}
    </span>
  );
}

/** Section heading with its provenance attached. */
export function SectionHeading({
  children,
  source,
  right,
}: {
  children: React.ReactNode;
  source: Source;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-2 flex items-center justify-between gap-3">
      <h4 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-fog-3">
        {children}
        <SourceBadge source={source} />
      </h4>
      {right}
    </div>
  );
}
