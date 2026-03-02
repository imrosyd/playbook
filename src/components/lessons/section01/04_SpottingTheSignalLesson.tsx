import { useRef, useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';
import LessonPage from '../../../components/layout/LessonPage';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';

const crossRefs = [
    {
        sectionId: 'lab',
        slug: 'data-transform',
        label: 'Section 3.2 — Smoothing can impose false trends on noisy data',
    },
    {
        sectionId: 'ethics',
        slug: 'framing',
        label: 'Section 5.3 — Smoothing is a framing decision that needs disclosure',
    },
];

function seededRand(seed: number) {
    let s = seed;
    return () => {
        s = (s * 16807 + 0) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

const FLAT_MEAN = 50;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function buildData() {
    const rand = seededRand(42);
    return MONTHS.map((label) => ({
        label,
        value: FLAT_MEAN + (rand() - 0.5) * 2 * FLAT_MEAN * 0.2,
    }));
}

function movingAverage(data: { label: string; value: number }[], window: number) {
    return data.map((d, i) => {
        const start = Math.max(0, i - Math.floor(window / 2));
        const end = Math.min(data.length, start + window);
        const slice = data.slice(start, end);
        const avg = slice.reduce((sum, x) => sum + x.value, 0) / slice.length;
        return { label: d.label, value: avg };
    });
}

const MARGIN = { top: 16, right: 16, bottom: 32, left: 44 };
const W = 480;
const H = 220;

// Window size effect chart: shows how smoothing window changes perception
function SmoothingWindowChart({ lang }: { lang: any }) {
    const rawData = useMemo(() => buildData(), []);
    const [window3, setWindow3] = useState(true);
    const windows = window3 ? [3] : [7];
    const w = 320, h = 140;
    const pad = { l: 36, r: 16, t: 20, b: 30 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const allVals = rawData.map(d => d.value);
    const yMin = Math.min(...allVals) - 2;
    const yMax = Math.max(...allVals) + 2;
    const xStep = innerW / (MONTHS.length - 1);
    const toX = (i: number) => pad.l + i * xStep;
    const toY = (v: number) => pad.t + (1 - (v - yMin) / (yMax - yMin)) * innerH;

    const smoothedByWindow = windows.map(w3 => movingAverage(rawData, w3));
    const colors = ['#dc2626', '#7c3aed'];

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                {[3, 7].map(wn => (
                    <button key={wn} onClick={() => setWindow3(wn === 3)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-semibold border transition-all ${(wn === 3) === window3
                            ? 'bg-brand text-white border-brand'
                            : 'bg-white text-stone-500 border-stone-200'}`}>
                        {wn === 3 ? t(lang, 's1.spottingTheSignal.btn3Period') : t(lang, 's1.spottingTheSignal.btn7Period')}
                    </button>
                ))}
            </div>
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
                {/* Gridlines */}
                {[yMin, (yMin + yMax) / 2, yMax].map(v => (
                    <line key={v} x1={pad.l} x2={w - pad.r}
                        y1={toY(v)} y2={toY(v)} stroke="#f5f5f4" strokeWidth={1} />
                ))}
                {/* True mean line */}
                <line x1={pad.l} x2={w - pad.r}
                    y1={toY(FLAT_MEAN)} y2={toY(FLAT_MEAN)}
                    stroke="#059669" strokeWidth={1.5} strokeDasharray="6,4" opacity={0.6} />
                <text x={pad.l + 4} y={toY(FLAT_MEAN) - 4} fill="#059669" fontSize={8}>
                    {t(lang, 's1.spottingTheSignal.trueMeanLbl')}
                </text>
                {/* Raw line */}
                {rawData.map((d, i) => i > 0 && (
                    <line key={i}
                        x1={toX(i - 1)} y1={toY(rawData[i - 1].value)}
                        x2={toX(i)} y2={toY(d.value)}
                        stroke="#a8a29e" strokeWidth={1} opacity={0.5} />
                ))}
                {/* Smoothed line */}
                {smoothedByWindow.map((sd, wi) =>
                    sd.map((d, i) => i > 0 && (
                        <line key={`${wi}-${i}`}
                            x1={toX(i - 1)} y1={toY(sd[i - 1].value)}
                            x2={toX(i)} y2={toY(d.value)}
                            stroke={colors[wi]} strokeWidth={2.5} />
                    ))
                )}
                {/* X axis labels */}
                {MONTHS.map((m, i) => (
                    <text key={m} x={toX(i)} y={h - 4} fill="#a8a29e" fontSize={7} textAnchor="middle">
                        {m.slice(0, 1)}
                    </text>
                ))}
            </svg>
            <p className="text-[11px] text-stone-400 leading-relaxed">
                {window3
                    ? t(lang, 's1.spottingTheSignal.windowCaption3')
                    : t(lang, 's1.spottingTheSignal.windowCaption7')}
            </p>
        </div>
    );
}

// Apophenia demo: random walk that looks like trends
function ApopheniaDemo({ lang }: { lang: any }) {
    const [seed, setSeed] = useState(42);
    const data = useMemo(() => {
        const rand = seededRand(seed);
        let v = 50;
        return MONTHS.map((label) => {
            v = v + (rand() - 0.5) * 10;
            return { label, value: Math.max(30, Math.min(80, v)) };
        });
    }, [seed]);

    const w = 300, h = 120, pad = { l: 36, r: 16, t: 16, b: 28 };
    const allV = data.map(d => d.value);
    const yMin = Math.min(...allV) - 3;
    const yMax = Math.max(...allV) + 3;
    const xStep = (w - pad.l - pad.r) / (data.length - 1);
    const toX = (i: number) => pad.l + i * xStep;
    const toY = (v: number) => pad.t + (1 - (v - yMin) / (yMax - yMin)) * (h - pad.t - pad.b);

    // Linear regression
    const n = data.length;
    const xs = data.map((_, i) => i);
    const ys = data.map(d => d.value);
    const meanX = xs.reduce((a, b) => a + b, 0) / n;
    const meanY = ys.reduce((a, b) => a + b, 0) / n;
    const slope = xs.reduce((s, x, i) => s + (x - meanX) * (ys[i] - meanY), 0) /
        xs.reduce((s, x) => s + (x - meanX) ** 2, 0);
    const intercept = meanY - slope * meanX;
    const increasing = slope > 0;

    return (
        <div className="space-y-3">
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
                {[yMin, meanY, yMax].map(v => (
                    <line key={v} x1={pad.l} x2={w - pad.r}
                        y1={toY(v)} y2={toY(v)} stroke="#f5f5f4" strokeWidth={1} />
                ))}
                {data.map((d, i) => i > 0 && (
                    <line key={i}
                        x1={toX(i - 1)} y1={toY(data[i - 1].value)}
                        x2={toX(i)} y2={toY(d.value)}
                        stroke="#059669" strokeWidth={2} />
                ))}
                {/* Trend line */}
                <line
                    x1={toX(0)} y1={toY(intercept + slope * 0)}
                    x2={toX(n - 1)} y2={toY(intercept + slope * (n - 1))}
                    stroke="#dc2626" strokeWidth={1.5} strokeDasharray="5,3" opacity={0.8} />
                {data.map((d, i) => (
                    <circle key={i} cx={toX(i)} cy={toY(d.value)} r={3} fill="#059669" />
                ))}
                {MONTHS.map((m, i) => (
                    <text key={m} x={toX(i)} y={h - 4} fill="#a8a29e" fontSize={7} textAnchor="middle">
                        {m.slice(0, 1)}
                    </text>
                ))}
            </svg>
            <div className="flex items-center justify-between">
                <p className={`text-[12px] font-semibold ${increasing ? 'text-brand' : 'text-red-600'}`}>
                    {increasing ? t(lang, 's1.spottingTheSignal.brainSeesUp') : t(lang, 's1.spottingTheSignal.brainSeesDown')}
                </p>
                <p className="text-[11px] text-stone-400">{t(lang, 's1.spottingTheSignal.reality')}</p>
            </div>
            <button
                onClick={() => setSeed(s => (s * 7 + 13) % 1000)}
                className="w-full py-1.5 rounded-lg border border-stone-200 text-[11px] text-stone-500 hover:border-stone-400 transition-colors"
            >
                {t(lang, 's1.spottingTheSignal.regenBtn')}
            </button>
            <p className="text-[11px] text-stone-400 leading-relaxed">
                {t(lang, 's1.spottingTheSignal.regenDesc')}
            </p>
        </div>
    );
}

export default function SpottingTheSignalLesson() {
    const { lang } = useLang();
    const [withSmoothing, setWithSmoothing] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null);

    const rawData = useMemo(() => buildData(), []);
    const smoothedData = useMemo(() => movingAverage(rawData, 3), [rawData]);

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
            g.append('path').attr('class', 'raw-line');
            g.append('g').attr('class', 'dots');
            g.append('path').attr('class', 'smooth-line').attr('opacity', 0);

            const legend = g.append('g').attr('class', 'legend').attr('opacity', 0);
            legend.append('line')
                .attr('x1', 8).attr('y1', 8)
                .attr('x2', 26).attr('y2', 8)
                .attr('stroke', '#dc2626')
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', '5,3');
            legend.append('text')
                .attr('x', 30).attr('y', 11)
                .style('font-size', '8px')
                .style('fill', '#dc2626')
                .text(t(lang, 's1.spottingTheSignal.btnSmoothed'));

            g.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${innerH})`);
            g.append('g').attr('class', 'y-axis');
        }

        const g = svg.select('.main-group');
        const trans = svg.transition().duration(800).ease(d3.easeCubicOut) as any;

        const xScale = d3
            .scalePoint()
            .domain(MONTHS)
            .range([0, innerW])
            .padding(0.1);

        const allValues = rawData.map((d) => d.value);
        const yMin = Math.min(...allValues) - 3;
        const yMax = Math.max(...allValues) + 3;

        const yScale = d3.scaleLinear().domain([yMin, yMax]).range([innerH, 0]);

        // Gridlines
        g.select('.grid').selectAll('.grid-line')
            .data(yScale.ticks(4))
            .join('line')
            .attr('class', 'grid-line')
            .attr('x1', 0)
            .attr('x2', innerW)
            .attr('y1', d => yScale(d))
            .attr('y2', d => yScale(d))
            .attr('stroke', '#e7e5e4')
            .attr('stroke-width', 0.75);

        // Raw Line
        const lineGen = d3
            .line<{ label: string; value: number }>()
            .x((d) => xScale(d.label)!)
            .y((d) => yScale(d.value))
            .curve(d3.curveLinear);

        g.select('.raw-line')
            .datum(rawData)
            .attr('fill', 'none')
            .attr('stroke', '#059669')
            .attr('stroke-width', 2)
            .attr('d', lineGen as any);

        // Dots
        g.select('.dots').selectAll('.dot')
            .data(rawData)
            .join('circle')
            .attr('class', 'dot')
            .attr('cx', d => xScale(d.label)!)
            .attr('cy', d => yScale(d.value))
            .attr('r', 3)
            .attr('fill', '#059669');

        // Smoothed Line (Animated Opacity)
        const smoothGen = d3
            .line<{ label: string; value: number }>()
            .x((d) => xScale(d.label)!)
            .y((d) => yScale(d.value))
            .curve(d3.curveCatmullRom.alpha(0.5));

        g.select('.smooth-line')
            .datum(smoothedData)
            .attr('fill', 'none')
            .attr('stroke', '#dc2626')
            .attr('stroke-width', 2.5)
            .attr('stroke-dasharray', '5,3')
            .attr('d', smoothGen as any)
            .transition(trans)
            .attr('opacity', withSmoothing ? 1 : 0);

        // Legend Transition
        g.select('.legend')
            .transition(trans)
            .attr('opacity', withSmoothing ? 1 : 0);

        // X Axis
        g.select('.x-axis')
            .call(d3.axisBottom(xScale).tickSize(0) as any)
            .call((ax) => ax.select('.domain').attr('stroke', '#d6d3d1'))
            .selectAll('text')
            .style('font-size', '8px')
            .style('fill', '#78716c');

        // Y Axis
        g.select('.y-axis')
            .call(d3.axisLeft(yScale).ticks(4).tickFormat((d) => `${Math.round(Number(d))}`) as any)
            .call((ax) => ax.select('.domain').attr('stroke', '#d6d3d1'))
            .selectAll('text')
            .style('font-size', '8px')
            .style('fill', '#78716c');

    }, [withSmoothing, rawData, smoothedData]);

    return (
        <LessonPage crossRefs={crossRefs}>
            <div className="space-y-8">

                {/* Main explanation */}
                <div className="space-y-4">
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's1.spottingTheSignal.intro1') }} />
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's1.spottingTheSignal.intro2') }} />
                    <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's1.spottingTheSignal.intro3') }} />
                </div>

                {/* Apophenia demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                        {t(lang, 's1.spottingTheSignal.apopheniaTitle')}
                    </p>
                    <p className="text-[13px] text-stone-500 leading-relaxed">
                        {t(lang, 's1.spottingTheSignal.apopheniaDesc')}
                    </p>
                    <ApopheniaDemo lang={lang} />
                </div>

                {/* Manipulation techniques */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's1.spottingTheSignal.techTitle')}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            {
                                technique: t(lang, 's1.spottingTheSignal.tech1Name'),
                                mechanism: t(lang, 's1.spottingTheSignal.tech1Mech'),
                                detection: t(lang, 's1.spottingTheSignal.tech1Det'),
                                severity: 'Medium',
                            },
                            {
                                technique: t(lang, 's1.spottingTheSignal.tech2Name'),
                                mechanism: t(lang, 's1.spottingTheSignal.tech2Mech'),
                                detection: t(lang, 's1.spottingTheSignal.tech2Det'),
                                severity: 'High',
                            },
                            {
                                technique: t(lang, 's1.spottingTheSignal.tech3Name'),
                                mechanism: t(lang, 's1.spottingTheSignal.tech3Mech'),
                                detection: t(lang, 's1.spottingTheSignal.tech3Det'),
                                severity: 'Medium',
                            },
                            {
                                technique: t(lang, 's1.spottingTheSignal.tech4Name'),
                                mechanism: t(lang, 's1.spottingTheSignal.tech4Mech'),
                                detection: t(lang, 's1.spottingTheSignal.tech4Det'),
                                severity: 'High',
                            },
                        ].map((item) => (
                            <div key={item.technique} className="bg-white rounded-xl border border-stone-200 p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-[13px] font-bold text-stone-800">{item.technique}</p>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.severity === 'High'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-amber-100 text-amber-700'}`}>
                                        {item.severity === 'High' ? t(lang, 's1.spottingTheSignal.riskHigh') : t(lang, 's1.spottingTheSignal.riskMedium')}
                                    </span>
                                </div>
                                <p className="text-[12px] text-stone-600 leading-relaxed">{item.mechanism}</p>
                                <div className="rounded-lg bg-brand-muted border border-brand/30 px-3 py-2">
                                    <p className="text-[11px] font-semibold text-brand mb-0.5">{t(lang, 's1.spottingTheSignal.detectLbl')}</p>
                                    <p className="text-[11px] text-stone-700 leading-relaxed">{item.detection}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Smoothing window comparison */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's1.spottingTheSignal.windowTitle')}
                    </p>
                    <p className="text-[13px] text-stone-500 leading-relaxed">
                        {t(lang, 's1.spottingTheSignal.windowDesc')}
                    </p>
                    <SmoothingWindowChart lang={lang} />
                </div>

                {/* Interactive demo */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                    <div className="relative">
                        <span className="absolute top-0 right-0 text-xs font-bold text-stone-300 select-none">1.4</span>
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                            {t(lang, 's1.spottingTheSignal.demoTitle')}
                        </p>
                        <p className="text-[13px] text-stone-500 mb-4">
                            {t(lang, 's1.spottingTheSignal.demoDesc')}
                        </p>

                        <div className="flex justify-center py-3 overflow-x-auto">
                            <svg className="w-full max-w-2xl mx-auto block"
                                ref={svgRef}
                                viewBox={`0 0 ${W} ${H}`}
                                aria-label="Pattern recognition demo: noisy flat line with optional smoothing overlay"
                            />
                        </div>

                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span className={`text-[13px] font-medium transition-colors ${!withSmoothing ? 'text-stone-800' : 'text-stone-400'}`}>
                                {t(lang, 's1.spottingTheSignal.btnRaw')}
                            </span>
                            <button
                                onClick={() => setWithSmoothing((v) => !v)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${withSmoothing ? 'bg-brand' : 'bg-stone-200'}`}
                                aria-label="Toggle smoothing overlay"
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${withSmoothing ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <span className={`text-[13px] font-medium transition-colors ${withSmoothing ? 'text-stone-800' : 'text-stone-400'}`}>
                                {t(lang, 's1.spottingTheSignal.btnSmoothed')}
                            </span>
                        </div>

                        <p className="text-center text-[12px] text-stone-400 mt-2">
                            {withSmoothing
                                ? t(lang, 's1.spottingTheSignal.demoCapSmoothed')
                                : t(lang, 's1.spottingTheSignal.demoCapRaw')}
                        </p>
                    </div>
                </div>

                {/* Research note */}
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-5">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">{t(lang, 's1.spottingTheSignal.researchBTitle')}</p>
                    <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
                        {t(lang, 's1.spottingTheSignal.researchB1')}
                    </p>
                    <p className="text-[13px] text-stone-600 leading-relaxed">
                        {t(lang, 's1.spottingTheSignal.researchB2')}
                    </p>
                </div>
            </div>
        </LessonPage>
    );
}
