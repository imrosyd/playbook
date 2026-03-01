import { useState } from 'react';
import LessonPage from '../../../components/layout/LessonPage';

const crossRefs = [
    { sectionId: 'lab', slug: 'axis-scale', label: '3.1 — Zooming In (Axis Tricks)' },
];

function ScaleDomainNarrativeDemo() {
    const [domain, setDomain] = useState<'-2to2' | '-5to5'>('-5to5');

    // Data points representing moderate correlation
    const points = [
        { x: -1.5, y: -1.2 }, { x: -1.2, y: -0.8 }, { x: -0.8, y: -1.1 }, { x: -0.5, y: -0.2 },
        { x: 0, y: 0.3 }, { x: 0.2, y: 0.1 }, { x: 0.5, y: 0.8 }, { x: 0.9, y: 0.7 },
        { x: 1.2, y: 1.5 }, { x: 1.5, y: 1.2 }
    ];

    const currentMax = domain === '-2to2' ? 2 : 5;

    // SVG maps domain [-currentMax, currentMax] to [0, 100]
    const mapVal = (val: number) => ((val + currentMax) / (currentMax * 2)) * 100;

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <h3 className="text-[14px] font-bold text-stone-800 uppercase tracking-wide mb-6">Scale Domain Narrative</h3>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 w-full bg-stone-50 border border-stone-100 rounded-xl p-6 relative min-h-[250px] flex justify-center">
                    <div className="absolute top-4 right-4">
                        <div className="bg-stone-200 p-1 rounded-lg flex gap-1">
                            <button onClick={() => setDomain('-2to2')} className={`px-3 py-1 text-[10px] font-bold rounded shadow-sm transition-all ${domain === '-2to2' ? 'bg-white text-stone-800' : 'text-stone-500 hover:text-stone-700'}`}>Domain [-2, 2]</button>
                            <button onClick={() => setDomain('-5to5')} className={`px-3 py-1 text-[10px] font-bold rounded shadow-sm transition-all ${domain === '-5to5' ? 'bg-white text-stone-800' : 'text-stone-500 hover:text-stone-700'}`}>Domain [-5, 5]</button>
                        </div>
                    </div>

                    <div className="w-[80%] max-w-[250px] mt-6 relative">
                        <svg viewBox="0 0 480 220" className="w-full h-auto overflow-visible bg-white border border-stone-200 drop-shadow-sm">
                            {/* Grid center lines */}
                            <line x1="50" x2="50" y1="0" y2="100" stroke="#e2e8f0" strokeWidth={0.5} />
                            <line x1="0" x2="100" y1="50" y2="50" stroke="#e2e8f0" strokeWidth={0.5} />

                            {points.map((p, i) => (
                                <circle
                                    key={i}
                                    cx={mapVal(p.x)}
                                    cy={100 - mapVal(p.y)}
                                    r="2"
                                    fill="#3b82f6"
                                    className="transition-all duration-700 ease-in-out"
                                />
                            ))}

                            <text x="50" y="105" fontSize="4" fill="#94a3b8" textAnchor="middle">0</text>
                            <text x="0" y="105" fontSize="4" fill="#94a3b8" textAnchor="middle">-{currentMax}</text>
                            <text x="100" y="105" fontSize="4" fill="#94a3b8" textAnchor="middle">{currentMax}</text>

                            <text x="-5" y="51" fontSize="4" fill="#94a3b8" textAnchor="end">0</text>
                            <text x="-5" y="4" fontSize="4" fill="#94a3b8" textAnchor="end">{currentMax}</text>
                            <text x="-5" y="100" fontSize="4" fill="#94a3b8" textAnchor="end">-{currentMax}</text>
                        </svg>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[14px] text-stone-600 bg-white border border-stone-200 p-5 rounded-xl shadow-sm leading-relaxed">
                        {domain === '-5to5' ?
                            "When the axis domain is excessively wide [-5, 5], the data cluster appears tightly packed in the center. The narrative implied is: 'Everything is normal, variance is low, the correlation is negligible compared to the total bounds.'" :
                            "When the axis limits exactly bound the data [-2, 2], the variance looks extreme. The points scatter wildly across the entire canvas. The narrative implied is: 'Look at this massive volatility and strong diagonal correlation!'"
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}

function EconomistStyleDemo() {
    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <h3 className="text-[14px] font-bold text-stone-800 uppercase tracking-wide mb-6">The "Economist" Prediction Anchor</h3>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 w-full bg-stone-50 border border-stone-100 rounded-xl p-6 relative min-h-[250px] flex flex-col justify-center">
                    <h4 className="text-[12px] font-bold text-stone-700 uppercase tracking-widest border-b border-stone-300 pb-1 mb-4 flex justify-between">
                        <span>Global Ev Adoption</span>
                        <span className="text-stone-400 font-normal normal-case">% of new car sales</span>
                    </h4>

                    <svg viewBox="0 0 480 220" className="w-full h-auto overflow-visible">
                        {/* Horizontal Grid */}
                        <line x1="0" x2="100" y1="5" y2="5" stroke="#cbd5e1" strokeWidth={0.5} />
                        <line x1="0" x2="100" y1="20" y2="20" stroke="#cbd5e1" strokeWidth={0.5} />
                        <line x1="0" x2="100" y1="35" y2="35" stroke="#cbd5e1" strokeWidth={0.5} />
                        <line x1="0" x2="100" y1="50" y2="50" stroke="#94a3b8" strokeWidth={1} /> {/* base */}

                        {/* Y-axis labels */}
                        <text x="100" y="4" fontSize="4" fill="#94a3b8" textAnchor="end">75%</text>
                        <text x="100" y="19" fontSize="4" fill="#94a3b8" textAnchor="end">50%</text>
                        <text x="100" y="34" fontSize="4" fill="#94a3b8" textAnchor="end">25%</text>

                        {/* Today Marker Line (Anchor) */}
                        <line x1="60" x2="60" y1="0" y2="50" stroke="#f87171" strokeWidth={0.8} />
                        <rect x="52" y="-5" width="16" height="5" fill="#f87171" />
                        <text x="60" y="-1.5" fontSize="3.5" fill="#fff" textAnchor="middle">TODAY</text>

                        {/* Historical Data (Solid) */}
                        <path d="M 0 48 L 15 45 L 30 38 L 45 32 L 60 25" fill="none" stroke="#0ea5e9" strokeWidth={1.5} />
                        <circle cx="60" cy="25" r="1.5" fill="#0ea5e9" />

                        {/* Predicted Data (Dashes) */}
                        <path d="M 60 25 L 75 18 L 90 8 L 100 5" fill="none" stroke="#0ea5e9" strokeWidth={1.5} strokeDasharray="2 2" />

                        {/* X-axis labels */}
                        <text x="0" y="55" fontSize="4" fill="#64748b" textAnchor="start">2010</text>
                        <text x="30" y="55" fontSize="4" fill="#64748b" textAnchor="middle">2016</text>
                        <text x="90" y="55" fontSize="4" fill="#64748b" textAnchor="middle">2030</text>
                    </svg>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[14px] text-stone-600 bg-white border border-stone-200 p-5 rounded-xl shadow-sm leading-relaxed">
                        Publications like <em>The Economist</em> frequently project trends into the future. By placing a stark, undeniable "TODAY" anchor line vertically in the chart, and immediately switching the line style from solid (verified fact) to dashed (speculative forecast), they maintain extreme academic honesty while still telling a compelling story about tomorrow.
                    </p>
                </div>
            </div>
        </div>
    );
}

