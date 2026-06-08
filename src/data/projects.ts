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
