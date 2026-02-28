import { useState, useCallback } from 'react';
import { Zap, RotateCcw, ArrowRight } from 'lucide-react';

// Jargon → Plain English mapping with examples
const JARGON_MAP: Array<{ jargon: RegExp; plain: string; tip: string }> = [
    { jargon: /synerg(?:ize|ies|y)/gi, plain: 'work together', tip: '"Synergize" means "work together" — say that instead.' },
    { jargon: /leverage(?:d|s)?/gi, plain: 'use', tip: '"Leverage" as a verb just means "use". Use "use".' },
    { jargon: /paradigm shift/gi, plain: 'major change', tip: 'A paradigm shift is just a big change in how people think.' },
    { jargon: /boil the ocean/gi, plain: 'try to do too much at once', tip: 'This cliché means attempting something unnecessarily large.' },
    { jargon: /move the needle/gi, plain: 'make a visible impact', tip: 'Say "make a visible impact" — far clearer.' },
    { jargon: /bandwidth/gi, plain: 'capacity / time', tip: 'People don\'t have network bandwidth — they have time or capacity.' },
    { jargon: /circle back/gi, plain: 'follow up', tip: '"Circle back" means "follow up." Save three syllables.' },
    { jargon: /low[\s-]hanging fruit/gi, plain: 'easy wins', tip: 'Just say "easy wins" or "quick opportunities".' },
    { jargon: /action item/gi, plain: 'task', tip: '"Action item" = "task". Task is shorter and clearer.' },
    { jargon: /deliverable/gi, plain: 'output', tip: '"Deliverable" sounds bureaucratic. "Output" or "result" work fine.' },
    { jargon: /drill down/gi, plain: 'look at in more detail', tip: 'Say "look at this in more detail" — your audience will thank you.' },
    { jargon: /take this offline/gi, plain: 'discuss separately', tip: '"Offline" in meetings just means after the meeting.' },
    { jargon: /at the end of the day/gi, plain: 'ultimately', tip: 'This filler phrase adds nothing. Replace with "ultimately" or just cut it.' },
    { jargon: /going forward/gi, plain: 'from now on', tip: '"Going forward" = "from now on" — or just use future tense.' },
    { jargon: /touch base/gi, plain: 'check in', tip: '"Touch base" = "check in". Check in is clearer.' },
    { jargon: /holistic(?:ally)?/gi, plain: 'overall', tip: '"Holistic" usually just means "overall" or "comprehensive".' },
    { jargon: /ideate/gi, plain: 'brainstorm', tip: '"Ideate" is just "brainstorm" with extra syllables.' },
    { jargon: /\bpivot\b/gi, plain: 'change direction', tip: 'Unless you\'re rotating, you probably mean "change direction".' },
    { jargon: /value[\s-]add(?:ed)?/gi, plain: 'useful contribution', tip: '"Value-add" is meta-jargon. "Useful contribution" says the same thing plainly.' },
    { jargon: /core competenc(?:y|ies)/gi, plain: 'main strengths', tip: '"Core competencies" just means "main strengths" or "what we\'re good at".' },
    { jargon: /stakeholder(?:s)?/gi, plain: 'people involved', tip: '"Stakeholders" often means "the people this affects" — say that instead when writing for outsiders.' },
    { jargon: /best[\s-]in[\s-]class/gi, plain: 'top performer', tip: 'An empty superlative unless you can cite actual benchmarks.' },
    { jargon: /robust/gi, plain: 'strong / reliable', tip: '"Robust" is overused to the point of meaninglessness. Try "reliable", "strong", or "tested".' },
    { jargon: /scalable/gi, plain: 'can grow with demand', tip: '"Scalable" is fine in technical context, but in exec decks say "can grow with demand" to be precise.' },
    { jargon: /deep[\s-]dive(?:d)?/gi, plain: 'detailed look', tip: '"Deep dive" just means "detailed analysis" or "thorough review".' },
];

interface Match {
    start: number;
    end: number;
    original: string;
    replacement: string;
    tip: string;
}

