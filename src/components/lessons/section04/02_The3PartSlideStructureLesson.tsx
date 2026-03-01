import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = [
    { sectionId: 'storytelling', slug: 'so-what', label: 'Crafting the "So What"' },
    { sectionId: 'storytelling', slug: 'power-titles', label: 'Power Titles' },
];

// Pyramid chart (inverted SCQA) using SVG trapezoids
function PyramidChart() {
    const layers = [
        { label: 'Answer / Recommendation', width: 100, color: '#1c1917', textColor: '#fff' },
        { label: 'Key argument (why?)', width: 74, color: '#44403c', textColor: '#fff' },
        { label: 'Supporting evidence', width: 50, color: '#78716c', textColor: '#fff' },
        { label: 'Context & background', width: 28, color: '#d6d3d1', textColor: '#44403c' },
    ];

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">
                The Minto Pyramid — answer first, then justify
            </p>
            <div className="space-y-1.5 flex flex-col items-center">
                {layers.map((l, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-center rounded text-center transition-all"
                        style={{
                            width: `${l.width}%`,
                            backgroundColor: l.color,
                            padding: '10px 16px',
                        }}
                    >
                        <span className="text-[11px] font-semibold leading-tight" style={{ color: l.textColor }}>
                            {l.label}
                        </span>
                    </div>
                ))}
            </div>
            <p className="text-[11px] text-stone-400 mt-4 leading-relaxed">
                Most presentations build bottom-up (context first, answer last). Executives want top-down (answer first, context as needed).
            </p>
        </div>
    );
}

// Audience attention span — area chart
function AttentionChart() {
    const pts = [98, 82, 65, 55, 48, 42, 38, 36, 40, 45]; // typical attention arc
    const w = 360, h = 100, pad = { l: 20, r: 16, t: 16, b: 28 };
    const toX = (i: number) => pad.l + (i / (pts.length - 1)) * (w - pad.l - pad.r);
    const toY = (v: number) => pad.t + (1 - (v - 30) / 70) * (h - pad.t - pad.b);
    const pathD = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ');
    const areaD = `${pathD} L${toX(pts.length - 1)},${toY(30)} L${toX(0)},${toY(30)} Z`;

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                Audience attention during a presentation (typical arc)
            </p>
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
                <defs>
                    <linearGradient id="attn" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1c1917" stopOpacity={0.1} />
                        <stop offset="100%" stopColor="#1c1917" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <path d={areaD} fill="url(#attn)" />
                <path d={pathD} fill="none" stroke="#1c1917" strokeWidth={2} strokeLinejoin="round" />
                {/* Annotations */}
                <text x={toX(0)} y={toY(98) - 6} fill="#1c1917" fontSize={9} textAnchor="middle">Opening</text>
                <text x={toX(9)} y={toY(45) - 6} fill="#1c1917" fontSize={9} textAnchor="middle">Ending</text>
                <text x={toX(5)} y={toY(40) + 12} fill="#a8a29e" fontSize={9} textAnchor="middle">Attention trough</text>
                {/* Minutes */}
                {[0, 2, 5, 8, 10].map((m) => {
                    const idx = Math.round((m / 10) * (pts.length - 1));
                    return <text key={m} x={toX(idx)} y={h - 6} fill="#a8a29e" fontSize={8} textAnchor="middle">{m}m</text>;
                })}
            </svg>
            <p className="text-[11px] text-stone-400 mt-2 leading-relaxed">
                Audiences pay closest attention at the start and end. The 3-part structure exploits both peaks: conclusion at the top, action at the close.
            </p>
        </div>
    );
}

export default function The3PartSlideStructureLesson() {
    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Most presentations fail before Slide 2. Not because the data is wrong, but because the structure is backwards. People open with context, build up slowly, and reveal the conclusion at the end — right when executives have already decided to check their phones.
                </p>

                <AttentionChart />

                <TheoryBlock
                    title="Why the Pyramid Works"
                    theory="Barbara Minto's SCQA Framework (Situation, Complication, Question, Answer)"
                    explanation="The brain craves the answer first. SCQA flips the traditional academic structure (build-up to conclusion) into an executive-ready format: give the answer upfront, then justify it. This reduces cognitive load and forces the audience to engage with your reasoning rather than waiting for your point."
                />

                <PyramidChart />

                <div className="space-y-4">
                    <h3 className="text-base font-bold text-stone-800">The 3-Part Slide Formula</h3>
                    <div className="space-y-3">
                        {[
                            {
                                num: '01', label: 'Power Headline',
                                rule: 'State the conclusion, not the topic.',
                                bad: 'Q3 Revenue Performance',
                                good: 'Revenue Missed Target by 15% — Churn in SMB is the Primary Driver',
                            },
                            {
                                num: '02', label: 'The Chart',
                                rule: 'Show only what proves the headline.',
                                bad: 'A 12-series chart with 3 years of data and 4 benchmarks.',
                                good: 'One clear line with the drop highlighted and the culprit segment annotated.',
                            },
                            {
                                num: '03', label: 'The Takeaway',
                                rule: 'End with the exact action needed.',
                                bad: 'Something must be done about churn.',
                                good: 'Approve the $80K churn intervention budget today to protect Q4.',
                            },
                        ].map(({ num, label, rule, bad, good }) => (
                            <div key={num} className="rounded-xl border border-stone-200 overflow-hidden">
                                <div className="flex items-center gap-3 bg-stone-50 border-b border-stone-200 px-5 py-3">
                                    <span className="text-lg font-black text-stone-300">{num}</span>
                                    <span className="text-sm font-bold text-stone-800">{label}</span>
                                    <span className="ml-auto text-[11px] text-stone-400 italic">{rule}</span>
                                </div>
                                <div className="grid grid-cols-2 divide-x divide-stone-100 bg-white">
                                    <div className="p-4">
                                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2">Weak</p>
                                        <p className="text-[13px] text-stone-500 italic leading-relaxed">{bad}</p>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-2">Stronger</p>
                                        <p className="text-[13px] text-stone-700 leading-relaxed">{good}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
