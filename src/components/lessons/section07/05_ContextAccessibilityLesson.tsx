import { useState } from 'react';
import LessonPage from '../../../components/layout/LessonPage';
import ChartFrame from '../../../components/ui/ChartFrame';

const crossRefs = [
    { sectionId: 'mechanics', slug: 'color', label: '2.5 — Color semantics' },
];

function AccessibilityDemo() {
    const [mode, setMode] = useState<0 | 1 | 2>(0); // 0 = color only, 1 = simulated colorblind, 2 = color + shape

    // 4 categories, 15 points each
    const data = [...Array(60)].map((_, i) => ({
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        cat: i % 4
    }));

    // Typical vs Protanopia simulated vs Dual Encoded
    const getPointProps = (cat: number, i: number, m: number) => {
        const x = data[i].x;
        const y = data[i].y;

        if (m === 0) {
            // Standard colors
            const colors = ["#ef4444", "#3b82f6", "#22c55e", "#eab308"];
            return <circle key={i} cx={x} cy={y} r="2" fill={colors[cat]} opacity={0.8} />;
        } else if (m === 1) {
            // Simulated protanopia (red-green colorblind)
            const colors = ["#8f7d00", "#1c56a8", "#8f8200", "#d1ab00"];
            return <circle key={i} cx={x} cy={y} r="2" fill={colors[cat]} opacity={0.8} />;
        } else {
            // Dual encoded (color + shape)
            const colors = ["#ef4444", "#3b82f6", "#22c55e", "#eab308"];
            if (cat === 0) return <circle key={i} cx={x} cy={y} r="2.5" fill={colors[cat]} opacity={0.8} />;
            if (cat === 1) return <rect key={i} x={x - 2} y={y - 2} width="4" height="4" fill={colors[cat]} opacity={0.8} />;
            if (cat === 2) return <polygon key={i} points={`${x},${y - 3} ${x - 2.5},${y + 2} ${x + 2.5},${y + 2}`} fill={colors[cat]} opacity={0.8} />;
            return <polygon key={i} points={`${x},${y - 2.5} ${x - 2.5},${y} ${x},${y + 2.5} ${x + 2.5},${y}`} fill={colors[cat]} opacity={0.8} />;
        }
    };

    return (
        <div className="space-y-4 mb-16">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-2 gap-4">
                <h3 className="text-xl font-bold text-stone-900">1. Make it Accessible (Dual Encoding)</h3>
                <div className="flex bg-stone-100 p-1 rounded-lg border border-stone-200 shadow-inner">
                    <button onClick={() => setMode(0)} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 0 ? 'bg-white text-indigo-600 shadow-sm' : 'text-stone-600 hover:text-stone-800'}`}>1. Color Only</button>
                    <button onClick={() => setMode(1)} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 1 ? 'bg-white text-red-600 shadow-sm border border-red-100' : 'text-stone-600 hover:text-stone-800'}`}>2. Colorblind View</button>
                    <button onClick={() => setMode(2)} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 2 ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100' : 'text-stone-600 hover:text-stone-800'}`}>3. Dual Encoding</button>
                </div>
            </div>

            <ChartFrame
                label="CUSTOMER SEGMENTS"
                note={
                    mode === 0 ? "Relying purely on hue to distinguish 4 categories makes the chart vulnerable to color vision deficiencies and black-and-white printing." :
                        mode === 1 ? "In simulated Protanopia (red/green blindness), the red, green, and yellow categories collapse into indistinguishable muddy browns." :
                            "Dual Encoding pairs color with a secondary visual channel (like shape or pattern). Even if the colors are stripped away, the categories remain distinct."
                }
            >
                <div className="flex justify-center p-4 py-8 w-full">
                    <svg viewBox="0 0 480 220" className="w-[80%] max-w-[300px] h-auto overflow-visible block border border-stone-100 bg-stone-50/50 rounded-xl p-2 shadow-inner">
                        {/* Axes */}
                        <line x1="5" x2="95" y1="95" y2="95" stroke="#a8a29e" strokeWidth={0.5} />
                        <line x1="5" x2="5" y1="5" y2="95" stroke="#a8a29e" strokeWidth={0.5} />

                        {data.map((_, i) => getPointProps(data[i].cat, i, mode))}
                    </svg>
                </div>
            </ChartFrame>
        </div>
    );
}

