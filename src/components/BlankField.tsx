"use client";

import type { Blank } from "@/data/types";
import { useIsOverlay, useRoadmapActions, useRoadmapState } from "@/lib/store";
import { blankKeys } from "@/lib/derive";

function inputType(t: Blank["type"]) {
  switch (t) {
    case "url":
      return "url";
    case "date":
      return "date";
    case "number":
      return "number";
    default:
      return "text";
  }
}

function Row({
  id,
  placeholder,
  type,
  hint,
}: {
  id: string;
  placeholder?: string;
  type: Blank["type"];
  hint?: string;
}) {
  const state = useRoadmapState();
  const { setBlank } = useRoadmapActions();
  const readOnly = useIsOverlay();
  const value = state.blanks[id] ?? "";
  const filled = value.trim().length > 0;

  if (type === "textarea") {
    return (
      <textarea
        className="field min-h-[5.5rem] resize-y font-sans"
        data-filled={filled}
        readOnly={readOnly}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setBlank(id, e.target.value)}
      />
    );
  }

  return (
    <div className="relative">
      {type === "money" && (
        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-fog-3">
          $
        </span>
      )}
      <input
        type={inputType(type)}
        className={`field ${type === "money" ? "pl-6" : ""} ${
          type === "url" ? "font-mono text-xs" : ""
        }`}
        data-filled={filled}
        readOnly={readOnly}
        placeholder={hint ?? placeholder}
        value={value}
        onChange={(e) => setBlank(id, e.target.value)}
        inputMode={
          type === "money" || type === "number" ? "decimal" : undefined
        }
      />
    </div>
  );
}

export function BlankField({ blank }: { blank: Blank }) {
  const keys = blankKeys(blank);
  const state = useRoadmapState();
  const filledCount = keys.filter((k) => (state.blanks[k] ?? "").trim()).length;

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label className="text-xs font-semibold tracking-wide text-fog-1">
          {blank.label}
          {blank.profile && (
            <span
              className="ml-1.5 rounded bg-lift/15 px-1 py-px align-middle text-[9px] font-bold uppercase tracking-wider text-lift-soft"
              title="Also shown in your business profile"
            >
              profile
            </span>
          )}
        </label>
        {keys.length > 1 && (
          <span className="shrink-0 font-mono text-[10px] text-fog-3">
            {filledCount}/{keys.length}
          </span>
        )}
      </div>

      {blank.type === "list" ? (
        <div className="grid gap-1.5">
          {keys.map((k, i) => (
            <Row
              key={k}
              id={k}
              type="text"
              placeholder={blank.placeholder}
              hint={`${i + 1}. ${blank.placeholder ?? ""}`}
            />
          ))}
        </div>
      ) : (
        <Row id={blank.id} type={blank.type} placeholder={blank.placeholder} />
      )}

      {blank.help && (
        <p className="mt-1 text-[11px] leading-relaxed text-fog-3">
          {blank.help}
        </p>
      )}
    </div>
  );
}
