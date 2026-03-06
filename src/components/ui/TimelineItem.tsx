"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { CareerEntry } from "@/types";

interface TimelineItemProps {
  entry: CareerEntry;
  index: number;
  isLast: boolean;
}

export default function TimelineItem({ entry, index, isLast }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.from(nodeRef.current, {
        scale: 0,
        duration: prefersReduced ? 0.01 : 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(contentRef.current, {
        opacity: 0,
        x: prefersReduced ? 0 : index % 2 === 0 ? 40 : -40,
        duration: prefersReduced ? 0.01 : 0.7,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: itemRef }
  );

  return (
    <div ref={itemRef} className="relative flex items-start gap-6 md:gap-10">
      {/* Timeline line + node */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          ref={nodeRef}
          className="w-4 h-4 rounded-full bg-primary border-4 border-primary-light z-10 will-change-transform"
        />
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/30 to-border min-h-[40px]" />
        )}
      </div>

      {/* Content card */}
      <div
        ref={contentRef}
        className="flex-1 pb-10 will-change-transform"
      >
        <div className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-250">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
            <span className="text-sm font-bold text-primary font-mono">
              {entry.period}
            </span>
            <span className="text-sm text-text-muted">|</span>
            <span className="text-sm font-semibold text-text-muted">
              {entry.company}
            </span>
          </div>
          <h3 className="text-xl font-bold text-text mb-2">{entry.role}</h3>
          <p className="text-text-muted text-sm leading-relaxed mb-4">
            {entry.description}
          </p>
          <ul className="space-y-2">
            {entry.achievements.map((a, i) => (
              <li
                key={i}
                className="text-sm text-text-muted flex items-start gap-2"
              >
                <span className="text-accent mt-1 flex-shrink-0">&#9679;</span>
                {a}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mt-4">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary-light text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
