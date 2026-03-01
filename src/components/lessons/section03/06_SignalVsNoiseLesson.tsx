import { useState, useMemo } from 'react';
import LessonPage from '../../layout/LessonPage';

function ScatterSmoothingDemo() {
    const [smoothed, setSmoothed] = useState(false);

    // Stable pseudo-random data
    const data = useMemo(() => {
        let seed = 123;
        const random = () => {
            const x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        };
        return Array.from({ length: 80 }).map((_, i) => ({
            x: i,
            y: 40 + (i * 0.4) + (random() * 40 - 20)
        }));
    }, []);

    const w = 500;
    const h = 250;
    const pad = { t: 20, l: 40, r: 20, b: 30 };
    const chartW = w - pad.l - pad.r;
    const chartH = h - pad.t - pad.b;

    const scaleX = (val: number) => pad.l + (val / 79) * chartW;
    const scaleY = (val: number) => pad.t + (1 - val / 100) * chartH;

    const pathData = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(d.x)} ${scaleY(d.y)}`).join(' ');

    // Trendline: starts at y=40, ends at y=40 + 79*0.4 = 71.6
    const trendlineY1 = scaleY(40);
    const trendlineY2 = scaleY(40 + 79 * 0.4);

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[13px] font-bold text-stone-700 tracking-wide uppercase">
                    Signal vs. Noise Over Time
                </h3>
                <button
                    onClick={() => setSmoothed(!smoothed)}
                    className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-colors ${smoothed ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                >
                    {smoothed ? 'Remove Smoothing' : 'Apply Smoothing'}
                </button>
            </div>

            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto overflow-visible">
                <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} />
                <line x1={pad.l} x2={pad.l} y1={pad.t} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} />

                {/* Y-axis labels */}
                {[0, 50, 100].map(v => (
                    <text key={v} x={pad.l - 8} y={scaleY(v)} fill="#a8a29e" fontSize={10} textAnchor="end" dominantBaseline="middle">{v}</text>
                ))}

                {/* The messy zigzag */}
                <path
                    d={pathData}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth={1.5}
                    className="transition-opacity duration-700"
                    style={{ opacity: smoothed ? 0.2 : 0.85 }}
                />

                {/* The smoothed trendline */}
                <line
                    x1={scaleX(0)}
                    y1={trendlineY1}
                    x2={scaleX(79)}
                    y2={trendlineY2}
                    stroke="#059669"
                    strokeWidth={5}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                    style={{
                        opacity: smoothed ? 1 : 0,
                    }}
                />
            </svg>

            <div className="bg-stone-50 rounded-lg p-4 border border-stone-100 mt-6 min-h-[80px] flex items-center justify-center">
                <p className="text-[12px] text-stone-600 leading-relaxed text-center transition-all">
                    {!smoothed ?
                        <span>A raw time-series plot often contains significant high-frequency noise. The jagged, connected lines draw maximum visual attention to the variance, making it almost impossible to discern the underlying trend.</span> :
                        <span>By fading the noisy scatter and overlaying a <strong>smoothed trendline</strong>, the true "signal" is instantly obvious: a steady upward trajectory. The analytical focus shifts from day-to-day volatility to the macro trend.</span>
                    }
                </p>
            </div>
        </div>
    );
}

export default function SignalVsNoiseLesson() {
    return (
        <LessonPage>
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    A fundamental principle of data visualization is helping the viewer distinguish between <strong>Signal</strong> (the underlying reality or trend) and <strong>Noise</strong> (random variance or measurement error). In many datasets, the noise visually overwhelms the signal if plotted raw.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    A common mistake is producing a "spaghetti chart" or a jagged line chart that connects every single noisy data point. This forces the viewer's brain to process massive amounts of high-frequency visual information, only to realize the variance isn't the story. Strategic visual smoothing is required.
                </p>

                <ScatterSmoothingDemo />

                <p className="text-[15px] text-stone-600 leading-relaxed">
                    However, smoothing carries an ethical risk. Aggressive smoothing (like a high-degree polynomial fit or an excessive moving average window) can completely invent trends that do not exist, or erase genuine outliers that are crucial to the story. The visualization designer must ensure the trendline is a faithful mathematical representation of the data, not just an aesthetic brush stroke.
                </p>
            </div>
        </LessonPage>
    );
}
