import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type LangCode, LANGUAGES } from '../lib/i18n';

interface LanguageContextValue {
    lang: LangCode;
    setLang: (lang: LangCode) => void;
    dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<LangCode>(() => {
        try {
            const saved = localStorage.getItem('app_language') as LangCode | null;
            if (saved && LANGUAGES.find((l) => l.code === saved)) return saved;
        } catch { }
        return 'en';
    });

    const langMeta = LANGUAGES.find((l) => l.code === lang)!;
    const dir = langMeta.dir as 'ltr' | 'rtl';

    const setLang = (code: LangCode) => {
        setLangState(code);
        try {
            localStorage.setItem('app_language', code);
        } catch { }
    };

    useEffect(() => {
        document.documentElement.setAttribute('dir', dir);
        document.documentElement.setAttribute('lang', lang);
    }, [lang, dir]);

    return (
        <LanguageContext.Provider value={{ lang, setLang, dir }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLang() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
    return ctx;
}
