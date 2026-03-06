"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { tShapeData } from "@/data/skills";

export default function TShapeVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const verticalRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) return;

      gsap.from(horizontalRef.current, {
        scaleX: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(verticalRef.current, {
        scaleY: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Animate skill labels
      const labels = containerRef.current?.querySelectorAll(".t-shape-label");
      if (labels) {
        gsap.from(labels, {
          opacity: 0,
          y: 10,
          stagger: 0.06,
          delay: 0.6,
          duration: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto">
      {/* T-Shape visual */}
      <div className="relative flex flex-col items-center">
        {/* Horizontal bar - Breadth */}
        <div className="w-full mb-1">
          <p className="text-center text-sm font-bold text-primary mb-3 uppercase tracking-wider">
            {tShapeData.breadth.label}
          </p>
          <div
            ref={horizontalRef}
            className="w-full h-14 bg-gradient-to-r from-primary to-primary/80 rounded-xl origin-center will-change-transform flex items-center justify-center"
          >
            <div className="flex flex-wrap justify-center gap-2 px-4">
              {tShapeData.breadth.skills.map((skill) => (
                <span
                  key={skill}
                  className="t-shape-label text-xs font-medium text-white/90 px-2 py-0.5 rounded-full bg-white/15"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Vertical bar - Depth */}
        <div className="flex flex-col items-center">
          <div
            ref={verticalRef}
            className="w-40 bg-gradient-to-b from-accent to-accent/70 rounded-b-xl origin-top will-change-transform py-4"
          >
            <div className="flex flex-col items-center gap-2 px-3">
              {tShapeData.depth.skills.map((skill) => (
                <span
                  key={skill}
                  className="t-shape-label text-xs font-medium text-white/90 px-2 py-0.5 rounded-full bg-white/15 text-center"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <p className="text-center text-sm font-bold text-accent mt-3 uppercase tracking-wider">
            {tShapeData.depth.label}
          </p>
        </div>
      </div>
    </div>
  );
}
