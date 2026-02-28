// Section 02.8: A Case for Tables
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = [
    { sectionId: 'mechanics', slug: 'comparison', label: '"Who is winning?" (Bar Charts)' },
    { sectionId: 'storytelling', slug: 'so-what', label: 'Crafting the "So What"' },
];

const WHEN_TABLE = [
    { scenario: 'Precise values matter more than trends', example: 'A CFO reviewing exact revenue figures to 2 decimal places for budget approval.', recommendation: 'Table' },
    { scenario: 'You have many categories with similar values', example: 'Comparing 15 product SKUs with revenue differences of <5% — a bar chart becomes unreadable.', recommendation: 'Table' },
    { scenario: 'The audience needs to look up individual values', example: 'A manager referencing team performance data one person at a time.', recommendation: 'Table' },
    { scenario: 'You are showing a trend or pattern over time', example: 'Monthly revenue over 12 months — the visual shape of the trend matters.', recommendation: 'Line Chart' },
    { scenario: 'You want to show relative size at a glance', example: 'Comparing 5 business units to quickly show which is largest.', recommendation: 'Bar Chart' },
    { scenario: 'The audience needs to compare two measures simultaneously', example: 'Revenue vs. Margin by region — two variables, direct comparison needed.', recommendation: 'Scatter or Grouped Bar' },
];

export default function TablesLesson() {
    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <div className="space-y-4">
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        In the push to make everything visual, one of the most powerful communication tools gets forgotten: the humble table. A well-formatted table beats a complex chart in several critical situations — particularly when the audience needs to look up, compare, or record specific numerical values rather than perceive broad patterns or trends. Knowing when to choose a table over a chart is a mark of a genuinely skilled data communicator who prioritizes audience needs over visual aesthetics.
                    </p>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        The fundamental distinction is between <strong>pattern communication</strong> and <strong>value lookup</strong>. Charts excel at communicating patterns, trends, and relative magnitudes — they let the visual system do the work of comparison. Tables excel at communicating exact values, enabling direct lookup, and supporting multiple simultaneous comparisons across many rows and columns. The error most data presenters make is defaulting to charts for emotional visual impact when the audience actually needs to make decisions based on precise numbers. A finance director approving a budget needs exact figures — a bar chart of approximate values actively impedes their work.
                    </p>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
                        The design of a table matters as much as its content. Stephen Few's research on table design shows that <strong>removing unnecessary gridlines</strong> dramatically improves reading speed and comprehension. A table with rules between every row and column forces the eye to track two navigation systems simultaneously (grid lines and spatial position) — which increases cognitive load without adding information. The minimal table — header separator line only, right-aligned numbers, consistent units — is not just aesthetically cleaner but measurably faster to read and less error-prone to interpret.
                    </p>
                </div>

                <TheoryBlock
                    title="When Tables Beat Charts (The Precision Principle)"
                    theory="Cleveland & McGill (1984) — Graphical Perception + Stephen Few, Show Me the Numbers"
                    explanation="Charts excel at communicating patterns, trends, and relative magnitudes. Tables excel at communicating exact values, enabling direct lookup, and supporting multiple simultaneous comparisons. The error most data presenters make is defaulting to charts for emotional visual impact when the audience actually needs to make decisions based on precise numbers."
                />

                <div className="space-y-4">
                    <h3 className="text-base font-bold text-stone-800">Table vs. Chart: Which to Use?</h3>
                    <div className="rounded-xl border border-stone-200 overflow-hidden">
                        <div className="grid grid-cols-[1fr_auto_auto] bg-stone-800 px-4 py-3 text-[11px] font-bold text-stone-300 uppercase tracking-wider gap-4">
                            <span>Situation</span>
                            <span>Example</span>
                            <span>Use</span>
                        </div>
                        {WHEN_TABLE.map(({ scenario, example, recommendation }) => (
                            <div key={scenario} className="grid grid-cols-1 border-t border-stone-100 px-4 py-3 bg-white hover:bg-stone-50 transition-colors">
                                <p className="text-[13px] font-semibold text-stone-800 mb-1">{scenario}</p>
                                <p className="text-[12px] text-stone-500 mb-2">{example}</p>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase w-fit ${recommendation === 'Table' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                    {recommendation}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-base font-bold text-stone-800">The 5 Rules of a Great Business Table</h3>
                    <div className="space-y-3">
                        {[
                            { rule: '1. Remove all gridlines except one', detail: 'Use a single horizontal line only under the header row. All other lines add noise. White space between rows is enough to guide the eye.' },
                            { rule: '2. Right-align all numbers', detail: 'Numbers must always be right-aligned so decimal places stack vertically, enabling instant comparison without reading each value individually.' },
                            { rule: '3. Highlight the critical row or column', detail: "Use a single light background color (e.g., yellow or blue) on the row or column that carries the key insight. Don't highlight multiple rows." },
                            { rule: '4. Use consistent number formats', detail: "Don't mix \"$1,200,000\" with \"1.2M\" in the same table. Choose one format and apply it everywhere. Include units in the header, not in every cell." },
                            { rule: '5. Sort by what matters, not A-Z', detail: 'Default alphabetical sorting serves nobody. Sort by the most important metric (usually revenue, impact, or variance) to surface insights immediately.' },
                        ].map(({ rule, detail }) => (
                            <div key={rule} className="bg-white border border-stone-200 rounded-xl p-4">
                                <p className="text-sm font-bold text-stone-800 mb-1">{rule}</p>
                                <p className="text-[13px] text-stone-600">{detail}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cognitive load comparison */}
                <div className="rounded-xl bg-brand-muted border border-brand/30 p-5">
                    <p className="text-[11px] font-bold text-brand uppercase tracking-wider mb-3">
                        Table design: cognitive load comparison
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            {
                                label: 'High cognitive load',
                                items: ['Grid lines between every row/column', 'Left-aligned numbers', 'Mixed formats ($1.2M vs $1,200,000)', 'Alphabetical sort', 'No header emphasis'],
                                ok: false,
                            },
                            {
                                label: 'Low cognitive load',
                                items: ['Single line under header only', 'Right-aligned numbers', 'Consistent format ($1.2M everywhere)', 'Sorted by primary metric', 'Bold header + 1 highlight row'],
                                ok: true,
                            },
                        ].map((col) => (
                            <div key={col.label} className={`rounded-lg p-3 space-y-1.5 ${col.ok ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
                                <p className={`text-[10px] font-bold uppercase tracking-wider ${col.ok ? 'text-brand' : 'text-red-600'}`}>
                                    {col.label}
                                </p>
                                {col.items.map((item, i) => (
                                    <p key={i} className={`text-[11px] leading-relaxed flex gap-1.5 ${col.ok ? 'text-emerald-800' : 'text-red-800'}`}>
                                        <span>{col.ok ? '✓' : '✗'}</span>{item}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
