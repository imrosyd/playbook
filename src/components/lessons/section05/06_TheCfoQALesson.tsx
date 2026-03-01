import SimulatorLesson from './SimulatorLesson';

const crossRefs = [
    { sectionId: 'perception', slug: 'anchoring', label: '1.3 — Anchoring: how 100% baseline anchors budget perception' },
    { sectionId: 'lab', slug: 'visual-emphasis', label: '3.3 — Visual Emphasis: hiding over-budget departments' },
    { sectionId: 'ethics', slug: 'framing', label: '5.3 — Framing: favorable framing of budget overruns' },
];

export default function TheCfoQALesson() {
    return <SimulatorLesson scenarioKey="budget" crossRefs={crossRefs} />;
}
