"use client";

import { useRef, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const gradients = [
  "from-blue-600 to-indigo-700",
  "from-violet-600 to-purple-700",
  "from-teal-500 to-cyan-700",
  "from-orange-500 to-red-600",
  "from-emerald-500 to-green-700",
  "from-sky-500 to-blue-700",
  "from-rose-500 to-pink-700",
];

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const metricRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.from(cardRef.current, {
        opacity: 0,
        y: prefersReduced ? 0 : 30,
        duration: prefersReduced ? 0.01 : 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: cardRef }
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  const gradientIndex =
    parseInt(project.id.replace(/[^0-9]/g, "") || "0") %
    gradients.length;
  const gradient =
    gradients[
      ["glas", "mclaren", "unicef", "sandvik", "bayer", "network-rail", "sita-heathrow"].indexOf(
        project.id
      ) % gradients.length
    ] || gradients[gradientIndex];

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer rounded-2xl bg-white border border-border shadow-sm hover:shadow-lg transition-shadow duration-250 overflow-hidden will-change-transform"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {/* Gradient header */}
      <div
        className={`h-32 bg-gradient-to-br ${gradient} flex items-end p-5`}
      >
        <span className="text-white/80 text-sm font-semibold">
          {project.company}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-text-muted mb-4 line-clamp-2">
          {project.summary}
        </p>

        {/* Hero metric */}
        <div className="mb-4 px-3 py-2 rounded-lg bg-surface-alt">
          <span
            ref={metricRef}
            className="text-lg font-bold font-mono text-primary"
          >
            {project.heroMetric}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-light/50 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
