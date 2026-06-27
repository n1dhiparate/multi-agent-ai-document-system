import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

declare global {
  var __gsapPluginsRegistered: boolean | undefined;
}

if (!globalThis.__gsapPluginsRegistered) {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin
  );

  globalThis.__gsapPluginsRegistered = true;
}

export {
  gsap,
  ScrollTrigger,
  ScrollToPlugin,
};