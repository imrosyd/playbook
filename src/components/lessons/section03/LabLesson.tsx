import { useState, useEffect, useMemo } from 'react';
import LessonPage from '../../layout/LessonPage';
import BarChart from '../../charts/BarChart';
import ControlDock from '../../lab/ControlDock';
import ScoreGauge from '../../ui/ScoreGauge';
import ExecutivePanel from '../../ui/ExecutivePanel';
import { evaluateChartState, computeLinearRegression } from '../../../lib/scoring';
import { generateSimulation, parseTemplatesFromDB } from '../../../lib/simulation';
import { transformData } from '../../../lib/transforms';
import { supabase } from '../../../lib/supabase';
import { DEFAULT_PARAMS } from '../../../types/chart';
import type { ChartParams, ChartState, Scenario, DataPoint } from '../../../types/chart';
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
        { label: 'Jan', value: 82 },
        { label: 'Feb', value: 78 },
        { label: 'Mar', value: 91 },
        { label: 'Apr', value: 85 },
        { label: 'May', value: 94 },
        { label: 'Jun', value: 88 },
        { label: 'Jul', value: 97 },
        { label: 'Aug', value: 92 },
        { label: 'Sep', value: 103 },
        { label: 'Oct', value: 98 },
        { label: 'Nov', value: 110 },
        { label: 'Dec', value: 107 },
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
    const [params, setParams] = useState<ChartParams>({ ...DEFAULT_PARAMS });
    const [templates, setTemplates] = useState<ReturnType<typeof parseTemplatesFromDB>>([]);

    useEffect(() => {
        async function loadData() {
            try {
                const { data: scenarioRows, error: scenarioError } = await supabase
                    .from('scenarios')
                    .select('*')
                    .order('sort_order', { ascending: true });

                if (!scenarioError && scenarioRows && scenarioRows.length > 0) {
                    const mapped: Scenario[] = scenarioRows.map((row) => ({
                        id: row.id,
                        title: row.title,
                        domain: row.domain,
                        description: row.description,
                        decisionTimeframe: row.decision_timeframe,
                        dataSpansOrdersOfMagnitude: row.data_spans_orders_of_magnitude ?? false,
                        baseData: Array.isArray(row.base_data) ? row.base_data as DataPoint[] : FALLBACK_SCENARIO.baseData,
                        sortOrder: row.sort_order ?? 0,
                    }));
                    setScenarios(mapped);
                }
            } catch {
                // use fallback
            }

            try {
                const { data: templateRows, error: templateError } = await supabase
                    .from('reaction_templates')
                    .select('*');

                if (!templateError && templateRows) {
                    setTemplates(parseTemplatesFromDB(templateRows));
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
            chartType: 'bar',
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
    }, [activeScenario, params]);

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
                        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 overflow-x-auto">
                            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                                {activeScenario.title}
                            </p>
                            <BarChart state={chartState} width={560} height={340} />
                        </div>
                        <ControlDock
                            params={params}
                            data={activeScenario.baseData}
                            onChange={setParams}
                            visibleGroups={visibleGroups}
                        />
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
