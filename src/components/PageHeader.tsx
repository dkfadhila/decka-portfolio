import Reveal from './Reveal';
import { pageMeta } from '../data';

export default function PageHeader({ page }: { page: string }) {
  const meta = pageMeta[page];
  if (!meta) return null;

  return (
    <Reveal className="relative mb-14 border-b border-line pb-10 md:mb-20">
      {/* Oversized ghost page number — compositional element */}
      <span
        aria-hidden
        className="ghost-num heading-display pointer-events-none absolute -top-3 right-0 text-[5rem] leading-none sm:-top-6 sm:text-[11rem] md:-top-10"
      >
        {meta.num}
      </span>

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue">
        {meta.num} / {meta.kicker}
      </p>
      <h1 className="heading-display mt-4 max-w-4xl text-5xl uppercase leading-[0.88] tracking-tight sm:text-7xl">
        {meta.title}
      </h1>
      <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-ink/65">
        {meta.lead}
      </p>
    </Reveal>
  );
}
