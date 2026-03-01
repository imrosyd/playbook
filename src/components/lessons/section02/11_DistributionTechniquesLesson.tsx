import { useState } from 'react';
import LessonPage from '../../../components/layout/LessonPage';
import ChartFrame from '../../../components/ui/ChartFrame';
import { SECTION_COLORS } from '../../../lib/design-tokens';
import { Lightbulb, Info } from 'lucide-react';

const sectionColor = SECTION_COLORS['02'].base;

const crossRefs = [
    { sectionId: 'mechanics', slug: 'distribution', label: '2.3 — Histogram vs Boxplot fundamentals' },
];

function RidgelineDemo() {
    const w = 480, h = 220, pad = { t: 16, r: 20, b: 32, l: 60 };
    // Realistic context: Delivery times across 3 different shipping methods
    const lines = [
        { label: 'Standard', color: '#3b82f6', d: 'M0 40 C 10 40, 25 5, 45 2, 65 5, 80 40, 100 40', pk: 45 },
        { label: 'Express', color: '#10b981', d: 'M0 40 C 5 40, 15 5, 25 2, 35 5, 50 40, 100 40', pk: 25 },
        { label: 'Same-Day', color: '#8b5cf6', d: 'M0 40 C 0 40, 5 5, 10 2, 15 5, 30 40, 100 40', pk: 10 }
    ];
    // Sort visually by peak (fastest to slowest)
    lines.sort((a, b) => a.pk - b.pk);

    return (
        <div className="space-y-4 mb-16">
            <h3 className="text-xl font-bold text-stone-900">1. Ridgeline / Joyplot</h3>
            <ChartFrame
                label="HOURS TO DELIVER BY METHOD"
                note="Ridgelines stack distributions vertically, allowing you to compare density peaks across multiple categories simultaneously without overlap chaos. Sorting them by peak creates a powerful cascading narrative."
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
                    {/* X-axis */}
                    <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#a8a29e" strokeWidth={1} />

                    {/* Gridlines */}
                    {[0, 20, 40, 60, 80, 100].map(val => {
                        const vx = pad.l + (val / 100) * (w - pad.l - pad.r);
                        return (
                            <g key={val}>
                                <line x1={vx} x2={vx} y1={pad.t} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />
                                <text x={vx} y={h - pad.b + 14} fill="#a8a29e" fontSize="9" textAnchor="middle">{val}</text>
                            </g>
                        );
                    })}

                    {lines.map((l, i) => {
                        const yOffset = pad.t + i * 45;
                        return (
                            <g key={i} transform={`translate(${pad.l}, ${yOffset}) scale(${(w - pad.l - pad.r) / 100}, 1.5)`}>
                                <path d={l.d} fill={l.color} opacity={0.6} stroke={l.color} strokeWidth={1} />
                                <text x="-5" y="36" fontSize="7" fontWeight="bold" fill="#475569" textAnchor="end">{l.label}</text>
                            </g>
                        )
                    })}
                </svg>
            </ChartFrame>
        </div>
    );
}

