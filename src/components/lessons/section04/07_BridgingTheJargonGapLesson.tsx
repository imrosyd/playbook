import { useState } from 'react';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = (lang: any) => [
    { sectionId: 'storytelling', slug: 'language-authority', label: t(lang, 's4.jargonGap.crossRefs.0.label') },
    { sectionId: 'perception', slug: 'cognitive-load', label: t(lang, 's4.jargonGap.crossRefs.1.label') },
];

const JARGON_MAP = (lang: any): Array<{ jargon: string; plain: string; context: string }> => {
    return [0, 1, 2, 3, 4, 5, 6, 7].map(i => ({
        jargon: t(lang, `s4.jargonGap.jargonMap.${i}.jargon`),
        plain: t(lang, `s4.jargonGap.jargonMap.${i}.plain`),
        context: t(lang, `s4.jargonGap.jargonMap.${i}.context`)
    }));
};

// Bar chart: comprehension score by audience
function ComprehensionChart() {
    const { lang } = useLang();
    const groups = [
        { label: t(lang, 's4.jargonGap.chart.groups.0'), score: 91, },
        { label: t(lang, 's4.jargonGap.chart.groups.1'), score: 67, },
        { label: t(lang, 's4.jargonGap.chart.groups.2'), score: 48, },
        { label: t(lang, 's4.jargonGap.chart.groups.3'), score: 31, },
        { label: t(lang, 's4.jargonGap.chart.groups.4'), score: 19, },
    ];

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">
                {t(lang, 's4.jargonGap.chart.title')}
            </p>
            <div className="space-y-3">
                {groups.map((g) => (
                    <div key={g.label}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[12px] text-stone-600 font-medium">{g.label}</span>
                            <span className="text-[12px] font-bold tabular-nums text-stone-700">{g.score}%</span>
                        </div>
                        <div className="h-2.5 bg-stone-100 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full"
                                style={{
                                    width: `${g.score}%`,
                                    backgroundColor: g.score > 70 ? '#a8a29e' : g.score > 40 ? '#78716c' : '#1c1917',
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-[11px] text-stone-400 mt-4 leading-relaxed">
                {t(lang, 's4.jargonGap.chart.caption')}
            </p>
        </div>
    );
}

export default function BridgingTheJargonGapLesson() {
    const { lang } = useLang();
    const [selected, setSelected] = useState<string | null>(null);
    const map = JARGON_MAP(lang);
    const current = map.find(j => j.jargon === selected);

    return (
        <LessonPage crossRefs={crossRefs(lang)}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    {t(lang, 's4.jargonGap.intro1')}
                </p>

                <ComprehensionChart />

                <TheoryBlock
                    title={t(lang, 's4.jargonGap.theory.title')}
                    theory={t(lang, 's4.jargonGap.theory.subtitle')}
                    explanation={t(lang, 's4.jargonGap.theory.explanation')}
                />

                <div className="space-y-3">
                    <h3 className="text-base font-bold text-stone-800">{t(lang, 's4.jargonGap.jargonReferenceTitle')}</h3>
                    <p className="text-[13px] text-stone-500">{t(lang, 's4.jargonGap.jargonReferenceDesc')}</p>
                    <div className="flex flex-wrap gap-2">
                        {map.map(j => (
                            <button
                                key={j.jargon}
                                onClick={() => setSelected(s => s === j.jargon ? null : j.jargon)}
                                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${selected === j.jargon
                                    ? 'bg-stone-900 text-white border-stone-900'
                                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                                    }`}
                            >
                                {j.jargon}
                            </button>
                        ))}
                    </div>
                    {current && (
                        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
                            <div className="flex items-baseline gap-3">
                                <span className="text-[14px] font-bold text-stone-800">"{current.jargon}"</span>
                                <span className="text-stone-300">→</span>
                                <span className="text-[14px] font-bold text-emerald-700">"{current.plain}"</span>
                            </div>
                            <p className="text-[12px] text-stone-500 leading-relaxed">{current.context}</p>
                        </div>
                    )}
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                    <p className="text-[12px] font-bold text-stone-600 mb-3">{t(lang, 's4.jargonGap.ruleTitle')}</p>
                    <p className="text-[13px] text-stone-600 leading-relaxed">
                        {t(lang, 's4.jargonGap.ruleDesc')}
                    </p>
                </div>
            </div>
        </LessonPage>
    );
}
