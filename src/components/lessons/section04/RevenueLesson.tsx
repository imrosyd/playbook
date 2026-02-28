import SimulatorLesson from './SimulatorLesson';

const crossRefs = [
    { sectionId: 'perception', slug: 'anchoring', label: '1.3 — Anchoring: how axis baseline sets the narrative' },
    { sectionId: 'lab', slug: 'axis-scale', label: '3.1 — Axis & Scale: build and observe axis truncation' },
    { sectionId: 'ethics', slug: 'distortion', label: '5.4 — Distortion: ethical classification of axis manipulation' },
];

export default function RevenueLesson() {
    return <SimulatorLesson scenarioKey="revenue" crossRefs={crossRefs} />;
}
