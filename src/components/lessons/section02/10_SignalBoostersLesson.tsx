import { useState } from 'react';
import LessonPage from '../../../components/layout/LessonPage';
import ChartFrame from '../../../components/ui/ChartFrame';
import { SECTION_COLORS } from '../../../lib/design-tokens';
import { Lightbulb, Info } from 'lucide-react';

const sectionColor = SECTION_COLORS['02'].base;

const crossRefs = [
    { sectionId: 'perception', slug: 'cognitive-load', label: '1.2 — Cognitive Load: Minimizing non-data ink' },
    { sectionId: 'mechanics', slug: 'time-series', label: '2.2 — Time Series charts structure' },
];

function TurningPointDemo() {
    const [showEvent, setShowEvent] = useState(false);
    const w = 480, h = 220, pad = { t: 16, r: 20, b: 32, l: 40 };
    // Realistic dataset: Monthly active users (MAU) in thousands
    const data = [120, 135, 142, 155, 168, 180, 195, 170, 155, 140, 125, 130];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const max = 250;

    const scaleX = (i: number) => pad.l + i * ((w - pad.l - pad.r) / (data.length - 1));
    const scaleY = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b);
    const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(d)}`).join(' ');

    const eventIndex = 6; // July
    const eventX = scaleX(eventIndex);

    return (
        <div className="space-y-4 mb-16">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-stone-900">1. Highlight the Turning Point</h3>
                    <p className="text-[13px] text-stone-500 max-w-md">Using vertical markers to anchor narrative events.</p>
                </div>
                <button
                    onClick={() => setShowEvent(!showEvent)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${showEvent
                        ? 'bg-stone-900 text-white shadow-stone-200'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:shadow-md'
                        }`}
                >
                    {showEvent ? 'Hide Event Line' : 'Add Event Context'}
                </button>
            </div>

            <ChartFrame
                label="MONTHLY ACTIVE USERS (MAU)"
                note={showEvent ? "Adding a vertical dashed line instantly provides context for the inflection point. The audience no longer has to guess why the trend reversed in July." : "Without an anchor or event marker, the audience sees a sudden drop starting in July but has no narrative context for what caused it."}
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
                    {/* Gridlines */}
                    {[0, 50, 100, 150, 200, 250].map(val => (
                        <g key={val}>
                            <line x1={pad.l} x2={w - pad.r} y1={scaleY(val)} y2={scaleY(val)} stroke="#e7e5e4" strokeWidth={1} strokeDasharray={val === 0 ? "none" : "2 2"} />
                            <text x={pad.l - 8} y={scaleY(val) + 3} fill="#a8a29e" fontSize="9" textAnchor="end" className="tabular-nums">{val}k</text>
                        </g>
                    ))}

                    {/* Data Line */}
                    <path d={path} fill="none" stroke={sectionColor} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

                    {/* Data Points */}
                    {data.map((d, i) => (
                        <circle key={i} cx={scaleX(i)} cy={scaleY(d)} r={2.5} fill={sectionColor} stroke="#fff" strokeWidth={1} />
                    ))}

                    {/* Event Marker */}
                    <g style={{ opacity: showEvent ? 1 : 0, transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        <line x1={eventX} x2={eventX} y1={pad.t} y2={h - pad.b} stroke="#f97316" strokeWidth={1.5} strokeDasharray="4 3" />
                        <rect x={eventX - 35} y={pad.t} width={70} height={16} rx={4} fill="#fff" stroke="#fdba74" strokeWidth={1} shadow-sm="true" />
                        <text x={eventX} y={pad.t + 11} fill="#ea580c" fontSize="9" textAnchor="middle">Pricing Update</text>
                        <circle cx={scaleX(7)} cy={scaleY(data[7])} r={5} fill="none" stroke="#ea580c" strokeWidth={1.5} />
                    </g>

                    {/* X-axis labels */}
                    {months.map((m, i) => {
                        if (i % 2 !== 0 && w < 600) return null;
                        return <text key={i} x={scaleX(i)} y={h - pad.b + 14} fill="#a8a29e" fontSize="9" textAnchor="middle">{m}</text>
                    })}
                </svg>
            </ChartFrame>
        </div>
    );
}

