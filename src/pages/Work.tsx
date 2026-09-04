import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { CardArrow, Tag, MetaNum } from '../components/cards';
import { work } from '../data';
import { useI18n, institutionName } from '../i18n';

const spans = [
  'col-span-12 lg:col-span-7',
  'col-span-12 lg:col-span-5',
  'col-span-12',
];

export default function Work() {
  const { t, lang } = useI18n();
  const ui = {
    case: { id: 'Kasus 0', en: 'Case 0' },
    period: { id: 'Periode', en: 'Period' },
    stack: { id: 'Fokus', en: 'Focus' },
    status: { id: 'Status', en: 'Status' },
  };

  return (
    <section className="container-shell py-16 md:py-20">
      <PageHeader page="work" />

      <div className="grid grid-cols-12 gap-4">
        {work.map((item, i) => {
          const Wrapper = item.detailPath ? Link : 'a';
          const wrapperProps = item.detailPath
            ? { to: item.detailPath }
            : { href: item.link || '#', target: '_blank', rel: 'noreferrer' };

          return (
            <Reveal key={item.id} className={spans[i % spans.length]}>
              <Wrapper
                {...wrapperProps}
                className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:border-blue"
              >
                {/* Media Preview Box with full color */}
                <div
                  className={`relative w-full overflow-hidden border-b border-line ${
                    i === 2 ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[16/10]'
                  }`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="card-media h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-md border border-line bg-bg/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70">
                    {t(ui.case)}{i + 1}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <MetaNum num={institutionName(item.client, lang)} />
                      <h3 className="heading-display mt-2 text-2xl uppercase leading-[0.95] tracking-tight sm:text-3xl">
                        {item.title}
                      </h3>
                    </div>
                    <CardArrow size={20} />
                  </div>

                  <p className="mt-3 text-sm font-medium leading-6 text-ink/65">
                    {item.description}
                  </p>

                  {/* Technical metadata list matching Projects */}
                  <dl className="mt-5 border-t border-line pt-4">
                    {[
                      { k: t(ui.period), v: item.period },
                      { k: t(ui.stack), v: item.stack },
                      { k: t(ui.status), v: item.status },
                    ].map((row) => (
                      <div
                        key={row.k}
                        className="flex items-center justify-between py-1.5 last:pb-0"
                      >
                        <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
                          {row.k}
                        </dt>
                        <dd className="font-mono text-[11px] uppercase tracking-wide text-ink/75">
                          {row.v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
                    {item.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </Wrapper>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
