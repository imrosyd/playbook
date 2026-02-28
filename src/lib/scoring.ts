import type {
    ChartState,
    ScoreContribution,
    InteractionPenalty,
    EvaluationResult,
    EthicalLevel,
} from '../types/chart';

function evaluateAxisBaseline(pct: number): ScoreContribution {
    if (pct === 0) {
        return { parameter: 'Axis Baseline', state: 'True zero', contribution: 0, justification: 'Neutral default — no truncation.' };
    }
    if (pct <= 20) {
        return { parameter: 'Axis Baseline', state: `${pct}% truncation`, contribution: -1, justification: 'Minor truncation. Detectable by trained viewers but often acceptable for dense data.' };
    }
    if (pct <= 50) {
        return { parameter: 'Axis Baseline', state: `${pct}% truncation`, contribution: -3, justification: 'Moderate truncation magnifies apparent differences by 2-4x. Violates Cleveland (1985) graphical perception guidelines.' };
    }
    return { parameter: 'Axis Baseline', state: `${pct}% truncation`, contribution: -5, justification: 'Severe truncation. Differences appear 5x+ larger than actual. Triggers Ethical Level 4 (Distortion).' };
}

function evaluateThreeD(enabled: boolean): ScoreContribution {
    if (!enabled) {
        return { parameter: '3D Effect', state: 'Off', contribution: 0, justification: 'Neutral default.' };
    }
    return { parameter: '3D Effect', state: 'On', contribution: -4, justification: '3D perspective foreshortens the pre-attentive attribute of length. Fischer (2000) demonstrated 50%+ magnitude estimation errors with 3D bar charts.' };
}

function evaluateOutlierMode(mode: string, manualCount: number): ScoreContribution {
    if (mode === 'show_all') {
        return { parameter: 'Outlier Handling', state: 'Show all', contribution: 0, justification: 'All data points visible.' };
    }
    if (mode === 'statistical_3sd') {
        return { parameter: 'Outlier Handling', state: 'Statistical exclusion (>3 SD)', contribution: -1, justification: 'Defensible practice when documented. Mild penalty because it removes real data points.' };
    }
    return { parameter: 'Outlier Handling', state: `Manual exclusion (${manualCount} points)`, contribution: -3, justification: 'Removing specific points without statistical justification is cherry-picking. Exploits Pattern Recognition bias.' };
}

function evaluateSmoothing(window: number): ScoreContribution {
    if (window <= 1) {
        return { parameter: 'Data Smoothing', state: 'Raw data', contribution: 0, justification: 'No smoothing applied.' };
    }
    if (window <= 3) {
        return { parameter: 'Data Smoothing', state: `${window}-period rolling avg`, contribution: -1, justification: 'Minor smoothing. Acceptable for noise reduction in high-frequency data.' };
    }
    if (window <= 6) {
        return { parameter: 'Data Smoothing', state: `${window}-period rolling avg`, contribution: -2, justification: 'Moderate smoothing. Begins to hide meaningful short-term patterns.' };
    }
    return { parameter: 'Data Smoothing', state: `${window}-period rolling avg`, contribution: -4, justification: 'Severe smoothing. Eliminates within-quarter variance entirely. Creates false impression of stability.' };
}

function evaluateAnnotation(
    enabled: boolean,
    honest: boolean
): ScoreContribution {
    if (enabled && honest) {
        return { parameter: 'Annotation', state: 'Present and accurate', contribution: 2, justification: 'Annotations make interpretation explicit and invite scrutiny. Reduces Cognitive Load.' };
    }
    if (!enabled) {
        return { parameter: 'Annotation', state: 'Absent', contribution: 0, justification: 'No annotation present.' };
    }
    return { parameter: 'Annotation', state: 'Present but misleading', contribution: -3, justification: 'Misleading annotation actively directs attention toward a false interpretation. Exploits Anchoring.' };
}

function evaluateSorting(order: string): ScoreContribution {
    if (order === 'value_desc' || order === 'value_asc') {
        return { parameter: 'Sorting', state: 'Value-sorted', contribution: 0, justification: 'Facilitates natural comparison.' };
    }
    if (order === 'alpha') {
        return { parameter: 'Sorting', state: 'Alphabetical', contribution: -1, justification: 'Alphabetical order disrupts the pre-attentive ranking signal when value comparison is the task.' };
    }
    if (order === 'original') {
        return { parameter: 'Sorting', state: 'Original order', contribution: 0, justification: 'Natural data order preserved.' };
    }
    return { parameter: 'Sorting', state: 'Custom order', contribution: -3, justification: 'Custom ordering may bury unfavorable data in middle positions where scrutiny is lowest.' };
}

