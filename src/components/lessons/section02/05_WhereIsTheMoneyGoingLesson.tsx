import { useState } from 'react';
import LessonPage from '../../layout/LessonPage';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import ChartFamilyLesson, { type ChartSpec } from './ChartFamilyLesson';
import ChartFrame from '../../ui/ChartFrame';
import {
    PieMini,
    DonutMini,
    TreemapMini,
    SunburstMini,
    WaffleMini,
    MosaicMini,
    WaterfallMini,
} from '../../charts/demos/MiniCharts';

const getCharts = (lang: any): ChartSpec[] => [
    {
        slug: 'pie',
        name: t(lang, 's2.whereIsTheMoneyGoing.charts.pie.name'),
        whenToUse: [
            t(lang, 's2.whereIsTheMoneyGoing.charts.pie.whenToUse.0'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.pie.whenToUse.1'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.pie.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whereIsTheMoneyGoing.charts.pie.whenNotToUse.0'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.pie.whenNotToUse.1'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.pie.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whereIsTheMoneyGoing.charts.pie.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whereIsTheMoneyGoing.charts.pie.cognitiveRef'),
        ethicalRef: t(lang, 's2.whereIsTheMoneyGoing.charts.pie.ethicalRef'),
        demo: <PieMini />,
    },
    {
        slug: 'donut',
        name: t(lang, 's2.whereIsTheMoneyGoing.charts.donut.name'),
        whenToUse: [
            t(lang, 's2.whereIsTheMoneyGoing.charts.donut.whenToUse.0'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.donut.whenToUse.1'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.donut.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whereIsTheMoneyGoing.charts.donut.whenNotToUse.0'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.donut.whenNotToUse.1'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.donut.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whereIsTheMoneyGoing.charts.donut.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whereIsTheMoneyGoing.charts.donut.cognitiveRef'),
        ethicalRef: t(lang, 's2.whereIsTheMoneyGoing.charts.donut.ethicalRef'),
        demo: <DonutMini />,
    },
    {
        slug: 'treemap',
        name: t(lang, 's2.whereIsTheMoneyGoing.charts.treemap.name'),
        whenToUse: [
            t(lang, 's2.whereIsTheMoneyGoing.charts.treemap.whenToUse.0'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.treemap.whenToUse.1'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.treemap.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whereIsTheMoneyGoing.charts.treemap.whenNotToUse.0'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.treemap.whenNotToUse.1'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.treemap.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whereIsTheMoneyGoing.charts.treemap.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whereIsTheMoneyGoing.charts.treemap.cognitiveRef'),
        ethicalRef: t(lang, 's2.whereIsTheMoneyGoing.charts.treemap.ethicalRef'),
        demo: <TreemapMini />,
    },
    {
        slug: 'sunburst',
        name: t(lang, 's2.whereIsTheMoneyGoing.charts.sunburst.name'),
        whenToUse: [
            t(lang, 's2.whereIsTheMoneyGoing.charts.sunburst.whenToUse.0'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.sunburst.whenToUse.1'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.sunburst.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whereIsTheMoneyGoing.charts.sunburst.whenNotToUse.0'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.sunburst.whenNotToUse.1'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.sunburst.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whereIsTheMoneyGoing.charts.sunburst.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whereIsTheMoneyGoing.charts.sunburst.cognitiveRef'),
        ethicalRef: t(lang, 's2.whereIsTheMoneyGoing.charts.sunburst.ethicalRef'),
        demo: <SunburstMini />,
    },
    {
        slug: 'waffle',
        name: t(lang, 's2.whereIsTheMoneyGoing.charts.waffle.name'),
        whenToUse: [
            t(lang, 's2.whereIsTheMoneyGoing.charts.waffle.whenToUse.0'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.waffle.whenToUse.1'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.waffle.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whereIsTheMoneyGoing.charts.waffle.whenNotToUse.0'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.waffle.whenNotToUse.1'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.waffle.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whereIsTheMoneyGoing.charts.waffle.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whereIsTheMoneyGoing.charts.waffle.cognitiveRef'),
        ethicalRef: t(lang, 's2.whereIsTheMoneyGoing.charts.waffle.ethicalRef'),
        demo: <WaffleMini />,
    },
    {
        slug: 'mosaic',
        name: t(lang, 's2.whereIsTheMoneyGoing.charts.mosaic.name'),
        whenToUse: [
            t(lang, 's2.whereIsTheMoneyGoing.charts.mosaic.whenToUse.0'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.mosaic.whenToUse.1'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.mosaic.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whereIsTheMoneyGoing.charts.mosaic.whenNotToUse.0'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.mosaic.whenNotToUse.1'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.mosaic.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whereIsTheMoneyGoing.charts.mosaic.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whereIsTheMoneyGoing.charts.mosaic.cognitiveRef'),
        ethicalRef: t(lang, 's2.whereIsTheMoneyGoing.charts.mosaic.ethicalRef'),
        demo: <MosaicMini />,
    },
    {
        slug: 'waterfall',
        name: t(lang, 's2.whereIsTheMoneyGoing.charts.waterfall.name'),
        whenToUse: [
            t(lang, 's2.whereIsTheMoneyGoing.charts.waterfall.whenToUse.0'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.waterfall.whenToUse.1'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.waterfall.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whereIsTheMoneyGoing.charts.waterfall.whenNotToUse.0'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.waterfall.whenNotToUse.1'),
            t(lang, 's2.whereIsTheMoneyGoing.charts.waterfall.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whereIsTheMoneyGoing.charts.waterfall.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whereIsTheMoneyGoing.charts.waterfall.cognitiveRef'),
        ethicalRef: t(lang, 's2.whereIsTheMoneyGoing.charts.waterfall.ethicalRef'),
        demo: <WaterfallMini />,
    },
];

// Pie vs Bar accuracy comparison chart
function PieVsBarComparisonChart({ lang }: { lang: any }) {
    const data = [
        { label: t(lang, 's2.whereIsTheMoneyGoing.pieVsBar.categories.0'), value: 38, color: '#059669' },
        { label: t(lang, 's2.whereIsTheMoneyGoing.pieVsBar.categories.1'), value: 35, color: '#0d9488' },
        { label: t(lang, 's2.whereIsTheMoneyGoing.pieVsBar.categories.2'), value: 17, color: '#2563eb' },
        { label: t(lang, 's2.whereIsTheMoneyGoing.pieVsBar.categories.3'), value: 10, color: '#7c3aed' },
    ];
    const total = data.reduce((s, d) => s + d.value, 0);
    const cx = 100, cy = 100, r = 95;
    let angle = -Math.PI / 2;

    // Pie slices
    const slices = data.map(d => {
        const startAngle = angle;
        const delta = (d.value / total) * 2 * Math.PI;
        angle += delta;
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(angle);
        const y2 = cy + r * Math.sin(angle);
        const large = delta > Math.PI ? 1 : 0;
        return { ...d, path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z` };
    });

    return (
        <ChartFrame
            label={t(lang, 's2.whereIsTheMoneyGoing.pieVsBar.title')}
            note={t(lang, 's2.whereIsTheMoneyGoing.pieVsBar.note')}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 items-center">
                <div className="flex flex-col items-center">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-6">
                        {t(lang, 's2.whereIsTheMoneyGoing.pieVsBar.pieTitle')}
                    </p>
                    <div className="relative flex flex-col items-center">
                        <svg viewBox="0 0 200 200" className="w-full max-w-[180px] drop-shadow-sm">
                            {slices.map((s, i) => (
                                <path key={i} d={s.path} fill={s.color} stroke="#fff" strokeWidth={1.5} opacity={0.95} />
                            ))}
                            <text x={cx} y={cy + 8} fill="white" fontSize={26} textAnchor="middle" opacity={0.5}>?</text>
                        </svg>
                        <div className="mt-8 text-center">
                            <span className="text-[12px] font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100 shadow-sm">
                                {t(lang, 's2.whereIsTheMoneyGoing.pieVsBar.pieLabel')}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-6">
                        {t(lang, 's2.whereIsTheMoneyGoing.pieVsBar.barTitle')}
                    </p>
                    <div className="w-full max-w-[280px] space-y-4 pt-2">
                        {data.map((d, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <span className="w-20 text-[12px] font-bold text-stone-500 text-right">{d.label}</span>
                                <div className="flex-1 h-7 bg-stone-50 rounded shadow-inner overflow-hidden flex items-center pr-2">
                                    <div
                                        className="h-full rounded-r transition-all duration-500"
                                        style={{ width: `${Math.max(10, (d.value / 40) * 100)}%`, backgroundColor: d.color, opacity: 0.85 }}
                                    />
                                    <span className="ml-3 text-[12px] font-bold text-stone-600">{d.value}%</span>
                                </div>
                            </div>
                        ))}
                        <div className="mt-8 text-center pt-2">
                            <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">
                                {t(lang, 's2.whereIsTheMoneyGoing.pieVsBar.barLabel')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </ChartFrame>
    );
}

function WaffleDemo({ lang }: { lang: any }) {
    const total = 100;
    const value = 62;

    return (
        <ChartFrame
            label={t(lang, 's2.whereIsTheMoneyGoing.waffleDemo.title')}
            note={t(lang, 's2.whereIsTheMoneyGoing.waffleDemo.note')}
        >
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center p-8">
                <div className="flex-1 max-w-[180px]">
                    <div className="grid grid-cols-10 gap-1.5 w-full aspect-square p-2 bg-stone-100/50 rounded-xl shadow-inner border border-stone-100">
                        {Array.from({ length: total }).map((_, i) => {
                            const row = Math.floor(i / 10);
                            const col = i % 10;
                            // Fill from bottom-left to top-right
                            const filledIndex = (9 - row) * 10 + col;
                            const isFilled = filledIndex < value;
                            return (
                                <div
                                    key={i}
                                    className={`w-full h-full rounded-[1px] transition-all duration-700 delay-[${i * 5}ms] ${isFilled ? 'bg-indigo-500 shadow-sm scale-110' : 'bg-stone-200'}`}
                                ></div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex-1 space-y-3">
                    <h3 className="text-4xl font-black text-stone-800 tracking-tighter italic">
                        {value}<span className="text-indigo-500">%</span> <span className="text-stone-400 not-italic text-2xl font-light tracking-normal">{t(lang, 's2.whereIsTheMoneyGoing.waffleDemo.complete')}</span>
                    </h3>
                    <p className="text-[13px] text-stone-500 leading-relaxed font-medium">
                        {t(lang, 's2.whereIsTheMoneyGoing.waffleDemo.desc')}
                    </p>
                </div>
            </div>
        </ChartFrame>
    );
}

function WaterfallDemo({ lang }: { lang: any }) {
    const data = [
        { label: t(lang, 's2.whereIsTheMoneyGoing.waterfallDemo.labels.0'), val: 120, type: 'total' },
        { label: t(lang, 's2.whereIsTheMoneyGoing.waterfallDemo.labels.1'), val: 35, type: 'pos' },
        { label: t(lang, 's2.whereIsTheMoneyGoing.waterfallDemo.labels.2'), val: -25, type: 'neg' },
        { label: t(lang, 's2.whereIsTheMoneyGoing.waterfallDemo.labels.3'), val: 15, type: 'pos' },
        { label: t(lang, 's2.whereIsTheMoneyGoing.waterfallDemo.labels.4'), val: 145, type: 'total' }
    ];

    let running = 0;
    const items = data.map(d => {
        let start = running;
        let end = running;
        if (d.type === 'total') {
            end = d.val;
            running = d.val;
            start = 0;
        } else {
            end = start + d.val;
            running += d.val;
        }
        return { ...d, start, end };
    });

    const max = 160;

    return (
        <ChartFrame
            label={t(lang, 's2.whereIsTheMoneyGoing.waterfallDemo.title')}
            note={t(lang, 's2.whereIsTheMoneyGoing.waterfallDemo.note')}
        >
            <div className="w-full p-6 pt-10">
                <div className="h-40 flex items-end justify-between px-4 pb-0 gap-4 relative">
                    {/* Floating bars and connections */}
                    {items.map((d, i) => {
                        const h = Math.abs(d.end - d.start);
                        const topY = Math.max(d.end, d.start);
                        const bottomY = Math.min(d.end, d.start);
                        const color = d.type === 'total' ? '#475569' : d.type === 'pos' ? '#10b981' : '#f43f5e';

                        return (
                            <div key={d.label} className="relative flex-1 flex flex-col items-center h-full">
                                {/* Bar */}
                                <div
                                    className={`absolute w-full rounded-md shadow-sm border-t border-white/20 transition-all duration-700 delay-[${i * 100}ms]`}
                                    style={{
                                        height: `${(h / max) * 100}%`,
                                        bottom: `${(bottomY / max) * 100}%`,
                                        backgroundColor: color,
                                    }}
                                />
                                {/* Value Label */}
                                <div
                                    className="absolute w-full text-center text-[11px] font-black z-10"
                                    style={{
                                        bottom: `${(topY / max) * 100}%`,
                                        marginBottom: '8px',
                                        color: d.type === 'neg' ? '#f43f5e' : (d.type === 'pos' ? '#059669' : '#1e293b')
                                    }}
                                >
                                    {d.val > 0 && d.type !== 'total' ? '+' : ''}{d.val}
                                </div>

                                {/* Connecting Line */}
                                {i < items.length - 1 && (
                                    <div
                                        className="absolute border-t-2 border-dashed border-stone-200"
                                        style={{
                                            left: '50%',
                                            width: 'calc(100% + 16px)',
                                            bottom: `${(d.end / max) * 100}%`,
                                            zIndex: 0
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
                {/* Labels */}
                <div className="flex justify-between px-4 pt-4 mt-2 border-t border-stone-100">
                    {items.map(d => (
                        <div key={d.label} className="flex-1 text-center text-[9px] font-black uppercase text-stone-400 tracking-tighter">
                            {d.label.split(' ').map((word, wi) => (
                                <div key={wi}>{word}</div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </ChartFrame>
    );
}

function LikertDivergingDemo({ lang }: { lang: any }) {
    const [view, setView] = useState<'standard' | 'diverging' | 'separated'>('standard');

    // Likert data: SD, D, N, A, SA
    const data = [
        { q: t(lang, 's2.whereIsTheMoneyGoing.likertDemo.questions.0'), vals: [5, 15, 20, 40, 20] },
        { q: t(lang, 's2.whereIsTheMoneyGoing.likertDemo.questions.1'), vals: [10, 25, 10, 35, 20] },
        { q: t(lang, 's2.whereIsTheMoneyGoing.likertDemo.questions.2'), vals: [20, 40, 15, 20, 5] },
        { q: t(lang, 's2.whereIsTheMoneyGoing.likertDemo.questions.3'), vals: [2, 8, 30, 40, 20] },
    ];

    const colors = ['#dc2626', '#f87171', '#d6d3d1', '#60a5fa', '#2563eb']; // Red to Blue

    const w = 500, h = 240, pad = { l: 90, r: 20, t: 40, b: 20 };
    const chartW = w - pad.l - pad.r;
    const chartH = h - pad.t - pad.b;
    const barH = 22;
    const gap = (chartH - data.length * barH) / (data.length + 1);

    return (
        <ChartFrame
            label={t(lang, 's2.whereIsTheMoneyGoing.likertDemo.title')}
            note={
                view === 'standard' ? t(lang, 's2.whereIsTheMoneyGoing.likertDemo.noteStandard') :
                    view === 'diverging' ? t(lang, 's2.whereIsTheMoneyGoing.likertDemo.noteDiverging') :
                        t(lang, 's2.whereIsTheMoneyGoing.likertDemo.noteSeparated')
            }
        >
            <div className="space-y-4 p-4">
                <div className="flex justify-between items-center mb-2 px-2">
                    <div className="flex bg-stone-100/80 backdrop-blur-sm rounded-lg p-0.5 border border-stone-200">
                        {(['standard', 'diverging', 'separated'] as const).map(m => (
                            <button
                                key={m}
                                onClick={() => setView(m)}
                                className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-tighter transition-all ${view === m ? 'bg-white text-brand shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                            >
                                {m === 'standard' ? t(lang, 's2.whereIsTheMoneyGoing.likertDemo.modes.0') :
                                    m === 'diverging' ? t(lang, 's2.whereIsTheMoneyGoing.likertDemo.modes.1') :
                                        t(lang, 's2.whereIsTheMoneyGoing.likertDemo.modes.2')}
                            </button>
                        ))}
                    </div>
                    {/* Legend compact */}
                    <div className="flex gap-2">
                        {[0, 1, 2].map(i => (
                            <div key={i} className="flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-stone-300' : 'bg-blue-500'}`} />
                                <span className="text-[9px] font-bold text-stone-400">{t(lang, `s2.whereIsTheMoneyGoing.likertDemo.legend.${i}`)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto overflow-visible block p-2">
                    {data.map((d, i) => {
                        const y = pad.t + gap + i * (barH + gap);

                        if (view === 'standard') {
                            let currentX = pad.l;
                            return (
                                <g key={d.q}>
                                    <text x={pad.l - 10} y={y + barH / 2 + 4} fill="#57534e" fontSize={11} textAnchor="end" letterSpacing="-0.02em">{d.q.split(': ')[1]}</text>
                                    {d.vals.map((v, j) => {
                                        const bw = (v / 100) * chartW;
                                        const rect = <rect key={j} x={currentX} y={y} width={bw} height={barH} fill={colors[j]} stroke="#fff" strokeWidth={1.5} rx={1} />;
                                        currentX += bw;
                                        return rect;
                                    })}
                                </g>
                            );
                        } else if (view === 'diverging') {
                            const center = pad.l + chartW / 2;
                            const negWidth = ((d.vals[0] + d.vals[1] + d.vals[2] / 2) / 100) * chartW;
                            let currentX = center - negWidth;

                            return (
                                <g key={d.q}>
                                    <text x={pad.l - 10} y={y + barH / 2 + 4} fill="#57534e" fontSize={11} textAnchor="end" letterSpacing="-0.02em">{d.q.split(': ')[1]}</text>
                                    <line x1={center} x2={center} y1={pad.t} y2={h - pad.b + 10} stroke="#e7e5e4" strokeWidth={1.5} strokeDasharray="3,3" />
                                    {d.vals.map((v, j) => {
                                        const bw = (v / 100) * chartW;
                                        const rect = <rect key={j} x={currentX} y={y} width={bw} height={barH} fill={colors[j]} stroke="#fff" strokeWidth={1.5} rx={1} />;
                                        currentX += bw;
                                        return rect;
                                    })}
                                </g>
                            );
                        } else {
                            const mainW = chartW * 0.7;
                            const neutralX = pad.l + mainW + chartW * 0.05;
                            const neutralW = chartW * 0.25;

                            const center = pad.l + mainW / 2;
                            const negWidth = ((d.vals[0] + d.vals[1]) / 100) * mainW;
                            let currentX = center - negWidth;

                            return (
                                <g key={d.q}>
                                    <text x={pad.l - 10} y={y + barH / 2 + 4} fill="#78716c" fontSize={11} textAnchor="end" letterSpacing="-0.02em">{d.q.split(': ')[1]}</text>
                                    <line x1={center} x2={center} y1={pad.t} y2={h - pad.b + 10} stroke="#e7e5e4" strokeWidth={1.5} strokeDasharray="3,3" />

                                    {/* Polarized segments */}
                                    <rect x={currentX} y={y} width={(d.vals[0] / 100) * mainW} height={barH} fill={colors[0]} stroke="#fff" strokeWidth={1.5} rx={1} />
                                    <rect x={currentX + (d.vals[0] / 100) * mainW} y={y} width={(d.vals[1] / 100) * mainW} height={barH} fill={colors[1]} stroke="#fff" strokeWidth={1.5} rx={1} />
                                    <rect x={center} y={y} width={(d.vals[3] / 100) * mainW} height={barH} fill={colors[3]} stroke="#fff" strokeWidth={1.5} rx={1} />
                                    <rect x={center + (d.vals[3] / 100) * mainW} y={y} width={(d.vals[4] / 100) * mainW} height={barH} fill={colors[4]} stroke="#fff" strokeWidth={1.5} rx={1} />

                                    {/* Neutral segment isolated */}
                                    <rect x={neutralX} y={y} width={(d.vals[2] / 100) * neutralW} height={barH} fill={colors[2]} stroke="#fff" strokeWidth={1.5} rx={2} />
                                    <text x={neutralX + (d.vals[2] / 100) * neutralW + 5} y={y + barH / 2 + 3} fill="#a8a29e" fontSize={9}>{d.vals[2]}%</text>
                                </g>
                            );
                        }
                    })}
                </svg>
            </div>
        </ChartFrame>
    );
}

export default function WhereIsTheMoneyGoingLesson() {
    const { lang } = useLang();

    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive: area and angle are weak visual encodings' },
                { sectionId: 'perception', slug: 'cognitive-load', label: '1.2 — Cognitive Load: how pie charts overload working memory' },
                { sectionId: 'lab', slug: 'visual-emphasis', label: '3.3 — Visual Emphasis: how color manipulation distorts pie charts' },
            ]}
        >
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.whereIsTheMoneyGoing.intro1') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.whereIsTheMoneyGoing.intro2') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.whereIsTheMoneyGoing.intro3') }} />

                {/* Pie vs bar comparison */}
                <PieVsBarComparisonChart lang={lang} />

                {/* When to use each */}
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-5">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                        {t(lang, 's2.whereIsTheMoneyGoing.guide.title')}
                    </p>
                    <div className="space-y-2">
                        {[0, 1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="flex items-center gap-3 text-[12px]">
                                <span className="text-stone-400 leading-relaxed flex-1">{t(lang, `s2.whereIsTheMoneyGoing.guide.items.${i}.condition`)}</span>
                                <span className="shrink-0 text-brand font-semibold">→ {t(lang, `s2.whereIsTheMoneyGoing.guide.items.${i}.chart`)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Waffle Chart Lab */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's2.whereIsTheMoneyGoing.waffleDemo.sectionTitle')}
                    </p>
                    <WaffleDemo lang={lang} />
                </div>

                {/* Waterfall Lab */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's2.whereIsTheMoneyGoing.waterfallDemo.sectionTitle')}
                    </p>
                    <WaterfallDemo lang={lang} />
                </div>
                {/* Likert Lab */}
                <div className="space-y-3 mt-8">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's2.whereIsTheMoneyGoing.likertDemo.sectionTitle')}
                    </p>
                    <LikertDivergingDemo lang={lang} />
                </div>
            </div>

            <ChartFamilyLesson
                charts={getCharts(lang)}
                clevelandNote={t(lang, 's2.whereIsTheMoneyGoing.clevelandNote')}
            />
        </LessonPage>
    );
}
