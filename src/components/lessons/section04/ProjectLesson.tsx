import SimulatorLesson from './SimulatorLesson';

const crossRefs = [
    { sectionId: 'perception', slug: 'pattern', label: '1.4 — Pattern Recognition: velocity trends and confirmation bias' },
    { sectionId: 'lab', slug: 'data-transform', label: '3.2 — Data Transform: smoothing sprint data hides delivery risk' },
    { sectionId: 'ethics', slug: 'manipulation', label: '5.5 — Manipulation: compound distortion in project reporting' },
];

export default function ProjectLesson() {
    return <SimulatorLesson scenarioKey="project" crossRefs={crossRefs} />;
}
