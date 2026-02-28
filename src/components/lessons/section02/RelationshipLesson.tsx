import LessonPage from '../../layout/LessonPage';
import ChartFamilyLesson, { type ChartSpec } from './ChartFamilyLesson';
import {
    ScatterMini,
    BubbleMini,
    RegressionMini,
    ConnectedScatterMini,
    HexbinMini,
    HeatmapMini,
} from '../../charts/demos/MiniCharts';

const charts: ChartSpec[] = [
    {
        slug: 'scatter',
        name: 'Scatter Plot',
        whenToUse: [
            'Exploring the relationship, correlation, or clustering between two continuous variables',
            'Identifying outliers, sub-groups, or non-linear patterns in bivariate data',
            'As a first-pass exploratory tool before fitting statistical models',
        ],
        whenNotToUse: [
            'Categorical x-axis — a dot plot or strip plot is more appropriate',
            'When individual point identity matters — label a subset or use an interactive tooltip',
            'Very large datasets (> 5,000 points) without overplotting mitigation (alpha, hexbin)',
        ],
        interpretationRisk: 'Correlation visible in a scatter plot does not imply causation. The scale ratio of x to y axes determines the apparent steepness of any relationship — a 45° regression line can be achieved with any data by adjusting axis ranges.',
        cognitiveRef: 'Pre-attentive: position (2D)',
        ethicalRef: 'Risk: Correlation ≠ causation',
        demo: <ScatterMini />,
    },
    {
        slug: 'bubble',
        name: 'Bubble Chart',
        whenToUse: [
            'Encoding three quantitative variables simultaneously (x position, y position, area)',
            'Showing proportional relationships where the size variable is meaningful and large in range',
            'Exploratory analysis of trivariate relationships in small-to-medium datasets',
        ],
        whenNotToUse: [
            'When size differences are small — human area perception is logarithmic and imprecise',
            'More than 30–40 bubbles — overlap makes the chart unreadable',
            'When precise size comparison is needed — people underestimate area differences by 20–30%',
        ],
        interpretationRisk: 'Area is one of the least accurately perceived visual channels. Bubble charts must encode radius linearly (not area) to avoid under-scaling. Many tools default to radius-proportional mapping which makes large values appear much larger than warranted.',
        cognitiveRef: 'Pre-attentive: area (inaccurate)',
        ethicalRef: 'Risk: Radius vs. area encoding',
        demo: <BubbleMini />,
    },
    {
        slug: 'regression',
        name: 'Scatter + Regression',
        whenToUse: [
            'Communicating a statistical relationship and its direction in a single view',
            'After confirming that a linear model is appropriate for the data',
            'When showing the residuals or confidence interval around the fit is important',
        ],
        whenNotToUse: [
            'Non-linear relationships — a linear regression line misrepresents the pattern',
            'Small samples (< 10 points) where the regression is highly sensitive to individual points',
            'When the regression was fitted on different data than is being shown',
        ],
        interpretationRisk: 'A regression line implies a continuous, linear relationship across the full x-axis range. Extrapolating beyond the observed data range — visible when the line extends to axis edges — can lead to nonsensical predictions.',
        cognitiveRef: 'Pre-attentive: slope',
        ethicalRef: 'Risk: Extrapolation beyond data',
        demo: <RegressionMini />,
    },
    {
        slug: 'connected-scatter',
        name: 'Connected Scatter',
        whenToUse: [
            'Showing how two variables co-evolve over time, making time a third implicit dimension',
            'Exploratory analysis of cyclic or lagged relationships between two quantities',
            'When the path and direction of change are as important as the endpoints',
        ],
        whenNotToUse: [
            'Long time series with many points — the path becomes tangled and unreadable',
            'When the temporal sequence isn\'t meaningful or the variables are not time-ordered',
            'Audiences who need to read precise values — neither axis is easy to read with connecting lines',
        ],
        interpretationRisk: 'The connecting line implies temporal or sequential ordering that may not exist in the underlying data. If points are connected by value rank rather than time, the apparent "path" suggests false directionality.',
        cognitiveRef: 'Pre-attentive: slope, direction',
        ethicalRef: 'Risk: Implied directionality',
        demo: <ConnectedScatterMini />,
    },
    {
        slug: 'hexbin',
        name: 'Hexbin Plot',
        whenToUse: [
            'Large scatter datasets (> 5,000 points) where individual dots would form opaque blobs',
            'Showing density of point concentration across a 2D space',
            'When overplotting obscures genuine patterns in dense data',
        ],
        whenNotToUse: [
            'Small datasets where individual observations are meaningful and should be visible',
            'Audiences who need to identify specific data points or entities',
            'Data with meaningful sub-clusters that the hexagonal binning would split or merge',
        ],
        interpretationRisk: 'Hexbin cell size (bandwidth) is a free parameter analogous to histogram bin width. A cell size that is too large merges distinct clusters; one that is too small creates a sparse, noise-dominated grid.',
        cognitiveRef: 'Pre-attentive: color (saturation)',
        ethicalRef: 'Risk: Bin size choice',
        demo: <HexbinMini />,
    },
    {
        slug: 'heatmap',
        name: 'Heatmap',
        whenToUse: [
            'Matrix data where rows, columns, and the intersection value are all meaningful',
            'Large correlation matrices, confusion matrices, or co-occurrence tables',
            'Pattern detection across two categorical dimensions where color gradient aids identification',
        ],
        whenNotToUse: [
            'Precise value reading — color is one of the least accurately decoded channels for quantities',
            'Diverging data without a meaningful midpoint — diverging color scales require a natural zero',
            'Sequential data where order should be perceived as continuous rather than gridded',
        ],
        interpretationRisk: 'Color scale choice determines which differences appear significant. A rainbow (jet) colormap creates false perceptual boundaries at transitions between hue bands; perceptually uniform colormaps (viridis, plasma) should be preferred.',
        cognitiveRef: 'Pre-attentive: color hue/saturation',
        ethicalRef: 'Risk: Rainbow colormap',
        demo: <HeatmapMini />,
    },
];


