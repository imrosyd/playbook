import { useState } from 'react';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

// Inline line chart to show the trend the "power title" should caption
function RevenueTrendChart({ highlighted }: { highlighted: boolean }) {
    const { lang } = useLang();
    const points = [320, 340, 310, 305, 285, 260, 255, 242];
    const w = 360, h = 140, pad = { l: 30, r: 16, t: 16, b: 32 };
    const maxV = 380, minV = 220;

    const toX = (i: number) => pad.l + (i / (points.length - 1)) * (w - pad.l - pad.r);
    const toY = (v: number) => pad.t + (1 - (v - minV) / (maxV - minV)) * (h - pad.t - pad.b);

    const pathD = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ');
    const months = [
        t(lang, 's4.powerTitles.chart.months.0'),
        t(lang, 's4.powerTitles.chart.months.1'),
        t(lang, 's4.powerTitles.chart.months.2'),
        t(lang, 's4.powerTitles.chart.months.3'),
        t(lang, 's4.powerTitles.chart.months.4'),
        t(lang, 's4.powerTitles.chart.months.5'),
        t(lang, 's4.powerTitles.chart.months.6'),
        t(lang, 's4.powerTitles.chart.months.7'),
    ];

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-3">
            <div className="space-y-1">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{t(lang, 's4.powerTitles.chart.headlineLabel')}</p>
                {highlighted ? (
                    <p className="text-[14px] font-bold text-stone-900 leading-snug">
                        {t(lang, 's4.powerTitles.chart.poweredTitle')}
                    </p>
                ) : (
                    <p className="text-[14px] text-stone-400 leading-snug">{t(lang, 's4.powerTitles.chart.descTitle')}</p>
                )}
            </div>
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: 140 }}>
                {/* Y gridlines */}
                {[220, 280, 340].map(v => (
                    <line key={v} x1={pad.l} x2={w - pad.r} y1={toY(v)} y2={toY(v)} stroke="#f5f5f4" strokeWidth={1} />
                ))}
                {/* Line */}
                <path d={pathD} fill="none" stroke={highlighted ? '#dc2626' : '#d6d3d1'} strokeWidth={2} strokeLinejoin="round" />
                {/* Dots */}
                {points.map((v, i) => (
                    <circle key={i} cx={toX(i)} cy={toY(v)} r={3} fill={highlighted ? '#dc2626' : '#d6d3d1'} />
                ))}
                {/* Drop annotation when highlighted */}
                {highlighted && (
                    <>
                        <line x1={toX(0)} x2={toX(0)} y1={toY(320)} y2={toY(242)} stroke="#dc2626" strokeWidth={1} strokeDasharray="3 3" />
                        <text x={toX(0) + 4} y={toY(280)} fill="#dc2626" fontSize={9}>−24%</text>
                    </>
                )}
                {/* X labels */}
                {months.map((m, i) => (
                    <text key={m} x={toX(i)} y={h - 6} textAnchor="middle" fill="#a8a29e" fontSize={9}>{m}</text>
                ))}
            </svg>
            <div className="flex items-center gap-3 pt-1">
                <span className="text-[12px] text-stone-400 font-medium">{t(lang, 's4.powerTitles.chart.labelDesc')}</span>
                <button
                    onClick={() => { }}
                    className="flex items-center gap-2 text-[12px] font-semibold text-stone-600"
                >
                </button>
            </div>
        </div>
    );
}

export default function PowerTitlesLesson() {
    const { lang } = useLang();
    const [powered, setPowered] = useState(false);

    const crossRefs = [
        { sectionId: 'storytelling', slug: 'slide-structure', label: t(lang, 's4.powerTitles.crossRefs.0.label') },
        { sectionId: 'lab', slug: 'annotation-trend', label: t(lang, 's4.powerTitles.crossRefs.1.label') },
    ];

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    {t(lang, 's4.powerTitles.intro1')}
                </p>

                <TheoryBlock
                    title="Why Titles Are Your Most Valuable Real Estate"
                    theory="Miller's Law of Working Memory + The Inverted Pyramid"
                    explanation="Working memory holds 7 items (±2). A descriptive title like 'Q3 Revenue' burns one slot on a label that adds nothing. A Power Title uses that same slot to deliver the insight — freeing the rest of working memory to engage with the implications rather than decode the chart."
                />

                <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{t(lang, 's4.powerTitles.toggleLabelTitle')}</p>
                        <button
                            onClick={() => setPowered(v => !v)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${powered ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'}`}
                        >
                            {powered ? t(lang, 's4.powerTitles.btnPowerOn') : t(lang, 's4.powerTitles.btnDescriptive')}
                        </button>
                    </div>
                    <RevenueTrendChart highlighted={powered} />
                    {powered && (
                        <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                            <p className="text-[12px] text-stone-600 leading-relaxed">
                                {t(lang, 's4.powerTitles.toggleDesc')}
                            </p>
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <h3 className="text-base font-bold text-stone-800">{t(lang, 's4.powerTitles.rewriteTitle')}</h3>
                    <div className="rounded-xl border border-stone-200 overflow-hidden">
                        <div className="grid grid-cols-2 bg-stone-50 border-b border-stone-200">
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-5 py-3">{t(lang, 's4.powerTitles.labels.descriptive')}</p>
                            <p className="text-[10px] font-bold text-stone-800 uppercase tracking-wider px-5 py-3">{t(lang, 's4.powerTitles.labels.powerTitle')}</p>
                        </div>
                        {[0, 1, 2, 3].map((i) => {
                            const d = t(lang, `s4.powerTitles.examples.${i}.d`);
                            const p = t(lang, `s4.powerTitles.examples.${i}.p`);
                            return (
                                <div key={i} className="grid grid-cols-2 border-b border-stone-100 last:border-0">
                                    <p className="text-[12px] text-stone-400 px-5 py-3 leading-relaxed italic border-r border-stone-100">{d}</p>
                                    <p className="text-[12px] text-stone-700 px-5 py-3 leading-relaxed">{p}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
