import { useState, useEffect, useMemo } from 'react';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import type { LangCode } from '../../../lib/i18n';
import LessonPage from '../../layout/LessonPage';
import BarChart from '../../charts/BarChart';
import LineChart from '../../charts/LineChart';
import AreaChart from '../../charts/AreaChart';
import ScatterChart from '../../charts/ScatterChart';
import PieChart from '../../charts/PieChart';
import ControlDock from '../../lab/ControlDock';
import ScoreGauge from '../../ui/ScoreGauge';
import ExecutivePanel from '../../ui/ExecutivePanel';
import ChartFrame from '../../ui/ChartFrame';
import { evaluateChartState, computeLinearRegression } from '../../../lib/scoring';
import { generateSimulation, parseTemplatesFromDB } from '../../../lib/simulation';
import { transformData } from '../../../lib/transforms';
import { DEFAULT_PARAMS } from '../../../types/chart';
import type { ChartParams, ChartState, Scenario, DataPoint, ChartType } from '../../../types/chart';
import type { VisibleGroups } from '../../lab/ControlDock';
import { FlaskConical, Activity, Layers, RotateCcw, ChevronUp, ChevronDown } from 'lucide-react';
import { SECTION_COLORS } from '../../../lib/design-tokens';

const sectionColor = SECTION_COLORS['03'].base;

export type LabMode = 'axis-scale' | 'data-transform' | 'visual-emphasis' | 'annotation-trend' | 'full' | 'signal-noise' | 'design-patterns';
type FullLabSection = 'lab' | 'signal-noise' | 'design-patterns';

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
    preferredChartTypes: 'line,bar,area',
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
        case 'signal-noise':
        case 'design-patterns':
            return undefined;
    }
}

function getModeIntro(mode: LabMode, lang: LangCode): string {
    switch (mode) {
        case 'axis-scale':
            return t(lang, 's3.labLesson.intro.axisScale');
        case 'data-transform':
            return t(lang, 's3.labLesson.intro.dataTransform');
        case 'visual-emphasis':
            return t(lang, 's3.labLesson.intro.visualEmphasis');
        case 'annotation-trend':
            return t(lang, 's3.labLesson.intro.annotationTrend');
        case 'full':
            return t(lang, 's3.labLesson.intro.full');
        case 'signal-noise':
        case 'design-patterns':
            return '';
    }
}

