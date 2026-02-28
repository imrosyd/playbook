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

export default function ComparisonLesson() {
    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive Attributes: length is rank 2 in the accuracy hierarchy' },
                { sectionId: 'perception', slug: 'anchoring', label: '1.3 — Anchoring: how axis baseline controls every bar comparison' },
                { sectionId: 'lab', slug: 'axis-scale', label: '3.1 — Axis & Scale: see how truncation distorts bar charts' },
            ]}
        >
            <div className="prose prose-stone max-w-none">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Comparison charts encode quantitative differences between discrete categories. Cleveland and McGill's 1984
                    study established that <strong>position on a common scale</strong> (bar charts) is the most accurately
                    perceived visual encoding. Length, angle, area, and volume follow in decreasing perceptual accuracy — a
                    hierarchy that should guide your chart selection for any comparison task.
                </p>
            </div>

            <ChartFamilyLesson
                charts={charts}
                clevelandNote="Position along a common scale is the most accurately decoded visual encoding (rank 1). Stacked bars force readers to compare floating segments — only the bottom segment benefits from a common baseline, making all other segments rank 5 or lower in perceptual accuracy."
            />
        </LessonPage>
    );
}
