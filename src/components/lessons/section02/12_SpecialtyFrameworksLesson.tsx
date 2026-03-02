import { useState } from 'react';
import LessonPage from '../../../components/layout/LessonPage';
import ChartFrame from '../../../components/ui/ChartFrame';
import { SECTION_COLORS } from '../../../lib/design-tokens';
import { Lightbulb, Info } from 'lucide-react';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';

const sectionColor = SECTION_COLORS['02'].base;

const crossRefs = [
    { sectionId: 'mechanics', slug: 'comparison', label: '2.1 — Standard Comparison charts' },
];

function StandoutScatterDemo({ lang }: { lang: any }) {
    const w = 480, h = 220, pad = { t: 16, r: 20, b: 32, l: 30 };
    // Pre-seeded dots so they don't flash on re-render
    const noiseDots = [
        [12, 18], [28, 72], [55, 35], [80, 90], [105, 62], [130, 15], [160, 80], [185, 40], [210, 95], [235, 55],
        [260, 20], [285, 75], [310, 45], [335, 88], [360, 30], [395, 65], [420, 10], [445, 82], [415, 50], [370, 70],
        [340, 25], [295, 90], [270, 48], [245, 15], [220, 85], [195, 62], [170, 35], [145, 78], [120, 22], [95, 68],
        [70, 50], [45, 28], [25, 88], [350, 55], [380, 30], [300, 15], [250, 70], [200, 45], [150, 90], [100, 38],
    ];
    return (
        <div className="space-y-4 mb-16">
            <h3 className="text-xl font-bold text-stone-900">{t(lang, 's2.specialtyFrameworks.demos.standoutScatter.title')}</h3>
            <ChartFrame
                label={t(lang, 's2.specialtyFrameworks.demos.standoutScatter.chartLabel')}
                note={t(lang, 's2.specialtyFrameworks.demos.standoutScatter.note')}
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
                    {/* Axes */}
                    <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#a8a29e" strokeWidth={1} />
                    <line x1={pad.l} x2={pad.l} y1={pad.t} y2={h - pad.b} stroke="#a8a29e" strokeWidth={1} />

                    {/* Fake gridlines */}
                    {[20, 40, 60, 80].map(val => {
                        const vx = pad.l + (val / 100) * (w - pad.l - pad.r);
                        return <line key={`x-${val}`} x1={vx} x2={vx} y1={pad.t} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />;
                    })}
                    {[20, 40, 60, 80].map(val => {
                        const vy = pad.t + (val / 100) * (h - pad.t - pad.b);
                        return <line key={`y-${val}`} x1={pad.l} x2={w - pad.r} y1={vy} y2={vy} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />;
                    })}

                    {/* Gray background dots (Noise) */}
                    {noiseDots.map(([cx, cy], i) => (
                        <circle key={i} cx={pad.l + cx} cy={pad.t + cy} r="3" fill="#cbd5e1" opacity={0.6} />
                    ))}

                    {/* The standout */}
                    <circle cx={pad.l + (85 / 100) * (w - pad.l - pad.r)} cy={pad.t + (15 / 100) * (h - pad.t - pad.b)} r="6" fill="#ef4444" stroke="#fff" strokeWidth={1} className="animate-pulse" />
                    <circle cx={pad.l + (85 / 100) * (w - pad.l - pad.r)} cy={pad.t + (15 / 100) * (h - pad.t - pad.b)} r="10" fill="none" stroke="#ef4444" strokeWidth={1} opacity={0.4} />
                    <text x={pad.l + (82 / 100) * (w - pad.l - pad.r)} y={pad.t + (14 / 100) * (h - pad.t - pad.b)} fill="#ef4444" fontSize="10" textAnchor="end">{t(lang, 's2.specialtyFrameworks.demos.standoutScatter.label1')}</text>
                    <text x={pad.l + (82 / 100) * (w - pad.l - pad.r)} y={pad.t + (22 / 100) * (h - pad.t - pad.b)} fill="#7f1d1d" fontSize="8" textAnchor="end">{t(lang, 's2.specialtyFrameworks.demos.standoutScatter.label2')}</text>
                </svg>
            </ChartFrame>
        </div>
    );
}

