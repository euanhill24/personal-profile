"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import TShapeVisual from "@/components/ui/TShapeVisual";
import StaggerReveal from "@/components/animations/StaggerReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { skillCategories } from "@/data/skills";
import { Monitor, Brain, Zap, Code } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor size={22} />,
  Brain: <Brain size={22} />,
  Zap: <Zap size={22} />,
  Code: <Code size={22} />,
};

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

        {/* Skills grid */}
        <StaggerReveal
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          stagger={0.1}
        >
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="rounded-2xl bg-white border border-border p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-250"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                  {iconMap[category.icon]}
                </div>
                <h3 className="font-bold text-text">{category.name}</h3>
              </div>
              <ul className="space-y-1.5">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-text-muted flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
