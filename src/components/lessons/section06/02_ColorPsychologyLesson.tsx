import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = (lang: any) => [
    { sectionId: 'design', slug: 'three-color-rule', label: t(lang, 's6.colorPsychology.crossRefs.0.label') },
    { sectionId: 'design', slug: 'colorblind', label: t(lang, 's6.colorPsychology.crossRefs.1.label') },
];

// Radial bar chart showing color emotion associations
function ColorEmotionChart({ lang }: { lang: any }) {
    const colors = [0, 1, 2, 3, 4, 5].map(i => ({
        hue: ['#dc2626', '#16a34a', '#2563eb', '#d97706', '#6d28d9', '#475569'][i],
        label: t(lang, `s6.colorPsychology.emotionChart.colors.${i}.label`),
        primary: t(lang, `s6.colorPsychology.emotionChart.colors.${i}.primary`),
        secondary: t(lang, `s6.colorPsychology.emotionChart.colors.${i}.secondary`)
    }));

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">
                {t(lang, 's6.colorPsychology.emotionChart.title')}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {colors.map(c => (
                    <div key={c.label} className="flex items-start gap-3 p-3 rounded-lg border border-stone-100">
                        <div className="w-8 h-8 rounded-lg shrink-0 mt-0.5" style={{ backgroundColor: c.hue }} />
                        <div>
                            <p className="text-[12px] font-bold text-stone-800">{c.label}</p>
                            <p className="text-[11px] font-semibold text-stone-500 mb-0.5">{c.primary}</p>
                            <p className="text-[10px] text-stone-400">{c.secondary}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Stacked bar chart showing cultural color meaning differences
function CulturalChart({ lang }: { lang: any }) {
    const data = [0, 1, 2].map(i => ({
        color: t(lang, `s6.colorPsychology.culturalChart.colors.${i}.color`),
        meanings: [0, 1].map(j => ({
            culture: t(lang, `s6.colorPsychology.culturalChart.colors.${i}.meanings.${j}.culture`),
            meaning: t(lang, `s6.colorPsychology.culturalChart.colors.${i}.meanings.${j}.meaning`),
            fill: [['#fee2e2', '#fca5a5'], ['#dcfce7', '#86efac'], ['#f5f5f4', '#e7e5e4']][i][j]
        }))
    }));

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">
                {t(lang, 's6.colorPsychology.culturalChart.title')}
            </p>
            <div className="space-y-3">
                {data.map(d => (
                    <div key={d.color} className="flex items-stretch gap-1 h-12">
                        <div className="w-12 shrink-0 flex items-center">
                            <span className="text-[11px] font-bold text-stone-500">{d.color}</span>
                        </div>
                        {d.meanings.map(m => (
                            <div key={m.culture}
                                className="flex-1 rounded flex items-center justify-center border border-stone-200"
                                style={{ backgroundColor: m.fill }}>
                                <div className="text-center">
                                    <p className="text-[9px] font-bold text-stone-500 uppercase">{m.culture}</p>
                                    <p className="text-[10px] text-stone-700">{m.meaning}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ColorPsychologyLesson() {
    const { lang } = useLang();
    return (
        <LessonPage crossRefs={crossRefs(lang)}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's6.colorPsychology.intro1') }} />

                <TheoryBlock
                    title={t(lang, 's6.colorPsychology.theory1.title')}
                    theory={t(lang, 's6.colorPsychology.theory1.subtitle')}
                    explanation={t(lang, 's6.colorPsychology.theory1.explanation')}
                />

                <ColorEmotionChart lang={lang} />

                <TheoryBlock
                    title={t(lang, 's6.colorPsychology.theory2.title')}
                    theory={t(lang, 's6.colorPsychology.theory2.subtitle')}
                    explanation={t(lang, 's6.colorPsychology.theory2.explanation')}
                />

                <CulturalChart lang={lang} />

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
                    <p className="text-[12px] font-bold text-stone-700">{t(lang, 's6.colorPsychology.rules.title')}</p>
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="bg-white border border-stone-200 rounded-lg p-3 space-y-1">
                            <p className="text-[12px] font-semibold text-stone-800">{t(lang, `s6.colorPsychology.rules.items.${i}.rule`)}</p>
                            <p className="text-[11px] text-stone-400 leading-relaxed">{t(lang, `s6.colorPsychology.rules.items.${i}.reason`)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </LessonPage>
    );
}
