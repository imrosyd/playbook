import { useParams } from 'react-router-dom';
import { type ComponentType } from 'react';

// Section 01 — The First 3 Seconds
import PreattentiveLesson from '../lessons/section01/PreattentiveLesson';
import CognitiveLoadLesson from '../lessons/section01/CognitiveLoadLesson';
import AnchoringLesson from '../lessons/section01/AnchoringLesson';
import PatternLesson from '../lessons/section01/PatternLesson';
import EthicalAttentionLesson from '../lessons/section01/EthicalAttentionLesson';

// Section 02 — Choosing the Right Chart
import ComparisonLesson from '../lessons/section02/ComparisonLesson';
import TimeSeriesLesson from '../lessons/section02/TimeSeriesLesson';
import DistributionLesson from '../lessons/section02/DistributionLesson';
import RelationshipLesson from '../lessons/section02/RelationshipLesson';
import CompositionLesson from '../lessons/section02/CompositionLesson';
import HierarchyLesson from '../lessons/section02/HierarchyLesson';
import OperationalLesson from '../lessons/section02/OperationalLesson';
import TablesLesson from '../lessons/section02/TablesLesson';

// Section 03 — The Makeover Lab
import AxisScaleLesson from '../lessons/section03/AxisScaleLesson';
import DataTransformLesson from '../lessons/section03/DataTransformLesson';
import VisualEmphasisLesson from '../lessons/section03/VisualEmphasisLesson';
import AnnotationTrendLesson from '../lessons/section03/AnnotationTrendLesson';
import FullLabLesson from '../lessons/section03/FullLabLesson';

// Section 04 — Data Storytelling (new)
import SoWhatLesson from '../lessons/section04/SoWhatLesson';
import SlideStructureLesson from '../lessons/section04/SlideStructureLesson';
import PowerTitlesLesson from '../lessons/section04/PowerTitlesLesson';
import LanguageAuthorityLesson from '../lessons/section04/LanguageAuthorityLesson';
import JargonGapLesson from '../lessons/section04/JargonGapLesson';

// Section 05 — The Decision Room (simulator)
import RevenueLesson from '../lessons/section05/RevenueLesson';
import ChurnLesson from '../lessons/section05/ChurnLesson';
import MarketingLesson from '../lessons/section05/MarketingLesson';
import InventoryLesson from '../lessons/section05/InventoryLesson';
import ProjectLesson from '../lessons/section05/ProjectLesson';
import BudgetLesson from '../lessons/section05/BudgetLesson';

// Section 06 — Color & Design (new)
import ThreeColorRuleLesson from '../lessons/section06/ThreeColorRuleLesson';
import ColorPsychologyLesson from '../lessons/section06/ColorPsychologyLesson';
import ColorblindLesson from '../lessons/section06/ColorblindLesson';
import TypographyLesson from '../lessons/section06/TypographyLesson';

// Section 07 — Case Studies (new)
import ChallengerLesson from '../lessons/section07/ChallengerLesson';
import CovidDashboardsLesson from '../lessons/section07/CovidDashboardsLesson';
import BoardroomTurnaroundLesson from '../lessons/section07/BoardroomTurnaroundLesson';
import BadChartHallLesson from '../lessons/section07/BadChartHallLesson';

// Section 08 — Ethical Framework & Certification
import ClarityLesson from '../lessons/section08/ClarityLesson';
import EmphasisLesson from '../lessons/section08/EmphasisLesson';
import FramingLesson from '../lessons/section08/FramingLesson';
import DistortionLesson from '../lessons/section08/DistortionLesson';
import ManipulationLesson from '../lessons/section08/ManipulationLesson';
import AssessmentLesson from '../lessons/section08/AssessmentLesson';

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
        tables: TablesLesson,
    },
    lab: {
        'axis-scale': AxisScaleLesson,
        'data-transform': DataTransformLesson,
        'visual-emphasis': VisualEmphasisLesson,
        'annotation-trend': AnnotationTrendLesson,
        'full-lab': FullLabLesson,
    },
    storytelling: {
        'so-what': SoWhatLesson,
        'slide-structure': SlideStructureLesson,
        'power-titles': PowerTitlesLesson,
        'language-authority': LanguageAuthorityLesson,
        'jargon-gap': JargonGapLesson,
    },
    simulator: {
        revenue: RevenueLesson,
        churn: ChurnLesson,
        marketing: MarketingLesson,
        inventory: InventoryLesson,
        project: ProjectLesson,
        budget: BudgetLesson,
    },
    design: {
        'three-color-rule': ThreeColorRuleLesson,
        'color-psychology': ColorPsychologyLesson,
        'colorblind': ColorblindLesson,
        'typography': TypographyLesson,
    },
    cases: {
        'challenger': ChallengerLesson,
        'covid-dashboards': CovidDashboardsLesson,
        'boardroom-turnaround': BoardroomTurnaroundLesson,
        'bad-chart-hall': BadChartHallLesson,
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
