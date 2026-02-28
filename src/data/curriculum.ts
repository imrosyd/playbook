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
        title: 'Visual Perception',
        subtitle: 'Cognitive Foundation',
        icon: Brain,
        color: '#2563eb',
        lessons: [
            { id: '1.1', title: 'Visual Attention & Pre-attentive Processing', description: 'How your brain processes color, length, and position before conscious thought', slug: 'preattentive', icon: Eye },
            { id: '1.2', title: 'Cognitive Load & Signal vs Noise', description: 'Why clutter kills comprehension and how to cut through visual noise', slug: 'cognitive-load', icon: Layers },
            { id: '1.3', title: 'Anchoring & Framing', description: 'How the first number you see controls every judgment that follows', slug: 'anchoring', icon: Search },
            { id: '1.4', title: 'Pattern Recognition vs Noise', description: 'Your brain finds patterns in randomness — learn when to trust the trend', slug: 'pattern', icon: Brain },
            { id: '1.5', title: 'Ethical Attention', description: 'Preview how all four biases combine to create systematic perception errors', slug: 'ethical-attention', icon: AlertTriangle },
        ],
    },
    {
        number: '02',
        id: 'mechanics',
        title: 'Chart Mechanics',
        subtitle: 'Visual Encoding System',
        icon: BarChart3,
        color: '#0891b2',
        lessons: [
            { id: '2.1', title: 'Comparison Charts', description: 'Bar, lollipop, dot plot, bullet, dumbbell, and Pareto charts', slug: 'comparison', icon: BarChart3 },
            { id: '2.2', title: 'Time Series Charts', description: 'Line, area, step, streamgraph, bump, sparkline, candlestick, and OHLC', slug: 'time-series', icon: LineChart },
            { id: '2.3', title: 'Distribution Charts', description: 'Histogram, boxplot, violin, strip, rug, density, and ECDF', slug: 'distribution', icon: Activity },
            { id: '2.4', title: 'Relationship Charts', description: 'Scatter, bubble, regression, connected scatter, hexbin, and heatmap', slug: 'relationship', icon: ScatterChart },
            { id: '2.5', title: 'Composition Charts', description: 'Pie, donut, treemap, sunburst, waffle, mosaic, and waterfall', slug: 'composition', icon: PieChart },
            { id: '2.6', title: 'Hierarchy & Network Charts', description: 'Tree, dendrogram, icicle, Sankey, chord diagram, and network graph', slug: 'hierarchy', icon: Network },
            { id: '2.7', title: 'Operational & Risk Charts', description: 'Gantt, control chart, funnel, radar, and gauge', slug: 'operational', icon: Activity },
        ],
    },
    {
        number: '03',
        id: 'lab',
        title: 'Manipulation Lab',
        subtitle: 'Build, Distort, Measure',
        icon: FlaskConical,
        color: '#059669',
        lessons: [
            { id: '3.1', title: 'Axis & Scale Manipulation', description: 'Truncation, 3D perspective, and gridline density effects', slug: 'axis-scale', icon: Sliders },
            { id: '3.2', title: 'Data Transformation', description: 'Smoothing, sampling, and outlier removal distortions', slug: 'data-transform', icon: FlaskConical },
            { id: '3.3', title: 'Visual Emphasis', description: 'Sorting, color highlighting, and opacity manipulation', slug: 'visual-emphasis', icon: Palette },
            { id: '3.4', title: 'Annotation & Trend', description: 'Misleading annotations, trendlines, and label manipulation', slug: 'annotation-trend', icon: MessageSquare },
            { id: '3.5', title: 'The Full Lab', description: 'All 12 manipulation controls with real-time credibility scoring', slug: 'full-lab', icon: FlaskConical },
        ],
    },
    {
        number: '04',
        id: 'simulator',
        title: 'Decision Simulator',
        subtitle: 'Four Minds, One Chart',
        icon: Users,
        color: '#d97706',
        lessons: [
            { id: '4.1', title: 'Revenue Trajectory', description: 'Board decision on $2M expansion based on Q3 weekly revenue', slug: 'revenue', icon: TrendingDown },
            { id: '4.2', title: 'Customer Churn', description: 'Investor presentation on improving customer retention metrics', slug: 'churn', icon: Users },
            { id: '4.3', title: 'Marketing Channel ROI', description: 'Budget reallocation across 6 marketing channels', slug: 'marketing', icon: DollarSign },
            { id: '4.4', title: 'Inventory Turn Rate', description: 'Supply chain optimization decision based on warehouse efficiency', slug: 'inventory', icon: Package },
            { id: '4.5', title: 'Project Delivery', description: 'Engineering resource allocation based on sprint velocity data', slug: 'project', icon: CalendarClock },
            { id: '4.6', title: 'Budget Variance', description: 'CFO review of departmental spending against annual plan', slug: 'budget', icon: Briefcase },
        ],
    },
    {
        number: '05',
        id: 'ethics',
        title: 'Ethical Framework',
        subtitle: 'Clarity to Manipulation',
        icon: Scale,
        color: '#dc2626',
        lessons: [
            { id: '5.1', title: 'Level 1: Clarity', description: 'The standard every data presentation should meet', slug: 'clarity', icon: Lightbulb },
            { id: '5.2', title: 'Level 2: Emphasis', description: 'When editorial guidance becomes manipulation', slug: 'emphasis', icon: Target },
            { id: '5.3', title: 'Level 3: Framing', description: 'The threshold where ethics become ambiguous', slug: 'framing', icon: Shield },
            { id: '5.4', title: 'Level 4: Distortion', description: 'Objectively measurable perceptual corruption', slug: 'distortion', icon: Zap },
            { id: '5.5', title: 'Level 5: Manipulation', description: 'Compound distortions that weaponize trust', slug: 'manipulation', icon: AlertTriangle },
            { id: '5.6', title: 'Self-Assessment & Certification', description: 'Test your understanding and earn your integrity badge', slug: 'assessment', icon: Award },
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
