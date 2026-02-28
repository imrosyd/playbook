import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { SECTIONS, isSectionComplete, isSectionUnlocked } from '../data/curriculum';

interface PlaybookContextValue {
    completedLessons: Set<string>;
    markComplete: (key: string) => void;
    isUnlocked: (sectionId: string) => boolean;
    isComplete: (sectionId: string) => boolean;
    getSectionProgress: (sectionId: string) => { done: number; total: number };
}

const PlaybookContext = createContext<PlaybookContextValue | null>(null);

export function PlaybookProvider({ children }: { children: ReactNode }) {
    const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => {
        try {
            const saved = localStorage.getItem('playbook_progress');
            return saved ? new Set(JSON.parse(saved)) : new Set();
        } catch {
            return new Set();
        }
    });

    useEffect(() => {
        localStorage.setItem('playbook_progress', JSON.stringify([...completedLessons]));
    }, [completedLessons]);

    const markComplete = (key: string) => {
        setCompletedLessons((prev) => new Set([...prev, key]));
    };

    const isUnlocked = (sectionId: string) => isSectionUnlocked(sectionId, completedLessons);
    const isComplete = (sectionId: string) => isSectionComplete(sectionId, completedLessons);

    const getSectionProgress = (sectionId: string) => {
        const section = SECTIONS.find((s) => s.id === sectionId);
        if (!section) return { done: 0, total: 0 };
        const done = section.lessons.filter((l) => completedLessons.has(`${sectionId}/${l.slug}`)).length;
        return { done, total: section.lessons.length };
    };

    return (
        <PlaybookContext.Provider value={{ completedLessons, markComplete, isUnlocked, isComplete, getSectionProgress }}>
            {children}
        </PlaybookContext.Provider>
    );
}

export function usePlaybook() {
    const ctx = useContext(PlaybookContext);
    if (!ctx) throw new Error('usePlaybook must be used inside PlaybookProvider');
    return ctx;
}
