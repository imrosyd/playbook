import { useState } from 'react';
import LessonPage from '../../../components/layout/LessonPage';

const crossRefs = [];

function WordcloudVsBarDemo() {
    const [isWordcloud, setIsWordcloud] = useState(true);

    const words = [
        { word: "Reliability", count: 85, color: "#1e3a8a", size: 40 },
        { word: "Cost", count: 72, color: "#2563eb", size: 32 },
        { word: "Speed", count: 68, color: "#3b82f6", size: 28 },
        { word: "Quality", count: 54, color: "#60a5fa", size: 24 },
        { word: "Service", count: 41, color: "#93c5fd", size: 20 },
        { word: "Features", count: 35, color: "#94a3b8", size: 16 },
        { word: "Brand", count: 28, color: "#cbd5e1", size: 14 }
    ];

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[14px] font-bold text-stone-800 uppercase tracking-wide">Wordcloud vs. Bar Chart</h3>
                <button
                    onClick={() => setIsWordcloud(!isWordcloud)}
                    className="px-4 py-2 rounded-lg text-xs font-bold transition-all bg-stone-100 text-stone-800 border border-stone-200 shadow-sm hover:bg-stone-200"
                >
                    {isWordcloud ? 'Convert to Bar Chart' : 'Revert to Wordcloud'}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 w-full bg-stone-50 border border-stone-100 rounded-xl p-6 relative min-h-[250px] flex justify-center items-center">
                    {isWordcloud ? (
                        <div className="w-full flex justify-center items-center select-none">
                            <svg viewBox="0 0 480 220" className="w-[80%] max-w-[300px] h-auto overflow-visible">
                                {/* Simple static layout simulating a word cloud */}
                                <text x="100" y="70" fontSize={words[0].size} fill={words[0].color} textAnchor="middle">{words[0].word}</text>
                                <text x="60" y="40" fontSize={words[1].size} fill={words[1].color} textAnchor="middle">{words[1].word}</text>
                                <text x="140" y="100" fontSize={words[2].size} fill={words[2].color} textAnchor="middle">{words[2].word}</text>
                                <text x="50" y="110" fontSize={words[3].size} fill={words[3].color} textAnchor="middle">{words[3].word}</text>
                                <text x="160" y="45" fontSize={words[4].size} fill={words[4].color} textAnchor="middle" transform="rotate(90, 160, 45)">{words[4].word}</text>
                                <text x="90" y="20" fontSize={words[5].size} fill={words[5].color} textAnchor="middle">{words[5].word}</text>
                                <text x="100" y="130" fontSize={words[6].size} fill={words[6].color} textAnchor="middle">{words[6].word}</text>
                            </svg>
                        </div>
                    ) : (
                        <div className="w-full max-w-[300px]">
                            <h4 className="text-[12px] font-bold text-stone-700 mb-4 border-b border-stone-300 pb-2">Top Customer Values (Q1 Survey)</h4>
                            <div className="flex flex-col gap-3">
                                {words.map((w, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-20 text-right text-[11px] font-bold text-stone-600">{w.word}</div>
                                        <div className="flex-1 flex items-center">
                                            <div className="h-5 rounded-sm" style={{ width: `${(w.count / 85) * 100}%`, backgroundColor: w.color }}></div>
                                        </div>
                                        <div className="w-8 text-[11px] text-stone-500 font-bold">{w.count}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[14px] text-stone-600 bg-white border border-stone-200 p-5 rounded-xl shadow-sm leading-relaxed">
                        {isWordcloud ?
                            "Word clouds are popular but analytically useless. The human eye cannot accurately compare the area of text, length of words confounds the size calculation (longer words look bigger), and placement is completely random." :
                            "A sorted horizontal bar chart delivers exactly what the user actually wants when they ask for a word cloud: an ordered ranking of the most frequent categorical observations. It is boring, but it works."}
                    </p>
                </div>
            </div>
        </div>
    );
}

function PsychologyOfDifferencesDemo() {
    const [view, setView] = useState<0 | 1 | 2>(0);
    // 0: Venn, 1: Flat Differences, 2: Crossing Differences

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <h3 className="text-[14px] font-bold text-stone-800 uppercase tracking-wide mb-6">Psychology of Differences</h3>
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button onClick={() => setView(0)} className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all ${view === 0 ? 'bg-indigo-900 text-indigo-50' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>1. The Venn Diagram</button>
                <button onClick={() => setView(1)} className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all ${view === 1 ? 'bg-blue-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>2. Parallel Lines</button>
                <button onClick={() => setView(2)} className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all ${view === 2 ? 'bg-rose-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>3. Crossing Context</button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 w-full bg-stone-50 border border-stone-100 rounded-xl p-6 relative min-h-[300px] flex justify-center items-center">

                    {view === 0 && (
                        <svg viewBox="0 0 480 220" className="w-[80%] max-w-[250px] overflow-visible">
                            <text x="50" y="5" fontSize="5" textAnchor="middle" fill="#334155">Segment Overlap</text>

                            {/* Venn diagrams are notoriously bad for actual data representation */}
                            <circle cx="40" cy="40" r="25" fill="#3b82f6" opacity="0.5" />
                            <circle cx="60" cy="40" r="25" fill="#10b981" opacity="0.5" />

                            <text x="32" y="42" fontSize="5" fill="#1e3a8a" textAnchor="middle">Mobile</text>
                            <text x="68" y="42" fontSize="5" fill="#064e3b" textAnchor="middle">Desktop</text>
                            <text x="50" y="42" fontSize="4" fill="#334155" textAnchor="middle">Both</text>

                            <text x="32" y="48" fontSize="4" fill="#1e3a8a" textAnchor="middle">45%</text>
                            <text x="68" y="48" fontSize="4" fill="#064e3b" textAnchor="middle">30%</text>
                            <text x="50" y="48" fontSize="4" fill="#334155" textAnchor="middle">25%</text>
                        </svg>
                    )}

                    {view === 1 && (
                        <svg viewBox="0 0 480 220" className="w-[80%] max-w-[250px] overflow-visible">
                            <text x="50" y="5" fontSize="5" textAnchor="middle" fill="#334155">Usage by Device Type</text>
                            <line x1="20" x2="20" y1="15" y2="70" stroke="#cbd5e1" strokeWidth={0.5} />
                            <line x1="80" x2="80" y1="15" y2="70" stroke="#cbd5e1" strokeWidth={0.5} />

                            <text x="20" y="12" fontSize="4" fill="#64748b" textAnchor="middle">Mobile Only (45%)</text>
                            <text x="80" y="12" fontSize="4" fill="#64748b" textAnchor="middle">Desktop Only (30%)</text>

                            {/* Parallel parallel lines to show magnitude, no crossing */}
                            <line x1="20" x2="80" y1="25" y2="25" stroke="#94a3b8" strokeWidth={1} />
                            <circle cx="20" cy="25" r="2" fill="#3b82f6" />
                            <circle cx="80" cy="25" r="2" fill="#10b981" />
                            <text x="15" y="26.5" fontSize="4" fill="#334155" textAnchor="end">Demographic A</text>

                            <line x1="20" x2="80" y1="40" y2="40" stroke="#94a3b8" strokeWidth={1} />
                            <circle cx="20" cy="40" r="2" fill="#3b82f6" />
                            <circle cx="80" cy="40" r="2" fill="#10b981" />
                            <text x="15" y="41.5" fontSize="4" fill="#334155" textAnchor="end">Demographic B</text>

                            <line x1="20" x2="80" y1="55" y2="55" stroke="#94a3b8" strokeWidth={1} />
                            <circle cx="20" cy="55" r="2" fill="#3b82f6" />
                            <circle cx="80" cy="55" r="2" fill="#10b981" />
                            <text x="15" y="56.5" fontSize="4" fill="#334155" textAnchor="end">Demographic C</text>
                        </svg>
                    )}

                    {view === 2 && (
                        <svg viewBox="0 0 480 220" className="w-[80%] max-w-[250px] overflow-visible">
                            <text x="50" y="5" fontSize="5" textAnchor="middle" fill="#334155">The Inversion (Crossing Context)</text>
                            <line x1="20" x2="20" y1="15" y2="70" stroke="#cbd5e1" strokeWidth={0.5} />
                            <line x1="80" x2="80" y1="15" y2="70" stroke="#cbd5e1" strokeWidth={0.5} />

                            <text x="20" y="12" fontSize="4" fill="#64748b" textAnchor="middle">Mobile Only</text>
                            <text x="80" y="12" fontSize="4" fill="#64748b" textAnchor="middle">Desktop Only</text>

                            {/* Crossing lines immediately draw the eye and imply a structural flip in behavior */}
                            {/* Line 1 */}
                            <path d="M 20 20 L 80 60" fill="none" stroke="#e2e8f0" strokeWidth={1} />
                            <circle cx="20" cy="20" r="1.5" fill="#f87171" opacity={0.5} />
                            <circle cx="80" cy="60" r="1.5" fill="#fcd34d" opacity={0.5} />

                            {/* Line 2 */}
                            <path d="M 20 25 L 80 50" fill="none" stroke="#e2e8f0" strokeWidth={1} />
                            <circle cx="20" cy="25" r="1.5" fill="#f87171" opacity={0.5} />
                            <circle cx="80" cy="50" r="1.5" fill="#fcd34d" opacity={0.5} />

                            {/* Line 3 - The crossed one */}
                            <path d="M 20 65 L 80 15" fill="none" stroke="#3b82f6" strokeWidth={1.5} />
                            <circle cx="20" cy="65" r="2" fill="#2563eb" />
                            <circle cx="80" cy="15" r="2" fill="#2563eb" />
                            <text x="15" y="66" fontSize="4" fill="#1e3a8a" textAnchor="end">Seniors</text>

                            {/* Line 4 - Context */}
                            <path d="M 20 30 L 80 40" fill="none" stroke="#e2e8f0" strokeWidth={1} />
                            <circle cx="20" cy="30" r="1.5" fill="#f87171" opacity={0.5} />
                            <circle cx="80" cy="40" r="1.5" fill="#fcd34d" opacity={0.5} />
                        </svg>
                    )}

                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[14px] text-stone-600 bg-white border border-stone-200 p-5 rounded-xl shadow-sm leading-relaxed">
                        {view === 0 && "Venn diagrams are notoriously difficult for audiences to parse when comparing more than 3 sets. The intersection areas rarely scale proportionally to the data, turning them into conceptual illustrations rather than data visualizations."}
                        {view === 1 && "By abandoning the Venn diagram for a structural layout (like a dumbbell or slopegraph), we can introduce other dimensions. Here, parallel lines imply stability across cohorts—everyone behaves roughly the same way."}
                        {view === 2 && "The human eye is hypersensitive to intersecting lines. By using a slopegraph, we instantly highlight 'The Inversion'—the one demographic cohort (Seniors) whose behavior completely contradicts the rest of the market. The crossing line becomes the immediate focal point of the presentation."}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function WordsPsychologyLesson() {
    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8 max-w-5xl mx-auto">
                <div>
                    <h2 className="text-2xl font-bold text-stone-800 mb-4">Words & Psychology</h2>
                    <p className="text-[15px] text-stone-600 leading-relaxed mb-4">
                        Visualizing categorical data and text requires overcoming deeply ingrained (but often bad) habits like Wordclouds and Venn Diagrams. Modern charting replaces these with robust, sortable, and psychologically impactful alternatives.
                    </p>
                </div>

                <WordcloudVsBarDemo />
                <PsychologyOfDifferencesDemo />

            </div>
        </LessonPage>
    );
}
