import { useState } from 'react';
import LessonPage from '../../../components/layout/LessonPage';
import ChartFrame from '../../../components/ui/ChartFrame';
import { SECTION_COLORS } from '../../../lib/design-tokens';
import { Lightbulb, Info } from 'lucide-react';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';

const sectionColor = SECTION_COLORS['02'].base;

const crossRefs = [
    { sectionId: 'mechanics', slug: 'distribution', label: '2.3 — Histogram vs Boxplot fundamentals' },
];

function RidgelineDemo({ lang }: { lang: any }) {
    const [isRidge, setIsRidge] = useState(false);
    const w = 480, h = 220, pad = { t: 16, r: 20, b: 32, l: 60 };
    // Realistic context: Delivery times across 3 different shipping methods
    const lines = [
        { label: t(lang, 's2.distributionTechniques.demos.ridgeline.labels.0'), color: '#3b82f6', d: 'M0 40 C 10 40, 25 5, 45 2, 65 5, 80 40, 100 40', pk: 45 },
        { label: t(lang, 's2.distributionTechniques.demos.ridgeline.labels.1'), color: '#10b981', d: 'M0 40 C 5 40, 15 5, 25 2, 35 5, 50 40, 100 40', pk: 25 },
        { label: t(lang, 's2.distributionTechniques.demos.ridgeline.labels.2'), color: '#8b5cf6', d: 'M0 40 C 0 40, 5 5, 10 2, 15 5, 30 40, 100 40', pk: 10 }
    ];
    // Sort visually by peak (fastest to slowest)
    lines.sort((a, b) => a.pk - b.pk);

    return (
        <div className="space-y-4 mb-16">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-stone-900">{t(lang, 's2.distributionTechniques.demos.ridgeline.title')}</h3>
                </div>
                <button
                    onClick={() => setIsRidge(!isRidge)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${isRidge
                        ? 'bg-stone-900 text-white shadow-stone-200'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:shadow-md'
                        }`}
                >
                    {isRidge ? t(lang, 's2.distributionTechniques.demos.ridgeline.btnHide') : t(lang, 's2.distributionTechniques.demos.ridgeline.btnShow')}
                </button>
            </div>

            <ChartFrame
                label={t(lang, 's2.distributionTechniques.demos.ridgeline.chartLabel')}
                note={isRidge ? t(lang, 's2.distributionTechniques.demos.ridgeline.noteShow') : t(lang, 's2.distributionTechniques.demos.ridgeline.noteHide')}
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block overflow-visible">
                    {/* X-axis */}
                    <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#a8a29e" strokeWidth={1} />

                    {/* Gridlines */}
                    {[0, 20, 40, 60, 80, 100].map(val => {
                        const vx = pad.l + (val / 100) * (w - pad.l - pad.r);
                        return (
                            <g key={val}>
                                <line x1={vx} x2={vx} y1={pad.t} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />
                                <text x={vx} y={h - pad.b + 14} fill="#a8a29e" fontSize="9" textAnchor="middle">{val}</text>
                            </g>
                        );
                    })}

                    {lines.map((l, i) => {
                        const yOffset = isRidge ? pad.t + i * 45 : pad.t + 65;
                        return (
                            <g key={i} style={{ transform: `translate(${pad.l}px, ${yOffset}px) scale(${(w - pad.l - pad.r) / 100}, 1.5)`, transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                                <path d={l.d} fill={l.color} opacity={0.6} stroke={l.color} strokeWidth={1} style={{ mixBlendMode: 'multiply' }} />
                                <text x="-5" y="36" fontSize="7" fill="#475569" textAnchor="end" style={{ opacity: isRidge ? 1 : (i === 0 ? 1 : 0), transition: 'opacity 0.4s' }}>{l.label}</text>
                            </g>
                        )
                    })}
                </svg>
            </ChartFrame>
        </div>
    );
}

function BoxPlotToggleDemo({ lang }: { lang: any }) {
    const [isBox, setIsBox] = useState(false);
    const w = 480, h = 180, pad = { t: 16, r: 20, b: 32, l: 30 };

    // Realistic data: Base salary estimates (in $k)
    // Most cluster around 60-90k, with some executive outliers
    const dots = [45, 50, 52, 58, 60, 62, 65, 68, 70, 72, 75, 78, 80, 85, 90, 95, 140, 180, 210];
    const max = 250;
    const scaleX = (v: number) => pad.l + (v / max) * (w - pad.l - pad.r);

    // Box plot stats
    const q1 = 60, median = 72, q3 = 85, minWhisk = 45, maxWhisk = 120; // 1.5 IQR ends roughly at 120

    return (
        <div className="space-y-4 mb-16">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-stone-900">{t(lang, 's2.distributionTechniques.demos.boxPlotToggle.title')}</h3>
                    <p className="text-[13px] text-stone-500 max-w-md">{t(lang, 's2.distributionTechniques.demos.boxPlotToggle.desc')}</p>
                </div>
                <button
                    onClick={() => setIsBox(!isBox)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${isBox
                        ? 'bg-stone-900 text-white shadow-stone-200'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:shadow-md'
                        }`}
                >
                    {isBox ? t(lang, 's2.distributionTechniques.demos.boxPlotToggle.btnShow') : t(lang, 's2.distributionTechniques.demos.boxPlotToggle.btnHide')}
                </button>
            </div>
            <ChartFrame
                label={t(lang, 's2.distributionTechniques.demos.boxPlotToggle.chartLabel')}
                note={isBox ? t(lang, 's2.distributionTechniques.demos.boxPlotToggle.noteShow') : t(lang, 's2.distributionTechniques.demos.boxPlotToggle.noteHide')}
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
                    {/* X-axis */}
                    <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#a8a29e" strokeWidth={1} />

                    {/* Gridlines */}
                    {[0, 50, 100, 150, 200, 250].map(val => (
                        <g key={val}>
                            <line x1={scaleX(val)} x2={scaleX(val)} y1={pad.t} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />
                            <text x={scaleX(val)} y={h - pad.b + 14} fill="#a8a29e" fontSize="9" textAnchor="middle">${val}k</text>
                        </g>
                    ))}

                    <line x1={pad.l} x2={w - pad.r} y1={pad.t + (h - pad.t - pad.b) / 2} y2={pad.t + (h - pad.t - pad.b) / 2} stroke="#e7e5e4" />

                    {!isBox && dots.map((d, i) => (
                        <circle key={i} cx={scaleX(d)} cy={pad.t + (h - pad.t - pad.b) / 2 + (i % 3 - 1) * 6} r={3} fill="#6366f1" opacity={0.6} stroke="white" strokeWidth={1} />
                    ))}

                    {isBox && (
                        <g>
                            <line x1={scaleX(minWhisk)} x2={scaleX(maxWhisk)} y1={pad.t + (h - pad.t - pad.b) / 2} y2={pad.t + (h - pad.t - pad.b) / 2} stroke="#334155" strokeWidth={2} />
                            <rect x={scaleX(q1)} y={pad.t + (h - pad.t - pad.b) / 2 - 15} width={scaleX(q3) - scaleX(q1)} height={30} fill="#cbd5e1" stroke="#334155" strokeWidth={2} />
                            <line x1={scaleX(median)} x2={scaleX(median)} y1={pad.t + (h - pad.t - pad.b) / 2 - 15} y2={pad.t + (h - pad.t - pad.b) / 2 + 15} stroke="#334155" strokeWidth={3} />
                            <line x1={scaleX(minWhisk)} x2={scaleX(minWhisk)} y1={pad.t + (h - pad.t - pad.b) / 2 - 10} y2={pad.t + (h - pad.t - pad.b) / 2 + 10} stroke="#334155" strokeWidth={2} />
                            <line x1={scaleX(maxWhisk)} x2={scaleX(maxWhisk)} y1={pad.t + (h - pad.t - pad.b) / 2 - 10} y2={pad.t + (h - pad.t - pad.b) / 2 + 10} stroke="#334155" strokeWidth={2} />

                            {/* Outliers */}
                            {dots.filter(d => d > maxWhisk).map((d, i) => (
                                <circle key={i} cx={scaleX(d)} cy={pad.t + (h - pad.t - pad.b) / 2} r={3.5} fill="#ef4444" stroke="white" strokeWidth={1} />
                            ))}
                        </g>
                    )}
                </svg>
            </ChartFrame>
        </div>
    );
}

