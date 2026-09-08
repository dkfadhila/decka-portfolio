import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Copy, Check, Download } from 'lucide-react';
import { profile, socials, heroMeta } from '../data';
import { useI18n, ui, tr, LangToggle } from '../i18n';

export default function Footer() {
  const year = new Date().getFullYear();
  const { t, lang } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(heroMeta.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <footer className="bg-ink text-bg">
      <div className="container-shell py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="heading-display text-4xl uppercase leading-[0.9] tracking-tight sm:text-6xl">
              {t(ui.footerBy)} {profile.name}
              <span className="text-blue">.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-bg/60">
              {tr(profile.subtitle, lang)}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-lg border border-bg/25 px-5 py-3 text-[11px] font-bold uppercase tracking-wide transition-colors hover:border-blue hover:bg-blue hover:text-ink"
              >
                {t(ui.letsTalk)}
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-bg/20 px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-wider text-bg/80 transition-colors hover:border-blue hover:bg-blue hover:text-ink"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                {copied ? t({ id: 'Tersalin!', en: 'Copied!' }) : t({ id: 'Salin Email', en: 'Copy Email' })}
              </button>

              <a
                href={lang === 'id' ? '/cv/cv-id.pdf' : '/cv/cv-en.pdf'}
                download
                className="inline-flex items-center gap-1.5 rounded-lg border border-bg/20 px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-wider text-bg/80 transition-colors hover:border-blue hover:bg-blue hover:text-ink"
              >
                <Download size={13} />
                {t(ui.downloadCv)}
              </a>
            </div>
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
            © {year} {profile.fullName}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bg/40">
            {t(ui.portfolio)} / {heroMeta.year}
          </p>
          <Link
            to="/"
            className="link-underline font-mono text-[10px] uppercase tracking-[0.18em] text-bg/40 hover:text-bg"
          >
            {t(ui.backToTop)} ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}

