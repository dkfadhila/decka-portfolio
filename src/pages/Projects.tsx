import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { CardArrow, Tag, MetaNum } from '../components/cards';
import { projects } from '../data';
import { useI18n } from '../i18n';

const spans = ['col-span-12 lg:col-span-5', 'col-span-12 lg:col-span-4', 'col-span-12 lg:col-span-3'];

export default function Projects() {
  const { t } = useI18n();
  const ui = {
    exp: { id: 'Eksp. 0', en: 'Exp. 0' },
    year: { id: 'Tahun', en: 'Year' },
    stack: { id: 'Tumpukan', en: 'Stack' },
    status: { id: 'Status', en: 'Status' },
  };
  return (
    <section className="container-shell py-16 md:py-20">
      <PageHeader page="projects" />

      <div className="grid grid-cols-12 gap-4">
        {projects.map((p, i) => {
          const Wrapper = p.detailPath ? Link : 'a';
          const wrapperProps = p.detailPath
            ? { to: p.detailPath }
            : { href: p.link || '#', target: '_blank', rel: 'noreferrer' };

          return (
            <Reveal key={p.id} className={spans[i % spans.length]}>
              <Wrapper
                {...wrapperProps}
                className={`card group flex h-full flex-col overflow-hidden ${
                  i === 1 ? 'card-cta' : ''
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="card-media h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`absolute left-4 top-4 rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
                      i === 1
                        ? 'border-ink/20 bg-bg/90 text-ink/70'
                        : 'border-line bg-bg/90 text-ink/70'
                    }`}
                  >
                    {t(ui.exp)}{i + 1}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <MetaNum num={p.category} className={i === 1 ? 'text-ink/55' : ''} />
                      <h3 className="heading-display mt-2 text-xl uppercase leading-[0.95] tracking-tight sm:text-2xl">
                        {p.title}
                      </h3>
                    </div>
                    <CardArrow size={18} />
                  </div>
                  <p className="mt-3 text-sm font-medium leading-6 text-ink/65">
                    {p.description}
                  </p>

                  {/* Technical metadata */}
                  <dl className="mt-5 border-t border-line pt-4">
                    {[
                      { k: t(ui.year), v: p.year },
                      { k: t(ui.stack), v: p.stack },
                      { k: t(ui.status), v: p.status },
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

                  <div className="mt-5 flex flex-wrap gap-2 pt-1">
                    {p.tags.map((tag) => (
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
