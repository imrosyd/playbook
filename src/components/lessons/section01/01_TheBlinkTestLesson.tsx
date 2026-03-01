import { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import LessonPage from '../../../components/layout/LessonPage';
import ChartFrame from '../../ui/ChartFrame';

const crossRefs = [
    {
        sectionId: 'lab',
        slug: 'visual-emphasis',
        label: 'Section 3.3 — Color emphasis hijacks pre-attentive channels',
    },
    {
        sectionId: 'ethics',
        slug: 'emphasis',
        label: 'Section 5.2 — Emphasis: when editorial guidance becomes manipulation',
    },
];

const COLS = 8;
const ROWS = 6;
const CIRCLE_R = 9;
const GAP = 36;

const POP_COLORS = [
    '#dc2626', // red
    '#ea580c', // orange
    '#7c3aed', // violet
    '#2563eb', // blue
    '#0d9488', // teal
    '#db2777', // pink
];

// Reaction time data for bar chart demo
const REACTION_DATA = [
    { channel: 'Color hue', ms: 112, color: '#059669' },
    { channel: 'Size contrast', ms: 145, color: '#0d9488' },
    { channel: 'Orientation', ms: 178, color: '#2563eb' },
    { channel: 'Shape', ms: 310, color: '#7c3aed' },
    { channel: 'Conjunction', ms: 580, color: '#dc2626' },
];

// Mini reaction time bar chart (pure SVG, no D3)
function ReactionTimeChart() {
    const max = 600;
    const w = 480, h = 220;
    const pad = { l: 130, r: 60, t: 20, b: 38 };
    const barH = 26;
    const gap = (h - pad.t - pad.b - REACTION_DATA.length * barH) / (REACTION_DATA.length + 1);

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
            {/* Axis */}
            {[0, 150, 300, 450, 600].map(v => (
                <g key={v}>
                    <line
                        x1={pad.l + (v / max) * (w - pad.l - pad.r)}
                        x2={pad.l + (v / max) * (w - pad.l - pad.r)}
                        y1={pad.t} y2={h - pad.b}
                        stroke="#f5f5f4" strokeWidth={1}
                    />
                    <text
                        x={pad.l + (v / max) * (w - pad.l - pad.r)}
                        y={h - pad.b + 14}
                        fill="#a8a29e" fontSize={10} textAnchor="middle"
                    >{v}ms</text>
                </g>
            ))}
            {REACTION_DATA.map((d, i) => {
                const y = pad.t + gap + i * (barH + gap);
                const bw = (d.ms / max) * (w - pad.l - pad.r);
                return (
                    <g key={d.channel}>
                        <text x={pad.l - 8} y={y + barH / 2 + 4} fill="#78716c" fontSize={12} textAnchor="end">
                            {d.channel}
                        </text>
                        <rect x={pad.l} y={y} width={bw} height={barH} fill={d.color} rx={4} opacity={0.85} />
                        <text x={pad.l + bw + 6} y={y + barH / 2 + 4} fill="#78716c" fontSize={12}>
                            {d.ms}ms
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

// Gestalt proximity demo
function GestaltDemo() {
    const [mode, setMode] = useState<'spread' | 'grouped'>('spread');
    // Rescaled to 480x220 coordinate space
    const circles = mode === 'grouped'
        ? [
            // Group A (left cluster)
            [80, 90], [115, 90], [80, 130], [115, 130],
            // Group B (middle cluster)
            [220, 90], [255, 90], [220, 130], [255, 130],
            // Group C (right cluster)
            [360, 90], [395, 90], [360, 130], [395, 130],
        ]
        : [
            // Evenly spread across 480px wide
            [50, 110], [100, 110], [150, 110], [200, 110],
            [250, 110], [300, 110], [350, 110], [400, 110],
            [70, 145], [130, 145], [190, 145], [260, 145],
        ];

    return (
        <div className="space-y-3">
            <div className="flex gap-2 flex-wrap">
                {(['spread', 'grouped'] as const).map(m => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-semibold border transition-all ${mode === m
                            ? 'bg-brand text-white border-brand'
                            : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                            }`}
                    >
                        {m === 'spread' ? 'Evenly Spread' : 'Proximity Groups'}
                    </button>
                ))}
            </div>
            <svg viewBox="0 0 480 220" className="w-full max-w-2xl mx-auto block">
                {mode === 'grouped' && (
                    <>
                        <rect x={55} y={65} width={80} height={85} fill="#f0fdf4" rx={10} stroke="#bbf7d0" strokeWidth={1.5} />
                        <rect x={195} y={65} width={80} height={85} fill="#eff6ff" rx={10} stroke="#bfdbfe" strokeWidth={1.5} />
                        <rect x={335} y={65} width={80} height={85} fill="#fef3c7" rx={10} stroke="#fde68a" strokeWidth={1.5} />
                    </>
                )}
                {circles.map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r={12} fill="#1c1917" opacity={0.75} />
                ))}
            </svg>
            <p className="text-[11px] text-stone-400 leading-relaxed">
                {mode === 'grouped'
                    ? 'Proximity instantly creates 3 perceived groups — no labels needed. This is Gestalt Law of Proximity.'
                    : 'Spread evenly, the dots are perceived as an undifferentiated field. No grouping structure emerges.'}
            </p>
        </div>
    );
}

export default function TheBlinkTestLesson() {
    const [withColor, setWithColor] = useState(false);
    const [targetIndex, setTargetIndex] = useState(19);
    const [targetColor, setTargetColor] = useState(POP_COLORS[0]);

    const svgRef = useRef<SVGSVGElement>(null);

    const svgWidth = COLS * GAP + 24;
    const svgHeight = ROWS * GAP + 24;
    const total = COLS * ROWS;

    function handleToggle() {
        const next = !withColor;
        if (next) {
            // Pick new random position and color each time activated
            const newIdx = Math.floor(Math.random() * total);
            const newColor = POP_COLORS[Math.floor(Math.random() * POP_COLORS.length)];
            setTargetIndex(newIdx);
            setTargetColor(newColor);
        }
        setWithColor(next);
    }

    useEffect(() => {
        const svgEl = svgRef.current;
        if (!svgEl) return;

        const svg = d3.select(svgEl);

        if (svg.select('.main-group').empty()) {
            svg.append('g').attr('class', 'main-group');
        }
        const g = svg.select('.main-group');
        const t = svg.transition().duration(800).ease(d3.easeCubicOut) as any;

        const data = Array.from({ length: total }, (_, i) => {
            const isTarget = withColor && i === targetIndex;
            return {
                id: i,
                cx: 20 + (i % COLS) * GAP,
                cy: 20 + Math.floor(i / COLS) * GAP,
                fill: isTarget ? targetColor : '#d6d3d1'
            };
        });

        const circles = g.selectAll('circle').data(data, (d: any) => d.id);

        circles.join(
            (enter) => enter.append('circle')
                .attr('cx', d => d.cx)
                .attr('cy', d => d.cy)
                .attr('r', CIRCLE_R)
                .attr('fill', '#d6d3d1')
                .call(e => e.transition(t).attr('fill', d => d.fill)),
            (update) => update.call(u => u.transition(t)
                .attr('fill', d => d.fill)
                // Add a small pop animation to the target
                .attr('r', d => d.fill !== '#d6d3d1' ? CIRCLE_R + 1 : CIRCLE_R)
            ),
            (exit) => exit.remove()
        );

    }, [withColor, targetIndex, targetColor, total]);

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">

                {/* Main explanation */}
                <div className="space-y-4">
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        Pre-attentive processing is the first stage of visual perception — it operates in under 200 milliseconds, entirely outside conscious awareness. Your visual cortex processes the entire visual field simultaneously, in parallel, before your conscious mind even begins to form a thought. During this phase, certain visual features — color, size, orientation, and movement — are detected automatically and effortlessly, regardless of how many other objects are in the field.
                    </p>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        Anne Treisman and Garry Gelade demonstrated in 1980 that pre-attentive features are detected in <em>constant time</em>: finding a red circle among 4 grey circles takes the same time as finding one among 400. This parallel processing is fundamentally different from <strong>attentive processing</strong>, which requires serial scanning — reading each element one at a time — and scales linearly with the number of items.
                    </p>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        For chart designers, this creates both an opportunity and a responsibility. Pre-attentive channels can be used to legitimately guide a viewer's attention to the most important data point. They can also be weaponized to manipulate attention — forcing the viewer to notice an unimportant or misleading element before they can form an independent judgment.
                    </p>
                </div>

                {/* Channel cards */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Pre-attentive channels ranked by strength
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            {
                                channel: 'Color hue',
                                strength: 'Strongest',
                                example: 'One red bar among grey bars — found instantly, regardless of array size',
                                risk: 'Can misdirect attention to an unimportant data point before the viewer consciously scans',
                                detail: 'Hue difference activates the V4 area of the visual cortex before the signal even reaches the prefrontal cortex for conscious processing.',
                            },
                            {
                                channel: 'Length / size',
                                strength: 'Strong',
                                example: 'A taller bar immediately reads as "more" before reading axis labels',
                                risk: 'Truncated axes exploit this channel — a 4% gain looks like 400% when the axis starts at 96%',
                                detail: 'Length is rank 2 in Cleveland & McGill\'s accuracy hierarchy. The pre-attentive system uses relative length to estimate relative quantity — a process that breaks when the baseline is dishonest.',
                            },
                            {
                                channel: 'Position',
                                strength: 'Strong',
                                example: 'A dot higher on the y-axis reads as a higher value — position is the most accurate encoding',
                                risk: 'Compressed axes make equal differences look unequal; expanded axes flatten real variation',
                                detail: 'Position along a common scale is rank 1 in perceptual accuracy (Cleveland & McGill, 1984). This makes it both the most honest encoding and the most deceptive when combined with axis manipulation.',
                            },
                            {
                                channel: 'Orientation',
                                strength: 'Moderate',
                                example: 'A diagonal line in a grid of horizontals pops out immediately',
                                risk: 'Used to draw the eye to a selected trendline or regression overlay in a scatter plot',
                                detail: 'Orientation differences are detected pre-attentively only when they are sufficiently steep (> ~15° difference). This is why chartmakers angle trendlines by stretching axes.',
                            },
                            {
                                channel: 'Shape',
                                strength: 'Moderate',
                                example: 'A square among circles is found quickly — but combined features slow detection drastically',
                                risk: 'Complex shapes require attentive processing; mixing shape with color creates a "conjunction" that breaks pre-attentive detection',
                                detail: 'Feature conjunctions — finding a "red square" among red circles and blue squares — require serial scanning because no single feature uniquely identifies the target.',
                            },
                            {
                                channel: 'Motion / flicker',
                                strength: 'Strongest (when available)',
                                example: 'Animated elements capture attention before static ones — impossible to ignore',
                                risk: 'Animation in digital dashboards can be used to anchor attention on a data point the presenter wants emphasized before Q&A begins',
                                detail: 'Motion was the most important pre-attentive channel evolutionarily — it signaled predators. In business charts, unnecessary animation exploits this hardwired response.',
                            },
                        ].map((item) => (
                            <div key={item.channel} className="bg-white rounded-xl border border-stone-200 p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] font-bold text-stone-800">{item.channel}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.strength === 'Strongest' || item.strength === 'Strongest (when available)' ? 'bg-emerald-100 text-emerald-700' : item.strength === 'Strong' ? 'bg-blue-100 text-blue-700' : 'bg-stone-100 text-stone-600'}`}>
                                        {item.strength}
                                    </span>
                                </div>
                                <p className="text-[12px] text-stone-500 leading-relaxed">{item.example}</p>
                                <p className="text-[11px] text-stone-400 italic leading-relaxed">{item.detail}</p>
                                <p className="text-[11px] text-red-600 bg-red-50 rounded-lg px-3 py-1.5 leading-relaxed">
                                    ⚠ {item.risk}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reaction time chart */}
                <ChartFrame
                    label="Average detection time by visual channel (Treisman & Gelade, 1980)"
                    note="Color hue detection (112ms) is 5× faster than shape conjunction search (580ms). Charts that use color to highlight a single point guarantee it will be seen before anything else — including the axis, title, or data source."
                >
                    <ReactionTimeChart />
                </ChartFrame>

                {/* Research basis */}
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-5">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">Research basis</p>
                    <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
                        Treisman & Gelade (1980) demonstrated that pre-attentive features are processed in parallel across the entire visual field simultaneously — no serial scanning required. This is why a single red element among thousands of grey ones is found in constant time regardless of the number of distractors: the visual cortex processes the full field in one pass, flagging anything that deviates from the background texture.
                    </p>
                    <p className="text-[13px] text-stone-600 leading-relaxed">
                        Christopher Healey's subsequent work (1996) established precise thresholds: for color, a minimum difference of around 30° on the hue wheel is required for reliable pre-attentive detection. Below that threshold, detection becomes effortful and serial — the viewer must consciously scan the chart to find the highlighted element, negating the intended directing effect.
                    </p>
                </div>

                {/* Gestalt demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-4">
                    <div>
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                            Gestalt Law of Proximity
                        </p>
                        <p className="text-[13px] text-stone-600 leading-relaxed">
                            Beyond individual feature detection, the visual system applies Gestalt grouping laws to the pre-attentive output. Elements that are close together are automatically perceived as belonging to the same group. This makes spatial layout as powerful as color for creating category structure in a chart — and equally exploitable.
                        </p>
                    </div>
                    <GestaltDemo />
                </div>

                {/* Interactive demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                    <div className="relative">
                        <span className="absolute top-0 right-0 text-xs font-bold text-stone-300 select-none">1.1</span>

                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                            Live demo: parallel vs. serial search
                        </p>
                        <p className="text-[13px] text-stone-500 mb-4">
                            Toggle the switch to see how a single pre-attentive feature (color hue) instantly breaks serial processing limitations.
                        </p>

                        <div className="flex justify-center py-3 overflow-x-auto">
                            <svg
                                ref={svgRef}
                                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                                className="w-full max-w-2xl mx-auto block"
                                aria-label="Pre-attentive processing demo: grid of circles"
                            />
                        </div>

                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span className={`text-[13px] font-medium transition-colors ${!withColor ? 'text-stone-800' : 'text-stone-400'}`}>
                                Serial search (all identical)
                            </span>
                            <button
                                onClick={handleToggle}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${withColor ? 'bg-brand' : 'bg-stone-200'}`}
                                aria-label="Toggle color emphasis"
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${withColor ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <span className={`text-[13px] font-medium transition-colors ${withColor ? 'text-stone-800' : 'text-stone-400'}`}>
                                Parallel pop-out (color)
                            </span>
                        </div>

                        <p className="text-center text-[12px] text-stone-400 mt-3 leading-relaxed">
                            {withColor
                                ? `One highlighted circle among ${total - 1} grey ones — found in under 200ms without searching. Toggle again to move it to a new position.`
                                : 'All circles are identical — finding any specific one requires serial scanning. Time scales with the number of elements.'}
                        </p>
                    </div>
                </div>

                {/* Key takeaway */}
                <div className="rounded-xl bg-brand-muted border border-brand/30 p-5">
                    <p className="text-[11px] font-bold text-brand uppercase tracking-wider mb-2">Key Takeaway</p>
                    <p className="text-[13px] text-stone-700 leading-relaxed">
                        Any element that triggers pre-attentive detection will be seen before the viewer consciously decides what to look at. This is an irreversible commitment: once a colored bar or animated segment captures pre-attentive attention, the viewer has already formed an initial impression before reading a single label. Design your charts knowing this — and audit every chart to ask which element your viewers will see first, and whether that element deserves to be seen first.
                    </p>
                </div>
            </div>
        </LessonPage>
    );
}
