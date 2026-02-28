import { useState } from 'react';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = [
    { sectionId: 'design', slug: 'three-color-rule', label: 'The 3-Color Rule' },
    { sectionId: 'ethics', slug: 'clarity', label: 'Ethical Level 1: Clarity' },
];

// Line chart: two states — "cases" vs "per capita" view
function CovidLineChart({ perCapita }: { perCapita: boolean }) {
    const rawData = [
        { label: 'US', cases: 33, perCap: 10 },
        { label: 'Brazil', cases: 22, perCap: 10.4 },
        { label: 'India', cases: 30, perCap: 2.2 },
        { label: 'UK', cases: 7.5, perCap: 11 },
        { label: 'Germany', cases: 4, perCap: 4.7 },
        { label: 'S. Korea', cases: 1.2, perCap: 2.3 },
    ];

    const data = rawData.map(d => ({ ...d, value: perCapita ? d.perCap : d.cases }));
    const maxV = perCapita ? 13 : 36;

    return (
        <div className="space-y-1">
            {data.map(d => (
                <div key={d.label} className="flex items-center gap-3">
                    <span className="w-14 text-[11px] text-stone-500 font-medium text-right shrink-0">{d.label}</span>
                    <div className="flex-1 h-5 bg-stone-100 rounded overflow-hidden">
                        <div
                            className="h-full rounded transition-all duration-500"
                            style={{ width: `${(d.value / maxV) * 100}%`, backgroundColor: '#1c1917' }}
                        />
                    </div>
                    <span className="w-12 text-[11px] font-bold text-stone-700 tabular-nums text-right">{d.value}M</span>
                </div>
            ))}
        </div>
    );
}

export default function CovidDashboardsLesson() {
    const [perCapita, setPerCapita] = useState(false);

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    During the COVID-19 pandemic, the same underlying data was visualized in dozens of different ways — producing dramatically different narratives. Some countries looked catastrophically worse than others depending on whether you saw absolute cases, per-capita rates, or rolling averages. The data didn't change. The chart did.
                </p>

                <TheoryBlock
                    title="The Normalization Problem"
                    theory="Eurostat Principle of Comparability + Darrell Huff's 'How to Lie with Statistics' (1954)"
                    explanation="Absolute numbers favor populous nations; per-capita rates favor low-density ones. Neither is 'correct' in isolation — they answer different questions. The ethical responsibility of a chart presenter is to show the metric that corresponds to the decision being made, and to make the normalization choice explicit and visible."
                />

                <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                            {perCapita ? 'Per-capita cases (per 100 people)' : 'Total cumulative cases (millions)'}
                        </p>
                        <button
                            onClick={() => setPerCapita(v => !v)}
                            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${perCapita ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'}`}
                        >
                            {perCapita ? 'Switch to absolute' : 'Switch to per-capita'}
                        </button>
                    </div>
                    <CovidLineChart perCapita={perCapita} />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        {perCapita
                            ? 'On a per-capita basis, India — one of the countries that appeared worst by absolute cases — ranks among the lowest. The US and UK have significantly higher burden per person.'
                            : 'On absolute counts, the US, India, and Brazil appear as the world\'s worst-hit nations — which shaped early international aid decisions and travel restrictions.'}
                    </p>
                </div>

                <div className="space-y-3">
                    <h3 className="text-base font-bold text-stone-800">The four dashboard choices that changed public perception</h3>
                    <div className="space-y-2">
                        {[
                            { choice: 'Absolute vs. per-capita cases', impact: 'Made populous countries look worse regardless of actual severity.' },
                            { choice: 'Cumulative vs. daily new cases', impact: 'Cumulative charts never declined — creating permanent visual alarm even during genuine recovery.' },
                            { choice: '7-day rolling average vs. raw daily count', impact: 'Raw counts showed jagged spikes; smoothing hid early warning signals.' },
                            { choice: 'Log scale vs. linear scale', impact: 'Log scale showed parallel trajectories between countries; linear scale showed explosive divergence.' },
                        ].map((c, i) => (
                            <div key={i} className="bg-white border border-stone-200 rounded-lg p-4">
                                <p className="text-[12px] font-bold text-stone-800 mb-1">{c.choice}</p>
                                <p className="text-[12px] text-stone-500 leading-relaxed">{c.impact}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-stone-800 rounded-xl p-5 text-white">
                    <p className="text-sm font-bold text-amber-400 mb-2">The professional obligation</p>
                    <p className="text-[14px] text-stone-200 leading-relaxed">
                        Every chart embeds decisions: what to show, what to normalize by, which time range to use, where to start the axis. These decisions shape perception before the viewer reads a single data point. Responsible presenters make these choices visible — in subtitles, footnotes, and in the way they verbally introduce the chart.
                    </p>
                </div>
            </div>
        </LessonPage>
    );
}
