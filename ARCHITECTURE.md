# Architecture

## Component Hierarchy
```
layout.tsx (Server Component - fonts, metadata)
  page.tsx (Server Component - composes sections)
    Nav (Client - scroll spy, mobile menu)
    Hero (Client - GSAP text reveal, scroll indicator)
    CareerTimeline (Client - ScrollTrigger line draw, timeline items)
    ProfessionalProjects (Client - card grid, modal state)
    PersonalProjects (Client - stagger reveal cards)
    Skills (Client - T-shape animation, skill grid)
    Hobbies (Client - stagger reveal hobby cards)
    Contact (Client - text reveal, magnetic buttons)
```

## GSAP Setup
- `lib/gsap.ts` centralises plugin registration (ScrollTrigger, ScrollToPlugin)
- All components import from `@/lib/gsap`
- `useGSAP()` hook handles cleanup and SSR safety
- `will-change-transform` on animated elements for GPU performance

## Animation Components
- `ScrollReveal` — fade + directional slide on scroll
- `TextReveal` — character/word split animation
- `StaggerReveal` — staggers direct children with configurable delay
- All support `prefers-reduced-motion`

## Design Token System
- Tailwind v4 CSS-first config via `@theme` block in globals.css
- OKLCH colour space for consistent colour relationships
- Fluid typography via clamp()
- 4px base spacing unit

## Data Architecture
- Static TypeScript constants in `src/data/`
- No API calls or database — fully static site
- Types defined in `src/types/index.ts`