export default function LabLesson({ mode, crossRefs }: LabLessonProps) {
    const { lang } = useLang();
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
                            preferredChartTypes: row.preferred_chart_types || row.preferredChartTypes || 'line,bar',
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

    const activeScenarioObj = scenarios[activeScenarioIndex] ?? FALLBACK_SCENARIO;
    const activeScenario = useMemo(() => {
        if (activeScenarioObj.id === FALLBACK_SCENARIO.id) {
            return {
                ...activeScenarioObj,
                title: t(lang, 's3.labLesson.fallbackScenario.title'),
                description: t(lang, 's3.labLesson.fallbackScenario.description')
            };
        }
        // Ideally we would translate database scenarios here if doing dynamic DB translations
        return activeScenarioObj;
    }, [activeScenarioObj, lang]);

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
                preferredChartTypes: activeScenario.preferredChartTypes,
            },
        };
    }, [activeScenario, params, activeChartType]);

    const evaluation = useMemo(() => evaluateChartState(chartState), [chartState]);

    const simulation = useMemo(
        () => generateSimulation(chartState, evaluation, templates),
        [chartState, evaluation, templates]
    );

    const visibleGroups = getModeVisibleGroups(mode);
    const introText = getModeIntro(mode, lang);
    const [fullSection, setFullSection] = useState<FullLabSection>('lab');

    const FULL_SECTIONS: { id: FullLabSection; label: string; icon: typeof FlaskConical }[] = [
        { id: 'lab', label: 'Lab Controls', icon: FlaskConical },
        { id: 'signal-noise', label: 'Signal vs Noise', icon: Activity },
        { id: 'design-patterns', label: 'Design Patterns', icon: Layers },
    ];

    // ── Signal vs Noise — live lab identical to 3.1–3.4 ──────────────────────
    if (mode === 'signal-noise') {
        return (
            <LessonPage crossRefs={crossRefs}>
                <SignalNoiseLab templates={templates} />
            </LessonPage>
        );
    }

    // ── Design Patterns — live lab identical to 3.1–3.5 ─────────────────────
    if (mode === 'design-patterns') {
        return (
            <LessonPage crossRefs={crossRefs}>
                <DesignPatternsLab templates={templates} />
            </LessonPage>
        );
    }

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                {/* Full Lab top section switcher */}
                {mode === 'full' && (
                    <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 overflow-x-auto">
                        {FULL_SECTIONS.map(sec => {
                            const Icon = sec.icon;
                            const isActive = fullSection === sec.id;
                            return (
                                <button
                                    key={sec.id}
                                    onClick={() => setFullSection(sec.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${isActive ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'
                                        }`}
                                >
                                    <Icon size={13} style={isActive ? { color: sectionColor } : undefined} />
                                    {sec.label}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Signal vs Noise Section — full rich lab */}
                {mode === 'full' && fullSection === 'signal-noise' && (
                    <SignalNoiseLab templates={templates} />
                )}

                {/* Design Patterns Section — full rich lab */}
                {mode === 'full' && fullSection === 'design-patterns' && (
                    <DesignPatternsLab templates={templates} />
                )}

                {/* Lab Controls (always shown when not in another full section) */}
                {(mode !== 'full' || fullSection === 'lab') && (
                    <>
                        <p className="text-[15px] text-stone-600 leading-relaxed">{introText}</p>

                        {/* Scenario selector */}
                        {scenarios.length > 1 && (
                            <div className="space-y-2">
                                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{t(lang, 's3.labLesson.ui.datasetLabel')}</p>
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
                                            <svg className="w-4 h-4 text-amber-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 480 220"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <div>
                                                <span className="font-semibold">{t(lang, 's3.labLesson.ui.editorialNoteLabel')}</span>
                                                {params.highlightRationale === 'current_vs_past' && t(lang, 's3.labLesson.ui.noteCurrentVsPast')}
                                                {params.highlightRationale === 'market_outperformance' && t(lang, 's3.labLesson.ui.noteOutperformance')}
                                                {params.highlightRationale === 'custom_editorial' && t(lang, 's3.labLesson.ui.noteCustom')}
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
                                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">{t(lang, 's3.labLesson.ui.underlyingDataset')}</p>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-xs text-left text-stone-600">
                                                <thead className="text-stone-500 bg-stone-50 uppercase border-b border-stone-100">
                                                    <tr>
                                                        <th className="px-3 py-2 font-medium">{t(lang, 's3.labLesson.ui.colPeriod')}</th>
                                                        <th className="px-3 py-2 font-medium text-right">{t(lang, 's3.labLesson.ui.colValue')}</th>
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
                                                        <td className="px-3 py-2">{t(lang, 's3.labLesson.ui.totalPoints')}</td>
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
                                        {t(lang, 's3.labLesson.ui.integrityEvaluation')}
                                    </p>
                                    <ScoreGauge evaluation={evaluation} />
                                </div>
                                <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
                                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">
                                        {t(lang, 's3.labLesson.ui.executiveReactions')}
                                    </p>
                                    <ExecutivePanel simulation={simulation} />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </LessonPage>
    );
}



// ─── ControlGroup helpers for 3.5 and 3.6 (matches ControlDock ControlGroup style) ───
function SNControlGroup({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(true);
    return (
        <div className="border-b border-stone-100 last:border-b-0">
            <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-3 text-left">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{title}</span>
                {open ? <ChevronUp size={14} className="text-stone-400" /> : <ChevronDown size={14} className="text-stone-400" />}
            </button>
            {open && <div className="pb-4 space-y-4">{children}</div>}
        </div>
    );
}

function DPControlGroup({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(true);
    return (
        <div className="border-b border-stone-100 last:border-b-0">
            <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-3 text-left">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{title}</span>
                {open ? <ChevronUp size={14} className="text-stone-400" /> : <ChevronDown size={14} className="text-stone-400" />}
            </button>
            {open && <div className="pb-4 space-y-4">{children}</div>}
        </div>
    );
}

// ─── Lesson 3.5: Signal vs Noise — Live Lab ────────────────────────────────────
// Same layout as 3.1–3.4: chart left, ScoreGauge + ExecutivePanel right, controls below.

interface SNLabParams {
    smoothingWindow: number;   // 1=raw, 3, 7, 14
    showRaw: boolean;          // hide raw = penalty
    timeWindow: number;        // 100=full, 50=half, 25=cherry-pick
    confidenceLevel: 'none' | '90' | '95' | '99';
    trendline: 'none' | 'linear';
    sourceCited: boolean;
}

const SN_DEFAULT_PARAMS: SNLabParams = {
    smoothingWindow: 1,
    showRaw: true,
    timeWindow: 100,
    confidenceLevel: 'none',
    trendline: 'none',
    sourceCited: false,
};

// Build a synthetic ChartState from SNLabParams so we can reuse evaluateChartState
function buildSNChartState(p: SNLabParams): ChartState {
    // "hide raw + smooth aggressively" is penalised by sample / smoothing / window
    return {
        datasetId: 'signal-noise',
        chartType: 'line',
        data: FALLBACK_SCENARIO.baseData,
        metadata: {
            scenarioTitle: 'Daily User Engagements',
            domain: 'revenue',
            decisionTimeframe: 'month',
            dataSpansOrdersOfMagnitude: false,
            statisticallySignificantTrend: true,
            trendlineRSquared: 0.68,
            preferredChartTypes: 'line,area',
        },
        params: {
            ...DEFAULT_PARAMS,
            smoothingWindow: p.smoothingWindow,
            // hiding raw but applying smoothing is captured by samplePct reduction
            samplePct: p.showRaw ? 100 : Math.max(25, 100 - p.smoothingWindow * 6),
            totalDataSize: p.timeWindow,
            confidenceLevel: p.confidenceLevel,
            trendline: p.trendline,
            sourceCited: p.sourceCited,
            // misleading annotation if smoothed + no raw shown
            annotation: {
                enabled: p.smoothingWindow > 3 && !p.showRaw,
                text: 'Smooth upward trajectory',
                honest: false,
            },
        },
    };
}

function SignalNoiseLab({ templates }: { templates: ReturnType<typeof parseTemplatesFromDB> }) {
    const { lang: _lang } = useLang();
    const [params, setParams] = useState<SNLabParams>(SN_DEFAULT_PARAMS);
    const set = <K extends keyof SNLabParams>(k: K, v: SNLabParams[K]) =>
        setParams(prev => ({ ...prev, [k]: v }));
    const [chartTab, setChartTab] = useState<'signal' | 'noise' | 'window' | 'scatter'>('signal');
    const [noiseLevel, setNoiseLevel] = useState(50);

    const SN_CHART_TABS = [
        { id: 'signal' as const, label: 'Signal vs Noise' },
        { id: 'noise' as const, label: 'Noise Level' },
        { id: 'window' as const, label: 'Time Window' },
        { id: 'scatter' as const, label: 'Scatter + Trend' },
    ];

    const N = 80;
    const rawData = useMemo(() => {
        let seed = 123;
        const rng = () => { const x = Math.sin(seed++) * 10000; return x - Math.floor(x); };
        return Array.from({ length: N }, (_, i) => ({ i, y: 20 + i * 0.6 + (rng() * 40 - 20) }));
    }, []);

    const smoothedData = useMemo(() => {
        const w = params.smoothingWindow;
        return rawData.map((d, i) => {
            const slice = rawData.slice(Math.max(0, i - w + 1), i + 1);
            return { i: d.i, y: slice.reduce((s, p) => s + p.y, 0) / slice.length };
        });
    }, [rawData, params.smoothingWindow]);

    const noiseData = useMemo(() => {
        const base = Array.from({ length: 40 }, (_, i) => 30 + i * 1.5);
        let seed = 999;
        const rand = () => { const x = Math.sin(seed++) * 10000; return x - Math.floor(x); };
        return base.map(y => ({ signal: y, noisy: y + (rand() * 2 - 1) * noiseLevel * 0.5 }));
    }, [noiseLevel]);

    // Smoothed version of noisy data — reacts to Smoothing Window control
    const smoothedNoisyData = useMemo(() => {
        const w = params.smoothingWindow;
        return noiseData.map((d, i) => {
            const slice = noiseData.slice(Math.max(0, i - w + 1), i + 1);
            return { i, y: slice.reduce((s, p) => s + p.noisy, 0) / slice.length };
        });
    }, [noiseData, params.smoothingWindow]);

    const visibleStart = Math.round(N * (1 - params.timeWindow / 100));
    const visibleRaw = rawData.slice(visibleStart);
    const visibleSmoothed = smoothedData.slice(visibleStart);

    const W = 480, H = 220, PAD = { t: 16, l: 40, r: 20, b: 32 };
    const inner = { w: W - PAD.l - PAD.r, h: H - PAD.t - PAD.b };

    const allY = [...visibleRaw.map(d => d.y), ...visibleSmoothed.map(d => d.y)];
    const minY = Math.min(...allY) - 5, maxY = Math.max(...allY) + 5;
    const xS = (i: number) => PAD.l + ((i - visibleStart) / Math.max(1, visibleRaw.length - 1)) * inner.w;
    const yS = (v: number) => PAD.t + (1 - (v - minY) / (maxY - minY)) * inner.h;

    const rawPath = visibleRaw.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xS(d.i)} ${yS(d.y)}`).join(' ');
    const smoothPath = visibleSmoothed.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xS(d.i)} ${yS(d.y)}`).join(' ');

    const trendPts = visibleSmoothed.map((d, i) => ({ x: i, y: d.y }));
    const trend = useMemo(() => computeLinearRegression(trendPts), [trendPts]);
    const trendY1 = yS(trend.intercept);
    const trendY2 = yS(trend.slope * (visibleSmoothed.length - 1) + trend.intercept);

    const noiseEst = useMemo(() => {
        const diffs = visibleRaw.map((d, i) => Math.abs(d.y - (visibleSmoothed[i]?.y ?? d.y)));
        return diffs.reduce((s, v) => s + v, 0) / Math.max(1, diffs.length);
    }, [visibleRaw, visibleSmoothed]);
    const ciMult = params.confidenceLevel === '99' ? 2.58 : params.confidenceLevel === '95' ? 1.96 : 1.64;
    const ciHalf = ciMult * noiseEst;

    const NW = 480, NH = 172, NP = { t: 16, l: 40, r: 20, b: 32 };
    const nX = (i: number) => NP.l + (i / Math.max(1, noiseData.length - 1)) * (NW - NP.l - NP.r);
    const nYMin = Math.min(...noiseData.flatMap(d => [d.signal, d.noisy])) - 5;
    const nYMax = Math.max(...noiseData.flatMap(d => [d.signal, d.noisy])) + 5;
    const nY = (v: number) => NP.t + (1 - (v - nYMin) / (nYMax - nYMin)) * (NH - NP.t - NP.b);
    const noisyPath = noiseData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${nX(i)} ${nY(d.noisy)}`).join(' ');
    const signalPath = noiseData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${nX(i)} ${nY(d.signal)}`).join(' ');

    const rawMin = Math.min(...rawData.map(x => x.y)) - 5;
    const rawMax = Math.max(...rawData.map(x => x.y)) + 5;
    const fxS = (i: number) => PAD.l + (i / (N - 1)) * inner.w;
    const fyS = (v: number) => PAD.t + (1 - (v - rawMin) / (rawMax - rawMin)) * inner.h;
    const fullPath = rawData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${fxS(d.i)} ${fyS(d.y)}`).join(' ');

    const scatterMinY = Math.min(...rawData.map(d => d.y)) - 5;
    const scatterMaxY = Math.max(...rawData.map(d => d.y)) + 5;
    const scatterX = (i: number) => PAD.l + (i / (N - 1)) * inner.w;
    const scatterY = (v: number) => PAD.t + (1 - (v - scatterMinY) / (scatterMaxY - scatterMinY)) * inner.h;
    const scatterTrend = useMemo(() => computeLinearRegression(rawData.map(d => ({ x: d.i, y: d.y }))), [rawData]);

    const chartState = useMemo(() => buildSNChartState(params), [params]);
    const evaluation = useMemo(() => evaluateChartState(chartState), [chartState]);
    const simulation = useMemo(() => generateSimulation(chartState, evaluation, templates), [chartState, evaluation, templates]);

    const GRIDYS = [0, 25, 50, 75, 100];

    return (
        <div className="space-y-6">
            <p className="text-[15px] text-stone-600 leading-relaxed">
                A chart's signal-to-noise ratio is a design choice, not a data fact. Smoothing, cherry-picked windows, and hidden raw data all reshape what the viewer concludes — without changing the underlying numbers. Switch chart tabs to explore different manipulation dimensions.
            </p>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* LEFT */}
                <div className="space-y-4">
                    {/* Chart card with tab switcher in header — matches 3.4 */}
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 overflow-hidden">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                                {chartTab === 'signal' ? 'Daily User Engagements — Signal vs Noise' :
                                    chartTab === 'noise' ? 'True Signal vs Noisy Observation' :
                                        chartTab === 'window' ? 'Full History vs Cherry-picked Window' :
                                            'Individual Data Points — Scatter + Trend'}
                            </p>
                            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200">
                                {SN_CHART_TABS.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setChartTab(tab.id)}
                                        className={`px-3 py-1 rounded text-xs font-semibold capitalize transition-all ${chartTab === tab.id ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab 1: Signal vs Noise */}
                        {chartTab === 'signal' && (
                            <svg viewBox={`0 0 ${W} ${H}`} className="w-full block overflow-visible">
                                {GRIDYS.map(pct => {
                                    const v = minY + (pct / 100) * (maxY - minY);
                                    const y = yS(v);
                                    return (
                                        <g key={pct}>
                                            <line x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />
                                            {pct % 50 === 0 && <text x={PAD.l - 6} y={y} fill="#a8a29e" fontSize={9} textAnchor="end" dominantBaseline="middle">{Math.round(v)}</text>}
                                        </g>
                                    );
                                })}
                                {params.confidenceLevel !== 'none' && (
                                    <path d={[...visibleSmoothed.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xS(d.i)} ${yS(d.y - ciHalf)}`), ...visibleSmoothed.slice().reverse().map(d => `L ${xS(d.i)} ${yS(d.y + ciHalf)}`), 'Z'].join(' ')} fill={`${sectionColor}18`} />
                                )}
                                {params.showRaw && (
                                    <path d={rawPath} fill="none" stroke="#3b82f6" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: params.smoothingWindow > 1 ? 0.25 : 0.85, transition: 'opacity 0.5s' }} />
                                )}
                                {params.smoothingWindow > 1 && (
                                    <path d={smoothPath} fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" style={{ stroke: sectionColor, transition: 'opacity 0.5s' }} />
                                )}
                                {params.showRaw && params.smoothingWindow === 1 && (
                                    <path d={rawPath} fill="none" stroke="#3b82f6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                )}
                                {params.trendline === 'linear' && (
                                    <>
                                        <line x1={xS(visibleStart)} y1={trendY1} x2={xS(visibleStart + visibleSmoothed.length - 1)} y2={trendY2} stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 3" />
                                        <text x={xS(visibleStart + visibleSmoothed.length - 1) - 4} y={trendY2 - 6} fill="#d97706" fontSize={9} fontWeight="bold" textAnchor="end">R²={trend.rSquared.toFixed(2)}</text>
                                    </>
                                )}
                                {params.showRaw && params.smoothingWindow > 1 && (
                                    <g>
                                        <line x1={W - 90} x2={W - 76} y1={PAD.t + 6} y2={PAD.t + 6} stroke="#3b82f6" strokeWidth={1.5} />
                                        <text x={W - 73} y={PAD.t + 9} fill="#3b82f6" fontSize={8}>Raw</text>
                                        <line x1={W - 90} x2={W - 76} y1={PAD.t + 18} y2={PAD.t + 18} stroke={sectionColor} strokeWidth={3} />
                                        <text x={W - 73} y={PAD.t + 21} fill={sectionColor} fontSize={8}>Smoothed</text>
                                    </g>
                                )}
                            </svg>
                        )}

                        {/* Tab 2: Noise Level */}
                        {chartTab === 'noise' && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-medium text-stone-600 whitespace-nowrap">Noise Level</span>
                                    <input type="range" min={5} max={100} value={noiseLevel} onChange={e => setNoiseLevel(Number(e.target.value))} className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, #059669 ${noiseLevel}%, #e7e5e4 ${noiseLevel}%)` }} />
                                    <span className="text-xs font-bold text-stone-800 tabular-nums">{noiseLevel}%</span>
                                </div>
                                <svg viewBox={`0 0 ${NW} ${NH}`} className="w-full block overflow-visible">
                                    <line x1={NP.l} x2={NW - NP.r} y1={NH - NP.b} y2={NH - NP.b} stroke="#e7e5e4" strokeWidth={1} />
                                    <line x1={NP.l} x2={NP.l} y1={NP.t} y2={NH - NP.b} stroke="#e7e5e4" strokeWidth={1} />
                                    {/* Raw noisy line — dimmed if smoothing active */}
                                    {params.showRaw && (
                                        <path d={noisyPath} fill="none" stroke="#3b82f6" strokeWidth={1.5} opacity={params.smoothingWindow > 1 ? 0.25 : 0.7} strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'opacity 0.4s' }} />
                                    )}
                                    {/* Smoothed noisy line — shown when smoothing > 1 */}
                                    {params.smoothingWindow > 1 && (
                                        <path d={smoothedNoisyData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${nX(i)} ${nY(d.y)}`).join(' ')} fill="none" stroke={sectionColor} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                                    )}
                                    <path d={signalPath} fill="none" stroke="#f97316" strokeWidth={2} strokeDasharray="6 3" strokeLinecap="round" strokeLinejoin="round" />
                                    {/* Legend */}
                                    {params.showRaw && <>
                                        <line x1={NW - 118} x2={NW - 104} y1={NP.t + 6} y2={NP.t + 6} stroke="#3b82f6" strokeWidth={1.5} />
                                        <text x={NW - 101} y={NP.t + 9} fill="#3b82f6" fontSize={8}>Observed (noisy)</text>
                                    </>}
                                    {params.smoothingWindow > 1 && <>
                                        <line x1={NW - 118} x2={NW - 104} y1={NP.t + 20} y2={NP.t + 20} stroke={sectionColor} strokeWidth={2.5} />
                                        <text x={NW - 101} y={NP.t + 23} fill={sectionColor} fontSize={8}>Smoothed ({params.smoothingWindow}p)</text>
                                    </>}
                                    <line x1={NW - 118} x2={NW - 104} y1={NP.t + 34} y2={NP.t + 34} stroke="#f97316" strokeWidth={2} strokeDasharray="4 2" />
                                    <text x={NW - 101} y={NP.t + 37} fill="#f97316" fontSize={8}>True Signal</text>
                                    {params.sourceCited && (
                                        <text x={NW - NP.r} y={NH - 2} fill="#a8a29e" fontSize={8} textAnchor="end">Source: Analytics Platform v3 © 2024</text>
                                    )}
                                </svg>
                                <p className="text-xs text-stone-400">
                                    {noiseLevel < 30 ? 'Low noise — true signal is clearly visible.' : noiseLevel < 70 ? `Medium noise — ${params.smoothingWindow > 1 ? `${params.smoothingWindow}-period smoothing is helping recover the signal.` : 'signal recoverable with smoothing (try the Smoothing control).'}` : `High noise — ${params.smoothingWindow > 1 ? 'smoothing helps but cannot fully recover the buried signal.' : 'true trend almost completely buried. Try enabling smoothing.'}`}
                                </p>
                            </div>
                        )}

                        {/* Tab 3: Time Window */}
                        {chartTab === 'window' && (
                            <div className="space-y-2">
                                <svg viewBox={`0 0 ${W} ${H}`} className="w-full block overflow-visible">
                                    {[0, 25, 50, 75, 100].map(pct => (
                                        <line key={pct} x1={PAD.l} x2={W - PAD.r} y1={fyS(rawMin + (pct / 100) * (rawMax - rawMin))} y2={fyS(rawMin + (pct / 100) * (rawMax - rawMin))} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />
                                    ))}
                                    {params.timeWindow < 100 && (
                                        <rect x={PAD.l} y={PAD.t} width={fxS(visibleStart) - PAD.l} height={inner.h} fill="#f5f5f4" opacity={0.75} />
                                    )}
                                    <path d={fullPath} fill="none" stroke="#94a3b8" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.35} />
                                    <path d={rawData.slice(visibleStart).map((d, i) => `${i === 0 ? 'M' : 'L'} ${fxS(d.i)} ${fyS(d.y)}`).join(' ')} fill="none" stroke={sectionColor} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                                    {params.timeWindow < 100 && (
                                        <>
                                            <line x1={fxS(visibleStart)} y1={PAD.t} x2={fxS(visibleStart)} y2={PAD.t + inner.h} stroke={sectionColor} strokeWidth={1} strokeDasharray="4 2" />
                                            <text x={fxS(visibleStart) + 4} y={PAD.t + 11} fill={sectionColor} fontSize={9} fontWeight="bold">Selected →</text>
                                        </>
                                    )}
                                </svg>
                                <p className="text-xs text-stone-400">
                                    {params.timeWindow === 100 ? 'Full history shown — no cherry-picking.' : params.timeWindow === 50 ? 'Only 50% of history. Growth looks steeper — flat early period hidden.' : 'Only 25% shown. Appears like explosive growth but hides 75% of context.'}
                                </p>
                            </div>
                        )}

                        {/* Tab 4: Scatter + Trend */}
                        {chartTab === 'scatter' && (
                            <svg viewBox={`0 0 ${W} ${H}`} className="w-full block overflow-visible">
                                {[0, 25, 50, 75, 100].map(pct => (
                                    <line key={pct} x1={PAD.l} x2={W - PAD.r} y1={scatterY(scatterMinY + (pct / 100) * (scatterMaxY - scatterMinY))} y2={scatterY(scatterMinY + (pct / 100) * (scatterMaxY - scatterMinY))} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />
                                ))}
                                {params.confidenceLevel !== 'none' && (
                                    <path
                                        d={[...rawData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scatterX(d.i)} ${scatterY(scatterTrend.slope * d.i + scatterTrend.intercept - ciHalf)}`), ...rawData.slice().reverse().map(d => `L ${scatterX(d.i)} ${scatterY(scatterTrend.slope * d.i + scatterTrend.intercept + ciHalf)}`), 'Z'].join(' ')}
                                        fill={`${sectionColor}18`}
                                    />
                                )}
                                {rawData.map(d => (
                                    <circle key={d.i} cx={scatterX(d.i)} cy={scatterY(d.y)} r={2.5} fill="#3b82f6" opacity={0.45} />
                                ))}
                                {params.trendline === 'linear' && (
                                    <>
                                        <line x1={scatterX(0)} y1={scatterY(scatterTrend.intercept)} x2={scatterX(N - 1)} y2={scatterY(scatterTrend.slope * (N - 1) + scatterTrend.intercept)} stroke="#f59e0b" strokeWidth={2.5} strokeLinecap="round" />
                                        <text x={scatterX(N - 1) - 4} y={scatterY(scatterTrend.slope * (N - 1) + scatterTrend.intercept) - 6} fill="#d97706" fontSize={9} fontWeight="bold" textAnchor="end">R²={scatterTrend.rSquared.toFixed(2)}</text>
                                    </>
                                )}
                                {params.sourceCited && (
                                    <text x={W - PAD.r} y={H - 4} fill="#a8a29e" fontSize={8} textAnchor="end">Source: Analytics Platform v3 © 2024</text>
                                )}
                            </svg>
                        )}
                    </div>

                    {/* Manipulation Controls — tab-aware */}
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100 bg-stone-50">
                            <h3 className="text-sm font-semibold text-stone-800">Manipulation Controls</h3>
                            <button onClick={() => { setParams(SN_DEFAULT_PARAMS); setNoiseLevel(50); }} className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors">
                                <RotateCcw size={12} />
                                Reset All
                            </button>
                        </div>
                        <div className="px-4 divide-y divide-stone-100">

                            {chartTab === 'signal' && (
                                <>
                                    <SNControlGroup title="Signal &amp; Smoothing">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-stone-600">Smoothing Window</span>
                                                <span className="text-xs font-bold text-stone-800">{params.smoothingWindow === 1 ? 'Raw (none)' : `${params.smoothingWindow}-period avg`}</span>
                                            </div>
                                            <div className="flex gap-1.5">
                                                {[1, 3, 7, 14].map(w => (
                                                    <button key={w} onClick={() => set('smoothingWindow', w)}
                                                        className={`flex-1 py-1.5 rounded text-xs font-semibold transition-colors border ${params.smoothingWindow === w ? 'bg-brand text-white border-brand' : 'bg-white text-stone-600 border-stone-200 hover:border-brand/40'}`}>
                                                        {w === 1 ? 'Raw' : `${w}p`}
                                                    </button>
                                                ))}
                                            </div>
                                            <p className="text-xs text-stone-400">Higher window = smoother line, more variance hidden</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-xs font-medium text-stone-600">Show Raw Data</span>
                                                {!params.showRaw && params.smoothingWindow > 1 && <p className="text-xs text-amber-600 mt-0.5">Hiding raw when smoothed is high-risk omission</p>}
                                            </div>
                                            <button onClick={() => set('showRaw', !params.showRaw)}
                                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.showRaw ? 'bg-brand' : 'bg-stone-300'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.showRaw ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                    </SNControlGroup>
                                    <SNControlGroup title="Annotation &amp; Trend">
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-medium text-stone-600">Trendline</span>
                                            <select value={params.trendline} onChange={e => set('trendline', e.target.value as SNLabParams['trendline'])}
                                                className="w-full text-xs border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand">
                                                <option value="none">None</option>
                                                <option value="linear">Linear Trendline (with R²)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-medium text-stone-600">Confidence Interval</span>
                                            <select value={params.confidenceLevel} onChange={e => set('confidenceLevel', e.target.value as SNLabParams['confidenceLevel'])}
                                                className="w-full text-xs border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand">
                                                <option value="none">None</option>
                                                <option value="90">90% Confidence</option>
                                                <option value="95">95% Confidence</option>
                                                <option value="99">99% Confidence</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-stone-600">Cite Data Source</span>
                                            <button onClick={() => set('sourceCited', !params.sourceCited)}
                                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.sourceCited ? 'bg-brand' : 'bg-stone-300'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.sourceCited ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                    </SNControlGroup>
                                    <SNControlGroup title="Time Window">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-stone-600">Data Range Shown</span>
                                                <span className="text-xs font-bold text-stone-800">{params.timeWindow === 100 ? 'Full history' : params.timeWindow === 50 ? 'Last 50%' : 'Cherry-picked (25%)'}</span>
                                            </div>
                                            <div className="flex gap-1.5">
                                                {([100, 50, 25] as const).map(w => (
                                                    <button key={w} onClick={() => set('timeWindow', w)}
                                                        className={`flex-1 py-1.5 rounded text-xs font-semibold transition-colors border ${params.timeWindow === w ? 'bg-brand text-white border-brand' : 'bg-white text-stone-600 border-stone-200 hover:border-brand/40'}`}>
                                                        {w === 100 ? 'Full' : w === 50 ? '50%' : '25%'}
                                                    </button>
                                                ))}
                                            </div>
                                            {params.timeWindow < 100 && <p className="text-xs text-amber-600">Cherry-picking window hides context and inflates trend</p>}
                                        </div>
                                    </SNControlGroup>
                                </>
                            )}

                            {chartTab === 'noise' && (
                                <>
                                    <SNControlGroup title="Noise Amount">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-stone-600">Noise Level</span>
                                                <span className="text-xs font-bold text-stone-800 tabular-nums">{noiseLevel}%</span>
                                            </div>
                                            <input type="range" min={5} max={100} value={noiseLevel} onChange={e => setNoiseLevel(Number(e.target.value))}
                                                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                                                style={{ background: `linear-gradient(to right, #059669 ${noiseLevel}%, #e7e5e4 ${noiseLevel}%)` }}
                                            />
                                            <p className="text-xs text-stone-400">{noiseLevel < 30 ? 'Low — true signal clearly visible' : noiseLevel < 70 ? 'Medium — smoothing helps recover signal' : 'High — signal nearly completely buried'}</p>
                                        </div>
                                    </SNControlGroup>
                                    <SNControlGroup title="Smoothing">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-stone-600">Smoothing Window</span>
                                                <span className="text-xs font-bold text-stone-800">{params.smoothingWindow === 1 ? 'Off' : `${params.smoothingWindow}-period avg`}</span>
                                            </div>
                                            <div className="flex gap-1.5">
                                                {[1, 3, 7, 14].map(w => (
                                                    <button key={w} onClick={() => set('smoothingWindow', w)}
                                                        className={`flex-1 py-1.5 rounded text-xs font-semibold transition-colors border ${params.smoothingWindow === w ? 'bg-brand text-white border-brand' : 'bg-white text-stone-600 border-stone-200 hover:border-brand/40'}`}>
                                                        {w === 1 ? 'Off' : `${w}p`}
                                                    </button>
                                                ))}
                                            </div>
                                            <p className="text-xs text-stone-400">Applies to the observed (noisy) line — green smoothed line appears on chart</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-xs font-medium text-stone-600">Show Raw Observed</span>
                                                {!params.showRaw && <p className="text-xs text-amber-600 mt-0.5">Hiding raw conceals the noise level</p>}
                                            </div>
                                            <button onClick={() => set('showRaw', !params.showRaw)}
                                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.showRaw ? 'bg-brand' : 'bg-stone-300'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.showRaw ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                    </SNControlGroup>
                                    <SNControlGroup title="Transparency">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-stone-600">Cite Data Source</span>
                                            <button onClick={() => set('sourceCited', !params.sourceCited)}
                                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.sourceCited ? 'bg-brand' : 'bg-stone-300'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.sourceCited ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                    </SNControlGroup>
                                </>
                            )}

                            {chartTab === 'window' && (
                                <>
                                    <SNControlGroup title="Time Window">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-stone-600">Data Range Shown</span>
                                                <span className="text-xs font-bold text-stone-800">{params.timeWindow === 100 ? 'Full history' : params.timeWindow === 50 ? 'Last 50%' : 'Cherry-picked (25%)'}</span>
                                            </div>
                                            <div className="flex gap-1.5">
                                                {([100, 50, 25] as const).map(w => (
                                                    <button key={w} onClick={() => set('timeWindow', w)}
                                                        className={`flex-1 py-1.5 rounded text-xs font-semibold transition-colors border ${params.timeWindow === w ? 'bg-brand text-white border-brand' : 'bg-white text-stone-600 border-stone-200 hover:border-brand/40'}`}>
                                                        {w === 100 ? 'Full' : w === 50 ? '50%' : '25%'}
                                                    </button>
                                                ))}
                                            </div>
                                            {params.timeWindow < 100 && <p className="text-xs text-amber-600">Cherry-picking window hides context — highlighted region shows selected data only</p>}
                                        </div>
                                    </SNControlGroup>
                                    <SNControlGroup title="Smoothing">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-stone-600">Smoothing Window</span>
                                                <span className="text-xs font-bold text-stone-800">{params.smoothingWindow === 1 ? 'Raw (none)' : `${params.smoothingWindow}-period avg`}</span>
                                            </div>
                                            <div className="flex gap-1.5">
                                                {[1, 3, 7, 14].map(w => (
                                                    <button key={w} onClick={() => set('smoothingWindow', w)}
                                                        className={`flex-1 py-1.5 rounded text-xs font-semibold transition-colors border ${params.smoothingWindow === w ? 'bg-brand text-white border-brand' : 'bg-white text-stone-600 border-stone-200 hover:border-brand/40'}`}>
                                                        {w === 1 ? 'Raw' : `${w}p`}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </SNControlGroup>
                                    <SNControlGroup title="Transparency">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-stone-600">Cite Data Source</span>
                                            <button onClick={() => set('sourceCited', !params.sourceCited)}
                                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.sourceCited ? 'bg-brand' : 'bg-stone-300'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.sourceCited ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                    </SNControlGroup>
                                </>
                            )}

                            {chartTab === 'scatter' && (
                                <>
                                    <SNControlGroup title="Trendline &amp; Fit">
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-medium text-stone-600">Trendline</span>
                                            <select value={params.trendline} onChange={e => set('trendline', e.target.value as SNLabParams['trendline'])}
                                                className="w-full text-xs border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand">
                                                <option value="none">None — show scatter only</option>
                                                <option value="linear">Linear Trendline (with R²)</option>
                                            </select>
                                            {params.trendline !== 'none' && <p className="text-xs text-stone-400">R² shown on chart — low R² means the trend explains little variance</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-medium text-stone-600">Confidence Interval</span>
                                            <select value={params.confidenceLevel} onChange={e => set('confidenceLevel', e.target.value as SNLabParams['confidenceLevel'])}
                                                className="w-full text-xs border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand">
                                                <option value="none">None</option>
                                                <option value="90">90% Confidence Band</option>
                                                <option value="95">95% Confidence Band</option>
                                                <option value="99">99% Confidence Band</option>
                                            </select>
                                            {params.confidenceLevel !== 'none' && <p className="text-xs text-stone-400">Wide band = high uncertainty. Narrow CI can give false sense of precision.</p>}
                                        </div>
                                    </SNControlGroup>
                                    <SNControlGroup title="Transparency">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-stone-600">Cite Data Source</span>
                                            <button onClick={() => set('sourceCited', !params.sourceCited)}
                                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.sourceCited ? 'bg-brand' : 'bg-stone-300'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.sourceCited ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                    </SNControlGroup>
                                </>
                            )}

                        </div>
                    </div>
                </div>

                {/* RIGHT: Integrity Evaluation + Executive Reactions */}
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Integrity Evaluation</p>
                        <ScoreGauge evaluation={evaluation} />
                    </div>
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Executive Reactions</p>
                        <ExecutivePanel simulation={simulation} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FullLabSignalNoise({ lang }: { lang: LangCode }) {
    const [smoothed, setSmoothed] = useState(false);
    const [noiseLevel, setNoiseLevel] = useState(50);

    const scatterData = useMemo(() => {
        let seed = 123;
        const random = () => { const x = Math.sin(seed++) * 10000; return x - Math.floor(x); };
        return Array.from({ length: 80 }).map((_, i) => ({ x: i, y: 40 + (i * 0.4) + (random() * 40 - 20) }));
    }, []);

    const noiseData = useMemo(() => {
        const base = Array.from({ length: 40 }, (_, i) => 30 + i * 1.5);
        let seed = 999;
        const rand = () => { const x = Math.sin(seed++) * 10000; return x - Math.floor(x); };
        return base.map(y => ({ signal: y, noisy: y + (rand() * 2 - 1) * noiseLevel * 0.5 }));
    }, [noiseLevel]);

    const sw = 500, sh = 250, sp = { t: 20, l: 40, r: 20, b: 30 };
    const ssX = (v: number) => sp.l + (v / 79) * (sw - sp.l - sp.r);
    const ssY = (v: number) => sp.t + (1 - v / 100) * (sh - sp.t - sp.b);
    const scatterPath = scatterData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${ssX(d.x)} ${ssY(d.y)}`).join(' ');
    const tY1 = ssY(40), tY2 = ssY(40 + 79 * 0.4);

    const nw = 500, nh = 200, np = { t: 20, l: 40, r: 20, b: 30 };
    const nX = (i: number) => np.l + (i / (noiseData.length - 1)) * (nw - np.l - np.r);
    const nY = (v: number) => { const mn = 0, mx = 90 + noiseLevel * 0.5; return np.t + (1 - (v - mn) / (mx - mn)) * (nh - np.t - np.b); };
    const noisyPath = noiseData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${nX(i)} ${nY(d.noisy)}`).join(' ');
    const signalPath = noiseData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${nX(i)} ${nY(d.signal)}`).join(' ');

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-stone-200">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: sectionColor }}>
                    <Activity size={16} className="text-white" />
                </div>
                <div>
                    <h3 className="text-[15px] font-bold text-stone-900">Signal vs Noise</h3>
                    <p className="text-[12px] text-stone-500">Distinguishing true trends from random noise — and how smoothing can fabricate signals</p>
                </div>
            </div>

            {/* Demo 1: Smoothing */}
            <div className="space-y-3">
                <div className="flex justify-between items-end">
                    <div>
                        <h4 className="text-[14px] font-bold text-stone-800">{t(lang, 's3.signalVsNoise.demo.title')}</h4>
                        <p className="text-[12px] text-stone-500">{t(lang, 's3.signalVsNoise.demo.desc')}</p>
                    </div>
                    <button
                        onClick={() => setSmoothed(!smoothed)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${smoothed ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 border border-stone-200 hover:shadow-md'
                            }`}
                    >
                        {smoothed ? t(lang, 's3.signalVsNoise.demo.btnRemove') : t(lang, 's3.signalVsNoise.demo.btnApply')}
                    </button>
                </div>
                <ChartFrame
                    label={t(lang, 's3.signalVsNoise.demo.chartLabel')}
                    note={smoothed ? t(lang, 's3.signalVsNoise.demo.noteSmoothed') : t(lang, 's3.signalVsNoise.demo.noteRaw')}
                >
                    <svg viewBox={`0 0 ${sw} ${sh}`} className="w-full block overflow-visible">
                        {[0, 25, 50, 75, 100].map(v => (
                            <g key={v}>
                                <line x1={sp.l} x2={sw - sp.r} y1={ssY(v)} y2={ssY(v)} stroke="#e7e5e4" strokeWidth={1} strokeDasharray={v === 0 ? 'none' : '2 2'} />
                                <text x={sp.l - 8} y={ssY(v)} fill="#a8a29e" fontSize={9} textAnchor="end" dominantBaseline="middle">{v}</text>
                            </g>
                        ))}
                        <path d={scatterPath} fill="none" stroke="#3b82f6" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: smoothed ? 0.15 : 0.85, transition: 'opacity 0.6s' }} />
                        <line x1={ssX(0)} y1={tY1} x2={ssX(79)} y2={tY2} stroke="#059669" strokeWidth={4} strokeLinecap="round" style={{ opacity: smoothed ? 1 : 0, transition: 'opacity 0.6s' }} />
                        <text x={ssX(79) + 6} y={tY2} fill="#059669" fontSize={10} fontWeight="bold" dominantBaseline="middle" style={{ opacity: smoothed ? 1 : 0, transition: 'opacity 0.6s' }}>Signal ↑</text>
                    </svg>
                </ChartFrame>
            </div>

            {/* Demo 2: Noise Level */}
            <div className="space-y-3">
                <div>
                    <h4 className="text-[14px] font-bold text-stone-800">{t(lang, 's3.signalVsNoise.noiseDemo.title')}</h4>
                    <p className="text-[12px] text-stone-500">{t(lang, 's3.signalVsNoise.noiseDemo.desc')}</p>
                </div>
                <ChartFrame
                    label={t(lang, 's3.signalVsNoise.noiseDemo.chartLabel')}
                    note={noiseLevel < 30 ? t(lang, 's3.signalVsNoise.noiseDemo.noteLow') : noiseLevel < 70 ? t(lang, 's3.signalVsNoise.noiseDemo.noteMed') : t(lang, 's3.signalVsNoise.noiseDemo.noteHigh')}
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 px-1">
                            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide whitespace-nowrap">{t(lang, 's3.signalVsNoise.noiseDemo.sliderLabel')}</span>
                            <input type="range" min={5} max={100} value={noiseLevel} onChange={e => setNoiseLevel(Number(e.target.value))} className="flex-1 h-2 rounded-lg cursor-pointer accent-stone-800" />
                            <span className="text-[11px] font-bold text-stone-700 w-8 text-right">{noiseLevel}%</span>
                        </div>
                        <svg viewBox={`0 0 ${nw} ${nh}`} className="w-full block overflow-visible">
                            <line x1={np.l} x2={nw - np.r} y1={nh - np.b} y2={nh - np.b} stroke="#e7e5e4" strokeWidth={1} />
                            <line x1={np.l} x2={np.l} y1={np.t} y2={nh - np.b} stroke="#e7e5e4" strokeWidth={1} />
                            <path d={noisyPath} fill="none" stroke="#3b82f6" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.6} />
                            <path d={signalPath} fill="none" stroke="#f97316" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 3" />
                            <line x1={nw - 130} x2={nw - 115} y1={np.t + 6} y2={np.t + 6} stroke="#3b82f6" strokeWidth={1.5} />
                            <text x={nw - 112} y={np.t + 9} fill="#3b82f6" fontSize={9} fontWeight="bold">{t(lang, 's3.signalVsNoise.noiseDemo.legendNoisy')}</text>
                            <line x1={nw - 130} x2={nw - 115} y1={np.t + 20} y2={np.t + 20} stroke="#f97316" strokeWidth={2.5} strokeDasharray="4 2" />
                            <text x={nw - 112} y={np.t + 23} fill="#f97316" fontSize={9} fontWeight="bold">{t(lang, 's3.signalVsNoise.noiseDemo.legendSignal')}</text>
                        </svg>
                    </div>
                </ChartFrame>
            </div>

            {/* Key rule callout */}
            <div className="rounded-xl p-4 border flex items-start gap-3" style={{ backgroundColor: `${sectionColor}08`, borderColor: `${sectionColor}20` }}>
                <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: sectionColor }}>
                    <span className="text-white text-xs font-bold">!</span>
                </div>
                <p className="text-[13px] text-stone-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's3.signalVsNoise.tip.rule') }} />
            </div>
        </div>
    );
}


