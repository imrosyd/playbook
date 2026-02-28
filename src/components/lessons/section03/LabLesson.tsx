import { useState, useEffect, useMemo } from 'react';
import LessonPage from '../../layout/LessonPage';
import BarChart from '../../charts/BarChart';
import LineChart from '../../charts/LineChart';
import AreaChart from '../../charts/AreaChart';
import ScatterChart from '../../charts/ScatterChart';
import PieChart from '../../charts/PieChart';
import ControlDock from '../../lab/ControlDock';
import ScoreGauge from '../../ui/ScoreGauge';
import ExecutivePanel from '../../ui/ExecutivePanel';
import { evaluateChartState, computeLinearRegression } from '../../../lib/scoring';
import { generateSimulation, parseTemplatesFromDB } from '../../../lib/simulation';
import { transformData } from '../../../lib/transforms';
import { DEFAULT_PARAMS } from '../../../types/chart';
import type { ChartParams, ChartState, Scenario, DataPoint, ChartType } from '../../../types/chart';
import type { VisibleGroups } from '../../lab/ControlDock';

export type LabMode = 'axis-scale' | 'data-transform' | 'visual-emphasis' | 'annotation-trend' | 'full';

interface CrossRef {
    sectionId: string;
    slug: string;
    label: string;
}

interface LabLessonProps {
    mode: LabMode;
    crossRefs: CrossRef[];
}

const FALLBACK_SCENARIO: Scenario = {
    id: 'fallback-revenue',
    title: 'Monthly Revenue',
    domain: 'revenue',
    description: 'Monthly revenue figures for the past 12 months',
    decisionTimeframe: 'month',
    dataSpansOrdersOfMagnitude: false,
    baseData: [
        { label: 'Jan Y1', value: 82 }, { label: 'Feb Y1', value: 78 }, { label: 'Mar Y1', value: 91 },
        { label: 'Apr Y1', value: 85 }, { label: 'May Y1', value: 94 }, { label: 'Jun Y1', value: 88 },
        { label: 'Jul Y1', value: 97 }, { label: 'Aug Y1', value: 92 }, { label: 'Sep Y1', value: 103 },
        { label: 'Oct Y1', value: 98 }, { label: 'Nov Y1', value: 110 }, { label: 'Dec Y1', value: 107 },
        { label: 'Jan Y2', value: 112 }, { label: 'Feb Y2', value: 105 }, { label: 'Mar Y2', value: 240 }, // OUTLIER SPIKE
        { label: 'Apr Y2', value: 115 }, { label: 'May Y2', value: 121 }, { label: 'Jun Y2', value: 118 },
        { label: 'Jul Y2', value: 125 }, { label: 'Aug Y2', value: 122 }, { label: 'Sep Y2', value: 130 },
        { label: 'Oct Y2', value: 128 }, { label: 'Nov Y2', value: 135 }, { label: 'Dec Y2', value: 132 },
        { label: 'Jan Y3', value: 138 }, { label: 'Feb Y3', value: 134 }, { label: 'Mar Y3', value: 145 },
        { label: 'Apr Y3', value: 140 }, { label: 'May Y3', value: 148 }, { label: 'Jun Y3', value: 142 },
        { label: 'Jul Y3', value: 153 }, { label: 'Aug Y3', value: 40 }, // OUTLIER DROP
        { label: 'Sep Y3', value: 158 }, { label: 'Oct Y3', value: 152 }, { label: 'Nov Y3', value: 165 },
        { label: 'Dec Y3', value: 160 }, { label: 'Jan Y4', value: 168 }, { label: 'Feb Y4', value: 162 },
        { label: 'Mar Y4', value: 175 }, { label: 'Apr Y4', value: 170 }, { label: 'May Y4', value: 180 },
        { label: 'Jun Y4', value: 174 }, { label: 'Jul Y4', value: 185 }, { label: 'Aug Y4', value: 180 },
        { label: 'Sep Y4', value: 290 }, // OUTLIER SPIKE
        { label: 'Oct Y4', value: 186 }, { label: 'Nov Y4', value: 195 }, { label: 'Dec Y4', value: 190 },
    ],
    sortOrder: 0,
};

function getModeVisibleGroups(mode: LabMode): VisibleGroups | undefined {
    switch (mode) {
        case 'axis-scale':
            return { axisScale: true };
        case 'data-transform':
            return { dataTransform: true };
        case 'visual-emphasis':
            return { visualEmphasis: true };
        case 'annotation-trend':
            return { annotationTrend: true };
        case 'full':
            return undefined;
    }
}

