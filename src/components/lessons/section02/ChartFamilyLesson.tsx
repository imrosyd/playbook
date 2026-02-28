import { useState, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import ChartTypeCard from '../../ui/ChartTypeCard';

export interface ChartSpec {
    slug: string;
    name: string;
    whenToUse: string[];
    whenNotToUse: string[];
    interpretationRisk: string;
    cognitiveRef?: string;
    ethicalRef?: string;
    demo: ReactNode;
}

interface ChartFamilyLessonProps {
    charts: ChartSpec[];
    clevelandNote?: string;
}

export default function ChartFamilyLesson({ charts, clevelandNote }: ChartFamilyLessonProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = charts[activeIndex];

    return (
        <div className="space-y-5">
            {/* Tab bar */}
            <div className="overflow-x-auto pb-1">
                <div className="flex gap-1.5 min-w-max">
                    {charts.map((chart, i) => (
                        <button
                            key={chart.slug}
                            onClick={() => setActiveIndex(i)}
                            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium whitespace-nowrap transition-all ${i === activeIndex
                                    ? 'bg-emerald-700 text-white shadow-sm'
                                    : 'bg-white text-stone-500 border border-stone-200 hover:border-stone-300 hover:text-stone-700'
                                }`}
                        >
                            {chart.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Active chart card */}
            <ChartTypeCard
                key={active.slug}
                name={active.name}
                whenToUse={active.whenToUse}
                whenNotToUse={active.whenNotToUse}
                interpretationRisk={active.interpretationRisk}
                cognitiveRef={active.cognitiveRef}
                ethicalRef={active.ethicalRef}
                demo={active.demo}
            />

            {/* Cleveland & McGill note */}
            {clevelandNote && (
                <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3.5 flex items-start gap-2.5">
                    <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-1">Cleveland &amp; McGill (1984)</p>
                        <p className="text-[13px] text-amber-900 leading-relaxed">{clevelandNote}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
