import { SOURCE_URL } from "@/data/roadmap";

export const NICK_URL = "https://www.youtube.com/@nicksaraev/videos";

/** Sits at the bottom of every view. The project is unofficial and should
 *  never be mistakable for something Nick published or endorsed. */
export function Attribution() {
  return (
    <section className="card p-5 text-xs leading-relaxed text-fog-2">
      <h3 className="mb-2 text-sm font-semibold text-fog-0">
        Credit where it&apos;s due
      </h3>
      <p>
        The roadmap itself — all 21 steps, every checklist item and every
        resource link — is the work of{" "}
        <a
          href={NICK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fog-0 underline decoration-ink-5 underline-offset-4 hover:decoration-lift"
        >
          Nick Saraev
        </a>
        , published as a public Whimsical board:{" "}
        <a
          href={SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fog-0 underline decoration-ink-5 underline-offset-4 hover:decoration-lift"
        >
          Roadmap to $25K/Month With Automation
        </a>
        . Go read the original, and go watch his videos — this is a way to
        <em> work through</em> his roadmap, not a replacement for it.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-ink-4 bg-ink-1/60 p-3">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-fog-2">
            Nick&apos;s, word for word
          </div>
          <ul className="space-y-0.5 text-[11px] leading-relaxed text-fog-3">
            <li>· All 21 step titles</li>
            <li>· Every checklist item beneath them (~90)</li>
            <li>· All 50 resource links, affiliate links included</li>
            <li>· The customer-journey flow and its prose</li>
          </ul>
        </div>
        <div className="rounded-lg border border-lift/25 bg-lift/8 p-3">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-lift-soft">
            Added by this edition
          </div>
          <ul className="space-y-0.5 text-[11px] leading-relaxed text-fog-3">
            <li>· Every fill-in-the-blank field (74 of them)</li>
            <li>· Reader&apos;s notes and effort estimates</li>
            <li>· The phase grouping (Foundation, Channels, …)</li>
            <li>· Computed values: positioning, dates, $/hr</li>
          </ul>
        </div>
      </div>

      <p className="mt-3 text-fog-3">
        Inside each step those two are badged, so you never have to guess which
        you&apos;re reading. Where a blank exists it&apos;s usually because
        Nick&apos;s own checklist implies one — step 1 tells you to pick a market
        segment, then a system type, then write &ldquo;I build X systems for Y
        niche&rdquo;. So this edition gives you three boxes and assembles the
        sentence. The narrowing is his; the boxes are ours.
      </p>

      <p className="mt-3 text-fog-3">
        This site is <strong className="text-fog-2">unofficial</strong> and is
        not affiliated with, endorsed by, or reviewed by Nick Saraev. It was
        built by a reader who wanted checkboxes. Resource links are preserved
        exactly as they appear on the board, including his affiliate links.
      </p>
    </section>
  );
}
