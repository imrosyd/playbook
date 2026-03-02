import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

// Bar chart: descriptive vs insight-driven
function InsightGapChart() {
    const { lang } = useLang();
    const bars = [
        { label: t(lang, 's4.craftingSoWhat.chart.bars.0.label'), pct: 95, color: '#a8a29e' },
        { label: t(lang, 's4.craftingSoWhat.chart.bars.1.label'), pct: 60, color: '#a8a29e' },
        { label: t(lang, 's4.craftingSoWhat.chart.bars.2.label'), pct: 12, color: '#dc2626' },
        { label: t(lang, 's4.craftingSoWhat.chart.bars.3.label'), pct: 8, color: '#dc2626' },
    ];

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">
                {t(lang, 's4.craftingSoWhat.chart.title')}
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
                {t(lang, 's4.craftingSoWhat.chart.caption')}
            </p>
        </div>
    );
}

export default function CraftingTheSoWhatLesson() {
    const { lang } = useLang();
    const crossRefs = [
        { sectionId: 'perception', slug: 'anchoring', label: t(lang, 's4.craftingSoWhat.crossRefs.0.label') },
        { sectionId: 'lab', slug: 'annotation-trend', label: t(lang, 's4.craftingSoWhat.crossRefs.1.label') },
    ];

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's4.craftingSoWhat.intro1') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    {t(lang, 's4.craftingSoWhat.intro2')}
                </p>

                <InsightGapChart />

                <TheoryBlock
                    title="The Insight Gap (Why This Happens)"
                    theory="Kahneman's Dual Process Theory (System 1 vs System 2)"
                    explanation="Executives operate in System 1 mode most of the day — fast, intuitive, pattern-matching. When you present raw data, you're forcing them into System 2 (slow, analytical). They resist this. The 'So What' is the bridge: you do the analytical work for them, and present only the conclusion they need to act on."
                />

                <div className="space-y-5">
                    <h3 className="text-base font-bold text-stone-800">{t(lang, 's4.craftingSoWhat.frameworkTitle')}</h3>
                    <p className="text-[14px] text-stone-500 leading-relaxed">
                        {t(lang, 's4.craftingSoWhat.frameworkDesc')}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[0, 1, 2].map((i) => {
                            const q = t(lang, `s4.craftingSoWhat.questions.${i}.q`);
                            const a = t(lang, `s4.craftingSoWhat.questions.${i}.a`);
                            const example = t(lang, `s4.craftingSoWhat.questions.${i}.example`);
                            const num = String(i + 1);
                            return (
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
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-base font-bold text-stone-800">{t(lang, 's4.craftingSoWhat.beforeAfterTitle')}</h3>
                    <div className="space-y-3">
                        {[0, 1].map((i) => {
                            const before = t(lang, `s4.craftingSoWhat.examples.${i}.before`);
                            const after = t(lang, `s4.craftingSoWhat.examples.${i}.after`);
                            return (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-stone-200">
                                    <div className="bg-stone-50 p-4 border-r border-stone-200">
                                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2">{t(lang, 's4.craftingSoWhat.labels.descriptive')}</p>
                                        <p className="text-[13px] text-stone-600 italic leading-relaxed">"{before}"</p>
                                    </div>
                                    <div className="bg-white p-4">
                                        <p className="text-[10px] font-bold text-stone-800 uppercase tracking-wider mb-2">{t(lang, 's4.craftingSoWhat.labels.decisionDriving')}</p>
                                        <p className="text-[13px] text-stone-700 leading-relaxed">"{after}"</p>
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
