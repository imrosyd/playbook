import { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { BarChart3, LineChart, PieChart, ArrowRight } from 'lucide-react';

interface ChartTypeInfo {
    key: string;
    title: string;
    icon: typeof BarChart3;
    bestFor: string;
    perceptualChannel: string;
    commonMisuse: string;
    accuracy: string;
}

const CHART_TYPES: ChartTypeInfo[] = [
    {
        key: 'bar',
        title: 'Bar Chart',
        icon: BarChart3,
        bestFor: 'Comparing magnitudes across categories. The eye judges bar length with high accuracy.',
        perceptualChannel: 'Length (most accurate pre-attentive channel per Cleveland & McGill hierarchy)',
        commonMisuse: 'Truncating the Y-axis to exaggerate small differences. Adding 3D that foreshortens rear bars.',
        accuracy: '~2-3% magnitude estimation error when properly constructed',
    },
    {
        key: 'line',
        title: 'Line Chart',
        icon: LineChart,
        bestFor: 'Showing trends over time. The slope encodes rate of change.',
        perceptualChannel: 'Position and angle (slope perception drives trend judgment)',
        commonMisuse: 'Heavy smoothing that eliminates real variance. Aspect ratio manipulation that steepens or flattens apparent slope.',
        accuracy: '~5-8% slope estimation error, highly sensitive to aspect ratio',
    },
    {
        key: 'pie',
        title: 'Pie Chart',
        icon: PieChart,
        bestFor: 'Showing part-to-whole relationships with 2-4 segments maximum.',
        perceptualChannel: 'Angle and area (least accurate pre-attentive channels)',
        commonMisuse: 'Using more than 4 segments. 3D rotation hides small slices. Exploded segments distort apparent proportions.',
        accuracy: '~15-25% magnitude estimation error — significantly worse than bar charts',
    },
];

const SAMPLE_DATA = [
    { label: 'Product A', value: 42 },
    { label: 'Product B', value: 38 },
    { label: 'Product C', value: 28 },
    { label: 'Product D', value: 22 },
];

function BarChartDemo({ width = 320, height = 220 }: { width?: number; height?: number }) {
    const ref = useRef<SVGSVGElement>(null);
    useEffect(() => {
        if (!ref.current) return;
        const svg = d3.select(ref.current);
        svg.selectAll('*').remove();
        const m = { top: 16, right: 16, bottom: 36, left: 40 };
        const iw = width - m.left - m.right;
        const ih = height - m.top - m.bottom;
        const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);
        const x = d3.scaleBand().domain(SAMPLE_DATA.map((d) => d.label)).range([0, iw]).padding(0.3);
        const y = d3.scaleLinear().domain([0, 50]).range([ih, 0]);
        [0, 10, 20, 30, 40, 50].forEach((v) => {
            g.append('line').attr('x1', 0).attr('x2', iw).attr('y1', y(v)).attr('y2', y(v)).attr('stroke', '#f1f5f9').attr('stroke-width', 0.5);
        });
        g.selectAll('rect').data(SAMPLE_DATA).enter().append('rect')
            .attr('x', (d) => x(d.label)!).attr('width', x.bandwidth())
            .attr('y', ih).attr('height', 0).attr('fill', '#2563eb').attr('rx', 3).attr('opacity', 0.85)
            .transition().duration(500).ease(d3.easeCubicOut)
            .attr('y', (d) => y(d.value)).attr('height', (d) => ih - y(d.value));
        g.append('g').attr('transform', `translate(0,${ih})`).call(d3.axisBottom(x)).selectAll('text').attr('font-size', '10px').attr('fill', '#64748b');
        g.append('g').call(d3.axisLeft(y).ticks(5)).selectAll('text').attr('font-size', '10px').attr('fill', '#64748b');
    }, [width, height]);
    return <svg ref={ref} width={width} height={height} className="bg-white rounded-lg" />;
}

function LineChartDemo({ width = 320, height = 220 }: { width?: number; height?: number }) {
    const ref = useRef<SVGSVGElement>(null);
    useEffect(() => {
        if (!ref.current) return;
        const svg = d3.select(ref.current);
        svg.selectAll('*').remove();
        const m = { top: 16, right: 16, bottom: 36, left: 40 };
        const iw = width - m.left - m.right;
        const ih = height - m.top - m.bottom;
        const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);
        const data = [22, 28, 25, 35, 32, 38, 36, 42];
        const x = d3.scaleLinear().domain([0, data.length - 1]).range([0, iw]);
        const y = d3.scaleLinear().domain([15, 50]).range([ih, 0]);
        const line = d3.line<number>().x((_, i) => x(i)).y((d) => y(d)).curve(d3.curveMonotoneX);
        const area = d3.area<number>().x((_, i) => x(i)).y0(ih).y1((d) => y(d)).curve(d3.curveMonotoneX);
        g.append('path').datum(data).attr('fill', '#2563eb').attr('opacity', 0.08).attr('d', area);
        g.append('path').datum(data).attr('fill', 'none').attr('stroke', '#2563eb').attr('stroke-width', 2.5).attr('d', line);
        g.selectAll('circle').data(data).enter().append('circle').attr('cx', (_, i) => x(i)).attr('cy', (d) => y(d)).attr('r', 3.5).attr('fill', '#2563eb');
        g.append('g').attr('transform', `translate(0,${ih})`).call(d3.axisBottom(x).ticks(8).tickFormat((d) => `W${+d + 1}`)).selectAll('text').attr('font-size', '10px').attr('fill', '#64748b');
        g.append('g').call(d3.axisLeft(y).ticks(5)).selectAll('text').attr('font-size', '10px').attr('fill', '#64748b');
    }, [width, height]);
    return <svg ref={ref} width={width} height={height} className="bg-white rounded-lg" />;
}