function LegendInlineDemo() {
    const [inline, setInline] = useState(true);
    const w = 480, h = 220, pad = { t: 16, r: inline ? 80 : 20, b: 32, l: 40 };

    // Realistic dataset: Source of traffic
    const lines = [
        { name: 'Organic Search', data: [120, 125, 130, 145, 160, 180, 210, 230], color: '#10b981' },
        { name: 'Paid Ads', data: [80, 85, 82, 90, 88, 85, 80, 75], color: '#f59e0b' },
        { name: 'Direct Traffic', data: [50, 52, 55, 53, 58, 60, 62, 65], color: '#6366f1' }
    ];
    const quarters = ['Q1 23', 'Q2 23', 'Q3 23', 'Q4 23', 'Q1 24', 'Q2 24', 'Q3 24', 'Q4 24'];

    const max = 250;
    const scaleX = (i: number) => pad.l + i * ((w - pad.l - pad.r) / (quarters.length - 1));
    const scaleY = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b);

    return (
        <div className="space-y-4 mb-16">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-stone-900">2. Legend Inline vs Box</h3>
                    <p className="text-[13px] text-stone-500 max-w-md">Reducing eye travel by placing labels near data.</p>
                </div>
                <button
                    onClick={() => setInline(!inline)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${inline
                        ? 'bg-stone-900 text-white shadow-stone-200'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:shadow-md'
                        }`}
                >
                    {inline ? 'Show Separate Legend' : 'Use Inline Labels'}
                </button>
            </div>

            <ChartFrame
                label="SESSIONS BY TRAFFIC SOURCE"
                note={inline ? "Labels placed directly at the end of lines completely eliminate eye travel. The viewer instantly knows which line represents which group." : "A separate legend box forces 'ping-ponging'. The viewer looks at a line, memorizes the color, scans to the legend box, and looks back."}
            >
                <div className="relative w-full">
                    {/* Separate Legend Box */}
                    <div style={{ opacity: inline ? 0 : 1, pointerEvents: inline ? 'none' : 'auto', transition: 'opacity 0.3s' }}
                        className="absolute top-4 left-16 bg-white border border-stone-200 p-3 rounded-lg shadow-sm flex flex-col gap-2 text-[11px] font-medium z-10 w-36">
                        <span className="text-stone-400 font-bold text-[9px] uppercase tracking-wider mb-1">Traffic Source</span>
                        {lines.map(l => (
                            <div key={l.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm shadow-sm" style={{ backgroundColor: l.color }}></div>
                                <span className="text-stone-700">{l.name}</span>
                            </div>
                        ))}
                    </div>

                    <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
                        {/* Gridlines */}
                        {[0, 100, 200].map(val => (
                            <g key={val}>
                                <line x1={pad.l} x2={w - pad.r} y1={scaleY(val)} y2={scaleY(val)} stroke="#e7e5e4" strokeWidth={1} strokeDasharray={val === 0 ? "none" : "2 2"} />
                                <text x={pad.l - 8} y={scaleY(val) + 3} fill="#a8a29e" fontSize="9" textAnchor="end">{val}k</text>
                            </g>
                        ))}

                        {/* X-axis labels */}
                        {quarters.map((q, i) => (
                            <text key={i} x={scaleX(i)} y={h - pad.b + 14} fill="#a8a29e" fontSize="9" textAnchor="middle">{q}</text>
                        ))}

                        {/* Lines and points */}
                        {lines.map((l) => (
                            <g key={l.name}>
                                <path
                                    d={l.data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(d)}`).join(' ')}
                                    fill="none" stroke={l.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
                                />
                                {l.data.map((d, i) => (
                                    <circle key={i} cx={scaleX(i)} cy={scaleY(d)} r={2} fill={l.color} stroke="#fff" strokeWidth={1} />
                                ))}

                                {/* Inline Labels */}
                                <g style={{ opacity: inline ? 1 : 0, transition: 'opacity 0.4s ease-in-out' }}>
                                    <text
                                        x={scaleX(l.data.length - 1) + 6}
                                        y={scaleY(l.data[l.data.length - 1]) + 3}
                                        fill={l.color}
                                        fontSize="10"
                                    >
                                        {l.name}
                                    </text>
                                </g>
                            </g>
                        ))}
                    </svg>
                </div>
            </ChartFrame>
        </div>
    );
}

