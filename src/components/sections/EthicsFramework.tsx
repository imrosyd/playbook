import { useState } from 'react';
import { Scale, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';

interface EthicalLevelInfo {
    level: number;
    name: string;
    color: string;
    bgColor: string;
    borderColor: string;
    description: string;
    example: string;
    manipulations: string[];
    realWorldExample: string;
    guideline: string;
}

const LEVELS: EthicalLevelInfo[] = [
    {
        level: 1,
        name: 'Clarity',
        color: '#047857',
        bgColor: '#ecfdf5',
        borderColor: '#10b981',
        description: 'The chart accurately represents the data and facilitates correct interpretation. All design choices serve comprehension. The viewer forms an accurate mental model.',
        example: 'A bar chart with a zero baseline, clear labels, appropriate gridlines, and a factual annotation noting the key finding.',
        manipulations: ['None — all parameters at neutral defaults', 'Honest annotation (+2)', 'Confidence interval shown (+2)'],
        realWorldExample: 'The New York Times data visualization team follows strict editorial standards: zero baselines, labeled axes, and explicit source citations on every published chart.',
        guideline: 'This is the standard every data presentation should meet. No design choice obscures or distorts the underlying data.',
    },
    {
        level: 2,
        name: 'Emphasis',
        color: '#1d4ed8',
        bgColor: '#eff6ff',
        borderColor: '#3b82f6',
        description: 'The chart uses visual emphasis to direct attention toward specific elements. The emphasis does not distort perception — it prioritizes it. The viewer sees the full picture but is guided.',
        example: 'Highlighting one bar in a contrasting color to draw attention to the best-performing region, while all bars remain accurately scaled.',
        manipulations: ['Color emphasis on relevant element (+1)', 'Slight smoothing, 2-3 period (-1)', 'Value sorting for comparison (0)'],
        realWorldExample: 'Apple quarterly earnings presentations use strategic color emphasis to draw attention to Services revenue growth while showing all segments accurately.',
        guideline: 'Emphasis is editorial, not deceptive. The key test: would the viewer reach a significantly different conclusion if the emphasis were removed?',
    },
    {
        level: 3,
        name: 'Framing',
        color: '#92400e',
        bgColor: '#fffbeb',
        borderColor: '#f59e0b',
        description: 'The chart presents accurate data but makes design choices that favor one interpretation over alternatives. No data is falsified, but the frame constrains the interpretation space.',
        example: 'Sorting bars to place underperforming categories in the middle where they receive less scrutiny. Choosing a chart type that de-emphasizes unfavorable comparisons.',
        manipulations: ['Custom sorting to bury bad data (-3)', 'Alphabetical sort when values matter (-1)', 'Axis truncation 1-20% (-1)'],
        realWorldExample: 'Pharmaceutical companies have been documented presenting clinical trial data with time windows and subgroup selections that favor treatment efficacy over the full-dataset result.',
        guideline: 'Framing is where ethics get ambiguous. The data is accurate but the presentation is biased. Presenters should ask: am I choosing this frame because it communicates truth, or because it serves my argument?',
    },
    {
        level: 4,
        name: 'Distortion',
        color: '#dc2626',
        bgColor: '#fef2f2',
        borderColor: '#ef4444',
        description: 'The chart alters the visual representation in ways that cause systematic perceptual errors. The data may be accurate, but the visual encoding produces incorrect magnitude judgments.',
        example: 'Truncating the Y-axis to start at 50% of the minimum, making a 3% decline appear as a 60% visual drop. Adding 3D perspective that foreshortens rear elements.',
        manipulations: ['Axis truncation >50% (-5)', '3D effect on (-4)', 'Heavy smoothing 7+ periods (-4)', 'Trendline on non-significant data (-2)'],
        realWorldExample: 'Cable news networks routinely truncate axes on political polling charts. A poll shift from 48% to 51% is rendered as a bar that appears to double in height.',
        guideline: 'Distortion is objectively measurable. If the visual magnitude ratio does not match the data magnitude ratio, the chart is distorted. There is no ambiguity at this level.',
    },
    {
        level: 5,
        name: 'Manipulation',
        color: '#991b1b',
        bgColor: '#fef2f2',
        borderColor: '#991b1b',
        description: 'The chart combines multiple distortions, removes inconvenient data, or adds deliberately misleading annotations to construct a false narrative. Trust is weaponized.',
        example: 'Combining axis truncation, manual outlier removal, heavy smoothing, and a misleading annotation to present declining revenue as stable growth.',
        manipulations: ['3+ severe manipulations combined (-3 penalty)', 'Manual outlier exclusion (-3)', 'Misleading annotation (-3)', 'Sample size <25% (-4)'],
        realWorldExample: 'Enron internal presentations combined selective time windows, non-standard accounting visualizations, and misleading annotations to hide losses from board members and investors.',
        guideline: 'Manipulation is a breach of trust. The presenter knows the data tells a different story and deliberately constructs a false one. This has career, legal, and organizational consequences.',
    },
];

export default function EthicsFramework() {
    const [activeLevel, setActiveLevel] = useState(1);
    const level = LEVELS[activeLevel - 1];

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-4">
                    <Scale size={14} className="text-slate-600" />
                    <span className="text-xs font-semibold text-slate-600">Ethics Framework</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                    The Five Ethical Levels
                </h2>
                <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
                    Every chart sits somewhere on a spectrum from transparent to manipulative.
                    Knowing where you are — and where the line is — is a professional responsibility.
                </p>
            </div>

            <div className="flex items-center justify-center gap-1 mb-10">
                {LEVELS.map((l, i) => (
                    <div key={l.level} className="flex items-center">
                        <button
                            onClick={() => setActiveLevel(l.level)}
                            className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border transition-all duration-200 min-w-[100px] ${activeLevel === l.level ? 'shadow-md scale-105' : 'hover:scale-[1.02]'
                                }`}
                            style={{
                                backgroundColor: activeLevel === l.level ? l.bgColor : '#fff',
                                borderColor: activeLevel === l.level ? l.borderColor : '#e2e8f0',
                            }}
                        >
                            <span
                                className="text-lg font-bold"
                                style={{ color: l.color }}
                            >
                                {l.level}
                            </span>
                            <span
                                className="text-xs font-semibold"
                                style={{ color: activeLevel === l.level ? l.color : '#64748b' }}
                            >
                                {l.name}
                            </span>
                        </button>
                        {i < LEVELS.length - 1 && (
                            <ArrowRight size={14} className="text-slate-300 mx-1" />
                        )}
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                    <div
                        className="rounded-2xl border p-6 shadow-sm"
                        style={{ backgroundColor: level.bgColor, borderColor: `${level.color}33` }}
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-white"
                                style={{ backgroundColor: level.color }}
                            >
                                {level.level}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold" style={{ color: level.color }}>
                                    Level {level.level}: {level.name}
                                </h3>
                            </div>
                        </div>

                        <p className="text-sm text-slate-700 leading-relaxed mb-6">{level.description}</p>

                        <div className="space-y-5">
                            <div className="bg-white/60 rounded-xl p-4 border border-white/50">
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Example</span>
                                <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">{level.example}</p>
                            </div>

                            <div className="bg-white/60 rounded-xl p-4 border border-white/50">
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Real-World Case</span>
                                <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">{level.realWorldExample}</p>
                            </div>

                            <div className="bg-white/60 rounded-xl p-4 border border-white/50">
                                <div className="flex items-start gap-2">
                                    {level.level <= 2 ? (
                                        <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />
                                    ) : (
                                        <AlertTriangle size={16} style={{ color: level.color }} className="mt-0.5 shrink-0" />
                                    )}
                                    <div>
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ethical Guideline</span>
                                        <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">{level.guideline}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Manipulation Types at This Level
                        </span>
                        <div className="mt-3 space-y-2">
                            {level.manipulations.map((m, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <div
                                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                        style={{ backgroundColor: level.color }}
                                    />
                                    <span className="text-sm text-slate-600">{m}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl border border-slate-100 p-5">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Decision-Maker Impact
                        </span>
                        <div className="mt-3 space-y-3">
                            {[
                                {
                                    label: 'Data Accuracy',
                                    value: level.level === 1 ? 100 : level.level === 2 ? 90 : level.level === 3 ? 70 : level.level === 4 ? 40 : 15,
                                    color: '#10b981',
                                },
                                {
                                    label: 'Viewer Trust Risk',
                                    value: level.level === 1 ? 5 : level.level === 2 ? 15 : level.level === 3 ? 40 : level.level === 4 ? 75 : 95,
                                    color: '#ef4444',
                                },
                                {
                                    label: 'Decision Quality',
                                    value: level.level === 1 ? 95 : level.level === 2 ? 85 : level.level === 3 ? 60 : level.level === 4 ? 30 : 10,
                                    color: '#3b82f6',
                                },
                            ].map((metric) => (
                                <div key={metric.label}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-slate-600">{metric.label}</span>
                                        <span className="text-xs font-bold" style={{ color: metric.color }}>
                                            {metric.value}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{ width: `${metric.value}%`, backgroundColor: metric.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            The Bright Line Test
                        </span>
                        <div className="mt-3 space-y-3">
                            {[
                                { question: 'Would I show my methodology to a skeptical analyst?', threshold: 3 },
                                { question: 'Would the conclusion change with neutral chart settings?', threshold: 3 },
                                { question: 'Am I choosing this design because it is clear or because it is persuasive?', threshold: 2 },
                                { question: 'Would I be comfortable if the audience knew every design choice I made?', threshold: 4 },
                            ].map((test, i) => (
                                <div key={i} className="flex items-start gap-2.5">
                                    <div
                                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-white"
                                        style={{
                                            backgroundColor: activeLevel >= test.threshold ? '#ef4444' : '#10b981',
                                        }}
                                    >
                                        {activeLevel >= test.threshold ? '!' : '\u2713'}
                                    </div>
                                    <span className="text-sm text-slate-600">{test.question}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
