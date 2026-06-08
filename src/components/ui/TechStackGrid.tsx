"use client";

import { useState } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { techCategories } from "@/data/skills";
import {
  Brain, Bot, Sparkles, MessageSquare, Database, Pencil, Workflow,
  Activity, Cog, RefreshCw, Zap, Layers, Target,
  LayoutGrid, BarChart3, Headphones, Cloud, FolderOpen,
  Code, FileCode, Globe, Server, Table, Box,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Brain, Bot, Sparkles, MessageSquare, Database, Pencil, Workflow,
  Activity, Cog, RefreshCw, Zap, Layers, Target,
  LayoutGrid, BarChart3, Headphones, Cloud, FolderOpen,
  Code, FileCode, Globe, Server, Table, Box,
};

const categoryAccents = [
  "border-l-amber-500",
  "border-l-violet-500",
  "border-l-sky-500",
  "border-l-emerald-500",
];

export default function TechStackGrid() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {techCategories.map((category, ci) => (
        <ScrollReveal key={category.name} delay={ci * 0.1}>
          <div
            className={`rounded-xl bg-white border border-border border-l-4 ${categoryAccents[ci]} p-5 shadow-sm`}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">
              {category.name}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {category.items.map((item) => {
                const Icon = iconMap[item.icon] || Code;
                const isHovered = hoveredItem === item.name;
                return (
                  <div
                    key={item.name}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-surface-alt transition-colors cursor-default group"
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        isHovered
                          ? "bg-accent/10 text-accent scale-110"
                          : "bg-surface-alt text-text-muted"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-medium text-text-muted text-center leading-tight">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
