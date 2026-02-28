import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Brain, Eye, Layers, Search } from 'lucide-react';

interface PrincipleCard {
    key: string;
    title: string;
    icon: typeof Brain;
    description: string;
    citation: string;
    demo: {
        type: 'preattentive' | 'cognitive_load' | 'anchoring' | 'pattern';
    };
}

const PRINCIPLES: PrincipleCard[] = [
    {
        key: 'preattentive',
        title: 'Pre-attentive Processing',
        icon: Eye,
        description: 'Your visual system processes length, color, and position in under 250ms — before conscious attention. Charts exploit these channels to communicate magnitude. When a chart distorts length through 3D perspective or truncated axes, it corrupts this automatic processing. You form an incorrect judgment before you can consciously correct it.',
        citation: 'Cleveland & McGill (1984). Graphical Perception. JASA.',
        demo: { type: 'preattentive' },
    },
    {
        key: 'cognitive_load',
        title: 'Cognitive Load Theory',
        icon: Layers,
        description: 'Working memory holds 4±1 chunks simultaneously. Every visual element in a chart consumes cognitive capacity. Excessive gridlines, labels, or decorative elements exhaust working memory, forcing you to rely on heuristic shortcuts rather than careful analysis.',
        citation: 'Sweller, J. (1988). Cognitive Load During Problem Solving. Cognitive Science.',
        demo: { type: 'cognitive_load' },
    },
    {
        key: 'anchoring',
        title: 'Anchoring & Framing',
        icon: Search,
        description: 'The first piece of information you encounter disproportionately influences subsequent judgments. In charts, the axis baseline serves as a perceptual anchor — a truncated axis reframes small changes as visually dramatic. Annotations create interpretive anchors that direct you toward a specific conclusion.',
        citation: 'Tversky & Kahneman (1974). Judgment under Uncertainty. Science.',
        demo: { type: 'anchoring' },
    },
    {
        key: 'pattern_recognition',
        title: 'Pattern Recognition',
        icon: Brain,
        description: 'You are hardwired to detect patterns even in random data. Smoothing, trendlines, and small samples amplify this tendency by reducing noise that would otherwise signal randomness. The clustering illusion is strongest at small sample sizes, where spurious patterns look real.',
        citation: 'Gilovich, Vallone & Tversky (1985). The Hot Hand in Basketball. Cognitive Psychology.',
        demo: { type: 'pattern' },
    },
];

function PreattentiveDemo() {
    const svgRef = useRef<SVGSVGElement>(null);
    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const circles = Array.from({ length: 36 }, (_, i) => ({
            x: (i % 6) * 42 + 28,
            y: Math.floor(i / 6) * 42 + 28,
            isTarget: i === 14,
        }));

        svg
            .selectAll('circle')
            .data(circles)
            .enter()
            .append('circle')
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y)
            .attr('r', 16)
            .attr('fill', (d) => (highlight && d.isTarget ? '#dc2626' : '#cbd5e1'))
            .attr('opacity', 0.9)
            .transition()
            .duration(300)
            .attr('fill', (d) => (highlight && d.isTarget ? '#dc2626' : '#cbd5e1'));
    }, [highlight]);

    return (
        <div className="text-center">
            <svg ref={svgRef} width={280} height={280} className="mx-auto bg-stone-50 rounded-xl" />
            <button
                onClick={() => setHighlight(!highlight)}
                className="mt-3 px-4 py-1.5 text-xs font-medium bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
            >
                {highlight ? 'Remove Color Signal' : 'Add Color Signal'}
            </button>
            <p className="text-xs text-stone-500 mt-2">
                {highlight
                    ? 'The red circle pops out instantly — pre-attentive processing at work'
                    : 'Try to find a specific circle. Without a visual differentiator, you must scan serially.'}
            </p>
        </div>
    );
}

