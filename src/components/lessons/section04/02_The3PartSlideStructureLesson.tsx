import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

// Pyramid chart (inverted SCQA) using SVG trapezoids
function PyramidChart() {
    const { lang } = useLang();
    const layers = [
        { label: t(lang, 's4.slideStructure.pyramid.layers.0'), width: 100, color: '#1c1917', textColor: '#fff' },
        { label: t(lang, 's4.slideStructure.pyramid.layers.1'), width: 74, color: '#44403c', textColor: '#fff' },
        { label: t(lang, 's4.slideStructure.pyramid.layers.2'), width: 50, color: '#78716c', textColor: '#fff' },
        { label: t(lang, 's4.slideStructure.pyramid.layers.3'), width: 28, color: '#d6d3d1', textColor: '#44403c' },
    ];

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">
                {t(lang, 's4.slideStructure.pyramid.title')}
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
                {t(lang, 's4.slideStructure.pyramid.caption')}
            </p>
        </div>
    );
}

// Audience attention span — area chart
function AttentionChart() {
    const { lang } = useLang();
    const pts = [98, 82, 65, 55, 48, 42, 38, 36, 40, 45]; // typical attention arc
    const w = 360, h = 100, pad = { l: 20, r: 16, t: 16, b: 28 };
    const toX = (i: number) => pad.l + (i / (pts.length - 1)) * (w - pad.l - pad.r);
    const toY = (v: number) => pad.t + (1 - (v - 30) / 70) * (h - pad.t - pad.b);
    const pathD = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ');
    const areaD = `${pathD} L${toX(pts.length - 1)},${toY(30)} L${toX(0)},${toY(30)} Z`;

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                {t(lang, 's4.slideStructure.attention.title')}
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
                <text x={toX(0)} y={toY(98) - 6} fill="#1c1917" fontSize={9} textAnchor="middle">{t(lang, 's4.slideStructure.attention.labels.opening')}</text>
                <text x={toX(9)} y={toY(45) - 6} fill="#1c1917" fontSize={9} textAnchor="middle">{t(lang, 's4.slideStructure.attention.labels.ending')}</text>
                <text x={toX(5)} y={toY(40) + 12} fill="#a8a29e" fontSize={9} textAnchor="middle">{t(lang, 's4.slideStructure.attention.labels.trough')}</text>
                {/* Minutes */}
                {[0, 2, 5, 8, 10].map((m) => {
                    const idx = Math.round((m / 10) * (pts.length - 1));
                    return <text key={m} x={toX(idx)} y={h - 6} fill="#a8a29e" fontSize={8} textAnchor="middle">{m}m</text>;
                })}
            </svg>
            <p className="text-[11px] text-stone-400 mt-2 leading-relaxed">
                {t(lang, 's4.slideStructure.attention.caption')}
            </p>
        </div>
    );
}

export default function The3PartSlideStructureLesson() {
    const { lang } = useLang();
    const crossRefs = [
        { sectionId: 'storytelling', slug: 'so-what', label: t(lang, 's4.slideStructure.crossRefs.0.label') },
        { sectionId: 'storytelling', slug: 'power-titles', label: t(lang, 's4.slideStructure.crossRefs.1.label') },
    ];

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    {t(lang, 's4.slideStructure.intro1')}
                </p>

                <AttentionChart />

                <TheoryBlock
                    title="Why the Pyramid Works"
                    theory="Barbara Minto's SCQA Framework (Situation, Complication, Question, Answer)"
                    explanation="The brain craves the answer first. SCQA flips the traditional academic structure (build-up to conclusion) into an executive-ready format: give the answer upfront, then justify it. This reduces cognitive load and forces the audience to engage with your reasoning rather than waiting for your point."
                />

                <PyramidChart />

                <div className="space-y-4">
                    <h3 className="text-base font-bold text-stone-800">{t(lang, 's4.slideStructure.formulaTitle')}</h3>
                    <div className="space-y-3">
                        {[0, 1, 2].map((i) => {
                            const label = t(lang, `s4.slideStructure.formula.${i}.label`);
                            const rule = t(lang, `s4.slideStructure.formula.${i}.rule`);
                            const bad = t(lang, `s4.slideStructure.formula.${i}.bad`);
                            const good = t(lang, `s4.slideStructure.formula.${i}.good`);
                            const num = `0${i + 1}`;
                            return (
                                <div key={num} className="rounded-xl border border-stone-200 overflow-hidden">
                                    <div className="flex items-center gap-3 bg-stone-50 border-b border-stone-200 px-5 py-3">
                                        <span className="text-lg font-black text-stone-300">{num}</span>
                                        <span className="text-sm font-bold text-stone-800">{label}</span>
                                        <span className="ml-auto text-[11px] text-stone-400 italic">{rule}</span>
                                    </div>
                                    <div className="grid grid-cols-2 divide-x divide-stone-100 bg-white">
                                        <div className="p-4">
                                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2">{t(lang, 's4.slideStructure.labels.weak')}</p>
                                            <p className="text-[13px] text-stone-500 italic leading-relaxed">{bad}</p>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-2">{t(lang, 's4.slideStructure.labels.stronger')}</p>
                                            <p className="text-[13px] text-stone-700 leading-relaxed">{good}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
