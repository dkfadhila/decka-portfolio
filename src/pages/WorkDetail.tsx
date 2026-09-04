import { useParams, Link } from 'react-router-dom';
import { ArrowUpLeft } from 'lucide-react';
import Reveal from '../components/Reveal';
import { Tag, Crosshair } from '../components/cards';
import { workDetails } from '../data';
import { useI18n, institutionName } from '../i18n';

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? workDetails[slug] : undefined;
  const { t, lang } = useI18n();
  const ui = {
    back: { id: 'Kembali ke Karya', en: 'Back to Work' },
    notFound: { id: 'Studi kasus tidak ditemukan', en: 'Case study not found' },
    stack: { id: 'Tumpukan & Keahlian:', en: 'Stack & Skills:' },
    workInfo: { id: 'Info Keterlibatan', en: 'Engagement Info' },
    period: { id: 'Periode', en: 'Period' },
    client: { id: 'Institusi / Klien', en: 'Client / Organization' },
    status: { id: 'Status', en: 'Status' },
  };

  if (!item) {
    return (
      <section className="container-shell py-16 md:py-20">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-ink/45">
            {t(ui.notFound)}
          </p>
          <h1 className="heading-display mt-4 text-4xl uppercase tracking-tight">
            404
          </h1>
          <Link
            to="/work"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line bg-card px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-ink transition-colors hover:border-blue hover:bg-blue-soft"
          >
            <ArrowUpLeft size={14} />
            {t(ui.back)}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-shell py-16 md:py-20">
      {/* Back link */}
      <Reveal>
        <Link
          to="/work"
          className="group mb-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55 transition-colors hover:text-blue"
        >
          <ArrowUpLeft
            size={14}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          {t(ui.back)}
        </Link>
      </Reveal>

      {/* Hero with Full-Color Image */}
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-line">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="aspect-[4/3] w-full object-cover sm:aspect-[21/9]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent sm:from-ink/70 sm:via-ink/20" />
          <div className="absolute bottom-0 left-0 p-5 sm:p-8 md:p-10">
            <span className="rounded-md border border-line bg-bg/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/80">
              {institutionName(item.client, lang)}
            </span>
            <h1 className="heading-display mt-3 text-3xl uppercase leading-[0.9] tracking-tight text-white sm:mt-4 sm:text-5xl md:text-6xl">
              {item.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-white/85 sm:mt-3 sm:text-base">
              {item.subtitle}
            </p>
          </div>
        </div>
      </Reveal>

      {/* Highlights */}
      <Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {item.highlights.map((h) => (
            <div key={h.label} className="card p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                {h.label}
              </span>
              <p className="heading-display mt-2 text-2xl uppercase tracking-tight text-blue">
                {h.value}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Stack + Tags */}
      <Reveal>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">
            {t(ui.stack)}
          </span>
          <div className="flex flex-wrap gap-2">
            {item.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Content sections + Sidebar */}
      <div className="mt-10 grid grid-cols-12 gap-6">
        <Reveal className="col-span-12 lg:col-span-8">
          <div className="space-y-8">
            {item.sections.map((section) => (
              <div key={section.heading}>
                <div className="flex items-center gap-3 border-b border-line pb-3">
                  <Crosshair />
                  <h2 className="heading-display text-xl uppercase tracking-tight sm:text-2xl">
                    {section.heading}
                  </h2>
                </div>
                <div className="mt-4 space-y-4">
                  {section.content.map((p, i) => (
                    <p
                      key={i}
                      className="max-w-2xl text-base font-medium leading-7 text-ink/70"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Sidebar */}
        <Reveal className="col-span-12 lg:col-span-4">
          <div className="card p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue">
              {t(ui.workInfo)}
            </span>
            <dl className="mt-4">
              {[
                { k: t(ui.period), v: item.period },
                { k: t(ui.client), v: institutionName(item.client, lang) },
                { k: t(ui.status), v: item.status },
              ].map((row, i) => (
                <div
                  key={row.k}
                  className={`flex flex-col gap-1 py-3 ${
                    i < 2 ? 'border-b border-line' : ''
                  }`}
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
                    {row.k}
                  </dt>
                  <dd className="text-sm font-bold uppercase tracking-wide text-ink/85">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
