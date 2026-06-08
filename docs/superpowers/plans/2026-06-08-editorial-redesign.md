# Editorial Redesign v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the personal profile site with a bold editorial aesthetic, updated content from Notion (anonymised case studies + personal projects), a visual tech stack skills section, restyled hobbies, and location info in the footer.

**Architecture:** The site is a Next.js 15 App Router SPA with static data in `src/data/`, section components in `src/components/sections/`, UI primitives in `src/components/ui/`, and GSAP animations. All design tokens live in `globals.css` via Tailwind v4 `@theme` blocks. We'll swap fonts (Inter/JetBrains Mono → Space Grotesk/DM Mono), overhaul the colour palette (warm ink + editorial accents), replace all data files with Notion-sourced content, and rebuild the Skills and Hobbies sections. The existing animation infrastructure (ScrollReveal, TextReveal, StaggerReveal, GSAP lib) stays intact.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, GSAP 3.14, Lucide React

---

## File Map

### Modified files
| File | What changes |
|------|-------------|
| `src/app/layout.tsx` | Swap font imports: Space Grotesk (sans) + DM Mono (mono) |
| `src/app/globals.css` | New colour palette, font variables, selection colour |
| `src/types/index.ts` | Update `PersonalProject` interface, add `TechItem`/`TechCategory` types, remove `TShapeData`/`SkillCategory` |
| `src/data/projects.ts` | Replace with 6 anonymised case studies from Notion |
| `src/data/personalProjects.ts` | Replace with 7 projects from Notion, updated interface |
| `src/data/skills.ts` | Complete rewrite: visual tech stack categories with icon keys |
| `src/data/hobbies.ts` | Same hobbies, updated descriptions |
| `src/components/sections/PersonalProjects.tsx` | Rebuild for new data shape (links, status badges, richer cards) |
| `src/components/sections/ProfessionalProjects.tsx` | Update to work with anonymised data |
| `src/components/sections/Skills.tsx` | Complete rewrite: grouped icon grid replacing constellation + T-shape |
| `src/components/sections/Hobbies.tsx` | Restyle: clean grid with subtle rotations, no drag |
| `src/components/sections/Contact.tsx` | Add "Based in Brighton & London" location line |
| `src/components/sections/Hero.tsx` | Update title to "AI & Automation Consultant" |
| `src/components/ui/Nav.tsx` | Verify font rendering with new typeface |
| `src/components/ui/ProjectCard.tsx` | Update metric rendering for new data |
| `src/components/ui/ProjectModal.tsx` | Update for anonymised content fields |
| `CLAUDE.md` | Update design tokens section |

### Deleted files
| File | Why |
|------|-----|
| `src/components/ui/SkillConstellation.tsx` | Replaced by tech stack grid |
| `src/components/ui/TShapeVisual.tsx` | Replaced by tech stack grid |

### New files
| File | What it does |
|------|-------------|
| `src/components/ui/TechStackGrid.tsx` | Visual icon grid grouped by category with hover details |

---

## Task 1: Design System — Fonts & Colours

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update font imports in layout.tsx**

