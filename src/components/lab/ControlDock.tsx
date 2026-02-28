import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import type { ChartParams, DataPoint } from '../../types/chart';
import { DEFAULT_PARAMS } from '../../types/chart';

export interface VisibleGroups {
    axisScale?: boolean;
    dataTransform?: boolean;
    visualEmphasis?: boolean;
    annotationTrend?: boolean;
}

interface ControlDockProps {
    params: ChartParams;
    data: DataPoint[];
    onChange: (params: ChartParams) => void;
    visibleGroups?: VisibleGroups;
}

interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit?: string;
    onChange: (v: number) => void;
    warning?: string;
}

function Slider({ label, value, min, max, step, unit, onChange, warning }: SliderProps) {
    const pct = ((value - min) / (max - min)) * 100;
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">{label}</span>
                <span className="text-xs font-bold text-slate-800 tabular-nums">
                    {value}{unit || ''}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                style={{
                    background: `linear-gradient(to right, #2563eb ${pct}%, #e2e8f0 ${pct}%)`,
                }}
            />
            {warning && (
                <p className="text-xs text-amber-600">{warning}</p>
            )}
        </div>
    );
}

interface ToggleProps {
    label: string;
    value: boolean;
    onChange: (v: boolean) => void;
    warning?: string;
}

function Toggle({ label, value, onChange, warning }: ToggleProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <span className="text-xs font-medium text-slate-600">{label}</span>
                {warning && value && <p className="text-xs text-amber-600 mt-0.5">{warning}</p>}
            </div>
            <button
                onClick={() => onChange(!value)}
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${value ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
            >
                <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                />
            </button>
        </div>
    );
}

interface ControlGroupProps {
    title: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
}

function ControlGroup({ title, defaultOpen = true, children }: ControlGroupProps) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-slate-100 last:border-b-0">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-3 text-left"
            >
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
                {open ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
            </button>
            {open && <div className="pb-4 space-y-4">{children}</div>}
        </div>
    );
}

