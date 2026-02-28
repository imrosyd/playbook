import EthicalLevelLesson from '../section05/EthicalLevelLesson';

const crossRefs = [
    { sectionId: 'lab', slug: 'full-lab', label: '3.5 — Full Lab: compare honest vs. distorted versions' },
    { sectionId: 'simulator', slug: 'revenue', label: '4.1 — Revenue: honest presentation in practice' },
    { sectionId: 'ethics', slug: 'emphasis', label: '5.2 — Level 2: Emphasis (next level)' },
];

export default function ClarityLesson() {
    return <EthicalLevelLesson levelIndex={0} crossRefs={crossRefs} />;
}
