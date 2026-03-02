import { Brain, Eye, Layers, Search, AlertTriangle, BarChart3, LineChart, PieChart, ScatterChart, Network, Activity, FlaskConical, Sliders, Palette, MessageSquare, Users, Briefcase, TrendingDown, DollarSign, Package, CalendarClock, Scale, Shield, Lightbulb, Target, Zap, Award } from 'lucide-react';

export interface Lesson {
    id: string;
    title: string;
    description: string;
    slug: string;
    icon?: typeof Brain;
}

export interface Section {
    number: string;
    id: string;
    title: string;
    subtitle: string;
    icon: typeof Brain;
    color: string;
    lessons: Lesson[];
}

export const SECTIONS: Section[] = [
    {
        number: '01',
        id: 'perception',
        title: 'The First 3 Seconds',
        subtitle: 'How The Brain Reads Charts',
        icon: Brain,
        color: '#2563eb',
        lessons: [
            { id: '1.1', title: 'The Blink Test', description: 'How your audience processes color, size, and shape before you say a single word — and what that means for your charts', slug: 'preattentive', icon: Eye },
            { id: '1.2', title: 'Decluttering 101', description: 'Why simple, clean charts win arguments over complex ones — and the science of signal vs. noise', slug: 'cognitive-load', icon: Layers },
            { id: '1.3', title: 'The Anchor Effect', description: 'How the very first number you show in a meeting controls every judgment your audience makes after that', slug: 'anchoring', icon: Search },
            { id: '1.4', title: 'Spotting the Signal', description: 'How to tell if your data shows a real trend or just random noise — before you stake your credibility on it', slug: 'pattern', icon: Brain },
            { id: '1.5', title: 'The Ethics of Attention', description: 'How easy it is to accidentally mislead an audience — and how all four perception biases combine into systematic errors', slug: 'ethical-attention', icon: AlertTriangle },
        ],
    },
    {
        number: '02',
        id: 'mechanics',
        title: 'Choosing the Right Chart',
        subtitle: 'Match the Question to the Visual',
        icon: BarChart3,
        color: '#0891b2',
        lessons: [
            { id: '2.1', title: '"Who is winning?"', description: 'The best charts for comparing teams, products, and KPIs — Bar, Column, Lollipop, Dumbbell, and Pareto explained clearly', slug: 'comparison', icon: BarChart3 },
            { id: '2.2', title: '"Are we growing?"', description: 'The best charts for showing time and historical trends — Line, Area, Sparkline, and Step explained clearly', slug: 'time-series', icon: LineChart },
            { id: '2.3', title: '"How is it spread?"', description: 'When you need to show the range and spread of your data — Histogram, Boxplot, and Violin charts explained clearly', slug: 'distribution', icon: Activity },
            { id: '2.4', title: '"What\'s the relationship?"', description: 'Charts that prove (or disprove) cause and effect — Scatter, Bubble, and Heatmap explained clearly', slug: 'relationship', icon: ScatterChart },
            { id: '2.5', title: '"Where is the money going?"', description: 'Charts for breaking down budgets and market share — Pie, Donut, Treemap, and Waterfall explained clearly', slug: 'composition', icon: PieChart },
            { id: '2.6', title: '"How does it flow?"', description: 'Charts for showing flows, hierarchies, and connections — Sankey, Network, and Tree diagrams explained clearly', slug: 'hierarchy', icon: Network },
            { id: '2.7', title: '"Are we on schedule?"', description: 'Operational and risk charts for tracking projects and targets — Gantt, Bullet, Funnel, and Gauge explained clearly', slug: 'operational', icon: CalendarClock },
            { id: '2.8', title: 'A Case for Tables', description: 'When a simple, well-formatted table is 10x better than any chart — and the rules for making tables that executives actually read', slug: 'tables', icon: Layers },
            { id: '2.9', title: '"How did ranks change?"', description: 'Charts for showing transitions and rank changes over time — Slopegraph and Bump Chart explained clearly', slug: 'slopegraph', icon: TrendingDown },
            { id: '2.10', title: 'Signal Boosters', description: 'Techniques to enhance line charts: turning points, confidence bands, missing data, and difference shading', slug: 'signal-techniques', icon: LineChart },
            { id: '2.11', title: 'Deep Distribution', description: 'Beyond averages: Ridgelines, Violin plots, Beeswarms, and advanced histograms', slug: 'distribution-techniques', icon: Layers },
            { id: '2.12', title: 'Specialty Frameworks', description: 'Quadrant scatters, Waffle charts, Likert progressions, and specialized plots', slug: 'special-charts', icon: PieChart },
        ],
    },
    {
        number: '03',
        id: 'lab',
        title: 'The Makeover Lab',
        subtitle: 'See It. Break It. Fix It.',
        icon: FlaskConical,
        color: '#059669',
        lessons: [
            { id: '3.1', title: 'Zooming In (Axis Tricks)', description: 'How a truncated Y-axis makes a 5% difference look like a 300% gap — and how to spot it in other people\'s charts', slug: 'axis-scale', icon: Sliders },
            { id: '3.2', title: 'Hiding the Bad News (Data Tricks)', description: 'How smoothing, sampling, and "outlier removal" can quietly erase the most important signals in your data', slug: 'data-transform', icon: FlaskConical },
            { id: '3.3', title: 'The Spotlight Effect', description: 'Using color and opacity to force your audience\'s attention to exactly what you want — and the ethical line between editorial choice and manipulation', slug: 'visual-emphasis', icon: Palette },
            { id: '3.4', title: 'The Magic Words', description: 'How a single annotation or trendline rewrites the entire meaning of a chart — even when the data doesn\'t change at all', slug: 'annotation-trend', icon: MessageSquare },
            { id: '3.5', title: 'Signal vs Noise', description: 'Distinguishing true trends from random noise — and how aggressive smoothing can invent trends that don\'t exist.', slug: 'signal-noise', icon: Activity },
            { id: '3.6', title: 'Design Patterns', description: 'Learn how specific structural chart choices completely change the story to the viewer', slug: 'design-patterns', icon: Layers },
            { id: '3.7', title: 'The Full Lab', description: 'All controls active simultaneously — combine axis tricks, smoothing, color emphasis, and annotations to see how credibility collapses', slug: 'full-lab', icon: FlaskConical },
        ],
    },
    {
        number: '04',
        id: 'storytelling',
        title: 'Data Storytelling',
        subtitle: 'From Numbers to Decisions',
        icon: MessageSquare,
        color: '#7c3aed',
        lessons: [
            { id: '4.1', title: 'Crafting the "So What"', description: 'The single most important skill in any data presentation: translating raw metrics into a business decision your audience can act on', slug: 'so-what', icon: Target },
            { id: '4.2', title: 'The 3-Part Slide Structure', description: 'A foolproof recipe that works in every meeting: Headline → Chart → Takeaway. Why most slides fail before Slide 2', slug: 'slide-structure', icon: Layers },
            { id: '4.3', title: 'Power Titles', description: 'Transform a boring descriptive title ("Q3 Revenue") into an active, conclusion-driven headline ("Revenue Dropped 15% — Churn is the Root Cause")', slug: 'power-titles', icon: Zap },
            { id: '4.4', title: 'The Language of Authority', description: 'The exact words and phrases that signal data confidence — and the filler words that silently undermine your credibility in the room', slug: 'language-authority', icon: MessageSquare },
            { id: '4.5', title: 'Narrative & Scale', description: 'How axis limits, anchors, annotations, and dimensional rendering actively shape the perception of truth', slug: 'narrative-scale', icon: Sliders },
            { id: '4.6', title: 'Words & Psychology', description: 'Visualizing categorical data: Wordclouds vs Bar Charts, and the problem with Venn diagrams', slug: 'word-display', icon: MessageSquare },
            { id: '4.7', title: 'Bridging the Jargon Gap', description: 'How to explain a regression model, a confidence interval, or a p-value to a CEO in under 30 seconds — without dumbing it down', slug: 'jargon-gap', icon: Brain },
        ],
    },
    {
        number: '05',
        id: 'simulator',
        title: 'The Decision Room',
        subtitle: 'Present to Four Executive Minds',
        icon: Users,
        color: '#d97706',
        lessons: [
            { id: '5.1', title: 'The Board Meeting', description: 'Present a $2M expansion case to a Skeptical CFO — every chart choice changes the outcome of the vote', slug: 'revenue', icon: TrendingDown },
            { id: '5.2', title: 'The Investor Pitch', description: 'Show churn data to an Optimistic CEO who wants to present to Series B investors — honest vs. manipulated side by side', slug: 'churn', icon: Users },
            { id: '5.3', title: 'The Budget War Room', description: 'Justify marketing spend reallocation to a Firefighter VP who wants quick answers, not 30-slide decks', slug: 'marketing', icon: DollarSign },
            { id: '5.4', title: 'The Supply Chain Review', description: 'Navigate an inventory crisis presentation where the data is ambiguous and the Strategist executive asks hard questions', slug: 'inventory', icon: Package },
            { id: '5.5', title: 'The Sprint Retrospective', description: 'Present velocity data to an engineering leadership team — where every archetype is in the room at the same time', slug: 'project', icon: CalendarClock },
            { id: '5.6', title: 'The CFO Q&A', description: 'Defend budget variance data under hostile questioning — the ultimate stress test for your data presentation skills', slug: 'budget', icon: Briefcase },
        ],
    },
    {
        number: '06',
        id: 'design',
        title: 'Color & Design',
        subtitle: 'Look Professional Without Being a Designer',
        icon: Palette,
        color: '#db2777',
        lessons: [
            { id: '6.1', title: 'The 3-Color Rule', description: 'Why using fewer colors makes your charts instantly more credible — the science of color overload and how to build a professional palette in 5 minutes', slug: 'three-color-rule', icon: Palette },
            { id: '6.2', title: 'Color Psychology in the Boardroom', description: 'What red, green, blue, and orange actually signal to an executive\'s brain — and how to use color intent, not just decoration', slug: 'color-psychology', icon: Eye },
            { id: '6.3', title: 'Designing for Colorblindness', description: '1 in 12 men cannot distinguish red from green — test and fix your charts so your insights reach 100% of your audience', slug: 'colorblind', icon: Shield },
            { id: '6.4', title: 'Font & Layout Basics', description: 'The three typography rules that instantly make any chart look more polished — font weight, hierarchy, and the one spacing mistake everyone makes', slug: 'typography', icon: Lightbulb },
        ],
    },
    {
        number: '07',
        id: 'cases',
        title: 'Case Studies',
        subtitle: 'Real Decisions. Real Consequences.',
        icon: Search,
        color: '#0f766e',
        lessons: [
            { id: '7.1', title: 'The Challenger Disaster (1986)', description: 'How a scatter plot with the wrong axis ordering failed to communicate a critical safety risk — and the 7 lives that depended on the decision', slug: 'challenger', icon: AlertTriangle },
            { id: '7.2', title: 'COVID Dashboard Wars (2020)', description: 'What the US, UK, and South Korea\'s pandemic dashboards revealed about how visualization choices under pressure shape public trust', slug: 'covid-dashboards', icon: Activity },
            { id: '7.3', title: 'The Boardroom Turnaround', description: 'Before-and-after analysis of a real data presentation makeover that flipped a board vote and unlocked $5M in funding', slug: 'boardroom-turnaround', icon: Briefcase },
            { id: '7.4', title: 'The Bad Chart Hall of Fame', description: 'A breakdown of the most notorious misleading charts from major media and corporations — and exactly what makes each one deceptive', slug: 'bad-chart-hall', icon: Zap },
            { id: '7.5', title: 'Context & Accessibility', description: 'Advanced considerations for charting in the real world: handling noisy data gracefully and ensuring accessibility compliance', slug: 'data-context', icon: Target },
        ],
    },
    {
        number: '08',
        id: 'ethics',
        title: 'Ethical Framework & Certification',
        subtitle: 'From Clarity to Manipulation',
        icon: Scale,
        color: '#dc2626',
        lessons: [
            { id: '8.1', title: 'Level 1: Clarity', description: 'The non-negotiable standard that every data presentation must meet — and how to self-audit your own charts for clarity', slug: 'clarity', icon: Lightbulb },
            { id: '8.2', title: 'Level 2: Emphasis', description: 'When honest editorial guidance crosses into quiet manipulation — spotting the difference in your own charts and others\'', slug: 'emphasis', icon: Target },
            { id: '8.3', title: 'Level 3: Framing', description: 'The grey zone where context becomes spin — how framing distorts perception without changing a single data point', slug: 'framing', icon: Shield },
            { id: '8.4', title: 'Level 4: Distortion', description: 'Objectively measurable perceptual corruption — axis truncation, 3D effects, and dual-axis abuse that produce a calculable Lie Factor', slug: 'distortion', icon: Zap },
            { id: '8.5', title: 'Level 5: Manipulation', description: 'Compound distortions that systematically weaponize the viewer\'s trust — and why this level has real professional and legal consequences', slug: 'manipulation', icon: AlertTriangle },
            { id: '8.6', title: 'Certification Assessment', description: 'A 20-question integrity assessment across all 8 sections — earn your Data Visualization Integrity Certificate to share on LinkedIn', slug: 'assessment', icon: Award },
        ],
    },
];