function EventAnnotatedDemo() {
    const w = 480, h = 220, pad = { t: 16, r: 20, b: 32, l: 40 };
    // Realistic data: Conversion rate over weeks
    const data = [2.4, 3.1, 4.5, 2.8, 3.2, 5.8, 6.1, 5.9];
    const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
    const annotations = [
        null,
        null,
        { label: "Influencer Post", dy: -15 },
        null,
        null,
        { label: "Checkout Redesign", dy: -15 },
        null,
        null
    ];

    const max = 8.0;
    const scaleX = (i: number) => pad.l + i * ((w - pad.l - pad.r) / 7);
    const scaleY = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b);

    return (
        <div className="space-y-4 mb-16">
            <h3 className="text-xl font-bold text-stone-900">3. Show the Story (Annotations)</h3>
            <ChartFrame
                label="CONVERSION RATE"
                note="Instead of just showing vertices and expecting the audience to know 'what happened in Week 3', annotate the peaks directly inside the chart. This turns a simple 'data dump' into a cohesive story."
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
                    {/* Gridlines */}
                    {[0, 2, 4, 6, 8].map(val => (
                        <g key={val}>
                            <line x1={pad.l} x2={w - pad.r} y1={scaleY(val)} y2={scaleY(val)} stroke="#e7e5e4" strokeWidth={1} strokeDasharray={val === 0 ? "none" : "2 2"} />
                            <text x={pad.l - 8} y={scaleY(val) + 3} fill="#a8a29e" fontSize="9" textAnchor="end">{val}%</text>
                        </g>
                    ))}

                    {/* X-axis labels */}
                    {weeks.map((q, i) => (
                        <text key={i} x={scaleX(i)} y={h - pad.b + 14} fill="#a8a29e" fontSize="9" textAnchor="middle">{q}</text>
                    ))}

                    <path
                        d={data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(d)}`).join(' ')}
                        fill="none" stroke="#64748b" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
                    />
                    {data.map((d, i) => {
                        const ann = annotations[i];
                        return (
                            <g key={i}>
                                <circle cx={scaleX(i)} cy={scaleY(d)} r={ann ? 4 : 2} fill={ann ? '#0f172a' : '#94a3b8'} stroke={ann ? '#fff' : 'none'} strokeWidth={ann ? 1 : 0} />
                                {ann && (
                                    <g>
                                        <rect x={scaleX(i) - 35} y={scaleY(d) + ann.dy - 10} width={70} height={14} rx={2} fill="#0f172a" opacity={0.9} />
                                        <text x={scaleX(i)} y={scaleY(d) + ann.dy} fill="#fff" fontSize="8" textAnchor="middle" letterSpacing="0.2">
                                            {ann.label}
                                        </text>
                                        <line x1={scaleX(i)} x2={scaleX(i)} y1={scaleY(d) - 4} y2={scaleY(d) + ann.dy + 4} stroke="#0f172a" strokeWidth={1.5} />
                                    </g>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </ChartFrame>
        </div>
    );
}

function ConfidenceBandDemo() {
    const w = 480, h = 220, pad = { t: 16, r: 20, b: 32, l: 40 };
    // Realistic dataset: Sales forecast with widening uncertainty
    const data = [120, 125, 132, 140, 145, 150, 158, 165];
    const limits = data.map((d, i) => {
        // Uncertainty grows over time starts from index 4 (the "future")
        const spread = i >= 4 ? (i - 4) * 8 + 5 : 0;
        return {
            val: d,
            upper: d + spread,
            lower: d - spread
        };
    });

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May (Now)', 'Jun', 'Jul', 'Aug'];
    const max = 220;

    const scaleX = (i: number) => pad.l + i * ((w - pad.l - pad.r) / 7);
    const scaleY = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b);

    const areaPath = limits.slice(4).map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i + 4)} ${scaleY(d.upper)}`).join(' ') +
        ' ' +
        [...limits.slice(4)].reverse().map((d, idx) => `L ${scaleX(7 - idx)} ${scaleY(d.lower)}`).join(' ') +
        ' Z';

    return (
        <div className="space-y-4 mb-16">
            <h3 className="text-xl font-bold text-stone-900">4. Show the Confidence</h3>
            <ChartFrame
                label="MRR FORECAST"
                note="Visualizing the confidence interval prevents false precision. A single thin line implies absolute certainty. By displaying a widening band, you explicitly communicate increasing risk."
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
                    {/* Gridlines */}
                    {[0, 50, 100, 150, 200].map(val => (
                        <g key={val}>
                            <line x1={pad.l} x2={w - pad.r} y1={scaleY(val)} y2={scaleY(val)} stroke="#e7e5e4" strokeWidth={1} strokeDasharray={val === 0 ? "none" : "2 2"} />
                            <text x={pad.l - 8} y={scaleY(val) + 3} fill="#a8a29e" fontSize="9" textAnchor="end">${val}k</text>
                        </g>
                    ))}

                    {/* Highlight 'Today' */}
                    <line x1={scaleX(4)} x2={scaleX(4)} y1={pad.t} y2={h - pad.b} stroke="#94a3b8" strokeWidth={1} strokeDasharray="3 3" />

                    {/* Forecast shaded area */}
                    <path d={areaPath} fill="#e0f2fe" opacity={0.6} />

                    {/* Historical Line */}
                    <path d={limits.slice(0, 5).map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(d.val)}`).join(' ')} fill="none" stroke="#0284c7" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

                    {/* Forecast Line */}
                    <path d={limits.slice(4).map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i + 4)} ${scaleY(d.val)}`).join(' ')} fill="none" stroke="#0284c7" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" />

                    {/* X-axis labels */}
                    {months.map((m, i) => (
                        <text key={i} x={scaleX(i)} y={h - pad.b + 14} fill={i === 4 ? "#0f172a" : "#a8a29e"} fontSize={i === 4 ? "10" : "9"} fontWeight={i === 4 ? "bold" : "400"} textAnchor="middle">{m}</text>
                    ))}
                </svg>
            </ChartFrame>
        </div>
    );
}

