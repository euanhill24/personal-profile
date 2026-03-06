"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@/lib/gsap";
import { skillCategories } from "@/data/skills";

const CATEGORY_COLORS = [
  { h: 280, l: 0.55, c: 0.2 },  // indigo/violet
  { h: 40, l: 0.65, c: 0.18 },  // coral/orange
  { h: 160, l: 0.6, c: 0.18 },  // teal
  { h: 320, l: 0.6, c: 0.18 },  // magenta
];

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  label: string;
  categoryIndex: number;
  isHub: boolean;
  skillIndex: number;
  phase: number;
}

function buildNodes(width: number, height: number, isMobile: boolean): Node[] {
  const nodes: Node[] = [];
  const cols = isMobile ? 2 : skillCategories.length;
  const rows = isMobile ? 2 : 1;

  skillCategories.forEach((cat, ci) => {
    const col = isMobile ? ci % 2 : ci;
    const row = isMobile ? Math.floor(ci / 2) : 0;
    const cellW = width / cols;
    const cellH = height / rows;
    const cx = cellW * col + cellW / 2;
    const cy = cellH * row + cellH / 2;
    const hubRadius = isMobile ? 18 : 24;
    const orbitRadius = isMobile ? 55 : 80;

    // Hub node
    nodes.push({
      x: cx,
      y: cy,
      baseX: cx,
      baseY: cy,
      radius: hubRadius,
      label: cat.name,
      categoryIndex: ci,
      isHub: true,
      skillIndex: -1,
      phase: Math.random() * Math.PI * 2,
    });

    // Skill nodes in a circle around the hub
    cat.skills.forEach((skill, si) => {
      const angle = (si / cat.skills.length) * Math.PI * 2 - Math.PI / 2;
      const sx = cx + Math.cos(angle) * orbitRadius;
      const sy = cy + Math.sin(angle) * orbitRadius;
      nodes.push({
        x: sx,
        y: sy,
        baseX: sx,
        baseY: sy,
        radius: isMobile ? 6 : 8,
        label: skill,
        categoryIndex: ci,
        isHub: false,
        skillIndex: si,
        phase: Math.random() * Math.PI * 2,
      });
    });
  });

  return nodes;
}

function colorStr(ci: number, alpha = 1, lighten = 0): string {
  const col = CATEGORY_COLORS[ci % CATEGORY_COLORS.length];
  return `oklch(${(col.l + lighten).toFixed(2)} ${col.c.toFixed(2)} ${col.h} / ${alpha})`;
}

export default function SkillConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const [tooltip, setTooltip] = useState<{ label: string; x: number; y: number } | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const timeRef = useRef(0);

  const buildLayout = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const mobile = rect.width < 768;
    setIsMobile(mobile);
    nodesRef.current = buildNodes(rect.width, rect.height, mobile);
  }, []);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    buildLayout();

    const ro = new ResizeObserver(() => buildLayout());
    ro.observe(canvas.parentElement || canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
      setTooltip(null);
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      for (const node of nodesRef.current) {
        const dx = node.x - mx;
        const dy = node.y - my;
        if (Math.sqrt(dx * dx + dy * dy) < node.radius + 5) {
          if (node.isHub) {
            setExpandedCategory((prev) =>
              prev === node.categoryIndex ? null : node.categoryIndex
            );
          }
          return;
        }
      }
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", onClick);

    const dpr = Math.min(window.devicePixelRatio, 2);
    let lastTime = performance.now();

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (!prefersReduced) {
        timeRef.current += dt;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const t = timeRef.current;
      let hoveredNode: Node | null = null;

      // Idle drift
      if (!prefersReduced) {
        for (const node of nodesRef.current) {
          if (!node.isHub) {
            node.x = node.baseX + Math.sin(t * 0.5 + node.phase) * 3;
            node.y = node.baseY + Math.cos(t * 0.7 + node.phase) * 3;
          }
        }
      }

      // Find hubs for drawing lines
      const hubs = nodesRef.current.filter((n) => n.isHub);

      // Draw lines from skills to their hub
      for (const node of nodesRef.current) {
        if (node.isHub) continue;
        const hub = hubs[node.categoryIndex];
        if (!hub) continue;

        ctx.beginPath();
        ctx.moveTo(hub.x, hub.y);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = colorStr(node.categoryIndex, 0.15);
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw nodes
      for (const node of nodesRef.current) {
        const dx = node.x - mx;
        const dy = node.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isNear = dist < 100;
        const isHover = dist < node.radius + 5;

        if (isHover && !hoveredNode) {
          hoveredNode = node;
        }

        const glowScale = isNear ? 1 + (1 - dist / 100) * 0.3 : 1;
        const r = node.radius * glowScale;
        const alpha = node.isHub ? 0.9 : isNear ? 0.8 : 0.5;

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = colorStr(
          node.categoryIndex,
          alpha,
          node.isHub ? 0 : 0.1
        );
        ctx.fill();

        // Glow ring on hover
        if (isNear && !node.isHub) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 3, 0, Math.PI * 2);
          ctx.strokeStyle = colorStr(node.categoryIndex, 0.3);
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw hub label
        if (node.isHub) {
          ctx.fillStyle = "white";
          ctx.font = `bold ${isMobile ? 9 : 11}px system-ui, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          // Abbreviate on mobile
          const text = isMobile && node.label.length > 8
            ? node.label.slice(0, 7) + "\u2026"
            : node.label;
          ctx.fillText(text, node.x, node.y);
        }

        // Draw skill labels when category is expanded
        if (
          !node.isHub &&
          expandedCategory === node.categoryIndex
        ) {
          ctx.fillStyle = colorStr(node.categoryIndex, 0.9);
          ctx.font = `500 ${isMobile ? 9 : 11}px system-ui, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          ctx.fillText(node.label, node.x, node.y - node.radius - 4);
        }
      }

      // Tooltip
      if (hoveredNode && !hoveredNode.isHub) {
        setTooltip({
          label: hoveredNode.label,
          x: hoveredNode.x,
          y: hoveredNode.y - hoveredNode.radius - 12,
        });
      } else if (!hoveredNode) {
        setTooltip(null);
      }
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("click", onClick);
      ro.disconnect();
    };
  }, [expandedCategory]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: isMobile ? 400 : 340 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
      />
      {/* Tooltip overlay */}
      {tooltip && (
        <div
          className="absolute pointer-events-none px-2.5 py-1 rounded-md bg-text text-surface text-xs font-medium shadow-md whitespace-nowrap -translate-x-1/2"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.label}
        </div>
      )}
      {/* Screen reader text */}
      <div className="sr-only">
        {skillCategories.map((cat) => (
          <div key={cat.name}>
            <h4>{cat.name}</h4>
            <ul>
              {cat.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
