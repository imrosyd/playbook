import { useState, useMemo } from 'react';
import LessonPage from '../../../components/layout/LessonPage';

const crossRefs = [
    { sectionId: 'context', slug: 'audience', label: '1.2 — Understanding your audience' },
];

function MeanVsMedianDemo() {
    const [outlier, setOutlier] = useState(50); // $50k to $500k
    const [useMedian, setUseMedian] = useState(false);

    // Group A (Stable): [40, 45, 50, 55, 60] -> mean=50, median=50
    const meanA = 50;
    const medianA = 50;

    // Group B (With Outlier): [40, 45, 50, 55, outlier]
    const meanB = useMemo(() => (40 + 45 + 50 + 55 + outlier) / 5, [outlier]);
    const medianB = 50;

    const valA = useMedian ? medianA : meanA;
    const valB = useMedian ? medianB : meanB;

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[14px] font-bold text-stone-800 uppercase tracking-wide">Mean vs Median</h3>
                <button
                    onClick={() => setUseMedian(!useMedian)}
                    className="px-4 py-2 rounded-lg text-xs font-bold transition-all bg-stone-100 text-stone-800 border border-stone-200 shadow-sm hover:bg-stone-200"
                >
                    {useMedian ? 'Switch to Mean (Average)' : 'Switch to Median'}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <div className="mb-6 bg-stone-50 border border-stone-200 rounded-lg p-4">
                        <label className="text-[12px] font-bold text-stone-700 uppercase block mb-2">Adjust Group B's Top Earner: ${outlier}k</label>
                        <input
                            type="range"
                            min="50"
                            max="500"
                            step="10"
                            value={outlier}
                            onChange={(e) => setOutlier(Number(e.target.value))}
                            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div className="relative w-full h-[200px] border-b border-l border-stone-300">
                        {/* Y-axis labels */}
                        <text className="absolute -left-10 bottom-0 text-[10px] text-stone-500">0</text>
                        <text className="absolute -left-12 top-[46px] text-[10px] text-stone-500">$100k</text>

                        <div className="absolute left-0 right-0 top-[46px] border-t border-dashed border-stone-200"></div>

                        {/* Bar A */}
                        <div className="absolute left-[20%] w-[20%] bottom-0 bg-blue-500 rounded-t-md transition-all duration-300 flex items-end justify-center pb-2"
                            style={{ height: `${(valA / 150) * 100}%` }}>
                            <span className="text-white text-[10px] font-bold">${Math.round(valA)}k</span>
                        </div>
                        <div className="absolute left-[20%] w-[20%] -bottom-6 text-center text-[12px] font-bold text-stone-600">Team A</div>

                        {/* Bar B */}
                        <div className="absolute left-[60%] w-[20%] bottom-0 bg-emerald-500 rounded-t-md transition-all duration-300 flex items-end justify-center pb-2"
                            style={{ height: `${Math.min((valB / 150) * 100, 100)}%` }}>
                            {valB > 150 && <div className="absolute -top-4 text-[10px] text-red-500 font-bold break-words w-full text-center">Off chart!</div>}
                            <span className="text-white text-[10px] font-bold">${Math.round(valB)}k</span>
                        </div>
                        <div className="absolute left-[60%] w-[20%] -bottom-6 text-center text-[12px] font-bold text-stone-600">Team B</div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <div className="bg-white border border-stone-200 p-5 rounded-xl shadow-sm">
                        <h4 className="text-sm font-bold text-stone-800 mb-2">The "Average" Lie</h4>
                        <p className="text-[14px] text-stone-600 leading-relaxed">
                            {useMedian ?
                                "The Median is robust to outliers. Even if the top earner makes $500k, the 'typical' person in Team B still makes $50k, making it identical to Team A." :
                                "The Mean is highly sensitive to outliers. Drag the slider to $500k. The average skyrockets to $140k, implying Team B is vastly richer, even though 4 out of 5 people make exactly the same as Team A."
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ShowGroupsDemo() {
    const [touching, setTouching] = useState(false);

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[14px] font-bold text-stone-800 uppercase tracking-wide">Show the Groups (Gestalt Proximity)</h3>
                <button
                    onClick={() => setTouching(!touching)}
                    className="px-4 py-2 rounded-lg text-xs font-bold transition-all bg-stone-100 text-stone-800 border border-stone-200 shadow-sm hover:bg-stone-200"
                >
                    {touching ? 'Add Spacing' : 'Group by Touching'}
                </button>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 w-full bg-stone-50 border border-stone-100 rounded-xl p-4 flex justify-center items-end h-[200px] pb-8 relative">
                    <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                        <line x1="0" x2="100" y1="50" y2="50" stroke="#a8a29e" strokeWidth={0.5} />

                        {touching ? (
                            <g>
                                {/* Group 1 */}
                                <rect x="10" y="20" width="10" height="30" fill="#3b82f6" />
                                <rect x="20" y="10" width="10" height="40" fill="#10b981" />
                                <text x="20" y="58" fontSize="4" fill="#57534e" textAnchor="middle" fontWeight="bold">Q1</text>

                                {/* Group 2 */}
                                <rect x="40" y="15" width="10" height="35" fill="#3b82f6" />
                                <rect x="50" y="5" width="10" height="45" fill="#10b981" />
                                <text x="50" y="58" fontSize="4" fill="#57534e" textAnchor="middle" fontWeight="bold">Q2</text>

                                {/* Group 3 */}
                                <rect x="70" y="25" width="10" height="25" fill="#3b82f6" />
                                <rect x="80" y="20" width="10" height="30" fill="#10b981" />
                                <text x="80" y="58" fontSize="4" fill="#57534e" textAnchor="middle" fontWeight="bold">Q3</text>
                            </g>
                        ) : (
                            <g>
                                <rect x="5" y="20" width="8" height="30" fill="#3b82f6" />
                                <rect x="18" y="10" width="8" height="40" fill="#10b981" />

                                <rect x="38" y="15" width="8" height="35" fill="#3b82f6" />
                                <rect x="51" y="5" width="8" height="45" fill="#10b981" />

                                <rect x="71" y="25" width="8" height="25" fill="#3b82f6" />
                                <rect x="84" y="20" width="8" height="30" fill="#10b981" />
                                <text x="50" y="58" fontSize="4" fill="#57534e" textAnchor="middle">All arbitrarily spaced</text>
                            </g>
                        )}
                    </svg>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[14px] text-stone-600 bg-white border border-stone-200 p-5 rounded-xl shadow-sm leading-relaxed">
                        {touching ?
                            "By removing the padding between related bars (and adding padding between groups), the Gestalt principle of Proximity takes over. The brain instantly sees three distinct pairs (Q1, Q2, Q3) comparing blue vs green." :
                            "When bars are evenly spaced, the brain sees six independent bars. The user has to actively read the legend and X-axis to figure out which bars 'belong' to each other."}
                    </p>
                </div>
            </div>
        </div>
    );
}

function AudienceContextDemo() {
    const [isBusiness, setIsBusiness] = useState(true);

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[14px] font-bold text-stone-800 uppercase tracking-wide">Audience Context: The "So What?"</h3>
                <button
                    onClick={() => setIsBusiness(!isBusiness)}
                    className="px-4 py-2 rounded-lg text-xs font-bold transition-all bg-stone-100 text-stone-800 border border-stone-200 shadow-sm hover:bg-stone-200"
                >
                    {isBusiness ? 'Switch to Scientific Mode' : 'Switch to Executive Mode'}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 w-full flex justify-center items-center h-[200px] border border-stone-200 rounded-xl p-4 bg-stone-50">
                    {isBusiness ? (
                        <div className="w-full max-w-[280px]">
                            <h4 className="font-bold text-stone-800 mb-4 text-[13px] border-b-2 border-slate-800 pb-1">Direct ROI trumps Marketing in Q3</h4>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-bold text-stone-600 w-16 text-right">Sales</span>
                                    <div className="h-4 bg-blue-600 rounded-sm" style={{ width: '85%' }}></div>
                                    <span className="text-[10px] font-bold text-stone-600">85%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-bold text-stone-500 w-16 text-right">Marketing</span>
                                    <div className="h-4 bg-stone-300 rounded-sm" style={{ width: '45%' }}></div>
                                    <span className="text-[10px] text-stone-500">45%</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <svg viewBox="0 0 100 80" className="w-[80%] max-w-[200px] h-full overflow-visible">
                            {/* Academic style: Y-axis, error bars */}
                            <text x="50" y="-5" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#000">Figure 1. Operational Efficacy by Dept</text>

                            <line x1="15" x2="15" y1="5" y2="65" stroke="#000" strokeWidth={0.5} />
                            <line x1="15" x2="90" y1="65" y2="65" stroke="#000" strokeWidth={0.5} />

                            <text x="10" y="10" fontSize="4" textAnchor="end">1.0</text>
                            <text x="10" y="40" fontSize="4" textAnchor="end">0.5</text>
                            <text x="10" y="65" fontSize="4" textAnchor="end">0.0</text>

                            {/* Bar 1: Sales (0.85) */}
                            <rect x="30" y="14" width="20" height="51" fill="#fff" stroke="#000" strokeWidth={1} />
                            {/* Error bar +/- 0.05 */}
                            <line x1="40" x2="40" y1="11" y2="17" stroke="#000" strokeWidth={0.5} />
                            <line x1="38" x2="42" y1="11" y2="11" stroke="#000" strokeWidth={0.5} />
                            <line x1="38" x2="42" y1="17" y2="17" stroke="#000" strokeWidth={0.5} />
                            <text x="40" y="72" fontSize="5" textAnchor="middle">Sales</text>

                            {/* Bar 2: Marketing (0.45) */}
                            <rect x="60" y="38" width="20" height="27" fill="#fff" stroke="#000" strokeWidth={1} />
                            {/* Error bar +/- 0.15 */}
                            <line x1="70" x2="70" y1="29" y2="47" stroke="#000" strokeWidth={0.5} />
                            <line x1="68" x2="72" y1="29" y2="29" stroke="#000" strokeWidth={0.5} />
                            <line x1="68" x2="72" y1="47" y2="47" stroke="#000" strokeWidth={0.5} />
                            <text x="70" y="72" fontSize="5" textAnchor="middle">Marketing</text>
                        </svg>
                    )}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[14px] text-stone-600 bg-white border border-stone-200 p-5 rounded-xl shadow-sm leading-relaxed">
                        {isBusiness ?
                            "Executives have 3 seconds. They need the horizontal bar for fast readability, the conclusion written out as an active headline, and the noise completely removed. Colors tell them where to look." :
                            "Scientists need methodology defensibility. They require error bars (confidence intervals), generic titles ('Figure X'), explicit axes, and prefer austere styling to present the data neutrally."}
                    </p>
                </div>
            </div>
        </div>
    );
}

