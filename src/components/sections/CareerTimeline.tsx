"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeader from "@/components/ui/SectionHeader";
import TimelineItem from "@/components/ui/TimelineItem";
import { careerEntries, education } from "@/data/career";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function CareerTimeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!lineRef.current) return;

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section id="career" ref={sectionRef} className="bg-surface-alt">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Career Journey"
          subtitle="From management consulting foundations to automation and AI leadership."
        />

        {/* Education */}
        <ScrollReveal className="mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-border text-sm">
            <span className="font-semibold text-primary font-mono">
              {education.period}
            </span>
            <span className="text-text-muted">|</span>
            <span className="text-text">
              {education.institution} &mdash; {education.degree} ({education.grade})
            </span>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Animated vertical line (desktop only, hidden on mobile where items are stacked) */}
          <div
            ref={lineRef}
            className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent origin-top hidden md:block"
          />

          <div className="space-y-0">
            {careerEntries.map((entry, i) => (
              <TimelineItem
                key={entry.id}
                entry={entry}
                index={i}
                isLast={i === careerEntries.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