Replace Inter + JetBrains Mono with Space Grotesk + DM Mono:

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Euan Hill | AI & Automation Consultant",
  description:
    "T-shaped consultant with broad management consulting expertise and deep specialisation in automation and AI. Based in Brighton & London.",
  keywords: [
    "AI Consultant",
    "Automation",
    "Agentic AI",
    "Process Mining",
    "Management Consulting",
    "Digital Transformation",
  ],
  authors: [{ name: "Euan Hill" }],
  openGraph: {
    title: "Euan Hill | AI & Automation Consultant",
    description:
      "T-shaped consultant specialising in automation and AI.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${dmMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Overhaul globals.css colour palette and font tokens**

Replace the entire `globals.css` with the new editorial design system:

```css
@import "tailwindcss";

@theme inline {
  --color-primary: oklch(0.25 0.02 260);
  --color-primary-light: oklch(0.94 0.02 260);
  --color-accent: oklch(0.62 0.20 25);
  --color-accent-light: oklch(0.92 0.04 25);
  --color-surface: oklch(0.975 0.005 80);
  --color-surface-alt: oklch(0.96 0.01 80);
  --color-text: oklch(0.18 0.02 260);
  --color-text-muted: oklch(0.48 0.02 260);
  --color-border: oklch(0.88 0.01 260);

  --font-sans: var(--font-space-grotesk);
  --font-mono: var(--font-dm-mono);
}

body {
  background: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-sans), system-ui, sans-serif;
}

html {
  font-size: clamp(14px, 1vw + 12px, 18px);
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

section {
  padding-top: clamp(4rem, 8vw, 8rem);
  padding-bottom: clamp(4rem, 8vw, 8rem);
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html {
    scroll-behavior: auto;
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

::selection {
  background: oklch(0.62 0.20 25 / 0.2);
  color: var(--color-text);
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-surface);
}

::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-muted);
}
```

Design rationale:
- **Primary** is near-black ink (`oklch(0.25 0.02 260)`) — editorial, high-contrast, not generic blue
- **Accent** is a warm terracotta/rust (`oklch(0.62 0.20 25)`) — stands out from typical tech-blue AI slop
- **Surface** is warm off-white (`oklch(0.975 0.005 80)`) — not sterile cold white
- **Headings** get `letter-spacing: -0.02em` for the tight editorial feel
- Space Grotesk is geometric but characterful; DM Mono is cleaner than JetBrains for display use

- [ ] **Step 3: Update CLAUDE.md design tokens section**

Replace the "Design Tokens" section in CLAUDE.md:

```markdown
### Design Tokens (defined in globals.css @theme block)
- Primary: oklch(0.25 0.02 260) — Near-black ink
- Accent: oklch(0.62 0.20 25) — Warm terracotta/rust
- Surface: oklch(0.975 0.005 80) — Warm off-white
- Fonts: Space Grotesk (sans), DM Mono (mono)
```

- [ ] **Step 4: Verify build compiles**

Run: `npm run build` from the `personal-profile/` directory.
Expected: Build succeeds. All components still render (colours/fonts change, nothing breaks).

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css CLAUDE.md
git commit -m "feat: new editorial design system — Space Grotesk, warm palette, tight headings"
```

---

## Task 2: Types & Data — Anonymised Case Studies

**Files:**
- Modify: `src/types/index.ts`
- Modify: `src/data/projects.ts`

- [ ] **Step 1: Update the Project interface in types/index.ts**

The `Project` interface stays the same — the existing shape works for anonymised data. No changes needed to the interface itself.

- [ ] **Step 2: Replace projects.ts with anonymised Notion case studies**

Replace the entire file. 6 best case studies, all anonymised per their Notion `Client (sanitised)` field:

```ts
import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "loan-admin-platform",
    company: "Global Loan Administration Provider",
    title: "Greenfield Loan Administration Platform",
    summary:
      "Technical Product Owner for a greenfield loan administration platform replacing legacy technology. Grew team from 4 to 30+ engineers.",
    heroMetric: "90% automation",
    heroMetricValue: 90,
    heroMetricSuffix: "%",
    heroMetricPrefix: "",
    tags: ["Product Ownership", "Appian", "Delivery Leadership", "Greenfield"],
    challenge:
      "A global loan administration and fund services provider needed to replace fragile legacy systems with a scalable, automated platform capable of supporting its full portfolio of assets under management.",
    approach:
      "Partnered directly with C-suite stakeholders to define product vision. Directed a team that grew from 4 to 30+ engineers. Led greenfield strategy, roadmap creation, and end-to-end delivery using an Appian and Python stack.",
    impact:
      "Delivered 90% operational automation across target processes, generating £3M+ in recurring annual EBITDA contribution. Established a scalable platform that transformed how the business operates.",
    metrics: [
      { label: "Operational Automation", value: "90%" },
      { label: "EBITDA Impact", value: "£3M+" },
      { label: "Team Growth", value: "4 → 30+" },
      { label: "Industry", value: "Financial Services" },
    ],
  },
  {
    id: "nte-intelligence",
    company: "Major Facilities Management Company",
    title: "AI-Powered Invoice Intelligence Platform",
    summary:
      "Designed and delivered a multi-agent AI platform automating breach management across ~50,000 invoices/month for a major North American facilities management company.",
    heroMetric: "50k invoices/mo",
    heroMetricValue: 50,
    heroMetricSuffix: "k/mo",
    heroMetricPrefix: "",
    tags: ["Agentic AI", "Azure AI Foundry", "Python", "Solution Architecture"],
    challenge:
      "The client processed ~50,000 service invoices monthly across national retail and hospitality clients. Not-To-Exceed breach management was entirely manual — each resolution took 3–5 days, with identical workflows triggered whether the overage was $3 or $18,000.",
    approach:
      "Conducted structured discovery across 26 opportunities, reviewing 138 SOPs. Designed a multi-agent AI platform on Azure AI Foundry comprising an orchestrator and four specialist agents (Labor, Parts, Warranty, Communications) with a web-based Command Center. Introduced a two-tier intelligence model: deterministic validation on completed jobs and predictive flagging on active jobs.",
    impact:
      "Resolution time reduced from 3–5 days to hours. Warranty savings worth millions annually. Eliminated value-blind processing across all 50,000 monthly invoices. Pre-emptive breach prevention via Tier 2 predictions.",
    metrics: [
      { label: "Monthly Invoices", value: "~50,000" },
      { label: "Resolution Time", value: "Days → Hours" },
      { label: "AI Agents", value: "4 Specialists" },
      { label: "Delivery", value: "260 person-days" },
    ],
  },
  {
    id: "permit-research-agent",
    company: "US Telecom Infrastructure Company",
    title: "Robotic Process Study & AI Agent Delivery",
    summary:
      "Led an engineering track analysing 24 processes across 20,000+ jobs/year, identified $1.35M/year in savings, and delivered a working multi-agent permit research POC.",
    heroMetric: "$1.35M/yr savings",
    heroMetricValue: 1350,
    heroMetricSuffix: "k/yr",
    heroMetricPrefix: "$",
    tags: ["Agentic AI", "Azure AI Agent Service", "TypeScript", "Process Mining"],
    challenge:
      "A US telecom infrastructure engineering company (1,000+ staff) needed to identify and prioritise automation opportunities across fibre and telecom operations spanning 20,000+ jobs/year and 4,300 annual permit applications across 500+ jurisdictions.",
    approach:
      "Conducted 24 discovery workshops. Quantified 21 business cases ranging from $3K to $260K each. Designed and managed a multi-agent AI system — an orchestrator ingests work order polygons, runs GIS spatial queries, then spawns parallel AI research agents to autonomously research jurisdiction-specific permit requirements.",
    impact:
      "Identified $1.35M/year in combined savings (351 FTEs). Delivered a phased roadmap from quick-win RPA ($291K/year) to strategic agentic AI ($1.06M/year). Progressed the permit research agent from discovery to working POC.",
    metrics: [
      { label: "Annual Savings", value: "$1.35M" },
      { label: "Processes Analysed", value: "24" },
      { label: "Jurisdictions Covered", value: "500+" },
      { label: "FTEs Addressed", value: "351" },
    ],
  },
  {
    id: "ai-case-classification",
    company: "Leading Financial Advisory Firm",
    title: "AI Case Classification & Automation",
    summary:
      "Led AI discovery and delivered three case-classification and completeness-checking solutions integrated with Power Automate.",
    heroMetric: "3 AI solutions",
    heroMetricValue: 3,
    heroMetricSuffix: " solutions",
    heroMetricPrefix: "",
    tags: ["Azure AI Foundry", "AI Builder", "Power Automate", "Generative AI"],
    challenge:
      "A leading financial services advisory firm needed to improve efficiency and consistency in paraplanner allocation by automating case classification and pre-screening fact-find completeness.",
    approach:
      "Led AI case classification and completeness-checking design. Evaluated Azure AI Foundry vs AI Builder for each use case. Built orchestration with Power Automate and designed approval/QA steps with iterative testing.",
    impact:
      "Delivered three production solutions using a combination of AI Builder, Azure AI Foundry, and Power Automate — automating classification, completeness-checking, and routing workflows.",
    metrics: [
      { label: "Solutions Delivered", value: "3" },
      { label: "Platform", value: "Azure AI + Power Automate" },
      { label: "Industry", value: "Financial Services" },
      { label: "Scope", value: "Case Classification" },
    ],
  },
  {
    id: "process-mining-practice",
    company: "Global Pharmaceutical Company",
    title: "Process Mining Practice & Supply Chain Analysis",
    summary:
      "Built the Celonis operating model for a Crop Science division and ran supply chain discovery producing a roadmap of 23 improvement projects.",
    heroMetric: "8.9 FTE capacity",
    heroMetricValue: 8,
    heroMetricSuffix: ".9 FTEs",
    heroMetricPrefix: "",
    tags: ["Celonis", "Process Mining", "Operating Models", "Supply Chain"],
    challenge:
      "A global pharmaceutical and life sciences company lacked a structured approach to process mining in its Crop Science division, missing opportunities to optimise EMEA Customer Service operations.",
    approach:
      "Developed the Celonis operating model within a hybrid hub-and-spoke structure. Ran discovery, built process heatmaps, and set up governance across Order Management and Order Fulfilment.",
    impact:
      "Produced a roadmap of 23 improvement projects with an estimated 8.9 FTE capacity creation. Redesigned the automation team's methodology to incorporate process mining as a core capability.",
    metrics: [
      { label: "Capacity Created", value: "8.9 FTEs" },
      { label: "Improvement Projects", value: "23" },
      { label: "Scope", value: "EMEA Supply Chain" },
      { label: "Methodology", value: "Celonis + Lean" },
    ],
  },
  {
    id: "rail-bi-innovation",
    company: "National Rail Infrastructure Operator",
    title: "Intelligent Infrastructure BI & Automation",
    summary:
      "Built an integrated Microsoft tooling strategy and delivered Power BI dashboards, Power Apps, and automation across a major infrastructure programme.",
    heroMetric: "~£500k saved",
    heroMetricValue: 500,
    heroMetricSuffix: "k",
    heroMetricPrefix: "~£",
    tags: ["Power Platform", "Power BI", "Power Apps", "Power Automate"],
    challenge:
      "A major rail infrastructure programme needed to digitise its PMO operations, moving from manual Excel/PowerPoint processes to scalable, automated reporting and portfolio management.",
    approach:
      "Designed a BI tooling strategy integrating Power Apps, Power BI, Power Automate, Azure, Project Online & SharePoint. Built and deployed automated reporting dashboards for leadership in a DevOps-style rapid delivery cycle.",
    impact:
      "Delivered ~£500k in cost savings through automated reporting and workflow optimisation. Reduced administrative burden across the programme and enabled data-driven decision making.",
    metrics: [
      { label: "Cost Savings", value: "~£500k" },
      { label: "Programme Value", value: "£400m" },
      { label: "Apps Built", value: "5+" },
      { label: "Impact", value: "Programme-wide" },
    ],
  },
];
```

- [ ] **Step 3: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: replace case studies with anonymised Notion data (6 projects)"
```

