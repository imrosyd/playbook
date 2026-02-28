import { useState, useMemo } from 'react';
import { Users, Shield, TrendingUp, Flame, Compass, ArrowRight } from 'lucide-react';
import type { Archetype } from '../../types/chart';

interface ArchetypeProfile {
    key: Archetype;
    label: string;
    icon: typeof Shield;
    color: string;
    bgColor: string;
    tagline: string;
    decisionStyle: string;
    dataReading: string;
    blindSpot: string;
    organizationalImpact: string;
    exampleQuote: string;
    reactionsByScenario: {
        clean: string;
        mild: string;
        severe: string;
    };
}

const ARCHETYPES: ArchetypeProfile[] = [
    {
        key: 'skeptic',
        label: 'The Skeptic',
        icon: Shield,
        color: '#1e40af',
        bgColor: '#eff6ff',
        tagline: 'Trust, but verify. Then verify again.',
        decisionStyle: 'Delays decisions until data quality is confirmed. Requests raw data, methodology documentation, and independently produced charts.',
        dataReading: 'Reads charts bottom-up: checks the axis first, scans for truncation, then examines the data. Trained in quantitative analysis.',
        blindSpot: 'Can slow organizations to a crawl by questioning everything. In fast-moving markets, perfect data is the enemy of timely action.',
        organizationalImpact: 'Slower but more accurate decisions. Prevents costly errors from manipulated data. Can frustrate action-oriented team members.',
        exampleQuote: 'Can you show me this with the axis starting at zero?',
        reactionsByScenario: {
            clean: 'The data looks solid. Walk me through the methodology briefly so I can reference it in my notes.',
            mild: 'Why does the Y-axis not start at zero? That is inflating the visual difference. I need to see the full scale before drawing conclusions.',
            severe: 'I cannot make a decision based on this. Multiple design choices here are distorting the data. I want the raw numbers.',
        },
    },
    {
        key: 'optimist',
        label: 'The Optimist',
        icon: TrendingUp,
        color: '#047857',
        bgColor: '#ecfdf5',
        tagline: 'The numbers confirm what we already knew.',
        decisionStyle: 'Accelerates decisions. Reads charts looking for confirmation of positive narratives. Approves budgets and expansions quickly.',
        dataReading: 'Reads charts top-down: looks at the overall shape first, anchors on positive trends. Skips fine print and axis labels.',
        blindSpot: 'Cannot detect manipulation that makes things look better than they are. Will miss truncated axes, smoothing, and cherry-picked data.',
        organizationalImpact: 'Fast decision-making. High organizational energy. Risk of committing resources based on false signals. Board presentations may overstate performance.',
        exampleQuote: 'This is great progress. Let us talk about how we scale this.',
        reactionsByScenario: {
            clean: 'This is great progress. The numbers support what we have been building toward.',
            mild: 'I like what I see here. The trajectory is encouraging. What resources do we need to maintain this momentum?',
            severe: 'Excellent. This supports our thesis. I think we have the evidence we need for the board.',
        },
    },
    {
        key: 'firefighter',
        label: 'The Firefighter',
        icon: Flame,
        color: '#b91c1c',
        bgColor: '#fef2f2',
        tagline: 'We need to act NOW.',
        decisionStyle: 'Reacts to the single most dramatic visual signal. Does not analyze trends — responds to the biggest spike or drop.',
        dataReading: 'Reads charts by scanning for the most extreme data point. Ignores context, baseline, and methodology. The biggest visual element drives the response.',
        blindSpot: 'Axis truncation and 3D effects cause maximum damage. A 2% decline rendered as a 60% visual drop triggers a full crisis response.',
        organizationalImpact: 'Resource reallocation at speed. Can resolve genuine crises effectively. Frequently diverts resources to address non-issues amplified by chart distortion.',
        exampleQuote: 'What happened in August? We need a war room session today.',
        reactionsByScenario: {
            clean: 'Good catch flagging this. What is our response plan? I want action items and owners by end of day.',
            mild: 'That drop looks significant. We need to understand what happened and make sure it does not happen again.',
            severe: 'This is a crisis. We need to freeze discretionary spending and convene the leadership team immediately.',
        },
    },
    {
        key: 'strategist',
        label: 'The Strategist',
        icon: Compass,
        color: '#7c2d12',
        bgColor: '#fff7ed',
        tagline: 'What does this mean for next quarter?',
        decisionStyle: 'Does not react to the chart directly. Asks what the data implies for future positioning. Challenges the frame before accepting the content.',
        dataReading: 'Reads charts as narrative instruments. Asks: what story is this chart trying to tell? Is that the right story for this decision?',
        blindSpot: 'Can over-analyze clean data that warrants straightforward action. Strategic reframing delays necessary tactical responses.',
        organizationalImpact: 'Strongest defense against compound manipulation. Detects when smoothing + axis truncation produce a false narrative. Slows decisions but improves strategic alignment.',
        exampleQuote: 'Before we discuss implications, what was excluded from this dataset?',
        reactionsByScenario: {
            clean: 'What does this mean for our positioning next quarter? How should we adjust the strategic plan?',
            mild: 'Interesting framing. Can we see this data presented differently? I think the ranking tells a different story.',
            severe: 'I want to understand whether this was reviewed before reaching us. The visual choices here concern me deeply.',
        },
    },
];

