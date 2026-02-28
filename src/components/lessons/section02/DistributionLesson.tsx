import LessonPage from '../../layout/LessonPage';
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

const charts: ChartSpec[] = [
    {
        slug: 'histogram',
        name: 'Histogram',
        whenToUse: [
            'Showing the frequency distribution of a single continuous variable',
            'Identifying modality (unimodal, bimodal), skewness, and outliers',
            'Large datasets (> 30 observations) where individual point plotting is impractical',
        ],
        whenNotToUse: [
            'Small datasets (< 20 points) — a strip plot or dot plot preserves more information',
            'Comparing two or more distributions — overlapping histograms become visually complex',
            'When exact values at individual observations need to be recoverable',
        ],
        interpretationRisk: 'Bin width is a free parameter that dramatically shapes the perceived distribution. A narrow bin width produces a jagged, noisy histogram while a wide bin width can hide bimodality or outliers entirely.',
        cognitiveRef: 'Pre-attentive: area (via height)',
        ethicalRef: 'Risk: Bin width manipulation',
        demo: <HistogramMini />,
    },
    {
        slug: 'boxplot',
        name: 'Box Plot',
        whenToUse: [
            'Compact comparison of distributional summaries across multiple groups',
            'Highlighting median, quartiles, and outliers side by side',
            'When a dashboard or report has limited space but group comparison is needed',
        ],
        whenNotToUse: [
            'Small samples (< 15 per group) — box plots hide multi-modality and sample size',
            'When the shape of the distribution (skew, peaks) is the primary message',
            'Audiences unfamiliar with statistical quartile notation',
        ],
        interpretationRisk: 'A symmetric box plot can describe both a uniform distribution and a bimodal one with the same quartile boundaries. Box plots are often used to imply normality in data that is actually multi-modal or highly skewed.',
        cognitiveRef: 'Pre-attentive: length, position',
        ethicalRef: 'Risk: Hidden bimodality',
        demo: <BoxplotMini />,
    },
    {
        slug: 'violin',
        name: 'Violin Plot',
        whenToUse: [
            'Showing both distributional shape and summary statistics for group comparisons',
            'When bimodality or asymmetry within groups is part of the story',
            'Medium-to-large samples (> 50 per group) where KDE estimation is meaningful',
        ],
        whenNotToUse: [
            'Small samples — the KDE curve misrepresents distributions with few data points',
            'Audiences who need to read precise values — violins are shape-focused',
            'When the comparison group count exceeds 6 — violins become narrow and hard to read',
        ],
        interpretationRisk: 'Kernel density estimation requires a bandwidth (smoothing parameter) choice. Over-smoothed violins hide peaks and bimodality; under-smoothed violins add spurious wiggles that look like real data features.',
        cognitiveRef: 'Pre-attentive: shape, area',
        ethicalRef: 'Risk: KDE bandwidth manipulation',
        demo: <ViolinMini />,
    },
    {
        slug: 'strip-plot',
        name: 'Strip Plot',
        whenToUse: [
            'Small-to-medium datasets (< 200 per group) where showing every observation adds transparency',
            'Supplement to a box plot or bar chart to reveal the underlying data',
            'When checking for gaps, clusters, or unusual patterns is more important than summarizing',
        ],
        whenNotToUse: [
            'Large datasets — overplotting makes the chart unreadable without jitter or transparency',
            'When a clear summary statistic (mean, median) is the primary message',
            'When exact horizontal position of points would be over-interpreted',
        ],
        interpretationRisk: 'Random jitter prevents overplotting but creates the false impression that horizontal position encodes meaning. Readers may infer sub-group structure or trends from jitter noise.',
        cognitiveRef: 'Pre-attentive: position',
        ethicalRef: 'Risk: Jitter misinterpretation',
        demo: <StripPlotMini />,
    },
    {
        slug: 'rug-plot',
        name: 'Rug Plot',
        whenToUse: [
            'Augmenting a density curve or scatter plot with individual observation locations',
            'Showing the actual data density along an axis without obscuring the primary chart',
            'Small-to-medium datasets where the density curve alone would hide important point clustering',
        ],
        whenNotToUse: [
            'Large datasets (> 500 points) — rug marks stack invisibly along the axis',
            'As a standalone chart — rug plots are supplementary annotations, not primary displays',
            'When the exact position of individual points has low analytical value',
        ],
        interpretationRisk: 'Rug plots appear along the axis margin and can be mistaken for axis ticks. Dense rugs create the impression of a continuous region of data when the points are actually clustered at a few discrete values.',
        cognitiveRef: 'Pre-attentive: position, density',
        demo: <RugPlotMini />,
    },
    {
        slug: 'density',
        name: 'Density Plot (KDE)',
        whenToUse: [
            'Smooth comparison of two or three distributions on the same axis',
            'When the continuous shape of the distribution matters more than bin counts',
            'Overlaying multiple groups where filled areas would obstruct each other',
        ],
        whenNotToUse: [
            'Very small samples — KDE implies a continuous distribution from too few observations',
            'Data with hard boundaries (e.g., 0–100 scores) where the KDE extends beyond bounds',
            'Discrete count data that a histogram would represent more honestly',
        ],
        interpretationRisk: 'KDE smooths over actual data gaps and extreme values. A density curve between 0 and 100 for a dataset with no values below 30 will still show a tapering tail toward 0, implying values that don\'t exist.',
        cognitiveRef: 'Pre-attentive: shape, slope',
        ethicalRef: 'Risk: KDE boundary artifacts',
        demo: <DensityMini />,
    },
    {
        slug: 'ecdf',
        name: 'ECDF',
        whenToUse: [
            'Comparing full cumulative distributions of two or more groups without binning choices',
            'Statistical analysis where percentile positions need to be read directly',
            'When a bin-free, assumption-free view of distribution is required',
        ],
        whenNotToUse: [
            'General audiences unfamiliar with cumulative probability — the "S-curve" is counterintuitive',
            'When the density or shape of the distribution (rather than cumulative probabilities) is the message',
            'Presentations where the focus is on extremes or outliers — a box plot is more intuitive',
        ],
        interpretationRisk: 'The step function is read top-to-bottom as a probability that a value is "less than or equal to X." Readers unfamiliar with CDFs frequently read the height at a given x-value as a density or frequency, not a cumulative probability.',
        cognitiveRef: 'Pre-attentive: slope, position',
        ethicalRef: 'Risk: CDF vs. PDF confusion',
        demo: <ECDFMini />,
    },
];

