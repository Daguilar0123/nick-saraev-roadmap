"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SOURCE_URL } from "@/data/roadmap";
import { SHOWCASE } from "@/data/showcase";
import { setOverlay, useIsOverlay, useRoadmapState } from "@/lib/store";
import { decodeShare } from "@/lib/share";
import { showcaseToState } from "@/lib/showcase";
import { overall } from "@/lib/derive";
import { Dashboard } from "@/components/Dashboard";
import { RoadmapList } from "@/components/RoadmapList";
import { JourneyView } from "@/components/JourneyView";
import { DailyRitual } from "@/components/DailyRitual";
import { ProfileView } from "@/components/ProfileView";
import { ViewingBanner } from "@/components/ViewingBanner";
import { NICK_URL } from "@/components/Attribution";

type View = "dashboard" | "roadmap" | "journey" | "daily" | "profile";

const TABS: [View, string][] = [
  ["dashboard", "Dashboard"],
  ["roadmap", "Roadmap"],
  ["daily", "Daily ritual"],
  ["journey", "Customer journey"],
  ["profile", "Your business"],
];

export default function Home() {
  const s = useRoadmapState();
  const isOverlay = useIsOverlay();
  const o = overall(s);
  const [view, setView] = useState<View>("dashboard");
  const [focused, setFocused] = useState<number | null>(null);
  const [viewingLabel, setViewingLabel] = useState<string | null>(null);
  const [viewingBlurb, setViewingBlurb] = useState<string | undefined>();
  const headerRef = useRef<HTMLElement>(null);

  // Publish the sticky header's real height so globals.css can hold that much
  // room back from anything scrolled into view. It has to be measured rather
  // than hard-coded: the height moves with the viewport (narrow phones wrap the
  // tab row) and jumps again whenever the viewing banner is on screen.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const write = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${Math.round(el.getBoundingClientRect().height)}px`,
      );

    write();
    const ro = new ResizeObserver(write);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goto = useCallback((n: number) => {
    setView("roadmap");
    setFocused(n);
  }, []);

  // Switching tabs keeps the old scroll offset otherwise, which drops you into
  // the middle of the new view.
  const show = useCallback((v: View) => {
    setView(v);
    setFocused(null);
    window.scrollTo({ top: 0 });
  }, []);

  const openShowcase = useCallback(() => {
    if (!SHOWCASE) return;
    setOverlay(showcaseToState(SHOWCASE));
    setViewingLabel(SHOWCASE.label);
    setViewingBlurb(SHOWCASE.blurb);
    setView("dashboard");
    window.scrollTo({ top: 0 });
  }, []);

  const exitViewing = useCallback(() => {
    setViewingLabel(null);
    setViewingBlurb(undefined);
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  // A share link puts the whole run in the fragment; decode it on arrival.
  // Also listen for hashchange: pasting a share link while the page is already
  // open changes only the fragment, which does not reload anything.
  useEffect(() => {
    let cancelled = false;

    const load = () => {
      const hash = window.location.hash;
      if (!hash.startsWith("#s=")) return;
      decodeShare(hash.slice(3)).then((next) => {
        if (cancelled || !next) return;
        setOverlay(next);
        setViewingLabel("a shared run");
        setViewingBlurb("read-only — your own progress is untouched");
        setView("dashboard");
        window.scrollTo({ top: 0 });
      });
    };

    load();
    window.addEventListener("hashchange", load);
    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", load);
    };
  }, []);

  useEffect(() => {
    if (view !== "roadmap" || focused === null) return;
    const id = window.requestAnimationFrame(() => {
      document
        .getElementById(`step-${focused}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(id);
  }, [view, focused]);

  return (
    <div className="min-h-dvh">
      <header
        ref={headerRef}
        className="no-print sticky top-0 z-30 border-b border-ink-3 bg-ink-0/85 backdrop-blur-xl"
      >
        {isOverlay && viewingLabel && (
          <ViewingBanner
            label={viewingLabel}
            blurb={viewingBlurb}
            onExit={exitViewing}
          />
        )}

        <div className="mx-auto max-w-6xl px-4">
          {/* The meter shares the title's line rather than wrapping onto one of
              its own — on a phone that extra row pushed the sticky header past
              a fifth of the screen. The credit line keeps the full width so it
              still fits on one line. */}
          <div className="py-2.5 sm:py-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <h1 className="min-w-0 flex-1 truncate text-sm font-bold tracking-tight text-fog-0">
                Roadmap to $25K/Month With Automation
              </h1>

              <div className="flex shrink-0 items-center gap-2">
                {/* The dashboard ring says the same thing with more room, so
                    the bar itself is desktop-only and the phone keeps the
                    number. */}
                <div className="hidden h-1.5 w-28 overflow-hidden rounded-full bg-ink-3 sm:block">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-lift to-cash transition-[width] duration-500"
                    style={{ width: `${Math.round(o.ratio * 100)}%` }}
                  />
                </div>
                <span className="font-mono text-xs tabular-nums text-fog-2">
                  {Math.round(o.ratio * 100)}%
                </span>
              </div>
            </div>

            <p className="text-[11px] text-fog-3">
              by{" "}
              <a
                href={NICK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-fog-1"
              >
                Nick Saraev
              </a>
              {" · "}
              <a
                href={SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-fog-1"
              >
                original board ↗
              </a>
              {" · "}
              <span className="text-fog-3">
                unofficial reader&apos;s edition
              </span>
            </p>
          </div>

          <nav className="-mx-1 flex gap-1 overflow-x-auto pb-2">
            {TABS.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => show(id)}
                aria-current={view === id ? "page" : undefined}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[13px] font-medium transition ${
                  view === id
                    ? "bg-ink-3 text-fog-0"
                    : "text-fog-3 hover:bg-ink-2 hover:text-fog-1"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {view === "dashboard" && (
          <Dashboard
            onGoto={goto}
            onOpenShowcase={SHOWCASE && !isOverlay ? openShowcase : undefined}
            showcaseLabel={SHOWCASE?.label}
            showcaseBlurb={SHOWCASE?.blurb}
          />
        )}
        {view === "roadmap" && (
          <RoadmapList focused={focused} onFocus={setFocused} />
        )}
        {view === "journey" && <JourneyView />}
        {view === "daily" && <DailyRitual />}
        {view === "profile" && <ProfileView onGoto={goto} />}
      </main>

      <footer className="no-print mx-auto max-w-6xl px-4 pb-10 pt-4 text-[11px] leading-relaxed text-fog-3">
        Everything you type stays in this browser&apos;s local storage — nothing
        is sent anywhere. Export or share it from{" "}
        <button
          type="button"
          onClick={() => show("profile")}
          className="underline underline-offset-2 hover:text-fog-1"
        >
          Your business
        </button>
        .
      </footer>
    </div>
  );
}