// Spurious correlation demo chart
function SpuriousCorrelationChart() {
    // "ice cream sales vs drowning deaths" type spurious correlation
    const data = [
        { month: 'Jan', iceCream: 12, drowning: 8 },
        { month: 'Feb', iceCream: 18, drowning: 10 },
        { month: 'Mar', iceCream: 30, drowning: 16 },
        { month: 'Apr', iceCream: 48, drowning: 22 },
        { month: 'May', iceCream: 68, drowning: 35 },
        { month: 'Jun', iceCream: 90, drowning: 52 },
        { month: 'Jul', iceCream: 98, drowning: 58 },
        { month: 'Aug', iceCream: 94, drowning: 54 },
        { month: 'Sep', iceCream: 72, drowning: 38 },
        { month: 'Oct', iceCream: 42, drowning: 20 },
        { month: 'Nov', iceCream: 25, drowning: 12 },
        { month: 'Dec', iceCream: 14, drowning: 9 },
    ];
    const w = 320, h = 130, pad = { l: 16, r: 16, t: 28, b: 30 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const n = data.length;
    const toX = (i: number) => pad.l + (i / (n - 1)) * innerW;
    const toY1 = (v: number) => pad.t + (1 - v / 100) * innerH;
    const toY2 = (v: number) => pad.t + (1 - v / 60) * innerH;

    const iceLine = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY1(d.iceCream)}`).join(' ');
    const drownLine = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY2(d.drowning)}`).join(' ');

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
            <text x={pad.l} y={14} fill="#059669" fontSize={8} fontWeight={700}>Ice cream sales</text>
            <text x={pad.l + 100} y={14} fill="#dc2626" fontSize={8} fontWeight={700}>Drowning deaths</text>
            <text x={pad.l + 240} y={14} fill="#a8a29e" fontSize={7} fontStyle="italic">r = 0.97</text>

            <path d={iceLine} fill="none" stroke="#059669" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <path d={drownLine} fill="none" stroke="#dc2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

            {data.map((d, i) => (
                <g key={d.month}>
                    <text x={toX(i)} y={h - 6} fill="#a8a29e" fontSize={6} textAnchor="middle">{d.month}</text>
                </g>
            ))}

            <rect x={pad.l} y={h - 28} width={w - pad.l - pad.r} height={14} rx={3} fill="#fef9c3" opacity={0.9} />
            <text x={w / 2} y={h - 18} fill="#92400e" fontSize={7.5} textAnchor="middle" fontWeight={600}>
                Confound: temperature drives BOTH variables. No causal link exists.
            </text>
        </svg>
    );
}

