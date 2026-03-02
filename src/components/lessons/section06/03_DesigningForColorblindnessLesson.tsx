import { useState } from 'react';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = (lang: any) => [
    { sectionId: 'design', slug: 'color-psychology', label: t(lang, 's6.colorblindness.crossRefs.0.label') },
    { sectionId: 'design', slug: 'three-color-rule', label: t(lang, 's6.colorblindness.crossRefs.1.label') },
];

type FilterType = 'normal' | 'deuteranopia' | 'protanopia' | 'tritanopia' | 'monochromacy';

const FILTERS: Record<FilterType, string> = {
    normal: '',
    deuteranopia: 'saturate(0.3) hue-rotate(90deg)',
    protanopia: 'saturate(0.4) hue-rotate(30deg)',
    tritanopia: 'saturate(0.5) hue-rotate(200deg)',
    monochromacy: 'grayscale(1)',
};

const FILTER_LABELS = (lang: any): Record<FilterType, { label: string; prevalence: string }> => ({
    normal: { label: t(lang, 's6.colorblindness.filters.normal.label'), prevalence: '' },
    deuteranopia: { label: t(lang, 's6.colorblindness.filters.deuteranopia.label'), prevalence: t(lang, 's6.colorblindness.filters.deuteranopia.prevalence') },
    protanopia: { label: t(lang, 's6.colorblindness.filters.protanopia.label'), prevalence: t(lang, 's6.colorblindness.filters.protanopia.prevalence') },
    tritanopia: { label: t(lang, 's6.colorblindness.filters.tritanopia.label'), prevalence: t(lang, 's6.colorblindness.filters.tritanopia.prevalence') },
    monochromacy: { label: t(lang, 's6.colorblindness.filters.monochromacy.label'), prevalence: t(lang, 's6.colorblindness.filters.monochromacy.prevalence') },
});

// A bar chart that uses Red vs Green — the classic failure
function AccessibilityBarChart({ filter, lang }: { filter: FilterType, lang: any }) {
    const bars = [
        { label: t(lang, 's6.colorblindness.chart.bars.0.label'), value: 85, color: '#16a34a' },
        { label: t(lang, 's6.colorblindness.chart.bars.1.label'), value: 62, color: '#d97706' },
        { label: t(lang, 's6.colorblindness.chart.bars.2.label'), value: 38, color: '#dc2626' },
    ];
    const maxV = 100;
    const w = 260, h = 120, pad = { l: 48, r: 16, t: 12, b: 28 };
    const barWidth = 44;
    const gap = (w - pad.l - pad.r - bars.length * barWidth) / (bars.length + 1);
    const toY = (v: number) => pad.t + (1 - v / maxV) * (h - pad.t - pad.b);
    const barH = (v: number) => (v / maxV) * (h - pad.t - pad.b);

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ filter: FILTERS[filter] }}>
            {[0, 50, 100].map(v => (
                <line key={v} x1={pad.l} x2={w - pad.r} y1={toY(v)} y2={toY(v)} stroke="#f5f5f4" strokeWidth={1} />
            ))}
            {bars.map((b, i) => {
                const x = pad.l + gap + i * (barWidth + gap);
                return (
                    <g key={b.label}>
                        <rect x={x} y={toY(b.value)} width={barWidth} height={barH(b.value)} fill={b.color} rx={3} />
                        <text x={x + barWidth / 2} y={toY(b.value) - 4} fill="#44403c" fontSize={9} textAnchor="middle">{b.value}%</text>
                        <text x={x + barWidth / 2} y={h - 6} fill="#a8a29e" fontSize={8} textAnchor="middle">{b.label}</text>
                    </g>
                );
            })}
            <text x={pad.l - 4} y={pad.t + (h - pad.t - pad.b) / 2} fill="#a8a29e" fontSize={8} textAnchor="middle" transform={`rotate(-90, ${pad.l - 14}, ${pad.t + (h - pad.t - pad.b) / 2})`}>{t(lang, 's6.colorblindness.chart.yAxis')}</text>
        </svg>
    );
}

