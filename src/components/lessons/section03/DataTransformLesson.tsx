import LabLesson from './LabLesson';

const crossRefs = [
    { sectionId: 'perception', slug: 'pattern', label: '1.4 — Pattern Recognition: how smoothing exploits our pattern-seeking bias' },
    { sectionId: 'ethics', slug: 'framing', label: '5.3 — Framing: selective data presentation as a framing technique' },
    { sectionId: 'lab', slug: 'full-lab', label: '3.5 — Full Lab: combine all manipulation techniques' },
];

export default function DataTransformLesson() {
    return <LabLesson mode="data-transform" crossRefs={crossRefs} />;
}
