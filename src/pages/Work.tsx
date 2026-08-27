import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { CardArrow, Tag, MetaNum } from '../components/cards';
import { work } from '../data';
import { useI18n } from '../i18n';

const targetOf = (link?: string) =>
  link && link !== '#' ? { href: link, target: '_blank', rel: 'noreferrer' } : { href: '#' };

export default function Work() {
  const [first, second, third] = work;
  const { t } = useI18n();
  const ui = {
    case: { id: 'Kasus 0', en: 'Case 0' },
  };

  return (
    <section className="container-shell py-16 md:py-20">
      <PageHeader page="work" />

      <div className="grid grid-cols-12 gap-4">
        {/* Case study 01 â€” large */}
        <Reveal className="col-span-12 lg:col-span-7">
          <a
            {...targetOf(first?.link)}
            className="card group flex h-full flex-col overflow-hidden"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-line">
              <img
                src={first?.imageUrl}
                alt={first?.title}
                className="card-media h-full w-full object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
              />
              <span className="absolute left-4 top-4 rounded-md border border-line bg-bg/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70">
                {t(ui.case)}1
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <MetaNum num={first?.client ?? ''} />
                  <h3 className="heading-display mt-2 text-2xl uppercase leading-[0.95] tracking-tight sm:text-3xl">
                    {first?.title}
                  </h3>
                </div>
                <CardArrow size={20} />
              </div>
              <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-ink/65">
                {first?.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
                {first?.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </a>
        </Reveal>

        {/* Case study 02 â€” medium */}
        <Reveal className="col-span-12 lg:col-span-5">
          <a
            {...targetOf(second?.link)}
            className="card group flex h-full flex-col overflow-hidden"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-line">
              <img
                src={second?.imageUrl}
                alt={second?.title}
                className="card-media h-full w-full object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
              />
              <span className="absolute left-4 top-4 rounded-md border border-line bg-bg/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70">
                {t(ui.case)}2
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <MetaNum num={second?.client ?? ''} />
                  <h3 className="heading-display mt-2 text-2xl uppercase leading-[0.95] tracking-tight sm:text-3xl">
                    {second?.title}
                  </h3>
                </div>
                <CardArrow size={20} />
              </div>
              <p className="mt-3 text-sm font-medium leading-6 text-ink/65">
                {second?.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
                {second?.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </a>
        </Reveal>

        {/* Case study 03 â€” full-width horizontal */}
        <Reveal className="col-span-12">
          <a
            {...targetOf(third?.link)}
            className="card group flex h-full flex-col overflow-hidden md:flex-row"
          >
            <div className="relative w-full overflow-hidden border-b border-line md:w-1/2 md:border-b-0 md:border-r">
              <img
                src={third?.imageUrl}
                alt={third?.title}
                className="card-media h-64 w-full object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0 md:h-full"
              />
              <span className="absolute left-4 top-4 rounded-md border border-line bg-bg/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70">
                {t(ui.case)}3
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <MetaNum num={third?.client ?? ''} />
                  <h3 className="heading-display mt-2 text-3xl uppercase leading-[0.95] tracking-tight sm:text-4xl">
                    {third?.title}
                  </h3>
                </div>
                <CardArrow size={22} />
              </div>
              <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-ink/65">
                {third?.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {third?.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
