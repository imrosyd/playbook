import { useState } from 'react';
import LessonPage from '../../layout/LessonPage';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import ChartFamilyLesson, { type ChartSpec } from './ChartFamilyLesson';
import {
    VerticalBarMini,
    HorizontalBarMini,
    GroupedBarMini,
    StackedBarMini,
    StackedBar100Mini,
    LollipopMini,
    DotPlotMini,
    BulletMini,
    DumbbellMini,
    ParetoMini,
} from '../../charts/demos/MiniCharts';

const getCharts = (lang: any): ChartSpec[] => [
    {
        slug: 'vertical-bar',
        name: t(lang, 's2.whoIsWinning.charts.verticalBar.name'),
        whenToUse: [
            t(lang, 's2.whoIsWinning.charts.verticalBar.whenToUse.0'),
            t(lang, 's2.whoIsWinning.charts.verticalBar.whenToUse.1'),
            t(lang, 's2.whoIsWinning.charts.verticalBar.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whoIsWinning.charts.verticalBar.whenNotToUse.0'),
            t(lang, 's2.whoIsWinning.charts.verticalBar.whenNotToUse.1'),
            t(lang, 's2.whoIsWinning.charts.verticalBar.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whoIsWinning.charts.verticalBar.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whoIsWinning.charts.verticalBar.cognitiveRef'),
        ethicalRef: t(lang, 's2.whoIsWinning.charts.verticalBar.ethicalRef'),
        demo: <VerticalBarMini />,
    },
    {
        slug: 'horizontal-bar',
        name: t(lang, 's2.whoIsWinning.charts.horizontalBar.name'),
        whenToUse: [
            t(lang, 's2.whoIsWinning.charts.horizontalBar.whenToUse.0'),
            t(lang, 's2.whoIsWinning.charts.horizontalBar.whenToUse.1'),
            t(lang, 's2.whoIsWinning.charts.horizontalBar.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whoIsWinning.charts.horizontalBar.whenNotToUse.0'),
            t(lang, 's2.whoIsWinning.charts.horizontalBar.whenNotToUse.1'),
            t(lang, 's2.whoIsWinning.charts.horizontalBar.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whoIsWinning.charts.horizontalBar.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whoIsWinning.charts.horizontalBar.cognitiveRef'),
        ethicalRef: t(lang, 's2.whoIsWinning.charts.horizontalBar.ethicalRef'),
        demo: <HorizontalBarMini />,
    },
    {
        slug: 'grouped-bar',
        name: t(lang, 's2.whoIsWinning.charts.groupedBar.name'),
        whenToUse: [
            t(lang, 's2.whoIsWinning.charts.groupedBar.whenToUse.0'),
            t(lang, 's2.whoIsWinning.charts.groupedBar.whenToUse.1'),
            t(lang, 's2.whoIsWinning.charts.groupedBar.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whoIsWinning.charts.groupedBar.whenNotToUse.0'),
            t(lang, 's2.whoIsWinning.charts.groupedBar.whenNotToUse.1'),
            t(lang, 's2.whoIsWinning.charts.groupedBar.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whoIsWinning.charts.groupedBar.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whoIsWinning.charts.groupedBar.cognitiveRef'),
        ethicalRef: t(lang, 's2.whoIsWinning.charts.groupedBar.ethicalRef'),
        demo: <GroupedBarMini />,
    },
    {
        slug: 'stacked-bar',
        name: t(lang, 's2.whoIsWinning.charts.stackedBar.name'),
        whenToUse: [
            t(lang, 's2.whoIsWinning.charts.stackedBar.whenToUse.0'),
            t(lang, 's2.whoIsWinning.charts.stackedBar.whenToUse.1'),
            t(lang, 's2.whoIsWinning.charts.stackedBar.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whoIsWinning.charts.stackedBar.whenNotToUse.0'),
            t(lang, 's2.whoIsWinning.charts.stackedBar.whenNotToUse.1'),
            t(lang, 's2.whoIsWinning.charts.stackedBar.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whoIsWinning.charts.stackedBar.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whoIsWinning.charts.stackedBar.cognitiveRef'),
        ethicalRef: t(lang, 's2.whoIsWinning.charts.stackedBar.ethicalRef'),
        demo: <StackedBarMini />,
    },
    {
        slug: 'stacked-bar-100',
        name: t(lang, 's2.whoIsWinning.charts.stackedBar100.name'),
        whenToUse: [
            t(lang, 's2.whoIsWinning.charts.stackedBar100.whenToUse.0'),
            t(lang, 's2.whoIsWinning.charts.stackedBar100.whenToUse.1'),
            t(lang, 's2.whoIsWinning.charts.stackedBar100.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whoIsWinning.charts.stackedBar100.whenNotToUse.0'),
            t(lang, 's2.whoIsWinning.charts.stackedBar100.whenNotToUse.1'),
            t(lang, 's2.whoIsWinning.charts.stackedBar100.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whoIsWinning.charts.stackedBar100.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whoIsWinning.charts.stackedBar100.cognitiveRef'),
        ethicalRef: t(lang, 's2.whoIsWinning.charts.stackedBar100.ethicalRef'),
        demo: <StackedBar100Mini />,
    },
    {
        slug: 'lollipop',
        name: t(lang, 's2.whoIsWinning.charts.lollipop.name'),
        whenToUse: [
            t(lang, 's2.whoIsWinning.charts.lollipop.whenToUse.0'),
            t(lang, 's2.whoIsWinning.charts.lollipop.whenToUse.1'),
            t(lang, 's2.whoIsWinning.charts.lollipop.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whoIsWinning.charts.lollipop.whenNotToUse.0'),
            t(lang, 's2.whoIsWinning.charts.lollipop.whenNotToUse.1'),
            t(lang, 's2.whoIsWinning.charts.lollipop.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whoIsWinning.charts.lollipop.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whoIsWinning.charts.lollipop.cognitiveRef'),
        demo: <LollipopMini />,
    },
    {
        slug: 'dot-plot',
        name: t(lang, 's2.whoIsWinning.charts.dotPlot.name'),
        whenToUse: [
            t(lang, 's2.whoIsWinning.charts.dotPlot.whenToUse.0'),
            t(lang, 's2.whoIsWinning.charts.dotPlot.whenToUse.1'),
            t(lang, 's2.whoIsWinning.charts.dotPlot.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whoIsWinning.charts.dotPlot.whenNotToUse.0'),
            t(lang, 's2.whoIsWinning.charts.dotPlot.whenNotToUse.1'),
            t(lang, 's2.whoIsWinning.charts.dotPlot.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whoIsWinning.charts.dotPlot.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whoIsWinning.charts.dotPlot.cognitiveRef'),
        ethicalRef: t(lang, 's2.whoIsWinning.charts.dotPlot.ethicalRef'),
        demo: <DotPlotMini />,
    },
    {
        slug: 'bullet',
        name: t(lang, 's2.whoIsWinning.charts.bullet.name'),
        whenToUse: [
            t(lang, 's2.whoIsWinning.charts.bullet.whenToUse.0'),
            t(lang, 's2.whoIsWinning.charts.bullet.whenToUse.1'),
            t(lang, 's2.whoIsWinning.charts.bullet.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whoIsWinning.charts.bullet.whenNotToUse.0'),
            t(lang, 's2.whoIsWinning.charts.bullet.whenNotToUse.1'),
            t(lang, 's2.whoIsWinning.charts.bullet.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whoIsWinning.charts.bullet.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whoIsWinning.charts.bullet.cognitiveRef'),
        ethicalRef: t(lang, 's2.whoIsWinning.charts.bullet.ethicalRef'),
        demo: <BulletMini />,
    },
    {
        slug: 'dumbbell',
        name: t(lang, 's2.whoIsWinning.charts.dumbbell.name'),
        whenToUse: [
            t(lang, 's2.whoIsWinning.charts.dumbbell.whenToUse.0'),
            t(lang, 's2.whoIsWinning.charts.dumbbell.whenToUse.1'),
            t(lang, 's2.whoIsWinning.charts.dumbbell.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whoIsWinning.charts.dumbbell.whenNotToUse.0'),
            t(lang, 's2.whoIsWinning.charts.dumbbell.whenNotToUse.1'),
            t(lang, 's2.whoIsWinning.charts.dumbbell.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whoIsWinning.charts.dumbbell.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whoIsWinning.charts.dumbbell.cognitiveRef'),
        ethicalRef: t(lang, 's2.whoIsWinning.charts.dumbbell.ethicalRef'),
        demo: <DumbbellMini />,
    },
    {
        slug: 'pareto',
        name: t(lang, 's2.whoIsWinning.charts.pareto.name'),
        whenToUse: [
            t(lang, 's2.whoIsWinning.charts.pareto.whenToUse.0'),
            t(lang, 's2.whoIsWinning.charts.pareto.whenToUse.1'),
            t(lang, 's2.whoIsWinning.charts.pareto.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whoIsWinning.charts.pareto.whenNotToUse.0'),
            t(lang, 's2.whoIsWinning.charts.pareto.whenNotToUse.1'),
            t(lang, 's2.whoIsWinning.charts.pareto.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whoIsWinning.charts.pareto.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whoIsWinning.charts.pareto.cognitiveRef'),
        ethicalRef: t(lang, 's2.whoIsWinning.charts.pareto.ethicalRef'),
        demo: <ParetoMini />,
    },
];

// Cleveland-McGill accuracy hierarchy chart
function AccuracyHierarchyChart({ lang }: { lang: any }) {
    const encodings = [
        { rank: 1, name: t(lang, 's2.whoIsWinning.hierarchy.enc1name'), accuracy: 95, example: t(lang, 's2.whoIsWinning.hierarchy.enc1ex') },
        { rank: 2, name: t(lang, 's2.whoIsWinning.hierarchy.enc2name'), accuracy: 78, example: t(lang, 's2.whoIsWinning.hierarchy.enc2ex') },
        { rank: 3, name: t(lang, 's2.whoIsWinning.hierarchy.enc3name'), accuracy: 74, example: t(lang, 's2.whoIsWinning.hierarchy.enc3ex') },
        { rank: 4, name: t(lang, 's2.whoIsWinning.hierarchy.enc4name'), accuracy: 68, example: t(lang, 's2.whoIsWinning.hierarchy.enc4ex') },
        { rank: 5, name: t(lang, 's2.whoIsWinning.hierarchy.enc5name'), accuracy: 55, example: t(lang, 's2.whoIsWinning.hierarchy.enc5ex') },
        { rank: 6, name: t(lang, 's2.whoIsWinning.hierarchy.enc6name'), accuracy: 42, example: t(lang, 's2.whoIsWinning.hierarchy.enc6ex') },
        { rank: 7, name: t(lang, 's2.whoIsWinning.hierarchy.enc7name'), accuracy: 28, example: t(lang, 's2.whoIsWinning.hierarchy.enc7ex') },
        { rank: 8, name: t(lang, 's2.whoIsWinning.hierarchy.enc8name'), accuracy: 21, example: t(lang, 's2.whoIsWinning.hierarchy.enc8ex') },
    ];
    const w = 480, h = 220, pad = { l: 170, r: 70, t: 18, b: 28 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const barH = 16;
    const gap = (innerH - encodings.length * barH) / (encodings.length + 1);
    const color = (a: number) => a >= 70 ? '#059669' : a >= 45 ? '#f59e0b' : '#ef4444';

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
            {[0, 25, 50, 75, 100].map(v => (
                <g key={v}>
                    <line x1={pad.l + (v / 100) * innerW} x2={pad.l + (v / 100) * innerW}
                        y1={pad.t} y2={h - pad.b} stroke="#f5f5f4" strokeWidth={1} />
                    <text x={pad.l + (v / 100) * innerW} y={h - 6}
                        fill="#a8a29e" fontSize={9} textAnchor="middle">{v}%</text>
                </g>
            ))}
            {encodings.map((e, i) => {
                const y = pad.t + gap + i * (barH + gap);
                const bw = (e.accuracy / 100) * innerW;
                const c = color(e.accuracy);
                return (
                    <g key={e.rank}>
                        <text x={4} y={y + barH / 2 + 4} fill="#a8a29e" fontSize={9}>
                            #{e.rank}
                        </text>
                        <text x={20} y={y + barH / 2 + 4} fill="#78716c" fontSize={10} textAnchor="start">
                            {e.name}
                        </text>
                        <rect x={pad.l} y={y} width={bw} height={barH} fill={c} rx={3} opacity={0.85} />
                        <text x={pad.l + bw + 5} y={y + barH / 2 + 4} fill={c} fontSize={10}>{e.accuracy}%</text>
                    </g>
                );
            })}
            <text x={pad.l + innerW / 2} y={pad.t - 4} fill="#78716c" fontSize={10} textAnchor="middle">
                {t(lang, 's2.whoIsWinning.perceptualAccuracyLbl')}
            </text>
        </svg>
    );
}
// Grouped Bar vs Dumbbell comparison
function GroupedVsDumbbellDemo({ lang }: { lang: any }) {
    const [isDumbbell, setIsDumbbell] = useState(true);

    // Ranked by "after" value to highlight the end state
    const data = [
        { label: 'Region 3', before: 30, after: 85 },
        { label: 'Region 1', before: 45, after: 65 },
        { label: 'Region 4', before: 70, after: 55 },
        { label: 'Region 5', before: 20, after: 40 },
        { label: 'Region 2', before: 60, after: 35 },
    ];

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-5 shadow-sm">
            <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                <div>
                    <h3 className="text-[13px] font-bold text-stone-700 tracking-wide">
                        {t(lang, 's2.whoIsWinning.dumbbellChartTitle')}
                    </h3>
                    <p className="text-[11px] text-stone-500">{t(lang, 's2.whoIsWinning.dumbbellChartDesc')}</p>
                </div>
                <button
                    onClick={() => setIsDumbbell(!isDumbbell)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${isDumbbell ? 'bg-brand text-white' : 'bg-stone-100 text-stone-600 border border-stone-200'}`}
                >
                    {isDumbbell ? t(lang, 's2.whoIsWinning.btnSwitchGrouped') : t(lang, 's2.whoIsWinning.btnSwitchDumbbell')}
                </button>
            </div>

            <div className="flex gap-4 items-center justify-center text-[10px] font-bold uppercase tracking-wider text-stone-500">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-stone-300"></span> 2023</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-brand"></span> 2024</div>
            </div>

            <div className="py-2 space-y-5">
                {data.map(d => {
                    const isIncrease = d.after > d.before;
                    const diff = Math.abs(d.after - d.before);
                    const min = Math.min(d.before, d.after);

                    return (
                        <div key={d.label} className="relative h-6 flex items-center">
                            {/* Label */}
                            <div className="w-20 text-[11px] font-bold text-stone-600 text-right pr-4">
                                {d.label}
                            </div>

                            {/* Chart Area */}
                            <div className="flex-1 relative h-full bg-stone-50/50 rounded flex items-center border-l border-stone-200">
                                {isDumbbell ? (
                                    <>
                                        {/* Dumbbell connecting line */}
                                        <div
                                            className="absolute h-[3px] rounded-full z-0 transition-all duration-500 ease-in-out"
                                            style={{
                                                left: `${min}%`,
                                                width: `${diff}%`,
                                                backgroundColor: isIncrease ? '#10b981' : '#f43f5e' // green for up, rose for down
                                            }}
                                        ></div>
                                        {/* Before dot */}
                                        <div
                                            className="absolute w-3.5 h-3.5 rounded-full bg-stone-300 z-10 -ml-[7px] transition-all duration-500 ease-in-out border-2 border-white shadow-sm"
                                            style={{ left: `${d.before}%` }}
                                        ></div>
                                        {/* After dot */}
                                        <div
                                            className="absolute w-4 h-4 rounded-full bg-brand z-20 -ml-[8px] transition-all duration-500 ease-in-out border-2 border-white shadow-sm"
                                            style={{ left: `${d.after}%` }}
                                        ></div>
                                        {/* Delta label */}
                                        <div
                                            className="absolute -top-4 text-[9px] font-bold z-30 transition-all duration-500 opacity-80"
                                            style={{
                                                left: `${min + (diff / 2)}%`,
                                                transform: 'translateX(-50%)',
                                                color: isIncrease ? '#059669' : '#e11d48'
                                            }}
                                        >
                                            {isIncrease ? '+' : '-'}{diff}%
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Grouped Bar for Before */}
                                        <div
                                            className="absolute h-2.5 bg-stone-300 top-0.5 rounded-r-sm transition-all duration-500 ease-in-out"
                                            style={{ left: 0, width: `${d.before}%` }}
                                        ></div>
                                        {/* Grouped Bar for After */}
                                        <div
                                            className="absolute h-2.5 bg-brand bottom-0.5 rounded-r-sm transition-all duration-500 ease-in-out"
                                            style={{ left: 0, width: `${d.after}%` }}
                                        ></div>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex border-t border-stone-100 justify-end pt-1 pr-2">
                <div className="w-[calc(100%-5rem)] flex justify-between text-[9px] text-stone-400 font-bold">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                </div>
            </div>

            <div className="bg-stone-50 rounded-lg p-4 border border-stone-100 mt-2">
                <p className="text-[12px] text-stone-600 leading-relaxed text-center"
                    dangerouslySetInnerHTML={{ __html: isDumbbell ? t(lang, 's2.whoIsWinning.dumbbellExp') : t(lang, 's2.whoIsWinning.groupedExp') }}
                />
            </div>
        </div>
    );
}

export default function WhoIsWinningLesson() {
    const { lang } = useLang();

    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive Attributes: length is rank 2 in the accuracy hierarchy' },
                { sectionId: 'perception', slug: 'anchoring', label: '1.3 — Anchoring: how axis baseline controls every bar comparison' },
                { sectionId: 'lab', slug: 'axis-scale', label: '3.1 — Axis & Scale: see how truncation distorts bar charts' },
            ]}
        >
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.whoIsWinning.intro1') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.whoIsWinning.intro2') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.whoIsWinning.intro3') }} />

                {/* Accuracy hierarchy */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's2.whoIsWinning.accuracyTitle')}
                    </p>
                    <AccuracyHierarchyChart lang={lang} />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        {t(lang, 's2.whoIsWinning.accuracyNote')}
                    </p>
                </div>

                {/* Bar chart elements */}
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-5">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                        {t(lang, 's2.whoIsWinning.designTitle')}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            {
                                decision: t(lang, 's2.whoIsWinning.designDecision1Name'),
                                honest: t(lang, 's2.whoIsWinning.designDecision1Honest'),
                                risk: t(lang, 's2.whoIsWinning.designDecision1Risk'),
                            },
                            {
                                decision: t(lang, 's2.whoIsWinning.designDecision2Name'),
                                honest: t(lang, 's2.whoIsWinning.designDecision2Honest'),
                                risk: t(lang, 's2.whoIsWinning.designDecision2Risk'),
                            },
                            {
                                decision: t(lang, 's2.whoIsWinning.designDecision3Name'),
                                honest: t(lang, 's2.whoIsWinning.designDecision3Honest'),
                                risk: t(lang, 's2.whoIsWinning.designDecision3Risk'),
                            },
                            {
                                decision: t(lang, 's2.whoIsWinning.designDecision4Name'),
                                honest: t(lang, 's2.whoIsWinning.designDecision4Honest'),
                                risk: t(lang, 's2.whoIsWinning.designDecision4Risk'),
                            },
                        ].map((d, i) => (
                            <div key={i} className="bg-white rounded-xl border border-stone-200 p-3 space-y-1.5">
                                <p className="text-[12px] font-bold text-stone-800">{d.decision}</p>
                                <p className="text-[11px] text-brand leading-relaxed">✓ {d.honest}</p>
                                <p className="text-[11px] text-red-600 leading-relaxed">⚠ {d.risk}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dumbbell Chart Lab */}
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's2.whoIsWinning.dumbbellLabTitle')}
                    </p>
                    <GroupedVsDumbbellDemo lang={lang} />
                </div>
            </div>

            <ChartFamilyLesson
                charts={getCharts(lang)}
                clevelandNote={t(lang, 's2.whoIsWinning.clevelandNote')}
            />
        </LessonPage>
    );
}
