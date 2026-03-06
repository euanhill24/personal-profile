"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import InteractiveDots from "@/components/animations/InteractiveDots";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.to(scrollIndicatorRef.current, {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "power2.inOut",
    });
  });

  const scrollToCareer = () => {
    gsap.to(window, {
      scrollTo: { y: "#career", offsetY: 80 },
      duration: 1,
      ease: "power3.inOut",
    });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Interactive dot grid background */}
      <InteractiveDots contentRef={contentRef} />

      <div ref={contentRef} className="max-w-[1200px] mx-auto px-6 text-center">
        <div className="mb-6">
          <TextReveal
            as="h1"
            className="text-[clamp(2.5rem,7vw,5rem)] font-black tracking-tight text-text"
            stagger={0.04}
            delay={0.3}
          >
            Euan Hill
          </TextReveal>
        </div>

        <ScrollReveal delay={0.8} direction="up" distance={20}>
          <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-semibold text-primary mb-6">
            Technology Consultant
          </p>
        </ScrollReveal>

        <ScrollReveal delay={1.1} direction="up" distance={20}>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            T-shaped consultant with broad management consulting expertise and
            deep specialisation in automation and AI. I help organisations
            transform how they work through technology.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={1.4} direction="none">
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={scrollToCareer}
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              View My Work
            </button>
            <button
              onClick={() =>
                gsap.to(window, {
                  scrollTo: { y: "#contact", offsetY: 80 },
                  duration: 1,
                  ease: "power3.inOut",
                })
              }
              className="border-2 border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToCareer}
      >
        <ChevronDown size={28} className="text-text-muted" />
      </div>
    </section>
  );
}
