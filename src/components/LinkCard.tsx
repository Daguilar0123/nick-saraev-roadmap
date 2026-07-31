"use client";

import { useState } from "react";
import type { LinkRef } from "@/data/types";
import { embedFor, hostOf } from "@/lib/links";

export function LinkCard({
  link,
  open,
  onToggle,
}: {
  link: LinkRef;
  open: boolean;
  onToggle: () => void;
}) {
  const embed = embedFor(link);
  const canEmbed = embed.mode !== "none";

  return (
    <div className="overflow-hidden rounded-lg border border-ink-3 bg-ink-1/60">
      <div className="flex items-start gap-3 p-3">
        <span
          aria-hidden
          className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-ink-3 text-[11px] font-semibold text-fog-2"
        >
          {embed.mode === "youtube" ? "▶" : embed.mode === "iframe" ? "▤" : "↗"}
        </span>

        <div className="min-w-0 flex-1">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate text-sm font-medium text-fog-0 underline decoration-ink-5 underline-offset-4 hover:decoration-lift"
          >
            {link.label}
          </a>
          <div className="mt-0.5 truncate font-mono text-[11px] text-fog-3">
            {hostOf(link.url)}
          </div>
          {link.note && (
            <p className="mt-1.5 text-xs leading-relaxed text-fog-2">
              {link.note}
            </p>
          )}
        </div>

        {canEmbed && (
          <button
            type="button"
            onClick={onToggle}
            className="no-print shrink-0 rounded-md border border-ink-4 px-2 py-1 text-[11px] font-medium text-fog-2 transition hover:border-lift hover:text-fog-0"
            aria-expanded={open}
          >
            {open ? "Hide" : "Preview"}
          </button>
        )}
      </div>

      {canEmbed && open && (
        <div className="no-print border-t border-ink-3 bg-ink-0 p-2">
          <div
            className="w-full overflow-hidden rounded-md bg-black"
            style={{
              aspectRatio: embed.mode === "youtube" ? "16 / 9" : "16 / 10",
            }}
          >
            <iframe
              src={embed.src}
              title={link.label}
              className="size-full border-0"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <p className="mt-1.5 px-1 text-[11px] text-fog-3">
            If this stays blank the source blocks embedding —{" "}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-fog-1"
            >
              open it directly
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}

export function LinkList({ links }: { links?: LinkRef[] }) {
  // Only one preview open at a time — an open embed takes the full row so
  // spreadsheets and videos aren't squeezed into a half-width column.
  const [openUrl, setOpenUrl] = useState<string | null>(null);
  if (!links?.length) return null;

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {links.map((l) => {
        const open = openUrl === l.url;
        return (
          <div
            key={l.url + l.label}
            className={open ? "sm:col-span-2" : undefined}
          >
            <LinkCard
              link={l}
              open={open}
              onToggle={() => setOpenUrl(open ? null : l.url)}
            />
          </div>
        );
      })}
    </div>
  );
}

/** Compact inline chips for links attached to a single sub-item. */
export function LinkChips({ links }: { links?: LinkRef[] }) {
  if (!links?.length) return null;
  return (
    <span className="ml-1.5 inline-flex flex-wrap gap-1 align-middle">
      {links.map((l) => (
        <a
          key={l.url + l.label}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          title={l.url}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 rounded border border-ink-4 bg-ink-2 px-1.5 py-0.5 text-[10px] font-medium text-fog-2 transition hover:border-lift hover:text-fog-0"
        >
          ↗ {l.label}
        </a>
      ))}
    </span>
  );
}
