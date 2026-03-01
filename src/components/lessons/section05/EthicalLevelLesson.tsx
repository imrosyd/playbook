import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import LessonPage from '../../layout/LessonPage';
import type { ChartParams, DataPoint } from '../../../types/chart';
import { DEFAULT_PARAMS } from '../../../types/chart';
import { transformData } from '../../../lib/transforms';

interface CrossRef {
    sectionId: string;
    slug: string;
    label: string;
}

interface EthicalLevelLessonProps {
    levelIndex: number;
    crossRefs: CrossRef[];
    children?: React.ReactNode;
}

interface EthicalLevelConfig {
    level: number;
    name: string;
    color: string;
    tagline: string;
    description: string;
    manipulationTypes: string[];
    realWorldExample: string;
    brightLineTests: string[];
    ethicalGuideline: string;
    chartParams: Partial<ChartParams>;
}

const BASE_DATA: DataPoint[] = [
    { label: 'Q1', value: 88 },
    { label: 'Q2', value: 91 },
    { label: 'Q3', value: 86 },
    { label: 'Q4', value: 94 },
    { label: 'Q5', value: 90 },
    { label: 'Q6', value: 97 },
    { label: 'Q7', value: 93 },
    { label: 'Q8', value: 101 },
];

const ETHICAL_LEVELS: EthicalLevelConfig[] = [
    {
        level: 1,
        name: 'Clarity',
        color: '#047857',
        tagline: 'Accurate representation — the gold standard',
        description:
            'Level 1 charts present data with complete fidelity to the underlying numbers. The y-axis starts at zero, no smoothing is applied, all data points are visible, and any annotations directly reflect the data. The viewer\'s conclusions will align with the actual evidence. This is the professional standard for any chart used in a decision-making context.',
        manipulationTypes: [
            'None — this is the baseline of honest visualization',
            'Minor editorial choices (annotation placement, color palette) that do not distort magnitude',
            'Appropriate use of annotations to reduce cognitive load without implanting false frames',
        ],
        realWorldExample:
            'A CFO presents quarterly revenue with a zero-based y-axis, shows all 8 quarters without filtering, and adds an annotation noting that Q6 exceeded forecast by 3.2% — a factually accurate statement.',
        brightLineTests: [
            'Does the y-axis start at zero (or is the deviation from zero explicitly labeled)?',
            'Are all data points in the relevant period shown?',
            'Do annotations reflect what the data actually shows, not what you want it to show?',
            'Would a statistician reviewing raw data reach the same conclusion as a viewer of this chart?',
        ],
        ethicalGuideline:
            'This is where every chart should start. Deviations from Level 1 require explicit justification and disclosure. The burden of proof is always on the presenter to explain why a deviation is necessary.',
        chartParams: { ...DEFAULT_PARAMS },
    },
    {
        level: 2,
        name: 'Emphasis',
        color: '#1d4ed8',
        tagline: 'Directing attention without distorting magnitude',
        description:
            'Level 2 charts use emphasis techniques — highlighting, sorting, or color differentiation — to direct the viewer\'s attention toward a specific element. The underlying magnitudes remain accurate, but the pre-attentive system is being deliberately guided. This is editorially legitimate when the highlighted element is genuinely decision-relevant. It crosses into manipulation when emphasis is used to suppress context rather than illuminate it.',
        manipulationTypes: [
            'Color highlighting of a specific bar to draw attention to a result',
            'Sorting data by value to create a ranking narrative',
            'Selective labeling (showing only the highest and lowest values)',
            'Using emphasis to guide the viewer toward a pre-determined conclusion',
        ],
        realWorldExample:
            'A marketing analyst highlights the single highest-performing channel in blue while showing all others in grey — directing attention to a success story while keeping other channels visible but visually subordinate.',
        brightLineTests: [
            'Is the emphasized element genuinely the most decision-relevant piece of information?',
            'Are non-emphasized elements still visible and readable (not hidden)?',
            'Would you be comfortable if the audience knew you were directing their attention?',
            'Is the emphasis consistent with the analytical question being answered?',
        ],
        ethicalGuideline:
            'Emphasis is a legitimate editorial tool when applied honestly. Disclose what you are highlighting and why. If you cannot articulate a decision-relevant reason for the emphasis, reconsider.',
        chartParams: {
            ...DEFAULT_PARAMS,
            colorEmphasis: { highlightedIndices: [7], dimOpacity: 0.35 },
            sortOrder: 'value_desc',
            labelMode: 'selective',
        },
    },
    {
        level: 3,
        name: 'Framing',
        color: '#92400e',
        tagline: 'Favoring one interpretation of the same data',
        description:
            'Level 3 charts present accurate data in a frame that systematically favors one interpretation. The numbers are correct, but the combination of sorting, emphasis, selective annotation, and minor smoothing creates a perception that diverges from a neutral reading. This is the most common form of business chart manipulation — it operates below the threshold of obvious deception but reliably shifts viewer conclusions in the presenter\'s preferred direction.',
        manipulationTypes: [
            'Annotations that lead the viewer toward a conclusion rather than describing the data',
            'Sorting combined with heavy emphasis to create a "best case" narrative',
            'Minor axis truncation (under 20%) to make flat trends appear as growth',
            'Framing labels that use positive language for negative results',
        ],
        realWorldExample:
            'A product manager shows flat user engagement data sorted highest-first, highlights the one outlier month, and adds the annotation "Engagement momentum building" — technically accurate individual elements combined to create a misleading overall impression.',
        brightLineTests: [
            'Would the same data, presented with neutral defaults, tell the same story?',
            'Is the annotation phrased to describe what happened, or to advocate for a conclusion?',
            'Have you suppressed any elements (via opacity, ordering, exclusion) that contradict the framing?',
            'Would a skeptical analyst reach the same conclusion from raw numbers?',
        ],
        ethicalGuideline:
            'Framing is where professional responsibility diverges from legality. The chart is defensible in isolation, but the intent is to guide the audience to a conclusion the data does not fully support. If you are making choices specifically to favor one reading, you are in Level 3 territory.',
        chartParams: {
            ...DEFAULT_PARAMS,
            colorEmphasis: { highlightedIndices: [7], dimOpacity: 0.25 },
            sortOrder: 'value_desc',
            annotation: { enabled: true, text: 'Momentum building — growth trend intact', honest: false },
            axisBaselinePct: 15,
            labelMode: 'selective',
        },
    },
    {
        level: 4,
        name: 'Distortion',
        color: '#dc2626',
        tagline: 'Systematic perceptual errors through axis and 3D manipulation',
        description:
            'Level 4 charts introduce systematic perceptual errors. Axis truncation above 20% causes the viewer\'s pre-attentive system to receive a corrupted signal — bar lengths no longer accurately encode the data values. The 3D perspective effect adds foreshortening distortion on top of truncation. Cleveland and McGill (1985) demonstrated that length is among the most accurately decoded visual channels; Level 4 techniques specifically corrupt this channel. Decisions based on Level 4 charts will be predictably wrong.',
        manipulationTypes: [
            'Axis truncation above 20% baseline — magnifies apparent differences 3-5x',
            '3D perspective effect — introduces ~50% magnitude estimation error',
            'Combination of truncation and 3D (compound distortion)',
            'Excessive smoothing that hides meaningful variance',
        ],
        realWorldExample:
            'A division head presents a chart where sales increased from $980K to $1,020K — a 4% gain — but the y-axis starts at $950K with a 3D perspective applied. The bars appear to show one quarter as 4x the height of another, and the room approves a budget expansion that wasn\'t warranted by the actual data.',
        brightLineTests: [
            'Does the y-axis baseline exceed 20% of the minimum data value?',
            'Is a 3D effect applied to any chart encoding magnitude as bar length?',
            'Would removing the truncation or 3D effect change the viewer\'s conclusion?',
            'Could a viewer accurately estimate the ratio between any two values from this chart?',
        ],
        ethicalGuideline:
            'Level 4 techniques cross the line from framing into distortion. The viewer cannot form accurate magnitude judgments, and the chart will produce systematically wrong decisions. These techniques are indefensible in professional contexts regardless of intent.',
        chartParams: {
            ...DEFAULT_PARAMS,
            axisBaselinePct: 60,
            threeD: true,
            annotation: { enabled: true, text: 'Exceptional performance — all targets exceeded', honest: false },
            gridlineCount: 3,
        },
    },
    {
        level: 5,
        name: 'Manipulation',
        color: '#991b1b',
        tagline: 'Compound distortions with false narrative',
        description:
            'Level 5 charts combine multiple severe manipulation techniques with narrative elements specifically designed to prevent critical analysis. Three or more severe distortions compound to create a chart where the viewer\'s pre-attentive system, pattern recognition, and anchoring bias are all simultaneously exploited. The annotation, smoothing, and axis choices are coordinated to produce a specific false conclusion. This is the ethical equivalent of falsifying data.',
        manipulationTypes: [
            'Axis truncation + 3D effect (compound magnitude distortion)',
            'Heavy smoothing + misleading trendline (false trend narrative)',
            'Misleading annotation that anchors the viewer before they can form an independent judgment',
            'Cherry-picked outlier exclusion from already small sample',
            'Custom sort order to bury unfavorable periods',
        ],
        realWorldExample:
            'A startup founder presents a revenue chart to investors with 65% axis truncation, a 3D effect, a 5-period rolling average, and the annotation "Hockey-stick growth trajectory confirmed." The chart shows what appears to be 400% growth over 4 quarters. The actual growth was 11%. The company raises funding at a valuation reflecting the false trajectory.',
        brightLineTests: [
            'Are three or more severe manipulation techniques (each scoring -3 or worse) combined?',
            'Does the annotation explicitly advocate for a decision rather than describe data?',
            'Is a trendline applied to data that has been smoothed, filtered, and selectively sampled?',
            'Would a transparent presentation of the same data reach the opposite conclusion?',
        ],
        ethicalGuideline:
            'Level 5 is active manipulation. The chart is not a representation of data — it is a weapon for extracting a specific decision. In regulated contexts (financial reporting, clinical trials, government data) this constitutes fraud. In business contexts, it is a breach of fiduciary duty. There is no legitimate use case for a Level 5 chart.',
        chartParams: {
            ...DEFAULT_PARAMS,
            axisBaselinePct: 70,
            threeD: true,
            smoothingWindow: 5,
            trendline: 'linear',
            annotation: { enabled: true, text: 'Sustained exponential trajectory — immediate expansion recommended', honest: false },
            sortOrder: 'value_desc',
            colorEmphasis: { highlightedIndices: [0], dimOpacity: 0.2 },
            labelMode: 'selective',
        },
    },
];