function StripTierDemo({ lang }: { lang: any }) {
    const [isBar, setIsBar] = useState(true);
    const w = 480, h = 140, pad = { t: 16, r: 20, b: 32, l: 30 };
    // Salary context: Regional Sales Managers (K$)
    const data = [45, 48, 55, 62, 65, 75, 82, 85, 95, 110, 115, 125, 130];
    const avg = 83; // roughly

    return (
        <div className="space-y-4 mb-16">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-stone-900">{t(lang, 's2.specialtyFrameworks.demos.stripTier.title')}</h3>
                    <p className="text-[13px] text-stone-500 max-w-md">{t(lang, 's2.specialtyFrameworks.demos.stripTier.desc')}</p>
                </div>
                <button
                    onClick={() => setIsBar(!isBar)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${!isBar
                        ? 'bg-stone-900 text-white shadow-stone-200'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:shadow-md'
                        }`}
                >
                    {isBar ? t(lang, 's2.specialtyFrameworks.demos.stripTier.btnShow') : t(lang, 's2.specialtyFrameworks.demos.stripTier.btnHide')}
                </button>
            </div>
            <ChartFrame
                label={t(lang, 's2.specialtyFrameworks.demos.stripTier.chartLabel')}
                note={isBar ? t(lang, 's2.specialtyFrameworks.demos.stripTier.noteShow') : t(lang, 's2.specialtyFrameworks.demos.stripTier.noteHide')}
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
                    {/* Horizontal Axis */}
                    <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#a8a29e" strokeWidth={1} />

                    {/* Grid lines */}
                    {[0, 50, 100, 150].map(val => {
                        const x = pad.l + (val / 150) * (w - pad.l - pad.r);
                        return (
                            <g key={val}>
                                <line x1={x} x2={x} y1={pad.t} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />
                                <text x={x} y={h - pad.b + 14} fill="#a8a29e" fontSize="9" textAnchor="middle">${val}k</text>
                            </g>
                        )
                    })}

                    {isBar ? (
                        <g>
                            <rect x={pad.l} y={pad.t + 20} width={(avg / 150) * (w - pad.l - pad.r)} height="30" fill="#3b82f6" opacity={0.8} />
                            <text x={pad.l + (avg / 150) * (w - pad.l - pad.r) + 8} y={pad.t + 38} fontSize="12" fill="#1e40af">{t(lang, 's2.specialtyFrameworks.demos.stripTier.avgLabel')}: ${avg}k</text>
                        </g>
                    ) : (
                        <g>
                            {/* Background shading for tiers */}
                            <rect x={pad.l} y={pad.t} width={(65 / 150) * (w - pad.l - pad.r)} height={h - pad.t - pad.b} fill="#fecaca" opacity={0.2} />
                            <rect x={pad.l + (65 / 150) * (w - pad.l - pad.r)} y={pad.t} width={(45 / 150) * (w - pad.l - pad.r)} height={h - pad.t - pad.b} fill="#fef08a" opacity={0.2} />
                            <rect x={pad.l + (110 / 150) * (w - pad.l - pad.r)} y={pad.t} width={(40 / 150) * (w - pad.l - pad.r)} height={h - pad.t - pad.b} fill="#bbf7d0" opacity={0.2} />

                            <text x={pad.l + (32.5 / 150) * (w - pad.l - pad.r)} y={pad.t + 12} fontSize="9" fill="#ef4444" textAnchor="middle" opacity={0.7}>{t(lang, 's2.specialtyFrameworks.demos.stripTier.tiers.0')}</text>
                            <text x={pad.l + (87.5 / 150) * (w - pad.l - pad.r)} y={pad.t + 12} fontSize="9" fill="#ca8a04" textAnchor="middle" opacity={0.7}>{t(lang, 's2.specialtyFrameworks.demos.stripTier.tiers.1')}</text>
                            <text x={pad.l + (130 / 150) * (w - pad.l - pad.r)} y={pad.t + 12} fontSize="9" fill="#22c55e" textAnchor="middle" opacity={0.7}>{t(lang, 's2.specialtyFrameworks.demos.stripTier.tiers.2')}</text>

                            {data.map((d, i) => {
                                const x = pad.l + (d / 150) * (w - pad.l - pad.r);
                                const color = d <= 65 ? "#ef4444" : d <= 110 ? "#eab308" : "#22c55e";
                                return (
                                    <circle key={i} cx={x} cy={pad.t + (h - pad.t - pad.b) / 2} r="5" fill={color} stroke="#fff" strokeWidth={1} opacity={0.9} />
                                )
                            })}
                        </g>
                    )}
                </svg>
            </ChartFrame>
        </div>
    );
}

function ProgressBarsDemo({ lang }: { lang: any }) {
    const bars = [
        { label: t(lang, 's2.specialtyFrameworks.demos.progressBars.labels.0'), val: 100, achieved: 100 },
        { label: t(lang, 's2.specialtyFrameworks.demos.progressBars.labels.1'), val: 85, achieved: 85 },
        { label: t(lang, 's2.specialtyFrameworks.demos.progressBars.labels.2'), val: 62, achieved: 62 },
        { label: t(lang, 's2.specialtyFrameworks.demos.progressBars.labels.3'), val: 15, achieved: 15 },
    ];
    return (
        <div className="space-y-4 mb-16">
            <h3 className="text-xl font-bold text-stone-900">{t(lang, 's2.specialtyFrameworks.demos.progressBars.title')}</h3>
            <ChartFrame
                label={t(lang, 's2.specialtyFrameworks.demos.progressBars.chartLabel')}
                note={t(lang, 's2.specialtyFrameworks.demos.progressBars.note')}
            >
                <div className="flex justify-center p-6 w-full">
                    <div className="flex flex-col gap-6 w-full max-w-sm">
                        {bars.map(b => (
                            <div key={b.label} className="flex flex-col gap-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-[12px] font-bold text-stone-700">{b.label}</span>
                                    <span className="text-[12px] font-bold text-stone-500">{b.val}%</span>
                                </div>
                                <div className="w-full bg-stone-100 rounded-full h-4 border border-stone-200 overflow-hidden relative">
                                    <div
                                        className={`h-full rounded-r-full transition-all duration-1000 ${b.val >= 100 ? 'bg-emerald-500' :
                                            b.val >= 50 ? 'bg-blue-500' : 'bg-amber-500'
                                            }`}
                                        style={{ width: `${b.val}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ChartFrame>
        </div>
    );
}

function QuadrantScatterDemo({ lang }: { lang: any }) {
    const w = 480, h = 300, pad = { t: 20, r: 20, b: 40, l: 40 };
    return (
        <div className="space-y-4 mb-16">
            <h3 className="text-xl font-bold text-stone-900">{t(lang, 's2.specialtyFrameworks.demos.quadrantScatter.title')}</h3>
            <ChartFrame
                label={t(lang, 's2.specialtyFrameworks.demos.quadrantScatter.chartLabel')}
                note={t(lang, 's2.specialtyFrameworks.demos.quadrantScatter.note')}
            >
                <div className="flex justify-center p-4">
                    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[500px] block">
                        {/* Axes */}
                        <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#a8a29e" strokeWidth={1} />
                        <line x1={pad.l} x2={pad.l} y1={pad.t} y2={h - pad.b} stroke="#a8a29e" strokeWidth={1} />

                        {/* Quadrant Backgrounds */}
                        <rect x={pad.l} y={pad.t} width={(w - pad.l - pad.r) / 2} height={(h - pad.t - pad.b) / 2} fill="#fee2e2" opacity={0.5} /> {/* Top Left: High Risk */}
                        <rect x={pad.l + (w - pad.l - pad.r) / 2} y={pad.t} width={(w - pad.l - pad.r) / 2} height={(h - pad.t - pad.b) / 2} fill="#dcfce7" opacity={0.5} /> {/* Top Right: Star */}
                        <rect x={pad.l} y={pad.t + (h - pad.t - pad.b) / 2} width={(w - pad.l - pad.r) / 2} height={(h - pad.t - pad.b) / 2} fill="#f3f4f6" opacity={0.5} /> {/* Bottom Left: Ignore */}
                        <rect x={pad.l + (w - pad.l - pad.r) / 2} y={pad.t + (h - pad.t - pad.b) / 2} width={(w - pad.l - pad.r) / 2} height={(h - pad.t - pad.b) / 2} fill="#fef08a" opacity={0.5} /> {/* Bottom Right: Potential */}

                        {/* Quadrant Dividers */}
                        <line x1={pad.l} x2={w - pad.r} y1={pad.t + (h - pad.t - pad.b) / 2} y2={pad.t + (h - pad.t - pad.b) / 2} stroke="white" strokeWidth="2" />
                        <line x1={pad.l + (w - pad.l - pad.r) / 2} x2={pad.l + (w - pad.l - pad.r) / 2} y1={pad.t} y2={h - pad.b} stroke="white" strokeWidth="2" />

                        {/* Labels within quadrants */}
                        <text x={pad.l + 10} y={pad.t + 18} fill="#ef4444" fontSize="10" opacity={0.8}>{t(lang, 's2.specialtyFrameworks.demos.quadrantScatter.quadrants.0')}</text>
                        <text x={pad.l + (w - pad.l - pad.r) / 2 + 10} y={pad.t + 18} fill="#16a34a" fontSize="10" opacity={0.8}>{t(lang, 's2.specialtyFrameworks.demos.quadrantScatter.quadrants.1')}</text>
                        <text x={pad.l + 10} y={pad.t + (h - pad.t - pad.b) / 2 + 18} fill="#9ca3af" fontSize="10" opacity={0.8}>{t(lang, 's2.specialtyFrameworks.demos.quadrantScatter.quadrants.2')}</text>
                        <text x={pad.l + (w - pad.l - pad.r) / 2 + 10} y={pad.t + (h - pad.t - pad.b) / 2 + 18} fill="#ca8a04" fontSize="10" opacity={0.8}>{t(lang, 's2.specialtyFrameworks.demos.quadrantScatter.quadrants.3')}</text>

                        {/* Axis Labels */}
                        <text x={pad.l + (w - pad.l - pad.r) / 2} y={h - 10} fill="#78716c" fontSize="10" textAnchor="middle" letterSpacing="0.5">{t(lang, 's2.specialtyFrameworks.demos.quadrantScatter.xAxis')}</text>
                        <text x={15} y={pad.t + (h - pad.t - pad.b) / 2} fill="#78716c" fontSize="10" textAnchor="middle" transform={`rotate(-90 15 ${pad.t + (h - pad.t - pad.b) / 2})`} letterSpacing="0.5">{t(lang, 's2.specialtyFrameworks.demos.quadrantScatter.yAxis')}</text>

                        {/* Data Points */}
                        {/* High risk */}
                        <circle cx={pad.l + (w - pad.l - pad.r) * 0.15} cy={pad.t + (h - pad.t - pad.b) * 0.3} r="6" fill="#b91c1c" stroke="#fff" strokeWidth={1} />
                        <circle cx={pad.l + (w - pad.l - pad.r) * 0.35} cy={pad.t + (h - pad.t - pad.b) * 0.4} r="6" fill="#b91c1c" stroke="#fff" strokeWidth={1} />

                        {/* Stars */}
                        <circle cx={pad.l + (w - pad.l - pad.r) * 0.7} cy={pad.t + (h - pad.t - pad.b) * 0.2} r="6" fill="#15803d" stroke="#fff" strokeWidth={1} />
                        <circle cx={pad.l + (w - pad.l - pad.r) * 0.6} cy={pad.t + (h - pad.t - pad.b) * 0.45} r="6" fill="#15803d" stroke="#fff" strokeWidth={1} />
                        <circle cx={pad.l + (w - pad.l - pad.r) * 0.85} cy={pad.t + (h - pad.t - pad.b) * 0.35} r="6" fill="#15803d" stroke="#fff" strokeWidth={1} />

                        {/* Ignore */}
                        <circle cx={pad.l + (w - pad.l - pad.r) * 0.2} cy={pad.t + (h - pad.t - pad.b) * 0.8} r="6" fill="#6b7280" stroke="#fff" strokeWidth={1} />
                        <circle cx={pad.l + (w - pad.l - pad.r) * 0.35} cy={pad.t + (h - pad.t - pad.b) * 0.9} r="6" fill="#6b7280" stroke="#fff" strokeWidth={1} />

                        {/* Potential */}
                        <circle cx={pad.l + (w - pad.l - pad.r) * 0.65} cy={pad.t + (h - pad.t - pad.b) * 0.85} r="6" fill="#a16207" stroke="#fff" strokeWidth={1} />
                    </svg>
                </div>
            </ChartFrame>
        </div>
    );
}

function WafflePieDemo({ lang }: { lang: any }) {
    const [isPie, setIsPie] = useState(false);

    // 68% representation
    const total = 100;
    const val = 68;

    return (
        <div className="space-y-4 mb-16">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-stone-900">{t(lang, 's2.specialtyFrameworks.demos.wafflePie.title')}</h3>
                    <p className="text-[13px] text-stone-500 max-w-md">{t(lang, 's2.specialtyFrameworks.demos.wafflePie.desc')}</p>
                </div>
                <button
                    onClick={() => setIsPie(!isPie)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${isPie
                        ? 'bg-stone-900 text-white shadow-stone-200'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:shadow-md'
                        }`}
                >
                    {isPie ? t(lang, 's2.specialtyFrameworks.demos.wafflePie.btnShow') : t(lang, 's2.specialtyFrameworks.demos.wafflePie.btnHide')}
                </button>
            </div>
            <ChartFrame
                label={t(lang, 's2.specialtyFrameworks.demos.wafflePie.chartLabel')}
                note={isPie ? t(lang, 's2.specialtyFrameworks.demos.wafflePie.noteShow') : t(lang, 's2.specialtyFrameworks.demos.wafflePie.noteHide')}
            >
                <div className="flex justify-center py-6 w-full relative">
                    {isPie ? (
                        <div className="relative">
                            <svg viewBox="0 0 480 220" className="w-[200px] h-[200px]">
                                {/* 68% pie using path */}
                                {/* 68% = 244.8 degrees. Start at top (50, 10). End at ~ (14.65, 68.75) */}
                                <circle cx="50" cy="50" r="40" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth={0.5} />
                                <path d="M 50 50 L 50 10 A 40 40 0 1 1 14.65 68.75 Z" fill="#3b82f6" />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none drop-shadow-md bg-white/80 px-4 py-2 rounded-xl border border-stone-200 backdrop-blur-sm">
                                <span className="text-2xl font-bold text-stone-800 leading-none">68%</span>
                            </div>
                        </div>
                    ) : (
                        <div className="relative border border-stone-200 bg-stone-50 p-4 rounded-xl shadow-inner">
                            <div className="grid grid-cols-10 gap-1 w-[200px] h-[200px]">
                                {[...Array(total)].map((_, i) => (
                                    <div key={i} className={`rounded-sm ${i < val ? 'bg-blue-500 shadow-sm' : 'bg-slate-200'}`}></div>
                                ))}
                            </div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none drop-shadow-md bg-white/90 px-4 py-2 rounded-xl border border-stone-200 backdrop-blur-sm">
                                <span className="text-2xl font-bold text-stone-800 leading-none">68%</span>
                            </div>
                        </div>
                    )}
                </div>
            </ChartFrame>
        </div>
    );
}

function LikertScaleDemo({ lang }: { lang: any }) {
    const [mode, setMode] = useState<0 | 1 | 2>(0); // 0=stacked, 1=diverging, 2=diverging separated

    return (
        <div className="space-y-4 mb-16">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-2 gap-4">
                <h3 className="text-xl font-bold text-stone-900">{t(lang, 's2.specialtyFrameworks.demos.likertScale.title')}</h3>
                <div className="flex bg-stone-100 p-1 rounded-lg border border-stone-200 shadow-inner">
                    <button onClick={() => setMode(0)} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 0 ? 'bg-white text-indigo-600 shadow-sm' : 'text-stone-600 hover:text-stone-800'}`}>{t(lang, 's2.specialtyFrameworks.demos.likertScale.modes.0')}</button>
                    <button onClick={() => setMode(1)} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 1 ? 'bg-white text-indigo-600 shadow-sm' : 'text-stone-600 hover:text-stone-800'}`}>{t(lang, 's2.specialtyFrameworks.demos.likertScale.modes.1')}</button>
                    <button onClick={() => setMode(2)} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 2 ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100' : 'text-stone-600 hover:text-stone-800'}`}>{t(lang, 's2.specialtyFrameworks.demos.likertScale.modes.2')}</button>
                </div>
            </div>

            <ChartFrame
                label={t(lang, 's2.specialtyFrameworks.demos.likertScale.chartLabel')}
                note={
                    mode === 0 ? t(lang, 's2.specialtyFrameworks.demos.likertScale.notes.0') :
                        mode === 1 ? t(lang, 's2.specialtyFrameworks.demos.likertScale.notes.1') :
                            t(lang, 's2.specialtyFrameworks.demos.likertScale.notes.2')
                }
            >
                <div className="flex flex-col w-full">
                    {/* Legend */}
                    <div className="px-4 pb-2 flex justify-center items-center gap-6 text-[10px] uppercase font-bold text-stone-500">
                        <div className="flex gap-2">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-600 rounded-sm"></div> SD</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-300 rounded-sm"></div> D</span>
                        </div>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-stone-300 rounded-sm"></div> N</span>
                        <div className="flex gap-2">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-300 rounded-sm"></div> A</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-600 rounded-sm"></div> SA</span>
                        </div>
                    </div>

                    <div className="flex justify-center p-6 w-full">
                        {/* Fixed coordinate space: 0 0 120 50 with padding */}
                        <svg viewBox="-10 -8 140 65" className="w-full max-w-[500px] overflow-visible block">
                            {mode === 0 && (
                                // Standard 100% stacked right from 0
                                <g>
                                    <rect x="0" y="15" width="20" height="10" fill="#dc2626" />
                                    <rect x="20" y="15" width="10" height="10" fill="#fca5a5" />
                                    <rect x="30" y="15" width="15" height="10" fill="#e2e8f0" />
                                    <rect x="45" y="15" width="25" height="10" fill="#86efac" />
                                    <rect x="70" y="15" width="30" height="10" fill="#16a34a" />
                                    <line x1="0" x2="0" y1="10" y2="30" stroke="#000" strokeWidth="0.5" />

                                    <text x="50" y="10" fontSize="4" fill="#64748b" textAnchor="middle" dangerouslySetInnerHTML={{ __html: t(lang, 's2.specialtyFrameworks.demos.likertScale.text1') }} />
                                </g>
                            )}
                            {mode === 1 && (
                                // Diverging centered on the Neutral's middle
                                <g transform="translate(12.5, 0)">
                                    <rect x="0" y="15" width="20" height="10" fill="#dc2626" />
                                    <rect x="20" y="15" width="10" height="10" fill="#fca5a5" />
                                    <rect x="30" y="15" width="15" height="10" fill="#e2e8f0" />
                                    <rect x="45" y="15" width="25" height="10" fill="#86efac" />
                                    <rect x="70" y="15" width="30" height="10" fill="#16a34a" />
                                    <line x1="37.5" x2="37.5" y1="5" y2="35" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 2" />

                                    <text x="37.5" y="4" fontSize="4" fill="#64748b" fontStyle="italic" textAnchor="middle">{t(lang, 's2.specialtyFrameworks.demos.likertScale.text2')}</text>
                                </g>
                            )}
                            {mode === 2 && (
                                // Diverging but neutral is broken out
                                <g>
                                    <line x1="50" x2="50" y1="5" y2="35" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 2" />

                                    {/* Negative */}
                                    <rect x="20" y="15" width="20" height="10" fill="#dc2626" />
                                    <rect x="40" y="15" width="10" height="10" fill="#fca5a5" />
                                    <text x="18" y="21.5" fontSize="4" fill="#dc2626" textAnchor="end">30%</text>

                                    {/* Positive */}
                                    <rect x="50" y="15" width="25" height="10" fill="#86efac" />
                                    <rect x="75" y="15" width="30" height="10" fill="#16a34a" opacity="0.9" />
                                    <text x="107" y="21.5" fontSize="4" fill="#16a34a">55%</text>

                                    {/* Separated Neutral */}
                                    <rect x="10" y="3" width="15" height="4" fill="#cbd5e1" />
                                    <text x="27" y="6" fontSize="4" fill="#64748b" fontStyle="italic">{t(lang, 's2.specialtyFrameworks.demos.likertScale.text3')}</text>
                                </g>
                            )}
                        </svg>
                    </div>
                </div>
            </ChartFrame>
        </div>
    );
}

