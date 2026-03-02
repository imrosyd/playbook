import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import LessonPage from '../../layout/LessonPage';
import type { ChartParams, DataPoint } from '../../../types/chart';
import { DEFAULT_PARAMS } from '../../../types/chart';
import { transformData } from '../../../lib/transforms';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';

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

const GET_ETHICAL_LEVELS = (lang: any): EthicalLevelConfig[] => [
    {
        level: 1,
        name: t(lang, 's8.ethicalLevel.level1.name'),
        color: '#047857',
        tagline: t(lang, 's8.ethicalLevel.level1.tagline'),
        description: t(lang, 's8.ethicalLevel.level1.desc'),
        manipulationTypes: [
            t(lang, 's8.ethicalLevel.level1.manip1'),
            t(lang, 's8.ethicalLevel.level1.manip2'),
            t(lang, 's8.ethicalLevel.level1.manip3'),
        ],
        realWorldExample: t(lang, 's8.ethicalLevel.level1.example'),
        brightLineTests: [
            t(lang, 's8.ethicalLevel.level1.test1'),
            t(lang, 's8.ethicalLevel.level1.test2'),
            t(lang, 's8.ethicalLevel.level1.test3'),
            t(lang, 's8.ethicalLevel.level1.test4'),
        ],
        ethicalGuideline: t(lang, 's8.ethicalLevel.level1.guideline'),
        chartParams: { ...DEFAULT_PARAMS },
    },
    {
        level: 2,
        name: t(lang, 's8.ethicalLevel.level2.name'),
        color: '#1d4ed8',
        tagline: t(lang, 's8.ethicalLevel.level2.tagline'),
        description: t(lang, 's8.ethicalLevel.level2.desc'),
        manipulationTypes: [
            t(lang, 's8.ethicalLevel.level2.manip1'),
            t(lang, 's8.ethicalLevel.level2.manip2'),
            t(lang, 's8.ethicalLevel.level2.manip3'),
            t(lang, 's8.ethicalLevel.level2.manip4'),
        ],
        realWorldExample: t(lang, 's8.ethicalLevel.level2.example'),
        brightLineTests: [
            t(lang, 's8.ethicalLevel.level2.test1'),
            t(lang, 's8.ethicalLevel.level2.test2'),
            t(lang, 's8.ethicalLevel.level2.test3'),
            t(lang, 's8.ethicalLevel.level2.test4'),
        ],
        ethicalGuideline: t(lang, 's8.ethicalLevel.level2.guideline'),
        chartParams: {
            ...DEFAULT_PARAMS,
            colorEmphasis: { highlightedIndices: [7], dimOpacity: 0.35 },
            sortOrder: 'value_desc',
            labelMode: 'selective',
        },
    },
    {
        level: 3,
        name: t(lang, 's8.ethicalLevel.level3.name'),
        color: '#92400e',
        tagline: t(lang, 's8.ethicalLevel.level3.tagline'),
        description: t(lang, 's8.ethicalLevel.level3.desc'),
        manipulationTypes: [
            t(lang, 's8.ethicalLevel.level3.manip1'),
            t(lang, 's8.ethicalLevel.level3.manip2'),
            t(lang, 's8.ethicalLevel.level3.manip3'),
            t(lang, 's8.ethicalLevel.level3.manip4'),
        ],
        realWorldExample: t(lang, 's8.ethicalLevel.level3.example'),
        brightLineTests: [
            t(lang, 's8.ethicalLevel.level3.test1'),
            t(lang, 's8.ethicalLevel.level3.test2'),
            t(lang, 's8.ethicalLevel.level3.test3'),
            t(lang, 's8.ethicalLevel.level3.test4'),
        ],
        ethicalGuideline: t(lang, 's8.ethicalLevel.level3.guideline'),
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
        name: t(lang, 's8.ethicalLevel.level4.name'),
        color: '#dc2626',
        tagline: t(lang, 's8.ethicalLevel.level4.tagline'),
        description: t(lang, 's8.ethicalLevel.level4.desc'),
        manipulationTypes: [
            t(lang, 's8.ethicalLevel.level4.manip1'),
            t(lang, 's8.ethicalLevel.level4.manip2'),
            t(lang, 's8.ethicalLevel.level4.manip3'),
            t(lang, 's8.ethicalLevel.level4.manip4'),
        ],
        realWorldExample: t(lang, 's8.ethicalLevel.level4.example'),
        brightLineTests: [
            t(lang, 's8.ethicalLevel.level4.test1'),
            t(lang, 's8.ethicalLevel.level4.test2'),
            t(lang, 's8.ethicalLevel.level4.test3'),
            t(lang, 's8.ethicalLevel.level4.test4'),
        ],
        ethicalGuideline: t(lang, 's8.ethicalLevel.level4.guideline'),
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
        name: t(lang, 's8.ethicalLevel.level5.name'),
        color: '#991b1b',
        tagline: t(lang, 's8.ethicalLevel.level5.tagline'),
        description: t(lang, 's8.ethicalLevel.level5.desc'),
        manipulationTypes: [
            t(lang, 's8.ethicalLevel.level5.manip1'),
            t(lang, 's8.ethicalLevel.level5.manip2'),
            t(lang, 's8.ethicalLevel.level5.manip3'),
            t(lang, 's8.ethicalLevel.level5.manip4'),
            t(lang, 's8.ethicalLevel.level5.manip5'),
        ],
        realWorldExample: t(lang, 's8.ethicalLevel.level5.example'),
        brightLineTests: [
            t(lang, 's8.ethicalLevel.level5.test1'),
            t(lang, 's8.ethicalLevel.level5.test2'),
            t(lang, 's8.ethicalLevel.level5.test3'),
            t(lang, 's8.ethicalLevel.level5.test4'),
        ],
        ethicalGuideline: t(lang, 's8.ethicalLevel.level5.guideline'),
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
    const { lang } = useLang();
    const ETHICAL_LEVELS = GET_ETHICAL_LEVELS(lang);
    const config = ETHICAL_LEVELS[Math.max(0, Math.min(4, levelIndex))];
    const chartParams: ChartParams = { ...DEFAULT_PARAMS, ...config.chartParams } as ChartParams;

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">
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
                        Level {config.level} — {config.name} {t(lang, 's8.ethicalLevel.demoLabel')}
                    </p>
                    <EthicalBarChart data={BASE_DATA} params={chartParams} color={config.color} />
                </div>

                {/* Manipulation types */}
                <div className="space-y-3">
                    <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                        {t(lang, 's8.ethicalLevel.techniquesTitle')}
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
                        {t(lang, 's8.ethicalLevel.realWorldTitle')}
                    </p>
                    <p className="text-[14px] text-stone-700 leading-relaxed">{config.realWorldExample}</p>
                </div>

                {/* Bright-line tests */}
                <div className="space-y-3">
                    <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                        {t(lang, 's8.ethicalLevel.brightLineTitle')}
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
                        {t(lang, 's8.ethicalLevel.guidelineTitle')}
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
