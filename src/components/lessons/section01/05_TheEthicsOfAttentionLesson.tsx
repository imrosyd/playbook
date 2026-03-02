import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import LessonPage from '../../../components/layout/LessonPage';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';

const crossRefs = [
    {
        sectionId: 'lab',
        slug: 'full-lab',
        label: 'Section 3.5 — Stack all 12 manipulation controls in the full lab',
    },
    {
        sectionId: 'ethics',
        slug: 'manipulation',
        label: 'Section 5.5 — Level 5: compound distortions weaponize trust',
    },
    {
        sectionId: 'simulator',
        slug: 'revenue',
        label: 'Section 4.1 — See how compound manipulation splits executive reactions',
    },
];

const DATA = [
    { label: 'Wk 1', value: 3.0 },
    { label: 'Wk 2', value: 3.05 },
    { label: 'Wk 3', value: 3.1 },
    { label: 'Wk 4', value: 3.08 },
    { label: 'Wk 5', value: 3.15 },
    { label: 'Wk 6', value: 3.18 },
    { label: 'Wk 7', value: 3.2 },
    { label: 'Wk 8', value: 3.22 },
];

function movingAvg(data: typeof DATA, window: number) {
    return data.map((d, i) => {
        const start = Math.max(0, i - Math.floor(window / 2));
        const end = Math.min(data.length, start + window);
        const slice = data.slice(start, end);
        const avg = slice.reduce((s, x) => s + x.value, 0) / slice.length;
        return { label: d.label, value: avg };
    });
}

const HIGHLIGHT_INDEX = 7;
const MARGIN = { top: 24, right: 16, bottom: 40, left: 50 };
const W = 480;
const H = 220;

// Bias interaction multiplicative chart
function BiasInteractionChart({ lang }: { lang: any }) {
    const biases = [
        { label: t(lang, 's1.ethicsOfAttention.bias1Lbl'), multiplier: 2.4, color: '#f97316' },
        { label: t(lang, 's1.ethicsOfAttention.bias2Lbl'), multiplier: 4.1, color: '#ef4444' },
        { label: t(lang, 's1.ethicsOfAttention.bias3Lbl'), multiplier: 6.8, color: '#dc2626' },
        { label: t(lang, 's1.ethicsOfAttention.bias4Lbl'), multiplier: 11.2, color: '#991b1b' },
    ];
    const maxM = 12;
    const w = 340, h = 140, pad = { l: 130, r: 55, t: 16, b: 24 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const barH = 18;
    const gap = (innerH - biases.length * barH) / (biases.length + 1);

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
            {[0, 3, 6, 9, 12].map(v => (
                <g key={v}>
                    <line x1={pad.l + (v / maxM) * innerW} x2={pad.l + (v / maxM) * innerW}
                        y1={pad.t} y2={h - pad.b} stroke="#f5f5f4" strokeWidth={1} />
                    <text x={pad.l + (v / maxM) * innerW} y={h - 6}
                        fill="#a8a29e" fontSize={7} textAnchor="middle">{v}×</text>
                </g>
            ))}
            {biases.map((b, i) => {
                const y = pad.t + gap + i * (barH + gap);
                const bw = (b.multiplier / maxM) * innerW;
                return (
                    <g key={b.label}>
                        <text x={pad.l - 6} y={y + barH / 2 + 4}
                            fill="#78716c" fontSize={8} textAnchor="end">{b.label}</text>
                        <rect x={pad.l} y={y} width={bw} height={barH}
                            fill={b.color} rx={2} opacity={0.9} />
                        <text x={pad.l + bw + 4} y={y + barH / 2 + 4}
                            fill={b.color} fontSize={9}>{b.multiplier}×</text>
                    </g>
                );
            })}
            <text x={pad.l + innerW / 2} y={pad.t - 3}
                fill="#78716c" fontSize={7.5} textAnchor="middle">
                {t(lang, 's1.ethicsOfAttention.multiplierLbl')}
            </text>
        </svg>
    );
}

