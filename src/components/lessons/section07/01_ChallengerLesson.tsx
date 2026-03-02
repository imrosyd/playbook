import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = (lang: any) => [
    { sectionId: 'lab', slug: 'axis-scale', label: t(lang, 's7.challenger.crossRefs.0.label') },
    { sectionId: 'ethics', slug: 'distortion', label: t(lang, 's7.challenger.crossRefs.1.label') },
];

// Scatter plot: temperature vs O-ring damage — the chart that should have existed
function TufteChallengerChart({ lang }: { lang: any }) {
    const launches = [
        { temp: 66, damage: 0 }, { temp: 67, damage: 0 }, { temp: 67, damage: 0 },
        { temp: 67, damage: 0 }, { temp: 68, damage: 0 }, { temp: 68, damage: 0 },
        { temp: 69, damage: 0 }, { temp: 70, damage: 0 }, { temp: 72, damage: 0 },
        { temp: 73, damage: 0 }, { temp: 75, damage: 0 }, { temp: 75, damage: 2 },
        { temp: 76, damage: 0 }, { temp: 76, damage: 0 }, { temp: 78, damage: 0 },
        { temp: 79, damage: 0 }, { temp: 80, damage: 0 }, { temp: 81, damage: 0 },
        { temp: 70, damage: 1 }, { temp: 57, damage: 3 }, { temp: 63, damage: 1 },
        { temp: 70, damage: 1 }, { temp: 78, damage: 1 },
    ];

    // Extra bottom padding so the "Launch day" label fits below the x-axis
    const w = 360, h = 180, pad = { l: 40, r: 20, t: 18, b: 46 };
    const minT = 50, maxT = 85;
    const maxD = 4;

    const toX = (t: number) => pad.l + ((t - minT) / (maxT - minT)) * (w - pad.l - pad.r);
    const toY = (d: number) => pad.t + (1 - d / maxD) * (h - pad.t - pad.b);
    const axisY = h - pad.b;

    // Dashed line x position (where 26°F would be — off chart, clipped to left edge)
    const launchX = pad.l + 6;

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                {t(lang, 's7.challenger.chart.title')}
            </p>
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
                {/* Gridlines */}
                {[0, 1, 2, 3, 4].map(d => (
                    <line key={d} x1={pad.l} x2={w - pad.r} y1={toY(d)} y2={toY(d)} stroke="#f5f5f4" strokeWidth={1} />
                ))}

                {/* Danger zone — red shaded area */}
                <rect x={pad.l} y={pad.t} width={toX(60) - pad.l} height={axisY - pad.t} fill="#fee2e2" opacity={0.5} />

                {/* "Danger zone" label — top-left inside zone */}
                <text x={pad.l + 5} y={pad.t + 14} fill="#dc2626" fontSize={8}>{t(lang, 's7.challenger.chart.dangerZone')}</text>

                {/* Axes */}
                <line x1={pad.l} x2={pad.l} y1={pad.t} y2={axisY} stroke="#e7e5e4" strokeWidth={1} />
                <line x1={pad.l} x2={w - pad.r} y1={axisY} y2={axisY} stroke="#e7e5e4" strokeWidth={1} />

                {/* Data dots */}
                {launches.map((l, i) => (
                    <circle key={i} cx={toX(l.temp)} cy={toY(l.damage)} r={4}
                        fill={l.damage > 0 ? '#dc2626' : '#d6d3d1'}
                        stroke={l.damage > 0 ? '#dc2626' : '#a8a29e'}
                        strokeWidth={1}
                        opacity={0.85}
                    />
                ))}

                {/* Dashed vertical line — Challenger launch day position */}
                <line x1={launchX} x2={launchX}
                    y1={pad.t} y2={axisY + 24}
                    stroke="#dc2626" strokeWidth={1.5} strokeDasharray="3 2" />

                {/* "Launch day: 26°F" label — below x-axis, next to the dashed line */}
                <text x={launchX + 5} y={axisY + 16} fill="#dc2626" fontSize={8}>
                    {t(lang, 's7.challenger.chart.launchDay')}
                </text>

                {/* Trend annotation — bottom-right, just above zero line */}
                <text x={w - pad.r - 2} y={toY(0) - 8}
                    fill="#a8a29e" fontSize={8} textAnchor="end">
                    {t(lang, 's7.challenger.chart.trendAnnotation')}
                </text>

                {/* Y axis labels */}
                {[0, 1, 2, 3, 4].map(d => (
                    <text key={d} x={pad.l - 4} y={toY(d) + 3} fill="#a8a29e" fontSize={8} textAnchor="end">{d}</text>
                ))}
                <text x={8} y={h / 2} fill="#a8a29e" fontSize={8} textAnchor="middle"
                    transform={`rotate(-90, 8, ${h / 2})`}>{t(lang, 's7.challenger.chart.yAxis')}</text>

                {/* X axis labels */}
                {[55, 65, 75, 85].map(t => (
                    <text key={t} x={toX(t)} y={axisY + 14} fill="#a8a29e" fontSize={8} textAnchor="middle">{t}°F</text>
                ))}
            </svg>
            <div className="flex items-center gap-4 mt-1 text-[11px] text-stone-400">
                <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-300 inline-block" /> {t(lang, 's7.challenger.chart.legend.noDamage')}
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" /> {t(lang, 's7.challenger.chart.legend.damage')}
                </span>
            </div>
        </div>
    );
}

export default function ChallengerLesson() {
    const { lang } = useLang();
    return (
        <LessonPage crossRefs={crossRefs(lang)}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's7.challenger.intro1') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's7.challenger.intro2') }} />

                <TheoryBlock
                    title={t(lang, 's7.challenger.theory.title')}
                    theory={t(lang, 's7.challenger.theory.subtitle')}
                    explanation={t(lang, 's7.challenger.theory.explanation')}
                />

                <TufteChallengerChart lang={lang} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-3">{t(lang, 's7.challenger.wrongChart.title')}</p>
                        <ul className="space-y-2 text-[13px] text-stone-600">
                            {[0, 1, 2].map((i) => (
                                <li key={i} className="flex gap-2 leading-relaxed"><span className="shrink-0 text-stone-300 font-bold">—</span><span>{t(lang, `s7.challenger.wrongChart.items.${i}`)}</span></li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white border border-stone-200 rounded-xl p-5">
                        <p className="text-[10px] font-bold text-stone-800 uppercase tracking-wider mb-3">{t(lang, 's7.challenger.rightChart.title')}</p>
                        <ul className="space-y-2 text-[13px] text-stone-700">
                            {[0, 1, 2].map((i) => (
                                <li key={i} className="flex gap-2 leading-relaxed"><span className="shrink-0 text-stone-400 font-bold">—</span><span>{t(lang, `s7.challenger.rightChart.items.${i}`)}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="bg-stone-800 rounded-xl p-5 text-white space-y-3">
                    <p className="text-sm font-bold text-amber-400">{t(lang, 's7.challenger.takeaway.title')}</p>
                    <p className="text-[14px] text-stone-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's7.challenger.takeaway.desc') }} />
                </div>
            </div>
        </LessonPage>
    );
}