---

## Task 3: Data — Personal Projects from Notion

**Files:**
- Modify: `src/types/index.ts`
- Modify: `src/data/personalProjects.ts`

- [ ] **Step 1: Update PersonalProject interface in types/index.ts**

Replace the `PersonalProject` interface and remove `TShapeData` and `SkillCategory` (no longer used). Add `TechCategory` and `TechItem` for the new skills section:

```ts
export interface CareerEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  startYear: number;
  endYear: number | null;
  description: string;
  achievements: string[];
  tags: string[];
}

export interface Project {
  id: string;
  company: string;
  title: string;
  summary: string;
  heroMetric: string;
  heroMetricValue: number;
  heroMetricSuffix: string;
  heroMetricPrefix?: string;
  tags: string[];
  challenge: string;
  approach: string;
  impact: string;
  metrics: { label: string; value: string }[];
}

export interface PersonalProject {
  id: string;
  title: string;
  headline: string;
  description: string;
  techStack: string[];
  status: "Active" | "Shipped" | "WIP";
  githubUrl?: string;
  liveUrl?: string;
  gradient: string;
  icon: string;
  year: number;
}

export interface TechCategory {
  name: string;
  items: TechItem[];
}

export interface TechItem {
  name: string;
  icon: string;
}

export interface Hobby {
  name: string;
  description: string;
  icon: string;
}

export type SectionId =
  | "hero"
  | "career"
  | "projects"
  | "personal"
  | "skills"
  | "hobbies"
  | "contact";
```

