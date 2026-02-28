import EthicalLevelLesson from '../section05/EthicalLevelLesson';

const crossRefs = [
    { sectionId: 'perception', slug: 'preattentive', label: '1.1 — Pre-attentive: visual channels that emphasis exploits' },
    { sectionId: 'lab', slug: 'visual-emphasis', label: '3.3 — Visual Emphasis lab: build emphasis techniques' },
    { sectionId: 'ethics', slug: 'clarity', label: '5.1 — Level 1: Clarity (previous level)' },
    { sectionId: 'ethics', slug: 'framing', label: '5.3 — Level 3: Framing (next level)' },
];

export default function EmphasisLesson() {
    return <EthicalLevelLesson levelIndex={1} crossRefs={crossRefs} />;
}
