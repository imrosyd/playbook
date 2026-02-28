import { useState } from 'react';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = [
    { sectionId: 'lab', slug: 'axis-scale', label: 'Axis & Scale Manipulation' },
    { sectionId: 'ethics', slug: 'distortion', label: 'Level 4: Distortion' },
];

type BadChartId = 'truncated' | 'area' | '3d' | 'pie';

interface BadChart {
    id: BadChartId;
    name: string;
    flaw: string;
    why: string;
    fix: string;
}

const BAD_CHARTS: BadChart[] = [
    {
        id: 'truncated',
        name: 'The Truncated Axis',
        flaw: 'Y-axis starts at 96% instead of 0%, making a 1% difference look like a 4× gap.',
        why: 'Exploits pre-attentive length perception. The bar that is 4× taller appears to represent 4× the value.',
        fix: 'Always start bar chart Y-axes at zero. Use annotations if you need to highlight a small difference within a narrow range.',
    },
    {
        id: 'area',
        name: 'The Irrelevant Area Explosion',
        flaw: 'A circle\'s area is scaled to a value, but area perception is the weakest visual encoding.',
        why: 'Cleveland & McGill (1984): area is rank 6 of 8 in perceptual accuracy. A circle that is 2× the area appears ~1.4× larger, not 2× larger.',
        fix: 'Use length (bar chart) instead of area for quantity comparison. Reserve area charts for geographic maps where spatial area carries meaning.',
    },
    {
        id: '3d',
        name: 'The 3D Perspective Trap',
        flaw: '3D perspective causes rear bars to appear shorter and angles to distort proportional reading.',
        why: 'Perspective foreshortening applies non-linear transformations to length — the primary channel for bar charts. Bars at the back of a 3D chart appear shorter than identical bars in the front.',
        fix: 'Never use 3D for data charts. Dimensionality adds cognitive load with zero informational value.',
    },
    {
        id: 'pie',
        name: 'The 11-Slice Pie Chart',
        flaw: 'A pie chart with 11 slices forces angle comparison — the second-weakest encoding after volume.',
        why: 'Humans cannot accurately compare angles for slices separated by other slices. The same data in a sorted horizontal bar chart would be decoded in under 2 seconds; the pie requires 8–10 seconds of scanning.',
        fix: 'Use a sorted horizontal bar chart for category comparison. Reserve pie charts for 2–3 segment share comparisons where the part-to-whole relationship is the only message.',
    },
];

// Chart 1: Truncated axis toggle
function TruncatedBarChart() {
    const data = [97.2, 97.8, 98.1, 98.9];
    const labels = ['Q1', 'Q2', 'Q3', 'Q4'];
    const [trunc, setTrunc] = useState(true);
    const minV = trunc ? 96 : 0;
    const maxV = 100;
    const w = 260, h = 120, pad = { l: 36, r: 12, t: 12, b: 28 };
    const bw = 36;
    const gap = (w - pad.l - pad.r - 4 * bw) / 5;
    const toY = (v: number) => pad.t + (1 - (v - minV) / (maxV - minV)) * (h - pad.t - pad.b);
    const bH = (v: number) => ((v - minV) / (maxV - minV)) * (h - pad.t - pad.b);

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone-400">Y-axis starts at:</span>
                <button onClick={() => setTrunc(v => !v)}
                    className={`px-3 py-1 rounded text-[11px] font-bold border transition-all ${trunc ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200'}`}>
                    {trunc ? '96 (truncated)' : '0 (honest)'}
                </button>
            </div>
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
                {[minV, (minV + maxV) / 2, maxV].map(v => (
                    <line key={v} x1={pad.l} x2={w - pad.r} y1={toY(Math.min(v, maxV))} y2={toY(Math.min(v, maxV))} stroke="#f5f5f4" strokeWidth={1} />
                ))}
                {data.map((d, i) => {
                    const x = pad.l + (i + 1) * gap + i * bw;
                    return (
                        <g key={i}>
                            <rect x={x} y={toY(d)} width={bw} height={bH(d)} fill="#1c1917" rx={2} />
                            <text x={x + bw / 2} y={toY(d) - 4} fill="#1c1917" fontSize={8} fontWeight={700} textAnchor="middle">{d}%</text>
                            <text x={x + bw / 2} y={h - 8} fill="#a8a29e" fontSize={8} textAnchor="middle">{labels[i]}</text>
                        </g>
                    );
                })}
                {[minV, (minV + maxV) / 2, maxV].map(v => (
                    <text key={v} x={pad.l - 3} y={toY(Math.min(v, maxV)) + 3} fill="#a8a29e" fontSize={7} textAnchor="end">{v}%</text>
                ))}
            </svg>
            <p className="text-[11px] text-stone-400 leading-relaxed">
                {trunc
                    ? 'The bars look dramatically different. But the actual difference is only 1.7 percentage points.'
                    : 'Starting at zero shows the truth: all bars are nearly identical.'}
            </p>
        </div>
    );
}

