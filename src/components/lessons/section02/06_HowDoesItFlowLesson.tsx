import LessonPage from '../../layout/LessonPage';
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

const charts: ChartSpec[] = [
    {
        slug: 'tree-diagram',
        name: 'Tree Diagram',
        whenToUse: [
            'Representing strict parent-child hierarchies such as org charts, file systems, or taxonomies',
            'When the direction of authority or inheritance flows clearly in one direction',
            'Decision tree visualizations where each split leads to a defined set of outcomes',
        ],
        whenNotToUse: [
            'Graphs where nodes have multiple parents (use a network/DAG instead)',
            'Very deep or wide trees — nodes quickly become too small to label or read',
            'When the sibling relationships between leaf nodes are as important as the parent-child links',
        ],
        interpretationRisk: 'Tree diagrams imply strict hierarchical authority. Representing a cross-functional team as a tree imposes a command-structure reading that may not reflect how the team actually works, potentially misrepresenting shared or matrix reporting.',
        cognitiveRef: 'Gestalt: connection, proximity',
        ethicalRef: 'Risk: Hierarchy imposition',
        demo: <TreeDiagramMini />,
    },
    {
        slug: 'dendrogram',
        name: 'Dendrogram',
        whenToUse: [
            'Visualizing results of hierarchical clustering algorithms in statistical analysis',
            'Phylogenetic trees in biology or evolutionary data',
            'When the height of the merge point encodes the distance or dissimilarity between clusters',
        ],
        whenNotToUse: [
            'Non-hierarchical clustering results — k-means or DBSCAN clusters have no tree structure',
            'Very large datasets — with > 50 leaf nodes, labels overlap and the structure is unreadable',
            'General business audiences unfamiliar with clustering methodology',
        ],
        interpretationRisk: 'Dendrograms from agglomerative clustering are sensitive to linkage method (single, complete, average, Ward). Two identical datasets with different linkage methods can produce dramatically different tree shapes, implying different cluster structures.',
        cognitiveRef: 'Gestalt: connection',
        ethicalRef: 'Risk: Linkage method sensitivity',
        demo: <DendrogramMini />,
    },
    {
        slug: 'icicle',
        name: 'Icicle / Partition Chart',
        whenToUse: [
            'Hierarchical data where quantitative proportions at each level are meaningful',
            'Visualizing directory structures, budget hierarchies, or nested categorical data',
            'When the partition needs to be visually aligned with a linear scale',
        ],
        whenNotToUse: [
            'When the hierarchy is deep (> 4 levels) — leaf rectangles become hairline slivers',
            'Interactive-only contexts — horizontal space is consumed rapidly with many children',
            'Audiences who find tree diagrams more intuitive than space-filling approaches',
        ],
        interpretationRisk: 'Width encodes quantitative proportion but depth (level) is purely structural. Readers may misread a deep but narrow branch as having more total weight than a shallow but wide one, confusing structural depth with quantitative magnitude.',
        cognitiveRef: 'Pre-attentive: length, area',
        ethicalRef: 'Risk: Depth vs. width confusion',
        demo: <IcicleMini />,
    },
    {
        slug: 'sankey',
        name: 'Sankey Diagram',
        whenToUse: [
            'Showing flow volumes between stages in a process (energy, money, traffic, conversions)',
            'When the total flow is conserved and losses or gains at each stage are meaningful',
            'Funnel-like processes where the magnitude of flow at each transition is the story',
        ],
        whenNotToUse: [
            'Non-flow data — Sankey diagrams carry a strong "flow" implication that misrepresents static snapshots',
            'More than 5–7 source or destination nodes — the diagram becomes a tangled ribbon',
            'When the proportion of flow between specific nodes needs to be read precisely',
        ],
        interpretationRisk: 'Flow width encodes magnitude, but the curved, organic ribbons make precise comparison extremely difficult. Designers sometimes adjust curvature or node ordering to make small flows appear more significant, a subtle but effective form of visual manipulation.',
        cognitiveRef: 'Pre-attentive: width (flow)',
        ethicalRef: 'Risk: Visual weight manipulation',
        demo: <SankeyMini />,
    },
    {
        slug: 'chord',
        name: 'Chord Diagram',
        whenToUse: [
            'Symmetric matrix data showing bidirectional flows or relationships between a small set of entities',
            'Migration, trade flow, or communication data between groups',
            'Exploratory analysis of complex interconnections where the matrix structure would be hard to see',
        ],
        whenNotToUse: [
            'More than 7–8 nodes — chord diagrams become unreadable with many overlapping ribbons',
            'When precise flow values need to be read — chord widths are hard to decode',
            'Non-symmetric relationships where directionality (A→B ≠ B→A) is critical',
        ],
        interpretationRisk: 'Arc width at the node encodes total flow but ribbon width encodes bilateral flow between two specific nodes. These two encodings are often confused, leading readers to misread total connection strength as bilateral exchange.',
        cognitiveRef: 'Pre-attentive: arc width',
        ethicalRef: 'Risk: Total vs. bilateral flow confusion',
        demo: <ChordMini />,
    },
    {
        slug: 'network',
        name: 'Network Graph',
        whenToUse: [
            'Representing genuine graph-structured data: social networks, dependency graphs, knowledge graphs',
            'When the topology (connectivity pattern, hubs, clusters) is the analytical focus',
            'Exploratory visualization of relational data before quantitative network analysis',
        ],
        whenNotToUse: [
            'Hierarchical data — a tree diagram is cleaner and more intuitive',
            'Very dense networks (> 100 nodes) — "hairball" graphs convey nothing analytically',
            'When the reader needs to count paths, measure distances, or compare centrality precisely',
        ],
        interpretationRisk: 'Node positions in most network layouts (force-directed, Fruchterman-Reingold) are non-deterministic and change on every render. A node placed in the "center" appears more important, but centrality is a function of the algorithm, not the data.',
        cognitiveRef: 'Gestalt: proximity, connection',
        ethicalRef: 'Risk: Layout-implied importance',
        demo: <NetworkMini />,
    },
];


