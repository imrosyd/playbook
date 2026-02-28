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

export default function HierarchyLesson() {
    return (
        <LessonPage
            crossRefs={[
                { sectionId: 'perception', slug: 'pattern', label: '1.4 — Pattern Recognition: how hierarchy charts exploit grouping bias' },
                { sectionId: 'mechanics', slug: 'composition', label: '2.5 — Composition Charts: treemaps vs. pie charts for part-to-whole' },
                { sectionId: 'lab', slug: 'visual-emphasis', label: '3.3 — Visual Emphasis: color and size distortion in network layouts' },
            ]}
        >
            <div className="prose prose-stone max-w-none">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    Hierarchy and network charts encode structural relationships — how entities are connected,
                    nested, or flow between each other. Unlike other chart families, the visual encoding here
                    is primarily topological rather than quantitative. The Gestalt principles of
                    <strong> connection</strong> and <strong> proximity</strong> are the dominant perceptual
                    mechanisms. The key risk is that visual layout algorithms impose order and centrality
                    that reflects computational convenience rather than genuine structure in the data.
                </p>
            </div>

            <ChartFamilyLesson
                charts={charts}
                clevelandNote="Connection and proximity (Gestalt) are not in Cleveland & McGill's original hierarchy, which focused on quantitative encodings. For structural/topological data, the standard accuracy rankings do not apply — but this also means there is no baseline for 'accurate decoding.' Hierarchy charts carry especially high risk of over-interpretation."
            />
        </LessonPage>
    );
}
