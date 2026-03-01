import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import LessonPage from '../../layout/LessonPage';
import ChartFrame from '../../ui/ChartFrame';
import { Info, Brain, Zap, Trash2 } from 'lucide-react';

const crossRefs = [
    {
        sectionId: 'lab',
        slug: 'axis-scale',
        label: 'Section 3.1 — Gridline density is a manipulation control',
    },
    {
        sectionId: 'ethics',
        slug: 'clarity',
        label: 'Section 5.1 — Clarity means minimizing unnecessary cognitive load',
    },
];

const DATA = [
    { label: 'Q1', value: 3.2 },
    { label: 'Q2', value: 3.8 },
    { label: 'Q3', value: 4.1 },
    { label: 'Q4', value: 3.6 },
    { label: 'Q5', value: 3.9 },
    { label: 'Q6', value: 3.4 },
];

const MARGIN = { top: 16, right: 16, bottom: 32, left: 44 };
const W = 480;
const H = 220;

// Miller's Law visual — cognitive chunks
function MillerLawChart() {
    const chunks = [
        { n: 1, label: '1 item', load: 14, ok: true },
        { n: 2, label: '3 items', load: 30, ok: true },
        { n: 3, label: '5 items', load: 55, ok: true },
        { n: 4, label: '7 items (limit)', load: 85, ok: true },
        { n: 5, label: '9 items', load: 100, ok: false },
        { n: 6, label: '12 items', load: 100, ok: false },
    ];
    const w = 480, h = 240, pad = { l: 110, r: 80, t: 30, b: 36 };
    const barH = 22;
    const gap = (h - pad.t - pad.b - chunks.length * barH) / (chunks.length + 1);

    return (
        <ChartFrame
            label="Miller's Law: Working Memory Baseline"
            note="Working memory saturates at 7±2 chunks. A chart with a complex legend, dense gridlines, multiple series, and several annotations can easily push viewers past this limit."
        >
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto block p-4 bg-stone-50/30">
                {/* Background zones */}
                <rect x={pad.l} y={pad.t}
                    width={(85 / 100) * (w - pad.l - pad.r)}
                    height={h - pad.t - pad.b}
                    fill="#f0fdf4" rx={4} />
                <rect x={pad.l + (85 / 100) * (w - pad.l - pad.r)} y={pad.t}
                    width={(15 / 100) * (w - pad.l - pad.r)}
                    height={h - pad.t - pad.b}
                    fill="#fef2f2" rx={4} />

                {/* Threshold line */}
                <line
                    x1={pad.l + (85 / 100) * (w - pad.l - pad.r)}
                    x2={pad.l + (85 / 100) * (w - pad.l - pad.r)}
                    y1={pad.t - 5} y2={h - pad.b + 5}
                    stroke="#f97316" strokeWidth={2} strokeDasharray="4,4"
                />
                <text x={pad.l + (87 / 100) * (w - pad.l - pad.r)} y={pad.t + 15}
                    fill="#f97316" fontSize={8}>7±2 Limit</text>

                {chunks.map((c, i) => {
                    const y = pad.t + gap + i * (barH + gap);
                    const bw = Math.min(c.load, 100) / 100 * (w - pad.l - pad.r);
                    return (
                        <g key={c.n}>
                            <text x={pad.l - 12} y={y + barH / 2 + 4} fill={c.ok ? '#78716c' : '#ef4444'}
                                fontSize={8} textAnchor="end">{c.label}</text>
                            <rect x={pad.l} y={y} width={bw} height={barH}
                                fill={c.ok ? '#10b981' : '#ef4444'} rx={2} shadow-sm="true" />
                            {!c.ok && (
                                <g transform={`translate(${pad.l + bw + 8}, ${y + barH / 2 + 3})`}>
                                    <text fill="#ef4444" fontSize={7.5} fontWeight={500}>Overload</text>
                                </g>
                            )}
                        </g>
                    );
                })}
            </svg>
        </ChartFrame>
    );
}

