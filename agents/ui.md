# Playbook — UI Design System Guide

> **Panduan ini adalah hukum.** Baca dan ikuti sebelum membuat atau memodifikasi komponen apapun. Tujuannya: setiap halaman, lesson, dan komponen terasa seperti satu produk yang konsisten — mulai visual pertama sampai sertifikasi akhir.

---

## 1. Brand Identity

| Atribut        | Nilai                                |
|----------------|--------------------------------------|
| Nama Produk    | **Chartosaur**                       |
| Tagline        | Present with Data Playbook           |
| Filosofi Visual| Bersih, intelektual, bisa dipercaya  |
| Tone           | Akademik tapi tidak kaku, modern tapi tidak noisy |
| Logo Icon      | `<BarChart3>` di atas background Emerald rounded |

**Prinsip Desain Utama:**
- **Whitespace adalah fitur.** Jangan penuhi layar. Biarkan konten bernafas.
- **Tipografi > dekorasi.** Hirarki yang kuat lebih efektif dari ornamen visual.
- **Warna bermakna.** Setiap warna punya maksud spesifik — jangan pakai warna hanya karena terlihat bagus.
- **Konsistensi > kreativitas.** Ikuti pola yang sudah ada; inovasi visual hanya di tempat yang tepat.

---

## 2. Color System

### 2.1 Brand Color (Emerald)

Brand color adalah **Emerald** — satu-satunya aksen "interaktif" di level aplikasi.

| Token                    | HEX       | CSS Var            | Tailwind Class     | Digunakan Untuk                        |
|--------------------------|-----------|--------------------|--------------------|----------------------------------------|
| `BRAND.primary`          | `#059669` | `var(--brand)`     | `bg-brand`         | CTA button, active nav item, logo bg   |
| `BRAND.primaryHover`     | `#047857` | `var(--brand-hover)`| `bg-brand-hover`  | Hover state pada brand elements        |
| `BRAND.primaryLight`     | `#d1fae5` | `var(--brand-light)`| `bg-brand-light`  | "Completed" badge background           |
| `BRAND.primaryMuted`     | `#ecfdf5` | `var(--brand-muted)`| `bg-brand-muted`  | Subtle tint untuk block completed      |
| `BRAND.primaryForeground`| `#ffffff` | —                  | `text-white`       | Teks di atas brand button              |

**Aturan brand color:**
- ✅ Sidebar active lesson link → `bg-brand text-white`
- ✅ "Mark Complete" button → `bg-brand text-white hover:bg-brand-hover`
- ✅ Progress bar → `bg-brand`
- ✅ Logo icon box → `bg-brand`
- ✅ Cross-reference link hover → `text-brand`
- ❌ Jangan pakai untuk heading teks biasa
- ❌ Jangan pakai sebagai warna aksen seksi (kecuali seksi 03 — Emerald)

### 2.2 Neutral Palette (Stone)

Seluruh tipografi, border, dan background netral menggunakan **Stone** (bukan Gray/Slate).

| Token            | HEX       | CSS Var          | Tailwind          | Digunakan Untuk                     |
|------------------|-----------|------------------|-------------------|-------------------------------------|
| `BRAND.canvas`   | `#F8F7F4` | `var(--canvas)`  | `bg-canvas`       | Background halaman (body)           |
| `BRAND.surface`  | `#FAFAF8` | `var(--surface)` | `bg-surface`      | Sidebar, kartu, panel               |
| `BRAND.border`   | `#e7e5e4` | `var(--border)`  | `border-stone-200`| Border standar                      |
| —                | `#1c1917` | —                | `text-stone-900`  | Teks utama / heading                |
| —                | `#57534e` | —                | `text-stone-600`  | Teks body / deskripsi               |
| —                | `#78716c` | —                | `text-stone-500`  | Teks sekunder / meta                |
| —                | `#a8a29e` | —                | `text-stone-400`  | Placeholder, disabled, ikon dekoratif|

### 2.3 Section Accent Colors

Setiap seksi punya warna identitasnya sendiri. Warna ini dipakai untuk:
- Ikon seksi di sidebar dan landing
- Nomor seksi (kecil, faded) di header lesson
- Badge nomor seksi
- Garis aksen / border kiri pada elemen dalam lesson