export function getSectionByNumber(num: string): Section | undefined {
    return SECTIONS.find((s) => s.number === num);
}

export function getLessonBySlug(sectionId: string, slug: string): { section: Section; lesson: Lesson } | undefined {
    const section = SECTIONS.find((s) => s.id === sectionId);
    if (!section) return undefined;
    const lesson = section.lessons.find((l) => l.slug === slug);
    if (!lesson) return undefined;
    return { section, lesson };
}

export function getNextLesson(sectionId: string, lessonSlug: string): { sectionId: string; slug: string } | null {
    const sectionIdx = SECTIONS.findIndex((s) => s.id === sectionId);
    if (sectionIdx === -1) return null;
    const section = SECTIONS[sectionIdx];
    const lessonIdx = section.lessons.findIndex((l) => l.slug === lessonSlug);
    if (lessonIdx < section.lessons.length - 1) {
        return { sectionId: section.id, slug: section.lessons[lessonIdx + 1].slug };
    }
    if (sectionIdx < SECTIONS.length - 1) {
        const next = SECTIONS[sectionIdx + 1];
        return { sectionId: next.id, slug: next.lessons[0].slug };
    }
    return null;
}

export function getPrevLesson(sectionId: string, lessonSlug: string): { sectionId: string; slug: string } | null {
    const sectionIdx = SECTIONS.findIndex((s) => s.id === sectionId);
    if (sectionIdx === -1) return null;
    const section = SECTIONS[sectionIdx];
    const lessonIdx = section.lessons.findIndex((l) => l.slug === lessonSlug);
    if (lessonIdx > 0) {
        return { sectionId: section.id, slug: section.lessons[lessonIdx - 1].slug };
    }
    if (sectionIdx > 0) {
        const prev = SECTIONS[sectionIdx - 1];
        return { sectionId: prev.id, slug: prev.lessons[prev.lessons.length - 1].slug };
    }
    return null;
}

export function getAllLessonSlugs(): string[] {
    return SECTIONS.flatMap((s) => s.lessons.map((l) => `${s.id}/${l.slug}`));
}

export function isSectionComplete(sectionId: string, completed: Set<string>): boolean {
    const section = SECTIONS.find((s) => s.id === sectionId);
    if (!section) return false;
    return section.lessons.every((l) => completed.has(`${sectionId}/${l.slug}`));
}

export function isSectionUnlocked(_sectionId: string, _completed: Set<string>): boolean {
    return true;
}
