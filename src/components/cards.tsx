import type { Attributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

/* ============================================================
   DECORATIVE — technical editorial marks
   ============================================================ */

export function Crosshair({ className = '' }: { className?: string }) {
  return <span aria-hidden className={`crosshair relative block h-3 w-3 ${className}`} />;
}

export function PlusMark({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`font-mono text-sm leading-none text-blue ${className}`}
    >
      +
    </span>
  );
}

/* Small square cluster — abstract preview graphic */
export function Squares({
  rows = 3,
  cols = 5,
  filled = 4,
  className = '',
}: {
  rows?: number;
  cols?: number;
  filled?: number;
  className?: string;
}) {
  const total = rows * cols;
  // deterministic pattern — keep it mechanical, not random
  const filledSet = new Set(Array.from({ length: filled }, (_, i) => i * 7 % total));
  return (
    <div
      aria-hidden
      className={`grid gap-1.5 ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`aspect-square rounded-[3px] border ${
            filledSet.has(i)
              ? 'border-blue bg-blue'
              : 'border-line bg-transparent'
          }`}
        />
      ))}
    </div>
  );
}

/* Thin rule with a coordinate annotation */
export function CoordMark({ label, className = '' }: { label: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45 ${className}`}
    >
      <span className="h-px w-6 bg-line" aria-hidden />
      {label}
    </span>
  );
}

/* ============================================================
   CARD PRIMITIVES
   ============================================================ */

export function CardArrow({ size = 18 }: { size?: number }) {
  return (
    <ArrowUpRight
      size={size}
      className="card-arrow shrink-0 text-ink/40"
      aria-hidden
    />
  );
}

export function MetaNum({ num, className = '' }: { num: string; className?: string }) {
  return (
    <span className={`font-mono text-[11px] tracking-wide text-blue ${className}`}>
      {num}
    </span>
  );
}

export function Tag({ children, className = '' }: { children: ReactNode; className?: string } & Attributes) {
  return (
    <span
      className={`rounded-md border border-line bg-bg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink/60 ${className}`}
    >
      {children}
    </span>
  );
}

/* ============================================================
   CARD ARCHETYPE A — typography-focused
   ============================================================ */
export function CardA({
  num,
  title,
  description,
  to,
  className = '',
}: {
  num: string;
  title: string;
  description: string;
  to: string;
  className?: string;
}) {
  return (
    <Link to={to} className={`card group flex h-full flex-col p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <MetaNum num={num} />
        <CardArrow />
      </div>
      <div className="mt-auto pt-8">
        <h3 className="heading-display text-2xl uppercase leading-[0.95] tracking-tight sm:text-3xl">
          {title}
        </h3>
        <p className="mt-2.5 max-w-sm text-sm font-medium leading-6 text-ink/60">
          {description}
        </p>
      </div>
    </Link>
  );
}

/* ============================================================
   CARD ARCHETYPE B — image / visual preview (3/4 fill)
   ============================================================ */
export function CardB({
  num,
  title,
  description,
  image,
  to,
  className = '',
}: {
  num: string;
  title: string;
  description: string;
  image?: string;
  to: string;
  className?: string;
}) {
  return (
    <Link to={to} className={`card group relative flex h-full overflow-hidden ${className}`}>
      {/* Image fills entire card */}
      {image ? (
        <img
          src={image}
          alt={title}
          className="card-media absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
        />
      ) : (
        <div className="absolute inset-0 dot-grid flex items-center justify-center bg-bg">
          <Squares rows={4} cols={6} filled={5} className="w-24 opacity-70" />
        </div>
      )}

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

      {/* Num badge top-left */}
      <span className="absolute left-3 top-3 z-10 rounded-md border border-line bg-bg/90 px-2 py-1 font-mono text-[10px] tracking-wide text-ink/70">
        {num}
      </span>

      {/* Text content at bottom */}
      <div className="relative mt-auto flex flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="heading-display text-xl uppercase leading-[0.95] tracking-tight text-white sm:text-2xl">
            {title}
          </h3>
          <span className="text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue">
            <CardArrow size={16} />
          </span>
        </div>
        <p className="mt-2 text-sm font-medium leading-6 text-white/80">{description}</p>
      </div>
    </Link>
  );
}

/* ============================================================
   CARD ARCHETYPE C — large numeric
   ============================================================ */
export function CardC({
  num,
  big,
  title,
  description,
  to,
  className = '',
}: {
  num: string;
  big: string;
  title: string;
  description: string;
  to: string;
  className?: string;
}) {
  return (
    <Link to={to} className={`card group flex h-full flex-col p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <MetaNum num={num} />
        <CardArrow />
      </div>
      <div className="mt-auto pt-8">
        <p className="heading-display text-5xl leading-none tracking-tight text-blue sm:text-6xl">
          {big}
        </p>
        <h3 className="heading-display mt-3 text-xl uppercase leading-none tracking-tight">
          {title}
        </h3>
        <p className="mt-2 text-sm font-medium leading-6 text-ink/60">{description}</p>
      </div>
    </Link>
  );
}

/* ============================================================
   CARD ARCHETYPE D — interactive CTA
   ============================================================ */
export function CardD({
  num,
  title,
  description,
  to,
  image,
  className = '',
}: {
  num: string;
  title: string;
  description: string;
  to: string;
  image?: string;
  className?: string;
}) {
  return (
    <Link to={to} className={`card card-cta group flex items-center justify-between gap-4 overflow-hidden p-6 sm:p-7 ${className}`}>
      <div>
        <MetaNum num={num} className="text-ink/55" />
        <h3 className="heading-display mt-2 text-2xl uppercase leading-[0.95] tracking-tight sm:text-3xl">
          {title}
        </h3>
        <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-ink/60">
          {description}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        {image && (
          <div className="hidden h-24 w-32 overflow-hidden rounded-xl border border-blue/30 sm:block">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
            />
          </div>
        )}
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/20 bg-bg">
          <ArrowUpRight size={20} className="card-arrow text-ink" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
