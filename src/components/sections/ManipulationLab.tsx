import { useState, useMemo, useEffect } from 'react';
import { FlaskConical, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ChartState, ChartParams, Scenario, DataPoint } from '../../types/chart';
import { DEFAULT_PARAMS } from '../../types/chart';
import { evaluateChartState } from '../../lib/scoring';
import { computeLinearRegression } from '../../lib/scoring';
import { generateSimulation, parseTemplatesFromDB } from '../../lib/simulation';
import { transformData } from '../../lib/transforms';
import BarChart from '../charts/BarChart';
import ControlDock from '../lab/ControlDock';
import ScoreGauge from '../ui/ScoreGauge';
import ExecutivePanel from '../ui/ExecutivePanel';

const FALLBACK_SCENARIOS: Scenario[] = [
    {
        id: 'revenue',
        title: 'Q3 Revenue Trajectory',
        domain: 'revenue',
        description: 'Your company reported $12.4M in Q2 revenue. The board wants to see Q3 monthly performance to decide whether to approve a $2M expansion budget.',
        decisionTimeframe: 'month',
        dataSpansOrdersOfMagnitude: false,
        baseData: [
            { label: 'Jul W1', value: 3.05 }, { label: 'Jul W2', value: 3.12 },
            { label: 'Jul W3', value: 2.98 }, { label: 'Jul W4', value: 3.21 },
            { label: 'Aug W1', value: 3.08 }, { label: 'Aug W2', value: 3.35 },
            { label: 'Aug W3', value: 3.18 }, { label: 'Aug W4', value: 2.95 },
            { label: 'Sep W1', value: 3.42 }, { label: 'Sep W2', value: 3.15 },
            { label: 'Sep W3', value: 3.28 }, { label: 'Sep W4', value: 3.51 },
        ],
        preferredChartTypes: 'line,bar',
        sortOrder: 1,
    },
    {
        id: 'churn',
        title: 'Customer Churn Analysis',
        domain: 'churn',
        description: 'Monthly customer churn rate over the past year. The CEO believes churn is improving and wants to present this to investors.',
        decisionTimeframe: 'month',
        dataSpansOrdersOfMagnitude: false,
        baseData: [
            { label: 'Jan', value: 4.2 }, { label: 'Feb', value: 3.8 },
            { label: 'Mar', value: 5.1 }, { label: 'Apr', value: 3.5 },
            { label: 'May', value: 3.9 }, { label: 'Jun', value: 3.2 },
            { label: 'Jul', value: 4.8 }, { label: 'Aug', value: 3.1 },
            { label: 'Sep', value: 3.6 }, { label: 'Oct', value: 2.9 },
            { label: 'Nov', value: 3.3 }, { label: 'Dec', value: 3.0 },
        ],
        preferredChartTypes: 'line',
        sortOrder: 2,
    },
    {
        id: 'marketing',
        title: 'Marketing Channel ROI',
        domain: 'marketing',
        description: 'Quarterly ROI comparison across 6 marketing channels. The marketing VP wants to justify doubling the social media budget.',
        decisionTimeframe: 'quarter',
        dataSpansOrdersOfMagnitude: false,
        baseData: [
            { label: 'Email', value: 4.2 }, { label: 'Social Media', value: 2.8 },
            { label: 'Paid Search', value: 3.5 }, { label: 'Content', value: 2.1 },
            { label: 'Events', value: 1.8 }, { label: 'Referral', value: 3.9 },
        ],
        preferredChartTypes: 'bar',
        sortOrder: 3,
    },
];

