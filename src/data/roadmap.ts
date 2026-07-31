import type { Phase, Step } from "./types";

/**
 * Source: "Roadmap to $25K/Month With Automation" by Nick Saraev (Whimsical board
 * P5K6f1h9YpY5ngzvCW93Pg). Extracted verbatim from the live board 2026-07-31 —
 * every step title, sub-item and link below is from that board.
 *
 * Additions authored for this app (not on the source board) are the `why`,
 * `effort` and `blanks` fields, plus the phase grouping. Those are clearly
 * separated so the original stays auditable.
 */

export const PHASES: Phase[] = [
  {
    id: "foundation",
    title: "Foundation",
    blurb:
      "Decide who you serve and what you sell. Nothing downstream works until this is concrete.",
    accent: "var(--accent-foundation)",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    blurb:
      "Domains, site, mail. Boring plumbing that takes real calendar time — start the clocks early.",
    accent: "var(--accent-infrastructure)",
  },
  {
    id: "channels",
    title: "Channels",
    blurb:
      "Three ways leads reach you: cold email, platform sales, communities. Build all three.",
    accent: "var(--accent-channels)",
  },
  {
    id: "operations",
    title: "Operations",
    blurb:
      "The minimum back office that lets you take money without friction. Keep it thin.",
    accent: "var(--accent-operations)",
  },
  {
    id: "engine",
    title: "Sales Engine",
    blurb:
      "The daily ritual. This is the step that actually produces customers — the rest is setup.",
    accent: "var(--accent-engine)",
  },
  {
    id: "first-client",
    title: "First Client",
    blurb:
      "Measure the first project honestly, then turn that measurement into a rate.",
    accent: "var(--accent-first-client)",
  },
  {
    id: "scale",
    title: "Scale",
    blurb:
      "$0→$10K is agility and consistency. $10K→$25K is systems. Different games.",
    accent: "var(--accent-scale)",
  },
];

