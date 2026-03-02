import { useState } from 'react';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = (lang: any) => [
    { sectionId: 'storytelling', slug: 'power-titles', label: t(lang, 's7.boardroom.crossRefs.0.label') },
    { sectionId: 'storytelling', slug: 'so-what', label: t(lang, 's7.boardroom.crossRefs.1.label') },
];

// Before / after dumbbell chart
function DumbbellChart({ lang }: { lang: any }) {
    const items = [
        { metric: t(lang, 's7.boardroom.chart.metrics.0'), before: 2.1, after: 4.8, unit: '$M', good: true },
        { metric: t(lang, 's7.boardroom.chart.metrics.1'), before: 36, after: 18, unit: ' mo', good: false }, // lower is better
        { metric: t(lang, 's7.boardroom.chart.metrics.2'), before: 3, after: 9, unit: '%', good: true },
        { metric: t(lang, 's7.boardroom.chart.metrics.3'), before: 420, after: 210, unit: '$', good: false },
    ];

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">
                {t(lang, 's7.boardroom.chart.title')}
            </p>
            <div className="space-y-5">
                {items.map(d => {
                    const maxV = Math.max(d.before, d.after) * 1.2;
                    const bPct = (d.before / maxV) * 100;
                    const aPct = (d.after / maxV) * 100;
                    const isImprovement = d.good ? d.after > d.before : d.after < d.before;

                    return (
                        <div key={d.metric}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[12px] font-medium text-stone-600">{d.metric}</span>
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isImprovement ? 'bg-stone-100 text-stone-700' : 'bg-stone-100 text-stone-700'}`}>
                                    {isImprovement ? '+' : ''}
                                    {d.good
                                        ? `${Math.round(((d.after - d.before) / d.before) * 100)}%`
                                        : `−${Math.round(((d.before - d.after) / d.before) * 100)}%`}
                                </span>
                            </div>
                            <div className="relative h-5 bg-stone-50 rounded-full overflow-hidden">
                                {/* Before marker */}
                                <div className="absolute top-0 bottom-0 flex items-center" style={{ left: `${Math.min(bPct, aPct)}%`, width: `${Math.abs(aPct - bPct)}%` }}>
                                    <div className="w-full h-2 bg-stone-200 rounded-full" />
                                </div>
                                {/* Before dot */}
                                <div className="absolute top-1/2 w-3 h-3 bg-stone-400 rounded-full border-2 border-white -translate-y-1/2" style={{ left: `calc(${bPct}% - 6px)` }} />
                                {/* After dot */}
                                <div className="absolute top-1/2 w-3 h-3 bg-stone-900 rounded-full border-2 border-white -translate-y-1/2" style={{ left: `calc(${aPct}% - 6px)` }} />
                            </div>
                            <div className="flex items-center justify-between mt-1 text-[10px] text-stone-400">
                                <span>{t(lang, 's7.boardroom.chart.before')}: {d.before}{d.unit}</span>
                                <span>{t(lang, 's7.boardroom.chart.after')}: <strong className="text-stone-700">{d.after}{d.unit}</strong></span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex items-center gap-4 mt-3 text-[10px] text-stone-400">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-stone-400 inline-block" /> {t(lang, 's7.boardroom.chart.legend.initial')}</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-stone-900 inline-block" /> {t(lang, 's7.boardroom.chart.legend.restated')}</span>
            </div>
        </div>
    );
}

// Purple Cow vs Standard chart
function PurpleCowDemo({ lang }: { lang: any }) {
    const [radial, setRadial] = useState(false);

    const data = [
        { label: t(lang, 's7.boardroom.purpleCow.labels.0'), val: 85, color: '#6366f1' },
        { label: t(lang, 's7.boardroom.purpleCow.labels.1'), val: 60, color: '#8b5cf6' },
        { label: t(lang, 's7.boardroom.purpleCow.labels.2'), val: 45, color: '#a855f7' },
        { label: t(lang, 's7.boardroom.purpleCow.labels.3'), val: 25, color: '#d946ef' },
        { label: t(lang, 's7.boardroom.purpleCow.labels.4'), val: 15, color: '#ec4899' },
    ];

    const w = 400, h = 300;

    // Standard Bar Chart Math
    const pad = { t: 40, b: 40, l: 60, r: 20 };
    const barWInner = w - pad.l - pad.r;
    const barHInner = h - pad.t - pad.b;
    const barW = barWInner / data.length * 0.7;
    const gap = barWInner / data.length * 0.3;
    const maxVal = 100;
    const scaleY = (v: number) => pad.t + (1 - v / maxVal) * barHInner;

    // Radial Math
    const cx = w / 2;
    const cy = h / 2;
    const rMax = Math.min(cx, cy) - 40;
    const rMin = 30;

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5 mt-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[13px] font-bold text-stone-700 tracking-wide uppercase">
                    {t(lang, 's7.boardroom.purpleCow.title')}
                </h3>
                <button
                    onClick={() => setRadial(!radial)}
                    className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-colors ${radial ? 'bg-fuchsia-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                >
                    {radial ? t(lang, 's7.boardroom.purpleCow.btnStandard') : t(lang, 's7.boardroom.purpleCow.btnRadial')}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 w-full bg-[#0a0a0a] rounded-xl overflow-hidden shadow-inner flex justify-center items-center h-[300px]">
                    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full max-h-[300px] overflow-visible">
                        {!radial ? (
                            // Standard Bar Chart (Dark mode)
                            <g className="transition-opacity duration-500">
                                <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#333" strokeWidth={1} />
                                {[0, 50, 100].map(v => (
                                    <text key={v} x={pad.l - 10} y={scaleY(v)} fill="#666" fontSize={10} textAnchor="end" dominantBaseline="middle">{v}</text>
                                ))}
                                {data.map((d, i) => {
                                    const x = pad.l + i * (barWInner / data.length) + gap / 2;
                                    const y = scaleY(d.val);
                                    return (
                                        <g key={d.label}>
                                            <rect x={x} y={y} width={barW} height={h - pad.b - y} fill={d.color} opacity={0.8} />
                                            <text x={x + barW / 2} y={y - 5} fill="#fff" fontSize={10} textAnchor="middle">{d.val}</text>
                                            <text x={x + barW / 2} y={h - pad.b + 15} fill="#999" fontSize={9} textAnchor="middle" transform={`rotate(-30, ${x + barW / 2}, ${h - pad.b + 15})`}>{d.label}</text>
                                        </g>
                                    )
                                })}
                            </g>
                        ) : (
                            // Radial Nightingale Rose Chart
                            <g className="transition-opacity duration-500" transform={`translate(${cx}, ${cy}) rotate(-90)`}>
                                {/* Background guide circles */}
                                {[25, 50, 75, 100].map(v => {
                                    const r = rMin + (v / 100) * (rMax - rMin);
                                    return <circle key={v} r={r} fill="none" stroke="#222" strokeWidth={1} strokeDasharray="2,4" />
                                })}
                                {/* Segments */}
                                {data.map((d, i) => {
                                    const startAngle = (i / data.length) * Math.PI * 2;
                                    const endAngle = ((i + 1) / data.length) * Math.PI * 2;
                                    const r = rMin + (d.val / 100) * (rMax - rMin);
                                    const x1 = Math.cos(startAngle) * r;
                                    const y1 = Math.sin(startAngle) * r;
                                    const x2 = Math.cos(endAngle) * r;
                                    const y2 = Math.sin(endAngle) * r;

                                    const innerX1 = Math.cos(startAngle) * rMin;
                                    const innerY1 = Math.sin(startAngle) * rMin;
                                    const innerX2 = Math.cos(endAngle) * rMin;
                                    const innerY2 = Math.sin(endAngle) * rMin;

                                    const path = `M ${innerX1} ${innerY1} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} L ${innerX2} ${innerY2} A ${rMin} ${rMin} 0 0 0 ${innerX1} ${innerY1} Z`;

                                    // Mid point for labels
                                    const midAngle = startAngle + (endAngle - startAngle) / 2;
                                    const textR = r + 15;
                                    const textX = Math.cos(midAngle) * textR;
                                    const textY = Math.sin(midAngle) * textR;
                                    // rotate text so it's readable
                                    let deg = (midAngle * 180 / Math.PI) + 90;
                                    if (deg > 90 && deg < 270) deg += 180;

                                    return (
                                        <g key={d.label}>
                                            <path d={path} fill={d.color} opacity={0.8} stroke="#0a0a0a" strokeWidth={2} />
                                            <text
                                                x={textX}
                                                y={textY}
                                                fill="#ccc"
                                                fontSize={10}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                transform={`rotate(${deg}, ${textX}, ${textY}) rotate(90, ${textX}, ${textY})`}
                                            >
                                                {d.label}
                                            </text>
                                        </g>
                                    )
                                })}
                            </g>
                        )}
                    </svg>
                </div>
                <div className="flex-1">
                    <div className="bg-stone-50 rounded-lg p-5 border border-stone-100">
                        <h4 className="text-[14px] font-bold text-stone-800 mb-2">
                            {radial ? t(lang, 's7.boardroom.purpleCow.descRadial.title') : t(lang, 's7.boardroom.purpleCow.descStandard.title')}
                        </h4>
                        <p className="text-[13px] text-stone-600 leading-relaxed">
                            {radial ?
                                t(lang, 's7.boardroom.purpleCow.descRadial.body') :
                                t(lang, 's7.boardroom.purpleCow.descStandard.body')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BoardroomTurnaroundLesson() {
    const { lang } = useLang();
    return (
        <LessonPage crossRefs={crossRefs(lang)}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's7.boardroom.intro') }} />

                <TheoryBlock
                    title={t(lang, 's7.boardroom.theory.title')}
                    theory={t(lang, 's7.boardroom.theory.subtitle')}
                    explanation={t(lang, 's7.boardroom.theory.explanation')}
                />

                <DumbbellChart lang={lang} />

                <div className="space-y-3">
                    <h3 className="text-base font-bold text-stone-800">{t(lang, 's7.boardroom.changes.title')}</h3>
                    <div className="rounded-xl border border-stone-200 overflow-hidden">
                        <div className="grid grid-cols-2 bg-stone-50 border-b border-stone-200">
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-5 py-3">{t(lang, 's7.boardroom.changes.col1')}</p>
                            <p className="text-[10px] font-bold text-stone-800 uppercase tracking-wider px-5 py-3">{t(lang, 's7.boardroom.changes.col2')}</p>
                        </div>
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="grid grid-cols-2 border-b border-stone-100 last:border-0">
                                <p className="text-[12px] text-stone-400 px-5 py-3 leading-relaxed italic border-r border-stone-100">{t(lang, `s7.boardroom.changes.items.${i}.v1`)}</p>
                                <p className="text-[12px] text-stone-700 px-5 py-3 leading-relaxed">{t(lang, `s7.boardroom.changes.items.${i}.v2`)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-stone-800 rounded-xl p-5 text-white">
                    <p className="text-sm font-bold text-amber-400 mb-2">{t(lang, 's7.boardroom.takeaway.title')}</p>
                    <p className="text-[14px] text-stone-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's7.boardroom.takeaway.desc') }} />
                </div>

                <PurpleCowDemo lang={lang} />
            </div>
        </LessonPage>
    );
}
