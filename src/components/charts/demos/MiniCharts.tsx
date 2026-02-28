import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const W = 280;
const H = 170;
const M = { top: 12, right: 12, bottom: 28, left: 48 };
const IW = W - M.left - M.right;
const IH = H - M.top - M.bottom;

const PRIMARY = '#059669';   // brand emerald — src/lib/design-tokens.ts BRAND.primary
const SECONDARY = '#D4913A'; // warm amber — secondary chart color
const ACCENT = '#0891b2';    // section-02 cyan — tertiary multi-series color
const MUTED = '#78716c';     // stone-500 — muted / neutral data
const COLORS = [PRIMARY, SECONDARY, ACCENT, '#a855f7', '#ef4444', MUTED, '#0891b2'];


function useSvg(draw: (svg: d3.Selection<SVGGElement, unknown, null, undefined>) => void) {
    const ref = useRef<SVGSVGElement>(null);
    useEffect(() => {
        if (!ref.current) return;
        const root = d3.select(ref.current);
        root.selectAll('*').remove();
        const g = root.append('g').attr('transform', `translate(${M.left},${M.top})`);
        draw(g);
    });
    return ref;
}

// ── Comparison ────────────────────────────────────────────────────────────────

export function VerticalBarMini() {
    const data = [42, 68, 55, 83, 37, 71, 60];
    const ref = useSvg((g) => {
        const x = d3.scaleBand().domain(data.map((_, i) => String(i))).range([0, IW]).padding(0.25);
        const y = d3.scaleLinear().domain([0, 100]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).tickFormat((d) => ['A', 'B', 'C', 'D', 'E', 'F', 'G'][+d])).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.selectAll('rect').data(data).join('rect').attr('x', (_, i) => x(String(i))!).attr('y', d => y(d)).attr('width', x.bandwidth()).attr('height', d => IH - y(d)).attr('fill', PRIMARY).attr('rx', 2);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function HorizontalBarMini() {
    const data = [{ l: 'Alpha', v: 72 }, { l: 'Beta', v: 55 }, { l: 'Gamma', v: 88 }, { l: 'Delta', v: 43 }, { l: 'Eps', v: 66 }];
    const ref = useSvg((g) => {
        const y = d3.scaleBand().domain(data.map(d => d.l)).range([0, IH]).padding(0.3);
        const x = d3.scaleLinear().domain([0, 100]).range([0, IW]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(4)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').remove()).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.selectAll('rect').data(data).join('rect').attr('y', d => y(d.l)!).attr('x', 0).attr('height', y.bandwidth()).attr('width', d => x(d.v)).attr('fill', PRIMARY).attr('rx', 2);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function GroupedBarMini() {
    const cats = ['Q1', 'Q2', 'Q3', 'Q4'];
    const series = [{ name: 'A', vals: [40, 55, 48, 62] }, { name: 'B', vals: [30, 42, 58, 45] }];
    const ref = useSvg((g) => {
        const x0 = d3.scaleBand().domain(cats).range([0, IW]).padding(0.2);
        const x1 = d3.scaleBand().domain(series.map(s => s.name)).range([0, x0.bandwidth()]).padding(0.05);
        const y = d3.scaleLinear().domain([0, 80]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x0)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        const grp = g.selectAll('g.grp').data(cats).join('g').attr('transform', c => `translate(${x0(c)},0)`);
        series.forEach((s, si) => {
            grp.selectAll(`rect.s${si}`).data([s.vals[cats.indexOf(cats[0])]]).join('rect');
            grp.append('rect').data(cats.map((_, ci) => s.vals[ci])).join('rect').attr('x', () => x1(s.name)!).attr('y', d => y(d)).attr('width', x1.bandwidth()).attr('height', d => IH - y(d)).attr('fill', COLORS[si]).attr('rx', 2);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function StackedBarMini() {
    const cats = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const keys = ['A', 'B', 'C'];
    const raw = [{ A: 30, B: 20, C: 15 }, { A: 25, B: 30, C: 18 }, { A: 40, B: 15, C: 22 }, { A: 35, B: 25, C: 12 }, { A: 28, B: 32, C: 20 }];
    const ref = useSvg((g) => {
        const stack = d3.stack<Record<string, number>>().keys(keys);
        const stacked = stack(raw);
        const x = d3.scaleBand().domain(cats).range([0, IW]).padding(0.2);
        const y = d3.scaleLinear().domain([0, 80]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        stacked.forEach((layer, li) => {
            g.selectAll(`rect.l${li}`).data(layer).join('rect').attr('x', (_, i) => x(cats[i])!).attr('y', d => y(d[1])).attr('height', d => y(d[0]) - y(d[1])).attr('width', x.bandwidth()).attr('fill', COLORS[li]);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function StackedBar100Mini() {
    const cats = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const keys = ['A', 'B', 'C'];
    const raw = [{ A: 30, B: 20, C: 15 }, { A: 25, B: 30, C: 18 }, { A: 40, B: 15, C: 22 }, { A: 35, B: 25, C: 12 }, { A: 28, B: 32, C: 20 }];
    const normed = raw.map(r => { const t = keys.reduce((s, k) => s + r[k as keyof typeof r], 0); return Object.fromEntries(keys.map(k => [k, (r[k as keyof typeof r] / t) * 100])) as Record<string, number>; });
    const ref = useSvg((g) => {
        const stack = d3.stack<Record<string, number>>().keys(keys);
        const stacked = stack(normed);
        const x = d3.scaleBand().domain(cats).range([0, IW]).padding(0.2);
        const y = d3.scaleLinear().domain([0, 100]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4).tickFormat(d => `${d}%`)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        stacked.forEach((layer, li) => {
            g.selectAll(`rect.l${li}`).data(layer).join('rect').attr('x', (_, i) => x(cats[i])!).attr('y', d => y(d[1])).attr('height', d => y(d[0]) - y(d[1])).attr('width', x.bandwidth()).attr('fill', COLORS[li]);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function LollipopMini() {
    const data = [{ l: 'A', v: 42 }, { l: 'B', v: 68 }, { l: 'C', v: 55 }, { l: 'D', v: 83 }, { l: 'E', v: 37 }, { l: 'F', v: 71 }];
    const ref = useSvg((g) => {
        const x = d3.scaleBand().domain(data.map(d => d.l)).range([0, IW]).padding(0.4);
        const y = d3.scaleLinear().domain([0, 100]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        const cx = (d: { l: string }) => x(d.l)! + x.bandwidth() / 2;
        g.selectAll('line.stem').data(data).join('line').attr('x1', cx).attr('x2', cx).attr('y1', IH).attr('y2', d => y(d.v)).attr('stroke', PRIMARY).attr('stroke-width', 2);
        g.selectAll('circle').data(data).join('circle').attr('cx', cx).attr('cy', d => y(d.v)).attr('r', 5).attr('fill', PRIMARY).attr('stroke', 'white').attr('stroke-width', 1.5);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function DotPlotMini() {
    const groups = ['Cat A', 'Cat B', 'Cat C', 'Cat D'];
    const data = groups.flatMap(g => Array.from({ length: 8 }, () => ({ g, v: Math.round(20 + Math.random() * 70) })));
    const ref = useSvg((g) => {
        const y = d3.scaleBand().domain(groups).range([0, IH]).padding(0.3);
        const x = d3.scaleLinear().domain([0, 100]).range([0, IW]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(4)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').remove()).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.selectAll('circle').data(data).join('circle').attr('cx', d => x(d.v)).attr('cy', d => y(d.g)! + y.bandwidth() / 2).attr('r', 3).attr('fill', PRIMARY).attr('fill-opacity', 0.65);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function BulletMini() {
    const items = [{ l: 'Rev', actual: 72, target: 80, poor: 50, ok: 70 }, { l: 'NPS', actual: 58, target: 65, poor: 40, ok: 60 }, { l: 'Cost', actual: 35, target: 30, poor: 55, ok: 40 }];
    const ref = useSvg((g) => {
        const y = d3.scaleBand().domain(items.map(d => d.l)).range([0, IH]).padding(0.35);
        const x = d3.scaleLinear().domain([0, 100]).range([0, IW]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(5)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').remove()).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        items.forEach(d => {
            const bw = y.bandwidth();
            const cy = y(d.l)!;
            g.append('rect').attr('x', 0).attr('y', cy).attr('width', x(100)).attr('height', bw).attr('fill', '#f5f5f4');
            g.append('rect').attr('x', 0).attr('y', cy).attr('width', x(d.ok)).attr('height', bw).attr('fill', '#d6d3d1');
            g.append('rect').attr('x', 0).attr('y', cy).attr('width', x(d.poor)).attr('height', bw).attr('fill', '#a8a29e');
            g.append('rect').attr('x', 0).attr('y', cy + bw * 0.25).attr('width', x(d.actual)).attr('height', bw * 0.5).attr('fill', '#1c1917');
            g.append('line').attr('x1', x(d.target)).attr('x2', x(d.target)).attr('y1', cy + 2).attr('y2', cy + bw - 2).attr('stroke', SECONDARY).attr('stroke-width', 2.5);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function DumbbellMini() {
    const data = [{ l: 'A', v1: 30, v2: 65 }, { l: 'B', v1: 50, v2: 72 }, { l: 'C', v1: 42, v2: 58 }, { l: 'D', v1: 60, v2: 78 }, { l: 'E', v1: 25, v2: 55 }];
    const ref = useSvg((g) => {
        const y = d3.scaleBand().domain(data.map(d => d.l)).range([0, IH]).padding(0.4);
        const x = d3.scaleLinear().domain([0, 100]).range([0, IW]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(4)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').remove()).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        const cy = (d: { l: string }) => y(d.l)! + y.bandwidth() / 2;
        g.selectAll('line.db').data(data).join('line').attr('x1', d => x(d.v1)).attr('x2', d => x(d.v2)).attr('y1', cy).attr('y2', cy).attr('stroke', '#d6d3d1').attr('stroke-width', 2.5);
        g.selectAll('circle.c1').data(data).join('circle').attr('cx', d => x(d.v1)).attr('cy', cy).attr('r', 5).attr('fill', MUTED);
        g.selectAll('circle.c2').data(data).join('circle').attr('cx', d => x(d.v2)).attr('cy', cy).attr('r', 5).attr('fill', PRIMARY);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function ParetoMini() {
    const data = [{ l: 'Defect A', v: 45 }, { l: 'Defect B', v: 28 }, { l: 'Defect C', v: 15 }, { l: 'Defect D', v: 8 }, { l: 'Other', v: 4 }];
    const total = data.reduce((s, d) => s + d.v, 0);
    let cum = 0;
    const withCum = data.map(d => { cum += d.v; return { ...d, cum: (cum / total) * 100 }; });
    const ref = useSvg((g) => {
        const x = d3.scaleBand().domain(data.map(d => d.l)).range([0, IW]).padding(0.15);
        const yL = d3.scaleLinear().domain([0, 50]).range([IH, 0]);
        const yR = d3.scaleLinear().domain([0, 100]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).tickFormat(d => String(d).slice(0, 3))).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '8'));
        g.append('g').call(d3.axisLeft(yL).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.selectAll('rect').data(data).join('rect').attr('x', d => x(d.l)!).attr('y', d => yL(d.v)).attr('width', x.bandwidth()).attr('height', d => IH - yL(d.v)).attr('fill', PRIMARY).attr('rx', 2);
        const line = d3.line<{ l: string; cum: number }>().x(d => x(d.l)! + x.bandwidth() / 2).y(d => yR(d.cum));
        g.append('path').datum(withCum).attr('d', line).attr('fill', 'none').attr('stroke', SECONDARY).attr('stroke-width', 2);
        g.selectAll('circle.p').data(withCum).join('circle').attr('cx', d => x(d.l)! + x.bandwidth() / 2).attr('cy', d => yR(d.cum)).attr('r', 3).attr('fill', SECONDARY);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

// ── Time Series ───────────────────────────────────────────────────────────────

const timeDates = d3.range(20).map(i => new Date(2023, 0, i + 1));

export function LineMini() {
    const vals = [40, 44, 42, 50, 55, 52, 60, 63, 58, 65, 70, 68, 74, 72, 78, 80, 75, 82, 85, 88];
    const ref = useSvg((g) => {
        const x = d3.scaleTime().domain(d3.extent(timeDates) as [Date, Date]).range([0, IW]);
        const y = d3.scaleLinear().domain([35, 95]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(4).tickFormat(d3.timeFormat('%b %d') as (d: Date | d3.NumberValue) => string)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '8'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        const line = d3.line<number>().x((_, i) => x(timeDates[i])).y(d => y(d)).curve(d3.curveCatmullRom);
        g.append('path').datum(vals).attr('d', line).attr('fill', 'none').attr('stroke', PRIMARY).attr('stroke-width', 2);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function MultiLineMini() {
    const series = [
        { name: 'A', vals: [40, 44, 42, 50, 55, 52, 60, 63, 58, 65, 70, 68, 74, 72, 78, 80, 75, 82, 85, 88] },
        { name: 'B', vals: [60, 58, 62, 55, 57, 60, 52, 48, 54, 50, 45, 48, 42, 44, 40, 38, 42, 36, 34, 30] },
        { name: 'C', vals: [50, 52, 54, 53, 55, 57, 56, 58, 60, 59, 61, 63, 62, 64, 65, 64, 66, 67, 68, 70] },
    ];
    const ref = useSvg((g) => {
        const x = d3.scaleTime().domain(d3.extent(timeDates) as [Date, Date]).range([0, IW]);
        const y = d3.scaleLinear().domain([25, 95]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(4).tickFormat(d3.timeFormat('%b %d') as (d: Date | d3.NumberValue) => string)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '8'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        const line = (vals: number[]) => d3.line<number>().x((_, i) => x(timeDates[i])).y(d => y(d)).curve(d3.curveCatmullRom)(vals);
        series.forEach((s, si) => {
            g.append('path').attr('d', line(s.vals)!).attr('fill', 'none').attr('stroke', COLORS[si]).attr('stroke-width', 1.8);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function AreaMini() {
    const vals = [40, 44, 42, 50, 55, 52, 60, 63, 58, 65, 70, 68, 74, 72, 78, 80, 75, 82, 85, 88];
    const ref = useSvg((g) => {
        const x = d3.scaleTime().domain(d3.extent(timeDates) as [Date, Date]).range([0, IW]);
        const y = d3.scaleLinear().domain([35, 95]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(4).tickFormat(d3.timeFormat('%b %d') as (d: Date | d3.NumberValue) => string)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '8'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        const area = d3.area<number>().x((_, i) => x(timeDates[i])).y0(IH).y1(d => y(d)).curve(d3.curveCatmullRom);
        const line = d3.line<number>().x((_, i) => x(timeDates[i])).y(d => y(d)).curve(d3.curveCatmullRom);
        g.append('path').datum(vals).attr('d', area).attr('fill', PRIMARY).attr('fill-opacity', 0.15);
        g.append('path').datum(vals).attr('d', line).attr('fill', 'none').attr('stroke', PRIMARY).attr('stroke-width', 2);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function StackedAreaMini() {
    const keys = ['A', 'B', 'C'];
    const raw = timeDates.map((_, i) => ({ A: 20 + i, B: 15 + Math.sin(i * 0.5) * 5, C: 10 + Math.cos(i * 0.3) * 4 }));
    const ref = useSvg((g) => {
        const stack = d3.stack<Record<string, number>>().keys(keys);
        const stacked = stack(raw);
        const x = d3.scaleTime().domain(d3.extent(timeDates) as [Date, Date]).range([0, IW]);
        const y = d3.scaleLinear().domain([0, 60]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(4).tickFormat(d3.timeFormat('%b %d') as (d: Date | d3.NumberValue) => string)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '8'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        const areaFn = d3.area<d3.SeriesPoint<Record<string, number>>>().x((_, i) => x(timeDates[i])).y0(d => y(d[0])).y1(d => y(d[1])).curve(d3.curveCatmullRom);
        stacked.forEach((layer, li) => {
            g.append('path').datum(layer).attr('d', areaFn).attr('fill', COLORS[li]).attr('fill-opacity', 0.75);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function StepMini() {
    const vals = [40, 40, 55, 55, 55, 70, 70, 62, 62, 80, 80, 80, 68, 68, 85, 85, 85, 90, 90, 90];
    const ref = useSvg((g) => {
        const x = d3.scaleTime().domain(d3.extent(timeDates) as [Date, Date]).range([0, IW]);
        const y = d3.scaleLinear().domain([35, 98]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(4).tickFormat(d3.timeFormat('%b %d') as (d: Date | d3.NumberValue) => string)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '8'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        const line = d3.line<number>().x((_, i) => x(timeDates[i])).y(d => y(d)).curve(d3.curveStepAfter);
        g.append('path').datum(vals).attr('d', line).attr('fill', 'none').attr('stroke', PRIMARY).attr('stroke-width', 2);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function StreamgraphMini() {
    const keys = ['A', 'B', 'C', 'D'];
    const raw = timeDates.map((_, i) => ({ A: 10 + Math.sin(i * 0.4) * 8, B: 12 + Math.cos(i * 0.5) * 6, C: 8 + Math.sin(i * 0.6 + 1) * 7, D: 11 + Math.cos(i * 0.3 + 2) * 5 }));
    const ref = useSvg((g) => {
        const stack = d3.stack<Record<string, number>>().keys(keys).offset(d3.stackOffsetWiggle).order(d3.stackOrderInsideOut);
        const stacked = stack(raw);
        const x = d3.scaleTime().domain(d3.extent(timeDates) as [Date, Date]).range([0, IW]);
        const y = d3.scaleLinear().domain([-25, 35]).range([IH, 0]);
        const areaFn = d3.area<d3.SeriesPoint<Record<string, number>>>().x((_, i) => x(timeDates[i])).y0(d => y(d[0])).y1(d => y(d[1])).curve(d3.curveCatmullRom);
        stacked.forEach((layer, li) => {
            g.append('path').datum(layer).attr('d', areaFn).attr('fill', COLORS[li]).attr('fill-opacity', 0.8);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function BumpMini() {
    const teams = ['Alpha', 'Beta', 'Gamma', 'Delta'];
    const data = [
        [1, 3, 2, 4], [2, 1, 3, 4], [1, 2, 4, 3], [3, 1, 2, 4], [2, 3, 1, 4],
    ];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const ref = useSvg((g) => {
        const x = d3.scalePoint().domain(months).range([0, IW]).padding(0.2);
        const y = d3.scaleLinear().domain([0.5, 4.5]).range([0, IH]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).tickValues([1, 2, 3, 4]).tickFormat(d => `#${d}`)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        teams.forEach((_t, ti) => {
            const pts = months.map((m, mi) => ({ m, r: data[mi][ti] }));
            const line = d3.line<{ m: string; r: number }>().x(d => x(d.m)!).y(d => y(d.r)).curve(d3.curveBumpX);
            g.append('path').datum(pts).attr('d', line).attr('fill', 'none').attr('stroke', COLORS[ti]).attr('stroke-width', 2);
            g.selectAll(`circle.t${ti}`).data(pts).join('circle').attr('cx', d => x(d.m)!).attr('cy', d => y(d.r)).attr('r', 4).attr('fill', COLORS[ti]).attr('stroke', 'white').attr('stroke-width', 1.5);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function SparklineMini() {
    const lines = [
        { c: PRIMARY, vals: [40, 44, 42, 50, 55, 52, 60, 63, 58, 65, 70, 68, 74, 72, 78, 80, 75, 82, 85, 88] },
        { c: SECONDARY, vals: [60, 58, 62, 55, 57, 60, 52, 48, 54, 50, 45, 48, 42, 44, 40, 38, 42, 36, 34, 30] },
        { c: ACCENT, vals: [50, 52, 54, 53, 55, 57, 56, 58, 60, 59, 61, 63, 62, 64, 65, 64, 66, 67, 68, 70] },
    ];
    const metrics = ['Revenue', 'Cost', 'Margin'];
    const ref = useSvg((g) => {
        const rowH = IH / 3;
        lines.forEach((series, si) => {
            const y = d3.scaleLinear().domain([d3.min(series.vals)! - 5, d3.max(series.vals)! + 5]).range([rowH - 8, 8]);
            const x = d3.scaleLinear().domain([0, 19]).range([40, IW]);
            const grp = g.append('g').attr('transform', `translate(0,${si * rowH})`);
            grp.append('text').text(metrics[si]).attr('x', 0).attr('y', rowH / 2 + 4).attr('font-size', 9).attr('fill', '#78716c');
            const line = d3.line<number>().x((_, i) => x(i)).y(d => y(d)).curve(d3.curveCatmullRom);
            grp.append('path').datum(series.vals).attr('d', line).attr('fill', 'none').attr('stroke', series.c).attr('stroke-width', 1.5);
            grp.append('circle').attr('cx', x(19)).attr('cy', y(series.vals[19])).attr('r', 3).attr('fill', series.c);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function CandlestickMini() {
    const data = d3.range(15).map(i => {
        const open = 50 + Math.sin(i * 0.8) * 15;
        const close = open + (Math.random() - 0.48) * 12;
        const high = Math.max(open, close) + Math.random() * 5;
        const low = Math.min(open, close) - Math.random() * 5;
        return { i, open, close, high, low };
    });
    const ref = useSvg((g) => {
        const x = d3.scaleBand().domain(data.map(d => String(d.i))).range([0, IW]).padding(0.2);
        const y = d3.scaleLinear().domain([25, 85]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).tickValues(['0', '4', '9', '14'])).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        data.forEach(d => {
            const cx = x(String(d.i))! + x.bandwidth() / 2;
            const color = d.close >= d.open ? PRIMARY : '#ef4444';
            g.append('line').attr('x1', cx).attr('x2', cx).attr('y1', y(d.high)).attr('y2', y(d.low)).attr('stroke', color).attr('stroke-width', 1);
            g.append('rect').attr('x', x(String(d.i))!).attr('y', y(Math.max(d.open, d.close))).attr('width', x.bandwidth()).attr('height', Math.abs(y(d.open) - y(d.close))).attr('fill', color);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function OHLCMini() {
    const data = d3.range(15).map(i => {
        const open = 50 + Math.cos(i * 0.7) * 12;
        const close = open + (Math.random() - 0.48) * 10;
        const high = Math.max(open, close) + Math.random() * 4;
        const low = Math.min(open, close) - Math.random() * 4;
        return { i, open, close, high, low };
    });
    const ref = useSvg((g) => {
        const x = d3.scaleBand().domain(data.map(d => String(d.i))).range([0, IW]).padding(0.2);
        const y = d3.scaleLinear().domain([28, 78]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).tickValues(['0', '4', '9', '14'])).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        data.forEach(d => {
            const cx = x(String(d.i))! + x.bandwidth() / 2;
            const color = d.close >= d.open ? PRIMARY : '#ef4444';
            const t = x.bandwidth() / 2;
            g.append('line').attr('x1', cx).attr('x2', cx).attr('y1', y(d.high)).attr('y2', y(d.low)).attr('stroke', color).attr('stroke-width', 1.5);
            g.append('line').attr('x1', cx - t).attr('x2', cx).attr('y1', y(d.open)).attr('y2', y(d.open)).attr('stroke', color).attr('stroke-width', 1.5);
            g.append('line').attr('x1', cx).attr('x2', cx + t).attr('y1', y(d.close)).attr('y2', y(d.close)).attr('stroke', color).attr('stroke-width', 1.5);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

// ── Distribution ──────────────────────────────────────────────────────────────

export function HistogramMini() {
    const vals = Array.from({ length: 80 }, () => d3.randomNormal(50, 15)());
    const ref = useSvg((g) => {
        const x = d3.scaleLinear().domain([0, 100]).range([0, IW]);
        const bins = d3.bin().domain([0, 100]).thresholds(12)(vals);
        const y = d3.scaleLinear().domain([0, d3.max(bins, b => b.length)!]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(5)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.selectAll('rect').data(bins).join('rect').attr('x', d => x(d.x0!)).attr('y', d => y(d.length)).attr('width', d => Math.max(0, x(d.x1!) - x(d.x0!) - 1)).attr('height', d => IH - y(d.length)).attr('fill', PRIMARY).attr('fill-opacity', 0.8);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function BoxplotMini() {
    const groups = ['A', 'B', 'C', 'D'];
    const makeStats = (mu: number) => {
        const vals = Array.from({ length: 50 }, () => mu + (Math.random() - 0.5) * 40);
        vals.sort(d3.ascending);
        return { q1: d3.quantile(vals, 0.25)!, med: d3.quantile(vals, 0.5)!, q3: d3.quantile(vals, 0.75)!, min: d3.min(vals)!, max: d3.max(vals)! };
    };
    const stats = [makeStats(40), makeStats(55), makeStats(70), makeStats(50)];
    const ref = useSvg((g) => {
        const x = d3.scaleBand().domain(groups).range([0, IW]).padding(0.3);
        const y = d3.scaleLinear().domain([5, 95]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        groups.forEach((grp, gi) => {
            const s = stats[gi];
            const cx = x(grp)! + x.bandwidth() / 2;
            const bw = x.bandwidth();
            g.append('line').attr('x1', cx).attr('x2', cx).attr('y1', y(s.min)).attr('y2', y(s.q1)).attr('stroke', MUTED).attr('stroke-width', 1.5);
            g.append('line').attr('x1', cx).attr('x2', cx).attr('y1', y(s.q3)).attr('y2', y(s.max)).attr('stroke', MUTED).attr('stroke-width', 1.5);
            g.append('rect').attr('x', x(grp)!).attr('y', y(s.q3)).attr('width', bw).attr('height', y(s.q1) - y(s.q3)).attr('fill', PRIMARY).attr('fill-opacity', 0.25).attr('stroke', PRIMARY).attr('stroke-width', 1.5).attr('rx', 2);
            g.append('line').attr('x1', x(grp)!).attr('x2', x(grp)! + bw).attr('y1', y(s.med)).attr('y2', y(s.med)).attr('stroke', PRIMARY).attr('stroke-width', 2.5);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function ViolinMini() {
    const groups = ['A', 'B', 'C'];
    const makeVals = (mu: number) => Array.from({ length: 60 }, () => mu + (Math.random() - 0.5) * 40);
    const allVals = [makeVals(40), makeVals(60), makeVals(50)];
    const ref = useSvg((g) => {
        const x = d3.scaleBand().domain(groups).range([0, IW]).padding(0.25);
        const y = d3.scaleLinear().domain([5, 95]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        groups.forEach((grp, gi) => {
            const vals = allVals[gi];
            const kde = (kernel: (v: number) => number, thresholds: number[], data: number[]) =>
                thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))!] as [number, number]);
            const epanechnikov = (bw: number) => (v: number) => Math.abs(v /= bw) <= 1 ? 0.75 * (1 - v * v) / bw : 0;
            const thresholds = d3.range(5, 95, 2);
            const density = kde(epanechnikov(10), thresholds, vals);
            const maxD = d3.max(density, d => d[1])!;
            const hw = x.bandwidth() / 2;
            const cx = x(grp)! + hw;
            const xScale = d3.scaleLinear().domain([0, maxD]).range([0, hw * 0.85]);
            const area = d3.area<[number, number]>().x0(d => cx - xScale(d[1])).x1(d => cx + xScale(d[1])).y(d => y(d[0])).curve(d3.curveCatmullRom);
            g.append('path').datum(density).attr('d', area).attr('fill', COLORS[gi]).attr('fill-opacity', 0.5).attr('stroke', COLORS[gi]).attr('stroke-width', 1);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function StripPlotMini() {
    const groups = ['A', 'B', 'C', 'D'];
    const data = groups.flatMap(grp => Array.from({ length: 15 }, () => ({ grp, v: 20 + Math.random() * 70 })));
    const ref = useSvg((g) => {
        const x = d3.scaleBand().domain(groups).range([0, IW]).padding(0.3);
        const y = d3.scaleLinear().domain([15, 95]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.selectAll('circle').data(data).join('circle').attr('cx', d => x(d.grp)! + x.bandwidth() / 2 + (Math.random() - 0.5) * x.bandwidth() * 0.6).attr('cy', d => y(d.v)).attr('r', 3).attr('fill', PRIMARY).attr('fill-opacity', 0.55);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function RugPlotMini() {
    const vals = Array.from({ length: 60 }, () => d3.randomNormal(50, 15)()).filter(v => v > 5 && v < 95);
    const ref = useSvg((g) => {
        const x = d3.scaleLinear().domain([0, 100]).range([0, IW]);
        const y = d3.scaleLinear().domain([0, 0.05]).range([IH, 0]);
        const thresholds = d3.range(0, 100, 2);
        const epan = (bw: number) => (v: number) => Math.abs(v /= bw) <= 1 ? 0.75 * (1 - v * v) / bw : 0;
        const kde = (kernel: (v: number) => number, ths: number[], data: number[]) =>
            ths.map(t => ({ t, d: d3.mean(data, d => kernel(t - d))! }));
        const density = kde(epan(8), thresholds, vals);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(5)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        const line = d3.line<{ t: number; d: number }>().x(d => x(d.t)).y(d => y(d.d)).curve(d3.curveCatmullRom);
        g.append('path').datum(density).attr('d', line).attr('fill', 'none').attr('stroke', PRIMARY).attr('stroke-width', 2);
        g.selectAll('line.rug').data(vals).join('line').attr('x1', d => x(d)).attr('x2', d => x(d)).attr('y1', IH - 8).attr('y2', IH).attr('stroke', PRIMARY).attr('stroke-width', 1).attr('stroke-opacity', 0.5);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function DensityMini() {
    const series = [
        { c: PRIMARY, vals: Array.from({ length: 60 }, () => d3.randomNormal(40, 12)()) },
        { c: SECONDARY, vals: Array.from({ length: 60 }, () => d3.randomNormal(65, 10)()) },
    ];
    const ref = useSvg((g) => {
        const x = d3.scaleLinear().domain([0, 100]).range([0, IW]);
        const epan = (bw: number) => (v: number) => Math.abs(v /= bw) <= 1 ? 0.75 * (1 - v * v) / bw : 0;
        const thresholds = d3.range(0, 100, 1.5);
        const kde = (kernel: (v: number) => number, ths: number[], data: number[]) =>
            ths.map(t => [t, d3.mean(data, d => kernel(t - d))!] as [number, number]);
        const densities = series.map(s => kde(epan(8), thresholds, s.vals));
        const maxD = d3.max(densities.flat(), d => d[1])!;
        const y = d3.scaleLinear().domain([0, maxD * 1.1]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(5)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        series.forEach((s, si) => {
            const areaFn = d3.area<[number, number]>().x(d => x(d[0])).y0(IH).y1(d => y(d[1])).curve(d3.curveCatmullRom);
            g.append('path').datum(densities[si]).attr('d', areaFn).attr('fill', s.c).attr('fill-opacity', 0.25).attr('stroke', s.c).attr('stroke-width', 1.8);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function ECDFMini() {
    const groups = [
        { c: PRIMARY, vals: Array.from({ length: 40 }, () => d3.randomNormal(40, 12)()).sort(d3.ascending) },
        { c: SECONDARY, vals: Array.from({ length: 40 }, () => d3.randomNormal(65, 10)()).sort(d3.ascending) },
    ];
    const ref = useSvg((g) => {
        const x = d3.scaleLinear().domain([5, 95]).range([0, IW]);
        const y = d3.scaleLinear().domain([0, 1]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(5)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4).tickFormat(d => `${+d * 100}%`)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        groups.forEach(grp => {
            const pts = grp.vals.map((v, i) => ({ v, p: (i + 1) / grp.vals.length }));
            const line = d3.line<{ v: number; p: number }>().x(d => x(d.v)).y(d => y(d.p)).curve(d3.curveStepAfter);
            g.append('path').datum(pts).attr('d', line).attr('fill', 'none').attr('stroke', grp.c).attr('stroke-width', 2);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

// ── Relationship ──────────────────────────────────────────────────────────────

export function ScatterMini() {
    const data = Array.from({ length: 40 }, () => ({ x: 10 + Math.random() * 80, y: 10 + Math.random() * 80 }));
    const ref = useSvg((g) => {
        const x = d3.scaleLinear().domain([0, 100]).range([0, IW]);
        const y = d3.scaleLinear().domain([0, 100]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(4)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.selectAll('circle').data(data).join('circle').attr('cx', d => x(d.x)).attr('cy', d => y(d.y)).attr('r', 4).attr('fill', PRIMARY).attr('fill-opacity', 0.6);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function BubbleMini() {
    const data = Array.from({ length: 18 }, () => ({ x: 10 + Math.random() * 80, y: 10 + Math.random() * 80, r: 3 + Math.random() * 15 }));
    const ref = useSvg((g) => {
        const x = d3.scaleLinear().domain([0, 100]).range([0, IW]);
        const y = d3.scaleLinear().domain([0, 100]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(4)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.selectAll('circle').data(data).join('circle').attr('cx', d => x(d.x)).attr('cy', d => y(d.y)).attr('r', d => d.r).attr('fill', PRIMARY).attr('fill-opacity', 0.4).attr('stroke', PRIMARY).attr('stroke-width', 1).attr('stroke-opacity', 0.7);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function RegressionMini() {
    const raw = Array.from({ length: 35 }, () => ({ x: 10 + Math.random() * 80 })).map(d => ({ ...d, y: d.x * 0.7 + 10 + (Math.random() - 0.5) * 25 }));
    const ref = useSvg((g) => {
        const x = d3.scaleLinear().domain([0, 100]).range([0, IW]);
        const y = d3.scaleLinear().domain([0, 90]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(4)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.selectAll('circle').data(raw).join('circle').attr('cx', d => x(d.x)).attr('cy', d => y(d.y)).attr('r', 3.5).attr('fill', MUTED).attr('fill-opacity', 0.5);
        const n = raw.length;
        const meanX = d3.mean(raw, d => d.x)!;
        const meanY = d3.mean(raw, d => d.y)!;
        const slope = raw.reduce((s, d) => s + (d.x - meanX) * (d.y - meanY), 0) / raw.reduce((s, d) => s + (d.x - meanX) ** 2, 0);
        const intercept = meanY - slope * meanX;
        g.append('line').attr('x1', x(5)).attr('x2', x(95)).attr('y1', y(5 * slope + intercept)).attr('y2', y(95 * slope + intercept)).attr('stroke', PRIMARY).attr('stroke-width', 2).attr('stroke-dasharray', '4,2');
        void n;
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function ConnectedScatterMini() {
    const pts = Array.from({ length: 12 }, (_, i) => ({ x: 10 + i * 6 + (Math.random() - 0.5) * 8, y: 20 + i * 4 + (Math.random() - 0.5) * 15 }));
    const ref = useSvg((g) => {
        const x = d3.scaleLinear().domain([0, 90]).range([0, IW]);
        const y = d3.scaleLinear().domain([10, 80]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(4)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        const line = d3.line<{ x: number; y: number }>().x(d => x(d.x)).y(d => y(d.y)).curve(d3.curveCatmullRom);
        g.append('path').datum(pts).attr('d', line).attr('fill', 'none').attr('stroke', PRIMARY).attr('stroke-width', 1.5).attr('stroke-opacity', 0.5);
        g.selectAll('circle').data(pts).join('circle').attr('cx', d => x(d.x)).attr('cy', d => y(d.y)).attr('r', 4).attr('fill', PRIMARY).attr('fill-opacity', 0.7);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function HexbinMini() {
    const data = Array.from({ length: 80 }, () => [10 + Math.random() * 80, 10 + Math.random() * 80] as [number, number]);
    const ref = useSvg((g) => {
        const x = d3.scaleLinear().domain([0, 100]).range([0, IW]);
        const y = d3.scaleLinear().domain([0, 100]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(4)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        // Manual hexbin approximation using grid
        const cellSize = 18;
        const cells = new Map<string, number>();
        data.forEach(([px, py]) => {
            const col = Math.floor(x(px) / cellSize);
            const row = Math.floor(y(py) / cellSize);
            const key = `${col},${row}`;
            cells.set(key, (cells.get(key) || 0) + 1);
        });
        const maxCount = d3.max([...cells.values()])!;
        const color = d3.scaleSequential(d3.interpolateGreens).domain([0, maxCount]);
        cells.forEach((count, key) => {
            const [col, row] = key.split(',').map(Number);
            g.append('rect').attr('x', col * cellSize).attr('y', row * cellSize).attr('width', cellSize - 1).attr('height', cellSize - 1).attr('fill', color(count)).attr('rx', 2);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function HeatmapMini() {
    const rows = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const cols = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm'];
    const data = rows.flatMap(r => cols.map(c => ({ r, c, v: Math.random() })));
    const ref = useSvg((g) => {
        const x = d3.scaleBand().domain(cols).range([0, IW]).padding(0.05);
        const y = d3.scaleBand().domain(rows).range([0, IH]).padding(0.05);
        const color = d3.scaleSequential(d3.interpolateYlGn).domain([0, 1]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').remove()).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '8'));
        g.append('g').call(d3.axisLeft(y)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').remove()).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.selectAll('rect').data(data).join('rect').attr('x', d => x(d.c)!).attr('y', d => y(d.r)!).attr('width', x.bandwidth()).attr('height', y.bandwidth()).attr('fill', d => color(d.v)).attr('rx', 2);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

// ── Composition ───────────────────────────────────────────────────────────────

export function PieMini() {
    const data = [{ l: 'A', v: 35 }, { l: 'B', v: 25 }, { l: 'C', v: 20 }, { l: 'D', v: 12 }, { l: 'E', v: 8 }];
    const ref = useSvg((g) => {
        const cx = IW / 2, cy = IH / 2, r = Math.min(IW, IH) / 2 - 8;
        const pie = d3.pie<{ l: string; v: number }>().value(d => d.v);
        const arc = d3.arc<d3.PieArcDatum<{ l: string; v: number }>>().innerRadius(0).outerRadius(r);
        g.selectAll('path').data(pie(data)).join('path').attr('transform', `translate(${cx},${cy})`).attr('d', arc).attr('fill', (_, i) => COLORS[i]).attr('stroke', 'white').attr('stroke-width', 1.5);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function DonutMini() {
    const data = [{ l: 'A', v: 35 }, { l: 'B', v: 25 }, { l: 'C', v: 20 }, { l: 'D', v: 12 }, { l: 'E', v: 8 }];
    const ref = useSvg((g) => {
        const cx = IW / 2, cy = IH / 2;
        const r = Math.min(IW, IH) / 2 - 8;
        const pie = d3.pie<{ l: string; v: number }>().value(d => d.v);
        const arc = d3.arc<d3.PieArcDatum<{ l: string; v: number }>>().innerRadius(r * 0.55).outerRadius(r);
        g.selectAll('path').data(pie(data)).join('path').attr('transform', `translate(${cx},${cy})`).attr('d', arc).attr('fill', (_, i) => COLORS[i]).attr('stroke', 'white').attr('stroke-width', 1.5);
        g.append('text').attr('x', cx).attr('y', cy + 4).attr('text-anchor', 'middle').attr('font-size', 11).attr('font-weight', 'bold').attr('fill', '#44403c').text('100');
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function TreemapMini() {
    const data = {
        name: 'root', children: [
            { name: 'A', value: 40 }, { name: 'B', value: 28 }, { name: 'C', value: 18 },
            { name: 'D', value: 12 }, { name: 'E', value: 10 }, { name: 'F', value: 8 },
        ]
    };
    const ref = useSvg((g) => {
        const root = d3.hierarchy(data).sum(d => (d as { value?: number }).value || 0);
        d3.treemap<typeof data>().size([IW, IH]).padding(2)(root);
        g.selectAll('rect').data(root.leaves()).join('rect')
            .attr('x', d => (d as d3.HierarchyRectangularNode<typeof data>).x0)
            .attr('y', d => (d as d3.HierarchyRectangularNode<typeof data>).y0)
            .attr('width', d => (d as d3.HierarchyRectangularNode<typeof data>).x1 - (d as d3.HierarchyRectangularNode<typeof data>).x0)
            .attr('height', d => (d as d3.HierarchyRectangularNode<typeof data>).y1 - (d as d3.HierarchyRectangularNode<typeof data>).y0)
            .attr('fill', (_, i) => COLORS[i % COLORS.length]).attr('rx', 3);
        g.selectAll('text.tm').data(root.leaves()).join('text')
            .attr('x', d => (d as d3.HierarchyRectangularNode<typeof data>).x0 + 4)
            .attr('y', d => (d as d3.HierarchyRectangularNode<typeof data>).y0 + 13)
            .attr('font-size', 9).attr('fill', 'white').attr('font-weight', 'bold')
            .text(d => d.data.name);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function SunburstMini() {
    const data = {
        name: 'root', children: [
            { name: 'A', children: [{ name: 'A1', value: 20 }, { name: 'A2', value: 15 }] },
            { name: 'B', children: [{ name: 'B1', value: 18 }, { name: 'B2', value: 12 }] },
            { name: 'C', value: 25 },
        ]
    };
    const ref = useSvg((g) => {
        const cx = IW / 2, cy = IH / 2;
        const r = Math.min(IW, IH) / 2 - 6;
        const root = d3.hierarchy(data).sum(d => (d as { value?: number }).value || 0);
        const partition = d3.partition<typeof data>().size([2 * Math.PI, r]);
        partition(root);
        const arc = d3.arc<d3.HierarchyRectangularNode<typeof data>>()
            .startAngle(d => d.x0).endAngle(d => d.x1)
            .innerRadius(d => d.y0).outerRadius(d => d.y1);
        g.selectAll('path').data(root.descendants().filter(d => d.depth > 0)).join('path')
            .attr('transform', `translate(${cx},${cy})`)
            .attr('d', d => arc(d as d3.HierarchyRectangularNode<typeof data>))
            .attr('fill', (_d, i) => COLORS[i % COLORS.length]).attr('stroke', 'white').attr('stroke-width', 1);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function WaffleMini() {
    const total = 100;
    const filled = 62;
    const ref = useSvg((g) => {
        const cols = 10, rows = 10;
        const size = Math.min(IW / cols, IH / rows) - 1;
        const offsetX = (IW - cols * (size + 1)) / 2;
        const offsetY = (IH - rows * (size + 1)) / 2;
        d3.range(total).forEach(i => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            g.append('rect')
                .attr('x', offsetX + col * (size + 1))
                .attr('y', offsetY + row * (size + 1))
                .attr('width', size).attr('height', size)
                .attr('fill', i < filled ? PRIMARY : '#e7e5e4').attr('rx', 1);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function MosaicMini() {
    const data = [
        { cat: 'A', sub: 'X', v: 30 }, { cat: 'A', sub: 'Y', v: 20 },
        { cat: 'B', sub: 'X', v: 25 }, { cat: 'B', sub: 'Y', v: 35 },
        { cat: 'C', sub: 'X', v: 15 }, { cat: 'C', sub: 'Y', v: 25 },
    ];
    const cats = ['A', 'B', 'C'];
    const totalByCat = cats.map(c => ({ c, t: data.filter(d => d.cat === c).reduce((s, d) => s + d.v, 0) }));
    const grandTotal = data.reduce((s, d) => s + d.v, 0);
    const ref = useSvg((g) => {
        let xOffset = 0;
        cats.forEach((cat, ci) => {
            const catData = data.filter(d => d.cat === cat);
            const catTotal = totalByCat[ci].t;
            const catW = (catTotal / grandTotal) * IW;
            let yOffset = 0;
            catData.forEach((d, di) => {
                const cellH = (d.v / catTotal) * IH;
                g.append('rect').attr('x', xOffset + 1).attr('y', yOffset + 1).attr('width', catW - 2).attr('height', cellH - 2).attr('fill', COLORS[(ci * 2 + di) % COLORS.length]).attr('fill-opacity', 0.8).attr('rx', 2);
                yOffset += cellH;
            });
            xOffset += catW;
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function WaterfallMini() {
    const items = [
        { l: 'Start', v: 100, start: 0, isTotal: false },
        { l: '+Rev', v: 45, start: 100, isTotal: false },
        { l: '-Cost', v: -30, start: 145, isTotal: false },
        { l: '+Other', v: 15, start: 115, isTotal: false },
        { l: '-Tax', v: -20, start: 130, isTotal: false },
        { l: 'End', v: 110, start: 0, isTotal: true },
    ];
    const endVal = items.slice(0, -1).reduce((s, d) => s + d.v, 0);
    items[items.length - 1].v = endVal;
    const ref = useSvg((g) => {
        const x = d3.scaleBand().domain(items.map(d => d.l)).range([0, IW]).padding(0.2);
        const y = d3.scaleLinear().domain([0, 180]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '8'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        items.forEach(d => {
            const top = d.isTotal ? y(d.v) : (d.v >= 0 ? y(d.start + d.v) : y(d.start));
            const h = d.isTotal ? IH - y(d.v) : Math.abs(y(0) - y(Math.abs(d.v)));
            const color = d.isTotal ? MUTED : d.v >= 0 ? PRIMARY : '#ef4444';
            g.append('rect').attr('x', x(d.l)!).attr('y', top).attr('width', x.bandwidth()).attr('height', h).attr('fill', color).attr('rx', 2);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

// ── Hierarchy ─────────────────────────────────────────────────────────────────

export function TreeDiagramMini() {
    const data = {
        name: 'Root', children: [
            { name: 'A', children: [{ name: 'A1' }, { name: 'A2' }] },
            { name: 'B', children: [{ name: 'B1' }, { name: 'B2' }, { name: 'B3' }] },
            { name: 'C', children: [{ name: 'C1' }] },
        ]
    };
    const ref = useSvg((g) => {
        const root = d3.hierarchy(data);
        const treeLayout = d3.tree<typeof data>().size([IH, IW - 20]);
        treeLayout(root);
        g.selectAll('path.link').data(root.links()).join('path')
            .attr('d', d3.linkHorizontal<d3.HierarchyLink<typeof data>, d3.HierarchyPointNode<typeof data>>().x(n => n.y).y(n => n.x))
            .attr('fill', 'none').attr('stroke', '#d6d3d1').attr('stroke-width', 1.5);
        g.selectAll('circle').data(root.descendants()).join('circle')
            .attr('cx', d => (d as d3.HierarchyPointNode<typeof data>).y)
            .attr('cy', d => (d as d3.HierarchyPointNode<typeof data>).x)
            .attr('r', 5).attr('fill', PRIMARY).attr('stroke', 'white').attr('stroke-width', 1.5);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function DendrogramMini() {
    const data = {
        name: 'Root', children: [
            { name: 'Cluster 1', children: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] },
            { name: 'Cluster 2', children: [{ name: 'd' }, { name: 'e' }] },
            { name: 'Cluster 3', children: [{ name: 'f' }, { name: 'g' }, { name: 'h' }] },
        ]
    };
    const ref = useSvg((g) => {
        const root = d3.hierarchy(data);
        const cluster = d3.cluster<typeof data>().size([IH, IW - 30]);
        cluster(root);
        g.selectAll('path.link').data(root.links()).join('path')
            .attr('d', d3.linkHorizontal<d3.HierarchyLink<typeof data>, d3.HierarchyPointNode<typeof data>>().x(n => n.y).y(n => n.x))
            .attr('fill', 'none').attr('stroke', '#d6d3d1').attr('stroke-width', 1.5);
        g.selectAll('circle').data(root.descendants()).join('circle')
            .attr('cx', d => (d as d3.HierarchyPointNode<typeof data>).y)
            .attr('cy', d => (d as d3.HierarchyPointNode<typeof data>).x)
            .attr('r', d => d.children ? 4 : 3)
            .attr('fill', d => d.children ? SECONDARY : PRIMARY)
            .attr('stroke', 'white').attr('stroke-width', 1.5);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function IcicleMini() {
    const data = {
        name: 'root', children: [
            { name: 'A', children: [{ name: 'A1', value: 20 }, { name: 'A2', value: 15 }] },
            { name: 'B', children: [{ name: 'B1', value: 18 }, { name: 'B2', value: 12 }] },
            { name: 'C', value: 25 },
        ]
    };
    const ref = useSvg((g) => {
        const root = d3.hierarchy(data).sum(d => (d as { value?: number }).value || 0);
        const partition = d3.partition<typeof data>().size([IH, IW]);
        partition(root);
        g.selectAll('rect').data(root.descendants()).join('rect')
            .attr('x', d => (d as d3.HierarchyRectangularNode<typeof data>).y0)
            .attr('y', d => (d as d3.HierarchyRectangularNode<typeof data>).x0)
            .attr('width', d => (d as d3.HierarchyRectangularNode<typeof data>).y1 - (d as d3.HierarchyRectangularNode<typeof data>).y0 - 1)
            .attr('height', d => (d as d3.HierarchyRectangularNode<typeof data>).x1 - (d as d3.HierarchyRectangularNode<typeof data>).x0 - 1)
            .attr('fill', (_d, i) => COLORS[i % COLORS.length]).attr('fill-opacity', d => 1 - d.depth * 0.15).attr('rx', 2);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function SankeyMini() {
    // Manual simplified Sankey with fixed positions
    const nodes = [
        { id: 'S1', x: 0, y: 10, h: 60 }, { id: 'S2', x: 0, y: 80, h: 50 },
        { id: 'M1', x: IW / 2 - 10, y: 5, h: 40 }, { id: 'M2', x: IW / 2 - 10, y: 55, h: 45 }, { id: 'M3', x: IW / 2 - 10, y: 110, h: 25 },
        { id: 'T1', x: IW - 10, y: 20, h: 70 }, { id: 'T2', x: IW - 10, y: 100, h: 30 },
    ];
    const links = [
        { sx: 10, tx: IW / 2 - 10, sy0: 10, sy1: 40, ty0: 5, ty1: 45 },
        { sx: 10, tx: IW / 2 - 10, sy0: 40, sy1: 70, ty0: 55, ty1: 80 },
        { sx: 10, tx: IW / 2 - 10, sy0: 80, sy1: 110, ty0: 80, ty1: 100 },
        { sx: 10, tx: IW / 2 - 10, sy0: 110, sy1: 130, ty0: 110, ty1: 135 },
        { sx: IW / 2, tx: IW - 10, sy0: 5, sy1: 45, ty0: 20, ty1: 60 },
        { sx: IW / 2, tx: IW - 10, sy0: 55, sy1: 100, ty0: 60, ty1: 90 },
        { sx: IW / 2, tx: IW - 10, sy0: 110, sy1: 135, ty0: 100, ty1: 130 },
    ];
    const ref = useSvg((g) => {
        links.forEach((l, li) => {
            g.append('path')
                .attr('d', `M${l.sx},${l.sy0} C${(l.sx + l.tx) / 2},${l.sy0} ${(l.sx + l.tx) / 2},${l.ty0} ${l.tx},${l.ty0} L${l.tx},${l.ty1} C${(l.sx + l.tx) / 2},${l.ty1} ${(l.sx + l.tx) / 2},${l.sy1} ${l.sx},${l.sy1} Z`)
                .attr('fill', COLORS[li % COLORS.length]).attr('fill-opacity', 0.4);
        });
        nodes.forEach((n, ni) => {
            g.append('rect').attr('x', n.x).attr('y', n.y).attr('width', 10).attr('height', n.h).attr('fill', COLORS[ni % COLORS.length]).attr('rx', 2);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function ChordMini() {
    const matrix = [[0, 15, 20, 8], [15, 0, 12, 18], [20, 12, 0, 10], [8, 18, 10, 0]];
    const ref = useSvg((g) => {
        const cx = IW / 2, cy = IH / 2, r = Math.min(IW, IH) / 2 - 10;
        const chord = d3.chord().padAngle(0.05)(matrix);
        const arc = d3.arc<d3.ChordGroup>().innerRadius(r - 12).outerRadius(r);
        const ribbon = d3.ribbon<d3.Chord, d3.ChordSubgroup>().radius(r - 12);
        g.selectAll('path.chord').data(chord).join('path')
            .attr('transform', `translate(${cx},${cy})`)
            .attr('d', ribbon)
            .attr('fill', (_, i) => COLORS[i % COLORS.length]).attr('fill-opacity', 0.4).attr('stroke', 'white').attr('stroke-width', 0.5);
        g.selectAll('path.arc').data(chord.groups).join('path')
            .attr('transform', `translate(${cx},${cy})`)
            .attr('d', arc)
            .attr('fill', (_, i) => COLORS[i]).attr('stroke', 'white').attr('stroke-width', 1);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function NetworkMini() {
    const nodes = [{ id: 0, x: 60, y: 40 }, { id: 1, x: 150, y: 30 }, { id: 2, x: 200, y: 80 }, { id: 3, x: 100, y: 100 }, { id: 4, x: 40, y: 110 }, { id: 5, x: 180, y: 140 }, { id: 6, x: 120, y: 150 }];
    const links = [[0, 1], [0, 3], [1, 2], [1, 3], [2, 5], [3, 4], [3, 6], [5, 6]];
    const ref = useSvg((g) => {
        links.forEach(([s, t]) => {
            g.append('line').attr('x1', nodes[s].x).attr('y1', nodes[s].y).attr('x2', nodes[t].x).attr('y2', nodes[t].y).attr('stroke', '#d6d3d1').attr('stroke-width', 1.5);
        });
        nodes.forEach((n, ni) => {
            g.append('circle').attr('cx', n.x).attr('cy', n.y).attr('r', 7).attr('fill', COLORS[ni % COLORS.length]).attr('stroke', 'white').attr('stroke-width', 2);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

// ── Operational ───────────────────────────────────────────────────────────────

export function GanttMini() {
    const tasks = [
        { l: 'Design', start: 0, dur: 3 }, { l: 'Dev', start: 2, dur: 5 },
        { l: 'Test', start: 5, dur: 3 }, { l: 'Deploy', start: 7, dur: 2 },
        { l: 'Review', start: 1, dur: 2 },
    ];
    const ref = useSvg((g) => {
        const x = d3.scaleLinear().domain([0, 10]).range([0, IW]);
        const y = d3.scaleBand().domain(tasks.map(d => d.l)).range([0, IH]).padding(0.3);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(5).tickFormat(d => `W${d}`)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '8'));
        g.append('g').call(d3.axisLeft(y)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').remove()).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.selectAll('rect').data(tasks).join('rect').attr('x', d => x(d.start)).attr('y', d => y(d.l)!).attr('width', d => x(d.dur)).attr('height', y.bandwidth()).attr('fill', PRIMARY).attr('fill-opacity', 0.7).attr('rx', 3);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function ControlChartMini() {
    const vals = [50, 52, 48, 55, 51, 53, 47, 58, 52, 49, 54, 50, 46, 53, 51, 55, 48, 52, 50, 53];
    const mean = d3.mean(vals)!;
    const std = d3.deviation(vals)!;
    const ucl = mean + 3 * std;
    const lcl = mean - 3 * std;
    const ref = useSvg((g) => {
        const x = d3.scaleLinear().domain([0, vals.length - 1]).range([0, IW]);
        const y = d3.scaleLinear().domain([lcl - 3, ucl + 3]).range([IH, 0]);
        g.append('g').attr('transform', `translate(0,${IH})`).call(d3.axisBottom(x).ticks(5)).call(s => s.select('.domain').attr('stroke', '#e7e5e4')).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('g').call(d3.axisLeft(y).ticks(4)).call(s => s.select('.domain').remove()).call(s => s.selectAll('line').attr('stroke', '#e7e5e4')).call(s => s.selectAll('text').attr('fill', '#78716c').attr('font-size', '9'));
        g.append('line').attr('x1', 0).attr('x2', IW).attr('y1', y(ucl)).attr('y2', y(ucl)).attr('stroke', '#ef4444').attr('stroke-dasharray', '4,2').attr('stroke-width', 1.5);
        g.append('line').attr('x1', 0).attr('x2', IW).attr('y1', y(lcl)).attr('y2', y(lcl)).attr('stroke', '#ef4444').attr('stroke-dasharray', '4,2').attr('stroke-width', 1.5);
        g.append('line').attr('x1', 0).attr('x2', IW).attr('y1', y(mean)).attr('y2', y(mean)).attr('stroke', PRIMARY).attr('stroke-dasharray', '6,3').attr('stroke-width', 1.5);
        const line = d3.line<number>().x((_, i) => x(i)).y(d => y(d));
        g.append('path').datum(vals).attr('d', line).attr('fill', 'none').attr('stroke', MUTED).attr('stroke-width', 1.5);
        g.selectAll('circle').data(vals).join('circle').attr('cx', (_, i) => x(i)).attr('cy', d => y(d)).attr('r', 3).attr('fill', d => (d > ucl || d < lcl) ? '#ef4444' : MUTED);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function FunnelMini() {
    const stages = [{ l: 'Aware', v: 1000 }, { l: 'Interest', v: 620 }, { l: 'Consider', v: 340 }, { l: 'Intent', v: 180 }, { l: 'Convert', v: 82 }];
    const max = stages[0].v;
    const ref = useSvg((g) => {
        const barH = IH / stages.length - 4;
        stages.forEach((stage, i) => {
            const barW = (stage.v / max) * IW;
            const bx = (IW - barW) / 2;
            const by = i * (barH + 4);
            const isSmall = barW < 80;
            g.append('rect').attr('x', bx).attr('y', by).attr('width', barW).attr('height', barH).attr('fill', COLORS[i]).attr('rx', 3);
            g.append('text').attr('x', isSmall ? bx + barW + 8 : IW / 2).attr('y', by + barH / 2 + 4).attr('text-anchor', isSmall ? 'start' : 'middle').attr('font-size', 10).attr('fill', isSmall ? '#78716c' : 'white').attr('font-weight', 'bold').text(`${stage.l} (${stage.v})`);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function RadarMini() {
    const axes = ['Speed', 'Power', 'Range', 'Cost', 'Safety', 'UX'];
    const values = [0.8, 0.65, 0.7, 0.55, 0.9, 0.75];
    const values2 = [0.6, 0.8, 0.5, 0.85, 0.7, 0.65];
    const ref = useSvg((g) => {
        const cx = IW / 2, cy = IH / 2, r = Math.min(IW, IH) / 2 - 15;
        const n = axes.length;
        const angle = (i: number) => (i / n) * 2 * Math.PI - Math.PI / 2;
        [0.25, 0.5, 0.75, 1].forEach(frac => {
            const pts = axes.map((_, i) => [cx + Math.cos(angle(i)) * r * frac, cy + Math.sin(angle(i)) * r * frac]);
            g.append('polygon').attr('points', pts.map(p => p.join(',')).join(' ')).attr('fill', 'none').attr('stroke', '#e7e5e4').attr('stroke-width', 1);
        });
        axes.forEach((_, i) => {
            g.append('line').attr('x1', cx).attr('y1', cy).attr('x2', cx + Math.cos(angle(i)) * r).attr('y2', cy + Math.sin(angle(i)) * r).attr('stroke', '#e7e5e4').attr('stroke-width', 1);
        });
        const toPath = (vals: number[]) => vals.map((v, i) => [cx + Math.cos(angle(i)) * r * v, cy + Math.sin(angle(i)) * r * v]);
        [{ vals: values, c: PRIMARY }, { vals: values2, c: SECONDARY }].forEach(({ vals, c }) => {
            const pts = toPath(vals);
            g.append('polygon').attr('points', pts.map(p => p.join(',')).join(' ')).attr('fill', c).attr('fill-opacity', 0.2).attr('stroke', c).attr('stroke-width', 2);
        });
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}

export function GaugeMini() {
    const value = 0.67;
    const ref = useSvg((g) => {
        const cx = IW / 2, cy = IH - 10, r = Math.min(IW, IH) * 0.7;
        const d3StartAngle = -Math.PI / 2;
        const zones = [{ v: 0.33, c: '#ef4444' }, { v: 0.66, c: SECONDARY }, { v: 1.0, c: PRIMARY }];
        let prev = 0;
        zones.forEach(({ v, c }) => {
            const arc = d3.arc<{ startAngle: number; endAngle: number }>()
                .innerRadius(r * 0.65).outerRadius(r)
                .startAngle(d3StartAngle + prev * Math.PI)
                .endAngle(d3StartAngle + v * Math.PI);
            g.append('path').attr('d', arc({ startAngle: 0, endAngle: Math.PI })).attr('transform', `translate(${cx},${cy})`).attr('fill', c).attr('fill-opacity', 0.85);
            prev = v;
        });
        const mathStartAngle = -Math.PI;
        const needleAngle = mathStartAngle + value * Math.PI;
        const nx = cx + Math.cos(needleAngle) * r * 0.7;
        const ny = cy + Math.sin(needleAngle) * r * 0.7;
        g.append('line').attr('x1', cx).attr('y1', cy).attr('x2', nx).attr('y2', ny).attr('stroke', '#1c1917').attr('stroke-width', 2.5).attr('stroke-linecap', 'round');
        g.append('circle').attr('cx', cx).attr('cy', cy).attr('r', 5).attr('fill', '#1c1917');
        g.append('text').attr('x', cx).attr('y', cy - 12).attr('text-anchor', 'middle').attr('font-size', 13).attr('font-weight', 'bold').attr('fill', '#1c1917').text(`${Math.round(value * 100)}%`);
    });
    return <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" />;
}
