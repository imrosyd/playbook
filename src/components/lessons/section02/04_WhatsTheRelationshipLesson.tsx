import LessonPage from '../../layout/LessonPage';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import ChartFamilyLesson, { type ChartSpec } from './ChartFamilyLesson';
import {
    ScatterMini,
    BubbleMini,
    RegressionMini,
    ConnectedScatterMini,
    HexbinMini,
    HeatmapMini,
} from '../../charts/demos/MiniCharts';

const getCharts = (lang: any): ChartSpec[] => [
    {
        slug: 'scatter',
        name: t(lang, 's2.whatsTheRelationship.charts.scatter.name'),
        whenToUse: [
            t(lang, 's2.whatsTheRelationship.charts.scatter.whenToUse.0'),
            t(lang, 's2.whatsTheRelationship.charts.scatter.whenToUse.1'),
            t(lang, 's2.whatsTheRelationship.charts.scatter.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whatsTheRelationship.charts.scatter.whenNotToUse.0'),
            t(lang, 's2.whatsTheRelationship.charts.scatter.whenNotToUse.1'),
            t(lang, 's2.whatsTheRelationship.charts.scatter.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whatsTheRelationship.charts.scatter.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whatsTheRelationship.charts.scatter.cognitiveRef'),
        ethicalRef: t(lang, 's2.whatsTheRelationship.charts.scatter.ethicalRef'),
        demo: <ScatterMini />,
    },
    {
        slug: 'bubble',
        name: t(lang, 's2.whatsTheRelationship.charts.bubble.name'),
        whenToUse: [
            t(lang, 's2.whatsTheRelationship.charts.bubble.whenToUse.0'),
            t(lang, 's2.whatsTheRelationship.charts.bubble.whenToUse.1'),
            t(lang, 's2.whatsTheRelationship.charts.bubble.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whatsTheRelationship.charts.bubble.whenNotToUse.0'),
            t(lang, 's2.whatsTheRelationship.charts.bubble.whenNotToUse.1'),
            t(lang, 's2.whatsTheRelationship.charts.bubble.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whatsTheRelationship.charts.bubble.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whatsTheRelationship.charts.bubble.cognitiveRef'),
        ethicalRef: t(lang, 's2.whatsTheRelationship.charts.bubble.ethicalRef'),
        demo: <BubbleMini />,
    },
    {
        slug: 'regression',
        name: t(lang, 's2.whatsTheRelationship.charts.regression.name'),
        whenToUse: [
            t(lang, 's2.whatsTheRelationship.charts.regression.whenToUse.0'),
            t(lang, 's2.whatsTheRelationship.charts.regression.whenToUse.1'),
            t(lang, 's2.whatsTheRelationship.charts.regression.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whatsTheRelationship.charts.regression.whenNotToUse.0'),
            t(lang, 's2.whatsTheRelationship.charts.regression.whenNotToUse.1'),
            t(lang, 's2.whatsTheRelationship.charts.regression.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whatsTheRelationship.charts.regression.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whatsTheRelationship.charts.regression.cognitiveRef'),
        ethicalRef: t(lang, 's2.whatsTheRelationship.charts.regression.ethicalRef'),
        demo: <RegressionMini />,
    },
    {
        slug: 'connected-scatter',
        name: t(lang, 's2.whatsTheRelationship.charts.connectedScatter.name'),
        whenToUse: [
            t(lang, 's2.whatsTheRelationship.charts.connectedScatter.whenToUse.0'),
            t(lang, 's2.whatsTheRelationship.charts.connectedScatter.whenToUse.1'),
            t(lang, 's2.whatsTheRelationship.charts.connectedScatter.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whatsTheRelationship.charts.connectedScatter.whenNotToUse.0'),
            t(lang, 's2.whatsTheRelationship.charts.connectedScatter.whenNotToUse.1'),
            t(lang, 's2.whatsTheRelationship.charts.connectedScatter.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whatsTheRelationship.charts.connectedScatter.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whatsTheRelationship.charts.connectedScatter.cognitiveRef'),
        ethicalRef: t(lang, 's2.whatsTheRelationship.charts.connectedScatter.ethicalRef'),
        demo: <ConnectedScatterMini />,
    },
    {
        slug: 'hexbin',
        name: t(lang, 's2.whatsTheRelationship.charts.hexbin.name'),
        whenToUse: [
            t(lang, 's2.whatsTheRelationship.charts.hexbin.whenToUse.0'),
            t(lang, 's2.whatsTheRelationship.charts.hexbin.whenToUse.1'),
            t(lang, 's2.whatsTheRelationship.charts.hexbin.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whatsTheRelationship.charts.hexbin.whenNotToUse.0'),
            t(lang, 's2.whatsTheRelationship.charts.hexbin.whenNotToUse.1'),
            t(lang, 's2.whatsTheRelationship.charts.hexbin.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whatsTheRelationship.charts.hexbin.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whatsTheRelationship.charts.hexbin.cognitiveRef'),
        ethicalRef: t(lang, 's2.whatsTheRelationship.charts.hexbin.ethicalRef'),
        demo: <HexbinMini />,
    },
    {
        slug: 'heatmap',
        name: t(lang, 's2.whatsTheRelationship.charts.heatmap.name'),
        whenToUse: [
            t(lang, 's2.whatsTheRelationship.charts.heatmap.whenToUse.0'),
            t(lang, 's2.whatsTheRelationship.charts.heatmap.whenToUse.1'),
            t(lang, 's2.whatsTheRelationship.charts.heatmap.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.whatsTheRelationship.charts.heatmap.whenNotToUse.0'),
            t(lang, 's2.whatsTheRelationship.charts.heatmap.whenNotToUse.1'),
            t(lang, 's2.whatsTheRelationship.charts.heatmap.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.whatsTheRelationship.charts.heatmap.interpretationRisk'),
        cognitiveRef: t(lang, 's2.whatsTheRelationship.charts.heatmap.cognitiveRef'),
        ethicalRef: t(lang, 's2.whatsTheRelationship.charts.heatmap.ethicalRef'),
        demo: <HeatmapMini />,
    },
];


// Spurious correlation demo chart
function SpuriousCorrelationChart({ lang }: { lang: any }) {
    // "ice cream sales vs drowning deaths" type spurious correlation
    const months = [
        t(lang, 's2.whatsTheRelationship.spuriousDemo.months.0'),
        t(lang, 's2.whatsTheRelationship.spuriousDemo.months.1'),
        t(lang, 's2.whatsTheRelationship.spuriousDemo.months.2'),
        t(lang, 's2.whatsTheRelationship.spuriousDemo.months.3'),
        t(lang, 's2.whatsTheRelationship.spuriousDemo.months.4'),
        t(lang, 's2.whatsTheRelationship.spuriousDemo.months.5'),
        t(lang, 's2.whatsTheRelationship.spuriousDemo.months.6'),
        t(lang, 's2.whatsTheRelationship.spuriousDemo.months.7'),
        t(lang, 's2.whatsTheRelationship.spuriousDemo.months.8'),
        t(lang, 's2.whatsTheRelationship.spuriousDemo.months.9'),
        t(lang, 's2.whatsTheRelationship.spuriousDemo.months.10'),
        t(lang, 's2.whatsTheRelationship.spuriousDemo.months.11'),
    ];

    const data = [
        { month: months[0], iceCream: 12, drowning: 8 },
        { month: months[1], iceCream: 18, drowning: 10 },
        { month: months[2], iceCream: 30, drowning: 16 },
        { month: months[3], iceCream: 48, drowning: 22 },
        { month: months[4], iceCream: 68, drowning: 35 },
        { month: months[5], iceCream: 90, drowning: 52 },
        { month: months[6], iceCream: 98, drowning: 58 },
        { month: months[7], iceCream: 94, drowning: 54 },
        { month: months[8], iceCream: 72, drowning: 38 },
        { month: months[9], iceCream: 42, drowning: 20 },
        { month: months[10], iceCream: 25, drowning: 12 },
        { month: months[11], iceCream: 14, drowning: 9 },
    ];
    const w = 480, h = 220, pad = { l: 20, r: 20, t: 36, b: 40 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const n = data.length;
    const toX = (i: number) => pad.l + (i / (n - 1)) * innerW;
    const toY1 = (v: number) => pad.t + (1 - v / 100) * innerH;
    const toY2 = (v: number) => pad.t + (1 - v / 60) * innerH;

    const iceLine = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY1(d.iceCream)}`).join(' ');
    const drownLine = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY2(d.drowning)}`).join(' ');

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto block">
            <text x={pad.l} y={18} fill="#059669" fontSize={11}>{t(lang, 's2.whatsTheRelationship.spuriousDemo.iceCreamSales')}</text>
            <text x={pad.l + 150} y={18} fill="#dc2626" fontSize={11}>{t(lang, 's2.whatsTheRelationship.spuriousDemo.drowningDeaths')}</text>
            <text x={pad.l + 380} y={18} fill="#a8a29e" fontSize={10} fontStyle="italic">{t(lang, 's2.whatsTheRelationship.spuriousDemo.correlationValue')}</text>

            <path d={iceLine} fill="none" stroke="#059669" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            <path d={drownLine} fill="none" stroke="#dc2626" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

            {data.map((d, i) => (
                <g key={d.month}>
                    <text x={toX(i)} y={h - pad.b + 16} fill="#a8a29e" fontSize={9} textAnchor="middle">{d.month}</text>
                </g>
            ))}

            <rect x={pad.l} y={h - 32} width={w - pad.l - pad.r} height={18} rx={4} fill="#fef9c3" opacity={0.9} />
            <text x={w / 2} y={h - 19} fill="#92400e" fontSize={10} textAnchor="middle">
                {t(lang, 's2.whatsTheRelationship.spuriousDemo.confoundNote')}
            </text>
        </svg>
    );
}

function CategoricalHeatmapDemo({ lang }: { lang: any }) {
    const days = [
        t(lang, 's2.whatsTheRelationship.heatmapDemo.days.0'),
        t(lang, 's2.whatsTheRelationship.heatmapDemo.days.1'),
        t(lang, 's2.whatsTheRelationship.heatmapDemo.days.2'),
        t(lang, 's2.whatsTheRelationship.heatmapDemo.days.3'),
        t(lang, 's2.whatsTheRelationship.heatmapDemo.days.4'),
    ];
    const times = [
        t(lang, 's2.whatsTheRelationship.heatmapDemo.times.0'),
        t(lang, 's2.whatsTheRelationship.heatmapDemo.times.1'),
        t(lang, 's2.whatsTheRelationship.heatmapDemo.times.2'),
    ];

    // Density data: 0 to 1
    const rawData = [
        [0.2, 0.5, 0.8, 0.6, 0.3], // Morning
        [0.4, 0.7, 0.9, 0.8, 0.4], // Afternoon
        [0.1, 0.3, 0.5, 0.4, 0.9]  // Evening
    ];

    const w = 400, h = 250, pad = { l: 80, r: 20, t: 30, b: 40 };
    const chartW = w - pad.l - pad.r;
    const chartH = h - pad.t - pad.b;
    const cellW = chartW / days.length;
    const cellH = chartH / times.length;

    // A simple sequential color scale (blues)
    const colorScale = (val: number) => {
        // Linear interpolation from very light blue to dark blue
        const r = Math.round(240 - val * (240 - 30));
        const g = Math.round(248 - val * (248 - 64));
        const b = Math.round(255 - val * (255 - 175));
        return `rgb(${r}, ${g}, ${b})`;
    };

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-6 shadow-sm mt-8">
            <div className="flex justify-between items-center border-b border-stone-100 pb-4 mb-4">
                <h3 className="text-[13px] font-bold text-stone-700 tracking-wide uppercase">
                    {t(lang, 's2.whatsTheRelationship.heatmapDemo.title')}
                </h3>
            </div>

            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-xl mx-auto block overflow-visible mt-2">
                {/* Y Axis labels */}
                {times.map((t, i) => (
                    <text key={t} x={pad.l - 10} y={pad.t + i * cellH + cellH / 2} fill="#57534e" fontSize={11} textAnchor="end" dominantBaseline="middle">{t}</text>
                ))}

                {/* X Axis labels */}
                {days.map((d, i) => (
                    <text key={d} x={pad.l + i * cellW + cellW / 2} y={h - pad.b + 18} fill="#57534e" fontSize={11} textAnchor="middle">{d}</text>
                ))}

                {/* Grid cells */}
                {times.map((_, r) => (
                    days.map((_, c) => {
                        const val = rawData[r][c];
                        const x = pad.l + c * cellW;
                        const y = pad.t + r * cellH;
                        return (
                            <g key={`${r}-${c}`}>
                                <rect x={x} y={y} width={cellW} height={cellH} fill={colorScale(val)} stroke="#fff" strokeWidth={2} rx={4} />
                                <text x={x + cellW / 2} y={y + cellH / 2 + 3} fill={val > 0.5 ? '#fff' : '#475569'} fontSize={10} fontWeight={val > 0.6 ? 700 : 400} textAnchor="middle">{Math.round(val * 100)}</text>
                            </g>
                        )
                    })
                ))}
            </svg>

            <div className="bg-stone-50 rounded-lg p-4 border border-stone-100 mt-4">
                <p className="text-[13px] text-stone-600 leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: t(lang, 's2.whatsTheRelationship.heatmapDemo.desc') }} />
            </div>
        </div>
    );
}

export default function WhatsTheRelationshipLesson() {
    const { lang } = useLang();

    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive: position encodes correlation strength' },
                { sectionId: 'mechanics', slug: 'distribution', label: '2.3 — Distribution Charts: scatter vs. distribution for the same data' },
                { sectionId: 'lab', slug: 'annotation-trend', label: '3.4 — Annotation & Trend: misleading trendlines on scatter data' },
            ]}
        >
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.whatsTheRelationship.intro1') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.whatsTheRelationship.intro2') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.whatsTheRelationship.intro3') }} />

                {/* Spurious correlation example */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's2.whatsTheRelationship.spuriousDemo.title')}
                    </p>
                    <SpuriousCorrelationChart lang={lang} />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        {t(lang, 's2.whatsTheRelationship.spuriousDemo.desc')}
                    </p>
                </div>

                {/* Relationship chart risks summary */}
                <div className="rounded-xl bg-red-50 border border-red-200 p-5">
                    <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider mb-3">
                        {t(lang, 's2.whatsTheRelationship.manipulationPatterns.title')}
                    </p>
                    <div className="space-y-2">
                        {[0, 1, 2].map(i => (
                            <div key={i} className="flex gap-3 text-[12px]">
                                <span className="text-red-400 shrink-0 font-bold">#{i + 1}</span>
                                <div>
                                    <span className="font-bold text-red-800">{t(lang, `s2.whatsTheRelationship.manipulationPatterns.patterns.${i}.name`)}: </span>
                                    <span className="text-red-700">{t(lang, `s2.whatsTheRelationship.manipulationPatterns.patterns.${i}.desc`)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Categorical Heatmap Demo */}
                <CategoricalHeatmapDemo lang={lang} />
            </div>

            <ChartFamilyLesson
                charts={getCharts(lang)}
                clevelandNote={t(lang, 's2.whatsTheRelationship.clevelandNote')}
            />
        </LessonPage>
    );
}
