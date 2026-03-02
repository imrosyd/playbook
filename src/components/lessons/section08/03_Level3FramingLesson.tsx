import { useState, useMemo } from 'react';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import EthicalLevelLesson from './EthicalLevelLesson';

const crossRefs = (lang: any) => [
    { sectionId: 'perception', slug: 'anchoring', label: t(lang, 's8.level3.crossRefs.0.label') },
    { sectionId: 'lab', slug: 'annotation-trend', label: t(lang, 's8.level3.crossRefs.1.label') },
    { sectionId: 'ethics', slug: 'emphasis', label: t(lang, 's8.level3.crossRefs.2.label') },
    { sectionId: 'ethics', slug: 'distortion', label: t(lang, 's8.level3.crossRefs.3.label') },
];

function ThreeStoriesDemo({ lang }: { lang: any }) {
    const [story, setStory] = useState<'complete' | 'golden' | 'collapse'>('complete');

    const fullData = useMemo(() => [
        { year: 2010, val: 10 }, { year: 2011, val: 18 }, { year: 2012, val: 30 },
        { year: 2013, val: 55 }, { year: 2014, val: 80 }, { year: 2015, val: 110 },
        { year: 2016, val: 105 }, { year: 2017, val: 112 }, { year: 2018, val: 108 }, { year: 2019, val: 115 },
        { year: 2020, val: 85 }, { year: 2021, val: 60 }, { year: 2022, val: 40 },
        { year: 2023, val: 20 }, { year: 2024, val: 15 }
    ], []);

    const data = useMemo(() => {
        if (story === 'golden') return fullData.slice(0, 6);
        if (story === 'collapse') return fullData.slice(9, 15);
        return fullData;
    }, [story, fullData]);

    const w = 400, h = 220;
    const pad = { t: 20, l: 40, r: 20, b: 30 };
    const chartW = w - pad.l - pad.r;

    const yMax = story === 'golden' ? 120 : story === 'collapse' ? 120 : 120; // fixed Y scale to prevent scale-trickery, making the X-axis trick purely about framing

    const scaleX = (i: number) => pad.l + (i) * (chartW / Math.max(1, data.length - 1));
    const scaleY = (val: number) => pad.t + (1 - val / yMax) * (h - pad.t - pad.b);

    const pathData = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(d.val)}`).join(' ');

    const titles = {
        complete: t(lang, 's8.level3.demo.titles.complete'),
        golden: t(lang, 's8.level3.demo.titles.golden'),
        collapse: t(lang, 's8.level3.demo.titles.collapse')
    };

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[13px] font-bold text-stone-700 tracking-wide uppercase">
                    {t(lang, 's8.level3.demo.title')}
                </h3>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {(['complete', 'golden', 'collapse'] as const).map(s => (
                    <button
                        key={s}
                        onClick={() => setStory(s)}
                        className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-colors ${story === s ? 'bg-amber-700 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                    >
                        {titles[s]}
                    </button>
                ))}
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 w-full">
                    <h4 className="text-[14px] font-bold text-stone-800 text-center mb-2">{titles[story]}</h4>
                    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full max-h-[220px] overflow-visible">
                        <line x1={pad.l} x2={pad.l} y1={pad.t} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} />
                        <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} />

                        <path d={pathData} fill="none" stroke="#d97706" strokeWidth={3} className="transition-all duration-500 ease-in-out" />

                        {/* Dots */}
                        {data.map((d, i) => (
                            <circle key={d.year} cx={scaleX(i)} cy={scaleY(d.val)} r={3} fill="#d97706" className="transition-all duration-500 ease-in-out" />
                        ))}

                        {/* First and Last Year Labels */}
                        {data.length > 0 && (
                            <>
                                <text x={scaleX(0)} y={h - pad.b + 15} fill="#a8a29e" fontSize={11} textAnchor="middle">{data[0].year}</text>
                                <text x={scaleX(data.length - 1)} y={h - pad.b + 15} fill="#a8a29e" fontSize={11} textAnchor="middle">{data[data.length - 1].year}</text>
                            </>
                        )}
                    </svg>
                </div>
                <div className="flex-1">
                    <div className="bg-stone-50 rounded-lg p-5 border border-stone-100">
                        <p className="text-[13px] text-stone-600 leading-relaxed">
                            {story === 'complete' && t(lang, 's8.level3.demo.desc.complete')}
                            {story === 'golden' && t(lang, 's8.level3.demo.desc.golden')}
                            {story === 'collapse' && t(lang, 's8.level3.demo.desc.collapse')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Level3FramingLesson() {
    const { lang } = useLang();
    return (
        <EthicalLevelLesson levelIndex={2} crossRefs={crossRefs(lang)}>
            <div className="space-y-6">
                <p className="text-[15px] font-semibold text-stone-800 uppercase tracking-widest text-center mt-6">
                    {t(lang, 's8.level3.labTitle')}
                </p>
                <ThreeStoriesDemo lang={lang} />
            </div>
        </EthicalLevelLesson>
    );
}
