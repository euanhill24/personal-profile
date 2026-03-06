"use client";

import { useState, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import type { SectionId } from "@/types";

const sections: { id: SectionId; label: string }[] = [
  { id: "career", label: "Career" },
  { id: "projects", label: "Projects" },
  { id: "personal", label: "Side Projects" },
  { id: "skills", label: "Skills" },
  { id: "hobbies", label: "Hobbies" },
];

export default function Nav() {
  const [active, setActive] = useState<SectionId>("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const allSections: SectionId[] = ["hero", ...sections.map((s) => s.id), "contact"];

    allSections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    gsap.to(window, {
      scrollTo: { y: `#${id}`, offsetY: 80 },
      duration: 1,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-surface/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
        <button
          onClick={() => scrollTo("hero")}
          className="font-bold text-lg text-text hover:text-primary transition-colors"
        >
          EH
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={cn(
                "text-sm font-medium transition-colors relative",
                active === s.id ? "text-primary" : "text-text-muted hover:text-text"
              )}
            >
              {s.label}
              {active === s.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-lg border-b border-border">
          <div className="px-6 py-4 flex flex-col gap-3">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={cn(
                  "text-left py-2 text-sm font-medium transition-colors",
                  active === s.id ? "text-primary" : "text-text-muted"
                )}
              >
                {s.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold mt-2"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
