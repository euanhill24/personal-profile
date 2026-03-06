import type { SkillCategory, TShapeData } from "@/types";

export const tShapeData: TShapeData = {
  breadth: {
    label: "Management Consulting",
    skills: [
      "Strategy & Operating Models",
      "Stakeholder Management",
      "Delivery Leadership",
      "Business Case Development",
      "Change Management",
      "Workshop Facilitation",
      "Agile & DevOps",
      "PMO & Governance",
    ],
  },
  depth: {
    label: "Automation & AI",
    skills: [
      "Process Mining (Celonis)",
      "Intelligent Automation",
      "Generative AI / LLMs",
      "Enterprise App Development",
      "Power Platform",
      "Data & BI Strategy",
    ],
  },
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Microsoft",
    icon: "Monitor",
    skills: [
      "AZ-900 Certified",
      "Power Apps",
      "Power BI",
      "Power Automate",
      "Co-Pilot Studio",
      "AI Foundry",
      "Azure",
    ],
  },
  {
    name: "AI & GenAI",
    icon: "Brain",
    skills: [
      "OpenAI / GPT-4",
      "Claude / Anthropic",
      "RAG Architecture",
      "n8n Workflows",
      "Rainbird",
      "Cognigy",
      "Prompt Engineering",
    ],
  },
  {
    name: "Automation",
    icon: "Zap",
    skills: [
      "Celonis",
      "Appian",
      "UiPath",
      "Automation Anywhere",
      "Process Mining",
      "Lean / Six Sigma",
    ],
  },
  {
    name: "Programming & Data",
    icon: "Code",
    skills: [
      "Python",
      "TypeScript",
      "React",
      "Next.js",
      "SQL",
      "GSAP",
    ],
  },
];