| Seksi | Nama                     | Base Color | HEX       | Tailwind          | CSS Var   |
|-------|--------------------------|------------|-----------|-------------------|-----------|
| `01`  | The First 3 Seconds      | Blue       | `#2563eb` | `text-section-01` | `var(--s01)` |
| `02`  | Choosing the Right Chart | Cyan       | `#0891b2` | `text-section-02` | `var(--s02)` |
| `03`  | The Makeover Lab         | Emerald    | `#059669` | `text-section-03` | `var(--s03)` |
| `04`  | Data Storytelling        | Violet     | `#7c3aed` | `text-section-04` | `var(--s04)` |
| `05`  | The Decision Room        | Amber      | `#d97706` | `text-section-05` | `var(--s05)` |
| `06`  | Color & Design           | Pink       | `#db2777` | `text-section-06` | `var(--s06)` |
| `07`  | Case Studies             | Teal       | `#0f766e` | `text-section-07` | `var(--s07)` |
| `08`  | Ethics & Certification   | Red        | `#dc2626` | `text-section-08` | `var(--s08)` |

**Aturan section color:**
- ✅ Pakai `section.color` dari `curriculum.ts` (yang sudah selaras dengan token) via `style={{ color: section.color }}`
- ✅ Untuk background ringan: `style={{ backgroundColor: `${section.color}15` }}` (opacity ~8%)
- ✅ Untuk background medium: `style={{ backgroundColor: `${section.color}22` }}` (opacity ~13%)
- ❌ Jangan campur warna antar seksi dalam satu lesson
- ❌ Jangan pakai warna seksi untuk elemen UI global (nav, footer, dll.)

### 2.4 Semantic State Colors

| State     | Warna           | Tailwind           | Digunakan         |
|-----------|-----------------|--------------------|--------------------|
| Success   | Emerald (brand) | `text-emerald-600` | Completed, passed  |
| Warning   | Amber           | `text-amber-600`   | Medium risk, caution|
| Danger    | Red             | `text-red-600`     | High risk, error   |
| Info      | Blue            | `text-blue-600`    | Theory block, tip  |

---

## 3. Typography

**Font tunggal: Inter.** Tidak ada font lain.

### Scale

| Token       | Size       | Weight | Class Tailwind                        | Digunakan Untuk                |
|-------------|------------|--------|---------------------------------------|--------------------------------|
| Display     | 3rem–3.75rem | 900  | `text-5xl font-black`                 | Hero heading di Landing        |
| H1          | 1.5rem     | 700    | `text-2xl font-bold`                  | Judul lesson                   |
| H2          | 1.25rem    | 700    | `text-xl font-bold`                   | Sub-judul major dalam lesson   |
| H3          | 1rem       | 600    | `text-base font-semibold`             | Label group dalam lesson       |
| Body        | 0.9375rem  | 400    | `text-[15px]`                         | Paragraf utama                 |
| Small       | 0.8125rem  | 400/500 | `text-[13px]`                        | Teks sekunder                  |
| Caption     | 0.6875rem  | 500    | `text-[11px]`                         | Meta, ikon label               |
| Overline    | 0.625rem   | 700    | `text-[10px] uppercase tracking-wider`| Label header seksi di lesson   |

**Aturan tipografi:**
- ✅ Heading lesson selalu `text-stone-900 font-bold`
- ✅ Deskripsi lesson selalu `text-stone-500 text-[15px]`
- ✅ Overline selalu semua huruf kapital + tracking-wider + font-bold
- ✅ Tabular numbers pakai class `tabular-nums`
- ❌ Jangan pakai `font-black` (900) kecuali Display dan nomor besar dekoratif
- ❌ Jangan pakai font size di bawah 10px

---

## 4. Spacing & Layout

- **Max width konten**: `max-w-4xl` (56rem / 896px) + `mx-auto px-6`
- **Gap antar seksi besar**: `space-y-10` atau `pb-20`
- **Gap antar elemen dalam lesson**: `space-y-8`
- **Padding kartu standar**: `p-5` (biasa) atau `p-4` (kompak)
- **Border radius**: `rounded-xl` untuk kartu / panel utama; `rounded-lg` untuk button / input; `rounded-md` untuk badge / chip kecil

---

## 5. Component Patterns

### 5.1 Card / Panel

```tsx
<div className="border border-stone-200 rounded-xl bg-white p-5 space-y-3">
  {/* konten */}
</div>
```

Untuk panel dengan section color:
```tsx
<div
  className="border rounded-xl p-5"
  style={{
    backgroundColor: `${section.color}10`,
    borderColor: `${section.color}30`,
  }}
>
```

### 5.2 Button — Primary (Brand CTA)

