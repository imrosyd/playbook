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

        // Background stripes (traditional/noisy only)
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

        // Gridlines
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

        // Decorative border (traditional only)
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
                    .ticks(lowNoise ? 3 : 8)
                    .tickFormat((d) => `${d}`)
            )
            .call((ax) => ax.select('.domain').attr('stroke', '#d6d3d1'))
            .selectAll('text')
            .style('font-size', '11px')
            .style('fill', '#78716c');

        svg.select('.domain').attr('stroke', '#d6d3d1');
    }, [lowNoise]);

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Working memory can hold 7±2 chunks at once. Every unnecessary visual element — redundant
                    gridlines, decorative borders, 3D effects — consumes one of those slots. When cognitive
                    load maxes out, comprehension collapses.
                </p>

                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">The signal-to-noise framework</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                            { label: 'Data ink', desc: 'Every pixel that encodes actual data values. Maximize this.', color: 'emerald' as const },
                            { label: 'Redundant ink', desc: 'Repeated encodings (axis label + grid + value label for the same datum). Remove.', color: 'amber' as const },
                            { label: 'Non-data ink', desc: 'Decorative borders, 3D surfaces, background patterns. Eliminate entirely.', color: 'red' as const },
                        ].map((item) => (
                            <div key={item.label} className={`rounded-xl border p-3.5 ${item.color === 'emerald' ? 'bg-emerald-50 border-emerald-200' : item.color === 'amber' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
                                <p className={`text-[12px] font-bold mb-1 ${item.color === 'emerald' ? 'text-emerald-800' : item.color === 'amber' ? 'text-amber-800' : 'text-red-800'}`}>{item.label}</p>
                                <p className={`text-[12px] leading-relaxed ${item.color === 'emerald' ? 'text-emerald-700' : item.color === 'amber' ? 'text-amber-700' : 'text-red-700'}`}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl bg-stone-50 border border-stone-200 p-4">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">Edward Tufte's data-ink ratio</p>
                    <p className="text-[13px] text-stone-600 leading-relaxed">
                        Tufte (1983) defined the data-ink ratio as the proportion of a chart's ink devoted to non-redundant display of data information. The principle: <strong>erase non-data ink</strong>. Every gridline, tick, border, and background element that can be removed without losing information should be removed. A chart with 3 horizontal gridlines communicates identically to one with 12 — but loads the reader's working memory with 9 fewer objects to process.
                    </p>
                </div>

                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                    <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-2">Manipulation application</p>
                    <p className="text-[13px] text-amber-800 leading-relaxed">
                        Deliberately increasing cognitive load is a manipulation technique. A chart overloaded with gridlines, 3D effects, and decorative elements forces the viewer to expend working memory on non-data processing — leaving less capacity for critical evaluation. This is why manipulated charts are often "busy": the busyness is the weapon.
                    </p>
                </div>

                {/* Demo container */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                    <div className="relative">
                        {/* Lesson number badge */}
                        <span className="absolute top-0 right-0 text-xs font-bold text-stone-300 select-none">
                            1.2
                        </span>

                        <div className="flex justify-center py-3 overflow-x-auto">
                            <svg
                                ref={svgRef}
                                width={W}
                                height={H}
                                viewBox={`0 0 ${W} ${H}`}
                                aria-label="Cognitive load demo: bar chart with gridline density toggle"
                            />
                        </div>

                        {/* Toggle */}
                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span
                                className={`text-[13px] font-medium transition-colors ${!lowNoise ? 'text-stone-800' : 'text-stone-400'
                                    }`}
                            >
                                Traditional approach
                            </span>

                            <button
                                onClick={() => setLowNoise((v) => !v)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${lowNoise ? 'bg-emerald-600' : 'bg-stone-200'
                                    }`}
                                aria-label="Toggle low noise mode"
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${lowNoise ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>

                            <span
                                className={`text-[13px] font-medium transition-colors ${lowNoise ? 'text-stone-800' : 'text-stone-400'
                                    }`}
                            >
                                Low noise
                            </span>
                        </div>

                        <p className="text-center text-[12px] text-stone-400 mt-2">
                            {lowNoise
                                ? '3 gridlines — only what comprehension requires'
                                : '12+ gridlines, background stripes, decorative borders — each steals a working memory slot'}
                        </p>
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
