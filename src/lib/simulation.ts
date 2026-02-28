import type {
    ChartState,
    EvaluationResult,
    Archetype,
    CredibilityBand,
    ExecutiveReaction,
    SimulationResult,
    EthicalLevel,
} from '../types/chart';

interface ReactionTemplate {
    archetype: Archetype;
    credibilityBand: CredibilityBand;
    dominantManipulation: string;
    templateText: string;
    decisionTendency: string;
}

const ETHICAL_LABELS: Record<EthicalLevel, string> = {
    1: 'Clarity',
    2: 'Emphasis',
    3: 'Framing',
    4: 'Distortion',
    5: 'Manipulation',
};

const ARCHETYPE_LABELS: Record<Archetype, string> = {
    skeptic: 'The Skeptic',
    optimist: 'The Optimist',
    firefighter: 'The Firefighter',
    strategist: 'The Strategist',
};

function getCredibilityBand(score: number): CredibilityBand {
    if (score >= 3) return 'high';
    if (score >= 0) return 'moderate';
    if (score >= -3) return 'low';
    return 'critical';
}

function getTrustLevel(archetype: Archetype, band: CredibilityBand): ExecutiveReaction['trustLevel'] {
    const matrix: Record<Archetype, Record<CredibilityBand, ExecutiveReaction['trustLevel']>> = {
        skeptic: { high: 'cautious', moderate: 'suspicious', low: 'hostile', critical: 'hostile' },
        optimist: { high: 'trusting', moderate: 'trusting', low: 'trusting', critical: 'trusting' },
        firefighter: { high: 'trusting', moderate: 'cautious', low: 'suspicious', critical: 'suspicious' },
        strategist: { high: 'trusting', moderate: 'cautious', low: 'suspicious', critical: 'hostile' },
    };
    return matrix[archetype][band];
}

function findDominantManipulation(evaluation: EvaluationResult): string {
    let worst = evaluation.scoreBreakdown[0];
    for (const entry of evaluation.scoreBreakdown) {
        if (entry.contribution < worst.contribution) {
            worst = entry;
        }
    }
    const paramMap: Record<string, string> = {
        'Axis Baseline': 'axis_baseline',
        '3D Effect': 'three_d',
        'Outlier Handling': 'outlier_removal',
        'Data Smoothing': 'data_smoothing',
        'Annotation': 'annotation',
        'Sorting': 'sorting',
        'Color Emphasis': 'color_emphasis',
        'Gridline Density': 'gridlines',
        'Trendline': 'trendline',
        'Sample Size': 'sample_size',
    };
    return worst.contribution < 0 ? (paramMap[worst.parameter] || 'general') : 'general';
}

function interpolateTemplate(
    template: string,
    state: ChartState,
    _evaluation: EvaluationResult
): string {
    const data = state.data;
    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    const axisMin = min + (state.params.axisBaselinePct / 100) * min;
    const actualDiffPct = range > 0 ? ((range / ((max + min) / 2)) * 100).toFixed(1) : '0';
    const apparentMultiplier = state.params.axisBaselinePct > 0
        ? (range / (max - axisMin)).toFixed(1)
        : '1.0';

    let worstPeriod = data[0]?.label || 'N/A';
    let worstValue = Infinity;
    for (const d of data) {
        if (d.value < worstValue) {
            worstValue = d.value;
            worstPeriod = d.label;
        }
    }

    const highlightedIdx = state.params.colorEmphasis.highlightedIndices;
    const highlightedCategory = highlightedIdx.length > 0 && data[highlightedIdx[0]]
        ? data[highlightedIdx[0]].label
        : 'the highlighted element';

    return template
        .replace('{axis_min_value}', axisMin.toFixed(1))
        .replace('{actual_diff_pct}', actualDiffPct)
        .replace('{apparent_diff_pct}', apparentMultiplier)
        .replace('{worst_period}', worstPeriod)
        .replace('{highlighted_category}', highlightedCategory);
}

function generateFallbackReaction(
    archetype: Archetype,
    band: CredibilityBand,
    _state: ChartState,
    _evaluation: EvaluationResult
): { text: string; tendency: string } {
    const fallbacks: Record<Archetype, Record<CredibilityBand, { text: string; tendency: string }>> = {
        skeptic: {
            high: { text: 'The data looks solid. Walk me through the methodology briefly.', tendency: 'Proceeds cautiously. Requests methodology documentation.' },
            moderate: { text: 'Can you show me this with neutral chart settings? I want to confirm what I am seeing.', tendency: 'Delays decision. Requests redrawn chart.' },
            low: { text: 'Several design choices here inflate the apparent trend. I need to see raw numbers before proceeding.', tendency: 'Blocks decision. Requests raw data.' },
            critical: { text: 'I cannot make a decision based on this. The data needs to be independently reconstructed.', tendency: 'Vetoes the proposal. Requests data audit.' },
        },
        optimist: {
            high: { text: 'This is great progress. Let us talk about how we scale this.', tendency: 'Accelerates. Proposes expanding scope.' },
            moderate: { text: 'I like the trajectory here. What resources do we need to keep this going?', tendency: 'Approves budget. Plans for growth.' },
            low: { text: 'The direction is positive overall. Some noise, but the story is growth. I say we move forward.', tendency: 'Approves despite concerns. Ignores quality issues.' },
            critical: { text: 'Excellent. This supports our thesis. Let us take this to the board.', tendency: 'Full commitment. Uses manipulated data as evidence.' },
        },
        firefighter: {
            high: { text: 'Good catch. What is our response plan? Action items and owners by end of day.', tendency: 'Assigns immediate action items.' },
            moderate: { text: 'Something looks off. I want a war room session this afternoon.', tendency: 'Escalates urgency. Emergency meeting.' },
            low: { text: 'This is concerning. We need to freeze discretionary spending until we understand this.', tendency: 'Crisis response. Freezes budgets.' },
            critical: { text: 'Emergency budget review now. I want hourly updates until we have a handle on this.', tendency: 'Maximum escalation. Disrupts operations.' },
        },
        strategist: {
            high: { text: 'What does this mean for our positioning next quarter? How should we adjust the plan?', tendency: 'Integrates into long-term strategy.' },
            moderate: { text: 'Before implications — what timeframe are we looking at and what was excluded?', tendency: 'Validates methodology first.' },
            low: { text: 'We need to separate what the data shows from the story this chart tells. Rebuild from raw numbers.', tendency: 'Demands data-narrative separation.' },
            critical: { text: 'I question whether this presentation was reviewed before reaching us. The visual choices are concerning.', tendency: 'Questions presenter credibility.' },
        },
    };

    return fallbacks[archetype][band];
}

