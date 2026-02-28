import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import LessonPage from '../../../components/layout/LessonPage';

const crossRefs = [
    {
        sectionId: 'lab',
        slug: 'full-lab',
        label: 'Section 3.5 — Stack all 12 manipulation controls in the full lab',
    },
    {
        sectionId: 'ethics',
        slug: 'manipulation',
        label: 'Section 5.5 — Level 5: compound distortions weaponize trust',
    },
    {
        sectionId: 'simulator',
        slug: 'revenue',
        label: 'Section 4.1 — See how compound manipulation splits executive reactions',
    },
];

const DATA = [
    { label: 'Wk 1', value: 3.0 },
    { label: 'Wk 2', value: 3.05 },
    { label: 'Wk 3', value: 3.1 },
    { label: 'Wk 4', value: 3.08 },
    { label: 'Wk 5', value: 3.15 },
    { label: 'Wk 6', value: 3.18 },
    { label: 'Wk 7', value: 3.2 },
    { label: 'Wk 8', value: 3.22 },
];

// 3-period moving average
function movingAvg(data: typeof DATA, window: number) {
    return data.map((d, i) => {
        const start = Math.max(0, i - Math.floor(window / 2));
        const end = Math.min(data.length, start + window);
        const slice = data.slice(start, end);
        const avg = slice.reduce((s, x) => s + x.value, 0) / slice.length;
        return { label: d.label, value: avg };
    });
}

const HIGHLIGHT_INDEX = 7; // last bar

const MARGIN = { top: 24, right: 16, bottom: 32, left: 50 };
const W = 480;
const H = 220;