// Network layout sensitivity demo
function NetworkLayoutChart() {
    const nodesA = [
        { id: 'A', x: 50, y: 50, label: 'CEO', r: 14, color: '#059669', text: 'white' },
        { id: 'B', x: 20, y: 20, label: 'CTO', r: 9, color: '#d1fae5', text: '#064e3b' },
        { id: 'C', x: 80, y: 20, label: 'CFO', r: 9, color: '#d1fae5', text: '#064e3b' },
        { id: 'D', x: 20, y: 80, label: 'CMO', r: 9, color: '#d1fae5', text: '#064e3b' },
        { id: 'E', x: 80, y: 80, label: 'COO', r: 9, color: '#d1fae5', text: '#064e3b' },
        { id: 'F', x: 50, y: 15, label: 'CRO', r: 9, color: '#d1fae5', text: '#064e3b' },
    ];
    const nodesB = [
        { id: 'B', x: 50, y: 50, label: 'CTO', r: 14, color: '#059669', text: 'white' },
        { id: 'A', x: 20, y: 20, label: 'CEO', r: 9, color: '#d1fae5', text: '#064e3b' },
        { id: 'C', x: 80, y: 25, label: 'CFO', r: 9, color: '#d1fae5', text: '#064e3b' },
        { id: 'D', x: 15, y: 75, label: 'CMO', r: 9, color: '#d1fae5', text: '#064e3b' },
        { id: 'E', x: 85, y: 75, label: 'COO', r: 9, color: '#d1fae5', text: '#064e3b' },
        { id: 'F', x: 50, y: 85, label: 'CRO', r: 9, color: '#d1fae5', text: '#064e3b' },
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
                        {status === 'ceo' ? 'Traditional Hierarchy' : 'Matrix Perception'}
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
                                <text x={n.x} y={n.y + 2.5} fill={n.text} fontSize={5} textAnchor="middle" fontWeight={900}>{n.label}</text>
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
            label="Layout-Implied Importance"
            note="The internal connections are identical. By simply shifting which node occupies the geometric center, the visual narrative changes from 'CEO-centric' to 'Tech-driven.' Center = Power is a hardwired heuristic."
        >
            <div className="flex flex-wrap gap-8 p-6 justify-center bg-stone-50/50">
                <Layout nodes={nodesA} title="Layout A" status="ceo" note="Implies strict CEO authority" />
                <div className="hidden sm:flex items-center text-stone-300">
                    <ArrowRightIcon size={24} />
                </div>
                <Layout nodes={nodesB} title="Layout B" status="cto" note="Implies CTO as the strategic hub" />
            </div>
        </ChartFrame>
    );
}

function ArrowRightIcon({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
    );
}

