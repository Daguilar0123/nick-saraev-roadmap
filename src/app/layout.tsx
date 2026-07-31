import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://daguilar0123.github.io/nick-saraev-roadmap/";

/*
 * SEO notes:
 * - The title keeps the roadmap's real, searched-for name and adds the honest
 *   qualifier — this is an UNOFFICIAL reader's edition, and every layer of
 *   metadata says so. Attribution to Nick Saraev lives in the JSON-LD as
 *   author of the SOURCE work (isBasedOn), never of this site.
 * - Keywords are grounded in what the roadmap actually contains (cold email,
 *   Make.com, Instantly, Smartlead, Apollo, Upwork — verified against the
 *   step data), not guessed.
 * - No geo.* tags and no homeLocation: this page is not about a place, so
 *   locality buys nothing in search — it would only publish a personal
 *   address. The author entity carries the identity link to
 *   receiptsnotvibes.ai instead, which is the part that actually helps.
 */

const OG_IMAGE = {
  url: `${SITE_URL}og-card.png`,
  width: 1200,
  height: 630,
  alt: "A luminous stepped path of nodes climbing from deep violet at the lower left to a bright green summit at the upper right — the 21 steps of the roadmap.",
};
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Roadmap to $25K/Month With Automation — Interactive Checklist (Unofficial Reader's Edition)",
  description:
    "An interactive, fill-in-the-blanks edition of Nick Saraev's automation-agency roadmap — 21 steps, ~90 checklist items, every resource embedded: cold email, Make.com, Instantly, Smartlead, Apollo, Upwork. Unofficial; no server, no account — everything stays in your browser.",
  keywords: [
    "nick saraev roadmap",
    "roadmap to 25k a month with automation",
    "automation agency roadmap",
    "start an automation agency",
    "AI automation business",
    "make.com automation",
    "cold email outreach roadmap",
    "instantly smartlead apollo",
    "upwork automation clients",
    "interactive roadmap checklist",
    "fill in the blanks roadmap",
  ],
  authors: [{ name: "Daniel Aguilar", url: "https://receiptsnotvibes.ai/about" }],
  creator: "Daniel Aguilar",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title:
      "Roadmap to $25K/Month With Automation — Interactive Checklist (Unofficial Reader's Edition)",
    description:
      "Nick Saraev's automation-agency roadmap as an interactive working copy — 21 steps, ~90 checklist items, every resource embedded. Unofficial; everything stays in your browser.",
    url: SITE_URL,
    siteName: "Roadmap to $25K/Month With Automation — Reader's Edition",
    type: "website",
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    // summary_large_image, not summary: with a real 1200x630 card the wide
    // format is the whole point.
    card: "summary_large_image",
    title: "Roadmap to $25K/Month With Automation — Interactive Checklist",
    description:
      "An unofficial, fill-in-the-blanks reader's edition of Nick Saraev's roadmap. 21 steps, ~90 items, everything saves in your browser.",
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#08090c",
};

/**
 * JSON-LD: the app, the source work it's based on, and both people —
 * Nick Saraev as author of the SOURCE (honest attribution, no implied
 * endorsement), Daniel Aguilar as author of this edition, linked to his own
 * site's entity graph.
 */
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}#app`,
      name: "Roadmap to $25K/Month With Automation — unofficial interactive reader's edition",
      url: SITE_URL,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web browser",
      isAccessibleForFree: true,
      description:
        "An interactive, fill-in-the-blanks working copy of the automation-agency roadmap: 21 steps, ~90 checklist items, progress and answers stored locally in the browser.",
      image: `${SITE_URL}og-card.png`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@id": `${SITE_URL}#daniel` },
      isBasedOn: { "@id": `${SITE_URL}#source` },
    },
    {
      "@type": "CreativeWork",
      "@id": `${SITE_URL}#source`,
      name: "Roadmap to $25K/Month With Automation",
      url: "https://whimsical.com/roadmap-to-25k-month-with-automation-P5K6f1h9YpY5ngzvCW93Pg",
      author: { "@id": `${SITE_URL}#nick` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}#nick`,
      name: "Nick Saraev",
      url: "https://nicksaraev.com",
      sameAs: ["https://www.youtube.com/@nicksaraev"],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}#daniel`,
      name: "Daniel Aguilar",
      url: "https://receiptsnotvibes.ai/about",
      sameAs: [
        "https://github.com/Daguilar0123",
        "https://receiptsnotvibes.ai",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          // Serialized from the literal above — no user input passes through.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
        {children}
      </body>
    </html>
  );
}