function ScatterSmoothingDemo() {
    const [isSmoothed, setIsSmoothed] = useState(false);

    // noisy trend data
    const data = [...Array(30)].map((_, i) => {
        const x = 10 + (i / 29) * 80;
        const trend = 20 + 0.5 * i + 10 * Math.sin(i / 3);
        const noise = (Math.random() - 0.5) * 25;
        return { x, y: 95 - (trend + noise) };
    });

    const pathData = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${d.x} ${d.y}`).join(' ');

    return (
        <div className="space-y-4 mb-16">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-2 gap-4">
                <h3 className="text-xl font-bold text-stone-900">2. Scatter Smoothing</h3>
                <div className="flex bg-stone-100 p-1 rounded-lg border border-stone-200 shadow-inner">
                    <button onClick={() => setIsSmoothed(false)} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${!isSmoothed ? 'bg-white text-indigo-600 shadow-sm' : 'text-stone-600 hover:text-stone-800'}`}>Connecting Lines</button>
                    <button onClick={() => setIsSmoothed(true)} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${isSmoothed ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100' : 'text-stone-600 hover:text-stone-800'}`}>Points + Trend</button>
                </div>
            </div>

            <ChartFrame
                label="MONTHLY ENGAGEMENT"
                note={
                    !isSmoothed ? "Connecting every single data point in a highly volatile dataset creates a visually overwhelming zigzag pattern ('spaghetti chart'). The intense visual noise completely obscures the underlying trend." :
                        "By demoting individual observations to faded scatter points and deriving a single smoothed trend line, you eliminate the cognitive load of the noise and clearly reveal the upward trajectory."
                }
            >
                <div className="flex justify-center p-4 py-8 w-full">
                    <svg viewBox="0 0 480 220" className="w-[80%] max-w-[300px] h-auto overflow-visible block border border-stone-100 bg-stone-50/50 rounded-xl p-2 shadow-inner">
                        {/* Axes */}
                        <line x1="5" x2="95" y1="95" y2="95" stroke="#a8a29e" strokeWidth={0.5} />
                        <line x1="5" x2="5" y1="5" y2="95" stroke="#a8a29e" strokeWidth={0.5} />

                        {!isSmoothed ? (
                            <path d={pathData} fill="none" stroke="#2563eb" strokeWidth={0.7} />
                        ) : (
                            <g>
                                {data.map((d, i) => (
                                    <circle key={i} cx={d.x} cy={d.y} r="1.5" fill="#94a3b8" opacity={0.6} />
                                ))}
                                {/* Fake smoothed trend line */}
                                <path d="M 10 70 Q 30 65 50 45 T 90 20" fill="none" stroke="#2563eb" strokeWidth={1.5} />
                            </g>
                        )}
                    </svg>
                </div>
            </ChartFrame>
        </div>
    );
}

export default function ContextAccessibilityLesson() {
    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8 max-w-4xl mx-auto">
                <div>
                    <h2 className="text-2xl font-bold text-stone-800 mb-4">Context & Accessibility</h2>
                    <p className="text-[15px] text-stone-600 leading-relaxed mb-4">
                        Data visualizations do not exist in a vacuum. They must be legible to all users regardless of visual impairment, and they must present data in a way that aligns with human cognitive processing rather than raw mathematical plotting.
                    </p>
                </div>

                <AccessibilityDemo />
                <ScatterSmoothingDemo />

            </div>
        </LessonPage>
    );
}
