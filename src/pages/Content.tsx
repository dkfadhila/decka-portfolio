import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { CardArrow } from '../components/cards';
import { useContent } from '../contentStore';
import { useI18n, tr, trPeriod } from '../i18n';

const targetOf = (link?: string) =>
  link && link !== '#' ? { href: link, target: '_blank', rel: 'noreferrer' } : { href: '#' };

export default function Content() {
  const { content } = useContent();
  const { t, lang } = useI18n();

  return (
    <section className="container-shell py-16 md:py-20">
      <PageHeader page="content" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {content.map((c) => {
          const hasImage = !!(c.imageUrl || c.images?.[0]);
          return (
            <Reveal key={c.id}>
              <a
                {...targetOf(c.link)}
                className="card group flex h-full flex-col overflow-hidden transition-colors hover:border-blue sm:flex-row"
              >
                {hasImage && (
                  <div className="relative w-full shrink-0 overflow-hidden border-b border-line sm:w-[200px] sm:border-b-0 sm:border-r sm:border-line">
                    <div className="aspect-[16/10] w-full sm:aspect-auto sm:h-full">
                      <img
                        src={c.imageUrl || c.images?.[0]}
                        alt={c.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span className="absolute left-3 top-3 rounded-md border border-line bg-bg/90 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/70">
                      {tr(c.type, lang)}
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-2 text-sm font-bold uppercase leading-tight tracking-tight sm:text-base">
                        {tr(c.title, lang)}
                      </h3>
                      <CardArrow size={14} />
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs font-medium leading-5 text-ink/55">
                      {tr(c.description, lang)}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-3 border-t border-line pt-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink/40">
                      {trPeriod(c.date, lang)}
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
