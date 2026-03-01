import SimulatorLesson from '../section04/SimulatorLesson';

const crossRefs = [
    { sectionId: 'perception', slug: 'cognitive-load', label: '1.2 — Cognitive Load: complexity in multi-category comparisons' },
    { sectionId: 'lab', slug: 'annotation-trend', label: '3.4 — Annotation & Trend: adding narrative to inventory charts' },
    { sectionId: 'ethics', slug: 'clarity', label: '5.1 — Clarity: presenting inventory data transparently' },
];

export default function TheSupplyChainReviewLesson() {
    return <SimulatorLesson scenarioKey="inventory" crossRefs={crossRefs} />;
}
