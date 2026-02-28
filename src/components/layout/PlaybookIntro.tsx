import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { SECTIONS } from '../../data/curriculum';
import { usePlaybook } from '../../contexts/PlaybookContext';
import { useLang } from '../../contexts/LanguageContext';
import { t } from '../../lib/i18n';

export default function PlaybookIntro() {
    const { isComplete, getSectionProgress } = usePlaybook();
    const { lang } = useLang();

    return (
        <div className="space-y-8">
            <div className="space-y-3 pb-6 border-b border-stone-200">
                <div className="text-[11px] font-bold tracking-widest uppercase text-stone-400">{t(lang, 'playbookLabel')}</div>
                <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">{t(lang, 'playbookTitle')}</h1>
                <p className="text-[15px] text-stone-500 leading-relaxed max-w-2xl">
                    {t(lang, 'playbookDescription')}
                </p>
            </div>

            <div className="space-y-3">
                {SECTIONS.map((section) => {
                    const complete = isComplete(section.id);
                    const progress = getSectionProgress(section.id);
                    const Icon = section.icon;
                    const firstLesson = section.lessons[0];

                    return (
                        <div
                            key={section.id}
                            className="rounded-xl border bg-white border-stone-200 hover:shadow-md hover:border-stone-300 p-5 transition-all"
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                                    style={{ backgroundColor: `${section.color}15` }}
                                >
                                    {complete ? (
                                        <Check size={18} className="text-emerald-600" />
                                    ) : (
                                        <Icon size={18} style={{ color: section.color }} />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="text-xs font-bold tabular-nums" style={{ color: section.color }}>
                                            {section.number}
                                        </span>
                                        <h3 className="text-[15px] font-bold text-stone-800">{section.title}</h3>
                                        <span className="text-xs text-stone-400">— {section.subtitle}</span>
                                        {complete && (
                                            <span className="ml-auto text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                                {t(lang, 'complete')}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[13px] text-stone-500 mb-3">{section.lessons.length} {t(lang, 'lessons')}</p>

                                    {!complete && progress.total > 0 && (
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="flex-1 h-1 bg-stone-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-emerald-500 rounded-full transition-all"
                                                    style={{ width: `${(progress.done / progress.total) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-[11px] font-medium text-stone-400 tabular-nums">
                                                {progress.done}/{progress.total}
                                            </span>
                                        </div>
                                    )}

                                    <Link
                                        to={`/playbook/${section.id}/${firstLesson.slug}`}
                                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                                    >
                                        {complete ? t(lang, 'review') : progress.done > 0 ? t(lang, 'continue') : t(lang, 'start')}
                                        <ArrowRight size={13} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
