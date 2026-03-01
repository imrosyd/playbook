import LabLesson from './LabLesson';

const crossRefs = [
    { sectionId: 'perception', slug: 'anchoring', label: '1.3 — Anchoring: how annotations lock in a frame of reference' },
    { sectionId: 'perception', slug: 'cognitive-load', label: '1.2 — Cognitive Load: how honest annotations reduce interpretive effort' },
    { sectionId: 'ethics', slug: 'manipulation', label: '5.5 — Manipulation: compound distortion with false narrative' },
    { sectionId: 'lab', slug: 'full-lab', label: '3.5 — Full Lab: combine all manipulation techniques' },
];

export default function TheMagicWordsLesson() {
    return <LabLesson mode="annotation-trend" crossRefs={crossRefs} />;
}