function CumulativeStepDemo({ lang }: { lang: any }) {
    return (
        <ChartFrame
            label={t(lang, 's2.specialtyFrameworks.toolbox.cumulativeStep.chartLabel')}
            note={t(lang, 's2.specialtyFrameworks.toolbox.cumulativeStep.note')}
            className="h-full flex flex-col"
        >
            <div className="flex-1 w-full bg-white rounded-lg relative flex items-center justify-center min-h-[140px] px-2">
                <svg viewBox="0 -5 95 55" className="w-full block overflow-visible">
                    {/* Axes */}
                    <line x1="5" x2="95" y1="45" y2="45" stroke="#a8a29e" strokeWidth={0.5} />
                    <line x1="5" x2="5" y1="5" y2="45" stroke="#a8a29e" strokeWidth={0.5} />

                    {/* Grid */}
                    <line x1="5" x2="95" y1="25" y2="25" stroke="#e7e5e4" strokeWidth={0.5} strokeDasharray="1 1" />

                    {/* Step Path */}
                    <path d="M 5 45 L 20 45 L 20 30 L 40 30 L 40 25 L 70 25 L 70 15 L 90 15 L 90 10 L 95 10" fill="none" stroke="#6366f1" strokeWidth={1.5} />

                    {/* Event markers */}
                    <circle cx="20" cy="30" r="1.5" fill="#4f46e5" />
                    <circle cx="40" cy="25" r="1.5" fill="#4f46e5" />
                    <circle cx="70" cy="15" r="1.5" fill="#4f46e5" />
                    <circle cx="90" cy="10" r="1.5" fill="#4f46e5" />
                </svg>
            </div>
        </ChartFrame>
    );
}

