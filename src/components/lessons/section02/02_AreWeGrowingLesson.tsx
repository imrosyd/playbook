import { useState } from 'react';
import LessonPage from '../../layout/LessonPage';
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

const charts: ChartSpec[] = [
    {
        slug: 'line',
        name: 'Line Chart',
        whenToUse: [
            'Continuous temporal data where each time point is connected to the next',
            'Showing trends, momentum, and rate of change over time',
            'One to four series that need to be compared across the same time axis',
        ],
        whenNotToUse: [
            'Discrete, unordered categories — use a bar chart where connection implies continuity',
            'When individual data points need emphasis over the trend — use a dot plot or connected scatter',
            'Sparse data where interpolation between points would be misleading',
        ],
        interpretationRisk: 'Connecting points with a line implies that interpolated values between observations are valid. When data is sampled infrequently, a smooth line suggests false precision about what happened between measurements.',
        cognitiveRef: 'Pre-attentive: slope, direction',
        ethicalRef: 'Risk: Implied interpolation',
        demo: <LineMini />,
    },
    {
        slug: 'multi-line',
        name: 'Multi-Line',
        whenToUse: [
            'Comparing trends of 2–5 related series on the same scale over time',
            'When relative ordering and crossover points between series matter',
            'Longitudinal panel data where individual trajectories are the story',
        ],
        whenNotToUse: [
            'More than 5–6 lines — lines cross and create a "spaghetti chart" that\'s unreadable',
            'Series on dramatically different scales — a normalized or indexed view is needed',
            'When the focus is on a single series — a simple line chart with annotation is clearer',
        ],
        interpretationRisk: 'Color is the primary differentiator. With more than 5 lines, colorblind-safe palettes run out of distinguishable hues, and relying on color alone excludes a significant portion of the audience.',
        cognitiveRef: 'Pre-attentive: color, slope',
        ethicalRef: 'Risk: Color accessibility',
        demo: <MultiLineMini />,
    },
    {
        slug: 'area',
        name: 'Area Chart',
        whenToUse: [
            'Showing magnitude of change over time when the filled area communicates cumulative volume',
            'When the absolute quantity at each point matters as much as the trend',
            'Comparing a single series to a reference band or zero baseline',
        ],
        whenNotToUse: [
            'Multiple overlapping series — filled areas obscure each other; use lines instead',
            'When precise reading of values at individual points is required',
            'Data with sharp peaks and valleys where the filled area creates ambiguous shapes',
        ],
        interpretationRisk: 'The shaded area encodes the same information as the line but adds visual weight. Readers often interpret a larger filled area as representing "more total quantity" — this is only valid if the y-axis starts at zero.',
        cognitiveRef: 'Pre-attentive: area (weak)',
        ethicalRef: 'Risk: Area quantity confusion',
        demo: <AreaMini />,
    },
    {
        slug: 'stacked-area',
        name: 'Stacked Area',
        whenToUse: [
            'Showing how multiple components contribute to a changing total over time',
            'When both individual series trends and the total are important',
            '3–5 series with consistent, non-volatile patterns',
        ],
        whenNotToUse: [
            'Series with high volatility — ripple effects between layers obscure individual trends',
            'When series cross each other over time — consider small multiples instead',
            'More than 5 layers — the upper layers become impossible to read accurately',
        ],
        interpretationRisk: 'Upper layers in a stacked area chart use a moving, non-zero baseline. A layer that appears to grow steeply may actually be flat — it\'s simply being pushed up by growth in the layers below it.',
        cognitiveRef: 'Pre-attentive: area',
        ethicalRef: 'Risk: Floating baseline',
        demo: <StackedAreaMini />,
    },
    {
        slug: 'step',
        name: 'Step Chart',
        whenToUse: [
            'Data that changes discretely rather than continuously (prices, policy rates, software versions)',
            'When the value stays constant between observed change points',
            'Process or event data where the transition is instantaneous',
        ],
        whenNotToUse: [
            'Naturally continuous data — a regular line chart better represents smooth change',
            'Very high-frequency data where step transitions become visually indistinct',
            'When the timing of transitions is ambiguous or the data is noisy',
        ],
        interpretationRisk: 'The horizontal segments imply that the exact value is known for every point in time between steps. For infrequently sampled data, this may overstate confidence in between-step values.',
        cognitiveRef: 'Pre-attentive: slope (zero vs. non-zero)',
        demo: <StepMini />,
    },
    {
        slug: 'streamgraph',
        name: 'Streamgraph',
        whenToUse: [
            'Artistic or editorial presentations of how multiple categories flow over time',
            'Showing organic, wave-like trends where exact values are secondary to the visual narrative',
            'Large datasets with many series where overlapping is unavoidable',
        ],
        whenNotToUse: [
            'When precise values or baselines need to be read — the wiggle offset makes this impossible',
            'Analytical dashboards or reports where accuracy is paramount',
            'Fewer than 5 series — a stacked area chart communicates the same with more clarity',
        ],
        interpretationRisk: 'The wiggle-offset baseline makes it impossible to accurately read individual series values. Streamgraphs are frequently used to make data look more impressive or "alive" at the expense of analytical accuracy.',
        cognitiveRef: 'Pre-attentive: area (gestalt)',
        ethicalRef: 'Risk: Decorative over informative',
        demo: <StreamgraphMini />,
    },
    {
        slug: 'bump',
        name: 'Bump Chart',
        whenToUse: [
            'Tracking changes in rank or relative position over time for a small set of entities',
            'League tables, rankings, or competitive standings across discrete time points',
            'When the crossing and overtaking of entities is the main narrative',
        ],
        whenNotToUse: [
            'More than 8–10 entities — line crossings become a tangled web',
            'When absolute values matter — bump charts discard magnitude information entirely',
            'Continuous time data — bump charts are designed for discrete ranked snapshots',
        ],
        interpretationRisk: 'Bump charts show only ordinal rank, not the magnitude of the underlying metric. A team that moves from rank 1 to rank 2 by a tiny margin and one that drops 50 points look identical if they both drop one rank.',
        cognitiveRef: 'Pre-attentive: slope, color',
        ethicalRef: 'Risk: Magnitude loss',
        demo: <BumpMini />,
    },
    {
        slug: 'sparkline',
        name: 'Sparkline',
        whenToUse: [
            'Embedding trend indicators inline with text, tables, or dashboards',
            'When the shape of the trend matters more than individual data values',
            'High-density dashboards displaying many metrics simultaneously',
        ],
        whenNotToUse: [
            'When specific values need to be read — sparklines have no axes or labels',
            'Comparisons between sparklines with different scales — the shapes will mislead',
            'Standalone charts — sparklines are designed as contextual micro-visualizations',
        ],
        interpretationRisk: 'Sparklines auto-scale to fill available space. Two sparklines showing a 5% vs. 50% change can appear identical in shape if the axis scaling is independent, leading readers to equate very different magnitudes.',
        cognitiveRef: 'Pre-attentive: slope',
        ethicalRef: 'Risk: Scale normalization',
        demo: <SparklineMini />,
    },
    {
        slug: 'candlestick',
        name: 'Candlestick',
        whenToUse: [
            'Financial data showing open, high, low, and close prices for a time period',
            'When the intra-period price range and direction of movement both matter',
            'Audiences familiar with financial charting conventions',
        ],
        whenNotToUse: [
            'Non-financial data — the OHLC encoding is a domain-specific convention',
            'Long date ranges where individual candles become too small to distinguish',
            'When only closing prices are relevant — a simple line chart is cleaner',
        ],
        interpretationRisk: 'The green/red color convention encodes gain/loss relative to the previous close, but many implementations color against the same-period open. These conventions are not universal and should always be explicitly labeled.',
        cognitiveRef: 'Pre-attentive: color (hue)',
        ethicalRef: 'Risk: Ambiguous color convention',
        demo: <CandlestickMini />,
    },
    {
        slug: 'ohlc',
        name: 'OHLC Chart',
        whenToUse: [
            'Financial data for technically sophisticated audiences who prefer OHLC to candlesticks',
            'When print or greyscale rendering makes color-dependent candlesticks impractical',
            'Compact display of price range data where candle bodies would be too wide',
        ],
        whenNotToUse: [
            'Non-financial audiences — the tick-and-stem encoding is highly domain-specific',
            'Very short time periods where individual bars have no visual separation',
            'When simpler encoding (close price only) is sufficient for the decision at hand',
        ],
        interpretationRisk: 'OHLC bars encode four values in a single glyph using position, length, and tick direction. Readers new to the format frequently misinterpret the opening tick as the low or the closing tick as the high.',
        cognitiveRef: 'Pre-attentive: position',
        ethicalRef: 'Risk: Glyph misinterpretation',
        demo: <OHLCMini />,
    },
];

