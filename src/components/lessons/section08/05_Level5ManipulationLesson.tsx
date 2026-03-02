import { useState } from 'react';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import EthicalLevelLesson from './EthicalLevelLesson';

const crossRefs = (lang: any) => [
    { sectionId: 'lab', slug: 'full-lab', label: t(lang, 's8.level5.crossRefs.0.label') },
    { sectionId: 'simulator', slug: 'revenue', label: t(lang, 's8.level5.crossRefs.1.label') },
    { sectionId: 'ethics', slug: 'distortion', label: t(lang, 's8.level5.crossRefs.2.label') },
    { sectionId: 'ethics', slug: 'assessment', label: t(lang, 's8.level5.crossRefs.3.label') },
];

function NarrativeAxisToggleDemo({ lang }: { lang: any }) {
    const [honest, setHonest] = useState(false);

    // Q1=61, Q2=62, Q3=64, Q4=65
    const data = [61, 62, 64, 65];
    const labels = ['Q1', 'Q2', 'Q3', 'Q4'];

    const w = 400, h = 220;
    const pad = { t: 20, l: 40, r: 20, b: 30 };

    const yMin = honest ? 0 : 58;
    const yMax = honest ? 80 : 66;

    const scaleX = (i: number) => pad.l + (i + 0.5) * ((w - pad.l - pad.r) / data.length);
    const scaleY = (val: number) => pad.t + (1 - (val - yMin) / (yMax - yMin)) * (h - pad.t - pad.b);

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[13px] font-bold text-stone-700 tracking-wide uppercase">
                    {t(lang, 's8.level5.demo.title')}
                </h3>
                <button
                    onClick={() => setHonest(!honest)}
                    className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-colors ${honest ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}
                >
                    {honest ? t(lang, 's8.level5.demo.btnHonest') : t(lang, 's8.level5.demo.btnManipulated')}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 w-full">
                    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full max-h-[200px] overflow-visible">
                        <line x1={pad.l} x2={pad.l} y1={pad.t} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} />
                        <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#e7e5e4" strokeWidth={1} />

                        {/* Bars */}
                        {data.map((val, i) => {
                            const y = scaleY(val);
                            const barH = (h - pad.b) - Math.max(y, pad.t);
                            return (
                                <g key={i}>
                                    <rect
                                        x={scaleX(i) - 20}
                                        y={y}
                                        width={40}
                                        height={barH}
                                        fill={honest ? '#059669' : '#dc2626'}
                                        className="transition-all duration-700 ease-in-out"
                                    />
                                    <text x={scaleX(i)} y={h - pad.b + 15} fill="#a8a29e" fontSize={11} textAnchor="middle">{labels[i]}</text>
                                    <text x={scaleX(i)} y={y - 5} fill="#57534e" fontSize={10} textAnchor="middle" className="transition-all duration-700 ease-in-out">{val}</text>
                                </g>
                            )
                        })}

                        {/* Y-axis labels */}
                        {[yMin, (yMin + yMax) / 2, yMax].map(v => (
                            <text key={v} x={pad.l - 8} y={scaleY(v)} fill="#a8a29e" fontSize={10} textAnchor="end" dominantBaseline="middle" className="transition-all duration-700 ease-in-out">{v}</text>
                        ))}
                    </svg>
                </div>
                <div className="flex-1">
                    <div className="bg-stone-50 rounded-lg p-5 border border-stone-100">
                        <h4 className="text-[14px] font-bold text-stone-800 mb-2">
                            {honest ? t(lang, 's8.level5.demo.honestTitle') : t(lang, 's8.level5.demo.lieTitle')}
                        </h4>
                        <p className="text-[13px] text-stone-600 leading-relaxed">
                            {honest ? t(lang, 's8.level5.demo.honestDesc') : t(lang, 's8.level5.demo.lieDesc')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Level5ManipulationLesson() {
    const { lang } = useLang();
    return (
        <EthicalLevelLesson levelIndex={4} crossRefs={crossRefs(lang)}>
            <div className="space-y-6">
                <p className="text-[15px] font-semibold text-stone-800 uppercase tracking-widest text-center mt-6">
                    {t(lang, 's8.level5.labTitle')}
                </p>
                <NarrativeAxisToggleDemo lang={lang} />
            </div>
        </EthicalLevelLesson>
    );
}
