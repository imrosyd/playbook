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

// Window size effect chart: shows how smoothing window changes perception
function SmoothingWindowChart() {
    const rawData = useMemo(() => buildData(), []);
    const [window3, setWindow3] = useState(true);
    const windows = window3 ? [3] : [7];
    const w = 320, h = 140;
    const pad = { l: 36, r: 16, t: 20, b: 30 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const allVals = rawData.map(d => d.value);
    const yMin = Math.min(...allVals) - 2;
    const yMax = Math.max(...allVals) + 2;
    const xStep = innerW / (MONTHS.length - 1);
    const toX = (i: number) => pad.l + i * xStep;
    const toY = (v: number) => pad.t + (1 - (v - yMin) / (yMax - yMin)) * innerH;

    const smoothedByWindow = windows.map(w3 => movingAverage(rawData, w3));
    const colors = ['#dc2626', '#7c3aed'];

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                {[3, 7].map(wn => (
                    <button key={wn} onClick={() => setWindow3(wn === 3)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-semibold border transition-all ${(wn === 3) === window3
                            ? 'bg-brand text-white border-brand'
                            : 'bg-white text-stone-500 border-stone-200'}`}>
                        {wn}-period MA
                    </button>
                ))}
            </div>
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
                {/* Gridlines */}
                {[yMin, (yMin + yMax) / 2, yMax].map(v => (
                    <line key={v} x1={pad.l} x2={w - pad.r}
                        y1={toY(v)} y2={toY(v)} stroke="#f5f5f4" strokeWidth={1} />
                ))}
                {/* True mean line */}
                <line x1={pad.l} x2={w - pad.r}
                    y1={toY(FLAT_MEAN)} y2={toY(FLAT_MEAN)}
                    stroke="#059669" strokeWidth={1.5} strokeDasharray="6,4" opacity={0.6} />
                <text x={pad.l + 4} y={toY(FLAT_MEAN) - 4} fill="#059669" fontSize={8}>
                    True mean (50)
                </text>
                {/* Raw line */}
                {rawData.map((d, i) => i > 0 && (
                    <line key={i}
                        x1={toX(i - 1)} y1={toY(rawData[i - 1].value)}
                        x2={toX(i)} y2={toY(d.value)}
                        stroke="#a8a29e" strokeWidth={1} opacity={0.5} />
                ))}
                {/* Smoothed line */}
                {smoothedByWindow.map((sd, wi) =>
                    sd.map((d, i) => i > 0 && (
                        <line key={`${wi}-${i}`}
                            x1={toX(i - 1)} y1={toY(sd[i - 1].value)}
                            x2={toX(i)} y2={toY(d.value)}
                            stroke={colors[wi]} strokeWidth={2.5} />
                    ))
                )}
                {/* X axis labels */}
                {MONTHS.map((m, i) => (
                    <text key={m} x={toX(i)} y={h - 4} fill="#a8a29e" fontSize={7} textAnchor="middle">
                        {m.slice(0, 1)}
                    </text>
                ))}
            </svg>
            <p className="text-[11px] text-stone-400 leading-relaxed">
                Grey = raw data (flat noise). Colored = moving average overlay.
                {window3
                    ? ' A 3-period MA already creates apparent trends from pure noise.'
                    : ' A 7-period MA produces an even smoother curve — making randomness look like a discovered pattern.'}
            </p>
        </div>
    );
}

// Apophenia demo: random walk that looks like trends
function ApopheniaDemo() {
    const [seed, setSeed] = useState(42);
    const data = useMemo(() => {
        const rand = seededRand(seed);
        let v = 50;
        return MONTHS.map((label) => {
            v = v + (rand() - 0.5) * 10;
            return { label, value: Math.max(30, Math.min(80, v)) };
        });
    }, [seed]);

    const w = 300, h = 120, pad = { l: 36, r: 16, t: 16, b: 28 };
    const allV = data.map(d => d.value);
    const yMin = Math.min(...allV) - 3;
    const yMax = Math.max(...allV) + 3;
    const xStep = (w - pad.l - pad.r) / (data.length - 1);
    const toX = (i: number) => pad.l + i * xStep;
    const toY = (v: number) => pad.t + (1 - (v - yMin) / (yMax - yMin)) * (h - pad.t - pad.b);

    // Linear regression
    const n = data.length;
    const xs = data.map((_, i) => i);
    const ys = data.map(d => d.value);
    const meanX = xs.reduce((a, b) => a + b, 0) / n;
    const meanY = ys.reduce((a, b) => a + b, 0) / n;
    const slope = xs.reduce((s, x, i) => s + (x - meanX) * (ys[i] - meanY), 0) /
        xs.reduce((s, x) => s + (x - meanX) ** 2, 0);
    const intercept = meanY - slope * meanX;
    const increasing = slope > 0;

    return (
        <div className="space-y-3">
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
                {[yMin, meanY, yMax].map(v => (
                    <line key={v} x1={pad.l} x2={w - pad.r}
                        y1={toY(v)} y2={toY(v)} stroke="#f5f5f4" strokeWidth={1} />
                ))}
                {data.map((d, i) => i > 0 && (
                    <line key={i}
                        x1={toX(i - 1)} y1={toY(data[i - 1].value)}
                        x2={toX(i)} y2={toY(d.value)}
                        stroke="#059669" strokeWidth={2} />
                ))}
                {/* Trend line */}
                <line
                    x1={toX(0)} y1={toY(intercept + slope * 0)}
                    x2={toX(n - 1)} y2={toY(intercept + slope * (n - 1))}
                    stroke="#dc2626" strokeWidth={1.5} strokeDasharray="5,3" opacity={0.8} />
                {data.map((d, i) => (
                    <circle key={i} cx={toX(i)} cy={toY(d.value)} r={3} fill="#059669" />
                ))}
                {MONTHS.map((m, i) => (
                    <text key={m} x={toX(i)} y={h - 4} fill="#a8a29e" fontSize={7} textAnchor="middle">
                        {m.slice(0, 1)}
                    </text>
                ))}
            </svg>
            <div className="flex items-center justify-between">
                <p className={`text-[12px] font-semibold ${increasing ? 'text-brand' : 'text-red-600'}`}>
                    Brain sees: {increasing ? '↑ upward trend' : '↓ downward trend'}
                </p>
                <p className="text-[11px] text-stone-400">Reality: random walk</p>
            </div>
            <button
                onClick={() => setSeed(s => (s * 7 + 13) % 1000)}
                className="w-full py-1.5 rounded-lg border border-stone-200 text-[11px] text-stone-500 hover:border-stone-400 transition-colors"
            >
                Regenerate random data →
            </button>
            <p className="text-[11px] text-stone-400 leading-relaxed">
                Each click generates a new random walk. The red trendline is mathematically fitted — but the underlying data has no trend. Notice how compelling the "trend story" is regardless of the direction.
            </p>
        </div>
    );
}

export default function SpottingTheSignalLesson() {
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

        const lineGen = d3
            .line<{ label: string; value: number }>()
            .x((d) => xScale(d.label)!)
            .y((d) => yScale(d.value))
            .curve(d3.curveLinear);

        g.append('path')
            .datum(rawData)
            .attr('fill', 'none')
            .attr('stroke', '#059669')
            .attr('stroke-width', 2)
            .attr('d', lineGen);

        g.selectAll('.dot')
            .data(rawData)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', (d) => xScale(d.label)!)
            .attr('cy', (d) => yScale(d.value))
            .attr('r', 3)
            .attr('fill', '#059669');

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

        g.append('g')
            .attr('transform', `translate(0,${innerH})`)
            .call(d3.axisBottom(xScale).tickSize(0))
            .call((ax) => ax.select('.domain').attr('stroke', '#d6d3d1'))
            .selectAll('text')
            .style('font-size', '11px')
            .style('fill', '#78716c');

        g.append('g')
            .call(d3.axisLeft(yScale).ticks(4).tickFormat((d) => `${Math.round(Number(d))}`))
            .call((ax) => ax.select('.domain').attr('stroke', '#d6d3d1'))
            .selectAll('text')
            .style('font-size', '11px')
            .style('fill', '#78716c');
    }, [withSmoothing, rawData, smoothedData]);

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">

                {/* Main explanation */}
                <div className="space-y-4">
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        The human brain is a pattern-detection engine. This capacity — called <strong>apophenia</strong> — is not a flaw but an evolutionary adaptation: detecting a pattern (even a false one) is far less costly than missing a real one. As a result, the visual system imposes narrative structure on any time-series data, regardless of whether a genuine trend exists. Random noise will appear to "show something" to the untrained eye, especially when the data is presented without baseline context or statistical reference lines.
                    </p>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        In charts, this vulnerability manifests in two ways. First, moving average smoothing removes variance from the data, producing a curve that looks like a discovered trend but was mathematically manufactured. Second, selective time-window framing allows a presenter to choose a segment of a longer series that shows favorable movement, presenting it without the surrounding context that would reveal the overall flat or declining pattern. Both techniques exploit the brain's automatic tendency to connect visible dots into a meaningful story.
                    </p>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        The critical defense is <strong>statistical skepticism</strong>: always ask whether a visible trend would survive a simple significance test, whether the smoothing window is disclosed, and whether the full data series has been shown. A trend that disappears when the y-axis is extended to zero, or when the time window is widened to include the prior year, is not a trend — it is a framing artifact.
                    </p>
                </div>

                {/* Apophenia demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                        Apophenia in action: the brain finds trends in random data
                    </p>
                    <p className="text-[13px] text-stone-500 leading-relaxed">
                        The chart below is a pure random walk — each month's value is the previous month plus a random amount. There is no underlying trend. Yet a fitted trendline almost always looks compelling and "real."
                    </p>
                    <ApopheniaDemo />
                </div>

                {/* Manipulation techniques */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Techniques that exploit pattern recognition
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            {
                                technique: 'Moving average smoothing',
                                mechanism: 'Replaces each data point with the average of surrounding points. Mathematically valid for noise reduction — but also manufactures a visible trend from a flat signal. The window size controls how much "trend" appears.',
                                detection: 'Smoothed lines that don\'t show the underlying raw data are a red flag. Always ask: "What does the raw series look like?"',
                                severity: 'Medium',
                            },
                            {
                                technique: 'Selective time window',
                                mechanism: 'Choosing start and end dates that capture a favorable segment of a longer series. The segment may show genuine growth while the full series shows flat or declining performance.',
                                detection: 'Request the full historical series. Ask why the shown window begins and ends when it does.',
                                severity: 'High',
                            },
                            {
                                technique: 'Spline interpolation',
                                mechanism: 'Using a smooth curve interpolation (e.g., Catmull-Rom spline) instead of straight lines between data points. Creates the visual impression of a smoother, more predictable series.',
                                detection: 'A smooth curve through discrete monthly data is mathematically misleading — values between data points are invented, not measured.',
                                severity: 'Medium',
                            },
                            {
                                technique: 'Trendline without R²',
                                mechanism: 'Overlaying a linear regression trendline without disclosing the coefficient of determination (R²). An R² of 0.08 means the trend explains only 8% of variance — statistically meaningless.',
                                detection: 'Always check the R² of any displayed trendline. An R² below 0.3 indicates the trend line explains very little of the data\'s variation.',
                                severity: 'High',
                            },
                        ].map((item) => (
                            <div key={item.technique} className="bg-white rounded-xl border border-stone-200 p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-[13px] font-bold text-stone-800">{item.technique}</p>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.severity === 'High'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-amber-100 text-amber-700'}`}>
                                        {item.severity} risk
                                    </span>
                                </div>
                                <p className="text-[12px] text-stone-600 leading-relaxed">{item.mechanism}</p>
                                <div className="rounded-lg bg-brand-muted border border-brand/30 px-3 py-2">
                                    <p className="text-[11px] font-semibold text-brand mb-0.5">Detection</p>
                                    <p className="text-[11px] text-stone-700 leading-relaxed">{item.detection}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Smoothing window comparison */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        How smoothing window size alters perceived trend
                    </p>
                    <p className="text-[13px] text-stone-500 leading-relaxed">
                        Switch between 3-period and 7-period moving averages applied to the same flat random data.
                    </p>
                    <SmoothingWindowChart />
                </div>

                {/* Interactive demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                    <div className="relative">
                        <span className="absolute top-0 right-0 text-xs font-bold text-stone-300 select-none">1.4</span>
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                            Live demo: flat noise vs. smoothed overlay
                        </p>
                        <p className="text-[13px] text-stone-500 mb-4">
                            The green line is random noise around a flat mean. Toggle the smoothed overlay to see how a moving average manufactures apparent trend.
                        </p>

                        <div className="flex justify-center py-3 overflow-x-auto">
                            <svg className="w-full max-w-2xl mx-auto block"
                                ref={svgRef}
                                width={W}
                                height={H}
                                viewBox={`0 0 ${W} ${H}`}
                                aria-label="Pattern recognition demo: noisy flat line with optional smoothing overlay"
                            />
                        </div>

                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span className={`text-[13px] font-medium transition-colors ${!withSmoothing ? 'text-stone-800' : 'text-stone-400'}`}>
                                Raw data (flat noise)
                            </span>
                            <button
                                onClick={() => setWithSmoothing((v) => !v)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${withSmoothing ? 'bg-brand' : 'bg-stone-200'}`}
                                aria-label="Toggle smoothing overlay"
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${withSmoothing ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <span className={`text-[13px] font-medium transition-colors ${withSmoothing ? 'text-stone-800' : 'text-stone-400'}`}>
                                3-period moving average
                            </span>
                        </div>

                        <p className="text-center text-[12px] text-stone-400 mt-2">
                            {withSmoothing
                                ? 'The moving average "reveals" a trend — but the underlying data is flat noise around a mean of 50'
                                : 'Pure noise around a flat mean of 50 — yet the brain automatically tries to construct a narrative from the jagged line'}
                        </p>
                    </div>
                </div>

                {/* Research note */}
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-5">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">Research basis</p>
                    <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
                        Klaus Conrad coined the term "apophenia" in 1958 to describe the spontaneous perception of connections and meaningfulness in unrelated things. In the context of data visualization, Uri Simonsohn's 2011 "False-Positive Psychology" demonstrated how easily real-seeming results can be extracted from random data using flexible analytical choices — including smoothing windows and time period selection.
                    </p>
                    <p className="text-[13px] text-stone-600 leading-relaxed">
                        The practical implication: any chart showing a trend should disclose whether smoothing was applied, what window size was used, whether the full historical series is shown, and the R² of any fitted trendline. Without these disclosures, the viewer cannot distinguish a genuine trend from an analytically manufactured one.
                    </p>
                </div>
            </div>
        </LessonPage>
    );
}
