import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import LessonPage from '../../../components/layout/LessonPage';

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
    const w = 380, h = 130, pad = { l: 90, r: 20, t: 16, b: 28 };
    const barH = 14;
    const gap = (h - pad.t - pad.b - chunks.length * barH) / (chunks.length + 1);

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
            {/* Background zone */}
            <rect x={pad.l} y={pad.t}
                width={(85 / 100) * (w - pad.l - pad.r)}
                height={h - pad.t - pad.b}
                fill="#f0fdf4" opacity={0.6} rx={2} />
            <rect x={pad.l + (85 / 100) * (w - pad.l - pad.r)} y={pad.t}
                width={(15 / 100) * (w - pad.l - pad.r)}
                height={h - pad.t - pad.b}
                fill="#fef2f2" opacity={0.6} rx={2} />
            {/* Threshold line */}
            <line
                x1={pad.l + (85 / 100) * (w - pad.l - pad.r)}
                x2={pad.l + (85 / 100) * (w - pad.l - pad.r)}
                y1={pad.t} y2={h - pad.b}
                stroke="#f97316" strokeWidth={1.5} strokeDasharray="4,3"
            />
            <text x={pad.l + (86 / 100) * (w - pad.l - pad.r)} y={pad.t + 8}
                fill="#f97316" fontSize={7} fontWeight={700}>7±2 limit</text>

            {chunks.map((c, i) => {
                const y = pad.t + gap + i * (barH + gap);
                const bw = Math.min(c.load, 100) / 100 * (w - pad.l - pad.r);
                return (
                    <g key={c.n}>
                        <text x={pad.l - 6} y={y + barH / 2 + 4} fill={c.ok ? '#78716c' : '#dc2626'}
                            fontSize={8} textAnchor="end">{c.label}</text>
                        <rect x={pad.l} y={y} width={bw} height={barH}
                            fill={c.ok ? '#059669' : '#dc2626'} rx={2} opacity={0.85} />
                        {!c.ok && (
                            <text x={pad.l + bw + 3} y={y + barH / 2 + 4}
                                fill="#dc2626" fontSize={8} fontWeight={700}>overload</text>
                        )}
                    </g>
                );
            })}
        </svg>
    );
}

