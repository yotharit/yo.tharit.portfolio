import {
  Wallet,
  Activity,
  ShoppingBag,
  ShieldCheck,
  PlayCircle,
  BarChart2,
  Briefcase,
  Tv,
  Database,
  Gauge,
  Award,
  Bot,
  Code2
} from 'lucide-react';
import React from 'react';

export const PORTFOLIO_DATA = {
  personal: {
    name: "THARIT",
    surname: "PONGSANEH",
    title: "PRODUCT OWNER & PROJECT MANAGER",
    email: "tharit.pongsaneh@gmail.com",
    location: "BANGKOK, THAILAND",
    linkedin: "https://linkedin.com/in/tharit-pongsaneh",
    summary: "Bridging the gap between technical engineering and strategic delivery. With a strong background across **mobile, analytics, and blockchain**, I write precise specs, evaluate feasibility, and drive **seamless delivery**."
  },
  metrics: [
    { label: "PRODUCTS SHIPPED", value: "13+" },
    { label: "VIDEO PLAYBACKS", value: "900M+" },
    { label: "ANALYTICS EVENTS", value: "68B+" },
    { label: "BLOCKCHAIN DAPPS", value: "04" }
  ],
  projects: [
    { title: "KUB WALLET 3.0", category: "WEB3 & MOBILE APP", description: "Next-generation crypto wallet migrating from legacy EOA to Account Abstraction with programmable payment capabilities.", icon: React.createElement(Wallet) },
    { title: "YANGYUEN DAPP", category: "B2B WELLNESS PLATFORM", description: "Corporate wellness DApp on Bitkub Chain integrating gamification, fitness data, and on-chain token wallets.", icon: React.createElement(Activity) },
    { title: "KUB SHOP", category: "LOYALTY MARKETPLACE", description: "dApp loyalty marketplace for KUB GEM Token, fully integrated with native KUB Wallet checkout.", icon: React.createElement(ShoppingBag) },
    { title: "LOYALTY BACKOFFICE", category: "ADMIN PLATFORM", description: "Admin web platform managing marketplace workflows across Yangyuen and KUB Shop with strict role-based access control.", icon: React.createElement(ShieldCheck) },
    { title: "BYTEARK PLAYER", category: "VIDEO INFRASTRUCTURE", description: "Enterprise video player powering 900M+ playbacks with DRM, CSAI/SSAI ads, and casting support.", icon: React.createElement(PlayCircle) },
    { title: "LIGHTHOUSE ANALYTICS", category: "BIG DATA BI PLATFORM", description: "Real-time insights platform processing 68B+ events across VOD, Live, and Ads verticals using Apache Superset.", icon: React.createElement(BarChart2) },
    { title: "ALLIANZ ENTERPRISE", category: "CORPORATE PORTALS", description: "Delivered comprehensive Sales Dashboard and Agent Portal featuring real-time KPIs and automated reporting.", icon: React.createElement(Briefcase) },
    { title: "TRUEID TV", category: "ANDROID TV PLATFORM", description: "Developed core modules including analytics, ads, monitoring, and OTA updates for Thailand's first certified Android TV box.", icon: React.createElement(Tv) },
    { title: "REAL-TIME DATA PIPELINE", category: "DATA INFRASTRUCTURE", description: "Fault-tolerant event pipeline processing 68B+ events with support for concurrent live events and long-tail VOD workloads.", icon: React.createElement(Database) },
    { title: "QOS MONITORING", category: "OBSERVABILITY PLATFORM", description: "Integrated Lighthouse with Grafana — health checks, anomaly detection, and automated Slack alerts enabling near-real-time issue resolution within a 24-hour SLA.", icon: React.createElement(Gauge) },
    { title: "ISO 29110 QMS", category: "QUALITY MANAGEMENT", description: "Led ISO/IEC 29110-compliant Quality Management System deployment end-to-end, securing certification for the organization.", icon: React.createElement(Award) },
    { title: "AI AGENTIC CHATBOT", category: "AI / LLM PRODUCT", description: "Set roadmap and led delivery of LLM-powered analytics assistant — natural-language queries, auto-generated visualizations, and multi-turn conversations over live data.", icon: React.createElement(Bot) },
    { title: "MULTIPLATFORM SDK", category: "DEVELOPER TOOLING", description: "Owned Kotlin Multiplatform SDK (Android/iOS/Flutter) and TypeScript SDK (React, Vue, Angular, JW Player, Video.js) for ByteArk's video and analytics stack.", icon: React.createElement(Code2) }
  ],
  experience: [
    {
      company: "BITKUB BLOCKCHAIN TECHNOLOGY",
      role: "ASSOCIATE IT PROJECT MANAGER",
      period: "DEC 2025 – PRESENT",
      description: "Sole PM across 4 concurrent blockchain products — 70+ features across mobile, web, and backoffice. Owned end-to-end delivery translating on-chain constraints (Account Abstraction) and regulatory requirements into executable specs.",
      highlights: [
        "KUB Wallet 3.0 (Q2 2026): Rebuilt crypto wallet migrating from legacy EOA to Account Abstraction with programmable payment.",
        "Yangyuen (Launched): B2B wellness DApp on Bitkub Chain with gamification and fitness data integration.",
        "KUB Shop (Q2 2026): dApp loyalty marketplace for KUB GEM Token, native KUB Wallet checkout.",
        "Loyalty Backoffice: Admin web platform managing marketplace workflows with RBAC."
      ]
    },
    {
      company: "BYTEARK",
      role: "PRODUCT OWNER & PROJECT MANAGER",
      period: "AUG 2023 – DEC 2025",
      description: "Led a video analytics platform processing 68B+ events and 900M+ playbacks. Promoted internally from Mobile Developer.",
      highlights: [
        "ByteArk Video Player: Owned player powering 900M+ playbacks across VOD/Live, DRM, and Casting.",
        "Lighthouse Analytics BI: Delivered real-time insights processing 68B+ events using customized Apache Superset.",
        "Allianz Enterprise: Delivered Sales Dashboard and Agent Portal with real-time KPIs.",
        "Real-time Data Pipeline: Fault-tolerant pipeline processing 68B+ events with support for concurrent live events and long-tail VOD.",
        "QoS Monitoring: Integrated Lighthouse with Grafana — health checks, anomaly detection, Slack alerts, 24hr SLA.",
        "ISO 29110: Led ISO/IEC 29110-compliant QMS deployment and secured certification for the organization.",
        "AI Agentic Chatbot: Set roadmap for LLM-powered analytics — natural-language queries, auto-generated visualizations, multi-turn conversations.",
        "Multiplatform SDK: Owned Kotlin Multiplatform (Android/iOS/Flutter) and TypeScript SDK (React, Vue, Angular, JW Player, Video.js)."
      ]
    },
    {
      company: "BYTEARK",
      role: "MOBILE DEVELOPER",
      period: "MAY 2022 – AUG 2023",
      description: "Built ByteArk Video Player for Android & Flutter; contributed to Kotlin Multiplatform analytics SDK. Promoted after 15 months.",
      highlights: []
    },
    {
      company: "TRUE DIGITAL GROUP",
      role: "ANDROID DEVELOPER",
      period: "JUN 2020 – APR 2022",
      description: "Developed core modules (analytics, ads, monitoring, OTA updates) for TrueID TV — Thailand's first certified Android TV box.",
      highlights: []
    }
  ],
  skills: [
    { category: "PROJECT MANAGEMENT", items: ["Multi-project Portfolio", "Roadmapping", "Stakeholder Management", "UAT", "Agile/Scrum", "Linear", "JIRA"] },
    { category: "BLOCKCHAIN", items: ["Account Abstraction", "Token Standards (ERC20/721)", "Smart Contracts", "Programmable Payment"] },
    { category: "DATA & ANALYTICS", items: ["SQL", "ClickHouse", "PostgreSQL", "Grafana", "Superset", "Looker Studio"] },
    { category: "ENGINEERING", items: ["Python", "TypeScript", "Kotlin", "Flutter", "Git", "System Architecture"] }
  ],
  clients: [
    { name: "TRUE Digital Group", logo: "logos/tdg.png", tag: "ANDROID TV", desc: "Built core modules — analytics, ads, OTA updates — for TrueID TV, Thailand's first certified Android TV box." },
    { name: "Bitkub Blockchain Technology", logo: "logos/bbt.jpg", tag: "BLOCKCHAIN", desc: "Leading PM across KUB Wallet 3.0, Yangyuen DApp, KUB Shop, and Loyalty Backoffice — 70+ features shipped." },
    { name: "ByteArk", logo: "logos/byteark.webp", tag: "VIDEO INFRA", desc: "Owned video player, analytics platform, and multiplatform SDK powering 900M+ playbacks for Thailand's top broadcasters." },
    { name: "Allianz Ayudhya Insurance", logo: "logos/aagi.png", tag: "ENTERPRISE", desc: "Delivered Sales Dashboard and Agent Portal with real-time KPIs and automated reporting workflows." },
    { name: "Yangyuen", logo: "logos/yangyuen.svg", tag: "WELLNESS DAPP", desc: "Corporate wellness DApp on Bitkub Chain — gamification, fitness data integration, and on-chain token wallets." },
    { name: "Thai PBS", logo: "logos/thaipbs.png", tag: "BROADCASTING", desc: "One ThaiPBS — SSO platform unifying identity across ThaiPBS services. Separately delivered video analytics dashboards surfacing audience and viewing data for the ThaiPBS platform." },
    { name: "PPTV", logo: "logos/pptv.png", tag: "BROADCASTING", desc: "Live and VOD streaming with CSAI/SSAI ads integration, platform data analytics, and video statistics — including EURO 2024 live stream coverage on PPTV." },
    { name: "Learn Corp.", logo: "logos/learn.png", tag: "E-LEARNING", desc: "E-learning video delivery with multi-DRM and cross-platform SDK support. Leveraged video analytics to improve user viewing experience and track playback issues." },
    { name: "BECI (CH3 Plus)", logo: "logos/ch3plus.png", tag: "MEDIA", desc: "Integrated ByteArk Video Player into CH3 Plus and provided analytics support for audience and playback data across one of Thailand's largest digital TV platforms." }
  ],
  education: {
    university: "KASETSART UNIVERSITY",
    degree: "B.ENG. SOFTWARE & KNOWLEDGE ENGINEERING",
    period: "2020",
    honors: "Second Class Honors · GPA 3.37"
  }
};

export const MARQUEE_ITEMS = [
  "PRODUCT OWNER", "PROJECT MANAGER", "BLOCKCHAIN", "VIDEO INFRASTRUCTURE",
  "BIG DATA ANALYTICS", "AI PRODUCTS", "MOBILE DEVELOPMENT", "ACCOUNT ABSTRACTION",
  "REAL-TIME PIPELINES", "AGILE DELIVERY", "STAKEHOLDER MANAGEMENT", "SYSTEM DESIGN"
];
