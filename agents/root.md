# Playbook — Master Reference

> **Wajib dibaca sebelum menyentuh proyek ini.**
> Panduan ini berlaku untuk semua kontributor (manusia maupun AI).

## Apa Itu Proyek Ini?

**Playbook** adalah aplikasi edukasi interaktif tentang data visualization dan etika presentasi data. Nama produk: **Chartosaur — Present with Data Playbook**.

- **Stack**: React + TypeScript + Vite + Tailwind CSS v3
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## Struktur Dokumen Agents

| File                | Isi                                              |
|---------------------|--------------------------------------------------|
| `root.md`           | ← Kamu di sini. Master reference & aturan utama |
| [`ui.md`](./ui.md)           | Desain sistem, warna, tipografi, komponen        |
| [`architecture.md`](./architecture.md)  | Struktur folder, routing, konvensi kode          |
| [`i18n.md`](./i18n.md)       | Aturan translasi UI, bahasa kode sumber, dan interaksi agent |

## Aturan Utama (Tidak Boleh Dilanggar)

1. **Token dulu, hardcode tidak boleh.** Semua warna harus dari `src/lib/design-tokens.ts` atau CSS var / Tailwind class yang selaras.
2. **Setiap seksi punya warnanya sendiri.** Lihat `SECTION_COLORS` di design-tokens. Jangan campur warna antar seksi.
3. **Brand color = Emerald (`#059669`).** Untuk CTA, active state, progress bar, logo. Bukan blue, bukan green generic.
4. **Huruf = Inter.** Tidak boleh ganti font tanpa persetujuan.
5. **Background halaman = `canvas` (`#F8F7F4`).** Sidebar/card = `surface` (`#FAFAF8`).
6. **Panduan di `agents/ui.md` adalah hukum.** Baca sebelum membuat atau memodifikasi komponen apapun.

## Daftar Seksi Kurikulum

| # | Section ID   | Warna      | Topik                        |
|---|-------------|-----------|------------------------------|
| 01 | perception  | Blue `#2563eb`   | The First 3 Seconds          |
| 02 | mechanics   | Cyan `#0891b2`   | Choosing the Right Chart     |
| 03 | lab         | Emerald `#059669`| The Makeover Lab             |
| 04 | storytelling| Violet `#7c3aed` | Data Storytelling            |
| 05 | simulator   | Amber `#d97706`  | The Decision Room            |
| 06 | design      | Pink `#db2777`   | Color & Design               |
| 07 | cases       | Teal `#0f766e`   | Case Studies                 |
| 08 | ethics      | Red `#dc2626`    | Ethics & Certification       |
