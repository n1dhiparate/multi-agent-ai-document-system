"use client";

import { useEffect, useRef, useState } from "react";

import {  gsap } from "@/lib/gsap";

type AgentStep = Readonly<{
  name: string;
  status: string;
  documentTitle: string;
  documentBody: string;
  output: string;
}>;

const agentSteps: readonly AgentStep[] = [
  {
    name: "Research Agent",
    status: "Extracting insights...",
    documentTitle: "Research Notes",
    documentBody: "Key concepts, source fragments, and evidence clusters are being extracted from the uploaded PDF.",
    output: "Source map generated with priority findings and semantic references.",
  },
  {
    name: "Planner Agent",
    status: "Planning structure...",
    documentTitle: "Report Outline",
    documentBody: "The system is organizing the research into a logical executive structure with sections and dependencies.",
    output: "Narrative plan, section order, and argument flow are ready.",
  },
  {
    name: "Writer Agent",
    status: "Drafting report...",
    documentTitle: "Draft Report",
    documentBody: "A professional report draft is being written from the outline, maintaining context from every source.",
    output: "First draft assembled with introduction, analysis, recommendations, and summary.",
  },
  {
    name: "Reviewer Agent",
    status: "Reviewing quality...",
    documentTitle: "Reviewed Draft",
    documentBody: "The draft is being checked for clarity, completeness, factual consistency, and executive readability.",
    output: "Quality pass complete with tightened language and resolved gaps.",
  },
  {
    name: "Citation Agent",
    status: "Finalizing citations...",
    documentTitle: "Finished Report",
    documentBody: "Citations are attached, references are normalized, and the finished report is prepared for export.",
    output: "Publication-ready report with verified citations and clean formatting.",
  },
] as const;

type AgentWorkflowSectionProps = {
  isGenerating: boolean;
  workflowStage: number;
};

export function AgentWorkflowSection({
  isGenerating,
  workflowStage,
}: AgentWorkflowSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const agentRefs = useRef<Array<HTMLLIElement | null>>([]);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const previewRef = useRef<HTMLDivElement>(null);
 

  useEffect(() => {
  agentRefs.current.forEach((card, index) => {
    if (!card) return;

    gsap.to(card, {
  autoAlpha: index < workflowStage ? 1 : 0.6,
  y: index < workflowStage ? -4 : 0,
  duration: 0.4,
});
  });

  lineRefs.current.forEach((line, index) => {
    if (!line) return;

    gsap.to(line, {
      scaleY: index < workflowStage ? 1 : 0,
      duration: 0.4,
      transformOrigin: "top center",
    });
  });

  
}, [workflowStage , isGenerating]);
  const stageIndex = Math.max(
  0,
  Math.min(workflowStage - 1, agentSteps.length - 1)
);

const activeAgent = agentSteps[stageIndex];
const completedSteps = agentSteps.slice(0, stageIndex + 1);

  return (
    <section
  id="workflow"
  ref={sectionRef}
  className="relative flex min-h-screen overflow-hidden bg-[#09090B] px-6 py-10 text-[#FAFAFA] sm:px-8 lg:h-screen lg:px-12"
>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(20,184,166,0.12),transparent_28%),radial-gradient(circle_at_82%_62%,rgba(250,250,250,0.06),transparent_32%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(360px,0.72fr)_minmax(0,1fr)]">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-[#14B8A6]/25 bg-[#18181B]/70 px-4 py-2 text-sm font-medium text-[#14B8A6] backdrop-blur-xl">
            Multi-Agent Workflow
          </div>
          <h2 className="max-w-xl text-4xl font-bold leading-tight text-[#FAFAFA] sm:text-5xl">
            Watch specialized agents build a report step by step.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
            Scroll through the orchestration pipeline as each agent completes one precise part of
            the document intelligence workflow.
          </p>

          <ol className="mt-8 space-y-0">
            {agentSteps.map((agent, index) => {

const isWorkflowComplete =
    workflowStage >= 6;

const isActive =
  !isWorkflowComplete && stageIndex === index;

const isComplete =
  isWorkflowComplete || stageIndex > index;

              return (
                <li
                  key={agent.name}
                  ref={(element) => {
                    agentRefs.current[index] = element;
                  }}
                  className="relative pb-4 last:pb-0"
                >
                  <div
                    className={[
                      "relative rounded-2xl border p-4 backdrop-blur-xl transition-colors duration-300",
                      isActive
                        ? "border-[#14B8A6]/55 bg-[#18181B]/95 shadow-[0_0_55px_rgba(20,184,166,0.18)]"
                        : "border-white/10 bg-[#18181B]/58",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold text-[#FAFAFA]">{agent.name}</p>
                        <p className="mt-1 text-sm text-zinc-400">
                          {isActive ? agent.status : isComplete ? "Step complete" : "Waiting for context"}
                        </p>
                      </div>
                      <span
                        className={[
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                          isActive || isComplete
                            ? "border-[#14B8A6]/50 bg-[#14B8A6]/15 text-[#14B8A6]"
                            : "border-white/10 bg-white/5 text-zinc-500",
                        ].join(" ")}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {index < agentSteps.length - 1 ? (
                    <div className="ml-7 h-10 w-px overflow-hidden bg-white/10">
                      <div
                        ref={(element) => {
                          lineRefs.current[index] = element;
                        }}
                        className="h-full w-px bg-[#14B8A6] shadow-[0_0_20px_rgba(20,184,166,0.8)]"
                      />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>

        <div
          ref={previewRef}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#18181B]/72 p-5 shadow-[0_24px_100px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-6 lg:p-8"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#14B8A6]/60 to-transparent" />
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-sm font-medium text-[#14B8A6]">Live document preview</p>
              <h3 className="mt-2 text-2xl font-semibold text-[#FAFAFA]">{activeAgent.documentTitle}</h3>
            </div>
            <div className="rounded-full border border-[#14B8A6]/25 bg-[#14B8A6]/10 px-3 py-1 text-xs font-medium text-[#14B8A6]">
              {stageIndex + 1} / {agentSteps.length}
            </div>
          </div>

          <div className="min-h-[320px] rounded-2xl border border-white/10 bg-[#09090B]/70 p-5 sm:min-h-[380px] sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#14B8A6]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Multi-Agent AI Document System
            </p>
            <h4 className="mt-4 text-3xl font-bold leading-tight text-[#FAFAFA]">
              Strategic Knowledge Report
            </h4>
            <p className="mt-4 text-sm leading-6 text-zinc-300">{activeAgent.documentBody}</p>

            <div className="mt-7 space-y-3">
              {completedSteps.map((step, index) => (
                <div key={step.name} className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#FAFAFA]">{step.name}</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">{step.output}</p>
                    </div>
                    <span className="mt-0.5 text-[#14B8A6]">{"\u2713"}</span>
                  </div>
                  {index === agentSteps.length - 1 ? (
                    <div className="mt-4 rounded-lg border border-[#14B8A6]/20 bg-[#14B8A6]/10 px-3 py-2 text-sm font-medium text-[#14B8A6]">
                      Finished report ready for export
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
