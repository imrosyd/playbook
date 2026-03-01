import { useState } from 'react';
import LessonPage from '../../layout/LessonPage';
import ChartFamilyLesson, { type ChartSpec } from './ChartFamilyLesson';
import {
    VerticalBarMini,
    HorizontalBarMini,
    GroupedBarMini,
    StackedBarMini,
    StackedBar100Mini,
    LollipopMini,
    DotPlotMini,
    BulletMini,
    DumbbellMini,
    ParetoMini,
} from '../../charts/demos/MiniCharts';

const charts: ChartSpec[] = [
    {
        slug: 'vertical-bar',
        name: 'Vertical Bar',
        whenToUse: [
            'Comparing discrete categories with a common baseline',
            'Showing counts, totals, or proportions across a small set of groups (≤ 12)',
            'When category labels are short enough to fit beneath each bar',
        ],
        whenNotToUse: [
            'Many categories (> 12) — switch to horizontal bars',
            'Continuous data — use a histogram instead',
            'When the zero baseline is not meaningful or would compress the interesting range',
        ],
        interpretationRisk: "Truncating the y-axis to start above zero exaggerates differences. A bar whose top is twice as high implies exactly double the value — this logic breaks if the axis doesn't start at zero.",
        cognitiveRef: 'Pre-attentive: length',
        ethicalRef: 'Risk: Truncated axis',
        demo: <VerticalBarMini />,
    },
    {
        slug: 'horizontal-bar',
        name: 'Horizontal Bar',
        whenToUse: [
            'Long category labels that would be cramped or angled under vertical bars',
            'Ranked data where the natural reading direction is top-to-bottom',
            'More than 8–12 categories',
        ],
        whenNotToUse: [
            'Time-series data — time flows left-to-right by convention',
            'When vertical space is constrained and many categories must be shown',
            'Negative values that need a centered axis — dumbbell or diverging bar is clearer',
        ],
        interpretationRisk: 'Sorting order dramatically changes perceived rank importance. An alphabetically sorted horizontal bar can make an unimportant category appear prominent simply by its position.',
        cognitiveRef: 'Pre-attentive: length',
        ethicalRef: 'Risk: Misleading sort order',
        demo: <HorizontalBarMini />,
    },
    {
        slug: 'grouped-bar',
        name: 'Grouped Bar',
        whenToUse: [
            'Comparing values across two or three sub-groups within each category',
            'When absolute magnitudes of each sub-group matter more than the part-to-whole relationship',
            'Side-by-side comparison of fewer than 4 series',
        ],
        whenNotToUse: [
            'More than 3–4 groups — visual clutter makes comparison difficult',
            'When part-to-whole proportions are the main message — use stacked or 100% stacked bars',
            'When the series have very different scales — dual-axis charts introduce their own risks',
        ],
        interpretationRisk: 'With 4+ groups, grouped bars become a visual "comb" that\'s hard to scan. The eye compares adjacent bars easily but struggles to compare bars of the same series across categories.',
        cognitiveRef: 'Pre-attentive: length, color',
        ethicalRef: 'Risk: Cognitive overload',
        demo: <GroupedBarMini />,
    },
    {
        slug: 'stacked-bar',
        name: 'Stacked Bar',
        whenToUse: [
            'Showing part-to-whole composition while also conveying the total magnitude',
            'When the bottom segment is the primary comparison focus (it has a common baseline)',
            'Two to five segments per bar',
        ],
        whenNotToUse: [
            'When each segment needs precise comparison — only the bottom segment has a common baseline',
            'More than five segments — the middle layers become impossible to decode accurately',
            'When totals are irrelevant and only proportions matter — use 100% stacked instead',
        ],
        interpretationRisk: 'Middle and upper segments float above different baselines, making their comparison across bars highly inaccurate. Cleveland & McGill showed this is one of the weakest visual encodings for comparison tasks.',
        cognitiveRef: 'Pre-attentive: length (bottom only)',
        ethicalRef: 'Risk: Floating baseline',
        demo: <StackedBarMini />,
    },
    {
        slug: 'stacked-bar-100',
        name: '100% Stacked Bar',
        whenToUse: [
            'Comparing proportional composition across categories when absolute totals differ or are unimportant',
            'Showing how the mix of components changes across groups',
            'When all segments must add to 100% and that relationship is meaningful',
        ],
        whenNotToUse: [
            'When absolute magnitudes matter — the normalization hides real differences in total scale',
            'More than 5 segments — interior proportions become unreadable',
            'Single-category data — a pie chart communicates the same with less visual work',
        ],
        interpretationRisk: 'Normalization can hide dramatic differences in total scale. A category with 10 responses and one with 10,000 will look identical if their proportions match — always annotate the underlying totals.',
        cognitiveRef: 'Pre-attentive: length (relative)',
        ethicalRef: 'Risk: Hidden totals',
        demo: <StackedBar100Mini />,
    },
    {
        slug: 'lollipop',
        name: 'Lollipop',
        whenToUse: [
            'Same use cases as a bar chart but when the chart feels too heavy or dense',
            'Many categories where filled bars create a visually noisy block',
            'Emphasizing the endpoint value rather than the filled area',
        ],
        whenNotToUse: [
            'Very small values — the thin stem becomes hard to see at low magnitudes',
            'When negative and positive values exist on the same axis without a reference line',
            'Dense multi-series comparisons — the stems overlap and obscure each other',
        ],
        interpretationRisk: 'The dot draws attention to the absolute value while the stem encodes magnitude. If the baseline is not zero, readers may misread the dot position as a relative value rather than an absolute one.',
        cognitiveRef: 'Pre-attentive: position',
        demo: <LollipopMini />,
    },
    {
        slug: 'dot-plot',
        name: 'Dot Plot',
        whenToUse: [
            'Showing the distribution of individual data points within groups',
            'Small-to-medium datasets where showing every point adds value',
            'When you want to expose gaps, clusters, and outliers without aggregating',
        ],
        whenNotToUse: [
            'Large datasets (> 200 points per group) — dots overlap into indecipherable blobs',
            'When a summary statistic (mean, median) is the main message — use a bar or boxplot',
            'Nominal categories with no meaningful point comparison across groups',
        ],
        interpretationRisk: 'Jittering (adding random noise to reduce overlap) can imply precision that doesn\'t exist. Readers may interpret the horizontal position of jittered dots as carrying meaning.',
        cognitiveRef: 'Pre-attentive: position',
        ethicalRef: 'Risk: Jitter misread',
        demo: <DotPlotMini />,
    },
    {
        slug: 'bullet',
        name: 'Bullet Chart',
        whenToUse: [
            'KPI dashboards that need to show actual vs. target and qualitative performance bands in minimal space',
            'Replacing speedometer/gauge charts — bullet charts use space more efficiently',
            'When three performance zones (poor/acceptable/good) need to be visible simultaneously',
        ],
        whenNotToUse: [
            'Audiences unfamiliar with the bullet chart format — always include a legend',
            'More than three performance zones — decoding becomes too complex',
            'When trend over time matters — bullet charts are point-in-time snapshots',
        ],
        interpretationRisk: 'The three overlapping layers (performance bands, actual value, target marker) require explanation. Unfamiliar readers commonly misread the dark bar as the target or confuse the comparative bar for the actual value.',
        cognitiveRef: 'Pre-attentive: length, position',
        ethicalRef: 'Risk: Decoding complexity',
        demo: <BulletMini />,
    },
    {
        slug: 'dumbbell',
        name: 'Dumbbell (Gap) Chart',
        whenToUse: [
            'Showing the change or gap between two values for the same entity',
            'Before/after comparisons across multiple items simultaneously',
            'When the magnitude of the gap is more important than the absolute values',
        ],
        whenNotToUse: [
            'More than two time points — a slope graph or multi-line chart is clearer',
            'When absolute position rather than the gap size is the main message',
            'Overlapping ranges that make the connecting line ambiguous',
        ],
        interpretationRisk: 'Color coding the direction of change (increase/decrease) is essential but can encode editorial bias. The choice of which endpoint is colored "good" vs. "bad" reflects a value judgment that should be made explicit.',
        cognitiveRef: 'Pre-attentive: length (gap), color',
        ethicalRef: 'Risk: Color bias',
        demo: <DumbbellMini />,
    },
    {
        slug: 'pareto',
        name: 'Pareto Chart',
        whenToUse: [
            'Quality and process improvement: identifying the vital few causes that drive most of the effect',
            'Prioritization when resources are limited and impact must be maximized',
            'When both frequency and cumulative percentage are needed together',
        ],
        whenNotToUse: [
            'When all categories have roughly equal frequency — the "80/20 shape" won\'t appear',
            'Purely exploratory data analysis — the sorted order is prescriptive, not descriptive',
            'When the category ordering should reflect natural sequence (e.g., time) not frequency rank',
        ],
        interpretationRisk: 'The dual-axis design (counts left, cumulative % right) requires careful scale alignment. If the right axis does not end at 100% aligned with the full height, the cumulative line appears to show a different trend than it actually represents.',
        cognitiveRef: 'Pre-attentive: length, position',
        ethicalRef: 'Risk: Dual-axis misalignment',
        demo: <ParetoMini />,
    },
];

