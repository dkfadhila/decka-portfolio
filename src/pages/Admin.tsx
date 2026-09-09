import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Briefcase,
  FileText,
  Image as ImageIcon,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  ExternalLink,
  Edit3,
  X,
  BookOpen,
  ArrowUpRight,
  Clock,
  Layers,
  Sparkles,
  Lock,
  ArrowLeft,
  Eye,
  FileCheck,
} from 'lucide-react';
import {
  projects as initialProjects,
  projectDetails as initialProjectDetails,
  work as initialWork,
  workDetails as initialWorkDetails,
  experience as initialExperience,
  content as initialContent,
  creativeItems as initialCreatives,
} from '../data';
import { useI18n, LangToggle, type LStr } from '../i18n';
import type { CreativeItem } from '../types';

export default function AdminPage() {
  const { t } = useI18n();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Tab: Projects, Work, Content, Creative
  const [activeTab, setActiveTab] = useState<'projects' | 'work' | 'experience' | 'content' | 'creative'>('projects');
  const [notification, setNotification] = useState('');
  const [currentTimeWIB, setCurrentTimeWIB] = useState('');

  // ══════════════════════════════════════════════════════════
  // PERSISTENT EDITABLE STATE (LOCALSTORAGE / MEMORY)
  // ══════════════════════════════════════════════════════════
  const [projectsList, setProjectsList] = useState(() => {
    const saved = localStorage.getItem('dktirta_projects');
    return saved ? JSON.parse(saved) : Object.values(initialProjectDetails);
  });

  const [workList, setWorkList] = useState(() => {
    const saved = localStorage.getItem('dktirta_work');
    return saved ? JSON.parse(saved) : Object.values(initialWorkDetails);
  });

  const [contentList, setContentList] = useState(() => {
    const saved = localStorage.getItem('dktirta_content');
    return saved ? JSON.parse(saved) : initialContent;
  });

  const [creativeList, setCreativeList] = useState(() => {
    const saved = localStorage.getItem('dktirta_creative');
    return saved ? JSON.parse(saved) : initialCreatives;
  });

  const [experienceList, setExperienceList] = useState(() => {
    const saved = localStorage.getItem('dktirta_experience');
    return saved ? JSON.parse(saved) : initialExperience;
  });

  // Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(now);
      setCurrentTimeWIB(`${formatted} WIB`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerNotify = (msg: string) => {
    setNotification(`[${currentTimeWIB}] ${msg}`);
    setTimeout(() => setNotification(''), 4000);
  };

  // Sync to local storage
  const persistChanges = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Auto-sync to GitHub
  const [syncing, setSyncing] = useState(false);
  const syncToGitHub = async () => {
    if (syncing) return;
    setSyncing(true);
    try {
      const payload = {
        projects: projectsList,
        work: workList,
        experience: experienceList,
        content: contentList,
        creative: creativeList,
      };
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': 'tanjungkarang',
          'x-vercel-protection-bypass': 'dktirta-cms-bypass-2026',
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.ok) {
        triggerNotify(`Auto-synced to GitHub! Deploy ~1-2 min. Commit: ${result.commit || 'pending'}`);
      } else {
        console.error('Sync failed:', result.error);
        triggerNotify(`Sync error: ${result.error}`);
      }
    } catch (err: any) {
      console.error('Sync error:', err);
      triggerNotify(`Sync error: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  // ══════════════════════════════════════════════════════════
  // MODAL STATES
  // ══════════════════════════════════════════════════════════
  // 1. Artikel Modal (Format 3 Sub-Bab Standar dktirta.tech)
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [articleTarget, setArticleTarget] = useState<'projects' | 'work'>('projects');
  const [articleStatus, setArticleStatus] = useState<'Published' | 'Draft'>('Published');
  const [articleForm, setArticleForm] = useState({
    id: '',
    title: '',
    subtitle: '',
    category: 'Scientific Computing',
    year: '2025',
    client: 'Universitas Negeri Yogyakarta',
    period: '2025',
    imageUrl: '',
    overview: '',
    hl1Label: 'Data Points',
    hl1Value: '10,000+',
    hl2Label: 'Time Span',
    hl2Value: '2024 — 2025',
    hl3Label: 'Method',
    hl3Value: 'Runge-Kutta 4th Order',
    hl4Label: 'Location',
    hl4Value: 'Indonesia',
    stack: 'Python, Scientific Computing, Data Analysis',
    // 3 SUB-BAB
    sub1Title: 'Overview',
    sub1Content: '',
    sub2Title: 'Data & Methods',
    sub2Content: '',
    sub3Title: 'Key Findings',
    sub3Content: '',
  });

  // 2. Content Modal (Opsi: Format Link Luar ATAU Format Artikel Web)
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [contentMode, setContentMode] = useState<'link' | 'article'>('link');
  const [contentStatus, setContentStatus] = useState<'Published' | 'Draft'>('Published');
  const [contentForm, setContentForm] = useState({
    id: '',
    title: '',
    type: 'Research', // Research / Content / Experiment
    date: '2024 — Present',
    description: '',
    link: 'https://x.com/tirtavex',
    // Extra if article mode selected:
    subtitle: '',
    imageUrl: '',
    sub1Title: 'Overview',
    sub1Content: '',
    sub2Title: 'Analysis & Methodology',
    sub2Content: '',
    sub3Title: 'Key Insights',
    sub3Content: '',
  });

  // 3. Creative Modal (Karya Visual: Graphic & Posters, Photography, Motion & Video)
  const [creativeModalOpen, setCreativeModalOpen] = useState(false);
  const [isEditingCreative, setIsEditingCreative] = useState(false);
  const [creativeStatus, setCreativeStatus] = useState<'Published' | 'Draft'>('Published');
  const [creativeForm, setCreativeForm] = useState({
    id: '',
    title: '',
    category: 'graphic' as 'graphic' | 'photography' | 'motion',
    type: 'Poster & Layout',
    date: '2025',
    description: '',
    thumbnailUrl: '',
    mediaUrl: '',
    mediaType: 'image' as 'image' | 'video',
    tags: 'Graphic Design, Poster',
    aspectRatio: 'poster' as 'poster' | 'video-vertical' | 'video-horizontal' | 'photo',
  });

  // 4. Experience Modal (Pengalaman Kerja / Organisasi)
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [experienceStatus, setExperienceStatus] = useState<'Published' | 'Draft'>('Published');
  const [experienceForm, setExperienceForm] = useState({
    id: '',
    role: '',
    org: '',
    period: '',
    description: '',
    tags: '',
  });

  // ══════════════════════════════════════════════════════════
  // OPEN EDITORS
  // ══════════════════════════════════════════════════════════
  const openNewArticle = (target: 'projects' | 'work') => {
    setIsEditingArticle(false);
    setArticleTarget(target);
    setArticleStatus('Published');
    setArticleForm({
      id: '',
      title: '',
      subtitle: '',
      category: target === 'projects' ? 'Scientific Computing' : 'Academic Support',
      year: '2026',
      client: 'Universitas Negeri Yogyakarta',
      period: '2026',
      imageUrl: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1400&q=80',
      overview: '',
      hl1Label: 'Data Points',
      hl1Value: '10,000+',
      hl2Label: 'Time Span',
      hl2Value: '2026',
      hl3Label: 'Core Focus',
      hl3Value: 'Python & Analytics',
      hl4Label: 'Status',
      hl4Value: 'Active',
      stack: 'Python, Data Processing, Numerical Methods',
      sub1Title: 'Overview',
      sub1Content: '',
      sub2Title: 'Data & Methods',
      sub2Content: '',
      sub3Title: 'Key Findings',
      sub3Content: '',
    });
    setArticleModalOpen(true);
  };

  const openEditArticle = (item: any, target: 'projects' | 'work') => {
    setIsEditingArticle(true);
    setArticleTarget(target);
    setArticleStatus(item.status || 'Published');
    const secs = item.sections || [];
    const hls = item.highlights || [];
    setArticleForm({
      id: item.id,
      title: item.title || '',
      subtitle: item.subtitle || '',
      category: item.category || '',
      year: item.year || '2025',
      client: item.client || '',
      period: item.period || '',
      imageUrl: item.imageUrl || '',
      overview: item.overview || '',
      hl1Label: hls[0]?.label || 'Metric 1',
      hl1Value: hls[0]?.value || '10,000+',
      hl2Label: hls[1]?.label || 'Metric 2',
      hl2Value: hls[1]?.value || '2024 — 2025',
      hl3Label: hls[2]?.label || 'Metric 3',
      hl3Value: hls[2]?.value || 'Method',
      hl4Label: hls[3]?.label || 'Metric 4',
      hl4Value: hls[3]?.value || 'Verified',
      stack: Array.isArray(item.stack) ? item.stack.join(', ') : item.stack || '',
      sub1Title: secs[0]?.heading || 'Overview',
      sub1Content: Array.isArray(secs[0]?.content) ? secs[0].content.join('\n\n') : secs[0]?.content || '',
      sub2Title: secs[1]?.heading || 'Data & Methods',
      sub2Content: Array.isArray(secs[1]?.content) ? secs[1].content.join('\n\n') : secs[1]?.content || '',
      sub3Title: secs[2]?.heading || 'Key Findings',
      sub3Content: Array.isArray(secs[2]?.content) ? secs[2].content.join('\n\n') : secs[2]?.content || '',
    });
    setArticleModalOpen(true);
  };

  const saveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = articleForm.id || articleForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const sections = [
      { heading: articleForm.sub1Title, content: articleForm.sub1Content.split('\n\n').filter(Boolean) },
      { heading: articleForm.sub2Title, content: articleForm.sub2Content.split('\n\n').filter(Boolean) },
      { heading: articleForm.sub3Title, content: articleForm.sub3Content.split('\n\n').filter(Boolean) },
    ];
    const highlights = [
      { label: articleForm.hl1Label, value: articleForm.hl1Value },
      { label: articleForm.hl2Label, value: articleForm.hl2Value },
      { label: articleForm.hl3Label, value: articleForm.hl3Value },
      { label: articleForm.hl4Label, value: articleForm.hl4Value },
    ];
    const stack = articleForm.stack.split(',').map((s) => s.trim()).filter(Boolean);

    const newObj = {
      id: slug,
      title: articleForm.title,
      subtitle: articleForm.subtitle,
      category: articleForm.category,
      year: articleForm.year,
      client: articleForm.client,
      period: articleForm.period,
      imageUrl: articleForm.imageUrl,
      overview: articleForm.overview,
      highlights,
      stack,
      tags: stack,
      sections,
      status: articleStatus,
    };

    if (articleTarget === 'projects') {
      const updated = isEditingArticle
        ? projectsList.map((p: any) => (p.id === slug ? newObj : p))
        : [newObj, ...projectsList];
      setProjectsList(updated);
      persistChanges('dktirta_projects', updated);
      triggerNotify(`Proyek "${articleForm.title}" berhasil disimpan [${articleStatus}]!`);
    } else {
      const updated = isEditingArticle
        ? workList.map((w: any) => (w.id === slug ? newObj : w))
        : [newObj, ...workList];
      setWorkList(updated);
      persistChanges('dktirta_work', updated);
      triggerNotify(`Studi Kasus Work "${articleForm.title}" berhasil disimpan [${articleStatus}]!`);
    }
    setArticleModalOpen(false);
  };

  const openNewContent = () => {
    setIsEditingContent(false);
    setContentMode('link');
    setContentStatus('Published');
    setContentForm({
      id: 'c-' + Date.now().toString(36),
      title: '',
      type: 'Research',
      date: '2024 — Present',
      description: '',
      link: 'https://x.com/tirtavex',
      subtitle: '',
      imageUrl: '',
      sub1Title: 'Overview',
      sub1Content: '',
      sub2Title: 'Methodology & Findings',
      sub2Content: '',
      sub3Title: 'Discussion',
      sub3Content: '',
    });
    setContentModalOpen(true);
  };

  const openEditContent = (c: any) => {
    setIsEditingContent(true);
    setContentMode(c.sections && c.sections.length > 0 ? 'article' : 'link');
    setContentStatus(c.status || 'Published');
    setContentForm({
      id: c.id,
      title: c.title,
      type: c.type || 'Research',
      date: c.date || '2024 — Present',
      description: c.description || '',
      link: c.link || '',
      subtitle: c.subtitle || '',
      imageUrl: c.imageUrl || '',
      sub1Title: c.sections?.[0]?.heading || 'Overview',
      sub1Content: Array.isArray(c.sections?.[0]?.content) ? c.sections[0].content.join('\n\n') : c.sections?.[0]?.content || '',
      sub2Title: c.sections?.[1]?.heading || 'Analysis',
      sub2Content: Array.isArray(c.sections?.[1]?.content) ? c.sections[1].content.join('\n\n') : c.sections?.[1]?.content || '',
      sub3Title: c.sections?.[2]?.heading || 'Key Insights',
      sub3Content: Array.isArray(c.sections?.[2]?.content) ? c.sections[2].content.join('\n\n') : c.sections?.[2]?.content || '',
    });
    setContentModalOpen(true);
  };

  const saveContent = (e: React.FormEvent) => {
    e.preventDefault();
    let newObj: any = {
      id: contentForm.id,
      title: contentForm.title,
      type: contentForm.type,
      date: contentForm.date,
      description: contentForm.description,
      status: contentStatus,
    };

    if (contentMode === 'link') {
      newObj.link = contentForm.link;
    } else {
      newObj.link = `/content/${contentForm.id}`;
      newObj.subtitle = contentForm.subtitle;
      newObj.imageUrl = contentForm.imageUrl;
      newObj.sections = [
        { heading: contentForm.sub1Title, content: contentForm.sub1Content.split('\n\n').filter(Boolean) },
        { heading: contentForm.sub2Title, content: contentForm.sub2Content.split('\n\n').filter(Boolean) },
        { heading: contentForm.sub3Title, content: contentForm.sub3Content.split('\n\n').filter(Boolean) },
      ];
    }

    const updated = isEditingContent
      ? contentList.map((c: any) => (c.id === contentForm.id ? newObj : c))
      : [newObj, ...contentList];
    setContentList(updated);
    persistChanges('dktirta_content', updated);
    triggerNotify(`Konten "${contentForm.title}" berhasil disimpan [${contentStatus}]!`);
    setContentModalOpen(false);
  };

  const openNewCreative = () => {
    setIsEditingCreative(false);
    setCreativeStatus('Published');
    setCreativeForm({
      id: 'cr-' + Date.now().toString(36),
      title: '',
      category: 'Graphic & Posters',
      type: 'Graphic & Posters',
      date: '2025',
      description: '',
      thumbnailUrl: '',
      mediaUrl: '',
      mediaType: 'image',
      tags: 'Graphic Design, Poster',
      aspectRatio: 'poster',
    });
    setCreativeModalOpen(true);
  };

  const openEditCreative = (cr: any) => {
    setIsEditingCreative(true);
    setCreativeStatus(cr.status || 'Published');
    let cat = cr.category || 'Graphic & Posters';
    if (cat === 'graphic' || cat.toLowerCase().includes('poster') || cat.toLowerCase().includes('graphic')) {
      cat = 'Graphic & Posters';
    } else if (cat === 'photography' || cat.toLowerCase().includes('photo')) {
      cat = 'Photography';
    } else if (cat === 'motion' || cat.toLowerCase().includes('motion') || cat.toLowerCase().includes('video')) {
      cat = 'Motion & Video';
    }
    setCreativeForm({
      id: cr.id,
      title: cr.title || '',
      category: cat,
      type: cr.type || cat,
      date: cr.date || '2025',
      description: cr.description || '',
      thumbnailUrl: cr.thumbnailUrl || '',
      mediaUrl: cr.mediaUrl || '',
      mediaType: cr.mediaType || 'image',
      tags: Array.isArray(cr.tags) ? cr.tags.join(', ') : cr.tags || '',
      aspectRatio: cr.aspectRatio || 'poster',
    });
    setCreativeModalOpen(true);
  };

  const saveCreative = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = creativeForm.tags.split(',').map((s) => s.trim()).filter(Boolean);
    let mappedCategory = creativeForm.category;
    const catLower = (creativeForm.category || '').toLowerCase();
    if (catLower.includes('graphic') || catLower.includes('poster')) {
      mappedCategory = 'Graphic & Posters';
    } else if (catLower.includes('photo')) {
      mappedCategory = 'Photography';
    } else if (catLower.includes('motion') || catLower.includes('video')) {
      mappedCategory = 'Motion & Video';
    }

    const newObj: CreativeItem = {
      id: creativeForm.id || 'cr-' + Date.now().toString(36),
      title: creativeForm.title,
      category: mappedCategory as any,
      type: creativeForm.type || mappedCategory,
      date: creativeForm.date,
      description: creativeForm.description,
      thumbnailUrl: creativeForm.thumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=80',
      mediaUrl: creativeForm.mediaUrl || creativeForm.thumbnailUrl,
      mediaType: creativeForm.mediaType,
      tags,
      aspectRatio: creativeForm.aspectRatio,
      status: creativeStatus,
    };

    const updated = isEditingCreative
      ? creativeList.map((cr: any) => (cr.id === creativeForm.id ? newObj : cr))
      : [newObj, ...creativeList];
    setCreativeList(updated);
    persistChanges('dktirta_creative', updated);
    triggerNotify(
      t({
        id: `Karya visual "${creativeForm.title}" berhasil disimpan [${creativeStatus}]!`,
        en: `Visual piece "${creativeForm.title}" saved successfully [${creativeStatus}]!`,
      })
    );
    setCreativeModalOpen(false);
  };

  const openNewExperience = () => {
    setIsEditingExperience(false);
    setExperienceStatus('Published');
    setExperienceForm({
      id: '',
      role: '',
      org: 'Universitas Negeri Yogyakarta',
      period: '2025',
      description: '',
      tags: '',
    });
    setExperienceModalOpen(true);
  };

  const openEditExperience = (item: any) => {
    setIsEditingExperience(true);
    setExperienceStatus(item.status || 'Published');
    setExperienceForm({
      id: item.id,
      role: item.role || '',
      org: item.org || '',
      period: item.period || '',
      description: item.description || '',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '',
    });
    setExperienceModalOpen(true);
  };

  const saveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = experienceForm.id || experienceForm.role.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const tags = experienceForm.tags.split(',').map((s) => s.trim()).filter(Boolean);

    const newObj = {
      id: slug,
      role: experienceForm.role,
      org: experienceForm.org,
      period: experienceForm.period,
      description: experienceForm.description,
      tags,
      status: experienceStatus,
    };

    const updated = isEditingExperience
      ? experienceList.map((ex: any) => (ex.id === slug ? newObj : ex))
      : [newObj, ...experienceList];
    setExperienceList(updated);
    persistChanges('dktirta_experience', updated);
    triggerNotify(`Pengalaman "${experienceForm.role}" berhasil disimpan [${experienceStatus}]!`);
    setExperienceModalOpen(false);
  };

  // ══════════════════════════════════════════════════════════
  // AUTH GUARD CHECK
  // ══════════════════════════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <section className="container-shell py-24 md:py-32">
        <div className="mx-auto max-w-md rounded-2xl border border-line bg-card p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-bg">
              <Lock className="h-5 w-5 text-ink" />
            </span>
            <div>
              <h1 className="heading-display text-2xl uppercase tracking-tight text-ink">
                Admin Panel
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-wider text-secondary">
                dktirta.tech Native CMS
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (password === 'tanjungkarang') {
                setIsAuthenticated(true);
                setAuthError(false);
              } else {
                setAuthError(true);
              }
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-secondary">
                Kunci Akses Admin
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="mt-1.5 w-full rounded-xl border border-line bg-bg p-3 text-sm text-ink outline-none focus:border-blue"
              />
            </div>

            {authError && (
              <p className="font-mono text-xs text-red-600">Kata sandi tidak valid. Akses ditolak.</p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-ink py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue hover:text-ink"
            >
              Buka Panel Tata Kelola
            </button>
          </form>

          <div className="mt-6 border-t border-line pt-4 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-secondary hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container-shell py-12 md:py-16">
      {/* ── TOP EDITORIAL HEADER ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-secondary">
            <span className="rounded-md border border-line bg-bg px-2.5 py-1 text-ink font-bold">
              00 / CMS PANEL
            </span>
            <span className="text-blue font-bold">dktirta.tech Direct Control</span>
            <span>•</span>
            <span className="text-ink/60">{currentTimeWIB}</span>
          </div>
          <h1 className="heading-display mt-2 text-3xl uppercase tracking-tight text-ink sm:text-4xl">
            {t({ id: 'Pusat Pengelolaan Konten & Publikasi', en: 'Content & Publishing Management Center' })}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <LangToggle />
          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-xl border border-line bg-card px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-ink hover:border-blue hover:bg-blue-soft transition-colors"
          >
            <Eye className="h-3.5 w-3.5 text-blue" />
            {t({ id: 'Lihat Situs Live', en: 'View Live Site' })}
          </Link>
          <button
            onClick={() => {
              persistChanges('dktirta_projects', projectsList);
              persistChanges('dktirta_work', workList);
              persistChanges('dktirta_experience', experienceList);
              persistChanges('dktirta_content', contentList);
              persistChanges('dktirta_creative', creativeList);
              triggerNotify(t({ id: 'Seluruh perubahan data karya & konten telah tersimpan ke sistem!', en: 'All portfolio & content changes have been saved to the system!' }));
              syncToGitHub();
            }}
            disabled={syncing}
            className="flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-blue hover:text-ink transition-colors shadow-sm disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" />
            {syncing ? 'Syncing...' : t({ id: 'Simpan Perubahan', en: 'Save All Changes' })}
          </button>
        </div>
      </div>

      {/* ── TOAST NOTIFIKASI ── */}
      {notification && (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-blue bg-blue-soft p-4 text-xs font-medium text-ink">
          <CheckCircle2 className="h-4 w-4 text-blue shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* ── SUB-TABS NAVIGATION (SWISS EDITORIAL TABS) ── */}
      <div className="mt-8 flex flex-wrap gap-2 border-b border-line pb-4">
        {[
          { id: 'projects', label: `${t({ id: 'Proyek Artikel', en: 'Project Case Studies' })} (${projectsList.length})`, icon: FolderGit2 },
          { id: 'work', label: `${t({ id: 'Work Engagements', en: 'Work Engagements' })} (${workList.length})`, icon: Briefcase },
          { id: 'experience', label: `${t({ id: 'Pengalaman', en: 'Experience' })} (${experienceList.length})`, icon: Clock },
          { id: 'content', label: `${t({ id: 'Content & Riset', en: 'Content & Research' })} (${contentList.length})`, icon: FileText },
          { id: 'creative', label: `${t({ id: 'Karya Visual', en: 'Visual Works' })} (${creativeList.length})`, icon: ImageIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                active
                  ? 'bg-ink text-white shadow-sm'
                  : 'border border-line bg-card text-secondary hover:border-ink hover:text-ink'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ═════════════════════════════════════════════════════════ */}
      {/* TAB 1: PROJECTS (ARTIKEL 3 SUB-BAB)                       */}
      {/* ═════════════════════════════════════════════════════════ */}
      {activeTab === 'projects' && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-blue font-bold">
                Indeks Proyek Riset
              </span>
              <h2 className="heading-display text-2xl uppercase tracking-tight text-ink">
                Koleksi Studi Kasus Artikel Teknis
              </h2>
            </div>
            <button
              onClick={() => openNewArticle('projects')}
              className="flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-blue hover:text-ink transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Tulis Proyek Baru
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {projectsList.map((p: any) => (
              <div
                key={p.id}
                className="card group flex flex-col justify-between gap-6 p-6 md:flex-row md:items-center hover:border-blue transition-colors"
              >
                <div className="flex gap-5 items-start">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="h-24 w-36 shrink-0 object-cover rounded-xl border border-line"
                  />
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="heading-display text-lg uppercase text-ink">{p.title}</span>
                      <span className="rounded-md border border-line bg-bg px-2 py-0.5 font-mono text-[10px] uppercase text-secondary">
                        {p.category} · {p.year}
                      </span>
                      <span
                        className={`rounded-md px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                          p.status === 'Draft'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {p.status || 'Published'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-secondary">{p.subtitle}</p>
                    <p className="mt-2 text-xs text-ink/75 max-w-3xl leading-relaxed">{p.overview}</p>
                    <div className="mt-3 flex items-center gap-3 font-mono text-[11px] text-blue">
                      <span>Rute: /projects/{p.id}</span>
                      <span>•</span>
                      <span className="text-secondary">{p.sections?.length || 3} Bab Pembahasan</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => openEditArticle(p, 'projects')}
                    className="flex items-center gap-1.5 rounded-xl border border-line bg-bg px-3.5 py-2 font-mono text-xs font-bold uppercase text-ink hover:border-blue hover:bg-blue-soft transition-colors"
                  >
                    <Edit3 className="h-3.5 w-3.5 text-blue" />
                    Edit
                  </button>
                  <Link
                    to={`/projects/${p.id}`}
                    target="_blank"
                    className="rounded-xl border border-line bg-bg p-2 text-secondary hover:border-ink hover:text-ink transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => {
                      const updated = projectsList.filter((x: any) => x.id !== p.id);
                      setProjectsList(updated);
                      persistChanges('dktirta_projects', updated);
                      triggerNotify(`Proyek "${p.title}" telah dihapus.`);
                    }}
                    className="rounded-xl border border-red-200 bg-red-50 p-2 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════ */}
      {/* TAB 2: WORK ENGAGEMENTS                                  */}
      {/* ═════════════════════════════════════════════════════════ */}
      {activeTab === 'work' && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-blue font-bold">
                Indeks Karir & Pengalaman
              </span>
              <h2 className="heading-display text-2xl uppercase tracking-tight text-ink">
                Koleksi Work & Professional Engagements
              </h2>
            </div>
            <button
              onClick={() => openNewArticle('work')}
              className="flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-blue hover:text-ink transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Tulis Work Baru
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {workList.map((w: any) => (
              <div
                key={w.id}
                className="card flex flex-col justify-between gap-6 p-6 md:flex-row md:items-center hover:border-blue transition-colors"
              >
                <div className="flex gap-5 items-start">
                  <img
                    src={w.imageUrl}
                    alt={w.title}
                    className="h-24 w-36 shrink-0 object-cover rounded-xl border border-line"
                  />
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="heading-display text-lg uppercase text-ink">{w.title}</span>
                      <span className="rounded-md border border-line bg-bg px-2 py-0.5 font-mono text-[10px] uppercase text-secondary">
                        {w.client} · {w.period}
                      </span>
                      <span
                        className={`rounded-md px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                          w.status === 'Draft'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {w.status || 'Completed'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-secondary">{w.subtitle}</p>
                    <p className="mt-2 text-xs text-ink/75 max-w-3xl leading-relaxed">{w.overview}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => openEditArticle(w, 'work')}
                    className="flex items-center gap-1.5 rounded-xl border border-line bg-bg px-3.5 py-2 font-mono text-xs font-bold uppercase text-ink hover:border-blue hover:bg-blue-soft transition-colors"
                  >
                    <Edit3 className="h-3.5 w-3.5 text-blue" />
                    Edit
                  </button>
                  <Link
                    to={`/work/${w.id}`}
                    target="_blank"
                    className="rounded-xl border border-line bg-bg p-2 text-secondary hover:border-ink hover:text-ink transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════ */}
      {/* TAB 3: EXPERIENCE                                        */}
      {/* ═════════════════════════════════════════════════════════ */}
      {activeTab === 'experience' && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-blue font-bold">
                03 / Experience & Engagements
              </span>
              <h2 className="heading-display text-2xl uppercase tracking-tight text-ink">
                Pengalaman Kerja, Organisasi, & Keahlian
              </h2>
            </div>
            <button
              onClick={openNewExperience}
              className="flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-blue hover:text-ink transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Tambah Pengalaman
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {experienceList.map((ex: any) => (
              <div
                key={ex.id}
                className="card flex flex-col justify-between gap-6 p-6 md:flex-row md:items-center hover:border-blue transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="heading-display text-lg uppercase text-ink">{ex.role}</span>
                    <span className="rounded-md border border-line bg-bg px-2 py-0.5 font-mono text-[10px] uppercase text-secondary">
                      {ex.org}
                    </span>
                    <span className="font-mono text-[11px] text-secondary">{ex.period}</span>
                    <span
                      className={`rounded-md px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                        ex.status === 'Draft'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {ex.status || 'Published'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink/75 max-w-3xl leading-relaxed">{ex.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {(ex.tags || []).map((tag: string) => (
                      <span key={tag} className="font-mono text-[9px] text-ink/60 bg-ink/5 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => openEditExperience(ex)}
                    className="flex items-center gap-1.5 rounded-xl border border-line bg-bg px-3.5 py-2 font-mono text-xs font-bold uppercase text-ink hover:border-blue hover:bg-blue-soft transition-colors"
                  >
                    <Edit3 className="h-3.5 w-3.5 text-blue" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      const updated = experienceList.filter((x: any) => x.id !== ex.id);
                      setExperienceList(updated);
                      persistChanges('dktirta_experience', updated);
                      triggerNotify(`Pengalaman "${ex.role}" telah dihapus.`);
                    }}
                    className="rounded-xl border border-red-200 bg-red-50 p-2 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════ */}
      {/* TAB 4: CONTENT & RESEARCH (LINK ATAU ARTIKEL)            */}
      {/* ═════════════════════════════════════════════════════════ */}
      {activeTab === 'content' && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-blue font-bold">
                06 / Content & Publications
              </span>
              <h2 className="heading-display text-2xl uppercase tracking-tight text-ink">
                Web3 Research, Articles, & Independent Projects
              </h2>
            </div>
            <button
              onClick={openNewContent}
              className="flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-blue hover:text-ink transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Tambah Konten Baru
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {contentList.map((c: any) => (
              <div
                key={c.id}
                className="card flex flex-col justify-between gap-6 p-6 md:flex-row md:items-center hover:border-blue transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="heading-display text-lg uppercase text-ink">{c.title}</span>
                    <span className="rounded-md border border-line bg-blue-soft px-2.5 py-0.5 font-mono text-[10px] font-bold text-ink uppercase">
                      {c.type}
                    </span>
                    <span className="font-mono text-[11px] text-secondary">{c.date}</span>
                    <span
                      className={`rounded-md px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                        c.status === 'Draft'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {c.status || 'Published'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink/75 max-w-3xl leading-relaxed">{c.description}</p>
                  <div className="mt-3 flex items-center gap-2 font-mono text-xs text-blue">
                    <span className="text-secondary">Tautan Publikasi:</span>
                    <a
                      href={c.link || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      {c.link || 'Internal Route'}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => openEditContent(c)}
                    className="flex items-center gap-1.5 rounded-xl border border-line bg-bg px-3.5 py-2 font-mono text-xs font-bold uppercase text-ink hover:border-blue hover:bg-blue-soft transition-colors"
                  >
                    <Edit3 className="h-3.5 w-3.5 text-blue" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      const updated = contentList.filter((x: any) => x.id !== c.id);
                      setContentList(updated);
                      persistChanges('dktirta_content', updated);
                      triggerNotify(`Konten "${c.title}" telah dihapus.`);
                    }}
                    className="rounded-xl border border-red-200 bg-red-50 p-2 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════ */}
      {/* TAB 4: CREATIVE WORKS                                    */}
      {/* ═════════════════════════════════════════════════════════ */}
      {activeTab === 'creative' && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-blue font-bold">
                07 / Visual Portfolio
              </span>
              <h2 className="heading-display text-2xl uppercase tracking-tight text-ink">
                {t({ id: 'Koleksi Karya Visual & Animasi', en: 'Visual & Motion Design Portfolio' })}
              </h2>
            </div>
            <button
              onClick={openNewCreative}
              className="flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-blue hover:text-ink transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              {t({ id: 'Tambah Karya Visual', en: 'New Creative Piece' })}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {creativeList.map((cr: any) => (
              <div key={cr.id} className="card p-5 flex flex-col justify-between gap-4">
                <div className="flex gap-4 items-start">
                  <img
                    src={cr.thumbnailUrl}
                    alt={cr.title}
                    className="h-28 w-28 shrink-0 object-cover rounded-xl border border-line"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded-md border border-line bg-bg px-2 py-0.5 font-mono text-[9px] uppercase text-secondary">
                        {cr.category === 'graphic'
                          ? 'Graphic & Posters'
                          : cr.category === 'photography'
                          ? 'Photography'
                          : 'Motion & Video'}
                      </span>
                      <span className="font-mono text-[10px] text-secondary">· {cr.date}</span>
                      <span
                        className={`rounded-md px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                          cr.status === 'Draft'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {cr.status || 'Published'}
                      </span>
                    </div>
                    <h3 className="heading-display mt-1.5 text-base uppercase text-ink truncate">{cr.title}</h3>
                    <p className="mt-1 text-xs text-secondary line-clamp-2">{cr.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {(cr.tags || []).slice(0, 3).map((tag: string) => (
                        <span key={tag} className="font-mono text-[9px] text-ink/60 bg-ink/5 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-line pt-3">
                  <button
                    onClick={() => openEditCreative(cr)}
                    className="flex items-center gap-1.5 rounded-xl border border-line bg-bg px-3.5 py-1.5 font-mono text-xs font-bold uppercase text-ink hover:border-blue hover:bg-blue-soft transition-colors"
                  >
                    <Edit3 className="h-3.5 w-3.5 text-blue" />
                    {t({ id: 'Edit', en: 'Edit' })}
                  </button>
                  <Link
                    to="/creative"
                    target="_blank"
                    className="rounded-xl border border-line bg-bg p-2 text-secondary hover:border-ink hover:text-ink transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => {
                      const updated = creativeList.filter((x: any) => x.id !== cr.id);
                      setCreativeList(updated);
                      persistChanges('dktirta_creative', updated);
                      triggerNotify(t({ id: `Karya "${cr.title}" telah dihapus.`, en: `Piece "${cr.title}" has been deleted.` }));
                    }}
                    className="rounded-xl border border-red-200 bg-red-50 p-2 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* MODAL: FULL ARTICLE CMS EDITOR (TEPAT 3 SUB-BAB STANDAR)      */}
      {/* ═════════════════════════════════════════════════════════════ */}
      {articleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-4xl rounded-2xl border border-line bg-card p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-blue" />
                <div>
                  <h3 className="heading-display text-xl uppercase tracking-tight text-ink">
                    {isEditingArticle ? 'Edit Karya Terpublikasi' : 'Tulis Karya Studi Kasus Baru'}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-secondary">
                    Format Standar: Hero Banner, 4 Metrik Highlights, dan 3 Sub-Bab Pembahasan
                  </p>
                </div>
              </div>
              <X
                className="h-5 w-5 cursor-pointer text-secondary hover:text-ink"
                onClick={() => setArticleModalOpen(false)}
              />
            </div>

            <form onSubmit={saveArticle} className="mt-6 space-y-4 text-xs">
              {/* Opsi Status: Published vs Draft */}
              <div className="flex items-center gap-4 bg-bg p-3 rounded-xl border border-line">
                <span className="font-mono uppercase font-bold text-ink">Status Publikasi:</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="artStatus"
                    checked={articleStatus === 'Published'}
                    onChange={() => setArticleStatus('Published')}
                  />
                  <span className="font-bold text-emerald-700">Published (Tampil Live)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="artStatus"
                    checked={articleStatus === 'Draft'}
                    onChange={() => setArticleStatus('Draft')}
                  />
                  <span className="font-bold text-amber-700">Draft (Disimpan Sementara)</span>
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono uppercase text-secondary">Judul Artikel</label>
                  <input
                    type="text"
                    required
                    value={articleForm.title}
                    onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                    placeholder="misal: Flood Event Analysis"
                    className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-secondary">Sub-judul Narasi</label>
                  <input
                    type="text"
                    required
                    value={articleForm.subtitle}
                    onChange={(e) => setArticleForm({ ...articleForm, subtitle: e.target.value })}
                    placeholder="Penjelasan ringkas konteks studi..."
                    className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-secondary">Kategori & Tahun</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={articleForm.category}
                      onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                      className="mt-1 w-2/3 rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                    />
                    <input
                      type="text"
                      required
                      value={articleForm.year}
                      onChange={(e) => setArticleForm({ ...articleForm, year: e.target.value })}
                      className="mt-1 w-1/3 rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono uppercase text-secondary">Cover Banner Image URL</label>
                  <input
                    type="url"
                    value={articleForm.imageUrl}
                    onChange={(e) => setArticleForm({ ...articleForm, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-mono uppercase text-secondary">Tech Stack Tags (Pisahkan dengan koma)</label>
                  <input
                    type="text"
                    value={articleForm.stack}
                    onChange={(e) => setArticleForm({ ...articleForm, stack: e.target.value })}
                    placeholder="Python, Scientific Computing, Atmospheric Science"
                    className="mt-1 w-full font-mono rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                  />
                </div>

                {/* 4 HIGHLIGHTS METRICS BAR */}
                <div className="sm:col-span-2 border-t border-line pt-3">
                  <span className="font-mono text-xs font-bold uppercase text-blue block mb-2">
                    4 Metrik Utama (Highlights Bar)
                  </span>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-xl border border-line bg-bg p-2.5">
                      <input
                        type="text"
                        value={articleForm.hl1Label}
                        onChange={(e) => setArticleForm({ ...articleForm, hl1Label: e.target.value })}
                        className="w-full font-mono text-[10px] uppercase text-secondary bg-transparent outline-none"
                      />
                      <input
                        type="text"
                        value={articleForm.hl1Value}
                        onChange={(e) => setArticleForm({ ...articleForm, hl1Value: e.target.value })}
                        className="mt-1 w-full font-bold text-ink bg-transparent outline-none"
                      />
                    </div>
                    <div className="rounded-xl border border-line bg-bg p-2.5">
                      <input
                        type="text"
                        value={articleForm.hl2Label}
                        onChange={(e) => setArticleForm({ ...articleForm, hl2Label: e.target.value })}
                        className="w-full font-mono text-[10px] uppercase text-secondary bg-transparent outline-none"
                      />
                      <input
                        type="text"
                        value={articleForm.hl2Value}
                        onChange={(e) => setArticleForm({ ...articleForm, hl2Value: e.target.value })}
                        className="mt-1 w-full font-bold text-ink bg-transparent outline-none"
                      />
                    </div>
                    <div className="rounded-xl border border-line bg-bg p-2.5">
                      <input
                        type="text"
                        value={articleForm.hl3Label}
                        onChange={(e) => setArticleForm({ ...articleForm, hl3Label: e.target.value })}
                        className="w-full font-mono text-[10px] uppercase text-secondary bg-transparent outline-none"
                      />
                      <input
                        type="text"
                        value={articleForm.hl3Value}
                        onChange={(e) => setArticleForm({ ...articleForm, hl3Value: e.target.value })}
                        className="mt-1 w-full font-bold text-ink bg-transparent outline-none"
                      />
                    </div>
                    <div className="rounded-xl border border-line bg-bg p-2.5">
                      <input
                        type="text"
                        value={articleForm.hl4Label}
                        onChange={(e) => setArticleForm({ ...articleForm, hl4Label: e.target.value })}
                        className="w-full font-mono text-[10px] uppercase text-secondary bg-transparent outline-none"
                      />
                      <input
                        type="text"
                        value={articleForm.hl4Value}
                        onChange={(e) => setArticleForm({ ...articleForm, hl4Value: e.target.value })}
                        className="mt-1 w-full font-bold text-ink bg-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-mono uppercase text-secondary">Ringkasan Eksekutif (Overview)</label>
                  <textarea
                    rows={2}
                    required
                    value={articleForm.overview}
                    onChange={(e) => setArticleForm({ ...articleForm, overview: e.target.value })}
                    placeholder="Abstrak proyek yang tampil di kartu utama..."
                    className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                  />
                </div>
              </div>

              {/* ── 3 SUB-BAB STANDAR DKIRTA.TECH ── */}
              <div className="border-t border-line pt-4">
                <span className="font-mono text-xs font-bold uppercase text-blue block mb-3">
                  Tepat 3 Sub-Bab Pembahasan Artikel
                </span>

                <div className="space-y-4">
                  {/* Sub-Bab 1 */}
                  <div className="rounded-xl border border-line bg-bg p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue">Sub-Bab 1:</span>
                      <input
                        type="text"
                        required
                        value={articleForm.sub1Title}
                        onChange={(e) => setArticleForm({ ...articleForm, sub1Title: e.target.value })}
                        placeholder="Overview"
                        className="flex-1 rounded-lg border border-line bg-card p-2 text-sm font-bold text-ink outline-none focus:border-blue"
                      />
                    </div>
                    <textarea
                      rows={3}
                      required
                      value={articleForm.sub1Content}
                      onChange={(e) => setArticleForm({ ...articleForm, sub1Content: e.target.value })}
                      placeholder="Isi uraian bab 1 (gunakan 2x enter untuk pemisah paragraf)..."
                      className="mt-2 w-full rounded-lg border border-line bg-card p-2 text-sm text-ink outline-none focus:border-blue leading-relaxed"
                    />
                  </div>

                  {/* Sub-Bab 2 */}
                  <div className="rounded-xl border border-line bg-bg p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue">Sub-Bab 2:</span>
                      <input
                        type="text"
                        required
                        value={articleForm.sub2Title}
                        onChange={(e) => setArticleForm({ ...articleForm, sub2Title: e.target.value })}
                        placeholder="Data & Methods"
                        className="flex-1 rounded-lg border border-line bg-card p-2 text-sm font-bold text-ink outline-none focus:border-blue"
                      />
                    </div>
                    <textarea
                      rows={3}
                      required
                      value={articleForm.sub2Content}
                      onChange={(e) => setArticleForm({ ...articleForm, sub2Content: e.target.value })}
                      placeholder="Isi uraian bab 2..."
                      className="mt-2 w-full rounded-lg border border-line bg-card p-2 text-sm text-ink outline-none focus:border-blue leading-relaxed"
                    />
                  </div>

                  {/* Sub-Bab 3 */}
                  <div className="rounded-xl border border-line bg-bg p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue">Sub-Bab 3:</span>
                      <input
                        type="text"
                        required
                        value={articleForm.sub3Title}
                        onChange={(e) => setArticleForm({ ...articleForm, sub3Title: e.target.value })}
                        placeholder="Key Findings"
                        className="flex-1 rounded-lg border border-line bg-card p-2 text-sm font-bold text-ink outline-none focus:border-blue"
                      />
                    </div>
                    <textarea
                      rows={3}
                      required
                      value={articleForm.sub3Content}
                      onChange={(e) => setArticleForm({ ...articleForm, sub3Content: e.target.value })}
                      placeholder="Isi uraian bab 3..."
                      className="mt-2 w-full rounded-lg border border-line bg-card p-2 text-sm text-ink outline-none focus:border-blue leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => setArticleModalOpen(false)}
                  className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-bold uppercase text-secondary hover:border-ink hover:text-ink"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-ink px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-blue hover:text-ink transition-colors"
                >
                  {isEditingArticle ? 'Simpan Perubahan' : 'Publikasikan Sekarang'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* MODAL: CONTENT EDITOR (MENU FORMAT: LINK VS ARTIKEL)          */}
      {/* ═════════════════════════════════════════════════════════════ */}
      {contentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-2xl rounded-2xl border border-line bg-card p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue" />
                <div>
                  <h3 className="heading-display text-xl uppercase tracking-tight text-ink">
                    {isEditingContent ? 'Edit Konten Publikasi' : 'Tambah Konten Baru'}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-secondary">
                    Pilih Format: Tautan Langsung ke Luar (X/Mirror) atau Artikel Penuh
                  </p>
                </div>
              </div>
              <X
                className="h-5 w-5 cursor-pointer text-secondary hover:text-ink"
                onClick={() => setContentModalOpen(false)}
              />
            </div>

            <form onSubmit={saveContent} className="mt-6 space-y-4 text-xs">
              {/* STATUS & FORMAT SWITCHER */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-bg p-3.5 rounded-xl border border-line">
                <div>
                  <span className="font-mono uppercase font-bold text-ink block mb-1.5">Format Konten:</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="cFormat"
                        checked={contentMode === 'link'}
                        onChange={() => setContentMode('link')}
                      />
                      <span className="font-bold text-ink">Format Tautan Luar</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="cFormat"
                        checked={contentMode === 'article'}
                        onChange={() => setContentMode('article')}
                      />
                      <span className="font-bold text-blue">Format Artikel Web</span>
                    </label>
                  </div>
                </div>

                <div>
                  <span className="font-mono uppercase font-bold text-ink block mb-1.5">Status:</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="cStatus"
                        checked={contentStatus === 'Published'}
                        onChange={() => setContentStatus('Published')}
                      />
                      <span className="font-bold text-emerald-700">Published</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="cStatus"
                        checked={contentStatus === 'Draft'}
                        onChange={() => setContentStatus('Draft')}
                      />
                      <span className="font-bold text-amber-700">Draft</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-secondary">Judul Publikasi</label>
                <input
                  type="text"
                  required
                  value={contentForm.title}
                  onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })}
                  placeholder="misal: Web3 Content Writing — X (@tirtavex)"
                  className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-secondary">Kategori / Tipe</label>
                  <input
                    type="text"
                    required
                    value={contentForm.type}
                    onChange={(e) => setContentForm({ ...contentForm, type: e.target.value })}
                    placeholder="Research / Content / Experiment"
                    className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-secondary">Tahun / Waktu</label>
                  <input
                    type="text"
                    required
                    value={contentForm.date}
                    onChange={(e) => setContentForm({ ...contentForm, date: e.target.value })}
                    placeholder="2024 — Present"
                    className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                  />
                </div>
              </div>

              {/* JIKA FORMAT LINK: Cukup URL Saja */}
              {contentMode === 'link' && (
                <div>
                  <label className="block font-mono uppercase text-blue font-bold">Target Link URL</label>
                  <input
                    type="url"
                    required
                    value={contentForm.link}
                    onChange={(e) => setContentForm({ ...contentForm, link: e.target.value })}
                    placeholder="https://x.com/tirtavex"
                    className="mt-1 w-full font-mono rounded-xl border border-blue bg-bg p-2.5 text-sm text-ink outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block font-mono uppercase text-secondary">Narasi / Deskripsi</label>
                <textarea
                  rows={3}
                  required
                  value={contentForm.description}
                  onChange={(e) => setContentForm({ ...contentForm, description: e.target.value })}
                  placeholder="Ringkasan atau sinopsis kartu..."
                  className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue leading-relaxed"
                />
              </div>

              {/* JIKA FORMAT ARTIKEL: Menyediakan 3 Sub-Bab */}
              {contentMode === 'article' && (
                <div className="border-t border-line pt-3 space-y-3">
                  <span className="font-mono text-xs font-bold uppercase text-blue block">
                    3 Sub-Bab Pembahasan Artikel Web
                  </span>

                  <div>
                    <input
                      type="text"
                      value={contentForm.sub1Title}
                      onChange={(e) => setContentForm({ ...contentForm, sub1Title: e.target.value })}
                      placeholder="Bab 1: Overview"
                      className="w-full rounded-lg border border-line bg-bg p-2 font-bold text-ink"
                    />
                    <textarea
                      rows={2}
                      value={contentForm.sub1Content}
                      onChange={(e) => setContentForm({ ...contentForm, sub1Content: e.target.value })}
                      placeholder="Isi uraian bab 1..."
                      className="mt-1.5 w-full rounded-lg border border-line bg-bg p-2 text-ink"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={contentForm.sub2Title}
                      onChange={(e) => setContentForm({ ...contentForm, sub2Title: e.target.value })}
                      placeholder="Bab 2: Analysis & Discussion"
                      className="w-full rounded-lg border border-line bg-bg p-2 font-bold text-ink"
                    />
                    <textarea
                      rows={2}
                      value={contentForm.sub2Content}
                      onChange={(e) => setContentForm({ ...contentForm, sub2Content: e.target.value })}
                      placeholder="Isi uraian bab 2..."
                      className="mt-1.5 w-full rounded-lg border border-line bg-bg p-2 text-ink"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={contentForm.sub3Title}
                      onChange={(e) => setContentForm({ ...contentForm, sub3Title: e.target.value })}
                      placeholder="Bab 3: Key Insights"
                      className="w-full rounded-lg border border-line bg-bg p-2 font-bold text-ink"
                    />
                    <textarea
                      rows={2}
                      value={contentForm.sub3Content}
                      onChange={(e) => setContentForm({ ...contentForm, sub3Content: e.target.value })}
                      placeholder="Isi uraian bab 3..."
                      className="mt-1.5 w-full rounded-lg border border-line bg-bg p-2 text-ink"
                    />
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => setContentModalOpen(false)}
                  className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-bold uppercase text-secondary hover:border-ink hover:text-ink"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-ink px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-blue hover:text-ink transition-colors"
                >
                  {isEditingContent ? 'Simpan Perubahan' : 'Publikasikan Konten'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* MODAL: EXPERIENCE CMS EDITOR                                */}
      {/* ═════════════════════════════════════════════════════════════ */}
      {experienceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-2xl rounded-2xl border border-line bg-card p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-blue" />
                <div>
                  <h3 className="heading-display text-xl uppercase tracking-tight text-ink">
                    {isEditingExperience ? 'Edit Pengalaman' : 'Tambah Pengalaman Baru'}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-secondary">
                    Pengalaman Kerja, Organisasi, atau Keahlian
                  </p>
                </div>
              </div>
              <X
                className="h-5 w-5 cursor-pointer text-secondary hover:text-ink"
                onClick={() => setExperienceModalOpen(false)}
              />
            </div>

            <form onSubmit={saveExperience} className="mt-6 space-y-4 text-xs">
              {/* STATUS PUBLIKASI */}
              <div className="flex items-center gap-4 bg-bg p-3 rounded-xl border border-line">
                <span className="font-mono uppercase font-bold text-ink">Status Publikasi:</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="expStatus"
                    checked={experienceStatus === 'Published'}
                    onChange={() => setExperienceStatus('Published')}
                  />
                  <span className="font-bold text-emerald-700">Published (Tampil Live)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="expStatus"
                    checked={experienceStatus === 'Draft'}
                    onChange={() => setExperienceStatus('Draft')}
                  />
                  <span className="font-bold text-amber-700">Draft (Disimpan Sementara)</span>
                </label>
              </div>

              <div>
                <label className="block font-mono uppercase text-secondary">Jabatan / Posisi</label>
                <input
                  type="text"
                  required
                  value={experienceForm.role}
                  onChange={(e) => setExperienceForm({ ...experienceForm, role: e.target.value })}
                  placeholder="misal: Physics Computing Teaching Assistant"
                  className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-secondary">Organisasi / Institusi</label>
                  <input
                    type="text"
                    required
                    value={experienceForm.org}
                    onChange={(e) => setExperienceForm({ ...experienceForm, org: e.target.value })}
                    placeholder="Universitas Negeri Yogyakarta"
                    className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-secondary">Periode</label>
                  <input
                    type="text"
                    required
                    value={experienceForm.period}
                    onChange={(e) => setExperienceForm({ ...experienceForm, period: e.target.value })}
                    placeholder="Feb 2025 — Jun 2025"
                    className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-secondary">Deskripsi / Tanggung Jawab</label>
                <textarea
                  rows={3}
                  required
                  value={experienceForm.description}
                  onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                  placeholder="Uraian tanggung jawab dan pencapaian..."
                  className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-secondary">Tags (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={experienceForm.tags}
                  onChange={(e) => setExperienceForm({ ...experienceForm, tags: e.target.value })}
                  placeholder="Python, Data Processing, Teaching"
                  className="mt-1 w-full font-mono rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => setExperienceModalOpen(false)}
                  className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-bold uppercase text-secondary hover:border-ink hover:text-ink"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-ink px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-blue hover:text-ink transition-colors"
                >
                  {isEditingExperience ? 'Simpan Perubahan' : 'Publikasikan Sekarang'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* MODAL: CREATIVE WORKS CMS (GRAPHIC, PHOTOGRAPHY, MOTION)     */}
      {/* ═════════════════════════════════════════════════════════════ */}
      {creativeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-2xl rounded-2xl border border-line bg-card p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <ImageIcon className="h-6 w-6 text-blue" />
                <div>
                  <h3 className="heading-display text-xl uppercase tracking-tight text-ink">
                    {isEditingCreative
                      ? t({ id: 'Edit Karya Visual', en: 'Edit Visual Piece' })
                      : t({ id: 'Tambah Karya Visual Baru', en: 'New Visual Piece' })}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-secondary">
                    {t({
                      id: 'Entri Kategori: Graphic & Posters, Photography, Motion & Video',
                      en: 'Categories: Graphic & Posters, Photography, Motion & Video',
                    })}
                  </p>
                </div>
              </div>
              <X
                className="h-5 w-5 cursor-pointer text-secondary hover:text-ink"
                onClick={() => setCreativeModalOpen(false)}
              />
            </div>

            <form onSubmit={saveCreative} className="mt-6 space-y-4 text-xs">
              {/* STATUS PUBLIKASI: PUBLISHED VS DRAFT */}
              <div className="flex items-center gap-4 bg-bg p-3.5 rounded-xl border border-line">
                <span className="font-mono uppercase font-bold text-ink">
                  {t({ id: 'Status Publikasi:', en: 'Publication Status:' })}
                </span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="crStatus"
                    checked={creativeStatus === 'Published'}
                    onChange={() => setCreativeStatus('Published')}
                  />
                  <span className="font-bold text-emerald-700">
                    Published ({t({ id: 'Tampil Live', en: 'Live' })})
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="crStatus"
                    checked={creativeStatus === 'Draft'}
                    onChange={() => setCreativeStatus('Draft')}
                  />
                  <span className="font-bold text-amber-700">
                    Draft ({t({ id: 'Simpan Sementara', en: 'Draft Only' })})
                  </span>
                </label>
              </div>

              {/* JUDUL */}
              <div>
                <label className="block font-mono uppercase text-secondary">
                  {t({ id: 'Judul Karya', en: 'Piece Title' })}
                </label>
                <input
                  type="text"
                  required
                  value={creativeForm.title}
                  onChange={(e) => setCreativeForm({ ...creativeForm, title: e.target.value })}
                  placeholder={t({ id: 'misal: Disaster Mitigation Campaign Poster', en: 'e.g. Disaster Mitigation Campaign Poster' })}
                  className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                />
              </div>

              {/* KATEGORI UTAMA & TIPE SUB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-secondary">
                    {t({ id: 'Kategori Entri', en: 'Entry Category' })}
                  </label>
                  <select
                    value={creativeForm.category}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCreativeForm({
                        ...creativeForm,
                        category: val as any,
                        type: val,
                      });
                    }}
                    className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue font-mono"
                  >
                    <option value="Graphic & Posters">Graphic & Posters</option>
                    <option value="Photography">Photography</option>
                    <option value="Motion & Video">Motion & Video</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono uppercase text-secondary">
                    {t({ id: 'Tipe / Format Spesifik', en: 'Specific Type / Format' })}
                  </label>
                  <input
                    type="text"
                    required
                    value={creativeForm.type}
                    onChange={(e) => setCreativeForm({ ...creativeForm, type: e.target.value })}
                    placeholder="Poster & Layout / Photography / Reel"
                    className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                  />
                </div>
              </div>

              {/* TAHUN & MEDIA TYPE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-secondary">
                    {t({ id: 'Tahun Pembuatan', en: 'Creation Year' })}
                  </label>
                  <input
                    type="text"
                    required
                    value={creativeForm.date}
                    onChange={(e) => setCreativeForm({ ...creativeForm, date: e.target.value })}
                    placeholder="2025"
                    className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-secondary">
                    {t({ id: 'Format Media', en: 'Media Format' })}
                  </label>
                  <select
                    value={creativeForm.mediaType}
                    onChange={(e) =>
                      setCreativeForm({
                        ...creativeForm,
                        mediaType: e.target.value as 'image' | 'video',
                        aspectRatio: e.target.value === 'video' ? 'video-horizontal' : 'poster',
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue font-mono"
                  >
                    <option value="image">{t({ id: 'Gambar Statis (Image)', en: 'Static Image' })}</option>
                    <option value="video">{t({ id: 'Video / Animasi (Video)', en: 'Video / Animation' })}</option>
                  </select>
                </div>
              </div>

              {/* URL THUMBNAIL & FULL MEDIA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-secondary">
                    {t({ id: 'URL Thumbnail (Sampul)', en: 'Thumbnail URL (Cover)' })}
                  </label>
                  <input
                    type="url"
                    required
                    value={creativeForm.thumbnailUrl}
                    onChange={(e) => setCreativeForm({ ...creativeForm, thumbnailUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-secondary">
                    {t({ id: 'URL Media Lengkap (Opsional)', en: 'Full Media URL (Optional)' })}
                  </label>
                  <input
                    type="url"
                    value={creativeForm.mediaUrl}
                    onChange={(e) => setCreativeForm({ ...creativeForm, mediaUrl: e.target.value })}
                    placeholder="https://... / .mp4 / full res"
                    className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue font-mono text-xs"
                  />
                </div>
              </div>

              {/* ASPECT RATIO & TAGS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-secondary">
                    {t({ id: 'Aspek Rasio Card', en: 'Card Aspect Ratio' })}
                  </label>
                  <select
                    value={creativeForm.aspectRatio}
                    onChange={(e) =>
                      setCreativeForm({
                        ...creativeForm,
                        aspectRatio: e.target.value as any,
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue font-mono"
                  >
                    <option value="poster">Poster (3:4)</option>
                    <option value="photo">Photo (4:3)</option>
                    <option value="video-horizontal">Video Horizontal (16:9)</option>
                    <option value="video-vertical">Video Vertikal / Reel (9:16)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono uppercase text-secondary">
                    {t({ id: 'Tags (Pisahkan Koma)', en: 'Tags (Comma separated)' })}
                  </label>
                  <input
                    type="text"
                    value={creativeForm.tags}
                    onChange={(e) => setCreativeForm({ ...creativeForm, tags: e.target.value })}
                    placeholder="Graphic Design, Poster, Figma"
                    className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue"
                  />
                </div>
              </div>

              {/* DESKRIPSI */}
              <div>
                <label className="block font-mono uppercase text-secondary">
                  {t({ id: 'Deskripsi / Sinopsis Karya', en: 'Piece Description / Synopsis' })}
                </label>
                <textarea
                  rows={3}
                  required
                  value={creativeForm.description}
                  onChange={(e) => setCreativeForm({ ...creativeForm, description: e.target.value })}
                  placeholder={t({
                    id: 'Uraian singkat konsep karya atau proses desain...',
                    en: 'Brief summary of the creative concept or workflow...',
                  })}
                  className="mt-1 w-full rounded-xl border border-line bg-bg p-2.5 text-sm text-ink outline-none focus:border-blue leading-relaxed"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => setCreativeModalOpen(false)}
                  className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-bold uppercase text-secondary hover:border-ink hover:text-ink"
                >
                  {t({ id: 'Batal', en: 'Cancel' })}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-ink px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-blue hover:text-ink transition-colors"
                >
                  {isEditingCreative
                    ? t({ id: 'Simpan Perubahan', en: 'Save Changes' })
                    : t({ id: 'Publikasikan Karya', en: 'Publish Piece' })}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
