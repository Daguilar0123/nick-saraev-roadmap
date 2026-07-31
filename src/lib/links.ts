import type { LinkRef } from "@/data/types";

export type Embed =
  | { mode: "youtube"; src: string; ratio: "16/9" }
  | { mode: "iframe"; src: string; ratio: "4/3" }
  | { mode: "none" };

const YT = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/;
const YT_CHANNEL = /youtube\.com\/@[\w.-]+/;
const GDOC =
  /docs\.google\.com\/(spreadsheets|document|presentation)\/d\/([\w-]+)/;

/**
 * Most sites send X-Frame-Options / frame-ancestors and simply refuse to render
 * in an iframe, so only the two families known to embed cleanly get an inline
 * player. Everything else falls back to a link card.
 */
export function embedFor(link: LinkRef): Embed {
  const yt = link.url.match(YT);
  if (yt) {
    return {
      mode: "youtube",
      src: `https://www.youtube-nocookie.com/embed/${yt[1]}`,
      ratio: "16/9",
    };
  }

  const gdoc = link.url.match(GDOC);
  if (gdoc) {
    const [, kind, id] = gdoc;
    const path =
      kind === "presentation"
        ? "embed"
        : kind === "document"
          ? "preview"
          : "preview";
    return {
      mode: "iframe",
      src: `https://docs.google.com/${kind}/d/${id}/${path}`,
      ratio: "4/3",
    };
  }

  return { mode: "none" };
}

export function hostOf(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function faviconFor(url: string) {
  const host = hostOf(url);
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`;
}

export function isChannel(url: string) {
  return YT_CHANNEL.test(url);
}
