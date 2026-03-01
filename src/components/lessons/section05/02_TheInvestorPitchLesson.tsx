import SimulatorLesson from './SimulatorLesson';

const crossRefs = [
    { sectionId: 'perception', slug: 'pattern', label: '1.4 — Pattern Recognition: trend perception in noisy data' },
    { sectionId: 'lab', slug: 'data-transform', label: '3.2 — Data Transform: smoothing and its effect on churn signals' },
    { sectionId: 'ethics', slug: 'framing', label: '5.3 — Framing: presenting deteriorating metrics favorably' },
];

export default function TheInvestorPitchLesson() {
    return <SimulatorLesson scenarioKey="churn" crossRefs={crossRefs} />;
}
