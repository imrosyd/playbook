/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // ─── Brand Palette ───────────────────────────────────────
                brand: {
                    DEFAULT: '#059669',   // emerald-700 — CTA, active states, logo
                    hover: '#047857',   // emerald-800 — hover
                    light: '#d1fae5',   // emerald-100 — completed badge bg
                    muted: '#ecfdf5',   // emerald-50  — subtle tint
                    foreground: '#ffffff',
                },
                canvas: '#F8F7F4',          // halaman utama bg
                surface: '#FAFAF8',          // sidebar / card bg
                // ─── Section Accent Colors ──────────────────────────────
                // Pakai sebagai: text-section-01, bg-section-01/10, border-section-01
                section: {
                    '01': '#2563eb',  // Blue   — The First 3 Seconds
                    '02': '#0891b2',  // Cyan   — Choosing the Right Chart
                    '03': '#059669',  // Emerald— The Makeover Lab
                    '04': '#7c3aed',  // Violet — Data Storytelling
                    '05': '#d97706',  // Amber  — The Decision Room
                    '06': '#db2777',  // Pink   — Color & Design
                    '07': '#0f766e',  // Teal   — Case Studies
                    '08': '#dc2626',  // Red    — Ethics & Certification
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '0.5rem',
            },
        },
    },
    plugins: [],
};

