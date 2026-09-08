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
    document.documentElement.lang = lang;
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
  // profile.subtitle
  'Bachelor of Science in Physics graduate with experience in data processing, scientific computing, research, administrative support, and organizational coordination.':
    'Lulusan S.Si. Fisika dengan pengalaman di pemrosesan data, komputasi ilmiah, riset, dukungan administratif, dan koordinasi organisasi.',
  // profile.intro
  "I'm Tirta — a Physics graduate (Universitas Negeri Yogyakarta) with experience spanning data processing, scientific computing, research, administrative support, and organizational coordination.":
    'Saya Tirta — lulusan Fisika (Universitas Negeri Yogyakarta) dengan pengalaman di pemrosesan data, komputasi ilmiah, riset, dukungan administratif, dan koordinasi organisasi.',
  'I care about turning complex data into clear insights, building computational tools, and using AI to make research and operations more efficient.':
    'Saya fokus mengubah data kompleks menjadi insight yang jelas, membangun alat komputasi, dan memakai AI agar riset serta operasional lebih efisien.',
  'I also build small, useful things for myself and others when existing workflows feel repetitive.':
    'Saya juga membangun hal-hal kecil yang berguna untuk diri sendiri dan orang lain saat alur kerja yang ada terasa repetitif.',
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
  // capabilities — current
  // stats values
  Global: 'Global',
  // hero meta
  'Data • Research • Tech': 'Data • Riset • Teknologi',
  'Open to work': 'Terbuka untuk bekerja',
  // experience roles
  'Physics Computing Teaching Assistant':
    'Asisten Pengajar Komputasi Fisika',
  'Intern — Emergency & Logistics Division':
    'Magang — Divisi Darurat & Logistik',
  'Digital Systems Laboratory Teaching Assistant':
    'Asisten Pengajar Laboratorium Sistem Digital',
  'Vice Head — Media & Information Division':
    'Wakil Kepala — Divisi Media & Informasi',
  'Organizational Advisory Board': 'Dewan Penasihat Organisasi',
  'Media & Information Staff': 'Staf Media & Informasi',
  'Independent Web3 Researcher & Ecosystem Participant':
    'Peneliti Web3 Independen & Partisipan Ekosistem',
  'Web3 Content Writer & Researcher': 'Penulis & Peneliti Konten Web3',
  // experience descriptions
  'Processed and managed assessment data for 60+ students across laboratory and theoretical assessments. Assisted lecturers and students during laboratory sessions, guided students in completing computational physics assignments, and provided technical troubleshooting support.':
    'Mengolah dan mengelola data penilaian untuk 60+ mahasiswa pada asesmen laboratorium dan teori. Membantu dosen dan mahasiswa selama sesi laboratorium, memandu mahasiswa dalam menyelesaikan tugas komputasi fisika, serta memberikan dukungan pemecahan masalah teknis.',
  "Sorted and organized travel documents and financial records. Created visual materials for the agency's communication. Conducted rainfall and disaster-vulnerability mapping for Kabupaten Kudus. Participated in field surveys and assessments related to landslides and flood events.":
    'Menyortir dan menata dokumen perjalanan dinas serta catatan keuangan. Membuat materi visual untuk komunikasi instansi. Melakukan pemetaan curah hujan dan kerentanan bencana untuk Kabupaten Kudus. Berpartisipasi dalam survei lapangan dan penilaian terkait peristiwa tanah longsor dan banjir.',
  'Processed and managed assessment data for 20+ students during Digital Systems laboratory sessions. Supported student assessment and documentation processes, monitored laboratory activities, and provided guidance on laboratory assignments.':
    'Mengolah dan mengelola data penilaian untuk 20+ mahasiswa selama sesi laboratorium Sistem Digital. Mendukung proses penilaian dan dokumentasi mahasiswa, mengawasi kegiatan laboratorium, serta memberikan bimbingan pada tugas laboratorium.',
  'Coordinated communication between organizational leadership, Media & Information staff, and other divisions. Monitored division workflow, managed design requests from multiple divisions, and supported social media publication and content distribution.':
    'Mengoordinasikan komunikasi antara pimpinan organisasi, staf Media & Informasi, dan divisi lain. Mengawasi alur kerja divisi, mengelola permintaan desain dari berbagai divisi, serta mendukung publikasi media sosial dan distribusi konten.',
  'Monitored internal coordination and organizational relationships among management members. Provided organizational monitoring and oversight to support internal coordination.':
    'Mengawasi koordinasi internal dan hubungan keorganisasian antar pengurus. Memberikan pemantauan dan pengawasan organisasi untuk mendukung koordinasi internal.',
  'Supported internal communication and coordination within the Media & Information division. Managed and published organizational social media content, created visual materials, and supported content planning and publication activities.':
    'Mendukung komunikasi dan koordinasi internal dalam divisi Media & Informasi. Mengelola dan menerbitkan konten media sosial organisasi, membuat materi visual, serta mendukung perencanaan dan publikasi konten.',
  'Researched and evaluated 300+ Web3 projects based on activity, ecosystem development, incentive mechanisms, and community participation. Developed practical understanding of blockchain, DeFi, DEX, liquidity pools, DLMM, and Web3 protocols through testnets and social tasks.':
    'Meneliti dan mengevaluasi 300+ proyek Web3 berdasarkan aktivitas, perkembangan ekosistem, mekanisme insentif, dan partisipasi komunitas. Membangun pemahaman praktis mengenai blockchain, DeFi, DEX, kolam likuiditas, DLMM, dan protokol Web3 melalui testnet dan tugas sosial.',
  'Researched and wrote content on Web3 projects, blockchain protocols, DeFi concepts, and ecosystem developments. Translated technical information into accessible written content and created copywriting for social media.':
    'Meneliti dan menulis konten tentang proyek Web3, protokol blockchain, konsep DeFi, dan perkembangan ekosistem. Menerjemahkan informasi teknis menjadi konten tertulis yang mudah dipahami serta membuat naskah iklan untuk media sosial.',
  // work descriptions
  'Managed academic assessment data for 60+ students, assisted in computational physics sessions, and guided students through Python-based assignments.':
    'Mengelola data penilaian akademik untuk 60+ mahasiswa, membantu sesi komputasi fisika, dan memandu mahasiswa mengerjakan tugas berbasis Python.',
  'Conducted rainfall and disaster-vulnerability mapping, created visual materials, and participated in field surveys for landslide and flood events.':
    'Melakukan pemetaan curah hujan dan kerentanan bencana, membuat materi visual, serta berpartisipasi dalam survei lapangan untuk peristiwa tanah longsor dan banjir.',
  'Processed assessment data for 20+ students, supported documentation processes, and guided students through practical assignments.':
    'Mengolah data penilaian untuk 20+ mahasiswa, mendukung proses dokumentasi, dan memandu mahasiswa mengerjakan tugas praktikum.',
  // work detail — physics-computing
  'Academic Data Management & Computational Physics Laboratory Assistance':
    'Manajemen Data Akademik & Bantuan Laboratorium Komputasi Fisika',
  'A comprehensive laboratory teaching and academic support engagement at Universitas Negeri Yogyakarta. Responsible for managing assessment data for 60+ undergraduate physics students, providing direct instructional support during computational sessions, and troubleshooting Python code.':
    'Keterlibatan pengajaran laboratorium dan dukungan akademik yang menyeluruh di Universitas Negeri Yogyakarta. Bertanggung jawab mengelola data penilaian untuk 60+ mahasiswa sarjana Fisika, memberikan dukungan pengajaran langsung selama sesi komputasi, serta menelusuri kesalahan kode Python.',
  'Students Supported': 'Mahasiswa Terbantu',
  Timeframe: 'Rentang Waktu',
  'Core Focus': 'Fokus Utama',
  'Python & Numerics': 'Python & Numerik',
  'Teaching Assistant': 'Asisten Pengajar',
  'Operational Scope & Responsibilities': 'Lingkup Operasional & Tanggung Jawab',
  'Led weekly laboratory sessions focusing on computational physics problem solving using Python.':
    'Memimpin sesi laboratorium mingguan yang berfokus pada penyelesaian masalah komputasi fisika menggunakan Python.',
  'Processed, structured, and archived comprehensive assessment records across both weekly lab work and midterm practical evaluations.':
    'Mengolah, menata, dan mengarsipkan catatan penilaian yang menyeluruh, baik pada kerja laboratorium mingguan maupun evaluasi praktikum tengah semester.',
  'Conducted real-time debugging and code reviews for students learning scientific numerical libraries.':
    'Melakukan penelusuran kesalahan dan peninjauan kode secara langsung untuk mahasiswa yang mempelajari pustaka numerik ilmiah.',
  'Data Workflow & Methodology': 'Alur Kerja Data & Metodologi',
  'Built clean data processing sheets and automated tracking to minimize human grading discrepancies.':
    'Membangun lembar pemrosesan data yang rapi dan pelacakan otomatis untuk meminimalkan selisih penilaian manual.',
  'Coordinated closely with primary course lecturers to calibrate grading standards and ensure consistency.':
    'Berkoordinasi erat dengan dosen pengampu untuk mengkalibrasi standar penilaian dan memastikan konsistensi.',
  'Created reference scripts and problem-solving guidelines to accelerate student onboarding on complex physics algorithms.':
    'Membuat skrip referensi dan panduan penyelesaian masalah untuk mempercepat pemahaman mahasiswa terhadap algoritme fisika yang kompleks.',
  'Impact & Outcomes': 'Dampak & Hasil',
  'Successfully supervised and graded over 60 students with zero record losses and on-time grade submissions.':
    'Berhasil membimbing dan menilai lebih dari 60 mahasiswa tanpa kehilangan catatan serta mengumpulkan nilai tepat waktu.',
  'Enhanced student code quality and numerical literacy through structured practical mentorship.':
    'Meningkatkan kualitas kode dan literasi numerik mahasiswa melalui pendampingan praktikum yang terstruktur.',
  // work detail — kudus-disaster-mapping
  'GIS Vulnerability Mapping, Field Surveys & Administrative Support':
    'Pemetaan Kerentanan GIS, Survei Lapangan & Dukungan Administratif',
  'Professional internship engagement within the Emergency and Logistics Division of BPBD Kabupaten Kudus. Involved in disaster vulnerability mapping, GIS data processing, field hazard surveys, and operational administrative support.':
    'Keterlibatan magang profesional pada Divisi Darurat dan Logistik BPBD Kabupaten Kudus. Terlibat dalam pemetaan kerentanan bencana, pengolahan data GIS, survei ancaman bencana di lapangan, serta dukungan administratif operasional.',
  Agency: 'Instansi',
  'BPBD Kudus': 'BPBD Kudus',
  Domain: 'Domain',
  'GIS & Disaster Mgmt': 'GIS & Manajemen Bencana',
  'Floods & Landslides': 'Banjir & Tanah Longsor',
  'Field Reconnaissance & Hazard Assessment': 'Pemantauan Lapangan & Penilaian Ancaman',
  'Participated directly in on-site field surveys following landslide and localized flooding events across vulnerable sub-districts in Kudus.':
    'Berpartisipasi langsung dalam survei lapangan setelah peristiwa tanah longsor dan banjir lokal di kelurahan/kecamatan yang rentan di Kudus.',
  'Collected ground-truth geographic and hazard impact data to support rapid response and logistics allocation.':
    'Mengumpulkan data geografis dan dampak ancaman sebagai pembanding lapangan untuk mendukung respons cepat dan alokasi logistik.',
  'Spatial Mapping & Data Synthesis': 'Pemetaan Spasial & Sintesis Data',
  'Conducted rainfall distribution analysis and correlated precipitation anomalies with historical vulnerability maps.':
    'Melakukan analisis sebaran curah hujan dan mengaitkan anomali presipitasi dengan peta kerentanan historis.',
  'Compiled geographic layers into accessible disaster risk maps for internal agency review and stakeholder briefs.':
    'Menyusun lapisan geografis menjadi peta risiko bencana yang mudah dipahami untuk penelaahan internal instansi dan ringkasan pemangku kepentingan.',
  'Organized official travel and operational documentation, ensuring accurate administrative tracking for emergency dispatch.':
    'Menata perjalanan dinas dan dokumentasi operasional, memastikan pencatatan administratif yang akurat untuk pengiriman penanganan darurat.',
  'Communication & Visual Materials': 'Komunikasi & Materi Visual',
  'Designed informative graphic infographics and visual notices for regional public awareness and agency bulletins.':
    'Merancang infografis informatif dan pemberitahuan visual untuk kesadaran masyarakat regional dan buletin instansi.',
  'Bridged technical data and public comprehension through concise visual communication design.':
    'Menjembatani data teknis dan pemahaman masyarakat melalui desain komunikasi visual yang ringkas.',
  // work detail — digital-systems
  'Hardware Logic Testing & Academic Assessment Management':
    'Pengujian Logika Perangkat Keras & Manajemen Penilaian Akademik',
  'Academic teaching assistance for the Digital Systems laboratory course at UNY. Managed evaluation data, guided undergraduate students through circuit implementations, and supported laboratory documentation standards.':
    'Bantuan pengajaran akademik untuk mata kuliah laboratorium Sistem Digital di UNY. Mengelola data evaluasi, memandu mahasiswa sarjana dalam implementasi rangkaian, serta mendukung standar dokumentasi laboratorium.',
  Students: 'Mahasiswa',
  Course: 'Mata Kuliah',
  'Digital Systems': 'Sistem Digital',
  'Instruction & Lab Supervision': 'Pengajaran & Pengawasan Laboratorium',
  'Assisted in monitoring students during Digital Systems laboratory sessions.':
    'Membantu mengawasi mahasiswa selama sesi laboratorium Sistem Digital.',
  'Provided guidance to students in completing Digital Systems laboratory assignments.':
    'Memberikan bimbingan kepada mahasiswa dalam menyelesaikan tugas laboratorium Sistem Digital.',
  'Mentored students through logic gates, combinational circuits, and sequential systems work.':
    'Mendampingi mahasiswa dalam materi gerbang logika, rangkaian kombinasional, dan pengerjaan sistem sekuensial.',
  'Assessment Management': 'Manajemen Penilaian',
  'Processed and managed assessment data for 20+ students during Digital Systems laboratory sessions.':
    'Mengolah dan mengelola data penilaian untuk 20+ mahasiswa selama sesi laboratorium Sistem Digital.',
  'Supported student assessment and documentation processes throughout the semester.':
    'Mendukung proses penilaian dan dokumentasi mahasiswa sepanjang semester.',
  'Maintained organized academic performance records to support accurate grading and reporting.':
    'Menjaga catatan capaian akademik yang tertata untuk mendukung penilaian dan pelaporan yang akurat.',
  'Coordination & Communication': 'Koordinasi & Komunikasi',
  'Supported coordination between students and teaching staff during laboratory activities.':
    'Mendukung koordinasi antara mahasiswa dan tenaga pengajar selama kegiatan laboratorium.',
  'Relayed laboratory requirements and schedule information to keep sessions running smoothly.':
    'Menyampaikan kebutuhan laboratorium dan informasi jadwal agar sesi berjalan lancar.',
  // project descriptions
  'Built Realm of the Soulbond, a full-stack 2D multiplayer browser RPG with real-time position sync, a token-based marketplace, and an AI-powered NPC — developed end-to-end with an AI-leveraged workflow.':
    'Membangun Realm of the Soulbond, gim peramban RPG 2D multipemain berstack penuh dengan sinkronisasi posisi waktu-nyata, pasar berbasis token, dan NPC berbasis AI — dikembangkan menyeluruh dengan alur kerja berbantuan AI.',
  'Simulated the orbits of 83 Saturnian moons using Python & Pygame, processing 30,000+ data points with Runge-Kutta numerical methods.':
    'Mensimulasikan orbit 83 bulan Saturnus menggunakan Python & Pygame, mengolah 30.000+ titik data dengan metode numerik Runge-Kutta.',
  'Analyzed atmospheric dynamics for the March 25, 2025 flood event in Kabupaten Kudus using 10,000+ data points from 2016–2025.':
    'Menganalisis dinamika atmosfer untuk peristiwa banjir 25 Maret 2025 di Kabupaten Kudus menggunakan 10.000+ titik data dari 2016–2025.',
  'Developed an automatic garage prototype using Arduino UNO and ultrasonic sensor with control logic for distance-based automation.':
    'Mengembangkan prototipe garasi otomatis menggunakan Arduino UNO dan sensor ultrasonik dengan logika kendali otomatisasi berbasis jarak.',
  'Researched and evaluated 300+ Web3 projects, created educational content and copywriting for X under @tirtavex.':
    'Meneliti dan mengevaluasi 300+ proyek Web3, membuat konten edukatif dan naskah iklan untuk X di bawah @tirtavex.',
  // project categories
  'Full-Stack Web Game': 'Gim Peramban Full-Stack',
  'Data Analysis': 'Analisis Data',
  'Embedded Systems': 'Sistem Tertanam',
  Research: 'Riset',
  // project detail — project-veyra
  'Project Veyra — Multiplayer Browser RPG (Realm of the Soulbond)':
    'Proyek Veyra — Gim Peramban Multipemain (Realm of the Soulbond)',
  'Full-Stack Web Game — Real-Time Multiplayer & On-Chain Player State':
    'Gim Peramban Full-Stack — Multipemain Waktu-Nyata & Status Pemain On-Chain',
  'Realm of the Soulbond is a full-stack 2D browser RPG with a vanilla JavaScript + Canvas2D frontend and an Express.js + Socket.IO backend providing real-time multiplayer position sync. Repository: github.com/dkfadhila/ProjectVeyra.':
    'Realm of the Soulbond adalah gim peramban RPG 2D berstack penuh dengan frontend JavaScript murni + Canvas2D dan backend Express.js + Socket.IO yang menyediakan sinkronisasi posisi multipemain waktu-nyata. Repositori: github.com/dkfadhila/ProjectVeyra.',
  Genre: 'Genre',
  '2D Multiplayer RPG': 'RPG 2D Multipemain',
  'Playable Classes': 'Kelas yang Dapat Dimainkan',
  'AI NPC': 'NPC AI',
  'Real-Time Sync': 'Sinkronisasi Waktu-Nyata',
  Overview: 'Ringkasan',
  'Project Veyra is a full-stack 2D browser RPG: the frontend is built with vanilla JavaScript and Canvas2D, while the backend uses Express.js and Socket.IO to sync player positions across clients in real time.':
    'Proyek Veyra adalah gim peramban RPG 2D berstack penuh: frontend dibangun dengan JavaScript murni dan Canvas2D, sedangkan backend menggunakan Express.js dan Socket.IO untuk menyinkronkan posisi pemain antarklien secara waktu-nyata.',
  'Player accounts use JWT + bcrypt authentication, with auto-save persistence on both the server and localStorage, and on-chain verified player state stored via 0G Storage.':
    'Akun pemain menggunakan autentikasi JWT + bcrypt, dengan penyimpanan otomatis di server dan localStorage, serta status pemain terverifikasi on-chain yang disimpan melalui 0G Storage.',
  'Game Systems': 'Sistem Gim',
  'Developed a player-driven marketplace with a token-based economy, turn-based combat with skills and item drops, and a chained quest system across 7 playable classes.':
    'Mengembangkan pasar yang digerakkan pemain dengan ekonomi berbasis token, pertarungan bergilir dengan keterampilan dan jatuhnya item, serta sistem misi berantai pada 7 kelas yang dapat dimainkan.',
  'Integrated an AI-powered NPC (Lyra Oracle, MIMO) that responds to player dialogue and gifts.':
    'Mengintegrasikan NPC berbasis AI (Lyra Oracle, MIMO) yang merespons dialog dan hadiah pemain.',
  'Development Workflow': 'Alur Kerja Pengembangan',
  'Built the game end-to-end with an AI-leveraged workflow using Claude Code — from backend architecture and game systems to frontend rendering.':
    'Membangun gim secara menyeluruh dengan alur kerja berbantuan AI menggunakan Claude Code — dari arsitektur backend dan sistem gim hingga rendering frontend.',
  'Repository and source code are available at github.com/dkfadhila/ProjectVeyra.':
    'Repositori dan kode sumber tersedia di github.com/dkfadhila/ProjectVeyra.',
  'Full-Stack': 'Full-Stack',
  Multiplayer: 'Multipemain',
  'Browser RPG': 'RPG Peramban',
  'AI-Leveraged Workflow': 'Alur Kerja Berbantuan AI',
  // project detail — saturnian-moons
  'Computational Physics Simulation — Orbital Dynamics & Numerical Methods':
    'Simulasi Fisika Komputasi — Dinamika Orbit & Metode Numerik',
  "A computational physics project that simulates the orbital behavior of 83 known Saturnian moons. The simulation models gravitational interactions using Newton's Law of Gravitation and applies the 4th-order Runge-Kutta numerical method to predict satellite positions and velocities over time.":
    'Proyek fisika komputasi yang mensimulasikan perilaku orbit 83 bulan Saturnus yang telah diketahui. Simulasi memodelkan interaksi gravitasi menggunakan Hukum Gravitasi Newton dan menerapkan metode numerik Runge-Kutta orde 4 untuk memprediksi posisi dan kecepatan satelit dari waktu ke waktu.',
  'Data Points': 'Titik Data',
  'Moons Simulated': 'Bulan Tersimulasi',
  Method: 'Metode',
  '4th-order Runge-Kutta': 'Runge-Kutta Orde 4',
  'Physics Model': 'Model Fisika',
  'Newtonian Gravity + Keplerian Mechanics': 'Gravitasi Newton + Mekanika Kepler',
  "This project simulates the orbital dynamics of Saturn's 83 known moons using Python and Pygame for visualization. The goal was to model gravitational interactions and predict satellite trajectories based on real astronomical data.":
    'Proyek ini mensimulasikan dinamika orbit 83 bulan Saturnus yang telah diketahui menggunakan Python dan Pygame untuk visualisasi. Tujuannya adalah memodelkan interaksi gravitasi dan memprediksi lintasan satelit berdasarkan data astronomi nyata.',
  'The simulation processes orbital parameters including velocity, period, position/trajectory, mass, and other characteristics from the dataset to create an accurate model of moon behavior around Saturn.':
    'Simulasi mengolah parameter orbit meliputi kecepatan, periode, posisi/lintasan, massa, dan karakteristik lain dari dataset untuk menciptakan model perilaku bulan di sekitar Saturnus yang akurat.',
  Methodology: 'Metodologi',
  'Applied the 4th-order Runge-Kutta method — a widely-used numerical technique for solving ordinary differential equations — to predict satellite positions and velocities at each time step.':
    'Menerapkan metode Runge-Kutta orde 4 — teknik numerik yang luas digunakan untuk menyelesaikan persamaan diferensial biasa — guna memprediksi posisi dan kecepatan satelit pada setiap langkah waktu.',
  "Modeled gravitational interactions based on Newton's Law of Gravitation, accounting for Saturn's mass and the orbital parameters of each moon.":
    'Memodelkan interaksi gravitasi berdasarkan Hukum Gravitasi Newton, dengan memperhitungkan massa Saturnus dan parameter orbit setiap bulan.',
  "Incorporated Kepler's Laws of planetary motion to validate orbital behavior and ensure the simulation produced physically accurate trajectories.":
    'Mengintegrasikan Hukum Kepler tentang gerak planet untuk memvalidasi perilaku orbit dan memastikan simulasi menghasilkan lintasan yang akurat secara fisika.',
  'Analysis & Findings': 'Analisis & Temuan',
  'Analyzed orbital patterns and parameter relationships among the 83 Saturnian moons, identifying distinct clustering tendencies among satellites with similar orbital characteristics.':
    'Menganalisis pola orbit dan hubungan antarparameter pada 83 bulan Saturnus, mengidentifikasi kecenderungan klaster yang khas pada satelit dengan karakteristik orbit serupa.',
  "Identified differences in orbital distribution between inner and outer moons, revealing patterns in how Saturn's satellite system is organized.":
    'Mengidentifikasi perbedaan sebaran orbit antara bulan dalam dan bulan luar, mengungkap pola tatanan sistem satelit Saturnus.',
  'The simulation provided insights into orbital resonance and gravitational perturbation effects within the Saturnian system.':
    'Simulasi memberikan wawasan tentang resonansi orbit dan efek gangguan gravitasi dalam sistem Saturnus.',
  // project detail — flood-analysis
  'Atmospheric Dynamics Analysis — Python & Data Visualization':
    'Analisis Dinamika Atmosfer — Python & Visualisasi Data',
  'An atmospheric dynamics analysis using Python to investigate factors associated with the March 25, 2025 flood event in Kabupaten Kudus. The study processed and analyzed 10,000+ data points covering rainfall, temperature, pressure, and atmospheric stability from 2016–2025.':
    'Analisis dinamika atmosfer menggunakan Python untuk menyelidiki faktor-faktor yang berkaitan dengan peristiwa banjir 25 Maret 2025 di Kabupaten Kudus. Kajian mengolah dan menganalisis 10.000+ titik data yang mencakup curah hujan, suhu, tekanan, dan stabilitas atmosfer dari 2016–2025.',
  'Time Span': 'Rentang Waktu',
  Event: 'Peristiwa',
  'March 25, 2025 Flood': 'Banjir 25 Maret 2025',
  Location: 'Lokasi',
  'This project investigates the atmospheric conditions and climate-related factors that contributed to the severe flooding in Kabupaten Kudus on March 25, 2025. The analysis uses Python-based data processing and visualization to identify patterns in meteorological data.':
    'Proyek ini menyelidiki kondisi atmosfer dan faktor terkait iklim yang menyebabkan banjir parah di Kabupaten Kudus pada 25 Maret 2025. Analisis menggunakan pemrosesan dan visualisasi data berbasis Python untuk mengidentifikasi pola pada data meteorologi.',
  'The study processed over 10,000 data points spanning a 10-year period (2016–2025) to establish baseline conditions and identify anomalies associated with the flood event.':
    'Kajian mengolah lebih dari 10.000 titik data selama rentang 10 tahun (2016–2025) untuk membangun kondisi dasar dan mengidentifikasi anomali yang berkaitan dengan peristiwa banjir.',
  'Data & Methods': 'Data & Metode',
  'Analyzed multiple atmospheric variables including rainfall intensity, surface temperature, atmospheric pressure, cloud movement patterns, and climate variability indices.':
    'Menganalisis beberapa variabel atmosfer meliputi intensitas curah hujan, suhu permukaan, tekanan atmosfer, pola gerakan awan, dan indeks variabilitas iklim.',
  'Applied computational and data-analysis methods to investigate the relationship between atmospheric conditions and flood events, comparing the March 2025 event against historical patterns.':
    'Menerapkan metode komputasi dan analisis data untuk menyelidiki hubungan antara kondisi atmosfer dan peristiwa banjir, membandingkan peristiwa Maret 2025 dengan pola historis.',
  'Used data visualization techniques to present findings and identify temporal patterns in atmospheric stability leading up to the flood event.':
    'Menggunakan teknik visualisasi data untuk menyajikan temuan dan mengidentifikasi pola temporal stabilitas atmosfer menjelang peristiwa banjir.',
  'Key Findings': 'Temuan Utama',
  'Identified correlations between atmospheric pressure drops, sustained rainfall, and cloud movement patterns that preceded the flood event.':
    'Mengidentifikasi korelasi antara penurunan tekanan atmosfer, curah hujan berkelanjutan, dan pola gerakan awan yang mendahului peristiwa banjir.',
  'Compared atmospheric variables across historical periods to establish the severity and uniqueness of the March 2025 conditions.':
    'Membandingkan variabel atmosfer antarperiode historis untuk menetapkan tingkat keparahan dan kekhasan kondisi Maret 2025.',
  "The analysis provided a data-driven understanding of the flood's meteorological context, supporting disaster preparedness and response planning.":
    'Analisis memberikan pemahaman berbasis data tentang konteks meteorologi banjir, mendukung kesiapsiagaan dan perencanaan respons bencana.',
  // project detail — arduino-garage
  'Embedded Systems Prototype — Arduino UNO & Control Logic':
    'Prototipe Sistem Tertanam — Arduino UNO & Logika Kendali',
  'An automatic garage prototype that uses an Arduino UNO and ultrasonic sensor to detect vehicle proximity and automatically open/close the garage door. The system integrates sensor input, mathematical distance calculations, and control logic into a working embedded automation system.':
    'Prototipe garasi otomatis yang menggunakan Arduino UNO dan sensor ultrasonik untuk mendeteksi kedekatan kendaraan serta membuka/menutup pintu garasi secara otomatis. Sistem mengintegrasikan masukan sensor, perhitungan jarak matematis, dan logika kendali menjadi sistem otomasi tertanam yang berfungsi.',
  Platform: 'Platform',
  Sensor: 'Sensor',
  Ultrasonic: 'Ultrasonik',
  Type: 'Jenis',
  Prototype: 'Prototipe',
  'This project develops an automatic garage system prototype using Arduino UNO as the main controller and an ultrasonic sensor for distance detection. The system automatically opens and closes the garage door based on the proximity of a vehicle.':
    'Proyek ini mengembangkan prototipe sistem garasi otomatis menggunakan Arduino UNO sebagai pengendali utama dan sensor ultrasonik untuk deteksi jarak. Sistem membuka dan menutup pintu garasi secara otomatis berdasarkan kedekatan kendaraan.',
  'The project integrates hardware (sensor + Arduino) with software (control logic) to create a functional embedded automation system.':
    'Proyek mengintegrasikan perangkat keras (sensor + Arduino) dengan perangkat lunak (logika kendali) untuk menciptakan sistem otomasi tertanam yang berfungsi.',
  'Analyzed the mathematical equations used to calculate distance from ultrasonic sensor readings, converting time-of-flight measurements into accurate distance values.':
    'Menganalisis persamaan matematis yang digunakan untuk menghitung jarak dari pembacaan sensor ultrasonik, mengonversi pengukuran waktu tempuh menjadi nilai jarak yang akurat.',
  'Designed control logic that translates calculated distance parameters into actuator commands for the garage mechanism (open/close).':
    'Merancang logika kendali yang menerjemahkan parameter jarak hasil perhitungan menjadi perintah aktuator untuk mekanisme garasi (buka/tutup).',
  'Integrated sensor input processing, mathematical calculations, and output control into a cohesive Arduino-based system.':
    'Mengintegrasikan pemrosesan masukan sensor, perhitungan matematis, dan kendali keluaran menjadi sistem berbasis Arduino yang utuh.',
  Implementation: 'Implementasi',
  'Connected the ultrasonic sensor to Arduino UNO and programmed the microcontroller to continuously read distance measurements.':
    'Menghubungkan sensor ultrasonik ke Arduino UNO dan memprogram mikrokontroler untuk membaca pengukuran jarak secara terus-menerus.',
  'Implemented threshold-based logic: when a vehicle is detected within a predefined distance, the system triggers the garage door to open; when the vehicle moves away, the door closes.':
    'Menerapkan logika berbasis ambang: saat kendaraan terdeteksi dalam jarak yang telah ditentukan, sistem memicu pintu garasi terbuka; saat kendaraan menjauh, pintu tertutup.',
  'Tested and calibrated the system for reliable detection and response across different conditions.':
    'Menguji dan mengalibrasi sistem agar deteksi dan responsnya andal dalam berbagai kondisi.',
  // project tags
  'Numerical Methods': 'Metode Numerik',
  'Atmospheric Science': 'Ilmu Atmosfer',
  Visualization: 'Visualisasi',
  'Control Logic': 'Logika Kendali',
  'Basic Electronics': 'Elektronika Dasar',
  // content items
  'Independent Web3 Research': 'Riset Web3 Independen',
  'Researched and evaluated 300+ Web3 projects based on project activity, ecosystem development, incentive mechanisms, product concepts, and community participation. Monitored project updates, ecosystem narratives, and campaigns.':
    'Meneliti dan mengevaluasi 300+ proyek Web3 berdasarkan aktivitas proyek, perkembangan ekosistem, mekanisme insentif, konsep produk, dan partisipasi komunitas. Memantau pembaruan proyek, narasi ekosistem, dan kampanye.',
  'Web3 Content Writing — X (@tirtavex)': 'Penulisan Konten Web3 — X (@tirtavex)',
  'Researched and wrote content on Web3 projects, blockchain protocols, DeFi concepts, and ecosystem developments. Translated technical information into accessible written content and social media copywriting.':
    'Meneliti dan menulis konten tentang proyek Web3, protokol blockchain, konsep DeFi, dan perkembangan ekosistem. Menerjemahkan informasi teknis menjadi konten tertulis yang mudah dipahami serta naskah iklan media sosial.',
  'AI & Automation Workflows': 'Alur Kerja AI & Otomatisasi',
  'Developed research workflows, knowledge bases, content operations, agent workflows, and workflow automation. Experienced with n8n, Cursor, GitHub, Claude Code, Codex, Vercel, and Hermes.':
    'Mengembangkan alur kerja riset, basis pengetahuan, operasi konten, alur kerja agen, dan otomatisasi alur kerja. Berpengalaman dengan n8n, Cursor, GitHub, Claude Code, Codex, Vercel, dan Hermes.',
  // map cards
  'About Me': 'Tentang Saya',
  'Operating principles, capabilities, and collaboration style.':
    'Prinsip kerja, kemampuan, dan gaya kolaborasi.',
  '8 roles across professional, organizational, and Web3.':
    '8 peran lintas profesional, organisasi, dan Web3.',
  'Selected Work': 'Pekerjaan Terpilih',
  'Case studies: BPBD GIS hazard mapping & academic assistance.':
    'Studi kasus: pemetaan ancaman GIS BPBD & bantuan akademik.',
  'Browser RPG, computational physics, atmospheric analysis, prototypes.':
    'RPG peramban, fisika komputasi, analisis atmosfer, prototipe.',
  'Web3 research, Ethereum upgrades, and ecosystem analytics.':
    'Riset Web3, peningkatan Ethereum, dan analitik ekosistem.',
  'Creative Works': 'Karya Kreatif',
  'Visual archive — new works in progress.':
    'Arsip visual — karya baru sedang dikerjakan.',
  'Academic record, certificates, and physics degree honors.':
    'Rekam akademik, sertifikat, dan kehormatan gelar Fisika.',
  'Start a conversation — the inbox is open.':
    'Mulai percakapan — kotak masuk terbuka.',
  // experience orgs
  'Independent — X: @tirtavex': 'Independen — X: @tirtavex',
  // credentials
  'Bachelor of Science': 'Sarjana Sains',
  Physics: 'Fisika',
  Completed: 'Selesai',
  Coordinates: 'Koordinat',
  // stacks
  'Python / Scientific Computing': 'Python / Komputasi Ilmiah',
  'QGIS / Data Mapping / Admin': 'QGIS / Pemetaan Data / Administrasi',
  'Digital Systems / Data Management': 'Sistem Digital / Manajemen Data',
  'Python / Data Analysis': 'Python / Analisis Data',
  'Research / Content': 'Riset / Konten',
  // project list titles
  'Project Veyra — Multiplayer Browser RPG':
    'Proyek Veyra — Gim Peramban Multipemain',
  'Simulating the Orbits of 83 Saturnian Moons Using Python & Pygame':
    'Simulasi Orbit 83 Bulan Saturnus Menggunakan Python & Pygame',
  'Analysis of the March 25, 2025 Flood Event in Kabupaten Kudus':
    'Analisis Peristiwa Banjir 25 Maret 2025 di Kabupaten Kudus',
  'Ultrasonic Sensor-Based Automatic Garage System':
    'Sistem Garasi Otomatis Berbasis Sensor Ultrasonik',
  'Web3 Research & Content': 'Riset & Konten Web3',
  // remaining labels, statuses, tags
  Role: 'Peran',
  Ongoing: 'Sedang berjalan',
  Content: 'Konten',
  Experiment: 'Eksperimen',
  'Data Visualization': 'Visualisasi Data',
  'Newtonian Gravity': 'Gravitasi Newton',
  'Keplerian Mechanics': 'Mekanika Kepler',
  'Ultrasonic Sensor': 'Sensor Ultrasonik',
  'Data Mapping': 'Pemetaan Data',
  'Field Research': 'Riset Lapangan',
  'GIS Mapping': 'Pemetaan GIS',
  'Field Assessment': 'Asesmen Lapangan',
  'Data Management': 'Manajemen Data',
  Documentation: 'Dokumentasi',
  Teaching: 'Pengajaran',
  'Academic Support': 'Dukungan Akademik',
  Troubleshooting: 'Penelusuran Kesalahan',
  'Digital Logic': 'Logika Digital',
  'Circuit Testing': 'Pengujian Rangkaian',
  'Visual Design': 'Desain Visual',
  'Disaster Mitigation': 'Mitigasi Bencana',
  'Field Survey': 'Survei Lapangan',
  'Content Writing': 'Penulisan Konten',
};

