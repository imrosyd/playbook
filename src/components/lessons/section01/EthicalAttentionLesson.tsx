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

function movingAvg(data: typeof DATA, window: number) {
    return data.map((d, i) => {
        const start = Math.max(0, i - Math.floor(window / 2));
        const end = Math.min(data.length, start + window);
        const slice = data.slice(start, end);
        const avg = slice.reduce((s, x) => s + x.value, 0) / slice.length;
        return { label: d.label, value: avg };
    });
}

const HIGHLIGHT_INDEX = 7;
const MARGIN = { top: 24, right: 16, bottom: 40, left: 50 };
const W = 480;
const H = 220;

// Bias interaction multiplicative chart
function BiasInteractionChart() {
    const biases = [
        { label: 'Anchoring alone', multiplier: 2.4, color: '#f97316' },
        { label: '+ Color hijack', multiplier: 4.1, color: '#ef4444' },
        { label: '+ Cognitive overload', multiplier: 6.8, color: '#dc2626' },
        { label: '+ False pattern', multiplier: 11.2, color: '#991b1b' },
    ];
    const maxM = 12;
    const w = 340, h = 140, pad = { l: 130, r: 55, t: 16, b: 24 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const barH = 18;
    const gap = (innerH - biases.length * barH) / (biases.length + 1);

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
            {[0, 3, 6, 9, 12].map(v => (
                <g key={v}>
                    <line x1={pad.l + (v / maxM) * innerW} x2={pad.l + (v / maxM) * innerW}
                        y1={pad.t} y2={h - pad.b} stroke="#f5f5f4" strokeWidth={1} />
                    <text x={pad.l + (v / maxM) * innerW} y={h - 6}
                        fill="#a8a29e" fontSize={7} textAnchor="middle">{v}×</text>
                </g>
            ))}
            {biases.map((b, i) => {
                const y = pad.t + gap + i * (barH + gap);
                const bw = (b.multiplier / maxM) * innerW;
                return (
                    <g key={b.label}>
                        <text x={pad.l - 6} y={y + barH / 2 + 4}
                            fill="#78716c" fontSize={8} textAnchor="end">{b.label}</text>
                        <rect x={pad.l} y={y} width={bw} height={barH}
                            fill={b.color} rx={2} opacity={0.9} />
                        <text x={pad.l + bw + 4} y={y + barH / 2 + 4}
                            fill={b.color} fontSize={9} fontWeight={700}>{b.multiplier}×</text>
                    </g>
                );
            })}
            <text x={pad.l + innerW / 2} y={pad.t - 3}
                fill="#78716c" fontSize={7.5} textAnchor="middle">
                Perceived growth multiplier (actual growth: 7%)
            </text>
        </svg>
    );
}

