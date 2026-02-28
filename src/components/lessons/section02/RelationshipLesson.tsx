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

export default function RelationshipLesson() {
    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive: position encodes correlation strength' },
                { sectionId: 'mechanics', slug: 'distribution', label: '2.3 — Distribution Charts: scatter vs. distribution for the same data' },
                { sectionId: 'lab', slug: 'annotation-trend', label: '3.4 — Annotation & Trend: misleading trendlines on scatter data' },
            ]}
        >
            <div className="prose prose-stone max-w-none">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Relationship charts encode how two or more variables co-vary. The scatter plot is the foundational
                    form, exploiting the most accurate visual encoding — position on a common scale — for both axes
                    simultaneously. The core ethical risk in relationship charts is the conflation of visual correlation
                    with causal inference. A well-placed regression line makes any correlation look like a law of nature.
                    <strong> Always distinguish observed correlation from proven causation.</strong>
                </p>
            </div>

            <ChartFamilyLesson
                charts={charts}
                clevelandNote="Two-dimensional position encoding (scatter plots) simultaneously uses rank-1 perceptual accuracy on both axes. Bubble charts degrade the third variable to area perception (rank 6), which humans decode with roughly 20–30% systematic underestimation relative to the true ratio."
            />
        </LessonPage>
    );
}
