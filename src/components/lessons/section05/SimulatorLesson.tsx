import { useState, useEffect, useMemo } from 'react';
import { Shield, TrendingUp, Flame, Compass } from 'lucide-react';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LessonPage from '../../layout/LessonPage';
import BarChart from '../../charts/BarChart';
import ScoreGauge from '../../ui/ScoreGauge';
import { evaluateChartState, computeLinearRegression } from '../../../lib/scoring';
import { generateSimulation, parseTemplatesFromDB } from '../../../lib/simulation';
import { transformData } from '../../../lib/transforms';
import { DEFAULT_PARAMS } from '../../../types/chart';
import type { ChartState, Scenario, DataPoint, ChartParams, Archetype } from '../../../types/chart';

interface CrossRef {
    sectionId: string;
    slug: string;
    label: string;
}

interface SimulatorLessonProps {
    scenarioKey: string;
    crossRefs: CrossRef[];
}

// Hardcoded fallback scenarios by domain key
const FALLBACK_SCENARIOS = (_lang: any): Record<string, Scenario> => ({
    revenue: {
        id: 'fallback-revenue',
        title: 'Monthly Revenue',
        domain: 'revenue',
        description: 'Monthly revenue performance over the past 12 months',
        decisionTimeframe: 'month',
        dataSpansOrdersOfMagnitude: false,
        baseData: [
            { label: 'Jan', value: 82 }, { label: 'Feb', value: 78 }, { label: 'Mar', value: 91 },
            { label: 'Apr', value: 85 }, { label: 'May', value: 94 }, { label: 'Jun', value: 88 },
            { label: 'Jul', value: 97 }, { label: 'Aug', value: 92 }, { label: 'Sep', value: 103 },
            { label: 'Oct', value: 98 }, { label: 'Nov', value: 110 }, { label: 'Dec', value: 107 },
        ],
        preferredChartTypes: 'line,bar',
        sortOrder: 0,
    },
    churn: {
        id: 'fallback-churn',
        title: 'Customer Churn Rate',
        domain: 'churn',
        description: 'Monthly customer churn rate (%) over the past 12 months',
        decisionTimeframe: 'month',
        dataSpansOrdersOfMagnitude: false,
        baseData: [
            { label: 'Jan', value: 3.2 }, { label: 'Feb', value: 3.8 }, { label: 'Mar', value: 2.9 },
            { label: 'Apr', value: 4.1 }, { label: 'May', value: 3.5 }, { label: 'Jun', value: 4.7 },
            { label: 'Jul', value: 5.2 }, { label: 'Aug', value: 4.4 }, { label: 'Sep', value: 3.9 },
            { label: 'Oct', value: 4.8 }, { label: 'Nov', value: 5.6 }, { label: 'Dec', value: 5.1 },
        ],
        preferredChartTypes: 'line',
        sortOrder: 1,
    },
    marketing: {
        id: 'fallback-marketing',
        title: 'Marketing ROI',
        domain: 'marketing',
        description: 'Monthly marketing return on investment by channel',
        decisionTimeframe: 'month',
        dataSpansOrdersOfMagnitude: false,
        baseData: [
            { label: 'Email', value: 320 }, { label: 'SEO', value: 480 }, { label: 'Paid Search', value: 210 },
            { label: 'Social', value: 150 }, { label: 'Display', value: 90 }, { label: 'Referral', value: 380 },
            { label: 'Content', value: 290 }, { label: 'Video', value: 175 },
        ],
        preferredChartTypes: 'bar',
        sortOrder: 2,
    },
    inventory: {
        id: 'fallback-inventory',
        title: 'Inventory Turnover',
        domain: 'inventory',
        description: 'Inventory turnover ratio by product category',
        decisionTimeframe: 'quarter',
        dataSpansOrdersOfMagnitude: false,
        baseData: [
            { label: 'Electronics', value: 8.2 }, { label: 'Apparel', value: 4.1 }, { label: 'Home', value: 3.7 },
            { label: 'Food', value: 12.4 }, { label: 'Toys', value: 5.9 }, { label: 'Sports', value: 6.3 },
            { label: 'Books', value: 2.8 }, { label: 'Beauty', value: 7.1 },
        ],
        preferredChartTypes: 'bar',
        sortOrder: 3,
    },
    project: {
        id: 'fallback-project',
        title: 'Project Velocity',
        domain: 'project',
        description: 'Sprint velocity (story points completed) over 10 sprints',
        decisionTimeframe: 'week',
        dataSpansOrdersOfMagnitude: false,
        baseData: [
            { label: 'S1', value: 34 }, { label: 'S2', value: 28 }, { label: 'S3', value: 41 },
            { label: 'S4', value: 38 }, { label: 'S5', value: 45 }, { label: 'S6', value: 31 },
            { label: 'S7', value: 48 }, { label: 'S8', value: 52 }, { label: 'S9', value: 44 },
            { label: 'S10', value: 55 },
        ],
        preferredChartTypes: 'line,bar',
        sortOrder: 4,
    },
    budget: {
        id: 'fallback-budget',
        title: 'Budget vs. Actuals',
        domain: 'budget',
        description: 'Department spending as % of allocated budget (Q3)',
        decisionTimeframe: 'quarter',
        dataSpansOrdersOfMagnitude: false,
        baseData: [
            { label: 'Engineering', value: 94 }, { label: 'Sales', value: 108 }, { label: 'Marketing', value: 117 },
            { label: 'HR', value: 88 }, { label: 'Finance', value: 76 }, { label: 'Product', value: 102 },
            { label: 'Support', value: 91 }, { label: 'Legal', value: 83 },
        ],
        preferredChartTypes: 'bar',
        sortOrder: 5,
    },
});

