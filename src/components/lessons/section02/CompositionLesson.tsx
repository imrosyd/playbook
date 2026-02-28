import LessonPage from '../../layout/LessonPage';
import ChartFamilyLesson, { type ChartSpec } from './ChartFamilyLesson';
import {
    PieMini,
    DonutMini,
    TreemapMini,
    SunburstMini,
    WaffleMini,
    MosaicMini,
    WaterfallMini,
} from '../../charts/demos/MiniCharts';

const charts: ChartSpec[] = [
    {
        slug: 'pie',
        name: 'Pie Chart',
        whenToUse: [
            'Showing part-to-whole composition for 2–5 segments when approximate proportions suffice',
            'When one segment dominates (> 50%) and you want to emphasize that majority',
            'Familiar general-audience contexts where a simple visual metaphor matters',
        ],
        whenNotToUse: [
            'More than 5–6 slices — small slices become impossible to compare',
            'When precise comparison between slices is needed — bars on a common scale are more accurate',
            'Multiple pie charts side-by-side for comparison — the eye cannot compare angles across charts',
        ],
        interpretationRisk: 'Humans are poor at comparing angles and arc lengths. Cleveland & McGill ranked angle as one of the least accurate encodings. Two slices of 30% and 35% are nearly indistinguishable in a pie chart but are easily separated in a bar chart.',
        cognitiveRef: 'Pre-attentive: angle (inaccurate)',
        ethicalRef: 'Risk: Angle comparison failure',
        demo: <PieMini />,
    },
    {
        slug: 'donut',
        name: 'Donut Chart',
        whenToUse: [
            'Same contexts as a pie chart, with center space available for a summary statistic',
            'Dashboard designs where a central KPI value needs to be embedded in the composition view',
            'When the hole reduces the apparent dominance of the "filled" area illusion from a pie',
        ],
        whenNotToUse: [
            'When the ring width varies or is used to encode an additional variable (distorts area)',
            'More than 5–6 segments — same limitations as pie charts',
            'When the central value would be misleading without full context',
        ],
        interpretationRisk: 'The donut hole removes area information but readers still decode by arc length. A very thin ring width makes all arcs appear approximately equal regardless of actual proportions — the visual weight of the hole competes with the data.',
        cognitiveRef: 'Pre-attentive: arc length',
        ethicalRef: 'Risk: Ring width distortion',
        demo: <DonutMini />,
    },
    {
        slug: 'treemap',
        name: 'Treemap',
        whenToUse: [
            'Hierarchical part-to-whole data where both levels (parent and child) need to be visible simultaneously',
            'Large numbers of categories (20+) where a bar chart would be too long',
            'When relative area between categories is more important than precise values',
        ],
        whenNotToUse: [
            'Flat (non-hierarchical) data — a bar chart is more accurately decoded',
            'When the viewer needs to compare non-adjacent cells — spatial position varies with algorithm',
            'Precise value reading — area is a weak encoding channel',
        ],
        interpretationRisk: 'Treemap layout algorithms (squarified, slice-and-dice) change cell shape and adjacency each time data changes, making temporal comparison across snapshots extremely difficult. An identical dataset can produce dramatically different visual layouts.',
        cognitiveRef: 'Pre-attentive: area, color',
        ethicalRef: 'Risk: Layout instability',
        demo: <TreemapMini />,
    },
    {
        slug: 'sunburst',
        name: 'Sunburst Chart',
        whenToUse: [
            'Multi-level hierarchical part-to-whole data where the radial structure aids navigation',
            'Interactive dashboards where clicking into rings reveals sub-categories',
            'When hierarchy depth and proportion at each level are both meaningful',
        ],
        whenNotToUse: [
            'More than 3 levels — outer rings become tiny slices that are impossible to label',
            'Static print or reports — the interactive drill-down that justifies sunbursts is unavailable',
            'When comparing across multiple sunbursts — no common scale exists between charts',
        ],
        interpretationRisk: 'Outer ring segments appear larger than inner ring segments of equal proportion because the circumference is longer. The same 10% slice at the outer ring has a visually longer arc than at the inner ring, implying greater importance.',
        cognitiveRef: 'Pre-attentive: arc length (varies by radius)',
        ethicalRef: 'Risk: Radius-dependent arc inflation',
        demo: <SunburstMini />,
    },
    {
        slug: 'waffle',
        name: 'Waffle Chart',
        whenToUse: [
            'Making proportions intuitive for general audiences by showing individual unit counts',
            'Small integer percentages (e.g., "62 out of 100") where counting supports the message',
            'Infographic contexts where the chart is supplementary to narrative text',
        ],
        whenNotToUse: [
            'Non-round percentages — a waffle of 62.7% is misleading if it rounds to 63 filled cells',
            'More than 2–3 categories in the same waffle — color assignment becomes confusing',
            'When the total unit count is not 100 — the metaphor breaks down',
        ],
        interpretationRisk: 'Waffle charts work when the total is exactly 100 units. If the underlying data is 6,200 out of 10,000 (62%), the chart implies a simplicity of counting that hides the actual scale of the data.',
        cognitiveRef: 'Pre-attentive: counting',
        ethicalRef: 'Risk: Rounding misrepresentation',
        demo: <WaffleMini />,
    },
    {
        slug: 'mosaic',
        name: 'Mosaic / Marimekko',
        whenToUse: [
            'Showing both composition within groups (tile height) and group size (tile width) simultaneously',
            'Survey data cross-tabulations where the size of each group is meaningful',
            'Two-way contingency tables in statistical or research reporting',
        ],
        whenNotToUse: [
            'When either dimension\'s proportions are not meaningful to the audience',
            'More than 4–5 categories per axis — tiles become slivers',
            'Audiences unfamiliar with the chart form — mosaic charts require more explanation than bars',
        ],
        interpretationRisk: 'Mosaic charts simultaneously encode two sets of proportions. Readers must track both width (group size) and height (composition) to understand the chart, creating high cognitive load. Often the two encodings are confused for each other.',
        cognitiveRef: 'Pre-attentive: area (2D)',
        ethicalRef: 'Risk: Dual-proportion confusion',
        demo: <MosaicMini />,
    },
    {
        slug: 'waterfall',
        name: 'Waterfall Chart',
        whenToUse: [
            'Financial statements showing how individual positive and negative contributions build to a total',
            'Revenue bridge charts, profit and loss breakdowns, or budget variance analysis',
            'When both the direction (positive/negative) and magnitude of each component matters',
        ],
        whenNotToUse: [
            'Time-series data — a line chart better shows trends; waterfall implies discrete contributions',
            'More than 8–10 bars — the cumulative position becomes difficult to track',
            'When the composition does not logically accumulate to a meaningful total',
        ],
        interpretationRisk: 'Floating bars in a waterfall chart have no visual baseline. Readers must mentally track the running total, which requires working memory. Poorly ordered or unlabeled running-total bars lead to systematic misreading of intermediate values.',
        cognitiveRef: 'Pre-attentive: length, position (floating)',
        ethicalRef: 'Risk: Floating bar baseline confusion',
        demo: <WaterfallMini />,
    },
];

