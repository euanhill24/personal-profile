"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import TechStackGrid from "@/components/ui/TechStackGrid";

export default function Skills() {
  return (
    <section id="skills">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Technology & Tools"
          subtitle="The platforms, languages, and frameworks I work with day to day."
        />
        <TechStackGrid />
      </div>
    </section>
  );
}