// Chart 2: Bubble chart showing area distortion
function AreaDistortionChart() {
    // Values: 10, 20, 40 — last should be 4× first, not 2×
    const data = [
        { label: 'Country A', value: 10, correct: true },
        { label: 'Country B', value: 20, correct: true },
        { label: 'Country C', value: 40, correct: true },
    ];

    // Correct: radius proportional to value (encodes area correctly)
    // Wrong: radius directly proportional to value (encodes radius, not area)
    const renderBubbles = (byArea: boolean) => {
        const w = 240, h = 90;
        const base = 8;
        return (
            <div className="flex-1">
                <p className="text-[9px] font-bold uppercase tracking-wider mb-2 text-center" style={{ color: byArea ? '#1c1917' : '#a8a29e' }}>
                    {byArea ? 'Correct (by area)' : 'Wrong (by radius)'}
                </p>
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
                    {data.map((d, i) => {
                        const cx = (i + 1) * (w / (data.length + 1));
                        const r = byArea
                            ? base * Math.sqrt(d.value / data[0].value) * 3
                            : base * (d.value / data[0].value) * 2;
                        return (
                            <g key={i}>
                                <circle cx={cx} cy={h / 2 - 4} r={r} fill="#1c1917" opacity={byArea ? 0.85 : 0.5} />
                                <text x={cx} y={h - 4} fill="#78716c" fontSize={8} textAnchor="middle">{d.label}</text>
                                <text x={cx} y={h / 2 - 4 + 3} fill="white" fontSize={7} fontWeight={700} textAnchor="middle">{d.value}</text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        );
    };

    return (
        <div className="space-y-2">
            <div className="flex gap-4">
                {renderBubbles(false)}
                {renderBubbles(true)}
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
                When radius is used directly (left), Country C looks 4× bigger than Country A, but the actual difference should only appear 4× in area — which is half the visual size. The correct version (right) shows the true 4× relationship.
            </p>
        </div>
    );
}

// Chart 3: Simulated 3D perspective distortion
function ThreeDPerspectiveChart() {
    const data = [50, 48, 49, 51]; // almost identical values
    const labels = ['Q1', 'Q2', 'Q3', 'Q4'];
    const w = 260, h = 120, pad = { l: 12, r: 12, t: 12, b: 36 };
    const bw = 36; const gap = (w - pad.l - pad.r - 4 * bw) / 5;
    const maxV = 70;
    const toY = (v: number) => pad.t + (1 - v / maxV) * (h - pad.t - pad.b);
    const bH = (v: number) => (v / maxV) * (h - pad.t - pad.b);

    // depth offset simulates 3D — makes rear bars look shorter
    const depthOffset = [20, 12, 6, 0];
    const depthH = [0.82, 0.88, 0.94, 1]; // scaling factor per "depth"

    return (
        <div className="space-y-2">
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
                {/* Background grid */}
                {[0, 30, 60].map(v => (
                    <line key={v} x1={pad.l} x2={w - pad.r} y1={toY(Math.min(v, maxV))} y2={toY(Math.min(v, maxV))} stroke="#f5f5f4" strokeWidth={1} />
                ))}
                {data.map((d, i) => {
                    const x = pad.l + (i + 1) * gap + i * bw;
                    const perspective = depthH[i];
                    const dy = depthOffset[i];
                    const apparentH = bH(d) * perspective;
                    const apparentY = h - pad.b - apparentH - dy;

                    return (
                        <g key={i}>
                            {/* 3D top face */}
                            <polygon
                                points={`${x},${apparentY} ${x + bw},${apparentY} ${x + bw - 8},${apparentY - 6} ${x - 8},${apparentY - 6}`}
                                fill="#78716c"
                            />
                            {/* 3D side face */}
                            <polygon
                                points={`${x + bw},${apparentY} ${x + bw - 8},${apparentY - 6} ${x + bw - 8},${h - pad.b - dy - 6} ${x + bw},${h - pad.b - dy}`}
                                fill="#44403c"
                            />
                            {/* Front face */}
                            <rect x={x} y={apparentY} width={bw} height={apparentH} fill="#1c1917" />
                            <text x={x + bw / 2} y={h - 8} fill="#a8a29e" fontSize={8} textAnchor="middle">{labels[i]}</text>
                            <text x={x + bw / 2} y={apparentY - 10} fill="#78716c" fontSize={8} fontWeight={700} textAnchor="middle">{d}</text>
                        </g>
                    );
                })}
            </svg>
            <p className="text-[11px] text-stone-400 leading-relaxed">
                All four bars represent nearly identical values (48–51). The 3D perspective makes Q1 appear significantly shorter than Q4 — a visual lie created entirely by angle, not data.
            </p>
        </div>
    );
}

// Chart 4: 11-slice pie vs. sorted horizontal bar — side by side
function ElevenSlicePieChart() {
    const data = [
        { label: 'A', v: 22 }, { label: 'B', v: 18 }, { label: 'C', v: 14 },
        { label: 'D', v: 11 }, { label: 'E', v: 9 }, { label: 'F', v: 8 },
        { label: 'G', v: 6 }, { label: 'H', v: 5 }, { label: 'I', v: 4 },
        { label: 'J', v: 2 }, { label: 'K', v: 1 },
    ];
    const total = data.reduce((s, d) => s + d.v, 0);

    // Greys palette so all slices look similar (the point!)
    const shades = ['#1c1917', '#292524', '#44403c', '#57534e', '#78716c',
        '#a8a29e', '#d6d3d1', '#e7e5e4', '#f5f5f4', '#b0ada9', '#6b6966'];

    const cx = 70, cy = 70, r = 62;
    let startAngle = -Math.PI / 2;
    const slices = data.map((d, i) => {
        const angle = (d.v / total) * 2 * Math.PI;
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(startAngle + angle);
        const y2 = cy + r * Math.sin(startAngle + angle);
        const large = angle > Math.PI ? 1 : 0;
        const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
        startAngle += angle;
        return { path, fill: shades[i], label: d.label };
    });

    return (
        <div className="space-y-2">
            <div className="flex items-start gap-4">
                <div>
                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-wider mb-2 text-center">11-slice pie (weak)</p>
                    <svg viewBox="0 0 140 140" style={{ width: 140 }}>
                        {slices.map((s, i) => (
                            <path key={i} d={s.path} fill={s.fill} stroke="white" strokeWidth={1} />
                        ))}
                    </svg>
                </div>
                <div className="flex-1">
                    <p className="text-[9px] font-bold text-stone-800 uppercase tracking-wider mb-2">Sorted bar chart (clear)</p>
                    <div className="space-y-1.5">
                        {data.map((d, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="w-4 text-[9px] text-stone-400 text-right shrink-0">{d.label}</span>
                                <div className="flex-1 h-4 bg-stone-100 rounded overflow-hidden">
                                    <div className="h-full bg-stone-800 rounded" style={{ width: `${(d.v / data[0].v) * 100}%` }} />
                                </div>
                                <span className="w-7 text-[9px] text-stone-500 tabular-nums">{d.v}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
                The pie makes it nearly impossible to compare slices G–K. The sorted bar chart makes rank immediately obvious — in under 2 seconds.
            </p>
        </div>
    );
}

const CHART_RENDERERS: Record<BadChartId, React.ReactNode> = {
    truncated: <TruncatedBarChart />,
    area: <AreaDistortionChart />,
    '3d': <ThreeDPerspectiveChart />,
    pie: <ElevenSlicePieChart />,
};

export default function BadChartHallLesson() {
    const [selected, setSelected] = useState<BadChartId>('truncated');
    const chart = BAD_CHARTS.find(c => c.id === selected)!;

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    The most effective way to internalize what you should not do is to study real examples of failure. Every chart type below has appeared legitimately in major business publications, government reports, and corporate earnings calls. Each one distorts perception in a specific, identifiable way.
                </p>

                <TheoryBlock
                    title="Why Bad Charts Persist"
                    theory="Alberto Cairo's 'The Functional Art' + Status Quo Bias"
                    explanation="Many chart design errors are not malicious — they are defaults. Software defaults to 3D charts, truncated axes, and pie charts because they look visually impressive. Status quo bias means that once a chart format is embedded in a template, it persists unchallenged. The antidote is a checklist applied before finalizing any chart."
                />

                <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Select a chart type to dissect</p>
                    <div className="flex flex-wrap gap-2">
                        {BAD_CHARTS.map(c => (
                            <button
                                key={c.id}
                                onClick={() => setSelected(c.id)}
                                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${selected === c.id
                                    ? 'bg-stone-900 text-white border-stone-900'
                                    : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                                    }`}
                            >
                                {c.name}
                            </button>
                        ))}
                    </div>

                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-4">
                        {CHART_RENDERERS[selected]}
                        <div className="space-y-3 pt-2 border-t border-stone-200">
                            <div>
                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">The flaw</p>
                                <p className="text-[13px] text-stone-700 leading-relaxed">{chart.flaw}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Why the brain is fooled</p>
                                <p className="text-[13px] text-stone-600 leading-relaxed">{chart.why}</p>
                            </div>
                            <div className="bg-white border border-stone-200 rounded-lg p-3">
                                <p className="text-[10px] font-bold text-stone-800 uppercase tracking-wider mb-1">How to fix it</p>
                                <p className="text-[13px] text-stone-700 leading-relaxed">{chart.fix}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