// Pie vs Bar accuracy comparison chart
function PieVsBarComparisonChart() {
    const data = [
        { label: 'Category A', value: 38, color: '#059669' },
        { label: 'Category B', value: 35, color: '#0d9488' },
        { label: 'Category C', value: 17, color: '#2563eb' },
        { label: 'Category D', value: 10, color: '#7c3aed' },
    ];
    const total = data.reduce((s, d) => s + d.value, 0);
    const w = 320, h = 110, cx = 55, cy = 55, r = 48;
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

    // Bar positions
    const barPad = { l: 130, r: 20, t: 12, b: 24 };
    const barW = w - barPad.l - barPad.r;
    const barH_inner = h - barPad.t - barPad.b;
    const bH = 13;
    const bGap = (barH_inner - data.length * bH) / (data.length + 1);

    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2 text-center">
                    Pie chart — hard to compare B vs C
                </p>
                <svg viewBox={`0 0 ${cx * 2 + 10} ${cy * 2 + 10}`} className="w-full max-w-[110px] mx-auto">
                    {slices.map((s, i) => (
                        <path key={i} d={s.path} fill={s.color} stroke="white" strokeWidth={2} opacity={0.9} />
                    ))}
                    {/* Question mark on similar slices */}
                    <text x={cx - 5} y={cy + 4} fill="white" fontSize={20} fontWeight={900} opacity={0.9}>?</text>
                </svg>
                <p className="text-[10px] text-red-600 text-center mt-1">35% vs 38% — indistinguishable</p>
            </div>
            <div>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2 text-center">
                    Bar chart — differences are clear
                </p>
                <svg viewBox={`0 0 ${w - 130} ${h}`} className="w-full">
                    {data.map((d, i) => {
                        const y = barPad.t + bGap + i * (bH + bGap);
                        const bw = (d.value / 100) * (w - 130 - barPad.l - barPad.r) * 2.5;
                        return (
                            <g key={i}>
                                <text x={0} y={y + bH / 2 + 4} fill="#78716c" fontSize={8}>{d.label}</text>
                                <rect x={55} y={y} width={bw} height={bH} fill={d.color} rx={2} opacity={0.85} />
                                <text x={55 + bw + 3} y={y + bH / 2 + 4} fill="#78716c" fontSize={8}>{d.value}%</text>
                            </g>
                        );
                    })}
                </svg>
                <p className="text-[10px] text-brand text-center mt-1">38% vs 35% — clearly visible</p>
            </div>
        </div>
    );
}

