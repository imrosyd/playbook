import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

// Scatter: precision words vs vague words
function PrecisionChart() {
    const { lang } = useLang();
    const words = [
        { x: 15, y: 80, label: '"a lot"', precise: false },
        { x: 25, y: 55, label: '"significant"', precise: false },
        { x: 35, y: 70, label: '"very high"', precise: false },
        { x: 50, y: 30, label: '"strong"', precise: false },
        { x: 65, y: 75, label: '"+23%"', precise: true },
        { x: 75, y: 60, label: '"$1.2M"', precise: true },
        { x: 83, y: 82, label: '"2.4×"', precise: true },
        { x: 90, y: 50, label: '"Q4 target"', precise: true },
    ];

    const w = 360, h = 120, pad = { l: 40, r: 20, t: 16, b: 36 };
    const toX = (v: number) => pad.l + (v / 100) * (w - pad.l - pad.r);
    const toY = (v: number) => pad.t + (1 - v / 100) * (h - pad.t - pad.b);

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                {t(lang, 's4.languageAuthority.chart.title')}
            </p>
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
                {/* Axis lines */}
                <line x1={pad.l} x2={pad.l} y1={pad.t} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} />
                <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} />
                {/* Axis labels */}
                <text x={pad.l - 4} y={pad.t + (h - pad.t - pad.b) / 2} fill="#a8a29e" fontSize={8} textAnchor="end" transform={`rotate(-90, ${pad.l - 12}, ${pad.t + (h - pad.t - pad.b) / 2})`}>{t(lang, 's4.languageAuthority.chart.yAxis')}</text>
                <text x={(pad.l + w - pad.r) / 2} y={h - 6} fill="#a8a29e" fontSize={8} textAnchor="middle">{t(lang, 's4.languageAuthority.chart.xAxis')}</text>

                {/* Dots + labels */}
                {words.map((w2, i) => (
                    <g key={i}>
                        <circle cx={toX(w2.x)} cy={toY(w2.y)} r={5}
                            fill={w2.precise ? '#1c1917' : '#d6d3d1'}
                            stroke={w2.precise ? '#1c1917' : '#a8a29e'}
                            strokeWidth={1}
                        />
                        <text
                            x={toX(w2.x)}
                            y={toY(w2.y) - 8}
                            fill={w2.precise ? '#1c1917' : '#a8a29e'}
                            fontSize={9}
                            fontWeight={w2.precise ? 700 : 400}
                            textAnchor="middle"
                        >
                            {w2.label}
                        </text>
                    </g>
                ))}
            </svg>
            <div className="flex items-center gap-4 mt-2 text-[11px] text-stone-400">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-stone-300 inline-block" /> {t(lang, 's4.languageAuthority.chart.vagueLabel')}</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-stone-800 inline-block" /> {t(lang, 's4.languageAuthority.chart.preciseLabel')}</span>
            </div>
        </div>
    );
}

export default function TheLanguageOfAuthorityLesson() {
    const { lang } = useLang();
    const crossRefs = [
        { sectionId: 'storytelling', slug: 'power-titles', label: t(lang, 's4.languageAuthority.crossRefs.0.label') },
        { sectionId: 'storytelling', slug: 'jargon-gap', label: t(lang, 's4.languageAuthority.crossRefs.1.label') },
    ];

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    {t(lang, 's4.languageAuthority.intro1')}
                </p>

                <PrecisionChart />

                <TheoryBlock
                    title="Why Precise Language Builds Authority"
                    theory="Linguistic Precision + Source Credibility Effect (Hovland, 1953)"
                    explanation="Precise, quantified language signals to the listener that the speaker has done the work. Vague qualifiers (very, significant, a lot) activate skepticism because they can't be verified. Specific numbers and named metrics are harder to dispute and easier to remember — they move from assertion to evidence."
                />

                <div className="space-y-3">
                    <h3 className="text-base font-bold text-stone-800">{t(lang, 's4.languageAuthority.upgradeTitle')}</h3>
                    <div className="rounded-xl border border-stone-200 overflow-hidden">
                        <div className="grid grid-cols-2 bg-stone-50 border-b border-stone-200">
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-5 py-3">{t(lang, 's4.languageAuthority.labels.vague')}</p>
                            <p className="text-[10px] font-bold text-stone-800 uppercase tracking-wider px-5 py-3">{t(lang, 's4.languageAuthority.labels.precise')}</p>
                        </div>
                        {[0, 1, 2, 3, 4, 5].map((i) => {
                            const weak = t(lang, `s4.languageAuthority.examples.${i}.weak`);
                            const strong = t(lang, `s4.languageAuthority.examples.${i}.strong`);
                            return (
                                <div key={i} className="grid grid-cols-2 border-b border-stone-100 last:border-0">
                                    <p className="text-[12px] text-stone-400 px-5 py-3 leading-relaxed italic border-r border-stone-100">{weak}</p>
                                    <p className="text-[12px] text-stone-700 px-5 py-3 leading-relaxed">{strong}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                    <p className="text-[12px] font-bold text-stone-600 mb-2">{t(lang, 's4.languageAuthority.rulesTitle')}</p>
                    <div className="space-y-2">
                        {[0, 1, 2].map((i) => {
                            const r = t(lang, `s4.languageAuthority.rules.${i}`);
                            return (
                                <div key={i} className="flex gap-3 text-[12px] text-stone-600 leading-relaxed">
                                    <span className="shrink-0 font-bold text-stone-400">{i + 1}.</span>
                                    <span>{r}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