function LogScaleDemo({ lang }: { lang: any }) {
    return (
        <ChartFrame
            label={t(lang, 's2.specialtyFrameworks.toolbox.logScale.chartLabel')}
            note={t(lang, 's2.specialtyFrameworks.toolbox.logScale.note')}
            className="h-full flex flex-col"
        >
            <div className="flex-1 w-full bg-white rounded-lg relative flex items-center justify-center min-h-[140px] px-2">
                <svg viewBox="5 0 93 52" className="w-full block overflow-visible">
                    {/* Axes */}
                    <line x1="10" x2="95" y1="40" y2="40" stroke="#a8a29e" strokeWidth={0.5} />
                    <line x1="10" x2="10" y1="5" y2="40" stroke="#a8a29e" strokeWidth={0.5} />

                    {/* Fake log grid: powers of 10 spread evenly */}
                    <line x1="38" x2="38" y1="5" y2="40" stroke="#e7e5e4" strokeWidth={0.5} strokeDasharray="1 1" />
                    <line x1="66" x2="66" y1="5" y2="40" stroke="#e7e5e4" strokeWidth={0.5} strokeDasharray="1 1" />
                    <line x1="94" x2="94" y1="5" y2="40" stroke="#e7e5e4" strokeWidth={0.5} strokeDasharray="1 1" />

                    <circle cx="15" cy="35" r="2" fill="#3b82f6" opacity={0.8} />
                    <circle cx="25" cy="25" r="2" fill="#3b82f6" opacity={0.8} />
                    <circle cx="45" cy="20" r="2" fill="#3b82f6" opacity={0.8} />
                    <circle cx="85" cy="10" r="2" fill="#3b82f6" opacity={0.8} />

                    <text x="10" y="46" fontSize="5" fill="#78716c" textAnchor="middle">10</text>
                    <text x="38" y="46" fontSize="5" fill="#78716c" textAnchor="middle">10k</text>
                    <text x="66" y="46" fontSize="5" fill="#78716c" textAnchor="middle">1M</text>
                    <text x="94" y="46" fontSize="5" fill="#78716c" textAnchor="middle">1B</text>
                </svg>
            </div>
        </ChartFrame>
    );
}

