"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { gsap } from "@/lib/gsap";
import AnimatedButton from "@/components/AnimatedButton";
import UploadModal from "@/components/UploadModal";

const technologies = ["FastAPI", "LangGraph", "ChromaDB", "Gemini", "Next.js"] as const;


export function HeroSection() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLUListElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .fromTo(sectionRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 })
        .from(headingRef.current, { y: 34, autoAlpha: 0, duration: 0.9 }, "-=0.35")
        .from(paragraphRef.current, { y: 18, autoAlpha: 0, duration: 0.75 }, "-=0.35")
        .from(actionsRef.current, { y: 18, autoAlpha: 0, duration: 0.7 }, "-=0.25")
        .from(
          techStackRef.current?.children ?? [],
          { y: 14, autoAlpha: 0, duration: 0.55, stagger: 0.08 },
          "-=0.2",
        );

      gsap.to(visualRef.current, {
        y: -14,
        rotate: 0.6,
        duration: 4.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen overflow-hidden bg-[#09090B] px-6 py-8 text-[#FAFAFA] sm:px-8 lg:px-12"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(20,184,166,0.18),transparent_30%),radial-gradient(circle_at_78%_38%,rgba(250,250,250,0.08),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#14B8A6]/50 to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.86fr)]">
        <div className="flex max-w-3xl flex-col items-start">
          <div className="mb-7 rounded-full border border-[#14B8A6]/25 bg-[#18181B]/70 px-4 py-2 text-sm font-medium text-[#14B8A6] shadow-[0_0_40px_rgba(20,184,166,0.12)] backdrop-blur-xl">
            AI-Powered Document Intelligence
          </div>

          <h1
            ref={headingRef}
            className="max-w-4xl text-5xl font-bold leading-[1.02] text-[#FAFAFA] sm:text-6xl lg:text-7xl"
          >
            Transform Documents into Knowledge with Multi-Agent AI
          </h1>

          <p
            ref={paragraphRef}
            className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl sm:leading-9"
          >
            Upload PDFs and let specialized AI agents research, plan, write, review, and generate
            professional reports automatically.
          </p>

          <div ref={actionsRef} className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <div onClick={() => setIsUploadOpen(true)}>
  <AnimatedButton />
</div>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#architecture"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/12 bg-white/5 px-7 text-base font-semibold text-[#FAFAFA] backdrop-blur-xl transition-colors hover:border-[#14B8A6]/50 hover:bg-[#18181B]"
            >
              View Architecture
            </motion.a>
          </div>

          <ul
            ref={techStackRef}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-zinc-300"
          >
            {technologies.map((technology) => (
              <li key={technology} className="flex items-center gap-2">
                <span className="text-[#14B8A6]">{"\u2713"}</span>
                {technology}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[360px] lg:min-h-[560px]" aria-label="AI visualization placeholder">
          <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-[#18181B]/60 shadow-[0_24px_100px_rgba(0,0,0,0.48)] backdrop-blur-2xl" />
          <div
            ref={visualRef}
            className="relative flex h-full min-h-[360px] items-center justify-center overflow-hidden rounded-[2rem] border border-[#14B8A6]/15 bg-[linear-gradient(135deg,rgba(24,24,27,0.92),rgba(9,9,11,0.84))] lg:min-h-[560px]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(250,250,250,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(250,250,250,0.045)_1px,transparent_1px)] bg-[size:42px_42px]" />
            <div className="absolute h-72 w-72 rounded-full border border-[#14B8A6]/20 bg-[#14B8A6]/10 blur-2xl" />
            <div className="relative h-64 w-64 rounded-full border border-[#14B8A6]/30 bg-[#09090B]/60 p-6 shadow-[inset_0_0_70px_rgba(20,184,166,0.14)]">
              <div className="h-full w-full rounded-full border border-white/10 bg-[#18181B]/80 p-8">
                <div className="flex h-full w-full items-center justify-center rounded-full border border-[#14B8A6]/40 bg-[#14B8A6]/10">
                  <div className="h-16 w-16 rounded-2xl border border-[#14B8A6]/45 bg-[#14B8A6]/20 shadow-[0_0_45px_rgba(20,184,166,0.45)]" />
                </div>
              </div>
            </div>
            <div className="absolute left-[14%] top-[22%] h-4 w-4 rounded-full bg-[#14B8A6] shadow-[0_0_34px_rgba(20,184,166,0.8)]" />
            <div className="absolute right-[17%] top-[30%] h-3 w-3 rounded-full bg-[#FAFAFA]/80 shadow-[0_0_28px_rgba(250,250,250,0.35)]" />
            <div className="absolute bottom-[24%] left-[21%] h-3 w-3 rounded-full bg-[#FAFAFA]/70 shadow-[0_0_24px_rgba(250,250,250,0.3)]" />
            <div className="absolute bottom-[18%] right-[24%] h-5 w-5 rounded-full border border-[#14B8A6]/60 bg-[#14B8A6]/20" />
          </div>
        </div>
      </div>
      <UploadModal
  isOpen={isUploadOpen}
  onClose={() => setIsUploadOpen(false)}
/>
    </section>
  );
}
