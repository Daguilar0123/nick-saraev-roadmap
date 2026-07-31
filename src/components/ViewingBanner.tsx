"use client";

import { useState } from "react";
import { useRoadmapActions, useRoadmapState, setOverlay } from "@/lib/store";

export function ViewingBanner({
  label,
  blurb,
  onExit,
}: {
  label: string;
  blurb?: string;
  onExit: () => void;
}) {
  const shown = useRoadmapState();
  const { importState } = useRoadmapActions();
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="no-print sticky top-0 z-40 border-b border-lift/30 bg-lift/12 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
        <div className="min-w-0 flex-1">
          <span className="text-[13px] font-semibold text-lift-soft">
            Viewing {label}
          </span>
          <span className="ml-2 text-[11px] text-fog-2">
            {blurb ?? "read-only — your own progress is untouched"}
          </span>
        </div>

        {confirming ? (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-warn">
              Replace your own progress with this?
            </span>
            <button
              type="button"
              onClick={() => {
                importState(shown);
                setConfirming(false);
                onExit();
              }}
              className="rounded-lg border border-warn/50 bg-warn/10 px-3 py-1 text-[11px] font-medium text-warn"
            >
              Yes, replace
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="rounded-lg border border-ink-4 px-3 py-1 text-[11px] text-fog-2"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="rounded-lg border border-ink-4 px-3 py-1 text-[11px] font-medium text-fog-1 transition hover:border-lift hover:text-fog-0"
            >
              Use as my starting point
            </button>
            <button
              type="button"
              onClick={() => {
                setOverlay(null);
                onExit();
              }}
              className="rounded-lg border border-ink-4 px-3 py-1 text-[11px] font-medium text-fog-2 transition hover:text-fog-0"
            >
              Back to mine
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