export default function RelationshipLesson() {
    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive: position encodes correlation strength' },
                { sectionId: 'mechanics', slug: 'distribution', label: '2.3 — Distribution Charts: scatter vs. distribution for the same data' },
                { sectionId: 'lab', slug: 'annotation-trend', label: '3.4 — Annotation & Trend: misleading trendlines on scatter data' },
            ]}
        >
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Relationship charts encode how two or more variables co-vary. The scatter plot is the foundational form, exploiting the most accurate visual encoding — position on a common scale — for both axes simultaneously. It is the most versatile exploratory tool in data visualization: it reveals correlation direction and strength, identifies outliers, exposes non-linear patterns, and reveals sub-groups that aggregate statistics would conceal. Yet the scatter plot is also one of the most commonly misinterpreted charts because of the fundamental confusion between <strong>visual correlation and causal relationship</strong>.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    A regression line on a scatter plot is among the most persuasive visual artifacts in data communication. It implies: (1) a linear relationship exists, (2) it extends across the full range shown, and (3) the relationship is stable enough to support extrapolation. All three implications can be false simultaneously while the line itself is technically "correct" for the observed data. The scale ratio between x and y axes directly controls how steep the regression line appears — a 45° line can be achieved with any data by adjusting axis ranges, making the apparent "strength" of the relationship a design choice as much as a data property.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    The deepest risk in relationship charts is <strong>spurious correlation</strong>: two variables may share a high correlation coefficient (r ≈ 0.95) with zero causal connection because both are driven by a third, unmeasured variable (a "confound"). Ice cream sales and drowning deaths correlate strongly across months — not because one causes the other, but because both are driven by temperature and seasonality. A scatter plot of the two variables would show a tight, apparently causal relationship. Always ask: "What third variable could be driving both of these?" before interpreting a correlation as meaningful.
                </p>

                {/* Spurious correlation example */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Spurious correlation: r = 0.97, zero causal link
                    </p>
                    <SpuriousCorrelationChart />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        Both variables move in lockstep because summer drives both. A scatter plot of ice cream vs. drowning shows a near-perfect line — yet eating ice cream does not cause drowning. This is the canonical example of a confounded relationship. Always seek the confound.
                    </p>
                </div>

                {/* Relationship chart risks summary */}
                <div className="rounded-xl bg-red-50 border border-red-200 p-5">
                    <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider mb-3">
                        The three most common relationship chart manipulation patterns
                    </p>
                    <div className="space-y-2">
                        {[
                            {
                                pattern: 'Axis range selection',
                                desc: 'Choosing x/y axis ranges to make a weak correlation appear strong or a strong one appear weak. A 45° regression line looks equally impressive regardless of actual r².',
                            },
                            {
                                pattern: 'Extrapolation beyond data',
                                desc: 'Extending the regression line beyond the observed data range implies the relationship holds in regions that have not been measured. This is often shown in forecasts.',
                            },
                            {
                                pattern: 'Cherry-picked subgroup',
                                desc: 'Showing a regression for a specific subpopulation where the relationship is strong, while omitting the full dataset where no relationship exists.',
                            },
                        ].map((r, i) => (
                            <div key={i} className="flex gap-3 text-[12px]">
                                <span className="text-red-400 shrink-0 font-bold">#{i + 1}</span>
                                <div>
                                    <span className="font-bold text-red-800">{r.pattern}: </span>
                                    <span className="text-red-700">{r.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ChartFamilyLesson
                charts={charts}
                clevelandNote="Two-dimensional position encoding (scatter plots) simultaneously uses rank-1 perceptual accuracy on both axes. Bubble charts degrade the third variable to area perception (rank 6), which humans decode with roughly 20–30% systematic underestimation relative to the true ratio."
            />
        </LessonPage>
    );
}
