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

export default function DistributionLesson() {
    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive: how position encodes distribution shape' },
                { sectionId: 'mechanics', slug: 'comparison', label: '2.1 — Comparison Charts: when groups need distribution not just means' },
                { sectionId: 'lab', slug: 'data-transform', label: '3.2 — Data Transform: how aggregation hides the underlying distribution' },
            ]}
        >
            <div className="prose prose-stone max-w-none">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Distribution charts reveal the shape, spread, and center of a dataset — information that
                    summary statistics like mean and standard deviation can conceal. The famous Anscombe's Quartet
                    demonstrates that four datasets with identical means, variances, and correlations can look
                    radically different when plotted. <strong>Always visualize the distribution before reporting
                        a summary statistic.</strong>
                </p>
            </div>

            <ChartFamilyLesson
                charts={charts}
                clevelandNote="Distribution charts encode data through area and position — two encodings with different accuracy levels. Histograms (area) are less precisely decoded than ECDFs (position on a common scale), yet histograms are more intuitively understood by general audiences. Choose based on your audience's statistical literacy."
            />
        </LessonPage>
    );
}
