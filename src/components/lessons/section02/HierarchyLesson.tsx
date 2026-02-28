import LessonPage from '../../layout/LessonPage';
import ChartFamilyLesson, { type ChartSpec } from './ChartFamilyLesson';
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
    // Same network, two different force-directed layouts
    // Nodes: A is the hub (connected to everyone), B-F are periphery
    const nodesA = [
        { id: 'A', x: 50, y: 50, label: 'CEO', r: 14 },
        { id: 'B', x: 20, y: 20, label: 'CTO', r: 9 },
        { id: 'C', x: 80, y: 20, label: 'CFO', r: 9 },
        { id: 'D', x: 20, y: 80, label: 'CMO', r: 9 },
        { id: 'E', x: 80, y: 80, label: 'COO', r: 9 },
        { id: 'F', x: 50, y: 15, label: 'CRO', r: 9 },
    ];
    const nodesB = [
        { id: 'B', x: 50, y: 50, label: 'CTO', r: 14 }, // same network, CTO in center
        { id: 'A', x: 20, y: 20, label: 'CEO', r: 9 },
        { id: 'C', x: 80, y: 25, label: 'CFO', r: 9 },
        { id: 'D', x: 15, y: 75, label: 'CMO', r: 9 },
        { id: 'E', x: 85, y: 75, label: 'COO', r: 9 },
        { id: 'F', x: 50, y: 85, label: 'CRO', r: 9 },
    ];
    const edges = [['A', 'B'], ['A', 'C'], ['A', 'D'], ['A', 'E'], ['A', 'F'], ['B', 'C']];

    const w = 100, h = 100;
    const toSvgX = (x: number) => (x / 100) * w;
    const toSvgY = (y: number) => (y / 100) * h;

    function Layout({ nodes, title, note }: { nodes: typeof nodesA, title: string, note: string }) {
        const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
        return (
            <div className="space-y-1">
                <p className="text-[10px] text-stone-400 font-bold text-center">{title}</p>
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[140px] mx-auto">
                    {edges.map(([a, b]) => {
                        const na = nodeMap[a], nb = nodeMap[b];
                        if (!na || !nb) return null;
                        return <line key={`${a}-${b}`} x1={toSvgX(na.x)} y1={toSvgY(na.y)}
                            x2={toSvgX(nb.x)} y2={toSvgY(nb.y)} stroke="#e7e5e4" strokeWidth={1.5} />;
                    })}
                    {nodes.map(n => (
                        <g key={n.id}>
                            <circle cx={toSvgX(n.x)} cy={toSvgY(n.y)} r={n.r}
                                fill={n.r > 10 ? '#059669' : '#d1fae5'} stroke="white" strokeWidth={1} />
                            <text x={toSvgX(n.x)} y={toSvgY(n.y) + 3.5} fill={n.r > 10 ? 'white' : '#064e3b'}
                                fontSize={5.5} textAnchor="middle" fontWeight={700}>{n.label}</text>
                        </g>
                    ))}
                </svg>
                <p className="text-[10px] text-stone-500 text-center">{note}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            <Layout nodes={nodesA} title="Layout A: CEO centered" note="Implies CEO has power" />
            <Layout nodes={nodesB} title="Layout B: CTO centered" note="Implies CTO has power" />
        </div>
    );
}

export default function HierarchyLesson() {
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
                <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Same network data, different center node — implies different organizational power
                    </p>
                    <NetworkLayoutChart />
                    <p className="text-[12px] text-stone-400 leading-relaxed">
                        The network connections are identical in both layouts. Only the center node changes. Layout A implies CEO is the hub of organizational power; Layout B implies CTO is. The visual "importance" of being in the center is a layout artifact — not a data property.
                    </p>
                </div>

                {/* Chart type decision guide */}
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-5">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                        Which hierarchy chart for which data structure?
                    </p>
                    <div className="space-y-2">
                        {[
                            { structure: 'Strict parent-child hierarchy (1 parent per node)', chart: 'Tree diagram / dendrogram' },
                            { structure: 'Hierarchical space-filling partition with quantities', chart: 'Treemap or icicle chart' },
                            { structure: 'Flow volumes between defined stages', chart: 'Sankey diagram' },
                            { structure: 'Bidirectional flows between a small node set', chart: 'Chord diagram' },
                            { structure: 'Graph with multiple parents or cycles', chart: 'Network graph (DAG)' },
                            { structure: 'Hierarchical clustering result from an algorithm', chart: 'Dendrogram' },
                        ].map((d, i) => (
                            <div key={i} className="flex items-start gap-3 text-[12px]">
                                <span className="text-stone-400 flex-1 leading-relaxed">{d.structure}</span>
                                <span className="shrink-0 text-brand font-semibold">→ {d.chart}</span>
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
