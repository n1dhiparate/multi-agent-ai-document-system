"use client";

import { useEffect, useRef, useState } from "react";

import { ScrollTrigger, gsap } from "@/lib/gsap";

type ArchitectureStage = Readonly<{
  label: string;
  description: string;
  detail: string;
}>;

const architectureStages: readonly ArchitectureStage[] = [
  {
    label: "PDF Upload",
    description: "A source document enters the system through the upload interface.",
    detail: "The workflow starts with a PDF payload and metadata prepared for ingestion.",
  },
  {
    label: "Text Extraction",
    description: "Raw document text is parsed from pages, tables, and document structure.",
    detail: "The backend normalizes extracted content so downstream agents receive clean context.",
  },
  {
    label: "Chunking",
    description: "Long documents are split into retrievable semantic sections.",
    detail: "Chunks preserve meaning while keeping retrieval fast and token usage controlled.",
  },
  {
    label: "Embeddings",
    description: "Each chunk becomes a vector representation for semantic search.",
    detail: "Embedding vectors let the system find relevant evidence instead of matching keywords only.",
  },
  {
    label: "ChromaDB",
    description: "Vectors and source metadata are stored for retrieval-augmented generation.",
    detail: "ChromaDB acts as the knowledge layer for agent research and citation lookup.",
  },
  {
    label: "Research Agent",
    description: "The research agent retrieves evidence and extracts the strongest findings.",
    detail: "Relevant chunks are ranked, grouped, and converted into usable insight notes.",
  },
  {
    label: "Planner Agent",
    description: "The planner turns research into a structured report outline.",
    detail: "Sections, argument flow, and report priorities are arranged before drafting.",
  },
  {
    label: "Writer Agent",
    description: "The writer agent drafts the professional report from the plan.",
    detail: "The draft combines retrieved evidence with clear executive communication.",
  },
  {
    label: "Reviewer Agent",
    description: "The reviewer checks quality, clarity, and factual consistency.",
    detail: "The system tightens wording, resolves weak sections, and improves readability.",
  },
  {
    label: "Citation Agent",
    description: "The citation agent maps claims back to source references.",
    detail: "References are normalized so the final report is traceable and credible.",
  },
  {
    label: "Professional Report",
    description: "The finished report is ready for review, export, or delivery.",
    detail: "The pipeline culminates in a polished document backed by source-aware AI agents.",
  },
] as const;

export function SystemArchitectureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nodeRefs = useRef<Array<HTMLLIElement | null>>([]);
  const connectorRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.set(nodeRefs.current, { autoAlpha: 0.46, y: 18 });
      gsap.set(nodeRefs.current[0], { autoAlpha: 1, y: 0 });
      gsap.set(connectorRefs.current, { scaleY: 0, transformOrigin: "top center" });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          end: "bottom 28%",
          scrub: 0.7,
          onUpdate: ({ progress }) => {
            const nextStage = Math.min(
              architectureStages.length - 1,
              Math.floor(progress * architectureStages.length),
            );
            setActiveStage(nextStage);
          },
        },
      });

      architectureStages.forEach((_, index) => {
        timeline.to(nodeRefs.current[index], { autoAlpha: 1, y: 0, duration: 0.18 }, index);

        if (index > 0) {
          timeline.to(nodeRefs.current[index - 1], { autoAlpha: 0.72, y: -4, duration: 0.18 }, index);
        }

        if (index < connectorRefs.current.length) {
          timeline.to(connectorRefs.current[index], { scaleY: 1, duration: 0.56 }, index + 0.12);
        }
      });
    }, sectionRef);

    return () => {
      context.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  const active = architectureStages[activeStage];
  const progress = Math.round(((activeStage + 1) / architectureStages.length) * 100);

  return (
    <section
      ref={sectionRef}
      id="architecture"
      className="relative overflow-hidden bg-[#09090B] px-6 py-24 text-[#FAFAFA] sm:px-8 lg:px-12"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(20,184,166,0.11),transparent_30%),radial-gradient(circle_at_18%_76%,rgba(250,250,250,0.055),transparent_28%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-16 lg:h-fit">
          <div className="mb-5 inline-flex rounded-full border border-[#14B8A6]/25 bg-[#18181B]/70 px-4 py-2 text-sm font-medium text-[#14B8A6] backdrop-blur-xl">
            System Architecture
          </div>
          <h2 className="max-w-xl text-4xl font-bold leading-tight text-[#FAFAFA] sm:text-5xl">
            From uploaded PDF to source-aware professional report.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
            The architecture combines document ingestion, vector retrieval, and specialized AI
            agents into one explainable pipeline.
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-[#18181B]/72 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-[#14B8A6]">Active stage</p>
              <p className="text-sm text-zinc-400">{progress}%</p>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-[#FAFAFA]">{active.label}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-300">{active.description}</p>
            <div className="mt-5 grid grid-cols-11 gap-1">
              {architectureStages.map((stage, index) => (
                <div
                  key={stage.label}
                  className={[
                    "h-2 rounded-full transition-colors duration-300",
                    index <= activeStage
                      ? "bg-[#14B8A6] shadow-[0_0_18px_rgba(20,184,166,0.5)]"
                      : "bg-white/10",
                  ].join(" ")}
                />
              ))}
            </div>
            <p className="mt-5 rounded-2xl border border-white/10 bg-[#09090B]/65 p-4 text-sm leading-6 text-zinc-400">
              {active.detail}
            </p>
          </div>
        </div>

        <ol className="relative grid gap-0 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-1">
          {architectureStages.map((stage, index) => {
            const isActive = activeStage === index;
            const isComplete = activeStage > index;

            return (
              <li
                key={stage.label}
                ref={(element) => {
                  nodeRefs.current[index] = element;
                }}
                className="relative pb-5 last:pb-0 sm:pb-7 lg:pb-5"
              >
                <div
                  className={[
                    "relative overflow-hidden rounded-2xl border p-4 backdrop-blur-xl transition-colors duration-300 sm:p-5",
                    isActive
                      ? "border-[#14B8A6]/60 bg-[#18181B]/95 shadow-[0_0_55px_rgba(20,184,166,0.18)]"
                      : "border-white/10 bg-[#18181B]/58",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "absolute inset-y-0 left-0 w-1 transition-colors duration-300",
                      isActive || isComplete ? "bg-[#14B8A6]" : "bg-white/10",
                    ].join(" ")}
                  />
                  <div className="flex items-start justify-between gap-4 pl-2">
                    <div>
                      <p className="text-sm font-medium text-zinc-500">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-[#FAFAFA]">{stage.label}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                        {isActive ? stage.description : isComplete ? "Completed" : "Queued"}
                      </p>
                    </div>
                    <span
                      className={[
                        "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                        isActive || isComplete
                          ? "border-[#14B8A6]/50 bg-[#14B8A6]/15 text-[#14B8A6]"
                          : "border-white/10 bg-white/5 text-zinc-500",
                      ].join(" ")}
                    >
                      {isComplete ? "\u2713" : "\u2193"}
                    </span>
                  </div>
                </div>

                {index < architectureStages.length - 1 ? (
                  <div className="ml-7 h-9 w-px overflow-hidden bg-white/10 sm:ml-8 lg:ml-7">
                    <div
                      ref={(element) => {
                        connectorRefs.current[index] = element;
                      }}
                      className="h-full w-px bg-[#14B8A6] shadow-[0_0_24px_rgba(20,184,166,0.85)]"
                    />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
