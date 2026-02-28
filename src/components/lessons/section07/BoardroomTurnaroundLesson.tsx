import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = [
    { sectionId: 'storytelling', slug: 'power-titles', label: 'Power Titles' },
    { sectionId: 'storytelling', slug: 'so-what', label: 'Crafting the "So What"' },
];

// Before / after dumbbell chart
function DumbbellChart() {
    const items = [
        { metric: 'Revenue forecast (yr 1)', before: 2.1, after: 4.8, unit: '$M', good: true },
        { metric: 'Time to breakeven', before: 36, after: 18, unit: ' mo', good: false }, // lower is better
        { metric: 'Market share target', before: 3, after: 9, unit: '%', good: true },
        { metric: 'Customer acq. cost', before: 420, after: 210, unit: '$', good: false },
    ];

    const maxRatio = 2.5;

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">
                How the forecast changed when the chart was restructured
            </p>
            <div className="space-y-5">
                {items.map(d => {
                    const maxV = Math.max(d.before, d.after) * 1.2;
                    const bPct = (d.before / maxV) * 100;
                    const aPct = (d.after / maxV) * 100;
                    const isImprovement = d.good ? d.after > d.before : d.after < d.before;

                    return (
                        <div key={d.metric}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[12px] font-medium text-stone-600">{d.metric}</span>
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isImprovement ? 'bg-stone-100 text-stone-700' : 'bg-stone-100 text-stone-700'}`}>
                                    {isImprovement ? '+' : ''}
                                    {d.good
                                        ? `${Math.round(((d.after - d.before) / d.before) * 100)}%`
                                        : `−${Math.round(((d.before - d.after) / d.before) * 100)}%`}
                                </span>
                            </div>
                            <div className="relative h-5 bg-stone-50 rounded-full overflow-hidden">
                                {/* Before marker */}
                                <div className="absolute top-0 bottom-0 flex items-center" style={{ left: `${Math.min(bPct, aPct)}%`, width: `${Math.abs(aPct - bPct)}%` }}>
                                    <div className="w-full h-2 bg-stone-200 rounded-full" />
                                </div>
                                {/* Before dot */}
                                <div className="absolute top-1/2 w-3 h-3 bg-stone-400 rounded-full border-2 border-white -translate-y-1/2" style={{ left: `calc(${bPct}% - 6px)` }} />
                                {/* After dot */}
                                <div className="absolute top-1/2 w-3 h-3 bg-stone-900 rounded-full border-2 border-white -translate-y-1/2" style={{ left: `calc(${aPct}% - 6px)` }} />
                            </div>
                            <div className="flex items-center justify-between mt-1 text-[10px] text-stone-400">
                                <span>Before: {d.before}{d.unit}</span>
                                <span>After: <strong className="text-stone-700">{d.after}{d.unit}</strong></span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex items-center gap-4 mt-3 text-[10px] text-stone-400">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-stone-400 inline-block" /> Initial projection</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-stone-900 inline-block" /> Restated projection</span>
            </div>
        </div>
    );
}

export default function BoardroomTurnaroundLesson() {
    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    In 2019, a growth-stage SaaS company presented to its board of directors seeking Series B funding. The first presentation was rejected — not because the business metrics were bad, but because the charts made them look uncertain and scattered. Three weeks later, the exact same data, restructured with Power Titles and a clear decision framing, was approved. No numbers changed.
                </p>

                <TheoryBlock
                    title="Framing and Prospect Theory"
                    theory="Kahneman & Tversky's Prospect Theory (1979) + Framing Effect"
                    explanation="People respond differently to the same information depending on how it is framed. 'We lost $400K' and 'We are $400K behind a plan that grows 4× by Year 3' are mathematically identical — but produce different emotional and cognitive responses. The second frame activates opportunity orientation; the first activates loss aversion. Charts that frame data correctly do not change the numbers; they change the question the decision-maker is answering."
                />

                <DumbbellChart />

                <div className="space-y-3">
                    <h3 className="text-base font-bold text-stone-800">What changed between the two versions</h3>
                    <div className="rounded-xl border border-stone-200 overflow-hidden">
                        <div className="grid grid-cols-2 bg-stone-50 border-b border-stone-200">
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-5 py-3">Version 1 (rejected)</p>
                            <p className="text-[10px] font-bold text-stone-800 uppercase tracking-wider px-5 py-3">Version 2 (approved)</p>
                        </div>
                        {[
                            { v1: 'Slide title: "Q3 Performance"', v2: 'Slide title: "Revenue is 15% behind plan — and recoverable by Q1"' },
                            { v1: '12-series chart with quarterly breakdown by product line', v2: 'Single annotated line chart showing the gap and the recovery curve' },
                            { v1: 'Buried takeaway in slide 14 closing thoughts', v2: 'Action framed as first bullet: "$4M bridge request enables breakeven by Month 18"' },
                            { v1: 'Descriptive axis: "Revenue USD 000s"', v2: 'Annotated: "Target" reference line, current position labeled, gap labeled "$1.2M"' },
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-2 border-b border-stone-100 last:border-0">
                                <p className="text-[12px] text-stone-400 px-5 py-3 leading-relaxed italic border-r border-stone-100">{r.v1}</p>
                                <p className="text-[12px] text-stone-700 px-5 py-3 leading-relaxed">{r.v2}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-stone-800 rounded-xl p-5 text-white">
                    <p className="text-sm font-bold text-amber-400 mb-2">Why this matters beyond fundraising</p>
                    <p className="text-[14px] text-stone-200 leading-relaxed">
                        Every internal budget request, project approval, and hiring decision is a form of fundraising. You are asking someone to allocate scarce resources based on the picture you paint with data. The chart that makes the decision obvious will always outperform the chart that makes the decision possible.
                    </p>
                </div>
            </div>
        </LessonPage>
    );
}
