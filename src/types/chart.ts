export interface DataPoint {
    label: string;
    value: number;
}

export type Domain = 'revenue' | 'inventory' | 'marketing' | 'churn' | 'budget' | 'project';
export type Timeframe = 'day' | 'week' | 'month' | 'quarter' | 'year';
export type ScaleType = 'linear' | 'log';
export type SortOrder = 'value_asc' | 'value_desc' | 'alpha' | 'original' | 'custom';
export type LabelMode = 'none' | 'selective' | 'all';
export type OutlierMode = 'show_all' | 'statistical_3sd' | 'manual_exclude';
export type TrendlineType = 'none' | 'linear';
export type ConfidenceLevel = 'none' | '90' | '95' | '99';
export type ChartType = 'bar' | 'line' | 'area' | 'scatter' | 'pie';

export interface ChartParams {
    axisBaselinePct: number;
    axisMaxFactor: number;
    invertYAxis: boolean;
    sortOrder: SortOrder;
    colorEmphasis: {
        highlightedIndices: number[];
        dimOpacity: number;
    };
    gridlineCount: number;
    labelMode: LabelMode;
    annotation: {
        enabled: boolean;
        text: string;
        honest: boolean;
    };
    threeD: boolean;
    outlierMode: OutlierMode;
    manualExcludedIndices: number[];
    trendline: TrendlineType;
    smoothingWindow: number;
    samplePct: number;
    sourceCited: boolean;
    confidenceLevel: ConfidenceLevel;
    totalDataSize: number;
    showComparativeScale: boolean;
    dataTableEnabled: boolean;
    highlightRationale: string;
}

export interface ChartMetadata {
    scenarioTitle: string;
    domain: Domain;
    decisionTimeframe: Timeframe;
    dataSpansOrdersOfMagnitude: boolean;
    statisticallySignificantTrend: boolean;
    trendlineRSquared: number;
}

export interface ChartState {
    datasetId: string;
    data: DataPoint[];
    chartType: ChartType;
    params: ChartParams;
    metadata: ChartMetadata;
}

export const DEFAULT_PARAMS: ChartParams = {
    axisBaselinePct: 0,
    axisMaxFactor: 1.08,
    invertYAxis: false,
    sortOrder: 'original',
    colorEmphasis: {
        highlightedIndices: [],
        dimOpacity: 1,
    },
    gridlineCount: 5,
    labelMode: 'none',
    annotation: {
        enabled: false,
        text: '',
        honest: true,
    },
    threeD: false,
    outlierMode: 'show_all',
    manualExcludedIndices: [],
    trendline: 'none',
    smoothingWindow: 1,
    samplePct: 100,
    sourceCited: false,
    confidenceLevel: 'none',
    totalDataSize: 100,
    showComparativeScale: false,
    dataTableEnabled: false,
    highlightRationale: 'none',
};

export type Archetype = 'skeptic' | 'optimist' | 'firefighter' | 'strategist';
export type CredibilityBand = 'high' | 'moderate' | 'low' | 'critical';
export type EthicalLevel = 1 | 2 | 3 | 4 | 5;

export interface ScoreContribution {
    parameter: string;
    state: string;
    contribution: number;
    justification: string;
}

export interface InteractionPenalty {
    combination: string;
    penalty: number;
    justification: string;
}

export interface EvaluationResult {
    credibilityScore: number;
    rawScore: number;
    scoreBreakdown: ScoreContribution[];
    interactionPenalties: InteractionPenalty[];
    biasesTriggered: string[];
    ethicalLevel: EthicalLevel;
    perceptionShiftText: string;
}

export interface ExecutiveReaction {
    archetype: Archetype;
    archetypeLabel: string;
    reactionText: string;
    decisionTendency: string;
    trustLevel: 'trusting' | 'cautious' | 'suspicious' | 'hostile';
}

export interface SimulationResult {
    reactions: ExecutiveReaction[];
    decisionOutcome: string;
    crossReferences: {
        cognitiveLinks: string[];
        ethicalLevel: EthicalLevel;
        ethicalLabel: string;
    };
}

export interface Scenario {
    id: string;
    title: string;
    domain: Domain;
    description: string;
    decisionTimeframe: Timeframe;
    dataSpansOrdersOfMagnitude: boolean;
    baseData: DataPoint[];
    sortOrder: number;
}

export interface CognitivePrinciple {
    id: string;
    principleKey: string;
    title: string;
    description: string;
    researchCitation: string;
    sortOrder: number;
}

export interface EthicalLevelData {
    id: string;
    level: number;
    name: string;
    description: string;
    exampleText: string;
    colorCode: string;
}