function SortedHighlightDemo() {
    const models = [
        { name: "GPT-4", score: 86.4, ours: false },
        { name: "Claude 3", score: 85.9, ours: false },
        { name: "Gemini Pro", score: 81.2, ours: false },
        { name: "Our Model", score: 78.5, ours: true },
        { name: "Llama 3", score: 75.1, ours: false },
        { name: "Mistral", score: 73.0, ours: false }
    ];

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <h3 className="text-[14px] font-bold text-stone-800 uppercase tracking-wide mb-6">The Sorted Highlight (Leaderboard)</h3>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 w-full bg-stone-50 border border-stone-100 rounded-xl p-6">
                    <h4 className="font-bold text-stone-800 mb-6 text-[15px] border-b border-stone-200 pb-2">Our Model Achieves SOTA vs Open Weights</h4>

                    <div className="flex flex-col gap-3">
                        {models.map((m) => (
                            <div key={m.name} className="flex items-center gap-3">
                                <span className={`text-[12px] w-20 text-right ${m.ours ? 'font-black text-rose-600' : 'font-bold text-stone-500'}`}>
                                    {m.name}
                                </span>
                                <div className="flex-1 flex items-center">
                                    <div
                                        className={`h-5 rounded-sm ${m.ours ? 'bg-rose-500 shadow-sm' : 'bg-stone-200'}`}
                                        style={{ width: `${m.score}%` }}
                                    ></div>
                                </div>
                                <span className={`text-[11px] w-8 text-left ${m.ours ? 'font-bold text-rose-600' : 'text-stone-500'}`}>
                                    {m.score}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[14px] text-stone-600 bg-white border border-stone-200 p-5 rounded-xl shadow-sm leading-relaxed">
                        Sorting dramatically reduces cognitive load (the eye doesn't have to jump around to rank items). Highlighting the target variable (Our Model) in a bright color while muting the rest instantly draws the eye to the hero of the story, even if it's not #1 overall.
                    </p>
                </div>
            </div>
        </div>
    );
}

function ExplainingVarianceDemo() {
    const [view, setView] = useState<0 | 1 | 2 | 3>(0);
    // 0: Raw Data, 1: Baseline/Trend, 2: Seasonality, 3: The Anomaly

    // Raw sales data (months 1 to 12)
    // Baseline: flat ~100.
    // Seasonality: high in Q4 (months 10,11,12)
    // Anomaly: month 7 marketing push

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <h3 className="text-[14px] font-bold text-stone-800 uppercase tracking-wide mb-6">Explaining Variance</h3>
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button onClick={() => setView(0)} className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 0 ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>1. Raw Data</button>
                <button onClick={() => setView(1)} className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 1 ? 'bg-blue-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>2. The Baseline</button>
                <button onClick={() => setView(2)} className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 2 ? 'bg-amber-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>3. Expected Seasonality</button>
                <button onClick={() => setView(3)} className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 3 ? 'bg-rose-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>4. The Anomaly</button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 w-full bg-stone-50 border border-stone-100 rounded-xl p-4 flex justify-center items-end h-[200px] pb-8 relative">
                    <svg viewBox="0 0 120 60" className="w-full h-full overflow-visible">
                        {/* Axes */}
                        <line x1="10" x2="110" y1="50" y2="50" stroke="#a8a29e" strokeWidth={0.5} />
                        <line x1="10" x2="10" y1="10" y2="50" stroke="#a8a29e" strokeWidth={0.5} />

                        {/* Data Path:
                            Base ~35y
                            Month 7 anomaly: drop to 15y
                            Month 10,11,12 holiday: drop to 20y
                        */}
                        <path
                            d="M 15 35 L 23 37 L 31 34 L 39 36 L 47 35 L 55 33 L 63 15 L 71 34 L 79 36 L 87 22 L 95 18 L 103 20"
                            fill="none"
                            stroke={view === 0 ? "#475569" : "#cbd5e1"}
                            strokeWidth={1.5}
                        />

                        {view >= 0 && (
                            <g fill={view === 0 ? "#475569" : "#cbd5e1"}>
                                <circle cx="15" cy="35" r="1.5" />
                                <circle cx="23" cy="37" r="1.5" />
                                <circle cx="31" cy="34" r="1.5" />
                                <circle cx="39" cy="36" r="1.5" />
                                <circle cx="47" cy="35" r="1.5" />
                                <circle cx="55" cy="33" r="1.5" />
                                <circle cx="63" cy="15" r="1.5" />
                                <circle cx="71" cy="34" r="1.5" />
                                <circle cx="79" cy="36" r="1.5" />
                                <circle cx="87" cy="22" r="1.5" />
                                <circle cx="95" cy="18" r="1.5" />
                                <circle cx="103" cy="20" r="1.5" />
                            </g>
                        )}

                        {view === 1 && (
                            <g>
                                <line x1="10" x2="110" y1="35" y2="35" stroke="#2563eb" strokeWidth={1} strokeDasharray="2 2" />
                                <text x="112" y="36" fontSize="4" fill="#2563eb" fontWeight="bold">Flat Baseline</text>
                            </g>
                        )}

                        {view === 2 && (
                            <g>
                                <rect x="83" y="10" width="24" height="40" fill="#f59e0b" opacity="0.1" />
                                <circle cx="87" cy="22" r="2" fill="#f59e0b" />
                                <circle cx="95" cy="18" r="2" fill="#f59e0b" />
                                <circle cx="103" cy="20" r="2" fill="#f59e0b" />
                                <text x="95" y="8" fontSize="4" fill="#d97706" textAnchor="middle" fontWeight="bold">Holiday Spike</text>
                            </g>
                        )}

                        {view === 3 && (
                            <g>
                                <circle cx="63" cy="15" r="3" fill="none" stroke="#e11d48" strokeWidth={1} />
                                <circle cx="63" cy="15" r="1.5" fill="#e11d48" />
                                <line x1="63" x2="63" y1="15" y2="5" stroke="#e11d48" strokeWidth={0.5} />
                                <text x="63" y="3" fontSize="4" fill="#e11d48" textAnchor="middle" fontWeight="bold">Viral Video</text>
                            </g>
                        )}

                    </svg>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[14px] text-stone-600 bg-white border border-stone-200 p-5 rounded-xl shadow-sm leading-relaxed">
                        {view === 0 && "Looking at raw data, everything looks like a spike or a dip. It's up to the analyst to deconstruct the signal from the noise."}
                        {view === 1 && "First, establish the baseline. What is the fundamental run-rate of the business when nothing special is happening? Here, it's flat."}
                        {view === 2 && "Second, highlight known structural variance. We expect Q4 to spike every year. That's not news, that's seasonality."}
                        {view === 3 && "Finally, what's left is the true anomaly. By stripping away baseline and seasonality, we isolate the specific event (the viral video in July) that actually requires executive attention."}
                    </p>
                </div>
            </div>
        </div>
    );
}

function AnalystChoicesDemo() {
    const [isDumbbell, setIsDumbbell] = useState(true);

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <h3 className="text-[14px] font-bold text-stone-800 uppercase tracking-wide mb-6">Analyst Choice: Emphasizing Totals vs Deltas</h3>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 w-full bg-stone-50 border border-stone-100 rounded-xl p-6">
                    <div className="flex justify-center mb-6">
                        <div className="bg-stone-200 p-1 rounded-lg flex gap-1">
                            <button onClick={() => setIsDumbbell(false)} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${!isDumbbell ? 'bg-white shadow-sm text-stone-800' : 'text-stone-500 hover:text-stone-700'}`}>Stacked Bar (Totals)</button>
                            <button onClick={() => setIsDumbbell(true)} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${isDumbbell ? 'bg-white shadow-sm text-stone-800' : 'text-stone-500 hover:text-stone-700'}`}>Dumbbell (Deltas)</button>
                        </div>
                    </div>

                    <div className="flex justify-center h-[150px]">
                        <svg viewBox="0 0 100 60" className="w-[80%] max-w-[250px] overflow-visible">
                            {/* Region A: 20 -> 40 */}
                            {/* Region B: 30 -> 25 */}
                            {/* Region C: 15 -> 40 */}

                            <text x="10" y="15" fontSize="4" fill="#57534e" textAnchor="end">NA</text>
                            <text x="10" y="30" fontSize="4" fill="#57534e" textAnchor="end">EU</text>
                            <text x="10" y="45" fontSize="4" fill="#57534e" textAnchor="end">APAC</text>

                            {isDumbbell ? (
                                <g>
                                    <line x1="20" x2="40" y1="14" y2="14" stroke="#cbd5e1" strokeWidth={1} />
                                    <circle cx="20" cy="14" r="2" fill="#94a3b8" />
                                    <circle cx="40" cy="14" r="2" fill="#3b82f6" />

                                    <line x1="30" x2="25" y1="29" y2="29" stroke="#cbd5e1" strokeWidth={1} />
                                    <circle cx="30" cy="29" r="2" fill="#94a3b8" />
                                    <circle cx="25" cy="29" r="2" fill="#ef4444" />

                                    <line x1="15" x2="40" y1="44" y2="44" stroke="#cbd5e1" strokeWidth={1} />
                                    <circle cx="15" cy="44" r="2" fill="#94a3b8" />
                                    <circle cx="40" cy="44" r="2" fill="#10b981" />

                                    <text x="50" y="5" fontSize="4" fill="#94a3b8">2023</text>
                                    <circle cx="45" cy="4" r="1.5" fill="#94a3b8" />
                                    <text x="70" y="5" fontSize="4" fill="#3b82f6">2024</text>
                                    <circle cx="65" cy="4" r="1.5" fill="#3b82f6" />
                                </g>
                            ) : (
                                <g>
                                    {/* 2023 Bar */}
                                    <rect x="15" y="12" width="20" height="4" fill="#94a3b8" />
                                    {/* 2024 Bar */}
                                    <rect x="35" y="12" width="20" height="4" fill="#3b82f6" />

                                    <rect x="15" y="27" width="30" height="4" fill="#94a3b8" />
                                    <rect x="45" y="27" width="25" height="4" fill="#ef4444" opacity={0.8} />

                                    <rect x="15" y="42" width="15" height="4" fill="#94a3b8" />
                                    <rect x="30" y="42" width="25" height="4" fill="#10b981" />
                                </g>
                            )}
                        </svg>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[14px] text-stone-600 bg-white border border-stone-200 p-5 rounded-xl shadow-sm leading-relaxed">
                        {isDumbbell ?
                            "The Dumbbell plot specifically emphasizes the magnitude and direction of CHANGE. The eye immediately sees that APAC grew the fastest, and EU actually shrank." :
                            "The Stacked Bar emphasizes TOTAL volume. Changes between segments become very hard to compare visually because the starting points of the second segments keep shifting based on the first."}
                    </p>
                </div>
            </div>
        </div>
    );
}

