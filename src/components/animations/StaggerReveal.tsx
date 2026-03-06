"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
  direction?: "up" | "left" | "right";
  distance?: number;
}

export default function StaggerReveal({
  children,
  className,
  stagger = 0.1,
  duration = 0.6,
  direction = "up",
  distance = 30,
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const items =
        containerRef.current?.querySelectorAll(":scope > *");
      if (!items?.length) return;

      const from: gsap.TweenVars = { opacity: 0 };
      if (!prefersReduced) {
        if (direction === "up") from.y = distance;
        if (direction === "left") from.x = distance;
        if (direction === "right") from.x = -distance;
      }

      gsap.from(items, {
        ...from,
        duration: prefersReduced ? 0.01 : duration,
        stagger: prefersReduced ? 0 : stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}
