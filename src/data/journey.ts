/**
 * "The Automation Customer Journey" — the left half of the source Whimsical board.
 * Node text is verbatim; the prose blocks are the board's own annotations.
 */

export interface JourneyNode {
  id: string;
  label: string;
  tone?: "start" | "loop" | "decision" | "exit" | "money";
  note?: string;
}

export interface JourneySection {
  id: string;
  n: number;
  title: string;
  prose: string[];
  nodes: JourneyNode[];
  edges?: { from: string; to: string; label?: string }[];
}

export const JOURNEY_INTRO: string[] = [
  "Before you build your automation business, you first need to understand the customer journey. Because without customers your organization will never be a business—it will only ever be a hobby.",
  "Here’s the core feedback loop that makes anyone successful in business: 1) Peer inside of the mind of your customer, 2) Understand every step they take, and 3) Pre-emptively optimize those steps so they can have a great experience and come back for more.",
  "To that end, below is the automation customer journey from start to finish. It begins with the lead being generated using one or more outreach methods, and it ends with the client being satisfied and happily giving you money for more work. This flow is all you need to hit $25,000/mo. Many companies even scale substantially past this without any extra work involved—just more of the same.",
];

export const ROADMAP_INTRO: string[] = [
  "Now that you understand the journey your customers are going to take, what’s the best way to go about actually building your automation business? That’s what this roadmap is for.",
  "Below is a complete, step-by-step guide that will cover every step involved in building an automation business. If you follow this 110-step roadmap from start to finish you will end up with a successful business that does $25K/mo. I’m assuming no network, no referrals, and no pre-existing skills (aside from automation)—if you have any of those, it will be even easier.",
  "It starts logically and then prioritizes daily sales activities until you acquire your first customer. Each subsequent step builds on the one before it and before long you have everything you need to create your automation business.",
];

export const JOURNEY: JourneySection[] = [
  {
    id: "marketing",
    n: 1,
    title: "Marketing & Lead Generation",
    prose: [
      "First step is generating the lead.",
      "If you don’t have a following, the simplest and most reliable way to generate a lead is via outbound.",
      "There are also inbound approaches—like social media—and these work incredibly well when you’ve built up positive brand equity and an airtight reputation.",
    ],
    nodes: [
      { id: "m1", label: "1. Referrals", tone: "start" },
      { id: "m2", label: "2. Communities", tone: "start" },
      { id: "m3", label: "3. Cold Email", tone: "start" },
      { id: "m4", label: "4. Platform Sales", tone: "start" },
      { id: "m5", label: "5. LinkedIn Outreach", tone: "start" },
      { id: "m6", label: "6. Inbound Social", tone: "start" },
    ],
  },
  {
    id: "sales",
    n: 2,
    title: "Sales",
    prose: [
      "Next is selling the lead. Agencies have a variety of sales models, but the one preferred here is the traditional model.",
      "This model involves one sales meeting—which is both your discovery and your closing call—and then a detailed proposal/SOW afterwards.",
      "I like this model because it lets me automate the majority of the sales administration work while also keeping the number of “hoops” a prospect has to jump through low.",
      "Since documents and emails are easy to automate, you can also create a lot of leverage by having systems do the work for you, and this is why I consider it both more efficient and effective than high-pressure one-call closes or drawn out protracted two/three call closes.",
    ],
    nodes: [
      { id: "s1", label: "Meeting Booked", tone: "start" },
      {
        id: "s2",
        label: "Follow Up Cycle",
        tone: "loop",
        note: "No show? → Rebook",
      },
      { id: "s3", label: "Sales Meeting Occurs", tone: "decision" },
      { id: "s4", label: "Wait 30 days", tone: "loop" },
      { id: "s5", label: "Opt out", tone: "exit" },
      { id: "s6", label: "Send Detailed Proposal/SOW" },
      { id: "s7", label: "Follow Up Cycle", tone: "loop" },
    ],
    edges: [
      { from: "s1", to: "s2", label: "No show?" },
      { from: "s2", to: "s1", label: "Rebook" },
      { from: "s2", to: "s4" },
      { from: "s1", to: "s3" },
      { from: "s3", to: "s5", label: "Opt out" },
      { from: "s3", to: "s6" },
      { from: "s6", to: "s7" },
    ],
  },
  {
    id: "fulfillment",
    n: 3,
    title: "Project Management & Fulfillment",
    prose: [
      "Now that your lead has transformed into a client, your last is fulfilling that client.",
      "Assuming you’re selling templated systems (or mostly templated systems), this is the easiest step for you. If you’ve sold a custom implementation—which can certainly be lucrative, but tends to involve more work—this is likely going to be the hardest step for you because of the friction involved, and the logistical difficulty in effectively assigning custom projects to other staff members.",
      "The key point here is that the client usually doesn’t see any of this and so they don’t care. The only things they do care about are your deliverables at the end of this process. By “deliverable” I am referring to something a client can physically see and interact with—like a new and improved CRM, a list of leads, a series of forms, a templated proposal, an automatic email, a video that you send them documenting the process, etc.",
      "A big misstep that many automation freelancers/agencies make is assuming that their clients value their project the same way that they do. They don’t. Consider your fulfilled project a black box that no one can see inside. How can you dress up the outside of this black box in such a way that the client goes “Wow, incredible work!”",
      "Another misstep is not requesting work after you deliver the project. The vast majority of the time, assuming you’ve done the job well, the period immediately post-project can be your highest ROI sales time. Send templated followups with intelligent requests for more work while the client is still basking in the glow of their automated system. Show them other systems you’ve created—or can create for them, because you’ve noticed XYZ—and leverage this to pitch a retainer.",
      "The moment you acquire recurring revenue you are massively multiplying the value of any client and that should be priority #1.",
    ],
    nodes: [
      { id: "f1", label: "Kickoff Call", tone: "start" },
      { id: "f2", label: "Create Entry In Agency Project Manager" },
      { id: "f3", label: "Fulfill Project" },
      {
        id: "f4",
        label: "Record Delivery Video & Send Templated Message/Email to Client",
      },
      { id: "f5", label: "Mark Project “Completed”" },
      { id: "f6", label: "Collect Delivery Payment", tone: "money" },
      {
        id: "f7",
        label:
          "Send Templated Message/Email to Client Requesting Additional Work",
      },
      {
        id: "f8",
        label: "Add to Followup Queue & Reach Out In 30 Days",
        tone: "loop",
      },
    ],
    edges: [
      { from: "f1", to: "f2" },
      { from: "f2", to: "f3" },
      { from: "f3", to: "f4" },
      { from: "f4", to: "f5" },
      { from: "f5", to: "f6" },
      { from: "f6", to: "f7" },
      { from: "f7", to: "f8" },
    ],
  },
];

/**
 * Step 14 of the roadmap defines a recurring daily ritual. Broken out here so the
 * app can render it as an actual repeating checklist rather than static text.
 */
export interface DailyTask {
  id: string;
  label: string;
  slot: "morning" | "afternoon" | "evening";
}

export const DAILY_RITUAL: DailyTask[] = [
  { id: "uw", label: "Apply to 5+ jobs on Upwork", slot: "morning" },
  { id: "ce-am", label: "Run through cold email inbox", slot: "morning" },
  { id: "co-am", label: "Run through community responses", slot: "morning" },
  { id: "ce-pm", label: "Run through cold email inbox", slot: "afternoon" },
  { id: "co-pm", label: "Run through community responses", slot: "afternoon" },
  { id: "ce-ev", label: "Run through cold email inbox", slot: "evening" },
  { id: "co-ev", label: "Run through community responses", slot: "evening" },
];
