# Roadmap to $25K/Month With Automation — working copy

An interactive, fill-in-the-blanks version of Nick Saraev's Whimsical board
[*Roadmap to $25K/Month With Automation*](https://whimsical.com/roadmap-to-25k-month-with-automation-P5K6f1h9YpY5ngzvCW93Pg),
built so the roadmap can actually be *worked through* rather than read.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## What it does that the board doesn't

The board is a static picture. This turns it into a tool:

| | |
|---|---|
| **Fill in the blanks** | 74 structured fields across the 21 steps — your niche, domains, the 9 mailbox addresses, your rate, your revenue. Filled fields turn green; every step shows `n/m blanks filled`. |
| **Computed values** | Things the board implies but never states: your positioning sentence assembles from two words; DKIM's due date is SPF + 48hrs; the cold-email campaign launch is warmup + 20 days; your realised hourly rate is price ÷ hours, checked against the board's $200/hr benchmark. |
| **Embedded resources** | 50 links pulled off the board. YouTube videos and Google Sheets/Docs play and render inline; everything else is a card that opens in a new tab (most sites refuse to be framed). |
| **Daily ritual** | Step 14 is the only step that repeats forever, so it gets its own view — three time blocks, a streak counter, and a 35-day heat grid. |
| **Progress** | Per-step, per-phase and overall, plus a revenue meter with the $10K (step 18) and $25K (step 21) milestones marked. |
| **Customer journey** | The board's left half — lead gen → sales → fulfilment — with all of its prose. |

Everything is stored in `localStorage` under `maker-zero-roadmap:v1`. Nothing
leaves the browser. **Your business → Export JSON** backs it up or moves it to
another machine.

## Structure

```
src/data/roadmap.ts    21 steps, ~90 sub-items, 50 links — verbatim from the board
src/data/journey.ts    the customer-journey flow + the daily ritual
src/lib/store.ts       localStorage state (useSyncExternalStore, cross-tab sync)
src/lib/derive.ts      computed values: positioning, dates, $/hr, streaks
src/lib/links.ts       which URLs can be safely iframed
src/components/        StepCard, Dashboard, DailyRitual, JourneyView, ProfileView
```

### Source fidelity

In `roadmap.ts`, `title` / `source` / `subs` / `links` are the board's own
words. The `why`, `effort`, `blanks` and phase grouping are **editorial
additions** — kept in separate fields so the original stays auditable against
the Whimsical source.

Two notes on the source itself:

- Nick calls it a "110-step roadmap". It resolves to **21 major steps** with
  ~90 sub-items beneath them; the 110 count only works if you add the two
  together.
- Several links are affiliate redirects (`secret.nicksaraev.com/*`). They're
  preserved as-is rather than rewritten.

### Re-extracting from Whimsical

The board is a public share link viewed as a guest, so the Whimsical MCP can't
see it (`fetch` → "Item not found") and WebFetch only returns the title. The
working method is Claude-in-Chrome plus the page's own
`window.app.js_api.getObjectsByType('shape' | 'text' | 'frame' | 'connector')`;
each object carries `data.content` and `data.rect`, and sorting by `rect.y`
then `rect.x` reconstructs reading order. See the first commit for the full
write-up and the two gotchas (CSP blocks localhost fetches; tool output
truncates near 1KB).
