import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  MapPin,
  Mail,
  ExternalLink,
  Monitor,
  LayoutGrid
} from 'lucide-react';
import { PORTFOLIO_DATA, MARQUEE_ITEMS } from './data.js';
import PresentationMode from './components/PresentationMode.jsx';

// ─── Splash ───────────────────────────────────────────────────────────────────

const SplashScreen = ({ phase }) => (
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
      <div className={`h-full bg-gradient-to-r from-amber-400 to-red-500 transition-all duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${phase >= 1 ? 'w-full' : 'w-0'}`} />
    </div>
  </div>
);

// ─── Custom Cursor ────────────────────────────────────────────────────────────

const CustomCursor = () => {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const scale = useRef(1);
  const targetScale = useRef(1);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };
    const onMouseOver = (e) => {
      targetScale.current = e.target.closest('a, button') ? 2 : 1;
    };
    let rafId;
    const animate = () => {
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.12;
      scale.current += (targetScale.current - scale.current) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px) scale(${scale.current})`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isTouch]);

  if (isTouch) return null;
  return (
    <>
      <div ref={ringRef} className="fixed top-0 left-0 w-8 h-8 border border-white/60 rounded-full pointer-events-none z-[999] mix-blend-difference" />
      <div ref={dotRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[999] mix-blend-difference" />
    </>
  );
};

// ─── Scroll Progress ──────────────────────────────────────────────────────────

const ScrollProgress = () => {
  const barRef = useRef(null);
  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[200] bg-white/5">
      <div ref={barRef} className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500" style={{ width: '0%' }} />
    </div>
  );
};

// ─── Section Nav Dots ─────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'hero',       label: 'INTRO' },
  { id: 'clients',    label: 'CLIENTS' },
  { id: 'works',      label: 'WORKS' },
  { id: 'experience', label: 'EXP' },
  { id: 'skills',     label: 'SKILLS' },
];

const SectionNav = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.4;
      let current = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollY) current = i;
      });
      setActive(current);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
          className="group flex items-center gap-2 justify-end"
          title={s.label}
        >
          <span className="text-[8px] tracking-widest text-white/0 group-hover:text-white/40 transition-all duration-300 uppercase">{s.label}</span>
          <div className={`rounded-full transition-all duration-300 ${active === i ? 'w-4 h-1.5 bg-orange-500' : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-white/50'}`} />
        </button>
      ))}
    </div>
  );
};

// ─── Noise ────────────────────────────────────────────────────────────────────

const Noise = () => (
  <svg className="fixed inset-0 w-full h-full pointer-events-none z-[1] opacity-[0.035]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
);

