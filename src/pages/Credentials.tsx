import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { Crosshair } from '../components/cards';

/* Editorial empty state — reserved section, not a dead end */
function EmptySection({
  num,
  title,
  description,
}: {
  num: string;
  title: string;
  description: string;
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
          No entries yet
        </h3>
        <p className="max-w-md text-sm font-medium leading-6 text-ink/60">
          {description}
        </p>

        <span className="mt-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-blue" aria-hidden />
          Awaiting entries
        </span>
      </div>
    </div>
  );
}

export default function Credentials() {
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
              01 / Academic
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
                { k: 'Degree', v: 'Bachelor of Science' },
                { k: 'Field', v: 'Physics' },
                { k: 'Graduated', v: '2026' },
                { k: 'Status', v: 'Completed' },
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
              Graduated with a focus on computational physics and scientific
              computing — assessment data processing for 80+ students,
              numerical methods, and research-oriented coursework.
            </p>
          </div>
        </Reveal>

        {/* 02 / CERTIFICATES — reserved */}
        <Reveal className="col-span-12 sm:col-span-6">
          <EmptySection
            num="02"
            title="Certificates"
            description="Internship, practicum, and course certificates will be listed here as they are earned."
          />
        </Reveal>

        {/* 03 / HONORS — reserved */}
        <Reveal className="col-span-12 sm:col-span-6">
          <EmptySection
            num="03"
            title="Honors"
            description="Awards, recognitions, and academic honors will be recorded here."
          />
        </Reveal>
      </div>
    </section>
  );
}