function AnchoringDemo() {
    const svgRef = useRef<SVGSVGElement>(null);
    const [truncated, setTruncated] = useState(false);

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const data = [
            { label: 'Q1', value: 98 },
            { label: 'Q2', value: 102 },
            { label: 'Q3', value: 97 },
            { label: 'Q4', value: 103 },
        ];

        const w = 280, h = 200;
        const m = { top: 20, right: 16, bottom: 32, left: 40 };
        const iw = w - m.left - m.right;
        const ih = h - m.top - m.bottom;

        const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

        const yMin = truncated ? 94 : 0;
        const yMax = 110;

        const x = d3.scaleBand().domain(data.map((d) => d.label)).range([0, iw]).padding(0.35);
        const y = d3.scaleLinear().domain([yMin, yMax]).range([ih, 0]);

        g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d) => x(d.label)!)
            .attr('width', x.bandwidth())
            .attr('y', (d) => y(d.value))
            .attr('height', (d) => ih - y(d.value))
            .attr('fill', '#059669')
            .attr('rx', 3)
            .attr('opacity', 0.85);

        g.append('g').attr('transform', `translate(0,${ih})`).call(d3.axisBottom(x)).selectAll('text').attr('font-size', '10px');
        g.append('g').call(d3.axisLeft(y).ticks(5)).selectAll('text').attr('font-size', '10px');
    }, [truncated]);

    return (
        <div className="text-center">
            <svg ref={svgRef} width={280} height={200} className="mx-auto bg-stone-50 rounded-xl" />
            <button
                onClick={() => setTruncated(!truncated)}
                className="mt-3 px-4 py-1.5 text-xs font-medium bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
            >
                {truncated ? 'Show Full Axis (from 0)' : 'Truncate Axis (from 94)'}
            </button>
            <p className="text-xs text-stone-500 mt-2">
                {truncated
                    ? 'Same data, but a 5% difference now looks like a 60% visual swing'
                    : 'With a zero baseline, the quarterly differences are barely visible — because they are small.'}
            </p>
        </div>
    );
}

function CognitiveLoadDemo() {
    const svgRef = useRef<SVGSVGElement>(null);
    const [noisy, setNoisy] = useState(false);

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const data = [40, 65, 55, 80, 70, 90];
        const w = 280, h = 200;
        const m = { top: 16, right: 16, bottom: 28, left: 36 };
        const iw = w - m.left - m.right;
        const ih = h - m.top - m.bottom;
        const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

        const x = d3.scaleBand().domain(data.map((_, i) => `Cat ${i + 1}`)).range([0, iw]).padding(0.3);
        const y = d3.scaleLinear().domain([0, 100]).range([ih, 0]);

        if (noisy) {
            for (let i = 0; i <= 20; i++) {
                g.append('line')
                    .attr('x1', 0).attr('x2', iw)
                    .attr('y1', y(i * 5)).attr('y2', y(i * 5))
                    .attr('stroke', '#cbd5e1').attr('stroke-width', 0.5);
            }
        } else {
            [0, 25, 50, 75, 100].forEach((v) => {
                g.append('line')
                    .attr('x1', 0).attr('x2', iw)
                    .attr('y1', y(v)).attr('y2', y(v))
                    .attr('stroke', '#e2e8f0').attr('stroke-width', 0.5);
            });
        }

        g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (_, i) => x(`Cat ${i + 1}`)!)
            .attr('width', x.bandwidth())
            .attr('y', (d) => y(d))
            .attr('height', (d) => ih - y(d))
            .attr('fill', '#059669')
            .attr('rx', 3)
            .attr('opacity', 0.85);

        if (noisy) {
            data.forEach((d, i) => {
                g.append('text')
                    .attr('x', x(`Cat ${i + 1}`)! + x.bandwidth() / 2)
                    .attr('y', y(d) - 4)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '9px')
                    .attr('fill', '#57534e')
                    .text(`${d}% (+${(d * 0.12).toFixed(1)}% YoY, σ=${(d * 0.05).toFixed(1)})`);
            });
        }

        g.append('g').attr('transform', `translate(0,${ih})`).call(d3.axisBottom(x)).selectAll('text').attr('font-size', '10px');
        g.append('g').call(d3.axisLeft(y).ticks(noisy ? 20 : 5)).selectAll('text').attr('font-size', '10px');
    }, [noisy]);

    return (
        <div className="text-center">
            <svg ref={svgRef} width={280} height={200} className="mx-auto bg-stone-50 rounded-xl" />
            <button
                onClick={() => setNoisy(!noisy)}
                className="mt-3 px-4 py-1.5 text-xs font-medium bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
            >
                {noisy ? 'Reduce Visual Noise' : 'Add Visual Noise'}
            </button>
            <p className="text-xs text-stone-500 mt-2">
                {noisy
                    ? 'Excessive gridlines, labels, and annotations overload working memory'
                    : 'Clean chart with minimal gridlines — cognitive resources free for analysis.'}
            </p>
        </div>
    );
}

