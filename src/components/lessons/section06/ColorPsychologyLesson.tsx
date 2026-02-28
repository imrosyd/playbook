import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = [
    { sectionId: 'design', slug: 'three-color-rule', label: 'The 3-Color Rule' },
    { sectionId: 'design', slug: 'colorblind', label: 'Designing for Colorblindness' },
];

// Radial bar chart showing color emotion associations
function ColorEmotionChart() {
    const colors = [
        { hue: '#dc2626', label: 'Red', primary: 'Danger / Loss', secondary: 'Urgency, warning', x: 0.85, y: 0.35 },
        { hue: '#16a34a', label: 'Green', primary: 'Growth / Success', secondary: 'Safe, positive', x: 0.85, y: 0.65 },
        { hue: '#2563eb', label: 'Blue', primary: 'Trust / Stability', secondary: 'Calm, professional', x: 0.45, y: 0.15 },
        { hue: '#d97706', label: 'Amber', primary: 'Caution / Energy', secondary: 'Neutral alert', x: 0.15, y: 0.35 },
        { hue: '#6d28d9', label: 'Purple', primary: 'Premium / Insight', secondary: 'Forecasts, AI', x: 0.15, y: 0.65 },
        { hue: '#475569', label: 'Grey', primary: 'Neutral / Context', secondary: 'Background, comparison', x: 0.45, y: 0.85 },
    ];

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">
                Color emotional associations in a business context
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {colors.map(c => (
                    <div key={c.label} className="flex items-start gap-3 p-3 rounded-lg border border-stone-100">
                        <div className="w-8 h-8 rounded-lg shrink-0 mt-0.5" style={{ backgroundColor: c.hue }} />
                        <div>
                            <p className="text-[12px] font-bold text-stone-800">{c.label}</p>
                            <p className="text-[11px] font-semibold text-stone-500 mb-0.5">{c.primary}</p>
                            <p className="text-[10px] text-stone-400">{c.secondary}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Stacked bar chart showing cultural color meaning differences
function CulturalChart() {
    const data = [
        { color: 'Red', meanings: [{ culture: 'West', meaning: 'Danger/loss', fill: '#fee2e2' }, { culture: 'China', meaning: 'Luck/prosperity', fill: '#fca5a5' }] },
        { color: 'Green', meanings: [{ culture: 'West', meaning: 'Go/positive', fill: '#dcfce7' }, { culture: 'Middle East', meaning: 'Holy/religion', fill: '#86efac' }] },
        { color: 'White', meanings: [{ culture: 'West', meaning: 'Purity/clean', fill: '#f5f5f4' }, { culture: 'East Asia', meaning: 'Mourning', fill: '#e7e5e4' }] },
    ];

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">
                Color conventions differ across cultures — international audiences require care
            </p>
            <div className="space-y-3">
                {data.map(d => (
                    <div key={d.color} className="flex items-stretch gap-1 h-12">
                        <div className="w-12 shrink-0 flex items-center">
                            <span className="text-[11px] font-bold text-stone-500">{d.color}</span>
                        </div>
                        {d.meanings.map(m => (
                            <div key={m.culture}
                                className="flex-1 rounded flex items-center justify-center border border-stone-200"
                                style={{ backgroundColor: m.fill }}>
                                <div className="text-center">
                                    <p className="text-[9px] font-bold text-stone-500 uppercase">{m.culture}</p>
                                    <p className="text-[10px] text-stone-700">{m.meaning}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ColorPsychologyLesson() {
    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Red doesn't just mean "stop." It means "danger," "loss," "debt," and "underperformance" — in that sequence — before the viewer has read a single data label. Color is the fastest pre-attentive channel, which means it carries meaning <em>before</em> conscious thought. If the meaning it carries is wrong, no label can override it.
                </p>

                <TheoryBlock
                    title="Color as Pre-Attentive Signal"
                    theory="Faber Birren's Color Psychology + Ecological Valence Theory (Palmer & Schloss, 2010)"
                    explanation="Ecological Valence Theory holds that color preferences are learned from repeated associations in the environment — red with fire and blood, green with healthy plants, blue with clear skies. These associations are deeply embedded and largely involuntary. Charts that violate them force extra cognitive work to override the first impression."
                />

                <ColorEmotionChart />

                <TheoryBlock
                    title="The Cultural Relativity Problem"
                    theory="Cross-Cultural Color Studies (Madden, Hewett & Roth, 2000)"
                    explanation="A 2000 study across 8 countries found that color associations varied significantly for the same hue. Red means luck in China, danger in the US. White means purity in the West, mourning in East Asia. Global dashboards cannot rely on culturally-specific color codes without explicit legends."
                />

                <CulturalChart />

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
                    <p className="text-[12px] font-bold text-stone-700">Use color deliberately — three rules</p>
                    {[
                        { rule: 'Never use red and green as the only signal for good/bad.', reason: '8% of men are red-green colorblind. These colors look the same to them.' },
                        { rule: 'Blue is the safest universal color for "primary" data.', reason: 'It has the fewest conflicting cultural associations and is least affected by common colorblindness types.' },
                        { rule: 'Use grey as your default. Reserve color for the one thing that matters most.', reason: 'Grey communicates "context." Color communicates "pay attention here." Both should be intentional.' },
                    ].map((r, i) => (
                        <div key={i} className="bg-white border border-stone-200 rounded-lg p-3 space-y-1">
                            <p className="text-[12px] font-semibold text-stone-800">{r.rule}</p>
                            <p className="text-[11px] text-stone-400 leading-relaxed">{r.reason}</p>
                        </div>
                    ))}
                </div>
            </div>
        </LessonPage>
    );
}
