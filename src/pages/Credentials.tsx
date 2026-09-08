import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { Crosshair } from '../components/cards';
import { useI18n, tr } from '../i18n';

export default function Credentials() {
  const { t, lang } = useI18n();
  const ui = {
    academic: { id: '01 / Akademik', en: '01 / Academic' },
    degreeTitle: { id: 'S.Si. Fisika', en: 'B.Sc. Physics' },
    university: { id: 'Universitas Negeri Yogyakarta', en: 'Yogyakarta State University' },
    field: { id: 'Bidang', en: 'Field' },
    graduated: { id: 'Lulus', en: 'Graduated' },
    status: { id: 'Status', en: 'Status' },
    degree: { id: 'Gelar', en: 'Degree' },
    bio: {
      id: 'Lulus dengan fokus pada fisika komputasi dan komputasi ilmiah — pemrosesan data penilaian untuk 80+ mahasiswa, metode numerik, dan mata kuliah berorientasi riset.',
      en: 'Graduated with a focus on computational physics and scientific computing — assessment data processing for 80+ students, numerical methods, and research-oriented coursework.',
    },
  };

  return (
    <section className="container-shell py-16 md:py-20">
      <PageHeader page="credentials" />

      <div className="grid grid-cols-12 gap-4">
        {/* 01 / ACADEMIC — real record */}
        <Reveal className="col-span-12">
          <div className="card relative overflow-hidden p-6 sm:p-10">
            <span className="absolute right-8 top-8 hidden sm:block" aria-hidden>
              <Crosshair />
            </span>

            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue">
              {t(ui.academic)}
            </span>

            <h2 className="heading-display mt-6 text-3xl uppercase leading-[0.9] tracking-tight sm:text-5xl">
              {t(ui.degreeTitle)}
            </h2>
            <p className="mt-3 text-sm font-bold uppercase tracking-wide text-ink/50">
              {t(ui.university)}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:grid-cols-4">
              {[
                { k: t(ui.degree), v: tr('Bachelor of Science', lang) },
                { k: t(ui.field), v: tr('Physics', lang) },
                { k: t(ui.graduated), v: '2026' },
                { k: t(ui.status), v: tr('Completed', lang) },
              ].map((row) => (
                <div key={row.k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                    {row.k}
                  </dt>
                  <dd className="mt-1.5 text-sm font-bold uppercase leading-tight tracking-wide text-ink/85">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 max-w-2xl text-sm font-medium leading-6 text-ink/60">
              {t(ui.bio)}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