function BoxPlotToggleDemo() {
    const [isBox, setIsBox] = useState(false);
    const w = 480, h = 180, pad = { t: 16, r: 20, b: 32, l: 30 };

    // Realistic data: Base salary estimates (in $k)
    // Most cluster around 60-90k, with some executive outliers
    const dots = [45, 50, 52, 58, 60, 62, 65, 68, 70, 72, 75, 78, 80, 85, 90, 95, 140, 180, 210];
    const max = 250;
    const scaleX = (v: number) => pad.l + (v / max) * (w - pad.l - pad.r);

    // Box plot stats
    const q1 = 60, median = 72, q3 = 85, minWhisk = 45, maxWhisk = 120; // 1.5 IQR ends roughly at 120

    return (
        <div className="space-y-4 mb-16">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-stone-900">2. Show the Variability</h3>
                    <p className="text-[13px] text-stone-500 max-w-md">Aggregating thousands of points into a clear statistical summary.</p>
                </div>
                <button
                    onClick={() => setIsBox(!isBox)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${isBox
                        ? 'bg-stone-900 text-white shadow-stone-200'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:shadow-md'
                        }`}
                >
                    {isBox ? 'Show Raw Scatter' : 'Show Box Plot'}
                </button>
            </div>
            <ChartFrame
                label="BASE SALARY DISTRIBUTION"
                note={isBox ? "A Box Plot summarizes the distribution into quartiles and explicitly flags mathematical outliers (the red dots)." : "A raw 1D scatter/strip plot shows all the actual data points, ensuring no multi-modal phenomena are hidden by averages."}
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
                    {/* X-axis */}
                    <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#a8a29e" strokeWidth={1} />

                    {/* Gridlines */}
                    {[0, 50, 100, 150, 200, 250].map(val => (
                        <g key={val}>
                            <line x1={scaleX(val)} x2={scaleX(val)} y1={pad.t} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />
                            <text x={scaleX(val)} y={h - pad.b + 14} fill="#a8a29e" fontSize="9" textAnchor="middle">${val}k</text>
                        </g>
                    ))}

                    <line x1={pad.l} x2={w - pad.r} y1={pad.t + (h - pad.t - pad.b) / 2} y2={pad.t + (h - pad.t - pad.b) / 2} stroke="#e7e5e4" />

                    {!isBox && dots.map((d, i) => (
                        <circle key={i} cx={scaleX(d)} cy={pad.t + (h - pad.t - pad.b) / 2 + (i % 3 - 1) * 6} r={3} fill="#6366f1" opacity={0.6} stroke="white" strokeWidth={1} />
                    ))}

                    {isBox && (
                        <g>
                            <line x1={scaleX(minWhisk)} x2={scaleX(maxWhisk)} y1={pad.t + (h - pad.t - pad.b) / 2} y2={pad.t + (h - pad.t - pad.b) / 2} stroke="#334155" strokeWidth={2} />
                            <rect x={scaleX(q1)} y={pad.t + (h - pad.t - pad.b) / 2 - 15} width={scaleX(q3) - scaleX(q1)} height={30} fill="#cbd5e1" stroke="#334155" strokeWidth={2} />
                            <line x1={scaleX(median)} x2={scaleX(median)} y1={pad.t + (h - pad.t - pad.b) / 2 - 15} y2={pad.t + (h - pad.t - pad.b) / 2 + 15} stroke="#334155" strokeWidth={3} />
                            <line x1={scaleX(minWhisk)} x2={scaleX(minWhisk)} y1={pad.t + (h - pad.t - pad.b) / 2 - 10} y2={pad.t + (h - pad.t - pad.b) / 2 + 10} stroke="#334155" strokeWidth={2} />
                            <line x1={scaleX(maxWhisk)} x2={scaleX(maxWhisk)} y1={pad.t + (h - pad.t - pad.b) / 2 - 10} y2={pad.t + (h - pad.t - pad.b) / 2 + 10} stroke="#334155" strokeWidth={2} />

                            {/* Outliers */}
                            {dots.filter(d => d > maxWhisk).map((d, i) => (
                                <circle key={i} cx={scaleX(d)} cy={pad.t + (h - pad.t - pad.b) / 2} r={3.5} fill="#ef4444" stroke="white" strokeWidth={1} />
                            ))}
                        </g>
                    )}
                </svg>
            </ChartFrame>
        </div>
    );
}

function BeeswarmDemo() {
    const w = 480, h = 180, pad = { t: 16, r: 20, b: 32, l: 30 };
    // Simulated beeswarm distribution for "Customer Age"
    const points = [
        { x: 18, y: 0 }, { x: 22, y: 0 }, { x: 24, y: 5 }, { x: 24, y: -5 },
        { x: 25, y: 10 }, { x: 25, y: 0 }, { x: 25, y: -10 },
        { x: 28, y: 15 }, { x: 28, y: 5 }, { x: 28, y: -5 }, { x: 28, y: -15 },
        { x: 30, y: 20 }, { x: 30, y: 10 }, { x: 30, y: 0 }, { x: 30, y: -10 }, { x: 30, y: -20 },
        { x: 32, y: 15 }, { x: 32, y: 5 }, { x: 32, y: -5 }, { x: 32, y: -15 },
        { x: 35, y: 10 }, { x: 35, y: 0 }, { x: 35, y: -10 },
        { x: 38, y: 5 }, { x: 38, y: -5 }, { x: 42, y: 0 }, { x: 45, y: 0 }, { x: 55, y: 0 }
    ];

    const max = 60;
    const scaleX = (v: number) => pad.l + (v / max) * (w - pad.l - pad.r);

    return (
        <div className="space-y-4 mb-16">
            <h3 className="text-xl font-bold text-stone-900">3. Beeswarm / Strip Plot</h3>
            <ChartFrame
                label="CUSTOMER AGE"
                note="A beeswarm physically places every single data point without overlapping them. It provides the exact density of a histogram without grouping data into arbitrary bins, preserving maximum granularity."
            >
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full block">
                    {/* X-axis */}
                    <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#a8a29e" strokeWidth={1} />

                    {/* Gridlines */}
                    {[0, 15, 30, 45, 60].map(val => (
                        <g key={val}>
                            <line x1={scaleX(val)} x2={scaleX(val)} y1={pad.t} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />
                            <text x={scaleX(val)} y={h - pad.b + 14} fill="#a8a29e" fontSize="9" textAnchor="middle">{val}</text>
                        </g>
                    ))}

                    <g transform={`translate(0, ${pad.t + (h - pad.t - pad.b) / 2})`}>
                        {points.map((p, i) => (
                            <circle key={i} cx={scaleX(p.x)} cy={p.y} r={3} fill="#0ea5e9" opacity={0.8} stroke="#fff" strokeWidth={1} />
                        ))}
                    </g>
                </svg>
            </ChartFrame>
        </div>
    );
}

function HistogramShapes() {
    const shapes = [
        { name: 'Left-skewed', path: 'M0 35 L 20 35 L 30 25 L 50 15 L 70 5 L 85 20 L 100 35', desc: 'Ceiling effects (e.g. test scores)' },
        { name: 'Right-skewed', path: 'M0 35 L 15 10 L 30 5 L 50 20 L 70 28 L 85 32 L 100 35', desc: 'Floor effects (e.g. income)' },
        { name: 'Bimodal', path: 'M0 35 L 15 10 L 25 5 L 40 25 L 50 30 L 60 25 L 75 5 L 85 10 L 100 35', desc: 'Two distinct groups mixed' },
        { name: 'Bell Curve', path: 'M0 35 L 20 30 L 35 15 L 50 5 L 65 15 L 80 30 L 100 35', desc: 'Normal distribution' },
        { name: 'Uniform', path: 'M0 35 L 10 10 L 90 10 L 100 35', desc: 'Equal probability' },
        { name: 'Multimodal', path: 'M0 35 L 10 15 L 20 10 L 40 30 L 50 20 L 60 20 L 80 5 L 90 15 L 100 35', desc: 'Complex mixed phenomena' }
    ];

    return (
        <div className="space-y-4 mb-16">
            <h3 className="text-xl font-bold text-stone-900">4. Histogram Shapes Gallery</h3>
            <ChartFrame
                label="COMMON DISTRIBUTIONS"
                note="A gallery of common distribution shapes and what they typically represent in real-world data."
            >
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                    {shapes.map(s => (
                        <div key={s.name} className="flex flex-col bg-stone-50 p-4 border border-stone-200 rounded-xl shadow-sm">
                            <svg viewBox="0 0 100 45" className="w-full block mb-3">
                                {/* Grid/Axes */}
                                <line x1="0" x2="100" y1="40" y2="40" stroke="#a8a29e" strokeWidth={1} />
                                <line x1="50" x2="50" y1="0" y2="40" stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2 2" />

                                {/* KDE curve overlay instead of raw bars for neatness */}
                                <path d={s.path} fill="#bae6fd" opacity={0.6} stroke="#0284c7" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="text-center">
                                <span className="text-[12px] font-bold text-stone-800 block mb-1">{s.name}</span>
                                <span className="text-[11px] text-stone-500 leading-tight block">{s.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </ChartFrame>
        </div>
    );
}

function KdeButterflyBox() {
    return (
        <div className="space-y-4 mb-16">
            <h3 className="text-xl font-bold text-stone-900">5. Comparing A vs B Distributions</h3>
            <ChartFrame
                label="COMPARISON PATTERNS"
                note="When you need to compare exactly two groups, these are the four most common techniques depending on your focus."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">

                    {/* KDE Overlap */}
                    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[12px] font-bold text-stone-800 uppercase tracking-wider">1. KDE Overlap</span>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-1 text-[10px] font-bold text-stone-500"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Group A</span>
                                <span className="flex items-center gap-1 text-[10px] font-bold text-stone-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Group B</span>
                            </div>
                        </div>
                        <svg viewBox="0 0 100 45" className="w-full block">
                            <line x1="0" x2="100" y1="40" y2="40" stroke="#e7e5e4" strokeWidth={1} />
                            <path d="M0 40 C 20 40, 30 10, 40 10, 60 40, 80 40" fill="#3b82f6" opacity={0.6} />
                            <path d="M20 40 C 40 40, 50 5, 60 5, 80 40, 100 40" fill="#10b981" opacity={0.6} />
                        </svg>
                        <p className="text-[12px] text-stone-600 mt-3 leading-tight">Shows continuous density overlap. Best for smooth, vast continuous data.</p>
                    </div>

                    {/* Butterfly Chart */}
                    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[12px] font-bold text-stone-800 uppercase tracking-wider">2. Butterfly Bar</span>
                        </div>
                        <svg viewBox="0 0 100 45" className="w-full block">
                            <line x1="50" x2="50" y1="0" y2="45" stroke="#a8a29e" strokeWidth={1} />

                            {/* Group A (Left) */}
                            <rect x="30" y="5" width="20" height="6" fill="#3b82f6" opacity={0.9} />
                            <rect x="10" y="15" width="40" height="6" fill="#3b82f6" opacity={0.9} />
                            <rect x="25" y="25" width="25" height="6" fill="#3b82f6" opacity={0.9} />
                            <rect x="40" y="35" width="10" height="6" fill="#3b82f6" opacity={0.9} />

                            {/* Group B (Right) */}
                            <rect x="50" y="5" width="15" height="6" fill="#10b981" opacity={0.9} />
                            <rect x="50" y="15" width="35" height="6" fill="#10b981" opacity={0.9} />
                            <rect x="50" y="25" width="45" height="6" fill="#10b981" opacity={0.9} />
                            <rect x="50" y="35" width="20" height="6" fill="#10b981" opacity={0.9} />
                        </svg>
                        <p className="text-[12px] text-stone-600 mt-3 leading-tight">Back-to-back bars prevent messy overlaps and are great for population pyramids.</p>
                    </div>

                    {/* Box Plot Comparison */}
                    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[12px] font-bold text-stone-800 uppercase tracking-wider">3. Parallel Box Plots</span>
                        </div>
                        <svg viewBox="0 0 100 45" className="w-full block">
                            {/* X-axis */}
                            <line x1="0" x2="100" y1="40" y2="40" stroke="#e7e5e4" strokeWidth={1} />

                            {/* Group A */}
                            <line x1="10" x2="45" y1="15" y2="15" stroke="#334155" strokeWidth={0.5} />
                            <rect x="20" y="10" width="15" height="10" fill="#3b82f6" opacity={0.6} stroke="#334155" strokeWidth={0.5} />
                            <line x1="28" x2="28" y1="10" y2="20" stroke="#334155" strokeWidth={1} />

                            {/* Group B */}
                            <line x1="30" x2="80" y1="30" y2="30" stroke="#334155" strokeWidth={0.5} />
                            <rect x="50" y="25" width="20" height="10" fill="#10b981" opacity={0.6} stroke="#334155" strokeWidth={0.5} />
                            <line x1="60" x2="60" y1="25" y2="35" stroke="#334155" strokeWidth={1} />
                        </svg>
                        <p className="text-[12px] text-stone-600 mt-3 leading-tight">Summary statistics side-by-side. Focuses on quartiles rather than density shape.</p>
                    </div>

                    {/* Stacked Histogram */}
                    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[12px] font-bold text-stone-800 uppercase tracking-wider">4. Stacked Histogram</span>
                        </div>
                        <svg viewBox="0 0 100 45" className="w-full block">
                            <line x1="0" x2="100" y1="40" y2="40" stroke="#e7e5e4" strokeWidth={1} />

                            <rect x="10" y="25" width="15" height="15" fill="#3b82f6" opacity={0.9} />
                            <rect x="10" y="15" width="15" height="10" fill="#10b981" opacity={0.9} />

                            <rect x="30" y="15" width="15" height="25" fill="#3b82f6" opacity={0.9} />
                            <rect x="30" y="5" width="15" height="10" fill="#10b981" opacity={0.9} />

                            <rect x="50" y="25" width="15" height="15" fill="#3b82f6" opacity={0.9} />
                            <rect x="50" y="10" width="15" height="15" fill="#10b981" opacity={0.9} />

                            <rect x="70" y="32" width="15" height="8" fill="#3b82f6" opacity={0.9} />
                            <rect x="70" y="25" width="15" height="7" fill="#10b981" opacity={0.9} />
                        </svg>
                        <p className="text-[12px] text-stone-600 mt-3 leading-tight">Shows totals for the bin, stacked by proportion. Good for raw volumes.</p>
                    </div>
                </div>
            </ChartFrame>
        </div>
    );
}

function ViolinDemo() {
    return (
        <div className="space-y-4 mb-16">
            <h3 className="text-xl font-bold text-stone-900">6. Violin Plot</h3>
            <ChartFrame
                label="VIOLIN PLOT ANATOMY"
                note="A Violin plot combines the summary statistical markers of a box plot with the continuous density shape of a KDE curve (mirrored symmetrically). It explicitly reveals multi-modal data clusters that a simple box plot would obscure."
            >
                <div className="flex justify-center py-4 w-full relative">
                    <svg viewBox="0 0 100 60" className="w-full max-w-[200px] overflow-visible block">
                        {/* Axes */}
                        <line x1="0" x2="100" y1="55" y2="55" stroke="#a8a29e" strokeWidth={0.5} />
                        <line x1="20" x2="20" y1="0" y2="55" stroke="#e7e5e4" strokeWidth={0.5} strokeDasharray="1 1" />
                        <line x1="50" x2="50" y1="0" y2="55" stroke="#e7e5e4" strokeWidth={0.5} strokeDasharray="1 1" />
                        <line x1="80" x2="80" y1="0" y2="55" stroke="#e7e5e4" strokeWidth={0.5} strokeDasharray="1 1" />

                        {/* Violin Shape (Mirrored KDE) */}
                        <path d="M 50 10 C 65 20, 90 30, 50 50 C 10 30, 35 20, 50 10 Z" fill="#c4b5fd" stroke="#7c3aed" strokeWidth={1} opacity={0.8} />

                        {/* Inner Box Plot */}
                        <line x1="50" x2="50" y1="20" y2="40" stroke="#4c1d95" strokeWidth={1} />
                        <rect x="48" y="25" width="4" height="10" fill="#1e1b4b" />
                        <circle cx="50" cy="30" r="1.5" fill="white" />
                    </svg>
                </div>
            </ChartFrame>
        </div>
    );
}

export default function DistributionTechniquesLesson() {
    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Averages lie. Showing the mean without the variability hides the most important part of the data: the risk, the outliers, and the shape of reality. These techniques shift the conversation from "what's the average?" to "what does the full spectrum look like?"
                </p>

                {/* Tip Block */}
                <div
                    className="rounded-xl p-5 space-y-3 border transition-all hover:shadow-sm"
                    style={{
                        backgroundColor: `${sectionColor}08`,
                        borderColor: `${sectionColor}20`,
                    }}
                >
                    <div className="flex items-start gap-3">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
                            style={{ backgroundColor: sectionColor }}
                        >
                            <Lightbulb size={16} className="text-white" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: sectionColor }}>
                                The Average Fallacy
                            </p>
                            <p className="text-[14px] text-stone-700 leading-relaxed">
                                If you have two people with a salary of $10k and $190k, the average is $100k. But <em>neither</em> of them makes $100k. Visualizing the distribution is about revealing the <strong>internal truth</strong> that an average obscures.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <RidgelineDemo />
                    <BoxPlotToggleDemo />
                    <BeeswarmDemo />
                    <HistogramShapes />
                    <KdeButterflyBox />
                    <ViolinDemo />
                </div>

                {/* Conclusion Block */}
                <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 space-y-4">
                    <div className="flex items-center gap-3 text-stone-900">
                        <Info size={20} className="text-stone-400" />
                        <h4 className="text-lg font-bold">Choosing the Distribution Chart</h4>
                    </div>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        For executive audiences, the <strong>Box Plot</strong> is the standard for summarizing risk. For analytical audiences where specific clusters matter, the <strong>Beeswarm</strong> or <strong>Ridgeline</strong> are superior as they don't lose the raw data points.
                    </p>
                </div>
            </div>
        </LessonPage>
    );
}
