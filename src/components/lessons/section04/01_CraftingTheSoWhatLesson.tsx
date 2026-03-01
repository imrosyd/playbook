import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = [
    { sectionId: 'perception', slug: 'anchoring', label: 'The Anchor Effect' },
    { sectionId: 'lab', slug: 'annotation-trend', label: 'The Magic Words' },
];

// Bar chart: descriptive vs insight-driven
function InsightGapChart() {
    const bars = [
        { label: 'Data presented', pct: 95, color: '#a8a29e' },
        { label: 'Context given', pct: 60, color: '#a8a29e' },
        { label: '"So what" stated', pct: 12, color: '#dc2626' },
        { label: 'Action requested', pct: 8, color: '#dc2626' },
    ];

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">
                What most presentations include — Deloitte research, n=2,200 executives
            </p>
            <div className="space-y-3">
                {bars.map((b) => (
                    <div key={b.label}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[12px] text-stone-600 font-medium">{b.label}</span>
                            <span className="text-[12px] font-bold tabular-nums" style={{ color: b.color }}>{b.pct}%</span>
                        </div>
                        <div className="h-2.5 bg-stone-100 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all"
                                style={{ width: `${b.pct}%`, backgroundColor: b.color }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-[11px] text-stone-400 mt-4 leading-relaxed">
                Only 8% of data presentations include a clear, specific action request — yet that is what executives need to make a decision.
            </p>
        </div>
    );
}

export default function CraftingTheSoWhatLesson() {
    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    You've just spent three hours pulling together data, building charts, and verifying the numbers. The presentation is tight. But when you stand up in the meeting, the CFO leans back and asks: <strong>"So what do you want me to do with this?"</strong>
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    That question is the single biggest failure point in data presentations. Most people present data beautifully — and then leave the room without a decision.
                </p>

                <InsightGapChart />

                <TheoryBlock
                    title="The Insight Gap (Why This Happens)"
                    theory="Kahneman's Dual Process Theory (System 1 vs System 2)"
                    explanation="Executives operate in System 1 mode most of the day — fast, intuitive, pattern-matching. When you present raw data, you're forcing them into System 2 (slow, analytical). They resist this. The 'So What' is the bridge: you do the analytical work for them, and present only the conclusion they need to act on."
                />

                <div className="space-y-5">
                    <h3 className="text-base font-bold text-stone-800">The 3-Question Framework</h3>
                    <p className="text-[14px] text-stone-500 leading-relaxed">
                        Before presenting any chart, answer these three questions in writing. If you can't answer all three, you're not ready to present.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { num: '1', q: 'What happened?', a: 'The factual observation.', example: 'Revenue dropped 15% in August.' },
                            { num: '2', q: 'Why does it matter?', a: 'The business consequence.', example: 'At this rate, we miss Q3 target by $400K.' },
                            { num: '3', q: 'What should we do?', a: 'The specific action needed.', example: 'Approve the churn reduction budget today.' },
                        ].map(({ num, q, a, example }) => (
                            <div key={num} className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-6 h-6 rounded-full bg-stone-800 text-white text-[11px] font-black flex items-center justify-center shrink-0">{num}</span>
                                    <p className="text-[13px] font-bold text-stone-800">{q}</p>
                                </div>
                                <p className="text-[12px] text-stone-500 mb-3">{a}</p>
                                <div className="bg-white rounded-lg border border-stone-200 px-3 py-2">
                                    <p className="text-[12px] text-stone-600 leading-relaxed italic">"{example}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-base font-bold text-stone-800">Before & After</h3>
                    <div className="space-y-3">
                        {[
                            {
                                before: 'Here is the revenue data for the last quarter.',
                                after: 'Revenue dropped 15% in August — churn in SMB is the root cause. Approve the intervention budget today.'
                            },
                            {
                                before: 'This chart shows our marketing ROI across channels.',
                                after: 'Email delivers 4x the ROI of paid social. Shifting 20% of budget to email generates an estimated $80K uplift this quarter.'
                            },
                        ].map(({ before, after }, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-stone-200">
                                <div className="bg-stone-50 p-4 border-r border-stone-200">
                                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2">Descriptive</p>
                                    <p className="text-[13px] text-stone-600 italic leading-relaxed">"{before}"</p>
                                </div>
                                <div className="bg-white p-4">
                                    <p className="text-[10px] font-bold text-stone-800 uppercase tracking-wider mb-2">Decision-driving</p>
                                    <p className="text-[13px] text-stone-700 leading-relaxed">"{after}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