// ─── Lesson 3.6: Design Patterns — Live Lab ────────────────────────────────────
// Same layout as 3.1–3.5: chart left, ScoreGauge + ExecutivePanel right, controls below.

interface DPLabParams {
    sortOrder: 'value_desc' | 'value_asc' | 'alpha' | 'original' | 'custom';
    highlightedIndices: number[];
    dimOpacity: number;
    labelMode: 'none' | 'selective' | 'all';
    annotation: { enabled: boolean; honest: boolean };
    dataTableEnabled: boolean;
    sourceCited: boolean;
    highlightRationale: string;
}

const DP_DEFAULT_PARAMS: DPLabParams = {
    sortOrder: 'original',
    highlightedIndices: [],
    dimOpacity: 1,
    labelMode: 'none',
    annotation: { enabled: false, honest: true },
    dataTableEnabled: false,
    sourceCited: false,
    highlightRationale: 'none',
};

// Dataset: regional sales comparison
const DP_DATASET = [
    { label: 'APAC', value: 87, color: '#3b82f6' },
    { label: 'NA', value: 134, color: '#3b82f6' },
    { label: 'EMEA', value: 62, color: '#3b82f6' },
    { label: 'LATAM', value: 45, color: '#3b82f6' },
    { label: 'MEA', value: 38, color: '#3b82f6' },
];

