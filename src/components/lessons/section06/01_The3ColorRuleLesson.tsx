import { useState } from 'react';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = (lang: any) => [
    { sectionId: 'design', slug: 'color-psychology', label: t(lang, 's6.colorsRule.crossRefs.0.label') },
    { sectionId: 'design', slug: 'colorblind', label: t(lang, 's6.colorsRule.crossRefs.1.label') },
];

// Donut-style chart showing 3 colors vs more
function ColorCountChart({ count, lang }: { count: number, lang: any }) {
    const colors = ['#1c1917', '#78716c', '#d6d3d1', '#ef4444', '#3b82f6', '#a3e635'].slice(0, count);
    const segSize = 360 / colors.length;
    const cx = 80, cy = 80, r = 60, innerR = 35;

    const arc = (startDeg: number, endDeg: number, fill: string, key: number) => {
        const toRad = (d: number) => (d - 90) * (Math.PI / 180);
        const x1 = cx + r * Math.cos(toRad(startDeg));
        const y1 = cy + r * Math.sin(toRad(startDeg));
        const x2 = cx + r * Math.cos(toRad(endDeg));
        const y2 = cy + r * Math.sin(toRad(endDeg));
        const ix1 = cx + innerR * Math.cos(toRad(startDeg));
        const iy1 = cy + innerR * Math.sin(toRad(startDeg));
        const ix2 = cx + innerR * Math.cos(toRad(endDeg));
        const iy2 = cy + innerR * Math.sin(toRad(endDeg));
        const large = (endDeg - startDeg) > 180 ? 1 : 0;
        return (
            <path key={key}
                d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${large} 0 ${ix1} ${iy1} Z`}
                fill={fill}
                stroke="white"
                strokeWidth={2}
            />
        );
    };

    return (
        <svg viewBox="0 0 480 220" className="w-full" style={{ maxWidth: 160 }}>
            {colors.map((c, i) => arc(i * segSize, (i + 1) * segSize, c, i))}
            <text x={cx} y={cy + 4} textAnchor="middle" fill="#1c1917" fontSize={14}>{count}</text>
            <text x={cx} y={cy + 16} textAnchor="middle" fill="#78716c" fontSize={8}>{t(lang, 's6.colorsRule.chart.colorsLabel')}</text>
        </svg>
    );
}

export default function The3ColorRuleLesson() {
    const { lang } = useLang();
    const [count, setCount] = useState(3);

    return (
        <LessonPage crossRefs={crossRefs(lang)}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    {t(lang, 's6.colorsRule.intro1')}
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's6.colorsRule.intro2') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's6.colorsRule.intro3') }} />

                <TheoryBlock
                    title={t(lang, 's6.colorsRule.theory.title')}
                    theory={t(lang, 's6.colorsRule.theory.subtitle')}
                    explanation={t(lang, 's6.colorsRule.theory.explanation')}
                />

                <div className="bg-white border border-stone-200 rounded-xl p-5">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">
                        {t(lang, 's6.colorsRule.demo.title')}
                    </p>
                    <div className="flex items-center gap-8">
                        <div className="shrink-0">
                            <ColorCountChart count={count} lang={lang} />
                        </div>
                        <div className="flex-1 space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[12px] font-semibold text-stone-600">{t(lang, 's6.colorsRule.demo.countLabel')}: {count}</span>
                                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${count <= 3 ? 'bg-stone-900 text-white' : count <= 5 ? 'bg-stone-200 text-stone-700' : 'bg-red-50 text-red-700'}`}>
                                        {count <= 3 ? t(lang, 's6.colorsRule.demo.statusRecommended') : count <= 5 ? t(lang, 's6.colorsRule.demo.statusBorderline') : t(lang, 's6.colorsRule.demo.statusTooMany')}
                                    </span>
                                </div>
                                <input
                                    type="range" min={2} max={6} value={count}
                                    onChange={e => setCount(Number(e.target.value))}
                                    className="w-full accent-stone-800"
                                />
                                <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                                    <span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
                                </div>
                            </div>
                            <p className="text-[13px] text-stone-500 leading-relaxed">
                                {count <= 3
                                    ? t(lang, 's6.colorsRule.demo.descRecommended')
                                    : count <= 5
                                        ? t(lang, 's6.colorsRule.demo.descBorderline')
                                        : t(lang, 's6.colorsRule.demo.descTooMany')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-base font-bold text-stone-800">{t(lang, 's6.colorsRule.system.title')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                            { role: t(lang, 's6.colorsRule.system.roles.0.name'), use: t(lang, 's6.colorsRule.system.roles.0.use'), color: '#1c1917' },
                            { role: t(lang, 's6.colorsRule.system.roles.1.name'), use: t(lang, 's6.colorsRule.system.roles.1.use'), color: '#78716c' },
                            { role: t(lang, 's6.colorsRule.system.roles.2.name'), use: t(lang, 's6.colorsRule.system.roles.2.use'), color: '#dc2626' },
                        ].map(c => (
                            <div key={c.role} className="bg-white border border-stone-200 rounded-xl p-4">
                                <div className="w-8 h-8 rounded-lg mb-3" style={{ backgroundColor: c.color }} />
                                <p className="text-[12px] font-bold text-stone-800 mb-1">{c.role}</p>
                                <p className="text-[12px] text-stone-500 leading-relaxed">{c.use}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
