"use client";

import { JOURNEY, JOURNEY_INTRO, type JourneyNode } from "@/data/journey";
import { LinkList } from "./LinkCard";
import { SectionHeading } from "./Provenance";

const TONE: Record<string, string> = {
  start: "border-lift/50 bg-lift/12 text-lift-soft",
  loop: "border-warn/45 bg-warn/10 text-warn",
  decision: "border-[#3d9bff]/50 bg-[#3d9bff]/10 text-[#7ab8ff]",
  exit: "border-ink-5 bg-ink-2 text-fog-3",
  money: "border-cash/50 bg-cash/12 text-cash",
};

function Node({ node }: { node: JourneyNode }) {
  return (
    <div
      className={`rounded-lg border px-3 py-2.5 text-center text-[13px] font-medium leading-snug ${
        TONE[node.tone ?? ""] ?? "border-ink-4 bg-ink-2 text-fog-1"
      }`}
    >
      {node.label}
      {node.note && (
        <div className="mt-1 text-[10px] font-normal opacity-70">
          {node.note}
        </div>
      )}
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-1.5" aria-hidden>
      {label && <span className="mb-0.5 text-[10px] text-fog-3">{label}</span>}
      <span className="text-fog-3">↓</span>
    </div>
  );
}

export function JourneyView() {
  return (
    <div className="space-y-6">
      <section className="card p-6">
        <h2 className="text-2xl font-bold text-fog-0">
          The Automation Customer Journey
        </h2>
        <div className="mt-3 space-y-3">
          {JOURNEY_INTRO.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-fog-2">
              {p}
            </p>
          ))}
        </div>
      </section>

      {JOURNEY.map((section) => (
        <section key={section.id} className="card overflow-hidden">
          <header className="border-b border-ink-3 px-5 py-3">
            <h3 className="text-base font-semibold text-fog-0">
              <span className="mr-2 font-mono text-fog-3">{section.n}.</span>
              {section.title}
            </h3>
          </header>

          <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div>
              {section.id === "marketing" ? (
                <>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {section.nodes.map((n) => (
                      <Node key={n.id} node={n} />
                    ))}
                  </div>
                  <Arrow label="all six feed" />
                  <div className="rounded-lg border border-ink-4 bg-ink-2 px-3 py-2.5 text-center text-[13px] font-medium text-fog-1">
                    → Sales
                  </div>
                </>
              ) : section.id === "sales" ? (
                <div className="space-y-1">
                  <div className="grid grid-cols-2 items-center gap-3">
                    <Node node={section.nodes[1]} />
                    <Node node={section.nodes[0]} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="py-1 text-center text-[10px] text-fog-3">
                      ↑ rebook ↓ wait
                    </div>
                    <Arrow />
                  </div>
                  <div className="grid grid-cols-2 items-center gap-3">
                    <Node node={section.nodes[3]} />
                    <Node node={section.nodes[2]} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div />
                    <div className="flex items-center justify-between gap-2 py-1 text-[10px] text-fog-3">
                      <span>↓ proposal</span>
                      <span>opt out →</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-3">
                    <Node node={section.nodes[6]} />
                    <Node node={section.nodes[5]} />
                  </div>
                  <div className="pt-2">
                    <Node node={section.nodes[4]} />
                  </div>
                </div>
              ) : (
                <div>
                  {section.nodes.map((n, i) => (
                    <div key={n.id}>
                      {i > 0 && <Arrow />}
                      <Node node={n} />
                    </div>
                  ))}
                  <div className="mt-2 rounded-lg border border-dashed border-ink-5 px-3 py-2 text-center text-[11px] text-fog-3">
                    ↺ loops back into Sales — recurring revenue is priority #1
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {section.prose.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-fog-2">
                  {p}
                </p>
              ))}
              {!!section.links?.length && (
                <div className="pt-1">
                  <SectionHeading source="nick">Resources</SectionHeading>
                  <LinkList links={section.links} />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
