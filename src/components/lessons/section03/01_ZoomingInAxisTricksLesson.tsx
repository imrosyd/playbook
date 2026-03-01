import LabLesson from './LabLesson';

const crossRefs = [
    { sectionId: 'perception', slug: 'anchoring', label: '1.3 — Anchoring: how axis choice sets the frame' },
    { sectionId: 'ethics', slug: 'distortion', label: '5.4 — Distortion: systematic perceptual errors from axis manipulation' },
    { sectionId: 'lab', slug: 'full-lab', label: '3.5 — Full Lab: combine all manipulation techniques' },
];

export default function ZoomingInAxisTricksLesson() {
    return <LabLesson mode="axis-scale" crossRefs={crossRefs} />;
}