function HeatmapDemo({ lang }: { lang: any }) {
    return (
        <ChartFrame
            label={t(lang, 's2.specialtyFrameworks.toolbox.heatmap.chartLabel')}
            note={t(lang, 's2.specialtyFrameworks.toolbox.heatmap.note')}
            className="h-full flex flex-col"
        >
            <div className="flex-1 w-full flex items-center justify-center p-4">
                <div className="grid grid-cols-5 gap-1 w-full h-full max-h-[120px]">
                    {/* Fake week grid with varying opacities in amber/orange */}
                    {[...Array(20)].map((_, i) => {
                        // pseudo-random but stable pattern
                        const opac = [0.1, 0.2, 0.8, 0.9, 0.3, 0.1, 0.4, 0.7, 0.2, 0.1, 0.2, 0.6, 1.0, 0.4, 0.2, 0.1, 0.3, 0.5, 0.2, 0.1][i];
                        return (
                            <div key={i} className="rounded-sm min-h-[12px]" style={{ backgroundColor: `rgba(245, 158, 11, ${opac})` }}></div>
                        )
                    })}
                </div>
            </div>
        </ChartFrame>
    );
}

function TreemapDemo({ lang }: { lang: any }) {
    return (
        <ChartFrame
            label={t(lang, 's2.specialtyFrameworks.toolbox.treemap.chartLabel')}
            note={t(lang, 's2.specialtyFrameworks.toolbox.treemap.note')}
            className="h-full flex flex-col"
        >
            <div className="flex-1 w-full bg-white rounded-lg p-2 relative flex items-center justify-center min-h-[140px]">
                {/* Corrected viewBox to match coordinate space (0 0 100 60) */}
                <svg viewBox="0 0 100 60" className="w-full block h-full">
                    {/* Simulated Finviz-style tech sector breakdown */}
                    <g>
                        <rect x="0" y="0" width="60" height="60" fill="#15803d" stroke="#fff" strokeWidth={0.5} />
                        <text x="2" y="5" fill="#fff" fontSize="4">AAPL: +2.1%</text>
                    </g>
                    <g>
                        <rect x="60" y="0" width="40" height="35" fill="#b91c1c" stroke="#fff" strokeWidth={0.5} />
                        <text x="62" y="5" fill="#fff" fontSize="4">MSFT: -1.5%</text>
                    </g>
                    <g>
                        <rect x="60" y="35" width="25" height="25" fill="#22c55e" stroke="#fff" strokeWidth={0.5} />
                        <text x="62" y="40" fill="#fff" fontSize="3">NVDA</text>
                    </g>
                    <g>
                        <rect x="85" y="35" width="15" height="15" fill="#16a34a" stroke="#fff" strokeWidth={0.5} />
                    </g>
                    <g>
                        <rect x="85" y="50" width="15" height="10" fill="#475569" stroke="#fff" strokeWidth={0.5} />
                    </g>
                </svg>
            </div>
        </ChartFrame>
    );
}

