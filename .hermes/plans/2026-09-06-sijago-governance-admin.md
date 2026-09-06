# Architecture & Implementation Plan: SIJAGO (Sistem Informasi Jaringan dan Governance Online)

> **Platform:** SIJAGO Dashboard (`sijago.dktirta.tech`)  
> **Target Pertama:** Manajemen Konten & Halaman `dktirta.tech` (`dkfadhila/decka-portfolio`)  
> **Skalabilitas:** Multi-project management hub untuk seluruh ekosistem web `*.dktirta.tech`  
> **Deploy:** GitHub (`dkfadhila/sijago`) + Vercel (`sijago.dktirta.tech`)

---

## 1. Konsep & Arsitektur Sistem

SIJAGO bertindak sebagai **Mission Control & Content Governance Hub** mandiri:
- Menjadi admin web tersendiri di subdomain `sijago.dktirta.tech`.
- Berfungsi mengelola entitas web: edit konten yang sudah live, tambah item baru (Experience, Work, Projects, Creative, Content, Credentials, Contact), dan tambah/atur halaman baru.
- **Direct-to-Public Publishing:** Perubahan di SIJAGO langsung terbit ke web publik (`dktirta.tech`).
- **Extensible Multi-Project Architecture:** Arsitektur modular sehingga ke depannya bisa ditambahkan tabs/modul untuk web lain di bawah domain `dktirta.tech`.

---

## 2. Pilihan Model Integrasi Publish (SIJAGO -> dktirta.tech)

Terdapat 2 arsitektur utama untuk mempublikasikan data dari SIJAGO ke `dktirta.tech`:

### Opsi A: Git-Based Direct Commit (Headless GitHub Engine) — *Direkomendasikan (Zero Database Cost)*
- **Cara Kerja:**
  1. SIJAGO memiliki form editor visual.
  2. Saat Tirta klik tombol **"Publish to dktirta.tech"**, backend SIJAGO (atau Serverless API Route) membuat commit langsung ke repo GitHub `dkfadhila/decka-portfolio` menggunakan GitHub Contents API (atau pull request / direct commit ke `master`).
  3. Webhook Vercel otomatis mentrigger build di `dktirta.tech`.
  4. Dalam ~30-60 detik, perubahan langsung live di domain utama.
- **Kelebihan:**
  - `dktirta.tech` tetap berjalan sebagai static/SPA super cepat di edge Vercel tanpa biaya database query atau runtime latency.
  - Seluruh riwayat perubahan tercatat di Git history (mudah rollback jika ada kesalahan data).

### Opsi B: Headless Database / Remote Store (Supabase / KV Engine)
- **Cara Kerja:**
  1. Data konten `dktirta.tech` dimigrasikan ke PostgreSQL Supabase atau Redis/Edge Config.
  2. SIJAGO melakukan CRUD ke database tersebut secara instan.
  3. `dktirta.tech` melakukan fetch data via client query atau ISR (Incremental Static Regeneration).
- **Kelebihan:**
  - Instan tanpa menunggu Vercel build time.
- **Catatan:**
  - Butuh migrasi fetching data di sisi frontend `decka-portfolio`.

*Rekomendasi implementasi tahap 1:* **Opsi A (Git API Engine)**, dikombinasikan dengan preview mode, karena `dktirta.tech` sudah stabil dengan sistem build Vite + GitHub Vercel auto-deploy.

---

## 3. Struktur Modul SIJAGO

```
sijago/
├── app/ (atau src/)
│   ├── (auth)/
│   │   └── login/             # Proteksi akses admin Tirta
│   ├── (dashboard)/
│   │   ├── layout.tsx         # Sidebar governance & multi-project selector
│   │   ├── overview/          # Health status & active projects
│   │   └── projects/
│   │       ├── decka-portfolio/   # [TARGET SAAT INI]
│   │       │   ├── pages/         # Atur rute, urutan navbar, status aktif
│   │       │   ├── experience/    # CRUD entri pengalaman kerja/organisasi
│   │       │   ├── work/          # CRUD & edit studi kasus
│   │       │   ├── projects/      # CRUD technical projects
│   │       │   ├── content/       # CRUD riset Web3 & artikel
│   │       │   ├── creative/      # Upload & manage foto/poster/video
│   │       │   ├── credentials/   # Sertifikat & akademis
│   │       │   └── contact/       # Info kontak & bio
│   │       └── [future-projects]/ # Slot ekspansi project lain
│   └── api/
│       ├── publish/           # Engine penghubung ke GitHub API
│       └── media/             # Upload handling (media storage / GitHub raw / Cloudinary)
```

---

## 4. Rencana Kerja Bertahap (Implementation Roadmap)

### Fase 1: Standarisasi Data Schema di `decka-portfolio`
Sebelum SIJAGO bisa menulis data dengan rapi:
1. Ekstraksi data dari file monolitik `src/data.ts` ke format JSON terstruktur per kategori di `decka-portfolio` (`public/data/` atau `src/data/schemas/`).
2. Sempurnakan `PageRegistry` di `decka-portfolio` agar saat SIJAGO menambahkan file page baru atau menambah list halaman, Navbar dan Bento Map di Home otomatis menyesuaikan diri.

### Fase 2: Inisialisasi Proyek SIJAGO
1. Setup repository baru: `dkfadhila/sijago` di `G:/FamilyAgent/Flora/workspace/sijago`.
2. Stack: **Next.js 15 (App Router) + Tailwind CSS + Lucide Icons + TypeScript**.
3. Setup desain bernuansa **Governance & Operations Dashboard** (dark-mode tech clean, status monitoring, responsive).
4. Konfigurasi autentikasi sederhana & aman (PIN / Password / Session Token) agar hanya Tirta yang dapat mengakses.

### Fase 3: Integrasi GitHub API Engine
1. Pembuatan service `lib/github.ts` di SIJAGO:
   - Read: Mengambil data live langsung dari repository `dkfadhila/decka-portfolio`.
   - Write: Commit pembaruan file JSON atau schema dengan commit message terformat (misal: `[SIJAGO] Update experience: BPBD DIY`).
   - Trigger: Otomatis mendeteksi status build Vercel dari target web.

### Fase 4: Form Editor per Kategori
1. **Experience Manager**: Edit role, instansi, tanggal, bullet points, status aktif.
2. **Work Case Study Editor**: Form kaya teks untuk narasi studi kasus (Scope, Methodology, Impact, Metrics).
3. **Projects & Creative Manager**: Manajemen kartu karya, tag teknologi, link, dan URL media.
4. **Pages & Navbar Manager**: Switch toggle on/off untuk rute, reordering urutan nomor `01, 02, ...`, dan konfigurasi tampilan kartu Portfolio Map.

### Fase 5: Deployment & Domain Wiring
1. Hubungkan repo `dkfadhila/sijago` ke Vercel.
2. Setup custom domain `sijago.dktirta.tech` via DNS record di Vercel / domain provider Tirta.
3. Uji coba end-to-end: Edit 1 data di SIJAGO -> Publish -> Cek hasil live di `dktirta.tech`.

---

## 5. Keamanan & Governance
- **Zero Public Access to SIJAGO**: Dilindungi autentikasi ketat via environment variable `ADMIN_SECRET` / JWT session.
- **GitHub Token Scope**: GitHub Personal Access Token (PAT) disimpan di Vercel Environment Variables SIJAGO, tidak pernah terekspos ke browser / client-side.
- **Backup & Rollback**: Setiap kali publish via Git commit, history selalu tersimpan di GitHub sehingga aman dari risiko kehilangan data.
