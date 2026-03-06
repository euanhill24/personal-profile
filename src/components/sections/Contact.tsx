"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import { Mail, Linkedin, Github } from "lucide-react";

const COMMAND = "> euan.status()";
const RESPONSE =
  'Available for new projects. Based in Brighton. Let\u2019s build something meaningful.';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const commandRef = useRef<HTMLSpanElement>(null);
  const responseRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        if (commandRef.current) commandRef.current.textContent = COMMAND;
        if (responseRef.current) responseRef.current.textContent = RESPONSE;
        gsap.set(buttonsRef.current, { opacity: 1 });
        { hasPlayedRef.current = true; };
        return;
      }

      // Hide buttons initially
      gsap.set(buttonsRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        onComplete: () => { hasPlayedRef.current = true },
      });

      // Type command
      COMMAND.split("").forEach((char, i) => {
        tl.to(
          {},
          {
            duration: 0.06,
            onComplete: () => {
              if (commandRef.current) {
                commandRef.current.textContent = COMMAND.slice(0, i + 1);
              }
            },
          },
          i * 0.06
        );
      });

      // Pause after command
      tl.to({}, { duration: 0.5 });

      // Type response
      const responseStart = COMMAND.length * 0.06 + 0.5;
      RESPONSE.split("").forEach((char, i) => {
        tl.to(
          {},
          {
            duration: 0.03,
            onComplete: () => {
              if (responseRef.current) {
                responseRef.current.textContent = RESPONSE.slice(0, i + 1);
              }
            },
          },
          responseStart + i * 0.03
        );
      });

      // Fade in buttons
      tl.to(
        buttonsRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        ">"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section id="contact" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Terminal window */}
          <div className="rounded-xl overflow-hidden shadow-lg border border-border">
            {/* Window chrome */}
            <div className="bg-[oklch(0.20_0.02_280)] px-4 py-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs font-mono text-white/40">
                terminal
              </span>
            </div>

            {/* Terminal body */}
            <div className="bg-[oklch(0.16_0.02_280)] p-6 font-mono text-sm md:text-base leading-relaxed min-h-[160px]">
              <div className="text-[oklch(0.70_0.18_40)]">
                <span ref={commandRef} />
                <span
                  ref={cursorRef}
                  className="inline-block w-[2px] h-[1.1em] bg-[oklch(0.70_0.18_40)] align-middle ml-0.5 animate-[blink_1s_step-end_infinite]"
                />
              </div>
              <div className="mt-3 text-white/80">
                <span ref={responseRef} />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div ref={buttonsRef} className="mt-8 flex flex-wrap justify-center gap-4">
            <MagneticButton
              as="a"
              href="mailto:euan.hill24@gmail.com"
              className="bg-primary text-white px-8 py-3.5 text-base hover:opacity-90"
            >
              <Mail size={18} />
              Email Me
            </MagneticButton>
            <MagneticButton
              as="a"
              href="https://www.linkedin.com/in/euanhill/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary text-primary px-8 py-3.5 text-base hover:bg-primary hover:text-white"
            >
              <Linkedin size={18} />
              LinkedIn
            </MagneticButton>
            <MagneticButton
              as="a"
              href="https://github.com/euanhill"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-border text-text px-8 py-3.5 text-base hover:border-primary hover:text-primary"
            >
              <Github size={18} />
              GitHub
            </MagneticButton>
          </div>

          <p className="mt-16 text-sm text-text-muted text-center">
            Built with Next.js, GSAP, and Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
}