function PatternDemo() {
    const svgRef = useRef<SVGSVGElement>(null);
    const [smoothed, setSmoothed] = useState(false);

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const rawData = [52, 48, 55, 43, 58, 47, 52, 61, 44, 56, 49, 53];
        const smoothWindow = 4;
        const displayData = smoothed
            ? rawData.map((_, i) => {
                const start = Math.max(0, i - Math.floor(smoothWindow / 2));
                const end = Math.min(rawData.length, i + Math.ceil(smoothWindow / 2));
                const slice = rawData.slice(start, end);
                return slice.reduce((s, v) => s + v, 0) / slice.length;
            })
            : rawData;

        const w = 280, h = 200;
        const m = { top: 16, right: 16, bottom: 28, left: 36 };
        const iw = w - m.left - m.right;
        const ih = h - m.top - m.bottom;
        const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

        const x = d3.scaleLinear().domain([0, displayData.length - 1]).range([0, iw]);
        const y = d3.scaleLinear().domain([35, 65]).range([ih, 0]);

        const line = d3.line<number>()
            .x((_, i) => x(i))
            .y((d) => y(d))
            .curve(d3.curveMonotoneX);

        g.append('path')
            .datum(displayData)
            .attr('fill', 'none')
            .attr('stroke', '#059669')
            .attr('stroke-width', 2)
            .attr('d', line);

        g.selectAll('circle')
            .data(displayData)
            .enter()
            .append('circle')
            .attr('cx', (_, i) => x(i))
            .attr('cy', (d) => y(d))
            .attr('r', 3)
            .attr('fill', '#059669');

        if (smoothed) {
            const pts = displayData.map((_, i) => ({ x: i, y: displayData[i] }));
            let sx = 0, sy = 0, sxy = 0, sx2 = 0;
            const n = pts.length;
            for (const p of pts) { sx += p.x; sy += p.y; sxy += p.x * p.y; sx2 += p.x * p.x; }
            const slope = (n * sxy - sx * sy) / (n * sx2 - sx * sx);
            const intercept = (sy - slope * sx) / n;

            g.append('line')
                .attr('x1', x(0)).attr('x2', x(n - 1))
                .attr('y1', y(intercept)).attr('y2', y(slope * (n - 1) + intercept))
                .attr('stroke', '#ef4444').attr('stroke-width', 2).attr('stroke-dasharray', '6,4');
        }

        g.append('g').attr('transform', `translate(0,${ih})`).call(d3.axisBottom(x).ticks(6)).selectAll('text').attr('font-size', '10px');
        g.append('g').call(d3.axisLeft(y).ticks(5)).selectAll('text').attr('font-size', '10px');
    }, [smoothed]);

    return (
        <div className="text-center">
            <svg ref={svgRef} width={280} height={200} className="mx-auto bg-stone-50 rounded-xl" />
            <button
                onClick={() => setSmoothed(!smoothed)}
                className="mt-3 px-4 py-1.5 text-xs font-medium bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
            >
                {smoothed ? 'Show Raw Data' : 'Apply Smoothing + Trendline'}
            </button>
            <p className="text-xs text-stone-500 mt-2">
                {smoothed
                    ? 'Smoothing + trendline creates an illusion of upward trend in random data'
                    : 'This is random noise around 50 with no actual trend.'}
            </p>
        </div>
    );
}

const DEMO_MAP: Record<string, () => JSX.Element> = {
    preattentive: PreattentiveDemo,
    cognitive_load: CognitiveLoadDemo,
    anchoring: AnchoringDemo,
    pattern: PatternDemo,
};

export default function CognitivePrinciples() {
    const [activePrinciple, setActivePrinciple] = useState('preattentive');
    const active = PRINCIPLES.find((p) => p.key === activePrinciple)!;
    const DemoComponent = DEMO_MAP[active.demo.type];

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-stone-900 tracking-tight">
                    How Your Brain Reads Charts
                </h2>
                <p className="mt-3 text-lg text-stone-500 max-w-2xl mx-auto">
                    Four cognitive mechanisms that chart designers exploit — intentionally or not — to shape
                    your perception of data.
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                {PRINCIPLES.map((p) => {
                    const Icon = p.icon;
                    const isActive = p.key === activePrinciple;
                    return (
                        <button
                            key={p.key}
                            onClick={() => setActivePrinciple(p.key)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${isActive
                                    ? 'bg-brand-muted border-brand/40 shadow-sm'
                                    : 'bg-white border-stone-200 hover:border-stone-300'
                                }`}
                        >
                            <Icon
                                size={22}
                                className={isActive ? 'text-brand' : 'text-stone-400'}
                            />
                            <span
                                className={`text-xs font-semibold text-center ${isActive ? 'text-brand' : 'text-stone-600'
                                    }`}
                            >
                                {p.title}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <active.icon size={24} className="text-brand" />
                        <h3 className="text-xl font-bold text-stone-900">{active.title}</h3>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed mb-6">{active.description}</p>
                    <div className="border-t border-stone-100 pt-4">
                        <span className="text-xs text-stone-400 font-medium">Research Reference</span>
                        <p className="text-xs text-stone-500 mt-1 italic">{active.citation}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
                    <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">
                        Interactive Demonstration
                    </h4>
                    <DemoComponent />
                </div>
            </div>
        </div>
    );
}
