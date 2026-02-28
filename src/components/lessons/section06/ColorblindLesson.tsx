import { useState } from 'react';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = [
    { sectionId: 'design', slug: 'color-psychology', label: 'Color Psychology' },
    { sectionId: 'design', slug: 'three-color-rule', label: 'The 3-Color Rule' },
];

type FilterType = 'normal' | 'deuteranopia' | 'protanopia' | 'tritanopia' | 'monochromacy';

const FILTERS: Record<FilterType, string> = {
    normal: '',
    deuteranopia: 'saturate(0.3) hue-rotate(90deg)',
    protanopia: 'saturate(0.4) hue-rotate(30deg)',
    tritanopia: 'saturate(0.5) hue-rotate(200deg)',
    monochromacy: 'grayscale(1)',
};

const FILTER_LABELS: Record<FilterType, { label: string; prevalence: string }> = {
    normal: { label: 'Normal vision', prevalence: '' },
    deuteranopia: { label: 'Deuteranopia', prevalence: '6% of men' },
    protanopia: { label: 'Protanopia', prevalence: '2% of men' },
    tritanopia: { label: 'Tritanopia', prevalence: '0.01%' },
    monochromacy: { label: 'Monochromacy', prevalence: 'rare' },
};

// A bar chart that uses Red vs Green — the classic failure
function AccessibilityBarChart({ filter }: { filter: FilterType }) {
    const bars = [
        { label: 'Achieved', value: 85, color: '#16a34a' },
        { label: 'At risk', value: 62, color: '#d97706' },
        { label: 'Behind target', value: 38, color: '#dc2626' },
    ];
    const maxV = 100;
    const w = 260, h = 120, pad = { l: 48, r: 16, t: 12, b: 28 };
    const barWidth = 44;
    const gap = (w - pad.l - pad.r - bars.length * barWidth) / (bars.length + 1);
    const toY = (v: number) => pad.t + (1 - v / maxV) * (h - pad.t - pad.b);
    const barH = (v: number) => (v / maxV) * (h - pad.t - pad.b);

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ filter: FILTERS[filter] }}>
            {[0, 50, 100].map(v => (
                <line key={v} x1={pad.l} x2={w - pad.r} y1={toY(v)} y2={toY(v)} stroke="#f5f5f4" strokeWidth={1} />
            ))}
            {bars.map((b, i) => {
                const x = pad.l + gap + i * (barWidth + gap);
                return (
                    <g key={b.label}>
                        <rect x={x} y={toY(b.value)} width={barWidth} height={barH(b.value)} fill={b.color} rx={3} />
                        <text x={x + barWidth / 2} y={toY(b.value) - 4} fill="#44403c" fontSize={9} fontWeight={700} textAnchor="middle">{b.value}%</text>
                        <text x={x + barWidth / 2} y={h - 6} fill="#a8a29e" fontSize={8} textAnchor="middle">{b.label}</text>
                    </g>
                );
            })}
            <text x={pad.l - 4} y={pad.t + (h - pad.t - pad.b) / 2} fill="#a8a29e" fontSize={8} textAnchor="middle" transform={`rotate(-90, ${pad.l - 14}, ${pad.t + (h - pad.t - pad.b) / 2})`}>% of target</text>
        </svg>
    );
}

export default function ColorblindLesson() {
    const [filter, setFilter] = useState<FilterType>('normal');

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Approximately 1 in 12 men and 1 in 200 women have some form of color vision deficiency. In any meeting of 10 people, statistically one person cannot distinguish red from green. Using red for "bad" and green for "good" — as most presentations do — creates a chart that is literally unreadable for a portion of your audience.
                </p>

                <TheoryBlock
                    title="Why Color Alone Fails"
                    theory="Ishihara (1917) + WCAG 2.1 Accessibility Guidelines"
                    explanation="Color vision deficiency is caused by the absence or dysfunction of one or more cone photoreceptors. The three most common types affect red-green discrimination (deuteranopia, protanopia). WCAG 2.1 Success Criterion 1.4.1 requires that color is not used as the only visual means of conveying information."
                />

                <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Simulate how this chart looks to different viewers
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {(Object.keys(FILTERS) as FilterType[]).map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${filter === f
                                    ? 'bg-stone-900 text-white border-stone-900'
                                    : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                                    }`}
                            >
                                {FILTER_LABELS[f].label}
                                {FILTER_LABELS[f].prevalence && (
                                    <span className="ml-1.5 opacity-50 font-normal text-[10px]">({FILTER_LABELS[f].prevalence})</span>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-center pt-2">
                        <div style={{ maxWidth: 320, width: '100%' }}>
                            <AccessibilityBarChart filter={filter} />
                        </div>
                    </div>
                    {filter !== 'normal' && (
                        <p className="text-[12px] text-stone-500 leading-relaxed">
                            Notice how the bars lose their distinct meaning under color vision deficiency. A person with {FILTER_LABELS[filter].label.toLowerCase()} cannot distinguish performance levels by color alone.
                        </p>
                    )}
                </div>

                <div className="space-y-3">
                    <h3 className="text-base font-bold text-stone-800">How to fix it</h3>
                    <div className="space-y-2">
                        {[
                            { fix: 'Add direct labels to every bar, line, or segment.', detail: 'The label makes the chart readable even if the color is invisible.' },
                            { fix: 'Use Blue + Orange instead of Red + Green.', detail: 'This palette is distinguishable by all common colorblindness types.' },
                            { fix: 'Add pattern fills or line dashing for critical distinctions.', detail: 'Patterns communicate category through texture, not only color.' },
                            { fix: 'Check your chart in greyscale before publishing.', detail: 'If it is readable in greyscale, it passes the baseline accessibility test.' },
                        ].map((f, i) => (
                            <div key={i} className="flex gap-3 bg-white border border-stone-200 rounded-lg p-3">
                                <span className="text-[11px] font-bold text-stone-300 shrink-0 mt-0.5">{i + 1}</span>
                                <div>
                                    <p className="text-[13px] font-semibold text-stone-800">{f.fix}</p>
                                    <p className="text-[12px] text-stone-400 leading-relaxed mt-0.5">{f.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
