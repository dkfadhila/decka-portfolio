import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { profile, socials, heroMeta } from '../data';
import { useI18n, ui, LangToggle } from '../i18n';

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useI18n();
  return (
    <footer className="bg-ink text-bg">
      <div className="container-shell py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bg/45">
              {t(ui.footerContact)}
            </p>
            <h2 className="heading-display mt-4 text-4xl uppercase leading-[0.9] tracking-tight sm:text-6xl">
              {t(ui.footerBy)} {profile.name}
              <span className="text-blue">.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-bg/60">
              {profile.subtitle}
            </p>
            <Link
              to="/contact"
              className="group mt-7 inline-flex items-center gap-2 rounded-lg border border-bg/25 px-5 py-3 text-[11px] font-bold uppercase tracking-wide transition-colors hover:border-blue hover:bg-blue hover:text-ink"
            >
              {t(ui.letsTalk)}
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <LangToggle className="md:hidden" />
            <div className="flex flex-wrap gap-2 md:justify-end">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('#') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-lg border border-bg/20 px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-bg/75 transition-colors hover:border-blue hover:bg-blue hover:text-ink"
                >
                  {s.label}
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-bg/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bg/40">
            Â© {year} {profile.fullName}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bg/40">
            {t(ui.portfolio)} / {heroMeta.year}
          </p>
          <Link
            to="/"
            className="link-underline font-mono text-[10px] uppercase tracking-[0.18em] text-bg/40 hover:text-bg"
          >
            {t(ui.backToTop)} â†‘
          </Link>
        </div>
      </div>
    </footer>
  );
}

