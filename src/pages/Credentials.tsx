import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { Crosshair } from '../components/cards';
import { useI18n } from '../i18n';

/* Editorial empty state — reserved section, not a dead end */
function EmptySection({
  num,
  title,
  description,
  emptyLabel,
  awaitingLabel,
}: {
  num: string;
  title: string;
  description: string;
  emptyLabel: string;
  awaitingLabel: string;
}) {
  return (
    <div className="card relative overflow-hidden">
      {/* Faint technical dot grid */}
      <div className="dot-grid absolute inset-0 opacity-50" aria-hidden />

      <div className="relative flex flex-col gap-4 p-6 sm:p-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue">
            {num} / {title}
          </span>
          <Crosshair />
        </div>

        <h3 className="heading-display text-2xl uppercase leading-[0.95] tracking-tight sm:text-3xl">
          {emptyLabel}
        </h3>
        <p className="max-w-md text-sm font-medium leading-6 text-ink/60">
          {description}
        </p>

        <span className="mt-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-blue" aria-hidden />
          {awaitingLabel}
        </span>
      </div>
    </div>
  );
}

export default function Credentials() {
  const { t } = useI18n();
  const ui = {
    academic: { id: '01 / Akademik', en: '01 / Academic' },
    field: { id: 'Bidang', en: 'Field' },
    graduated: { id: 'Lulus', en: 'Graduated' },
    status: { id: 'Status', en: 'Status' },
    degree: { id: 'Gelar', en: 'Degree' },
    certTitle: { id: 'Sertifikat', en: 'Certificates' },
    certDesc: {
      id: 'Sertifikat magang, praktikum, dan kursus akan didaftarkan di sini saat sudah diperoleh.',
      en: 'Internship, practicum, and course certificates will be listed here as they are earned.',
    },
    honorsTitle: { id: 'Penghargaan', en: 'Honors' },
    honorsDesc: {
      id: 'Penghargaan, pengakuan, dan prestasi akademik akan dicatat di sini.',
      en: 'Awards, recognitions, and academic honors will be recorded here.',
    },
    noEntries: { id: 'Belum ada entri', en: 'No entries yet' },
    awaiting: { id: 'Menunggu entri', en: 'Awaiting entries' },
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
              B.Sc. Physics
              <span className="text-blue"> (S.Si.)</span>
            </h2>
            <p className="mt-3 text-sm font-bold uppercase tracking-wide text-ink/50">
              Universitas Negeri Yogyakarta
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:grid-cols-4">
              {[
                { k: t(ui.degree), v: 'Bachelor of Science' },
                { k: t(ui.field), v: 'Physics' },
                { k: t(ui.graduated), v: '2026' },
                { k: t(ui.status), v: 'Completed' },
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

        {/* 02 / CERTIFICATES — reserved */}
        <Reveal className="col-span-12 sm:col-span-6">
          <EmptySection
            num="02"
            title={t(ui.certTitle)}
            description={t(ui.certDesc)}
            emptyLabel={t(ui.noEntries)}
            awaitingLabel={t(ui.awaiting)}
          />
        </Reveal>

        {/* 03 / HONORS — reserved */}
        <Reveal className="col-span-12 sm:col-span-6">
          <EmptySection
            num="03"
            title={t(ui.honorsTitle)}
            description={t(ui.honorsDesc)}
            emptyLabel={t(ui.noEntries)}
            awaitingLabel={t(ui.awaiting)}
          />
        </Reveal>
      </div>
    </section>
  );
}
