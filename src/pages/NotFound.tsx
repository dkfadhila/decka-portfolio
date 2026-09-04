import { Link } from 'react-router-dom';
import { ArrowUpLeft, Home as HomeIcon } from 'lucide-react';
import Reveal from '../components/Reveal';
import { useI18n } from '../i18n';

export default function NotFound() {
  const { t } = useI18n();

  const ui = {
    kicker: { id: 'Kesalahan 404', en: 'Error 404' },
    title: { id: 'Halaman Tidak Ditemukan.', en: 'Page Not Found.' },
    desc: {
      id: 'Rute atau tautan yang Anda tuju tidak tersedia atau telah dipindahkan dalam arsip portofolio.',
      en: 'The requested route does not exist or has been relocated within the portfolio index.',
    },
    backHome: { id: 'Kembali ke Beranda', en: 'Back to Index' },
    allProjects: { id: 'Lihat Semua Proyek', en: 'View All Projects' },
  };

  return (
    <section className="container-shell flex min-h-[70vh] flex-col justify-center py-20">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-md border border-line bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-blue">
            {t(ui.kicker)}
          </span>

          <h1 className="heading-display mt-6 text-7xl uppercase leading-none tracking-tight sm:text-8xl md:text-9xl">
            404
          </h1>

          <h2 className="heading-display mt-4 text-2xl uppercase tracking-tight text-ink sm:text-3xl">
            {t(ui.title)}
          </h2>

          <p className="mt-4 text-sm font-medium leading-6 text-ink/65 sm:text-base">
            {t(ui.desc)}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-blue hover:text-ink"
            >
              <HomeIcon size={14} />
              {t(ui.backHome)}
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-ink transition-colors hover:border-blue hover:bg-blue-soft"
            >
              <ArrowUpLeft size={14} />
              {t(ui.allProjects)}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