function ContextualAnnotationsDemo() {
    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <h3 className="text-[14px] font-bold text-stone-800 uppercase tracking-wide mb-6">Contextual Annotations</h3>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 w-full bg-stone-50 border border-stone-100 rounded-xl p-6 relative min-h-[250px] flex justify-center items-end">
                    <svg viewBox="0 0 480 220" className="w-[90%] max-w-[300px] h-auto overflow-visible">
                        {/* Axes */}
                        <line x1="5" x2="95" y1="65" y2="65" stroke="#a8a29e" strokeWidth={0.5} />

                        {/* Bars representing Daily Active Users over a week */}
                        <rect x="10" y="40" width="8" height="25" fill="#94a3b8" />
                        <rect x="22" y="38" width="8" height="27" fill="#94a3b8" />
                        <rect x="34" y="25" width="8" height="40" fill="#94a3b8" />

                        {/* The anomaly days */}
                        <rect x="46" y="55" width="8" height="10" fill="#ef4444" opacity="0.8" />
                        <rect x="58" y="58" width="8" height="7" fill="#ef4444" opacity="0.8" />

                        {/* Recovery */}
                        <rect x="70" y="35" width="8" height="30" fill="#94a3b8" />
                        <rect x="82" y="32" width="8" height="33" fill="#94a3b8" />

                        {/* X-axis labels */}
                        <text x="14" y="70" fontSize="3" fill="#64748b" textAnchor="middle">Mon</text>
                        <text x="26" y="70" fontSize="3" fill="#64748b" textAnchor="middle">Tue</text>
                        <text x="38" y="70" fontSize="3" fill="#64748b" textAnchor="middle">Wed</text>
                        <text x="50" y="70" fontSize="3" fill="#ef4444" textAnchor="middle">Thu</text>
                        <text x="62" y="70" fontSize="3" fill="#ef4444" textAnchor="middle">Fri</text>
                        <text x="74" y="70" fontSize="3" fill="#64748b" textAnchor="middle">Sat</text>
                        <text x="86" y="70" fontSize="3" fill="#64748b" textAnchor="middle">Sun</text>

                        {/* Annotation Bracket over Thu/Fri */}
                        {/* from x=44 to x=68, y sits at 20 */}
                        <path d="M 46 22 L 46 18 L 56 18 L 56 16 M 56 18 L 66 18 L 66 22" fill="none" stroke="#b91c1c" strokeWidth={0.5} />

                        {/* Annotation Text */}
                        <text x="56" y="14" fontSize="4" fill="#b91c1c" textAnchor="middle">Landing Page 500 Error</text>
                        <text x="56" y="27" fontSize="3" fill="#ef4444" textAnchor="middle">(Resolved Friday 2PM)</text>

                    </svg>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[14px] text-stone-600 bg-white border border-stone-200 p-5 rounded-xl shadow-sm leading-relaxed">
                        Data without a timeline of events forces the viewer to guess <em>why</em> a drop occurred. A simple SVG bracket grouping the anomalous bars, paired with a direct text explanation, instantly transforms the chart from a 'What happened?' mystery into a 'Here is the root cause' answer.
                    </p>
                </div>
            </div>
        </div>
    );
}

