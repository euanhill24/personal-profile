import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "glas",
    company: "GLAS",
    title: "Greenfield Loan Administration Platform",
    summary:
      "Technical Product Owner and Delivery Lead for a greenfield loan administration platform managing $750B in assets under management.",
    heroMetric: "90% automation",
    heroMetricValue: 90,
    heroMetricSuffix: "%",
    heroMetricPrefix: "",
    tags: ["Product Ownership", "Appian", "Python", "Delivery Leadership"],
    challenge:
      "GLAS needed to transform its Client Services operations from manual, error-prone processes into a scalable, automated platform capable of supporting $750B in assets under management.",
    approach:
      "Partnered directly with C-suite stakeholders to define product vision and execution model. Directed 20+ developers across six teams using Appian and Python stack. Led greenfield strategy, roadmap creation, and end-to-end delivery.",
    impact:
      "Delivered 90% automation of Client Services operations, generating \u00A33.26m recurring annual EBITDA contribution. Established a scalable platform that transformed how the business operates.",
    metrics: [
      { label: "Operational Automation", value: "90%" },
      { label: "EBITDA Impact", value: "\u00A33.26m" },
      { label: "Team Size", value: "20+" },
      { label: "Assets Under Management", value: "$750B" },
    ],
  },
  {
    id: "mclaren",
    company: "McLaren",
    title: "Race Day Operations System",
    summary:
      "Led design and development of a race day operations system ensuring correct parts installation with offline capability and geo-redundancy.",
    heroMetric: "Race-critical",
    heroMetricValue: 100,
    heroMetricSuffix: "%",
    heroMetricPrefix: "",
    tags: ["Python", "React", "SQL", "Offline-First"],
    challenge:
      "McLaren needed a system to ensure correct parts installation during race day, requiring offline capability, geo-redundancy, and secure synchronisation across multiple teams in high-pressure environments.",
    approach:
      "Led the design and development using an open-source stack: Python, React, and SQL database. Designed for offline capability and geo-redundancy with authentication and permissions for secure multi-team synchronisation.",
    impact:
      "Improved operational accuracy and efficiency in high-pressure race environments. Enabled secure, real-time synchronisation across globally distributed teams.",
    metrics: [
      { label: "Stack", value: "Python + React + SQL" },
      { label: "Capability", value: "Offline-First" },
      { label: "Security", value: "Auth + Permissions" },
      { label: "Redundancy", value: "Geo-Redundant" },
    ],
  },
  {
    id: "unicef",
    company: "UNICEF",
    title: "Supply Chain Optimisation",
    summary:
      "Led Lean and process mining optimisation of order-to-ship operations, identifying significant efficiency improvements.",
    heroMetric: "13 FTEs saved",
    heroMetricValue: 13,
    heroMetricSuffix: " FTEs",
    heroMetricPrefix: "",
    tags: ["Process Mining", "Lean", "Supply Chain", "Celonis"],
    challenge:
      "UNICEF's order-to-ship supply chain operations had significant inefficiencies impacting their ability to deliver critical supplies globally.",
    approach:
      "Applied process mining and Lean/Black Belt methodologies to analyse Order-to-Ship throughput. Generated and validated actionable insights with senior stakeholders through data-driven analysis.",
    impact:
      "Identified 13 FTEs worth of efficiency improvements. Presented recommendations to senior UNICEF leadership, enabling faster global supply delivery.",
    metrics: [
      { label: "Efficiency Gains", value: "13 FTEs" },
      { label: "Methodology", value: "Lean + Process Mining" },
      { label: "Scope", value: "Order-to-Ship" },
      { label: "Stakeholders", value: "Senior Leadership" },
    ],
  },
  {
    id: "sandvik",
    company: "Sandvik",
    title: "Global Compliance & Performance Tools",
    summary:
      "Designed and delivered a global suite of compliance and performance applications including a Conflict of Interest app for 40,000+ users.",
    heroMetric: "40,000+ users",
    heroMetricValue: 40000,
    heroMetricSuffix: "+",
    heroMetricPrefix: "",
    tags: ["Enterprise Apps", "GPT-4", "Compliance", "Global Rollout"],
    challenge:
      "Sandvik needed global compliance tools that could serve 40,000+ internal and external users across multiple languages and regions, along with performance assessment solutions for underground engineers.",
    approach:
      "Designed and delivered a global suite of applications. Leveraged GPT-4 to enable multi-language deployment and automation. Built 'Map My Skills' solution to assess engineer performance underground.",
    impact:
      "Conflict of Interest app achieved 97% user satisfaction across 40,000+ users. Community Involvement platform delivered 110%+ increase in reporting.",
    metrics: [
      { label: "Users Reached", value: "40,000+" },
      { label: "User Satisfaction", value: "97%" },
      { label: "Reporting Increase", value: "110%+" },
      { label: "AI Integration", value: "GPT-4" },
    ],
  },
  {
    id: "bayer",
    company: "Bayer",
    title: "EMEA Process Mining Operating Model",
    summary:
      "Established the regional process mining practice and delivered first initiatives in the Order-to-Cash supply chain.",
    heroMetric: "\u20AC500k+ identified",
    heroMetricValue: 500,
    heroMetricSuffix: "k+",
    heroMetricPrefix: "\u20AC",
    tags: ["Process Mining", "Celonis", "O2C", "Operating Model"],
    challenge:
      "Bayer's EMEA region lacked a structured approach to process mining, missing opportunities to optimise their Order-to-Cash supply chain in the Crop Science division.",
    approach:
      "Established the EMEA process mining practice from scratch. Partnered with regional innovation teams to deliver the first process mining initiatives focused on Order-to-Cash processes in the agricultural products division.",
    impact:
      "Identified \u20AC500k+ in process improvement opportunities within the Crop Science O2C supply chain, establishing a repeatable model for ongoing optimisation.",
    metrics: [
      { label: "Improvements Identified", value: "\u20AC500k+" },
      { label: "Focus Area", value: "Order-to-Cash" },
      { label: "Division", value: "Crop Science" },
      { label: "Scope", value: "EMEA" },
    ],
  },
  {
    id: "network-rail",
    company: "Network Rail",
    title: "Intelligent Infrastructure BI & Automation",
    summary:
      "Led BI strategy and Power Platform automation across a \u00A3400m infrastructure programme, delivering significant cost savings.",
    heroMetric: "~\u00A3500k saved",
    heroMetricValue: 500,
    heroMetricSuffix: "k",
    heroMetricPrefix: "~\u00A3",
    tags: ["Power Platform", "Power BI", "Automation", "PMO"],
    challenge:
      "A \u00A3400m infrastructure programme needed to digitise its PMO operations, moving away from manual Excel/PowerPoint processes to scalable, automated reporting and portfolio management.",
    approach:
      "Designed BI tooling strategy integrating Power Apps, Power BI, Power Automate, Azure, Project Online & SharePoint. Built and deployed automated reporting dashboards for leadership. Created business case for O365 PPM tooling.",
    impact:
      "Delivered ~\u00A3500k in cost savings through automated reporting and workflow optimisation. Reduced administrative burden across the programme and enabled data-driven decision making.",
    metrics: [
      { label: "Cost Savings", value: "~\u00A3500k" },
      { label: "Programme Value", value: "\u00A3400m" },
      { label: "Tools Built", value: "5+ Apps" },
      { label: "Impact", value: "Programme-wide" },
    ],
  },
  {
    id: "sita-heathrow",
    company: "SITA / Heathrow",
    title: "Global Operating Model Transformation",
    summary:
      "Redesigned infrastructure support from a local to global follow-the-sun model, enabling continuous coverage via Singapore and Montreal command centres.",
    heroMetric: "24/7 coverage",
    heroMetricValue: 24,
    heroMetricSuffix: "/7",
    heroMetricPrefix: "",
    tags: ["Operating Model", "Global Transformation", "Process Design"],
    challenge:
      "SITA needed to transform Heathrow's infrastructure support from a local model to a global follow-the-sun model, while maintaining service quality and local engagement during the transition.",
    approach:
      "Designed future-state processes through global workshops. Created escalation matrices, incident processes, and deployment documentation. Ran senior leadership alignment sessions including innovative Lego Serious Play workshops.",
    impact:
      "Enabled 24/7 continuous engineer coverage via Singapore and Montreal command centres. Improved reliability and coverage while reducing dependency on local resources.",
    metrics: [
      { label: "Coverage", value: "24/7 Global" },
      { label: "Command Centres", value: "3 (Global)" },
      { label: "Approach", value: "Follow-the-Sun" },
      { label: "Workshops", value: "Lego Serious Play" },
    ],
  },
];
