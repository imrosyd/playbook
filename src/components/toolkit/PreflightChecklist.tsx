import { useState } from 'react';
import { CheckSquare, Square, RotateCcw, Award } from 'lucide-react';

const CHECKLIST_ITEMS = [
    {
        category: '📊 Data Integrity',
        items: [
            { id: 'c1', text: 'My data source is cited (who collected it, when, and how)' },
            { id: 'c2', text: 'All numbers have been double-checked against the original source' },
            { id: 'c3', text: 'Sample size is disclosed (if relevant)' },
            { id: 'c4', text: 'Date range is clearly visible on or near the chart' },
        ],
    },
    {
        category: '📐 Axis & Scale',
        items: [
            { id: 'c5', text: 'All bar charts start at zero (no truncated Y-axis)' },
            { id: 'c6', text: 'Both axes are labeled with units (%, $, days, etc.)' },
            { id: 'c7', text: 'Any axis breaks or unusual scales are clearly marked and explained' },
            { id: 'c8', text: 'Dual-axis charts (if used) have a clear reason and both scales are visible' },
        ],
    },
    {
        category: '🎨 Visual Design',
        items: [
            { id: 'c9', text: 'No more than 3 distinct colors are used' },
            { id: 'c10', text: 'I have checked my color palette works for red-green colorblindness' },
            { id: 'c11', text: 'Chart is readable in black & white (for printing)' },
            { id: 'c12', text: 'Font size is at least 11pt for data labels and 16pt for titles' },
            { id: 'c13', text: 'No 3D effects, shadows, or decorative elements that distort perception' },
        ],
    },
    {
        category: '✍️ Text & Titles',
        items: [
            { id: 'c14', text: 'Title is a Power Title (states the conclusion, not just the topic)' },
            { id: 'c15', text: 'Every annotation adds new information — not just repeat what the chart shows' },
            { id: 'c16', text: 'No undefined acronyms or technical terms your audience won\'t know' },
            { id: 'c17', text: 'Legend is not needed (data is labeled directly) OR legend is clearly positioned' },
        ],
    },
    {
        category: '💼 Business Logic',
        items: [
            { id: 'c18', text: 'The "So What" is explicit — someone can read this chart and know what action to take' },
            { id: 'c19', text: 'Comparisons use the right baseline (previous period, industry average, or target)' },
            { id: 'c20', text: 'Outliers are either explained or flagged as unusual' },
            { id: 'c21', text: 'I have not cherry-picked a timeframe that makes the data look artificially good or bad' },
        ],
    },
];

const ALL_IDS = CHECKLIST_ITEMS.flatMap(c => c.items.map(i => i.id));

export default function PreflightChecklist() {
    const [checked, setChecked] = useState<Set<string>>(new Set());

    const toggle = (id: string) => {
        setChecked(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const reset = () => setChecked(new Set());
    const checkAll = () => setChecked(new Set(ALL_IDS));

    const total = ALL_IDS.length;
    const done = checked.size;
    const pct = Math.round((done / total) * 100);
    const isComplete = done === total;

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
                        <CheckSquare size={18} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-stone-800">21-Step Pre-Flight Checklist</h3>
                        <p className="text-[12px] text-stone-500">Run through this before every deck you send or present.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-36 h-2.5 bg-stone-200 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-300 ${isComplete ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                        <span className={`text-[12px] font-bold tabular-nums ${isComplete ? 'text-emerald-600' : 'text-stone-600'}`}>
                            {done}/{total}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={checkAll} className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors">Check All</button>
                        <span className="text-stone-300">|</span>
                        <button onClick={reset} className="flex items-center gap-1 text-[11px] font-semibold text-stone-400 hover:text-stone-600 transition-colors">
                            <RotateCcw size={10} /> Reset
                        </button>
                    </div>
                </div>
            </div>

            {isComplete && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl px-5 py-4 flex items-center gap-4">
                    <Award size={28} className="text-emerald-600 shrink-0" />
                    <div>
                        <p className="text-sm font-bold text-emerald-800">✅ Chart cleared for takeoff.</p>
                        <p className="text-[13px] text-emerald-700">All 21 checks passed. This chart meets the Clarity standard.</p>
                    </div>
                </div>
            )}

            <div className="space-y-5">
                {CHECKLIST_ITEMS.map(({ category, items }) => {
                    const catDone = items.filter(i => checked.has(i.id)).length;
                    return (
                        <div key={category} className="bg-white border border-stone-200 rounded-xl overflow-hidden">
                            <div className="flex items-center justify-between px-5 py-3 bg-stone-50 border-b border-stone-200">
                                <p className="text-[12px] font-bold text-stone-700">{category}</p>
                                <span className="text-[11px] text-stone-400 tabular-nums">{catDone}/{items.length}</span>
                            </div>
                            <div className="divide-y divide-stone-50">
                                {items.map(({ id, text }) => {
                                    const done = checked.has(id);
                                    return (
                                        <button
                                            key={id}
                                            onClick={() => toggle(id)}
                                            className={`w-full flex items-start gap-3 px-5 py-3 text-left transition-colors ${done ? 'bg-emerald-50/60' : 'hover:bg-stone-50'}`}
                                        >
                                            {done
                                                ? <CheckSquare size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                                                : <Square size={16} className="text-stone-300 shrink-0 mt-0.5" />
                                            }
                                            <span className={`text-[13px] leading-relaxed transition-colors ${done ? 'text-stone-400 line-through' : 'text-stone-700'}`}>
                                                {text}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
