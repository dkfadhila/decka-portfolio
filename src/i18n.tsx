import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

/* ============================================================
   i18n — lightweight ID / EN language system
   ============================================================ */

export type Lang = 'id' | 'en';
export type LStr = { id: string; en: string };

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (s: LStr) => string;
}

const I18nContext = createContext<I18nValue>({
  lang: 'en',
  setLang: () => {},
  t: (s) => s.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    // EN is the default. If a user had an old "id" choice stored from an
    // earlier build, ignore it once so everyone starts fresh on EN.
    const saved = window.localStorage.getItem('tirta-lang');
    if (saved === 'id' && !window.localStorage.getItem('tirta-lang-v2')) {
      window.localStorage.setItem('tirta-lang-v2', '1');
      window.localStorage.removeItem('tirta-lang');
      return 'en';
    }
    return saved === 'id' || saved === 'en' ? saved : 'en';
  });

  useEffect(() => {
    window.localStorage.setItem('tirta-lang', lang);
  }, [lang]);

  const t = (s: LStr) => s[lang];

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

/* ============================================================
   Language toggle — dark pill.
   Active language = blue, inactive = white.
   ============================================================ */
export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useI18n();
  return (
    <div
      role="group"
      aria-label="Language"
      className={`flex items-center rounded-lg bg-ink p-1 ${className}`}
    >
      <button
        type="button"
        onClick={() => setLang('id')}
        aria-pressed={lang === 'id'}
        className={`rounded-md px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
          lang === 'id' ? 'text-blue' : 'text-white'
        }`}
      >
        ID
      </button>
      <span className="mx-0.5 h-3 w-px bg-white/25" aria-hidden />
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`rounded-md px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
          lang === 'en' ? 'text-blue' : 'text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}

/* ============================================================
   Institution names — Indonesian official names -> English
   ============================================================ */
const institutions: Record<string, LStr> = {
  'Badan Penanggulangan Bencana Daerah Kabupaten Kudus': {
    id: 'Badan Penanggulangan Bencana Daerah Kabupaten Kudus',
    en: 'Regional Disaster Management Agency of Kudus Regency',
  },
  'Badan Eksekutif Mahasiswa Fakultas Matematika & Ilmu Pengetahuan Alam Universitas Negeri Yogyakarta': {
    id: 'Badan Eksekutif Mahasiswa Fakultas Matematika & Ilmu Pengetahuan Alam Universitas Negeri Yogyakarta',
    en: 'Student Executive Board, Faculty of Mathematics & Natural Sciences, Yogyakarta State University',
  },
  'Unit Kegiatan Mahasiswa Catur Universitas Negeri Yogyakarta': {
    id: 'Unit Kegiatan Mahasiswa Catur Universitas Negeri Yogyakarta',
    en: 'Student Chess Activity Unit, Yogyakarta State University',
  },
  'Universitas Negeri Yogyakarta': {
    id: 'Universitas Negeri Yogyakarta',
    en: 'Yogyakarta State University',
  },
};

/* Translate an institution name if a mapping exists; otherwise return as-is */
export function institutionName(name: string, lang: Lang): string {
  return institutions[name]?.[lang] ?? name;
}

/* ============================================================
   Content translations — English source strings from data.ts
   -> Indonesian equivalents. Unknown strings pass through.
   ============================================================ */
const contentTr: Record<string, string> = {
  // aboutHeading
  'Data explorer.': 'Penjelajah data.',
  'Scientific thinker.': 'Pemikir ilmiah.',
  'Tech builder.': 'Pembangun teknologi.',
  // facts labels
  Focus: 'Fokus',
  Languages: 'Bahasa',
  Industry: 'Industri',
  Platforms: 'Platform',
  'Based In': 'Basis',
  // facts values
  'Data, Research, Technology': 'Data, Riset, Teknologi',
  'Indonesian / English': 'Indonesia / Inggris',
  'Web, X, GitHub': 'Web, X, GitHub',
  Indonesia: 'Indonesia',
  // focusPills
  'Data Processing': 'Pemrosesan Data',
  'AI-Leveraged Operations': 'Operasi Berbasis AI & Otomasi',
  'Agentic & Automated Workflows': 'Alur Kerja Agentik & Terotomasi',
  // method titles
  'Data-driven approach': 'Pendekatan berbasis data',
  'Research-oriented mindset': 'Pola pikir berorientasi riset',
  'Agentic & automated workflows': 'Alur kerja agentik & terotomasi',
  'Workflow optimization': 'Optimasi alur kerja',
  // method descriptions
  'Handle large datasets, organize them, and extract patterns that inform decisions.':
    'Menangani dataset besar, mengorganisasikannya, dan mengekstrak pola yang mendukung keputusan.',
  'Dig into the data and context before drawing conclusions — analytical and curious.':
    'Menggali data dan konteks sebelum menarik kesimpulan — analitis dan kritis.',
  'Experienced with n8n, Cursor, GitHub, Claude Code, Codex, Vercel, and Hermes.':
    'Berpengalaman dengan n8n, Cursor, GitHub, Claude Code, Codex, Vercel, dan Hermes.',
  'Use AI tools and automation to improve research, content creation, and repetitive workflows.':
    'Memanfaatkan alat AI dan otomatisasi untuk riset, pembuatan konten, dan alur kerja repetitif.',
  // stats labels
  'Data points processed': 'Titik data diproses',
  'Roles & engagements': 'Peran & keterlibatan',
  'Web3 campaigns researched': 'Kampanye Web3 diteliti',
  'Working online': 'Bekerja daring',
  // capabilities
  'Data Management & Processing': 'Manajemen & Pemrosesan Data',
  'Data Analysis & Visualization': 'Analisis & Visualisasi Data',
  'Scientific Computing': 'Komputasi Ilmiah',
  'Research & Information Analysis': 'Riset & Analisis Informasi',
  'Reporting & Documentation': 'Pelaporan & Dokumentasi',
  'Administrative Support': 'Dukungan Administratif',
  'Workflow & Process Management': 'Manajemen Alur Kerja & Proses',
  'AI-Assisted Research & Automation': 'Riset Berbantuan AI & Otomatisasi',
  'Project & Task Planning': 'Perencanaan Proyek & Tugas',
  'Content Operations': 'Operasi Konten',
  'Graphic Design & Visual Communication': 'Desain Grafis & Komunikasi Visual',
  'Social Media Management': 'Manajemen Media Sosial',
  'Copywriting & Content Writing': 'Penulisan Iklan & Konten',
  'Microsoft Office & Google Workspace': 'Microsoft Office & Google Workspace',
};

/* Translate a content string (EN source) to the active language */
export function tr(s: string, lang: Lang): string {
  if (lang === 'en') return s;
  return contentTr[s] ?? s;
}

/* ============================================================
   UI chrome strings (nav, hero, headers, footer, section labels)
   ============================================================ */
export const ui = {
  // Nav
  navHome: { id: 'Beranda', en: 'Home' },
  navAbout: { id: 'Tentang', en: 'About' },
  navExperience: { id: 'Pengalaman', en: 'Experience' },
  navWork: { id: 'Karya', en: 'Work' },
  navProjects: { id: 'Proyek', en: 'Projects' },
  navContent: { id: 'Konten', en: 'Content' },
  navCreative: { id: 'Kreatif', en: 'Creative' },
  navCredentials: { id: 'Kredensial', en: 'Credentials' },
  navContact: { id: 'Kontak', en: 'Contact' },

  // Hero
  heroLabel: { id: 'Portofolio Pribadi — 2026', en: 'Personal Portfolio — 2026' },
  heroCaps: {
    id: 'DATA • RISET • TEKNOLOGI • OPERASI',
    en: 'DATA • RESEARCH • TECHNOLOGY • OPERATIONS',
  },
  heroHello: { id: 'Halo,', en: 'Hello,' },
  heroParagraph2: {
    id: 'Sebelumnya mengerjakan fisika komputasi, analisis peristiwa banjir, prototipe IoT, dan alur kerja riset berbantuan AI. Saat ini mengeksplorasi peluang berbasis data dan membangun alat yang memecahkan masalah nyata.',
    en: 'Previously worked on computational physics, flood event analysis, IoT prototyping, and agentic workflows. Currently exploring data-driven opportunities and building tools that solve real problems.',
  },
  heroIm: { id: 'saya', en: "I'm" },
  identityPhysics: { id: 'FISIKA', en: 'PHYSICS' },
  identityData: { id: 'DATA', en: 'DATA' },
  identityImpact: { id: 'DAMPAK', en: 'IMPACT' },
  viewWork: { id: 'Lihat karya', en: 'View work' },
  getInTouch: { id: 'Hubungi saya', en: 'Get in touch' },
  basedIn: { id: 'Basis', en: 'Based In' },
  role: { id: 'Peran', en: 'Role' },
  year: { id: 'Tahun', en: 'Year' },
  status: { id: 'Status', en: 'Status' },
  openToWork: { id: 'Terbuka kerja', en: 'Open to work' },
  availableFor: {
    id: 'Tersedia untuk peluang baru',
    en: 'Available for new opportunities',
  },
  figIndex: { id: 'Fig. 01 — Indeks', en: 'Fig. 01 — Index' },
  signal: { id: 'Sinyal / 01', en: 'Signal / 01' },
  metricPhysics: { id: 'S.Si.', en: 'B.Sc.' },
  metricPhysicsLabel: { id: 'Fisika', en: 'Physics' },
  metricProjects: { id: 'Proyek', en: 'Projects' },
  metricTools: { id: 'Alat & Tek', en: 'Tools & Tech' },
  metricStudents: { id: 'Mahasiswa Dibimbing', en: 'Students Mentored' },

  // Section headers
  portfolioMap: { id: 'Peta Portofolio', en: 'Portfolio Map' },
  index: { id: 'Indeks', en: 'Index' },
  entries: { id: 'entri', en: 'entries' },
  focusedOn: { id: 'Saat ini fokus pada', en: 'Currently focused on' },

  // Mobile menu
  menu: { id: 'Menu', en: 'Menu' },
  close: { id: 'Tutup', en: 'Close' },
  letsTalk: { id: 'Mari bicara', en: "Let's talk" },

  // Footer
  footerContact: { id: 'Kontak', en: 'Contact' },
  footerBy: { id: 'Portofolio oleh', en: 'Portfolio by' },
  portfolio: { id: 'Portofolio', en: 'Portfolio' },
  backToTop: { id: 'Kembali ke atas', en: 'Back to top' },
} satisfies Record<string, LStr>;
