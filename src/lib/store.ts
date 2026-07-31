"use client";

import { useCallback, useSyncExternalStore } from "react";

export type StepStatus = "todo" | "doing" | "done";

export interface RoadmapState {
  v: 1;
  /** step id -> status */
  steps: Record<string, StepStatus>;
  /** sub-item id -> checked */
  subs: Record<string, boolean>;
  /** blank id (or `${id}.${index}` for list blanks) -> value */
  blanks: Record<string, string>;
  /** step id -> freeform notes */
  notes: Record<string, string>;
  /** YYYY-MM-DD -> daily task ids completed that day */
  daily: Record<string, string[]>;
  updatedAt: string;
}

const KEY = "maker-zero-roadmap:v1";

export const EMPTY: RoadmapState = {
  v: 1,
  steps: {},
  subs: {},
  blanks: {},
  notes: {},
  daily: {},
  updatedAt: "",
};

let state: RoadmapState = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* quota or private mode — state stays in memory for this session */
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<RoadmapState>;
      state = { ...EMPTY, ...parsed, v: 1 };
    }
  } catch {
    /* corrupt payload — fall back to empty rather than crash the app */
  }
  emit();
}

function subscribe(cb: () => void) {
  hydrate();
  listeners.add(cb);

  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY || !e.newValue) return;
    try {
      state = { ...EMPTY, ...(JSON.parse(e.newValue) as RoadmapState) };
      emit();
    } catch {
      /* ignore malformed cross-tab writes */
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => state;
const getServerSnapshot = () => EMPTY;

function mutate(fn: (draft: RoadmapState) => RoadmapState) {
  state = { ...fn(state), updatedAt: new Date().toISOString() };
  persist();
  emit();
}

export function useRoadmapState() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useRoadmapActions() {
  const setStepStatus = useCallback((id: string, status: StepStatus) => {
    mutate((s) => ({ ...s, steps: { ...s.steps, [id]: status } }));
  }, []);

  const toggleSub = useCallback((id: string) => {
    mutate((s) => ({ ...s, subs: { ...s.subs, [id]: !s.subs[id] } }));
  }, []);

  const setSubs = useCallback((ids: string[], value: boolean) => {
    mutate((s) => {
      const next = { ...s.subs };
      for (const id of ids) next[id] = value;
      return { ...s, subs: next };
    });
  }, []);

  const setBlank = useCallback((id: string, value: string) => {
    mutate((s) => ({ ...s, blanks: { ...s.blanks, [id]: value } }));
  }, []);

  const setNote = useCallback((stepId: string, value: string) => {
    mutate((s) => ({ ...s, notes: { ...s.notes, [stepId]: value } }));
  }, []);

  const toggleDaily = useCallback((day: string, taskId: string) => {
    mutate((s) => {
      const cur = s.daily[day] ?? [];
      const next = cur.includes(taskId)
        ? cur.filter((t) => t !== taskId)
        : [...cur, taskId];
      return { ...s, daily: { ...s.daily, [day]: next } };
    });
  }, []);

  const importState = useCallback((incoming: unknown) => {
    if (!incoming || typeof incoming !== "object") return false;
    const candidate = incoming as Partial<RoadmapState>;
    mutate(() => ({ ...EMPTY, ...candidate, v: 1 }));
    return true;
  }, []);

  const reset = useCallback(() => {
    mutate(() => ({ ...EMPTY }));
  }, []);

  return {
    setStepStatus,
    toggleSub,
    setSubs,
    setBlank,
    setNote,
    toggleDaily,
    importState,
    reset,
  };
}

export function exportState(s: RoadmapState) {
  return JSON.stringify(s, null, 2);
}