- [ ] **Step 2: Replace personalProjects.ts with Notion data**

```ts
import type { PersonalProject } from "@/types";

export const personalProjects: PersonalProject[] = [
  {
    id: "skylarking",
    title: "Skylarking",
    headline: "Community coffee journal for Skylark Coffee",
    description:
      "A community platform for the world's only 100% non-profit specialty coffee roastery. Users browse current and historic coffees, rate them, and submit tasting notes via an interactive SCA flavour wheel built with D3.js. A daily GitHub Actions cron job scrapes and updates the catalogue automatically.",
    techStack: ["TypeScript", "Next.js", "React", "SQL", "GitHub Actions"],
    status: "Active",
    githubUrl: "https://github.com/euanhill24/Skylarking",
    gradient: "from-amber-600 to-orange-800",
    icon: "Coffee",
    year: 2026,
  },
  {
    id: "catfinder",
    title: "CatFinder",
    headline: "Full-stack app for finding cats available for adoption",
    description:
      "A full-stack application with a Supabase (PostgreSQL) backend for data persistence and a Next.js frontend. Includes a CI/CD pipeline via GitHub Actions and detailed planning documentation (PRD, architecture spec, design spec).",
    techStack: ["TypeScript", "Next.js", "React", "SQL", "GitHub Actions"],
    status: "Active",
    githubUrl: "https://github.com/euanhill24/CatFinder",
    liveUrl: "https://cat-finder-rho.vercel.app",
    gradient: "from-rose-400 to-pink-600",
    icon: "Cat",
    year: 2026,
  },
  {
    id: "presents",
    title: "Presents",
    headline: "Trust-based gift wishlist backed by Notion",
    description:
      "Built to eliminate duplicate gifts at Christmas and birthdays. Notion acts as the database; a Next.js site surfaces items by category, lets visitors claim a gift, and animates a pen-stroke across the title to mark it taken. Surprise mode hides all claimant names from the owner. No auth, no accounts — pure trust.",
    techStack: ["TypeScript", "Next.js", "React", "Notion API"],
    status: "Shipped",
    githubUrl: "https://github.com/euanhill24/presents",
    liveUrl: "https://presents-pi.vercel.app",
    gradient: "from-violet-500 to-purple-700",
    icon: "Gift",
    year: 2026,
  },
  {
    id: "bergen",
    title: "Bergen",
    headline: "Collaborative travel companion for a group trip",
    description:
      "Built for 7 friends travelling to Bergen, Norway. Replaced a messy Google Doc with a purpose-built site: day-by-day itinerary, curated local recommendations with prices in NOK, an interactive map of all locations, and a practical travel guide.",
    techStack: ["TypeScript", "Next.js", "React"],
    status: "Shipped",
    githubUrl: "https://github.com/euanhill24/bergen",
    liveUrl: "https://bergen-pi.vercel.app",
    gradient: "from-sky-400 to-blue-700",
    icon: "Map",
    year: 2026,
  },
  {
    id: "nature-timeline",
    title: "Nature Timeline",
    headline: "Interactive visual calendar of UK wildlife and natural events",
    description:
      "An educational data visualisation showing when natural phenomena occur in the UK — migrating birds, flowering plants, insect seasons — arranged as an interactive timeline. Built to explore seasonal patterns in British nature.",
    techStack: ["JavaScript", "Data Visualisation"],
    status: "WIP",
    githubUrl: "https://github.com/euanhill24/nature-timeline",
    gradient: "from-emerald-400 to-teal-600",
    icon: "Leaf",
    year: 2026,
  },
  {
    id: "kanban-tracker",
    title: "Kanban Project Tracker",
    headline: "Lightweight personal Kanban board",
    description:
      "A self-hosted Kanban board for tracking personal projects through stages (backlog, in progress, shipped). Built because existing tools felt too heavy for personal use.",
    techStack: ["TypeScript", "Next.js", "React"],
    status: "Shipped",
    liveUrl: "https://kanban-project-tracker-five.vercel.app",
    githubUrl: "https://github.com/euanhill24/kanban-project-tracker",
    gradient: "from-slate-500 to-zinc-700",
    icon: "LayoutDashboard",
    year: 2026,
  },
];
```

