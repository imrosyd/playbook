import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { LANGUAGES, type LangCode } from '../../lib/i18n';
import { useLang } from '../../contexts/LanguageContext';

export default function LanguageSwitcher() {
    const { lang, setLang } = useLang();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const current = LANGUAGES.find((l) => l.code === lang)!;

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSelect = (code: LangCode) => {
        setLang(code);
        setOpen(false);
    };

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors text-[11px] font-medium"
                aria-label="Select language"
            >
                <Globe size={14} />
                <span className="hidden sm:inline">{current.label}</span>
            </button>

            {open && (
                <div className="absolute end-0 top-full mt-1 w-44 bg-white border border-stone-200 rounded-xl shadow-lg z-50 overflow-hidden py-1">
                    {LANGUAGES.map((l) => (
                        <button
                            key={l.code}
                            onClick={() => handleSelect(l.code as LangCode)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 text-[12px] transition-colors text-start ${lang === l.code
                                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                                    : 'text-stone-600 hover:bg-stone-50'
                                }`}
                        >
                            <span className="text-base leading-none">{l.flag}</span>
                            <span>{l.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
