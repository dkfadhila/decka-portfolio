import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  projects as staticProjects,
  projectDetails as staticProjectDetails,
  work as staticWork,
  workDetails as staticWorkDetails,
  experience as staticExperience,
  experienceDetails as staticExperienceDetails,
  content as staticContent,
  creativeItems as staticCreatives,
} from './data';

/* ============================================================
   contentStore — live content layer for dktirta.tech

   /admin saves → /api/content commits public/content.json to
   GitHub → Vercel auto-deploys → visitors get the fresh JSON.

   The store fetches /content.json at load. Until it arrives
   (or if it never exists) every page renders the static data
   from data.ts, so the site is never empty.
   ============================================================ */

export interface LiveContent {
  projects: any[];          // detail-shaped (id, title, subtitle, overview, sections, ...)
  work: any[];              // detail-shaped
  experience: any[];        // detail-shaped (id, role, org, period, description, tags)
  content: any[];
  creative: any[];
  projectDetails: Record<string, any>;
  workDetails: Record<string, any>;
  experienceDetails: Record<string, any>;
  updatedAt?: string;
}

const EMPTY: LiveContent = {
  projects: [],
  work: [],
  experience: [],
  content: [],
  creative: [],
  projectDetails: {},
  workDetails: {},
  experienceDetails: {},
};

interface ContentValue {
  ready: boolean;
  live: LiveContent;
  /** Listing for /projects (falls back to static, hides Draft) */
  projects: any[];
  /** Listing for /work (falls back to static, hides Draft) */
  work: any[];
  /** Listing for /experience (falls back to static, hides Draft) */
  experience: any[];
  /** Listing for /content */
  content: any[];
  /** Listing for /creative (Draft hidden) */
  creative: any[];
  /** Detail lookup /projects/:slug */
  projectDetail: (slug: string) => any | undefined;
  /** Detail lookup /work/:slug */
  workDetail: (slug: string) => any | undefined;
  /** Detail lookup experience by id */
  experienceDetail: (slug: string) => any | undefined;
}

const ContentContext = createContext<ContentValue>({
  ready: true,
  live: EMPTY,
  projects: staticProjects as any,
  work: staticWork as any,
  experience: staticExperience as any,
  content: staticContent,
  creative: staticCreatives,
  projectDetail: (slug) => staticProjectDetails[slug],
  workDetail: (slug) => staticWorkDetails[slug],
  experienceDetail: (slug) => staticExperienceDetails[slug],
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [live, setLive] = useState<LiveContent>(EMPTY);

  useEffect(() => {
    let cancelled = false;
    fetch('/content.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: LiveContent) => {
        if (cancelled) return;
        if (data && Array.isArray(data.projects)) setLive(data);
        setReady(true);
      })
      .catch(() => { if (!cancelled) setReady(true); });
    return () => { cancelled = true; };
  }, []);

  const hasLive = live.projects.length > 0;

  // ── Listings: admin stores detail-shaped objects; derive the
  //    card-shaped listing from them and hide drafts.
  const liveProjects = live.projects
    .filter((p) => p.status !== 'Draft')
    .map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category || '',
      description: p.description || p.overview || '',
      imageUrl: p.imageUrl || '',
      detailPath: `/projects/${p.id}`,
      tags: p.tags || p.stack || [],
      year: p.year || '',
      stack: Array.isArray(p.stack) ? p.stack.join(' / ') : p.stack || '',
      status: p.status || 'Completed',
    }));

  const liveWork = live.work
    .filter((w) => w.status !== 'Draft')
    .map((w) => ({
      id: w.id,
      title: w.title,
      client: w.client || '',
      description: w.description || w.overview || '',
      imageUrl: w.imageUrl || '',
      detailPath: `/work/${w.id}`,
      tags: w.tags || [],
      period: w.period || '',
      stack: Array.isArray(w.stack) ? w.stack.join(' / ') : w.stack || '',
      status: w.status || 'Completed',
    }));

  const liveExperience = (live.experience || [])
    .filter((e: any) => e.status !== 'Draft')
    .map((e) => ({
      id: e.id,
      role: e.role,
      org: e.org || '',
      period: e.period || '',
      description: e.description || '',
      tags: e.tags || [],
    }));

  const value: ContentValue = {
    ready,
    live,
    projects: hasLive ? liveProjects : (staticProjects as any),
    work: hasLive ? liveWork : (staticWork as any),
    experience: liveExperience.length > 0 ? liveExperience : (staticExperience as any),
    content: (live.content || []).length > 0 ? live.content : staticContent,
    creative: (live.creative || []).filter((c: any) => c.status !== 'Draft'),
    projectDetail: (slug) => (hasLive ? live.projects.find((p: any) => p.id === slug) : staticProjectDetails[slug]),
    workDetail: (slug) => (hasLive ? live.work.find((w: any) => w.id === slug) : staticWorkDetails[slug]),
    experienceDetail: (slug) => (hasLive ? (live.experience || []).find((e: any) => e.id === slug) : staticExperienceDetails[slug]),
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}
