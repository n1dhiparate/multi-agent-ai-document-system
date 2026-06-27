"use client";

import Lenis, { type ScrollCallback } from "lenis";
import { type ReactNode, useEffect } from "react";

import { ScrollTrigger, gsap } from "@/lib/gsap";

type SmoothScrollProps = Readonly<{
  children: ReactNode;
}>;

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
    });

    const updateScrollTrigger: ScrollCallback = () => {
      ScrollTrigger.update();
    };

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(raf);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
    };
  }, []);

  return children;
}
