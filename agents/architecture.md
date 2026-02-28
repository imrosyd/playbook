# Playbook — Architecture Guide

## Struktur Folder

```
playbook/
├── agents/               # Panduan untuk developer / AI (kamu di sini)
├── src/
│   ├── components/
│   │   ├── charts/       # Komponen chart reusable (tidak terikat seksi)
│   │   ├── lab/          # Chart manipulation lab
│   │   ├── layout/       # Shell: Landing, Sidebar, LessonPage, Navigation
│   │   ├── lessons/
│   │   │   ├── section01/  # Lesson components untuk seksi 01
│   │   │   ├── section02/  # Lesson components untuk seksi 02
│   │   │   └── ...         # dst. sampai section08/
│   │   ├── sections/     # Section overview pages
│   │   ├── toolkit/      # Reusable toolkit components
│   │   └── ui/           # Shared UI primitives
│   ├── contexts/         # React contexts (PlaybookContext, LanguageContext)
│   ├── data/
│   │   └── curriculum.ts # SATU-SATUNYA sumber data kurikulum
│   ├── lib/
│   │   ├── design-tokens.ts  # SATU-SATUNYA sumber kebenaran desain
│   │   └── i18n.ts           # Terjemahan string
│   └── types/            # TypeScript types global
```

## Routing Pattern

```
/                          → Landing.tsx
/playbook                  → PlaybookIntro.tsx (daftar seksi)
/playbook/:sectionId/:lessonSlug  → LessonRouter.tsx → LessonPage.tsx
/playbook/lab/full-lab     → Full Lab (rute khusus)
```

- `sectionId` harus sesuai dengan `Section.id` di `curriculum.ts`
- `lessonSlug` harus sesuai dengan `Lesson.slug` di `curriculum.ts`

## Naming Convention

| Tipe              | Konvensi            | Contoh                     |
|-------------------|---------------------|----------------------------|
| Component file    | PascalCase + Suffix | `AnchoringLesson.tsx`      |
| Utility/helper    | camelCase           | `design-tokens.ts`, `i18n.ts` |
| CSS class (custom)| kebab-case          | `.line-clamp-1`            |
| Route param       | kebab-case          | `cognitive-load`, `axis-scale` |
| Section ID        | kebab-case          | `perception`, `mechanics`  |
| Lesson slug       | kebab-case          | `preattentive`, `so-what`  |

## Menambah Lesson Baru

1. Buat file di `src/components/lessons/sectionXX/NamaLesson.tsx`
2. Tambahkan entry ke `SECTIONS` di `src/data/curriculum.ts`
3. Register di `src/components/layout/LessonRouter.tsx`
4. Gunakan `<LessonPage>` sebagai wrapper — **jangan buat layout sendiri**
5. Gunakan warna dari `SECTION_COLORS[section.number]` via `design-tokens.ts`

## Menambah Seksi Baru

1. Tambahkan ke `SECTIONS` array di `curriculum.ts` dengan:
   - `number`: string 2 digit (`'09'`, `'10'`, dll.)
   - `color`: pilih **warna baru yang belum dipakai** — konsultasikan ke `agents/ui.md`
2. Tambahkan warna baru ke `SECTION_COLORS` di `design-tokens.ts`
3. Tambahkan CSS var `--sXX` di `index.css`
4. Tambahkan ke `tailwind.config.js` di `section['XX']`
5. Buat folder `src/components/lessons/sectionXX/`

## Konteks React

| Context            | Purpose                                  |
|--------------------|------------------------------------------|
| `PlaybookContext`  | Progress tracking (completedLessons, markComplete) |
| `LanguageContext`  | i18n lang + dir (ltr/rtl)               |
