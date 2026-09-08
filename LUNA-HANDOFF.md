# 📋 Portfolio Handoff Document — For Luna

**From:** Flora (Web Development Specialist)
**To:** Luna
**Subject:** Tirta's Personal Portfolio — dktirta.tech
**Date:** 2026-09-07
**Project Path:** `D:/FamilyAgent/Flora/workspace/decka-portfolio`

---

## 1. Project Overview

This is **Tirta's personal portfolio website** — a single-page application (SPA) showcasing his professional profile, experience, work, projects, creative works, and credentials. The site is live at **dktirta.tech**.

**Tech Stack:**
- **Framework:** React 19 + React Router v7 (SPA, client-side routing)
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **Animation:** Motion (Framer Motion successor) — `motion` package
- **Icons:** Lucide React
- **Analytics:** Vercel Analytics
- **i18n:** Custom lightweight EN/ID toggle (no external i18n lib)

**NOT using:** Next.js, SSR, server components. Pure Vite + React SPA.

---

## 2. Design System & Aesthetic

### Visual Identity
- **Style:** Swiss editorial + soft neo-brutalism. Clean, structured, editorial poster feel.
- **Color Palette:**
  - Background: `#f7f7f4` (warm off-white)
  - Ink/Text: `#111111`
  - Blue accent: `#62b5f5` (primary accent)
  - Blue bright: `#8dceff`
  - Blue soft: `#dceeff`
  - Line/border: `#d2d3d0`
  - Card: `#ffffff`
  - Secondary text: `#6f7378`
- **Typography:**
  - Display: `Bricolage Grotesque` (headings, hero text)
  - Body: `Inter`
  - Mono: `JetBrains Mono` (technical annotations, meta labels)
  - Serif: `Playfair Display` (used selectively)
- **Border Radius:** 18–24px on cards/panels
- **Selection color:** Blue accent

### Critical Design Rules (from Tirta)
1. **NO AI-generated SVGs** — decorative elements must be built with DOM/CSS (crosshairs, plus marks, grid patterns, dividers). SVGs read as "vibecoding."
2. **Grayscale only on Home page** — subpages get full color.
3. **Work/Project items follow case-study format** — full date ranges (e.g. "Jan — Des"), stack listed, status shown.
4. **AI-related skills framed as:** "AI-Leveraged Operations" and "Agentic & Automated Workflows" — NOT "AI-assisted."
5. **Initials avatars preferred** over decorative illustrations.
6. **DOM/CSS mockups over AI-generated visuals** — always.

---

## 3. File Structure

