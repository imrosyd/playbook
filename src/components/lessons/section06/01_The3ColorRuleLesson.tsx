import { useState } from 'react';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = [
    { sectionId: 'design', slug: 'color-psychology', label: 'Color Psychology' },
    { sectionId: 'design', slug: 'colorblind', label: 'Designing for Colorblindness' },
];

// Donut-style chart showing 3 colors vs more
function ColorCountChart({ count }: { count: number }) {
    const colors = ['#1c1917', '#78716c', '#d6d3d1', '#ef4444', '#3b82f6', '#a3e635'].slice(0, count);
    const segSize = 360 / colors.length;
    const cx = 80, cy = 80, r = 60, innerR = 35;

    const arc = (startDeg: number, endDeg: number, fill: string, key: number) => {
        const toRad = (d: number) => (d - 90) * (Math.PI / 180);
        const x1 = cx + r * Math.cos(toRad(startDeg));
        const y1 = cy + r * Math.sin(toRad(startDeg));
        const x2 = cx + r * Math.cos(toRad(endDeg));
        const y2 = cy + r * Math.sin(toRad(endDeg));
        const ix1 = cx + innerR * Math.cos(toRad(startDeg));
        const iy1 = cy + innerR * Math.sin(toRad(startDeg));
        const ix2 = cx + innerR * Math.cos(toRad(endDeg));
        const iy2 = cy + innerR * Math.sin(toRad(endDeg));
        const large = (endDeg - startDeg) > 180 ? 1 : 0;
        return (
            <path key={key}
                d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${large} 0 ${ix1} ${iy1} Z`}
                fill={fill}
                stroke="white"
                strokeWidth={2}
            />
        );
    };

    return (
        <svg viewBox="0 0 480 220" className="w-full" style={{ maxWidth: 160 }}>
            {colors.map((c, i) => arc(i * segSize, (i + 1) * segSize, c, i))}
            <text x={cx} y={cy + 4} textAnchor="middle" fill="#1c1917" fontSize={14}>{count}</text>
            <text x={cx} y={cy + 16} textAnchor="middle" fill="#78716c" fontSize={8}>colors</text>
        </svg>
    );
}

export default function The3ColorRuleLesson() {
    const [count, setCount] = useState(3);

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Open a typical corporate slide deck and count the colors. You'll find eight, twelve, sometimes more. Each color signal tells the viewer's brain: "this thing is different from that thing." At three hues, the brain can maintain an effortless mapping. At five or six, the legend must be consulted repeatedly. At eight, colors stop encoding categories and start creating visual noise — the chart looks busy, not insightful.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    The 3-Color Rule is not a stylistic preference — it is grounded in the cognitive science of <strong>working memory capacity and categorical color discrimination</strong>. Pre-attentive processing handles color automatically, but category matching ("which color corresponds to which label in the legend?") consumes working memory. Miller's Law shows working memory can hold approximately 7±2 items simultaneously. A 6-color chart with a legend forces the viewer to hold 6 color-to-label mappings in working memory while also reading the chart — saturating cognitive capacity before any insight is communicated.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    The correct 3-color framework assigns <strong>specific semantic roles</strong> to each color: primary (the main data series — your current year, your metric, your entity of interest), secondary (context or comparison — prior year, target, or benchmark), and accent (a single highlight that draws the eye to the critical actionable insight). Accent color should appear on at most one element per chart. When everything is highlighted, nothing is highlighted. The professional discipline of restricting the accent to a single element is what creates the visual hierarchy that guides the viewer directly to the takeaway.
                </p>

                <TheoryBlock
                    title="Why 3 Colors is the Cognitive Limit"
                    theory="Miller's Law + Pre-attentive Attribute Theory (Ware, 2004)"
                    explanation="Color is processed pre-attentively — it takes zero deliberate effort to perceive. But discriminating between colors requires working memory. Studies show that beyond 5–6 hues, categorical discrimination degrades sharply. For charts, 3 colors (primary, secondary, accent/highlight) is the practical limit for fast, accurate decoding."
                />

                <div className="bg-white border border-stone-200 rounded-xl p-5">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">
                        Watch how comprehension degrades as color count increases
                    </p>
                    <div className="flex items-center gap-8">
                        <div className="shrink-0">
                            <ColorCountChart count={count} />
                        </div>
                        <div className="flex-1 space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[12px] font-semibold text-stone-600">Color count: {count}</span>
                                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${count <= 3 ? 'bg-stone-900 text-white' : count <= 5 ? 'bg-stone-200 text-stone-700' : 'bg-red-50 text-red-700'}`}>
                                        {count <= 3 ? 'Recommended' : count <= 5 ? 'Borderline' : 'Too many'}
                                    </span>
                                </div>
                                <input
                                    type="range" min={2} max={6} value={count}
                                    onChange={e => setCount(Number(e.target.value))}
                                    className="w-full accent-stone-800"
                                />
                                <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                                    <span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
                                </div>
                            </div>
                            <p className="text-[13px] text-stone-500 leading-relaxed">
                                {count <= 3
                                    ? 'Your viewer can see the full palette in a single glance and immediately map each color to a category.'
                                    : count <= 5
                                        ? 'Marginally acceptable for simple bar charts. Requires a visible, well-positioned legend.'
                                        : 'At this count, the chart is almost certainly over-designed. Simplify by grouping or removing series.'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-base font-bold text-stone-800">The 3-color system</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                            { role: 'Primary', use: 'Main data series. The thing you are measuring.', color: '#1c1917' },
                            { role: 'Secondary', use: 'Comparison or baseline. Previous period, target, or benchmark.', color: '#78716c' },
                            { role: 'Accent', use: 'One specific highlight — outlier, insight, or call to action. Use sparingly.', color: '#dc2626' },
                        ].map(c => (
                            <div key={c.role} className="bg-white border border-stone-200 rounded-xl p-4">
                                <div className="w-8 h-8 rounded-lg mb-3" style={{ backgroundColor: c.color }} />
                                <p className="text-[12px] font-bold text-stone-800 mb-1">{c.role}</p>
                                <p className="text-[12px] text-stone-500 leading-relaxed">{c.use}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
