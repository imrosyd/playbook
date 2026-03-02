import { useState } from 'react';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = (lang: any) => [
    { sectionId: 'design', slug: 'three-color-rule', label: t(lang, 's7.covidDashboard.crossRefs.0.label') },
    { sectionId: 'ethics', slug: 'clarity', label: t(lang, 's7.covidDashboard.crossRefs.1.label') },
];

// Line chart: two states — "cases" vs "per capita" view
function CovidLineChart({ perCapita, lang }: { perCapita: boolean, lang: any }) {
    const rawData = [
        { label: t(lang, 's7.covidDashboard.chart.countries.0'), cases: 33, perCap: 10 },
        { label: t(lang, 's7.covidDashboard.chart.countries.1'), cases: 22, perCap: 10.4 },
        { label: t(lang, 's7.covidDashboard.chart.countries.2'), cases: 30, perCap: 2.2 },
        { label: t(lang, 's7.covidDashboard.chart.countries.3'), cases: 7.5, perCap: 11 },
        { label: t(lang, 's7.covidDashboard.chart.countries.4'), cases: 4, perCap: 4.7 },
        { label: t(lang, 's7.covidDashboard.chart.countries.5'), cases: 1.2, perCap: 2.3 },
    ];

    const data = rawData.map(d => ({ ...d, value: perCapita ? d.perCap : d.cases }));
    const maxV = perCapita ? 13 : 36;

    return (
        <div className="space-y-1">
            {data.map(d => (
                <div key={d.label} className="flex items-center gap-3">
                    <span className="w-14 text-[11px] text-stone-500 font-medium text-right shrink-0">{d.label}</span>
                    <div className="flex-1 h-5 bg-stone-100 rounded overflow-hidden">
                        <div
                            className="h-full rounded transition-all duration-500"
                            style={{ width: `${(d.value / maxV) * 100}%`, backgroundColor: '#1c1917' }}
                        />
                    </div>
                    <span className="w-12 text-[11px] font-bold text-stone-700 tabular-nums text-right">{d.value}{!perCapita && 'M'}</span>
                </div>
            ))}
        </div>
    );
}

export default function CovidDashboardWars2020Lesson() {
    const { lang } = useLang();
    const [perCapita, setPerCapita] = useState(false);

    return (
        <LessonPage crossRefs={crossRefs(lang)}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's7.covidDashboard.intro') }} />

                <TheoryBlock
                    title={t(lang, 's7.covidDashboard.theory.title')}
                    theory={t(lang, 's7.covidDashboard.theory.subtitle')}
                    explanation={t(lang, 's7.covidDashboard.theory.explanation')}
                />

                <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                            {perCapita ? t(lang, 's7.covidDashboard.demo.titleCapita') : t(lang, 's7.covidDashboard.demo.titleAbsolute')}
                        </p>
                        <button
                            onClick={() => setPerCapita(v => !v)}
                            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${perCapita ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'}`}
                        >
                            {perCapita ? t(lang, 's7.covidDashboard.demo.btnAbsolute') : t(lang, 's7.covidDashboard.demo.btnCapita')}
                        </button>
                    </div>
                    <CovidLineChart perCapita={perCapita} lang={lang} />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        {perCapita
                            ? t(lang, 's7.covidDashboard.demo.descCapita')
                            : t(lang, 's7.covidDashboard.demo.descAbsolute')}
                    </p>
                </div>

                <div className="space-y-3">
                    <h3 className="text-base font-bold text-stone-800">{t(lang, 's7.covidDashboard.dashboardChoices.title')}</h3>
                    <div className="space-y-2">
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="bg-white border border-stone-200 rounded-lg p-4">
                                <p className="text-[12px] font-bold text-stone-800 mb-1">{t(lang, `s7.covidDashboard.dashboardChoices.items.${i}.choice`)}</p>
                                <p className="text-[12px] text-stone-500 leading-relaxed">{t(lang, `s7.covidDashboard.dashboardChoices.items.${i}.impact`)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-stone-800 rounded-xl p-5 text-white">
                    <p className="text-sm font-bold text-amber-400 mb-2">{t(lang, 's7.covidDashboard.takeaway.title')}</p>
                    <p className="text-[14px] text-stone-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's7.covidDashboard.takeaway.desc') }} />
                </div>
            </div>
        </LessonPage>
    );
}