function PaletteShowcase({ lang }: { lang: any }) {
    const palettes = [
        {
            name: t(lang, 's6.colorblindness.palettes.0.name'),
            description: t(lang, 's6.colorblindness.palettes.0.description'),
            colors: [
                { hex: '#d97706', label: t(lang, 's6.colorblindness.palettes.0.colors.0.label'), bad: false },
                { hex: '#2563eb', label: t(lang, 's6.colorblindness.palettes.0.colors.1.label'), bad: false },
                { hex: '#94a3b8', label: t(lang, 's6.colorblindness.palettes.0.colors.2.label'), bad: false },
            ]
        },
        {
            name: t(lang, 's6.colorblindness.palettes.1.name'),
            description: t(lang, 's6.colorblindness.palettes.1.description'),
            colors: [
                { hex: '#E69F00', label: t(lang, 's6.colorblindness.palettes.1.colors.0.label'), bad: false },
                { hex: '#56B4E9', label: t(lang, 's6.colorblindness.palettes.1.colors.1.label'), bad: false },
                { hex: '#009E73', label: t(lang, 's6.colorblindness.palettes.1.colors.2.label'), bad: false },
                { hex: '#F0E442', label: t(lang, 's6.colorblindness.palettes.1.colors.3.label'), bad: false },
                { hex: '#0072B2', label: t(lang, 's6.colorblindness.palettes.1.colors.4.label'), bad: false },
                { hex: '#D55E00', label: t(lang, 's6.colorblindness.palettes.1.colors.5.label'), bad: false },
                { hex: '#CC79A7', label: t(lang, 's6.colorblindness.palettes.1.colors.6.label'), bad: false },
            ]
        }
    ];

    return (
        <div className="space-y-6 mt-8 border-t border-stone-200 pt-8">
            <h3 className="text-base font-bold text-stone-800">{t(lang, 's6.colorblindness.showcase.title')}</h3>
            <p className="text-[13px] text-stone-600 leading-relaxed mb-4">
                {t(lang, 's6.colorblindness.showcase.description')}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                {palettes.map((p, i) => (
                    <div key={i} className="bg-white border border-stone-200 rounded-xl p-5">
                        <h4 className="text-[13px] font-bold text-stone-800 mb-1">{p.name}</h4>
                        <p className="text-[11px] text-stone-500 mb-4 h-8">{p.description}</p>
                        <div className="space-y-2">
                            {p.colors.map((c, j) => (
                                <div key={j} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-md shadow-inner border border-stone-200" style={{ backgroundColor: c.hex }} />
                                    <div>
                                        <p className="text-[12px] font-bold text-stone-700 font-mono">{c.hex.toUpperCase()}</p>
                                        <p className="text-[10px] text-stone-500 uppercase tracking-wider">{c.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function DesigningForColorblindnessLesson() {
    const { lang } = useLang();
    const [filter, setFilter] = useState<FilterType>('normal');
    const filterLabels = FILTER_LABELS(lang);

    return (
        <LessonPage crossRefs={crossRefs(lang)}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's6.colorblindness.intro1') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's6.colorblindness.intro2') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's6.colorblindness.intro3') }} />

                <TheoryBlock
                    title={t(lang, 's6.colorblindness.theory.title')}
                    theory={t(lang, 's6.colorblindness.theory.subtitle')}
                    explanation={t(lang, 's6.colorblindness.theory.explanation')}
                />

                <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's6.colorblindness.demo.title')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {(Object.keys(FILTERS) as FilterType[]).map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${filter === f
                                    ? 'bg-stone-900 text-white border-stone-900'
                                    : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                                    }`}
                            >
                                {filterLabels[f].label}
                                {filterLabels[f].prevalence && (
                                    <span className="ml-1.5 opacity-50 font-normal text-[10px]">({filterLabels[f].prevalence})</span>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-center pt-2">
                        <div style={{ maxWidth: 320, width: '100%' }}>
                            <AccessibilityBarChart filter={filter} lang={lang} />
                        </div>
                    </div>
                    {filter !== 'normal' && (
                        <p className="text-[12px] text-stone-500 leading-relaxed">
                            {t(lang, 's6.colorblindness.demo.notice').replace('{type}', filterLabels[filter].label.toLowerCase())}
                        </p>
                    )}
                </div>

                <div className="space-y-3">
                    <h3 className="text-base font-bold text-stone-800">{t(lang, 's6.colorblindness.fix.title')}</h3>
                    <div className="space-y-2">
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-3 bg-white border border-stone-200 rounded-lg p-3">
                                <span className="text-[11px] font-bold text-stone-300 shrink-0 mt-0.5">{i + 1}</span>
                                <div>
                                    <p className="text-[13px] font-semibold text-stone-800">{t(lang, `s6.colorblindness.fix.items.${i}.fix`)}</p>
                                    <p className="text-[12px] text-stone-400 leading-relaxed mt-0.5">{t(lang, `s6.colorblindness.fix.items.${i}.detail`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <PaletteShowcase lang={lang} />
            </div>
        </LessonPage>
    );
}
