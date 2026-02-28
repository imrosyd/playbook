import { type ReactNode } from 'react';
import { Check, X, AlertTriangle, Brain, ShieldAlert } from 'lucide-react';

interface ChartTypeCardProps {
    name: string;
    whenToUse: string[];
    whenNotToUse: string[];
    interpretationRisk: string;
    cognitiveRef?: string;
    ethicalRef?: string;
    demo: ReactNode;
}

export default function ChartTypeCard({
    name,
    whenToUse,
    whenNotToUse,
    interpretationRisk,
    cognitiveRef,
    ethicalRef,
    demo,
}: ChartTypeCardProps) {
    return (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            {/* Demo area */}
            <div className="w-full bg-stone-50 border-b border-stone-100 p-4 flex items-center justify-center h-[280px] sm:h-[320px] lg:h-[380px] overflow-hidden [&>svg]:w-auto [&>svg]:h-full [&>svg]:max-w-full">
                {demo}
            </div>

            {/* Name */}
            <div className="px-5 pt-4 pb-2">
                <h3 className="text-base font-bold text-stone-800">{name}</h3>
            </div>

            {/* When to use / When not to use */}
            <div className="px-5 pb-4 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-2">When to Use</p>
                    <ul className="space-y-1.5">
                        {whenToUse.map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-[12px] text-stone-600 leading-snug">
                                <Check size={11} className="text-emerald-500 shrink-0 mt-0.5" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-red-600 mb-2">When Not to Use</p>
                    <ul className="space-y-1.5">
                        {whenNotToUse.map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-[12px] text-stone-600 leading-snug">
                                <X size={11} className="text-red-400 shrink-0 mt-0.5" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Interpretation risk */}
            <div className="mx-5 mb-4 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5 flex items-start gap-2">
                <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[12px] text-amber-800 leading-snug">{interpretationRisk}</p>
            </div>

            {/* Chips */}
            {(cognitiveRef || ethicalRef) && (
                <div className="px-5 pb-5 flex flex-wrap gap-2">
                    {cognitiveRef && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-medium text-blue-700">
                            <Brain size={10} className="shrink-0" />
                            {cognitiveRef}
                        </span>
                    )}
                    {ethicalRef && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-[11px] font-medium text-red-700">
                            <ShieldAlert size={10} className="shrink-0" />
                            {ethicalRef}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