function evaluateColorEmphasis(
    highlightCount: number,
    dimOpacity: number
): ScoreContribution {
    if (highlightCount === 0 || dimOpacity >= 0.9) {
        return { parameter: 'Color Emphasis', state: 'Neutral palette', contribution: 0, justification: 'No differential emphasis applied.' };
    }
    if (dimOpacity >= 0.4) {
        return { parameter: 'Color Emphasis', state: `${highlightCount} highlighted, subtle dim`, contribution: 1, justification: 'Subtle emphasis guides attention without suppressing context.' };
    }
    return { parameter: 'Color Emphasis', state: `${highlightCount} highlighted, heavy dim`, contribution: -2, justification: 'Heavy dimming effectively hides non-highlighted elements. Exploits Pre-attentive Processing.' };
}

function evaluateGridlines(count: number): ScoreContribution {
    if (count >= 3 && count <= 5) {
        return { parameter: 'Gridline Density', state: `${count} gridlines`, contribution: 0, justification: 'Optimal range per Tufte.' };
    }
    if (count === 0) {
        return { parameter: 'Gridline Density', state: 'No gridlines', contribution: -1, justification: 'Makes value estimation difficult, reduces verifiability.' };
    }
    if (count <= 10) {
        return { parameter: 'Gridline Density', state: `${count} gridlines`, contribution: -1, justification: 'Mild visual noise from excessive gridlines.' };
    }
    return { parameter: 'Gridline Density', state: `${count} gridlines`, contribution: -2, justification: 'Exceeds cognitive load threshold. Visual noise overwhelms data signal.' };
}

function evaluateTrendline(
    type: string,
    rSquared: number,
    significant: boolean
): ScoreContribution {
    if (type === 'none') {
        return { parameter: 'Trendline', state: 'None', contribution: 0, justification: 'No trendline applied.' };
    }
    if (type === 'linear' && significant && rSquared >= 0.3) {
        return { parameter: 'Trendline', state: `Linear (R²=${rSquared.toFixed(2)})`, contribution: 1, justification: 'Honest summarization with statistical significance.' };
    }
    return { parameter: 'Trendline', state: `Linear (R²=${rSquared.toFixed(2)}, not significant)`, contribution: -2, justification: 'Imposing a narrative on noise. Low R² means the line explains little variance.' };
}

function evaluateSampleSize(pct: number): ScoreContribution {
    if (pct >= 100) {
        return { parameter: 'Sample Size', state: 'Full dataset', contribution: 0, justification: 'Complete data shown.' };
    }
    if (pct >= 50) {
        return { parameter: 'Sample Size', state: `${pct}% of data`, contribution: -1, justification: 'Minor concern about representativeness.' };
    }
    if (pct >= 25) {
        return { parameter: 'Sample Size', state: `${pct}% of data`, contribution: -2, justification: 'Substantial data omission. Pattern may not represent full population.' };
    }
    return { parameter: 'Sample Size', state: `${pct}% of data`, contribution: -4, justification: 'Clustering illusion is strongest at small sample sizes. Spurious patterns are most likely to appear real.' };
}

function computeInteractionPenalties(
    breakdown: ScoreContribution[]
): InteractionPenalty[] {
    const penalties: InteractionPenalty[] = [];

    const axisScore = breakdown.find((b) => b.parameter === 'Axis Baseline')?.contribution ?? 0;
    const threeDScore = breakdown.find((b) => b.parameter === '3D Effect')?.contribution ?? 0;
    const smoothingScore = breakdown.find((b) => b.parameter === 'Data Smoothing')?.contribution ?? 0;
    const trendlineScore = breakdown.find((b) => b.parameter === 'Trendline')?.contribution ?? 0;
    const outlierScore = breakdown.find((b) => b.parameter === 'Outlier Handling')?.contribution ?? 0;
    const sampleScore = breakdown.find((b) => b.parameter === 'Sample Size')?.contribution ?? 0;

    if (axisScore <= -3 && threeDScore <= -1) {
        penalties.push({
            combination: 'Axis Truncation + 3D Effect',
            penalty: -2,
            justification: '3D foreshortening multiplies the magnitude distortion from truncation. Compound effect is multiplicative in perceptual error.',
        });
    }

    if (smoothingScore <= -2 && trendlineScore !== 0) {
        penalties.push({
            combination: 'Heavy Smoothing + Trendline',
            penalty: -2,
            justification: 'Fitting a trendline to already-smoothed data double-counts the smoothing, producing artificial R² values.',
        });
    }

    if (outlierScore <= -1 && sampleScore <= -1) {
        penalties.push({
            combination: 'Outlier Removal + Sample Reduction',
            penalty: -2,
            justification: 'Removing outliers from a reduced sample creates a dataset that no longer represents the underlying population.',
        });
    }

    const severeCount = breakdown.filter((b) => b.contribution <= -3).length;
    if (severeCount >= 3) {
        penalties.push({
            combination: '3+ Severe Manipulations',
            penalty: -3,
            justification: 'Three or more severe manipulations crosses from distortion into active manipulation (Ethical Level 5).',
        });
    }

    return penalties;
}

