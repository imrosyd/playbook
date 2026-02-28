import EthicalLevelLesson from '../section05/EthicalLevelLesson';

const crossRefs = [
    { sectionId: 'perception', slug: 'anchoring', label: '1.3 — Anchoring: how framing exploits first-impression bias' },
    { sectionId: 'lab', slug: 'annotation-trend', label: '3.4 — Annotation & Trend: build framing techniques' },
    { sectionId: 'ethics', slug: 'emphasis', label: '5.2 — Level 2: Emphasis (previous level)' },
    { sectionId: 'ethics', slug: 'distortion', label: '5.4 — Level 4: Distortion (next level)' },
];

export default function FramingLesson() {
    return <EthicalLevelLesson levelIndex={2} crossRefs={crossRefs} />;
}