function MisleadingRecoveryDemo({ lang }: { lang: any }) {
    return (
        <div className="col-span-1 md:col-span-2">
            <ChartFrame
                label={t(lang, 's2.specialtyFrameworks.toolbox.misleading.chartLabel')}
                note={t(lang, 's2.specialtyFrameworks.toolbox.misleading.note')}
                className="h-full flex flex-col border-red-200"
            >
                <div className="flex-1 w-full bg-white rounded-lg p-5 flex items-center justify-center">
                    <div className="w-full max-w-[360px]">
                        {/* Corrected viewBox to coordinate space (0 0 100 50) with slight padding */}
                        <svg viewBox="0 -5 100 55" className="w-full block overflow-visible">
                            <line x1="5" x2="95" y1="45" y2="45" stroke="#a8a29e" strokeWidth={0.5} />

                            {/* Bars representing actual dollar value */}
                            {/* Start $100 */}
                            <rect x="15" y="5" width="20" height="40" fill="#cbd5e1" />
                            <text x="25" y="4" fontSize="4" fill="#64748b" textAnchor="middle">$100</text>

                            {/* Drop 50% */}
                            <rect x="40" y="25" width="20" height="20" fill="#ef4444" />
                            <text x="50" y="24" fontSize="4" fill="#ef4444" textAnchor="middle">$50</text>

                            {/* Gain 50% ($25) */}
                            <rect x="65" y="12.5" width="20" height="32.5" fill="#10b981" />
                            <text x="75" y="11.5" fontSize="4" fill="#10b981" textAnchor="middle">$75</text>

                            {/* Annotation arrows */}
                            <path d="M 25 15 C 35 15, 40 18, 50 20 L 48 18 M 50 20 L 48 22" fill="none" stroke="#ef4444" strokeWidth={0.5} />
                            <text x="37.5" y="14" fontSize="4" fill="#ef4444" textAnchor="middle">-50%</text>

                            <path d="M 50 30 C 60 30, 65 20, 75 18 L 73 16 M 75 18 L 73 20" fill="none" stroke="#10b981" strokeWidth={0.5} />
                            <text x="62.5" y="27" fontSize="4" fill="#10b981" textAnchor="middle">+50%</text>

                            {/* Gap marker */}
                            <line x1="15" x2="95" y1="5" y2="5" stroke="#ef4444" strokeWidth={0.5} strokeDasharray="1 1" />
                            <path d="M 90 5 L 90 12.5" stroke="#ef4444" strokeWidth={0.5} fill="none" />
                            <text x="92" y="9" fontSize="3" fill="#ef4444" textAnchor="start">{t(lang, 's2.specialtyFrameworks.toolbox.misleading.stillDown')}</text>
                        </svg>
                    </div>
                </div>
            </ChartFrame>
        </div>
    );
}