export function generateSimulation(
    state: ChartState,
    evaluation: EvaluationResult,
    templates: ReactionTemplate[]
): SimulationResult {
    const band = getCredibilityBand(evaluation.credibilityScore);
    const dominantManip = findDominantManipulation(evaluation);

    const archetypes: Archetype[] = ['skeptic', 'optimist', 'firefighter', 'strategist'];

    const reactions: ExecutiveReaction[] = archetypes.map((archetype) => {
        let match = templates.find(
            (t) => t.archetype === archetype && t.credibilityBand === band && t.dominantManipulation === dominantManip
        );
        if (!match) {
            match = templates.find(
                (t) => t.archetype === archetype && t.credibilityBand === band && t.dominantManipulation === 'general'
            );
        }

        let reactionText: string;
        let decisionTendency: string;

        if (match) {
            reactionText = interpolateTemplate(match.templateText, state, evaluation);
            decisionTendency = match.decisionTendency;
        } else {
            const fallback = generateFallbackReaction(archetype, band, state, evaluation);
            reactionText = fallback.text;
            decisionTendency = fallback.tendency;
        }

        if (evaluation.credibilityScore <= -3 && archetype !== 'optimist') {
            const erosionMap: Record<string, string> = {
                skeptic: ' I recommend someone else independently verify this analysis.',
                firefighter: ' This is worse than I initially thought.',
                strategist: ' I want to understand whether this was reviewed before it reached us.',
            };
            reactionText += erosionMap[archetype] || '';
        }

        return {
            archetype,
            archetypeLabel: ARCHETYPE_LABELS[archetype],
            reactionText,
            decisionTendency,
            trustLevel: getTrustLevel(archetype, band),
        };
    });

    const decisionOutcome = generateDecisionOutcome(band, evaluation.ethicalLevel, state.metadata.domain);

    const cognitiveLinks = evaluation.biasesTriggered.map((bias) => {
        const linkMap: Record<string, string> = {
            'Pre-attentive Processing': 'Section 1.1 — Visual channels corrupted by 3D distortion or emphasis manipulation',
            'Cognitive Load': 'Section 1.2 — Working memory overwhelmed by visual noise or reduced by clear annotation',
            'Anchoring & Framing': 'Section 1.3 — First impression distorted by axis truncation or misleading annotation',
            'Pattern Recognition': 'Section 1.4 — False patterns imposed through smoothing, small samples, or trendlines on noise',
        };
        return linkMap[bias] || bias;
    });

    return {
        reactions,
        decisionOutcome,
        crossReferences: {
            cognitiveLinks,
            ethicalLevel: evaluation.ethicalLevel,
            ethicalLabel: ETHICAL_LABELS[evaluation.ethicalLevel],
        },
    };
}

function generateDecisionOutcome(
    band: CredibilityBand,
    _ethicalLevel: EthicalLevel,
    domain: string
): string {
    const outcomes: Record<CredibilityBand, string> = {
        high: `The room reaches consensus based on transparent data. The ${domain} decision is well-informed, with appropriate confidence levels. Follow-up actions are proportionate to actual findings.`,
        moderate: `The room is split. The Skeptic and Strategist want more information while the Optimist and Firefighter are ready to act. The decision proceeds with a compromise — partial approval contingent on follow-up analysis.`,
        low: `The presentation creates conflicting reactions. The Optimist approves enthusiastically while the Skeptic raises formal objections. The Firefighter may be overreacting to distorted signals. The organization risks acting on a flawed interpretation.`,
        critical: `The presentation has fractured the room. The Skeptic and Strategist have lost trust in the presenter. The Optimist is making commitments based on false data. The Firefighter is mobilizing resources to address a non-existent crisis. Organizational harm is occurring.`,
    };
    return outcomes[band];
}

export function parseTemplatesFromDB(
    rows: Array<{
        archetype: string;
        credibility_band: string;
        dominant_manipulation: string;
        template_text: string;
        decision_tendency: string;
    }>
): ReactionTemplate[] {
    return rows.map((r) => ({
        archetype: r.archetype as Archetype,
        credibilityBand: r.credibility_band as CredibilityBand,
        dominantManipulation: r.dominant_manipulation,
        templateText: r.template_text,
        decisionTendency: r.decision_tendency,
    }));
}