- [ ] **Step 3: Verify build compiles**

Run: `npm run build`
Expected: Build will fail because `PersonalProjects.tsx` still references old interface fields (`subtitle`). That's expected — we fix it in Task 5.

- [ ] **Step 4: Commit**

```bash
git add src/types/index.ts src/data/personalProjects.ts
git commit -m "feat: update types and personal projects data from Notion"
```

---

## Task 4: Data — Skills Tech Stack

**Files:**
- Modify: `src/data/skills.ts`

- [ ] **Step 1: Replace skills.ts with tech stack categories**

```ts
import type { TechCategory } from "@/types";

export const techCategories: TechCategory[] = [
  {
    name: "AI & GenAI",
    items: [
      { name: "Azure AI Foundry", icon: "Brain" },
      { name: "Azure AI Agent Service", icon: "Bot" },
      { name: "OpenAI / GPT-4", icon: "Sparkles" },
      { name: "Claude / Anthropic", icon: "MessageSquare" },
      { name: "RAG Architecture", icon: "Database" },
      { name: "Prompt Engineering", icon: "Pencil" },
      { name: "n8n Workflows", icon: "Workflow" },
    ],
  },
  {
    name: "Automation & Process Mining",
    items: [
      { name: "Celonis", icon: "Activity" },
      { name: "UiPath", icon: "Cog" },
      { name: "Automation Anywhere", icon: "RefreshCw" },
      { name: "Power Automate", icon: "Zap" },
      { name: "Appian", icon: "Layers" },
      { name: "Lean / Six Sigma", icon: "Target" },
    ],
  },
  {
    name: "Microsoft & Cloud",
    items: [
      { name: "Power Apps", icon: "LayoutGrid" },
      { name: "Power BI", icon: "BarChart3" },
      { name: "Co-Pilot Studio", icon: "Headphones" },
      { name: "Azure Functions", icon: "Cloud" },
      { name: "Dataverse", icon: "Database" },
      { name: "SharePoint", icon: "FolderOpen" },
    ],
  },
  {
    name: "Programming & Data",
    items: [
      { name: "Python", icon: "Code" },
      { name: "TypeScript", icon: "FileCode" },
      { name: "React / Next.js", icon: "Globe" },
      { name: "Node.js", icon: "Server" },
      { name: "SQL", icon: "Table" },
      { name: "Django / Flask", icon: "Box" },
    ],
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/skills.ts
git commit -m "feat: replace skill categories with visual tech stack data"
```

