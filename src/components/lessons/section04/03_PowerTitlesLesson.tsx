import { useState } from 'react';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = [
    { sectionId: 'storytelling', slug: 'slide-structure', label: 'The 3-Part Structure' },
    { sectionId: 'lab', slug: 'annotation-trend', label: 'Annotation in the Lab' },
];

// Inline line chart to show the trend the "power title" should caption
function RevenueTrendChart({ highlighted }: { highlighted: boolean }) {
    const points = [320, 340, 310, 305, 285, 260, 255, 242];
    const w = 360, h = 140, pad = { l: 30, r: 16, t: 16, b: 32 };
    const maxV = 380, minV = 220;

    const toX = (i: number) => pad.l + (i / (points.length - 1)) * (w - pad.l - pad.r);
    const toY = (v: number) => pad.t + (1 - (v - minV) / (maxV - minV)) * (h - pad.t - pad.b);

    const pathD = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-3">
            <div className="space-y-1">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Slide headline</p>
                {highlighted ? (
                    <p className="text-[14px] font-bold text-stone-900 leading-snug">
                        Revenue has declined 24% in 8 months — churn acceleration is the root cause
                    </p>
                ) : (
                    <p className="text-[14px] text-stone-400 leading-snug">Monthly Revenue Q1–Q3 2025</p>
                )}
            </div>
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: 140 }}>
                {/* Y gridlines */}
                {[220, 280, 340].map(v => (
                    <line key={v} x1={pad.l} x2={w - pad.r} y1={toY(v)} y2={toY(v)} stroke="#f5f5f4" strokeWidth={1} />
                ))}
                {/* Line */}
                <path d={pathD} fill="none" stroke={highlighted ? '#dc2626' : '#d6d3d1'} strokeWidth={2} strokeLinejoin="round" />
                {/* Dots */}
                {points.map((v, i) => (
                    <circle key={i} cx={toX(i)} cy={toY(v)} r={3} fill={highlighted ? '#dc2626' : '#d6d3d1'} />
                ))}
                {/* Drop annotation when highlighted */}
                {highlighted && (
                    <>
                        <line x1={toX(0)} x2={toX(0)} y1={toY(320)} y2={toY(242)} stroke="#dc2626" strokeWidth={1} strokeDasharray="3 3" />
                        <text x={toX(0) + 4} y={toY(280)} fill="#dc2626" fontSize={9}>−24%</text>
                    </>
                )}
                {/* X labels */}
                {months.map((m, i) => (
                    <text key={m} x={toX(i)} y={h - 6} textAnchor="middle" fill="#a8a29e" fontSize={9}>{m}</text>
                ))}
            </svg>
            <div className="flex items-center gap-3 pt-1">
                <span className="text-[12px] text-stone-400 font-medium">Descriptive title</span>
                <button
                    onClick={() => { }}
                    className="flex items-center gap-2 text-[12px] font-semibold text-stone-600"
                >
                </button>
            </div>
        </div>
    );
}

export default function PowerTitlesLesson() {
    const [powered, setPowered] = useState(false);

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Every slide has a title. A Power Title is different — it states the conclusion, not the topic. It makes the decision implicit. When your audience reads it, they already know what you're asking before they see the chart.
                </p>

                <TheoryBlock
                    title="Why Titles Are Your Most Valuable Real Estate"
                    theory="Miller's Law of Working Memory + The Inverted Pyramid"
                    explanation="Working memory holds 7 items (±2). A descriptive title like 'Q3 Revenue' burns one slot on a label that adds nothing. A Power Title uses that same slot to deliver the insight — freeing the rest of working memory to engage with the implications rather than decode the chart."
                />

                <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Live example — toggle the title</p>
                        <button
                            onClick={() => setPowered(v => !v)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${powered ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'}`}
                        >
                            {powered ? 'Power Title ON' : 'Descriptive Title'}
                        </button>
                    </div>
                    <RevenueTrendChart highlighted={powered} />
                    {powered && (
                        <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                            <p className="text-[12px] text-stone-600 leading-relaxed">
                                Notice how the title frames the red line as a problem and "churn acceleration" as the cause — before the decision-maker has read a single axis label.
                            </p>
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <h3 className="text-base font-bold text-stone-800">The rewrite formula</h3>
                    <div className="rounded-xl border border-stone-200 overflow-hidden">
                        <div className="grid grid-cols-2 bg-stone-50 border-b border-stone-200">
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-5 py-3">Descriptive (avoidable)</p>
                            <p className="text-[10px] font-bold text-stone-800 uppercase tracking-wider px-5 py-3">Power Title (what to use)</p>
                        </div>
                        {[
                            { d: 'Q3 Revenue', p: 'Revenue missed target by $400K in Q3 — churn in SMB is accelerating' },
                            { d: 'Customer Satisfaction Trend', p: 'NPS dropped 12 pts in 6 months — enterprise renewal risk is $1.2M' },
                            { d: 'Marketing Channel ROI', p: 'Email returns 4× paid social ROI — reallocating 20% of budget adds $80K' },
                            { d: 'Headcount by Department', p: 'Engineering is 31% over target while Sales is 18% under — hiring strategy is misaligned' },
                        ].map(({ d, p }, i) => (
                            <div key={i} className="grid grid-cols-2 border-b border-stone-100 last:border-0">
                                <p className="text-[12px] text-stone-400 px-5 py-3 leading-relaxed italic border-r border-stone-100">{d}</p>
                                <p className="text-[12px] text-stone-700 px-5 py-3 leading-relaxed">{p}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