function MissingDataDemo() {
    const w = 480, h = 220, pad = { t: 16, r: 20, b: 32, l: 40 };
    // Realistic dataset: Server uptime/requests with a tracking outage
    const data = [100, 105, 110, null, null, 115, 125, 130];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];
    const max = 150;

    const scaleX = (i: number) => pad.l + i * ((w - pad.l - pad.r) / 7);
    const scaleY = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b);

    const p1 = data.slice(0, 3).map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(d!)}`).join(' ');
    const p3 = data.slice(5).map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i + 5)} ${scaleY(d!)}`).join(' ');

    return (
        <div className="space-y-4 mb-16">
            <h3 className="text-xl font-bold text-stone-900">5. Show the Transparency (Missing Data)</h3>
            <ChartFrame
                label="API REQUESTS"
                note="Connecting missing data with a solid line implies a smooth transition. Leaving a blank gap suggests zero values. The most ethically transparent approach is bridging the gap with a dashed line and an explicit 'Outage' label."
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
                    {/* Gridlines */}
                    {[0, 50, 100, 150].map(val => (
                        <g key={val}>
                            <line x1={pad.l} x2={w - pad.r} y1={scaleY(val)} y2={scaleY(val)} stroke="#e7e5e4" strokeWidth={1} strokeDasharray={val === 0 ? "none" : "2 2"} />
                            <text x={pad.l - 8} y={scaleY(val) + 3} fill="#a8a29e" fontSize="9" textAnchor="end">{val}k</text>
                        </g>
                    ))}

                    {/* Shaded Outage Period */}
                    <rect x={scaleX(2)} y={pad.t} width={scaleX(5) - scaleX(2)} height={h - pad.t - pad.b} fill="#f1f5f9" opacity={0.7} />

                    <path d={p1} fill="none" stroke="#6366f1" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                    <path d={`M ${scaleX(2)} ${scaleY(data[2]!)} L ${scaleX(5)} ${scaleY(data[5]!)}`} fill="none" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="3 3" />
                    <path d={p3} fill="none" stroke="#6366f1" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

                    {data.map((d, i) => {
                        if (d === null) return null;
                        return <circle key={i} cx={scaleX(i)} cy={scaleY(d)} r={2.5} fill="#6366f1" stroke="#fff" strokeWidth={1} />;
                    })}

                    {/* Explanation Note */}
                    <g>
                        <rect x={scaleX(3.5) - 35} y={pad.t + 10} width={70} height={16} rx={3} fill="#e2e8f0" />
                        <text x={scaleX(3.5)} y={pad.t + 21} fill="#475569" fontSize="9" textAnchor="middle">Sensor Outage</text>
                    </g>

                    {/* X-axis labels */}
                    {days.map((m, i) => (
                        <text key={i} x={scaleX(i)} y={h - pad.b + 14} fill="#a8a29e" fontSize="9" textAnchor="middle">{m}</text>
                    ))}
                </svg>
            </ChartFrame>
        </div>
    );
}

