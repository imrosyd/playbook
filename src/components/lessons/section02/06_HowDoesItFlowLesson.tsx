import LessonPage from '../../layout/LessonPage';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import ChartFrame from '../../ui/ChartFrame';
import ChartFamilyLesson, { type ChartSpec } from './ChartFamilyLesson';
import { Layout as LayoutIcon, AlertTriangle } from 'lucide-react';
import {
    TreeDiagramMini,
    DendrogramMini,
    IcicleMini,
    SankeyMini,
    ChordMini,
    NetworkMini,
} from '../../charts/demos/MiniCharts';

const getCharts = (lang: any): ChartSpec[] => [
    {
        slug: 'tree-diagram',
        name: t(lang, 's2.howDoesItFlow.charts.tree.name'),
        whenToUse: [
            t(lang, 's2.howDoesItFlow.charts.tree.whenToUse.0'),
            t(lang, 's2.howDoesItFlow.charts.tree.whenToUse.1'),
            t(lang, 's2.howDoesItFlow.charts.tree.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.howDoesItFlow.charts.tree.whenNotToUse.0'),
            t(lang, 's2.howDoesItFlow.charts.tree.whenNotToUse.1'),
            t(lang, 's2.howDoesItFlow.charts.tree.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.howDoesItFlow.charts.tree.interpretationRisk'),
        cognitiveRef: t(lang, 's2.howDoesItFlow.charts.tree.cognitiveRef'),
        ethicalRef: t(lang, 's2.howDoesItFlow.charts.tree.ethicalRef'),
        demo: <TreeDiagramMini />,
    },
    {
        slug: 'dendrogram',
        name: t(lang, 's2.howDoesItFlow.charts.dendrogram.name'),
        whenToUse: [
            t(lang, 's2.howDoesItFlow.charts.dendrogram.whenToUse.0'),
            t(lang, 's2.howDoesItFlow.charts.dendrogram.whenToUse.1'),
            t(lang, 's2.howDoesItFlow.charts.dendrogram.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.howDoesItFlow.charts.dendrogram.whenNotToUse.0'),
            t(lang, 's2.howDoesItFlow.charts.dendrogram.whenNotToUse.1'),
            t(lang, 's2.howDoesItFlow.charts.dendrogram.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.howDoesItFlow.charts.dendrogram.interpretationRisk'),
        cognitiveRef: t(lang, 's2.howDoesItFlow.charts.dendrogram.cognitiveRef'),
        ethicalRef: t(lang, 's2.howDoesItFlow.charts.dendrogram.ethicalRef'),
        demo: <DendrogramMini />,
    },
    {
        slug: 'icicle',
        name: t(lang, 's2.howDoesItFlow.charts.icicle.name'),
        whenToUse: [
            t(lang, 's2.howDoesItFlow.charts.icicle.whenToUse.0'),
            t(lang, 's2.howDoesItFlow.charts.icicle.whenToUse.1'),
            t(lang, 's2.howDoesItFlow.charts.icicle.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.howDoesItFlow.charts.icicle.whenNotToUse.0'),
            t(lang, 's2.howDoesItFlow.charts.icicle.whenNotToUse.1'),
            t(lang, 's2.howDoesItFlow.charts.icicle.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.howDoesItFlow.charts.icicle.interpretationRisk'),
        cognitiveRef: t(lang, 's2.howDoesItFlow.charts.icicle.cognitiveRef'),
        ethicalRef: t(lang, 's2.howDoesItFlow.charts.icicle.ethicalRef'),
        demo: <IcicleMini />,
    },
    {
        slug: 'sankey',
        name: t(lang, 's2.howDoesItFlow.charts.sankey.name'),
        whenToUse: [
            t(lang, 's2.howDoesItFlow.charts.sankey.whenToUse.0'),
            t(lang, 's2.howDoesItFlow.charts.sankey.whenToUse.1'),
            t(lang, 's2.howDoesItFlow.charts.sankey.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.howDoesItFlow.charts.sankey.whenNotToUse.0'),
            t(lang, 's2.howDoesItFlow.charts.sankey.whenNotToUse.1'),
            t(lang, 's2.howDoesItFlow.charts.sankey.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.howDoesItFlow.charts.sankey.interpretationRisk'),
        cognitiveRef: t(lang, 's2.howDoesItFlow.charts.sankey.cognitiveRef'),
        ethicalRef: t(lang, 's2.howDoesItFlow.charts.sankey.ethicalRef'),
        demo: <SankeyMini />,
    },
    {
        slug: 'chord',
        name: t(lang, 's2.howDoesItFlow.charts.chord.name'),
        whenToUse: [
            t(lang, 's2.howDoesItFlow.charts.chord.whenToUse.0'),
            t(lang, 's2.howDoesItFlow.charts.chord.whenToUse.1'),
            t(lang, 's2.howDoesItFlow.charts.chord.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.howDoesItFlow.charts.chord.whenNotToUse.0'),
            t(lang, 's2.howDoesItFlow.charts.chord.whenNotToUse.1'),
            t(lang, 's2.howDoesItFlow.charts.chord.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.howDoesItFlow.charts.chord.interpretationRisk'),
        cognitiveRef: t(lang, 's2.howDoesItFlow.charts.chord.cognitiveRef'),
        ethicalRef: t(lang, 's2.howDoesItFlow.charts.chord.ethicalRef'),
        demo: <ChordMini />,
    },
    {
        slug: 'network',
        name: t(lang, 's2.howDoesItFlow.charts.network.name'),
        whenToUse: [
            t(lang, 's2.howDoesItFlow.charts.network.whenToUse.0'),
            t(lang, 's2.howDoesItFlow.charts.network.whenToUse.1'),
            t(lang, 's2.howDoesItFlow.charts.network.whenToUse.2'),
        ],
        whenNotToUse: [
            t(lang, 's2.howDoesItFlow.charts.network.whenNotToUse.0'),
            t(lang, 's2.howDoesItFlow.charts.network.whenNotToUse.1'),
            t(lang, 's2.howDoesItFlow.charts.network.whenNotToUse.2'),
        ],
        interpretationRisk: t(lang, 's2.howDoesItFlow.charts.network.interpretationRisk'),
        cognitiveRef: t(lang, 's2.howDoesItFlow.charts.network.cognitiveRef'),
        ethicalRef: t(lang, 's2.howDoesItFlow.charts.network.ethicalRef'),
        demo: <NetworkMini />,
    },
];


// Network layout sensitivity demo
function NetworkLayoutChart({ lang }: { lang: any }) {
    const nodesA = [
        { id: 'A', x: 50, y: 50, label: t(lang, 's2.howDoesItFlow.networkDemo.roles.0'), r: 14, color: '#059669', text: 'white' },
        { id: 'B', x: 20, y: 20, label: t(lang, 's2.howDoesItFlow.networkDemo.roles.1'), r: 9, color: '#d1fae5', text: '#064e3b' },
        { id: 'C', x: 80, y: 20, label: t(lang, 's2.howDoesItFlow.networkDemo.roles.2'), r: 9, color: '#d1fae5', text: '#064e3b' },
        { id: 'D', x: 20, y: 80, label: t(lang, 's2.howDoesItFlow.networkDemo.roles.3'), r: 9, color: '#d1fae5', text: '#064e3b' },
        { id: 'E', x: 80, y: 80, label: t(lang, 's2.howDoesItFlow.networkDemo.roles.4'), r: 9, color: '#d1fae5', text: '#064e3b' },
        { id: 'F', x: 50, y: 15, label: t(lang, 's2.howDoesItFlow.networkDemo.roles.5'), r: 9, color: '#d1fae5', text: '#064e3b' },
    ];
    const nodesB = [
        { id: 'B', x: 50, y: 50, label: t(lang, 's2.howDoesItFlow.networkDemo.roles.1'), r: 14, color: '#059669', text: 'white' },
        { id: 'A', x: 20, y: 20, label: t(lang, 's2.howDoesItFlow.networkDemo.roles.0'), r: 9, color: '#d1fae5', text: '#064e3b' },
        { id: 'C', x: 80, y: 25, label: t(lang, 's2.howDoesItFlow.networkDemo.roles.2'), r: 9, color: '#d1fae5', text: '#064e3b' },
        { id: 'D', x: 15, y: 75, label: t(lang, 's2.howDoesItFlow.networkDemo.roles.3'), r: 9, color: '#d1fae5', text: '#064e3b' },
        { id: 'E', x: 85, y: 75, label: t(lang, 's2.howDoesItFlow.networkDemo.roles.4'), r: 9, color: '#d1fae5', text: '#064e3b' },
        { id: 'F', x: 50, y: 85, label: t(lang, 's2.howDoesItFlow.networkDemo.roles.5'), r: 9, color: '#d1fae5', text: '#064e3b' },
    ];
    const edges = [['A', 'B'], ['A', 'C'], ['A', 'D'], ['A', 'E'], ['A', 'F'], ['B', 'C']];

    const w = 120, h = 100;

    function Layout({ nodes, title, note, status }: { nodes: any[], title: string, note: string, status: 'ceo' | 'cto' }) {
        const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
        return (
            <div className="flex-1 min-w-[140px] space-y-3">
                <div className="text-center">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">{title}</p>
                    <div className="inline-block px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-[9px] font-bold text-stone-600">
                        {status === 'ceo' ? t(lang, 's2.howDoesItFlow.networkDemo.layoutA.status') : t(lang, 's2.howDoesItFlow.networkDemo.layoutB.status')}
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-stone-100 p-4 shadow-inner overflow-hidden">
                    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto block mx-auto drop-shadow-sm">
                        {edges.map(([a, b]) => {
                            const na = nodeMap[a], nb = nodeMap[b];
                            if (!na || !nb) return null;
                            return <line key={`${a}-${b}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                                stroke="#e7e5e4" strokeWidth={1} strokeDasharray="2,2" />;
                        })}
                        {nodes.map(n => (
                            <g key={n.id} className="transition-transform duration-500 hover:scale-110">
                                <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} stroke="white" strokeWidth={1.5} />
                                <text x={n.x} y={n.y + 2.5} fill={n.text} fontSize={5} textAnchor="middle">{n.label}</text>
                            </g>
                        ))}
                    </svg>
                </div>
                <p className="text-[10px] text-stone-500 text-center font-medium italic opacity-80 leading-tight">
                    {note}
                </p>
            </div>
        );
    }

    return (
        <ChartFrame
            label={t(lang, 's2.howDoesItFlow.networkDemo.title')}
            note={t(lang, 's2.howDoesItFlow.networkDemo.note')}
        >
            <div className="flex flex-wrap gap-8 p-6 justify-center bg-stone-50/50">
                <Layout nodes={nodesA} title={t(lang, 's2.howDoesItFlow.networkDemo.layoutA.title')} status="ceo" note={t(lang, 's2.howDoesItFlow.networkDemo.layoutA.note')} />
                <div className="hidden sm:flex items-center text-stone-300">
                    <ArrowRightIcon size={24} />
                </div>
                <Layout nodes={nodesB} title={t(lang, 's2.howDoesItFlow.networkDemo.layoutB.title')} status="cto" note={t(lang, 's2.howDoesItFlow.networkDemo.layoutB.note')} />
            </div>
        </ChartFrame>
    );
}

function ArrowRightIcon({ size }: { size: number }) {
    return (
        <svg className="w-full max-w-2xl mx-auto block" width={size} height={size} viewBox="0 0 480 220" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
    );
}

function StressfulTreemapDemo({ lang }: { lang: any }) {
    const cells = [
        { s: 3, w: '20%', c: '#16a34a', t: 'MSFT', v: '+2.4%' },
        { s: 5, w: '35%', c: '#ef4444', t: 'AAPL', v: '-1.2%' },
        { s: 2, w: '15%', c: '#22c55e', t: 'NVDA', v: '+4.1%' },
        { s: 4, w: '25%', c: '#16a34a', t: 'GOOG', v: '+1.1%' },
        { s: 3, w: '20%', c: '#dc2626', t: 'AMZN', v: '-3.4%' },
        { s: 2, w: '15%', c: '#22c55e', t: 'META', v: '+0.8%' },
        { s: 3, w: '25%', c: '#ef4444', t: 'TSLA', v: '-2.1%' },
        { s: 1, w: '10%', c: '#dc2626', t: 'BRK', v: '-0.4%' },
    ];

    return (
        <ChartFrame
            label={t(lang, 's2.howDoesItFlow.treemapDemo.title')}
            note={t(lang, 's2.howDoesItFlow.treemapDemo.note')}
        >
            <div className="p-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1 w-full max-w-[280px] flex flex-wrap h-40 gap-[1px] bg-stone-900 p-[1.5px] rounded-lg shadow-lg overflow-hidden border border-stone-800">
                        {cells.map((c, i) => (
                            <div key={i} className="flex flex-col justify-center items-center overflow-hidden transition-all hover:brightness-110 active:scale-95 cursor-help"
                                style={{ flexGrow: c.s, width: c.w, backgroundColor: c.c }}>
                                <span className="text-white font-black text-[9px] drop-shadow-md tracking-tighter">{c.t}</span>
                                <span className="text-white text-[8px] font-bold opacity-90 drop-shadow-sm">{c.v}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <AlertTriangle size={14} className="text-amber-500" />
                            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t(lang, 's2.howDoesItFlow.treemapDemo.frictionTitle')}</p>
                        </div>
                        <ul className="space-y-2">
                            {[0, 1, 2].map(i => (
                                <li key={i} className="flex items-start gap-2 text-[12px] text-stone-600 font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-1.5 shrink-0" />
                                    <span>{t(lang, `s2.howDoesItFlow.treemapDemo.points.${i}`)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </ChartFrame>
    );
}

export default function HowDoesItFlowLesson() {
    const { lang } = useLang();

    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'pattern', label: '1.4 — Pattern Recognition: how hierarchy charts exploit grouping bias' },
                { sectionId: 'mechanics', slug: 'composition', label: '2.5 — Composition Charts: treemaps vs. pie charts for part-to-whole' },
                { sectionId: 'lab', slug: 'visual-emphasis', label: '3.3 — Visual Emphasis: color and size distortion in network layouts' },
            ]}
        >
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.howDoesItFlow.intro1') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.howDoesItFlow.intro2') }} />
                <p className="text-[15px] text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(lang, 's2.howDoesItFlow.intro3') }} />

                {/* Network layout demo */}
                <NetworkLayoutChart lang={lang} />

                {/* Treemap demo */}
                <StressfulTreemapDemo lang={lang} />

                {/* Chart type decision guide */}
                <div className="rounded-2xl bg-stone-50 border border-stone-200 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <LayoutIcon size={18} className="text-brand" />
                        <p className="text-[11px] font-black text-stone-400 uppercase tracking-widest">
                            {t(lang, 's2.howDoesItFlow.guide.title')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[0, 1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="bg-white rounded-xl border border-stone-100 p-4 flex items-center justify-between group hover:border-brand/30 transition-all">
                                <div>
                                    <p className="text-[12px] font-semibold text-stone-600">{t(lang, `s2.howDoesItFlow.guide.items.${i}.structure`)}</p>
                                    <p className="text-[10px] text-stone-400 font-medium">{t(lang, `s2.howDoesItFlow.guide.items.${i}.note`)}</p>
                                </div>
                                <div className="text-brand font-black text-[11px] flex items-center gap-1">
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">{t(lang, 's2.howDoesItFlow.guide.chooseBtn')}</span>
                                    <ArrowRightIcon size={12} />
                                    <span>{t(lang, `s2.howDoesItFlow.guide.items.${i}.chart`).toUpperCase()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ChartFamilyLesson
                charts={getCharts(lang)}
                clevelandNote={t(lang, 's2.howDoesItFlow.clevelandNote')}
            />
        </LessonPage>
    );
}
