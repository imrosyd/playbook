import EthicalLevelLesson from './EthicalLevelLesson';

const crossRefs = [
    { sectionId: 'lab', slug: 'full-lab', label: '3.5 — Full Lab: reproduce Level 5 charts yourself' },
    { sectionId: 'simulator', slug: 'revenue', label: '4.1 — Revenue Simulator: see manipulated version side-by-side' },
    { sectionId: 'ethics', slug: 'distortion', label: '5.4 — Level 4: Distortion (previous level)' },
    { sectionId: 'ethics', slug: 'assessment', label: '5.6 — Assessment: test your ability to identify manipulation levels' },
];

export default function ManipulationLesson() {
    return <EthicalLevelLesson levelIndex={4} crossRefs={crossRefs} />;
}