// Aspect ratio banking demo
function BankingDemo() {
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
                    <h3 className="text-xl font-bold text-stone-900">Aspect Ratio Banking</h3>
                    <p className="text-[13px] text-stone-500 max-w-md">Cleveland's principle: bank to 45° for optimal slope perception.</p>
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
                            {n ? 'Narrow' : 'Banked (45°)'}
                        </button>
                    ))}
                </div>
            </div>

            <ChartFrame
                label="SLOPE PERCEPTION TEST"
                note={narrow ? "In this narrow layout, the slopes appear exaggeratedly steep. It's harder to distinguish between 'fast growth' and 'very fast growth' when everything looks like a vertical spike." : "Banked to 45°: When the average slope is roughly 45°, the human eye is most efficient at detecting small differences in the rate of change between segments."}
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
                    <rect x={0} y={0} width={panelW} height={h} fill="#f5f5f4" rx={12} stroke="#e7e5e4" strokeWidth={1} />
                    <text x={panelW / 2} y={18} fill="#78716c" fontSize={8} textAnchor="middle" className="tracking-widest uppercase">
                        {narrow ? 'AMPLIFIED VARIANCE' : 'OPTIMAL DISCRIMINATION'}
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
                                <tspan x={0} y={0}>✔ Avg slope ≈ 45°</tspan>
                                <tspan x={0} dy={16}>✔ Precise comparison</tspan>
                            </text>
                        </g>
                    )}
                    {narrow && (
                        <g transform={`translate(${panelW + 20}, ${h / 2 - 10})`}>
                            <text fill="#dc2626" fontSize={10}>
                                <tspan x={0} y={0}>⚠ Slopes too steep</tspan>
                                <tspan x={0} dy={16}>⚠ False drama</tspan>
                            </text>
                        </g>
                    )}
                </svg>
            </ChartFrame>
        </div>
    );
}