// Cleveland-McGill accuracy hierarchy chart
function AccuracyHierarchyChart() {
    const encodings = [
        { rank: 1, name: 'Position (common scale)', accuracy: 95, example: 'Bar chart, dot plot' },
        { rank: 2, name: 'Position (non-aligned)', accuracy: 78, example: 'Stacked bar segments' },
        { rank: 3, name: 'Length', accuracy: 74, example: 'Bar chart' },
        { rank: 4, name: 'Direction / slope', accuracy: 68, example: 'Line chart' },
        { rank: 5, name: 'Angle', accuracy: 55, example: 'Pie chart' },
        { rank: 6, name: 'Area', accuracy: 42, example: 'Treemap, bubble' },
        { rank: 7, name: 'Volume', accuracy: 28, example: '3D chart' },
        { rank: 8, name: 'Color saturation', accuracy: 21, example: 'Heatmap (single hue)' },
    ];
    const w = 480, h = 220, pad = { l: 170, r: 70, t: 18, b: 28 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const barH = 16;
    const gap = (innerH - encodings.length * barH) / (encodings.length + 1);
    const color = (a: number) => a >= 70 ? '#059669' : a >= 45 ? '#f59e0b' : '#ef4444';

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
            {encodings.map((e, i) => {
                const y = pad.t + gap + i * (barH + gap);
                const bw = (e.accuracy / 100) * innerW;
                const c = color(e.accuracy);
                return (
                    <g key={e.rank}>
                        <text x={4} y={y + barH / 2 + 4} fill="#a8a29e" fontSize={9} fontWeight={700}>
                            #{e.rank}
                        </text>
                        <text x={20} y={y + barH / 2 + 4} fill="#78716c" fontSize={10} textAnchor="start">
                            {e.name}
                        </text>
                        <rect x={pad.l} y={y} width={bw} height={barH} fill={c} rx={3} opacity={0.85} />
                        <text x={pad.l + bw + 5} y={y + barH / 2 + 4} fill={c} fontSize={10} fontWeight={700}>{e.accuracy}%</text>
                    </g>
                );
            })}
            <text x={pad.l + innerW / 2} y={pad.t - 4} fill="#78716c" fontSize={10} textAnchor="middle">
                Perceptual accuracy (Cleveland &amp; McGill, 1984)
            </text>
        </svg>
    );
}
// Grouped Bar vs Dumbbell comparison
function GroupedVsDumbbellDemo() {
    const [isDumbbell, setIsDumbbell] = useState(true);

    // Ranked by "after" value to highlight the end state
    const data = [
        { label: 'Region 3', before: 30, after: 85 },
        { label: 'Region 1', before: 45, after: 65 },
        { label: 'Region 4', before: 70, after: 55 },
        { label: 'Region 5', before: 20, after: 40 },
        { label: 'Region 2', before: 60, after: 35 },
    ];

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-5 shadow-sm">
            <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                <div>
                    <h3 className="text-[13px] font-bold text-stone-700 tracking-wide">
                        Adoption Rate: 2023 vs 2024
                    </h3>
                    <p className="text-[11px] text-stone-500">How did each region change year-over-year?</p>
                </div>
                <button
                    onClick={() => setIsDumbbell(!isDumbbell)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${isDumbbell ? 'bg-brand text-white' : 'bg-stone-100 text-stone-600 border border-stone-200'}`}
                >
                    {isDumbbell ? 'Switch to Grouped Bars' : 'Switch to Dumbbell Chart'}
                </button>
            </div>

            <div className="flex gap-4 items-center justify-center text-[10px] font-bold uppercase tracking-wider text-stone-500">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-stone-300"></span> 2023</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-brand"></span> 2024</div>
            </div>

            <div className="py-2 space-y-5">
                {data.map(d => {
                    const isIncrease = d.after > d.before;
                    const diff = Math.abs(d.after - d.before);
                    const min = Math.min(d.before, d.after);

                    return (
                        <div key={d.label} className="relative h-6 flex items-center">
                            {/* Label */}
                            <div className="w-20 text-[11px] font-bold text-stone-600 text-right pr-4">
                                {d.label}
                            </div>

                            {/* Chart Area */}
                            <div className="flex-1 relative h-full bg-stone-50/50 rounded flex items-center border-l border-stone-200">
                                {isDumbbell ? (
                                    <>
                                        {/* Dumbbell connecting line */}
                                        <div
                                            className="absolute h-[3px] rounded-full z-0 transition-all duration-500 ease-in-out"
                                            style={{
                                                left: `${min}%`,
                                                width: `${diff}%`,
                                                backgroundColor: isIncrease ? '#10b981' : '#f43f5e' // green for up, rose for down
                                            }}
                                        ></div>
                                        {/* Before dot */}
                                        <div
                                            className="absolute w-3.5 h-3.5 rounded-full bg-stone-300 z-10 -ml-[7px] transition-all duration-500 ease-in-out border-2 border-white shadow-sm"
                                            style={{ left: `${d.before}%` }}
                                        ></div>
                                        {/* After dot */}
                                        <div
                                            className="absolute w-4 h-4 rounded-full bg-brand z-20 -ml-[8px] transition-all duration-500 ease-in-out border-2 border-white shadow-sm"
                                            style={{ left: `${d.after}%` }}
                                        ></div>
                                        {/* Delta label */}
                                        <div
                                            className="absolute -top-4 text-[9px] font-bold z-30 transition-all duration-500 opacity-80"
                                            style={{
                                                left: `${min + (diff / 2)}%`,
                                                transform: 'translateX(-50%)',
                                                color: isIncrease ? '#059669' : '#e11d48'
                                            }}
                                        >
                                            {isIncrease ? '+' : '-'}{diff}%
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Grouped Bar for Before */}
                                        <div
                                            className="absolute h-2.5 bg-stone-300 top-0.5 rounded-r-sm transition-all duration-500 ease-in-out"
                                            style={{ left: 0, width: `${d.before}%` }}
                                        ></div>
                                        {/* Grouped Bar for After */}
                                        <div
                                            className="absolute h-2.5 bg-brand bottom-0.5 rounded-r-sm transition-all duration-500 ease-in-out"
                                            style={{ left: 0, width: `${d.after}%` }}
                                        ></div>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex border-t border-stone-100 justify-end pt-1 pr-2">
                <div className="w-[calc(100%-5rem)] flex justify-between text-[9px] text-stone-400 font-bold">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                </div>
            </div>

            <div className="bg-stone-50 rounded-lg p-4 border border-stone-100 mt-2">
                <p className="text-[12px] text-stone-600 leading-relaxed text-center">
                    {isDumbbell
                        ? <span>The <strong>Dumbbell chart</strong> encodes the <em>change</em> as the primary visual element (the connecting line). The colored lines instantly show which regions improved (green) or declined (red), and the length of the line shows the magnitude of the change.</span>
                        : <span>The <strong>Grouped Bar chart</strong> forces the viewer to jump back and forth between two bars to calculate the difference mentally. It is harder to quickly assess who improved the most or who declined.</span>}
                </p>
            </div>
        </div>
    );
}

export default function WhoIsWinningLesson() {
    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive Attributes: length is rank 2 in the accuracy hierarchy' },
                { sectionId: 'perception', slug: 'anchoring', label: '1.3 — Anchoring: how axis baseline controls every bar comparison' },
                { sectionId: 'lab', slug: 'axis-scale', label: '3.1 — Axis & Scale: see how truncation distorts bar charts' },
            ]}
        >
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Comparison charts encode quantitative differences between discrete categories. William Cleveland and Robert McGill's landmark 1984 study established a perceptual accuracy hierarchy for visual encodings — ranking them by how precisely humans can decode the magnitude differences they represent. <strong>Position on a common scale</strong> (the foundation of bar charts) ranked first with approximately 95% accuracy, while angle (pie charts) ranked 5th at ~55% and area (treemaps, bubble charts) ranked 6th at ~42%. This hierarchy is not aesthetic preference — it was empirically validated through controlled experiments.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    The practical implications are significant. When the goal is comparison — "which category is larger, and by how much?" — bar charts on a shared baseline are the most perceptually efficient choice. The moment you deviate from position-on-common-scale (by stacking bars, using pie slices, or switching to bubble size), you introduce perceptual error. Sometimes this tradeoff is worth it for other reasons (part-to-whole relationship, spatial constraints, aesthetic context) but it should always be a conscious choice, not a default.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Beyond the encoding channel, comparison chart accuracy is heavily influenced by the y-axis baseline. A bar chart's entire communicative power rests on the assumption that bar height is proportional to value — an assumption that requires the y-axis to start at zero. Truncating the axis to start above zero destroys this proportionality and turns the bars into a position-based encoding instead of a length-based one, effectively degrading accuracy to Cleveland & McGill's rank 2. This is why axis truncation is one of the most impactful single design decisions in comparison charts.
                </p>

                {/* Accuracy hierarchy */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Cleveland & McGill (1984): visual encoding accuracy hierarchy
                    </p>
                    <AccuracyHierarchyChart />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        This ranking is empirical, not aesthetic. For comparison tasks, always prefer encodings in the green zone (rank 1–3). Move to lower-ranked encodings only when other design constraints require it.
                    </p>
                </div>

                {/* Bar chart elements */}
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-5">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                        Design decisions that most affect comparison accuracy
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            {
                                decision: 'Y-axis baseline',
                                honest: 'Start at zero — bar heights directly encode values',
                                risk: 'Truncation makes bars appear proportionally larger/smaller than actual values',
                            },
                            {
                                decision: 'Sort order',
                                honest: 'Sort by value (descending) — highest priority comparison goes to the best spatial position',
                                risk: 'Alphabetical or arbitrary sorting buries the most important comparisons',
                            },
                            {
                                decision: 'Bar width / spacing',
                                honest: 'Consistent widths — visual area does not add spurious information',
                                risk: 'Variable-width bars introduce an area encoding that conflicts with height encoding',
                            },
                            {
                                decision: 'Color use',
                                honest: 'Single brand color — color is not an additional encoding channel',
                                risk: 'Multi-color bars hijack pre-attentive attention to specific bars before the viewer reads values',
                            },
                        ].map((d, i) => (
                            <div key={i} className="bg-white rounded-xl border border-stone-200 p-3 space-y-1.5">
                                <p className="text-[12px] font-bold text-stone-800">{d.decision}</p>
                                <p className="text-[11px] text-brand leading-relaxed">✓ {d.honest}</p>
                                <p className="text-[11px] text-red-600 leading-relaxed">⚠ {d.risk}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dumbbell Chart Lab */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Alternative to Grouped Bars: The Dumbbell Chart
                    </p>
                    <GroupedVsDumbbellDemo />
                </div>
            </div>

            <ChartFamilyLesson
                charts={charts}
                clevelandNote="Position along a common scale is the most accurately decoded visual encoding (rank 1). Stacked bars force readers to compare floating segments — only the bottom segment benefits from a common baseline, making all other segments rank 5 or lower in perceptual accuracy."
            />
        </LessonPage>
    );
}