function EthicalBarChart({
    data,
    params,
    color,
}: {
    data: DataPoint[];
    params: ChartParams;
    color: string;
}) {
    const svgRef = useRef<SVGSVGElement>(null);
    const width = 520;
    const height = 280;
    const margin = { top: 36, right: 20, bottom: 52, left: 48 };

    const processedData = useMemo(() => transformData(data, params), [data, params]);

    useEffect(() => {
        if (!svgRef.current || processedData.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        if (params.threeD) {
            svg.style('filter', 'drop-shadow(3px 3px 5px rgba(0,0,0,0.12))');
        } else {
            svg.style('filter', 'none');
        }

        const g = svg
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const values = processedData.map((d) => d.value);
        const dataMin = Math.min(...values);
        const dataMax = Math.max(...values);
        const axisMin = dataMin * (params.axisBaselinePct / 100);
        const yDomainMin = Math.max(0, axisMin);

        const x = d3
            .scaleBand()
            .domain(processedData.map((d) => d.label))
            .range([0, innerWidth])
            .padding(0.25);

        const y = d3
            .scaleLinear()
            .domain([yDomainMin, dataMax * 1.1])
            .nice()
            .range([innerHeight, 0]);

        if (params.gridlineCount > 0) {
            g.append('g')
                .selectAll('line')
                .data(y.ticks(params.gridlineCount))
                .enter()
                .append('line')
                .attr('x1', 0)
                .attr('x2', innerWidth)
                .attr('y1', (d) => y(d))
                .attr('y2', (d) => y(d))
                .attr('stroke', '#e5e7eb')
                .attr('stroke-width', 0.5);
        }

        const highlighted = params.colorEmphasis.highlightedIndices;
        const dimOpacity = params.colorEmphasis.dimOpacity;

        const bars = g
            .selectAll('.bar')
            .data(processedData)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => x(d.label)!)
            .attr('width', x.bandwidth())
            .attr('y', innerHeight)
            .attr('height', 0)
            .attr('rx', 3)
            .attr('fill', (_, i) => {
                if (highlighted.length === 0) return color;
                return highlighted.includes(i) ? color : '#94a3b8';
            })
            .attr('opacity', (_, i) => {
                if (highlighted.length === 0) return 0.9;
                return highlighted.includes(i) ? 1 : dimOpacity;
            });

        bars
            .transition()
            .duration(500)
            .ease(d3.easeCubicOut)
            .attr('y', (d) => y(d.value))
            .attr('height', (d) => Math.max(0, innerHeight - y(d.value)));

        if (params.threeD) {
            g.selectAll('.bar-3d-side')
                .data(processedData)
                .enter()
                .append('rect')
                .attr('x', (d) => x(d.label)! + x.bandwidth())
                .attr('width', 7)
                .attr('y', (d) => y(d.value))
                .attr('height', (d) => Math.max(0, innerHeight - y(d.value)))
                .attr('fill', color)
                .attr('opacity', 0.45);

            g.selectAll('.bar-3d-top')
                .data(processedData)
                .enter()
                .append('polygon')
                .attr('points', (d) => {
                    const bx = x(d.label)!;
                    const by = y(d.value);
                    const bw = x.bandwidth();
                    return `${bx},${by} ${bx + bw},${by} ${bx + bw + 7},${by - 5} ${bx + 7},${by - 5}`;
                })
                .attr('fill', color)
                .attr('opacity', 0.35);
        }

        if (params.trendline === 'linear' && processedData.length >= 2) {
            const points = processedData.map((d, i) => ({ x: i, y: d.value }));
            const n = points.length;
            let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
            for (const p of points) { sumX += p.x; sumY += p.y; sumXY += p.x * p.y; sumX2 += p.x * p.x; }
            const denom = n * sumX2 - sumX * sumX;
            if (denom !== 0) {
                const slope = (n * sumXY - sumX * sumY) / denom;
                const intercept = (sumY - slope * sumX) / n;
                const yStart = slope * 0 + intercept;
                const yEnd = slope * (n - 1) + intercept;

                g.append('line')
                    .attr('x1', x(processedData[0].label)! + x.bandwidth() / 2)
                    .attr('x2', x(processedData[n - 1].label)! + x.bandwidth() / 2)
                    .attr('y1', y(Math.max(yDomainMin, yStart)))
                    .attr('y2', y(Math.max(yDomainMin, yEnd)))
                    .attr('stroke', '#ef4444')
                    .attr('stroke-width', 2)
                    .attr('stroke-dasharray', '5,4')
                    .attr('opacity', 0.8);
            }
        }

        if (params.labelMode !== 'none') {
            const shouldLabel = (i: number) => {
                if (params.labelMode === 'all') return true;
                return i === 0 || i === processedData.length - 1 ||
                    processedData[i].value === dataMax || processedData[i].value === Math.min(...values);
            };
            g.selectAll('.val-label')
                .data(processedData)
                .enter()
                .append('text')
                .filter((_, i) => shouldLabel(i))
                .attr('x', (d) => x(d.label)! + x.bandwidth() / 2)
                .attr('y', (d) => y(d.value) - 5)
                .attr('text-anchor', 'middle')
                .attr('font-size', '10px')
                .attr('fill', '#374151')
                .attr('font-weight', 500)
                .text((d) => d.value.toFixed(0));
        }

        g.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'rotate(-30)')
            .attr('text-anchor', 'end')
            .attr('font-size', '10px')
            .attr('fill', '#6b7280');

        g.append('g')
            .call(d3.axisLeft(y).ticks(params.gridlineCount > 0 ? params.gridlineCount : 4))
            .selectAll('text')
            .attr('font-size', '10px')
            .attr('fill', '#6b7280');

        if (params.annotation.enabled && params.annotation.text) {
            const annotationColor = params.annotation.honest ? '#059669' : '#dc2626';
            g.append('text')
                .attr('x', innerWidth / 2)
                .attr('y', -16)
                .attr('text-anchor', 'middle')
                .attr('font-size', '12px')
                .attr('font-weight', 600)
                .attr('fill', annotationColor)
                .text(params.annotation.text);
        }
    }, [processedData, params, color]);

    return (
        <svg
            ref={svgRef}
            width={width}
            height={height}
            className="bg-white rounded-lg"
            style={{
                transform: params.threeD ? 'perspective(700px) rotateY(-5deg) rotateX(3deg)' : 'none',
                transition: 'transform 0.4s ease',
            }}
        />
    );
}

