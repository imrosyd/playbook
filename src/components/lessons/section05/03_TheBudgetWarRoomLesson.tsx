import SimulatorLesson from '../section04/SimulatorLesson';

const crossRefs = [
    { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive: color emphasis in channel comparison' },
    { sectionId: 'lab', slug: 'visual-emphasis', label: '3.3 — Visual Emphasis: highlighting winning channels' },
    { sectionId: 'ethics', slug: 'emphasis', label: '5.2 — Emphasis: cherry-picking channel performance' },
];

export default function TheBudgetWarRoomLesson() {
    return <SimulatorLesson scenarioKey="marketing" crossRefs={crossRefs} />;
}