/* Translate a content string (EN source) to the active language */
export function tr(s: string, lang: Lang): string {
  if (lang === 'en') return s;
  return contentTr[s] ?? s;
}

/* ============================================================
   Period strings — "Feb 2025 — Jun 2025", "2024 — Present".
   EN source; month names & "Present" localized for ID.
   ============================================================ */
const monthsId: Record<string, string> = {
  Jan: 'Jan', Feb: 'Feb', Mar: 'Mar', Apr: 'Apr', May: 'Mei', Jun: 'Jun',
  Jul: 'Jul', Aug: 'Agu', Sep: 'Sep', Oct: 'Okt', Nov: 'Nov', Dec: 'Des',
};

export function trPeriod(s: string, lang: Lang): string {
  if (lang === 'en') return s;
  return s
    .replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, (m) => monthsId[m])
    .replace(/\bPresent\b/g, 'Sekarang');
}

/* ============================================================
   UI chrome strings (nav, hero, headers, footer, section labels)
   ============================================================ */
export const ui = {
  // Nav
  navHome: { id: 'Beranda', en: 'Home' },
  navAbout: { id: 'Tentang', en: 'About' },
  navExperience: { id: 'Pengalaman', en: 'Experience' },
  navWork: { id: 'Pekerjaan', en: 'Work' },
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
  viewWork: { id: 'Lihat pekerjaan', en: 'View work' },
  getInTouch: { id: 'Hubungi saya', en: 'Get in touch' },
  basedIn: { id: 'Domisili', en: 'Based In' },
  role: { id: 'Peran', en: 'Role' },
  year: { id: 'Tahun', en: 'Year' },
  status: { id: 'Status', en: 'Status' },
  openToWork: { id: 'Terbuka untuk bekerja', en: 'Open to work' },
  availableFor: {
    id: 'Tersedia untuk peluang baru',
    en: 'Available for new opportunities',
  },
  figIndex: { id: 'Fig. 01 — Indeks', en: 'Fig. 01 — Index' },
  signal: { id: 'Sinyal / 01', en: 'Signal / 01' },
  metricPhysics: { id: 'S.Si.', en: 'B.Sc.' },
  metricPhysicsLabel: { id: 'Fisika', en: 'Physics' },
  metricProjects: { id: 'Proyek', en: 'Projects' },
  metricTools: { id: 'Perangkat & Teknologi', en: 'Tools & Tech' },
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
  downloadCv: { id: 'Unduh CV', en: 'Download CV' },

  // Footer
  footerContact: { id: 'Kontak', en: 'Contact' },
  footerBy: { id: 'Portofolio oleh', en: 'Portfolio by' },
  portfolio: { id: 'Portofolio', en: 'Portfolio' },
  backToTop: { id: 'Kembali ke atas', en: 'Back to top' },
} satisfies Record<string, LStr>;
