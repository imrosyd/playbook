interface TheoryBlockProps {
    title: string;
    theory: string;
    explanation: string;
}

export default function TheoryBlock({ title, theory, explanation }: TheoryBlockProps) {
    return (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 space-y-3">
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </div>
                <div>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-0.5">{title}</p>
                    <p className="text-[11px] font-medium text-blue-500 italic mb-2">Theory: {theory}</p>
                    <p className="text-[13px] text-stone-700 leading-relaxed">{explanation}</p>
                </div>
            </div>
        </div>
    );
}