// Chart type accuracy for time series
function TimeSeriesAccuracyChart() {
    const types = [
        { name: 'Line chart', accuracy: 91, risk: 'Low' },
        { name: 'Area chart', accuracy: 72, risk: 'Medium' },
        { name: 'Stacked area', accuracy: 54, risk: 'High' },
        { name: 'Streamgraph', accuracy: 31, risk: 'Very High' },
        { name: 'Bump chart', accuracy: 48, risk: 'High' },
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
                <h3 className="text-xl font-bold text-stone-900">Accuracy by Variant</h3>
                <p className="text-[13px] text-stone-500 max-w-md">Perceptual complexity vs decoding accuracy.</p>
            </div>
            <ChartFrame
                label="PERCEPTUAL ACCURACY (%)"
                note="Line charts enable position-based decoding, the most accurate channel. As we move down to stacked areas and streamgraphs, we force the audience to use area-based estimation, which has a much higher error rate."
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
    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive: position and slope are the primary time-series channels' },
                { sectionId: 'mechanics', slug: 'comparison', label: '2.1 — Comparison Charts: when to use bars vs. lines for the same data' },
                { sectionId: 'lab', slug: 'axis-scale', label: '3.1 — Axis & Scale: dual-axis and scale manipulation in time series' },
            ]}
        >
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Time-series charts encode how quantitative variables change across an ordered temporal dimension. The line chart is the canonical form because it exploits the pre-attentive attribute of <strong>slope</strong>.
                </p>

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
                                The Banking Rule
                            </p>
                            <p className="text-[14px] text-stone-700 leading-relaxed">
                                Maximize slope discrimination by banking segments to an average of <strong>45°</strong>. This prevents data "spikes" from appearing purely decorative and makes trends analytically legible.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <BankingDemo />
                    <TimeSeriesAccuracyChart />
                </div>

                {/* Conclusion Block */}
                <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 space-y-4">
                    <div className="flex items-center gap-3 text-stone-900">
                        <Info size={20} className="text-stone-400" />
                        <h4 className="text-lg font-bold">Choosing the Right Form</h4>
                    </div>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        Line charts allow position-based decoding — the most accurate perceptual channel. Use area charts only when the sum of parts is the primary story, and strictly avoid decorative "wiggles" in professional dashboards.
                    </p>
                </div>
            </div>

            <ChartFamilyLesson
                charts={charts}
                clevelandNote="Slope perception is strongest when line angles fall between 30° and 60° from horizontal. The 'banking to 45°' principle (adjusting aspect ratio so the average slope is approximately 45°) maximizes slope discrimination."
            />
        </LessonPage>
    );
}
