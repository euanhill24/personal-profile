# Euan Hill - Personal Profile Website

## Project Conventions

### Tech Stack
- Next.js 15 (App Router) + React 19 + TypeScript
- GSAP 3.14 (ScrollTrigger, ScrollToPlugin) + @gsap/react
- Tailwind CSS v4 (CSS-first config via @theme block in globals.css)
- Lucide React icons

### File Structure
- `src/components/sections/` — Full page sections (Hero, CareerTimeline, etc.)
- `src/components/ui/` — Reusable UI components (Nav, ProjectCard, etc.)
- `src/components/animations/` — Animation wrappers (ScrollReveal, TextReveal, StaggerReveal)
- `src/data/` — Static data files (career.ts, projects.ts, skills.ts, etc.)
- `src/lib/` — Utilities (gsap.ts, utils.ts)
- `src/types/` — TypeScript interfaces

### Coding Rules
- Always import GSAP from `@/lib/gsap` (not directly from `gsap`)
- Always use `useGSAP()` hook for GSAP animations (handles cleanup + SSR safety)
- All animation components must have `"use client"` directive
- `page.tsx` is a Server Component composing client section components
- Tailwind v4: no JS config file — use `@theme` block in globals.css
- Use `cn()` from `@/lib/utils` for conditional classnames
- Support `prefers-reduced-motion` in all animation components

### Design Tokens (defined in globals.css @theme block)
- Primary: oklch(0.25 0.02 260) — Near-black ink
- Accent: oklch(0.62 0.20 25) — Warm terracotta/rust
- Surface: oklch(0.975 0.005 80) — Warm off-white
- Fonts: Space Grotesk (sans), DM Mono (mono)

### Animation Patterns
- Default ease: power3.out (entrances)
- Duration: 0.6-0.8s for reveals, 0.3s for interactions
- ScrollTrigger start: "top 85%"
- Stagger: 0.08-0.12s between items