export default function ExecutiveSimulator() {
    const [activeArchetype, setActiveArchetype] = useState<Archetype>('skeptic');
    const [scenarioLevel, setScenarioLevel] = useState<'clean' | 'mild' | 'severe'>('clean');

    const profile = useMemo(
        () => ARCHETYPES.find((a) => a.key === activeArchetype)!,
        [activeArchetype]
    );

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-4">
                    <Users size={14} className="text-slate-600" />
                    <span className="text-xs font-semibold text-slate-600">Simulation Engine</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Executive Reaction Simulator
                </h2>
                <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
                    The same chart produces four simultaneous, divergent reactions in the boardroom.
                    Understand how each executive archetype reads data — and gets misled.
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                {ARCHETYPES.map((a) => {
                    const Icon = a.icon;
                    const isActive = a.key === activeArchetype;
                    return (
                        <button
                            key={a.key}
                            onClick={() => setActiveArchetype(a.key)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${isActive
                                    ? 'shadow-md scale-[1.02]'
                                    : 'bg-white border-slate-200 hover:border-slate-300'
                                }`}
                            style={isActive ? { backgroundColor: a.bgColor, borderColor: `${a.color}44` } : undefined}
                        >
                            <Icon size={22} style={{ color: isActive ? a.color : '#94a3b8' }} />
                            <span
                                className="text-xs font-bold"
                                style={{ color: isActive ? a.color : '#64748b' }}
                            >
                                {a.label}
                            </span>
                            <span className="text-xs text-slate-400 text-center leading-tight">{a.tagline}</span>
                        </button>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                    <div
                        className="rounded-2xl border p-6 shadow-sm"
                        style={{ backgroundColor: profile.bgColor, borderColor: `${profile.color}22` }}
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <profile.icon size={28} style={{ color: profile.color }} />
                            <div>
                                <h3 className="text-lg font-bold" style={{ color: profile.color }}>
                                    {profile.label}
                                </h3>
                                <p className="text-sm text-slate-500 italic">{profile.tagline}</p>
                            </div>
                        </div>

                        <div className="grid gap-5">
                            <div>
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Decision Style</span>
                                <p className="text-sm text-slate-700 mt-1 leading-relaxed">{profile.decisionStyle}</p>
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">How They Read Charts</span>
                                <p className="text-sm text-slate-700 mt-1 leading-relaxed">{profile.dataReading}</p>
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Blind Spot</span>
                                <p className="text-sm text-amber-700 mt-1 leading-relaxed">{profile.blindSpot}</p>
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Organizational Impact</span>
                                <p className="text-sm text-slate-700 mt-1 leading-relaxed">{profile.organizationalImpact}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Scenario Data Quality
                        </span>
                        <div className="flex gap-2 mt-3">
                            {(['clean', 'mild', 'severe'] as const).map((level) => {
                                const colors = {
                                    clean: { bg: '#ecfdf5', border: '#10b981', text: '#047857' },
                                    mild: { bg: '#fffbeb', border: '#f59e0b', text: '#92400e' },
                                    severe: { bg: '#fef2f2', border: '#ef4444', text: '#991b1b' },
                                };
                                const c = colors[level];
                                const isActive = scenarioLevel === level;
                                return (
                                    <button
                                        key={level}
                                        onClick={() => setScenarioLevel(level)}
                                        className="flex-1 py-2 text-xs font-medium rounded-lg border transition-all capitalize"
                                        style={
                                            isActive
                                                ? { backgroundColor: c.bg, borderColor: c.border, color: c.text }
                                                : { backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#64748b' }
                                        }
                                    >
                                        {level}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
                            {profile.label}'s Reaction
                        </span>
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                            <p className="text-sm text-slate-700 italic leading-relaxed">
                                "{profile.reactionsByScenario[scenarioLevel]}"
                            </p>
                        </div>
                        <div className="mt-4 flex items-start gap-2">
                            <ArrowRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
                            <p className="text-xs text-slate-500">
                                {scenarioLevel === 'clean' && 'Clean data produces proportionate, well-calibrated responses from all archetypes.'}
                                {scenarioLevel === 'mild' && 'Mild manipulation splits the room — some notice, others do not. Decision quality degrades.'}
                                {scenarioLevel === 'severe' && 'Severe manipulation causes organizational harm. False confidence, misdirected resources, eroded trust.'}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl border border-slate-100 p-5">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Vulnerability Matrix
                        </span>
                        <div className="mt-3 space-y-2.5">
                            {[
                                { manipulation: 'Axis Truncation', skeptic: 1, optimist: 4, firefighter: 5, strategist: 2 },
                                { manipulation: '3D Distortion', skeptic: 2, optimist: 4, firefighter: 5, strategist: 2 },
                                { manipulation: 'Data Smoothing', skeptic: 2, optimist: 5, firefighter: 3, strategist: 1 },
                                { manipulation: 'Cherry-Pick Outliers', skeptic: 1, optimist: 5, firefighter: 3, strategist: 2 },
                                { manipulation: 'Misleading Annotation', skeptic: 1, optimist: 5, firefighter: 4, strategist: 2 },
                            ].map((row) => (
                                <div key={row.manipulation} className="flex items-center gap-2">
                                    <span className="text-xs text-slate-600 w-32 shrink-0">{row.manipulation}</span>
                                    <div className="flex-1 flex gap-1">
                                        {[
                                            { value: row.skeptic, color: '#1e40af' },
                                            { value: row.optimist, color: '#047857' },
                                            { value: row.firefighter, color: '#b91c1c' },
                                            { value: row.strategist, color: '#7c2d12' },
                                        ].map((cell, i) => (
                                            <div
                                                key={i}
                                                className="flex-1 h-4 rounded-sm"
                                                style={{
                                                    backgroundColor: cell.color,
                                                    opacity: cell.value / 5,
                                                }}
                                                title={`Vulnerability: ${cell.value}/5`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="flex gap-1 pt-2 border-t border-slate-200">
                                <span className="text-xs text-slate-400 w-32 shrink-0">Low</span>
                                {['Skeptic', 'Optimist', 'Firefighter', 'Strategist'].map((name) => (
                                    <span key={name} className="flex-1 text-center text-xs text-slate-400">{name.slice(0, 4)}</span>
                                ))}
                                <span className="text-xs text-slate-400">High</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
