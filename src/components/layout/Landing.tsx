import { Link } from 'react-router-dom';
import { BarChart3, Brain, Wrench, FlaskConical, Users, Scale, ArrowRight, Eye, MessageSquare, Palette, Search } from 'lucide-react';

const SECTIONS = [
    {
        id: 'perception', firstLesson: 'preattentive', number: '01', icon: Brain,
        title: 'Cognitive Principles', subtitle: 'How Your Brain Reads Charts',
        description: 'Four cognitive mechanisms that chart designers exploit to shape your perception.',
        color: '#2563eb',
    },
    {
        id: 'mechanics', firstLesson: 'comparison', number: '02', icon: Wrench,
        title: 'Chart Mechanics', subtitle: 'The Visual Encoding System',
        description: 'Every chart maps data to perceptual channels. Understanding these channels reveals where distortion enters.',
        color: '#0891b2',
    },
    {
        id: 'lab', firstLesson: 'axis-scale', number: '03', icon: FlaskConical,
        title: 'Manipulation Lab', subtitle: 'Build, Distort, Measure',
        description: 'Adjust 12 chart parameters in real time. Watch how each manipulation changes credibility scores.',
        color: '#059669',
    },
    {
        id: 'storytelling', firstLesson: 'so-what', number: '04', icon: MessageSquare,
        title: 'Data Storytelling', subtitle: 'From Numbers to Decisions',
        description: 'Translate raw metrics into business decisions your audience can act on.',
        color: '#7c3aed',
    },
    {
        id: 'simulator', firstLesson: 'revenue', number: '05', icon: Users,
        title: 'The Decision Room', subtitle: 'Present to Four Executive Minds',
        description: 'The same chart produces four divergent reactions in the boardroom.',
        color: '#d97706',
    },
    {
        id: 'design', firstLesson: 'three-color-rule', number: '06', icon: Palette,
        title: 'Color & Design', subtitle: 'Look Professional Without Being a Designer',
        description: 'Why using fewer colors makes your charts instantly more credible.',
        color: '#db2777',
    },
    {
        id: 'cases', firstLesson: 'challenger', number: '07', icon: Search,
        title: 'Case Studies', subtitle: 'Real Decisions. Real Consequences.',
        description: 'Before-and-after analysis of real data presentation makeovers.',
        color: '#0f766e',
    },
    {
        id: 'ethics', firstLesson: 'clarity', number: '08', icon: Scale,
        title: 'Ethics Framework', subtitle: 'Clarity to Manipulation',
        description: 'Five ethical levels from transparent to deceptive, with real-world examples and bright-line tests.',
        color: '#dc2626',
    },
];

export default function Landing() {
    return (
        <div className="min-h-screen bg-[#F8F7F4]">
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-emerald-50/20 to-stone-50" />
                <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm mb-8">
                        <div className="w-5 h-5 rounded-md bg-emerald-700 flex items-center justify-center">
                            <BarChart3 size={12} className="text-white" />
                        </div>
                        <span className="text-xs font-semibold text-stone-600">Chartosaur</span>
                        <span className="text-stone-300 text-xs">—</span>
                        <span className="text-xs text-stone-400">Present with Data Playbook</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl font-black text-stone-900 tracking-tight leading-[1.05] mb-5">
                        The Perception-to-
                        <br />
                        <span className="bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                            Decision Playbook
                        </span>
                    </h1>

                    <p className="text-lg text-stone-500 max-w-xl mx-auto leading-relaxed mb-10">
                        Every chart is an argument. Learn how visual design shapes perception,
                        triggers cognitive biases, and drives executive decisions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/playbook"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-stone-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
                        >
                            Start the Playbook <ArrowRight size={15} />
                        </Link>
                        <Link
                            to="/playbook/lab/full-lab"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white text-stone-700 text-sm font-semibold rounded-xl border border-stone-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
                        >
                            <FlaskConical size={15} className="text-emerald-700" />
                            Jump to Lab
                        </Link>
                    </div>

                    <div className="mt-14 grid grid-cols-3 gap-6 max-w-sm mx-auto">
                        {[
                            { icon: Eye, value: '60+', label: 'Chart Types' },
                            { icon: Users, value: '4', label: 'Archetypes' },
                            { icon: Scale, value: '5', label: 'Ethical Levels' },
                        ].map((s) => (
                            <div key={s.label} className="text-center">
                                <s.icon size={18} className="mx-auto text-stone-300 mb-1.5" />
                                <div className="text-2xl font-black text-stone-800">{s.value}</div>
                                <div className="text-[11px] text-stone-400 font-medium">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-6 pb-20">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-stone-800">Eight Sections. One Framework.</h2>
                    <p className="mt-2 text-stone-500 text-sm">Work through each section in order — each builds on the last.</p>
                </div>

                <div className="space-y-3">
                    {SECTIONS.map((section) => {
                        const Icon = section.icon;
                        return (
                            <Link
                                key={section.id}
                                to={`/playbook/${section.id}/${section.firstLesson}`}
                                className="group flex items-center gap-4 p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-md transition-all hover:-translate-y-0.5"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: `${section.color}12` }}
                                >
                                    <Icon size={18} style={{ color: section.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-[11px] font-bold tabular-nums" style={{ color: section.color }}>
                                            {section.number}
                                        </span>
                                        <span className="text-sm font-bold text-stone-800">{section.title}</span>
                                        <span className="text-xs text-stone-400 hidden sm:inline">— {section.subtitle}</span>
                                    </div>
                                    <p className="text-xs text-stone-500 mt-0.5 truncate">{section.description}</p>
                                </div>
                                <ArrowRight
                                    size={16}
                                    className="text-stone-300 group-hover:text-stone-500 group-hover:translate-x-0.5 transition-all shrink-0"
                                />
                            </Link>
                        );
                    })}
                </div>
            </section>

            <footer className="border-t border-stone-200 py-6">
                <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BarChart3 size={14} className="text-stone-300" />
                        <span className="text-xs text-stone-400">Present with Data Playbook</span>
                    </div>
                    <span className="text-xs text-stone-400">Built for data literacy and ethical presentation</span>
                </div>
            </footer>
        </div>
    );
}