// Manipulation detection checklist mini-chart (visual scoring)
function ManipulationScorecard() {
    const checks = [
        { item: 'Y-axis starts at zero', ok: true },
        { item: 'No color emphasis on single bar', ok: false },
        { item: 'Gridlines ≤ 5', ok: false },
        { item: 'No smoothing overlay', ok: false },
        { item: 'Annotations are descriptive, not prescriptive', ok: false },
        { item: 'Full date range shown', ok: true },
        { item: 'Data source disclosed', ok: true },
        { item: 'No 3D perspective effect', ok: true },
    ];
    const score = checks.filter(c => c.ok).length;
    const total = checks.length;
    const pct = Math.round((score / total) * 100);
    const color = pct >= 75 ? '#059669' : pct >= 50 ? '#f97316' : '#dc2626';

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 shrink-0 font-black text-sm"
                    style={{ borderColor: color, color }}>
                    {pct}%
                </div>
                <div>
                    <p className="text-[13px] font-bold text-stone-800">
                        Chart Integrity Score: {score}/{total}
                    </p>
                    <p className="text-[11px] text-stone-400">
                        {pct < 50 ? 'High manipulation risk — multiple biases active' :
                            pct < 75 ? 'Moderate risk — some issues present' :
                                'Good — mostly honest presentation'}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
                {checks.map((c, i) => (
                    <div key={i} className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] ${c.ok
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'}`}>
                        <span className="font-bold shrink-0">{c.ok ? '✓' : '✗'}</span>
                        {c.item}
                    </div>
                ))}
            </div>
        </div>
    );
}

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

        const yMin = allManipulations ? 2.85 : 0;
        const yMax = 3.35;

        const xScale = d3
            .scaleBand()
            .domain(DATA.map((d) => d.label))
            .range([0, innerW])
            .padding(0.3);

        const yScale = d3.scaleLinear().domain([yMin, yMax]).range([innerH, 0]);

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
                allManipulations && i === HIGHLIGHT_INDEX ? '#dc2626' : '#059669'
            )
            .attr('rx', 2);

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

        if (allManipulations) {
            const lastX = xScale(DATA[HIGHLIGHT_INDEX].label)! + xScale.bandwidth() / 2;
            const lastY = yScale(DATA[HIGHLIGHT_INDEX].value);

            g.append('text')
                .attr('x', lastX - 30)
                .attr('y', lastY - 24)
                .attr('text-anchor', 'end')
                .style('font-size', '10px')
                .style('font-weight', '700')
                .style('fill', '#dc2626')
                .text('Strong growth ↑');
        }

        if (allManipulations) {
            g.append('text')
                .attr('x', innerW / 2)
                .attr('y', innerH + 26)
                .attr('text-anchor', 'middle')
                .style('font-size', '10px')
                .style('fill', '#dc2626')
                .style('font-weight', '600')
                .text('⚠ axis truncated — starts at $2.85M');
        }

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
                    .ticks(allManipulations ? 6 : 4)
                    .tickFormat((d) => `$${Number(d).toFixed(2)}M`)
            )
            .call((ax) =>
                ax.select('.domain').attr('stroke', allManipulations ? '#dc2626' : '#d6d3d1')
            )
            .selectAll('text')
            .style('font-size', '11px')
            .style('fill', '#78716c');

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
            <div className="space-y-8">

                {/* Main explanation */}
                <div className="space-y-4">
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        The four cognitive biases covered in this section — pre-attentive attention hijacking, cognitive load saturation, anchoring distortion, and false pattern induction — rarely appear in isolation. In sophisticated chart manipulation, they are deliberately combined to create a <strong>compound distortion</strong> where each individual element is defensible in isolation, but the combined effect produces a perception radically different from the underlying data. Understanding compound manipulation is the final and most important skill in cognitive defense.
                    </p>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        The interaction between biases is <em>multiplicative rather than additive</em>. Adding a color highlight to an already-truncated axis does not simply add a color bias to an axis bias — the color hijacks pre-attentive attention to the highlighted bar, which is already encoded as appearing much taller than it really is due to anchoring. The viewer's pre-conscious system processes the "very tall red bar" context before they can consciously correct for the axis. Adding cognitive load via gridlines then prevents the correction from ever happening — working memory is too busy processing non-data ink to detect the manipulation.
                    </p>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        In a well-constructed compound manipulation chart, the manipulator often has a <strong>plausible defense for each individual element</strong>: "the truncated axis shows the relevant range to investors," "the highlighted bar represents our breakthrough quarter," "the gridlines help read precise values," "the trendline shows the underlying signal through the noise." Each defense sounds reasonable in isolation. But the combined intent — to present a 0.6% week-over-week gain as explosive growth — is revealed when you apply a compound detection checklist.
                    </p>
                </div>

                {/* Four-bias stack */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        The compound manipulation stack
                    </p>
                    <div className="space-y-2">
                        {[
                            {
                                num: '1',
                                bias: 'Pre-attentive hijack',
                                how: 'Color one bar red among grey bars',
                                effect: 'Forces attention to a specific data point before conscious scanning begins. The viewer has already "noticed" the highlighted bar before reading the axis.',
                                severity: 'bg-orange-100 text-orange-700',
                            },
                            {
                                num: '2',
                                bias: 'Anchoring distortion',
                                how: 'Truncate y-axis to start at 85% of the minimum',
                                effect: 'Creates a false reference frame. The highlighted bar appears to represent a ~5× larger value than it actually does relative to other bars.',
                                severity: 'bg-red-100 text-red-700',
                            },
                            {
                                num: '3',
                                bias: 'Cognitive load attack',
                                how: 'Add 12+ gridlines, dashed overlay, busy annotation',
                                effect: 'Saturates working memory. The viewer cannot simultaneously process the overloaded chart and correct for the axis manipulation.',
                                severity: 'bg-red-100 text-red-700',
                            },
                            {
                                num: '4',
                                bias: 'False pattern induction',
                                how: 'Apply a smoothing trendline with upward slope',
                                effect: "Locks in a \"growth story\" narrative. The viewer's pattern-detection system now has a visual \"proof\" of sustained improvement to anchor to.",
                                severity: 'bg-red-200 text-red-800',
                            },
                            {
                                num: '5',
                                bias: 'Narrative framing',
                                how: '"Revenue explodes to record highs" as chart title',
                                effect: 'Sets the interpretive frame before any data is examined. The word "explodes" anchors magnitude expectations that the chart then appears to confirm.',
                                severity: 'bg-rose-200 text-rose-800',
                            },
                        ].map((item) => (
                            <div key={item.num} className="flex items-start gap-3 bg-white rounded-xl border border-stone-200 p-3.5">
                                <span className={`w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${item.severity}`}>
                                    {item.num}
                                </span>
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

                {/* Bias interaction multiplicative chart */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        How stacking biases multiplies perceived distortion
                    </p>
                    <p className="text-[13px] text-stone-500 leading-relaxed">
                        Each additional bias layer multiplies — not adds to — the perceived growth effect. Actual revenue growth from Wk1 to Wk8 is 7.3%.
                    </p>
                    <BiasInteractionChart />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        With all four biases active, a viewer perceiving through the chart believes growth is ~11× greater than it actually is. The compound effect is catastrophic for judgment quality.
                    </p>
                </div>

                {/* Manipulation scorecard */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Compound manipulation detection checklist
                    </p>
                    <p className="text-[13px] text-stone-500 leading-relaxed">
                        The manipulated version of the demo chart below scores poorly on this checklist. A chart with multiple failures has a high probability of compound manipulation.
                    </p>
                    <ManipulationScorecard />
                </div>

                {/* Real-world case examples */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Real-world compound manipulation cases
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            {
                                context: 'Corporate earnings presentation',
                                description: 'Revenue chart with 80% axis truncation, one highlighted record quarter in brand color, overlaid 5-period moving average, and the title "Consistent growth trajectory." Actual revenue: flat for 6 quarters with one statistical outlier.',
                                outcome: 'Board approved headcount expansion. The outlier quarter was later revised down.',
                            },
                            {
                                context: 'Government statistics report',
                                description: 'Unemployment chart with 40% axis truncation, employment rate labeled "at historic high" despite being within 0.3% of prior periods, green color coding for all current metrics, and a note "seasonally adjusted" without disclosing adjustment methodology.',
                                outcome: 'Public perception of welfare improvement. Underlying monthly variation was hidden.',
                            },
                            {
                                context: 'Startup investor deck',
                                description: '"Hockey stick" user growth chart using log scale without labeling, moving average applied to daily signups, axis beginning at the month of viral campaign launch, with annotation "exponential growth phase."',
                                outcome: 'Series A funding. Growth normalized to baseline within 3 months of funding close.',
                            },
                            {
                                context: 'Healthcare outcome reporting',
                                description: 'Patient satisfaction chart truncated from 85% to 100%, one period highlighted in green labeled "benchmark exceeded," 12-gridline overlay, and subgroup data cherry-picked to reveal the best-performing unit.',
                                outcome: 'Quality award submission. Full-facility data showed mixed performance.',
                            },
                        ].map((c, i) => (
                            <div key={i} className="bg-white rounded-xl border border-stone-200 p-4 space-y-2">
                                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">{c.context}</p>
                                <p className="text-[12px] text-stone-600 leading-relaxed">{c.description}</p>
                                <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                                    <p className="text-[11px] font-semibold text-amber-700 mb-0.5">Outcome</p>
                                    <p className="text-[11px] text-amber-800 leading-relaxed">{c.outcome}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interaction effect */}
                <div className="rounded-xl bg-red-50 border border-red-200 p-5">
                    <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider mb-3">
                        Why compound effects are disproportionately powerful
                    </p>
                    <p className="text-[13px] text-red-800 leading-relaxed mb-3">
                        When multiple biases are stacked, their effect is <strong>multiplicative</strong>, not additive. The pre-attentive hijack forces attention to the highlighted bar. The truncated axis makes that bar appear dramatically tall. The cognitive overload from gridlines prevents the viewer from stepping back to check the axis. The trendline locks in a "growth" narrative. Each layer makes the others more effective — this is why compound manipulation is disproportionately powerful relative to any single technique.
                    </p>
                    <p className="text-[13px] text-red-800 leading-relaxed">
                        The most dangerous compound manipulation charts are often the ones that look most professional and "data-rich." Dense gridlines, precise labels, multiple series, and overlaid trendlines create the <em>appearance</em> of analytical rigor — while each element is actively working to prevent accurate comprehension.
                    </p>
                </div>

                {/* Interactive demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                    <div className="relative">
                        <span className="absolute top-0 right-0 text-xs font-bold text-stone-300 select-none">1.5</span>
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                            Live demo: compound manipulation stack
                        </p>
                        <p className="text-[13px] text-stone-500 mb-4">
                            Toggle all five manipulation techniques simultaneously: axis truncation, pre-attentive color hijack, cognitive overload, false smoothing trendline, and misleading chart title.
                        </p>

                        <div className="flex justify-center py-3 overflow-x-auto">
                            <svg
                                ref={svgRef}
                                width={W}
                                height={H}
                                viewBox={`0 0 ${W} ${H}`}
                                aria-label="Compound manipulation demo: bar chart toggling between clean and manipulated state"
                            />
                        </div>

                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span className={`text-[13px] font-medium transition-colors ${!allManipulations ? 'text-stone-800' : 'text-stone-400'}`}>
                                Honest (5 checks active)
                            </span>
                            <button
                                onClick={() => setAllManipulations((v) => !v)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${allManipulations ? 'bg-red-500' : 'bg-brand'}`}
                                aria-label="Toggle all manipulations"
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${allManipulations ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <span className={`text-[13px] font-medium transition-colors ${allManipulations ? 'text-stone-800' : 'text-stone-400'}`}>
                                Manipulated (5 biases active)
                            </span>
                        </div>

                        <p className="text-center text-[12px] text-stone-400 mt-2 px-4">
                            {allManipulations
                                ? 'Truncated axis + red color hijack + gridline overload + false trendline + misleading title — stacked multiplicatively'
                                : 'Zero baseline, no color emphasis, minimal gridlines — honest presentation of a 7.3% revenue increase over 8 weeks'}
                        </p>

                        {allManipulations && (
                            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                                <p className="text-[12px] text-red-700 font-medium leading-relaxed">
                                    5 active manipulations: axis truncation (85%), pre-attentive color hijack on Wk 8,
                                    cognitive overload via 12 gridlines, false smoothing trendline, misleading title framing.
                                    Actual change from Wk 1 to Wk 8: <strong>+7.3%</strong>. Perceived change: approximately <strong>300–1000%</strong> depending on viewer.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
