import type { CareerEntry } from "@/types";

export const careerEntries: CareerEntry[] = [
  {
    id: "roboyo-manager",
    company: "Roboyo",
    role: "Consulting Manager",
    period: "2023 - Present",
    startYear: 2023,
    endYear: null,
    description:
      "Client lead and delivery owner managing C-suite stakeholders, multi-million-pound benefits cases, and cross-functional delivery teams of up to 20+ engineers and analysts. Line managing and coaching consultants across multiple engagements.",
    achievements: [
      "Led greenfield loan administration platform delivering 90% operational automation and \u00A33.26m recurring EBITDA impact",
      "Established EMEA process mining practice at Bayer, identifying \u20AC500k+ in O2C improvements",
      "Created Roboyo's first Generative AI solutions adopted by 600+ employees globally",
      "Led UNICEF supply chain optimisation identifying 13 FTEs of efficiency gains",
    ],
    tags: ["Product Leadership", "AI/GenAI", "Process Mining", "Delivery"],
  },
  {
    id: "roboyo-senior",
    company: "Roboyo",
    role: "Senior Consultant",
    period: "Feb 2022 - 2023",
    startYear: 2022,
    endYear: 2023,
    description:
      "Delivered automation and intelligent technology solutions across global enterprises, leading workstreams and managing client relationships.",
    achievements: [
      "Designed global compliance applications for Sandvik reaching 40,000+ users with 97% satisfaction",
      "Led McLaren race day operations system using Python, React, and SQL",
      "Deployed GPT-4 for multilingual support across enterprise applications",
    ],
    tags: ["Automation", "Enterprise Apps", "Client Delivery"],
  },
  {
    id: "nh-consultant",
    company: "North Highland",
    role: "Management Consultant",
    period: "2020 - Jan 2022",
    startYear: 2020,
    endYear: 2022,
    description:
      "Promoted from Analyst. Led digital transformation workstreams, BI strategy, and process mining initiatives across major UK infrastructure and technology programmes.",
    achievements: [
      "Automated PMO reporting at Network Rail via Power Platform, delivering ~\u00A3500k cost savings",
      "Secured Celonis partnership and led process mining pilots improving data accuracy by 13%",
      "Redesigned SITA's Heathrow infrastructure support from local to global operating model",
      "Digitised Network Rail CMO operations from Excel to Power Platform suite",
    ],
    tags: ["Digital Transformation", "Process Mining", "Power Platform", "Operating Models"],
  },
  {
    id: "nh-analyst",
    company: "North Highland",
    role: "Analyst",
    period: "May 2019 - 2020",
    startYear: 2019,
    endYear: 2020,
    description:
      "Delivered strategy assessments, DevOps maturity reviews, and operating model design across technology and financial services organisations.",
    achievements: [
      "Conducted DevOps maturity assessments at Direct Line Group and ARM Holdings",
      "Delivered IT strategy health check at Atkins",
      "Designed future operating models for SITA's Heathrow transformation",
    ],
    tags: ["Strategy", "DevOps", "Operating Models"],
  },
  {
    id: "nh-intern",
    company: "North Highland",
    role: "Intern",
    period: "Jul 2016 - Jul 2017",
    startYear: 2016,
    endYear: 2017,
    description:
      "Year-long placement as PMO Analyst supporting strategic technology programmes at Royal Mail and contributing to service line launches.",
    achievements: [
      "Supported PMO function across four technology workstreams at Royal Mail",
      "Managed launch of global Tech & Digital service line",
      "Contributed to Agile & DevOps assessments at ARM Holdings",
    ],
    tags: ["PMO", "Agile", "Service Line Launch"],
  },
];

export const education = {
  institution: "University of Bath",
  degree: "(Hons) Economics with Year-Long Work Placement",
  grade: "2:1",
  period: "2014 - 2018",
};
