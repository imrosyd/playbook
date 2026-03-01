import LabLesson from './LabLesson';

const crossRefs = [
    { sectionId: 'lab', slug: 'axis-scale', label: '3.1 — Axis & Scale manipulation' },
    { sectionId: 'lab', slug: 'data-transform', label: '3.2 — Data Transformation manipulation' },
    { sectionId: 'lab', slug: 'visual-emphasis', label: '3.3 — Visual Emphasis manipulation' },
    { sectionId: 'lab', slug: 'annotation-trend', label: '3.4 — Annotation & Trend manipulation' },
    { sectionId: 'simulator', slug: 'revenue', label: '4.1 — Revenue scenario: honest vs. manipulated' },
    { sectionId: 'ethics', slug: 'assessment', label: '5.6 — Assessment: test your manipulation detection skills' },
];

export default function FullLabLesson() {
    return <LabLesson mode="full" crossRefs={crossRefs} />;
}
