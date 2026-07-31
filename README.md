# Nick Saraev's $25K/Month Automation Roadmap — an interactive edition

**[→ Use it live](https://daguilar0123.github.io/nick-saraev-roadmap/)**

An interactive, fill-in-the-blanks version of Nick Saraev's Whimsical board
[*Roadmap to $25K/Month With Automation*](https://whimsical.com/roadmap-to-25k-month-with-automation-P5K6f1h9YpY5ngzvCW93Pg)
— so you can actually *work through* the roadmap instead of reading a picture of it.

> **Unofficial.** The roadmap is Nick Saraev's work. This site is not affiliated
> with, endorsed by, or reviewed by him. Go
> [read the original board](https://whimsical.com/roadmap-to-25k-month-with-automation-P5K6f1h9YpY5ngzvCW93Pg)
> and [watch his videos](https://www.youtube.com/@nicksaraev/videos) — this is a
> way to work through his roadmap, not a replacement for it. Every resource link
> is preserved exactly as it appears on the board, including his affiliate links.

Nothing you type leaves your browser. There is no server, no account, no
analytics, no database — it's a static site plus `localStorage`.

## What it adds

| | |
|---|---|
| **Fill in the blanks** | 74 structured fields across the 21 steps — your niche, domains, the 9 mailbox addresses, your rate, your revenue. Filled fields turn green. |
| **Computed values** | Things the roadmap implies but never states: your positioning sentence assembles from two words; DKIM's due date is SPF + 48hrs; the cold-email campaign launch is warmup + 20 days; your hourly rate is price ÷ hours, checked against Nick's $200/hr benchmark. |
| **Embedded resources** | All 50 links from the board. YouTube and Google Sheets/Docs play and render inline; everything else opens in a new tab. |
| **Daily ritual** | Step 14 is the only step that repeats forever, so it gets its own view — three time blocks, a streak counter, a 35-day heat grid. |
| **Customer journey** | The board's left half — lead gen → sales → fulfilment — with all of its prose. |
| **Sharing** | Export/import JSON, or generate a link that carries your whole run in the URL fragment. |

## Make it your own

You don't need to fork it to use it — just
[open the live site](https://daguilar0123.github.io/nick-saraev-roadmap/) and start
filling it in. Fork it if you want to change the content, host your own copy, or
publish your own worked example.

1. **Fork this repo** (or use it as a template).
2. In your fork: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The workflow builds and publishes to
   `https://<your-username>.github.io/<your-repo>/`.

The base path is derived from your repo name at build time, so **you don't have
to edit any config** — a fork just works. (Naming the repo
`<your-username>.github.io` serves it from the domain root instead.)

Locally:

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # static export into out/
```

## Sharing your progress

Two different mechanisms, deliberately:

**Share a private link** (*Your business → Share a private link*) encodes your
**entire** run — including your notes — into the URL fragment. Nothing is
uploaded; the link *is* the data. Anyone holding it sees everything, so treat it
like a password. Opening one shows it read-only over your own progress, with
"Use as my starting point" / "Back to mine".

**Publish a worked example** (*Your business → Publish a worked example*)
generates `src/data/showcase.ts` for the live site. It is safe by
*construction*, not by filtering:

- The `Showcase` type **has no `notes` field**, so private notes can never be
  published no matter what you tick.
- Blanks are opt-in. Only ones flagged `publicSafe` (tool choices, headline
  figures) are pre-ticked; anything identifying — domains, mailboxes, URLs,
  client names, your niche, free-text reflections — is unticked and badged
  `REVIEW`.
- A secret scanner flags API keys, tokens, emails and card-like numbers before
  you copy anything.

Forks ship with `SHOWCASE = null`. A published example is only ever a read-only
example view — it never becomes a visitor's starting state.

## Structure

```
src/data/roadmap.ts    21 steps, ~90 sub-items, 50 links — verbatim from the board
src/data/journey.ts    the customer-journey flow + the daily ritual
src/data/showcase.ts   published worked example (null by default)
src/lib/store.ts       localStorage state, cross-tab sync, read-only overlay
src/lib/derive.ts      computed values: positioning, dates, $/hr, streaks
src/lib/share.ts       URL-fragment encoding + secret scanning
src/lib/showcase.ts    the publishable subset and its safe-list
src/lib/links.ts       which URLs can safely be iframed
```

### Source fidelity

In `roadmap.ts`, `title` / `source` / `subs` / `links` are Nick's own words. The
`why`, `effort`, `blanks` and phase grouping are **editorial additions** by this
project — kept in separate fields, and labelled in the UI as
"Reader's note · not Nick's words" so nobody has to guess which is which.

Two notes on the source:

- Nick calls it a "110-step roadmap". It resolves to **21 major steps** with
  ~90 sub-items beneath them; 110 only works if you count both together.
- Several links are affiliate redirects (`secret.nicksaraev.com/*`), preserved
  as-is rather than rewritten.

### Re-extracting from Whimsical

The board is a public share link viewed as a guest, so the Whimsical MCP can't
see it (`fetch` → "Item not found") and fetching the URL returns only the title.
What works is driving a browser and using the page's own
`window.app.js_api.getObjectsByType('shape' | 'text' | 'frame' | 'connector')`;
each object carries `data.content` and `data.rect`, and sorting by `rect.y` then
`rect.x` reconstructs reading order. See the first commit for the full write-up.

## Licence

Application code: MIT (see `LICENSE`).

The roadmap **content** — step titles, checklist items, prose and resource links
— is Nick Saraev's and is reproduced here under his public sharing of the board.
It is not covered by the MIT licence and is not mine to relicense. If you're
Nick and you'd rather this didn't exist, open an issue and I'll take it down.