function analyze(text: string): Match[] {
    const matches: Match[] = [];
    for (const { jargon, plain, tip } of JARGON_MAP) {
        let m: RegExpExecArray | null;
        const re = new RegExp(jargon.source, jargon.flags);
        while ((m = re.exec(text)) !== null) {
            matches.push({ start: m.index, end: m.index + m[0].length, original: m[0], replacement: plain, tip });
        }
    }
    return matches.sort((a, b) => a.start - b.start);
}

const PLACEHOLDER = `Paste your notes, email, or slide text here...

Example:
"Going forward, we should leverage our core competencies to synergize workflows and circle back on action items to move the needle on our key deliverables at the end of the day."`;

export default function DeJargonatorTool() {
    const [input, setInput] = useState('');
    const [matches, setMatches] = useState<Match[]>([]);
    const [autoApplied, setAutoApplied] = useState(false);

    const run = useCallback(() => {
        setMatches(analyze(input));
        setAutoApplied(false);
    }, [input]);

    const applyAll = useCallback(() => {
        let result = input;
        let offset = 0;
        const sorted = analyze(input);
        for (const m of sorted) {
            const start = m.start + offset;
            const end = m.end + offset;
            result = result.slice(0, start) + m.replacement + result.slice(end);
            offset += m.replacement.length - (m.end - m.start);
        }
        setInput(result);
        setMatches([]);
        setAutoApplied(true);
    }, [input]);

    const renderHighlighted = () => {
        if (!matches.length) return null;
        const parts: React.ReactNode[] = [];
        let cursor = 0;
        for (const m of matches) {
            if (m.start > cursor) parts.push(<span key={`t${cursor}`}>{input.slice(cursor, m.start)}</span>);
            parts.push(
                <mark key={`m${m.start}`} title={m.tip} className="bg-amber-200 text-amber-900 rounded px-0.5 cursor-help underline decoration-dotted">
                    {m.original}
                </mark>
            );
            cursor = m.end;
        }
        if (cursor < input.length) parts.push(<span key="tail">{input.slice(cursor)}</span>);
        return parts;
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
                    <Zap size={18} className="text-white" />
                </div>
                <div>
                    <h3 className="text-base font-bold text-stone-800">De-Jargonator</h3>
                    <p className="text-[12px] text-stone-500">Paste any text and instantly flag corporate jargon with plain-English alternatives.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Your Text</label>
                    <textarea
                        value={input}
                        onChange={e => { setInput(e.target.value); setMatches([]); setAutoApplied(false); }}
                        placeholder={PLACEHOLDER}
                        rows={10}
                        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-[13px] text-stone-700 resize-none focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition-all font-mono leading-relaxed"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={run}
                            disabled={!input.trim()}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-700 text-white text-[13px] font-semibold hover:bg-violet-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            <Zap size={14} /> Analyze
                        </button>
                        {matches.length > 0 && (
                            <button
                                onClick={applyAll}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 text-white text-[13px] font-semibold hover:bg-emerald-800 transition-all"
                            >
                                <ArrowRight size={14} /> Fix All
                            </button>
                        )}
                        {input && (
                            <button
                                onClick={() => { setInput(''); setMatches([]); setAutoApplied(false); }}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-stone-200 text-stone-500 text-[13px] hover:border-stone-300 transition-all"
                            >
                                <RotateCcw size={13} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Output / Highlights */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                        {matches.length > 0 ? `${matches.length} jargon term${matches.length > 1 ? 's' : ''} flagged` : autoApplied ? 'Cleaned Text' : 'Result'}
                    </label>
                    <div className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-[13px] text-stone-700 min-h-[200px] font-mono leading-relaxed whitespace-pre-wrap">
                        {matches.length > 0 ? renderHighlighted() :
                            autoApplied ? <span className="text-emerald-800">{input}</span> :
                                input ? <span className="text-stone-400">Click "Analyze" to detect jargon</span> :
                                    <span className="text-stone-300">Results will appear here…</span>}
                    </div>
                    {matches.length > 0 && (
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                            {matches.map((m, i) => (
                                <div key={i} className="flex items-start gap-3 text-[12px] bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                                    <span className="font-bold text-amber-800 shrink-0">"{m.original}"</span>
                                    <span className="text-stone-400">→</span>
                                    <span className="text-emerald-700 font-medium">"{m.replacement}"</span>
                                    <span className="text-stone-400 ml-auto shrink-0 italic">{m.tip}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