function PieChartDemo({ width = 260, height = 220 }: { width?: number; height?: number }) {
    const ref = useRef<SVGSVGElement>(null);
    useEffect(() => {
        if (!ref.current) return;
        const svg = d3.select(ref.current);
        svg.selectAll('*').remove();
        const r = Math.min(width, height) / 2 - 20;
        const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);
        const pie = d3.pie<typeof SAMPLE_DATA[0]>().value((d) => d.value).sort(null);
        const arc = d3.arc<d3.PieArcDatum<typeof SAMPLE_DATA[0]>>().innerRadius(0).outerRadius(r);
        const colors = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];
        g.selectAll('path').data(pie(SAMPLE_DATA)).enter().append('path')
            .attr('d', arc).attr('fill', (_, i) => colors[i]).attr('stroke', '#fff').attr('stroke-width', 2).attr('opacity', 0.85);
        g.selectAll('text').data(pie(SAMPLE_DATA)).enter().append('text')
            .attr('transform', (d) => `translate(${arc.centroid(d)})`)
            .attr('text-anchor', 'middle').attr('font-size', '10px').attr('fill', '#fff').attr('font-weight', 600)
            .text((d) => d.data.label);
    }, [width, height]);
    return <svg ref={ref} width={width} height={height} className="bg-white rounded-lg" />;
}

const DEMOS: Record<string, React.FC<{ width?: number; height?: number }>> = {
    bar: BarChartDemo,
    line: LineChartDemo,
    pie: PieChartDemo,
};

export default function ChartMechanics() {
    const [activeType, setActiveType] = useState('bar');
    const active = CHART_TYPES.find((c) => c.key === activeType)!;
    const Demo = DEMOS[activeType];

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-stone-900 tracking-tight">
                    Chart Mechanics
                </h2>
                <p className="mt-3 text-lg text-stone-500 max-w-2xl mx-auto">
                    Every chart type maps data to a perceptual channel. Understanding these channels reveals
                    where distortion can — and does — enter.
                </p>
            </div>

            <div className="flex gap-3 justify-center mb-10">
                {CHART_TYPES.map((ct) => {
                    const Icon = ct.icon;
                    const isActive = ct.key === activeType;
                    return (
                        <button
                            key={ct.key}
                            onClick={() => setActiveType(ct.key)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all ${isActive
                                ? 'bg-brand-muted border-brand/40 text-brand shadow-sm'
                                : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                                }`}
                        >
                            <Icon size={18} />
                            {ct.title}
                        </button>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 flex items-center justify-center">
                    <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
                        <Demo />
                    </div>
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-stone-900 mb-4">{active.title}</h3>

                        <div className="space-y-4">
                            <div>
                                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Best For</span>
                                <p className="text-sm text-stone-700 mt-1">{active.bestFor}</p>
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Perceptual Channel</span>
                                <p className="text-sm text-stone-700 mt-1">{active.perceptualChannel}</p>
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Common Misuse</span>
                                <p className="text-sm text-red-600 mt-1">{active.commonMisuse}</p>
                            </div>
                            <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                                <ArrowRight size={14} className="text-brand" />
                                <span className="text-xs font-medium text-brand">{active.accuracy}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-stone-50 rounded-xl border border-stone-100 p-5">
                        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                            Cleveland &amp; McGill Accuracy Hierarchy
                        </span>
                        <div className="mt-3 space-y-2">
                            {[
                                { channel: 'Position along common scale', accuracy: 'Most accurate', pct: 98 },
                                { channel: 'Length', accuracy: 'Very high', pct: 88 },
                                { channel: 'Angle / Slope', accuracy: 'Moderate', pct: 65 },
                                { channel: 'Area', accuracy: 'Low', pct: 45 },
                                { channel: 'Color saturation', accuracy: 'Least accurate', pct: 25 },
                            ].map((item) => (
                                <div key={item.channel} className="flex items-center gap-3">
                                    <div className="w-32 text-xs text-stone-600">{item.channel}</div>
                                    <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-brand rounded-full"
                                            style={{ width: `${item.pct}%` }}
                                        />
                                    </div>
                                    <div className="w-24 text-xs text-stone-500 text-right">{item.accuracy}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