// ─── Animation primitives ─────────────────────────────────────────────────────

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
      if (entries[0].isIntersecting) { setVisible(true); observer.unobserve(domRef.current); }
    }, { threshold: 0.1 });
    const ref = domRef.current;
    if (ref) observer.observe(ref);
    return () => { if (ref) observer.unobserve(ref); };
  }, []);
  return (
    <div className="overflow-hidden inline-block w-full" ref={domRef}>
      <div
        className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'translate-y-0' : 'translate-y-[110%]'}`}
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
      if (entries[0].isIntersecting) { setVisible(true); observer.unobserve(domRef.current); }
    }, { threshold: 0.1 });
    const ref = domRef.current;
    if (ref) observer.observe(ref);
    return () => { if (ref) observer.unobserve(ref); };
  }, []);
  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ─── View Toggle ──────────────────────────────────────────────────────────────

const ViewToggle = ({ viewMode, onChange }) => (
  <div className="flex items-center gap-1 border border-white/20 rounded-full p-1 pointer-events-auto bg-black/40 backdrop-blur-sm">
    <button
      onClick={() => onChange('portfolio')}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] tracking-[0.15em] font-bold uppercase transition-all duration-300 ${
        viewMode === 'portfolio'
          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.4)]'
          : 'text-white/40 hover:text-white/70'
      }`}
    >
      <LayoutGrid className="w-3 h-3" />
      Portfolio
    </button>
    <button
      onClick={() => onChange('presentation')}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] tracking-[0.15em] font-bold uppercase transition-all duration-300 ${
        viewMode === 'presentation'
          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.4)]'
          : 'text-white/40 hover:text-white/70'
      }`}
    >
      <Monitor className="w-3 h-3" />
      Present
    </button>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [currentProject, setCurrentProject] = useState(0);
  const [splashPhase, setSplashPhase] = useState(0);
  const [viewMode, setViewMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('mode') === 'present' ? 'presentation' : 'portfolio';
  });
  const clientScrollRef = useRef(null);
  const [clientIdx, setClientIdx] = useState(0);
  const clientTotalPages = Math.ceil(PORTFOLIO_DATA.clients.length / 3);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(null);

  // Sync viewMode → URL (query param, works on GitHub Pages)
  useEffect(() => {
    const url = new URL(window.location.href);
    if (viewMode === 'presentation') {
      url.searchParams.set('mode', 'present');
    } else {
      url.searchParams.delete('mode');
    }
    window.history.replaceState(null, '', url.toString());
  }, [viewMode]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const scrollClientBy = (dir) => {
    const el = clientScrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth || el.offsetWidth / 3;
    el.scrollBy({ left: dir * (isMobile ? cardWidth : cardWidth * 3), behavior: 'smooth' });
  };

  const handleClientScroll = (e) => {
    const el = e.currentTarget;
    const cardWidth = el.firstChild?.offsetWidth || el.offsetWidth / 3;
    setClientIdx(Math.round(el.scrollLeft / (isMobile ? cardWidth : cardWidth * 3)));
  };

  // Splash runs once on mount — not re-triggered by mode switch
  useEffect(() => {
    const t1 = setTimeout(() => setSplashPhase(1), 200);
    const t2 = setTimeout(() => setSplashPhase(2), 1000);
    const t3 = setTimeout(() => setSplashPhase(3), 2400);
    const t4 = setTimeout(() => setSplashPhase(4), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const nextProject = () => setCurrentProject(p => (p + 1) % PORTFOLIO_DATA.projects.length);
  const prevProject = () => setCurrentProject(p => (p - 1 + PORTFOLIO_DATA.projects.length) % PORTFOLIO_DATA.projects.length);

  // Arrow keys only drive the project carousel in portfolio mode
  useEffect(() => {
    if (viewMode !== 'portfolio') return;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') nextProject();
      if (e.key === 'ArrowLeft')  prevProject();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [viewMode]);

  const handleCarouselTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleCarouselTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) dx < 0 ? nextProject() : prevProject();
    touchStartX.current = null;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <Noise />
      <CustomCursor />

      {viewMode === 'portfolio' && <ScrollProgress />}
      {viewMode === 'portfolio' && <SectionNav />}

      {splashPhase < 4 && <SplashScreen phase={splashPhase} />}

      {splashPhase >= 3 && (
        <div className="w-full">

          {/* ── HEADER ── */}
          <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-6 py-4 pointer-events-none">
            <div className="font-bold tracking-widest text-lg pointer-events-auto text-white mix-blend-difference">T.P</div>

            {/* View toggle — desktop only */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
              <ViewToggle viewMode={viewMode} onChange={setViewMode} />
            </div>

            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="text-[10px] tracking-[0.2em] uppercase font-bold pointer-events-auto flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:text-white transition-all duration-500 scale-100 hover:scale-105 shadow-lg"
            >
              LET'S TALK <ArrowRight className="w-3 h-3" />
            </a>
          </header>

          {/* ── MODE ROUTER ── */}
          {viewMode === 'presentation' && !isMobile ? (
            <div className="pt-[57px]">
              <PresentationMode onExit={() => setViewMode('portfolio')} />
            </div>
          ) : (

            /* ── PORTFOLIO VIEW ── */
            <>
              {/* HERO */}
              <section id="hero" className="min-h-screen flex flex-col md:flex-row relative border-b border-white/10">
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
                    <div className="absolute -top-16 -right-16 md:-top-20 md:-right-24 w-32 h-32 md:w-40 md:h-40 animate-[spin_12s_linear_infinite] pointer-events-none z-50 text-white mix-blend-difference opacity-90 hidden sm:block">
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                        <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                        <text className="text-[10.5px] font-bold tracking-[0.2em] uppercase">
                          <textPath href="#circlePath">• PRODUCT OWNER • PROJECT MANAGER</textPath>
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
                <div className="w-full md:w-1/2 min-h-[50vh] md:h-auto relative bg-zinc-900 overflow-hidden shrink-0 z-10">
                  <img
                    src={`${import.meta.env.BASE_URL}P1011960.JPG`}
                    alt="Portrait of Tharit Pongsaneh"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent pointer-events-none" />
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
                        className={`p-4 sm:p-6 md:p-4 lg:p-8 xl:p-12 flex flex-col justify-center border-white/10 hover:bg-white/[0.02] transition-colors duration-500 ${idx % 2 === 0 ? 'border-r' : ''} ${idx < 2 ? 'border-b' : ''}`}
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

              {/* MARQUEE */}
              <div style={{ overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '10px 0' }}>
                <style>{`@keyframes marquee-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
                <div style={{ display: 'flex', width: 'max-content', whiteSpace: 'nowrap', willChange: 'transform', animation: 'marquee-scroll 25s linear infinite' }}>
                  {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                    <span key={i} style={{ flexShrink: 0, padding: '0 2rem', whiteSpace: 'nowrap' }} className="text-[9px] tracking-[0.35em] uppercase text-white/30">
                      {item} <span className="text-orange-500/60">·</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* NOTABLE CLIENTS */}
              <section id="clients" className="border-b border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/10">
                  <div className="md:col-span-4 p-6 md:p-12 lg:p-20 border-b md:border-b-0 md:border-r border-white/10 flex items-center">
                    <RevealText><h2 className="text-xs tracking-[0.2em] text-white/50 uppercase">Notable Clients</h2></RevealText>
                  </div>
                  <div className="md:col-span-8 flex justify-between items-center p-6 md:p-12 lg:px-20">
                    <RevealText delay={100}>
                      <div className="text-sm tracking-widest text-white/50 font-mono">
                        {String(clientIdx + 1).padStart(2, '0')} / {String(isMobile ? PORTFOLIO_DATA.clients.length : clientTotalPages).padStart(2, '0')}
                      </div>
                    </RevealText>
                    <div className="flex gap-4">
                      <FadeIn delay={200}>
                        <button onClick={() => scrollClientBy(-1)} className="p-3 border border-white/20 hover:bg-white hover:text-black transition-colors duration-300"><ArrowLeft className="w-4 h-4" /></button>
                      </FadeIn>
                      <FadeIn delay={300}>
                        <button onClick={() => scrollClientBy(1)} className="p-3 border border-white/20 hover:bg-white hover:text-black transition-colors duration-300"><ArrowRight className="w-4 h-4" /></button>
                      </FadeIn>
                    </div>
                  </div>
                </div>
                <div ref={clientScrollRef} onScroll={handleClientScroll} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
                  {PORTFOLIO_DATA.clients.map((client, idx) => (
                    <div key={idx} className="group snap-start shrink-0 w-[80vw] md:w-1/3 border-r border-white/10 last:border-r-0 flex flex-col justify-between p-6 md:p-8 min-h-[240px] relative hover:bg-white/[0.02] transition-colors duration-500">
                      <div className="flex items-start justify-between">
                        <span className="text-[9px] tracking-[0.25em] text-white/20 font-mono">{String(idx + 1).padStart(2, '0')}</span>
                        <span className="text-[7px] tracking-[0.2em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">{client.tag}</span>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="h-14 flex items-center">
                          <img
                            src={`${import.meta.env.BASE_URL}${client.logo}`}
                            alt={client.name}
                            className="h-full max-w-[140px] w-auto object-contain object-left opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.45)]"
                          />
                        </div>
                        <div>
                          <h3 className="text-base font-bold tracking-tight leading-snug mb-1">{client.name}</h3>
                          <p className="text-xs text-white/40 leading-relaxed">{client.desc}</p>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-amber-400 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                  ))}
                </div>
              </section>

              {/* PROJECT CAROUSEL */}
              <section id="works" className="border-b border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/10">
                  <div className="md:col-span-4 p-6 md:p-12 lg:p-20 border-b md:border-b-0 md:border-r border-white/10 flex items-center">
                    <RevealText><h2 className="text-xs tracking-[0.2em] text-white/50 uppercase">Selected Works</h2></RevealText>
                  </div>
                  <div className="md:col-span-8 flex justify-between items-center p-6 md:p-12 lg:px-20">
                    <RevealText delay={100}>
                      <div className="text-sm tracking-widest text-white/50 font-mono">
                        {String(currentProject + 1).padStart(2, '0')} / {String(PORTFOLIO_DATA.projects.length).padStart(2, '0')}
                      </div>
                    </RevealText>
                    <div className="flex gap-4">
                      <FadeIn delay={200}>
                        <button onClick={prevProject} className="p-4 border border-white/20 hover:bg-white hover:text-black transition-colors duration-300"><ArrowLeft className="w-5 h-5" /></button>
                      </FadeIn>
                      <FadeIn delay={300}>
                        <button onClick={nextProject} className="p-4 border border-white/20 hover:bg-white hover:text-black transition-colors duration-300"><ArrowRight className="w-5 h-5" /></button>
                      </FadeIn>
                    </div>
                  </div>
                </div>
                <div className="relative w-full overflow-hidden bg-[#050505]" onTouchStart={handleCarouselTouchStart} onTouchEnd={handleCarouselTouchEnd}>
                  <div className="flex transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] w-full" style={{ transform: `translateX(-${currentProject * 100}%)` }}>
                    {PORTFOLIO_DATA.projects.map((project, i) => (
                      <div key={i} className="w-full shrink-0 flex-none grid grid-cols-1 md:grid-cols-12">
                        <div className="md:col-span-4 p-6 md:p-12 lg:p-20 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center min-h-[30vh] md:min-h-[40vh]">
                          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-white/5 w-fit shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                            {React.cloneElement(project.icon, { className: "w-8 h-8 text-orange-500" })}
                          </div>
                          <h3 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase">{project.title}</h3>
                          <p className="text-xs font-bold tracking-[0.2em] uppercase mt-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">{project.category}</p>
                        </div>
                        <div className="md:col-span-8 p-6 md:p-12 lg:p-20 flex items-center min-h-[30vh] md:min-h-[40vh]">
                          <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed max-w-3xl">{project.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* EXPERIENCE */}
              <section id="experience" className="border-b border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-12">
                  <div className="md:col-span-4 p-6 md:p-12 lg:p-20 border-b md:border-b-0 md:border-r border-white/10">
                    <div className="sticky top-20">
                      <RevealText><h2 className="text-xs tracking-[0.2em] text-white/50 uppercase">Selected Experience</h2></RevealText>
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
                            <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed max-w-3xl mb-8">{job.description}</p>
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
              <section id="skills" className="border-b border-white/10">
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
                            <span>Email Me</span><ArrowRight className="w-4 h-4" />
                          </a>
                        </FadeIn>
                        <FadeIn delay={500}>
                          <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 border border-white/20 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:border-transparent hover:text-white hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300 text-xs tracking-widest uppercase font-bold">
                            <span>LinkedIn Profile</span><ExternalLink className="w-4 h-4" />
                          </a>
                        </FadeIn>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <footer className="p-6 md:p-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-widest text-white/40 uppercase border-t border-white/5">
                <p>© {new Date().getFullYear()} THARIT PONGSANEH</p>
                <div className="flex items-center gap-6">
                  <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="hover:text-orange-400 transition-colors duration-300 flex items-center gap-1.5">
                    <Mail className="w-3 h-3" /> EMAIL
                  </a>
                  <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors duration-300 flex items-center gap-1.5">
                    <ExternalLink className="w-3 h-3" /> LINKEDIN
                  </a>
                  <p>BANGKOK, THAILAND</p>
                </div>
              </footer>
            </>
          )}
        </div>
      )}
    </div>
  );
}
