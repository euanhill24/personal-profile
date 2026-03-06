import type { PersonalProject } from "@/types";

export const personalProjects: PersonalProject[] = [
  {
    id: "nature-calendar",
    title: "Nature Calendar",
    subtitle: "Built for Kate",
    description:
      "An interactive month-by-month UK nature guide showing plants, flowers, trees, wildlife, moon phases, tides, foraging opportunities, and suggested activities. Designed to help people stay connected with nature throughout the year with a beautiful scroll-through-the-year format.",
    techStack: ["Next.js", "React", "TypeScript", "GSAP"],
    status: "In Progress",
    gradient: "from-emerald-400 to-teal-600",
    icon: "Leaf",
  },
  {
    id: "cat-finder",
    title: "Cat Finder",
    subtitle: "Built for his sister",
    description:
      "A Tinder-style app that scrapes multiple cat adoption and fostering websites, surfaces matches based on user criteria with AI-generated vibe summaries and ratings. Features a swipe left/right interface and saves liked cats for follow-up. Making the cat-finding journey fun instead of exhausting.",
    techStack: ["React", "Python", "AI/LLM", "Web Scraping"],
    status: "In Progress",
    gradient: "from-orange-400 to-pink-500",
    icon: "Cat",
  },
];