function StressfulTreemapDemo() {
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
            label="Cognitive Overload: Dense Treemaps"
            note="Financial 'heatmaps' maximize density but create overwhelming load. Competing intensive colors cause visual vibration, and area comparisons across non-adjacent rectangles are perceptually imprecise."
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
                            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Analysis Friction</p>
                        </div>
                        <ul className="space-y-2">
                            {[
                                'Intense colors (red/green) create visual vibration',
                                'Area estimation is significantly less accurate than length',
                                'Rapid updates (live stock prices) saturate working memory',
                            ].map((text, i) => (
                                <li key={i} className="flex items-start gap-2 text-[12px] text-stone-600 font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-1.5 shrink-0" />
                                    <span>{text}</span>
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
    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'pattern', label: '1.4 — Pattern Recognition: how hierarchy charts exploit grouping bias' },
                { sectionId: 'mechanics', slug: 'composition', label: '2.5 — Composition Charts: treemaps vs. pie charts for part-to-whole' },
                { sectionId: 'lab', slug: 'visual-emphasis', label: '3.3 — Visual Emphasis: color and size distortion in network layouts' },
            ]}
        >
            <div className="space-y-6">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Hierarchy and network charts encode structural relationships — how entities are connected, nested, or flow between each other. Unlike quantitative charts where a specific axis encodes a specific variable with measurable accuracy, hierarchy charts encode topology: which nodes are connected, how deep the hierarchy is, and what flows between clusters. The Gestalt principles of <strong>connection</strong> (lines between nodes imply direct relationships) and <strong>proximity</strong> (nearby nodes appear related) are the dominant perceptual mechanisms, working automatically in the viewer's visual system before any conscious reading occurs.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    The most consequential risk in hierarchy charts is that <strong>visual layout algorithms impose structure that reflects computational convenience, not genuine data hierarchy</strong>. Force-directed graph layouts (the algorithm behind most network visualizations) place nodes in positions that minimize edge crossings and distribute nodes evenly — but these positions carry no semantic meaning. A node placed in the visual center appears more important, more central, and more powerful, even if it has the same number of connections as a node at the visual periphery. The same network data with different layout seeds or algorithms produces entirely different visual narratives about which node "controls" the structure.
                </p>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Choosing the right chart for hierarchical data requires understanding the structural type of the data itself: <strong>strict hierarchies</strong> (org charts, taxonomies, file systems) suit tree diagrams; <strong>hierarchical quantitative partitions</strong> (budget allocation, file size breakdown) suit treemaps or icicle charts; <strong>flow processes</strong> (conversion funnels, energy systems, money flows) suit Sankey diagrams; and <strong>genuine graph data</strong> (social networks, dependency graphs, biological pathways) suit network graphs. Choosing the wrong structural chart type imposes a false topology on the data — a tree diagram applied to graph-structured data creates false parent-child authority relationships that do not exist.
                </p>

                {/* Network layout demo */}
                <NetworkLayoutChart />

                {/* Treemap demo */}
                <StressfulTreemapDemo />

                {/* Chart type decision guide */}
                <div className="rounded-2xl bg-stone-50 border border-stone-200 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <LayoutIcon size={18} className="text-brand" />
                        <p className="text-[11px] font-black text-stone-400 uppercase tracking-widest">
                            Topology Selection Matrix
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { structure: 'Strict parent-child hierarchy', chart: 'Tree Diagram', note: 'Single parent per node' },
                            { structure: 'Space-filling partition', chart: 'Treemap / Icicle', note: 'Quantitative nesting' },
                            { structure: 'Flow volumes between stages', chart: 'Sankey Diagram', note: 'Process conversion' },
                            { structure: 'Bidirectional flows', chart: 'Chord Diagram', note: 'Small node set matrix' },
                            { structure: 'Graph with cycles', chart: 'Network (DAG)', note: 'Interconnected web' },
                            { structure: 'Clustering results', chart: 'Dendrogram', note: 'Algorithmic distance' },
                        ].map((d, i) => (
                            <div key={i} className="bg-white rounded-xl border border-stone-100 p-4 flex items-center justify-between group hover:border-brand/30 transition-all">
                                <div>
                                    <p className="text-[12px] font-semibold text-stone-600">{d.structure}</p>
                                    <p className="text-[10px] text-stone-400 font-medium">{d.note}</p>
                                </div>
                                <div className="text-brand font-black text-[11px] flex items-center gap-1">
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">CHOOSE</span>
                                    <ArrowRightIcon size={12} />
                                    <span>{d.chart.toUpperCase()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ChartFamilyLesson
                charts={charts}
                clevelandNote="Connection and proximity (Gestalt) are not in Cleveland & McGill's original hierarchy, which focused on quantitative encodings. For structural/topological data, the standard accuracy rankings do not apply — but this also means there is no baseline for 'accurate decoding.' Hierarchy charts carry especially high risk of over-interpretation."
            />
        </LessonPage>
    );
}
