import { Shield, TrendingUp, Flame, Compass } from 'lucide-react';
import type { SimulationResult, ExecutiveReaction } from '../../types/chart';

interface ExecutivePanelProps {
    simulation: SimulationResult;
}

const ARCHETYPE_CONFIG: Record<string, { icon: typeof Shield; color: string; bgColor: string }> = {
    skeptic: { icon: Shield, color: '#1e40af', bgColor: '#eff6ff' },
    optimist: { icon: TrendingUp, color: '#047857', bgColor: '#ecfdf5' },
    firefighter: { icon: Flame, color: '#b91c1c', bgColor: '#fef2f2' },
    strategist: { icon: Compass, color: '#7c2d12', bgColor: '#fff7ed' },
};

const TRUST_COLORS: Record<string, string> = {
    trusting: '#10b981',
    cautious: '#f59e0b',
    suspicious: '#ef4444',
    hostile: '#991b1b',
};

function ReactionCard({ reaction }: { reaction: ExecutiveReaction }) {
    const config = ARCHETYPE_CONFIG[reaction.archetype];
    const Icon = config.icon;
    const trustColor = TRUST_COLORS[reaction.trustLevel];

    return (
        <div
            className="rounded-xl border p-4 transition-all duration-300 hover:shadow-md"
            style={{ borderColor: `${config.color}22`, backgroundColor: config.bgColor }}
        >
            <div className="flex items-center gap-3 mb-3">
                <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${config.color}15` }}
                >
                    <Icon size={18} style={{ color: config.color }} />
                </div>
                <div className="flex-1">
                    <div className="text-sm font-semibold" style={{ color: config.color }}>
                        {reaction.archetypeLabel}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: trustColor }} />
                        <span className="text-xs text-slate-500 capitalize">{reaction.trustLevel}</span>
                    </div>
                </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
                "{reaction.reactionText}"
            </p>
            <div className="text-xs text-slate-500 border-t border-slate-200/50 pt-2 mt-2">
                <span className="font-medium">Decision tendency:</span> {reaction.decisionTendency}
            </div>
        </div>
    );
}

export default function ExecutivePanel({ simulation }: ExecutivePanelProps) {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {simulation.reactions.map((reaction) => (
                    <ReactionCard key={reaction.archetype} reaction={reaction} />
                ))}
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Decision Outcome
                </span>
                <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                    {simulation.decisionOutcome}
                </p>
            </div>

            {simulation.crossReferences.cognitiveLinks.length > 0 && (
                <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Cognitive Principles Engaged
                    </span>
                    <div className="mt-2 space-y-1.5">
                        {simulation.crossReferences.cognitiveLinks.map((link, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                                <span className="text-xs text-slate-600">{link}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
