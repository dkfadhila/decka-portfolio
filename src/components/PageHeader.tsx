import Reveal from './Reveal';
import { pageMeta } from '../data';
import { useI18n, ui } from '../i18n';

const pageTitle: Record<string, { id: string; en: string }> = {
  about: { id: 'Tentang & Prinsip.', en: 'About & Principles.' },
  experience: { id: 'Pengalaman & Operasi.', en: 'Experience & Operations.' },
  work: { id: 'Karya Pilihan.', en: 'Selected Work.' },
  projects: { id: 'Proyek & Riset.', en: 'Projects & Research.' },
  content: { id: 'Konten & Riset.', en: 'Content & Research.' },
  credentials: { id: 'Kredensial & Penghargaan.', en: 'Credentials & Honors.' },
  contact: { id: 'Mari Bicara.', en: "Let's Talk." },
};

const pageLead: Record<string, { id: string; en: string }> = {
  about: {
    id: 'Prinsip kerja, kemampuan, dan cara saya bekerja.',
    en: 'Operating principles, capabilities, and how I like to work.',
  },
  experience: {
    id: 'Peran, tanggung jawab, dan perjalanan sejauh ini.',
    en: 'Roles, responsibilities, and the path so far.',
  },
  work: {
    id: 'Keterlibatan profesional, asisten praktikum, dan dukungan operasional.',
    en: 'Professional engagements, practicum assistance, and operational support.',
  },
  projects: {
    id: 'Fisika komputasi, analisis atmosfer, dan eksperimen teknis.',
    en: 'Computational physics, atmospheric analysis, and technical experiments.',
  },
  content: {
    id: 'Riset Web3, artikel, dan proyek independen.',
    en: 'Web3 research, articles, and independent projects.',
  },
  credentials: {
    id: 'Rekam akademik, sertifikat, dan pengakuan.',
    en: 'Academic record, certificates, and recognition.',
  },
  contact: {
    id: 'Punya proyek, peran, atau sekadar ingin menyapa? Kotak masuk terbuka.',
    en: 'Have a project, a role, or just want to say hi? The inbox is open.',
  },
};

const kicker: Record<string, { id: string; en: string }> = {
  about: { id: 'Tentang', en: 'About' },
  experience: { id: 'Pengalaman', en: 'Experience' },
  work: { id: 'Karya', en: 'Work' },
  projects: { id: 'Proyek', en: 'Projects' },
  content: { id: 'Konten', en: 'Content' },
  credentials: { id: 'Kredensial', en: 'Credentials' },
  contact: { id: 'Kontak', en: 'Contact' },
};

export default function PageHeader({ page }: { page: string }) {
  const meta = pageMeta[page];
  const { t } = useI18n();
  if (!meta) return null;

  return (
    <Reveal className="relative mb-14 border-b border-line pb-10 md:mb-20">
      {/* Oversized ghost page number — compositional element */}
      <span
        aria-hidden
        className="ghost-num heading-display pointer-events-none absolute -top-3 right-0 text-[5rem] leading-none sm:-top-6 sm:text-[11rem] md:-top-10"
      >
        {meta.num}
      </span>

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue">
        {meta.num} / {kicker[page] ? t(kicker[page]) : meta.kicker}
      </p>
      <h1 className="heading-display mt-4 max-w-4xl text-5xl uppercase leading-[0.88] tracking-tight sm:text-7xl">
        {pageTitle[page] ? t(pageTitle[page]) : meta.title}
      </h1>
      <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-ink/65">
        {pageLead[page] ? t(pageLead[page]) : meta.lead}
      </p>
    </Reveal>
  );
}
