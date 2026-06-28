"use client";
import { gsap } from "@/lib/gsap";
import { useState } from "react";
import { AgentWorkflowSection } from "@/components/AgentWorkflowSection";
import { HeroSection } from "@/components/HeroSection";
import { SystemArchitectureSection } from "@/components/SystemArchitectureSection";


export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
const [workflowStage, setWorkflowStage] = useState(0);
const startGeneration = async (topic: string) => {
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
        const progressResponse = await fetch("http://localhost:8000/progress");

        const progress = await progressResponse.json();
        console.log(progress);

        setWorkflowStage(progress.stage);

        if (progress.status === "completed") {
          clearInterval(interval);
          console.log("Final Report:", progress.report);
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

    fetch(
  `http://localhost:8000/generate?topic=${encodeURIComponent(topic)}`
).catch((err) => {
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
      <SystemArchitectureSection />
      
    </>
  );
}