function DifferenceShadingDemo() {
    const w = 480, h = 220, pad = { t: 16, r: 50, b: 32, l: 40 };
    // Realistic dataset: Target vs Actual Revenue
    const target = [100, 110, 120, 130, 140, 150];
    const actual = [100, 120, 135, 125, 120, 140];
    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const max = 160;

    const scaleX = (i: number) => pad.l + i * ((w - pad.l - pad.r) / 5);
    const scaleY = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b);

    const pathTarget = target.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(d)}`).join(' ');
    const pathActual = actual.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(d)}`).join(' ');

    // Fill area from month 0 to 3.5 (where they cross roughly)
    const overS = `M ${scaleX(0)} ${scaleY(actual[0])} L ${scaleX(1)} ${scaleY(actual[1])} L ${scaleX(2)} ${scaleY(actual[2])} L ${scaleX(3)} ${scaleY(actual[3])}
                   L ${scaleX(3.5)} ${scaleY(135)}
                   L ${scaleX(3)} ${scaleY(target[3])} L ${scaleX(2)} ${scaleY(target[2])} L ${scaleX(1)} ${scaleY(target[1])} L ${scaleX(0)} ${scaleY(target[0])} Z`;

    const underS = `M ${scaleX(3.5)} ${scaleY(135)} L ${scaleX(4)} ${scaleY(actual[4])} L ${scaleX(5)} ${scaleY(actual[5])}
                    L ${scaleX(5)} ${scaleY(target[5])} L ${scaleX(4)} ${scaleY(target[4])} Z`;

    return (
        <div className="space-y-4 mb-16">
            <h3 className="text-xl font-bold text-stone-900">6. Show the Difference</h3>
            <ChartFrame
                label="REVENUE: TARGET VS ACTUAL"
                note="When comparing two lines, the most critical piece of information is the gap between them. Shading the area between the lines instantly draws the eye to the deficit or surplus."
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
                    {/* Gridlines */}
                    {[0, 40, 80, 120, 160].map(val => (
                        <g key={val}>
                            <line x1={pad.l} x2={w - pad.r} y1={scaleY(val)} y2={scaleY(val)} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />
                            <text x={pad.l - 8} y={scaleY(val) + 3} fill="#a8a29e" fontSize="9" textAnchor="end">{val}</text>
                        </g>
                    ))}

                    {/* Shaded differnces */}
                    <path d={overS} fill="#bbf7d0" opacity={0.6} /> {/* green = over target */}
                    <path d={underS} fill="#fecaca" opacity={0.6} /> {/* red = under target */}

                    {/* Lines */}
                    <path d={pathTarget} fill="none" stroke="#78716c" strokeWidth={2} strokeDasharray="4 4" />
                    <path d={pathActual} fill="none" stroke="#1c1917" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

                    {/* Inline Labels */}
                    <text x={scaleX(5) + 6} y={scaleY(target[5]) + 3} fill="#78716c" fontSize="10">Target</text>
                    <text x={scaleX(5) + 6} y={scaleY(actual[5]) + 3} fill="#1c1917" fontSize="10">Actual</text>

                    {/* Area Annotations */}
                    <text x={scaleX(1.5)} y={scaleY(116)} fill="#16a34a" fontSize="9">Surplus</text>
                    <text x={scaleX(4.5)} y={scaleY(135)} fill="#dc2626" fontSize="9">Deficit</text>

                    {/* X-axis labels */}
                    {months.map((m, i) => (
                        <text key={i} x={scaleX(i)} y={h - pad.b + 14} fill="#a8a29e" fontSize="9" textAnchor="middle">{m}</text>
                    ))}
                </svg>
            </ChartFrame>
        </div>
    );
}