function PurpleCowDemo() {
    const [isBoring, setIsBoring] = useState(true);

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <h3 className="text-[14px] font-bold text-stone-800 uppercase tracking-wide mb-6">The "Purple Cow" (Aesthetic Novelty)</h3>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 w-full bg-stone-50 border border-stone-100 rounded-xl p-4 flex flex-col justify-center items-center relative min-h-[250px]">
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={() => setIsBoring(!isBoring)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all border shadow-sm ${isBoring ? 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50' : 'bg-fuchsia-600 border-fuchsia-700 text-white hover:bg-fuchsia-700'}`}
                        >
                            {isBoring ? 'Make it a Purple Cow' : 'Make it Boring'}
                        </button>
                    </div>

                    {isBoring ? (
                        <div className="w-full max-w-[200px] mt-8">
                            <h4 className="text-[12px] font-bold text-stone-700 mb-4 text-center">Market Share 2024</h4>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 text-right text-[10px] text-stone-500">Alpha</div>
                                    <div className="h-4 bg-stone-400 rounded-sm" style={{ width: '45%' }}></div>
                                    <div className="text-[10px] text-stone-600 font-bold">45%</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 text-right text-[10px] text-stone-500">Beta</div>
                                    <div className="h-4 bg-stone-300 rounded-sm" style={{ width: '35%' }}></div>
                                    <div className="text-[10px] text-stone-600 font-bold">35%</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 text-right text-[10px] text-stone-500">Gamma</div>
                                    <div className="h-4 bg-stone-200 rounded-sm" style={{ width: '20%' }}></div>
                                    <div className="text-[10px] text-stone-600 font-bold">20%</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center mt-4">
                            <h4 className="text-[12px] font-bold text-fuchsia-900 mb-4 text-center tracking-widest uppercase">Global Control 2024</h4>
                            <svg viewBox="0 0 100 100" className="w-[140px] h-[140px] drop-shadow-xl">
                                {/* A highly stylized nested sunburst / nightingale rose approximation */}
                                <circle cx="50" cy="50" r="45" fill="#fdf4ff" stroke="#f5d0fe" strokeWidth={1} />

                                {/* Gamma 20% */}
                                <path d="M 50 50 L 50 15 A 35 35 0 0 1 83.3 39.1 Z" fill="#e879f9" />

                                {/* Beta 35% */}
                                <path d="M 50 50 L 83.3 39.1 A 35 35 0 0 1 29.4 83.6 Z" fill="#c026d3" />

                                {/* Alpha 45% - extending outward to break the grid (Purple Cow effect) */}
                                <path d="M 50 50 L 29.4 83.6 A 48 48 0 0 1 45 2 Z" fill="#86198f" />
                                <path d="M 50 50 L 45 2 A 48 48 0 0 1 50 2 Z" fill="#86198f" /> {/* fill gap */}

                                <circle cx="50" cy="50" r="15" fill="#fff" />
                                <text x="50" y="52" fontSize="6" fill="#701a75" fontWeight="bold" textAnchor="middle">CORE</text>

                                {/* Floating labels */}
                                <text x="18" y="25" fontSize="5" fill="#86198f" fontWeight="bold">Alpha</text>
                                <text x="80" y="70" fontSize="5" fill="#c026d3" fontWeight="bold">Beta</text>
                                <text x="70" y="25" fontSize="5" fill="#e879f9" fontWeight="bold">Gamma</text>
                            </svg>
                        </div>
                    )}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[14px] text-stone-600 bg-white border border-stone-200 p-5 rounded-xl shadow-sm leading-relaxed">
                        {isBoring ?
                            "The Horizontal Bar chart is the most mathematically efficient, clear, and boring way to present this data. If your audience is internal analysts trying to extract exact numbers quickly, use this." :
                            "The 'Purple Cow' (Seth Godin's concept of standing out). This abstract layered sunburst/rose chart is mathematically inferior for comparing values, but it is visually arresting. If this is page 1 of a marketing PDF, the goal isn't analytical precision—it's getting them to stop scrolling."}
                    </p>
                </div>
            </div>
        </div>
    );
}

function AudiencePersonasDemo() {
    const [persona, setPersona] = useState<0 | 1 | 2>(1);
    // 0: Scientist (Box plots, deep stats), 1: Consultant (2x2 Matrix, frameworks), 2: Executive (Single KPI, big number)

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <h3 className="text-[14px] font-bold text-stone-800 uppercase tracking-wide mb-6">Designing for the Persona</h3>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button onClick={() => setPersona(0)} className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all ${persona === 0 ? 'bg-indigo-900 text-indigo-50' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>The Scientist</button>
                <button onClick={() => setPersona(1)} className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all ${persona === 1 ? 'bg-blue-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>The Consultant</button>
                <button onClick={() => setPersona(2)} className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all ${persona === 2 ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>The Executive</button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 w-full bg-stone-50 border border-stone-100 rounded-xl p-6 flex justify-center items-center h-[250px]">
                    {persona === 0 && (
                        <div className="w-full flex justify-center">
                            <svg viewBox="0 0 100 80" className="w-[80%] max-w-[200px] overflow-visible">
                                <text x="50" y="-5" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#312e81">Fig 1. Distribution of Conversion Efficacy by Variant (n=10,492)</text>
                                <line x1="15" x2="15" y1="5" y2="70" stroke="#312e81" strokeWidth={0.5} />
                                <line x1="15" x2="90" y1="70" y2="70" stroke="#312e81" strokeWidth={0.5} />

                                <text x="12" y="10" fontSize="4" textAnchor="end" fill="#312e81">4.0</text>
                                <text x="12" y="40" fontSize="4" textAnchor="end" fill="#312e81">2.0</text>
                                <text x="12" y="70" fontSize="4" textAnchor="end" fill="#312e81">0.0</text>

                                {/* Control Box Plot */}
                                <line x1="35" x2="35" y1="20" y2="60" stroke="#3730a3" strokeWidth={0.5} />
                                <rect x="30" y="30" width="10" height="20" fill="#e0e7ff" stroke="#3730a3" strokeWidth={0.5} />
                                <line x1="30" x2="40" y1="42" y2="42" stroke="#3730a3" strokeWidth={1} />

                                {/* Test Box Plot */}
                                <line x1="70" x2="70" y1="10" y2="50" stroke="#3730a3" strokeWidth={0.5} />
                                <rect x="65" y="18" width="10" height="15" fill="#e0e7ff" stroke="#3730a3" strokeWidth={0.5} />
                                <line x1="65" x2="75" y1="25" y2="25" stroke="#3730a3" strokeWidth={1} />

                                <text x="35" y="78" fontSize="4" textAnchor="middle" fill="#312e81">Control (A)</text>
                                <text x="70" y="78" fontSize="4" textAnchor="middle" fill="#312e81">Treatment (B)</text>
                                <text x="70" y="8" fontSize="4" textAnchor="middle" fill="#b91c1c" fontStyle="italic">p &lt; 0.05</text>
                            </svg>
                        </div>
                    )}

                    {persona === 1 && (
                        <div className="w-full flex justify-center">
                            <svg viewBox="0 0 100 100" className="w-[80%] max-w-[200px] overflow-visible">
                                <text x="50" y="0" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#1e3a8a">Strategic Value Matrix</text>

                                <rect x="10" y="10" width="40" height="40" fill="#f8fafc" stroke="#94a3b8" />
                                <rect x="50" y="10" width="40" height="40" fill="#eff6ff" stroke="#94a3b8" />
                                <rect x="10" y="50" width="40" height="40" fill="#f8fafc" stroke="#94a3b8" />
                                <rect x="50" y="50" width="40" height="40" fill="#f8fafc" stroke="#94a3b8" />

                                <line x1="10" x2="100" y1="50" y2="50" stroke="#1e3a8a" strokeWidth={1} />
                                <line x1="50" x2="50" y1="10" y2="100" stroke="#1e3a8a" strokeWidth={1} />

                                <text x="30" y="30" fontSize="5" fill="#64748b" textAnchor="middle">Risk Avoidance</text>
                                <text x="70" y="30" fontSize="5" fill="#1d4ed8" textAnchor="middle" fontWeight="bold">Growth Engine</text>
                                <text x="30" y="70" fontSize="5" fill="#64748b" textAnchor="middle">Divest</text>
                                <text x="70" y="70" fontSize="5" fill="#64748b" textAnchor="middle">Maintain</text>

                                <circle cx="75" cy="25" r="4" fill="#2563eb" />
                                <text x="75" y="26.5" fontSize="4" fill="#fff" textAnchor="middle" fontWeight="bold">B</text>

                                <circle cx="40" cy="60" r="3" fill="#94a3b8" />
                                <text x="40" y="61.5" fontSize="3" fill="#fff" textAnchor="middle" fontWeight="bold">A</text>

                                <text x="50" y="105" fontSize="4" textAnchor="middle" fill="#475569">Implementation Complexity &rarr;</text>
                                <text x="5" y="50" fontSize="4" textAnchor="middle" fill="#475569" transform="rotate(-90 5 50)">Expected ROI &rarr;</text>
                            </svg>
                        </div>
                    )}

                    {persona === 2 && (
                        <div className="w-full flex justify-center items-center flex-col">
                            <h4 className="text-stone-500 uppercase tracking-widest font-bold text-xs mb-2">Variant B Revenue Impact</h4>
                            <div className="text-6xl font-black text-emerald-600 tracking-tighter">+$1.2M</div>
                            <div className="mt-4 text-sm font-bold text-stone-700 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full">
                                Decision: Rollout to 100%
                            </div>
                        </div>
                    )}

                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[14px] text-stone-600 bg-white border border-stone-200 p-5 rounded-xl shadow-sm leading-relaxed">
                        {persona === 0 && "Scientists and analysts value nuance, methodology, and strict mathematical truths. They want to see the distribution, the sample size, and the p-value. They don't want you to make the decision for them."}
                        {persona === 1 && "Consultants and Strategists value conceptual framing. They don't just want the data; they want it mapped onto a framework (like a 2x2 matrix) that assigns strategic meaning (e.g., 'Growth Engine') to the numbers."}
                        {persona === 2 && "Executives value bottom-line impact and velocity. They do not want to see the box plot. They want to know the ultimate outcome in dollars, and they want the recommended action plainly stated."}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function DesignPatternsLesson() {
    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8 max-w-5xl mx-auto">
                <div>
                    <h2 className="text-2xl font-bold text-stone-800 mb-4">Design Patterns & Analyst Choices</h2>
                    <p className="text-[15px] text-stone-600 leading-relaxed mb-4">
                        Data visualization is a series of active choices. The exact same dataset can tell completely contrary stories depending on how you group it, summarize it, and frame it for your specific audience.
                    </p>
                </div>

                <MeanVsMedianDemo />
                <ShowGroupsDemo />
                <AudienceContextDemo />
                <SortedHighlightDemo />
                <ExplainingVarianceDemo />
                <AnalystChoicesDemo />
                <PurpleCowDemo />
                <AudiencePersonasDemo />

            </div>
        </LessonPage>
    );
}
