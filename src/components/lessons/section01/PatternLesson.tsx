import { useRef, useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';
import LessonPage from '../../../components/layout/LessonPage';

const crossRefs = [
    {
        sectionId: 'lab',
        slug: 'data-transform',
        label: 'Section 3.2 — Smoothing can impose false trends on noisy data',
    },
    {
        sectionId: 'ethics',
        slug: 'framing',
        label: 'Section 5.3 — Smoothing is a framing decision that needs disclosure',
    },
];

// Seeded pseudo-random noise so the chart is deterministic
function seededRand(seed: number) {
    let s = seed;
    return () => {
        s = (s * 16807 + 0) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

const FLAT_MEAN = 50;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function buildData() {
    const rand = seededRand(42);
    return MONTHS.map((label) => ({
        label,
        value: FLAT_MEAN + (rand() - 0.5) * 2 * FLAT_MEAN * 0.2,
    }));
}

function movingAverage(data: { label: string; value: number }[], window: number) {
    return data.map((d, i) => {
        const start = Math.max(0, i - Math.floor(window / 2));
        const end = Math.min(data.length, start + window);
        const slice = data.slice(start, end);
        const avg = slice.reduce((sum, x) => sum + x.value, 0) / slice.length;
        return { label: d.label, value: avg };
    });
}

const MARGIN = { top: 16, right: 16, bottom: 32, left: 44 };
const W = 480;
const H = 220;

export default function PatternLesson() {
    const [withSmoothing, setWithSmoothing] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null);

    const rawData = useMemo(() => buildData(), []);
    const smoothedData = useMemo(() => movingAverage(rawData, 3), [rawData]);

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
            .scalePoint()
            .domain(MONTHS)
            .range([0, innerW])
            .padding(0.1);

        const allValues = rawData.map((d) => d.value);
        const yMin = Math.min(...allValues) - 3;
        const yMax = Math.max(...allValues) + 3;

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

        // Raw line
        const lineGen = d3
            .line<{ label: string; value: number }>()
            .x((d) => xScale(d.label)!)
            .y((d) => yScale(d.value))
            .curve(d3.curveLinear);

        g.append('path')
            .datum(rawData)
            .attr('fill', 'none')
            .attr('stroke', '#3A7D5C')
            .attr('stroke-width', 2)
            .attr('d', lineGen);

        // Raw dots
        g.selectAll('.dot')
            .data(rawData)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', (d) => xScale(d.label)!)
            .attr('cy', (d) => yScale(d.value))
            .attr('r', 3)
            .attr('fill', '#3A7D5C');

        // Smoothed overlay
        if (withSmoothing) {
            const smoothGen = d3
                .line<{ label: string; value: number }>()
                .x((d) => xScale(d.label)!)
                .y((d) => yScale(d.value))
                .curve(d3.curveCatmullRom.alpha(0.5));

            g.append('path')
                .datum(smoothedData)
                .attr('fill', 'none')
                .attr('stroke', '#dc2626')
                .attr('stroke-width', 2.5)
                .attr('stroke-dasharray', '5,3')
                .attr('d', smoothGen);

            // Legend
            g.append('line')
                .attr('x1', 8)
                .attr('y1', 8)
                .attr('x2', 26)
                .attr('y2', 8)
                .attr('stroke', '#dc2626')
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', '5,3');

            g.append('text')
                .attr('x', 30)
                .attr('y', 12)
                .style('font-size', '10px')
                .style('fill', '#dc2626')
                .text('3-period moving avg');
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
            .call(d3.axisLeft(yScale).ticks(4).tickFormat((d) => `${Math.round(Number(d))}`))
            .call((ax) => ax.select('.domain').attr('stroke', '#d6d3d1'))
            .selectAll('text')
            .style('font-size', '11px')
            .style('fill', '#78716c');
    }, [withSmoothing, rawData, smoothedData]);

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    The human brain finds patterns in pure noise. This is called apophenia, and it's not a
                    bug — it's a feature of survival. But it means a single noisy data series will appear to
                    show a trend that isn't real.
                </p>

                <div className="rounded-xl bg-stone-50 border border-stone-200 p-4">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">Why the brain does this</p>
                    <p className="text-[13px] text-stone-600 leading-relaxed">
                        Pattern recognition is the foundation of human predictive reasoning. Identifying a trend — "fruit appears here every morning" — confers survival advantage even if the pattern is occasionally false. The cognitive cost of a false positive (acting on a non-existent pattern) is much lower than a false negative (missing a real trend). This asymmetry hardwires us to over-detect patterns, especially in time-series data where narrative coherence matters.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        {
                            technique: 'Moving average smoothing',
                            mechanism: 'Replaces each data point with the average of surrounding points. Mathematically valid for noise reduction — but can also manufacture a visible trend from a flat signal.',
                            detection: 'Smoothed lines that don\'t show the underlying raw data are a red flag. Always ask: "What does the raw series look like?"',
                        },
                        {
                            technique: 'Selective time window',
                            mechanism: 'Choosing start and end dates that capture a favorable segment of a longer series. The segment may show genuine growth while the full series shows flat or declining performance.',
                            detection: 'Request the full historical series. Ask why the shown window begins and ends when it does.',
                        },
                    ].map((item) => (
                        <div key={item.technique} className="bg-white rounded-xl border border-stone-200 p-4">
                            <p className="text-[13px] font-bold text-stone-800 mb-1.5">{item.technique}</p>
                            <p className="text-[12px] text-stone-600 leading-relaxed mb-2">{item.mechanism}</p>
                            <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2">
                                <p className="text-[11px] font-semibold text-emerald-700 mb-0.5">Detection</p>
                                <p className="text-[11px] text-emerald-800 leading-relaxed">{item.detection}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Demo container */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                    <div className="relative">
                        {/* Lesson number badge */}
                        <span className="absolute top-0 right-0 text-xs font-bold text-stone-300 select-none">
                            1.4
                        </span>

                        <div className="flex justify-center py-3 overflow-x-auto">
                            <svg
                                ref={svgRef}
                                width={W}
                                height={H}
                                viewBox={`0 0 ${W} ${H}`}
                                aria-label="Pattern recognition demo: noisy flat line with optional smoothing overlay"
                            />
                        </div>

                        {/* Toggle */}
                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span
                                className={`text-[13px] font-medium transition-colors ${!withSmoothing ? 'text-stone-800' : 'text-stone-400'
                                    }`}
                            >
                                Traditional approach
                            </span>

                            <button
                                onClick={() => setWithSmoothing((v) => !v)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${withSmoothing ? 'bg-emerald-600' : 'bg-stone-200'
                                    }`}
                                aria-label="Toggle smoothing overlay"
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${withSmoothing ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>

                            <span
                                className={`text-[13px] font-medium transition-colors ${withSmoothing ? 'text-stone-800' : 'text-stone-400'
                                    }`}
                            >
                                With smoothing
                            </span>
                        </div>

                        <p className="text-center text-[12px] text-stone-400 mt-2">
                            {withSmoothing
                                ? 'The moving average "reveals" a trend — but the underlying data is flat noise'
                                : 'Pure noise around a flat mean — yet the brain wants to see a pattern'}
                        </p>
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