```tsx
<button className="
  flex items-center gap-2 px-5 py-2.5 rounded-xl
  text-sm font-semibold text-white
  bg-brand hover:bg-brand-hover
  transition-all hover:shadow-lg hover:-translate-y-0.5
">
  Label <ArrowRight size={15} />
</button>
```

### 5.3 Button — Secondary / Ghost

```tsx
<button className="
  flex items-center gap-2 px-5 py-2.5 rounded-xl
  text-sm font-semibold text-stone-700 bg-white
  border border-stone-200
  hover:shadow-md hover:-translate-y-0.5 transition-all
">
  Label
</button>
```

### 5.4 Lesson Header (Overline + Title)

```tsx
<header className="space-y-2 pb-6 border-b border-stone-200">
  {/* Overline seksi */}
  <span className="text-xs font-bold tracking-widest uppercase text-stone-400">
    {section.number} {section.title}
  </span>
  {/* Nomor lesson dekoratif + Judul */}
  <div className="flex items-start gap-4">
    <span
      className="text-3xl sm:text-5xl font-black leading-none tabular-nums mt-1 shrink-0"
      style={{ color: `${section.color}22` }}  {/* Faded number */}
    >
      {lesson.id}
    </span>
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-stone-900">{lesson.title}</h1>
      <p className="text-[15px] text-stone-500 mt-1 leading-relaxed">{lesson.description}</p>
    </div>
  </div>
</header>
```

### 5.5 Theory Block

Theory block **harus selaras** dengan section color, bukan hardcode blue. Contoh yang benar:

```tsx
// Gunakan warna section dari props, bukan hardcode #2563eb / blue-600
<div
  className="rounded-xl p-5 space-y-3 border"
  style={{
    backgroundColor: `${sectionColor}10`,
    borderColor: `${sectionColor}30`,
  }}
>
  <div className="flex items-start gap-3">
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
      style={{ backgroundColor: sectionColor }}
    >
      <Lightbulb size={16} className="text-white" />
    </div>
    <div>
      <p className="text-xs font-bold uppercase tracking-wider mb-0.5"
         style={{ color: sectionColor }}>
        {title}
      </p>
      <p className="text-[13px] text-stone-700 leading-relaxed">{explanation}</p>
    </div>
  </div>
</div>
```

### 5.6 Badge / Pill

```tsx
{/* Completed badge */}
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-light text-emerald-700 text-[11px] font-semibold">
  <Check size={10} /> Complete
</span>

{/* Section number badge */}
<span
  className="text-[11px] font-bold tabular-nums"
  style={{ color: section.color }}
>
  {section.number}
</span>
```

### 5.7 Sidebar Active State

```tsx
{/* Active lesson link */}
className="... bg-brand text-white"

{/* Active section button */}
className="... bg-stone-100 text-stone-800"

{/* Completed lesson */}
className="... text-stone-400 hover:bg-stone-100"
```

### 5.8 Chart Standard (WAJIB diikuti)

**Semua chart di lesson harus:**
1. Dibungkus dengan komponen `<ChartFrame>` dari `src/components/ui/ChartFrame.tsx`
2. Menggunakan SVG dengan `viewBox="0 0 480 220"` + `className="w-full"`
3. Menggunakan padding standar: `const pad = { l: 40, r: 20, t: 16, b: 32 }` (dapat disesuaikan jika konten membutuhkan)

```tsx
import ChartFrame from '../../ui/ChartFrame';

// Standard chart dimensions
const w = 480, h = 220;
const pad = { l: 40, r: 20, t: 16, b: 32 }; // adjust l/r based on label length

function MyChart() {
    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
            {/* chart content */}
        </svg>
    );
}

// Usage in lesson JSX:
<ChartFrame
    label="Judul chart dalam uppercase (deskripsi singkat)"
    note="Catatan opsional di bawah chart — menjelaskan temuan utama."
>
    <MyChart />
</ChartFrame>
```

**Font sizes standar dalam SVG (proporsional terhadap 480x220):**
- Axis tick labels: `fontSize={7–8}`
- Bar / data labels: `fontSize={8}`
- Annotation text: `fontSize={7-8}`, `fontWeight={500}` untuk emphasis (hindari bold/900)
- Chart sub-titles: `fontSize={7.5–8}` (di luar ChartFrame label)