// Non-data ink comparison
// Non-data ink comparison
function DataInkComparisonChart() {
    type Mode = 'high' | 'low';
    const [mode, setMode] = useState<Mode>('high');
    const bars = DATA;
    const w = 480, h = 220, pad = { l: 48, r: 20, t: 20, b: 40 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const n = bars.length;
    const totalBarW = innerW - (n + 1) * 8;
    const bw = totalBarW / n;
    const maxV = 5;
    const toY = (v: number) => pad.t + (1 - v / maxV) * innerH;
    const bH = (v: number) => (v / maxV) * innerH;

    return (
        <ChartFrame
            label="The Data-Ink Ratio"
            note={mode === 'high' ? "High noise: 12+ gridlines, background zebra stripes, decorative border. Each element consumes a working memory slot." : "Low noise (Tufte): 3 minimal gridlines, no background, no border. Data ink ratio maximized."}
        >
            <div className="space-y-4 p-4">
                <div className="flex justify-between items-center mb-2 px-2">
                    <div className="flex bg-stone-100/80 backdrop-blur-sm rounded-lg p-0.5 border border-stone-200">
                        {(['high', 'low'] as Mode[]).map(m => (
                            <button key={m} onClick={() => setMode(m)}
                                className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${mode === m
                                    ? 'bg-white text-stone-800 shadow-sm'
                                    : 'text-stone-400 hover:text-stone-600'}`}>
                                {m === 'high' ? 'High noise' : 'Tufte style'}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                            <div className={`w-2.5 h-2.5 rounded-full ${mode === 'high' ? 'bg-rose-500' : 'bg-stone-200 opacity-50'}`} />
                            <span className="text-[11px] font-medium text-stone-400">Noise</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <span className="text-[11px] font-medium text-stone-400">Data</span>
                        </div>
                    </div>
                </div>

                <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto block bg-white">
                    {/* Background stripes */}
                    {mode === 'high' && Array.from({ length: 16 }).map((_, i) => (
                        <rect key={i} x={pad.l} y={pad.t + i * ((innerH) / 16)}
                            width={innerW} height={innerH / 16}
                            fill={i % 2 === 0 ? '#f5f5f4' : '#fafaf9'} />
                    ))}
                    {/* Gridlines */}
                    {(mode === 'high' ? [0, 1, 2, 3, 4, 5] : [0, 2.5, 5]).map(v => (
                        <line key={v} x1={pad.l} x2={w - pad.r}
                            y1={toY(v)} y2={toY(v)}
                            stroke={mode === 'high' ? '#a8a29e' : '#e7e5e4'}
                            strokeWidth={mode === 'high' ? 1.5 : 0.75}
                            strokeDasharray={mode === 'high' ? '3,2' : '0'} />
                    ))}
                    {/* Y-axis labels */}
                    {[0, 1, 2, 3, 4, 5].map(v => (
                        <text key={v} x={pad.l - 10} y={toY(v) + 4} fill="#a8a29e" fontSize={8} textAnchor="end">{v}</text>
                    ))}
                    {/* Border */}
                    {mode === 'high' && (
                        <rect x={pad.l - 4} y={pad.t - 4}
                            width={innerW + 8} height={innerH + 8}
                            fill="none" stroke="#d6d3d1" strokeWidth={3} rx={6} />
                    )}
                    {/* Bars */}
                    {bars.map((d, i) => {
                        const x = pad.l + 8 + i * (bw + 8);
                        return (
                            <g key={d.label}>
                                <rect x={x} y={toY(d.value)} width={bw} height={bH(d.value)}
                                    fill="#10b981" rx={2} />
                                <text x={x + bw / 2} y={h - pad.b + 18} fill="#78716c"
                                    fontSize={8} textAnchor="middle">{d.label}</text>
                            </g>
                        );
                    })}
                </svg>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 px-2 border-t border-stone-100 pt-4">
                    <div className="flex items-center gap-2">
                        <Trash2 size={12} className={mode === 'high' ? 'text-rose-500' : 'text-stone-300'} />
                        <span className={`text-[11px] font-medium ${mode === 'high' ? 'text-rose-600 font-medium' : 'text-stone-400 line-through font-normal'}`}>Zebra Stripes</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Trash2 size={12} className={mode === 'high' ? 'text-rose-500' : 'text-stone-300'} />
                        <span className={`text-[11px] font-medium ${mode === 'high' ? 'text-rose-600 font-medium' : 'text-stone-400 line-through font-normal'}`}>Heavy Border</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap size={12} className="text-amber-500" />
                        <span className="text-[11px] font-medium text-stone-600">{mode === 'high' ? '12 Gridlines' : '3 Gridlines'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Brain size={12} className="text-brand" />
                        <span className="text-[11px] font-medium text-emerald-600">6 Data Bars</span>
                    </div>
                </div>
            </div>
        </ChartFrame>
    );
}

function StrategicHighlightingLab() {
    const defaultData = [
        { label: 'Alpha', value: 82, color: '#3b82f6' },
        { label: 'Beta', value: 45, color: '#10b981' },
        { label: 'Gamma', value: 94, color: '#8b5cf6' },
        { label: 'Delta', value: 68, color: '#f59e0b' },
        { label: 'Epsil', value: 23, color: '#ec4899' },
        { label: 'Zeta', value: 55, color: '#06b6d4' },
    ];

    const [isCleaned, setIsCleaned] = useState(false);

    // Sort and style based on state
    const displayData = isCleaned
        ? [...defaultData].sort((a, b) => b.value - a.value).map((d, i) => ({
            ...d,
            color: i === 0 ? '#ef4444' : '#e7e5e4'
        }))
        : defaultData;

    return (
        <ChartFrame
            label="Strategic Highlighting"
            note={isCleaned
                ? "By sorting the data and stripping away competing colors, the outlier becomes instantly pre-attentive. Cognitive load drops to zero."
                : "A 'rainbow' palette forces working memory to process 6 distinct colors and scan the entire chart. This creates unnecessary friction."}
        >
            <div className="space-y-6 p-6">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                        Performance by Region
                    </p>
                    <button
                        onClick={() => setIsCleaned(!isCleaned)}
                        className={`px-4 py-2 rounded-lg text-[9px] font-medium transition-all shadow-sm border ${isCleaned
                            ? 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50 font-medium'
                            : 'bg-brand text-white border-brand hover:bg-brand-dark font-medium'}`}
                    >
                        {isCleaned ? 'Reset to chaotic' : 'Clean & highlight'}
                    </button>
                </div>

                <div className="h-44 flex items-end justify-between gap-4 px-4 border-b border-stone-100 pb-0">
                    {displayData.map((d, i) => (
                        <div key={d.label} className="relative flex-1 flex flex-col justify-end items-center gap-2 h-full">
                            <span className={`text-[9px] font-medium transition-all duration-500 ${isCleaned && i === 0 ? 'text-rose-600 scale-125' : 'text-stone-400'}`}>
                                {d.value}
                            </span>
                            <div
                                className="w-full rounded-t transition-all duration-700 shadow-sm"
                                style={{
                                    height: `${(d.value / 100) * 100}%`,
                                    backgroundColor: d.color
                                }}
                            >
                                {isCleaned && i === 0 && (
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap animate-bounce">
                                        <div className="bg-rose-600 text-white text-[8px] font-medium px-2 py-1 rounded shadow-lg">Target</div>
                                        <div className="w-1.5 h-1.5 bg-rose-600 rotate-45 mx-auto -mt-1" />
                                    </div>
                                )}
                            </div>
                            <span className={`absolute -bottom-6 text-[8px] font-medium transition-all duration-500 ${isCleaned && i === 0 ? 'text-stone-800' : 'text-stone-500'}`}>
                                {d.label}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="h-4" /> {/* Spacer for labels */}
            </div>
        </ChartFrame>
    );
}

export default function Decluttering101Lesson() {
    const [lowNoise, setLowNoise] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null);

    // Ensure we clear out old D3 elements (especially from Vite HMR / StrictMode) when unmounting
    useEffect(() => {
        return () => {
            if (svgRef.current) d3.select(svgRef.current).selectAll('*').remove();
        };
    }, []);

    useEffect(() => {
        const svgEl = svgRef.current;
        if (!svgEl) return;

        const svg = d3.select(svgEl);

        const innerW = W - MARGIN.left - MARGIN.right;
        const innerH = H - MARGIN.top - MARGIN.bottom;

        if (svg.select('.main-group').empty()) {
            const g = svg
                .append('g')
                .attr('class', 'main-group')
                .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

            g.append('g').attr('class', 'stripes');
            g.append('rect').attr('class', 'border-rect');
            g.append('g').attr('class', 'grid');
            g.append('g').attr('class', 'bars');
            g.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${innerH})`);
            g.append('g').attr('class', 'y-axis');
        }

        const g = svg.select('.main-group');
        const t = svg.transition().duration(800).ease(d3.easeCubicOut) as any;

        const xScale = d3
            .scaleBand()
            .domain(DATA.map((d) => d.label))
            .range([0, innerW])
            .padding(0.35);

        const yScale = d3
            .scaleLinear()
            .domain([0, 5])
            .range([innerH, 0]);

        const gridlineCount = lowNoise ? 3 : 13;
        const gridTicks = yScale.ticks(gridlineCount);

        // Stripes
        const stripesData = lowNoise ? [] : Array.from({ length: Math.ceil(innerH / 12) }, (_, i) => i * 12);
        g.select('.stripes').selectAll('rect')
            .data(stripesData)
            .join(
                (enter) => enter.append('rect')
                    .attr('x', 0)
                    .attr('y', d => d)
                    .attr('width', innerW)
                    .attr('height', 6)
                    .attr('fill', (_, i) => i % 2 === 0 ? '#f5f5f4' : '#fafaf9')
                    .attr('opacity', 0)
                    .call(e => e.transition(t).attr('opacity', 0.7)),
                (update) => update,
                (exit) => exit.call(e => e.transition(t).attr('opacity', 0).remove())
            );

        // Gridlines
        g.select('.grid').selectAll('line')
            .data(gridTicks)
            .join(
                (enter) => enter.append('line')
                    .attr('x1', 0)
                    .attr('x2', innerW)
                    .attr('y1', d => yScale(d))
                    .attr('y2', d => yScale(d))
                    .attr('stroke', lowNoise ? '#e7e5e4' : '#a8a29e')
                    .attr('stroke-width', lowNoise ? 0.75 : 1)
                    .attr('stroke-dasharray', lowNoise ? '0' : '2,2')
                    .attr('opacity', 0)
                    .call(e => e.transition(t).attr('opacity', 1)),
                (update) => update.call(u => u.transition(t)
                    .attr('y1', d => yScale(d))
                    .attr('y2', d => yScale(d))
                    .attr('stroke', lowNoise ? '#e7e5e4' : '#a8a29e')
                    .attr('stroke-width', lowNoise ? 0.75 : 1)
                    .attr('stroke-dasharray', lowNoise ? '0' : '2,2')
                    .attr('opacity', 1)
                ),
                (exit) => exit.call(e => e.transition(t).attr('opacity', 0).remove())
            );

        // Border
        g.select('.border-rect')
            .attr('x', -4)
            .attr('y', -4)
            .attr('width', innerW + 8)
            .attr('height', innerH + 8)
            .attr('fill', 'none')
            .attr('rx', 3)
            .transition(t)
            .attr('stroke', lowNoise ? 'none' : '#d6d3d1')
            .attr('stroke-width', lowNoise ? 0 : 2);

        // Bars
        g.select('.bars').selectAll('.bar')
            .data(DATA, (d: any) => d.label)
            .join(
                (enter) => enter.append('rect')
                    .attr('class', 'bar')
                    .attr('x', d => xScale(d.label)!)
                    .attr('y', innerH)
                    .attr('width', xScale.bandwidth())
                    .attr('height', 0)
                    .attr('fill', '#059669')
                    .attr('rx', 2)
                    .call(e => e.transition(t)
                        .attr('y', d => yScale(d.value))
                        .attr('height', d => innerH - yScale(d.value))),
                (update) => update.call(u => u.transition(t)
                    .attr('x', d => xScale(d.label)!)
                    .attr('y', d => yScale(d.value))
                    .attr('height', d => innerH - yScale(d.value))
                ),
                (exit) => exit.remove()
            );

        // X Axis
        g.select('.x-axis')
            .call((ax: any) => ax.transition(t).call(d3.axisBottom(xScale).tickSize(0)))
            .call((ax) => ax.select('.domain').attr('stroke', '#d6d3d1'))
            .selectAll('text')
            .style('font-size', '8px')
            .style('fill', '#78716c');

        // Y Axis
        g.select('.y-axis')
            .call((ax: any) => ax.transition(t).call(
                d3.axisLeft(yScale)
                    .ticks(lowNoise ? 3 : 8)
                    .tickFormat(d => `${d}`)
            ))
            .call((ax) => ax.select('.domain').attr('stroke', '#d6d3d1'))
            .selectAll('text')
            .style('font-size', '8px')
            .style('fill', '#78716c');

    }, [lowNoise]);

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">

                {/* Main explanation */}
                <div className="space-y-4">
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        Cognitive load theory, developed by John Sweller in 1988, describes the limits of working memory when processing new information. Working memory — the mental workspace where active thinking happens — can hold approximately <strong>7 ± 2 independent chunks</strong> at once (Miller, 1956). When that capacity is exceeded, comprehension degrades rapidly: the viewer can no longer form accurate mental models of what the chart is communicating. Processing becomes error-prone, and the viewer's conclusions become unreliable.
                    </p>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        Every visual element in a chart occupies a working memory slot: each gridline, tick mark, legend entry, background stripe, border, annotation, and data point requires active processing. A chart with 12 gridlines consumes more working memory than one with 3 — but communicates <em>identically</em>. The extra 9 gridlines are pure cognitive tax: they cost the reader processing capacity without adding informational value.
                    </p>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        Edward Tufte formalized this insight in his 1983 concept of the <strong>data-ink ratio</strong>: the proportion of a chart's ink devoted to non-redundant display of data. His principle — maximize the data-ink ratio, within reason — translates directly into cognitive load reduction. Every gridline, background element, or decorative border that can be removed without loss of meaning <em>should</em> be removed. The goal is to ensure working memory is spent on data interpretation, not on processing visual noise.
                    </p>
                </div>

                {/* Miller's Law */}
                <MillerLawChart />

                {/* Signal-to-noise framework */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                        <Info size={16} className="text-brand" />
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                            The signal-to-noise framework (Tufte, 1983)
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            {
                                label: 'Data ink',
                                desc: 'Every pixel that directly encodes a data value. The bar height, line position, dot location. Maximize this.',
                                color: 'emerald' as const,
                                action: 'Keep and maximize',
                            },
                            {
                                label: 'Redundant ink',
                                desc: 'Repeated encodings of the same info: axis label + value label + grid. Reduce where possible.',
                                color: 'amber' as const,
                                action: 'Reduce / Refine',
                            },
                            {
                                label: 'Non-data ink',
                                desc: 'Decorative borders, 3D effects, background patterns. These carry zero info. Eliminate entirely.',
                                color: 'rose' as const,
                                action: 'ELIMINATE',
                            },
                        ].map((item) => (
                            <div key={item.label} className={`rounded-xl border p-4 shadow-sm space-y-3 transition-transform hover:scale-[1.02] ${item.color === 'emerald' ? 'bg-emerald-50/50 border-emerald-200/50' : item.color === 'amber' ? 'bg-amber-50/50 border-amber-200/50' : 'bg-rose-50/50 border-rose-200/50'}`}>
                                <p className={`text-[13px] font-bold uppercase tracking-tighter ${item.color === 'emerald' ? 'text-emerald-800' : item.color === 'amber' ? 'text-amber-800' : 'text-rose-800'}`}>
                                    {item.label}
                                </p>
                                <p className={`text-[12px] leading-relaxed font-medium ${item.color === 'emerald' ? 'text-emerald-700/80' : item.color === 'amber' ? 'text-amber-700/80' : 'text-rose-700/80'}`}>
                                    {item.desc}
                                </p>
                                <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${item.color === 'emerald' ? 'bg-emerald-500 text-white border-emerald-600' : item.color === 'amber' ? 'bg-amber-500 text-white border-amber-600' : 'bg-rose-500 text-white border-rose-600'}`}>
                                    {item.action}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data-ink comparison */}
                <DataInkComparisonChart />

                {/* Strategic Highlighting Lab */}
                <StrategicHighlightingLab />

                {/* Manipulation application */}
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 shadow-sm border-l-4">
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="text-amber-600 animate-pulse" size={20} />
                        <p className="text-[11px] font-bold text-amber-700 uppercase tracking-widest">
                            Manipulation: Deliberate Overload
                        </p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-[14px] text-amber-900 leading-relaxed font-medium">
                            Increasing cognitive load is a weapon. A chart overloaded with gridlines, 3D effects, and busy legends forces the viewer to expend working memory on noise — leaving less capacity for critical evaluation.
                        </p>
                        <p className="text-[14px] text-amber-800 leading-relaxed italic opacity-80">
                            When working memory is saturated, the brain defaults to heuristic shortcuts: viewers accept overall impressions rather than interrogating underlying numbers.
                        </p>
                    </div>
                </div>

                {/* Interactive demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                    <div className="relative">
                        <span className="absolute top-0 right-0 text-xs font-bold text-stone-300 select-none">1.2</span>
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                            Live demo: Gridline density
                        </p>
                        <p className="text-[13px] text-stone-500 mb-4">
                            Toggle the gridline density to experience how unnecessary structure forces your eyes to work harder to read the exact same data.
                        </p>

                        <div className="flex justify-center py-3 overflow-x-auto">
                            <svg className="w-full max-w-2xl mx-auto block"
                                ref={svgRef}
                                viewBox={`0 0 ${W} ${H}`}
                                aria-label="Cognitive load demo: bar chart with gridline density toggle"
                            />
                        </div>

                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span className={`text-[13px] font-medium transition-colors ${!lowNoise ? 'text-stone-800' : 'text-stone-400'}`}>
                                Chaos (high noise)
                            </span>
                            <button
                                onClick={() => setLowNoise((v) => !v)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${lowNoise ? 'bg-emerald-500' : 'bg-red-500'}`}
                                aria-label="Toggle low noise mode"
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${lowNoise ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <span className={`text-[13px] font-medium transition-colors ${lowNoise ? 'text-stone-800' : 'text-stone-400'}`}>
                                Tufte (clean)
                            </span>
                        </div>

                        <p className="text-center text-[12px] text-stone-400 mt-2">
                            {lowNoise
                                ? '3 gridlines — only what comprehension requires. Working memory is free to interpret data.'
                                : '13+ gridlines, background stripes, decorative border — each steals a working memory slot before a value is read.'}
                        </p>
                    </div>
                </div>


                {/* Research note */}
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-5">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">Research basis</p>
                    <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
                        George Miller's 1956 paper "The Magical Number Seven, Plus or Minus Two" established working memory capacity limits. While subsequent research has refined the estimate (Alan Baddeley's 2000 model suggests 4 ± 1 chunks of novel information), the central insight remains: working memory is severely limited, and visual complexity directly taxes it.
                    </p>
                    <p className="text-[13px] text-stone-600 leading-relaxed">
                        Sweller (1988) identified three types of cognitive load in educational contexts, two of which directly apply to charts: <strong>extraneous load</strong> (caused by poor presentation design — equivalent to non-data ink) and <strong>germane load</strong> (mental effort spent building actual understanding — equivalent to interpreting data values). The goal of a well-designed chart is to minimize extraneous load and maximize germane load.
                    </p>
                </div>
            </div>
        </LessonPage>
    );
}
