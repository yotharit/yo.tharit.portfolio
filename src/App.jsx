import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  MapPin,
  Mail,
  ExternalLink,
  Wallet,
  Activity,
  ShoppingBag,
  ShieldCheck,
  PlayCircle,
  BarChart2,
  Briefcase,
  Tv
} from 'lucide-react';

// --- SPLASH SCREEN COMPONENT ---
const SplashScreen = ({ phase }) => {
  return (
    <div className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.87,0,0.13,1)] ${phase === 3 ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="flex flex-col items-center overflow-hidden">
        <div className={`text-[10px] tracking-[0.5em] text-white/50 mb-4 transition-all duration-700 transform ${phase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          SYSTEM INITIALIZING
        </div>
        <div className={`text-4xl md:text-6xl font-bold tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 transition-all duration-1000 transform ${phase >= 2 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
          THARIT.P
        </div>
      </div>

      <div className="absolute bottom-[20%] w-64 h-[1px] bg-white/10 overflow-hidden">
        <div className={`h-full bg-gradient-to-r from-amber-400 to-red-500 transition-all duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${phase >= 1 ? 'w-full' : 'w-0'}`}></div>
      </div>
    </div>
  );
};

// --- DATA ---
const PORTFOLIO_DATA = {
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
    {
      title: "KUB WALLET 3.0",
      category: "WEB3 & MOBILE APP",
      description: "Next-generation crypto wallet migrating from legacy EOA to Account Abstraction with programmable payment capabilities.",
      icon: <Wallet />
    },
    {
      title: "YANGYUEN DAPP",
      category: "B2B WELLNESS PLATFORM",
      description: "Corporate wellness DApp on Bitkub Chain integrating gamification, fitness data, and on-chain token wallets.",
      icon: <Activity />
    },
    {
      title: "KUB SHOP",
      category: "LOYALTY MARKETPLACE",
      description: "dApp loyalty marketplace for KUB GEM Token, fully integrated with native KUB Wallet checkout.",
      icon: <ShoppingBag />
    },
    {
      title: "LOYALTY BACKOFFICE",
      category: "ADMIN PLATFORM",
      description: "Admin web platform managing marketplace workflows across Yangyuen and KUB Shop with strict role-based access control.",
      icon: <ShieldCheck />
    },
    {
      title: "BYTEARK PLAYER",
      category: "VIDEO INFRASTRUCTURE",
      description: "Enterprise video player powering 900M+ playbacks with DRM, CSAI/SSAI ads, and casting support.",
      icon: <PlayCircle />
    },
    {
      title: "LIGHTHOUSE ANALYTICS",
      category: "BIG DATA BI PLATFORM",
      description: "Real-time insights platform processing 68B+ events across VOD, Live, and Ads verticals using Apache Superset.",
      icon: <BarChart2 />
    },
    {
      title: "ALLIANZ ENTERPRISE",
      category: "CORPORATE PORTALS",
      description: "Delivered comprehensive Sales Dashboard and Agent Portal featuring real-time KPIs and automated reporting.",
      icon: <Briefcase />
    },
    {
      title: "TRUEID TV",
      category: "ANDROID TV PLATFORM",
      description: "Developed core modules including analytics, ads, monitoring, and OTA updates for Thailand's first certified Android TV box.",
      icon: <Tv />
    }
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
        "Allianz Enterprise: Delivered Sales Dashboard and Agent Portal with real-time KPIs."
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
  education: {
    university: "KASETSART UNIVERSITY",
    degree: "B.ENG. SOFTWARE & KNOWLEDGE ENGINEERING",
    period: "2020",
    honors: "Second Class Honors · GPA 3.37"
  }
};

// --- ANIMATION & FORMATTING COMPONENTS ---

const GradientText = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <span key={i} className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">{part.slice(2, -2)}</span>
          : part
      )}
    </span>
  );
};

const RevealText = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.unobserve(domRef.current);
      }
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div className="overflow-hidden inline-block w-full" ref={domRef}>
      <div
        className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'translate-y-0' : 'translate-y-[110%]'
          }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.unobserve(domRef.current);
      }
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- MAIN APP ---

