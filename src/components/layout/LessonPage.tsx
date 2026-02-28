import { type ReactNode } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ExternalLink } from 'lucide-react';
import { getLessonBySlug, getNextLesson, getPrevLesson } from '../../data/curriculum';
import { usePlaybook } from '../../contexts/PlaybookContext';
import { useLang } from '../../contexts/LanguageContext';
import { t } from '../../lib/i18n';

interface CrossRef {
    sectionId: string;
    slug: string;
    label: string;
}

interface LessonPageProps {
    children: ReactNode;
    crossRefs?: CrossRef[];
}

export default function LessonPage({ children, crossRefs }: LessonPageProps) {
    const { sectionId, lessonSlug } = useParams();
    const { completedLessons, markComplete } = usePlaybook();
    const { lang } = useLang();
    const navigate = useNavigate();

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const goTo = (path: string) => {
        navigate(path);
        scrollTop();
    };

    const match = sectionId && lessonSlug ? getLessonBySlug(sectionId, lessonSlug) : null;
    const key = sectionId && lessonSlug ? `${sectionId}/${lessonSlug}` : '';
    const isDone = completedLessons.has(key);

    const next = sectionId && lessonSlug ? getNextLesson(sectionId, lessonSlug) : null;
    const prev = sectionId && lessonSlug ? getPrevLesson(sectionId, lessonSlug) : null;

    if (!match) return null;
    const { section, lesson } = match;

    return (
        <article className="space-y-8">
            <header className="space-y-2 pb-6 border-b border-stone-200">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-widest uppercase text-stone-400">
                        {section.number} {section.title}
                    </span>
                </div>
                <div className="flex items-start gap-4">
                    <span
                        className="text-3xl sm:text-5xl font-black leading-none tabular-nums mt-1 shrink-0"
                        style={{ color: `${section.color}22` }}
                    >
                        {lesson.id}
                    </span>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">{lesson.title}</h1>
                        <p className="text-[15px] text-stone-500 mt-1 leading-relaxed">{lesson.description}</p>
                    </div>
                </div>
            </header>

            <div className="space-y-10">{children}</div>

            {crossRefs && crossRefs.length > 0 && (
                <div className="border border-stone-200 rounded-xl bg-stone-50 p-5">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">{t(lang, 'crossReferences')}</p>
                    <div className="space-y-2">
                        {crossRefs.map((ref) => (
                            <Link
                                key={`${ref.sectionId}/${ref.slug}`}
                                to={`/playbook/${ref.sectionId}/${ref.slug}`}
                                className="flex items-center gap-2 text-[13px] text-stone-600 hover:text-emerald-700 transition-colors group"
                            >
                                <ExternalLink size={12} className="text-stone-300 group-hover:text-emerald-500 shrink-0" />
                                {ref.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-stone-200">
                <div>
                    {prev ? (
                        <button
                            onClick={() => goTo(`/playbook/${prev.sectionId}/${prev.slug}`)}
                            className="flex items-center gap-2 text-[13px] font-medium text-stone-500 hover:text-stone-800 transition-colors"
                        >
                            <ArrowLeft size={14} />
                            {t(lang, 'previous')}
                        </button>
                    ) : <div />}
                </div>

                <button
                    onClick={() => !isDone && markComplete(key)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${isDone
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                            : 'bg-emerald-700 text-white hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-900/20'
                        }`}
                >
                    {isDone ? (
                        <>
                            <Check size={14} />
                            {t(lang, 'complete')}
                        </>
                    ) : (
                        t(lang, 'markComplete')
                    )}
                </button>

                <div>
                    {next ? (
                        <button
                            onClick={() => goTo(`/playbook/${next.sectionId}/${next.slug}`)}
                            className="flex items-center gap-2 text-[13px] font-medium text-stone-500 hover:text-stone-800 transition-colors"
                        >
                            {t(lang, 'next')}
                            <ArrowRight size={14} />
                        </button>
                    ) : <div />}
                </div>
            </div>
        </article>
    );
}