export default function SpecialtyFrameworksLesson() {
    const { lang } = useLang();

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.specialtyFrameworks.intro1') }} />

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
                                {t(lang, 's2.specialtyFrameworks.contextRule.title')}
                            </p>
                            <p className="text-[14px] text-stone-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.specialtyFrameworks.contextRule.rule') }} />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <StandoutScatterDemo lang={lang} />
                    <StripTierDemo lang={lang} />
                    <ProgressBarsDemo lang={lang} />
                    <QuadrantScatterDemo lang={lang} />
                    <WafflePieDemo lang={lang} />
                    <LikertScaleDemo lang={lang} />

                    <div className="pt-8 border-t border-stone-200 space-y-4">
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-stone-900">{t(lang, 's2.specialtyFrameworks.toolbox.title')}</h3>
                            <p className="text-[14px] text-stone-500 leading-relaxed">{t(lang, 's2.specialtyFrameworks.toolbox.desc')}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="lg:col-span-2"><CumulativeStepDemo lang={lang} /></div>
                            <div className="lg:col-span-2"><LogScaleDemo lang={lang} /></div>
                            <div className="lg:col-span-2"><HeatmapDemo lang={lang} /></div>
                            <div className="lg:col-span-2"><TreemapDemo lang={lang} /></div>
                            <MisleadingRecoveryDemo lang={lang} />
                        </div>
                    </div>
                </div>

                {/* Conclusion Block */}
                <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 space-y-4">
                    <div className="flex items-center gap-3 text-stone-900">
                        <Info size={20} className="text-stone-400" />
                        <h4 className="text-lg font-bold">{t(lang, 's2.specialtyFrameworks.conclusion.title')}</h4>
                    </div>
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.specialtyFrameworks.conclusion.text') }} />
                </div>
            </div>
        </LessonPage>
    );
}
