import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import type { ChartState } from '../../types/chart';
import { transformData } from '../../lib/transforms';

interface PieChartProps {
    state: ChartState;
    width?: number;
    height?: number;
}

export default function PieChart({ state, width = 640, height = 400 }: PieChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const margin = { top: 32, right: 32, bottom: 32, left: 32 };

    const processedData = useMemo(() => transformData(state.data, state.params), [state.data, state.params]);

    useEffect(() => {
        if (!svgRef.current || processedData.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const radius = Math.min(innerWidth, innerHeight) / 2;

        const g = svg
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        if (state.params.threeD) {
            g.attr('transform', `translate(${width / 2},${height / 2}) perspective(800px) rotateX(60deg)`);
            svg.style('filter', 'drop-shadow(4px 4px 6px rgba(0,0,0,0.15))');
        } else {
            svg.style('filter', 'none');
        }

        const color = d3.scaleOrdinal()
            .domain(processedData.map(d => d.label))
            .range(d3.schemeBlues[9] || d3.schemeCategory10);

        const pie = d3.pie<any>()
            .value(d => d.value)
            .sort(null);

        // Adjust sorting logic for pie based on state.params if needed.
        // TransformData already sorts the array if sortOrder is set,
        // so we don't want d3.pie() to re-sort it.

        const dataReady = pie(processedData);

        const arcGenerator = d3.arc<any>()
            .innerRadius(0)
            .outerRadius(radius * 0.8);

        const outerArc = d3.arc<any>()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

        const highlighted = state.params.colorEmphasis.highlightedIndices;
        const dimOpacity = state.params.colorEmphasis.dimOpacity;

        const slices = g.selectAll('allSlices')
            .data(dataReady)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr('fill', (d, i) => {
                if (highlighted.length > 0 && highlighted.includes(i)) return '#2563eb'; // strong blue for highlight
                return color(d.data.label) as string;
            })
            .attr('stroke', 'white')
            .style('stroke-width', '2px')
            .attr('opacity', (_, i) => {
                if (highlighted.length === 0) return 1;
                return highlighted.includes(i) ? 1 : dimOpacity;
            });

        // Add 3D thickness effect
        if (state.params.threeD) {
            // Simplified 3D effect: just adding a drop shadow or some layered shapes below
            g.append('ellipse')
                .attr('rx', radius * 0.8)
                .attr('ry', radius * 0.8)
                .attr('cy', 20) // drop down
                .attr('fill', 'rgba(0,0,0,0.2)')
                .lower();
        }

        slices.transition()
            .duration(800)
            .attrTween('d', function (d) {
                const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
                return function (t) {
                    return arcGenerator(i(t)) || '';
                }
            });

        if (state.params.labelMode !== 'none') {
            const shouldLabel = (i: number, dataMax: number, dataMin: number, value: number) => {
                if (state.params.labelMode === 'all') return true;
                return i === 0 || i === processedData.length - 1 || value === dataMax || value === dataMin;
            };

            const vals = processedData.map(d => d.value);
            const dataMax = Math.max(...vals);
            const dataMin = Math.min(...vals);

            // Labels part 1: lines
            g.selectAll('allPolylines')
                .data(dataReady)
                .enter()
                .append('polyline')
                .filter((d, i) => shouldLabel(i, dataMax, dataMin, d.data.value))
                .attr('stroke', '#cbd5e1')
                .style('fill', 'none')
                .attr('stroke-width', 1)
                .attr('points', function (d) {
                    const posA = arcGenerator.centroid(d);
                    const posB = outerArc.centroid(d);
                    const posC = outerArc.centroid(d);
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                    posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
                    return [posA, posB, posC].join(',');
                })
                .attr('opacity', 0)
                .transition()
                .delay(800)
                .duration(400)
                .attr('opacity', 1);

            // Labels part 2: text
            g.selectAll('allLabels')
                .data(dataReady)
                .enter()
                .append('text')
                .filter((d, i) => shouldLabel(i, dataMax, dataMin, d.data.value))
                .text(d => `${d.data.label} (${d.data.value})`)
                .attr('transform', function (d) {
                    const pos = outerArc.centroid(d);
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                    pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                    return `translate(${pos})`;
                })
                .style('text-anchor', function (d) {
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                    return (midangle < Math.PI ? 'start' : 'end');
                })
                .attr('font-size', '11px')
                .attr('fill', '#475569')
                .attr('opacity', 0)
                .transition()
                .delay(800)
                .duration(400)
                .attr('opacity', 1);
        }

        if (state.params.annotation.enabled && state.params.annotation.text) {
            const annotationColor = state.params.annotation.honest ? '#059669' : '#dc2626';
            svg.append('text')
                .attr('x', width / 2)
                .attr('y', 20)
                .attr('text-anchor', 'middle')
                .attr('font-size', '13px')
                .attr('font-weight', 600)
                .attr('fill', annotationColor)
                .attr('opacity', 0)
                .text(state.params.annotation.text)
                .transition()
                .delay(400)
                .duration(600)
                .attr('opacity', 1);
        }

    }, [processedData, state.params, width, height, margin]);

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            className="bg-white rounded-lg w-full h-auto"
        />
    );
}
