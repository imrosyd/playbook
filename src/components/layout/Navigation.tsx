import { BarChart3, Brain, Wrench, FlaskConical, Users, Scale, ChevronUp } from 'lucide-react';

export type Section = 'landing' | 'principles' | 'mechanics' | 'lab' | 'simulator' | 'ethics';

interface NavigationProps {
    active: Section;
    onNavigate: (section: Section) => void;
}

const NAV_ITEMS: { key: Section; label: string; icon: typeof Brain; shortLabel: string }[] = [
    { key: 'principles', label: 'Cognitive Principles', icon: Brain, shortLabel: 'Cognition' },
    { key: 'mechanics', label: 'Chart Mechanics', icon: Wrench, shortLabel: 'Mechanics' },
    { key: 'lab', label: 'Manipulation Lab', icon: FlaskConical, shortLabel: 'Lab' },
    { key: 'simulator', label: 'Executive Simulator', icon: Users, shortLabel: 'Simulator' },
    { key: 'ethics', label: 'Ethics Framework', icon: Scale, shortLabel: 'Ethics' },
];

export default function Navigation({ active, onNavigate }: NavigationProps) {
    if (active === 'landing') return null;

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/60">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-14">
                        <button
                            onClick={() => onNavigate('landing')}
                            className="flex items-center gap-2 group"
                        >
                            <BarChart3 size={20} className="text-blue-600" />
                            <span className="text-sm font-bold text-slate-800 hidden sm:inline group-hover:text-blue-600 transition-colors">
                                Perception Lab
                            </span>
                        </button>

                        <div className="flex items-center gap-1">
                            {NAV_ITEMS.map((item) => {
                                const Icon = item.icon;
                                const isActive = active === item.key;
                                return (
                                    <button
                                        key={item.key}
                                        onClick={() => onNavigate(item.key)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isActive
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        <Icon size={14} />
                                        <span className="hidden md:inline">{item.label}</span>
                                        <span className="md:hidden">{item.shortLabel}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </nav>

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
                <ChevronUp size={18} className="text-slate-600" />
            </button>
        </>
    );
}
