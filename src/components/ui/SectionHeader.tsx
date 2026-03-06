"use client";

import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-16 ${className ?? ""}`}>
      <TextReveal
        as="h2"
        className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-text tracking-tight"
        splitBy="words"
        trigger
      >
        {title}
      </TextReveal>
      {subtitle && (
        <ScrollReveal delay={0.2}>
          <p className="mt-4 text-lg text-text-muted max-w-2xl">{subtitle}</p>
        </ScrollReveal>
      )}
    </div>
  );
}
