import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { Tag, Crosshair } from '../components/cards';
import { experience, profile, heroMeta } from '../data';
import { useI18n, institutionName } from '../i18n';

export default function Experience() {
  const { t, lang } = useI18n();
  const ui = {
    record: { id: 'Catatan / 0', en: 'Record / 0' },
    status: { id: 'Status', en: 'Status' },
    currently: { id: 'Saat Ini', en: 'Currently' },
    independent: { id: 'Independen', en: 'Independent' },
    open: {
      id: 'Terbuka untuk kerja lepas, kolaborasi, dan masalah menarik.',
      en: 'Open to freelance work, collaborations, and interesting problems.',
    },
    capabilities: { id: 'Kemampuan', en: 'Capabilities' },
    focus: { id: 'Fokus', en: 'Focus' },
  };
  return (
    <section className="container-shell py-16 md:py-20">
      <PageHeader page="experience" />

      <div className="grid grid-cols-12 gap-4">
        {/* Timeline */}
        <div className="col-span-12 lg:col-span-8">
          <div className="relative">
            {/* Vertical rail */}
            <span
              aria-hidden
              className="absolute bottom-4 left-[7px] top-4 w-px bg-line"
            />
            {experience.map((e, i) => (
              <Reveal key={e.id}>
                <article className="relative pl-10 pb-10 last:pb-0">
                  {/* Marker */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-2 h-3.5 w-3.5 rounded-[3px] border ${
                      i === 0 ? 'border-blue bg-blue' : 'border-line bg-bg'
                    }`}
                  />
                  <span
                    aria-hidden
                    className={`absolute left-[7px] top-[26px] h-full w-px ${
                      i === 0 ? 'bg-blue/40' : 'bg-line'
                    }`}
                    style={{ height: 'calc(100% - 26px)' }}
                  />

                  <div className="card p-6 sm:p-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue">
                        {e.period}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
                        {t(ui.record)}{i + 1}
                      </span>
                    </div>
                    <h3 className="heading-display mt-3 text-2xl uppercase leading-[0.95] tracking-tight sm:text-3xl">
                      {e.role}
                    </h3>
                    <p className="mt-1 text-sm font-bold uppercase tracking-wide text-ink/50">
                      {institutionName(e.org, lang)}
                    </p>
                    <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-ink/65">
                      {e.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {e.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 grid gap-4 lg:col-span-4">
          <Reveal>
            <div className="card card-cta p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                  {t(ui.status)}
                </span>
                <Crosshair />
              </div>
              <p className="heading-display mt-5 text-3xl uppercase leading-[0.95] tracking-tight">
                {t(ui.currently)}
                <br />
                {t(ui.independent)}
              </p>
              <p className="mt-3 text-sm font-medium leading-6 text-ink/60">
                {t(ui.open)}
              </p>
              <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/70">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-ink" />
                {heroMeta.availability}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="card p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue">
                {t(ui.capabilities)}
              </span>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.capabilities.map((c) => (
                  <Tag key={c}>{c}</Tag>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="card p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue">
                {t(ui.focus)}
              </span>
              <div className="mt-4 divide-y divide-line">
                {profile.facts.slice(0, 3).map((f) => (
                  <div key={f.label} className="grid grid-cols-[6rem_1fr] gap-3 py-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
                      {f.label}
                    </span>
                    <span className="text-sm font-bold uppercase leading-tight text-ink/85">
                      {f.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
