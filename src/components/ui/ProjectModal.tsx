"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { X } from "lucide-react";
import type { Project } from "@/types";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.from(overlayRef.current, {
      opacity: 0,
      duration: prefersReduced ? 0.01 : 0.3,
    });
    gsap.from(modalRef.current, {
      opacity: 0,
      scale: prefersReduced ? 1 : 0.95,
      y: prefersReduced ? 0 : 20,
      duration: prefersReduced ? 0.01 : 0.4,
      ease: "power3.out",
    });
  });

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement;
    modalRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // Focus trap
      if (e.key === "Tab") {
        const focusable = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) return;
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === overlayRef.current && onClose()}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto outline-none will-change-transform"
        tabIndex={-1}
        role="dialog"
        aria-modal
        aria-label={`${project.company} - ${project.title}`}
      >
        <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <p className="text-sm font-semibold text-primary">
              {project.company}
            </p>
            <h2 className="text-xl font-bold text-text">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-alt transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-3">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="p-3 rounded-xl bg-surface-alt text-center"
              >
                <p className="text-lg font-bold font-mono text-primary">
                  {m.value}
                </p>
                <p className="text-xs text-text-muted mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Challenge */}
          <div>
            <h3 className="text-sm font-bold text-text uppercase tracking-wider mb-2">
              Challenge
            </h3>
            <p className="text-text-muted leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* Approach */}
          <div>
            <h3 className="text-sm font-bold text-text uppercase tracking-wider mb-2">
              Approach
            </h3>
            <p className="text-text-muted leading-relaxed">
              {project.approach}
            </p>
          </div>

          {/* Impact */}
          <div>
            <h3 className="text-sm font-bold text-text uppercase tracking-wider mb-2">
              Impact
            </h3>
            <p className="text-text-muted leading-relaxed">{project.impact}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-full bg-primary-light text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
