import { useState } from 'react';
import LessonPage from '../../layout/LessonPage';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import ChartFamilyLesson, { type ChartSpec } from './ChartFamilyLesson';
import {
    HistogramMini,
    BoxplotMini,
    ViolinMini,
    StripPlotMini,
    RugPlotMini,
    DensityMini,
    ECDFMini,
} from '../../charts/demos/MiniCharts';

const getCharts = (lang: any): ChartSpec[] => [
    {
        slug: 'histogram',
        name: t(lang, 's2.howIsItSpread.charts.histogram.name'),
        whenToUse: [
            t(lang, 's2.howIsItSpread.charts.histogram.whenToUse.0'),
            t(lang, 's2.howIsItSpread.charts.histogram.whenToUse.1'),
            t(lang, 's2.howIsItSpread.charts.histogram.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.howIsItSpread.charts.histogram.whenNotToUse.0'),
            t(lang, 's2.howIsItSpread.charts.histogram.whenNotToUse.1'),
            t(lang, 's2.howIsItSpread.charts.histogram.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.howIsItSpread.charts.histogram.interpretationRisk'),
        cognitiveRef: t(lang, 's2.howIsItSpread.charts.histogram.cognitiveRef'),
        ethicalRef: t(lang, 's2.howIsItSpread.charts.histogram.ethicalRef'),
        demo: <HistogramMini />,
    },
    {
        slug: 'boxplot',
        name: t(lang, 's2.howIsItSpread.charts.boxplot.name'),
        whenToUse: [
            t(lang, 's2.howIsItSpread.charts.boxplot.whenToUse.0'),
            t(lang, 's2.howIsItSpread.charts.boxplot.whenToUse.1'),
            t(lang, 's2.howIsItSpread.charts.boxplot.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.howIsItSpread.charts.boxplot.whenNotToUse.0'),
            t(lang, 's2.howIsItSpread.charts.boxplot.whenNotToUse.1'),
            t(lang, 's2.howIsItSpread.charts.boxplot.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.howIsItSpread.charts.boxplot.interpretationRisk'),
        cognitiveRef: t(lang, 's2.howIsItSpread.charts.boxplot.cognitiveRef'),
        ethicalRef: t(lang, 's2.howIsItSpread.charts.boxplot.ethicalRef'),
        demo: <BoxplotMini />,
    },
    {
        slug: 'violin',
        name: t(lang, 's2.howIsItSpread.charts.violin.name'),
        whenToUse: [
            t(lang, 's2.howIsItSpread.charts.violin.whenToUse.0'),
            t(lang, 's2.howIsItSpread.charts.violin.whenToUse.1'),
            t(lang, 's2.howIsItSpread.charts.violin.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.howIsItSpread.charts.violin.whenNotToUse.0'),
            t(lang, 's2.howIsItSpread.charts.violin.whenNotToUse.1'),
            t(lang, 's2.howIsItSpread.charts.violin.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.howIsItSpread.charts.violin.interpretationRisk'),
        cognitiveRef: t(lang, 's2.howIsItSpread.charts.violin.cognitiveRef'),
        ethicalRef: t(lang, 's2.howIsItSpread.charts.violin.ethicalRef'),
        demo: <ViolinMini />,
    },
    {
        slug: 'strip-plot',
        name: t(lang, 's2.howIsItSpread.charts.stripPlot.name'),
        whenToUse: [
            t(lang, 's2.howIsItSpread.charts.stripPlot.whenToUse.0'),
            t(lang, 's2.howIsItSpread.charts.stripPlot.whenToUse.1'),
            t(lang, 's2.howIsItSpread.charts.stripPlot.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.howIsItSpread.charts.stripPlot.whenNotToUse.0'),
            t(lang, 's2.howIsItSpread.charts.stripPlot.whenNotToUse.1'),
            t(lang, 's2.howIsItSpread.charts.stripPlot.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.howIsItSpread.charts.stripPlot.interpretationRisk'),
        cognitiveRef: t(lang, 's2.howIsItSpread.charts.stripPlot.cognitiveRef'),
        ethicalRef: t(lang, 's2.howIsItSpread.charts.stripPlot.ethicalRef'),
        demo: <StripPlotMini />,
    },
    {
        slug: 'rug-plot',
        name: t(lang, 's2.howIsItSpread.charts.rugPlot.name'),
        whenToUse: [
            t(lang, 's2.howIsItSpread.charts.rugPlot.whenToUse.0'),
            t(lang, 's2.howIsItSpread.charts.rugPlot.whenToUse.1'),
            t(lang, 's2.howIsItSpread.charts.rugPlot.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.howIsItSpread.charts.rugPlot.whenNotToUse.0'),
            t(lang, 's2.howIsItSpread.charts.rugPlot.whenNotToUse.1'),
            t(lang, 's2.howIsItSpread.charts.rugPlot.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.howIsItSpread.charts.rugPlot.interpretationRisk'),
        cognitiveRef: t(lang, 's2.howIsItSpread.charts.rugPlot.cognitiveRef'),
        demo: <RugPlotMini />,
    },
    {
        slug: 'density',
        name: t(lang, 's2.howIsItSpread.charts.density.name'),
        whenToUse: [
            t(lang, 's2.howIsItSpread.charts.density.whenToUse.0'),
            t(lang, 's2.howIsItSpread.charts.density.whenToUse.1'),
            t(lang, 's2.howIsItSpread.charts.density.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.howIsItSpread.charts.density.whenNotToUse.0'),
            t(lang, 's2.howIsItSpread.charts.density.whenNotToUse.1'),
            t(lang, 's2.howIsItSpread.charts.density.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.howIsItSpread.charts.density.interpretationRisk'),
        cognitiveRef: t(lang, 's2.howIsItSpread.charts.density.cognitiveRef'),
        ethicalRef: t(lang, 's2.howIsItSpread.charts.density.ethicalRef'),
        demo: <DensityMini />,
    },
    {
        slug: 'ecdf',
        name: t(lang, 's2.howIsItSpread.charts.ecdf.name'),
        whenToUse: [
            t(lang, 's2.howIsItSpread.charts.ecdf.whenToUse.0'),
            t(lang, 's2.howIsItSpread.charts.ecdf.whenToUse.1'),
            t(lang, 's2.howIsItSpread.charts.ecdf.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.howIsItSpread.charts.ecdf.whenNotToUse.0'),
            t(lang, 's2.howIsItSpread.charts.ecdf.whenNotToUse.1'),
            t(lang, 's2.howIsItSpread.charts.ecdf.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.howIsItSpread.charts.ecdf.interpretationRisk'),
        cognitiveRef: t(lang, 's2.howIsItSpread.charts.ecdf.cognitiveRef'),
        ethicalRef: t(lang, 's2.howIsItSpread.charts.ecdf.ethicalRef'),
        demo: <ECDFMini />,
    },
];

// Bin width comparison chart: same data, different histograms
function BinWidthComparisonChart({ lang }: { lang: any }) {
    // Simple underlying data: bimodal distribution
    const bins5 = [2, 4, 7, 9, 11, 15, 14, 10, 5, 3]; // narrow bins, bimodality visible
    const bins3 = [6, 24, 26, 21, 8]; // wide bins, bimodality hidden
    const w = 220, h = 130, pad = { l: 14, r: 10, t: 14, b: 24 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;

    function BarsChart({ data, label, note, color }: { data: number[], label: string, note: string, color: string }) {
        const max = Math.max(...data);
        const bw = innerW / data.length - 2;
        return (
            <div className="space-y-1">
                <p className="text-[10px] text-stone-400 font-bold text-center">{label}</p>
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
                    {data.map((v, i) => {
                        const bh = (v / max) * innerH;
                        const x = pad.l + i * (bw + 2);
                        const y = pad.t + innerH - bh;
                        return (
                            <rect key={i} x={x} y={y} width={bw} height={bh}
                                fill={color} rx={2} opacity={0.8} />
                        );
                    })}
                    <text x={w / 2} y={h - 6} fill="#a8a29e" fontSize={9} textAnchor="middle">
                        {note}
                    </text>
                </svg>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            <BarsChart data={bins5} label={t(lang, 's2.howIsItSpread.binWidthDemo.narrowLabel')} note={t(lang, 's2.howIsItSpread.binWidthDemo.narrowNote')} color="#059669" />
            <BarsChart data={bins3} label={t(lang, 's2.howIsItSpread.binWidthDemo.wideLabel')} note={t(lang, 's2.howIsItSpread.binWidthDemo.wideNote')} color="#ef4444" />
        </div>
    );
}

// Distribution chart accuracy ranking
function DistributionAccuracyChart({ lang }: { lang: any }) {
    const types = [
        { name: t(lang, 's2.howIsItSpread.accuracyChart.types.ecdf.name'), accuracy: 89, note: t(lang, 's2.howIsItSpread.accuracyChart.types.ecdf.note') },
        { name: t(lang, 's2.howIsItSpread.accuracyChart.types.histogram.name'), accuracy: 71, note: t(lang, 's2.howIsItSpread.accuracyChart.types.histogram.note') },
        { name: t(lang, 's2.howIsItSpread.accuracyChart.types.violin.name'), accuracy: 62, note: t(lang, 's2.howIsItSpread.accuracyChart.types.violin.note') },
        { name: t(lang, 's2.howIsItSpread.accuracyChart.types.box.name'), accuracy: 58, note: t(lang, 's2.howIsItSpread.accuracyChart.types.box.note') },
        { name: t(lang, 's2.howIsItSpread.accuracyChart.types.strip.name'), accuracy: 79, note: t(lang, 's2.howIsItSpread.accuracyChart.types.strip.note') },
    ];
    const w = 480, h = 220, pad = { l: 110, r: 70, t: 18, b: 30 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const barH = 24;
    const gap = (innerH - types.length * barH) / (types.length + 1);
    const color = (a: number) => a >= 75 ? '#059669' : a >= 60 ? '#f59e0b' : '#ef4444';

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
            {[0, 25, 50, 75, 100].map(v => (
                <g key={v}>
                    <line x1={pad.l + (v / 100) * innerW} x2={pad.l + (v / 100) * innerW}
                        y1={pad.t} y2={h - pad.b} stroke="#f5f5f4" strokeWidth={1} />
                    <text x={pad.l + (v / 100) * innerW} y={h - 6}
                        fill="#a8a29e" fontSize={9} textAnchor="middle">{v}%</text>
                </g>
            ))}
            {types.map((t, i) => {
                const y = pad.t + gap + i * (barH + gap);
                const bw = (t.accuracy / 100) * innerW;
                const c = color(t.accuracy);
                return (
                    <g key={t.name}>
                        <text x={pad.l - 8} y={y + barH / 2 + 4} fill="#78716c" fontSize={12} textAnchor="end">{t.name}</text>
                        <rect x={pad.l} y={y} width={bw} height={barH} fill={c} rx={3} opacity={0.85} />
                        <text x={pad.l + bw + 6} y={y + barH / 2 + 4} fill={c} fontSize={11}>{t.accuracy}%</text>
                    </g>
                );
            })}
            <text x={pad.l + innerW / 2} y={pad.t - 2} fill="#78716c" fontSize={7.5} textAnchor="middle">
                {t(lang, 's2.howIsItSpread.accuracyChart.label')}
            </text>
        </svg>
    );
}

// Distribution shape comparison demo (Boxplot vs Violin vs Ridgeline)
function DistributionShapeComparisonDemo({ lang }: { lang: any }) {
    const [view, setView] = useState<'boxplot' | 'violin' | 'ridgeline'>('boxplot');

    const w = 480;
    const h = 260;
    const pad = { l: 60, r: 20, t: 40, b: 30 };
    const chartW = w - pad.l - pad.r;
    const chartH = h - pad.t - pad.b;

    // Y positions
    const yA = pad.t + chartH * 0.25;
    const yB = pad.t + chartH * 0.75;

    const scaleX = (val: number) => pad.l + (val / 100) * chartW;

    const x10 = scaleX(10), x15 = scaleX(15), x25 = scaleX(25), x30 = scaleX(30), x35 = scaleX(35);
    const x45 = scaleX(45), x50 = scaleX(50), x55 = scaleX(55), x65 = scaleX(65), x70 = scaleX(70);
    const x75 = scaleX(75), x85 = scaleX(85), x90 = scaleX(90);

    const pathB = `M ${x10} 0 C ${x10} 0, ${x30} -50, ${x50} -50 C ${x70} -50, ${x90} 0, ${x90} 0`;
    const pathA = `M ${x10} 0 C ${x10} 0, ${x15} -45, ${x25} -45 C ${x35} -45, ${x45} -15, ${x50} -15 C ${x55} -15, ${x65} -45, ${x75} -45 C ${x85} -45, ${x90} 0, ${x90} 0`;

    const drawBox = (y: number, color: string) => (
        <g>
            <line x1={x10} x2={x90} y1={y} y2={y} stroke="#a8a29e" strokeWidth={1.5} strokeDasharray="4,4" />
            <line x1={x10} x2={x10} y1={y - 6} y2={y + 6} stroke="#78716c" strokeWidth={2} />
            <line x1={x90} x2={x90} y1={y - 6} y2={y + 6} stroke="#78716c" strokeWidth={2} />
            <rect x={x30} y={y - 12} width={x70 - x30} height={24} fill={color} fillOpacity={0.8} rx={2} />
            <line x1={x50} x2={x50} y1={y - 12} y2={y + 12} stroke="#fff" strokeWidth={2.5} />
        </g>
    );

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-6 shadow-sm">
            <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                <h3 className="text-[13px] font-bold text-stone-700 tracking-wide">
                    {t(lang, 's2.howIsItSpread.shapeDemo.chartTitle')}
                </h3>
                <div className="flex bg-stone-100 rounded-lg p-1">
                    {(['boxplot', 'violin', 'ridgeline'] as const).map(m => (
                        <button
                            key={m}
                            onClick={() => setView(m)}
                            className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-all ${view === m ? 'bg-white text-brand shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                        >
                            {m === 'boxplot' ? t(lang, 's2.howIsItSpread.shapeDemo.btnBoxplot') : m === 'violin' ? t(lang, 's2.howIsItSpread.shapeDemo.btnViolin') : t(lang, 's2.howIsItSpread.shapeDemo.btnRidgeline')}
                        </button>
                    ))}
                </div>
            </div>

            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-xl mx-auto block overflow-visible mt-2">
                {/* X Axis */}
                <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} />
                {[0, 25, 50, 75, 100].map(v => (
                    <g key={v}>
                        <line x1={scaleX(v)} x2={scaleX(v)} y1={pad.t} y2={h - pad.b} stroke="#f5f5f4" strokeWidth={1} />
                        <text x={scaleX(v)} y={h - pad.b + 14} fill="#a8a29e" fontSize={10} textAnchor="middle">{v}</text>
                    </g>
                ))}

                <text x={pad.l - 12} y={yA} fill="#57534e" fontSize={12} textAnchor="end" dominantBaseline="middle">{t(lang, 's2.howIsItSpread.shapeDemo.groupA')}</text>
                <text x={pad.l - 12} y={yB} fill="#57534e" fontSize={12} textAnchor="end" dominantBaseline="middle">{t(lang, 's2.howIsItSpread.shapeDemo.groupB')}</text>

                {view === 'boxplot' && (
                    <>
                        {drawBox(yA, '#f43f5e')}
                        {drawBox(yB, '#3b82f6')}
                    </>
                )}

                {view === 'ridgeline' && (
                    <>
                        <g transform={`translate(0, ${yA + 25})`}>
                            <path d={pathA} fill="#f43f5e" fillOpacity={0.6} stroke="#e11d48" strokeWidth={2} />
                        </g>
                        <g transform={`translate(0, ${yB + 25})`}>
                            <path d={pathB} fill="#3b82f6" fillOpacity={0.6} stroke="#2563eb" strokeWidth={2} />
                        </g>
                    </>
                )}

                {view === 'violin' && (
                    <>
                        <g transform={`translate(0, ${yA}) scale(1, 0.4)`}>
                            <path d={pathA} fill="#f43f5e" fillOpacity={0.6} stroke="#e11d48" strokeWidth={1.5} />
                            <path d={pathA} fill="#f43f5e" fillOpacity={0.6} stroke="#e11d48" strokeWidth={1.5} transform="scale(1, -1)" />
                        </g>
                        <g transform={`translate(0, ${yB}) scale(1, 0.4)`}>
                            <path d={pathB} fill="#3b82f6" fillOpacity={0.6} stroke="#2563eb" strokeWidth={1.5} />
                            <path d={pathB} fill="#3b82f6" fillOpacity={0.6} stroke="#2563eb" strokeWidth={1.5} transform="scale(1, -1)" />
                        </g>
                    </>
                )}
            </svg>

            <div className="bg-stone-50 rounded-lg p-4 border border-stone-100">
                <p className="text-[12px] text-stone-600 leading-relaxed text-center">
                    {view === 'boxplot' && <span dangerouslySetInnerHTML={{ __html: t(lang, 's2.howIsItSpread.shapeDemo.expBoxplot') }} />}
                    {view === 'violin' && <span dangerouslySetInnerHTML={{ __html: t(lang, 's2.howIsItSpread.shapeDemo.expViolin') }} />}
                    {view === 'ridgeline' && <span dangerouslySetInnerHTML={{ __html: t(lang, 's2.howIsItSpread.shapeDemo.expRidgeline') }} />}
                </p>
            </div>
        </div>
    );
}

function MeanVsMedianDemo({ lang }: { lang: any }) {
    const [outlier, setOutlier] = useState(false);

    // Base data: 9 salaries around 50k
    const baseSalaries = [40, 42, 45, 48, 50, 52, 55, 58, 60];
    const data = outlier ? [...baseSalaries, 250] : [...baseSalaries, 65];

    const mean = Math.round(data.reduce((a, b) => a + b, 0) / data.length);
    // data is sorted
    const median = (data[4] + data[5]) / 2;

    const w = 500, h = 180, pad = { l: 20, r: 20, t: 40, b: 40 };
    const chartW = w - pad.l - pad.r;
    const maxVal = 260; // scale up to 260k
    const scaleX = (val: number) => pad.l + (val / maxVal) * chartW;

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-6 shadow-sm mt-8">
            <div className="flex justify-between items-center border-b border-stone-100 pb-4 mb-4">
                <h3 className="text-[13px] font-bold text-stone-700 tracking-wide uppercase">
                    {t(lang, 's2.howIsItSpread.meanDemo.title')}
                </h3>
                <button
                    onClick={() => setOutlier(!outlier)}
                    className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-all ${outlier ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                >
                    {outlier ? t(lang, 's2.howIsItSpread.meanDemo.btnRemoveOutlier') : t(lang, 's2.howIsItSpread.meanDemo.btnAddOutlier')}
                </button>
            </div>

            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block overflow-visible">
                {/* Axis */}
                <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={2} />
                {[0, 50, 100, 150, 200, 250].map(v => (
                    <g key={v}>
                        <line x1={scaleX(v)} x2={scaleX(v)} y1={h - pad.b} y2={h - pad.b + 5} stroke="#a8a29e" strokeWidth={1} />
                        <text x={scaleX(v)} y={h - pad.b + 18} fill="#a8a29e" fontSize={10} textAnchor="middle">${v}k</text>
                    </g>
                ))}

                {/* Data points */}
                {data.map((d, i) => (
                    <circle key={i} cx={scaleX(d)} cy={h - pad.b - 20} r={6} fill="#94a3b8" opacity={0.8} />
                ))}

                {/* Median marker */}
                <g className="transition-all duration-500" transform={`translate(${scaleX(median)}, 0)`}>
                    <line x1={0} x2={0} y1={pad.t} y2={h - pad.b} stroke="#2563eb" strokeWidth={2} strokeDasharray="4,2" />
                    <rect x={-40} y={pad.t - 22} width={80} height={18} fill="#2563eb" rx={2} />
                    <text x={0} y={pad.t - 9} fill="#fff" fontSize={10} textAnchor="middle">{t(lang, 's2.howIsItSpread.meanDemo.medianLabel')}{Math.round(median)}k</text>
                </g>

                {/* Mean marker */}
                <g className="transition-all duration-500" transform={`translate(${scaleX(mean)}, 0)`}>
                    <line x1={0} x2={0} y1={pad.t + 30} y2={h - pad.b} stroke="#f43f5e" strokeWidth={2} strokeDasharray="4,2" />
                    <rect x={-40} y={pad.t + 30 - 22} width={80} height={18} fill="#f43f5e" rx={2} />
                    <text x={0} y={pad.t + 30 - 9} fill="#fff" fontSize={10} textAnchor="middle">{t(lang, 's2.howIsItSpread.meanDemo.meanLabel')}{mean}k</text>
                </g>
            </svg>

            <div className="bg-stone-50 rounded-lg p-4 border border-stone-100 mt-4">
                <p className="text-[13px] text-stone-600 leading-relaxed text-center">
                    {outlier ?
                        <span dangerouslySetInnerHTML={{ __html: t(lang, 's2.howIsItSpread.meanDemo.expOutlier').replace('${mean}', mean.toString()) }} /> :
                        <span dangerouslySetInnerHTML={{ __html: t(lang, 's2.howIsItSpread.meanDemo.expNoOutlier') }} />
                    }
                </p>
            </div>
        </div>
    );
}

export default function HowIsItSpreadLesson() {
    const { lang } = useLang();

    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive: how position encodes distribution shape' },
                { sectionId: 'mechanics', slug: 'comparison', label: '2.1 — Comparison Charts: when groups need distribution not just means' },
                { sectionId: 'lab', slug: 'data-transform', label: '3.2 — Data Transform: how aggregation hides the underlying distribution' },
            ]}
        >
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.howIsItSpread.intro1') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.howIsItSpread.intro2') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.howIsItSpread.intro3') }} />

                {/* Bin width demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's2.howIsItSpread.binWidthDemo.title')}
                    </p>
                    <BinWidthComparisonChart lang={lang} />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        {t(lang, 's2.howIsItSpread.binWidthDemo.desc')}
                    </p>
                </div>

                {/* Accuracy ranking */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's2.howIsItSpread.accuracyChart.title')}
                    </p>
                    <DistributionAccuracyChart lang={lang} />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        {t(lang, 's2.howIsItSpread.accuracyChart.desc')}
                    </p>
                </div>

                {/* Boxplot vs Violin vs Ridgeline Demo */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's2.howIsItSpread.shapeDemo.title')}
                    </p>
                    <DistributionShapeComparisonDemo lang={lang} />
                </div>

                {/* Mean vs Median Demo */}
                <MeanVsMedianDemo lang={lang} />
            </div>

            <ChartFamilyLesson
                charts={getCharts(lang)}
                clevelandNote={t(lang, 's2.howIsItSpread.clevelandNote')}
            />
        </LessonPage>
    );
}
