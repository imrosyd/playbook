import { useState } from 'react';
import { Zap, Eye, CheckSquare } from 'lucide-react';
import DeJargonatorTool from '../toolkit/DeJargonatorTool';
import ColorVisionChecker from '../toolkit/ColorVisionChecker';
import PreflightChecklist from '../toolkit/PreflightChecklist';

const TOOLS = [
    {
        id: 'dejargonator',
        icon: Zap,
        label: 'De-Jargonator',
        color: 'violet',
        tagline: 'Paste any text → get plain English alternatives instantly.',
        component: <DeJargonatorTool />,
    },
    {
        id: 'colorvision',
        icon: Eye,
        label: 'Color Checker',
        color: 'blue',
        tagline: 'Preview your chart through 4 types of colorblindness.',
        component: <ColorVisionChecker />,
    },
    {
        id: 'checklist',
        icon: CheckSquare,
        label: '21-Step Checklist',
        color: 'emerald',
        tagline: 'Run this before every deck you present or send.',
        component: <PreflightChecklist />,
    },
];

export default function ToolkitSection() {
    const [activeId, setActiveId] = useState('dejargonator');
    const active = TOOLS.find(t => t.id === activeId)!;

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Header */}
            <div className="bg-white border-b border-stone-200 px-6 py-8 max-w-4xl mx-auto">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-violet-900/20">
                        <span className="text-white text-xl font-black">🛠</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-stone-900">Daily Toolkit</h1>
                        <p className="text-[14px] text-stone-500 mt-1 leading-relaxed max-w-xl">
                            Three tools for professional data communicators. Use them before every meeting, deck, or dashboard you ship.
                        </p>
                    </div>
                </div>

                {/* Tool selector */}
                <div className="flex gap-3 mt-6 flex-wrap">
                    {TOOLS.map(({ id, icon: Icon, label, color, tagline }) => (
                        <button
                            key={id}
                            onClick={() => setActiveId(id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${id === activeId
                                    ? `bg-${color}-700 border-${color}-700 text-white shadow-md shadow-${color}-900/20`
                                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                                }`}
                        >
                            <Icon size={17} className={id === activeId ? 'text-white opacity-90' : `text-${color}-600`} />
                            <div>
                                <p className={`text-[13px] font-bold ${id === activeId ? 'text-white' : 'text-stone-800'}`}>{label}</p>
                                <p className={`text-[11px] mt-0.5 leading-tight ${id === activeId ? 'text-white opacity-70' : 'text-stone-400'}`}>{tagline}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tool Panel */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                    {active.component}
                </div>
            </div>
        </div>
    );
}
