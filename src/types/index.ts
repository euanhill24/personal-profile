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
  subtitle: string;
  description: string;
  techStack: string[];
  status: "In Progress" | "Live" | "Concept";
  gradient: string;
  icon: string;
}

export interface Skill {
  name: string;
  category: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export interface TShapeData {
  breadth: { label: string; skills: string[] };
  depth: { label: string; skills: string[] };
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
