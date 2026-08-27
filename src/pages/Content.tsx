import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { CardArrow, MetaNum, Crosshair } from '../components/cards';
import { content } from '../data';

const targetOf = (link?: string) =>
  link && link !== '#' ? { href: link, target: '_blank', rel: 'noreferrer' } : { href: '#' };

export default function Content() {
  const [featured, ...rest] = content;

  return (
    <section className="container-shell py-16 md:py-20">
      <PageHeader page="content" />

      {/* Featured entry — large editorial card */}
      <Reveal>
        <a
          {...targetOf(featured?.link)}
          className="card group flex flex-col justify-between gap-8 p-6 sm:p-8 md:flex-row md:items-end"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md border border-blue bg-blue-soft px-3 py-1 text-[10px] font-black uppercase tracking-wide text-ink">
                Featured — {featured?.type}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">
                {featured?.date}
              </span>
            </div>
            <h3 className="heading-display mt-5 max-w-3xl text-3xl uppercase leading-[0.9] tracking-tight sm:text-5xl">
              {featured?.title}
            </h3>
            <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-ink/65">
              {featured?.description}
            </p>
          </div>
          <span className="grid h-14 w-14 shrink-0 place-items-center self-start rounded-full border border-line bg-bg md:self-end">
            <CardArrow size={22} />
          </span>
        </a>
      </Reveal>

      {/* Publication index */}
      <div className="mt-12">
        <Reveal>
          <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue">
              Index — {rest.length} entries
            </span>
            <Crosshair />
          </div>
        </Reveal>
        {rest.map((c, i) => (
          <Reveal key={c.id}>
            <a
              {...targetOf(c.link)}
              className="group grid grid-cols-1 gap-3 border-b border-line py-6 transition-colors hover:bg-card sm:grid-cols-[8rem_1fr_auto] sm:items-center sm:gap-6 sm:px-4"
            >
              <div className="flex items-center gap-3 sm:block">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45">
                  {c.date}
                </span>
                <span className="mt-0 inline-block rounded-md border border-line bg-bg px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-ink/60 sm:mt-2">
                  {c.type}
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-3">
                  <MetaNum num={`0${i + 2}`} />
                  <h3 className="heading-display text-xl uppercase leading-[0.95] tracking-tight sm:text-2xl">
                    {c.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-ink/60">
                  {c.description}
                </p>
              </div>
              <ArrowSlot />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ArrowSlot() {
  return (
    <span className="hidden sm:block">
      <CardArrow size={20} />
    </span>
  );
}
