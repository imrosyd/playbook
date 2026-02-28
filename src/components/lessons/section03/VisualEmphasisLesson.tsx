import LabLesson from './LabLesson';

const crossRefs = [
    { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive Attributes: the visual channels emphasis exploits' },
    { sectionId: 'ethics', slug: 'emphasis', label: '5.2 — Emphasis: when editorial direction becomes manipulation' },
    { sectionId: 'lab', slug: 'full-lab', label: '3.5 — Full Lab: combine all manipulation techniques' },
];

export default function VisualEmphasisLesson() {
    return <LabLesson mode="visual-emphasis" crossRefs={crossRefs} />;
}