export default function EthicalAttentionLesson() {
    const [allManipulations, setAllManipulations] = useState(false);
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

        // Y-axis domain: truncated (60%) vs zero baseline
        const yMin = allManipulations ? 2.85 : 0;
        const yMax = 3.35;

        const xScale = d3
            .scaleBand()
            .domain(DATA.map((d) => d.label))
            .range([0, innerW])
            .padding(0.3);

        const yScale = d3.scaleLinear().domain([yMin, yMax]).range([innerH, 0]);

        // Gridlines: 12 if manipulated, 5 if clean
        const gridCount = allManipulations ? 12 : 5;
        const gridTicks = yScale.ticks(gridCount);

        g.selectAll('.grid-line')
            .data(gridTicks)
            .enter()
            .append('line')
            .attr('class', 'grid-line')
            .attr('x1', 0)
            .attr('x2', innerW)
            .attr('y1', (d) => yScale(d))
            .attr('y2', (d) => yScale(d))
            .attr('stroke', allManipulations ? '#a8a29e' : '#e7e5e4')
            .attr('stroke-width', allManipulations ? 1 : 0.75)
            .attr('stroke-dasharray', allManipulations ? '2,2' : '0');

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
            .attr('fill', (_d, i) =>
                allManipulations && i === HIGHLIGHT_INDEX ? '#dc2626' : '#3A7D5C'
            )
            .attr('rx', 2);

        // Dashed trendline (manipulated only)
        if (allManipulations) {
            const smoothed = movingAvg(DATA, 3);
            const lineGen = d3
                .line<{ label: string; value: number }>()
                .x((d) => xScale(d.label)! + xScale.bandwidth() / 2)
                .y((d) => yScale(d.value))
                .curve(d3.curveCatmullRom.alpha(0.5));

            g.append('path')
                .datum(smoothed)
                .attr('fill', 'none')
                .attr('stroke', '#f97316')
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', '5,3')
                .attr('d', lineGen);
        }

        // Misleading annotation (manipulated only)
        if (allManipulations) {
            const lastX = xScale(DATA[HIGHLIGHT_INDEX].label)! + xScale.bandwidth() / 2;
            const lastY = yScale(DATA[HIGHLIGHT_INDEX].value);

            g.append('line')
                .attr('x1', lastX)
                .attr('y1', lastY - 4)
                .attr('x2', lastX - 28)
                .attr('y2', lastY - 20)
                .attr('stroke', '#dc2626')
                .attr('stroke-width', 1)
                .attr('marker-end', 'url(#arrowhead)');

            g.append('text')
                .attr('x', lastX - 30)
                .attr('y', lastY - 24)
                .attr('text-anchor', 'end')
                .style('font-size', '10px')
                .style('font-weight', '700')
                .style('fill', '#dc2626')
                .text('Strong growth');
        }

        // Truncation label (manipulated only)
        if (allManipulations) {
            g.append('text')
                .attr('x', innerW / 2)
                .attr('y', innerH + 24)
                .attr('text-anchor', 'middle')
                .style('font-size', '10px')
                .style('fill', '#dc2626')
                .style('font-weight', '500')
                .text('axis truncated — starts at $2.85M');
        }

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
                    .ticks(allManipulations ? 6 : 4)
                    .tickFormat((d) => `$${Number(d).toFixed(2)}M`)
            )
            .call((ax) =>
                ax.select('.domain').attr('stroke', allManipulations ? '#dc2626' : '#d6d3d1')
            )
            .selectAll('text')
            .style('font-size', '11px')
            .style('fill', '#78716c');

        // Chart title (manipulated only — misleading framing)
        if (allManipulations) {
            svg
                .append('text')
                .attr('x', MARGIN.left)
                .attr('y', 14)
                .style('font-size', '11px')
                .style('font-weight', '700')
                .style('fill', '#dc2626')
                .text('Revenue explodes to record highs');
        }
    }, [allManipulations]);

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    All four biases — pre-attentive attention hijacking, cognitive load misdirection,
                    anchoring, and false pattern detection — can be stacked in a single chart. This is the
                    compound manipulation pattern that the Manipulation Lab will teach you to build, measure,
                    and detect.
                </p>

                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">The four-bias stack</p>
                    <div className="space-y-2">
                        {([
                            { num: '1', bias: 'Pre-attentive hijack', how: 'Color one bar red among grey bars', effect: 'Forces attention to a specific data point before conscious scanning begins' },
                            { num: '2', bias: 'Cognitive load attack', how: 'Add 12+ gridlines, background stripes, 3D perspective', effect: 'Saturates working memory, reducing available capacity for critical analysis' },
                            { num: '3', bias: 'Anchoring distortion', how: 'Truncate the y-axis to start at 85% of the minimum value', effect: 'Creates a false reference frame that magnifies differences by 5-10x' },
                            { num: '4', bias: 'False pattern induction', how: 'Apply a smoothing trendline to a flat or declining series', effect: 'The smoothed line imposes a narrative the raw data does not support' },
                        ] as const).map((item) => (
                            <div key={item.num} className="flex items-start gap-3 bg-white rounded-xl border border-stone-200 p-3.5">
                                <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{item.num}</span>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span className="text-[13px] font-bold text-stone-800">{item.bias}</span>
                                        <span className="text-[11px] text-stone-400 italic">{item.how}</span>
                                    </div>
                                    <p className="text-[12px] text-stone-500 leading-relaxed">{item.effect}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                    <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider mb-2">Interaction effect</p>
                    <p className="text-[13px] text-red-800 leading-relaxed">
                        When multiple biases are stacked, their effect is <strong>multiplicative</strong>, not additive. The pre-attentive hijack forces attention to the highlighted bar. The truncated axis makes that bar look dramatically tall. The cognitive load from gridlines prevents the viewer from stepping back to critically examine the axis. The trendline locks in a narrative. Each layer makes the others more effective — this is why compound manipulation is disproportionately powerful.
                    </p>
                </div>

                {/* Demo container */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                    <div className="relative">
                        {/* Lesson number badge */}
                        <span className="absolute top-0 right-0 text-xs font-bold text-stone-300 select-none">
                            1.5
                        </span>

                        <div className="flex justify-center py-3 overflow-x-auto">
                            <svg
                                ref={svgRef}
                                width={W}
                                height={H}
                                viewBox={`0 0 ${W} ${H}`}
                                aria-label="Compound manipulation demo: bar chart toggling between clean and manipulated state"
                            />
                        </div>

                        {/* Toggle */}
                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span
                                className={`text-[13px] font-medium transition-colors ${!allManipulations ? 'text-stone-800' : 'text-stone-400'
                                    }`}
                            >
                                Traditional approach
                            </span>

                            <button
                                onClick={() => setAllManipulations((v) => !v)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${allManipulations ? 'bg-emerald-600' : 'bg-stone-200'
                                    }`}
                                aria-label="Toggle all manipulations"
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${allManipulations ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>

                            <span
                                className={`text-[13px] font-medium transition-colors ${allManipulations ? 'text-stone-800' : 'text-stone-400'
                                    }`}
                            >
                                All manipulations
                            </span>
                        </div>

                        <p className="text-center text-[12px] text-stone-400 mt-2">
                            {allManipulations
                                ? 'Truncated axis + color emphasis + gridline overload + false trendline + misleading annotation — stacked'
                                : 'Zero baseline, no color emphasis, 5 gridlines — honest presentation of a modest 7% increase'}
                        </p>

                        {allManipulations && (
                            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                                <p className="text-[12px] text-red-700 font-medium leading-relaxed">
                                    Active manipulations: axis truncation (60%), pre-attentive color hijack,
                                    cognitive overload via gridlines, false smoothing trendline, misleading title
                                    framing. The actual week-over-week change is 0.6%.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
