import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { Crosshair, Tag } from '../components/cards';
import { profile } from '../data';
import { useI18n, tr } from '../i18n';
import { FileDown } from 'lucide-react';

export default function About() {
  const { t, lang } = useI18n();
  const ui = {
    biography: { id: '02.A — Biografi', en: '02.A — Biography' },
    profile: { id: '02.B — Profil', en: '02.B — Profile' },
    method: { id: '02 / Metode', en: '02 / Method' },
    howWork: { id: 'Cara Saya Bekerja', en: 'How I Work' },
    principles: { id: 'prinsip', en: 'principles' },
    capabilities: { id: '02.C — Kemampuan', en: '02.C — Capabilities' },
  };
  return (
    <section className="container-shell py-16 md:py-20">
      <PageHeader page="about" />

      {/* Editorial biography â€” asymmetric two-column */}
      <div className="grid grid-cols-12 gap-4">
        <Reveal className="col-span-12 lg:col-span-7">
          <article className="card flex h-full flex-col p-6 sm:p-8">
            <div className="flex items-center justify-between">
<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue">
                {t(ui.biography)}
              </span>
              <Crosshair />
            </div>
<h2 className="heading-display mt-8 text-4xl uppercase leading-[0.9] tracking-tight sm:text-5xl">
              {profile.aboutHeading.map((l, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className="text-blue">{tr(l, lang)}</span>
                  ) : (
                    tr(l, lang)
                  )}
                </span>
              ))}
            </h2>
            <p className="mt-4 font-mono text-sm uppercase tracking-[0.16em] text-ink/45">
              {profile.fullName}
            </p>
            <div className="mt-8 grid gap-5 text-base font-medium leading-7 text-ink/70">
              {profile.intro.map((p, i) => (
                <p key={i} className="max-w-2xl">
                  {p}
                </p>
              ))}
            </div>
<div className="mt-auto flex flex-wrap gap-2 border-t border-line pt-6">
              {profile.focusPills.map((p) => (
                <Tag key={p}>{tr(p, lang)}</Tag>
              ))}
            </div>
          </article>
        </Reveal>

        <div className="col-span-12 grid gap-4 lg:col-span-5">
          {/* Portrait card */}
          <Reveal>
            <div className="card p-4">
              <div className="group relative overflow-hidden rounded-xl border border-line">
                <img
                  src={profile.profileImage}
                  alt={profile.fullName}
                  className="aspect-[5/4] w-full object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 h-2.5 w-2.5 rounded-[2px] bg-blue" aria-hidden />
                <span className="absolute bottom-3 right-3 rounded-md border border-line bg-bg/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/70 transition-colors duration-500 group-hover:border-blue group-hover:bg-blue-soft">
                  Fig. 02 — {profile.name}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Facts card */}
          <Reveal>
<div className="card p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue">
                {t(ui.profile)}
              </span>
              <dl className="mt-4">
                {profile.facts.map((f, i) => (
                  <div
                    key={f.label}
                    className={`flex items-center justify-between py-3 ${
                      i < profile.facts.length - 1 ? 'border-b border-line' : ''
                    }`}
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
                      {f.label}
                    </dt>
                    <dd className="font-mono text-[11px] uppercase tracking-wide text-ink/80">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Download CV CTA */}
              <div className="mt-6 border-t border-line pt-5">
                <a
                  href="/decka-cv.pdf"
                  download="Decka-Fadhila-Tirta-CV.pdf"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue hover:text-ink"
                >
                  <FileDown size={15} />
                  {t({ id: 'Unduh Curriculum Vitae (PDF)', en: 'Download Curriculum Vitae (PDF)' })}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Method â€” numbered cards with rhythm variation */}
      <div className="mt-16">
        <Reveal>
          <div className="mb-6 flex items-end justify-between border-b border-line pb-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue">
                {t(ui.method)}
              </p>
              <h2 className="heading-display mt-2 text-2xl uppercase tracking-tight sm:text-3xl">
                {t(ui.howWork)}
              </h2>
            </div>
<span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45 sm:block">
              04 {t(ui.principles)}
            </span>
          </div>
        </Reveal>
        <div className="grid grid-cols-12 gap-4">
          {profile.method.map((m, i) => (
            <Reveal key={i} className={i % 2 === 0 ? 'col-span-12 md:col-span-6' : 'col-span-12 md:col-span-6'}>
              <article className={`card h-full p-6 ${i === 1 ? 'card-cta' : ''}`}>
                <span
                  className={`font-mono text-[11px] tracking-wide ${
                    i === 1 ? 'text-ink/55' : 'text-blue'
                  }`}
                >
                  0{i + 1}
                </span>
<h3 className="heading-display mt-6 text-xl uppercase leading-[0.95] tracking-tight sm:text-2xl">
                  {tr(m.title, lang)}
                </h3>
                <p className="mt-3 max-w-md text-sm font-medium leading-6 text-ink/65">
                  {tr(m.description, lang)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div className="mt-16">
        <Reveal>
<div className="card p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue">
              {t(ui.capabilities)}
            </span>
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.capabilities.map((c) => (
                <Tag key={c}>{tr(c, lang)}</Tag>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

