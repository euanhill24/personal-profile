"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  duration?: number;
  stagger?: number;
  delay?: number;
  splitBy?: "chars" | "words";
  trigger?: boolean;
}

export default function TextReveal({
  children,
  as: Tag = "span",
  className,
  duration = 0.6,
  stagger = 0.03,
  delay = 0,
  splitBy = "chars",
  trigger = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const elements =
        containerRef.current?.querySelectorAll(".text-reveal-item");
      if (!elements?.length) return;

      const tween: gsap.TweenVars = {
        opacity: 0,
        y: prefersReduced ? 0 : 20,
        duration: prefersReduced ? 0.01 : duration,
        stagger: prefersReduced ? 0 : stagger,
        delay,
        ease: "power3.out",
      };

      if (trigger) {
        tween.scrollTrigger = {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        };
      }

      gsap.from(elements, tween);
    },
    { scope: containerRef }
  );

  const items =
    splitBy === "chars"
      ? children.split("").map((char, i) => (
          <span
            key={i}
            className="text-reveal-item inline-block will-change-transform"
            style={{ whiteSpace: char === " " ? "pre" : undefined }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))
      : children.split(" ").map((word, i) => (
          <span
            key={i}
            className="text-reveal-item inline-block will-change-transform mr-[0.25em]"
          >
            {word}
          </span>
        ));

  return (
    <div ref={containerRef}>
      <Tag className={className}>{items}</Tag>
    </div>
  );
}
