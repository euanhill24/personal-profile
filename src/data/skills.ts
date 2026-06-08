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
