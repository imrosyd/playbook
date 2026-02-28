import EthicalLevelLesson from '../section05/EthicalLevelLesson';

const crossRefs = [
    { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive: how 3D and axis errors corrupt visual channels' },
    { sectionId: 'lab', slug: 'axis-scale', label: '3.1 — Axis & Scale lab: observe axis truncation in action' },
    { sectionId: 'ethics', slug: 'framing', label: '5.3 — Level 3: Framing (previous level)' },
    { sectionId: 'ethics', slug: 'manipulation', label: '5.5 — Level 5: Manipulation (next level)' },
];

export default function DistortionLesson() {
    return <EthicalLevelLesson levelIndex={3} crossRefs={crossRefs} />;
}