export default function EthicalLevelLesson({ levelIndex, crossRefs, children }: EthicalLevelLessonProps) {
    const config = ETHICAL_LEVELS[Math.max(0, Math.min(4, levelIndex))];
    const chartParams: ChartParams = { ...DEFAULT_PARAMS, ...config.chartParams } as ChartParams;

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
                {/* Level header badge */}
                <div className="flex items-center gap-4">
                    <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-white font-black text-2xl shadow-sm"
                        style={{ backgroundColor: config.color }}
                    >
                        {config.level}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-stone-900">Level {config.level}: {config.name}</h2>
                        <p className="text-[14px] font-medium mt-0.5" style={{ color: config.color }}>
                            {config.tagline}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-[15px] text-stone-600 leading-relaxed">{config.description}</p>

                {/* Chart demo */}
                <div
                    className="rounded-xl border p-5 shadow-sm overflow-x-auto"
                    style={{ borderColor: `${config.color}33`, backgroundColor: `${config.color}08` }}
                >
                    <p
                        className="text-xs font-semibold uppercase tracking-wider mb-4"
                        style={{ color: config.color }}
                    >
                        Level {config.level} — {config.name} Demonstration
                    </p>
                    <EthicalBarChart data={BASE_DATA} params={chartParams} color={config.color} />
                </div>

                {/* Manipulation types */}
                <div className="space-y-3">
                    <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                        Techniques at this level
                    </p>
                    <ul className="space-y-2">
                        {config.manipulationTypes.map((type, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div
                                    className="mt-1.5 shrink-0 w-2 h-2 rounded-full"
                                    style={{ backgroundColor: config.color }}
                                />
                                <span className="text-[14px] text-stone-600 leading-relaxed">{type}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Real-world example */}
                <div
                    className="rounded-xl border p-5"
                    style={{ borderColor: `${config.color}33`, backgroundColor: `${config.color}06` }}
                >
                    <p
                        className="text-xs font-semibold uppercase tracking-wider mb-3"
                        style={{ color: config.color }}
                    >
                        Real-World Example
                    </p>
                    <p className="text-[14px] text-stone-700 leading-relaxed">{config.realWorldExample}</p>
                </div>

                {/* Bright-line tests */}
                <div className="space-y-3">
                    <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                        Bright-Line Tests
                    </p>
                    <div className="space-y-2">
                        {config.brightLineTests.map((test, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 rounded-lg bg-stone-50 border border-stone-100 px-4 py-3"
                            >
                                <span className="text-stone-400 text-sm shrink-0 mt-0.5">{i + 1}.</span>
                                <span className="text-[13px] text-stone-700 leading-relaxed">{test}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ethical guideline */}
                <div className="rounded-xl bg-stone-50 border border-stone-200 px-5 py-4">
                    <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                        Ethical Guideline
                    </p>
                    <p className="text-[14px] text-stone-700 leading-relaxed">{config.ethicalGuideline}</p>
                </div>
            </div>
            {children && (
                <div className="mt-12 pt-10 border-t border-stone-200">
                    {children}
                </div>
            )}
        </LessonPage>
    );
}
