import LessonPage from '../../layout/LessonPage';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import ChartFrame from '../../ui/ChartFrame';
import ChartFamilyLesson, { type ChartSpec } from './ChartFamilyLesson';
import { Info, Target, Zap, TrendingUp } from 'lucide-react';
import {
    GanttMini,
    ControlChartMini,
    FunnelMini,
    RadarMini,
    GaugeMini,
} from '../../charts/demos/MiniCharts';

const getCharts = (lang: any): ChartSpec[] => [
    {
        slug: 'gantt',
        name: t(lang, 's2.areWeOnSchedule.charts.gantt.name'),
        whenToUse: [
            t(lang, 's2.areWeOnSchedule.charts.gantt.whenToUse.0'),
            t(lang, 's2.areWeOnSchedule.charts.gantt.whenToUse.1'),
            t(lang, 's2.areWeOnSchedule.charts.gantt.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.areWeOnSchedule.charts.gantt.whenNotToUse.0'),
            t(lang, 's2.areWeOnSchedule.charts.gantt.whenNotToUse.1'),
            t(lang, 's2.areWeOnSchedule.charts.gantt.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.areWeOnSchedule.charts.gantt.interpretationRisk'),
        cognitiveRef: t(lang, 's2.areWeOnSchedule.charts.gantt.cognitiveRef'),
        ethicalRef: t(lang, 's2.areWeOnSchedule.charts.gantt.ethicalRef'),
        demo: <GanttMini />,
    },
    {
        slug: 'control-chart',
        name: t(lang, 's2.areWeOnSchedule.charts.controlChart.name'),
        whenToUse: [
            t(lang, 's2.areWeOnSchedule.charts.controlChart.whenToUse.0'),
            t(lang, 's2.areWeOnSchedule.charts.controlChart.whenToUse.1'),
            t(lang, 's2.areWeOnSchedule.charts.controlChart.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.areWeOnSchedule.charts.controlChart.whenNotToUse.0'),
            t(lang, 's2.areWeOnSchedule.charts.controlChart.whenNotToUse.1'),
            t(lang, 's2.areWeOnSchedule.charts.controlChart.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.areWeOnSchedule.charts.controlChart.interpretationRisk'),
        cognitiveRef: t(lang, 's2.areWeOnSchedule.charts.controlChart.cognitiveRef'),
        ethicalRef: t(lang, 's2.areWeOnSchedule.charts.controlChart.ethicalRef'),
        demo: <ControlChartMini />,
    },
    {
        slug: 'funnel',
        name: t(lang, 's2.areWeOnSchedule.charts.funnel.name'),
        whenToUse: [
            t(lang, 's2.areWeOnSchedule.charts.funnel.whenToUse.0'),
            t(lang, 's2.areWeOnSchedule.charts.funnel.whenToUse.1'),
            t(lang, 's2.areWeOnSchedule.charts.funnel.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.areWeOnSchedule.charts.funnel.whenNotToUse.0'),
            t(lang, 's2.areWeOnSchedule.charts.funnel.whenNotToUse.1'),
            t(lang, 's2.areWeOnSchedule.charts.funnel.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.areWeOnSchedule.charts.funnel.interpretationRisk'),
        cognitiveRef: t(lang, 's2.areWeOnSchedule.charts.funnel.cognitiveRef'),
        ethicalRef: t(lang, 's2.areWeOnSchedule.charts.funnel.ethicalRef'),
        demo: <FunnelMini />,
    },
    {
        slug: 'radar',
        name: t(lang, 's2.areWeOnSchedule.charts.radar.name'),
        whenToUse: [
            t(lang, 's2.areWeOnSchedule.charts.radar.whenToUse.0'),
            t(lang, 's2.areWeOnSchedule.charts.radar.whenToUse.1'),
            t(lang, 's2.areWeOnSchedule.charts.radar.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.areWeOnSchedule.charts.radar.whenNotToUse.0'),
            t(lang, 's2.areWeOnSchedule.charts.radar.whenNotToUse.1'),
            t(lang, 's2.areWeOnSchedule.charts.radar.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.areWeOnSchedule.charts.radar.interpretationRisk'),
        cognitiveRef: t(lang, 's2.areWeOnSchedule.charts.radar.cognitiveRef'),
        ethicalRef: t(lang, 's2.areWeOnSchedule.charts.radar.ethicalRef'),
        demo: <RadarMini />,
    },
    {
        slug: 'gauge',
        name: t(lang, 's2.areWeOnSchedule.charts.gauge.name'),
        whenToUse: [
            t(lang, 's2.areWeOnSchedule.charts.gauge.whenToUse.0'),
            t(lang, 's2.areWeOnSchedule.charts.gauge.whenToUse.1'),
            t(lang, 's2.areWeOnSchedule.charts.gauge.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.areWeOnSchedule.charts.gauge.whenNotToUse.0'),
            t(lang, 's2.areWeOnSchedule.charts.gauge.whenNotToUse.1'),
            t(lang, 's2.areWeOnSchedule.charts.gauge.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.areWeOnSchedule.charts.gauge.interpretationRisk'),
        cognitiveRef: t(lang, 's2.areWeOnSchedule.charts.gauge.cognitiveRef'),
        ethicalRef: t(lang, 's2.areWeOnSchedule.charts.gauge.ethicalRef'),
        demo: <GaugeMini />,
    },
];


// Gauge vs Bullet comparison chart
function GaugeVsBulletChart({ lang }: { lang: any }) {
    const value = 73, target = 80;

    // Gauge arc
    const cx = 60, cy = 48, r = 38;
    const arcAngle = (v: number) => ((v / 100) * Math.PI) + Math.PI; // left to right
    const toArcX = (a: number) => cx + r * Math.cos(a);
    const toArcY = (a: number) => cy + r * Math.sin(a);

    const startAngle = Math.PI; // 180°
    const valueAngle = arcAngle(value);
    const targetAngle = arcAngle(target);
    const aX = toArcX(valueAngle);
    const aY = toArcY(valueAngle);
    const bX = toArcX(startAngle);
    const bY = toArcY(startAngle);
    const endX = toArcX(0); // right side

    // Background arc (grey)
    const bgPath = `M ${bX} ${bY} A ${r} ${r} 0 0 1 ${endX} ${cy}`;
    // Value arc (green)
    const valPath = `M ${bX} ${bY} A ${r} ${r} 0 0 1 ${aX} ${aY}`;

    return (
        <ChartFrame
            label={t(lang, 's2.areWeOnSchedule.gaugeVsBulletDemo.title')}
            note={t(lang, 's2.areWeOnSchedule.gaugeVsBulletDemo.note')}
        >
            <div className="p-6 bg-stone-50/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Gauge Side */}
                    <div className="space-y-4">
                        <div className="text-center">
                            <span className="text-[11px] font-black text-stone-400 uppercase tracking-widest">
                                {t(lang, 's2.areWeOnSchedule.gaugeVsBulletDemo.gaugeTitle')}
                            </span>
                        </div>
                        <div className="bg-white rounded-xl border border-stone-100 p-6 shadow-sm flex items-center justify-center h-48">
                            <svg viewBox="0 0 120 65" className="w-full max-w-[220px] drop-shadow-sm overflow-visible">
                                <path d={bgPath} fill="none" stroke="#e7e5e4" strokeWidth={10} strokeLinecap="round" />
                                <path d={valPath} fill="none" stroke="#10b981" strokeWidth={10} strokeLinecap="round" />
                                <line
                                    x1={cx + (r - 8) * Math.cos(targetAngle)}
                                    y1={cy + (r - 8) * Math.sin(targetAngle)}
                                    x2={cx + (r + 2) * Math.cos(targetAngle)}
                                    y2={cy + (r + 2) * Math.sin(targetAngle)}
                                    stroke="#1e293b" strokeWidth={2.5} />
                                <text x={cx} y={cy + 13} fill="#059669" fontSize={11} textAnchor="middle" fontWeight="bold">{value}%</text>
                            </svg>
                        </div>
                        <ul className="space-y-2 mt-4 px-2">
                            {[0, 1, 2].map(i => {
                                const type = i === 2 ? 'neutral' : 'bad';
                                return (
                                    <li key={i} className="flex items-center gap-2 text-[12px] text-stone-500 font-medium">
                                        <div className={`w-1.5 h-1.5 rounded-full ${type === 'bad' ? 'bg-rose-400' : 'bg-stone-300'}`} />
                                        {t(lang, `s2.areWeOnSchedule.gaugeVsBulletDemo.gaugePoints.${i}`)}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Bullet Side */}
                    <div className="space-y-4">
                        <div className="text-center">
                            <span className="text-[11px] font-black text-stone-400 uppercase tracking-widest">
                                {t(lang, 's2.areWeOnSchedule.gaugeVsBulletDemo.bulletTitle')}
                            </span>
                        </div>
                        <div className="bg-white rounded-xl border border-stone-100 p-6 shadow-sm flex items-center justify-center h-48">
                            <svg viewBox="0 0 120 65" className="w-full max-w-[220px] drop-shadow-sm overflow-visible">
                                <rect x={10} y={29} width={100} height={18} fill="#f5f5f4" rx={2} />
                                <rect x={10} y={29} width={80} height={18} fill="#e7e5e4" rx={2} />
                                <rect x={10} y={29} width={60} height={18} fill="#d6d3d1" rx={2} />
                                <rect x={10} y={34} width={value} height={8} fill="#10b981" rx={1.5} />
                                <line x1={10 + target} y1={25} x2={10 + target} y2={51} stroke="#1e293b" strokeWidth={2.5} />
                                <text x={10 + value - 3} y={40} fill="#ffffff" fontSize={6} textAnchor="end" fontWeight="bold">{value}%</text>
                                <text x={10 + target} y={21} fill="#1e293b" fontSize={6.5} textAnchor="middle" fontWeight="bold">
                                    {t(lang, 's2.areWeOnSchedule.gaugeVsBulletDemo.goalLabel')}
                                </text>
                            </svg>
                        </div>
                        <ul className="space-y-2 mt-4 px-2">
                            {[0, 1, 2].map(i => (
                                <li key={i} className="flex items-center gap-2 text-[12px] text-stone-600 font-bold">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    {t(lang, `s2.areWeOnSchedule.gaugeVsBulletDemo.bulletPoints.${i}`)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </ChartFrame>
    );
}

export default function AreWeOnScheduleLesson() {
    const { lang } = useLang();

    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive: how radar charts encode across multiple channels simultaneously' },
                { sectionId: 'mechanics', slug: 'comparison', label: '2.1 — Comparison Charts: bullet charts as replacements for gauge charts' },
                { sectionId: 'lab', slug: 'full-lab', label: '3.5 — Full Lab: apply manipulation techniques to operational data' },
            ]}
        >
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.areWeOnSchedule.intro1') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.areWeOnSchedule.intro2') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.areWeOnSchedule.intro3') }} />

                {/* Gauge vs Bullet */}
                <GaugeVsBulletChart lang={lang} />

                {/* Chart assumptions guide */}
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 shadow-sm border-l-4">
                    <div className="flex items-center gap-3 mb-6">
                        <TrendingUp size={20} className="text-amber-600" />
                        <p className="text-[11px] font-black text-amber-700 uppercase tracking-widest">
                            {t(lang, 's2.areWeOnSchedule.checklist.title')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                        {[
                            { icon: Target, chartIndex: 0 },
                            { icon: Zap, chartIndex: 1 },
                            { icon: Info, chartIndex: 2 },
                            { icon: Target, chartIndex: 3 },
                        ].map((d, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <d.icon size={14} className="text-amber-600" />
                                    <p className="font-black text-[12px] text-amber-900 uppercase tracking-tight">{t(lang, `s2.areWeOnSchedule.checklist.items.${d.chartIndex}.chart`)}</p>
                                </div>
                                <p className="text-[13px] text-amber-800 leading-relaxed pl-5 font-medium opacity-90">{t(lang, `s2.areWeOnSchedule.checklist.items.${d.chartIndex}.assumption`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ChartFamilyLesson
                charts={getCharts(lang)}
                clevelandNote={t(lang, 's2.areWeOnSchedule.clevelandNote')}
            />
        </LessonPage>
    );
}
