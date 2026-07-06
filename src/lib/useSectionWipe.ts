"use client";

import { useEffect, type RefObject } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Reveals a section with a bottom-up clip-path wipe as it scrolls into view.
 */
export function useSectionWipe(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = ref.current;
    if (!section || prefersReducedMotion()) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 90%",
      end: "top 40%",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        section.style.clipPath = `polygon(0 ${100 - p * 100}%, 100% ${100 - p * 100}%, 100% 100%, 0 100%)`;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [ref]);
}