export const STEPS: Step[] = [
  {
    id: "niche",
    asks: [
      "Is my niche too broad for cold outreach? Give me 5 sharper alternatives and say which you'd pick, and why.",
      "Draft three versions of my positioning statement and tell me which one lands hardest with a buyer.",
      "Who exactly would I be emailing in this niche — job titles, company size, and where I'd find them?",
    ],
    n: 1,
    phase: "foundation",
    title: "Define your niche",
    source: "Define your niche using the Niche Discovery sheet",
    effort: "1–2 hrs",
    why: "Every later step — your site copy, your cold email angle, your Upwork headline, your templates — inherits this answer. Getting it wrong costs you all of them.",
    links: [
      {
        label: "Niche Discovery sheet",
        url: "https://docs.google.com/spreadsheets/d/1zXLFZXqNgil_wQhtlQE2vaC0X7OsHeWcjjU06AyxZmA/edit?usp=sharing",
        kind: "gsheet",
        note: "First: make a copy via File → Make a Copy. Lists popular niches and example positioning statements. You do not have to use one of them.",
      },
    ],
    subs: [
      { id: "niche-1", text: "Doing “everything for everyone” isn’t scalable" },
      {
        id: "niche-2",
        text: "First, define specific market segment. Designers? Coaches?",
      },
      {
        id: "niche-3",
        text: "Then, identify system type. Sales? Project management?",
      },
      { id: "niche-4", text: "End result: “I build X systems for Y niche”" },
    ],
    blanks: [
      {
        id: "market_segment",
        label: "Market segment (the Y)",
        type: "text",
        placeholder: "e.g. independent design studios",
        profile: true,
        help: "Specific enough that you could name 50 of them.",
      },
      {
        id: "system_type",
        label: "System type (the X)",
        type: "text",
        placeholder: "e.g. client onboarding",
        profile: true,
        help: "One system category, not a menu.",
      },
      {
        id: "niche_sheet_copy",
        label: "Link to your copy of the Niche Discovery sheet",
        type: "url",
        placeholder: "https://docs.google.com/spreadsheets/d/…",
      },
      {
        id: "niche_why",
        label: "Why you, for this niche?",
        type: "textarea",
        placeholder:
          "Prior job, hobby, network, or an unfair insight into their workflow…",
        help: "Not on the source board — but the honest answer here is what makes cold outreach land.",
      },
    ],
  },
  {
    id: "name",
    asks: [
      "Give me 10 short, memorable business names that fit my positioning, and flag any that sound like an existing agency.",
    ],
    n: 2,
    phase: "foundation",
    title: "Come up with a business name",
    source: "Come up with business name using Namelix or similar",
    effort: "5 min (deliberately)",
    why: "Timeboxed on purpose. The board is blunt: business names don’t matter. The trap is spending a week here to avoid doing sales.",
    links: [
      {
        label: "Namelix",
        url: "https://namelix.com/",
        kind: "web",
        note: "Generative-AI brandable business names, domain availability, instant logo.",
      },
    ],
    subs: [
      { id: "name-1", text: "Business names don’t matter" },
      {
        id: "name-2",
        text: "Set a 5 min timer. Pick something short & memorable",
      },
      { id: "name-3", text: "Verify the .com domain name hasn’t been taken" },
    ],
    blanks: [
      {
        id: "business_name",
        label: "Business name",
        type: "text",
        placeholder: "e.g. Workflow Loop",
        profile: true,
      },
      {
        id: "primary_domain",
        label: "Primary .com domain (confirmed available)",
        type: "text",
        placeholder: "workflowloop.com",
        profile: true,
      },
    ],
  },
  {
    id: "portfolio",
    asks: [
      "Suggest 5 concrete systems I could build as portfolio pieces for my niche, ordered by how impressive they'd look to a buyer.",
      "For my niche, what does a genuinely useful automation actually replace? Be specific about the manual work it kills.",
    ],
    n: 3,
    phase: "foundation",
    title: "Build 5 case studies or portfolio pieces",
    source: "Build 5 case studies or portfolio pieces for niche + templates",
    effort: "1–2 weeks",
    why: "These double as your templates. Every one you build now is 80% of a future paid project — this is the single highest-leverage prep work on the board.",
    links: [
      {
        label: "Case study / template classroom",
        url: "https://www.skool.com/makemoneywithmake/classroom/56a4fab8?md=c63cabf3247f48bfa77938b15d879041",
        kind: "web",
      },
      {
        label: "Nick’s YouTube videos",
        url: "https://www.youtube.com/@nicksaraev/videos",
        kind: "web",
      },
      {
        label: "Blueprints classroom",
        url: "https://www.skool.com/makemoneywithmake/classroom/b569fa44?md=339a96c542ae427db62db378776760f2",
        kind: "web",
      },
    ],
    subs: [
      {
        id: "port-1",
        text: "If you’ve built systems before, use them as inspo",
      },
      {
        id: "port-2",
        text: "If you haven’t, use Nick’s YouTube videos and blueprints",
        links: [
          {
            label: "Nick’s YouTube videos",
            url: "https://www.youtube.com/@nicksaraev/videos",
            kind: "web",
          },
          {
            label: "Blueprints",
            url: "https://www.skool.com/makemoneywithmake/classroom/b569fa44?md=339a96c542ae427db62db378776760f2",
            kind: "web",
          },
        ],
      },
      {
        id: "port-3",
        text: "Use to create Make.com blueprints & then template each",
      },
      {
        id: "port-4",
        text: "Your templates will get you 80% of the way there",
      },
      {
        id: "port-5",
        text: "Then your “job” is just the other 20%—customizing them",
      },
      { id: "port-6", text: "Massive leverage if you do this right" },
    ],
    blanks: [
      {
        id: "case_studies",
        label: "Your 5 case studies / templates",
        type: "list",
        count: 5,
        placeholder: "Name — what it automates — link to blueprint",
      },
      {
        id: "blueprint_store",
        label: "Where your blueprints live",
        type: "url",
        placeholder: "Drive folder, Notion, Make.com org…",
      },
    ],
  },
  {
    id: "domains",
    asks: [
      "Suggest sending-domain variants for my main domain that won't look spammy to a filter or a human.",
    ],
    n: 4,
    phase: "infrastructure",
    title: "Buy main domain + 3 sending domains",
    effort: "30 min",
    why: "Do this before the website. Sending domains need weeks of warmup, so the clock should start as early as possible.",
    links: [
      { label: "Namecheap", url: "https://www.namecheap.com/", kind: "web" },
      {
        label: "workflowloop.com (example)",
        url: "https://workflowloop.com/",
        kind: "web",
      },
    ],
    subs: [
      {
        id: "dom-1",
        text: "Make sure it’s a .com (workflowloop.com)",
        links: [
          {
            label: "workflowloop.com",
            url: "https://workflowloop.com/",
            kind: "web",
          },
        ],
      },
      {
        id: "dom-2",
        text: "For sending domains use variations like “get”, “start”, “kit”",
      },
      { id: "dom-3", text: "getworkflowloop.com / goworkflowloop.com / etc" },
      {
        id: "dom-4",
        text: "Use Namecheap or similar",
        links: [
          {
            label: "Namecheap",
            url: "https://www.namecheap.com/",
            kind: "web",
          },
        ],
      },
    ],
    blanks: [
      {
        id: "registrar",
        publicSafe: true,
        label: "Registrar",
        type: "text",
        placeholder: "Namecheap",
      },
      {
        id: "sending_domains",
        label: "3 sending domains",
        type: "list",
        count: 3,
        placeholder: "getyourbrand.com",
        profile: true,
      },
      { id: "domains_purchased_on", label: "Purchased on", type: "date" },
    ],
  },
  {
    id: "website",
    asks: [
      "Write the copy for a one-page site for my positioning — hero, three proof points, and one call to action. Keep it short.",
    ],
    n: 5,
    phase: "infrastructure",
    title: "Create + publish website using a drag-and-drop builder",
    effort: "< 3 hrs (hard cap)",
    why: "The board is explicit that this is a business card, not a product. The cap matters more than the quality.",
    links: [
      {
        label: "Webflow",
        url: "https://secret.nicksaraev.com/webflow",
        kind: "web",
      },
      {
        label: "“Here’s my biggest mistakes so far”",
        url: "https://www.skool.com/makemoneywithmake/heres-my-biggest-mistakes-so-far",
        kind: "web",
      },
      {
        label: "Mine took one hour",
        url: "https://www.skool.com/makemoneywithmake/classroom/56a4fab8?md=1a966f331c444cf2843413fa57af8567",
        kind: "web",
      },
    ],
    subs: [
      {
        id: "web-1",
        text: "I suggest Webflow but use whatever you’re familiar with",
        links: [
          {
            label: "Webflow",
            url: "https://secret.nicksaraev.com/webflow",
            kind: "web",
          },
        ],
      },
      {
        id: "web-2",
        text: "Don’t build this from scratch. Buy a template and tweak",
        links: [
          {
            label: "Biggest mistakes so far",
            url: "https://www.skool.com/makemoneywithmake/heres-my-biggest-mistakes-so-far",
            kind: "web",
          },
        ],
      },
      {
        id: "web-3",
        text: "Your site is just a business card—it’s just for legitimacy",
      },
      {
        id: "web-4",
        text: "Try to spend less than 3 hours on this. Mine took one",
        links: [
          {
            label: "Mine took one",
            url: "https://www.skool.com/makemoneywithmake/classroom/56a4fab8?md=1a966f331c444cf2843413fa57af8567",
            kind: "web",
          },
        ],
      },
    ],
    blanks: [
      {
        id: "site_builder",
        publicSafe: true,
        label: "Builder used",
        type: "text",
        placeholder: "Webflow",
      },
      {
        id: "site_url",
        label: "Live site URL",
        type: "url",
        placeholder: "https://…",
        profile: true,
      },
      {
        id: "site_hours",
        publicSafe: true,
        label: "Hours actually spent",
        type: "number",
        placeholder: "3",
        help: "Be honest. Overrun here predicts overrun everywhere.",
      },
    ],
  },
  {
    id: "workspace",
    n: 6,
    phase: "infrastructure",
    title: "Get Google Workspace Starter on the main domain",
    effort: "30 min",
    links: [
      {
        label: "Google Workspace",
        url: "https://workspace.google.com/",
        kind: "web",
      },
    ],
    subs: [
      {
        id: "ws-1",
        text: "Add your primary domain first & create a name@ address",
      },
      {
        id: "ws-2",
        text: "Downgrade to “Business Starter” so $6/7 instead of $15",
      },
    ],
    blanks: [
      {
        id: "workspace_email",
        label: "Your name@ address",
        type: "text",
        placeholder: "danny@yourbrand.com",
        profile: true,
      },
      {
        id: "workspace_plan",
        publicSafe: true,
        label: "Plan confirmed as Business Starter?",
        type: "text",
        placeholder: "Yes — $6/mo",
      },
    ],
  },
  {
    id: "mailboxes",
    asks: [
      "Walk me through SPF, DKIM and DMARC for my sending domains in plain language, in the order I should actually do them.",
    ],
    n: 7,
    phase: "infrastructure",
    title: "Add 3 sending domains as secondaries, 3 mailboxes each",
    source:
      "Add three sending domains as secondaries and set up 3 mailboxes each",
    effort: "2 hrs + 48 hr wait",
    why: "Nine mailboxes is what makes 270 emails/day possible without burning your main domain. The DKIM step has a deliberate 48-hour gap — set the reminder now.",
    links: [
      {
        label: "Mailbox setup walkthrough",
        url: "https://www.skool.com/makemoneywithmake/classroom/56a4fab8?md=1e767daa58324d16bc0a1b64bb501dd0",
        kind: "web",
      },
      {
        label: "Add your SPF record",
        url: "https://support.google.com/a/answer/10684623?hl=en",
        kind: "web",
      },
      {
        label: "Add your DMARC record",
        url: "https://support.google.com/a/answer/2466563?hl=en",
        kind: "web",
      },
      {
        label: "Turn on DKIM",
        url: "https://support.google.com/a/answer/180504?hl=en",
        kind: "web",
      },
    ],
    subs: [
      {
        id: "mb-1",
        text: "Add sending domains & create 3 mailboxes per (9 total)",
      },
      { id: "mb-2", text: "Easy way: first@, first.l@, first.last@ (× 3)" },
      { id: "mb-3", text: "Add profile pic to each (important)" },
      {
        id: "mb-4",
        text: "Add SPF, DMARC",
        links: [
          {
            label: "SPF",
            url: "https://support.google.com/a/answer/10684623?hl=en",
            kind: "web",
          },
          {
            label: "DMARC",
            url: "https://support.google.com/a/answer/2466563?hl=en",
            kind: "web",
          },
        ],
      },
      {
        id: "mb-5",
        text: "Set cal reminder for 48hrs and then add DKIM",
        links: [
          {
            label: "DKIM",
            url: "https://support.google.com/a/answer/180504?hl=en",
            kind: "web",
          },
        ],
      },
    ],
    blanks: [
      {
        id: "mailboxes_list",
        label: "Your 9 mailboxes",
        type: "list",
        count: 9,
        placeholder: "first@getyourbrand.com",
      },
      { id: "spf_dmarc_date", label: "SPF + DMARC added on", type: "date" },
      {
        id: "dkim_due",
        label: "DKIM due (48 hrs later)",
        type: "date",
        help: "Auto-suggested from the SPF date.",
      },
    ],
  },
  {
    id: "coldemail",
    asks: [
      "Draft a 4-email cold sequence for my niche using my positioning. Short, specific, no fluff.",
      "Review my warmup and volume plan — is my daily send target realistic for the number of mailboxes I have?",
    ],
    n: 8,
    phase: "channels",
    title: "Get Instantly or Smartlead and start warming mailboxes",
    source: "Get Instantly or Smartlead account and begin warming up mailboxes",
    effort: "2 hrs + 20 day warmup",
    why: "The 20-day warmup is the longest fixed delay on the whole board. Everything else can be done in parallel while this runs.",
    links: [
      {
        label: "Instantly",
        url: "https://secret.nicksaraev.com/instantly",
        kind: "web",
        note: "Automated outreach, deliverability network, B2B lead database, AI CRM.",
      },
      {
        label: "Smartlead",
        url: "https://www.smartlead.ai/",
        kind: "web",
        note: "Unlimited mailboxes & auto-rotating warmups.",
      },
    ],
    subs: [
      { id: "ce-1", text: "Connect all domains from previous step" },
      { id: "ce-2", text: "Turn on warmup and set cal reminder for 20 days" },
      {
        id: "ce-3",
        text: "Source first batch of leads using LI Sales Nav, Apollo, or alternative",
      },
      {
        id: "ce-4",
        text: "Enrich email addresses using Anymailfinder, DropContact, or alternative",
      },
      { id: "ce-5", text: "Add personalization using OpenAI or alternative" },
      {
        id: "ce-6",
        text: "Set up response templates/macros in Instantly/Smartlead",
      },
      {
        id: "ce-7",
        text: "After 20 days of warmups start campaign @ 30×9 = 270 emails/day",
      },
    ],
    blanks: [
      {
        id: "sending_tool",
        publicSafe: true,
        label: "Sending tool",
        type: "text",
        placeholder: "Instantly",
        profile: true,
      },
      {
        id: "warmup_start",
        label: "Warmup started on",
        type: "date",
        help: "Campaign launch is auto-computed as +20 days.",
      },
      {
        id: "lead_source",
        publicSafe: true,
        label: "Lead source",
        type: "text",
        placeholder: "LI Sales Nav / Apollo",
      },
      {
        id: "enrichment_tool",
        publicSafe: true,
        label: "Enrichment tool",
        type: "text",
        placeholder: "Anymailfinder",
      },
      {
        id: "daily_send_target",
        publicSafe: true,
        label: "Daily send target",
        type: "number",
        placeholder: "270",
      },
    ],
  },
  {
    id: "upwork",
    asks: [
      "Write my Upwork headline and the above-the-fold copy for my profile, using my positioning.",
      "Given my niche, which Upwork searches should I be trying to rank for, and how do I word things to hit them?",
    ],
    n: 9,
    phase: "channels",
    title: "Create an Upwork profile using best practices",
    effort: "3–4 hrs",
    why: "The only channel here that can produce a client this week rather than next month. Worth front-loading if you need revenue fast.",
    links: [
      {
        label: "Upwork",
        url: "https://secret.nicksaraev.com/upwork",
        kind: "web",
      },
      {
        label: "Upwork profile roasts",
        url: "https://www.skool.com/makemoneywithmake/ill-roast-your-upwork-profile",
        kind: "web",
      },
    ],
    subs: [
      {
        id: "uw-1",
        text: "Watch all Upwork roasts so you know best practices",
        links: [
          {
            label: "Upwork roasts",
            url: "https://www.skool.com/makemoneywithmake/ill-roast-your-upwork-profile",
            kind: "web",
          },
        ],
      },
      {
        id: "uw-2",
        text: "Create polished profile pic with bright background",
      },
      {
        id: "uw-3",
        text: "Optimize headline for relevant keywords to rank higher",
      },
      {
        id: "uw-4",
        text: "Write “above the fold”/“below the fold” copy to stand out",
      },
      { id: "uw-5", text: "Set pricing to a non-round number to stand out" },
      {
        id: "uw-6",
        text: "Add all fields—education, work history, portfolio pieces, projects",
      },
      {
        id: "uw-7",
        text: "Get your first 2 reviews from legitimate current clients (or ppl in your network)",
      },
    ],
    blanks: [
      {
        id: "upwork_url",
        label: "Profile URL",
        type: "url",
        placeholder: "https://upwork.com/freelancers/…",
      },
      {
        id: "upwork_headline",
        label: "Headline",
        type: "text",
        placeholder: "I build client onboarding systems for design studios",
      },
      {
        id: "upwork_rate",
        publicSafe: true,
        label: "Hourly rate (non-round)",
        type: "money",
        placeholder: "$87",
      },
    ],
  },
  {
    id: "communities",
    asks: [
      "Where would my niche actually hang out online? Name specific communities and tell me how to judge if they're active.",
      "Give me 6 thread ideas that solve real problems for this niche without pitching anything.",
    ],
    n: 10,
    phase: "channels",
    title: "Find 3 communities + set up a content calendar",
    source:
      "Find 3 communities to build brand presence in & set up content calendar",
    effort: "2 hrs setup, 3×/wk ongoing",
    why: "Slowest channel to pay off, highest trust when it does. The rule that makes it work: never pitch publicly.",
    links: [
      {
        label: "Community strategy video",
        url: "https://www.youtube.com/watch?v=6EDWkFlxRWI",
        kind: "youtube",
      },
    ],
    subs: [
      {
        id: "co-1",
        text: "Search on Google, Skool, Discord, Slack, Facebook, Telegram",
      },
      {
        id: "co-2",
        text: "Request to join as many as you can—you only need three",
      },
      {
        id: "co-3",
        text: "Ensure they’re reasonably active and not just spam pits",
      },
      {
        id: "co-4",
        text: "Read all top posts and identify problem areas for members",
      },
      {
        id: "co-5",
        text: "3×/wk, post a thread in the community where you solve those problems",
      },
      {
        id: "co-6",
        text: "Make sure all of your posts are value—no pitching services publically",
      },
      {
        id: "co-7",
        text: "When somebody leaves a comment, DM them and see if they need more help",
      },
      {
        id: "co-8",
        text: "Offer to book calls and show them how to do it themselves",
      },
    ],
    blanks: [
      {
        id: "communities_list",
        label: "Your 3 communities",
        type: "list",
        count: 3,
        placeholder: "Name — platform — URL",
        profile: true,
      },
      {
        id: "posting_days",
        publicSafe: true,
        label: "Posting days (3×/wk)",
        type: "text",
        placeholder: "Mon / Wed / Fri",
      },
      {
        id: "problem_areas",
        label: "Problem areas you saw in top posts",
        type: "textarea",
        placeholder: "The recurring complaints you can write threads about…",
      },
    ],
  },
  {
    id: "crm",
    asks: [
      "What is the genuinely minimum CRM setup for a solo operator with zero customers? Talk me out of over-building it.",
    ],
    n: 11,
    phase: "operations",
    title: "Set up a CRM on ClickUp, Monday, or alternative",
    effort: "1 hr",
    why: "Deliberately thin. The board warns against building a beautiful CRM that sits empty.",
    subs: [
      {
        id: "crm-1",
        text: "Keep this basic and flesh it out after you start acquiring customers",
      },
      {
        id: "crm-2",
        text: "Prioritize customers over admin. No use orchestrating a beautiful, grand CRM if it’s empty 24/7",
      },
    ],
    blanks: [
      {
        id: "crm_tool",
        publicSafe: true,
        label: "CRM tool",
        type: "text",
        placeholder: "ClickUp",
      },
      { id: "crm_url", label: "CRM URL", type: "url" },
    ],
  },
  {
    id: "proposal",
    asks: [
      "Draft a proposal template for a templated automation build in my niche, with the agreement folded in.",
    ],
    n: 12,
    phase: "operations",
    title: "Create a proposal template on PandaDoc or alternative",
    effort: "2 hrs",
    links: [
      {
        label: "Proposal template walkthrough",
        url: "https://www.youtube.com/watch?v=UVLeX600irk",
        kind: "youtube",
      },
    ],
    subs: [
      { id: "pr-1", text: "Start with a template, alter as needed" },
      {
        id: "pr-2",
        text: "Combine the “agreement” with the proposal so it’s always just 1 step",
      },
      {
        id: "pr-3",
        text: "Use payment integrations so customer gets an invoice immediately at signing",
      },
    ],
    blanks: [
      {
        id: "proposal_tool",
        publicSafe: true,
        label: "Proposal tool",
        type: "text",
        placeholder: "PandaDoc",
      },
      { id: "proposal_template_url", label: "Your template URL", type: "url" },
    ],
  },
  {
    id: "payments",
    asks: [
      "Explain Stripe invoices vs payments vs subscriptions for my situation, and tell me which I need first.",
    ],
    n: 13,
    phase: "operations",
    title: "Set up Stripe or an alternative payment processor",
    effort: "1 hr",
    links: [
      {
        label: "Stripe walkthrough",
        url: "https://www.youtube.com/watch?v=9N9zfiqRqjU",
        kind: "youtube",
      },
    ],
    subs: [
      {
        id: "pay-1",
        text: "If Stripe, learn to use it—invoice vs payments, subscription concepts, etc",
        links: [
          {
            label: "Stripe walkthrough",
            url: "https://www.youtube.com/watch?v=9N9zfiqRqjU",
            kind: "youtube",
          },
        ],
      },
    ],
    blanks: [
      {
        id: "payment_processor",
        publicSafe: true,
        label: "Processor",
        type: "text",
        placeholder: "Stripe",
      },
      {
        id: "payments_live",
        label: "First test payment succeeded on",
        type: "date",
      },
    ],
  },
  {
    id: "daily-sales",
    asks: [
      "Build me a realistic daily schedule across these three blocks that honestly fits in under two hours.",
      "I keep skipping the sales block. Diagnose why that happens and give me a fix that doesn't rely on willpower.",
    ],
    n: 14,
    phase: "engine",
    title: "Set daily calendar reminders to tackle sales systematically",
    effort: "< 2 hrs/day, forever",
    why: "This is the pivot point of the entire roadmap. Steps 1–13 are setup; this is the thing that produces money. The board is emphatic: at 0 customers your only priority is sales.",
    links: [
      {
        label: "Sales System video",
        url: "https://www.youtube.com/watch?v=3_p8yZsa3Uc",
        kind: "youtube",
        note: "Watch before you begin.",
      },
      { label: "Cal.com", url: "https://cal.com/", kind: "web" },
      { label: "Calendly", url: "https://calendly.com/", kind: "web" },
    ],
    subs: [
      { id: "ds-1", text: "At 0 customers your only priority is sales" },
      {
        id: "ds-2",
        text: "Misprioritization here is why 90%+ of businesses fail",
      },
      {
        id: "ds-3",
        text: "Every morning, apply to (minimum) 5 jobs on Upwork",
      },
      {
        id: "ds-4",
        text: "Every morning, afternoon, and evening, run through your cold email inbox",
      },
      {
        id: "ds-5",
        text: "Every morning, afternoon, and evening, run through community responses",
      },
      { id: "ds-6", text: "In total this should take you less than 2hrs/day" },
      { id: "ds-7", text: "Highest leverage 2hrs/day you’ll have" },
      {
        id: "ds-8",
        text: "Before you begin, watch the Sales System video and understand it",
        links: [
          {
            label: "Sales System video",
            url: "https://www.youtube.com/watch?v=3_p8yZsa3Uc",
            kind: "youtube",
          },
        ],
      },
      {
        id: "ds-9",
        text: "Then, set up a Cal.com or Calendly and get started",
        links: [
          { label: "Cal.com", url: "https://cal.com/", kind: "web" },
          { label: "Calendly", url: "https://calendly.com/", kind: "web" },
        ],
      },
    ],
    blanks: [
      {
        id: "booking_link",
        label: "Your booking link",
        type: "url",
        placeholder: "https://cal.com/you/30min",
        profile: true,
      },
      {
        id: "block_morning",
        label: "Morning block",
        type: "text",
        placeholder: "07:30 — Upwork ×5 + inbox + communities",
      },
      {
        id: "block_afternoon",
        label: "Afternoon block",
        type: "text",
        placeholder: "13:00 — inbox + communities",
      },
      {
        id: "block_evening",
        label: "Evening block",
        type: "text",
        placeholder: "18:00 — inbox + communities",
      },
    ],
  },
  {
    id: "time-first",
    asks: [
      "Help me plan the kickoff call, fulfilment, and delivery video for my first client, start to finish.",
    ],
    n: 15,
    phase: "first-client",
    title: "After first customer won, time project completion",
    effort: "Duration of project 1",
    why: "You cannot price the next project until you know what this one actually cost you in hours.",
    links: [
      {
        label: "Harvest",
        url: "https://secret.nicksaraev.com/harvest",
        kind: "web",
      },
      {
        label: "Fulfillment walkthrough",
        url: "https://www.youtube.com/watch?v=dVKYcbqlteo",
        kind: "youtube",
      },
    ],
    subs: [
      {
        id: "tf-1",
        text: "Once closed, track every minute spent on this project",
      },
      {
        id: "tf-2",
        text: "Use a tool like Harvest, Toggl, etc",
        links: [
          {
            label: "Harvest",
            url: "https://secret.nicksaraev.com/harvest",
            kind: "web",
          },
        ],
      },
      { id: "tf-3", text: "What you don’t track won’t improve" },
      {
        id: "tf-4",
        text: "Notepad is fine, you will build out a PM system later",
      },
      {
        id: "tf-5",
        text: "To manage: Kickoff call → project fulfillment → video deliverable → revisions (if needed)",
        links: [
          {
            label: "Fulfillment walkthrough",
            url: "https://www.youtube.com/watch?v=dVKYcbqlteo",
            kind: "youtube",
          },
        ],
      },
    ],
    blanks: [
      {
        id: "first_client",
        label: "First client",
        type: "text",
        placeholder: "Company name",
      },
      {
        id: "time_tracker",
        publicSafe: true,
        label: "Time tracker used",
        type: "text",
        placeholder: "Harvest / Toggl / Notepad",
      },
      { id: "first_close_date", label: "Closed on", type: "date" },
    ],
  },
  {
    id: "retro",
    asks: [
      "Analyse my hourly rate against Nick's $200/hr benchmark and name the two changes that would move it most.",
      "Run a proper retrospective with me on this project — ask me the questions I'd avoid asking myself.",
    ],
    n: 16,
    phase: "first-client",
    title: "Calculate hourly rate and perform a retrospective",
    effort: "1 hr",
    why: "The number this produces is the one metric the rest of the roadmap optimizes. The board’s target: north of $200/hr after about a dozen projects.",
    subs: [
      {
        id: "re-1",
        text: "How long did this take you? How much did you pitch?",
      },
      {
        id: "re-2",
        text: "Calculate $/hr. Be real here—the truth is important",
      },
      { id: "re-3", text: "2 qs: what went well? What could I have improved?" },
      {
        id: "re-4",
        text: "Your job is now to increase $/hr with every future project and to rinse/repeat",
      },
    ],
    blanks: [
      {
        id: "project_price",
        publicSafe: true,
        label: "What you charged",
        type: "money",
        placeholder: "4000",
      },
      {
        id: "project_hours",
        publicSafe: true,
        label: "Hours it actually took",
        type: "number",
        placeholder: "35",
      },
      { id: "went_well", label: "What went well?", type: "textarea" },
      {
        id: "could_improve",
        label: "What could I have improved?",
        type: "textarea",
      },
    ],
  },
  {
    id: "pm-system",
    asks: [
      "What's the minimum project-management structure for a solo operator who might hire later? Don't gold-plate it.",
    ],
    n: 17,
    phase: "first-client",
    title: "Set up a project management system",
    source:
      "Set up project management system on ClickUp, Monday, or alternative",
    effort: "3 hrs",
    why: "Sequenced after project #1 on purpose — building it earlier is procrastination dressed up as progress.",
    links: [
      {
        label: "ZenPilot template walkthrough",
        url: "https://www.youtube.com/watch?v=PpCsZ-NKhG8",
        kind: "youtube",
      },
    ],
    subs: [
      {
        id: "pm-1",
        text: "We don’t set this up before project #1 because it detracts from sales",
      },
      {
        id: "pm-2",
        text: "Use ZenPilot template or similar",
        links: [
          {
            label: "ZenPilot template",
            url: "https://www.youtube.com/watch?v=PpCsZ-NKhG8",
            kind: "youtube",
          },
        ],
      },
      {
        id: "pm-3",
        text: "This is needed if you want to scale team, (not as much if you’re freelancing)",
      },
    ],
    blanks: [
      {
        id: "pm_tool",
        publicSafe: true,
        label: "PM tool",
        type: "text",
        placeholder: "ClickUp",
      },
      { id: "pm_url", label: "PM workspace URL", type: "url" },
    ],
  },
  {
    id: "scale-10k",
    asks: [
      "Given exactly where I am, what would you focus on next to reach $10K/month? Rank by leverage.",
    ],
    n: 18,
    phase: "scale",
    title: "Scale customer acquisition until $10K revenue",
    effort: "Months",
    why: "No new mechanics here — this phase is pure repetition of steps 14–16. The work is not quitting.",
    subs: [
      { id: "s10-1", text: "Now you just rinse and repeat" },
      {
        id: "s10-2",
        text: "Prioritizing daily sales actions makes this straightforward",
      },
      {
        id: "s10-3",
        text: "Repeated retrospectives make this straightforward",
      },
      { id: "s10-4", text: "And at $200/hr $10K/mo is just 10-15 hrs/wk" },
      {
        id: "s10-5",
        text: "After a dozen projects, your hourly rate can easily exceed $200/hr",
      },
    ],
    blanks: [
      {
        id: "mrr_current",
        publicSafe: true,
        label: "Current monthly revenue",
        type: "money",
        placeholder: "0",
        profile: true,
        help: "Drives the progress meter on the dashboard.",
      },
      {
        id: "clients_delivered",
        publicSafe: true,
        label: "Projects delivered so far",
        type: "number",
        placeholder: "0",
      },
    ],
  },
  {
    id: "opt-sales",
    asks: [
      "Given my channel breakdown, which channel should I 10x, and what would 10x-ing it concretely look like?",
      "What could I automate in my own sales process so it survives more volume?",
    ],
    n: 19,
    phase: "scale",
    title: "Optimize sales funnel, prioritizing by ROI",
    effort: "Ongoing",
    why: "The hinge of the whole second half: what took you from $0→$10K is not what takes you from $10K→$25K.",
    subs: [
      {
        id: "os-1",
        text: "What took you from $0-$10K is different from what it takes to go from $10K→$25K",
      },
      {
        id: "os-2",
        text: "Former requires agility & consistency, latter requires systems",
      },
      {
        id: "os-3",
        text: "Look over all of your past sales. Where did they come from?",
      },
      { id: "os-4", text: "Break down by source and internal $/hr" },
      {
        id: "os-5",
        text: "Whatever has been working best: double down and 10x it",
      },
      {
        id: "os-6",
        text: "Perhaps you buy 10x the mailboxes. Or join 10x the communities. Or send 10x the Upwork apps",
      },
      {
        id: "os-7",
        text: "Then build infrastructure to automate this so you can manage it",
      },
      {
        id: "os-8",
        text: "I.e auto-draft email responses. Auto-generate step-by-step guides for communities. Hire someone to send UW apps so all you do is record. Etc",
      },
    ],
    blanks: [
      {
        id: "best_channel",
        publicSafe: true,
        label: "Highest-ROI channel so far",
        type: "text",
        placeholder: "Upwork / cold email / communities",
      },
      {
        id: "channel_breakdown",
        label: "Revenue by source, with $/hr",
        type: "textarea",
        placeholder: "Upwork: $6k @ $180/hr\nCold email: $3k @ $240/hr…",
      },
      {
        id: "tenx_plan",
        label: "What are you 10×-ing, concretely?",
        type: "textarea",
      },
    ],
  },
  {
    id: "opt-pm",
    asks: [
      "Where is my delivery most likely bottlenecked right now, and what system would fix it?",
    ],
    n: 20,
    phase: "scale",
    title: "Optimize project management, prioritizing by ROI",
    effort: "Ongoing",
    subs: [
      { id: "op-1", text: "Same principle applies" },
      {
        id: "op-2",
        text: "For every “success” or “failure” you’ve had, what is the root cause?",
      },
      {
        id: "op-3",
        text: "Identify bottlenecks in your PM and build systems to optimize",
      },
    ],
    blanks: [
      {
        id: "bottleneck",
        label: "Current biggest delivery bottleneck",
        type: "textarea",
      },
      {
        id: "root_causes",
        label: "Root causes of recent wins & losses",
        type: "textarea",
      },
    ],
  },
  {
    id: "scale-25k",
    asks: [
      "Solo, small team, or a non-service offer — argue each case for my situation, then recommend one.",
    ],
    n: 21,
    phase: "scale",
    title: "Scale customer acquisition until $25K revenue",
    effort: "Months",
    why: "The board’s honest caveat: solo at $25K you’re likely at 90%+ margins, and growing an agency is often less profitable than staying solo.",
    subs: [
      {
        id: "s25-1",
        text: "You can grow past $25K alone but it gets much more difficult",
      },
      {
        id: "s25-2",
        text: "Note that, if you’re solo, your $25K is probably at 90%+ margins. Very small % of businesses ever make more than this in profit.",
      },
      {
        id: "s25-3",
        text: "Keep in mind that in many cases growing an agency is less profitable than doing it yourself",
      },
      {
        id: "s25-4",
        text: "That said if you want to grow past $25K on your own you need to leverage network effects (like social media) or non-service offers (like communities, courses, etc—aka what I’m doing)",
      },
      { id: "s25-5", text: "Sit tight for the Scaling Past $25K/mo Roadmap" },
    ],
    blanks: [
      {
        id: "margin_estimate",
        publicSafe: true,
        label: "Your actual margin at this point",
        type: "text",
        placeholder: "e.g. 88%",
      },
      {
        id: "past25_plan",
        label: "Solo, team, or non-service offer?",
        type: "textarea",
        placeholder: "The board says this is a real fork. Which one, and why?",
      },
    ],
  },
];

export const SOURCE_URL =
  "https://whimsical.com/roadmap-to-25k-month-with-automation-P5K6f1h9YpY5ngzvCW93Pg";

export const TOTAL_SUBS = STEPS.reduce((n, s) => n + s.subs.length, 0);
export const TOTAL_BLANKS = STEPS.reduce(
  (n, s) =>
    n +
    (s.blanks ?? []).reduce(
      (m, b) => m + (b.type === "list" ? (b.count ?? 1) : 1),
      0,
    ),
  0,
);
