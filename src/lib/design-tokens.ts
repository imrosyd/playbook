/**
 * PLAYBOOK — Design Tokens (Single Source of Truth)
 * =====================================================
 * Semua nilai desain didefinisikan DI SINI.
 * Jangan hardcode warna, radius, atau spacing di komponen.
 * Import dari file ini, atau gunakan Tailwind class yang sudah selaras.
 *
 * @see agents/ui.md untuk panduan lengkap
 */

// ─── BRAND PALETTE ────────────────────────────────────────────────────────────

export const BRAND = {
    /** Warna utama brand — emerald. Pakai untuk: CTA button, active state, logo bg. */
    primary: '#059669',
    primaryHover: '#047857',
    primaryLight: '#d1fae5',
    primaryMuted: '#ecfdf5',
    primaryForeground: '#ffffff',

    /** Canvas — background halaman utama */
    canvas: '#F8F7F4',
    /** Surface — background elemen di atas canvas (sidebar, card) */
    surface: '#FAFAF8',
    /** Border standar */
    border: '#e7e5e4',
    /** Border tipis / separator */
    borderLight: '#f5f5f4',
} as const;

// ─── SECTION COLORS ───────────────────────────────────────────────────────────
/**
 * Warna per seksi kurikulum.
 * Key = nomor seksi (string '01' s/d '08').
 * Setiap seksi HANYA boleh menggunakan warna base-nya sendiri.
 */
export const SECTION_COLORS = {
    '01': { base: '#2563eb', bg: '#eff6ff', label: 'Blue', name: 'The First 3 Seconds' },
    '02': { base: '#0891b2', bg: '#ecfeff', label: 'Cyan', name: 'Choosing the Right Chart' },
    '03': { base: '#059669', bg: '#ecfdf5', label: 'Emerald', name: 'The Makeover Lab' },
    '04': { base: '#7c3aed', bg: '#f5f3ff', label: 'Violet', name: 'Data Storytelling' },
    '05': { base: '#d97706', bg: '#fffbeb', label: 'Amber', name: 'The Decision Room' },
    '06': { base: '#db2777', bg: '#fdf2f8', label: 'Pink', name: 'Color & Design' },
    '07': { base: '#0f766e', bg: '#f0fdfa', label: 'Teal', name: 'Case Studies' },
    '08': { base: '#dc2626', bg: '#fef2f2', label: 'Red', name: 'Ethics & Certification' },
} as const;

export type SectionNumber = keyof typeof SECTION_COLORS;

/** Ambil token warna untuk seksi tertentu */
export function getSectionColor(number: SectionNumber) {
    return SECTION_COLORS[number];
}

/** Generate inline style untuk accent color sebuah seksi */
export function sectionStyle(number: SectionNumber, opacity = 1) {
    const { base } = SECTION_COLORS[number];
    return {
        color: base,
        opacity,
    };
}

/** Generate background dengan opacity ringan untuk sebuah seksi */
export function sectionBgStyle(number: SectionNumber, alphaHex = '15') {
    const { base } = SECTION_COLORS[number];
    return {
        backgroundColor: `${base}${alphaHex}`,
    };
}

// ─── TYPOGRAPHY ───────────────────────────────────────────────────────────────

export const TYPOGRAPHY = {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    /** Scale: gunakan class Tailwind, ini referensi saja */
    scale: {
        'display': { size: '3rem', weight: 900, lineHeight: 1.05 }, // text-5xl font-black
        'h1': { size: '1.5rem', weight: 700, lineHeight: 1.3 }, // text-2xl font-bold
        'h2': { size: '1.25rem', weight: 700, lineHeight: 1.4 }, // text-xl font-bold
        'h3': { size: '1rem', weight: 600, lineHeight: 1.5 }, // text-base font-semibold
        'body': { size: '0.9375rem', weight: 400, lineHeight: 1.6 }, // text-[15px]
        'small': { size: '0.8125rem', weight: 400, lineHeight: 1.5 }, // text-[13px]
        'caption': { size: '0.6875rem', weight: 500, lineHeight: 1.4 }, // text-[11px]
        'overline': { size: '0.625rem', weight: 700, lineHeight: 1.4, letterSpacing: '0.08em', textTransform: 'uppercase' },
    },
} as const;

// ─── SPACING & RADIUS ─────────────────────────────────────────────────────────

export const RADIUS = {
    sm: '0.375rem',  // rounded-md  — chips, badge kecil
    md: '0.5rem',    // rounded-lg  — button, input
    lg: '0.75rem',   // rounded-xl  — card, panel
    xl: '1rem',      // rounded-2xl — featured card, hero block
    full: '9999px',    // rounded-full — pill, avatar
} as const;

// ─── SHADOW ───────────────────────────────────────────────────────────────────

export const SHADOW = {
    card: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
    hover: '0 4px 12px 0 rgb(0 0 0 / 0.1)',
    focus: '0 0 0 3px rgb(5 150 105 / 0.2)',
} as const;

// ─── Z-INDEX ──────────────────────────────────────────────────────────────────

export const Z = {
    sidebar: 40,
    overlay: 30,
    dropdown: 50,
    modal: 60,
    toast: 70,
} as const;
