"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeader from "@/components/ui/SectionHeader";
import { hobbies } from "@/data/hobbies";
import {
  Timer,
  Disc,
  CircleDot,
  Heart,
  BookOpen,
  Coffee,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Timer: <Timer size={24} />,
  Disc: <Disc size={24} />,
  CircleDot: <CircleDot size={24} />,
  Heart: <Heart size={24} />,
  BookOpen: <BookOpen size={24} />,
  Coffee: <Coffee size={24} />,
};

interface CardPos {
  x: number;
  y: number;
  rotation: number;
}

function generateScatterPositions(count: number, containerW: number, containerH: number): CardPos[] {
  const cardW = 140;
  const cardH = 140;
  const positions: CardPos[] = [];
  const padding = 10;

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let pos: CardPos;

    do {
      pos = {
        x: padding + Math.random() * (containerW - cardW - padding * 2),
        y: padding + Math.random() * (containerH - cardH - padding * 2),
        rotation: (Math.random() - 0.5) * 16,
      };
      attempts++;
    } while (
      attempts < 50 &&
      positions.some(
        (p) =>
          Math.abs(p.x - pos.x) < cardW - 20 &&
          Math.abs(p.y - pos.y) < cardH - 20
      )
    );

    positions.push(pos);
  }
  return positions;
}

export default function Hobbies() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [positions, setPositions] = useState<CardPos[]>([]);
  const draggingRef = useRef<{
    index: number;
    startX: number;
    startY: number;
    cardStartX: number;
    cardStartY: number;
  } | null>(null);
  const zIndexRef = useRef(10);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    if (!mobile) {
      const cw = Math.min(1200, window.innerWidth - 48);
      const ch = 420;
      setPositions(generateScatterPositions(hobbies.length, cw, ch));
    }

    const handleResize = () => {
      const nowMobile = window.innerWidth < 768;
      setIsMobile(nowMobile);
      if (!nowMobile) {
        const cw = Math.min(1200, window.innerWidth - 48);
        const ch = 420;
        setPositions(generateScatterPositions(hobbies.length, cw, ch));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Entrance animation
  useGSAP(
    () => {
      if (isMobile || positions.length === 0) return;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const cards = cardsRef.current.filter(Boolean);
      if (prefersReduced || cards.length === 0) return;

      cards.forEach((card, i) => {
        gsap.from(card, {
          y: -200 - Math.random() * 100,
          opacity: 0,
          rotation: (Math.random() - 0.5) * 30,
          duration: 0.8 + Math.random() * 0.3,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          delay: i * 0.1 + Math.random() * 0.05,
        });
      });
    },
    { scope: sectionRef, dependencies: [isMobile, positions] }
  );

  // Desktop drag handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent, index: number) => {
      if (isMobile) return;
      e.preventDefault();
      const card = cardsRef.current[index];
      if (!card) return;

      zIndexRef.current += 1;
      card.style.zIndex = String(zIndexRef.current);

      gsap.to(card, {
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        duration: 0.2,
      });

      draggingRef.current = {
        index,
        startX: e.clientX,
        startY: e.clientY,
        cardStartX: positions[index].x,
        cardStartY: positions[index].y,
      };
    },
    [isMobile, positions]
  );

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const drag = draggingRef.current;
      if (!drag) return;
      const card = cardsRef.current[drag.index];
      if (!card) return;

      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      const newX = drag.cardStartX + dx;
      const newY = drag.cardStartY + dy;

      card.style.left = `${newX}px`;
      card.style.top = `${newY}px`;

      // Slight rotation based on horizontal movement velocity
      const rot = Math.max(-15, Math.min(15, dx * 0.05));
      card.style.transform = `rotate(${rot}deg) scale(1.05)`;
    };

    const handleMouseUp = () => {
      const drag = draggingRef.current;
      if (!drag) return;
      const card = cardsRef.current[drag.index];
      draggingRef.current = null;

      if (!card) return;

      // Update stored position
      const newX = parseFloat(card.style.left);
      const newY = parseFloat(card.style.top);
      setPositions((prev) => {
        const next = [...prev];
        next[drag.index] = { ...next[drag.index], x: newX, y: newY };
        return next;
      });

      // Settle animation
      gsap.to(card, {
        scale: 1,
        rotation: positions[drag.index]?.rotation || 0,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMobile, positions]);

  // Mobile: grid with random rotations
  if (isMobile) {
    return (
      <section id="hobbies" ref={sectionRef} className="bg-surface-alt">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            title="Beyond Work"
            subtitle="Staying active, giving back, and keeping curious."
          />
          <div className="grid grid-cols-2 gap-4">
            {hobbies.map((hobby, i) => (
              <div
                key={hobby.name}
                className="rounded-2xl bg-white border border-border p-5 text-center shadow-sm"
                style={{ transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (2 + Math.random() * 3)}deg)` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary mx-auto mb-3">
                  {iconMap[hobby.icon]}
                </div>
                <h3 className="font-bold text-text text-sm mb-1">
                  {hobby.name}
                </h3>
                <p className="text-xs text-text-muted">{hobby.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop: scattered draggable cards
  return (
    <section id="hobbies" ref={sectionRef} className="bg-surface-alt">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Beyond Work"
          subtitle="Staying active, giving back, and keeping curious. Drag the cards around!"
        />
        <div
          ref={containerRef}
          className="relative mx-auto"
          style={{ height: 420 }}
        >
          {positions.length > 0 &&
            hobbies.map((hobby, i) => (
              <div
                key={hobby.name}
                ref={(el) => { cardsRef.current[i] = el; }}
                onMouseDown={(e) => handleMouseDown(e, i)}
                className="absolute rounded-2xl bg-white border border-border p-5 text-center shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing select-none"
                style={{
                  width: 140,
                  left: positions[i].x,
                  top: positions[i].y,
                  transform: `rotate(${positions[i].rotation}deg)`,
                  zIndex: 10,
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary mx-auto mb-3">
                  {iconMap[hobby.icon]}
                </div>
                <h3 className="font-bold text-text text-sm mb-1">
                  {hobby.name}
                </h3>
                <p className="text-xs text-text-muted">{hobby.description}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
