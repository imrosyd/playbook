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

const MARGIN = { top: 16, right: 16, bottom: 32, left: 44 };
const W = 480;
const H = 220;

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

        // Gridlines
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

        // Truncation indicator
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
                .style('font-weight', '500')
                .text('axis starts at $2.8M — not zero');
        }

        // Bars
        g.selectAll('.bar')
            .data(DATA)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => xScale(d.label)!)
            .attr('y', (d) => yScale(d.value))
            .attr('width', xScale.bandwidth())
            .attr('height', (d) => innerH - yScale(d.value))
            .attr('fill', '#3A7D5C')
            .attr('rx', 2);

        // X Axis
        g.append('g')
            .attr('transform', `translate(0,${innerH})`)
            .call(d3.axisBottom(xScale).tickSize(0))
            .call((ax) => ax.select('.domain').attr('stroke', '#d6d3d1'))
            .selectAll('text')
            .style('font-size', '11px')
            .style('fill', '#78716c');

        // Y Axis
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
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    The first number you see becomes the anchor. Every subsequent judgment is a percentage
                    adjustment from that anchor. A truncated Y-axis creates a false anchor that makes small
                    changes look dramatic.
                </p>

                <div className="rounded-xl bg-stone-50 border border-stone-200 p-4">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">Tversky & Kahneman (1974) — the original anchoring study</p>
                    <p className="text-[13px] text-stone-600 leading-relaxed">
                        Participants spun a wheel rigged to stop at 10 or 65, then estimated the percentage of African nations in the UN. Those who saw 65 guessed significantly higher than those who saw 10 — even though they knew the number was random. Anchoring is not a reasoning failure. It is a fundamental feature of human cognition: we estimate by starting from a reference point and adjusting insufficiently.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        {
                            title: 'Axis truncation anchor',
                            desc: 'Setting the y-axis baseline to 75% of the minimum value anchors the viewer to a range that makes small absolute differences look proportionally large. A 5% change is visually encoded as a 300% change.',
                            example: 'Axis starts at $2.8M when data ranges $2.8M–$3.5M. The actual 16% range looks like a 100% swing.',
                            isRisk: true,
                        },
                        {
                            title: 'First impression anchor',
                            desc: 'A misleading chart title or annotation sets an anchor before the viewer examines the data. "Revenue Surges to Record High" primes a positive interpretation that resists correction.',
                            example: 'Research shows that people adjust 30–50% less from anchors than optimal Bayesian updating would require.',
                            isRisk: true,
                        },
                    ].map((item) => (
                        <div key={item.title} className="bg-white rounded-xl border border-red-200 p-4">
                            <p className="text-[13px] font-bold text-red-800 mb-2">{item.title}</p>
                            <p className="text-[12px] text-stone-600 leading-relaxed mb-2">{item.desc}</p>
                            <p className="text-[11px] text-red-600 bg-red-50 rounded-lg px-3 py-1.5">{item.example}</p>
                        </div>
                    ))}
                </div>

                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                    <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-2">Defence: how to resist anchoring</p>
                    <ul className="space-y-1.5">
                        {[
                            'Always check the y-axis baseline. If it does not start at zero, calculate the actual percentage difference before forming an opinion.',
                            'Before reading a chart title or annotation, scan the raw data values first to form an unanchored baseline impression.',
                            'Ask "what would this look like starting from zero?" — a habit that takes 10 seconds and catches most axis manipulation.',
                        ].map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-[12px] text-emerald-800">
                                <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] flex items-center justify-center font-bold">{i + 1}</span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Demo container */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                    <div className="relative">
                        {/* Lesson number badge */}
                        <span className="absolute top-0 right-0 text-xs font-bold text-stone-300 select-none">
                            1.3
                        </span>

                        <div className="flex justify-center py-3 overflow-x-auto">
                            <svg
                                ref={svgRef}
                                width={W}
                                height={H}
                                viewBox={`0 0 ${W} ${H}`}
                                aria-label="Anchoring bias demo: weekly sales bar chart with axis truncation toggle"
                            />
                        </div>

                        {/* Toggle */}
                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span
                                className={`text-[13px] font-medium transition-colors ${!truncated ? 'text-stone-800' : 'text-stone-400'
                                    }`}
                            >
                                Traditional approach
                            </span>

                            <button
                                onClick={() => setTruncated((v) => !v)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${truncated ? 'bg-emerald-600' : 'bg-stone-200'
                                    }`}
                                aria-label="Toggle axis truncation"
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${truncated ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>

                            <span
                                className={`text-[13px] font-medium transition-colors ${truncated ? 'text-stone-800' : 'text-stone-400'
                                    }`}
                            >
                                With truncation
                            </span>
                        </div>

                        <p className="text-center text-[12px] text-stone-400 mt-2">
                            {truncated
                                ? 'A 16% increase looks like a massive surge — the anchor is the lie'
                                : 'Zero baseline — the actual 16% increase is correctly visible'}
                        </p>
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
