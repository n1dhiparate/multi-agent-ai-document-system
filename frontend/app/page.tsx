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
    const response = await fetch(
      `http://localhost:8000/generate?topic=${encodeURIComponent(topic)}`
    );

    if (!response.ok) {
      throw new Error("Generation failed");
    }

    const data = await response.json();

    console.log(data);

    // Animate the agents one by one
    setWorkflowStage(1);
    await new Promise((r) => setTimeout(r, 1000));

    setWorkflowStage(2);
    await new Promise((r) => setTimeout(r, 1000));

    setWorkflowStage(3);
    await new Promise((r) => setTimeout(r, 1000));

    setWorkflowStage(4);
    await new Promise((r) => setTimeout(r, 1000));

    setWorkflowStage(5);
  } catch (error) {
    console.error(error);
  } finally {
    setWorkflowStage(5);

setTimeout(() => {
    setIsGenerating(false);
}, 1500);
  }
};
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
