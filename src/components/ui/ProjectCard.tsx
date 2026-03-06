"use client";

import { useRef, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const gradients = [
  "from-indigo-700 to-violet-900",
  "from-violet-600 to-indigo-800",
  "from-orange-500 to-rose-600",
  "from-indigo-600 to-blue-800",
  "from-amber-500 to-orange-600",
  "from-purple-600 to-indigo-800",
  "from-rose-500 to-orange-600",
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

      // Animated metric counter
      if (metricRef.current && project.heroMetricValue != null) {
        const target = project.heroMetricValue;
        const prefix = project.heroMetricPrefix || "";
        const suffix = project.heroMetricSuffix || "";

        if (prefersReduced) {
          metricRef.current.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
        } else {
          const counter = { val: 0 };
          metricRef.current.textContent = `${prefix}0${suffix}`;
          gsap.to(counter, {
            val: target,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              if (metricRef.current) {
                metricRef.current.textContent = `${prefix}${Math.round(counter.val).toLocaleString()}${suffix}`;
              }
            },
          });
        }
      }
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
            {project.heroMetricPrefix || ""}{project.heroMetricValue.toLocaleString()}{project.heroMetricSuffix || ""}
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
