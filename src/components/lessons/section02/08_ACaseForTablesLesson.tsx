// Section 02.8: A Case for Tables
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';

const crossRefs = [
    { sectionId: 'mechanics', slug: 'comparison', label: '"Who is winning?" (Bar Charts)' },
    { sectionId: 'storytelling', slug: 'so-what', label: 'Crafting the "So What"' },
];

const WHEN_TABLE = [
    { scenario: 's2.aCaseForTables.whenTable.items.0.scenario', example: 's2.aCaseForTables.whenTable.items.0.example', recommendation: 's2.aCaseForTables.whenTable.items.0.recommendation', recType: 'table' },
    { scenario: 's2.aCaseForTables.whenTable.items.1.scenario', example: 's2.aCaseForTables.whenTable.items.1.example', recommendation: 's2.aCaseForTables.whenTable.items.1.recommendation', recType: 'table' },
    { scenario: 's2.aCaseForTables.whenTable.items.2.scenario', example: 's2.aCaseForTables.whenTable.items.2.example', recommendation: 's2.aCaseForTables.whenTable.items.2.recommendation', recType: 'table' },
    { scenario: 's2.aCaseForTables.whenTable.items.3.scenario', example: 's2.aCaseForTables.whenTable.items.3.example', recommendation: 's2.aCaseForTables.whenTable.items.3.recommendation', recType: 'chart' },
    { scenario: 's2.aCaseForTables.whenTable.items.4.scenario', example: 's2.aCaseForTables.whenTable.items.4.example', recommendation: 's2.aCaseForTables.whenTable.items.4.recommendation', recType: 'chart' },
    { scenario: 's2.aCaseForTables.whenTable.items.5.scenario', example: 's2.aCaseForTables.whenTable.items.5.example', recommendation: 's2.aCaseForTables.whenTable.items.5.recommendation', recType: 'chart' },
];

export default function ACaseForTablesLesson() {
    const { lang } = useLang();

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <div className="space-y-4">
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.aCaseForTables.intro1') }} />
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.aCaseForTables.intro2') }} />
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.aCaseForTables.intro3') }} />
                </div>

                <TheoryBlock
                    title={t(lang, 's2.aCaseForTables.theoryBlock.title')}
                    theory={t(lang, 's2.aCaseForTables.theoryBlock.theory')}
                    explanation={t(lang, 's2.aCaseForTables.theoryBlock.explanation')}
                />

                <div className="space-y-4">
                    <h3 className="text-base font-bold text-stone-800">{t(lang, 's2.aCaseForTables.whenTable.title')}</h3>
                    <div className="rounded-xl border border-stone-200 overflow-hidden">
                        <div className="grid grid-cols-[1fr_auto_auto] bg-stone-800 px-4 py-3 text-[11px] font-bold text-stone-300 uppercase tracking-wider gap-4">
                            <span>{t(lang, 's2.aCaseForTables.whenTable.headers.0')}</span>
                            <span>{t(lang, 's2.aCaseForTables.whenTable.headers.1')}</span>
                            <span>{t(lang, 's2.aCaseForTables.whenTable.headers.2')}</span>
                        </div>
                        {WHEN_TABLE.map(({ scenario, example, recommendation, recType }) => (
                            <div key={scenario} className="grid grid-cols-1 border-t border-stone-100 px-4 py-3 bg-white hover:bg-stone-50 transition-colors">
                                <p className="text-[13px] font-semibold text-stone-800 mb-1">{t(lang, scenario)}</p>
                                <p className="text-[12px] text-stone-500 mb-2">{t(lang, example)}</p>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase w-fit ${recType === 'table' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                    {t(lang, recommendation)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-base font-bold text-stone-800">{t(lang, 's2.aCaseForTables.rules.title')}</h3>
                    <div className="space-y-3">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white border border-stone-200 rounded-xl p-4">
                                <p className="text-sm font-bold text-stone-800 mb-1">{t(lang, `s2.aCaseForTables.rules.items.${i}.rule`)}</p>
                                <p className="text-[13px] text-stone-600">{t(lang, `s2.aCaseForTables.rules.items.${i}.detail`)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cognitive load comparison */}
                <div className="rounded-xl bg-brand-muted border border-brand/30 p-5">
                    <p className="text-[11px] font-bold text-brand uppercase tracking-wider mb-3">
                        {t(lang, 's2.aCaseForTables.cognitiveLoad.title')}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            {
                                label: t(lang, 's2.aCaseForTables.cognitiveLoad.highLoad.label'),
                                itemPrefix: 's2.aCaseForTables.cognitiveLoad.highLoad.items',
                                ok: false,
                            },
                            {
                                label: t(lang, 's2.aCaseForTables.cognitiveLoad.lowLoad.label'),
                                itemPrefix: 's2.aCaseForTables.cognitiveLoad.lowLoad.items',
                                ok: true,
                            },
                        ].map((col) => (
                            <div key={col.label} className={`rounded-lg p-3 space-y-1.5 ${col.ok ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
                                <p className={`text-[10px] font-bold uppercase tracking-wider ${col.ok ? 'text-brand' : 'text-red-600'}`}>
                                    {col.label}
                                </p>
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <p key={i} className={`text-[11px] leading-relaxed flex gap-1.5 ${col.ok ? 'text-emerald-800' : 'text-red-800'}`}>
                                        <span>{col.ok ? '✓' : '✗'}</span>{t(lang, `${col.itemPrefix}.${i}`)}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