// Bin width comparison chart: same data, different histograms
function BinWidthComparisonChart() {
    // Simple underlying data: bimodal distribution
    const bins5 = [2, 4, 7, 9, 11, 15, 14, 10, 5, 3]; // narrow bins, bimodality visible
    const bins3 = [6, 24, 26, 21, 8]; // wide bins, bimodality hidden
    const w = 160, h = 90, pad = { l: 12, r: 8, t: 12, b: 20 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;

    function BarsChart({ data, label, note, color }: { data: number[], label: string, note: string, color: string }) {
        const max = Math.max(...data);
        const bw = innerW / data.length - 2;
        return (
            <div className="space-y-1">
                <p className="text-[10px] text-stone-400 font-bold text-center">{label}</p>
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
                    {data.map((v, i) => {
                        const bh = (v / max) * innerH;
                        const x = pad.l + i * (bw + 2);
                        const y = pad.t + innerH - bh;
                        return (
                            <rect key={i} x={x} y={y} width={bw} height={bh}
                                fill={color} rx={1} opacity={0.8} />
                        );
                    })}
                    <text x={w / 2} y={h - 4} fill="#a8a29e" fontSize={7} textAnchor="middle">
                        {note}
                    </text>
                </svg>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            <BarsChart data={bins5} label="Narrow bins — bimodality visible" note="10 bins" color="#059669" />
            <BarsChart data={bins3} label="Wide bins — bimodality hidden" note="5 bins" color="#ef4444" />
        </div>
    );
}

// Distribution chart accuracy ranking
function DistributionAccuracyChart() {
    const types = [
        { name: 'ECDF', accuracy: 89, note: 'Bin-free, exact' },
        { name: 'Histogram', accuracy: 71, note: 'Bin-dependent' },
        { name: 'Violin (KDE)', accuracy: 62, note: 'Bandwidth-dependent' },
        { name: 'Box plot', accuracy: 58, note: 'Hides shape' },
        { name: 'Strip plot', accuracy: 79, note: 'Shows all points' },
    ];
    const w = 300, h = 120, pad = { l: 80, r: 50, t: 14, b: 22 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const barH = 13;
    const gap = (innerH - types.length * barH) / (types.length + 1);
    const color = (a: number) => a >= 75 ? '#059669' : a >= 60 ? '#f59e0b' : '#ef4444';

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
            {[0, 25, 50, 75, 100].map(v => (
                <g key={v}>
                    <line x1={pad.l + (v / 100) * innerW} x2={pad.l + (v / 100) * innerW}
                        y1={pad.t} y2={h - pad.b} stroke="#f5f5f4" strokeWidth={1} />
                    <text x={pad.l + (v / 100) * innerW} y={h - 4}
                        fill="#a8a29e" fontSize={7} textAnchor="middle">{v}%</text>
                </g>
            ))}
            {types.map((t, i) => {
                const y = pad.t + gap + i * (barH + gap);
                const bw = (t.accuracy / 100) * innerW;
                const c = color(t.accuracy);
                return (
                    <g key={t.name}>
                        <text x={pad.l - 6} y={y + barH / 2 + 4} fill="#78716c" fontSize={8} textAnchor="end">{t.name}</text>
                        <rect x={pad.l} y={y} width={bw} height={barH} fill={c} rx={2} opacity={0.85} />
                        <text x={pad.l + bw + 4} y={y + barH / 2 + 4} fill={c} fontSize={8} fontWeight={700}>{t.accuracy}%</text>
                    </g>
                );
            })}
            <text x={pad.l + innerW / 2} y={pad.t - 2} fill="#78716c" fontSize={7.5} textAnchor="middle">
                Perceptual accuracy for distributional shape
            </text>
        </svg>
    );
}

export default function DistributionLesson() {
    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive: how position encodes distribution shape' },
                { sectionId: 'mechanics', slug: 'comparison', label: '2.1 — Comparison Charts: when groups need distribution not just means' },
                { sectionId: 'lab', slug: 'data-transform', label: '3.2 — Data Transform: how aggregation hides the underlying distribution' },
            ]}
        >
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Distribution charts reveal the shape, spread, and center of a dataset — information that summary statistics like mean and standard deviation can entirely conceal. Francis Anscombe's famous 1973 quartet demonstrated this problem definitively: four datasets with <em>identical</em> means, variances, and correlation coefficients look radically different when plotted. The lesson is unambiguous: <strong>always visualize the underlying distribution before reporting any summary statistic</strong>. A mean of 7.5 ± 1.9 could describe a symmetric bell curve, a right-skewed distribution, or data that lies on a perfect line — the summary statistics alone cannot tell you which.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    The distribution chart family ranges from the familiar histogram to the statistically precise ECDF (Empirical Cumulative Distribution Function). Each form makes different trade-offs between analytical accuracy and audience accessibility. Histograms are easily understood but depend on a bin-width parameter that can hide or reveal bimodality at the analyst's discretion. Box plots are compact and allow group comparison but cannot reveal whether a distribution is bimodal, asymmetric, or concentrated at a few specific values. The choice of distribution chart should match the analytical question: showing shape requires histograms or violin plots; showing percentiles requires ECDFs; showing all raw data requires strip plots.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    The most consequential free parameter in distribution visualization is <strong>bin width for histograms</strong> and <strong>bandwidth for kernel density estimates (KDE)</strong>. These parameters are not derived from data — they are chosen by the analyst, and different choices can make the same dataset appear unimodal or bimodal, concentrated or spread out. A responsible distribution chart should show a range of bin widths or report the bandwidth explicitly. When data shows a suspicious "smooth" single peak, always check whether a narrower bandwidth would reveal multiple modes hiding beneath the smooth curve.
                </p>

                {/* Bin width demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Bin width manipulation: same data, different shape
                    </p>
                    <BinWidthComparisonChart />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        The underlying data is identical bimodal data. Narrow bins (left) reveal the two-peak structure. Wide bins (right) merge them into a single peak — hiding the bimodality entirely. Always request the full histogram with multiple bin widths when presented with a "smooth" distribution.
                    </p>
                </div>

                {/* Accuracy ranking */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Distribution chart accuracy for conveying distributional shape
                    </p>
                    <DistributionAccuracyChart />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        ECDF and strip plots are most accurate but require statistical literacy. Histograms balance accessibility with reasonable accuracy when bin width is appropriate. Box plots trade shape information for compactness — use them for comparison, not for characterizing individual distributions.
                    </p>
                </div>
            </div>

            <ChartFamilyLesson
                charts={charts}
                clevelandNote="Distribution charts encode data through area and position — two encodings with different accuracy levels. Histograms (area) are less precisely decoded than ECDFs (position on a common scale), yet histograms are more intuitively understood by general audiences. Choose based on your audience's statistical literacy."
            />
        </LessonPage>
    );
}
