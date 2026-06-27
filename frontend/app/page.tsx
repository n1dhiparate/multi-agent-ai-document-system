"use client";

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
    setWorkflowStage(1);

    const response = await fetch(
      `http://localhost:8000/generate?topic=${encodeURIComponent(topic)}`
    );

    if (!response.ok) {
      throw new Error("Generation failed");
    }

    const data = await response.json();

    console.log(data);

    setWorkflowStage(11);
  } catch (error) {
    console.error(error);
  } finally {
    setIsGenerating(false);
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
