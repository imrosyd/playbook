import { useState } from 'react';
import LessonPage from '../../layout/LessonPage';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import ChartFrame from '../../ui/ChartFrame';
import { SECTION_COLORS } from '../../../lib/design-tokens';
import { Lightbulb, Info } from 'lucide-react';
import ChartFamilyLesson, { type ChartSpec } from './ChartFamilyLesson';
import {
    LineMini,
    MultiLineMini,
    AreaMini,
    StackedAreaMini,
    StepMini,
    StreamgraphMini,
    BumpMini,
    SparklineMini,
    CandlestickMini,
    OHLCMini,
} from '../../charts/demos/MiniCharts';

const sectionColor = SECTION_COLORS['02'].base;

const getCharts = (lang: any): ChartSpec[] => [
    {
        slug: 'line',
        name: t(lang, 's2.areWeGrowing.charts.line.name'),
        whenToUse: [
            t(lang, 's2.areWeGrowing.charts.line.whenToUse.0'),
            t(lang, 's2.areWeGrowing.charts.line.whenToUse.1'),
            t(lang, 's2.areWeGrowing.charts.line.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.areWeGrowing.charts.line.whenNotToUse.0'),
            t(lang, 's2.areWeGrowing.charts.line.whenNotToUse.1'),
            t(lang, 's2.areWeGrowing.charts.line.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.areWeGrowing.charts.line.interpretationRisk'),
        cognitiveRef: t(lang, 's2.areWeGrowing.charts.line.cognitiveRef'),
        ethicalRef: t(lang, 's2.areWeGrowing.charts.line.ethicalRef'),
        demo: <LineMini />,
    },
    {
        slug: 'multi-line',
        name: t(lang, 's2.areWeGrowing.charts.multiLine.name'),
        whenToUse: [
            t(lang, 's2.areWeGrowing.charts.multiLine.whenToUse.0'),
            t(lang, 's2.areWeGrowing.charts.multiLine.whenToUse.1'),
            t(lang, 's2.areWeGrowing.charts.multiLine.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.areWeGrowing.charts.multiLine.whenNotToUse.0'),
            t(lang, 's2.areWeGrowing.charts.multiLine.whenNotToUse.1'),
            t(lang, 's2.areWeGrowing.charts.multiLine.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.areWeGrowing.charts.multiLine.interpretationRisk'),
        cognitiveRef: t(lang, 's2.areWeGrowing.charts.multiLine.cognitiveRef'),
        ethicalRef: t(lang, 's2.areWeGrowing.charts.multiLine.ethicalRef'),
        demo: <MultiLineMini />,
    },
    {
        slug: 'area',
        name: t(lang, 's2.areWeGrowing.charts.area.name'),
        whenToUse: [
            t(lang, 's2.areWeGrowing.charts.area.whenToUse.0'),
            t(lang, 's2.areWeGrowing.charts.area.whenToUse.1'),
            t(lang, 's2.areWeGrowing.charts.area.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.areWeGrowing.charts.area.whenNotToUse.0'),
            t(lang, 's2.areWeGrowing.charts.area.whenNotToUse.1'),
            t(lang, 's2.areWeGrowing.charts.area.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.areWeGrowing.charts.area.interpretationRisk'),
        cognitiveRef: t(lang, 's2.areWeGrowing.charts.area.cognitiveRef'),
        ethicalRef: t(lang, 's2.areWeGrowing.charts.area.ethicalRef'),
        demo: <AreaMini />,
    },
    {
        slug: 'stacked-area',
        name: t(lang, 's2.areWeGrowing.charts.stackedArea.name'),
        whenToUse: [
            t(lang, 's2.areWeGrowing.charts.stackedArea.whenToUse.0'),
            t(lang, 's2.areWeGrowing.charts.stackedArea.whenToUse.1'),
            t(lang, 's2.areWeGrowing.charts.stackedArea.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.areWeGrowing.charts.stackedArea.whenNotToUse.0'),
            t(lang, 's2.areWeGrowing.charts.stackedArea.whenNotToUse.1'),
            t(lang, 's2.areWeGrowing.charts.stackedArea.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.areWeGrowing.charts.stackedArea.interpretationRisk'),
        cognitiveRef: t(lang, 's2.areWeGrowing.charts.stackedArea.cognitiveRef'),
        ethicalRef: t(lang, 's2.areWeGrowing.charts.stackedArea.ethicalRef'),
        demo: <StackedAreaMini />,
    },
    {
        slug: 'step',
        name: t(lang, 's2.areWeGrowing.charts.step.name'),
        whenToUse: [
            t(lang, 's2.areWeGrowing.charts.step.whenToUse.0'),
            t(lang, 's2.areWeGrowing.charts.step.whenToUse.1'),
            t(lang, 's2.areWeGrowing.charts.step.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.areWeGrowing.charts.step.whenNotToUse.0'),
            t(lang, 's2.areWeGrowing.charts.step.whenNotToUse.1'),
            t(lang, 's2.areWeGrowing.charts.step.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.areWeGrowing.charts.step.interpretationRisk'),
        cognitiveRef: t(lang, 's2.areWeGrowing.charts.step.cognitiveRef'),
        demo: <StepMini />,
    },
    {
        slug: 'streamgraph',
        name: t(lang, 's2.areWeGrowing.charts.streamgraph.name'),
        whenToUse: [
            t(lang, 's2.areWeGrowing.charts.streamgraph.whenToUse.0'),
            t(lang, 's2.areWeGrowing.charts.streamgraph.whenToUse.1'),
            t(lang, 's2.areWeGrowing.charts.streamgraph.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.areWeGrowing.charts.streamgraph.whenNotToUse.0'),
            t(lang, 's2.areWeGrowing.charts.streamgraph.whenNotToUse.1'),
            t(lang, 's2.areWeGrowing.charts.streamgraph.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.areWeGrowing.charts.streamgraph.interpretationRisk'),
        cognitiveRef: t(lang, 's2.areWeGrowing.charts.streamgraph.cognitiveRef'),
        ethicalRef: t(lang, 's2.areWeGrowing.charts.streamgraph.ethicalRef'),
        demo: <StreamgraphMini />,
    },
    {
        slug: 'bump',
        name: t(lang, 's2.areWeGrowing.charts.bump.name'),
        whenToUse: [
            t(lang, 's2.areWeGrowing.charts.bump.whenToUse.0'),
            t(lang, 's2.areWeGrowing.charts.bump.whenToUse.1'),
            t(lang, 's2.areWeGrowing.charts.bump.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.areWeGrowing.charts.bump.whenNotToUse.0'),
            t(lang, 's2.areWeGrowing.charts.bump.whenNotToUse.1'),
            t(lang, 's2.areWeGrowing.charts.bump.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.areWeGrowing.charts.bump.interpretationRisk'),
        cognitiveRef: t(lang, 's2.areWeGrowing.charts.bump.cognitiveRef'),
        ethicalRef: t(lang, 's2.areWeGrowing.charts.bump.ethicalRef'),
        demo: <BumpMini />,
    },
    {
        slug: 'sparkline',
        name: t(lang, 's2.areWeGrowing.charts.sparkline.name'),
        whenToUse: [
            t(lang, 's2.areWeGrowing.charts.sparkline.whenToUse.0'),
            t(lang, 's2.areWeGrowing.charts.sparkline.whenToUse.1'),
            t(lang, 's2.areWeGrowing.charts.sparkline.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.areWeGrowing.charts.sparkline.whenNotToUse.0'),
            t(lang, 's2.areWeGrowing.charts.sparkline.whenNotToUse.1'),
            t(lang, 's2.areWeGrowing.charts.sparkline.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.areWeGrowing.charts.sparkline.interpretationRisk'),
        cognitiveRef: t(lang, 's2.areWeGrowing.charts.sparkline.cognitiveRef'),
        ethicalRef: t(lang, 's2.areWeGrowing.charts.sparkline.ethicalRef'),
        demo: <SparklineMini />,
    },
    {
        slug: 'candlestick',
        name: t(lang, 's2.areWeGrowing.charts.candlestick.name'),
        whenToUse: [
            t(lang, 's2.areWeGrowing.charts.candlestick.whenToUse.0'),
            t(lang, 's2.areWeGrowing.charts.candlestick.whenToUse.1'),
            t(lang, 's2.areWeGrowing.charts.candlestick.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.areWeGrowing.charts.candlestick.whenNotToUse.0'),
            t(lang, 's2.areWeGrowing.charts.candlestick.whenNotToUse.1'),
            t(lang, 's2.areWeGrowing.charts.candlestick.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.areWeGrowing.charts.candlestick.interpretationRisk'),
        cognitiveRef: t(lang, 's2.areWeGrowing.charts.candlestick.cognitiveRef'),
        ethicalRef: t(lang, 's2.areWeGrowing.charts.candlestick.ethicalRef'),
        demo: <CandlestickMini />,
    },
    {
        slug: 'ohlc',
        name: t(lang, 's2.areWeGrowing.charts.ohlc.name'),
        whenToUse: [
            t(lang, 's2.areWeGrowing.charts.ohlc.whenToUse.0'),
            t(lang, 's2.areWeGrowing.charts.ohlc.whenToUse.1'),
            t(lang, 's2.areWeGrowing.charts.ohlc.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.areWeGrowing.charts.ohlc.whenNotToUse.0'),
            t(lang, 's2.areWeGrowing.charts.ohlc.whenNotToUse.1'),
            t(lang, 's2.areWeGrowing.charts.ohlc.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.areWeGrowing.charts.ohlc.interpretationRisk'),
        cognitiveRef: t(lang, 's2.areWeGrowing.charts.ohlc.cognitiveRef'),
        ethicalRef: t(lang, 's2.areWeGrowing.charts.ohlc.ethicalRef'),
        demo: <OHLCMini />,
    },
];

// Aspect ratio banking demo
function BankingDemo({ lang }: { lang: any }) {
    const [narrow, setNarrow] = useState(true);
    const data = [2, 3.5, 3, 5, 4.5, 7, 6, 8.5, 8, 10];
    const w = 480, h = 220;
    const panelW = narrow ? 180 : 340;
    const pad = { l: 20, r: 20, t: 30, b: 40 };
    const innerW = panelW - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const n = data.length;
    const yMin = Math.min(...data) - 0.5;
    const yMax = Math.max(...data) + 0.5;
    const toX = (i: number) => pad.l + (i / (n - 1)) * innerW;
    const toY = (v: number) => pad.t + (1 - (v - yMin) / (yMax - yMin)) * innerH;
    const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O'];

    return (
        <div className="space-y-4 mb-16">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-stone-900">{t(lang, 's2.areWeGrowing.bankingDemo.title')}</h3>
                    <p className="text-[13px] text-stone-500 max-w-md">{t(lang, 's2.areWeGrowing.bankingDemo.desc')}</p>
                </div>
                <div className="flex gap-2 p-1 bg-stone-100 rounded-xl">
                    {([true, false] as const).map(n => (
                        <button
                            key={String(n)}
                            onClick={() => setNarrow(n)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${narrow === n
                                ? 'bg-white text-stone-900 shadow-sm'
                                : 'text-stone-500 hover:text-stone-700'
                                }`}
                        >
                            {n ? t(lang, 's2.areWeGrowing.bankingDemo.btnNarrow') : t(lang, 's2.areWeGrowing.bankingDemo.btnBanked')}
                        </button>
                    ))}
                </div>
            </div>

            <ChartFrame
                label={t(lang, 's2.areWeGrowing.bankingDemo.label')}
                note={narrow ? t(lang, 's2.areWeGrowing.bankingDemo.noteNarrow') : t(lang, 's2.areWeGrowing.bankingDemo.noteBanked')}
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
                    <rect x={0} y={0} width={panelW} height={h} fill="#f5f5f4" rx={12} stroke="#e7e5e4" strokeWidth={1} />
                    <text x={panelW / 2} y={18} fill="#78716c" fontSize={8} textAnchor="middle" className="tracking-widest uppercase">
                        {narrow ? t(lang, 's2.areWeGrowing.bankingDemo.amplified') : t(lang, 's2.areWeGrowing.bankingDemo.optimal')}
                    </text>
                    {data.map((v, i) => i > 0 && (
                        <line key={i}
                            x1={toX(i - 1)} y1={toY(data[i - 1])}
                            x2={toX(i)} y2={toY(v)}
                            stroke={sectionColor} strokeWidth={2.5} strokeLinecap="round" />
                    ))}
                    {data.map((v, i) => (
                        <circle key={i} cx={toX(i)} cy={toY(v)} r={3.5} fill={sectionColor} stroke="#fff" strokeWidth={1.5} />
                    ))}
                    {months.map((m, i) => (
                        <text key={i} x={toX(i)} y={h - pad.b + 22} fill="#a8a29e" fontSize={9} textAnchor="middle" className="tabular-nums">{m}</text>
                    ))}
                    {!narrow && (
                        <g transform={`translate(${panelW + 20}, ${h / 2 - 10})`}>
                            <text fill={sectionColor} fontSize={10}>
                                <tspan x={0} y={0}>{t(lang, 's2.areWeGrowing.bankingDemo.check1')}</tspan>
                                <tspan x={0} dy={16}>{t(lang, 's2.areWeGrowing.bankingDemo.check2')}</tspan>
                            </text>
                        </g>
                    )}
                    {narrow && (
                        <g transform={`translate(${panelW + 20}, ${h / 2 - 10})`}>
                            <text fill="#dc2626" fontSize={10}>
                                <tspan x={0} y={0}>{t(lang, 's2.areWeGrowing.bankingDemo.warn1')}</tspan>
                                <tspan x={0} dy={16}>{t(lang, 's2.areWeGrowing.bankingDemo.warn2')}</tspan>
                            </text>
                        </g>
                    )}
                </svg>
            </ChartFrame>
        </div>
    );
}

// Chart type accuracy for time series
function TimeSeriesAccuracyChart({ lang }: { lang: any }) {
    const types = [
        { name: t(lang, 's2.areWeGrowing.accuracyChart.types.line'), accuracy: 91, risk: 'Low' },
        { name: t(lang, 's2.areWeGrowing.accuracyChart.types.area'), accuracy: 72, risk: 'Medium' },
        { name: t(lang, 's2.areWeGrowing.accuracyChart.types.stackedArea'), accuracy: 54, risk: 'High' },
        { name: t(lang, 's2.areWeGrowing.accuracyChart.types.streamgraph'), accuracy: 31, risk: 'Very High' },
        { name: t(lang, 's2.areWeGrowing.accuracyChart.types.bump'), accuracy: 48, risk: 'High' },
    ];
    const w = 480, h = 240, pad = { l: 110, r: 80, t: 20, b: 40 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const barH = 24;
    const gap = (innerH - types.length * barH) / (types.length + 1);
    const riskColor = (r: string) => r === 'Low' ? '#059669' : r === 'Medium' ? '#f59e0b' : r === 'High' ? '#ef4444' : '#991b1b';

    return (
        <div className="space-y-4 mb-16">
            <div className="space-y-1">
                <h3 className="text-xl font-bold text-stone-900">{t(lang, 's2.areWeGrowing.accuracyChart.title')}</h3>
                <p className="text-[13px] text-stone-500 max-w-md">{t(lang, 's2.areWeGrowing.accuracyChart.desc')}</p>
            </div>
            <ChartFrame
                label={t(lang, 's2.areWeGrowing.accuracyChart.label')}
                note={t(lang, 's2.areWeGrowing.accuracyChart.note')}
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
                    {[0, 25, 50, 75, 100].map(v => (
                        <g key={v}>
                            <line x1={pad.l + (v / 100) * innerW} x2={pad.l + (v / 100) * innerW}
                                y1={pad.t} y2={h - pad.b} stroke="#f5f5f4" strokeWidth={1} />
                            <text x={pad.l + (v / 100) * innerW} y={h - 15}
                                fill="#a8a29e" fontSize={8} textAnchor="middle" className="tabular-nums">{v}%</text>
                        </g>
                    ))}
                    {types.map((t, i) => {
                        const y = pad.t + gap + i * (barH + gap);
                        const bw = (t.accuracy / 100) * innerW;
                        const c = riskColor(t.risk);
                        return (
                            <g key={t.name}>
                                <text x={pad.l - 8} y={y + barH / 2 + 3} fill="#78716c" fontSize={9} textAnchor="end">{t.name}</text>
                                <rect x={pad.l} y={y} width={bw} height={barH} fill={c} rx={4} />
                                <text x={pad.l + bw + 6} y={y + barH / 2 + 3} fill={c} fontSize={9} className="tabular-nums">{t.accuracy}%</text>
                            </g>
                        );
                    })}
                </svg>
            </ChartFrame>
        </div>
    );
}

export default function AreWeGrowingLesson() {
    const { lang } = useLang();

    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive: position and slope are the primary time-series channels' },
                { sectionId: 'mechanics', slug: 'comparison', label: '2.1 — Comparison Charts: when to use bars vs. lines for the same data' },
                { sectionId: 'lab', slug: 'axis-scale', label: '3.1 — Axis & Scale: dual-axis and scale manipulation in time series' },
            ]}
        >
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.areWeGrowing.intro1') }} />

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
                                {t(lang, 's2.areWeGrowing.bankingRule')}
                            </p>
                            <p className="text-[14px] text-stone-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.areWeGrowing.bankingRuleDesc') }} />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <BankingDemo lang={lang} />
                    <TimeSeriesAccuracyChart lang={lang} />
                </div>

                {/* Conclusion Block */}
                <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 space-y-4">
                    <div className="flex items-center gap-3 text-stone-900">
                        <Info size={20} className="text-stone-400" />
                        <h4 className="text-lg font-bold">{t(lang, 's2.areWeGrowing.choicesTitle')}</h4>
                    </div>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        {t(lang, 's2.areWeGrowing.choicesDesc')}
                    </p>
                </div>
            </div>

            <ChartFamilyLesson
                charts={getCharts(lang)}
                clevelandNote={t(lang, 's2.areWeGrowing.clevelandNote')}
            />
        </LessonPage>
    );
}
