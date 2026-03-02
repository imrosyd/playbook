import { useState } from 'react';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LessonPage from '../../layout/LessonPage';
import TheoryBlock from '../../ui/TheoryBlock';

const crossRefs = (lang: any) => [
    { sectionId: 'lab', slug: 'axis-scale', label: t(lang, 's7.badChart.crossRefs.0.label') },
    { sectionId: 'ethics', slug: 'distortion', label: t(lang, 's7.badChart.crossRefs.1.label') },
];

type BadChartId = 'truncated' | 'area' | '3d' | 'pie';

interface BadChart {
    id: BadChartId;
    name: string;
    flaw: string;
    why: string;
    fix: string;
}

const BAD_CHARTS = (lang: any): BadChart[] => [
    {
        id: 'truncated',
        name: t(lang, 's7.badChart.charts.truncated.name'),
        flaw: t(lang, 's7.badChart.charts.truncated.flaw'),
        why: t(lang, 's7.badChart.charts.truncated.why'),
        fix: t(lang, 's7.badChart.charts.truncated.fix'),
    },
    {
        id: 'area',
        name: t(lang, 's7.badChart.charts.area.name'),
        flaw: t(lang, 's7.badChart.charts.area.flaw'),
        why: t(lang, 's7.badChart.charts.area.why'),
        fix: t(lang, 's7.badChart.charts.area.fix'),
    },
    {
        id: '3d',
        name: t(lang, 's7.badChart.charts.3d.name'),
        flaw: t(lang, 's7.badChart.charts.3d.flaw'),
        why: t(lang, 's7.badChart.charts.3d.why'),
        fix: t(lang, 's7.badChart.charts.3d.fix'),
    },
    {
        id: 'pie',
        name: t(lang, 's7.badChart.charts.pie.name'),
        flaw: t(lang, 's7.badChart.charts.pie.flaw'),
        why: t(lang, 's7.badChart.charts.pie.why'),
        fix: t(lang, 's7.badChart.charts.pie.fix'),
    },
];

// Chart 1: Truncated axis toggle
function TruncatedBarChart({ lang }: { lang: any }) {
    const data = [97.2, 97.8, 98.1, 98.9];
    const labels = ['Q1', 'Q2', 'Q3', 'Q4'];
    const [trunc, setTrunc] = useState(true);
    const minV = trunc ? 96 : 0;
    const maxV = 100;
    const w = 260, h = 120, pad = { l: 36, r: 12, t: 12, b: 28 };
    const bw = 36;
    const gap = (w - pad.l - pad.r - 4 * bw) / 5;
    const toY = (v: number) => pad.t + (1 - (v - minV) / (maxV - minV)) * (h - pad.t - pad.b);
    const bH = (v: number) => ((v - minV) / (maxV - minV)) * (h - pad.t - pad.b);

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone-400">{t(lang, 's7.badChart.truncated.axisStarts')}:</span>
                <button onClick={() => setTrunc(v => !v)}
                    className={`px-3 py-1 rounded text-[11px] font-bold border transition-all ${trunc ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200'}`}>
                    {trunc ? t(lang, 's7.badChart.truncated.btnTruncated') : t(lang, 's7.badChart.truncated.btnHonest')}
                </button>
            </div>
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
                {[minV, (minV + maxV) / 2, maxV].map(v => (
                    <line key={v} x1={pad.l} x2={w - pad.r} y1={toY(Math.min(v, maxV))} y2={toY(Math.min(v, maxV))} stroke="#f5f5f4" strokeWidth={1} />
                ))}
                {data.map((d, i) => {
                    const x = pad.l + (i + 1) * gap + i * bw;
                    return (
                        <g key={i}>
                            <rect x={x} y={toY(d)} width={bw} height={bH(d)} fill="#1c1917" rx={2} />
                            <text x={x + bw / 2} y={toY(d) - 4} fill="#1c1917" fontSize={8} textAnchor="middle">{d}%</text>
                            <text x={x + bw / 2} y={h - 8} fill="#a8a29e" fontSize={8} textAnchor="middle">{labels[i]}</text>
                        </g>
                    );
                })}
                {[minV, (minV + maxV) / 2, maxV].map(v => (
                    <text key={v} x={pad.l - 3} y={toY(Math.min(v, maxV)) + 3} fill="#a8a29e" fontSize={7} textAnchor="end">{v}%</text>
                ))}
            </svg>
            <p className="text-[11px] text-stone-400 leading-relaxed">
                {trunc
                    ? t(lang, 's7.badChart.truncated.descTruncated')
                    : t(lang, 's7.badChart.truncated.descHonest')}
            </p>
        </div>
    );
}

