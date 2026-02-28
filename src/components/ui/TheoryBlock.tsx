import { BRAND } from '../../lib/design-tokens';

interface TheoryBlockProps {
    title: string;
    theory: string;
    explanation: string;
    /** Warna aksen seksi. Jika tidak diisi, pakai brand color (emerald). */
    sectionColor?: string;
}

export default function TheoryBlock({ title, theory, explanation, sectionColor }: TheoryBlockProps) {
    const color = sectionColor ?? BRAND.primary;

    return (
        <div
            className="rounded-xl p-5 space-y-3 border"
            style={{
                backgroundColor: `${color}10`,
                borderColor: `${color}30`,
            }}
        >
            <div className="flex items-start gap-3">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: color }}
                >
                    {/* Lightbulb SVG */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                        <path d="M9 18h6" /><path d="M10 22h4" />
                    </svg>
                </div>
                <div>
                    <p
                        className="text-xs font-bold uppercase tracking-wider mb-0.5"
                        style={{ color }}
                    >
                        {title}
                    </p>
                    <p className="text-[11px] font-medium italic mb-2" style={{ color, opacity: 0.7 }}>
                        Theory: {theory}
                    </p>
                    <p className="text-[13px] text-stone-700 leading-relaxed">{explanation}</p>
                </div>
            </div>
        </div>
    );
}

