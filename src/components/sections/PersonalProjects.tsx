"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { personalProjects } from "@/data/personalProjects";
import { Leaf, Cat } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Leaf: <Leaf size={28} />,
  Cat: <Cat size={28} />,
};

export default function PersonalProjects() {
  return (
    <section id="personal" className="bg-surface-alt">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Side Projects"
          subtitle="Personal builds that combine creativity with code."
        />

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.15}>
          {personalProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-white border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-250 overflow-hidden"
            >
              {/* Gradient header */}
              <div
                className={`h-24 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
              >
                <div className="text-white">{iconMap[project.icon]}</div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-text group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-text-muted italic mb-3">
                  {project.subtitle}
                </p>
                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-light/50 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
