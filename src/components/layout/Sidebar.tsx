import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, Check, BarChart3, Rocket } from 'lucide-react';
import { SECTIONS } from '../../data/curriculum';
import { usePlaybook } from '../../contexts/PlaybookContext';
import { useLang } from '../../contexts/LanguageContext';
import { t } from '../../lib/i18n';

interface SidebarProps {
    open?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ open = true, onClose }: SidebarProps) {
    const { sectionId, lessonSlug } = useParams();
    const { completedLessons, getSectionProgress } = usePlaybook();
    const { lang, dir } = useLang();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (sectionId) setExpanded((p) => ({ ...p, [sectionId]: true }));
        else {
            const first = SECTIONS[0];
            if (first) setExpanded((p) => ({ ...p, [first.id]: true }));
        }
    }, [sectionId]);

    const toggle = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

    const total = SECTIONS.reduce((s, sec) => s + sec.lessons.length, 0);
    const done = completedLessons.size;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;



    return (
        <aside
            className={`fixed top-0 h-screen w-64 bg-[#FAFAF8] flex flex-col z-40 select-none transition-transform duration-300 ${dir === 'rtl'
                ? `right-0 border-l border-stone-200 ${open ? 'translate-x-0' : 'translate-x-full'}`
                : `left-0 border-r border-stone-200 ${open ? 'translate-x-0' : '-translate-x-full'}`
                }`}
        >
            <Link to="/" className="flex items-center gap-2.5 px-4 py-4 border-b border-stone-200 text-decoration-none">
                <div className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center">
                    <BarChart3 size={14} className="text-white" />
                </div>
                <div className="leading-tight">
                    <div className="text-[13px] font-bold text-stone-900">{t(lang, 'appName')}</div>
                    <div className="text-[10px] text-stone-400 font-medium">{t(lang, 'appTagline')}</div>
                </div>
            </Link>

            <nav className="flex-1 overflow-y-auto py-2">
                <Link
                    to="/playbook"
                    onClick={onClose}
                    className={`flex items-center gap-2.5 mx-2 px-3 py-2 rounded-lg mb-1 transition-colors text-[12.5px] font-semibold text-decoration-none ${!sectionId ? 'bg-emerald-700 text-white' : 'text-stone-500 hover:bg-stone-100 hover:text-stone-700'
                        }`}
                >
                    <Rocket size={13} className={!sectionId ? 'text-white' : 'text-stone-400'} />
                    {t(lang, 'startHere')}
                </Link>



                {SECTIONS.map((section) => {
                    const isOpen = expanded[section.id] ?? false;
                    const progress = getSectionProgress(section.id);
                    const isActiveSection = sectionId === section.id;
                    const Icon = section.icon;
                    const allDone = progress.done === progress.total && progress.total > 0;

                    return (
                        <div key={section.id} className="mb-0.5">
                            <button
                                onClick={() => toggle(section.id)}
                                className={`w-full flex items-center gap-2 mx-2 px-3 py-2 rounded-lg transition-colors text-left pr-2 border-none bg-transparent cursor-pointer ${isActiveSection
                                    ? 'bg-stone-100 text-stone-800'
                                    : 'text-stone-600 hover:bg-stone-100'
                                    }`}
                                style={{ width: 'calc(100% - 1rem)' }}
                            >
                                <Icon
                                    size={13}
                                    className="shrink-0"
                                    style={{ color: section.color }}
                                />
                                <span className="text-[12px] font-bold flex-1 truncate">
                                    {section.number} {section.title}
                                </span>
                                {allDone ? (
                                    <Check size={11} className="text-emerald-600 shrink-0" />
                                ) : (
                                    <ChevronDown
                                        size={12}
                                        className={`text-stone-400 shrink-0 transition-transform ${isOpen ? '' : '-rotate-90'}`}
                                    />
                                )}
                            </button>

                            {isOpen && (
                                <div className="ml-4 pl-3 border-l-2 border-stone-100 mt-0.5 mb-1 space-y-0.5">
                                    {section.lessons.map((lesson) => {
                                        const key = `${section.id}/${lesson.slug}`;
                                        const isDone = completedLessons.has(key);
                                        const isActive = sectionId === section.id && lessonSlug === lesson.slug;
                                        const LIcon = lesson.icon ?? Icon;

                                        return (
                                            <Link
                                                key={lesson.id}
                                                to={`/playbook/${section.id}/${lesson.slug}`}
                                                onClick={onClose}
                                                className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-md transition-all text-left mx-1 text-decoration-none ${isActive
                                                    ? 'bg-emerald-700 text-white'
                                                    : isDone
                                                        ? 'text-stone-400 hover:bg-stone-100 hover:text-stone-600'
                                                        : 'text-stone-600 hover:bg-stone-100'
                                                    }`}
                                            >
                                                <LIcon
                                                    size={12}
                                                    className={`shrink-0 ${isActive ? 'text-white/80' : isDone ? 'text-emerald-500' : 'text-stone-400'}`}
                                                />
                                                <span className={`text-[11.5px] truncate leading-snug ${isActive ? 'font-semibold' : 'font-medium'}`}>
                                                    {lesson.id} {lesson.title}
                                                </span>
                                                {isDone && !isActive && <Check size={10} className="text-emerald-500 shrink-0 ml-auto" />}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            <div className="px-4 py-3 border-t border-stone-200 bg-stone-50/60">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">{t(lang, 'progress')}</span>
                    <span className="text-[10px] font-bold text-stone-500 tabular-nums">{pct}%</span>
                </div>
                <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                    />
                </div>
                <div className="text-[10px] text-stone-400 mt-1">{done} {t(lang, 'of')} {total} {t(lang, 'lessonsComplete')}</div>
            </div>
        </aside>
    );
}
