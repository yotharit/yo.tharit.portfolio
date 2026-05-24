import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Mail, ExternalLink, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data.js';

const BASE = import.meta.env.BASE_URL;

// ─── Slide registry: Intro → Experience → Clients → Works → Contact ──────────

const SLIDES = [
  { id: 'intro',      label: 'INTRO' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'clients',    label: 'CLIENTS' },
  { id: 'works',      label: 'WORKS' },
  { id: 'contact',    label: 'CONTACT' },
];

// ─── Slide 1: Intro ───────────────────────────────────────────────────────────

const SlideIntro = () => (
  <div className="w-full h-full flex flex-col md:flex-row">
    <div className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-16 lg:p-24 border-b md:border-b-0 md:border-r border-white/10 min-h-[50vh] md:min-h-0">
      <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-white/40">
        <MapPin className="w-3 h-3" />
        {PORTFOLIO_DATA.personal.location}
      </div>
      <div>
        <p className="text-xs tracking-[0.25em] uppercase text-white/50 mb-6">
          {PORTFOLIO_DATA.personal.title}
        </p>
        <h1 className="text-[14vw] md:text-[7vw] lg:text-[6vw] font-bold leading-[0.85] tracking-tighter uppercase">
          <span className="block">{PORTFOLIO_DATA.personal.name}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
            {PORTFOLIO_DATA.personal.surname}
          </span>
        </h1>
      </div>
      <div className="text-[9px] tracking-[0.3em] text-white/20 uppercase">
        Portfolio · {new Date().getFullYear()}
      </div>
    </div>
    <div className="w-full md:w-1/2 min-h-[40vh] md:min-h-0 relative bg-zinc-900 overflow-hidden">
      <img
        src={`${BASE}P1011960.JPG`}
        alt="Portrait of Tharit Pongsaneh"
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"; }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent pointer-events-none" />
    </div>
  </div>
);

// ─── Slide 2: Experience — compact 2×2 grid, fits in one screen ──────────────

