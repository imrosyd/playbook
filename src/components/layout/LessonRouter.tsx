import { useParams } from 'react-router-dom';
import { type ComponentType } from 'react';

import PreattentiveLesson from '../lessons/section01/PreattentiveLesson';
import CognitiveLoadLesson from '../lessons/section01/CognitiveLoadLesson';
import AnchoringLesson from '../lessons/section01/AnchoringLesson';
import PatternLesson from '../lessons/section01/PatternLesson';
import EthicalAttentionLesson from '../lessons/section01/EthicalAttentionLesson';
import ComparisonLesson from '../lessons/section02/ComparisonLesson';
import TimeSeriesLesson from '../lessons/section02/TimeSeriesLesson';
import DistributionLesson from '../lessons/section02/DistributionLesson';
import RelationshipLesson from '../lessons/section02/RelationshipLesson';
import CompositionLesson from '../lessons/section02/CompositionLesson';
import HierarchyLesson from '../lessons/section02/HierarchyLesson';
import OperationalLesson from '../lessons/section02/OperationalLesson';
import AxisScaleLesson from '../lessons/section03/AxisScaleLesson';
import DataTransformLesson from '../lessons/section03/DataTransformLesson';
import VisualEmphasisLesson from '../lessons/section03/VisualEmphasisLesson';
import AnnotationTrendLesson from '../lessons/section03/AnnotationTrendLesson';
import FullLabLesson from '../lessons/section03/FullLabLesson';
import RevenueLesson from '../lessons/section04/RevenueLesson';
import ChurnLesson from '../lessons/section04/ChurnLesson';
import MarketingLesson from '../lessons/section04/MarketingLesson';
import InventoryLesson from '../lessons/section04/InventoryLesson';
import ProjectLesson from '../lessons/section04/ProjectLesson';
import BudgetLesson from '../lessons/section04/BudgetLesson';
import ClarityLesson from '../lessons/section05/ClarityLesson';
import EmphasisLesson from '../lessons/section05/EmphasisLesson';
import FramingLesson from '../lessons/section05/FramingLesson';
import DistortionLesson from '../lessons/section05/DistortionLesson';
import ManipulationLesson from '../lessons/section05/ManipulationLesson';
import AssessmentLesson from '../lessons/section05/AssessmentLesson';

const LESSON_MAP: Record<string, Record<string, ComponentType>> = {
    perception: {
        preattentive: PreattentiveLesson,
        'cognitive-load': CognitiveLoadLesson,
        anchoring: AnchoringLesson,
        pattern: PatternLesson,
        'ethical-attention': EthicalAttentionLesson,
    },
    mechanics: {
        comparison: ComparisonLesson,
        'time-series': TimeSeriesLesson,
        distribution: DistributionLesson,
        relationship: RelationshipLesson,
        composition: CompositionLesson,
        hierarchy: HierarchyLesson,
        operational: OperationalLesson,
    },
    lab: {
        'axis-scale': AxisScaleLesson,
        'data-transform': DataTransformLesson,
        'visual-emphasis': VisualEmphasisLesson,
        'annotation-trend': AnnotationTrendLesson,
        'full-lab': FullLabLesson,
    },
    simulator: {
        revenue: RevenueLesson,
        churn: ChurnLesson,
        marketing: MarketingLesson,
        inventory: InventoryLesson,
        project: ProjectLesson,
        budget: BudgetLesson,
    },
    ethics: {
        clarity: ClarityLesson,
        emphasis: EmphasisLesson,
        framing: FramingLesson,
        distortion: DistortionLesson,
        manipulation: ManipulationLesson,
        assessment: AssessmentLesson,
    },
};

export default function LessonRouter() {
    const { sectionId, lessonSlug } = useParams();

    if (!sectionId || !lessonSlug) return <NotFound />;

    const Component = LESSON_MAP[sectionId]?.[lessonSlug];
    if (!Component) return <NotFound />;

    return <Component />;
}

function NotFound() {
    return (
        <div className="text-center py-20">
            <h2 className="text-xl font-bold text-stone-800 mb-2">Lesson not found</h2>
            <p className="text-sm text-stone-500">This lesson doesn't exist or the URL is incorrect.</p>
        </div>
    );
}
