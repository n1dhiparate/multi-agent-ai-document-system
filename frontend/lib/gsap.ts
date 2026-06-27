import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  var __gsapScrollTriggerRegistered: boolean | undefined;
}

if (!globalThis.__gsapScrollTriggerRegistered) {
  gsap.registerPlugin(ScrollTrigger);
  globalThis.__gsapScrollTriggerRegistered = true;
}

export { gsap, ScrollTrigger };