function determineBiases(breakdown: ScoreContribution[]): string[] {
    const biases: string[] = [];
    const map: Record<string, string[]> = {
        'Axis Baseline': ['Anchoring & Framing'],
        '3D Effect': ['Pre-attentive Processing'],
        'Outlier Handling': ['Pattern Recognition'],
        'Data Smoothing': ['Pattern Recognition'],
        'Annotation': ['Anchoring & Framing', 'Cognitive Load'],
        'Sorting': ['Pre-attentive Processing', 'Cognitive Load'],
        'Color Emphasis': ['Pre-attentive Processing'],
        'Gridline Density': ['Cognitive Load'],
        'Trendline': ['Pattern Recognition'],
        'Sample Size': ['Pattern Recognition'],
    };

    for (const entry of breakdown) {
        if (entry.contribution < 0 && map[entry.parameter]) {
            for (const bias of map[entry.parameter]) {
                if (!biases.includes(bias)) {
                    biases.push(bias);
                }
            }
        }
    }
    return biases;
}

function determineEthicalLevel(score: number, breakdown: ScoreContribution[]): EthicalLevel {
    const severeCount = breakdown.filter((b) => b.contribution <= -3).length;

    if (score >= 3) return 1;
    if (score >= 1) return 2;
    if (score >= -2) return 3;
    if (severeCount >= 3) return 5;
    if (score >= -4) return 4;
    return 5;
}

function generatePerceptionText(score: number, biases: string[]): string {
    if (score >= 3) {
        return 'This chart presents data transparently. Viewers will form accurate magnitude judgments and draw conclusions aligned with the underlying data.';
    }
    if (score >= 0) {
        return 'This chart uses mild emphasis techniques that guide attention without significantly distorting perception. Most viewers will form roughly accurate impressions.';
    }
    if (score >= -2) {
        const biasText = biases.length > 0 ? biases.join(' and ') : 'visual framing';
        return `This chart exploits ${biasText} to create a perception gap between what the data shows and what the viewer concludes. Trained analysts may catch this; most viewers will not.`;
    }
    return `This chart produces systematic perceptual errors. The viewer's pre-attentive system is receiving corrupted signals through ${biases.join(', ')}. Decisions based on this chart will be predictably wrong.`;
}

export function computeLinearRegression(data: { x: number; y: number }[]): {
    slope: number;
    intercept: number;
    rSquared: number;
} {
    const n = data.length;
    if (n < 2) return { slope: 0, intercept: 0, rSquared: 0 };

    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    for (const p of data) {
        sumX += p.x;
        sumY += p.y;
        sumXY += p.x * p.y;
        sumX2 += p.x * p.x;
        sumY2 += p.y * p.y;
    }
    const denom = n * sumX2 - sumX * sumX;
    if (denom === 0) return { slope: 0, intercept: sumY / n, rSquared: 0 };

    const slope = (n * sumXY - sumX * sumY) / denom;
    const intercept = (sumY - slope * sumX) / n;

    const ssTot = sumY2 - (sumY * sumY) / n;
    let ssRes = 0;
    for (const p of data) {
        const predicted = slope * p.x + intercept;
        ssRes += (p.y - predicted) ** 2;
    }
    const rSquared = ssTot === 0 ? 0 : Math.max(0, 1 - ssRes / ssTot);

    return { slope, intercept, rSquared };
}

export function evaluateChartState(state: ChartState): EvaluationResult {
    const { params, metadata } = state;

    const breakdown: ScoreContribution[] = [
        evaluateAxisBaseline(params.axisBaselinePct),
        evaluateThreeD(params.threeD),
        evaluateOutlierMode(params.outlierMode, params.manualExcludedIndices.length),
        evaluateSmoothing(params.smoothingWindow),
        evaluateAnnotation(params.annotation.enabled, params.annotation.honest),
        evaluateSorting(params.sortOrder),
        evaluateColorEmphasis(params.colorEmphasis.highlightedIndices.length, params.colorEmphasis.dimOpacity),
        evaluateGridlines(params.gridlineCount),
        evaluateTrendline(params.trendline, metadata.trendlineRSquared, metadata.statisticallySignificantTrend),
        evaluateSampleSize(params.samplePct),
    ];

    const interactionPenalties = computeInteractionPenalties(breakdown);

    const rawScore =
        breakdown.reduce((sum, b) => sum + b.contribution, 0) +
        interactionPenalties.reduce((sum, p) => sum + p.penalty, 0);

    const credibilityScore = Math.max(-5, Math.min(5, rawScore));
    const biasesTriggered = determineBiases(breakdown);
    const ethicalLevel = determineEthicalLevel(credibilityScore, breakdown);
    const perceptionShiftText = generatePerceptionText(credibilityScore, biasesTriggered);

    return {
        credibilityScore,
        rawScore,
        scoreBreakdown: breakdown,
        interactionPenalties,
        biasesTriggered,
        ethicalLevel,
        perceptionShiftText,
    };
}
