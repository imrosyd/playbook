import { useState } from 'react';
import LessonPage from '../../layout/LessonPage';
import ChartFamilyLesson, { type ChartSpec } from './ChartFamilyLesson';
import ChartFrame from '../../ui/ChartFrame';
import {
    PieMini,
    DonutMini,
    TreemapMini,
    SunburstMini,
    WaffleMini,
    MosaicMini,
    WaterfallMini,
} from '../../charts/demos/MiniCharts';

const charts: ChartSpec[] = [
    {
        slug: 'pie',
        name: 'Pie Chart',
        whenToUse: [
            'Showing part-to-whole composition for 2–5 segments when approximate proportions suffice',
            'When one segment dominates (> 50%) and you want to emphasize that majority',
            'Familiar general-audience contexts where a simple visual metaphor matters',
        ],
        whenNotToUse: [
            'More than 5–6 slices — small slices become impossible to compare',
            'When precise comparison between slices is needed — bars on a common scale are more accurate',
            'Multiple pie charts side-by-side for comparison — the eye cannot compare angles across charts',
        ],
        interpretationRisk: 'Humans are poor at comparing angles and arc lengths. Cleveland & McGill ranked angle as one of the least accurate encodings. Two slices of 30% and 35% are nearly indistinguishable in a pie chart but are easily separated in a bar chart.',
        cognitiveRef: 'Pre-attentive: angle (inaccurate)',
        ethicalRef: 'Risk: Angle comparison failure',
        demo: <PieMini />,
    },
    {
        slug: 'donut',
        name: 'Donut Chart',
        whenToUse: [
            'Same contexts as a pie chart, with center space available for a summary statistic',
            'Dashboard designs where a central KPI value needs to be embedded in the composition view',
            'When the hole reduces the apparent dominance of the "filled" area illusion from a pie',
        ],
        whenNotToUse: [
            'When the ring width varies or is used to encode an additional variable (distorts area)',
            'More than 5–6 segments — same limitations as pie charts',
            'When the central value would be misleading without full context',
        ],
        interpretationRisk: 'The donut hole removes area information but readers still decode by arc length. A very thin ring width makes all arcs appear approximately equal regardless of actual proportions — the visual weight of the hole competes with the data.',
        cognitiveRef: 'Pre-attentive: arc length',
        ethicalRef: 'Risk: Ring width distortion',
        demo: <DonutMini />,
    },
    {
        slug: 'treemap',
        name: 'Treemap',
        whenToUse: [
            'Hierarchical part-to-whole data where both levels (parent and child) need to be visible simultaneously',
            'Large numbers of categories (20+) where a bar chart would be too long',
            'When relative area between categories is more important than precise values',
        ],
        whenNotToUse: [
            'Flat (non-hierarchical) data — a bar chart is more accurately decoded',
            'When the viewer needs to compare non-adjacent cells — spatial position varies with algorithm',
            'Precise value reading — area is a weak encoding channel',
        ],
        interpretationRisk: 'Treemap layout algorithms (squarified, slice-and-dice) change cell shape and adjacency each time data changes, making temporal comparison across snapshots extremely difficult. An identical dataset can produce dramatically different visual layouts.',
        cognitiveRef: 'Pre-attentive: area, color',
        ethicalRef: 'Risk: Layout instability',
        demo: <TreemapMini />,
    },
    {
        slug: 'sunburst',
        name: 'Sunburst Chart',
        whenToUse: [
            'Multi-level hierarchical part-to-whole data where the radial structure aids navigation',
            'Interactive dashboards where clicking into rings reveals sub-categories',
            'When hierarchy depth and proportion at each level are both meaningful',
        ],
        whenNotToUse: [
            'More than 3 levels — outer rings become tiny slices that are impossible to label',
            'Static print or reports — the interactive drill-down that justifies sunbursts is unavailable',
            'When comparing across multiple sunbursts — no common scale exists between charts',
        ],
        interpretationRisk: 'Outer ring segments appear larger than inner ring segments of equal proportion because the circumference is longer. The same 10% slice at the outer ring has a visually longer arc than at the inner ring, implying greater importance.',
        cognitiveRef: 'Pre-attentive: arc length (varies by radius)',
        ethicalRef: 'Risk: Radius-dependent arc inflation',
        demo: <SunburstMini />,
    },
    {
        slug: 'waffle',
        name: 'Waffle Chart',
        whenToUse: [
            'Making proportions intuitive for general audiences by showing individual unit counts',
            'Small integer percentages (e.g., "62 out of 100") where counting supports the message',
            'Infographic contexts where the chart is supplementary to narrative text',
        ],
        whenNotToUse: [
            'Non-round percentages — a waffle of 62.7% is misleading if it rounds to 63 filled cells',
            'More than 2–3 categories in the same waffle — color assignment becomes confusing',
            'When the total unit count is not 100 — the metaphor breaks down',
        ],
        interpretationRisk: 'Waffle charts work when the total is exactly 100 units. If the underlying data is 6,200 out of 10,000 (62%), the chart implies a simplicity of counting that hides the actual scale of the data.',
        cognitiveRef: 'Pre-attentive: counting',
        ethicalRef: 'Risk: Rounding misrepresentation',
        demo: <WaffleMini />,
    },
    {
        slug: 'mosaic',
        name: 'Mosaic / Marimekko',
        whenToUse: [
            'Showing both composition within groups (tile height) and group size (tile width) simultaneously',
            'Survey data cross-tabulations where the size of each group is meaningful',
            'Two-way contingency tables in statistical or research reporting',
        ],
        whenNotToUse: [
            'When either dimension\'s proportions are not meaningful to the audience',
            'More than 4–5 categories per axis — tiles become slivers',
            'Audiences unfamiliar with the chart form — mosaic charts require more explanation than bars',
        ],
        interpretationRisk: 'Mosaic charts simultaneously encode two sets of proportions. Readers must track both width (group size) and height (composition) to understand the chart, creating high cognitive load. Often the two encodings are confused for each other.',
        cognitiveRef: 'Pre-attentive: area (2D)',
        ethicalRef: 'Risk: Dual-proportion confusion',
        demo: <MosaicMini />,
    },
    {
        slug: 'waterfall',
        name: 'Waterfall Chart',
        whenToUse: [
            'Financial statements showing how individual positive and negative contributions build to a total',
            'Revenue bridge charts, profit and loss breakdowns, or budget variance analysis',
            'When both the direction (positive/negative) and magnitude of each component matters',
        ],
        whenNotToUse: [
            'Time-series data — a line chart better shows trends; waterfall implies discrete contributions',
            'More than 8–10 bars — the cumulative position becomes difficult to track',
            'When the composition does not logically accumulate to a meaningful total',
        ],
        interpretationRisk: 'Floating bars in a waterfall chart have no visual baseline. Readers must mentally track the running total, which requires working memory. Poorly ordered or unlabeled running-total bars lead to systematic misreading of intermediate values.',
        cognitiveRef: 'Pre-attentive: length, position (floating)',
        ethicalRef: 'Risk: Floating bar baseline confusion',
        demo: <WaterfallMini />,
    },
];

