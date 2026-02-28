import { useState } from 'react';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = [
    { sectionId: 'storytelling', slug: 'language-authority', label: 'The Language of Authority' },
    { sectionId: 'perception', slug: 'cognitive-load', label: 'Cognitive Load' },
];

const JARGON_MAP: Array<{ jargon: string; plain: string; context: string }> = [
    { jargon: 'Leverage', plain: 'Use', context: '"Leverage our assets" = "Use our assets"' },
    { jargon: 'Synergize', plain: 'Work together', context: '"Synergize teams" = "Have teams work together"' },
    { jargon: 'Bandwidth', plain: 'Capacity/time', context: '"Don\'t have bandwidth" = "Don\'t have time"' },
    { jargon: 'Circle back', plain: 'Follow up', context: '"Let\'s circle back" = "Let\'s follow up"' },
    { jargon: 'Boil the ocean', plain: 'Try to do too much', context: '"Don\'t boil the ocean" = "Don\'t try to do everything at once"' },
    { jargon: 'Move the needle', plain: 'Make a real impact', context: '"Does it move the needle?" = "Does it actually matter?"' },
    { jargon: 'Deep dive', plain: 'Detailed analysis', context: '"Let\'s deep dive" = "Let\'s look closely at this"' },
    { jargon: 'Low-hanging fruit', plain: 'Easy wins', context: '"Target low-hanging fruit" = "Go after the easiest wins first"' },
];

// Bar chart: comprehension score by audience
function ComprehensionChart() {
    const groups = [
        { label: 'Your team', score: 91, },
        { label: 'Adjacent teams', score: 67, },
        { label: 'Other functions', score: 48, },
        { label: 'C-suite', score: 31, },
        { label: 'Board / investors', score: 19, },
    ];

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">
                Estimated comprehension of technical jargon by audience distance
            </p>
            <div className="space-y-3">
                {groups.map((g) => (
                    <div key={g.label}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[12px] text-stone-600 font-medium">{g.label}</span>
                            <span className="text-[12px] font-bold tabular-nums text-stone-700">{g.score}%</span>
                        </div>
                        <div className="h-2.5 bg-stone-100 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full"
                                style={{
                                    width: `${g.score}%`,
                                    backgroundColor: g.score > 70 ? '#a8a29e' : g.score > 40 ? '#78716c' : '#1c1917',
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-[11px] text-stone-400 mt-4 leading-relaxed">
                The higher the stakes of your audience, the less technical domain knowledge they have. Jargon creates distance exactly when you need to close it.
            </p>
        </div>
    );
}

export default function JargonGapLesson() {
    const [selected, setSelected] = useState<string | null>(null);
    const current = JARGON_MAP.find(j => j.jargon === selected);

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Every function develops its own dialect. Engineers say "refactor." Finance says "haircut." Marketing says "CAC." When you're presenting to the C-suite or board, you are crossing dialect boundaries. Jargon that signals expertise to your team signals opacity to everyone else.
                </p>

                <ComprehensionChart />

                <TheoryBlock
                    title="Why Jargon Backfires Under Pressure"
                    theory="Cognitive Load Theory + Communication Accommodation Theory"
                    explanation="When a listener doesn't understand a word, they divert cognitive resources to decoding it — at the expense of processing your argument. Communication Accommodation Theory shows that audiences cognitively 'distance' themselves from speakers who don't adapt. Jargon signals in-group membership — which is a problem when the audience is outside your group."
                />

                <div className="space-y-3">
                    <h3 className="text-base font-bold text-stone-800">Jargon quick-reference</h3>
                    <p className="text-[13px] text-stone-500">Select a term to see its plain-English translation and an example in context.</p>
                    <div className="flex flex-wrap gap-2">
                        {JARGON_MAP.map(j => (
                            <button
                                key={j.jargon}
                                onClick={() => setSelected(s => s === j.jargon ? null : j.jargon)}
                                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${selected === j.jargon
                                    ? 'bg-stone-900 text-white border-stone-900'
                                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                                    }`}
                            >
                                {j.jargon}
                            </button>
                        ))}
                    </div>
                    {current && (
                        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
                            <div className="flex items-baseline gap-3">
                                <span className="text-[14px] font-bold text-stone-800">"{current.jargon}"</span>
                                <span className="text-stone-300">→</span>
                                <span className="text-[14px] font-bold text-emerald-700">"{current.plain}"</span>
                            </div>
                            <p className="text-[12px] text-stone-500 leading-relaxed">{current.context}</p>
                        </div>
                    )}
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                    <p className="text-[12px] font-bold text-stone-600 mb-3">The translation rule</p>
                    <p className="text-[13px] text-stone-600 leading-relaxed">
                        Before every presentation, identify three terms your audience might not share with you, and prepare a plain-English version. Use the plain version by default. Use the jargon term only when speaking to an audience that you are certain shares your vocabulary.
                    </p>
                </div>
            </div>
        </LessonPage>
    );
}
