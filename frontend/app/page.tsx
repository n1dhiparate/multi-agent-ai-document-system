"use client";
import { gsap } from "@/lib/gsap";
import { useEffect, useState } from "react";
import { AgentWorkflowSection } from "@/components/AgentWorkflowSection";
import { HeroSection } from "@/components/HeroSection";
import { SystemArchitectureSection } from "@/components/SystemArchitectureSection";
import { ReportViewer } from "@/components/ReportViewer";


export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
const [workflowStage, setWorkflowStage] = useState(0);
const [report, setReport] = useState("");
const [fileName, setFileName] = useState("");
const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";
useEffect(() => {
  if (!report) return;

  gsap.to(window, {
    duration: 2,
    scrollTo: {
      y: "#report-viewer",
      offsetY: 20,
    },
    ease: "power3.inOut",
  });
}, [report]);
const resetGeneration = () => {
  setReport("");
  setFileName("");
  setWorkflowStage(0);
  setIsGenerating(false);

  gsap.to(window, {
    duration: 1.5,
    scrollTo: {
      y: "#hero",
      offsetY: 20,
    },
    ease: "power3.inOut",
  });
};
const startGeneration = async (
  topic: string,
  fileName: string
) => {
  setFileName(fileName);
  try {
    setIsGenerating(true);
    setWorkflowStage(0);

    setTimeout(() => {
      gsap.to(window, {
        duration: 2.2,
        scrollTo: {
          y: "#workflow",
          offsetY: 20,
        },
        ease: "power3.inOut",
      });
    }, 250);

    const interval = setInterval(async () => {
      try {
        const progressResponse = await fetch(`${API}/progress`);

        const progress = await progressResponse.json();
        console.log(progress);

        setWorkflowStage(progress.stage);

        if (progress.status === "completed") {
  clearInterval(interval);

  console.log("Final Report:", progress.report);

  setReport(progress.report);

  setIsGenerating(false);

 
}

        if (progress.status === "error") {
          clearInterval(interval);
          setIsGenerating(false);
        }
      } catch (err) {
        console.error(err);
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 500);

   fetch(`${API}/generate?topic=${encodeURIComponent(topic)}`).catch((err) => {
  console.error(err);
  clearInterval(interval);
  setIsGenerating(false);
});

  } catch (error) {
    console.error(error);
    setIsGenerating(false);
  }
};   // <-- THIS WAS MISSING

  return (
    <>
      <HeroSection
  isGenerating={isGenerating}
  setIsGenerating={setIsGenerating}
  workflowStage={workflowStage}
  setWorkflowStage={setWorkflowStage}
  onGenerate={startGeneration}
/>
      <AgentWorkflowSection
  isGenerating={isGenerating}
  workflowStage={workflowStage}
/>
      <ReportViewer
  report={report}
  fileName={fileName}
  onGenerateAnother={resetGeneration}
/>

<SystemArchitectureSection />
      
    </>
  );
}
