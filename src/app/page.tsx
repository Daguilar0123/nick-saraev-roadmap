"use client";

import { useCallback, useEffect, useState } from "react";
import { SOURCE_URL } from "@/data/roadmap";
import { useRoadmapState } from "@/lib/store";
import { overall } from "@/lib/derive";
import { Dashboard } from "@/components/Dashboard";
import { RoadmapList } from "@/components/RoadmapList";
import { JourneyView } from "@/components/JourneyView";
import { DailyRitual } from "@/components/DailyRitual";
import { ProfileView } from "@/components/ProfileView";

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
  const o = overall(s);
  const [view, setView] = useState<View>("dashboard");
  const [focused, setFocused] = useState<number | null>(null);

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
      <header className="no-print sticky top-0 z-30 border-b border-ink-3 bg-ink-0/85 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
            <div className="min-w-0">
              <h1 className="truncate text-sm font-bold tracking-tight text-fog-0">
                Roadmap to $25K/Month With Automation
              </h1>
              <a
                href={SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-fog-3 underline underline-offset-2 hover:text-fog-1"
              >
                after the Whimsical board by Nick Saraev ↗
              </a>
            </div>

            <div className="grow" />

            <div className="flex items-center gap-2">
              <div className="h-1.5 w-28 overflow-hidden rounded-full bg-ink-3">
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
        {view === "dashboard" && <Dashboard onGoto={goto} />}
        {view === "roadmap" && <RoadmapList focused={focused} onFocus={setFocused} />}
        {view === "journey" && <JourneyView />}
        {view === "daily" && <DailyRitual />}
        {view === "profile" && <ProfileView onGoto={goto} />}
      </main>

      <footer className="no-print mx-auto max-w-6xl px-4 pb-10 pt-4 text-[11px] leading-relaxed text-fog-3">
        Everything you type stays in this browser&apos;s local storage — nothing is sent
        anywhere. Export from{" "}
        <button
          type="button"
          onClick={() => show("profile")}
          className="underline underline-offset-2 hover:text-fog-1"
        >
          Your business
        </button>{" "}
        to back it up or move machines.
      </footer>
    </div>
  );
}