function BeeswarmDemo({ lang }: { lang: any }) {
    const [isSwarm, setIsSwarm] = useState(false);
    const w = 480, h = 180, pad = { t: 16, r: 20, b: 32, l: 30 };
    // Simulated beeswarm distribution for "Customer Age"
    const points = [
        { x: 18, y: 0 }, { x: 22, y: 0 }, { x: 24, y: 6 }, { x: 24, y: -6 },
        { x: 25, y: 12 }, { x: 25, y: 0 }, { x: 25, y: -12 },
        { x: 28, y: 18 }, { x: 28, y: 6 }, { x: 28, y: -6 }, { x: 28, y: -18 },
        { x: 30, y: 24 }, { x: 30, y: 12 }, { x: 30, y: 0 }, { x: 30, y: -12 }, { x: 30, y: -24 },
        { x: 32, y: 18 }, { x: 32, y: 6 }, { x: 32, y: -6 }, { x: 32, y: -18 },
        { x: 35, y: 12 }, { x: 35, y: 0 }, { x: 35, y: -12 },
        { x: 38, y: 6 }, { x: 38, y: -6 }, { x: 42, y: 0 }, { x: 45, y: 0 }, { x: 55, y: 0 }
    ];

    const max = 60;
    const scaleX = (v: number) => pad.l + (v / max) * (w - pad.l - pad.r);

    return (
        <div className="space-y-4 mb-16">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-stone-900">{t(lang, 's2.distributionTechniques.demos.beeswarm.title')}</h3>
                </div>
                <button
                    onClick={() => setIsSwarm(!isSwarm)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${isSwarm
                        ? 'bg-stone-900 text-white shadow-stone-200'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:shadow-md'
                        }`}
                >
                    {isSwarm ? t(lang, 's2.distributionTechniques.demos.beeswarm.btnHide') : t(lang, 's2.distributionTechniques.demos.beeswarm.btnShow')}
                </button>
            </div>

            <ChartFrame
                label={t(lang, 's2.distributionTechniques.demos.beeswarm.chartLabel')}
                note={isSwarm ? t(lang, 's2.distributionTechniques.demos.beeswarm.noteShow') : t(lang, 's2.distributionTechniques.demos.beeswarm.noteHide')}
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block overflow-visible">
                    {/* X-axis */}
                    <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#a8a29e" strokeWidth={1} />

                    {/* Gridlines */}
                    {[0, 15, 30, 45, 60].map(val => (
                        <g key={val}>
                            <line x1={scaleX(val)} x2={scaleX(val)} y1={pad.t} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />
                            <text x={scaleX(val)} y={h - pad.b + 14} fill="#a8a29e" fontSize="9" textAnchor="middle">{val}</text>
                        </g>
                    ))}

                    <g transform={`translate(0, ${pad.t + (h - pad.t - pad.b) / 2})`}>
                        {points.map((p, i) => (
                            <circle key={i} cx={scaleX(p.x)} cy={isSwarm ? p.y : 0} r={4} fill="#0ea5e9" opacity={0.6} stroke="#fff" strokeWidth={0.5} style={{ transition: 'cy 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
                        ))}
                    </g>
                </svg>
            </ChartFrame>
        </div>
    );
}

function HistogramShapes({ lang }: { lang: any }) {
    const shapes = [
        { name: 'Left-skewed', path: 'M0 35 L 20 35 L 30 25 L 50 15 L 70 5 L 85 20 L 100 35', desc: 'Ceiling effects (e.g. test scores)' },
        { name: 'Right-skewed', path: 'M0 35 L 15 10 L 30 5 L 50 20 L 70 28 L 85 32 L 100 35', desc: 'Floor effects (e.g. income)' },
        { name: 'Bimodal', path: 'M0 35 L 15 10 L 25 5 L 40 25 L 50 30 L 60 25 L 75 5 L 85 10 L 100 35', desc: 'Two distinct groups mixed' },
        { name: 'Bell Curve', path: 'M0 35 L 20 30 L 35 15 L 50 5 L 65 15 L 80 30 L 100 35', desc: 'Normal distribution' },
        { name: 'Uniform', path: 'M0 35 L 10 10 L 90 10 L 100 35', desc: 'Equal probability' },
        { name: 'Multimodal', path: 'M0 35 L 10 15 L 20 10 L 40 30 L 50 20 L 60 20 L 80 5 L 90 15 L 100 35', desc: 'Complex mixed phenomena' }
    ];

    return (
        <div className="space-y-4 mb-16">
            <h3 className="text-xl font-bold text-stone-900">{t(lang, 's2.distributionTechniques.demos.histogramShapes.title')}</h3>
            <ChartFrame
                label={t(lang, 's2.distributionTechniques.demos.histogramShapes.chartLabel')}
                note={t(lang, 's2.distributionTechniques.demos.histogramShapes.note')}
            >
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                    {shapes.map(s => (
                        <div key={s.name} className="flex flex-col bg-stone-50 p-4 border border-stone-200 rounded-xl shadow-sm justify-between">
                            <svg viewBox="-5 -5 110 50" className="w-full block mb-3">
                                {/* Grid/Axes */}
                                <line x1="0" x2="100" y1="40" y2="40" stroke="#a8a29e" strokeWidth={0.5} />
                                <line x1="50" x2="50" y1="0" y2="40" stroke="#e7e5e4" strokeWidth={0.5} strokeDasharray="2 2" />

                                {/* KDE curve overlay instead of raw bars for neatness */}
                                <path d={s.path} fill="#bae6fd" opacity={0.6} stroke="#0284c7" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="text-center mt-auto pt-2">
                                <span className="text-[12px] font-bold text-stone-800 block mb-1">{s.name}</span>
                                <span className="text-[11px] text-stone-500 leading-tight block">{s.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </ChartFrame>
        </div>
    );
}

function KdeButterflyBox({ lang }: { lang: any }) {
    return (
        <div className="space-y-4 mb-16">
            <h3 className="text-xl font-bold text-stone-900">{t(lang, 's2.distributionTechniques.demos.kdeButterflyBox.title')}</h3>
            <ChartFrame
                label={t(lang, 's2.distributionTechniques.demos.kdeButterflyBox.chartLabel')}
                note={t(lang, 's2.distributionTechniques.demos.kdeButterflyBox.note')}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">

                    {/* KDE Overlap */}
                    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[12px] font-bold text-stone-800 uppercase tracking-wider">{t(lang, 's2.distributionTechniques.demos.kdeButterflyBox.items.0.title')}</span>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-1 text-[10px] font-bold text-stone-500"><div className="w-2 h-2 rounded-full bg-blue-500"></div>{t(lang, 's2.distributionTechniques.demos.kdeButterflyBox.items.0.groupA')}</span>
                                <span className="flex items-center gap-1 text-[10px] font-bold text-stone-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>{t(lang, 's2.distributionTechniques.demos.kdeButterflyBox.items.0.groupB')}</span>
                            </div>
                        </div>
                        <svg viewBox="-10 -10 120 60" className="w-full block pt-2">
                            <line x1="0" x2="100" y1="40" y2="40" stroke="#e7e5e4" strokeWidth={0.5} />
                            <path d="M0 40 C 20 40, 30 10, 40 10, 60 40, 80 40" fill="#3b82f6" opacity={0.6} />
                            <path d="M20 40 C 40 40, 50 5, 60 5, 80 40, 100 40" fill="#10b981" opacity={0.6} />
                        </svg>
                        <p className="text-[12px] text-stone-600 mt-3 leading-tight">{t(lang, 's2.distributionTechniques.demos.kdeButterflyBox.items.0.desc')}</p>
                    </div>

                    {/* Butterfly Chart */}
                    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[12px] font-bold text-stone-800 uppercase tracking-wider">{t(lang, 's2.distributionTechniques.demos.kdeButterflyBox.items.1.title')}</span>
                        </div>
                        <svg viewBox="-10 -5 120 55" className="w-full block pt-2">
                            <line x1="50" x2="50" y1="0" y2="45" stroke="#a8a29e" strokeWidth={0.5} />

                            {/* Group A (Left) */}
                            <rect x="30" y="5" width="20" height="6" fill="#3b82f6" opacity={0.9} />
                            <rect x="10" y="15" width="40" height="6" fill="#3b82f6" opacity={0.9} />
                            <rect x="25" y="25" width="25" height="6" fill="#3b82f6" opacity={0.9} />
                            <rect x="40" y="35" width="10" height="6" fill="#3b82f6" opacity={0.9} />

                            {/* Group B (Right) */}
                            <rect x="50" y="5" width="15" height="6" fill="#10b981" opacity={0.9} />
                            <rect x="50" y="15" width="35" height="6" fill="#10b981" opacity={0.9} />
                            <rect x="50" y="25" width="45" height="6" fill="#10b981" opacity={0.9} />
                            <rect x="50" y="35" width="20" height="6" fill="#10b981" opacity={0.9} />
                        </svg>
                        <p className="text-[12px] text-stone-600 mt-3 leading-tight">{t(lang, 's2.distributionTechniques.demos.kdeButterflyBox.items.1.desc')}</p>
                    </div>

                    {/* Box Plot Comparison */}
                    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[12px] font-bold text-stone-800 uppercase tracking-wider">{t(lang, 's2.distributionTechniques.demos.kdeButterflyBox.items.2.title')}</span>
                        </div>
                        <svg viewBox="-10 -10 120 60" className="w-full block pt-2">
                            {/* X-axis */}
                            <line x1="0" x2="100" y1="40" y2="40" stroke="#e7e5e4" strokeWidth={0.5} />

                            {/* Group A */}
                            <line x1="10" x2="45" y1="15" y2="15" stroke="#334155" strokeWidth={0.5} />
                            <rect x="20" y="10" width="15" height="10" fill="#3b82f6" opacity={0.6} stroke="#334155" strokeWidth={0.5} />
                            <line x1="28" x2="28" y1="10" y2="20" stroke="#334155" strokeWidth={1} />

                            {/* Group B */}
                            <line x1="30" x2="80" y1="30" y2="30" stroke="#334155" strokeWidth={0.5} />
                            <rect x="50" y="25" width="20" height="10" fill="#10b981" opacity={0.6} stroke="#334155" strokeWidth={0.5} />
                            <line x1="60" x2="60" y1="25" y2="35" stroke="#334155" strokeWidth={1} />
                        </svg>
                        <p className="text-[12px] text-stone-600 mt-3 leading-tight">{t(lang, 's2.distributionTechniques.demos.kdeButterflyBox.items.2.desc')}</p>
                    </div>

                    {/* Stacked Histogram */}
                    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[12px] font-bold text-stone-800 uppercase tracking-wider">{t(lang, 's2.distributionTechniques.demos.kdeButterflyBox.items.3.title')}</span>
                        </div>
                        <svg viewBox="-10 -10 120 65" className="w-full block pt-2">
                            <line x1="0" x2="100" y1="40" y2="40" stroke="#e7e5e4" strokeWidth={0.5} />

                            <rect x="10" y="25" width="15" height="15" fill="#3b82f6" opacity={0.9} />
                            <rect x="10" y="15" width="15" height="10" fill="#10b981" opacity={0.9} />

                            <rect x="30" y="15" width="15" height="25" fill="#3b82f6" opacity={0.9} />
                            <rect x="30" y="5" width="15" height="10" fill="#10b981" opacity={0.9} />

                            <rect x="50" y="25" width="15" height="15" fill="#3b82f6" opacity={0.9} />
                            <rect x="50" y="10" width="15" height="15" fill="#10b981" opacity={0.9} />

                            <rect x="70" y="32" width="15" height="8" fill="#3b82f6" opacity={0.9} />
                            <rect x="70" y="25" width="15" height="7" fill="#10b981" opacity={0.9} />
                        </svg>
                        <p className="text-[12px] text-stone-600 mt-3 leading-tight">{t(lang, 's2.distributionTechniques.demos.kdeButterflyBox.items.3.desc')}</p>
                    </div>
                </div>
            </ChartFrame>
        </div>
    );
}

function ViolinDemo({ lang }: { lang: any }) {
    return (
        <div className="space-y-4 mb-16">
            <h3 className="text-xl font-bold text-stone-900">{t(lang, 's2.distributionTechniques.demos.violin.title')}</h3>
            <ChartFrame
                label={t(lang, 's2.distributionTechniques.demos.violin.chartLabel')}
                note={t(lang, 's2.distributionTechniques.demos.violin.note')}
            >
                <div className="flex justify-center py-4 w-full relative">
                    <svg viewBox="0 -5 100 70" className="w-full max-w-[280px] overflow-visible block">
                        {/* Axes */}
                        <line x1="0" x2="100" y1="55" y2="55" stroke="#a8a29e" strokeWidth={0.5} />
                        <line x1="20" x2="20" y1="0" y2="55" stroke="#e7e5e4" strokeWidth={0.5} strokeDasharray="1 1" />
                        <line x1="50" x2="50" y1="0" y2="55" stroke="#e7e5e4" strokeWidth={0.5} strokeDasharray="1 1" />
                        <line x1="80" x2="80" y1="0" y2="55" stroke="#e7e5e4" strokeWidth={0.5} strokeDasharray="1 1" />

                        {/* Violin Shape (Mirrored KDE) */}
                        <path d="M 50 10 C 65 20, 90 30, 50 50 C 10 30, 35 20, 50 10 Z" fill="#c4b5fd" stroke="#7c3aed" strokeWidth={1} opacity={0.8} />

                        {/* Inner Box Plot */}
                        <line x1="50" x2="50" y1="20" y2="40" stroke="#4c1d95" strokeWidth={1} />
                        <rect x="48" y="25" width="4" height="10" fill="#1e1b4b" />
                        <circle cx="50" cy="30" r="1.5" fill="white" />
                    </svg>
                </div>
            </ChartFrame>
        </div>
    );
}

export default function DistributionTechniquesLesson() {
    const { lang } = useLang();

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.distributionTechniques.intro1') }} />

                {/* Tip Block */}
                <div
                    className="rounded-xl p-5 space-y-3 border transition-all hover:shadow-sm"
                    style={{
                        backgroundColor: `${sectionColor}08`,
                        borderColor: `${sectionColor}20`,
                    }}
                >
                    <div className="flex items-start gap-3">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
                            style={{ backgroundColor: sectionColor }}
                        >
                            <Lightbulb size={16} className="text-white" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: sectionColor }}>
                                {t(lang, 's2.distributionTechniques.averageFallacy.title')}
                            </p>
                            <p className="text-[14px] text-stone-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.distributionTechniques.averageFallacy.rule') }} />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <RidgelineDemo lang={lang} />
                    <BoxPlotToggleDemo lang={lang} />
                    <BeeswarmDemo lang={lang} />
                    <HistogramShapes lang={lang} />
                    <KdeButterflyBox lang={lang} />
                    <ViolinDemo lang={lang} />
                </div>

                {/* Conclusion Block */}
                <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 space-y-4">
                    <div className="flex items-center gap-3 text-stone-900">
                        <Info size={20} className="text-stone-400" />
                        <h4 className="text-lg font-bold">{t(lang, 's2.distributionTechniques.conclusion.title')}</h4>
                    </div>
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.distributionTechniques.conclusion.text') }} />
                </div>
            </div>
        </LessonPage>
    );
}