**Typography UI / Legend di luar SVG:**
- Gaya Teks UI pendukung chart (toggle, legend): Gunakan `text-[13px] font-medium text-stone-*-*`
- Huruf kapital (`uppercase` / `font-black`): SEMAKSIMAL MUNGKIN DIHINDARI. Gunakan Sentence case biasa untuk legend dan tombol.

**Aturan:**
- ✅ Selalu gunakan `viewBox="0 0 480 220"` — BUKAN `width`/`height` inline
- ✅ Semua SVG chart **wajib** menggunakan `className="w-full max-w-2xl mx-auto block"` agar ukuran konsisten (maks 672px, center)
- ✅ `ChartFrame` otomatis membatasi lebar konten ke `max-w-2xl` — tidak perlu tambahkan lagi pada SVG di dalam `ChartFrame`
- ✅ SVG yang berada di luar `ChartFrame` (misalnya di dalam card `div` biasa) **harus** menambahkan `max-w-2xl mx-auto block` secara manual
- ✅ Chart lebih dari 1 panel (side-by-side) boleh menggunakan `220x170` per panel
- ✅ Pastikan `pad.r` cukup besar untuk menampung teks label di kanan bar — minimal **70–90px** jika ada teks `overload`, `%`, atau keterangan di kanan bar
- ✅ Teks judul di dalam SVG panel yang sempit harus **pendek dan uppercase** (`fontSize={9}`) agar tidak terpotong
- ❌ Jangan gunakan dimensi kecil (160x90, 300x120, 320x130, dll.) untuk chart standalone
- ❌ Jangan gunakan `style={{ width: N }}` untuk membatasi ukuran SVG
- ❌ Jangan wrap chart dengan `<div className="bg-white border ...">` manual — gunakan `<ChartFrame>`
- ❌ Hindari teks panjang dengan `textAnchor="middle"` pada panel sempit (< 200px) karena akan terpotong di tepi kiri/kanan

**Contoh SVG di dalam ChartFrame (tidak perlu tambahan max-w):**
```tsx
<ChartFrame label="Judul chart">
    <svg viewBox="0 0 480 220" className="w-full">  {/* ← cukup w-full */}
        {/* chart content */}
    </svg>
</ChartFrame>
```

**Contoh SVG di luar ChartFrame (perlu max-w manual):**
```tsx
<div className="bg-white rounded-xl border border-stone-200 p-5">
    <svg viewBox="0 0 480 220" className="w-full max-w-2xl mx-auto block">
        {/* chart content */}
    </svg>
</div>
```


## 6. Icon Usage

- Library: **Lucide React** (satu-satunya yang boleh dipakai)
- Size dalam sidebar: `12–14px`
- Size dalam lesson content: `16–20px`
- Size untuk ikon dekoratif besar: `24–32px`
- Warna ikon dekoratif / placeholder: `text-stone-300`
- Ikon aksi / interaktif: ikuti warna konteks (brand atau section)

---

## 7. Animation & Transition

Semua interaksi harus menggunakan **transition yang subtle**. Tidak ada animasi yang mengganggu.

| Elemen              | Efek                                    | Class                            |
|---------------------|-----------------------------------------|----------------------------------|
| Button/Link hover   | Naik sedikit + shadow                   | `hover:-translate-y-0.5 hover:shadow-md transition-all` |
| Sidebar open/close  | Slide in/out                            | `transition-transform duration-300` |
| Progress bar        | Smooth width change                     | `transition-all duration-700`    |
| Ikon expand         | Rotasi chevron                          | `transition-transform`           |
| Color change        | Smooth color transition                 | `transition-colors`              |

---

## 8. Do's & Don'ts

### ✅ Lakukan
- Import warna dari `design-tokens.ts` atau baca dari `section.color`
- Ikuti pola komponen dari panduan ini
- Gunakan `rounded-xl` untuk kartu, `rounded-lg` untuk button
- Gunakan `space-y-*` untuk vertical spacing, bukan margin manual
- Tambah `transition-all` / `transition-colors` ke setiap elemen interaktif
- Pakai `tabular-nums` untuk angka dan persentase

### ❌ Jangan
- Hardcode warna hex di komponen (kecuali untuk opacity trick `${color}15`)
- Pakai warna selain Stone untuk neutrals (jangan `gray-`, `zinc-`, `slate-`)
- Campur warna aksen antar seksi
- Pakai font lain selain Inter
- Buat `<article>` atau layout wrapper sendiri — selalu gunakan `<LessonPage>`
- Pakai animasi yang menggerakkan elemen lebih dari `4px` (translate) kecuali modal/overlay
