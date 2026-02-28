import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import type { ChartState } from '../../types/chart';
import { transformData } from '../../lib/transforms';
import { computeLinearRegression } from '../../lib/scoring';

interface AreaChartProps {
    state: ChartState;
    width?: number;
    height?: number;
}

export default function AreaChart({ state, width = 640, height = 400 }: AreaChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const margin = { top: 32, right: 24, bottom: 64, left: 56 };

    const processedData = useMemo(() => transformData(state.data, state.params), [state.data, state.params]);

    const regression = useMemo(() => {
        if (state.params.trendline === 'none') return null;
        const points = processedData.map((d, i) => ({ x: i, y: d.value }));
        return computeLinearRegression(points);
    }, [processedData, state.params.trendline]);

    useEffect(() => {
        if (!svgRef.current || processedData.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const g = svg
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const values = processedData.map((d) => d.value);
        const dataMin = Math.min(...values);
        const dataMax = Math.max(...values);
        const axisMin = dataMin * (state.params.axisBaselinePct / 100);
        const yDomainMin = Math.max(0, axisMin);

        const x = d3.scalePoint()
            .domain(processedData.map((d) => d.label))
            .range([0, innerWidth])
            .padding(0.1);

        const y = d3.scaleLinear()
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

        const areaGenerator = d3.area<any>()
            .x(d => x(d.label)!)
            .y0(state.params.invertYAxis ? 0 : innerHeight)
            .y1(d => y(d.value))
            .curve(d3.curveMonotoneX);

        const lineGenerator = d3.line<any>()
            .x(d => x(d.label)!)
            .y(d => y(d.value))
            .curve(d3.curveMonotoneX);

        if (state.params.confidenceLevel !== 'none') {
            const zScore = state.params.confidenceLevel === '99' ? 2.576 : state.params.confidenceLevel === '95' ? 1.96 : 1.645;
            const marginOfError = dataMax * 0.05 * zScore;

            const ciAreaGenerator = d3.area<any>()
                .x(d => x(d.label)!)
                .y0(d => state.params.invertYAxis ? Math.max(0, y(Math.max(0, d.value - marginOfError))) : Math.min(innerHeight, y(Math.max(0, d.value - marginOfError))))
                .y1(d => y(d.value + marginOfError))
                .curve(d3.curveMonotoneX);

            g.append('path')
                .datum(processedData)
                .attr('fill', '#e2e8f0')
                .attr('opacity', 0)
                .attr('d', ciAreaGenerator)
                .transition()
                .duration(600)
                .attr('opacity', 0.6);
        }

        // Area path
        g.append('path')
            .datum(processedData)
            .attr('fill', '#93c5fd')
            .attr('opacity', 0)
            .attr('d', areaGenerator)
            .transition()
            .duration(600)
            .attr('opacity', 0.5);

        // Line path
        const path = g.append('path')
            .datum(processedData)
            .attr('fill', 'none')
            .attr('stroke', '#2563eb')
            .attr('stroke-width', 2)
            .attr('d', lineGenerator);

        const pathLength = (path.node() as SVGPathElement).getTotalLength();
        path.attr('stroke-dasharray', `${pathLength} ${pathLength}`)
            .attr('stroke-dashoffset', pathLength)
            .transition()
            .duration(600)
            .ease(d3.easeCubicOut)
            .attr('stroke-dashoffset', 0);


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

            g.append('text')
                .attr('x', innerWidth - 5)
                .attr('y', baselineY - 6)
                .attr('text-anchor', 'end')
                .attr('fill', '#6366f1')
                .attr('font-size', '11px')
                .attr('font-weight', '600')
                .text('Industry Baseline');
        }

        if (state.params.trendline === 'linear' && regression) {
            const xStart = 0;
            const xEnd = processedData.length - 1;
            const yStart = regression.slope * xStart + regression.intercept;
            const yEnd = regression.slope * xEnd + regression.intercept;

            g.append('line')
                .attr('x1', x(processedData[0].label)!)
                .attr('x2', x(processedData[processedData.length - 1].label)!)
                .attr('y1', y(yStart))
                .attr('y2', y(yEnd))
                .attr('stroke', '#ef4444')
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', '6,4')
                .attr('opacity', 0)
                .transition()
                .delay(300)
                .duration(600)
                .attr('opacity', 0.8);
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
                .attr('x', (d) => x(d.label)!)
                .attr('y', (d) => state.params.invertYAxis ? y(d.value) + 16 : y(d.value) - 10)
                .attr('opacity', 0)
                .attr('text-anchor', 'middle')
                .attr('font-size', '11px')
                .attr('fill', '#374151')
                .attr('font-weight', 500)
                .text((d) => d.value.toFixed(1));

            labels.transition()
                .delay(300)
                .duration(400)
                .ease(d3.easeCubicOut)
                .attr('opacity', 1);
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
                .attr('opacity', 0)
                .text(state.params.annotation.text)
                .transition()
                .delay(300)
                .duration(600)
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
                .attr('opacity', 0)
                .text('Source: Verified Internal Database')
                .transition()
                .delay(400)
                .duration(400)
                .attr('opacity', 1);
        }

    }, [processedData, state.params, width, height, margin, regression]);

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            className="bg-white rounded-lg w-full h-auto"
        />
    );
}
