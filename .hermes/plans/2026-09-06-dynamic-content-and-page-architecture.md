# Implementation Plan: Dynamic Architecture for Content & Page Management (decka-portfolio)

> **Goal:** Membangun arsitektur data terpusat (Single Source of Truth) dan sistem konfigurasi page/item yang memungkinkan penambahan/pengeditan item (Experience, Work, Projects, Content, Creative, Credentials, Contact) serta penambahan rute/page baru secara otomatis tersinkronisasi ke Navbar, PageHeader, Router, dan Portfolio Map tanpa hardcoding manual di banyak komponen.

---

## 1. Analisis Permasalahan Saat Ini

1. **Hardcoded Array Destructuring di `Home.tsx`:**
   - Saat ini `Home.tsx` memanggil:
     `const [about, experience, work, projects, content, creative, credentials, contact] = mapCards;`
   - Jika ada penambahan page ke-10 atau pengurangan page, urutan array dan struktur JSX bento grid di `Home.tsx` langsung patah (*broken*).
2. **Duplikasi Data Navigasi & Metadata:**
   - Navigasi didefinisikan terpisah di `nav` (`data.ts`), `navLabel` di `Header.tsx`, `pageMeta` di `data.ts`, `mapCards` di `data.ts`, dan rute statis di `main.tsx`.
   - Menambah 1 page baru menuntut developer mengedit 5 file terpisah secara manual.
3. **Data Koleksi Terisolasi di File Statis:**
   - Item koleksi (`experience`, `work`, `projects`, `contentItems`, `creativeItems`, `credentials`) semuanya berada di satu file raksasa `src/data.ts` (~800 baris). Menambah atau mengedit konten rentan konflik sintaks dan sulit dimaintain.

---

## 2. Solusi Arsitektur

### Solusi A: Arsitektur Single-Registry Halaman (Auto-Sync Pages)
Membuat satu file schema konfigurasi halaman (`src/config/pages.config.ts`) yang mengatur:
- `id`, `slug`, `path`, `num`
- Label bilingual (`en` & `id`)
- Tipe card di Portfolio Map (`A`, `B`, `C`, `D`)
- Properti tampilan di Portfolio Map (`colSpan`, `minHeight`, `image`, `metric`)
- Apakah tampil di Navbar (`showInNav: boolean`)
- Komponen Page yang dirender (lazy load / dynamic route)

**Dampak:** Menambahkan 1 entry di config ini otomatis:
1. Muncul di Header desktop & mobile menu.
2. Muncul di Footer sitemap links.
3. Muncul di Bento Grid `Portfolio Map` di Home dengan ukuran kolom yang adaptif.
4. Terdaftar di Router `main.tsx`.

---

### Solusi B: Modularisasi Content Items (JSON / Data Schema per Kategori)
Memecah isi data konten menjadi file modular atau subfolder:
- `src/data/experience.ts`
- `src/data/work.ts`
- `src/data/projects.ts`
- `src/data/content.ts`
- `src/data/creative.ts`
- `src/data/credentials.ts`

Setiap item memiliki skema TypeScript yang ketat. Mengedit/menambah item hanya menyentuh file kategori terkait tanpa risiko merusak data kategori lain.

---

### Solusi C: Alternatif Headless CMS / Local Content Layer (Opsional Lanjutan)
Jika Tirta ingin mengedit konten **tanpa koding sama sekali** (lewat UI browser atau markdown files):
1. **Decap CMS / Keystatic / Contentlayer (Git-based CMS)**:
   - File tersimpan sebagai Markdown/JSON di GitHub repo.
   - Tersedia dashboard UI di `/admin` untuk tambah project, upload foto, edit teks.
   - Saat klik "Save", CMS otomatis membuat commit ke GitHub dan Vercel langsung mendeploy perubahan.
2. **Supabase / Sanity**:
   - Konten ditarik via fetch API/client query.

---

## 3. Langkah Rinci Implementasi (Bite-Sized Roadmap)

### Fase 1: Unified Page Registry (Navbar & Portfolio Map Sync)
1. **Buat `src/config/pages.config.ts`**:
   - Definisikan `PageRegistryItem`:
     ```ts
     export interface PageConfig {
       id: string;
       num: string;
       path: string;
       label: { id: string; en: string };
       description: { id: string; en: string };
       showInNav: boolean;
       mapConfig?: {
         type: 'A' | 'B' | 'C' | 'D';
         colSpan: { sm: number; md: number; lg: number };
         minHeight?: string;
         image?: string;
         bigMetric?: string;
       };
     }
     ```
2. **Refactor `Header.tsx` & `Footer.tsx`**:
   - Konsumsi langsung daftar dari `pages.config.ts`.
   - Hilangkan kamus lokal `navLabel` yang terpisah.
3. **Refactor `Home.tsx` (Dynamic Bento Portfolio Map)**:
   - Ganti destructuring manual `[about, experience, ...]` dengan iterasi `map()` yang membaca `mapConfig` dari tiap page.
   - Render tipe card secara polimorfik (`CardA`, `CardB`, `CardC`, `CardD`) berdasarkan konfigurasi.

### Fase 2: Modularisasi Data Koleksi
1. Pisahkan array raksasa di `src/data.ts` ke dalam `src/data/collections/`:
   - `experiences.ts`
   - `works.ts`
   - `projects.ts`
   - `content.ts`
   - `creatives.ts`
2. Ekspor barrel melalui `src/data/index.ts` agar *backward-compatible* dengan kode yang sudah ada.

### Fase 3: Dynamic Router Binding
1. Sinkronisasi rute di `src/main.tsx` menggunakan `useRoutes` atau mapping dinamis dari registry halaman, sehingga page baru otomatis memiliki rute aktif.

---

## 4. Rangkuman File yang Terkena Dampak

- `src/config/pages.config.ts` *(Baru - Single Source of Truth Halaman)*
- `src/data/collections/*` *(Modularisasi data konten)*
- `src/pages/Home.tsx` *(Refactor rendering Portfolio Map agar dinamis)*
- `src/components/Header.tsx` *(Konsumsi navigasi dari Page Config)*
- `src/components/Footer.tsx` *(Konsumsi link footer dari Page Config)*
- `src/main.tsx` *(Mapping rute berbasis registry)*

---

## 5. Validasi & Pengujian

1. **Test Add Item:** Tambahkan 1 item di salah satu koleksi (misal project baru) -> pastikan muncul di list halaman terkait.
2. **Test Edit Item:** Ubah title/deskripsi item lama -> pastikan update ter-render.
3. **Test Add Page:** Tambahkan 1 objek page baru di `pages.config.ts` -> verifikasi page otomatis muncul di Navbar, mobile menu, dan Bento card Portfolio Map tanpa mengubah file komponen tampilan.
4. **Build & Type Check:** Jalankan `npm run build` (Vite) untuk memastikan nol error TypeScript.