```
decka-portfolio/
├── src/
│   ├── main.tsx              # Entry point — BrowserRouter + routes
│   ├── index.css             # Tailwind v4 + theme tokens + global styles
│   ├── types.ts              # All TypeScript interfaces
│   ├── data.ts               # ALL content data (profile, experience, work, projects, etc.)
│   ├── i18n.tsx              # EN/ID language system + LanguageProvider
│   ├── pages/
│   │   ├── Home.tsx          # Hero section + map cards grid
│   │   ├── About.tsx         # Principles, capabilities, method cards
│   │   ├── Experience.tsx    # Professional + organizational experience timeline
│   │   ├── Work.tsx          # Professional engagements grid
│   │   ├── WorkDetail.tsx    # Individual work case study pages
│   │   ├── Projects.tsx      # Personal projects grid
│   │   ├── ProjectDetail.tsx # Individual project detail pages
│   │   ├── Content.tsx       # Web3 content, articles, research
│   │   ├── Creative.tsx      # Visual/motion works gallery
│   │   ├── Credentials.tsx   # Certificates, awards, academic record
│   │   ├── Contact.tsx       # Contact form / info
│   │   ├── Admin.tsx         # Admin panel (keep minimal)
│   │   └── NotFound.tsx      # 404 page
│   └── components/
│       ├── Layout.tsx        # Shared layout wrapper (header + footer + outlet)
│       ├── Header.tsx        # Navigation bar
│       ├── Footer.tsx        # Site footer
│       ├── Reveal.tsx        # Scroll-triggered reveal animation wrapper
│       ├── PageHeader.tsx    # Editorial page header (num + kicker + title + lead)
│       └── cards.tsx         # Reusable card components (CardA/B/C/D, Crosshair, PlusMark, CoordMark)
├── public/                   # Static assets (profile image: tirta-profile.jpg)
├── dist/                     # Built output (deployed to Vercel)
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 4. Data Architecture

**All content lives in `src/data.ts`** — this is the single source of truth. The file is ~800 lines and contains:

| Export | Type | Description |
|--------|------|-------------|
| `profile` | `Profile` | Name, subtitle, intro paragraphs, facts, focus pills, capabilities |
| `heroMeta` | object | Year, role, location, availability, coords, email |
| `nav` | `NavItem[]` | 9 navigation items with path + number |
| `pageMeta` | `Record<string, PageMeta>` | Page headers for all 9 sections |
| `stats` | `Stat[]` | Hero stats (30K+ data points, 8+ roles, etc.) |
| `experience` | `ExperienceItem[]` | 8 professional/org/Web3 experiences |
| `work` | `WorkItem[]` | 3 professional engagements |
| `workDetails` | `Record<string, WorkDetail>` | Full case study data for each work item |
| `projects` | `Project[]` | 4 personal projects |
| `projectDetails` | `Record<string, ProjectDetail>` | Full detail data for each project |
| `content` | `ContentItem[]` | Web3 articles/research items |
| `creative` | `CreativeItem[]` | Visual/motion works |
| `credentials` | objects | Academic records, certificates |
| `socials` | `Social[]` | Social links (X, GitHub, email) |
| `mapCards` | `MapCard[]` | Home page card grid configuration |

**To update content:** Edit `src/data.ts`. All pages pull from this single file.

---

## 5. Routing

| Path | Page | Notes |
|------|------|-------|
| `/` | Home | Hero + map cards |
| `/about` | About | Principles + capabilities |
| `/experience` | Experience | Timeline view |
| `/work` | Work | Grid of engagements |
| `/work/:slug` | WorkDetail | Case study pages (slug = work ID) |
| `/projects` | Projects | Grid of projects |
| `/projects/:slug` | ProjectDetail | Detail pages (slug = project ID) |
| `/content` | Content | Articles + research |
| `/creative` | Creative | Gallery |
| `/credentials` | Credentials | Certs + awards |
| `/contact` | Contact | Contact info |
| `/admin` | Admin | Minimal admin panel |

---

## 6. Key Patterns to Follow

### Animation
- `Reveal` component wraps sections for scroll-triggered fade-in
- Motion (Framer Motion) used for page transitions and micro-interactions
- Keep animations subtle — editorial feel, not flashy

### i18n
- Toggle between EN (default) and ID
- All text in `data.ts` uses `LStr` type: `{ id: string; en: string }`
- Language persisted in localStorage (`tirta-lang`)
- Pages use `useI18n()` hook: `const { t, lang } = useI18n()`

### Components
- `PageHeader` — standard editorial header (num + kicker + title + lead)
- `Reveal` — scroll animation wrapper
- Card variants (`CardA/B/C/D`) for different card layouts on Home
- `Crosshair`, `PlusMark`, `CoordMark` — DOM/CSS decorative elements (NOT SVGs)

---

## 7. Deployment

- **Platform:** Vercel (likely via GitHub integration or CLI)
- **Build command:** `npm run build` (outputs to `dist/`)
- **Dev server:** `npm run dev` (port 7777, host 0.0.0.0)
- **Analytics:** `@vercel/analytics` already integrated

---

## 8. Things to Be Careful About

1. **Don't replace DOM/CSS decorations with AI SVGs.** This is Tirta's #1 pet peeve. Crosshairs, plus marks, grid dots — all CSS/DOM.
2. **Don't change the color palette without asking.** The Swiss editorial palette is intentional.
3. **Don't frame AI work as "AI-assisted."** Use "AI-Leveraged Operations" or "Agentic & Automated Workflows."
4. **Don't add unnecessary dependencies.** Keep the bundle lean.
5. **Don't break the i18n system.** All user-facing text should go through `t()` or be in `data.ts`.
6. **Work/Project detail pages must include:** full date range, stack list, status — case-study format, not just a description.
7. **Home page is grayscale.** Subpages get color. Don't mix this up.
8. **`src/data.ts` is the single source of truth** for all content. Don't hardcode text in components.
9. **Admin page exists but is minimal** — don't over-engineer it unless Tirta asks.

---

## 9. Contact / Questions

If something is unclear, reach out to **Flora** or check with **Tirta** directly. Don't guess on design decisions — the aesthetic is specific and intentional.

**Good luck, Luna.** 🌙

---

*Document generated by Flora ⚡ — 2026-09-07*