// Manipulation detection checklist mini-chart (visual scoring)
function ManipulationScorecard({ lang }: { lang: any }) {
    const checks = [
        { item: t(lang, 's1.ethicsOfAttention.chk1'), ok: true },
        { item: t(lang, 's1.ethicsOfAttention.chk2'), ok: false },
        { item: t(lang, 's1.ethicsOfAttention.chk3'), ok: false },
        { item: t(lang, 's1.ethicsOfAttention.chk4'), ok: false },
        { item: t(lang, 's1.ethicsOfAttention.chk5'), ok: false },
        { item: t(lang, 's1.ethicsOfAttention.chk6'), ok: true },
        { item: t(lang, 's1.ethicsOfAttention.chk7'), ok: true },
        { item: t(lang, 's1.ethicsOfAttention.chk8'), ok: true },
    ];
    const score = checks.filter(c => c.ok).length;
    const total = checks.length;
    const pct = Math.round((score / total) * 100);
    const color = pct >= 75 ? '#059669' : pct >= 50 ? '#f97316' : '#dc2626';

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 shrink-0 font-black text-sm"
                    style={{ borderColor: color, color }}>
                    {pct}%
                </div>
                <div>
                    <p className="text-[13px] font-bold text-stone-800">
                        {t(lang, 's1.ethicsOfAttention.scoreLbl')} {score}/{total}
                    </p>
                    <p className="text-[11px] text-stone-400">
                        {pct < 50 ? t(lang, 's1.ethicsOfAttention.scoreHighRisk') :
                            pct < 75 ? t(lang, 's1.ethicsOfAttention.scoreModRisk') :
                                t(lang, 's1.ethicsOfAttention.scoreGood')}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
                {checks.map((c, i) => (
                    <div key={i} className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] ${c.ok
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'}`}>
                        <span className="font-bold shrink-0">{c.ok ? '✓' : '✗'}</span>
                        {c.item}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function TheEthicsOfAttentionLesson() {
    const { lang } = useLang();
    const [allManipulations, setAllManipulations] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null);

    // Ensure we clear out old D3 elements (especially from Vite HMR / StrictMode) when unmounting
    useEffect(() => {
        return () => {
            if (svgRef.current) d3.select(svgRef.current).selectAll('*').remove();
        };
    }, []);

    useEffect(() => {
        const svgEl = svgRef.current;
        if (!svgEl) return;

        const svg = d3.select(svgEl);

        const innerW = W - MARGIN.left - MARGIN.right;
        const innerH = H - MARGIN.top - MARGIN.bottom;

        if (svg.select('.main-group').empty()) {
            const g = svg
                .append('g')
                .attr('class', 'main-group')
                .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

            g.append('g').attr('class', 'grid');
            g.append('g').attr('class', 'bars');
            g.append('path').attr('class', 'smooth-line').attr('opacity', 0);

            g.append('text').attr('class', 'growth-label').attr('opacity', 0);
            g.append('text').attr('class', 'axis-warning').attr('opacity', 0);
            svg.append('text').attr('class', 'chart-title').attr('opacity', 0);

            g.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${innerH})`);
            g.append('g').attr('class', 'y-axis');
        }

        const g = svg.select('.main-group');
        const trans = svg.transition().duration(800).ease(d3.easeCubicOut) as any;

        const yMin = allManipulations ? 2.85 : 0;
        const yMax = 3.35;

        const xScale = d3
            .scaleBand()
            .domain(DATA.map((d) => d.label))
            .range([0, innerW])
            .padding(0.3);

        const yScale = d3.scaleLinear().domain([yMin, yMax]).range([innerH, 0]);

        const gridCount = allManipulations ? 12 : 5;
        const gridTicks = yScale.ticks(gridCount);

        // Gridlines
        g.select('.grid').selectAll('.grid-line')
            .data(gridTicks, (d: any) => d)
            .join(
                enter => enter.append('line')
                    .attr('class', 'grid-line')
                    .attr('x1', 0)
                    .attr('x2', innerW)
                    .attr('y1', d => yScale(d))
                    .attr('y2', d => yScale(d))
                    .attr('stroke', allManipulations ? '#a8a29e' : '#e7e5e4')
                    .attr('stroke-width', allManipulations ? 1 : 0.75)
                    .attr('stroke-dasharray', allManipulations ? '2,2' : '0')
                    .attr('opacity', 0)
                    .call(e => e.transition(trans).attr('opacity', 1)),
                update => update.call(u => u.transition(trans)
                    .attr('y1', d => yScale(d))
                    .attr('y2', d => yScale(d))
                    .attr('stroke', allManipulations ? '#a8a29e' : '#e7e5e4')
                    .attr('stroke-width', allManipulations ? 1 : 0.75)
                    .attr('stroke-dasharray', allManipulations ? '2,2' : '0')
                ),
                exit => exit.call(ex => ex.transition(trans).attr('opacity', 0).remove())
            );

        // Bars
        g.select('.bars').selectAll('.bar')
            .data(DATA)
            .join(
                enter => enter.append('rect')
                    .attr('class', 'bar')
                    .attr('x', d => xScale(d.label)!)
                    .attr('y', innerH)
                    .attr('width', xScale.bandwidth())
                    .attr('height', 0)
                    .attr('fill', '#059669')
                    .attr('rx', 2)
                    .call(e => e.transition(trans)
                        .attr('y', d => yScale(d.value))
                        .attr('height', d => innerH - yScale(d.value))
                        .attr('fill', (_d, i) => allManipulations && i === HIGHLIGHT_INDEX ? '#dc2626' : '#059669')
                    ),
                update => update.call(u => u.transition(trans)
                    .attr('x', d => xScale(d.label)!)
                    .attr('y', d => yScale(d.value))
                    .attr('height', d => innerH - yScale(d.value))
                    .attr('fill', (_d, i) => allManipulations && i === HIGHLIGHT_INDEX ? '#dc2626' : '#059669')
                ),
                exit => exit.call(ex => ex.transition(trans).attr('height', 0).attr('y', innerH).remove())
            );

        // Smoothed Line
        const smoothed = movingAvg(DATA, 3);
        const lineGen = d3
            .line<{ label: string; value: number }>()
            .x((d) => xScale(d.label)! + xScale.bandwidth() / 2)
            .y((d) => yScale(d.value))
            .curve(d3.curveCatmullRom.alpha(0.5));

        g.select('.smooth-line')
            .datum(smoothed)
            .attr('fill', 'none')
            .attr('stroke', '#f97316')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '5,3')
            .transition(trans)
            .attr('d', lineGen as any)
            .attr('opacity', allManipulations ? 1 : 0);

        // Annotations & Labels
        const lastX = xScale(DATA[HIGHLIGHT_INDEX].label)! + xScale.bandwidth() / 2;
        const lastY = yScale(DATA[HIGHLIGHT_INDEX].value);

        g.select('.growth-label')
            .text(t(lang, 's1.ethicsOfAttention.growthManip'))
            .attr('text-anchor', 'end')
            .style('font-size', '10px')
            .style('font-weight', '700')
            .style('fill', '#dc2626')
            .transition(trans)
            .attr('x', lastX - 30)
            .attr('y', lastY - 24)
            .attr('opacity', allManipulations ? 1 : 0);

        g.select('.axis-warning')
            .attr('x', innerW / 2)
            .attr('text-anchor', 'middle')
            .style('font-size', '10px')
            .style('fill', '#dc2626')
            .style('font-weight', '600')
            .text(t(lang, 's1.ethicsOfAttention.axisWarnManip'))
            .transition(trans)
            .attr('y', innerH + 26)
            .attr('opacity', allManipulations ? 1 : 0);

        svg.select('.chart-title')
            .attr('x', MARGIN.left)
            .attr('y', 14)
            .style('font-size', '11px')
            .style('font-weight', '700')
            .style('fill', '#dc2626')
            .text(t(lang, 's1.ethicsOfAttention.chartTitleManip'))
            .transition(trans)
            .attr('opacity', allManipulations ? 1 : 0);

        // X Axis
        g.select('.x-axis')
            .call((ax: any) => ax.transition(trans).call(d3.axisBottom(xScale).tickSize(0)))
            .call((ax) => ax.select('.domain').attr('stroke', '#d6d3d1'))
            .selectAll('text')
            .style('font-size', '8px')
            .style('fill', '#78716c');

        // Y Axis
        g.select('.y-axis')
            .call((ax: any) => ax.transition(trans).call(
                d3.axisLeft(yScale)
                    .ticks(allManipulations ? 6 : 4)
                    .tickFormat((d) => `$${Number(d).toFixed(2)}M`)
            ))
            .call((ax) => ax.select('.domain').transition(trans).attr('stroke', allManipulations ? '#dc2626' : '#d6d3d1'))
            .selectAll('text')
            .style('font-size', '8px')
            .style('fill', '#78716c');

    }, [allManipulations]);

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">

                {/* Main explanation */}
                <div className="space-y-4">
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's1.ethicsOfAttention.intro1') }} />
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's1.ethicsOfAttention.intro2') }} />
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's1.ethicsOfAttention.intro3') }} />
                </div>

                {/* Four-bias stack */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's1.ethicsOfAttention.stackTitle')}
                    </p>
                    <div className="space-y-2">
                        {[
                            {
                                num: '1',
                                bias: t(lang, 's1.ethicsOfAttention.stack1Name'),
                                how: t(lang, 's1.ethicsOfAttention.stack1How'),
                                effect: t(lang, 's1.ethicsOfAttention.stack1Effect'),
                                severity: 'bg-orange-100 text-orange-700',
                            },
                            {
                                num: '2',
                                bias: t(lang, 's1.ethicsOfAttention.stack2Name'),
                                how: t(lang, 's1.ethicsOfAttention.stack2How'),
                                effect: t(lang, 's1.ethicsOfAttention.stack2Effect'),
                                severity: 'bg-red-100 text-red-700',
                            },
                            {
                                num: '3',
                                bias: t(lang, 's1.ethicsOfAttention.stack3Name'),
                                how: t(lang, 's1.ethicsOfAttention.stack3How'),
                                effect: t(lang, 's1.ethicsOfAttention.stack3Effect'),
                                severity: 'bg-red-100 text-red-700',
                            },
                            {
                                num: '4',
                                bias: t(lang, 's1.ethicsOfAttention.stack4Name'),
                                how: t(lang, 's1.ethicsOfAttention.stack4How'),
                                effect: t(lang, 's1.ethicsOfAttention.stack4Effect'),
                                severity: 'bg-red-200 text-red-800',
                            },
                            {
                                num: '5',
                                bias: t(lang, 's1.ethicsOfAttention.stack5Name'),
                                how: t(lang, 's1.ethicsOfAttention.stack5How'),
                                effect: t(lang, 's1.ethicsOfAttention.stack5Effect'),
                                severity: 'bg-rose-200 text-rose-800',
                            },
                        ].map((item) => (
                            <div key={item.num} className="flex items-start gap-3 bg-white rounded-xl border border-stone-200 p-3.5">
                                <span className={`w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${item.severity}`}>
                                    {item.num}
                                </span>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span className="text-[13px] font-bold text-stone-800">{item.bias}</span>
                                        <span className="text-[11px] text-stone-400 italic">{item.how}</span>
                                    </div>
                                    <p className="text-[12px] text-stone-500 leading-relaxed">{item.effect}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bias interaction multiplicative chart */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's1.ethicsOfAttention.multiplyTitle')}
                    </p>
                    <p className="text-[13px] text-stone-500 leading-relaxed">
                        {t(lang, 's1.ethicsOfAttention.multiplyDesc1')}
                    </p>
                    <BiasInteractionChart lang={lang} />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        {t(lang, 's1.ethicsOfAttention.multiplyDesc2')}
                    </p>
                </div>

                {/* Manipulation scorecard */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's1.ethicsOfAttention.scorecardTitle')}
                    </p>
                    <p className="text-[13px] text-stone-500 leading-relaxed">
                        {t(lang, 's1.ethicsOfAttention.scorecardDesc')}
                    </p>
                    <ManipulationScorecard lang={lang} />
                </div>

                {/* Real-world case examples */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's1.ethicsOfAttention.realCasesTitle')}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            {
                                context: t(lang, 's1.ethicsOfAttention.case1Context'),
                                description: t(lang, 's1.ethicsOfAttention.case1Desc'),
                                outcome: t(lang, 's1.ethicsOfAttention.case1Out'),
                            },
                            {
                                context: t(lang, 's1.ethicsOfAttention.case2Context'),
                                description: t(lang, 's1.ethicsOfAttention.case2Desc'),
                                outcome: t(lang, 's1.ethicsOfAttention.case2Out'),
                            },
                            {
                                context: t(lang, 's1.ethicsOfAttention.case3Context'),
                                description: t(lang, 's1.ethicsOfAttention.case3Desc'),
                                outcome: t(lang, 's1.ethicsOfAttention.case3Out'),
                            },
                            {
                                context: t(lang, 's1.ethicsOfAttention.case4Context'),
                                description: t(lang, 's1.ethicsOfAttention.case4Desc'),
                                outcome: t(lang, 's1.ethicsOfAttention.case4Out'),
                            },
                        ].map((c, i) => (
                            <div key={i} className="bg-white rounded-xl border border-stone-200 p-4 space-y-2">
                                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">{c.context}</p>
                                <p className="text-[12px] text-stone-600 leading-relaxed">{c.description}</p>
                                <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                                    <p className="text-[11px] font-semibold text-amber-700 mb-0.5">{t(lang, 's1.ethicsOfAttention.outcomeLbl')}</p>
                                    <p className="text-[11px] text-amber-800 leading-relaxed">{c.outcome}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interaction effect */}
                <div className="rounded-xl bg-red-50 border border-red-200 p-5">
                    <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider mb-3">
                        {t(lang, 's1.ethicsOfAttention.powerTitle')}
                    </p>
                    <p className="text-[13px] text-red-800 leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: t(lang, 's1.ethicsOfAttention.power1') }} />
                    <p className="text-[13px] text-red-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's1.ethicsOfAttention.power2') }} />
                </div>

                {/* Interactive demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                    <div className="relative">
                        <span className="absolute top-0 right-0 text-xs font-bold text-stone-300 select-none">1.5</span>
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                            {t(lang, 's1.ethicsOfAttention.demoTitle')}
                        </p>
                        <p className="text-[13px] text-stone-500 mb-4">
                            {t(lang, 's1.ethicsOfAttention.demoDesc')}
                        </p>

                        <div className="flex justify-center py-3 overflow-x-auto">
                            <svg className="w-full max-w-2xl mx-auto block"
                                ref={svgRef}
                                viewBox={`0 0 ${W} ${H}`}
                                aria-label="Compound manipulation demo: bar chart toggling between clean and manipulated state"
                            />
                        </div>

                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span className={`text-[13px] font-medium transition-colors ${!allManipulations ? 'text-stone-800' : 'text-stone-400'}`}>
                                {t(lang, 's1.ethicsOfAttention.btnHonest')}
                            </span>
                            <button
                                onClick={() => setAllManipulations((v) => !v)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${allManipulations ? 'bg-red-500' : 'bg-brand'}`}
                                aria-label="Toggle all manipulations"
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${allManipulations ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <span className={`text-[13px] font-medium transition-colors ${allManipulations ? 'text-stone-800' : 'text-stone-400'}`}>
                                {t(lang, 's1.ethicsOfAttention.btnManip')}
                            </span>
                        </div>

                        <p className="text-center text-[12px] text-stone-400 mt-2 px-4">
                            {allManipulations
                                ? t(lang, 's1.ethicsOfAttention.demoCapManip')
                                : t(lang, 's1.ethicsOfAttention.demoCapHonest')}
                        </p>

                        {allManipulations && (
                            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                                <p className="text-[12px] text-red-700 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's1.ethicsOfAttention.activeManipNotice') }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
