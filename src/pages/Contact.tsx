import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { Crosshair, PlusMark } from '../components/cards';
import { socials, heroMeta } from '../data';

export default function Contact() {
  const others = socials.filter((s) => s.label !== 'Email');

  return (
    <section className="container-shell py-16 md:py-20">
      <PageHeader page="contact" />

      {/* Oversized CTA composition */}
      <Reveal>
        <div className="card relative overflow-hidden p-6 sm:p-10 md:p-14">
          <Crosshair className="absolute right-8 top-8 hidden sm:block" />
          <PlusMark className="absolute bottom-8 left-8 hidden sm:block" />

          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue">
            07 / Transmission
          </p>

          <h2 className="heading-display mt-6 text-6xl uppercase leading-[0.85] tracking-tight sm:text-8xl md:text-9xl">
            Let&apos;s
            <br />
            <span className="text-blue">Talk.</span>
          </h2>

          <p className="mt-8 max-w-xl text-base font-medium leading-7 text-ink/65 sm:text-lg">
            Have a project, a role, or just want to say hi? The inbox is open —
            I usually reply within a day or two.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-line pt-8">
            <a
              href={`mailto:${heroMeta.email}`}
              className="link-underline heading-display text-2xl uppercase tracking-tight sm:text-4xl"
            >
              {heroMeta.email}
            </a>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">
              Click to open mail
            </span>
          </div>
        </div>
      </Reveal>

      {/* Metadata + socials */}
      <div className="mt-6 grid grid-cols-12 gap-4">
        <Reveal className="col-span-12 md:col-span-6">
          <div className="card h-full p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue">
              Coordinates
            </span>
            <dl className="mt-4">
              {[
                { k: 'Based In', v: heroMeta.location },
                { k: 'Coordinates', v: heroMeta.coords },
                { k: 'Status', v: heroMeta.availability },
                { k: 'Focus', v: heroMeta.role },
              ].map((row, i) => (
                <div
                  key={row.k}
                  className={`flex items-center justify-between py-3 ${
                    i < 3 ? 'border-b border-line' : ''
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
          </div>
        </Reveal>

        <Reveal className="col-span-12 grid gap-4 md:col-span-6">
          {others.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('#') ? undefined : '_blank'}
              rel="noreferrer"
              className="card group flex items-center justify-between px-6 py-5"
            >
              <span className="heading-display text-xl uppercase tracking-tight">
                {s.label}
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-bg">
                <CardArrowInline />
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function CardArrowInline() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="card-arrow text-ink/50"
      aria-hidden
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
