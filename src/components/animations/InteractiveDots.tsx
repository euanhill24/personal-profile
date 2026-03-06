"use client";

import { useRef, useCallback, type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface Dot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  displaced: boolean;
  excluded: boolean;
}

const BASE_COLOR = [0.90, 0.005, 250] as const;   // oklch border gray
const GLOW_COLOR = [0.65, 0.20, 160] as const;     // oklch accent teal
const GLOW_RADIUS = 150;
const PUSH_RADIUS = 80;
const PUSH_THRESHOLD = 1.5; // px/ms
const PUSH_DISTANCE = 25;
const SHOCKWAVE_RADIUS = 200;
const SHOCKWAVE_FORCE = 30;
const DOT_RADIUS = 2;
const BASE_OPACITY = 0.3;
const COLOR_STEPS = 20;

// Pre-compute color step strings
function buildColorLUT(): string[] {
  const lut: string[] = [];
  for (let i = 0; i <= COLOR_STEPS; i++) {
    const t = i / COLOR_STEPS;
    const l = BASE_COLOR[0] + (GLOW_COLOR[0] - BASE_COLOR[0]) * t;
    const c = BASE_COLOR[1] + (GLOW_COLOR[1] - BASE_COLOR[1]) * t;
    const h = BASE_COLOR[2] + (GLOW_COLOR[2] - BASE_COLOR[2]) * t;
    const opacity = BASE_OPACITY + (1 - BASE_OPACITY) * t;
    lut.push(`oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)} / ${opacity.toFixed(2)})`);
  }
  return lut;
}

const COLOR_LUT = buildColorLUT();

interface Props {
  contentRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLElement | null>;
}

export default function InteractiveDots({ contentRef, containerRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const historyRef = useRef<{ x: number; y: number; t: number }[]>([]);
  const rafRef = useRef<number>(0);
  const lastPushCheck = useRef(0);
  const isMobileRef = useRef(false);

  const buildGrid = useCallback((canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const isMobile = rect.width < 768;
    isMobileRef.current = isMobile;
    const gap = isMobile ? 50 : 35;

    // Measure exclusion zone from contentRef
    let exRect = { left: 0, top: 0, right: 0, bottom: 0 };
    if (contentRef.current) {
      const cr = contentRef.current.getBoundingClientRect();
      const padding = 40;
      exRect = {
        left: cr.left - rect.left - padding,
        top: cr.top - rect.top - padding,
        right: cr.right - rect.left + padding,
        bottom: cr.bottom - rect.top + padding,
      };
    }

    const dots: Dot[] = [];
    const cols = Math.ceil(rect.width / gap);
    const rows = Math.ceil(rect.height / gap);
    const offsetX = (rect.width - (cols - 1) * gap) / 2;
    const offsetY = (rect.height - (rows - 1) * gap) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = offsetX + c * gap;
        const y = offsetY + r * gap;
        const excluded =
          x >= exRect.left && x <= exRect.right &&
          y >= exRect.top && y <= exRect.bottom;
        dots.push({ baseX: x, baseY: y, x, y, displaced: false, excluded });
      }
    }

    // Kill any active tweens on old dots
    for (const dot of dotsRef.current) {
      gsap.killTweensOf(dot);
    }
    dotsRef.current = dots;
  }, [contentRef]);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    buildGrid(canvas);

    // Resize handling
    let resizeTimer: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => buildGrid(canvas), 200);
    });
    ro.observe(canvas.parentElement || canvas);

    if (reducedMotion) {
      // Draw once statically
      const dpr = Math.min(window.devicePixelRatio, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const dot of dotsRef.current) {
        if (dot.excluded) continue;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = COLOR_LUT[0];
        ctx.fill();
      }
      return () => ro.disconnect();
    }

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      const now = performance.now();
      historyRef.current.push({ x: mouseRef.current.x, y: mouseRef.current.y, t: now });
      if (historyRef.current.length > 5) historyRef.current.shift();
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
      historyRef.current = [];
    };

    const pushDot = (dot: Dot, angle: number, distance: number, springDuration: number) => {
      dot.displaced = true;
      gsap.killTweensOf(dot);
      gsap.to(dot, {
        x: dot.baseX + Math.cos(angle) * distance,
        y: dot.baseY + Math.sin(angle) * distance,
        duration: 0.15,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(dot, {
            x: dot.baseX,
            y: dot.baseY,
            duration: springDuration,
            ease: "elastic.out(1, 0.3)",
            onComplete: () => { dot.displaced = false; },
          });
        },
      });
    };

    // Click shockwave
    const onClick = (e: MouseEvent) => {
      if (isMobileRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        if (dot.excluded) continue;
        const dx = dot.baseX - cx;
        const dy = dot.baseY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < SHOCKWAVE_RADIUS && dist > 0) {
          const force = (1 - dist / SHOCKWAVE_RADIUS) * SHOCKWAVE_FORCE;
          const angle = Math.atan2(dy, dx);
          pushDot(dot, angle, force, 1.5);
        }
      }
    };

    const eventTarget = containerRef.current || canvas;
    eventTarget.addEventListener("mousemove", onMouseMove as EventListener);
    eventTarget.addEventListener("mouseleave", onMouseLeave as EventListener);
    eventTarget.addEventListener("click", onClick as EventListener);

    // Animation loop
    const dpr = Math.min(window.devicePixelRatio, 2);

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const now = performance.now();

      // Check for push (throttled)
      if (!isMobileRef.current && now - lastPushCheck.current > 50) {
        lastPushCheck.current = now;
        const hist = historyRef.current;
        if (hist.length >= 2) {
          const first = hist[0];
          const last = hist[hist.length - 1];
          const dt = last.t - first.t;
          if (dt > 0) {
            const dist = Math.sqrt((last.x - first.x) ** 2 + (last.y - first.y) ** 2);
            const speed = dist / dt;
            if (speed > PUSH_THRESHOLD) {
              for (const dot of dotsRef.current) {
                if (dot.excluded || dot.displaced) continue;
                const dx = dot.baseX - mx;
                const dy = dot.baseY - my;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < PUSH_RADIUS && d > 0) {
                  const angle = Math.atan2(dy, dx);
                  pushDot(dot, angle, PUSH_DISTANCE, 1.2);
                }
              }
            }
          }
        }
      }

      // Draw dots
      for (const dot of dotsRef.current) {
        if (dot.excluded) continue;

        let colorIndex = 0;
        if (!isMobileRef.current) {
          const dx = dot.x - mx;
          const dy = dot.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < GLOW_RADIUS) {
            const t = 1 - dist / GLOW_RADIUS;
            colorIndex = Math.round(t * COLOR_STEPS);
          }
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = COLOR_LUT[colorIndex];
        ctx.fill();
      }
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      eventTarget.removeEventListener("mousemove", onMouseMove as EventListener);
      eventTarget.removeEventListener("mouseleave", onMouseLeave as EventListener);
      eventTarget.removeEventListener("click", onClick as EventListener);
      ro.disconnect();
      clearTimeout(resizeTimer);
    };
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 w-full h-full"
      aria-hidden="true"
    />
  );
}
