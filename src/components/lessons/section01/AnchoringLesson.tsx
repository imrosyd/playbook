import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import LessonPage from '../../../components/layout/LessonPage';

const crossRefs = [
    {
        sectionId: 'lab',
        slug: 'axis-scale',
        label: 'Section 3.1 — Axis truncation >50% crosses into distortion',
    },
    {
        sectionId: 'ethics',
        slug: 'distortion',
        label: 'Section 5.4 — Axis truncation is objectively measurable distortion',
    },
];

const DATA = [
    { label: 'Wk 1', value: 3.0 },
    { label: 'Wk 2', value: 3.15 },
    { label: 'Wk 3', value: 3.1 },
    { label: 'Wk 4', value: 3.28 },
    { label: 'Wk 5', value: 3.22 },
    { label: 'Wk 6', value: 3.35 },
    { label: 'Wk 7', value: 3.3 },
    { label: 'Wk 8', value: 3.5 },
];

const MARGIN = { top: 16, right: 16, bottom: 40, left: 52 };
const W = 480;
const H = 220;

// Side-by-side comparison: truncated vs honest
function DualChartComparison() {
    const charts = [
        { label: 'Truncated axis (manipulated)', yMin: 2.8, yMax: 3.7, borderColor: '#dc2626', tagColor: '#dc2626', tagBg: '#fef2f2', tag: '⚠ Misleading' },
        { label: 'Zero baseline (honest)', yMin: 0, yMax: 4.0, borderColor: '#059669', tagColor: '#059669', tagBg: '#f0fdf4', tag: '✓ Honest' },
    ];

    return (
        <div className="grid grid-cols-2 gap-3">
            {charts.map((c) => {
                const w = 190, h = 120, pad = { l: 32, r: 8, t: 12, b: 24 };
                const bw = 16;
                const n = DATA.length;
                const innerW = w - pad.l - pad.r;
                const innerH = h - pad.t - pad.b;
                const xStep = innerW / (n + 1);

                return (
                    <div key={c.label} className="space-y-1">
                        <div
                            className="rounded-xl border p-3"
                            style={{ borderColor: c.borderColor + '66', backgroundColor: c.tagBg }}
                        >
                            <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
                                {/* Gridlines */}
                                {[0.25, 0.5, 0.75, 1].map(t => {
                                    const yV = c.yMin + t * (c.yMax - c.yMin);
                                    const yPx = pad.t + (1 - t) * innerH;
                                    return (
                                        <g key={t}>
                                            <line x1={pad.l} x2={w - pad.r} y1={yPx} y2={yPx}
                                                stroke="#f5f5f4" strokeWidth={1} />
                                            <text x={pad.l - 3} y={yPx + 4} fill="#a8a29e"
                                                fontSize={7} textAnchor="end">${yV.toFixed(1)}M</text>
                                        </g>
                                    );
                                })}
                                {/* Truncation warning */}
                                {c.yMin > 0 && (
                                    <text x={pad.l + innerW / 2} y={h - 4} fill="#dc2626"
                                        fontSize={6.5} textAnchor="middle" fontWeight={700}>
                                        axis starts at ${c.yMin}M — not zero!
                                    </text>
                                )}
                                {/* Bars */}
                                {DATA.map((d, i) => {
                                    const x = pad.l + (i + 1) * xStep - bw / 2;
                                    const yFrac = Math.max(0, (d.value - c.yMin) / (c.yMax - c.yMin));
                                    const barH = yFrac * innerH;
                                    const barY = pad.t + innerH - barH;
                                    return (
                                        <rect key={i} x={x} y={barY} width={bw} height={barH}
                                            fill={c.borderColor} rx={2} opacity={0.8} />
                                    );
                                })}
                            </svg>
                        </div>
                        <p className="text-[10px] font-bold text-center" style={{ color: c.tagColor }}>
                            {c.tag} — {c.label}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

// Anchoring bias magnitude chart
function AnchoringMagnitudeChart() {
    const scenarios = [
        { scenario: 'Price negotiation', anchorEffect: 73, color: '#dc2626' },
        { scenario: 'Legal sentencing', anchorEffect: 61, color: '#f97316' },
        { scenario: 'Salary discussion', anchorEffect: 68, color: '#f59e0b' },
        { scenario: 'Budget approval', anchorEffect: 55, color: '#f97316' },
        { scenario: 'Chart reading', anchorEffect: 82, color: '#dc2626' },
    ];
    const w = 340, h = 140, pad = { l: 110, r: 50, t: 14, b: 24 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const barH = 14;
    const gap = (innerH - scenarios.length * barH) / (scenarios.length + 1);

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
            {[0, 25, 50, 75, 100].map(v => (
                <g key={v}>
                    <line x1={pad.l + (v / 100) * innerW} x2={pad.l + (v / 100) * innerW}
                        y1={pad.t} y2={h - pad.b} stroke="#f5f5f4" strokeWidth={1} />
                    <text x={pad.l + (v / 100) * innerW} y={h - 6}
                        fill="#a8a29e" fontSize={7} textAnchor="middle">{v}%</text>
                </g>
            ))}
            {scenarios.map((s, i) => {
                const y = pad.t + gap + i * (barH + gap);
                const bw = (s.anchorEffect / 100) * innerW;
                return (
                    <g key={s.scenario}>
                        <text x={pad.l - 6} y={y + barH / 2 + 4}
                            fill="#78716c" fontSize={8} textAnchor="end">{s.scenario}</text>
                        <rect x={pad.l} y={y} width={bw} height={barH}
                            fill={s.color} rx={2} opacity={0.85} />
                        <text x={pad.l + bw + 4} y={y + barH / 2 + 4}
                            fill={s.color} fontSize={8} fontWeight={700}>{s.anchorEffect}%</text>
                    </g>
                );
            })}
            <text x={pad.l + innerW / 2} y={pad.t - 2}
                fill="#78716c" fontSize={7.5} textAnchor="middle">
                % of judgments anchored to initial reference value
            </text>
        </svg>
    );
}

export default function AnchoringLesson() {
    const [truncated, setTruncated] = useState(false);
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

        const yMin = truncated ? 2.8 : 0;
        const yMax = 3.7;

        const xScale = d3
            .scaleBand()
            .domain(DATA.map((d) => d.label))
            .range([0, innerW])
            .padding(0.3);

        const yScale = d3.scaleLinear().domain([yMin, yMax]).range([innerH, 0]);

        g.selectAll('.grid-line')
            .data(yScale.ticks(4))
            .enter()
            .append('line')
            .attr('class', 'grid-line')
            .attr('x1', 0)
            .attr('x2', innerW)
            .attr('y1', (d) => yScale(d))
            .attr('y2', (d) => yScale(d))
            .attr('stroke', '#e7e5e4')
            .attr('stroke-width', 0.75);

        if (truncated) {
            g.append('line')
                .attr('x1', 0)
                .attr('x2', innerW)
                .attr('y1', innerH)
                .attr('y2', innerH)
                .attr('stroke', '#dc2626')
                .attr('stroke-width', 1.5)
                .attr('stroke-dasharray', '4,3')
                .attr('opacity', 0.7);

            g.append('text')
                .attr('x', innerW / 2)
                .attr('y', innerH + 24)
                .attr('text-anchor', 'middle')
                .style('font-size', '10px')
                .style('fill', '#dc2626')
                .style('font-weight', '600')
                .text('⚠ axis starts at $2.8M — not zero');
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
                    .ticks(4)
                    .tickFormat((d) => `$${d}M`)
            )
            .call((ax) => ax.select('.domain').attr('stroke', truncated ? '#dc2626' : '#d6d3d1'))
            .selectAll('text')
            .style('font-size', '11px')
            .style('fill', '#78716c');
    }, [truncated]);

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">

                {/* Main explanation */}
                <div className="space-y-4">
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        Anchoring bias, documented by Amos Tversky and Daniel Kahneman in 1974, is one of the most robust and consequential cognitive biases in human judgment. The anchor is the <strong>first numerical reference point</strong> the mind encounters — and all subsequent estimates are made by adjusting from that reference. Crucially, people adjust <em>insufficiently</em>: the final estimate remains too close to the anchor, even when the anchor is known to be arbitrary or misleading.
                    </p>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        In data visualization, the primary anchoring mechanism is the <strong>y-axis baseline</strong>. When a bar chart's y-axis starts at zero, the bar height directly encodes the magnitude of the value — a bar twice as tall represents twice the value. But when the y-axis is truncated to start above zero, the pre-attentive system interprets bar heights using the displayed range as the anchor. A 4% gain over 8 weeks (from $3.0M to $3.5M) will appear visually identical to a 400% gain if the axis starts at $2.8M — because the visual height ratio matches a 400% change within the displayed range.
                    </p>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        Beyond axis truncation, anchoring operates through chart titles, annotations, and the order in which data is presented. A title like "Revenue Surges to Record High" sets a positive anchor before the viewer examines any data. A first slide in a presentation that shows the best quarter anchors the audience's expectations for all subsequent quarters. Understanding anchoring is essential both for creating honest charts and for critically evaluating charts you receive.
                    </p>
                </div>

                {/* Side-by-side comparison */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Same data — two very different anchors
                    </p>
                    <p className="text-[13px] text-stone-500 leading-relaxed">
                        The data is identical: weekly revenue from $3.0M to $3.5M — a 16.7% increase over 8 weeks.
                    </p>
                    <DualChartComparison />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        The truncated chart (left) makes a 16.7% increase look like a near-doubling. The honest chart (right) shows the true magnitude. You are looking at the same numbers — only the anchor differs.
                    </p>
                </div>

                {/* Anchoring magnitude chart */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Anchoring effect magnitude by decision context
                    </p>
                    <AnchoringMagnitudeChart />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        Chart reading produces the highest anchoring effect (82%) because the visual encoding creates an extremely strong perceptual anchor — even experienced analysts are significantly influenced by axis baseline choices.
                    </p>
                </div>

                {/* Research note */}
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-5">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                        Tversky & Kahneman (1974) — the original anchoring study
                    </p>
                    <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
                        Participants spun a wheel rigged to stop at 10 or 65, then estimated the percentage of African nations in the UN. Those who saw 65 guessed an average of 45% — those who saw 10 guessed 25%. A meaningless, random number shifted final estimates by 20 percentage points. Subsequent replications have consistently shown anchoring effects across salary negotiations, legal sentencing, real estate valuation, and financial forecasting.
                    </p>
                    <p className="text-[13px] text-stone-600 leading-relaxed">
                        The mechanism is insufficiency of adjustment: people generate an estimate by starting from the anchor and adjusting toward plausibility, but they stop adjusting too early. Nudging the anchor higher or lower reliably nudges the final estimate in the same direction — which is exactly why y-axis baseline manipulation is so effective.
                    </p>
                </div>

                {/* Anchoring types */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        How anchoring is implemented in charts
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            {
                                title: 'Axis truncation anchor',
                                desc: 'Setting the y-axis baseline to 75–90% of the minimum value anchors the viewer to a range where small absolute differences are encoded as large proportional differences.',
                                example: 'Axis starts at $2.8M when data ranges $2.8M–$3.5M. The actual 16% range is visually encoded as a 100% swing.',
                            },
                            {
                                title: 'First impression anchor (title/annotation)',
                                desc: 'A chart title or annotation sets an interpretive frame before the viewer examines data. "Revenue Surges to Record High" primes positive expectations that resist correction from the numbers.',
                                example: '"Adjusted for seasonality" in a footnote anchors the viewer to an adjusted version of the data without disclosing what was adjusted.',
                            },
                            {
                                title: 'Comparison period anchor',
                                desc: 'Choosing a historically unusual comparison period makes current performance look stronger. "Up 40% from COVID low" anchors to an artificially depressed baseline.',
                                example: 'Q1 2021 vs Q1 2020 comparison anchors to the worst quarter in recent history as the baseline.',
                            },
                            {
                                title: 'First-slide anchor',
                                desc: 'In a sequential deck, whatever is shown first sets the anchor for everything that follows. A strategic presenter shows the best metric on slide 1.',
                                example: 'Presenting the highest-performing region first anchors the audience\'s expectations — all other regions are then judged relative to that peak.',
                            },
                        ].map((item) => (
                            <div key={item.title} className="bg-white rounded-xl border border-red-200 p-4 space-y-2">
                                <p className="text-[13px] font-bold text-stone-800">{item.title}</p>
                                <p className="text-[12px] text-stone-600 leading-relaxed">{item.desc}</p>
                                <p className="text-[11px] text-red-700 bg-red-50 rounded-lg px-3 py-1.5 leading-relaxed italic">
                                    Example: {item.example}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Defense */}
                <div className="rounded-xl bg-brand-muted border border-brand/30 p-5">
                    <p className="text-[11px] font-bold text-brand uppercase tracking-wider mb-3">
                        Defense: how to resist anchoring bias
                    </p>
                    <ul className="space-y-2">
                        {[
                            'Before reading a chart, check the y-axis baseline. If it does not start at zero, calculate the actual percentage difference between the min and max values before forming any opinion.',
                            'Ask yourself: "What would this chart look like starting from zero?" This 10-second mental exercise catches most axis manipulation.',
                            'Request the raw numbers alongside any chart. Calculate the ratio yourself: last_value / first_value. Compare this to the visual height ratio.',
                            'Be especially skeptical of "comparison period" anchors. Always ask what baseline is being used and why — and request a longer-term historical view.',
                        ].map((tip, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-[13px] text-stone-700">
                                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-brand text-white text-[10px] flex items-center justify-center font-bold">
                                    {i + 1}
                                </span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Interactive demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                    <div className="relative">
                        <span className="absolute top-0 right-0 text-xs font-bold text-stone-300 select-none">1.3</span>
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                            Live demo: axis baseline anchor
                        </p>
                        <p className="text-[13px] text-stone-500 mb-4">
                            Toggle the y-axis baseline to see how the starting point entirely changes the perceived magnitude of a 16.7% revenue growth.
                        </p>

                        <div className="flex justify-center py-3 overflow-x-auto">
                            <svg
                                ref={svgRef}
                                width={W}
                                height={H}
                                viewBox={`0 0 ${W} ${H}`}
                                aria-label="Anchoring bias demo: weekly sales bar chart with axis truncation toggle"
                            />
                        </div>

                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span className={`text-[13px] font-medium transition-colors ${!truncated ? 'text-stone-800' : 'text-stone-400'}`}>
                                Zero baseline (honest)
                            </span>
                            <button
                                onClick={() => setTruncated((v) => !v)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${truncated ? 'bg-red-500' : 'bg-stone-200'}`}
                                aria-label="Toggle axis truncation"
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${truncated ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <span className={`text-[13px] font-medium transition-colors ${truncated ? 'text-stone-800' : 'text-stone-400'}`}>
                                Truncated axis ($2.8M)
                            </span>
                        </div>

                        <p className="text-center text-[12px] text-stone-400 mt-2">
                            {truncated
                                ? 'A 16.7% increase appears as a near-doubling — the $2.8M anchor creates a false visual ratio'
                                : 'Zero baseline — the actual 16.7% increase is correctly visible as a modest, steady gain'}
                        </p>
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