// Chart 2: Bubble chart showing area distortion
function AreaDistortionChart({ lang }: { lang: any }) {
    // Values: 10, 20, 40 — last should be 4× first, not 2×
    const data = [
        { label: t(lang, 's7.badChart.area.countryA'), value: 10, correct: true },
        { label: t(lang, 's7.badChart.area.countryB'), value: 20, correct: true },
        { label: t(lang, 's7.badChart.area.countryC'), value: 40, correct: true },
    ];

    // Correct: radius proportional to value (encodes area correctly)
    // Wrong: radius directly proportional to value (encodes radius, not area)
    const renderBubbles = (byArea: boolean) => {
        const w = 240, h = 90;
        const base = 8;
        return (
            <div className="flex-1">
                <p className="text-[9px] font-bold uppercase tracking-wider mb-2 text-center" style={{ color: byArea ? '#1c1917' : '#a8a29e' }}>
                    {byArea ? t(lang, 's7.badChart.area.correctLabel') : t(lang, 's7.badChart.area.wrongLabel')}
                </p>
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
                    {data.map((d, i) => {
                        const cx = (i + 1) * (w / (data.length + 1));
                        const r = byArea
                            ? base * Math.sqrt(d.value / data[0].value) * 3
                            : base * (d.value / data[0].value) * 2;
                        return (
                            <g key={i}>
                                <circle cx={cx} cy={h / 2 - 4} r={r} fill="#1c1917" opacity={byArea ? 0.85 : 0.5} />
                                <text x={cx} y={h - 4} fill="#78716c" fontSize={8} textAnchor="middle">{d.label}</text>
                                <text x={cx} y={h / 2 - 4 + 3} fill="white" fontSize={7} textAnchor="middle">{d.value}</text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        );
    };

    return (
        <div className="space-y-2">
            <div className="flex gap-4">
                {renderBubbles(false)}
                {renderBubbles(true)}
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
                {t(lang, 's7.badChart.area.description')}
            </p>
        </div>
    );
}

// Chart 3: Simulated 3D perspective distortion
function ThreeDPerspectiveChart({ lang }: { lang: any }) {
    const data = [50, 48, 49, 51]; // almost identical values
    const labels = ['Q1', 'Q2', 'Q3', 'Q4'];
    const w = 260, h = 120, pad = { l: 12, r: 12, t: 12, b: 36 };
    const bw = 36; const gap = (w - pad.l - pad.r - 4 * bw) / 5;
    const maxV = 70;
    const toY = (v: number) => pad.t + (1 - v / maxV) * (h - pad.t - pad.b);
    const bH = (v: number) => (v / maxV) * (h - pad.t - pad.b);

    // depth offset simulates 3D — makes rear bars look shorter
    const depthOffset = [20, 12, 6, 0];
    const depthH = [0.82, 0.88, 0.94, 1]; // scaling factor per "depth"

    return (
        <div className="space-y-2">
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
                {/* Background grid */}
                {[0, 30, 60].map(v => (
                    <line key={v} x1={pad.l} x2={w - pad.r} y1={toY(Math.min(v, maxV))} y2={toY(Math.min(v, maxV))} stroke="#f5f5f4" strokeWidth={1} />
                ))}
                {data.map((d, i) => {
                    const x = pad.l + (i + 1) * gap + i * bw;
                    const perspective = depthH[i];
                    const dy = depthOffset[i];
                    const apparentH = bH(d) * perspective;
                    const apparentY = h - pad.b - apparentH - dy;

                    return (
                        <g key={i}>
                            {/* 3D top face */}
                            <polygon
                                points={`${x},${apparentY} ${x + bw},${apparentY} ${x + bw - 8},${apparentY - 6} ${x - 8},${apparentY - 6}`}
                                fill="#78716c"
                            />
                            {/* 3D side face */}
                            <polygon
                                points={`${x + bw},${apparentY} ${x + bw - 8},${apparentY - 6} ${x + bw - 8},${h - pad.b - dy - 6} ${x + bw},${h - pad.b - dy}`}
                                fill="#44403c"
                            />
                            {/* Front face */}
                            <rect x={x} y={apparentY} width={bw} height={apparentH} fill="#1c1917" />
                            <text x={x + bw / 2} y={h - 8} fill="#a8a29e" fontSize={8} textAnchor="middle">{labels[i]}</text>
                            <text x={x + bw / 2} y={apparentY - 10} fill="#78716c" fontSize={8} textAnchor="middle">{d}</text>
                        </g>
                    );
                })}
            </svg>
            <p className="text-[11px] text-stone-400 leading-relaxed">
                {t(lang, 's7.badChart.3d.description')}
            </p>
        </div>
    );
}

// Chart 4: 11-slice pie vs. sorted horizontal bar — side by side
function ElevenSlicePieChart({ lang }: { lang: any }) {
    const data = [
        { label: 'A', v: 22 }, { label: 'B', v: 18 }, { label: 'C', v: 14 },
        { label: 'D', v: 11 }, { label: 'E', v: 9 }, { label: 'F', v: 8 },
        { label: 'G', v: 6 }, { label: 'H', v: 5 }, { label: 'I', v: 4 },
        { label: 'J', v: 2 }, { label: 'K', v: 1 },
    ];
    const total = data.reduce((s, d) => s + d.v, 0);

    // Greys palette so all slices look similar (the point!)
    const shades = ['#1c1917', '#292524', '#44403c', '#57534e', '#78716c',
        '#a8a29e', '#d6d3d1', '#e7e5e4', '#f5f5f4', '#b0ada9', '#6b6966'];

    const cx = 70, cy = 70, r = 62;
    let startAngle = -Math.PI / 2;
    const slices = data.map((d, i) => {
        const angle = (d.v / total) * 2 * Math.PI;
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(startAngle + angle);
        const y2 = cy + r * Math.sin(startAngle + angle);
        const large = angle > Math.PI ? 1 : 0;
        const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
        startAngle += angle;
        return { path, fill: shades[i], label: d.label };
    });

    return (
        <div className="space-y-2">
            <div className="flex items-start gap-4">
                <div>
                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-wider mb-2 text-center">{t(lang, 's7.badChart.pie.pieLabel')}</p>
                    <svg viewBox="0 0 480 220" className="w-full max-w-[140px]">
                        {slices.map((s, i) => (
                            <path key={i} d={s.path} fill={s.fill} stroke="white" strokeWidth={1} />
                        ))}
                    </svg>
                </div>
                <div className="flex-1">
                    <p className="text-[9px] font-bold text-stone-800 uppercase tracking-wider mb-2">{t(lang, 's7.badChart.pie.barLabel')}</p>
                    <div className="space-y-1.5">
                        {data.map((d, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="w-4 text-[9px] text-stone-400 text-right shrink-0">{d.label}</span>
                                <div className="flex-1 h-4 bg-stone-100 rounded overflow-hidden">
                                    <div className="h-full bg-stone-800 rounded" style={{ width: `${(d.v / data[0].v) * 100}%` }} />
                                </div>
                                <span className="w-7 text-[9px] text-stone-500 tabular-nums">{d.v}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
                {t(lang, 's7.badChart.pie.description')}
            </p>
        </div>
    );
}

const CHART_RENDERERS: Record<BadChartId, (lang: any) => React.ReactNode> = {
    truncated: (lang) => <TruncatedBarChart lang={lang} />,
    area: (lang) => <AreaDistortionChart lang={lang} />,
    '3d': (lang) => <ThreeDPerspectiveChart lang={lang} />,
    pie: (lang) => <ElevenSlicePieChart lang={lang} />,
};

export default function TheBadChartHallOfFameLesson() {
    const { lang } = useLang();
    const badCharts = BAD_CHARTS(lang);
    const [selected, setSelected] = useState<BadChartId>('truncated');
    const chart = badCharts.find(c => c.id === selected)!;

    return (
        <LessonPage crossRefs={crossRefs(lang)}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's7.badChart.intro') }} />

                <TheoryBlock
                    title={t(lang, 's7.badChart.theory.title')}
                    theory={t(lang, 's7.badChart.theory.subtitle')}
                    explanation={t(lang, 's7.badChart.theory.explanation')}
                />

                <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{t(lang, 's7.badChart.selectPrompt')}</p>
                    <div className="flex flex-wrap gap-2">
                        {badCharts.map(c => (
                            <button
                                key={c.id}
                                onClick={() => setSelected(c.id)}
                                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${selected === c.id
                                    ? 'bg-stone-900 text-white border-stone-900'
                                    : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                                    }`}
                            >
                                {c.name}
                            </button>
                        ))}
                    </div>

                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-4">
                        {CHART_RENDERERS[selected](lang)}
                        <div className="space-y-3 pt-2 border-t border-stone-200">
                            <div>
                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">{t(lang, 's7.badChart.details.flaw')}</p>
                                <p className="text-[13px] text-stone-700 leading-relaxed">{chart.flaw}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">{t(lang, 's7.badChart.details.why')}</p>
                                <p className="text-[13px] text-stone-600 leading-relaxed">{chart.why}</p>
                            </div>
                            <div className="bg-white border border-stone-200 rounded-lg p-3">
                                <p className="text-[10px] font-bold text-stone-800 uppercase tracking-wider mb-1">{t(lang, 's7.badChart.details.fix')}</p>
                                <p className="text-[13px] text-stone-700 leading-relaxed">{chart.fix}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LessonPage>
    );
}