export default function Portfolio() {
  const [currentProject, setCurrentProject] = useState(0);
  const [splashPhase, setSplashPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setSplashPhase(1), 200);
    const t2 = setTimeout(() => setSplashPhase(2), 1000);
    const t3 = setTimeout(() => setSplashPhase(3), 2400);
    const t4 = setTimeout(() => setSplashPhase(4), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const nextProject = () => setCurrentProject((prev) => (prev + 1) % PORTFOLIO_DATA.projects.length);
  const prevProject = () => setCurrentProject((prev) => (prev - 1 + PORTFOLIO_DATA.projects.length) % PORTFOLIO_DATA.projects.length);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">

      {splashPhase < 4 && <SplashScreen phase={splashPhase} />}

      {splashPhase >= 3 && (
        <div className="w-full">
          {/* HEADER */}
          <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 mix-blend-difference pointer-events-none">
            <div className="font-bold tracking-widest text-lg pointer-events-auto text-white">T.P</div>
            <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-[10px] tracking-[0.2em] uppercase font-bold pointer-events-auto flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:text-white transition-all duration-500 scale-100 hover:scale-105 shadow-lg">
              LET'S TALK <ArrowRight className="w-3 h-3" />
            </a>
          </header>

          {/* HERO SECTION (Split Screen) */}
          <section className="min-h-screen flex flex-col md:flex-row relative border-b border-white/10">

            {/* Left: Typography */}
            <div className="w-full md:w-1/2 flex-1 flex flex-col justify-end p-6 md:p-12 lg:p-20 border-b md:border-b-0 md:border-r border-white/10 z-20 relative pt-32 pb-12 md:py-12">

              <div className="mb-auto pt-8 md:pt-20">
                <RevealText delay={200}>
                  <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/50 mb-4">
                    <MapPin className="w-3 h-3" />
                    {PORTFOLIO_DATA.personal.location}
                  </div>
                </RevealText>
                <RevealText delay={300}>
                  <p className="text-sm tracking-widest uppercase text-white/70 max-w-sm leading-relaxed">
                    {PORTFOLIO_DATA.personal.title}
                  </p>
                </RevealText>
              </div>

              <div className="pb-8 relative w-fit mt-12 md:mt-0">
                {/* Fun Spinning Badge - Higher Z-Index and mix-blend-difference to float on top */}
                <div className="absolute -top-16 -right-16 md:-top-20 md:-right-24 w-32 h-32 md:w-40 md:h-40 animate-[spin_12s_linear_infinite] pointer-events-none z-50 text-white mix-blend-difference opacity-90 hidden sm:block">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                    <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                    <text className="text-[10.5px] font-bold tracking-[0.2em] uppercase">
                      <textPath href="#circlePath">
                        • PRODUCT OWNER • PROJECT MANAGER
                      </textPath>
                    </text>
                  </svg>
                </div>

                <h1 className="text-[11vw] md:text-[5.5vw] lg:text-[4.5vw] font-bold leading-[0.85] tracking-tighter uppercase relative z-10">
                  <RevealText delay={400}>{PORTFOLIO_DATA.personal.name}</RevealText>
                  <RevealText delay={500}>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                      {PORTFOLIO_DATA.personal.surname}
                    </span>
                  </RevealText>
                </h1>
              </div>

              <div className="absolute bottom-6 right-6 md:right-12 animate-bounce opacity-50">
                <ArrowDown className="w-6 h-6" />
              </div>
            </div>

            {/* Right: Image */}
            <div className="w-full md:w-1/2 min-h-[50vh] md:h-auto relative bg-zinc-900 overflow-hidden shrink-0 z-10">
              <FadeIn delay={600} className="absolute inset-0 w-full h-full">
                <img
                  src="P1011960.jpg"
                  alt="Portrait of Tharit Pongsaneh"
                  className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-[2s] ease-out scale-105 hover:scale-100"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop";
                  }}
                />
              </FadeIn>

              <div className="absolute inset-0 border-x border-white/5 pointer-events-none w-1/2 left-1/4"></div>
              <div className="absolute inset-0 border-y border-white/5 pointer-events-none h-1/2 top-1/4"></div>
            </div>
          </section>

          {/* METRICS & SUMMARY */}
          <section className="border-b border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-7 p-6 md:p-12 lg:p-20 border-b md:border-b-0 md:border-r border-white/10 flex items-center relative overflow-hidden">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight relative z-10">
                  <RevealText delay={300}>
                    <GradientText text={PORTFOLIO_DATA.personal.summary} />
                  </RevealText>
                </h2>
              </div>

              <div className="md:col-span-5 grid grid-cols-2">
                {PORTFOLIO_DATA.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className={`p-4 sm:p-6 md:p-4 lg:p-8 xl:p-12 flex flex-col justify-center border-white/10 hover:bg-white/[0.02] transition-colors duration-500 ${idx % 2 === 0 ? 'border-r' : ''
                      } ${idx < 2 ? 'border-b' : ''}`}
                  >
                    <RevealText delay={idx * 100}>
                      <div className="text-2xl sm:text-4xl md:text-2xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-500">{metric.value}</div>
                    </RevealText>
                    <RevealText delay={idx * 100 + 100}>
                      <div className="text-[9px] lg:text-[10px] tracking-widest text-white/50">{metric.label}</div>
                    </RevealText>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PROJECT CAROUSEL */}
          <section className="border-b border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/10">
              <div className="md:col-span-4 p-6 md:p-12 lg:p-20 border-b md:border-b-0 md:border-r border-white/10 flex items-center">
                <RevealText>
                  <h2 className="text-xs tracking-[0.2em] text-white/50 uppercase">Selected Works</h2>
                </RevealText>
              </div>
              <div className="md:col-span-8 flex justify-between items-center p-6 md:p-12 lg:px-20">
                <RevealText delay={100}>
                  <div className="text-sm tracking-widest text-white/50 font-mono">
                    {String(currentProject + 1).padStart(2, '0')} / {String(PORTFOLIO_DATA.projects.length).padStart(2, '0')}
                  </div>
                </RevealText>
                <div className="flex gap-4">
                  <FadeIn delay={200}>
                    <button onClick={prevProject} className="p-4 border border-white/20 hover:bg-white hover:text-black transition-colors duration-300">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  </FadeIn>
                  <FadeIn delay={300}>
                    <button onClick={nextProject} className="p-4 border border-white/20 hover:bg-white hover:text-black transition-colors duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </FadeIn>
                </div>
              </div>
            </div>

            <div className="relative w-full overflow-hidden bg-[#050505]">
              <div
                className="flex transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] w-full"
                style={{ transform: `translateX(-${currentProject * 100}%)` }}
              >
                {PORTFOLIO_DATA.projects.map((project, i) => (
                  <div key={i} className="w-full shrink-0 flex-none grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-4 p-6 md:p-12 lg:p-20 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center min-h-[30vh] md:min-h-[40vh]">
                      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-white/5 w-fit shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                        {React.cloneElement(project.icon, { className: "w-8 h-8 text-orange-500" })}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase">
                        {project.title}
                      </h3>
                      <p className="text-xs font-bold tracking-[0.2em] uppercase mt-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                        {project.category}
                      </p>
                    </div>
                    <div className="md:col-span-8 p-6 md:p-12 lg:p-20 flex items-center min-h-[30vh] md:min-h-[40vh]">
                      <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed max-w-3xl">
                        {project.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section className="border-b border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-4 p-6 md:p-12 lg:p-20 border-b md:border-b-0 md:border-r border-white/10">
                <div className="sticky top-20">
                  <RevealText>
                    <h2 className="text-xs tracking-[0.2em] text-white/50 uppercase">Selected Experience</h2>
                  </RevealText>
                </div>
              </div>
              <div className="md:col-span-8">
                {PORTFOLIO_DATA.experience.map((job, idx) => (
                  <div key={idx} className="border-b border-white/10 last:border-b-0 group">
                    <div className="p-6 md:p-12 lg:px-20 transition-colors duration-500 hover:bg-white/[0.02]">
                      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                        <RevealText>
                          <div>
                            <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2 uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 transition-all duration-500">{job.role}</h3>
                            <p className="text-sm tracking-widest text-white/60">{job.company}</p>
                          </div>
                        </RevealText>
                        <RevealText delay={100}>
                          <div className="text-xs tracking-widest text-white/40">{job.period}</div>
                        </RevealText>
                      </div>
                      <RevealText delay={200}>
                        <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed max-w-3xl mb-8">
                          {job.description}
                        </p>
                      </RevealText>
                      {job.highlights.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-4">
                          {job.highlights.map((highlight, i) => (
                            <FadeIn key={i} delay={300 + (i * 100)}>
                              <div className="flex items-start gap-3 text-sm text-white/60">
                                <span className="w-1.5 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 mt-1.5 rounded-full shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
                                <span className="leading-relaxed">{highlight}</span>
                              </div>
                            </FadeIn>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SKILLS & EDUCATION */}
          <section className="border-b border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-4 p-6 md:p-12 lg:p-20 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
                <RevealText>
                  <h2 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-12 md:mb-0">Expertise & <br />Education</h2>
                </RevealText>
                <FadeIn delay={200} className="hidden md:block">
                  <div className="text-[10px] tracking-widest text-white/30 uppercase">Systematic Execution</div>
                </FadeIn>
              </div>

              <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 md:p-12 lg:p-20 border-b md:border-b-0 md:border-r border-white/10">
                  <div className="space-y-12">
                    {PORTFOLIO_DATA.skills.map((skillGroup, idx) => (
                      <div key={idx}>
                        <RevealText>
                          <h3 className="text-xs tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 font-bold mb-4">{skillGroup.category}</h3>
                        </RevealText>
                        <div className="flex flex-wrap gap-x-3 gap-y-3">
                          {skillGroup.items.map((item, i) => (
                            <FadeIn key={i} delay={i * 50}>
                              <span className="text-sm tracking-wide text-white/70 px-4 py-2 border border-white/10 rounded hover:border-orange-500 hover:text-orange-400 hover:bg-orange-500/5 transition-all duration-300 cursor-default">{item}</span>
                            </FadeIn>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 md:p-12 lg:p-20 flex flex-col justify-between">
                  <div>
                    <RevealText>
                      <h3 className="text-xs tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 font-bold mb-6">ACADEMIC BACKGROUND</h3>
                    </RevealText>
                    <RevealText delay={100}>
                      <div className="text-2xl font-bold tracking-tighter mb-2">{PORTFOLIO_DATA.education.university}</div>
                    </RevealText>
                    <RevealText delay={200}>
                      <div className="text-sm tracking-widest text-white/70 mb-4">{PORTFOLIO_DATA.education.degree}</div>
                    </RevealText>
                    <FadeIn delay={300}>
                      <div className="text-xs tracking-widest text-white/40">{PORTFOLIO_DATA.education.honors}</div>
                      <div className="text-xs tracking-widest text-white/40 mt-1">CLASS OF {PORTFOLIO_DATA.education.period}</div>
                    </FadeIn>
                  </div>

                  <div className="mt-20 flex flex-col gap-4">
                    <FadeIn delay={400}>
                      <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="flex items-center justify-between p-4 border border-white/20 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:border-transparent hover:text-white hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300 text-xs tracking-widest uppercase font-bold">
                        <span>Email Me</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </FadeIn>
                    <FadeIn delay={500}>
                      <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 border border-white/20 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:border-transparent hover:text-white hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300 text-xs tracking-widest uppercase font-bold">
                        <span>LinkedIn Profile</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </FadeIn>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="p-6 md:p-12 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest text-white/40 uppercase">
            <p>© {new Date().getFullYear()} THARIT PONGSANEH</p>
            <p className="mt-2 md:mt-0">BANGKOK, THAILAND</p>
          </footer>
        </div>
      )}
    </div>
  );
}