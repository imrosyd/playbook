import { type ReactNode } from 'react';

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
            {/* Demo area — full height, clean background */}
            <div className="w-full bg-stone-50 border-b border-stone-100 p-6 flex items-center justify-center"
                style={{ minHeight: 280 }}>
                <div className="w-full max-w-[340px]">
                    {demo}
                </div>
            </div>

            {/* Name */}
            <div className="px-5 pt-5 pb-3">
                <h3 className="text-base font-bold text-stone-800">{name}</h3>
            </div>

            {/* When to use / When not to use */}
            <div className="px-5 pb-4 grid grid-cols-2 gap-5">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-2">Use when</p>
                    <ul className="space-y-2">
                        {whenToUse.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-[12px] text-stone-600 leading-relaxed">
                                <span className="shrink-0 text-stone-300 font-bold mt-0.5">—</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">Avoid when</p>
                    <ul className="space-y-2">
                        {whenNotToUse.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-[12px] text-stone-500 leading-relaxed">
                                <span className="shrink-0 text-stone-200 font-bold mt-0.5">—</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Interpretation risk */}
            <div className="mx-5 mb-4 rounded-lg bg-stone-50 border border-stone-200 px-4 py-3">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Interpretation risk</p>
                <p className="text-[12px] text-stone-600 leading-relaxed">{interpretationRisk}</p>
            </div>

            {/* Meta refs */}
            {(cognitiveRef || ethicalRef) && (
                <div className="px-5 pb-5 flex flex-wrap gap-2">
                    {cognitiveRef && (
                        <span className="inline-flex px-2.5 py-1 rounded-full bg-stone-100 text-[11px] font-medium text-stone-600">
                            Perception: {cognitiveRef}
                        </span>
                    )}
                    {ethicalRef && (
                        <span className="inline-flex px-2.5 py-1 rounded-full bg-stone-50 border border-stone-200 text-[11px] font-medium text-stone-500">
                            {ethicalRef}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