function AestheticVsPurposeDemo() {
    const [is3D, setIs3D] = useState(true);

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[14px] font-bold text-stone-800 uppercase tracking-wide">Aesthetic vs Purpose</h3>
                <button
                    onClick={() => setIs3D(!is3D)}
                    className="px-4 py-2 rounded-lg text-xs font-bold transition-all bg-stone-100 text-stone-800 border border-stone-200 shadow-sm hover:bg-stone-200"
                >
                    {is3D ? 'Flatten to 2D' : 'Make it 3D'}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 w-full bg-stone-50 border border-stone-100 rounded-xl p-6 relative min-h-[250px] flex justify-center items-end">
                    <svg viewBox="0 0 480 220" className="w-[80%] max-w-[250px] h-auto overflow-visible">
                        {is3D ? (
                            <g>
                                {/* A fake 3D perspective bar chart. Very hard to read the exact value. */}
                                {/* Grid perspective lines */}
                                <path d="M 10 70 L 30 50 L 100 50" fill="none" stroke="#e2e8f0" strokeWidth={0.5} />
                                <path d="M 10 50 L 30 30 L 100 30" fill="none" stroke="#e2e8f0" strokeWidth={0.5} />
                                <path d="M 10 30 L 30 10 L 100 10" fill="none" stroke="#e2e8f0" strokeWidth={0.5} />

                                <path d="M 10 70 L 100 70" fill="none" stroke="#94a3b8" strokeWidth={1} />

                                {/* 3D Bar 1 */}
                                <path d="M 20 70 L 20 40 L 30 40 L 30 70 Z" fill="#3b82f6" /> {/* Front */}
                                <path d="M 20 40 L 25 35 L 35 35 L 30 40 Z" fill="#60a5fa" /> {/* Top */}
                                <path d="M 30 40 L 35 35 L 35 65 L 30 70 Z" fill="#2563eb" /> {/* Side */}

                                {/* 3D Bar 2 - slightly behind and hard to compare */}
                                <path d="M 50 60 L 50 20 L 60 20 L 60 60 Z" fill="#10b981" /> {/* Front */}
                                <path d="M 50 20 L 55 15 L 65 15 L 60 20 Z" fill="#34d399" /> {/* Top */}
                                <path d="M 60 20 L 65 15 L 65 55 L 60 60 Z" fill="#059669" /> {/* Side */}

                                <text x="25" y="76" fontSize="4" fill="#64748b" textAnchor="middle">Q1</text>
                                <text x="55" y="66" fontSize="4" fill="#64748b" textAnchor="middle">Q2</text>
                            </g>
                        ) : (
                            <g>
                                {/* Clean 2D Flat version with a quota line */}
                                <line x1="10" x2="10" y1="10" y2="70" stroke="#94a3b8" strokeWidth={0.5} />
                                <line x1="10" x2="90" y1="70" y2="70" stroke="#94a3b8" strokeWidth={0.5} />

                                {/* Target/Quota line */}
                                <line x1="10" x2="90" y1="20" y2="20" stroke="#f59e0b" strokeWidth={1} strokeDasharray="3 3" />
                                <text x="92" y="21" fontSize="4" fill="#d97706">Sales Quota</text>

                                <rect x="25" y="40" width="15" height="30" fill="#3b82f6" rx="1" />
                                <text x="32.5" y="38" fontSize="4" fill="#1e40af" textAnchor="middle">60%</text>

                                <rect x="55" y="15" width="15" height="55" fill="#10b981" rx="1" />
                                <text x="62.5" y="13" fontSize="4" fill="#065f46" textAnchor="middle">110%</text>

                                <text x="32.5" y="75" fontSize="4" fill="#64748b" textAnchor="middle">Q1</text>
                                <text x="62.5" y="75" fontSize="4" fill="#64748b" textAnchor="middle">Q2</text>
                            </g>
                        )}
                    </svg>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[14px] text-stone-600 bg-white border border-stone-200 p-5 rounded-xl shadow-sm leading-relaxed">
                        {is3D ?
                            "3D effects are aesthetic sugar. Because of forced perspective, the audience cannot reliably trace the top of the bar back to the Y-axis. The data is fundamentally illegible." :
                            "Flat, 2D design is inherently purposeful. Without the distraction of extruded polygons, we can layer precise operational data—like a dotted Sales Quota line—allowing instant variance evaluation (Q1 missed, Q2 beat)."}
                    </p>
                </div>
            </div>
        </div>
    );
}

