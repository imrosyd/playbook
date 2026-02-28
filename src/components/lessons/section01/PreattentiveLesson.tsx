import { useRef, useEffect, useState } from 'react';
import LessonPage from '../../../components/layout/LessonPage';

const crossRefs = [
    {
        sectionId: 'lab',
        slug: 'visual-emphasis',
        label: 'Section 3.3 — Color emphasis hijacks pre-attentive channels',
    },
    {
        sectionId: 'ethics',
        slug: 'emphasis',
        label: 'Section 5.2 — Emphasis: when editorial guidance becomes manipulation',
    },
];

const COLS = 8;
const ROWS = 6;
const CIRCLE_R = 9;
const GAP = 36;
const TARGET_INDEX = 19; // roughly center-ish

export default function PreattentiveLesson() {
    const [withColor, setWithColor] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null);

    const svgWidth = COLS * GAP + 24;
    const svgHeight = ROWS * GAP + 24;

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        // Clear existing content
        while (svg.firstChild) svg.removeChild(svg.firstChild);

        for (let i = 0; i < COLS * ROWS; i++) {
            const col = i % COLS;
            const row = Math.floor(i / COLS);
            const cx = 20 + col * GAP;
            const cy = 20 + row * GAP;

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', String(cx));
            circle.setAttribute('cy', String(cy));
            circle.setAttribute('r', String(CIRCLE_R));

            if (withColor && i === TARGET_INDEX) {
                circle.setAttribute('fill', '#dc2626');
            } else {
                circle.setAttribute('fill', '#d6d3d1'); // stone-300
            }

            svg.appendChild(circle);
        }
    }, [withColor]);

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Pre-attentive processing happens in under 200ms, before conscious thought. Your visual
                    system instantly detects color, size, orientation, and motion. Chart designers use this
                    to direct attention — legitimately or manipulatively.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { channel: 'Color hue', strength: 'Strongest', example: 'One red bar among grey bars — found instantly', risk: 'Can misdirect attention to an unimportant data point' },
                        { channel: 'Length / size', strength: 'Strong', example: 'A taller bar immediately reads as "more"', risk: 'Truncated axes exploit this channel to amplify differences' },
                        { channel: 'Position', strength: 'Strong', example: 'A dot higher on the y-axis reads as a higher value', risk: 'Compressed axes make equal differences look unequal' },
                        { channel: 'Orientation', strength: 'Moderate', example: 'A diagonal line in a grid of horizontals pops out', risk: 'Used to draw the eye to a selected trendline' },
                    ].map((item) => (
                        <div key={item.channel} className="bg-white rounded-xl border border-stone-200 p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[13px] font-bold text-stone-800">{item.channel}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.strength === 'Strongest' ? 'bg-emerald-100 text-emerald-700' : item.strength === 'Strong' ? 'bg-blue-100 text-blue-700' : 'bg-stone-100 text-stone-600'}`}>{item.strength}</span>
                            </div>
                            <p className="text-[12px] text-stone-500 leading-relaxed mb-2">{item.example}</p>
                            <p className="text-[11px] text-red-600 bg-red-50 rounded-lg px-3 py-1.5 leading-relaxed">{item.risk}</p>
                        </div>
                    ))}
                </div>

                <div className="rounded-xl bg-stone-50 border border-stone-200 p-4">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">Research basis</p>
                    <p className="text-[13px] text-stone-600 leading-relaxed">
                        Treisman & Gelade (1980) demonstrated that pre-attentive features are processed in parallel across the entire visual field simultaneously — no serial scanning required. This is why a single red element among thousands of grey ones is found in constant time regardless of the number of distractors. The implication for charts: a single highlighted element will be seen <em>before</em> the viewer consciously decides what to look at.
                    </p>
                </div>

                {/* Demo container */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                    <div className="relative">
                        {/* Lesson number badge */}
                        <span className="absolute top-0 right-0 text-xs font-bold text-stone-300 select-none">
                            1.1
                        </span>

                        {/* SVG grid */}
                        <div className="flex justify-center py-3">
                            <svg
                                ref={svgRef}
                                width={svgWidth}
                                height={svgHeight}
                                aria-label="Pre-attentive processing demo: grid of circles"
                            />
                        </div>

                        {/* Toggle */}
                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span
                                className={`text-[13px] font-medium transition-colors ${!withColor ? 'text-stone-800' : 'text-stone-400'
                                    }`}
                            >
                                Traditional approach
                            </span>

                            <button
                                onClick={() => setWithColor((v) => !v)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${withColor ? 'bg-emerald-600' : 'bg-stone-200'
                                    }`}
                                aria-label="Toggle color emphasis"
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${withColor ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>

                            <span
                                className={`text-[13px] font-medium transition-colors ${withColor ? 'text-stone-800' : 'text-stone-400'
                                    }`}
                            >
                                With color
                            </span>
                        </div>

                        {withColor && (
                            <p className="text-center text-[12px] text-stone-400 mt-2">
                                One red circle among 47 — found in under 200ms without searching
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
