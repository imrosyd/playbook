import LessonPage from '../../layout/LessonPage';

function SlopegraphDemo() {
    const data = [
        { label: 'Product A', start: 85, end: 92, color: '#10b981' },
        { label: 'Product B', start: 78, end: 65, color: '#ef4444' },
        { label: 'Product C', start: 60, end: 88, color: '#10b981' },
        { label: 'Product D', start: 45, end: 40, color: '#94a3b8' },
    ];

    const h = 260, w = 480;
    const pad = { t: 40, b: 30, l: 120, r: 120 };
    const max = 100;
    const scaleY = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b);

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm overflow-x-auto">
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-xl mx-auto overflow-visible">
                <line x1={pad.l} x2={pad.l} y1={pad.t} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} />
                <line x1={w - pad.r} x2={w - pad.r} y1={pad.t} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} />

                <text x={pad.l} y={pad.t - 15} fill="#78716c" fontSize={12} textAnchor="middle">2023</text>
                <text x={w - pad.r} y={pad.t - 15} fill="#78716c" fontSize={12} textAnchor="middle">2024</text>

                {data.map((d, i) => {
                    const y1 = scaleY(d.start);
                    const y2 = scaleY(d.end);
                    return (
                        <g key={i}>
                            <line x1={pad.l} x2={w - pad.r} y1={y1} y2={y2} stroke={d.color} strokeWidth={2.5} opacity={0.85} />
                            <circle cx={pad.l} cy={y1} r={4} fill={d.color} />
                            <circle cx={w - pad.r} cy={y2} r={4} fill={d.color} />
                            <text x={pad.l - 12} y={y1 + 4} fill={d.color} fontSize={11} textAnchor="end">{d.label} {d.start}%</text>
                            <text x={w - pad.r + 12} y={y2 + 4} fill={d.color} fontSize={11} textAnchor="start">{d.end}% {d.label}</text>
                        </g>
                    )
                })}
            </svg>
            <div className="bg-stone-50 rounded-lg p-4 border border-stone-100 mt-6">
                <p className="text-[12px] text-stone-600 leading-relaxed text-center">
                    A <strong>Slopegraph</strong> strips away all intermediate noise to focus purely on the structural transition between two states. The steepness of the lines pre-attentively encodes the rate of change, and the labels are perfectly aligned with the data points.
                </p>
            </div>
        </div>
    );
}

export default function HowDidRanksChangeLesson() {
    return (
        <LessonPage>
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    When the analytical question is "How did ranks or values change from state A to state B?", a standard multi-line chart or grouped bar chart often introduces massive cognitive load. Viewers must scan back and forth, mentally calculating differences and tracking overlapping trajectories.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    The <strong>Slopegraph</strong> (introduced by Edward Tufte) is specifically designed to solve this. It pre-attentively encodes both absolute value (vertical position) and rate of change (slope steepness) while maintaining perfectly readable text labels on both sides. Use it when comparing exact start-and-end states where the journey between them is irrelevant.
                </p>

                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        State Transition: The Slopegraph
                    </p>
                    <SlopegraphDemo />
                </div>
            </div>
        </LessonPage>
    );
}
