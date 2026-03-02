import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import LessonPage from '../../../components/layout/LessonPage';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';

const crossRefs = [
    {
        sectionId: 'lab',
        slug: 'axis-scale',
        label: 'Section 3.1 — Axis truncation >50% crosses into distortion',
    },
    {
        sectionId: 'ethics',
        slug: 'distortion',
        label: 'Section 5.4 — Axis truncation is objectively measurable distortion',
    },
];

const DATA = [
    { label: 'Wk 1', value: 3.0 },
    { label: 'Wk 2', value: 3.15 },
    { label: 'Wk 3', value: 3.1 },
    { label: 'Wk 4', value: 3.28 },
    { label: 'Wk 5', value: 3.22 },
    { label: 'Wk 6', value: 3.35 },
    { label: 'Wk 7', value: 3.3 },
    { label: 'Wk 8', value: 3.5 },
];

const MARGIN = { top: 16, right: 16, bottom: 40, left: 52 };
const W = 480;
const H = 220;

// Side-by-side comparison: truncated vs honest
function DualChartComparison({ lang }: { lang: any }) {
    const charts = [
        { label: t(lang, 's1.anchorEffect.truncatedLabel'), yMin: 2.8, yMax: 3.7, borderColor: '#dc2626', tagColor: '#dc2626', tagBg: '#fef2f2', tag: t(lang, 's1.anchorEffect.tagMisleading') },
        { label: t(lang, 's1.anchorEffect.honestLabel'), yMin: 0, yMax: 4.0, borderColor: '#059669', tagColor: '#059669', tagBg: '#f0fdf4', tag: t(lang, 's1.anchorEffect.tagHonest') },
    ];

    return (
        <div className="grid grid-cols-2 gap-3">
            {charts.map((c) => {
                const w = 220, h = 170, pad = { l: 38, r: 8, t: 14, b: 28 };
                const bw = 18;
                const n = DATA.length;
                const innerW = w - pad.l - pad.r;
                const innerH = h - pad.t - pad.b;
                const xStep = innerW / (n + 1);

                return (
                    <div key={c.label} className="space-y-1">
                        <div
                            className="rounded-xl border p-3"
                            style={{ borderColor: c.borderColor + '66', backgroundColor: c.tagBg }}
                        >
                            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
                                {/* Gridlines */}
                                {[0.25, 0.5, 0.75, 1].map(t => {
                                    const yV = c.yMin + t * (c.yMax - c.yMin);
                                    const yPx = pad.t + (1 - t) * innerH;
                                    return (
                                        <g key={t}>
                                            <line x1={pad.l} x2={w - pad.r} y1={yPx} y2={yPx}
                                                stroke="#f5f5f4" strokeWidth={1} />
                                            <text x={pad.l - 3} y={yPx + 4} fill="#a8a29e"
                                                fontSize={8} textAnchor="end">${yV.toFixed(1)}M</text>
                                        </g>
                                    );
                                })}
                                {/* Truncation warning */}
                                {c.yMin > 0 && (
                                    <text x={pad.l + innerW / 2} y={h - 4} fill="#dc2626"
                                        fontSize={7} textAnchor="middle">
                                        {t(lang, 's1.anchorEffect.warnAxisNotZero')}
                                    </text>
                                )}
                                {/* Bars */}
                                {DATA.map((d, i) => {
                                    const x = pad.l + (i + 1) * xStep - bw / 2;
                                    const yFrac = Math.max(0, (d.value - c.yMin) / (c.yMax - c.yMin));
                                    const barH = yFrac * innerH;
                                    const barY = pad.t + innerH - barH;
                                    return (
                                        <rect key={i} x={x} y={barY} width={bw} height={barH}
                                            fill={c.borderColor} rx={2} opacity={0.8} />
                                    );
                                })}
                            </svg>
                        </div>
                        <p className="text-[10px] font-bold text-center" style={{ color: c.tagColor }}>
                            {c.tag} — {c.label}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

// Anchoring bias magnitude chart
function AnchoringMagnitudeChart({ lang }: { lang: any }) {
    const scenarios = [
        { scenario: t(lang, 's1.anchorEffect.scenarioPrice'), anchorEffect: 73, color: '#dc2626' },
        { scenario: t(lang, 's1.anchorEffect.scenarioLegal'), anchorEffect: 61, color: '#f97316' },
        { scenario: t(lang, 's1.anchorEffect.scenarioSalary'), anchorEffect: 68, color: '#f59e0b' },
        { scenario: t(lang, 's1.anchorEffect.scenarioBudget'), anchorEffect: 55, color: '#f97316' },
        { scenario: t(lang, 's1.anchorEffect.scenarioChart'), anchorEffect: 82, color: '#dc2626' },
    ];
    const w = 480, h = 220, pad = { l: 150, r: 70, t: 20, b: 36 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const barH = 24;
    const gap = (innerH - scenarios.length * barH) / (scenarios.length + 1);

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
            {[0, 25, 50, 75, 100].map(v => (
                <g key={v}>
                    <line x1={pad.l + (v / 100) * innerW} x2={pad.l + (v / 100) * innerW}
                        y1={pad.t} y2={h - pad.b} stroke="#f5f5f4" strokeWidth={1} />
                    <text x={pad.l + (v / 100) * innerW} y={h - 6}
                        fill="#a8a29e" fontSize={7} textAnchor="middle">{v}%</text>
                </g>
            ))}
            {scenarios.map((s, i) => {
                const y = pad.t + gap + i * (barH + gap);
                const bw = (s.anchorEffect / 100) * innerW;
                return (
                    <g key={s.scenario}>
                        <text x={pad.l - 6} y={y + barH / 2 + 4}
                            fill="#78716c" fontSize={8} textAnchor="end">{s.scenario}</text>
                        <rect x={pad.l} y={y} width={bw} height={barH}
                            fill={s.color} rx={2} opacity={0.85} />
                        <text x={pad.l + bw + 4} y={y + barH / 2 + 4}
                            fill={s.color} fontSize={8}>{s.anchorEffect}%</text>
                    </g>
                );
            })}
            <text x={pad.l + innerW / 2} y={pad.t - 2}
                fill="#78716c" fontSize={7.5} textAnchor="middle">
                {t(lang, 's1.anchorEffect.axisAnchorLbl')}
            </text>
        </svg>
    );
}

// Applying the principles of dashboard anchors
function DashboardAnchorDemo({ lang }: { lang: any }) {
    const data = [
        { label: 'Q1', actual: 3.2, budget: 3.0 },
        { label: 'Q2', actual: 3.8, budget: 3.5 },
        { label: 'Q3', actual: 4.1, budget: 4.2 },
        { label: 'Q4', actual: 4.5, budget: 4.0 },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unanchored */}
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-5 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{t(lang, 's1.anchorEffect.dashLblRevenue')}</p>
                        <p className="text-3xl font-light text-stone-800">$4.5M</p>
                    </div>
                </div>
                <div className="h-32 flex items-end justify-between gap-3 px-2 border-b border-stone-200 pb-0">
                    {data.map(d => (
                        <div key={d.label} className="flex-1 flex flex-col justify-end items-center gap-1 h-full">
                            <div className="w-full bg-[#1e40af] rounded-t-sm cursor-default" style={{ height: `${(d.actual / 5) * 100}%` }}></div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between px-2">
                    {data.map(d => (
                        <span key={d.label} className="flex-1 text-center text-[10px] text-stone-400 font-bold">{d.label}</span>
                    ))}
                </div>
                <p className="text-[12px] text-stone-500 text-center leading-relaxed">
                    {t(lang, 's1.anchorEffect.dashDescUnanchored')}
                </p>
            </div>

            {/* Anchored */}
            <div className="bg-white rounded-xl border border-emerald-200 p-5 space-y-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-bold px-2 py-1 tracking-wider uppercase rounded-bl-lg">
                    {t(lang, 's1.anchorEffect.dashTagAnchored')}
                </div>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{t(lang, 's1.anchorEffect.dashLblRevenue')}</p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-stone-800">$4.5M</p>
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                                {t(lang, 's1.anchorEffect.dashTargetDelta')}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="h-32 flex items-end justify-between gap-3 px-2 relative border-b border-stone-200 pb-0 mt-4">
                    {/* Benchmark line */}
                    <div className="absolute bottom-[60%] left-0 right-0 border-t border-dashed border-stone-400 pointer-events-none z-0">
                        <span className="absolute -top-4 left-1 text-[9px] text-stone-500 font-bold bg-white px-1">{t(lang, 's1.anchorEffect.dashBenchmark')}</span>
                    </div>

                    {data.map(d => (
                        <div key={d.label} className="flex-1 flex justify-center items-end relative h-full group">
                            {/* Budget background bar */}
                            <div className="absolute bottom-0 w-full bg-stone-100 border-x border-t border-stone-300 rounded-t-sm z-0 pointer-events-none" style={{ height: `${(d.budget / 5) * 100}%` }}></div>

                            {/* Actual foreground bar */}
                            <div className="absolute bottom-0 w-[55%] rounded-t-sm z-10 transition-all border-t-[3px]"
                                style={{
                                    height: `${(d.actual / 5) * 100}%`,
                                    backgroundColor: d.actual >= d.budget ? '#10b981' : '#dc2626',
                                    borderColor: d.actual >= d.budget ? '#059669' : '#b91c1c'
                                }}>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between px-2">
                    {data.map(d => (
                        <span key={d.label} className="flex-1 text-center text-[10px] text-stone-500 font-bold uppercase tracking-wider">{d.label}</span>
                    ))}
                </div>
                <p className="text-[12px] text-stone-600 text-center leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's1.anchorEffect.dashDescAnchored') }} />
            </div>
        </div>
    );
}

export default function TheAnchorEffectLesson() {
    const { lang } = useLang();
    const [truncated, setTruncated] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const svgEl = svgRef.current;
        if (!svgEl) return;

        const svg = d3.select(svgEl);

        const innerW = W - MARGIN.left - MARGIN.right;
        const innerH = H - MARGIN.top - MARGIN.bottom;

        // Initialize group structure once
        if (svg.select('.main-group').empty()) {
            const g = svg
                .append('g')
                .attr('class', 'main-group')
                .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

            g.append('g').attr('class', 'grid-lines');
            g.append('g').attr('class', 'bars');
            g.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${innerH})`);
            g.append('g').attr('class', 'y-axis');
            g.append('g').attr('class', 'truncations');
        }

        const g = svg.select('.main-group');
        const t = svg.transition().duration(800).ease(d3.easeCubicOut) as any;

        const yMin = truncated ? 2.8 : 0;
        const yMax = 3.7;

        const xScale = d3
            .scaleBand()
            .domain(DATA.map((d) => d.label))
            .range([0, innerW])
            .padding(0.3);

        const yScale = d3.scaleLinear().domain([yMin, yMax]).range([innerH, 0]);

        // Grid lines
        const gridLines = g.select('.grid-lines').selectAll('.grid-line').data(yScale.ticks(4), (d: any) => d);
        gridLines.join(
            (enter) => enter
                .append('line')
                .attr('class', 'grid-line')
                .attr('x1', 0)
                .attr('x2', innerW)
                .attr('y1', (d) => yScale(d))
                .attr('y2', (d) => yScale(d))
                .attr('stroke', '#e7e5e4')
                .attr('stroke-width', 0.75)
                .attr('opacity', 0)
                .call((e) => e.transition(t).attr('opacity', 1)),
            (update) => update
                .call((u) => u.transition(t)
                    .attr('y1', (d) => yScale(d))
                    .attr('y2', (d) => yScale(d))
                    .attr('opacity', 1)
                ),
            (exit) => exit
                .call((e) => e.transition(t).attr('opacity', 0).remove())
        );

        // Truncation Warning Elements
        const truncData = truncated ? [1] : [];
        const truncLines = g.select('.truncations').selectAll('line').data(truncData);
        truncLines.join(
            (enter) => enter.append('line')
                .attr('x1', 0).attr('x2', innerW).attr('y1', innerH).attr('y2', innerH)
                .attr('stroke', '#dc2626').attr('stroke-width', 1.5).attr('stroke-dasharray', '4,3')
                .attr('opacity', 0).call(e => e.transition(t).attr('opacity', 0.7)),
            (update) => update,
            (exit) => exit.call(e => e.transition(t).attr('opacity', 0).remove())
        );

        const truncTexts = g.select('.truncations').selectAll('text').data(truncData);
        truncTexts.join(
            (enter) => enter.append('text')
                .attr('x', innerW / 2).attr('y', innerH + 24).attr('text-anchor', 'middle')
                .style('font-size', '10px').style('fill', '#dc2626').style('font-weight', '600')
                .text('⚠ axis starts at $2.8M — not zero')
                .attr('opacity', 0).call(e => e.transition(t).attr('opacity', 1)),
            (update) => update,
            (exit) => exit.call(e => e.transition(t).attr('opacity', 0).remove())
        );

        // Bars
        const bars = g.select('.bars').selectAll('.bar').data(DATA, (d: any) => d.label);
        bars.join(
            (enter) => enter
                .append('rect')
                .attr('class', 'bar')
                .attr('x', (d) => xScale(d.label)!)
                .attr('y', innerH)
                .attr('width', xScale.bandwidth())
                .attr('height', 0)
                .attr('fill', truncated ? '#ef4444' : '#059669')
                .attr('rx', 2)
                .call((e) => e.transition(t)
                    .attr('y', (d) => yScale(d.value))
                    .attr('height', (d) => innerH - yScale(d.value))
                ),
            (update) => update
                .call((u) => u.transition(t)
                    .attr('y', (d) => yScale(d.value))
                    .attr('height', (d) => innerH - yScale(d.value))
                    .attr('fill', truncated ? '#ef4444' : '#059669')
                )
        );

        // X Axis
        g.select('.x-axis')
            .call((ax: any) => ax.transition(t).call(d3.axisBottom(xScale).tickSize(0)))
            .call((ax) => ax.select('.domain').attr('stroke', '#d6d3d1'))
            .selectAll('text')
            .style('font-size', '11px')
            .style('fill', '#78716c');

        // Y Axis
        g.select('.y-axis')
            .call((ax: any) => ax.transition(t).call(d3.axisLeft(yScale).ticks(4).tickFormat((d) => `$${d}M`)))
            .call((ax) => ax.select('.domain').transition(t).attr('stroke', truncated ? '#dc2626' : '#d6d3d1'))
            .selectAll('text')
            .style('font-size', '11px')
            .style('fill', '#78716c');
    }, [truncated]);

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">

                {/* Main explanation */}
                <div className="space-y-4">
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's1.anchorEffect.intro1') }} />
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's1.anchorEffect.intro2') }} />
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's1.anchorEffect.intro3') }} />
                </div>

                {/* Side-by-side comparison */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's1.anchorEffect.dualChartTitle')}
                    </p>
                    <p className="text-[13px] text-stone-500 leading-relaxed">
                        {t(lang, 's1.anchorEffect.dualChartDesc1')}
                    </p>
                    <DualChartComparison lang={lang} />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        {t(lang, 's1.anchorEffect.dualChartDesc2')}
                    </p>
                </div>

                {/* Anchoring magnitude chart */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's1.anchorEffect.anchoringMagTitle')}
                    </p>
                    <AnchoringMagnitudeChart lang={lang} />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        {t(lang, 's1.anchorEffect.anchoringMagDesc')}
                    </p>
                </div>

                {/* Research note */}
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-5">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                        {t(lang, 's1.anchorEffect.researchBTitle')}
                    </p>
                    <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
                        {t(lang, 's1.anchorEffect.researchB1')}
                    </p>
                    <p className="text-[13px] text-stone-600 leading-relaxed">
                        {t(lang, 's1.anchorEffect.researchB2')}
                    </p>
                </div>

                {/* Anchoring types */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's1.anchorEffect.anchorTypesTitle')}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            {
                                title: t(lang, 's1.anchorEffect.type1Title'),
                                desc: t(lang, 's1.anchorEffect.type1Desc'),
                                example: t(lang, 's1.anchorEffect.type1Example'),
                            },
                            {
                                title: t(lang, 's1.anchorEffect.type2Title'),
                                desc: t(lang, 's1.anchorEffect.type2Desc'),
                                example: t(lang, 's1.anchorEffect.type2Example'),
                            },
                            {
                                title: t(lang, 's1.anchorEffect.type3Title'),
                                desc: t(lang, 's1.anchorEffect.type3Desc'),
                                example: t(lang, 's1.anchorEffect.type3Example'),
                            },
                            {
                                title: t(lang, 's1.anchorEffect.type4Title'),
                                desc: t(lang, 's1.anchorEffect.type4Desc'),
                                example: t(lang, 's1.anchorEffect.type4Example'),
                            },
                        ].map((item) => (
                            <div key={item.title} className="bg-white rounded-xl border border-red-200 p-4 space-y-2">
                                <p className="text-[13px] font-bold text-stone-800">{item.title}</p>
                                <p className="text-[12px] text-stone-600 leading-relaxed">{item.desc}</p>
                                <p className="text-[11px] text-red-700 bg-red-50 rounded-lg px-3 py-1.5 leading-relaxed italic">
                                    Example: {item.example}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dashboard Anchors */}
                <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-5">
                    <div className="space-y-2">
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                            {t(lang, 's1.anchorEffect.dashAnchorTitle')}
                        </p>
                        <h3 className="text-xl font-medium text-stone-800 tracking-tight">
                            {t(lang, 's1.anchorEffect.dashAnchorSub')}
                        </h3>
                        <p className="text-[14px] text-stone-600 leading-relaxed max-w-3xl" dangerouslySetInnerHTML={{ __html: t(lang, 's1.anchorEffect.dashAnchorDesc') }} />
                    </div>
                    <DashboardAnchorDemo lang={lang} />
                </div>

                {/* Defense */}
                <div className="rounded-xl bg-brand-muted border border-brand/30 p-5">
                    <p className="text-[11px] font-bold text-brand uppercase tracking-wider mb-3">
                        {t(lang, 's1.anchorEffect.defenseTitle')}
                    </p>
                    <ul className="space-y-2">
                        {[
                            t(lang, 's1.anchorEffect.defense1'),
                            t(lang, 's1.anchorEffect.defense2'),
                            t(lang, 's1.anchorEffect.defense3'),
                            t(lang, 's1.anchorEffect.defense4'),
                        ].map((tip, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-[13px] text-stone-700">
                                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-brand text-white text-[10px] flex items-center justify-center font-bold">
                                    {i + 1}
                                </span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Interactive demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                    <div className="relative">
                        <span className="absolute top-0 right-0 text-xs font-bold text-stone-300 select-none">1.3</span>
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                            {t(lang, 's1.anchorEffect.demoTitle')}
                        </p>
                        <p className="text-[13px] text-stone-500 mb-4">
                            {t(lang, 's1.anchorEffect.demoDesc')}
                        </p>

                        <div className="flex justify-center py-3 overflow-x-auto">
                            <svg className="w-full max-w-2xl mx-auto block"
                                ref={svgRef}
                                width={W}
                                height={H}
                                viewBox={`0 0 ${W} ${H}`}
                                aria-label="Anchoring bias demo: weekly sales bar chart with axis truncation toggle"
                            />
                        </div>

                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span className={`text-[13px] font-medium transition-colors ${!truncated ? 'text-stone-800' : 'text-stone-400'}`}>
                                {t(lang, 's1.anchorEffect.demoBtnZero')}
                            </span>
                            <button
                                onClick={() => setTruncated((v) => !v)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${truncated ? 'bg-red-500' : 'bg-stone-200'}`}
                                aria-label="Toggle axis truncation"
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${truncated ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <span className={`text-[13px] font-medium transition-colors ${truncated ? 'text-stone-800' : 'text-stone-400'}`}>
                                {t(lang, 's1.anchorEffect.demoBtnTrunc')}
                            </span>
                        </div>

                        <p className="text-center text-[12px] text-stone-400 mt-2">
                            {truncated
                                ? t(lang, 's1.anchorEffect.demoCapTrunc')
                                : t(lang, 's1.anchorEffect.demoCapZero')}
                        </p>
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