const SlideExperience = () => (
  <div className="w-full h-full flex flex-col p-6 md:p-10 lg:p-14">
    <h2 className="text-[9px] tracking-[0.3em] text-white/40 uppercase mb-4 shrink-0">Selected Experience</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0">
      {PORTFOLIO_DATA.experience.map((job, i) => (
        <div
          key={i}
          className="group border border-white/10 p-5 flex flex-col hover:border-orange-500/30 hover:bg-white/[0.02] transition-all duration-300 overflow-hidden relative"
        >
          {/* Left accent bar on hover */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-400 to-orange-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

          <div className="flex items-start justify-between mb-2 gap-3">
            <div className="min-w-0">
              <h3 className="text-xs md:text-sm font-bold tracking-tight uppercase leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 transition-all duration-300">
                {job.role}
              </h3>
              <p className="text-[10px] tracking-widest text-white/50 mt-0.5">{job.company}</p>
            </div>
            <span className="text-[9px] tracking-widest text-white/30 shrink-0 mt-0.5">{job.period}</span>
          </div>

          <p className="text-[11px] text-white/55 leading-relaxed mb-3 line-clamp-2">{job.description}</p>

          {job.highlights.length > 0 && (
            <div className="flex flex-col gap-1 mt-auto">
              {job.highlights.slice(0, 3).map((h, j) => (
                <div key={j} className="flex items-start gap-1.5 text-[10px] text-white/40">
                  <span className="w-1 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mt-1 rounded-full shrink-0 shadow-[0_0_4px_rgba(245,158,11,0.4)]" />
                  <span className="line-clamp-1 leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

// ─── Slide 3: Clients ─────────────────────────────────────────────────────────

const SlideClients = () => (
  <div className="w-full h-full flex flex-col p-8 md:p-14 lg:p-20 overflow-y-auto">
    <h2 className="text-[9px] tracking-[0.3em] text-white/40 uppercase mb-8 shrink-0">Notable Clients</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 flex-1 min-h-0">
      {PORTFOLIO_DATA.clients.map((client, i) => (
        <div key={i} className="group bg-[#050505] p-5 flex flex-col justify-between hover:bg-white/[0.03] transition-colors duration-500 relative overflow-hidden">
          <div className="flex items-start justify-between mb-3">
            <span className="text-[8px] tracking-[0.25em] text-white/20 font-mono">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-[7px] tracking-[0.2em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">{client.tag}</span>
          </div>
          <div>
            <div className="h-8 flex items-center mb-2">
              <img src={`${BASE}${client.logo}`} alt={client.name} className="h-full max-w-[100px] w-auto object-contain object-left opacity-50 group-hover:opacity-90 transition-all duration-500" />
            </div>
            <p className="text-[10px] text-white/35 leading-relaxed">{client.desc}</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-amber-400 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      ))}
    </div>
  </div>
);

// ─── Slide 4: Works — 3 items per page ───────────────────────────────────────

const ITEMS_PER_PAGE = 3;

const SlideWorks = () => {
  const [page, setPage] = useState(0);
  const touchStartX = useRef(null);
  const wheelLocked = useRef(false);
  const innerRef = useRef(null);

  // Chunk all projects into pages of 3
  const pages = [];
  for (let i = 0; i < PORTFOLIO_DATA.projects.length; i += ITEMS_PER_PAGE) {
    pages.push(PORTFOLIO_DATA.projects.slice(i, i + ITEMS_PER_PAGE));
  }
  const totalPages = pages.length;

  const next = useCallback(() => setPage(p => (p + 1) % totalPages), [totalPages]);
  const prev = useCallback(() => setPage(p => (p - 1 + totalPages) % totalPages), [totalPages]);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  // Inner wheel pages through works; stop propagation so outer shell doesn't advance
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (wheelLocked.current) return;
      if (e.deltaX > 20 || (e.deltaY > 20 && Math.abs(e.deltaX) >= Math.abs(e.deltaY))) {
        next(); wheelLocked.current = true;
      } else if (e.deltaX < -20 || (e.deltaY < -20 && Math.abs(e.deltaX) >= Math.abs(e.deltaY))) {
        prev(); wheelLocked.current = true;
      }
      setTimeout(() => { wheelLocked.current = false; }, 900);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [next, prev]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 md:px-14 py-4 border-b border-white/10 shrink-0">
        <h2 className="text-[9px] tracking-[0.3em] text-white/40 uppercase">Selected Works</h2>
        <div className="flex items-center gap-5">
          <span className="text-xs font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            {String(page + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
          </span>
          <div className="flex gap-2">
            <button onClick={prev} className="p-2.5 border border-white/20 hover:bg-white hover:text-black transition-colors duration-300">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button onClick={next} className="p-2.5 border border-white/20 hover:bg-white hover:text-black transition-colors duration-300">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Page track */}
      <div
        ref={innerRef}
        className="flex-1 overflow-hidden relative min-h-0"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex w-full h-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((pageItems, pageIdx) => (
            <div key={pageIdx} className="w-full h-full shrink-0 flex-none flex flex-col md:flex-row gap-px bg-white/10">
              {pageItems.map((project, idx) => {
                const globalIdx = pageIdx * ITEMS_PER_PAGE + idx;
                return (
                  <div
                    key={idx}
                    className="group flex-1 bg-[#050505] flex flex-col justify-between p-6 md:p-8 lg:p-10 hover:bg-white/[0.025] transition-colors duration-500 relative overflow-hidden"
                  >
                    {/* Bottom accent bar on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-[8px] tracking-[0.25em] text-white/20 font-mono">
                          {String(globalIdx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[7px] tracking-[0.2em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                          {project.category}
                        </span>
                      </div>

                      <div className="mb-4 p-3 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-white/5 w-fit shadow-[0_0_12px_rgba(239,68,68,0.08)]">
                        {React.cloneElement(project.icon, { className: "w-6 h-6 text-orange-500" })}
                      </div>

                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tighter uppercase mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 transition-all duration-500">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-xs md:text-[13px] text-white/55 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                );
              })}

              {/* Filler slots when the last page has fewer than 3 items */}
              {pageItems.length < ITEMS_PER_PAGE &&
                Array.from({ length: ITEMS_PER_PAGE - pageItems.length }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="flex-1 bg-[#050505]" />
                ))
              }
            </div>
          ))}
        </div>
      </div>

      {/* Page dots */}
      <div className="flex justify-center gap-1.5 py-3 border-t border-white/10 shrink-0">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`rounded-full transition-all duration-300 ${i === page ? 'w-4 h-1.5 bg-orange-500' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Slide 5: Contact ─────────────────────────────────────────────────────────

const SlideContact = () => (
  <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-16 text-center relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-red-500/5 blur-3xl" />
    </div>
    <p className="text-[9px] tracking-[0.4em] text-white/30 uppercase mb-8 relative z-10">Let's work together</p>
    <h2 className="text-[10vw] md:text-[5vw] font-bold tracking-tighter uppercase leading-[0.85] mb-12 relative z-10">
      <span className="block text-white/80">GET IN</span>
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">TOUCH</span>
    </h2>
    <div className="flex flex-col sm:flex-row gap-4 relative z-10">
      <a
        href={`mailto:${PORTFOLIO_DATA.personal.email}`}
        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs tracking-widest uppercase hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300"
      >
        <Mail className="w-4 h-4" />{PORTFOLIO_DATA.personal.email}
      </a>
      <a
        href={PORTFOLIO_DATA.personal.linkedin}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-3 px-8 py-4 border border-white/20 font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
      >
        <ExternalLink className="w-4 h-4" />LINKEDIN
      </a>
    </div>
    <div className="mt-12 flex items-center gap-2 text-[10px] tracking-widest text-white/20 relative z-10">
      <MapPin className="w-3 h-3" />{PORTFOLIO_DATA.personal.location}
    </div>
  </div>
);

// ─── Slide components in registry order ──────────────────────────────────────

const SLIDE_COMPONENTS = [SlideIntro, SlideExperience, SlideClients, SlideWorks, SlideContact];

// ─── Shell ────────────────────────────────────────────────────────────────────

export default function PresentationMode({ onExit }) {
  const [current, setCurrent] = useState(0);
  const total = SLIDES.length;
  const desktopRef = useRef(null);
  const wheelLocked = useRef(false);
  const touchStartX = useRef(null);

  const next = useCallback(() => setCurrent(p => Math.min(p + 1, total - 1)), [total]);
  const prev = useCallback(() => setCurrent(p => Math.max(p - 1, 0)), []);

  // Lock body scroll on desktop so the page can't scroll behind the slides
  useEffect(() => {
    const apply = () => { document.body.style.overflow = window.innerWidth >= 768 ? 'hidden' : ''; };
    apply();
    window.addEventListener('resize', apply, { passive: true });
    return () => { window.removeEventListener('resize', apply); document.body.style.overflow = ''; };
  }, []);

  // Keyboard: arrows navigate, Escape exits
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
      else if (e.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, onExit]);

  // Trackpad / mouse wheel navigates slides — throttled to one slide per gesture
  useEffect(() => {
    const el = desktopRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      if (wheelLocked.current) return;
      if (e.deltaY > 0) { next(); wheelLocked.current = true; }
      else if (e.deltaY < 0) { prev(); wheelLocked.current = true; }
      setTimeout(() => { wheelLocked.current = false; }, 1000);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [next, prev]);

  // Horizontal swipe on desktop touchscreen
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  // ── Desktop: horizontal slide carousel ───────────────────────────────────────
  const Desktop = (
    <div
      ref={desktopRef}
      className="hidden md:flex flex-col overflow-hidden"
      style={{ height: 'calc(100vh - 57px)' }}
    >
      <div
        className="flex-1 overflow-hidden relative min-h-0"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex w-full h-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {SLIDE_COMPONENTS.map((SlideComp, i) => (
            <div key={i} className="w-full h-full shrink-0 flex-none">
              <SlideComp />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient progress bar */}
      <div className="h-[2px] bg-white/5 shrink-0">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      {/* Nav bar */}
      <div className="shrink-0 flex items-center justify-between px-8 py-4 border-t border-white/10 bg-[#050505]">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" /> PREV
        </button>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-1.5 bg-orange-500' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/50'}`}
              />
            ))}
          </div>
          <div className="text-[9px] font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} · {SLIDES[current].label}
          </div>
        </div>

        <button
          onClick={next}
          disabled={current === total - 1}
          className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-300"
        >
          NEXT <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  // ── Mobile: vertical snap-scroll, one slide per screen ───────────────────────
  const Mobile = (
    <div
      className="md:hidden overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      style={{ height: 'calc(100vh - 57px)' }}
    >
      {SLIDE_COMPONENTS.map((SlideComp, i) => (
        <div
          key={i}
          className="snap-start overflow-hidden relative border-b border-white/10"
          style={{ height: 'calc(100vh - 57px)' }}
        >
          <div className="absolute top-3 right-4 z-10 pointer-events-none">
            <span className="text-[8px] tracking-[0.3em] text-white/20 font-mono">
              {String(i + 1).padStart(2, '0')} · {SLIDES[i].label}
            </span>
          </div>
          <SlideComp />
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-[#050505] text-white">
      {Desktop}
      {Mobile}
    </div>
  );
}
