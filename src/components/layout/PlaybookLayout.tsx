import { useState, useEffect } from 'react';
import { Outlet, useParams, Link } from 'react-router-dom';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import Sidebar from './Sidebar';
import { getLessonBySlug } from '../../data/curriculum';
import { useLang } from '../../contexts/LanguageContext';
import { t } from '../../lib/i18n';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const SIDEBAR_W = 256;

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(() =>
        typeof window !== 'undefined' ? window.matchMedia(query).matches : false
    );
    useEffect(() => {
        const mq = window.matchMedia(query);
        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [query]);
    return matches;
}

export default function PlaybookLayout() {
    const { sectionId, lessonSlug } = useParams();
    const match = sectionId && lessonSlug ? getLessonBySlug(sectionId, lessonSlug) : null;
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { lang, dir } = useLang();

    useEffect(() => {
        setSidebarOpen(isDesktop);
    }, [isDesktop]);

    const overlayMode = !isDesktop;
    const pushContent = isDesktop && sidebarOpen;

    return (
        <div className="min-h-screen bg-[#F8F7F4]">
            {overlayMode && sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/40"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            <Sidebar open={sidebarOpen} onClose={() => { if (!isDesktop) setSidebarOpen(false); }} />

            <div
                className="min-h-screen flex flex-col transition-[margin] duration-300"
                style={
                    pushContent
                        ? dir === 'rtl'
                            ? { marginRight: SIDEBAR_W }
                            : { marginLeft: SIDEBAR_W }
                        : {}
                }
            >
                <header className="sticky top-0 z-20 h-12 bg-[#F8F7F4]/95 backdrop-blur-sm border-b border-stone-200 flex items-center px-4 gap-3">
                    <button
                        onClick={() => setSidebarOpen((v) => !v)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors shrink-0"
                        aria-label={sidebarOpen ? t(lang, 'hideSidebar') : t(lang, 'showSidebar')}
                    >
                        {sidebarOpen && !overlayMode ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
                    </button>

                    <Link to="/playbook">
                        <span className="text-[11px] font-medium text-stone-400 hover:text-stone-600 transition-colors whitespace-nowrap">
                            {t(lang, 'presentWithData')}
                        </span>
                    </Link>

                    {match && (
                        <>
                            <span className="text-stone-300 text-[11px] hidden sm:inline">/</span>
                            <span className="text-[11px] font-semibold text-emerald-700 hidden sm:inline truncate">
                                {match.section.number} {match.section.title}
                            </span>
                        </>
                    )}

                    <span className="ml-auto shrink-0 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                        {t(lang, 'earlyAccess')}
                    </span>
                    <LanguageSwitcher />
                </header>

                <main className="flex-1 w-full px-4 sm:px-6 lg:px-10 xl:px-12 py-8 mx-auto max-w-7xl">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
