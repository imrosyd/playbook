import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = [
    { sectionId: 'design', slug: 'color-psychology', label: 'Color Psychology' },
    { sectionId: 'storytelling', slug: 'language-authority', label: 'The Language of Authority' },
];

// Type hierarchy chart using SVG
function TypographyHierarchyChart() {
    const levels = [
        { role: 'Primary headline', size: '20–24pt', weight: 'Black / 900', example: 'Revenue Down 23%', fs: 20, fw: 900 },
        { role: 'Sub-headline / insight', size: '14–16pt', weight: 'Bold / 700', example: 'Driven by SMB churn acceleration', fs: 14, fw: 700 },
        { role: 'Data label', size: '11–13pt', weight: 'Semibold / 600', example: '$1.2M shortfall', fs: 12, fw: 600 },
        { role: 'Axis labels & ticks', size: '9–11pt', weight: 'Regular / 400', example: 'Q1  Q2  Q3  Q4', fs: 10, fw: 400 },
        { role: 'Footnote / source', size: '8–9pt', weight: 'Regular / 400', example: 'Source: Finance BI, as of Aug 2025', fs: 9, fw: 400 },
    ];

    return (
        <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                Typographic hierarchy in data presentations
            </p>
            <div className="space-y-4">
                {levels.map((l, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="w-36 shrink-0">
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wide leading-tight">{l.role}</p>
                            <p className="text-[9px] text-stone-300 mt-0.5">{l.size} · {l.weight}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="h-px bg-stone-100 mb-2" />
                            <p style={{ fontSize: l.fs, fontWeight: l.fw, color: '#1c1917', lineHeight: 1.2 }} className="truncate">
                                {l.example}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Spacing / density comparison — horizontal bar chart avoids label overlap
function SpacingChart() {
    const labels = ['Q1 Revenue', 'Q2 Revenue', 'Q3 Revenue', 'Q4 Revenue'];
    const shortLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
    const values = [312, 341, 289, 305];
    const maxV = 380;

    const renderHBars = (useShort: boolean, tight: boolean) => {
        const w = 220, h = 116;
        const labelW = useShort ? 28 : 76;
        const pad = { l: labelW, r: 20, t: 8, b: 8 };
        const rowH = (h - pad.t - pad.b) / values.length;
        const barH = tight ? rowH * 0.45 : rowH * 0.52;
        const toX = (v: number) => pad.l + (v / maxV) * (w - pad.l - pad.r);
        const labs = useShort ? shortLabels : labels;

        return (
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
                {values.map((v, i) => {
                    const y = pad.t + i * rowH + (rowH - barH) / 2;
                    return (
                        <g key={i}>
                            <text
                                x={labelW - 6}
                                y={y + barH / 2 + 3}
                                fill={tight ? '#a8a29e' : '#78716c'}
                                fontSize={tight ? 8 : 9}
                                textAnchor="end"
                            >
                                {labs[i]}
                            </text>
                            <rect
                                x={pad.l}
                                y={y}
                                width={toX(v) - pad.l}
                                height={barH}
                                fill="#1c1917"
                                rx={2}
                                opacity={tight ? 0.6 : 1}
                            />
                            <text
                                x={toX(v) + 4}
                                y={y + barH / 2 + 3}
                                fill={tight ? '#a8a29e' : '#78716c'}
                                fontSize={8}
                                textAnchor="start"
                            >
                                {v}
                            </text>
                        </g>
                    );
                })}
            </svg>
        );
    };

    return (
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-stone-200">
                <div className="p-4">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-3">Cramped — verbose, low contrast</p>
                    {renderHBars(false, true)}
                </div>
                <div className="p-4">
                    <p className="text-[10px] font-bold text-stone-800 uppercase tracking-wider mb-3">Correct — concise, spacious</p>
                    {renderHBars(true, false)}
                </div>
            </div>
        </div>
    );
}

export default function FontLayoutBasicsLesson() {
    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    The choice of typeface and type size is not aesthetic — it is functional. Typography carries hierarchy. Hierarchy carries authority. When a data presenter uses the same font size for the headline and the footnote, their brain communicates "all of this is equally important." The audience unconsciously agrees — and stops paying attention to any of it. Typographic hierarchy is the first thing a sophisticated viewer notices about a chart or slide, before reading a single data value: it signals whether the presenter has made decisions about what matters most.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    The science behind this comes from eye-tracking research in reading comprehension. When viewers encounter a page with clear typographic hierarchy — large bold headline, smaller sub-headline, small body text — they process information in a <strong>structured sequence</strong>: skimming the headline, pausing at the sub-headline, then deciding whether to invest the attention required to read the body. This "skim-to-decide" pattern is the default behavior of time-constrained decision-makers. A chart that forces an executive to read every line of text before understanding the point has already lost the communication. The hierarchy must do the work of navigation automatically, directing the eye with field and weight before reading begins.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Typeface selection plays a secondary but important role. <strong>Sans-serif fonts</strong> (Inter, Roboto, IBM Plex Sans) are optimal for screens and projected slides: their letterforms are designed for screen rendering at all sizes. <strong>Serif fonts</strong> (Georgia, Merriweather) work in dense print documents where the serifs help guide horizontal reading. The critical mistake is using decorative or novelty fonts ("creative" fonts, script typefaces) in data contexts — they add visual stimulation that competes with the data itself, and signal informality in environments that require credibility. One font family with 3–4 weight steps provides all the hierarchy variation any presentation needs.
                </p>


                <TheoryBlock
                    title="Why Hierarchy Aids Comprehension"
                    theory="Visual Hierarchy Theory (Lidwell, Holden & Butler, Universal Principles of Design)"
                    explanation="Visual hierarchy allows viewers to extract the most important information first, then progressively acquire supporting details. In typography, this translates to: size signals importance, weight signals urgency, spacing signals grouping. A well-established hierarchy means zero wasted cognitive effort on navigation."
                />

                <TypographyHierarchyChart />

                <SpacingChart />

                <div className="space-y-3">
                    <h3 className="text-base font-bold text-stone-800">Practical rules</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            { rule: 'Minimum 11pt for any text a decision-maker must read.', note: 'At 10pt and below, reading effort shifts from unconscious to conscious — and attention drops.' },
                            { rule: 'Maximum 2 font families per deck.', note: 'One for headings, one for body. More than two signals lack of editorial discipline.' },
                            { rule: 'Left-align body text. Center only chart titles.', note: 'Centered body text creates ragged rhythms that slow reading.' },
                            { rule: 'Line length: 60–80 characters max for annotations.', note: 'Beyond 80 characters, the eye loses its way returning to the next line.' },
                        ].map((r, i) => (
                            <div key={i} className="bg-stone-50 border border-stone-200 rounded-lg p-3 space-y-1">
                                <p className="text-[12px] font-semibold text-stone-800">{r.rule}</p>
                                <p className="text-[11px] text-stone-400 leading-relaxed">{r.note}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