function ShadedRegionDemo() {
    const w = 480, h = 220, pad = { t: 16, r: 20, b: 32, l: 40 };
    // Realistic dataset: Daily signups showing a clear spike during a promo
    const data = [120, 125, 118, 122, 280, 310, 290, 140, 135, 128];
    const days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const max = 350;

    const scaleX = (i: number) => pad.l + i * ((w - pad.l - pad.r) / 9);
    const scaleY = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b);

    const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(d)}`).join(' ');

    return (
        <div className="space-y-4 mb-16">
            <h3 className="text-xl font-bold text-stone-900">7. Contextual Region Shading</h3>
            <ChartFrame
                label="DAILY SIGNUPS"
                note="Shading a vertical region clarifies that a specific spike isn't an organic anomaly, but the direct result of a known external period. It frames the data visually before the numbers are read."
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
                    {/* Gridlines */}
                    {[0, 100, 200, 300].map(val => (
                        <g key={val}>
                            <line x1={pad.l} x2={w - pad.r} y1={scaleY(val)} y2={scaleY(val)} stroke="#e7e5e4" strokeWidth={1} strokeDasharray={val === 0 ? "none" : "2 2"} />
                            <text x={pad.l - 8} y={scaleY(val) + 3} fill="#a8a29e" fontSize="9" textAnchor="end">{val}</text>
                        </g>
                    ))}

                    {/* Shaded Region */}
                    <rect x={scaleX(3.5)} y={pad.t} width={scaleX(6.5) - scaleX(3.5)} height={h - pad.t - pad.b} fill="#fef08a" opacity={0.5} />
                    <line x1={scaleX(3.5)} x2={scaleX(3.5)} y1={pad.t} y2={h - pad.b} stroke="#ca8a04" strokeWidth={1} strokeDasharray="2 2" />
                    <line x1={scaleX(6.5)} x2={scaleX(6.5)} y1={pad.t} y2={h - pad.b} stroke="#ca8a04" strokeWidth={1} strokeDasharray="2 2" />

                    <rect x={scaleX(5) - 30} y={pad.t} width={60} height={16} rx={3} fill="#ca8a04" opacity={0.9} />
                    <text x={scaleX(5)} y={pad.t + 11} fill="#fff" fontSize="9" textAnchor="middle">Flash Sale</text>

                    {/* Line & Points */}
                    <path d={path} fill="none" stroke="#0ea5e9" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                    {data.map((d, i) => (
                        <circle key={i} cx={scaleX(i)} cy={scaleY(d)} r={2.5} fill="#0ea5e9" stroke="#fff" strokeWidth={1} />
                    ))}

                    {/* X-axis labels */}
                    {days.map((m, i) => (
                        <text key={i} x={scaleX(i)} y={h - pad.b + 14} fill="#a8a29e" fontSize="9" textAnchor="middle">{m}</text>
                    ))}
                </svg>
            </ChartFrame>
        </div>
    );
}

export default function SignalBoostersLesson() {
    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Line charts are the ubiquitous default for time-series data. However, a raw line chart often leaves too much interpretation up to the audience. By employing strategic annotations, gap treatments, and context shading, you can dramatically boost the "signal" of your chart — moving it from a raw data display to a guided narrative.
                </p>

                {/* Tip Block */}
                <div
                    className="rounded-xl p-5 space-y-3 border transition-all hover:shadow-sm"
                    style={{
                        backgroundColor: `${sectionColor}08`,
                        borderColor: `${sectionColor}20`,
                    }}
                >
                    <div className="flex items-start gap-3">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
                            style={{ backgroundColor: sectionColor }}
                        >
                            <Lightbulb size={16} className="text-white" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: sectionColor }}>
                                The Signal Rule
                            </p>
                            <p className="text-[14px] text-stone-700 leading-relaxed">
                                Every chart should have a clear <em>narrative anchor</em>. If you show a spike or a dip, your job is to explain why it happened visually, not just numerically.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <TurningPointDemo />
                    <LegendInlineDemo />
                    <EventAnnotatedDemo />
                    <ConfidenceBandDemo />
                    <MissingDataDemo />
                    <DifferenceShadingDemo />
                    <ShadedRegionDemo />
                </div>

                {/* Conclusion Block */}
                <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 space-y-4">
                    <div className="flex items-center gap-3 text-stone-900">
                        <Info size={20} className="text-stone-400" />
                        <h4 className="text-lg font-bold">Choosing the Right Booster</h4>
                    </div>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        Don't use all these techniques at once. A chart with markers, bands, shading, and annotations will create excessive cognitive load. Choose the <em>one</em> booster that supports your primary takeaway. Highlighting a deficit? Use difference shading. Explaining an outage? Use transparency.
                    </p>
                </div>
            </div>
        </LessonPage>
    );
}