function SlopegraphLimitationsDemo() {
    const [isFixed, setIsFixed] = useState(false);

    // Data points representing ranking/values from start to end
    // overlapping labels issue

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[14px] font-bold text-stone-800 uppercase tracking-wide">The Slopegraph Overlap Problem</h3>
                <button
                    onClick={() => setIsFixed(!isFixed)}
                    className="px-4 py-2 rounded-lg text-xs font-bold transition-all bg-stone-100 text-stone-800 border border-stone-200 shadow-sm hover:bg-stone-200"
                >
                    {isFixed ? 'Revert to Messy' : 'Fix Overlaps (Stagger)'}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 w-full bg-stone-50 border border-stone-100 rounded-xl p-6 relative min-h-[250px] flex justify-center">
                    <svg viewBox="0 0 480 220" className="w-[90%] max-w-[300px] h-auto overflow-visible">
                        {/* Title & Axes */}
                        <text x="50" y="5" fontSize="5" fill="#334155" textAnchor="middle">Market Share: 2023 vs 2024</text>
                        <line x1="20" x2="20" y1="15" y2="75" stroke="#cbd5e1" strokeWidth={0.5} />
                        <line x1="80" x2="80" y1="15" y2="75" stroke="#cbd5e1" strokeWidth={0.5} />

                        <text x="20" y="12" fontSize="4" fill="#64748b" textAnchor="middle">2023</text>
                        <text x="80" y="12" fontSize="4" fill="#64748b" textAnchor="middle">2024</text>

                        {/* Line 1: Alpha (Top) */}
                        <path d="M 20 25 L 80 20" fill="none" stroke="#3b82f6" strokeWidth={1} />
                        <circle cx="20" cy="25" r="1.5" fill="#3b82f6" />
                        <circle cx="80" cy="20" r="1.5" fill="#3b82f6" />
                        <text x="18" y="26" fontSize="3.5" fill="#3b82f6" textAnchor="end">Alpha (30%)</text>
                        <text x="82" y="21" fontSize="3.5" fill="#3b82f6" textAnchor="start">Alpha (35%)</text>

                        {/* Middle Cluster (The Overlap Problem) */}
                        {/* Beta: 15% -> 12% */}
                        <path d="M 20 50 L 80 55" fill="none" stroke="#64748b" strokeWidth={0.5} />
                        <circle cx="20" cy="50" r="1" fill="#64748b" />
                        <circle cx="80" cy="55" r="1" fill="#64748b" />

                        {/* Gamma: 14% -> 16% */}
                        <path d="M 20 52 L 80 48" fill="none" stroke="#64748b" strokeWidth={0.5} />
                        <circle cx="20" cy="52" r="1" fill="#64748b" />
                        <circle cx="80" cy="48" r="1" fill="#64748b" />

                        {/* Delta: 13% -> 11% */}
                        <path d="M 20 54 L 80 57" fill="none" stroke="#64748b" strokeWidth={0.5} />
                        <circle cx="20" cy="54" r="1" fill="#64748b" />
                        <circle cx="80" cy="57" r="1" fill="#64748b" />

                        {/* Epsilon: 12% -> 17% (The breakout) */}
                        <path d="M 20 56 L 80 46" fill="none" stroke="#f59e0b" strokeWidth={1} />
                        <circle cx="20" cy="56" r="1.5" fill="#f59e0b" />
                        <circle cx="80" cy="46" r="1.5" fill="#f59e0b" />

                        {isFixed ? (
                            <g>
                                {/* Left Side Staggered Labels */}
                                <text x="18" y="47" fontSize="3" fill="#64748b" textAnchor="end">Beta (15%)</text>
                                <text x="18" y="52" fontSize="3" fill="#64748b" textAnchor="end">Gamma (14%)</text>
                                <line x1="18.5" x2="19.5" y1="46.5" y2="50" stroke="#cbd5e1" strokeWidth={0.2} /> {/* connector */}

                                <text x="18" y="56" fontSize="3" fill="#64748b" textAnchor="end">Delta (13%)</text>
                                <text x="18" y="61" fontSize="3.5" fill="#d97706" textAnchor="end">Epsilon (12%)</text>
                                <line x1="18.5" x2="19.5" y1="60.5" y2="56" stroke="#fcd34d" strokeWidth={0.5} /> {/* connector */}

                                {/* Right Side Staggered Labels */}
                                <text x="82" y="45" fontSize="3.5" fill="#d97706" textAnchor="start">Epsilon (17%)</text>
                                <text x="82" y="49" fontSize="3" fill="#64748b" textAnchor="start">Gamma (16%)</text>

                                <text x="82" y="55" fontSize="3" fill="#64748b" textAnchor="start">Beta (12%)</text>
                                <text x="82" y="59" fontSize="3" fill="#64748b" textAnchor="start">Delta (11%)</text>
                            </g>
                        ) : (
                            <g>
                                {/* Left Side Messy Overlap */}
                                <text x="18" y="50" fontSize="3" fill="#64748b" textAnchor="end">Beta (15%)</text>
                                <text x="18" y="52" fontSize="3" fill="#64748b" textAnchor="end">Gamma (14%)</text>
                                <text x="18" y="54" fontSize="3" fill="#64748b" textAnchor="end">Delta (13%)</text>
                                <text x="18" y="56" fontSize="3.5" fill="#d97706" textAnchor="end">Epsilon (12%)</text>
                                {/* Notice how they literally print on top of each other slightly in real D3 without collision detection */}

                                {/* Right Side Messy Overlap */}
                                <text x="82" y="55" fontSize="3" fill="#64748b" textAnchor="start">Beta (12%)</text>
                                <text x="82" y="48" fontSize="3" fill="#64748b" textAnchor="start">Gamma (16%)</text>
                                <text x="82" y="57" fontSize="3" fill="#64748b" textAnchor="start">Delta (11%)</text>
                                <text x="82" y="46" fontSize="3.5" fill="#d97706" textAnchor="start">Epsilon (17%)</text>
                            </g>
                        )}


                    </svg>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[14px] text-stone-600 bg-white border border-stone-200 p-5 rounded-xl shadow-sm leading-relaxed">
                        Slopegraphs are incredible for showing changes in rank. But they instantly break when values cluster together, causing text overlap. The professional fix is a collision-detection algorithm (or manual nudging) that staggers the labels and connects them with faint leader lines, preserving readability without altering the math.
                    </p>
                </div>
            </div>
        </div>
    );
}


export default function NarrativeScaleLesson() {
    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8 max-w-5xl mx-auto">
                <div>
                    <h2 className="text-2xl font-bold text-stone-800 mb-4">Narrative & Scale</h2>
                    <p className="text-[15px] text-stone-600 leading-relaxed mb-4">
                        How you frame the bounds of your chart creates the psychological context for the data inside it. A line is just a line until you tell the user where "Today" is, and a scatter plot's density is entirely defined by its axis limits.
                    </p>
                </div>

                <ScaleDomainNarrativeDemo />
                <EconomistStyleDemo />
                <ContextualAnnotationsDemo />
                <AestheticVsPurposeDemo />
                <SlopegraphLimitationsDemo />

            </div>
        </LessonPage>
    );
}
