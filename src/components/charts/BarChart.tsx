import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import type { ChartState } from '../../types/chart';
import { transformData } from '../../lib/transforms';
import { computeLinearRegression } from '../../lib/scoring';

interface BarChartProps {
    state: ChartState;
    width?: number;
    height?: number;
}

export default function BarChart({ state, width = 640, height = 400 }: BarChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const margin = { top: 32, right: 24, bottom: 64, left: 56 };

    const processedData = useMemo(() => transformData(state.data, state.params), [state.data, state.params]);

    const regression = useMemo(() => {
        if (state.params.trendline === 'none') return null;
        const points = processedData.map((d, i) => ({ x: i, y: d.value }));
        return computeLinearRegression(points);
    }, [processedData, state.params.trendline]);

    const lastAnimatedDomain = useRef<string | null>(null);

    useEffect(() => {
        if (!svgRef.current || processedData.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const g = svg
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        if (state.params.threeD) {
            g.attr('transform', `translate(${margin.left},${margin.top}) perspective(800px) rotateY(-8deg) rotateX(5deg)`);
            svg.style('filter', 'drop-shadow(4px 4px 6px rgba(0,0,0,0.15))');
        } else {
            svg.style('filter', 'none');
        }

        const values = processedData.map((d) => d.value);
        const dataMin = Math.min(...values);
        const dataMax = Math.max(...values);
        const axisMin = dataMin * (state.params.axisBaselinePct / 100);
        const yDomainMin = Math.max(0, axisMin);

        const x = d3
            .scaleBand()
            .domain(processedData.map((d) => d.label))
            .range([0, innerWidth])
            .padding(0.25);

        const y = d3
            .scaleLinear()
            .domain([yDomainMin, dataMax * state.params.axisMaxFactor])
            .nice()
            .range(state.params.invertYAxis ? [0, innerHeight] : [innerHeight, 0]);

        const gridlineCount = state.params.gridlineCount;
        if (gridlineCount > 0) {
            g.append('g')
                .attr('class', 'gridlines')
                .selectAll('line')
                .data(y.ticks(gridlineCount))
                .enter()
                .append('line')
                .attr('x1', 0)
                .attr('x2', innerWidth)
                .attr('y1', (d) => y(d))
                .attr('y2', (d) => y(d))
                .attr('stroke', '#e5e7eb')
                .attr('stroke-width', 0.5);
        }

        const highlighted = state.params.colorEmphasis.highlightedIndices;
        const dimOpacity = state.params.colorEmphasis.dimOpacity;
        const shouldAnimate = lastAnimatedDomain.current !== state.metadata.domain;

        if (shouldAnimate) {
            lastAnimatedDomain.current = state.metadata.domain;
        }

        const getBarY = (val: number) => state.params.invertYAxis ? 0 : y(val);
        const getBarHeight = (val: number) => state.params.invertYAxis ? y(val) : Math.max(0, innerHeight - y(val));

        const bars = g
            .selectAll('.bar')
            .data(processedData)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => x(d.label)!)
            .attr('width', x.bandwidth())
            .attr('rx', 3)
            .attr('fill', (_, i) => {
                if (highlighted.length === 0) return '#2563eb';
                return highlighted.includes(i) ? '#2563eb' : '#94a3b8';
            })
            .attr('opacity', (_, i) => {
                if (highlighted.length === 0) return 1;
                return highlighted.includes(i) ? 1 : dimOpacity;
            })
            .attr('y', shouldAnimate ? (state.params.invertYAxis ? 0 : innerHeight) : (d) => getBarY(d.value))
            .attr('height', shouldAnimate ? 0 : (d) => getBarHeight(d.value));

        if (shouldAnimate) {
            bars.transition()
                .duration(600)
                .ease(d3.easeCubicOut)
                .attr('y', (d) => getBarY(d.value))
                .attr('height', (d) => getBarHeight(d.value));
        }

        if (state.params.confidenceLevel !== 'none') {
            const zScore = state.params.confidenceLevel === '99' ? 2.576 : state.params.confidenceLevel === '95' ? 1.96 : 1.645;

            // Generate a deterministic fake "standard error" based on the value so it looks consistent.
            // Let's say SE is 5% of the dataMax.
            const marginOfError = dataMax * 0.05 * zScore;

            const errorBars = g.selectAll('.error-bar')
                .data(processedData)
                .enter()
                .append('g')
                .attr('class', 'error-bar')
                .attr('opacity', shouldAnimate ? 0 : 1);

            errorBars.append('line')
                .attr('x1', (d) => x(d.label)! + x.bandwidth() / 2)
                .attr('x2', (d) => x(d.label)! + x.bandwidth() / 2)
                .attr('y1', (d) => getBarY(d.value + marginOfError))
                .attr('y2', (d) => getBarY(Math.max(0, d.value - marginOfError)))
                .attr('stroke', '#475569')
                .attr('stroke-width', 1.5);

            errorBars.append('line')
                .attr('x1', (d) => x(d.label)! + x.bandwidth() / 2 - 4)
                .attr('x2', (d) => x(d.label)! + x.bandwidth() / 2 + 4)
                .attr('y1', (d) => getBarY(d.value + marginOfError))
                .attr('y2', (d) => getBarY(d.value + marginOfError))
                .attr('stroke', '#475569')
                .attr('stroke-width', 1.5);

            errorBars.append('line')
                .attr('x1', (d) => x(d.label)! + x.bandwidth() / 2 - 4)
                .attr('x2', (d) => x(d.label)! + x.bandwidth() / 2 + 4)
                .attr('y1', (d) => getBarY(Math.max(0, d.value - marginOfError)))
                .attr('y2', (d) => getBarY(Math.max(0, d.value - marginOfError)))
                .attr('stroke', '#475569')
                .attr('stroke-width', 1.5);

            if (shouldAnimate) {
                errorBars.transition()
                    .delay(400)
                    .duration(400)
                    .attr('opacity', 1);
            }
        }

        if (state.params.threeD) {
            const sideBars = g.selectAll('.bar-3d-side')
                .data(processedData)
                .enter()
                .append('rect')
                .attr('class', 'bar-3d-side')
                .attr('x', (d) => x(d.label)! + x.bandwidth())
                .attr('width', 8)
                .attr('fill', '#1d4ed8')
                .attr('opacity', 0.6)
                .attr('y', shouldAnimate ? (state.params.invertYAxis ? 0 : innerHeight) : (d) => getBarY(d.value))
                .attr('height', shouldAnimate ? 0 : (d) => getBarHeight(d.value));

            if (shouldAnimate) {
                sideBars.transition()
                    .duration(600)
                    .ease(d3.easeCubicOut)
                    .attr('y', (d) => getBarY(d.value))
                    .attr('height', (d) => getBarHeight(d.value));
            }

            const getTopPoints = (d: any, currentY: number) => {
                const bx = x(d.label)!;
                const bw = x.bandwidth();
                const sign = state.params.invertYAxis ? 1 : -1;
                return `${bx},${currentY} ${bx + bw},${currentY} ${bx + bw + 8},${currentY + 6 * sign} ${bx + 8},${currentY + 6 * sign}`;
            };

            const topBars = g.selectAll('.bar-3d-top')
                .data(processedData)
                .enter()
                .append('polygon')
                .attr('class', 'bar-3d-top')
                .attr('fill', '#3b82f6')
                .attr('opacity', 0.5)
                .attr('points', (d) => getTopPoints(d, shouldAnimate ? (state.params.invertYAxis ? 0 : innerHeight) : y(d.value)));

            if (shouldAnimate) {
                topBars.transition()
                    .duration(600)
                    .ease(d3.easeCubicOut)
                    .attr('points', (d) => getTopPoints(d, y(d.value)));
            }
        }

        if (state.params.showComparativeScale) {
            const baselineValue = d3.mean(processedData, (d) => d.value) || 0;
            const baselineY = y(baselineValue);

            g.append('line')
                .attr('x1', 0)
                .attr('x2', innerWidth)
                .attr('y1', baselineY)
                .attr('y2', baselineY)
                .attr('stroke', '#f59e0b')
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', '8,4')
                .attr('opacity', 0.8);


        }

        if (state.params.trendline === 'linear' && regression) {
            const xStart = 0;
            const xEnd = processedData.length - 1;
            const yStart = regression.slope * xStart + regression.intercept;
            const yEnd = regression.slope * xEnd + regression.intercept;

            const line = g.append('line')
                .attr('x1', x(processedData[0].label)! + x.bandwidth() / 2)
                .attr('x2', x(processedData[processedData.length - 1].label)! + x.bandwidth() / 2)
                .attr('y1', y(yStart))
                .attr('y2', y(yEnd))
                .attr('stroke', '#ef4444')
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', '6,4')
                .attr('opacity', shouldAnimate ? 0 : 0.8);

            if (shouldAnimate) {
                line.transition()
                    .delay(300)
                    .duration(600)
                    .attr('opacity', 0.8);
            }
        }

        if (state.params.labelMode !== 'none') {
            const shouldLabel = (i: number) => {
                if (state.params.labelMode === 'all') return true;
                return i === 0 || i === processedData.length - 1 ||
                    processedData[i].value === dataMax || processedData[i].value === dataMin;
            };

            const labels = g.selectAll('.value-label')
                .data(processedData)
                .enter()
                .append('text')
                .filter((_, i) => shouldLabel(i))
                .attr('class', 'value-label')
                .attr('x', (d) => x(d.label)! + x.bandwidth() / 2)
                .attr('y', shouldAnimate ? (state.params.invertYAxis ? 14 : innerHeight - 6) : (d) => state.params.invertYAxis ? y(d.value) + 14 : y(d.value) - 6)
                .attr('opacity', shouldAnimate ? 0 : 1)
                .attr('text-anchor', 'middle')
                .attr('font-size', '11px')
                .attr('fill', '#374151')
                .attr('font-weight', 500)
                .text((d) => d.value.toFixed(1));

            if (shouldAnimate) {
                labels.transition()
                    .duration(600)
                    .ease(d3.easeCubicOut)
                    .attr('y', (d) => state.params.invertYAxis ? y(d.value) + 14 : y(d.value) - 6)
                    .attr('opacity', 1);
            }
        }

        const xAxis = d3.axisBottom(x);
        if (processedData.length > 15) {
            const tickStep = Math.ceil(processedData.length / 15);
            xAxis.tickValues(x.domain().filter((_, i) => i % tickStep === 0));
        }

        g.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(xAxis)
            .selectAll('text')
            .attr('transform', 'rotate(-35)')
            .attr('text-anchor', 'end')
            .attr('font-size', '11px')
            .attr('fill', '#6b7280');

        g.append('g')
            .call(d3.axisLeft(y).ticks(gridlineCount > 0 ? gridlineCount : 5))
            .selectAll('text')
            .attr('font-size', '11px')
            .attr('fill', '#6b7280');

        if (state.params.annotation.enabled && state.params.annotation.text) {
            const annotationColor = state.params.annotation.honest ? '#059669' : '#dc2626';
            g.append('text')
                .attr('x', innerWidth / 2)
                .attr('y', -12)
                .attr('text-anchor', 'middle')
                .attr('font-size', '13px')
                .attr('font-weight', 600)
                .attr('fill', annotationColor)
                .attr('opacity', shouldAnimate ? 0 : 1)
                .text(state.params.annotation.text)
                .transition()
                .delay(shouldAnimate ? 300 : 0)
                .duration(shouldAnimate ? 600 : 0)
                .attr('opacity', 1);
        }

        if (state.params.sourceCited) {
            g.append('text')
                .attr('x', innerWidth)
                .attr('y', innerHeight + margin.bottom - 10)
                .attr('text-anchor', 'end')
                .attr('font-size', '10px')
                .attr('fill', '#94a3b8')
                .attr('font-style', 'italic')
                .attr('opacity', shouldAnimate ? 0 : 1)
                .text('Source: Verified Internal Database')
                .transition()
                .delay(shouldAnimate ? 400 : 0)
                .duration(shouldAnimate ? 400 : 0)
                .attr('opacity', 1);
        }
    }, [processedData, state.params, width, height, margin, regression, state.metadata.domain]);

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            className="bg-white rounded-lg w-full h-auto"
            style={{
                transform: state.params.threeD ? 'perspective(800px) rotateY(-4deg) rotateX(3deg)' : 'none',
                transition: 'transform 0.4s ease',
            }}
        />
    );
}