function getModeIntro(mode: LabMode): string {
    switch (mode) {
        case 'axis-scale':
            return 'Axis truncation is one of the most common forms of chart manipulation. By setting the y-axis baseline above zero, differences between bars appear dramatically larger than they are in reality. A chart where the actual difference is 5% can be made to look like a 300% difference. The 3D perspective effect adds a second layer of distortion — foreshortening alters the pre-attentive attribute of bar length, introducing up to 50% magnitude estimation error. Use the controls below to observe how axis choices alone can transform a chart from transparent to deceptive.';
        case 'data-transform':
            return 'Data transformation decisions — smoothing, sample size, and outlier handling — happen before the chart is drawn, making them invisible to most viewers. A rolling average that spans a full quarter eliminates the within-quarter variance that often contains the most actionable signals. Cherry-picking which data points to exclude as "outliers" without a documented statistical criterion is a form of data fabrication. Use the controls below to see how these upstream choices affect what the chart appears to say.';
        case 'visual-emphasis':
            return 'Visual emphasis techniques redirect attention without changing the underlying data. Sorting bars by value creates a natural ranking narrative. Highlighting one bar while dimming others focuses the viewer\'s pre-attentive system on a single element, suppressing context. These techniques sit between honest editorial choice and manipulation — the line depends on whether the emphasis reflects a real decision-relevant distinction or a desired conclusion. Use the controls to experiment with emphasis levels.';
        case 'annotation-trend':
            return 'Annotations and trendlines are powerful tools for adding interpretive context — and powerful tools for implanting false narratives. A misleading annotation exploits anchoring bias: once a viewer reads "strong upward trajectory," they interpret all subsequent data through that lens. A trendline fitted to data with low R² imposes a narrative where the data contains only noise. Use the controls below to observe how annotation framing and trendline choices interact with the viewer\'s interpretive process.';
        case 'full':
            return 'This lab gives you access to all manipulation controls simultaneously. Real-world chart deception often combines multiple techniques — axis truncation paired with 3D effects, heavy smoothing paired with a misleading annotation. The scoring system evaluates each parameter individually and then applies interaction penalties when multiple severe manipulations compound. Explore how the credibility score changes as you layer techniques, and observe how executive reactions shift at different score thresholds.';
    }
}