// Pie vs Bar accuracy comparison chart
function PieVsBarComparisonChart() {
    const data = [
        { label: 'Category A', value: 38, color: '#059669' },
        { label: 'Category B', value: 35, color: '#0d9488' },
        { label: 'Category C', value: 17, color: '#2563eb' },
        { label: 'Category D', value: 10, color: '#7c3aed' },
    ];
    const total = data.reduce((s, d) => s + d.value, 0);
    const cx = 80, cy = 80, r = 70;
    let angle = -Math.PI / 2;

    // Pie slices
    const slices = data.map(d => {
        const startAngle = angle;
        const delta = (d.value / total) * 2 * Math.PI;
        angle += delta;
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(angle);
        const y2 = cy + r * Math.sin(angle);
        const large = delta > Math.PI ? 1 : 0;
        return { ...d, path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z` };
    });

    return (
        <ChartFrame
            label="Same Data: Pie vs. Bar"
            note="When segments are within 5-10% of each other, angle discrimination fails. The bar chart makes the same comparison trivially accurate. Use pie charts only when segment sizes are sufficiently different that angle comparison succeeds."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                <div className="flex flex-col items-center">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-4">
                        Pie chart — hard to compare B vs C
                    </p>
                    <div className="relative">
                        <svg viewBox="0 0 160 160" className="w-full max-w-[160px] drop-shadow-sm">
                            {slices.map((s, i) => (
                                <path key={i} d={s.path} fill={s.color} stroke="#fff" strokeWidth={1.5} opacity={0.95} />
                            ))}
                            <text x={cx} y={cy + 8} fill="white" fontSize={24} fontWeight={900} textAnchor="middle" opacity={0.5}>?</text>
                        </svg>
                        <div className="mt-4 text-center">
                            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 shadow-sm">
                                35% vs 38% — indistinguishable
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-4">
                        Bar chart — differences are clear
                    </p>
                    <div className="w-full space-y-3 pt-2">
                        {data.map((d, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <span className="w-20 text-[11px] font-bold text-stone-500 text-right">{d.label}</span>
                                <div className="flex-1 h-6 bg-stone-50 rounded shadow-inner overflow-hidden flex items-center pr-2">
                                    <div
                                        className="h-full rounded-r transition-all duration-500"
                                        style={{ width: `${d.value}%`, backgroundColor: d.color, opacity: 0.85 }}
                                    />
                                    <span className="ml-3 text-[11px] font-bold text-stone-600">{d.value}%</span>
                                </div>
                            </div>
                        ))}
                        <div className="mt-6 text-center">
                            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 shadow-sm">
                                38% vs 35% — clearly visible
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </ChartFrame>
    );
}

function WaffleDemo() {
    const total = 100;
    const value = 62;

    return (
        <ChartFrame
            label="Alternative: The Waffle Chart"
            note="Waffle charts leverage our pre-attentive ability to count. Instead of asking the brain to calculate the angle of a pie slice, a waffle chart visually represents the exact proportion out of 100 discrete cells."
        >
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center p-8">
                <div className="flex-1 max-w-[180px]">
                    <div className="grid grid-cols-10 gap-1.5 w-full aspect-square p-2 bg-stone-100/50 rounded-xl shadow-inner border border-stone-100">
                        {Array.from({ length: total }).map((_, i) => {
                            const row = Math.floor(i / 10);
                            const col = i % 10;
                            // Fill from bottom-left to top-right
                            const filledIndex = (9 - row) * 10 + col;
                            const isFilled = filledIndex < value;
                            return (
                                <div
                                    key={i}
                                    className={`w-full h-full rounded-[1px] transition-all duration-700 delay-[${i * 5}ms] ${isFilled ? 'bg-indigo-500 shadow-sm scale-110' : 'bg-stone-200'}`}
                                ></div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex-1 space-y-3">
                    <h3 className="text-4xl font-black text-stone-800 tracking-tighter italic">
                        {value}<span className="text-indigo-500">%</span> <span className="text-stone-400 not-italic text-2xl font-light tracking-normal">Complete</span>
                    </h3>
                    <p className="text-[13px] text-stone-500 leading-relaxed font-medium">
                        Showing individual unit counts makes statistics feel more tangible, honest, and precise compared to the cognitive abstraction of angles.
                    </p>
                </div>
            </div>
        </ChartFrame>
    );
}

function WaterfallDemo() {
    const data = [
        { label: 'Q1 Revenue', val: 120, type: 'total' },
        { label: 'New Sales', val: 35, type: 'pos' },
        { label: 'Churn', val: -25, type: 'neg' },
        { label: 'Upgrades', val: 15, type: 'pos' },
        { label: 'Q2 Revenue', val: 145, type: 'total' }
    ];

    let running = 0;
    const items = data.map(d => {
        let start = running;
        let end = running;
        if (d.type === 'total') {
            end = d.val;
            running = d.val;
            start = 0;
        } else {
            end = start + d.val;
            running += d.val;
        }
        return { ...d, start, end };
    });

    const max = 160;

    return (
        <ChartFrame
            label="Story of Change: The Waterfall Chart"
            note="The Waterfall Chart decomposes a net change into its constituent parts. Floating the intermediate bars perfectly aligns the 'start' of one metric with the 'end' of the previous, making the math visually obvious."
        >
            <div className="w-full p-6 pt-10">
                <div className="h-40 flex items-end justify-between px-4 pb-0 gap-4 relative">
                    {/* Floating bars and connections */}
                    {items.map((d, i) => {
                        const h = Math.abs(d.end - d.start);
                        const topY = Math.max(d.end, d.start);
                        const bottomY = Math.min(d.end, d.start);
                        const color = d.type === 'total' ? '#475569' : d.type === 'pos' ? '#10b981' : '#f43f5e';

                        return (
                            <div key={d.label} className="relative flex-1 flex flex-col items-center h-full">
                                {/* Bar */}
                                <div
                                    className={`absolute w-full rounded-md shadow-sm border-t border-white/20 transition-all duration-700 delay-[${i * 100}ms]`}
                                    style={{
                                        height: `${(h / max) * 100}%`,
                                        bottom: `${(bottomY / max) * 100}%`,
                                        backgroundColor: color,
                                    }}
                                />
                                {/* Value Label */}
                                <div
                                    className="absolute w-full text-center text-[11px] font-black z-10"
                                    style={{
                                        bottom: `${(topY / max) * 100}%`,
                                        marginBottom: '8px',
                                        color: d.type === 'neg' ? '#f43f5e' : (d.type === 'pos' ? '#059669' : '#1e293b')
                                    }}
                                >
                                    {d.val > 0 && d.type !== 'total' ? '+' : ''}{d.val}
                                </div>

                                {/* Connecting Line */}
                                {i < items.length - 1 && (
                                    <div
                                        className="absolute border-t-2 border-dashed border-stone-200"
                                        style={{
                                            left: '50%',
                                            width: 'calc(100% + 16px)',
                                            bottom: `${(d.end / max) * 100}%`,
                                            zIndex: 0
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
                {/* Labels */}
                <div className="flex justify-between px-4 pt-4 mt-2 border-t border-stone-100">
                    {items.map(d => (
                        <div key={d.label} className="flex-1 text-center text-[9px] font-black uppercase text-stone-400 tracking-tighter">
                            {d.label.split(' ').map((word, wi) => (
                                <div key={wi}>{word}</div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </ChartFrame>
    );
}

function LikertDivergingDemo() {
    const [view, setView] = useState<'standard' | 'diverging' | 'separated'>('standard');

    // Likert data: SD, D, N, A, SA
    const data = [
        { q: 'Q1: Data quality', vals: [5, 15, 20, 40, 20] },
        { q: 'Q2: Tool access', vals: [10, 25, 10, 35, 20] },
        { q: 'Q3: Training', vals: [20, 40, 15, 20, 5] },
        { q: 'Q4: Leadership', vals: [2, 8, 30, 40, 20] },
    ];

    const colors = ['#dc2626', '#f87171', '#d6d3d1', '#60a5fa', '#2563eb']; // Red to Blue

    const w = 500, h = 240, pad = { l: 90, r: 20, t: 40, b: 20 };
    const chartW = w - pad.l - pad.r;
    const chartH = h - pad.t - pad.b;
    const barH = 22;
    const gap = (chartH - data.length * barH) / (data.length + 1);

    return (
        <ChartFrame
            label="Survey Patterns: Likert Scales"
            note={
                view === 'standard' ? "A Standard Stacked Bar makes it difficult to compare the overall positive vs negative sentiment across questions, as the baseline is constantly shifting." :
                    view === 'diverging' ? "A Diverging Stacked Bar centers the neutral responses, explicitly comparing the total positive (right) vs total negative (left) sentiment." :
                        "Separating Neutral allows the specific polarization to become obvious. Neutral responses often indicate lack of engagement rather than a middle-ground opinion."
            }
        >
            <div className="space-y-4 p-4">
                <div className="flex justify-between items-center mb-2 px-2">
                    <div className="flex bg-stone-100/80 backdrop-blur-sm rounded-lg p-0.5 border border-stone-200">
                        {(['standard', 'diverging', 'separated'] as const).map(m => (
                            <button
                                key={m}
                                onClick={() => setView(m)}
                                className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-tighter transition-all ${view === m ? 'bg-white text-brand shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                            >
                                {m === 'standard' ? 'Stacked' : m === 'diverging' ? 'Diverging' : 'Separated'}
                            </button>
                        ))}
                    </div>
                    {/* Legend compact */}
                    <div className="flex gap-2">
                        {['Dis.', 'Neu.', 'Agr.'].map((l, i) => (
                            <div key={l} className="flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-stone-300' : 'bg-blue-500'}`} />
                                <span className="text-[9px] font-bold text-stone-400">{l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto overflow-visible block p-2">
                    {data.map((d, i) => {
                        const y = pad.t + gap + i * (barH + gap);

                        if (view === 'standard') {
                            let currentX = pad.l;
                            return (
                                <g key={d.q}>
                                    <text x={pad.l - 10} y={y + barH / 2 + 4} fill="#57534e" fontSize={11} fontWeight={900} textAnchor="end" letterSpacing="-0.02em">{d.q.split(': ')[1]}</text>
                                    {d.vals.map((v, j) => {
                                        const bw = (v / 100) * chartW;
                                        const rect = <rect key={j} x={currentX} y={y} width={bw} height={barH} fill={colors[j]} stroke="#fff" strokeWidth={1.5} rx={1} />;
                                        currentX += bw;
                                        return rect;
                                    })}
                                </g>
                            );
                        } else if (view === 'diverging') {
                            const center = pad.l + chartW / 2;
                            const negWidth = ((d.vals[0] + d.vals[1] + d.vals[2] / 2) / 100) * chartW;
                            let currentX = center - negWidth;

                            return (
                                <g key={d.q}>
                                    <text x={pad.l - 10} y={y + barH / 2 + 4} fill="#57534e" fontSize={11} fontWeight={900} textAnchor="end" letterSpacing="-0.02em">{d.q.split(': ')[1]}</text>
                                    <line x1={center} x2={center} y1={pad.t} y2={h - pad.b + 10} stroke="#e7e5e4" strokeWidth={1.5} strokeDasharray="3,3" />
                                    {d.vals.map((v, j) => {
                                        const bw = (v / 100) * chartW;
                                        const rect = <rect key={j} x={currentX} y={y} width={bw} height={barH} fill={colors[j]} stroke="#fff" strokeWidth={1.5} rx={1} />;
                                        currentX += bw;
                                        return rect;
                                    })}
                                </g>
                            );
                        } else {
                            const mainW = chartW * 0.7;
                            const neutralX = pad.l + mainW + chartW * 0.05;
                            const neutralW = chartW * 0.25;

                            const center = pad.l + mainW / 2;
                            const negWidth = ((d.vals[0] + d.vals[1]) / 100) * mainW;
                            let currentX = center - negWidth;

                            return (
                                <g key={d.q}>
                                    <text x={pad.l - 10} y={y + barH / 2 + 4} fill="#78716c" fontSize={11} fontWeight={900} textAnchor="end" letterSpacing="-0.02em">{d.q.split(': ')[1]}</text>
                                    <line x1={center} x2={center} y1={pad.t} y2={h - pad.b + 10} stroke="#e7e5e4" strokeWidth={1.5} strokeDasharray="3,3" />

                                    {/* Polarized segments */}
                                    <rect x={currentX} y={y} width={(d.vals[0] / 100) * mainW} height={barH} fill={colors[0]} stroke="#fff" strokeWidth={1.5} rx={1} />
                                    <rect x={currentX + (d.vals[0] / 100) * mainW} y={y} width={(d.vals[1] / 100) * mainW} height={barH} fill={colors[1]} stroke="#fff" strokeWidth={1.5} rx={1} />
                                    <rect x={center} y={y} width={(d.vals[3] / 100) * mainW} height={barH} fill={colors[3]} stroke="#fff" strokeWidth={1.5} rx={1} />
                                    <rect x={center + (d.vals[3] / 100) * mainW} y={y} width={(d.vals[4] / 100) * mainW} height={barH} fill={colors[4]} stroke="#fff" strokeWidth={1.5} rx={1} />

                                    {/* Neutral segment isolated */}
                                    <rect x={neutralX} y={y} width={(d.vals[2] / 100) * neutralW} height={barH} fill={colors[2]} stroke="#fff" strokeWidth={1.5} rx={2} />
                                    <text x={neutralX + (d.vals[2] / 100) * neutralW + 5} y={y + barH / 2 + 3} fill="#a8a29e" fontSize={9} fontWeight={900}>{d.vals[2]}%</text>
                                </g>
                            );
                        }
                    })}
                </svg>
            </div>
        </ChartFrame>
    );
}

export default function WhereIsTheMoneyGoingLesson() {
    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive: area and angle are weak visual encodings' },
                { sectionId: 'perception', slug: 'cognitive-load', label: '1.2 — Cognitive Load: how pie charts overload working memory' },
                { sectionId: 'lab', slug: 'visual-emphasis', label: '3.3 — Visual Emphasis: how color manipulation distorts pie charts' },
            ]}
        >
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Composition charts answer "what is this made of?" by encoding the parts that comprise a whole. They range from the ubiquitous but cognitively demanding pie chart to the space-efficient treemap and the narrative-friendly waterfall. The fundamental challenge with composition charts is that <strong>angle and area</strong> — their primary encoding channels — rank 5th and 6th in Cleveland & McGill's perceptual accuracy hierarchy. Humans are systematically poor at comparing non-aligned angles and areas with precision.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    This doesn't mean pie charts are always wrong. When a single segment is dramatically larger than the others (&gt;50%), the "majority" story is immediately visible and the angle comparison weakness is irrelevant. When only 2–3 segments exist and approximate proportions are sufficient, pie charts work well for general audiences. The problem arises when multiple similar-sized segments need to be compared, or when precise proportions matter — in these cases, a sorted horizontal bar chart on a common scale will always outperform a pie in terms of the viewer's ability to read accurate values.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    The most important composition chart decision is <strong>when to use bars versus sectors</strong>. Use bars when precise comparison between segments matters, when you have more than 5 categories, or when the chart will be used for data analysis. Use pie/donut when you have 2–4 segments, when part-to-whole relationship is the primary message, and when approximate proportions are sufficient. Treemaps and sunbursts are appropriate for hierarchical compositions but demand high cognitive load — use them only when the hierarchical structure itself is the story.
                </p>

                {/* Pie vs bar comparison */}
                <PieVsBarComparisonChart />

                {/* When to use each */}
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-5">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                        Quick decision guide: composition chart selection
                    </p>
                    <div className="space-y-2">
                        {[
                            { condition: '2–4 segments, approximate proportions OK', chart: 'Pie or donut', ok: true },
                            { condition: '1 segment clearly dominates (>50%)', chart: 'Pie chart', ok: true },
                            { condition: '5+ categories', chart: 'Horizontal bar chart', ok: true },
                            { condition: 'Precise comparison between similar segments', chart: 'Horizontal bar chart', ok: true },
                            { condition: 'Hierarchical composition (parent + child levels)', chart: 'Treemap or sunburst', ok: true },
                            { condition: 'Finance: cumulative contributions to total', chart: 'Waterfall chart', ok: true },
                            { condition: 'Want to embed a KPI in the center', chart: 'Donut chart', ok: true },
                        ].map((d, i) => (
                            <div key={i} className="flex items-center gap-3 text-[12px]">
                                <span className="text-stone-400 leading-relaxed flex-1">{d.condition}</span>
                                <span className="shrink-0 text-brand font-semibold">→ {d.chart}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Waffle Chart Lab */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Alternative to Pie Charts: The Waffle Chart
                    </p>
                    <WaffleDemo />
                </div>

                {/* Waterfall Lab */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Telling the Story of Change: The Waterfall Chart
                    </p>
                    <WaterfallDemo />
                </div>
                {/* Likert Lab */}
                <div className="space-y-3 mt-8">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Survey Data: Likert Scales
                    </p>
                    <LikertDivergingDemo />
                </div>
            </div>

            <ChartFamilyLesson
                charts={charts}
                clevelandNote="Angle and area encodings (used by pie, donut, treemap) rank 7th and 8th in perceptual accuracy — near the bottom of the hierarchy. Bars on a common scale (rank 1) are more accurately decoded for part-to-whole comparisons. Use composition charts only when part-to-whole relationship is genuinely the primary message."
            />
        </LessonPage>
    );
}
