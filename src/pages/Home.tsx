import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import {
  Crosshair,
  PlusMark,
  CoordMark,
  CardA,
  CardB,
  CardC,
  CardD,
} from '../components/cards';
import { profile, stats, mapCards, heroMeta } from '../data';

/* ── Tiny label used across the hero + stats ── */
function Meta({ k, n, dim = false }: { k: string; n: string; dim?: boolean }) {
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
        dim ? 'text-ink/50' : 'text-ink/45'
      }`}
    >
      {k} — {n}
    </span>
  );
}

export default function Home() {
  const [about, experience, work, projects, content, contact] = mapCards;

  return (
    <>
      {/* ============================================================ */}
      {/* 01 — HERO · Swiss editorial poster container                  */}
      {/* ============================================================ */}
      <section className="dot-grid px-5 pb-6 pt-6 sm:px-8">
        <Reveal>
          <div className="relative mx-auto flex min-h-[600px] max-w-[80rem] flex-col rounded-[22px] border border-line bg-card p-6 sm:p-10 lg:p-14">
            <Crosshair className="absolute right-8 top-8" />
            <PlusMark className="absolute bottom-8 left-8 opacity-40" />

            {/* ── TOP META ROW ── */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span
                className="crosshair relative inline-block h-[11px] w-[11px]"
                aria-hidden
              />
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-secondary">
                <span className="h-2 w-2 rounded-[2px] bg-blue" aria-hidden />
                {profile.label}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue">
                {profile.capsLine}
              </span>
            </div>

            {/* ── MAIN GRID : 58 / 42 with vertical divider ── */}
            <div className="mt-12 flex flex-1 flex-col gap-y-12 md:flex-row md:gap-y-0">
              {/* ══════════ LEFT — headline + identity + intro + CTA ══════════ */}
              <div className="flex flex-col md:w-[58%] md:pr-14">
                {/* Massive headline */}
                <h1 className="heading-display text-[clamp(2.5rem,11vw,7.75rem)] uppercase leading-[0.86] tracking-tight">
                  {profile.heroLines[0]}
                  <br />I&apos;m{' '}
                  <span className="text-blue">{profile.name}</span>
                  <span className="text-ink/30">.</span>
                </h1>

                {/* Identity line — technical annotation */}
                <div className="mt-10 flex items-center gap-3">
                  <span className="h-7 w-[3px] rounded-full bg-blue" aria-hidden />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">
                    Physics
                  </span>
                  <span className="font-mono text-[11px] text-blue">→</span>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">
                    Data
                  </span>
                  <span className="font-mono text-[11px] text-blue">→</span>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">
                    Impact
                  </span>
                  <span
                    className="ml-3 hidden h-px flex-1 bg-gradient-to-r from-line to-transparent sm:block"
                    aria-hidden
                  />
                  <PlusMark className="hidden opacity-60 sm:inline-block" />
                </div>

                {/* Introduction — two-tier paragraphs */}
                <div className="mt-10 max-w-xl">
                  <p className="text-lg font-medium leading-8 text-ink sm:text-xl sm:leading-9">
                    {profile.subtitle}
                  </p>
                  <p className="mt-5 text-sm leading-6 text-secondary">
                    Previously worked on computational physics, flood event
                    analysis, IoT prototyping, and AI-assisted research
                    workflows. Currently exploring data-driven opportunities and
                    building tools that solve real problems.
                  </p>
                </div>

                {/* CTA row */}
                <div className="mt-auto pt-12">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <Link
                      to="/work"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-[9px] bg-ink px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-blue hover:text-ink sm:w-auto"
                    >
                      View work
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                    <Link
                      to="/contact"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-[9px] border border-line bg-transparent px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:border-blue hover:bg-blue-soft sm:w-auto"
                    >
                      Get in touch
                      <ArrowUpRight size={14} className="text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Vertical divider */}
              <div
                className="hidden w-px shrink-0 self-stretch bg-line md:block"
                aria-hidden
              />

              {/* ══════════ RIGHT — information index panel ══════════ */}
              <div className="flex flex-1 flex-col justify-between gap-10 md:pl-14">
                <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-10">
                  {/* SECTION 01 — BASED IN */}
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary">
                      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-[2px] bg-blue align-middle" aria-hidden />
                      Based In
                    </span>
                    <span className="heading-display mt-2 text-xl uppercase tracking-tight sm:text-2xl">
                      {heroMeta.location}
                    </span>
                    {/* Coordinate annotation under value */}
                    <span className="mt-3 font-mono text-[10px] tracking-[0.14em] text-blue">
                      {heroMeta.coords}
                    </span>
                  </div>

                  {/* SECTION 02 — ROLE */}
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary">
                      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-[2px] bg-blue align-middle" aria-hidden />
                      Role
                    </span>
                    <span className="heading-display mt-2 text-xl uppercase leading-tight tracking-tight sm:text-2xl">
                      {heroMeta.role}
                    </span>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {['Data', 'Research', 'Tech'].map((t) => (
                        <span
                          key={t}
                          className="rounded-[5px] border border-blue/40 bg-blue-soft px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-ink"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 03 — YEAR */}
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary">
                      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-[2px] bg-blue align-middle" aria-hidden />
                      Year
                    </span>
                    <span className="heading-display mt-2 flex items-center gap-2 text-xl uppercase tracking-tight sm:gap-3 sm:text-2xl">
                      {heroMeta.year}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#62B5F5" strokeWidth="1.5" aria-hidden>
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                      </svg>
                    </span>
                    <div className="mt-auto pt-4" aria-hidden>
                      <span className="block h-px w-full bg-gradient-to-r from-line to-transparent" />
                    </div>
                  </div>

                  {/* SECTION 04 — STATUS */}
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary">
                      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-[2px] bg-blue align-middle" aria-hidden />
                      Status
                    </span>
                    <span className="heading-display mt-2 flex items-center gap-2 text-xl uppercase tracking-tight sm:gap-2.5 sm:text-2xl">
                      <span className="pulse-dot h-2 w-2 shrink-0 rounded-full bg-blue sm:h-2.5 sm:w-2.5" aria-hidden />
                      Open to work
                    </span>
                    <span className="mt-3 inline-block max-w-full rounded-[5px] bg-blue-soft px-2.5 py-1.5 font-mono text-[9px] font-bold uppercase leading-relaxed tracking-[0.14em] text-ink/70 sm:mt-4">
                      Available for new opportunities
                    </span>
                  </div>
                </div>

                {/* WAVEFORM — decorative technical signal strip */}
                <div className="relative" aria-hidden>
                  <svg
                    viewBox="0 0 320 56"
                    className="h-14 w-full"
                    fill="none"
                  >
                    {/* baseline */}
                    <line x1="0" y1="46" x2="320" y2="46" stroke="#D2D3D0" strokeWidth="1" />
                    {/* smooth wave */}
                    <path
                      d="M0 40 C 14 34, 26 44, 40 38 S 66 24, 80 32 S 106 46, 120 36 S 146 16, 160 26 S 186 48, 200 38 S 226 20, 240 30 S 266 42, 280 34 S 306 24, 320 30"
                      stroke="#62B5F5"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    {/* measurement ticks */}
                    {[10, 50, 90, 130, 170, 210, 250, 290].map((x) => (
                      <line key={x} x1={x} y1="49" x2={x} y2="53" stroke="#D2D3D0" strokeWidth="1" />
                    ))}
                    {/* peak marker */}
                    <circle cx="153" cy="21" r="2.6" fill="#62B5F5" />
                    <line x1="153" y1="8" x2="153" y2="17" stroke="#62B5F5" strokeWidth="0.9" opacity="0.55" />
                  </svg>
                  <span className="absolute right-0 top-0 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/35">
                    Signal / 01
                  </span>
                </div>

                {/* LOWER RIGHT METRICS — editorial statistics columns */}
                <div className="grid grid-cols-2 gap-y-6 border-t border-line pt-6 sm:grid-cols-4">
                  {[
                    { value: 'B.Sc.', label: 'Physics' },
                    { value: '4+', label: 'Projects' },
                    { value: '5+', label: 'Tools & Tech' },
                    { value: '80+', label: 'Students Mentored' },
                  ].map((s, i) => (
                    <div
                      key={s.label}
                      className={`flex flex-col items-center px-2 text-center ${
                        i === 1 || i === 3
                          ? 'border-l border-line'
                          : i === 2
                            ? 'sm:border-l sm:border-line'
                            : ''
                      }`}
                    >
                      <span className={`heading-display text-2xl leading-none tracking-tight sm:text-3xl ${i === 0 ? 'text-ink' : 'text-blue'}`}>
                        {s.value}
                      </span>
                      <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-secondary">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── BOTTOM MICRO-METADATA ROW ── */}
            <div className="mt-12 flex items-center justify-between border-t border-line pt-5">
              <CoordMark label={heroMeta.coords} />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/35">
                Fig. 01 — Index
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ QUICK STATS — flat horizontal row ============ */}
      <section className="border-b border-line">
        <div className="container-shell py-10 md:py-14">
          <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s, i) => (
                <div key={s.label} className="card group relative overflow-hidden p-5 sm:p-6">
                  {/* Decorative sparkline bg */}
                  <div className="pointer-events-none absolute bottom-0 right-0 h-16 w-24 opacity-[0.08] transition-opacity group-hover:opacity-[0.15]">
                    <svg viewBox="0 0 100 40" fill="none" stroke="#62B5F5" strokeWidth="1.5">
                      <polyline points={Array.from({ length: 12 }, (_, j) => `${j * 9},${20 + Math.sin(j * 0.8 + i) * 14}`).join(' ')} />
                    </svg>
                  </div>
                  <Meta k="Index" n={`S/0${i + 1}`} />
                  <p className={`heading-display mt-3 text-4xl leading-none tracking-tight sm:text-5xl ${i === 2 ? 'text-ink' : 'text-blue'}`}>
                    {s.value}
                  </p>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-secondary">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PORTFOLIO MAP — asymmetric modular grid ============ */}
      <section className="container-shell py-16 md:py-20">
        <Reveal>
          <div className="mb-8 flex items-end justify-between border-b border-line pb-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue">
                01 / Index
              </p>
              <h2 className="heading-display mt-2 text-3xl uppercase tracking-tight sm:text-4xl">
                Portfolio Map
              </h2>
            </div>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-secondary sm:block">
              06 entries
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-12 gap-4">
          {/* ABOUT — large, tall */}
          <Reveal className="col-span-12 sm:col-span-6 lg:col-span-5 lg:row-span-2">
            <CardB
              num={about.num}
              title={about.title}
              description={about.description}
              image={about.image}
              to={about.path}
              className="min-h-[260px]"
            />
          </Reveal>
          {/* EXPERIENCE — medium, numeric */}
          <Reveal className="col-span-12 sm:col-span-6 lg:col-span-3">
            <CardC
              num={experience.num}
              big="3+"
              title={experience.title}
              description={experience.description}
              to={experience.path}
              className="min-h-[220px]"
            />
          </Reveal>
          {/* SELECTED WORK — wide, image */}
          <Reveal className="col-span-12 sm:col-span-6 lg:col-span-4">
            <CardB
              num={work.num}
              title={work.title}
              description={work.description}
              image={work.image}
              to={work.path}
              className="min-h-[220px]"
            />
          </Reveal>
          {/* PROJECTS — medium */}
          <Reveal className="col-span-12 sm:col-span-6 lg:col-span-3">
            <CardA
              num={projects.num}
              title={projects.title}
              description={projects.description}
              to={projects.path}
              className="min-h-[220px]"
            />
          </Reveal>
          {/* CONTENT — small / wide, image */}
          <Reveal className="col-span-12 sm:col-span-6 lg:col-span-4">
            <CardB
              num={content.num}
              title={content.title}
              description={content.description}
              image={content.image}
              to={content.path}
              className="min-h-[220px]"
            />
          </Reveal>
          {/* CONTACT — distinct final CTA */}
          <Reveal className="col-span-12">
            <CardD
              num={contact.num}
              title={contact.title}
              description={contact.description}
              to={contact.path}
              image={contact.image}
            />
          </Reveal>
        </div>
      </section>

      {/* ============ FOCUS STRIP ============ */}
      <section className="border-t border-line bg-card">
        <div className="container-shell py-10">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
                Currently focused on
              </span>
              <div className="flex flex-wrap gap-2">
                {profile.focusPills.map((p, i) => (
                  <span
                    key={p}
                    className={`rounded-lg border px-4 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors ${
                      i === 0
                        ? 'border-blue bg-blue-soft text-ink'
                        : 'border-line bg-bg text-ink/70 hover:border-blue hover:text-ink'
                    }`}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