const MANIPULATED_PARAMS = (lang: any): ChartParams => ({
    ...DEFAULT_PARAMS,
    axisBaselinePct: 55,
    threeD: true,
    smoothingWindow: 4,
    annotation: {
        enabled: true,
        text: t(lang, 's5.simulator.manipulatedParams.annotationText'),
        honest: false,
    },
    trendline: 'linear',
});

const ARCHETYPE_CONFIG: Record<Archetype, {
    icon: typeof Shield;
    color: string;
    bgColor: string;
    borderColor: string;
}> = {
    skeptic: { icon: Shield, color: '#1e40af', bgColor: '#eff6ff', borderColor: '#bfdbfe' },
    optimist: { icon: TrendingUp, color: '#047857', bgColor: '#ecfdf5', borderColor: '#a7f3d0' },
    firefighter: { icon: Flame, color: '#b91c1c', bgColor: '#fef2f2', borderColor: '#fecaca' },
    strategist: { icon: Compass, color: '#7c2d12', bgColor: '#fff7ed', borderColor: '#fed7aa' },
};

const TRUST_COLORS: Record<string, string> = {
    trusting: '#10b981',
    cautious: '#f59e0b',
    suspicious: '#ef4444',
    hostile: '#991b1b',
};

export default function SimulatorLesson({ scenarioKey, crossRefs }: SimulatorLessonProps) {
    const { lang } = useLang();
    const fallbackScenarios = useMemo(() => FALLBACK_SCENARIOS(lang), [lang]);
    const [scenario, setScenario] = useState<Scenario>(
        fallbackScenarios[scenarioKey] ?? fallbackScenarios['revenue']
    );
    const [isManipulated, setIsManipulated] = useState(false);
    const [templates, setTemplates] = useState<ReturnType<typeof parseTemplatesFromDB>>([]);
    const [expandedArchetype, setExpandedArchetype] = useState<Archetype | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetch('/api/scenarios');
                if (response.ok) {
                    const scenarioRows = await response.json();
                    if (scenarioRows && scenarioRows.length > 0) {
                        const row = scenarioRows.find((r: any) => r.domain.toLowerCase() === scenarioKey.toLowerCase());
                        if (row) {
                            setScenario({
                                id: row.id,
                                title: row.title,
                                domain: row.domain,
                                description: row.description,
                                decisionTimeframe: row.decision_timeframe || row.decisionTimeframe,
                                dataSpansOrdersOfMagnitude: (row.data_spans_orders_of_magnitude ?? row.dataSpansOrdersOfMagnitude) ?? false,
                                baseData: Array.isArray(row.base_data || row.baseData) ? (row.base_data || row.baseData) as DataPoint[] : scenario.baseData,
                                preferredChartTypes: row.preferred_chart_types || row.preferredChartTypes || 'line,bar',
                                sortOrder: (row.sort_order ?? row.sortOrder) ?? 0,
                            });
                        }
                    }
                }
            } catch {
                // keep fallback
            }

            try {
                const response = await fetch('/api/executive_reactions');
                if (response.ok) {
                    const templateRows = await response.json();
                    if (templateRows) {
                        setTemplates(parseTemplatesFromDB(templateRows));
                    }
                }
            } catch {
                // keep empty
            }
        }
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scenarioKey]);

    const activeParams = isManipulated ? MANIPULATED_PARAMS(lang) : DEFAULT_PARAMS;

    const chartState: ChartState = useMemo(() => {
        const processedData = transformData(scenario.baseData, activeParams);
        const regressionPoints = processedData.map((d, i) => ({ x: i, y: d.value }));
        const regression = computeLinearRegression(regressionPoints);
        const significant = regression.rSquared >= 0.3 && processedData.length >= 4;

        return {
            datasetId: scenario.id,
            data: scenario.baseData,
            chartType: 'bar',
            params: activeParams,
            metadata: {
                scenarioTitle: scenario.title,
                domain: scenario.domain,
                decisionTimeframe: scenario.decisionTimeframe,
                dataSpansOrdersOfMagnitude: scenario.dataSpansOrdersOfMagnitude,
                statisticallySignificantTrend: significant,
                trendlineRSquared: regression.rSquared,
                preferredChartTypes: scenario.preferredChartTypes,
            },
        };
    }, [scenario, activeParams]);

    const evaluation = useMemo(() => evaluateChartState(chartState), [chartState]);

    const simulation = useMemo(
        () => generateSimulation(chartState, evaluation, templates),
        [chartState, evaluation, templates]
    );

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    {t(lang, 's5.simulator.intro1')} {scenario.domain} {t(lang, 's5.simulator.intro2')}
                </p>

                {/* Toggle */}
                <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl w-fit border border-stone-200">
                    <button
                        onClick={() => setIsManipulated(false)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${!isManipulated
                            ? 'bg-white text-emerald-700 shadow-sm border border-stone-200'
                            : 'text-stone-500 hover:text-stone-700'
                            }`}
                    >
                        {t(lang, 's5.simulator.honestBtn')}
                    </button>
                    <button
                        onClick={() => setIsManipulated(true)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isManipulated
                            ? 'bg-white text-red-700 shadow-sm border border-stone-200'
                            : 'text-stone-500 hover:text-stone-700'
                            }`}
                    >
                        {t(lang, 's5.simulator.manipulatedBtn')}
                    </button>
                </div>

                {/* Chart + Score */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 overflow-hidden">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                                {scenario.title}
                            </p>
                            {isManipulated && (
                                <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                                    {t(lang, 's5.simulator.manipulatedBadge')}
                                </span>
                            )}
                        </div>
                        <div className="w-full flex justify-center max-h-[380px]">
                            <BarChart state={chartState} width={560} height={340} />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">
                            {t(lang, 's5.simulator.integrityEval')}
                        </p>
                        <ScoreGauge evaluation={evaluation} />
                    </div>
                </div>

                {/* Executive archetype reaction cards */}
                <div className="space-y-3">
                    <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                        {t(lang, 's5.simulator.archetypeReactions.title')}
                    </p>
                    <p className="text-[13px] text-stone-500">
                        {isManipulated ? t(lang, 's5.simulator.archetypeReactions.descManipulated') : t(lang, 's5.simulator.archetypeReactions.descHonest')}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {simulation.reactions.map((reaction) => {
                            const config = ARCHETYPE_CONFIG[reaction.archetype];
                            const Icon = config.icon;
                            const trustColor = TRUST_COLORS[reaction.trustLevel];
                            const isExpanded = expandedArchetype === reaction.archetype;

                            return (
                                <div
                                    key={reaction.archetype}
                                    className="rounded-xl border p-4 cursor-pointer transition-all duration-200 hover:shadow-md"
                                    style={{ borderColor: config.borderColor, backgroundColor: config.bgColor }}
                                    onClick={() =>
                                        setExpandedArchetype(isExpanded ? null : reaction.archetype)
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                            style={{ backgroundColor: `${config.color}18` }}
                                        >
                                            <Icon size={18} style={{ color: config.color }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-semibold" style={{ color: config.color }}>
                                                {reaction.archetypeLabel}
                                            </div>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: trustColor }} />
                                                <span className="text-xs text-stone-500 capitalize">{reaction.trustLevel}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-stone-400 shrink-0">
                                            {isExpanded ? t(lang, 's5.simulator.archetypeReactions.hide') : t(lang, 's5.simulator.archetypeReactions.reveal')}
                                        </span>
                                    </div>

                                    {isExpanded && (
                                        <div className="mt-4 space-y-3 border-t pt-3" style={{ borderColor: config.borderColor }}>
                                            <p className="text-[13px] text-stone-700 leading-relaxed">
                                                "{reaction.reactionText}"
                                            </p>
                                            <div className="text-xs text-stone-500">
                                                <span className="font-medium">{t(lang, 's5.simulator.archetypeReactions.decisionTendency')}</span>{' '}
                                                {reaction.decisionTendency}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Decision outcome */}
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
                    <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                        {t(lang, 's5.simulator.outcomeTitle')}
                    </p>
                    <p className="text-[14px] text-stone-700 leading-relaxed">
                        {simulation.decisionOutcome}
                    </p>
                </div>

                {/* Manipulation details when manipulated */}
                {isManipulated && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                        <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-3">
                            {t(lang, 's5.simulator.manipulationsTitle')}
                        </p>
                        <ul className="space-y-2 text-[13px] text-red-800">
                            <li className="flex items-start gap-2">
                                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-red-500" />
                                {t(lang, 's5.simulator.manipulations.0')}
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-red-500" />
                                {t(lang, 's5.simulator.manipulations.1')}
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-red-500" />
                                {t(lang, 's5.simulator.manipulations.2')}
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-red-500" />
                                {t(lang, 's5.simulator.manipulations.3')}
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-red-500" />
                                {t(lang, 's5.simulator.manipulations.4')}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </LessonPage>
    );
}
