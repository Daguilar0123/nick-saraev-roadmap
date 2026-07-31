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
      <p className="mt-3 text-fog-3">
        This site is <strong className="text-fog-2">unofficial</strong> and is
        not affiliated with, endorsed by, or reviewed by Nick Saraev. It was
        built by a reader who wanted checkboxes. Resource links are preserved
        exactly as they appear on the board, including his affiliate links.
      </p>
    </section>
  );
}
