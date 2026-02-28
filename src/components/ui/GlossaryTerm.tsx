import { useState, useRef, useEffect } from 'react';

export const GLOSSARY: Record<string, string> = {
    'Pre-attentive Attributes': 'Visual properties (color, size, shape, orientation) your brain processes in under 200ms — before conscious thought. Exploit these to guide attention.',
    'Gestalt Principles': 'A set of psychology rules describing how humans perceive groups of objects. Key ones: proximity (nearby = related), similarity (same look = same category), closure (we complete incomplete shapes).',
    'Cognitive Load': 'The total mental effort required to process information. A chart with too many colors, labels, and series creates "extraneous" load that blocks comprehension.',
    'Confirmation Bias': 'The tendency to search for, interpret, and remember information that confirms what you already believe. Dangerous when building charts you want to look a certain way.',
    'Lie Factor': 'Tufte\'s metric: the ratio of the visual size of an effect to the actual data size. A Lie Factor >1 means the chart exaggerates the data; <1 means it understates it.',
    'Anchoring Effect': 'The cognitive bias where the first number you encounter disproportionately influences every judgment you make afterward — even if that number is arbitrary.',
    'Signal-to-Noise Ratio': 'The proportion of meaningful information ("signal") to irrelevant clutter ("noise") in a chart. Maximizing this ratio is the core of good visual design.',
    'R²': 'R-squared. A number between 0 and 1 showing how well one variable predicts another. R² of 0.9 means 90% of variation in Y is explained by X. In plain English: "How tightly do these two things move together?"',
    'Statistical Significance': 'A test of whether a result is likely to be real versus a product of random chance. Commonly expressed as p < 0.05 (less than 5% chance the result is a fluke).',
    'Confidence Interval': 'A range that likely contains the true answer. "Revenue of $1.2M ± $80K" means you\'re confident the real figure is between $1.12M and $1.28M.',
    'Regression to the Mean': 'Extreme results naturally drift back toward the average over time. A record-breaking month is likely to be followed by a more normal one — not because strategy changed, but because statistics.',
    'Loss Aversion': 'Humans feel the pain of losing something roughly 2x as strongly as the pleasure of gaining an equivalent amount. Framing a decision as avoiding loss is more persuasive than framing it as gaining a reward.',
    'System 1 / System 2': 'Kahneman\'s model of thought. System 1: fast, intuitive, emotional — how most meetings actually work. System 2: slow, analytical, deliberate — what data demands. Your job: bridge the gap.',
    'WCAG': 'Web Content Accessibility Guidelines. The international standard for digital accessibility. WCAG 2.1 requires a contrast ratio of at least 4.5:1 for normal text and informational graphics.',
    'Waterfall Chart': 'A bar chart variant that shows how an initial value is affected by a series of positive and negative changes. Excellent for budget variance, P&L bridges, and explaining how you got from A to B.',
    'Trendline': 'A line added to a chart to show the general direction of data over time. Can be linear (straight), polynomial (curved), or exponential. Watch out: showing only the trendline hides the actual variance.',
    'Power Title': 'A chart or slide title that states the conclusion or insight, not just the topic. "Q3 Revenue" is a label. "Revenue Fell 15% in Q3 — Churn is the Root Cause" is a Power Title.',
    'Narrative Arc': 'The classic storytelling structure (Setup → Conflict → Resolution) applied to a data presentation. The "setup" is context, the "conflict" is the problem in the data, the "resolution" is your recommendation.',
    'Spaced Repetition': 'A learning technique where information is reviewed at increasing intervals. Proven to dramatically improve long-term retention. The foundation of effective certification design.',
};

interface GlossaryTermProps {
    term: string;
    children?: React.ReactNode;
}

export function GlossaryTerm({ term, children }: GlossaryTermProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    const definition = GLOSSARY[term];

    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    if (!definition) return <>{children ?? term}</>;

    return (
        <span ref={ref} className="relative inline">
            <button
                onClick={() => setOpen(v => !v)}
                className="text-blue-700 underline decoration-dotted underline-offset-2 cursor-help font-medium hover:text-blue-900 transition-colors"
            >
                {children ?? term}
            </button>
            {open && (
                <span
                    role="tooltip"
                    className="absolute z-50 bottom-full left-0 mb-2 w-72 bg-stone-900 text-white text-[12px] leading-relaxed rounded-xl px-4 py-3 shadow-2xl"
                >
                    <span className="block font-bold text-blue-300 mb-1">{term}</span>
                    {definition}
                    <span
                        className="absolute left-4 top-full w-0 h-0"
                        style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #1c1917' }}
                    />
                </span>
            )}
        </span>
    );
}

export default GlossaryTerm;
