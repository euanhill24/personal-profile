"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { hobbies } from "@/data/hobbies";
import {
  Timer, Disc, CircleDot, Heart, BookOpen, Coffee,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Timer: <Timer size={22} />,
  Disc: <Disc size={22} />,
  CircleDot: <CircleDot size={22} />,
  Heart: <Heart size={22} />,
  BookOpen: <BookOpen size={22} />,
  Coffee: <Coffee size={22} />,
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          stagger={0.08}
        >
          {hobbies.map((hobby) => (
            <div
              key={hobby.name}
              className="group rounded-xl bg-white border border-border p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-lg bg-accent-light flex items-center justify-center text-accent mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                {iconMap[hobby.icon]}
              </div>
              <h3 className="font-bold text-text text-sm mb-1">
                {hobby.name}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {hobby.description}
              </p>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
