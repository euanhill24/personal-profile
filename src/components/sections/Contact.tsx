"use client";

import TextReveal from "@/components/animations/TextReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { Mail, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <TextReveal
          as="h2"
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-text tracking-tight"
          splitBy="words"
          trigger
        >
          {"Let's work together"}
        </TextReveal>

        <div className="mt-4 mb-10">
          <p className="text-lg text-text-muted max-w-xl mx-auto">
            I&apos;m always open to discussing new opportunities, interesting
            projects, or ways to create impact through technology.
          </p>
        </div>

        <StaggerReveal
          className="flex flex-wrap justify-center gap-4"
          stagger={0.12}
        >
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
        </StaggerReveal>

        <p className="mt-16 text-sm text-text-muted">
          Built with Next.js, GSAP, and Tailwind CSS
        </p>
      </div>
    </section>
  );
}
