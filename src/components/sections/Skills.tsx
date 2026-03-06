"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import TShapeVisual from "@/components/ui/TShapeVisual";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SkillConstellation from "@/components/ui/SkillConstellation";

export default function Skills() {
  return (
    <section id="skills">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Skills & Expertise"
          subtitle="A T-shaped profile: broad consulting foundation with deep technical specialisation."
        />

        {/* T-Shape */}
        <ScrollReveal className="mb-16">
          <TShapeVisual />
        </ScrollReveal>

        {/* Interactive skill constellation */}
        <ScrollReveal>
          <p className="text-sm text-text-muted text-center mb-4">
            Click a category to expand. Hover nodes to see skill names.
          </p>
          <SkillConstellation />
        </ScrollReveal>
      </div>
    </section>
  );
}
