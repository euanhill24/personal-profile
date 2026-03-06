"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { hobbies } from "@/data/hobbies";
import {
  Timer,
  Disc,
  CircleDot,
  Heart,
  BookOpen,
  Coffee,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Timer: <Timer size={24} />,
  Disc: <Disc size={24} />,
  CircleDot: <CircleDot size={24} />,
  Heart: <Heart size={24} />,
  BookOpen: <BookOpen size={24} />,
  Coffee: <Coffee size={24} />,
};

export default function Hobbies() {
  return (
    <section id="hobbies" className="bg-surface-alt">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Beyond Work"
          subtitle="Staying active, giving back, and keeping curious."
        />

        <StaggerReveal
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          stagger={0.08}
        >
          {hobbies.map((hobby) => (
            <div
              key={hobby.name}
              className="rounded-2xl bg-white border border-border p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-250"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary mx-auto mb-3">
                {iconMap[hobby.icon]}
              </div>
              <h3 className="font-bold text-text text-sm mb-1">
                {hobby.name}
              </h3>
              <p className="text-xs text-text-muted">{hobby.description}</p>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