---

## Task 5: Component — Personal Projects Section

**Files:**
- Modify: `src/components/sections/PersonalProjects.tsx`

- [ ] **Step 1: Rebuild PersonalProjects.tsx for new data shape**

```tsx
"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { personalProjects } from "@/data/personalProjects";
import {
  Coffee, Cat, Gift, Map, Leaf, LayoutDashboard,
  ExternalLink, Github,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Coffee: <Coffee size={28} />,
  Cat: <Cat size={28} />,
  Gift: <Gift size={28} />,
  Map: <Map size={28} />,
  Leaf: <Leaf size={28} />,
  LayoutDashboard: <LayoutDashboard size={28} />,
};

const statusColors: Record<string, string> = {
  Shipped: "bg-emerald-100 text-emerald-800",
  Active: "bg-amber-100 text-amber-800",
  WIP: "bg-slate-100 text-slate-600",
};

export default function PersonalProjects() {
  return (
    <section id="personal" className="bg-surface-alt">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Side Projects"
          subtitle="Things I build because I want to, not because I have to."
        />

        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={0.1}
        >
          {personalProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-white border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-250 overflow-hidden"
            >
              <div
                className={`h-20 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
              >
                <div className="text-white/90">
                  {iconMap[project.icon]}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-text group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusColors[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="text-sm font-medium text-text-muted mb-2">
                  {project.headline}
                </p>

                <p className="text-sm text-text-muted leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-light text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-accent transition-colors"
                    >
                      <Github size={14} />
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-accent transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/PersonalProjects.tsx
git commit -m "feat: rebuild personal projects section with Notion data, links, status badges"
```

---

## Task 6: Component — Skills as Visual Tech Stack Grid

**Files:**
- Create: `src/components/ui/TechStackGrid.tsx`
- Modify: `src/components/sections/Skills.tsx`
- Delete: `src/components/ui/SkillConstellation.tsx`
- Delete: `src/components/ui/TShapeVisual.tsx`

- [ ] **Step 1: Create TechStackGrid.tsx**

```tsx
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
```

- [ ] **Step 2: Rewrite Skills.tsx**

```tsx
"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import TechStackGrid from "@/components/ui/TechStackGrid";

export default function Skills() {
  return (
    <section id="skills">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Technology & Tools"
          subtitle="The platforms, languages, and frameworks I work with day to day."
        />
        <TechStackGrid />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Delete old skill components**

```bash
rm src/components/ui/SkillConstellation.tsx
rm src/components/ui/TShapeVisual.tsx
```

- [ ] **Step 4: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds. No remaining imports of SkillConstellation or TShapeVisual.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/TechStackGrid.tsx src/components/sections/Skills.tsx src/data/skills.ts
git add -u  # stages the deletions
git commit -m "feat: replace skill constellation with visual tech stack grid"
```

---

## Task 7: Component — Hobbies Restyle

**Files:**
- Modify: `src/components/sections/Hobbies.tsx`

- [ ] **Step 1: Rewrite Hobbies.tsx as a clean grid without drag**

```tsx
"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { hobbies } from "@/data/hobbies";
import {
  Timer, Disc, CircleDot, Heart, BookOpen, Coffee,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Timer: <Timer size={22} />,
  Disc: <Disc size={22} />,
  CircleDot: <CircleDot size={22} />,
  Heart: <Heart size={22} />,
  BookOpen: <BookOpen size={22} />,
  Coffee: <Coffee size={22} />,
};

export default function Hobbies() {
  return (
    <section id="hobbies" className="bg-surface-alt">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Beyond Work"
          subtitle="Staying active, giving back, and keeping curious."
        />

        <StaggerReveal
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          stagger={0.08}
        >
          {hobbies.map((hobby) => (
            <div
              key={hobby.name}
              className="group rounded-xl bg-white border border-border p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-lg bg-accent-light flex items-center justify-center text-accent mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                {iconMap[hobby.icon]}
              </div>
              <h3 className="font-bold text-text text-sm mb-1">
                {hobby.name}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {hobby.description}
              </p>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hobbies.tsx
git commit -m "feat: restyle hobbies as clean responsive grid, remove drag mechanic"
```

---

## Task 8: Component — Contact & Hero Updates

**Files:**
- Modify: `src/components/sections/Contact.tsx`
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Add location to Contact.tsx**

In `Contact.tsx`, find the closing `</div>` before the "Built with" line (around the buttons div). Add the location line between the buttons and the "Built with" text:

Find this block:
```tsx
          <p className="mt-16 text-sm text-text-muted text-center">
            Built with Next.js, GSAP, and Tailwind CSS
          </p>
```

Replace with:
```tsx
          <p className="mt-12 text-base text-text-muted text-center font-medium">
            Based in Brighton & London
          </p>
          <p className="mt-4 text-sm text-text-muted text-center">
            Built with Next.js, GSAP, and Tailwind CSS
          </p>
```

- [ ] **Step 2: Update Hero.tsx title**

In `Hero.tsx`, find:
```tsx
          <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-semibold text-primary mb-6">
            Technology Consultant
          </p>
```

Replace with:
```tsx
          <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-semibold text-accent mb-6">
            AI & Automation Consultant
          </p>
```

Note: Changed `text-primary` to `text-accent` so the subtitle uses the warm terracotta accent colour against the near-black primary.

- [ ] **Step 3: Fix the GitHub link in Contact.tsx**

In `Contact.tsx`, find:
```tsx
              href="https://github.com/euanhill"
```

Replace with:
```tsx
              href="https://github.com/euanhill24"
```

- [ ] **Step 4: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Contact.tsx src/components/sections/Hero.tsx
git commit -m "feat: add location to footer, update hero title, fix GitHub link"
```

---

## Task 9: Update globals.css accent-light token

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add accent-light to the theme block**

The hobbies section uses `bg-accent-light`. Add it to the `@theme inline` block after `--color-accent`:

Find:
```css
  --color-accent: oklch(0.62 0.20 25);
```

Add after it:
```css
  --color-accent-light: oklch(0.92 0.04 25);
```

- [ ] **Step 2: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add accent-light colour token"
```

---

## Task 10: Clean Up & Final Build

**Files:**
- Modify: `src/app/page.tsx` (verify section order)
- Delete: leftover default Next.js assets from `public/`

- [ ] **Step 1: Remove default Next.js assets**

```bash
rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

- [ ] **Step 2: Verify the full build**

Run: `npm run build`
Expected: Build succeeds with zero errors.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: remove default Next.js assets and clean up"
```

- [ ] **Step 4: Push the branch**

```bash
git push -u origin redesign/v2-editorial
```