export default function LabLesson({ mode, crossRefs }: LabLessonProps) {
    const [scenarios, setScenarios] = useState<Scenario[]>([FALLBACK_SCENARIO]);
    const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
    const [activeChartType, setActiveChartType] = useState<ChartType>('bar');
    const [params, setParams] = useState<ChartParams>({ ...DEFAULT_PARAMS });
    const [templates, setTemplates] = useState<ReturnType<typeof parseTemplatesFromDB>>([]);

    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetch('/api/scenarios');
                if (response.ok) {
                    const scenarioRows = await response.json();
                    if (scenarioRows && scenarioRows.length > 0) {
                        const mapped: Scenario[] = scenarioRows.map((row: any) => ({
                            id: row.id,
                            title: row.title,
                            domain: row.domain,
                            description: row.description,
                            decisionTimeframe: row.decision_timeframe || row.decisionTimeframe,
                            dataSpansOrdersOfMagnitude: (row.data_spans_orders_of_magnitude ?? row.dataSpansOrdersOfMagnitude) ?? false,
                            baseData: Array.isArray(row.base_data || row.baseData) ? (row.base_data || row.baseData) as DataPoint[] : FALLBACK_SCENARIO.baseData,
                            sortOrder: (row.sort_order ?? row.sortOrder) ?? 0,
                        }));
                        setScenarios(mapped);
                    }
                }
            } catch {
                // use fallback
            }

            try {
                // Note: The previous code queried 'reaction_templates', but the table in schema/API is 'executive_reactions'.
                const response = await fetch('/api/executive_reactions');
                if (response.ok) {
                    const templateRows = await response.json();
                    if (templateRows) {
                        setTemplates(parseTemplatesFromDB(templateRows));
                    }
                }
            } catch {
                // use empty templates (fallback reactions will be used)
            }
        }

        loadData();
    }, []);

    const activeScenario = scenarios[activeScenarioIndex] ?? FALLBACK_SCENARIO;

    const chartState: ChartState = useMemo(() => {
        const processedData = transformData(activeScenario.baseData, params);
        const regressionPoints = processedData.map((d, i) => ({ x: i, y: d.value }));
        const regression = computeLinearRegression(regressionPoints);
        const significant = regression.rSquared >= 0.3 && processedData.length >= 4;

        return {
            datasetId: activeScenario.id,
            data: activeScenario.baseData,
            chartType: activeChartType,
            params,
            metadata: {
                scenarioTitle: activeScenario.title,
                domain: activeScenario.domain,
                decisionTimeframe: activeScenario.decisionTimeframe,
                dataSpansOrdersOfMagnitude: activeScenario.dataSpansOrdersOfMagnitude,
                statisticallySignificantTrend: significant,
                trendlineRSquared: regression.rSquared,
            },
        };
    }, [activeScenario, params, activeChartType]);

    const evaluation = useMemo(() => evaluateChartState(chartState), [chartState]);

    const simulation = useMemo(
        () => generateSimulation(chartState, evaluation, templates),
        [chartState, evaluation, templates]
    );

    const visibleGroups = getModeVisibleGroups(mode);
    const introText = getModeIntro(mode);

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">{introText}</p>

                {/* Scenario selector */}
                {scenarios.length > 1 && (
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Dataset</p>
                        <div className="flex flex-wrap gap-2">
                            {scenarios.map((scenario, i) => (
                                <button
                                    key={scenario.id}
                                    onClick={() => {
                                        setActiveScenarioIndex(i);
                                        setParams({ ...DEFAULT_PARAMS });
                                    }}
                                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all ${i === activeScenarioIndex
                                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                                        : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300 hover:text-stone-700'
                                        }`}
                                >
                                    {scenario.title}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* 2-column lab interface */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Left: Chart + Controls */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 overflow-hidden">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                                    {activeScenario.title}
                                </p>
                                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200">
                                    {(['bar', 'line', 'area', 'scatter', 'pie'] as ChartType[]).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setActiveChartType(type)}
                                            className={`px-3 py-1 rounded text-xs font-semibold capitalize transition-all ${activeChartType === type
                                                ? 'bg-white text-stone-800 shadow-sm'
                                                : 'text-stone-500 hover:text-stone-700'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {params.highlightRationale !== 'none' && (
                                <div className="mb-4 bg-amber-50 border border-amber-200 rounded-md p-2.5 text-xs text-amber-800 flex items-start gap-2">
                                    <svg className="w-4 h-4 text-amber-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <div>
                                        <span className="font-semibold">Editorial Note: </span>
                                        {params.highlightRationale === 'current_vs_past' && 'Highlighting current year performance against historical context.'}
                                        {params.highlightRationale === 'market_outperformance' && 'Highlighting periods of significant market outperformance.'}
                                        {params.highlightRationale === 'custom_editorial' && 'Highlight applies custom editorial emphasis to key data points.'}
                                    </div>
                                </div>
                            )}

                            {activeChartType === 'bar' && <BarChart state={chartState} width={560} height={340} />}
                            {activeChartType === 'line' && <LineChart state={chartState} width={560} height={340} />}
                            {activeChartType === 'area' && <AreaChart state={chartState} width={560} height={340} />}
                            {activeChartType === 'scatter' && <ScatterChart state={chartState} width={560} height={340} />}
                            {activeChartType === 'pie' && <PieChart state={chartState} width={560} height={340} />}
                        </div>
                        <ControlDock
                            params={params}
                            data={activeScenario.baseData}
                            onChange={setParams}
                            visibleGroups={visibleGroups}
                        />

                        {params.dataTableEnabled && (
                            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 overflow-hidden mt-4">
                                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Underlying Dataset</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs text-left text-stone-600">
                                        <thead className="text-stone-500 bg-stone-50 uppercase border-b border-stone-100">
                                            <tr>
                                                <th className="px-3 py-2 font-medium">Period</th>
                                                <th className="px-3 py-2 font-medium text-right">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chartState.data.map((d, i) => (
                                                <tr key={i} className="border-b border-stone-50 last:border-0 hover:bg-stone-50">
                                                    <td className="px-3 py-1.5">{d.label}</td>
                                                    <td className="px-3 py-1.5 text-right font-medium">{d.value.toFixed(1)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-stone-50 text-stone-500 border-t border-stone-200 font-semibold">
                                            <tr>
                                                <td className="px-3 py-2">Total Points</td>
                                                <td className="px-3 py-2 text-right">{chartState.data.length}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Score + Executive reactions */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
                            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">
                                Integrity Evaluation
                            </p>
                            <ScoreGauge evaluation={evaluation} />
                        </div>
                        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
                            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">
                                Executive Reactions
                            </p>
                            <ExecutivePanel simulation={simulation} />
                        </div>
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
