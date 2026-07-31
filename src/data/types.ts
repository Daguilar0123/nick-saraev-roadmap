export type LinkKind = "youtube" | "gsheet" | "gdoc" | "web";

export interface LinkRef {
  label: string;
  url: string;
  kind?: LinkKind;
  /** Short note about what this link is for. */
  note?: string;
}

export type BlankType =
  "text" | "textarea" | "url" | "money" | "number" | "date" | "list";

export interface Blank {
  id: string;
  label: string;
  type: BlankType;
  placeholder?: string;
  help?: string;
  /** For list blanks: how many rows to render. */
  count?: number;
  /** Promote this value into the global business profile. */
  profile?: boolean;
  /**
   * Eligible for the public showcase. Only tool choices and headline figures
   * are marked — anything identifying (domains, mailboxes, client names, URLs,
   * free-text reflections) is omitted by default and has to be opted in by
   * hand in the showcase builder. Notes are never eligible at all.
   */
  publicSafe?: boolean;
}

export interface SubItem {
  id: string;
  text: string;
  links?: LinkRef[];
}

export type PhaseId =
  | "foundation"
  | "infrastructure"
  | "channels"
  | "operations"
  | "engine"
  | "first-client"
  | "scale";

export interface Phase {
  id: PhaseId;
  title: string;
  blurb: string;
  accent: string;
}

export interface Step {
  id: string;
  n: number;
  phase: PhaseId;
  title: string;
  /** Original Whimsical wording, if the title above was tightened. */
  source?: string;
  links?: LinkRef[];
  subs: SubItem[];
  blanks?: Blank[];
  /** Editorial framing added on top of the source board. */
  why?: string;
  /** Rough effort estimate to help sequencing. */
  effort?: string;
  /**
   * Step-specific questions offered by "Work this out with Claude". Editorial,
   * like `why` and `blanks` — not on Nick's board.
   */
  asks?: string[];
}
