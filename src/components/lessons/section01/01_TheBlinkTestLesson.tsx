import { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import LessonPage from '../../../components/layout/LessonPage';
import ChartFrame from '../../ui/ChartFrame';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';

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
function GestaltDemo({ lang }: { lang: any }) {
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
                        {m === 'spread' ? t(lang, 's1.blinkTest.gestaltSpreadLabel') : t(lang, 's1.blinkTest.gestaltGroupedLabel')}
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
                    ? t(lang, 's1.blinkTest.gestaltGroupedCaption')
                    : t(lang, 's1.blinkTest.gestaltSpreadCaption')}
            </p>
        </div>
    );
}

export default function TheBlinkTestLesson() {
    const { lang } = useLang();
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
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's1.blinkTest.intro1') }} />
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's1.blinkTest.intro2') }} />
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's1.blinkTest.intro3') }} />
                </div>

                {/* Channel cards */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's1.blinkTest.rankedChannels')}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            {
                                id: 'hue',
                                title: t(lang, 's1.blinkTest.channels.hue.title'),
                                strength: t(lang, 's1.blinkTest.channels.hue.strength'),
                                example: t(lang, 's1.blinkTest.channels.hue.example'),
                                detail: t(lang, 's1.blinkTest.channels.hue.detail'),
                                risk: t(lang, 's1.blinkTest.channels.hue.risk'),
                            },
                            {
                                id: 'size',
                                title: t(lang, 's1.blinkTest.channels.size.title'),
                                strength: t(lang, 's1.blinkTest.channels.size.strength'),
                                example: t(lang, 's1.blinkTest.channels.size.example'),
                                detail: t(lang, 's1.blinkTest.channels.size.detail'),
                                risk: t(lang, 's1.blinkTest.channels.size.risk'),
                            },
                            {
                                id: 'position',
                                title: t(lang, 's1.blinkTest.channels.position.title'),
                                strength: t(lang, 's1.blinkTest.channels.position.strength'),
                                example: t(lang, 's1.blinkTest.channels.position.example'),
                                detail: t(lang, 's1.blinkTest.channels.position.detail'),
                                risk: t(lang, 's1.blinkTest.channels.position.risk'),
                            },
                            {
                                id: 'orientation',
                                title: t(lang, 's1.blinkTest.channels.orientation.title'),
                                strength: t(lang, 's1.blinkTest.channels.orientation.strength'),
                                example: t(lang, 's1.blinkTest.channels.orientation.example'),
                                detail: t(lang, 's1.blinkTest.channels.orientation.detail'),
                                risk: t(lang, 's1.blinkTest.channels.orientation.risk'),
                            },
                            {
                                id: 'shape',
                                title: t(lang, 's1.blinkTest.channels.shape.title'),
                                strength: t(lang, 's1.blinkTest.channels.shape.strength'),
                                example: t(lang, 's1.blinkTest.channels.shape.example'),
                                detail: t(lang, 's1.blinkTest.channels.shape.detail'),
                                risk: t(lang, 's1.blinkTest.channels.shape.risk'),
                            },
                            {
                                id: 'motion',
                                title: t(lang, 's1.blinkTest.channels.motion.title'),
                                strength: t(lang, 's1.blinkTest.channels.motion.strength'),
                                example: t(lang, 's1.blinkTest.channels.motion.example'),
                                detail: t(lang, 's1.blinkTest.channels.motion.detail'),
                                risk: t(lang, 's1.blinkTest.channels.motion.risk'),
                            },
                        ].map((item: any) => (
                            <div key={item.id} className="bg-white rounded-xl border border-stone-200 p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] font-bold text-stone-800">{item.title}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${['Strongest', 'Strongest (when available)', 'Paling Kuat', 'Paling Kuat (jika ada)'].includes(item.strength) ? 'bg-emerald-100 text-emerald-700' : ['Strong', 'Kuat'].includes(item.strength) ? 'bg-blue-100 text-blue-700' : 'bg-stone-100 text-stone-600'}`}>
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
                    note={t(lang, 's1.blinkTest.chartNote')}
                >
                    <ReactionTimeChart />
                </ChartFrame>

                {/* Research basis */}
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-5">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">{t(lang, 's1.blinkTest.researchBasis')}</p>
                    <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
                        {t(lang, 's1.blinkTest.research1')}
                    </p>
                    <p className="text-[13px] text-stone-600 leading-relaxed">
                        {t(lang, 's1.blinkTest.research2')}
                    </p>
                </div>

                {/* Gestalt demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-4">
                    <div>
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                            {t(lang, 's1.blinkTest.gestaltLaw')}
                        </p>
                        <p className="text-[13px] text-stone-600 leading-relaxed">
                            {t(lang, 's1.blinkTest.gestaltDesc')}
                        </p>
                    </div>
                    <GestaltDemo lang={lang} />
                </div>

                {/* Interactive demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                    <div className="relative">
                        <span className="absolute top-0 right-0 text-xs font-bold text-stone-300 select-none">1.1</span>

                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                            {t(lang, 's1.blinkTest.liveDemoTitle')}
                        </p>
                        <p className="text-[13px] text-stone-500 mb-4">
                            {t(lang, 's1.blinkTest.liveDemoDesc')}
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
                                {t(lang, 's1.blinkTest.serialSearch')}
                            </span>
                            <button
                                onClick={handleToggle}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${withColor ? 'bg-brand' : 'bg-stone-200'}`}
                                aria-label="Toggle color emphasis"
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${withColor ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <span className={`text-[13px] font-medium transition-colors ${withColor ? 'text-stone-800' : 'text-stone-400'}`}>
                                {t(lang, 's1.blinkTest.parallelPop')}
                            </span>
                        </div>

                        <p className="text-center text-[12px] text-stone-400 mt-3 leading-relaxed">
                            {withColor
                                ? t(lang, 's1.blinkTest.demoCaptionParallel', total - 1)
                                : t(lang, 's1.blinkTest.demoCaptionSerial')}
                        </p>
                    </div>
                </div>

                {/* Key takeaway */}
                <div className="rounded-xl bg-brand-muted border border-brand/30 p-5">
                    <p className="text-[11px] font-bold text-brand uppercase tracking-wider mb-2">{t(lang, 's1.blinkTest.keyTakeawayTitle')}</p>
                    <p className="text-[13px] text-stone-700 leading-relaxed">
                        {t(lang, 's1.blinkTest.keyTakeawayContent')}
                    </p>
                </div>
            </div>
        </LessonPage>
    );
}
