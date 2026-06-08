"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { personalProjects } from "@/data/personalProjects";
import {
  Coffee, Cat, Gift, Map, Leaf, LayoutDashboard,
  ExternalLink, Github,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Coffee: <Coffee size={28} />,
  Cat: <Cat size={28} />,
  Gift: <Gift size={28} />,
  Map: <Map size={28} />,
  Leaf: <Leaf size={28} />,
  LayoutDashboard: <LayoutDashboard size={28} />,
};

const statusColors: Record<string, string> = {
  Shipped: "bg-emerald-100 text-emerald-800",
  Active: "bg-amber-100 text-amber-800",
  WIP: "bg-slate-100 text-slate-600",
};

export default function PersonalProjects() {
  return (
    <section id="personal" className="bg-surface-alt">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Side Projects"
          subtitle="Things I build because I want to, not because I have to."
        />

        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={0.1}
        >
          {personalProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-white border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-250 overflow-hidden"
            >
              <div
                className={`h-20 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
              >
                <div className="text-white/90">
                  {iconMap[project.icon]}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-text group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusColors[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="text-sm font-medium text-text-muted mb-2">
                  {project.headline}
                </p>

                <p className="text-sm text-text-muted leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-light text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-accent transition-colors"
                    >
                      <Github size={14} />
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-accent transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
