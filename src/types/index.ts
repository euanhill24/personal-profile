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
