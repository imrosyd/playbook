import { useState } from 'react';
import LessonPage from '../../layout/LessonPage';
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
    const w = narrow ? 90 : 280;
    const h = 100;
    const pad = { l: 8, r: 8, t: 10, b: 10 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const n = data.length;
    const yMin = Math.min(...data) - 0.5;
    const yMax = Math.max(...data) + 0.5;
    const toX = (i: number) => pad.l + (i / (n - 1)) * innerW;
    const toY = (v: number) => pad.t + (1 - (v - yMin) / (yMax - yMin)) * innerH;

    return (
        <div className="space-y-3">
            <div className="flex gap-2 flex-wrap">
                {[true, false].map(n => (
                    <button key={String(n)} onClick={() => setNarrow(n)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-semibold border transition-all ${narrow === n
                            ? 'bg-brand text-white border-brand'
                            : 'bg-white text-stone-500 border-stone-200'}`}>
                        {n ? 'Narrow (steep slopes)' : 'Wide — banked to 45°'}
                    </button>
                ))}
            </div>
            <div className="flex justify-center">
                <svg viewBox={`0 0 ${w} ${h}`} style={{ width: w, height: h }}
                    className="border border-stone-100 rounded-lg bg-stone-50">
                    {data.map((v, i) => i > 0 && (
                        <line key={i}
                            x1={toX(i - 1)} y1={toY(data[i - 1])}
                            x2={toX(i)} y2={toY(v)}
                            stroke="#059669" strokeWidth={2} strokeLinecap="round" />
                    ))}
                    {data.map((v, i) => (
                        <circle key={i} cx={toX(i)} cy={toY(v)} r={3} fill="#059669" />
                    ))}
                </svg>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
                {narrow
                    ? 'Narrow aspect ratio: slopes are steep, making small fluctuations look dramatic. Hard to compare slope angles.'
                    : 'Wide (banked to 45°): average slope ≈ 45°. Slope differences between segments are most accurately perceived at this ratio.'}
            </p>
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
    const w = 320, h = 130, pad = { l: 90, r: 60, t: 14, b: 24 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const barH = 14;
    const gap = (innerH - types.length * barH) / (types.length + 1);
    const riskColor = (r: string) => r === 'Low' ? '#059669' : r === 'Medium' ? '#f59e0b' : r === 'High' ? '#ef4444' : '#991b1b';

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
            {[0, 25, 50, 75, 100].map(v => (
                <g key={v}>
                    <line x1={pad.l + (v / 100) * innerW} x2={pad.l + (v / 100) * innerW}
                        y1={pad.t} y2={h - pad.b} stroke="#f5f5f4" strokeWidth={1} />
                    <text x={pad.l + (v / 100) * innerW} y={h - 6}
                        fill="#a8a29e" fontSize={7} textAnchor="middle">{v}%</text>
                </g>
            ))}
            {types.map((t, i) => {
                const y = pad.t + gap + i * (barH + gap);
                const bw = (t.accuracy / 100) * innerW;
                const c = riskColor(t.risk);
                return (
                    <g key={t.name}>
                        <text x={pad.l - 6} y={y + barH / 2 + 4} fill="#78716c" fontSize={8} textAnchor="end">{t.name}</text>
                        <rect x={pad.l} y={y} width={bw} height={barH} fill={c} rx={2} opacity={0.85} />
                        <text x={pad.l + bw + 4} y={y + barH / 2 + 4} fill={c} fontSize={8} fontWeight={700}>{t.accuracy}%</text>
                    </g>
                );
            })}
            <text x={pad.l + innerW / 2} y={pad.t - 2} fill="#78716c" fontSize={7.5} textAnchor="middle">
                Perceptual accuracy for value comparison (% correct at same scale)
            </text>
        </svg>
    );
}

export default function TimeSeriesLesson() {
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
                    Time-series charts encode how a quantitative variable changes across an ordered temporal dimension. The line chart is the canonical form because it exploits the pre-attentive attribute of <strong>slope</strong> — the human visual system is highly sensitive to the angle and direction of line segments, detecting differences in slope even when values are close. This makes line charts among the most perceptually efficient chart types for temporal data.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    The choice of chart variant within the time-series family has significant implications for accuracy. A simple line chart allows position-based decoding — the most accurate perceptual channel. Area charts add filled regions that create false impressions of cumulative volume. Stacked areas require the viewer to mentally subtract lower layers to read upper ones. Streamgraphs sacrifice all positional accuracy for aesthetic flow. Each variant trades accuracy for a different visual effect — understanding this trade-off is essential for choosing the right form.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Aspect ratio is one of the most overlooked design decisions in time-series visualization. William Cleveland's "banking to 45°" principle (1993) demonstrated that slope perception is most accurate when the average absolute slope of line segments is approximately 45° from horizontal. A chart that is too narrow amplifies small fluctuations into dramatic-looking spikes; a chart that is too wide compresses genuine trends into nearly flat lines. The aspect ratio should be chosen to maximize the viewer's ability to distinguish real slope differences.
                </p>

                {/* Accuracy comparison */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Perceptual accuracy by time-series chart type
                    </p>
                    <TimeSeriesAccuracyChart />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        Line charts are the most accurate form. Each step toward aesthetic complexity (stacked area → streamgraph) degrades value-comparison accuracy. Choose the simpler form unless you have a strong specific reason.
                    </p>
                </div>

                {/* Banking demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Aspect ratio banking: same data, different interpretation
                    </p>
                    <p className="text-[13px] text-stone-500 leading-relaxed">
                        Cleveland's banking principle: slope perception is best when the average slope angle ≈ 45°. Toggle between a narrow and banked aspect ratio to see how the same trend reads very differently.
                    </p>
                    <BankingDemo />
                </div>
            </div>

            <ChartFamilyLesson
                charts={charts}
                clevelandNote="Slope perception is strongest when line angles fall between 30° and 60° from horizontal. The 'banking to 45°' principle (adjusting aspect ratio so the average slope is approximately 45°) maximizes slope discrimination. Streamgraphs and stacked areas sacrifice this advantage entirely."
            />
        </LessonPage>
    );
}
