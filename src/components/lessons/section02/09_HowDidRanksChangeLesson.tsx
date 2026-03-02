import LessonPage from '../../layout/LessonPage';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';

function SlopegraphDemo({ lang }: { lang: any }) {
    const data = [
        { label: t(lang, 's2.howDidRanksChange.slopegraphDemo.labels.0'), start: 85, end: 92, color: '#10b981' },
        { label: t(lang, 's2.howDidRanksChange.slopegraphDemo.labels.1'), start: 78, end: 65, color: '#ef4444' },
        { label: t(lang, 's2.howDidRanksChange.slopegraphDemo.labels.2'), start: 60, end: 88, color: '#10b981' },
        { label: t(lang, 's2.howDidRanksChange.slopegraphDemo.labels.3'), start: 45, end: 40, color: '#94a3b8' },
    ];

    const h = 260, w = 480;
    const pad = { t: 40, b: 30, l: 120, r: 120 };
    const max = 100;
    const scaleY = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b);

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm overflow-x-auto">
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-xl mx-auto overflow-visible">
                <line x1={pad.l} x2={pad.l} y1={pad.t} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} />
                <line x1={w - pad.r} x2={w - pad.r} y1={pad.t} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} />

                <text x={pad.l} y={pad.t - 15} fill="#78716c" fontSize={12} textAnchor="middle">{t(lang, 's2.howDidRanksChange.slopegraphDemo.yearStart')}</text>
                <text x={w - pad.r} y={pad.t - 15} fill="#78716c" fontSize={12} textAnchor="middle">{t(lang, 's2.howDidRanksChange.slopegraphDemo.yearEnd')}</text>

                {data.map((d, i) => {
                    const y1 = scaleY(d.start);
                    const y2 = scaleY(d.end);
                    return (
                        <g key={i}>
                            <line x1={pad.l} x2={w - pad.r} y1={y1} y2={y2} stroke={d.color} strokeWidth={2.5} opacity={0.85} />
                            <circle cx={pad.l} cy={y1} r={4} fill={d.color} />
                            <circle cx={w - pad.r} cy={y2} r={4} fill={d.color} />
                            <text x={pad.l - 12} y={y1 + 4} fill={d.color} fontSize={11} textAnchor="end">{d.label} {d.start}%</text>
                            <text x={w - pad.r + 12} y={y2 + 4} fill={d.color} fontSize={11} textAnchor="start">{d.end}% {d.label}</text>
                        </g>
                    )
                })}
            </svg>
            <div className="bg-stone-50 rounded-lg p-4 border border-stone-100 mt-6">
                <p className="text-[12px] text-stone-600 leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: t(lang, 's2.howDidRanksChange.slopegraphDemo.caption') }} />
            </div>
        </div>
    );
}

export default function HowDidRanksChangeLesson() {
    const { lang } = useLang();

    return (
        <LessonPage>
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.howDidRanksChange.intro1') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.howDidRanksChange.intro2') }} />

                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {t(lang, 's2.howDidRanksChange.sectionTitle')}
                    </p>
                    <SlopegraphDemo lang={lang} />
                </div>
            </div>
        </LessonPage>
    );
}