export default function CompositionLesson() {
    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive: area and angle are weak visual encodings' },
                { sectionId: 'perception', slug: 'cognitive-load', label: '1.2 — Cognitive Load: how pie charts overload working memory' },
                { sectionId: 'lab', slug: 'visual-emphasis', label: '3.3 — Visual Emphasis: how color manipulation distorts pie charts' },
            ]}
        >
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Composition charts answer "what is this made of?" by encoding the parts that comprise a whole. They range from the ubiquitous but cognitively demanding pie chart to the space-efficient treemap and the narrative-friendly waterfall. The fundamental challenge with composition charts is that <strong>angle and area</strong> — their primary encoding channels — rank 5th and 6th in Cleveland & McGill's perceptual accuracy hierarchy. Humans are systematically poor at comparing non-aligned angles and areas with precision.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    This doesn't mean pie charts are always wrong. When a single segment is dramatically larger than the others (&gt;50%), the "majority" story is immediately visible and the angle comparison weakness is irrelevant. When only 2–3 segments exist and approximate proportions are sufficient, pie charts work well for general audiences. The problem arises when multiple similar-sized segments need to be compared, or when precise proportions matter — in these cases, a sorted horizontal bar chart on a common scale will always outperform a pie in terms of the viewer's ability to read accurate values.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    The most important composition chart decision is <strong>when to use bars versus sectors</strong>. Use bars when precise comparison between segments matters, when you have more than 5 categories, or when the chart will be used for data analysis. Use pie/donut when you have 2–4 segments, when part-to-whole relationship is the primary message, and when approximate proportions are sufficient. Treemaps and sunbursts are appropriate for hierarchical compositions but demand high cognitive load — use them only when the hierarchical structure itself is the story.
                </p>

                {/* Pie vs bar comparison */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Same data: pie vs. bar — why bars are more accurate for close comparisons
                    </p>
                    <PieVsBarComparisonChart />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        When segments are within 5–10% of each other, angle discrimination fails. The bar chart makes the same comparison trivially accurate. Use pie charts only when segment sizes are sufficiently different that angle comparison succeeds.
                    </p>
                </div>

                {/* When to use each */}
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-5">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                        Quick decision guide: composition chart selection
                    </p>
                    <div className="space-y-2">
                        {[
                            { condition: '2–4 segments, approximate proportions OK', chart: 'Pie or donut', ok: true },
                            { condition: '1 segment clearly dominates (>50%)', chart: 'Pie chart', ok: true },
                            { condition: '5+ categories', chart: 'Horizontal bar chart', ok: true },
                            { condition: 'Precise comparison between similar segments', chart: 'Horizontal bar chart', ok: true },
                            { condition: 'Hierarchical composition (parent + child levels)', chart: 'Treemap or sunburst', ok: true },
                            { condition: 'Finance: cumulative contributions to total', chart: 'Waterfall chart', ok: true },
                            { condition: 'Want to embed a KPI in the center', chart: 'Donut chart', ok: true },
                        ].map((d, i) => (
                            <div key={i} className="flex items-center gap-3 text-[12px]">
                                <span className="text-stone-400 leading-relaxed flex-1">{d.condition}</span>
                                <span className="shrink-0 text-brand font-semibold">→ {d.chart}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ChartFamilyLesson
                charts={charts}
                clevelandNote="Angle and area encodings (used by pie, donut, treemap) rank 7th and 8th in perceptual accuracy — near the bottom of the hierarchy. Bars on a common scale (rank 1) are more accurately decoded for part-to-whole comparisons. Use composition charts only when part-to-whole relationship is genuinely the primary message."
            />
        </LessonPage>
    );
}
