import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = (lang: any) => [
    { sectionId: 'design', slug: 'color-psychology', label: t(lang, 's6.fontLayout.crossRefs.0.label') },
    { sectionId: 'storytelling', slug: 'language-authority', label: t(lang, 's6.fontLayout.crossRefs.1.label') },
];

// Type hierarchy chart using SVG
function TypographyHierarchyChart({ lang }: { lang: any }) {
    const levels = [0, 1, 2, 3, 4].map(i => ({
        role: t(lang, `s6.fontLayout.hierarchyChart.levels.${i}.role`),
        size: t(lang, `s6.fontLayout.hierarchyChart.levels.${i}.size`),
        weight: t(lang, `s6.fontLayout.hierarchyChart.levels.${i}.weight`),
        example: t(lang, `s6.fontLayout.hierarchyChart.levels.${i}.example`),
        fs: [20, 14, 12, 10, 9][i],
        fw: [900, 700, 600, 400, 400][i]
    }));

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                {t(lang, 's6.fontLayout.hierarchyChart.title')}
            </p>
            <div className="space-y-4">
                {levels.map((l, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="w-36 shrink-0">
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wide leading-tight">{l.role}</p>
                            <p className="text-[9px] text-stone-300 mt-0.5">{l.size} · {l.weight}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="h-px bg-stone-100 mb-2" />
                            <p style={{ fontSize: l.fs, fontWeight: l.fw, color: '#1c1917', lineHeight: 1.2 }} className="truncate">
                                {l.example}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Spacing / density comparison — horizontal bar chart avoids label overlap
function SpacingChart({ lang }: { lang: any }) {
    const labels = [0, 1, 2, 3].map(i => t(lang, `s6.fontLayout.spacingChart.labels.${i}`));
    const shortLabels = [0, 1, 2, 3].map(i => t(lang, `s6.fontLayout.spacingChart.shortLabels.${i}`));
    const values = [312, 341, 289, 305];
    const maxV = 380;

    const renderHBars = (useShort: boolean, tight: boolean) => {
        const w = 220, h = 116;
        const labelW = useShort ? 28 : 76;
        const pad = { l: labelW, r: 20, t: 8, b: 8 };
        const rowH = (h - pad.t - pad.b) / values.length;
        const barH = tight ? rowH * 0.45 : rowH * 0.52;
        const toX = (v: number) => pad.l + (v / maxV) * (w - pad.l - pad.r);
        const labs = useShort ? shortLabels : labels;

        return (
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
                {values.map((v, i) => {
                    const y = pad.t + i * rowH + (rowH - barH) / 2;
                    return (
                        <g key={i}>
                            <text
                                x={labelW - 6}
                                y={y + barH / 2 + 3}
                                fill={tight ? '#a8a29e' : '#78716c'}
                                fontSize={tight ? 8 : 9}
                                textAnchor="end"
                            >
                                {labs[i]}
                            </text>
                            <rect
                                x={pad.l}
                                y={y}
                                width={toX(v) - pad.l}
                                height={barH}
                                fill="#1c1917"
                                rx={2}
                                opacity={tight ? 0.6 : 1}
                            />
                            <text
                                x={toX(v) + 4}
                                y={y + barH / 2 + 3}
                                fill={tight ? '#a8a29e' : '#78716c'}
                                fontSize={8}
                                textAnchor="start"
                            >
                                {v}
                            </text>
                        </g>
                    );
                })}
            </svg>
        );
    };

    return (
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-stone-200">
                <div className="p-4">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-3">{t(lang, 's6.fontLayout.spacingChart.cramped')}</p>
                    {renderHBars(false, true)}
                </div>
                <div className="p-4">
                    <p className="text-[10px] font-bold text-stone-800 uppercase tracking-wider mb-3">{t(lang, 's6.fontLayout.spacingChart.correct')}</p>
                    {renderHBars(true, false)}
                </div>
            </div>
        </div>
    );
}

export default function FontLayoutBasicsLesson() {
    const { lang } = useLang();
    return (
        <LessonPage crossRefs={crossRefs(lang)}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's6.fontLayout.intro1') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's6.fontLayout.intro2') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's6.fontLayout.intro3') }} />

                <TheoryBlock
                    title={t(lang, 's6.fontLayout.theory.title')}
                    theory={t(lang, 's6.fontLayout.theory.subtitle')}
                    explanation={t(lang, 's6.fontLayout.theory.explanation')}
                />

                <TypographyHierarchyChart lang={lang} />

                <SpacingChart lang={lang} />

                <div className="space-y-3">
                    <h3 className="text-base font-bold text-stone-800">{t(lang, 's6.fontLayout.rules.title')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="bg-stone-50 border border-stone-200 rounded-lg p-3 space-y-1">
                                <p className="text-[12px] font-semibold text-stone-800">{t(lang, `s6.fontLayout.rules.items.${i}.rule`)}</p>
                                <p className="text-[11px] text-stone-400 leading-relaxed">{t(lang, `s6.fontLayout.rules.items.${i}.note`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