// Non-data ink comparison
function DataInkComparisonChart() {
    type Mode = 'high' | 'low';
    const [mode, setMode] = useState<Mode>('high');
    const bars = DATA;
    const w = 200, h = 110, pad = { l: 28, r: 10, t: 10, b: 28 };
    const bw = 20;
    const gap = (w - pad.l - pad.r - bars.length * bw) / (bars.length + 1);
    const maxV = 5;
    const toY = (v: number) => pad.t + (1 - v / maxV) * (h - pad.t - pad.b);
    const bH = (v: number) => (v / maxV) * (h - pad.t - pad.b);

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                {(['high', 'low'] as Mode[]).map(m => (
                    <button key={m} onClick={() => setMode(m)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-semibold border transition-all ${mode === m
                            ? 'bg-brand text-white border-brand'
                            : 'bg-white text-stone-500 border-stone-200'}`}>
                        {m === 'high' ? 'High noise (traditional)' : 'Low noise (Tufte)'}
                    </button>
                ))}
            </div>
            <div className="flex gap-6 items-end justify-center">
                <svg viewBox={`0 0 ${w} ${h}`} style={{ width: 200 }}>
                    {/* Background stripes */}
                    {mode === 'high' && Array.from({ length: 8 }).map((_, i) => (
                        <rect key={i} x={pad.l} y={pad.t + i * 10}
                            width={w - pad.l - pad.r} height={5}
                            fill={i % 2 === 0 ? '#f5f5f4' : '#fafaf9'} />
                    ))}
                    {/* Gridlines */}
                    {(mode === 'high' ? [0, 1, 2, 3, 4, 5] : [0, 2.5, 5]).map(v => (
                        <line key={v} x1={pad.l} x2={w - pad.r}
                            y1={toY(v)} y2={toY(v)}
                            stroke={mode === 'high' ? '#a8a29e' : '#e7e5e4'}
                            strokeWidth={mode === 'high' ? 1 : 0.5}
                            strokeDasharray={mode === 'high' ? '2,2' : '0'} />
                    ))}
                    {/* Border */}
                    {mode === 'high' && (
                        <rect x={pad.l - 3} y={pad.t - 3}
                            width={w - pad.l - pad.r + 6} height={h - pad.t - pad.b + 6}
                            fill="none" stroke="#d6d3d1" strokeWidth={2} rx={3} />
                    )}
                    {/* Bars */}
                    {bars.map((d, i) => {
                        const x = pad.l + (i + 1) * gap + i * bw;
                        return (
                            <g key={d.label}>
                                <rect x={x} y={toY(d.value)} width={bw} height={bH(d.value)}
                                    fill="#059669" rx={2} />
                                <text x={x + bw / 2} y={h - 8} fill="#a8a29e"
                                    fontSize={7} textAnchor="middle">{d.label}</text>
                            </g>
                        );
                    })}
                </svg>
                <div className="text-[11px] space-y-1 text-stone-500">
                    <p className="font-bold text-stone-700">Non-data elements:</p>
                    <p className={mode === 'high' ? 'text-red-600 font-medium' : 'text-stone-400 line-through'}>
                        Background stripes
                    </p>
                    <p className={mode === 'high' ? 'text-red-600 font-medium' : 'text-stone-400 line-through'}>
                        Decorative border
                    </p>
                    <p className={mode === 'high' ? 'text-amber-600 font-medium' : 'text-stone-400'}>
                        {mode === 'high' ? '12 gridlines' : '3 gridlines'}
                    </p>
                    <p className="text-brand font-medium">6 data bars (always present)</p>
                </div>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
                {mode === 'high'
                    ? 'High noise: 12+ gridlines, background zebra stripes, decorative border. Each element consumes a working memory slot.'
                    : 'Low noise (Tufte): 3 minimal gridlines, no background, no border. Data ink ratio maximized.'}
            </p>
        </div>
    );
}

export default function CognitiveLoadLesson() {
    const [lowNoise, setLowNoise] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const svgEl = svgRef.current;
        if (!svgEl) return;

        const svg = d3.select(svgEl);
        svg.selectAll('*').remove();

        const innerW = W - MARGIN.left - MARGIN.right;
        const innerH = H - MARGIN.top - MARGIN.bottom;

        const g = svg
            .append('g')
            .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

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

        if (!lowNoise) {
            for (let i = 0; i < innerH; i += 12) {
                g.append('rect')
                    .attr('x', 0)
                    .attr('y', i)
                    .attr('width', innerW)
                    .attr('height', 6)
                    .attr('fill', i % 24 === 0 ? '#f5f5f4' : '#fafaf9')
                    .attr('opacity', 0.7);
            }
        }

        g.selectAll('.grid-line')
            .data(gridTicks)
            .enter()
            .append('line')
            .attr('class', 'grid-line')
            .attr('x1', 0)
            .attr('x2', innerW)
            .attr('y1', (d) => yScale(d))
            .attr('y2', (d) => yScale(d))
            .attr('stroke', lowNoise ? '#e7e5e4' : '#a8a29e')
            .attr('stroke-width', lowNoise ? 0.75 : 1)
            .attr('stroke-dasharray', lowNoise ? '0' : '2,2');

        if (!lowNoise) {
            g.append('rect')
                .attr('x', -4)
                .attr('y', -4)
                .attr('width', innerW + 8)
                .attr('height', innerH + 8)
                .attr('fill', 'none')
                .attr('stroke', '#d6d3d1')
                .attr('stroke-width', 2)
                .attr('rx', 3);
        }

        g.selectAll('.bar')
            .data(DATA)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => xScale(d.label)!)
            .attr('y', (d) => yScale(d.value))
            .attr('width', xScale.bandwidth())
            .attr('height', (d) => innerH - yScale(d.value))
            .attr('fill', '#059669')
            .attr('rx', 2);

        g.append('g')
            .attr('transform', `translate(0,${innerH})`)
            .call(d3.axisBottom(xScale).tickSize(0))
            .call((ax) => ax.select('.domain').attr('stroke', '#d6d3d1'))
            .selectAll('text')
            .style('font-size', '11px')
            .style('fill', '#78716c');

        g.append('g')
            .call(
                d3
                    .axisLeft(yScale)
                    .ticks(lowNoise ? 3 : 8)
                    .tickFormat((d) => `${d}`)
            )
            .call((ax) => ax.select('.domain').attr('stroke', '#d6d3d1'))
            .selectAll('text')
            .style('font-size', '11px')
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
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Miller's Law: working memory capacity
                    </p>
                    <MillerLawChart />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        Working memory saturates at 7±2 chunks. A chart with a complex legend, dense gridlines, multiple series, and several annotations can easily push viewers past this limit before they've read a single data value.
                    </p>
                </div>

                {/* Signal-to-noise framework */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        The signal-to-noise framework (Tufte, 1983)
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                            {
                                label: 'Data ink',
                                desc: 'Every pixel that directly encodes a data value. The bar height, line position, dot location. Maximize this.',
                                color: 'emerald' as const,
                                action: 'Keep and maximize',
                            },
                            {
                                label: 'Redundant ink',
                                desc: 'Repeated encodings of the same information: axis label + value label + grid for the same datum. Remove one.',
                                color: 'amber' as const,
                                action: 'Reduce where possible',
                            },
                            {
                                label: 'Non-data ink',
                                desc: 'Decorative borders, 3D surfaces, background patterns. These carry zero informational load. Eliminate entirely.',
                                color: 'red' as const,
                                action: 'Eliminate entirely',
                            },
                        ].map((item) => (
                            <div key={item.label} className={`rounded-xl border p-3.5 space-y-2 ${item.color === 'emerald' ? 'bg-emerald-50 border-emerald-200' : item.color === 'amber' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
                                <p className={`text-[12px] font-bold ${item.color === 'emerald' ? 'text-emerald-800' : item.color === 'amber' ? 'text-amber-800' : 'text-red-800'}`}>
                                    {item.label}
                                </p>
                                <p className={`text-[12px] leading-relaxed ${item.color === 'emerald' ? 'text-emerald-700' : item.color === 'amber' ? 'text-amber-700' : 'text-red-700'}`}>
                                    {item.desc}
                                </p>
                                <p className={`text-[10px] font-bold uppercase tracking-wider ${item.color === 'emerald' ? 'text-emerald-600' : item.color === 'amber' ? 'text-amber-600' : 'text-red-600'}`}>
                                    → {item.action}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data-ink comparison */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Comparing data-ink ratios (same data, different noise)
                    </p>
                    <DataInkComparisonChart />
                </div>

                {/* Manipulation application */}
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-5">
                    <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-3">
                        Manipulation application: deliberate cognitive overload
                    </p>
                    <p className="text-[13px] text-amber-800 leading-relaxed mb-3">
                        Deliberately increasing cognitive load is a manipulation technique. A chart overloaded with gridlines, 3D effects, decorative elements, and a busy legend forces the viewer to expend working memory on non-data processing — leaving less capacity for critical evaluation. This is why manipulated charts are often "busy": the busyness is the weapon.
                    </p>
                    <p className="text-[13px] text-amber-800 leading-relaxed">
                        When working memory is saturated, the viewer defaults to heuristic shortcuts: they accept the overall impression the chart creates rather than interrogating the underlying numbers. A manipulator who wants a viewer to accept a conclusion without scrutiny benefits from a chart that overwhelms critical analysis with visual complexity.
                    </p>
                </div>

                {/* Interactive demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                    <div className="relative">
                        <span className="absolute top-0 right-0 text-xs font-bold text-stone-300 select-none">1.2</span>

                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                            Live demo: gridline density vs. cognitive load
                        </p>
                        <p className="text-[13px] text-stone-500 mb-4">
                            Toggle between a traditional high-noise chart and a low-noise equivalent. Both encode the same 6 data values.
                        </p>

                        <div className="flex justify-center py-3 overflow-x-auto">
                            <svg
                                ref={svgRef}
                                width={W}
                                height={H}
                                viewBox={`0 0 ${W} ${H}`}
                                aria-label="Cognitive load demo: bar chart with gridline density toggle"
                            />
                        </div>

                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span className={`text-[13px] font-medium transition-colors ${!lowNoise ? 'text-stone-800' : 'text-stone-400'}`}>
                                Traditional (high noise)
                            </span>
                            <button
                                onClick={() => setLowNoise((v) => !v)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${lowNoise ? 'bg-brand' : 'bg-stone-200'}`}
                                aria-label="Toggle low noise mode"
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${lowNoise ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <span className={`text-[13px] font-medium transition-colors ${lowNoise ? 'text-stone-800' : 'text-stone-400'}`}>
                                Tufte (low noise)
                            </span>
                        </div>

                        <p className="text-center text-[12px] text-stone-400 mt-2">
                            {lowNoise
                                ? '3 gridlines — only what comprehension requires. Working memory is free to interpret data.'
                                : '12+ gridlines, background stripes, decorative border — each steals a working memory slot before a single value is read.'}
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