export default function ControlDock({ params, data, onChange, visibleGroups }: ControlDockProps) {
    const update = (partial: Partial<ChartParams>) => {
        onChange({ ...params, ...partial });
    };

    const axisWarning = params.axisBaselinePct > 50
        ? 'Severe truncation — viewer will perceive 5x+ distortion'
        : params.axisBaselinePct > 20
            ? 'Moderate truncation — differences appear 2-4x larger'
            : undefined;

    const smoothingWarning = params.smoothingWindow > 6
        ? 'Severe smoothing — hiding meaningful variance'
        : params.smoothingWindow > 3
            ? 'Moderate smoothing — short-term patterns may be hidden'
            : undefined;

    // When visibleGroups is provided, only show groups whose key is true.
    // When undefined, show all groups.
    const showAxisScale = visibleGroups === undefined || visibleGroups.axisScale === true;
    const showDataTransform = visibleGroups === undefined || visibleGroups.dataTransform === true;
    const showVisualEmphasis = visibleGroups === undefined || visibleGroups.visualEmphasis === true;
    const showAnnotationTrend = visibleGroups === undefined || visibleGroups.annotationTrend === true;

    // Axis & Scale defaults open when it's the only visible group
    const axisScaleDefaultOpen =
        visibleGroups !== undefined &&
            visibleGroups.axisScale === true &&
            !visibleGroups.dataTransform &&
            !visibleGroups.visualEmphasis &&
            !visibleGroups.annotationTrend
            ? true
            : true; // always open by default per existing code

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                <h3 className="text-sm font-semibold text-slate-800">Manipulation Controls</h3>
                <button
                    onClick={() => onChange({ ...DEFAULT_PARAMS })}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors"
                >
                    <RotateCcw size={12} />
                    Reset All
                </button>
            </div>

            <div className="px-4 divide-y divide-slate-100">
                {showAxisScale && (
                    <ControlGroup title="Axis & Scale" defaultOpen={axisScaleDefaultOpen}>
                        <Slider
                            label="Axis Baseline Truncation"
                            value={params.axisBaselinePct}
                            min={0}
                            max={80}
                            step={5}
                            unit="%"
                            onChange={(v) => update({ axisBaselinePct: v })}
                            warning={axisWarning}
                        />
                        <Slider
                            label="Axis Maximum Extension"
                            value={params.axisMaxFactor}
                            min={1.0}
                            max={3.0}
                            step={0.1}
                            unit="x"
                            onChange={(v) => update({ axisMaxFactor: v })}
                            warning={params.axisMaxFactor >= 2.0 ? 'Severe extension flattens variance' : undefined}
                        />
                        <Toggle
                            label="Invert Y-Axis"
                            value={params.invertYAxis}
                            onChange={(v) => update({ invertYAxis: v })}
                            warning="Inverting axis is highly deceptive"
                        />
                        <Toggle
                            label="3D Perspective Effect"
                            value={params.threeD}
                            onChange={(v) => update({ threeD: v })}
                            warning="Adds ~50% magnitude estimation error"
                        />
                        <Slider
                            label="Gridline Count"
                            value={params.gridlineCount}
                            min={0}
                            max={15}
                            step={1}
                            onChange={(v) => update({ gridlineCount: v })}
                        />
                        <Toggle
                            label="Show Comparative Baseline"
                            value={params.showComparativeScale}
                            onChange={(v) => update({ showComparativeScale: v })}
                        />
                    </ControlGroup>
                )}

                {showDataTransform && (
                    <ControlGroup title="Data Transformation" defaultOpen={visibleGroups !== undefined && visibleGroups.dataTransform === true && !visibleGroups.axisScale && !visibleGroups.visualEmphasis && !visibleGroups.annotationTrend}>
                        <Slider
                            label="Total Lookback Window"
                            value={params.totalDataSize}
                            min={10}
                            max={100}
                            step={10}
                            unit="%"
                            onChange={(v) => update({ totalDataSize: v })}
                        />
                        <Slider
                            label="Smoothing Window"
                            value={params.smoothingWindow}
                            min={1}
                            max={8}
                            step={1}
                            onChange={(v) => update({ smoothingWindow: v })}
                            warning={smoothingWarning}
                        />
                        <Slider
                            label="Sample Size"
                            value={params.samplePct}
                            min={20}
                            max={100}
                            step={5}
                            unit="%"
                            onChange={(v) => update({ samplePct: v })}
                            warning={params.samplePct < 50 ? 'Small samples produce spurious patterns' : undefined}
                        />
                        <div className="space-y-1.5">
                            <span className="text-xs font-medium text-slate-600">Outlier Handling</span>
                            <select
                                value={params.outlierMode}
                                onChange={(e) => update({
                                    outlierMode: e.target.value as ChartParams['outlierMode'],
                                    manualExcludedIndices: e.target.value === 'manual_exclude'
                                        ? data.reduce<number[]>((acc, d, i) => {
                                            const vals = data.map((dd) => dd.value);
                                            const mean = vals.reduce((s, v) => s + v, 0) / vals.length;
                                            if (Math.abs(d.value - mean) > 1.5 * Math.sqrt(vals.reduce((s, v) => s + (v - mean) ** 2, 0) / vals.length)) {
                                                acc.push(i);
                                            }
                                            return acc;
                                        }, [])
                                        : [],
                                })}
                                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                            >
                                <option value="show_all">Show All Points</option>
                                <option value="statistical_3sd">Statistical Exclusion (&gt;3 SD)</option>
                                <option value="manual_exclude">Cherry-Pick Exclusion</option>
                            </select>
                        </div>
                        <Toggle
                            label="Show Accompanying Data Table"
                            value={params.dataTableEnabled}
                            onChange={(v) => update({ dataTableEnabled: v })}
                        />
                    </ControlGroup>
                )}

                {showVisualEmphasis && (
                    <ControlGroup title="Visual Emphasis" defaultOpen={visibleGroups !== undefined && visibleGroups.visualEmphasis === true && !visibleGroups.axisScale && !visibleGroups.dataTransform && !visibleGroups.annotationTrend}>
                        <div className="space-y-1.5">
                            <span className="text-xs font-medium text-slate-600">Sort Order</span>
                            <select
                                value={params.sortOrder}
                                onChange={(e) => update({ sortOrder: e.target.value as ChartParams['sortOrder'] })}
                                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                            >
                                <option value="original">Original Order</option>
                                <option value="value_desc">Highest First</option>
                                <option value="value_asc">Lowest First</option>
                                <option value="alpha">Alphabetical</option>
                                <option value="custom">Custom (Reversed)</option>
                            </select>
                        </div>
                        <Slider
                            label="Dim Non-Highlighted Opacity"
                            value={params.colorEmphasis.dimOpacity}
                            min={0.1}
                            max={1}
                            step={0.1}
                            onChange={(v) =>
                                update({
                                    colorEmphasis: { ...params.colorEmphasis, dimOpacity: v },
                                })
                            }
                        />
                        <div className="space-y-1.5">
                            <span className="text-xs font-medium text-slate-600">Highlight Bar Index</span>
                            <div className="flex flex-wrap gap-1.5">
                                {data.slice(0, 12).map((d, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            const current = params.colorEmphasis.highlightedIndices;
                                            const next = current.includes(i)
                                                ? current.filter((idx) => idx !== i)
                                                : [...current, i];
                                            update({
                                                colorEmphasis: { ...params.colorEmphasis, highlightedIndices: next },
                                            });
                                        }}
                                        className={`px-2 py-1 text-xs rounded-md border transition-colors ${params.colorEmphasis.highlightedIndices.includes(i)
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                                            }`}
                                    >
                                        {d.label.length > 6 ? d.label.slice(0, 6) + '..' : d.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <span className="text-xs font-medium text-slate-600">Highlight Rationale</span>
                            <select
                                value={params.highlightRationale}
                                onChange={(e) => update({ highlightRationale: e.target.value as ChartParams['highlightRationale'] })}
                                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                            >
                                <option value="none">None Declared</option>
                                <option value="current_vs_past">Current vs Past Output</option>
                                <option value="market_outperformance">Market Outperformance</option>
                                <option value="custom_editorial">Custom Editorial Justification</option>
                            </select>
                        </div>
                    </ControlGroup>
                )}

                {showAnnotationTrend && (
                    <ControlGroup title="Annotation & Trend" defaultOpen={visibleGroups !== undefined && visibleGroups.annotationTrend === true && !visibleGroups.axisScale && !visibleGroups.dataTransform && !visibleGroups.visualEmphasis}>
                        <Toggle
                            label="Cite Data Source"
                            value={params.sourceCited}
                            onChange={(v) => update({ sourceCited: v })}
                        />
                        <div className="space-y-1.5">
                            <span className="text-xs font-medium text-slate-600">Confidence Interval</span>
                            <select
                                value={params.confidenceLevel}
                                onChange={(e) => update({ confidenceLevel: e.target.value as ChartParams['confidenceLevel'] })}
                                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                            >
                                <option value="none">None</option>
                                <option value="90">90% Confidence</option>
                                <option value="95">95% Confidence</option>
                                <option value="99">99% Confidence</option>
                            </select>
                        </div>
                        <Toggle
                            label="Show Annotation"
                            value={params.annotation.enabled}
                            onChange={(v) =>
                                update({
                                    annotation: {
                                        ...params.annotation,
                                        enabled: v,
                                        text: v && !params.annotation.text ? 'Strong upward trajectory' : params.annotation.text,
                                    },
                                })
                            }
                        />
                        {params.annotation.enabled && (
                            <>
                                <div className="space-y-1.5">
                                    <span className="text-xs font-medium text-slate-600">Annotation Text</span>
                                    <input
                                        type="text"
                                        value={params.annotation.text}
                                        onChange={(e) =>
                                            update({
                                                annotation: { ...params.annotation, text: e.target.value },
                                            })
                                        }
                                        className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                                    />
                                </div>
                                <Toggle
                                    label="Annotation is Honest"
                                    value={params.annotation.honest}
                                    onChange={(v) =>
                                        update({
                                            annotation: { ...params.annotation, honest: v },
                                        })
                                    }
                                    warning="Misleading annotations exploit anchoring bias"
                                />
                            </>
                        )}
                        <div className="space-y-1.5">
                            <span className="text-xs font-medium text-slate-600">Trendline</span>
                            <select
                                value={params.trendline}
                                onChange={(e) => update({ trendline: e.target.value as ChartParams['trendline'] })}
                                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                            >
                                <option value="none">None</option>
                                <option value="linear">Linear Trendline</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <span className="text-xs font-medium text-slate-600">Label Mode</span>
                            <select
                                value={params.labelMode}
                                onChange={(e) => update({ labelMode: e.target.value as ChartParams['labelMode'] })}
                                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                            >
                                <option value="none">No Labels</option>
                                <option value="selective">Key Values Only</option>
                                <option value="all">All Values</option>
                            </select>
                        </div>
                    </ControlGroup>
                )}
            </div>
        </div>
    );
}