function buildDPChartState(p: DPLabParams): ChartState {
    return {
        datasetId: 'design-patterns',
        chartType: 'bar',
        data: DP_DATASET.map(d => ({ label: d.label, value: d.value })),
        metadata: {
            scenarioTitle: 'Regional Sales Performance',
            domain: 'revenue',
            decisionTimeframe: 'quarter',
            dataSpansOrdersOfMagnitude: false,
            statisticallySignificantTrend: false,
            trendlineRSquared: 0,
            preferredChartTypes: 'bar',
        },
        params: {
            ...DEFAULT_PARAMS,
            sortOrder: p.sortOrder,
            colorEmphasis: {
                highlightedIndices: p.highlightedIndices,
                dimOpacity: p.dimOpacity,
            },
            labelMode: p.labelMode,
            annotation: { ...p.annotation, text: '' },
            dataTableEnabled: p.dataTableEnabled,
            sourceCited: p.sourceCited,
            highlightRationale: p.highlightRationale,
        },
    };
}

function DesignPatternsLab({ templates }: { templates: ReturnType<typeof parseTemplatesFromDB> }) {
    const { lang: _lang } = useLang();
    const [params, setParams] = useState<DPLabParams>(DP_DEFAULT_PARAMS);
    const setP = <K extends keyof DPLabParams>(k: K, v: DPLabParams[K]) =>
        setParams(prev => ({ ...prev, [k]: v }));
    const [chartTab, setChartTab] = useState<'bar' | 'mean-median' | 'groups' | 'ranked'>('bar');
    const [outlierVal, setOutlierVal] = useState(150);

    const DP_CHART_TABS = [
        { id: 'bar' as const, label: 'Bar Comparison' },
        { id: 'mean-median' as const, label: 'Mean vs Median' },
        { id: 'groups' as const, label: 'Group Spacing' },
        { id: 'ranked' as const, label: 'Ranked Highlight' },
    ];

    const highlightedSet = useMemo(() => new Set(params.highlightedIndices), [params.highlightedIndices]);

    const sortedData = useMemo(() => {
        const data = [...DP_DATASET];
        if (params.sortOrder === 'value_desc') data.sort((a, b) => b.value - a.value);
        else if (params.sortOrder === 'value_asc') data.sort((a, b) => a.value - b.value);
        else if (params.sortOrder === 'alpha') data.sort((a, b) => a.label.localeCompare(b.label));
        else if (params.sortOrder === 'custom') {
            const sorted = [...data].sort((a, b) => b.value - a.value);
            const worst = sorted.pop()!;
            sorted.splice(2, 0, worst);
            return sorted;
        }
        return data;
    }, [params.sortOrder]);

    const groupA = [42, 44, 45, 47, 46];
    const groupBFull = useMemo(() => [41, 43, 46, 48, outlierVal], [outlierVal]);
    const meanA = groupA.reduce((s, v) => s + v, 0) / groupA.length;
    const meanB = useMemo(() => groupBFull.reduce((s, v) => s + v, 0) / groupBFull.length, [groupBFull]);
    const medianA = 45, medianB = 44.5;

    const groupedData = [
        { group: 'Q1', a: 78, b: 62 },
        { group: 'Q2', a: 85, b: 71 },
        { group: 'Q3', a: 91, b: 68 },
        { group: 'Q4', a: 88, b: 74 },
    ];

    const W = 480, H = 220, PAD = { t: 16, l: 40, r: 20, b: 32 };
    const inner = { w: W - PAD.l - PAD.r, h: H - PAD.t - PAD.b };
    const maxBarVal = Math.max(...sortedData.map(d => d.value));
    const barW = Math.floor(inner.w / sortedData.length) - 8;
    const barX = (i: number) => PAD.l + i * (inner.w / sortedData.length) + 4;
    const barH = (v: number) => (v / (maxBarVal * 1.15)) * inner.h;
    const barY = (v: number) => PAD.t + inner.h - barH(v);

    const MM_W = 480, MM_H = 220, MM_P = { t: 20, l: 50, r: 20, b: 30 };
    const mmMax = Math.max(meanA, meanB, outlierVal) + 20;
    const mmY = (v: number) => MM_P.t + (1 - v / mmMax) * (MM_H - MM_P.t - MM_P.b);
    const mmBarW = 40;

    const GP_W = 480, GP_H = 220, GP_P = { t: 16, l: 40, r: 20, b: 32 };
    const gpMax = Math.max(...groupedData.flatMap(d => [d.a, d.b])) * 1.15;
    const gpGW = (GP_W - GP_P.l - GP_P.r) / groupedData.length;
    const gpBW = 20;
    const gpGap = 4;
    const gpX = (i: number, j: number) => GP_P.l + i * gpGW + j * (gpBW + gpGap) + (gpGW - (2 * gpBW + gpGap)) / 2;
    const gpY = (v: number) => GP_P.t + (1 - v / gpMax) * (GP_H - GP_P.t - GP_P.b);

    const rankedData = useMemo(() => [...DP_DATASET].sort((a, b) => b.value - a.value), []);

    const chartState = useMemo(() => buildDPChartState(params), [params]);
    const evaluation = useMemo(() => evaluateChartState(chartState), [chartState]);
    const simulation = useMemo(() => generateSimulation(chartState, evaluation, templates), [chartState, evaluation, templates]);

    return (
        <div className="space-y-6">
            <p className="text-[15px] text-stone-600 leading-relaxed">
                Every chart is a series of active design choices. The same dataset can tell radically different stories depending on how you sort, highlight, label, and annotate the data. Each tab below demonstrates a different class of design manipulation — and each choice is scored in real-time.
            </p>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* LEFT */}
                <div className="space-y-4">
                    {/* Chart card with tab switcher in header */}
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 overflow-hidden">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                                {chartTab === 'bar' ? 'Regional Sales Performance (Q3, $M)' :
                                    chartTab === 'mean-median' ? 'Mean vs Median — Outlier Effect' :
                                        chartTab === 'groups' ? 'Quarterly Revenue by Product Line' :
                                            'Regional Leaderboard — Ranked'}
                            </p>
                            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200">
                                {DP_CHART_TABS.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setChartTab(tab.id)}
                                        className={`px-3 py-1 rounded text-xs font-semibold capitalize transition-all ${chartTab === tab.id ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab 1: Bar Comparison */}
                        {chartTab === 'bar' && (
                            <div>
                                <p className="text-xs text-stone-400 mb-2">Click a bar to highlight/unhighlight it</p>
                                <svg viewBox={`0 0 ${W} ${H}`} className="w-full block overflow-visible">
                                    {[0, 25, 50, 75, 100].map(pct => (
                                        <line key={pct} x1={PAD.l} x2={W - PAD.r} y1={PAD.t + inner.h - (pct / 100) * inner.h} y2={PAD.t + inner.h - (pct / 100) * inner.h} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />
                                    ))}
                                    {sortedData.map((d, i) => {
                                        const isH = highlightedSet.has(i);
                                        const hasH = highlightedSet.size > 0;
                                        const opacity = hasH && !isH ? params.dimOpacity : 1;
                                        const fill = isH ? sectionColor : '#3b82f6';
                                        const bH = barH(d.value), bY2 = barY(d.value), bX2 = barX(i);
                                        return (
                                            <g key={d.label} onClick={() => {
                                                const next = new Set(highlightedSet);
                                                if (next.has(i)) next.delete(i); else next.add(i);
                                                setP('highlightedIndices', Array.from(next));
                                            }} style={{ cursor: 'pointer' }}>
                                                <rect x={bX2} y={bY2} width={barW} height={bH} fill={fill} rx={3} opacity={opacity} style={{ transition: 'all 0.4s' }} />
                                                {(params.labelMode === 'all' || (params.labelMode === 'selective' && (i === 0 || i === sortedData.length - 1 || isH))) && (
                                                    <text x={bX2 + barW / 2} y={bY2 - 4} fill="#44403c" fontSize={9} textAnchor="middle" fontWeight="bold">{d.value}</text>
                                                )}
                                                <text x={bX2 + barW / 2} y={H - PAD.b + 14} fill={isH ? sectionColor : '#78716c'} fontSize={9} textAnchor="middle" fontWeight={isH ? 'bold' : 'normal'} style={{ transition: 'fill 0.4s' }}>{d.label}</text>
                                            </g>
                                        );
                                    })}
                                    {params.annotation.enabled && (
                                        <g>
                                            <rect x={PAD.l + 2} y={PAD.t + 2} width={188} height={18} rx={3} fill={params.annotation.honest ? '#ecfdf514' : '#fef3c714'} stroke={params.annotation.honest ? '#10b981' : '#f59e0b'} strokeWidth={0.8} />
                                            <text x={PAD.l + 8} y={PAD.t + 13} fill={params.annotation.honest ? '#059669' : '#d97706'} fontSize={9}>
                                                {params.annotation.honest ? '★ NA leads Q3 — strong outperformance' : '⚠ NA dominance masks underperformance elsewhere'}
                                            </text>
                                        </g>
                                    )}
                                </svg>
                                {params.dataTableEnabled && (
                                    <div className="mt-3 border-t border-stone-100 pt-3">
                                        <table className="w-full text-xs text-left text-stone-600">
                                            <thead><tr className="text-stone-500 bg-stone-50 uppercase border-b border-stone-100">
                                                <th className="px-2 py-1.5 font-medium">Region</th>
                                                <th className="px-2 py-1.5 font-medium text-right">Sales ($M)</th>
                                                <th className="px-2 py-1.5 font-medium text-right">Share</th>
                                            </tr></thead>
                                            <tbody>{sortedData.map(d => (
                                                <tr key={d.label} className="border-b border-stone-50 last:border-0">
                                                    <td className="px-2 py-1.5">{d.label}</td>
                                                    <td className="px-2 py-1.5 text-right font-medium">{d.value}</td>
                                                    <td className="px-2 py-1.5 text-right">{((d.value / sortedData.reduce((s, x) => s + x.value, 0)) * 100).toFixed(1)}%</td>
                                                </tr>
                                            ))}</tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tab 2: Mean vs Median */}
                        {chartTab === 'mean-median' && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-medium text-stone-600 whitespace-nowrap">Outlier value</span>
                                    <input type="range" min={45} max={350} value={outlierVal} onChange={e => setOutlierVal(Number(e.target.value))} className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, #059669 ${((outlierVal - 45) / 305) * 100}%, #e7e5e4 ${((outlierVal - 45) / 305) * 100}%)` }} />
                                    <span className="text-xs font-bold text-stone-800 tabular-nums">{outlierVal}</span>
                                </div>
                                <svg viewBox={`0 0 ${MM_W} ${MM_H}`} className="w-full block overflow-visible">
                                    {[0, 50, 100, 150, 200].map(v => (
                                        <g key={v}>
                                            <line x1={MM_P.l} x2={MM_W - MM_P.r} y1={mmY(v)} y2={mmY(v)} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />
                                            <text x={MM_P.l - 4} y={mmY(v)} fill="#a8a29e" fontSize={8} textAnchor="end" dominantBaseline="middle">{v}</text>
                                        </g>
                                    ))}
                                    {[{ label: 'Group A (stable)', x: MM_P.l + 40, val: meanA, median: medianA, color: '#3b82f6' },
                                    { label: 'Group B +outlier', x: MM_P.l + 160, val: meanB, median: medianB, color: '#ef4444' }].map(({ label, x, val, median, color }) => (
                                        <g key={label}>
                                            <rect x={x} y={mmY(val)} width={mmBarW} height={mmY(0) - mmY(val)} fill={color} rx={3} opacity={0.85} />
                                            <line x1={x - 5} x2={x + mmBarW + 5} y1={mmY(median)} y2={mmY(median)} stroke="#374151" strokeWidth={2.5} strokeLinecap="round" />
                                            {/* Labels controlled by labelMode */}
                                            {(params.labelMode === 'all' || params.labelMode === 'selective') && (
                                                <text x={x + mmBarW / 2} y={mmY(val) - 5} fill={color} fontSize={9} textAnchor="middle" fontWeight="bold">Mean: {val.toFixed(1)}</text>
                                            )}
                                            {params.labelMode === 'all' && (
                                                <text x={x + mmBarW + 8} y={mmY(median) + 1} fill="#374151" fontSize={8} dominantBaseline="middle">Med: {median}</text>
                                            )}
                                            <text x={x + mmBarW / 2} y={MM_H - MM_P.b + 14} fill={color} fontSize={9} textAnchor="middle">{label}</text>
                                        </g>
                                    ))}
                                    <circle cx={MM_P.l + 160 + mmBarW / 2} cy={mmY(outlierVal)} r={5} fill="#ef4444" opacity={0.9} />
                                    {params.labelMode !== 'none' && (
                                        <text x={MM_P.l + 160 + mmBarW + 8} y={mmY(outlierVal)} fill="#dc2626" fontSize={8} dominantBaseline="middle" fontWeight="bold">Outlier: {outlierVal}</text>
                                    )}
                                    <rect x={MM_W - 110} y={MM_P.t} width={10} height={10} fill="#6b7280" rx={2} />
                                    <text x={MM_W - 97} y={MM_P.t + 8} fill="#374151" fontSize={8}>Bar = Mean</text>
                                    <line x1={MM_W - 110} x2={MM_W - 100} y1={MM_P.t + 20} y2={MM_P.t + 20} stroke="#374151" strokeWidth={2.5} />
                                    <text x={MM_W - 97} y={MM_P.t + 22} fill="#374151" fontSize={8}>Line = Median</text>
                                    {params.annotation.enabled && (
                                        <g>
                                            <rect x={MM_P.l + 2} y={MM_P.t + 2} width={200} height={18} rx={3} fill={params.annotation.honest ? '#ecfdf514' : '#fef3c714'} stroke={params.annotation.honest ? '#10b981' : '#f59e0b'} strokeWidth={0.8} />
                                            <text x={MM_P.l + 8} y={MM_P.t + 13} fill={params.annotation.honest ? '#059669' : '#d97706'} fontSize={9}>
                                                {params.annotation.honest ? '✓ Group B mean inflated by outlier' : '⚠ Using mean hides Group B instability'}
                                            </text>
                                        </g>
                                    )}
                                    {params.sourceCited && (
                                        <text x={MM_W - MM_P.r} y={MM_H - 2} fill="#a8a29e" fontSize={8} textAnchor="end">Source: Q3 Analytics Report © 2024</text>
                                    )}
                                </svg>
                                <p className="text-xs text-stone-400">Drag the outlier — watch Group B's mean inflate while its median stays at 44.5. Use Label Mode and Annotation controls to see how labels change the story.</p>
                            </div>
                        )}

                        {/* Tab 3: Group Spacing */}
                        {chartTab === 'groups' && (
                            <div className="space-y-2">
                                <svg viewBox={`0 0 ${GP_W} ${GP_H}`} className="w-full block overflow-visible">
                                    {[0, 25, 50, 75, 100].map(pct => (
                                        <line key={pct} x1={GP_P.l} x2={GP_W - GP_P.r} y1={gpY(gpMax * pct / 100)} y2={gpY(gpMax * pct / 100)} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />
                                    ))}
                                    {groupedData.map((d, i) => (
                                        <g key={d.group}>
                                            <rect x={gpX(i, 0)} y={gpY(d.a)} width={gpBW} height={gpY(0) - gpY(d.a)} fill={sectionColor} rx={2} opacity={0.85} />
                                            <rect x={gpX(i, 1)} y={gpY(d.b)} width={gpBW} height={gpY(0) - gpY(d.b)} fill="#94a3b8" rx={2} opacity={0.85} />
                                            {/* Value labels from labelMode */}
                                            {params.labelMode === 'all' && (
                                                <>
                                                    <text x={gpX(i, 0) + gpBW / 2} y={gpY(d.a) - 3} fill={sectionColor} fontSize={8} textAnchor="middle" fontWeight="bold">{d.a}</text>
                                                    <text x={gpX(i, 1) + gpBW / 2} y={gpY(d.b) - 3} fill="#64748b" fontSize={8} textAnchor="middle" fontWeight="bold">{d.b}</text>
                                                </>
                                            )}
                                            {params.labelMode === 'selective' && i === 0 && (
                                                <>
                                                    <text x={gpX(i, 0) + gpBW / 2} y={gpY(d.a) - 3} fill={sectionColor} fontSize={8} textAnchor="middle" fontWeight="bold">{d.a}</text>
                                                    <text x={gpX(i, 1) + gpBW / 2} y={gpY(d.b) - 3} fill="#64748b" fontSize={8} textAnchor="middle" fontWeight="bold">{d.b}</text>
                                                </>
                                            )}
                                            <text x={gpX(i, 0) + gpBW + gpGap / 2} y={GP_H - GP_P.b + 14} fill="#78716c" fontSize={9} textAnchor="middle">{d.group}</text>
                                        </g>
                                    ))}
                                    <rect x={GP_W - 90} y={GP_P.t} width={9} height={9} fill={sectionColor} rx={2} />
                                    <text x={GP_W - 78} y={GP_P.t + 7} fill="#374151" fontSize={8}>Product A</text>
                                    <rect x={GP_W - 90} y={GP_P.t + 14} width={9} height={9} fill="#94a3b8" rx={2} />
                                    <text x={GP_W - 78} y={GP_P.t + 21} fill="#374151" fontSize={8}>Product B</text>
                                    {params.annotation.enabled && (
                                        <g>
                                            <rect x={GP_P.l + 2} y={GP_P.t + 2} width={190} height={18} rx={3} fill={params.annotation.honest ? '#ecfdf514' : '#fef3c714'} stroke={params.annotation.honest ? '#10b981' : '#f59e0b'} strokeWidth={0.8} />
                                            <text x={GP_P.l + 8} y={GP_P.t + 13} fill={params.annotation.honest ? '#059669' : '#d97706'} fontSize={9}>
                                                {params.annotation.honest ? '✓ A consistently leads B across all quarters' : '⚠ Grouping creates false parity impression'}
                                            </text>
                                        </g>
                                    )}
                                    {params.sourceCited && (
                                        <text x={GP_W - GP_P.r} y={GP_H - 2} fill="#a8a29e" fontSize={8} textAnchor="end">Source: Quarterly Sales DB © 2024</text>
                                    )}
                                </svg>
                                <p className="text-xs text-stone-400">Gestalt proximity: narrow in-group spacing makes A and B look like a natural pair. Use Label Mode and Annotation to see how display choices affect perception.</p>
                            </div>
                        )}

                        {/* Tab 4: Ranked Highlight — responds to dimOpacity, labelMode, annotation, sourceCited */}
                        {chartTab === 'ranked' && (() => {
                            const maxR = Math.max(...rankedData.map(d => d.value));
                            return (
                                <div className="space-y-2">
                                    <svg viewBox={`0 0 ${W} ${H}`} className="w-full block overflow-visible">
                                        {[0, 25, 50, 75, 100].map(pct => (
                                            <line key={pct} x1={PAD.l} x2={W - PAD.r} y1={PAD.t + inner.h - (pct / 100) * inner.h} y2={PAD.t + inner.h - (pct / 100) * inner.h} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />
                                        ))}
                                        {rankedData.map((d, i) => {
                                            const bH2 = (d.value / (maxR * 1.15)) * inner.h;
                                            const bY3 = PAD.t + inner.h - bH2;
                                            const bX3 = PAD.l + i * (inner.w / rankedData.length) + 4;
                                            const isChamp = i === 0;
                                            // dimOpacity now affects non-champion bars
                                            const opacity = isChamp ? 1 : params.dimOpacity;
                                            return (
                                                <g key={d.label}>
                                                    <rect x={bX3} y={bY3} width={barW} height={bH2} fill={isChamp ? sectionColor : '#cbd5e1'} opacity={opacity} rx={3} style={{ transition: 'opacity 0.4s' }} />
                                                    {isChamp && (
                                                        <>
                                                            <text x={bX3 + barW / 2} y={bY3 - 13} fill={sectionColor} fontSize={14} textAnchor="middle">★</text>
                                                            {params.labelMode !== 'none' && (
                                                                <text x={bX3 + barW / 2} y={bY3 - 3} fill={sectionColor} fontSize={9} textAnchor="middle" fontWeight="bold">{d.value}</text>
                                                            )}
                                                        </>
                                                    )}
                                                    {params.labelMode === 'all' && !isChamp && (
                                                        <text x={bX3 + barW / 2} y={bY3 - 4} fill="#64748b" fontSize={8} textAnchor="middle">{d.value}</text>
                                                    )}
                                                    <text x={bX3 + barW / 2} y={H - PAD.b + 14} fill={isChamp ? sectionColor : '#94a3b8'} fontSize={9} textAnchor="middle" fontWeight={isChamp ? 'bold' : 'normal'} style={{ transition: 'fill 0.4s' }}>{d.label}</text>
                                                </g>
                                            );
                                        })}
                                        {params.annotation.enabled && (
                                            <g>
                                                <rect x={PAD.l + 2} y={PAD.t + 2} width={190} height={18} rx={3} fill={params.annotation.honest ? '#ecfdf514' : '#fef3c714'} stroke={params.annotation.honest ? '#10b981' : '#f59e0b'} strokeWidth={0.8} />
                                                <text x={PAD.l + 8} y={PAD.t + 13} fill={params.annotation.honest ? '#059669' : '#d97706'} fontSize={9}>
                                                    {params.annotation.honest ? '★ NA ranked #1 — leads all regions in Q3' : '⚠ Ranking hides MEA & LATAM underperformance'}
                                                </text>
                                            </g>
                                        )}
                                        {params.sourceCited && (
                                            <text x={W - PAD.r} y={H - 4} fill="#a8a29e" fontSize={8} textAnchor="end">Source: Regional Sales DB © 2024</text>
                                        )}
                                    </svg>
                                    <p className="text-xs text-stone-400">Sorting high-to-low + highlighting #1 focuses attention on NA. Use Dim Opacity (after clicking a bar) and Label Mode to control how buried the rest become.</p>
                                </div>
                            );
                        })()}
                    </div>

                    {/* Manipulation Controls — tab-aware for DP */}
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100 bg-stone-50">
                            <h3 className="text-sm font-semibold text-stone-800">Manipulation Controls</h3>
                            <button onClick={() => { setParams(DP_DEFAULT_PARAMS); setOutlierVal(150); }} className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors">
                                <RotateCcw size={12} />
                                Reset All
                            </button>
                        </div>
                        <div className="px-4 divide-y divide-stone-100">

                            {/* === BAR COMPARISON TAB === */}
                            {chartTab === 'bar' && (
                                <>
                                    <DPControlGroup title="Visual Emphasis">
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-medium text-stone-600">Sort Order</span>
                                            <select value={params.sortOrder} onChange={e => setP('sortOrder', e.target.value as DPLabParams['sortOrder'])}
                                                className="w-full text-xs border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand">
                                                <option value="original">Original Order</option>
                                                <option value="value_desc">Highest First</option>
                                                <option value="value_asc">Lowest First</option>
                                                <option value="alpha">Alphabetical</option>
                                                <option value="custom">Bury Worst (middle)</option>
                                            </select>
                                            {params.sortOrder === 'custom' && <p className="text-xs text-amber-600">Worst performer buried in the middle where viewers look last</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-stone-600">Dim Non-highlighted Opacity</span>
                                                <span className="text-xs font-bold text-stone-800 tabular-nums">{params.dimOpacity.toFixed(1)}</span>
                                            </div>
                                            <input type="range" min={0.1} max={1} step={0.1} value={params.dimOpacity} onChange={e => setP('dimOpacity', Number(e.target.value))}
                                                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                                                style={{ background: `linear-gradient(to right, #059669 ${(params.dimOpacity - 0.1) / 0.9 * 100}%, #e7e5e4 ${(params.dimOpacity - 0.1) / 0.9 * 100}%)` }}
                                            />
                                            <p className="text-xs text-stone-400">Click a bar on the chart to highlight it, then reduce opacity to dim others</p>
                                            {params.dimOpacity < 0.3 && <p className="text-xs text-amber-600">Heavy dimming — non-highlighted bars near invisible</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-medium text-stone-600">Highlight Rationale</span>
                                            <select value={params.highlightRationale} onChange={e => setP('highlightRationale', e.target.value as DPLabParams['highlightRationale'])}
                                                className="w-full text-xs border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand">
                                                <option value="none">None Declared</option>
                                                <option value="outperformance">Market Outperformance</option>
                                            </select>
                                        </div>
                                    </DPControlGroup>
                                    <DPControlGroup title="Annotation &amp; Labels">
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-medium text-stone-600">Label Mode</span>
                                            <select value={params.labelMode} onChange={e => setP('labelMode', e.target.value as DPLabParams['labelMode'])}
                                                className="w-full text-xs border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand">
                                                <option value="none">No Labels</option>
                                                <option value="selective">Key Values Only</option>
                                                <option value="all">All Values</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-xs font-medium text-stone-600">Show Annotation</span>
                                                {params.annotation.enabled && !params.annotation.honest && <p className="text-xs text-amber-600 mt-0.5">Misleading annotation exploits anchoring bias</p>}
                                            </div>
                                            <button onClick={() => setP('annotation', { ...params.annotation, enabled: !params.annotation.enabled })}
                                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.annotation.enabled ? 'bg-brand' : 'bg-stone-300'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.annotation.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                        {params.annotation.enabled && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-stone-600">Annotation is Honest</span>
                                                <button onClick={() => setP('annotation', { ...params.annotation, honest: !params.annotation.honest })}
                                                    className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.annotation.honest ? 'bg-brand' : 'bg-stone-300'}`}>
                                                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.annotation.honest ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                                </button>
                                            </div>
                                        )}
                                    </DPControlGroup>
                                    <DPControlGroup title="Data Transparency">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-stone-600">Show Data Table</span>
                                            <button onClick={() => setP('dataTableEnabled', !params.dataTableEnabled)}
                                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.dataTableEnabled ? 'bg-brand' : 'bg-stone-300'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.dataTableEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-stone-600">Cite Data Source</span>
                                            <button onClick={() => setP('sourceCited', !params.sourceCited)}
                                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.sourceCited ? 'bg-brand' : 'bg-stone-300'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.sourceCited ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                    </DPControlGroup>
                                </>
                            )}

                            {/* === MEAN VS MEDIAN TAB === */}
                            {chartTab === 'mean-median' && (
                                <>
                                    <DPControlGroup title="Outlier Manipulation">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-stone-600">Outlier Value</span>
                                                <span className="text-xs font-bold text-stone-800 tabular-nums">{outlierVal}</span>
                                            </div>
                                            <input type="range" min={45} max={350} value={outlierVal} onChange={e => setOutlierVal(Number(e.target.value))}
                                                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                                                style={{ background: `linear-gradient(to right, #059669 ${((outlierVal - 45) / 305) * 100}%, #e7e5e4 ${((outlierVal - 45) / 305) * 100}%)` }}
                                            />
                                            <p className="text-xs text-stone-400">Drag to inflate the outlier — watch Group B's Mean inflate while Median stays stable at 44.5</p>
                                        </div>
                                    </DPControlGroup>
                                    <DPControlGroup title="Labels &amp; Annotation">
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-medium text-stone-600">Label Mode</span>
                                            <select value={params.labelMode} onChange={e => setP('labelMode', e.target.value as DPLabParams['labelMode'])}
                                                className="w-full text-xs border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand">
                                                <option value="none">No Labels</option>
                                                <option value="selective">Mean Labels Only</option>
                                                <option value="all">All Values (Mean + Median + Outlier)</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-xs font-medium text-stone-600">Show Annotation</span>
                                                {params.annotation.enabled && !params.annotation.honest && <p className="text-xs text-amber-600 mt-0.5">Misleading — hides instability</p>}
                                            </div>
                                            <button onClick={() => setP('annotation', { ...params.annotation, enabled: !params.annotation.enabled })}
                                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.annotation.enabled ? 'bg-brand' : 'bg-stone-300'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.annotation.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                        {params.annotation.enabled && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-stone-600">Annotation is Honest</span>
                                                <button onClick={() => setP('annotation', { ...params.annotation, honest: !params.annotation.honest })}
                                                    className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.annotation.honest ? 'bg-brand' : 'bg-stone-300'}`}>
                                                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.annotation.honest ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                                </button>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-stone-600">Cite Data Source</span>
                                            <button onClick={() => setP('sourceCited', !params.sourceCited)}
                                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.sourceCited ? 'bg-brand' : 'bg-stone-300'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.sourceCited ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                    </DPControlGroup>
                                </>
                            )}

                            {/* === GROUP SPACING TAB === */}
                            {chartTab === 'groups' && (
                                <>
                                    <DPControlGroup title="Labels &amp; Annotation">
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-medium text-stone-600">Label Mode</span>
                                            <select value={params.labelMode} onChange={e => setP('labelMode', e.target.value as DPLabParams['labelMode'])}
                                                className="w-full text-xs border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand">
                                                <option value="none">No Labels</option>
                                                <option value="selective">First Quarter Only</option>
                                                <option value="all">All Bar Values</option>
                                            </select>
                                            <p className="text-xs text-stone-400">Labels on grouped bars change how the viewer reads the A vs B comparison</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-xs font-medium text-stone-600">Show Annotation</span>
                                                {params.annotation.enabled && !params.annotation.honest && <p className="text-xs text-amber-600 mt-0.5">Misleading — implies false parity</p>}
                                            </div>
                                            <button onClick={() => setP('annotation', { ...params.annotation, enabled: !params.annotation.enabled })}
                                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.annotation.enabled ? 'bg-brand' : 'bg-stone-300'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.annotation.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                        {params.annotation.enabled && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-stone-600">Annotation is Honest</span>
                                                <button onClick={() => setP('annotation', { ...params.annotation, honest: !params.annotation.honest })}
                                                    className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.annotation.honest ? 'bg-brand' : 'bg-stone-300'}`}>
                                                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.annotation.honest ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                                </button>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-stone-600">Cite Data Source</span>
                                            <button onClick={() => setP('sourceCited', !params.sourceCited)}
                                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.sourceCited ? 'bg-brand' : 'bg-stone-300'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.sourceCited ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                    </DPControlGroup>
                                </>
                            )}

                            {/* === RANKED HIGHLIGHT TAB === */}
                            {chartTab === 'ranked' && (
                                <>
                                    <DPControlGroup title="Visual Emphasis">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-stone-600">Dim Others Opacity</span>
                                                <span className="text-xs font-bold text-stone-800 tabular-nums">{params.dimOpacity.toFixed(1)}</span>
                                            </div>
                                            <input type="range" min={0.1} max={1} step={0.1} value={params.dimOpacity} onChange={e => setP('dimOpacity', Number(e.target.value))}
                                                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                                                style={{ background: `linear-gradient(to right, #059669 ${(params.dimOpacity - 0.1) / 0.9 * 100}%, #e7e5e4 ${(params.dimOpacity - 0.1) / 0.9 * 100}%)` }}
                                            />
                                            <p className="text-xs text-stone-400">Reduce opacity to make non-champion bars fade — simulates heavy visual emphasis on rank #1</p>
                                            {params.dimOpacity < 0.3 && <p className="text-xs text-amber-600">Heavy dimming — underperformers nearly invisible</p>}
                                        </div>
                                    </DPControlGroup>
                                    <DPControlGroup title="Labels &amp; Annotation">
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-medium text-stone-600">Label Mode</span>
                                            <select value={params.labelMode} onChange={e => setP('labelMode', e.target.value as DPLabParams['labelMode'])}
                                                className="w-full text-xs border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand">
                                                <option value="none">Champion Only</option>
                                                <option value="selective">Champion Only (explicit)</option>
                                                <option value="all">All Bar Values</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-xs font-medium text-stone-600">Show Annotation</span>
                                                {params.annotation.enabled && !params.annotation.honest && <p className="text-xs text-amber-600 mt-0.5">Annotation hides underperformers</p>}
                                            </div>
                                            <button onClick={() => setP('annotation', { ...params.annotation, enabled: !params.annotation.enabled })}
                                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.annotation.enabled ? 'bg-brand' : 'bg-stone-300'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.annotation.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                        {params.annotation.enabled && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-stone-600">Annotation is Honest</span>
                                                <button onClick={() => setP('annotation', { ...params.annotation, honest: !params.annotation.honest })}
                                                    className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.annotation.honest ? 'bg-brand' : 'bg-stone-300'}`}>
                                                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.annotation.honest ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                                </button>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-stone-600">Cite Data Source</span>
                                            <button onClick={() => setP('sourceCited', !params.sourceCited)}
                                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${params.sourceCited ? 'bg-brand' : 'bg-stone-300'}`}>
                                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${params.sourceCited ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                    </DPControlGroup>
                                </>
                            )}

                        </div>
                    </div>
                </div>

                {/* RIGHT: Integrity Evaluation + Executive Reactions */}
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Integrity Evaluation</p>
                        <ScoreGauge evaluation={evaluation} />
                    </div>
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Executive Reactions</p>
                        <ExecutivePanel simulation={simulation} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FullLabDesignPatterns({ lang }: { lang: LangCode }) {
    const [meanMode, setMeanMode] = useState(false);
    const [outlier, setOutlier] = useState(150);
    const [touching, setTouching] = useState(false);
    const [view, setView] = useState<0 | 1 | 2 | 3>(0);

    const meanA = 50;
    const medianA = 50;
    const meanB = useMemo(() => (40 + 45 + 50 + 55 + outlier) / 5, [outlier]);
    const medianB = 50;
    const valA = meanMode ? medianA : meanA;
    const valB = meanMode ? medianB : meanB;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-stone-200">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: sectionColor }}>
                    <Layers size={16} className="text-white" />
                </div>
                <div>
                    <h3 className="text-[15px] font-bold text-stone-900">Design Patterns</h3>
                    <p className="text-[12px] text-stone-500">Structural chart choices that completely change the story to the viewer</p>
                </div>
            </div>

            {/* Mean vs Median */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                    <h4 className="text-[13px] font-bold text-stone-800 uppercase tracking-wide">{t(lang, 's3.designPatterns.meanVsMedian.title')}</h4>
                    <button onClick={() => setMeanMode(!meanMode)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-stone-100 border border-stone-200 hover:bg-stone-200">
                        {meanMode ? t(lang, 's3.designPatterns.meanVsMedian.btnMean') : t(lang, 's3.designPatterns.meanVsMedian.btnMedian')}
                    </button>
                </div>
                <div className="mb-4 bg-stone-50 border border-stone-200 rounded-lg p-3">
                    <label className="text-[11px] font-bold text-stone-600 uppercase block mb-2">{t(lang, 's3.designPatterns.meanVsMedian.adjustLabel', outlier)}</label>
                    <input type="range" min="50" max="500" step="10" value={outlier} onChange={e => setOutlier(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                </div>
                <div className="relative w-full h-[160px] border-b border-l border-stone-300 mb-8">
                    <div className="absolute left-[20%] w-[20%] bottom-0 bg-blue-500 rounded-t-md transition-all duration-300 flex items-end justify-center pb-1" style={{ height: `${(valA / 150) * 100}%` }}>
                        <span className="text-white text-[10px] font-bold">${Math.round(valA)}k</span>
                    </div>
                    <div className="absolute left-[20%] w-[20%] -bottom-6 text-center text-[11px] font-bold text-stone-600">{t(lang, 's3.designPatterns.meanVsMedian.teamA')}</div>
                    <div className="absolute left-[60%] w-[20%] bottom-0 bg-emerald-500 rounded-t-md transition-all duration-300 flex items-end justify-center pb-1" style={{ height: `${Math.min((valB / 150) * 100, 100)}%` }}>
                        {valB > 150 && <div className="absolute -top-4 text-[9px] text-red-500 font-bold w-full text-center">{t(lang, 's3.designPatterns.meanVsMedian.offChart')}</div>}
                        <span className="text-white text-[10px] font-bold">${Math.round(valB)}k</span>
                    </div>
                    <div className="absolute left-[60%] w-[20%] -bottom-6 text-center text-[11px] font-bold text-stone-600">{t(lang, 's3.designPatterns.meanVsMedian.teamB')}</div>
                </div>
                <p className="text-[13px] text-stone-600 mt-2">
                    {meanMode ? t(lang, 's3.designPatterns.meanVsMedian.descMedian') : t(lang, 's3.designPatterns.meanVsMedian.descMean')}
                </p>
            </div>

            {/* Show Groups */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                    <h4 className="text-[13px] font-bold text-stone-800 uppercase tracking-wide">{t(lang, 's3.designPatterns.showGroups.title')}</h4>
                    <button onClick={() => setTouching(!touching)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-stone-100 border border-stone-200 hover:bg-stone-200">
                        {touching ? t(lang, 's3.designPatterns.showGroups.btnAddSpacing') : t(lang, 's3.designPatterns.showGroups.btnGroupTouching')}
                    </button>
                </div>
                <div className="w-full bg-stone-50 border border-stone-100 rounded-xl p-4 flex justify-center h-[160px] overflow-visible">
                    <svg viewBox="-5 -5 115 75" className="w-full h-full overflow-visible">
                        <line x1="0" x2="100" y1="50" y2="50" stroke="#a8a29e" strokeWidth={0.5} />
                        {touching ? (
                            <g>
                                <rect x="10" y="20" width="10" height="30" fill="#3b82f6" /><rect x="20" y="10" width="10" height="40" fill="#10b981" />
                                <text x="20" y="58" fontSize="4" fill="#57534e" textAnchor="middle">Q1</text>
                                <rect x="40" y="15" width="10" height="35" fill="#3b82f6" /><rect x="50" y="5" width="10" height="45" fill="#10b981" />
                                <text x="50" y="58" fontSize="4" fill="#57534e" textAnchor="middle">Q2</text>
                                <rect x="70" y="25" width="10" height="25" fill="#3b82f6" /><rect x="80" y="20" width="10" height="30" fill="#10b981" />
                                <text x="80" y="58" fontSize="4" fill="#57534e" textAnchor="middle">Q3</text>
                            </g>
                        ) : (
                            <g>
                                <rect x="5" y="20" width="8" height="30" fill="#3b82f6" /><rect x="18" y="10" width="8" height="40" fill="#10b981" />
                                <rect x="38" y="15" width="8" height="35" fill="#3b82f6" /><rect x="51" y="5" width="8" height="45" fill="#10b981" />
                                <rect x="71" y="25" width="8" height="25" fill="#3b82f6" /><rect x="84" y="20" width="8" height="30" fill="#10b981" />
                                <text x="50" y="58" fontSize="4" fill="#57534e" textAnchor="middle">{t(lang, 's3.designPatterns.showGroups.spacedLabel')}</text>
                            </g>
                        )}
                    </svg>
                </div>
                <p className="text-[13px] text-stone-600 mt-3">
                    {touching ? t(lang, 's3.designPatterns.showGroups.descTouching') : t(lang, 's3.designPatterns.showGroups.descSpaced')}
                </p>
            </div>

            {/* Explaining Variance */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                <h4 className="text-[13px] font-bold text-stone-800 uppercase tracking-wide mb-4">{t(lang, 's3.designPatterns.explainingVariance.title')}</h4>
                <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                    {([0, 1, 2, 3] as const).map((v, idx) => {
                        const labels = [
                            t(lang, 's3.designPatterns.explainingVariance.btnRaw'),
                            t(lang, 's3.designPatterns.explainingVariance.btnBaseline'),
                            t(lang, 's3.designPatterns.explainingVariance.btnSeasonality'),
                            t(lang, 's3.designPatterns.explainingVariance.btnAnomaly'),
                        ];
                        const colors = ['bg-stone-800', 'bg-blue-600', 'bg-amber-500', 'bg-rose-600'];
                        return (
                            <button key={v} onClick={() => setView(v)}
                                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${view === v ? `${colors[idx]} text-white` : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                    }`}>
                                {labels[idx]}
                            </button>
                        );
                    })}
                </div>
                <div className="w-full bg-stone-50 border border-stone-100 rounded-xl p-3 h-[160px] overflow-visible">
                    <svg viewBox="5 -5 115 65" className="w-full h-full overflow-visible">
                        <line x1="10" x2="110" y1="50" y2="50" stroke="#a8a29e" strokeWidth={0.5} />
                        <line x1="10" x2="10" y1="10" y2="50" stroke="#a8a29e" strokeWidth={0.5} />
                        <path d="M 15 35 L 23 37 L 31 34 L 39 36 L 47 35 L 55 33 L 63 15 L 71 34 L 79 36 L 87 22 L 95 18 L 103 20" fill="none" stroke={view === 0 ? "#475569" : "#cbd5e1"} strokeWidth={1.5} />
                        {view >= 0 && <g fill={view === 0 ? "#475569" : "#cbd5e1"}>{[15, 23, 31, 39, 47, 55, 63, 71, 79, 87, 95, 103].map((cx, i) => <circle key={i} cx={cx} cy={[35, 37, 34, 36, 35, 33, 15, 34, 36, 22, 18, 20][i]} r={1.5} />)}</g>}
                        {view === 1 && <g><line x1="10" x2="110" y1="35" y2="35" stroke="#2563eb" strokeWidth={1} strokeDasharray="2 2" /><text x="112" y="36" fontSize="4" fill="#2563eb">{t(lang, 's3.designPatterns.explainingVariance.flatBaselineLabel')}</text></g>}
                        {view === 2 && <g><rect x="83" y="10" width="24" height="40" fill="#f59e0b" opacity="0.1" /><circle cx="87" cy="22" r="2" fill="#f59e0b" /><circle cx="95" cy="18" r="2" fill="#f59e0b" /><circle cx="103" cy="20" r="2" fill="#f59e0b" /><text x="95" y="8" fontSize="4" fill="#d97706" textAnchor="middle">{t(lang, 's3.designPatterns.explainingVariance.holidaySpikeLabel')}</text></g>}
                        {view === 3 && <g><circle cx="63" cy="15" r="3" fill="none" stroke="#e11d48" strokeWidth={1} /><circle cx="63" cy="15" r="1.5" fill="#e11d48" /><line x1="63" x2="63" y1="15" y2="5" stroke="#e11d48" strokeWidth={0.5} /><text x="63" y="3" fontSize="4" fill="#e11d48" textAnchor="middle">{t(lang, 's3.designPatterns.explainingVariance.viralVideoLabel')}</text></g>}
                    </svg>
                </div>
                <p className="text-[13px] text-stone-600 mt-3">
                    {view === 0 && t(lang, 's3.designPatterns.explainingVariance.descRaw')}
                    {view === 1 && t(lang, 's3.designPatterns.explainingVariance.descBaseline')}
                    {view === 2 && t(lang, 's3.designPatterns.explainingVariance.descSeasonality')}
                    {view === 3 && t(lang, 's3.designPatterns.explainingVariance.descAnomaly')}
                </p>
            </div>
        </div>
    );
}

// ─── Signal vs Noise: Integrity Evaluation tab ─────────────────────────────────

function SNIntegrityTab() {
    const scenarios = [
        {
            label: 'Smoothed KPI without raw data',
            score: 38,
            ethical: 'Low',
            biases: ['False pattern induction', 'Omission of raw signal'],
            desc: 'A 7-period moving average shown without the underlying raw series makes a flat signal appear as steady growth.',
        },
        {
            label: 'Full series with confidence band',
            score: 91,
            ethical: 'High',
            biases: [],
            desc: 'Raw data and smoothed overlay both shown, window disclosed, confidence interval rendered. Viewer can form an independent judgment.',
        },
        {
            label: 'Cherry-picked time window',
            score: 22,
            ethical: 'Very Low',
            biases: ['Selective framing', 'Anchoring', 'False pattern'],
            desc: 'Only the 6-month growth window selected — the prior 18 months of flat/declining data are hidden.',
        },
    ];
    const [idx, setIdx] = useState(0);
    const s = scenarios[idx];
    const color = s.score >= 70 ? '#059669' : s.score >= 45 ? '#d97706' : '#dc2626';
    const label = s.score >= 70 ? 'Honest' : s.score >= 45 ? 'Moderate risk' : 'High risk';
    return (
        <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
                {scenarios.map((sc, i) => (
                    <button key={i} onClick={() => setIdx(i)}
                        className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all ${i === idx ? 'text-white border-transparent' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'}`}
                        style={i === idx ? { backgroundColor: sectionColor, borderColor: sectionColor } : undefined}>
                        {sc.label}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-stone-200 rounded-xl bg-white p-5 space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Integrity Score</p>
                    <div className="flex items-end gap-2">
                        <span className="text-5xl font-black tabular-nums" style={{ color }}>{s.score}</span>
                        <span className="text-sm text-stone-400 mb-1">/100</span>
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ backgroundColor: `${color}18`, color }}>{label}</span>
                    <p className="text-[13px] text-stone-600 leading-relaxed">{s.desc}</p>
                </div>
                <div className="border border-stone-200 rounded-xl bg-white p-5 space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Ethical Level</p>
                    <p className="text-xl font-bold text-stone-800">{s.ethical}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mt-3">Active Biases</p>
                    {s.biases.length === 0
                        ? <p className="text-[13px] text-emerald-600 font-medium">None detected</p>
                        : <ul className="space-y-1">{s.biases.map(b => (
                            <li key={b} className="flex items-center gap-2 text-[13px] text-rose-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                                {b}
                            </li>
                        ))}</ul>
                    }
                </div>
            </div>
        </div>
    );
}

function SNReactionsTab() {
    const [scenario, setScenario] = useState<'smoothed' | 'raw'>('smoothed');
    const reactions = {
        smoothed: [
            { role: 'Skeptic CFO', icon: '🔍', reaction: 'This trend looks manufactured. I want to see the raw weekly data and the moving average window.', sentiment: 'negative' as const },
            { role: 'Optimist CMO', icon: '📈', reaction: 'Beautiful signal — consistent growth from our Q3 campaigns. Accelerate spend.', sentiment: 'positive' as const },
            { role: 'Firefighter COO', icon: '🚒', reaction: 'Growth looks stable. Flag me if the line turns down.', sentiment: 'neutral' as const },
            { role: 'Strategist CEO', icon: '♟️', reaction: 'Where are the outliers? Smoothed data hides the spikes I need to understand.', sentiment: 'negative' as const },
        ],
        raw: [
            { role: 'Skeptic CFO', icon: '🔍', reaction: 'The volatility here is real — let\'s understand what caused those outlier spikes before making budget calls.', sentiment: 'positive' as const },
            { role: 'Optimist CMO', icon: '📈', reaction: 'The noise is distracting. Can we smooth this out for the board deck?', sentiment: 'neutral' as const },
            { role: 'Firefighter COO', icon: '🚒', reaction: 'Three anomalous months in the last year. I need root-cause analysis before we declare a trend.', sentiment: 'negative' as const },
            { role: 'Strategist CEO', icon: '♟️', reaction: 'This is the right starting point. Now let\'s focus on explaining the variance, not hiding it.', sentiment: 'positive' as const },
        ],
    };
    const sentimentColors = { positive: '#059669', negative: '#dc2626', neutral: '#78716c' };
    return (
        <div className="space-y-5">
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 w-fit">
                {(['smoothed', 'raw'] as const).map(s => (
                    <button key={s} onClick={() => setScenario(s)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${scenario === s ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                        style={scenario === s ? { color: sectionColor } : undefined}>
                        {s === 'smoothed' ? 'Smoothed chart' : 'Raw data chart'}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {reactions[scenario].map(r => (
                    <div key={r.role} className="border border-stone-200 rounded-xl bg-white p-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">{r.icon}</span>
                            <p className="text-[12px] font-bold text-stone-700">{r.role}</p>
                            <span className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: sentimentColors[r.sentiment] }} />
                        </div>
                        <p className="text-[13px] text-stone-600 leading-relaxed italic">&ldquo;{r.reaction}&rdquo;</p>
                    </div>
                ))}
            </div>
        </div>
    );
}







function SNControlsTab() {
    const controls = [
        { name: 'Moving Average Smoothing', risk: 'High', mechanism: 'Each point replaced with average of N surrounding points. Window size controls how much "trend" appears.', detection: 'Ask: "What does the raw series look like?" Smoothed lines without raw overlay are a red flag.', ethical: 'Disclose the window size. Always show raw data alongside the smoothed line.' },
        { name: 'Selective Time Window', risk: 'High', mechanism: 'Choosing start/end dates that capture a favorable segment while hiding flat/declining surrounding context.', detection: 'Request the full historical series. Ask why the window begins and ends when it does.', ethical: 'Show at least 3× the highlighted period as surrounding context.' },
        { name: 'Spline Interpolation', risk: 'Medium', mechanism: 'Smooth curves instead of straight lines — creates impression of continuity between discrete points.', detection: 'Values between data points are invented. Demand the actual measurement frequency.', ethical: 'Only use spline for truly continuous data. For monthly data, use straight lines.' },
        { name: 'Trendline without R²', risk: 'Medium', mechanism: 'Overlaying a regression line without disclosing R². An R² of 0.08 means the trend explains only 8% of variance.', detection: 'Always check R². Below 0.3 = statistically meaningless.', ethical: 'Always disclose R² alongside any trendline. If R² < 0.3, remove the trendline.' },
    ];
    const riskColor = (r: string) => r === 'High' ? '#dc2626' : '#d97706';
    return (
        <div className="space-y-4">
            {controls.map(c => (
                <div key={c.name} className="border border-stone-200 rounded-xl bg-white p-5 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-bold text-stone-800">{c.name}</p>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${riskColor(c.risk)}18`, color: riskColor(c.risk) }}>{c.risk} risk</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1"><p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Mechanism</p><p className="text-[13px] text-stone-600 leading-relaxed">{c.mechanism}</p></div>
                        <div className="space-y-1"><p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">How to detect</p><p className="text-[13px] text-stone-600 leading-relaxed">{c.detection}</p></div>
                        <div className="space-y-1"><p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Ethical alternative</p><p className="text-[13px] text-stone-600 leading-relaxed">{c.ethical}</p></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Design Patterns: Integrity Evaluation tab ──────────────────────────────────

function DPIntegrityTab() {
    const scenarios = [
        { label: 'Mean with outliers hidden', score: 41, ethical: 'Low', biases: ['Anchoring distortion', 'Mean inflation'], desc: 'Reporting the arithmetic mean when the distribution has significant outliers drags the reported central tendency far from the typical experience.' },
        { label: 'Median + full distribution', score: 89, ethical: 'High', biases: [], desc: 'Median reported as primary metric, boxplot shows full distribution. Outliers visible and labeled.' },
        { label: 'Groups without sample sizes', score: 27, ethical: 'Very Low', biases: ['Omission of n', 'False comparison'], desc: 'Comparing groups without disclosing sample sizes allows misleading equivalence — a group of 5 appears equal weight to a group of 5,000.' },
    ];
    const [idx, setIdx] = useState(0);
    const s = scenarios[idx];
    const color = s.score >= 70 ? '#059669' : s.score >= 45 ? '#d97706' : '#dc2626';
    const label = s.score >= 70 ? 'Honest' : s.score >= 45 ? 'Moderate risk' : 'High risk';
    return (
        <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
                {scenarios.map((sc, i) => (
                    <button key={i} onClick={() => setIdx(i)}
                        className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all ${i === idx ? 'text-white border-transparent' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'}`}
                        style={i === idx ? { backgroundColor: sectionColor, borderColor: sectionColor } : undefined}>
                        {sc.label}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-stone-200 rounded-xl bg-white p-5 space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Integrity Score</p>
                    <div className="flex items-end gap-2">
                        <span className="text-5xl font-black tabular-nums" style={{ color }}>{s.score}</span>
                        <span className="text-sm text-stone-400 mb-1">/100</span>
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ backgroundColor: `${color}18`, color }}>{label}</span>
                    <p className="text-[13px] text-stone-600 leading-relaxed">{s.desc}</p>
                </div>
                <div className="border border-stone-200 rounded-xl bg-white p-5 space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Ethical Level</p>
                    <p className="text-xl font-bold text-stone-800">{s.ethical}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mt-3">Active Biases</p>
                    {s.biases.length === 0
                        ? <p className="text-[13px] text-emerald-600 font-medium">None detected</p>
                        : <ul className="space-y-1">{s.biases.map(b => (<li key={b} className="flex items-center gap-2 text-[13px] text-rose-700"><span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />{b}</li>))}</ul>
                    }
                </div>
            </div>
        </div>
    );
}

function DPReactionsTab() {
    const [scenario, setScenario] = useState<'mean' | 'median'>('mean');
    const reactions = {
        mean: [
            { role: 'Skeptic CFO', icon: '🔍', reaction: 'The mean is $4,200 but enterprise deals are inflating this. What\'s the median? What\'s the IQR?', sentiment: 'negative' as const },
            { role: 'Optimist CMO', icon: '📈', reaction: 'ACV of $4,200 — our enterprise motion is working. Let\'s double down.', sentiment: 'positive' as const },
            { role: 'Firefighter COO', icon: '🚒', reaction: 'If median is much lower than mean, our pricing model needs rethinking. Send me the distribution.', sentiment: 'neutral' as const },
            { role: 'Strategist CEO', icon: '♟️', reaction: 'Mean alone is insufficient for a bimodal ACV distribution. Full breakdown before any decision.', sentiment: 'negative' as const },
        ],
        median: [
            { role: 'Skeptic CFO', icon: '🔍', reaction: 'Median of $1,800 — that\'s the honest picture. Our core segment is SMB. Good to know before budgeting.', sentiment: 'positive' as const },
            { role: 'Optimist CMO', icon: '📈', reaction: 'The right tail is promising — clear enterprise potential. Median shows room to grow upmarket.', sentiment: 'positive' as const },
            { role: 'Firefighter COO', icon: '🚒', reaction: 'Distribution confirms a two-tier market. Separating SMB ops from enterprise ops now.', sentiment: 'positive' as const },
            { role: 'Strategist CEO', icon: '♟️', reaction: 'Two distinct segments, two distinct strategies. This is the chart I needed.', sentiment: 'positive' as const },
        ],
    };
    const sentimentColors = { positive: '#059669', negative: '#dc2626', neutral: '#78716c' };
    return (
        <div className="space-y-5">
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 w-fit">
                {(['mean', 'median'] as const).map(s => (
                    <button key={s} onClick={() => setScenario(s)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${scenario === s ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                        style={scenario === s ? { color: sectionColor } : undefined}>
                        {s === 'mean' ? 'Mean reported' : 'Median + distribution'}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {reactions[scenario].map(r => (
                    <div key={r.role} className="border border-stone-200 rounded-xl bg-white p-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">{r.icon}</span>
                            <p className="text-[12px] font-bold text-stone-700">{r.role}</p>
                            <span className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: sentimentColors[r.sentiment] }} />
                        </div>
                        <p className="text-[13px] text-stone-600 leading-relaxed italic">&ldquo;{r.reaction}&rdquo;</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DPControlsTab() {
    const controls = [
        { name: 'Mean vs Median distortion', risk: 'High', mechanism: 'In skewed distributions, the mean is far from the typical value. Reporting mean masks that most observations are much lower.', detection: 'Always ask: "Is this distribution symmetric?" If not, demand median and interquartile range.', ethical: 'Report both mean and median. Provide a histogram or boxplot for any financial metric.' },
        { name: 'Empty groups hidden', risk: 'Medium', mechanism: 'Omitting categories with zero values removes context — the viewer cannot see what\'s missing.', detection: 'Ask: "Are all categories shown?" Request the complete breakdown including sub-threshold groups.', ethical: 'Show all groups. If a group is too small, label it as "Other (n=X)".' },
        { name: 'Variance concealment', risk: 'High', mechanism: 'Showing only central tendency without error bars hides uncertainty — summary stats without N are incomplete.', detection: 'Ask: "What is the sample size? What is the standard deviation?" Any summary stat without N is suspect.', ethical: 'Add error bars or confidence intervals whenever showing aggregated data. Disclose N for every series.' },
        { name: 'Anomaly omission', risk: 'High', mechanism: 'Removing or downplaying outlier data points that contradict the narrative.', detection: 'Compare the chart\'s date range with available data. Ask if any points were excluded and why.', ethical: 'Never remove data points. Call out anomalies explicitly with annotations explaining the cause.' },
    ];
    const riskColor = (r: string) => r === 'High' ? '#dc2626' : '#d97706';
    return (
        <div className="space-y-4">
            {controls.map(c => (
                <div key={c.name} className="border border-stone-200 rounded-xl bg-white p-5 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-bold text-stone-800">{c.name}</p>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${riskColor(c.risk)}18`, color: riskColor(c.risk) }}>{c.risk} risk</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1"><p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Mechanism</p><p className="text-[13px] text-stone-600 leading-relaxed">{c.mechanism}</p></div>
                        <div className="space-y-1"><p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">How to detect</p><p className="text-[13px] text-stone-600 leading-relaxed">{c.detection}</p></div>
                        <div className="space-y-1"><p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Ethical alternative</p><p className="text-[13px] text-stone-600 leading-relaxed">{c.ethical}</p></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