export default function ManipulationLab() {
    const [scenarios, setScenarios] = useState<Scenario[]>(FALLBACK_SCENARIOS);
    const [scenarioIndex, setScenarioIndex] = useState(0);
    const [params, setParams] = useState<ChartParams>({ ...DEFAULT_PARAMS });
    const [templates, setTemplates] = useState<ReturnType<typeof parseTemplatesFromDB>>([]);
    const [activeTab, setActiveTab] = useState<'score' | 'executive'>('score');

    useEffect(() => {
        async function load() {
            try {
                const [scenRes, tmplRes] = await Promise.all([
                    fetch('/api/scenarios').then(res => res.json()),
                    fetch('/api/executive_reactions').then(res => res.json()),
                ]);

                if (scenRes && scenRes.length > 0) {
                    setScenarios(
                        scenRes.map((s: Record<string, unknown>) => ({
                            id: s.id as string,
                            title: s.title as string,
                            domain: s.domain as Scenario['domain'],
                            description: s.description as string,
                            decisionTimeframe: (s.decision_timeframe || s.decisionTimeframe) as Scenario['decisionTimeframe'],
                            dataSpansOrdersOfMagnitude: (s.data_spans_orders_of_magnitude || s.dataSpansOrdersOfMagnitude) as boolean,
                            baseData: (s.base_data || s.baseData) as DataPoint[],
                            preferredChartTypes: (s.preferred_chart_types || s.preferredChartTypes || 'line,bar') as string,
                            sortOrder: (s.sort_order || s.sortOrder) as number,
                        }))
                    );
                }
                if (tmplRes) {
                    setTemplates(parseTemplatesFromDB(tmplRes));
                }
            } catch (err) {
                console.error('Failed to load lab data:', err);
            }
        }
        load();
    }, []);

    const scenario = scenarios[scenarioIndex];

    const chartState = useMemo<ChartState>(() => {
        const transformed = transformData(scenario.baseData, params);
        const regData = transformed.map((d, i) => ({ x: i, y: d.value }));
        const reg = computeLinearRegression(regData);

        return {
            datasetId: scenario.id,
            data: scenario.baseData,
            chartType: 'bar',
            params,
            metadata: {
                scenarioTitle: scenario.title,
                domain: scenario.domain,
                decisionTimeframe: scenario.decisionTimeframe,
                dataSpansOrdersOfMagnitude: scenario.dataSpansOrdersOfMagnitude,
                statisticallySignificantTrend: reg.rSquared >= 0.3,
                trendlineRSquared: reg.rSquared,
                preferredChartTypes: scenario.preferredChartTypes,
            },
        };
    }, [scenario, params]);

    const evaluation = useMemo(() => evaluateChartState(chartState), [chartState]);
    const simulation = useMemo(
        () => generateSimulation(chartState, evaluation, templates),
        [chartState, evaluation, templates]
    );

    return (
        <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 mb-4">
                    <FlaskConical size={14} className="text-blue-600" />
                    <span className="text-xs font-semibold text-blue-700">Interactive Lab</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                    The Manipulation Lab
                </h2>
                <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
                    Adjust chart parameters and watch how each change affects credibility, cognitive biases,
                    and executive decision-making in real time.
                </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => {
                            setScenarioIndex((i) => (i - 1 + scenarios.length) % scenarios.length);
                            setParams({ ...DEFAULT_PARAMS });
                        }}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <ChevronLeft size={18} className="text-slate-500" />
                    </button>
                    <div className="text-center flex-1 px-4">
                        <h3 className="text-base font-bold text-slate-800">{scenario.title}</h3>
                        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">{scenario.description}</p>
                    </div>
                    <button
                        onClick={() => {
                            setScenarioIndex((i) => (i + 1) % scenarios.length);
                            setParams({ ...DEFAULT_PARAMS });
                        }}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <ChevronRight size={18} className="text-slate-500" />
                    </button>
                </div>
                <div className="flex justify-center gap-2 mt-3">
                    {scenarios.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setScenarioIndex(i);
                                setParams({ ...DEFAULT_PARAMS });
                            }}
                            className={`w-2 h-2 rounded-full transition-colors ${i === scenarioIndex ? 'bg-blue-600' : 'bg-slate-300'
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-3">
                    <ControlDock params={params} data={scenario.baseData} onChange={setParams} />
                </div>

                <div className="lg:col-span-5">
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-semibold text-slate-700">
                                Chart Preview
                            </h4>
                            {params.trendline === 'linear' && (
                                <span className="text-xs text-slate-400">
                                    R² = {chartState.metadata.trendlineRSquared.toFixed(3)}
                                </span>
                            )}
                        </div>
                        <BarChart state={chartState} width={520} height={360} />
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-4">
                    <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
                        <button
                            onClick={() => setActiveTab('score')}
                            className={`flex-1 text-xs font-medium py-2 rounded-md transition-colors ${activeTab === 'score'
                                ? 'bg-white text-slate-800 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Credibility Score
                        </button>
                        <button
                            onClick={() => setActiveTab('executive')}
                            className={`flex-1 text-xs font-medium py-2 rounded-md transition-colors ${activeTab === 'executive'
                                ? 'bg-white text-slate-800 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Executive Reactions
                        </button>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        {activeTab === 'score' ? (
                            <ScoreGauge evaluation={evaluation} />
                        ) : (
                            <ExecutivePanel simulation={simulation} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
