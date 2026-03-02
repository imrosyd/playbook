import { useParams } from 'react-router-dom';
import { type ComponentType } from 'react';

// Section 01 — The First 3 Seconds
import TheBlinkTestLesson from '../lessons/section01/01_TheBlinkTestLesson';
import Decluttering101Lesson from '../lessons/section01/02_Decluttering101Lesson';
import TheAnchorEffectLesson from '../lessons/section01/03_TheAnchorEffectLesson';
import SpottingTheSignalLesson from '../lessons/section01/04_SpottingTheSignalLesson';
import TheEthicsOfAttentionLesson from '../lessons/section01/05_TheEthicsOfAttentionLesson';

// Section 02 — Choosing the Right Chart
import WhoIsWinningLesson from '../lessons/section02/01_WhoIsWinningLesson';
import AreWeGrowingLesson from '../lessons/section02/02_AreWeGrowingLesson';
import HowIsItSpreadLesson from '../lessons/section02/03_HowIsItSpreadLesson';
import WhatsTheRelationshipLesson from '../lessons/section02/04_WhatsTheRelationshipLesson';
import WhereIsTheMoneyGoingLesson from '../lessons/section02/05_WhereIsTheMoneyGoingLesson';
import HowDoesItFlowLesson from '../lessons/section02/06_HowDoesItFlowLesson';
import AreWeOnScheduleLesson from '../lessons/section02/07_AreWeOnScheduleLesson';
import ACaseForTablesLesson from '../lessons/section02/08_ACaseForTablesLesson';
import HowDidRanksChangeLesson from '../lessons/section02/09_HowDidRanksChangeLesson';
import SignalBoostersLesson from '../lessons/section02/10_SignalBoostersLesson';
import DistributionTechniquesLesson from '../lessons/section02/11_DistributionTechniquesLesson';
import SpecialtyFrameworksLesson from '../lessons/section02/12_SpecialtyFrameworksLesson';

// Section 03 — The Makeover Lab
import ZoomingInAxisTricksLesson from '../lessons/section03/01_ZoomingInAxisTricksLesson';
import HidingTheBadNewsDataTricksLesson from '../lessons/section03/02_HidingTheBadNewsDataTricksLesson';
import TheSpotlightEffectLesson from '../lessons/section03/03_TheSpotlightEffectLesson';
import TheMagicWordsLesson from '../lessons/section03/04_TheMagicWordsLesson';
import FullLabLesson from '../lessons/section03/07_FullLabLesson';
import SignalVsNoiseLesson from '../lessons/section03/05_SignalVsNoiseLesson';
import DesignPatternsLesson from '../lessons/section03/06_DesignPatternsLesson';

// Section 04 — Data Storytelling (new)
import CraftingTheSoWhatLesson from '../lessons/section04/01_CraftingTheSoWhatLesson';
import The3PartSlideStructureLesson from '../lessons/section04/02_The3PartSlideStructureLesson';
import PowerTitlesLesson from '../lessons/section04/03_PowerTitlesLesson';
import TheLanguageOfAuthorityLesson from '../lessons/section04/04_TheLanguageOfAuthorityLesson';
import NarrativeScaleLesson from '../lessons/section04/05_NarrativeScaleLesson';
import WordsPsychologyLesson from '../lessons/section04/06_WordsPsychologyLesson';
import BridgingTheJargonGapLesson from '../lessons/section04/07_BridgingTheJargonGapLesson';

// Section 05 — The Decision Room (simulator)
import TheBoardMeetingLesson from '../lessons/section05/01_TheBoardMeetingLesson';
import TheInvestorPitchLesson from '../lessons/section05/02_TheInvestorPitchLesson';
import TheBudgetWarRoomLesson from '../lessons/section05/03_TheBudgetWarRoomLesson';
import TheSupplyChainReviewLesson from '../lessons/section05/04_TheSupplyChainReviewLesson';
import TheSprintRetrospectiveLesson from '../lessons/section05/05_TheSprintRetrospectiveLesson';
import TheCfoQALesson from '../lessons/section05/06_TheCfoQALesson';

// Section 06 — Color & Design (new)
import The3ColorRuleLesson from '../lessons/section06/01_The3ColorRuleLesson';
import ColorPsychologyLesson from '../lessons/section06/02_ColorPsychologyLesson';
import DesigningForColorblindnessLesson from '../lessons/section06/03_DesigningForColorblindnessLesson';
import FontLayoutBasicsLesson from '../lessons/section06/04_FontLayoutBasicsLesson';

// Section 07 — Case Studies (new)
import ChallengerLesson from '../lessons/section07/01_ChallengerLesson';
import CovidDashboardWars2020Lesson from '../lessons/section07/02_CovidDashboardWars2020Lesson';
import BoardroomTurnaroundLesson from '../lessons/section07/03_BoardroomTurnaroundLesson';
import TheBadChartHallOfFameLesson from '../lessons/section07/04_TheBadChartHallOfFameLesson';
import ContextAccessibilityLesson from '../lessons/section07/05_ContextAccessibilityLesson';

// Section 08 — Ethical Framework & Certification
import Level1ClarityLesson from '../lessons/section08/01_Level1ClarityLesson';
import Level2EmphasisLesson from '../lessons/section08/02_Level2EmphasisLesson';
import Level3FramingLesson from '../lessons/section08/03_Level3FramingLesson';
import Level4DistortionLesson from '../lessons/section08/04_Level4DistortionLesson';
import Level5ManipulationLesson from '../lessons/section08/05_Level5ManipulationLesson';
import CertificationAssessmentLesson from '../lessons/section08/06_CertificationAssessmentLesson';

const LESSON_MAP: Record<string, Record<string, ComponentType>> = {
    perception: {
        preattentive: TheBlinkTestLesson,
        'cognitive-load': Decluttering101Lesson,
        anchoring: TheAnchorEffectLesson,
        pattern: SpottingTheSignalLesson,
        'ethical-attention': TheEthicsOfAttentionLesson,
    },
    mechanics: {
        comparison: WhoIsWinningLesson,
        'time-series': AreWeGrowingLesson,
        distribution: HowIsItSpreadLesson,
        relationship: WhatsTheRelationshipLesson,
        composition: WhereIsTheMoneyGoingLesson,
        hierarchy: HowDoesItFlowLesson,
        operational: AreWeOnScheduleLesson,
        tables: ACaseForTablesLesson,
        slopegraph: HowDidRanksChangeLesson,
        'signal-techniques': SignalBoostersLesson,
        'distribution-techniques': DistributionTechniquesLesson,
        'special-charts': SpecialtyFrameworksLesson,
    },
    lab: {
        'axis-scale': ZoomingInAxisTricksLesson,
        'data-transform': HidingTheBadNewsDataTricksLesson,
        'visual-emphasis': TheSpotlightEffectLesson,
        'annotation-trend': TheMagicWordsLesson,
        'signal-noise': SignalVsNoiseLesson,
        'design-patterns': DesignPatternsLesson,
        'full-lab': FullLabLesson,
    },
    storytelling: {
        'so-what': CraftingTheSoWhatLesson,
        'slide-structure': The3PartSlideStructureLesson,
        'power-titles': PowerTitlesLesson,
        'language-authority': TheLanguageOfAuthorityLesson,
        'narrative-scale': NarrativeScaleLesson,
        'word-display': WordsPsychologyLesson,
        'jargon-gap': BridgingTheJargonGapLesson,
    },
    simulator: {
        revenue: TheBoardMeetingLesson,
        churn: TheInvestorPitchLesson,
        marketing: TheBudgetWarRoomLesson,
        inventory: TheSupplyChainReviewLesson,
        project: TheSprintRetrospectiveLesson,
        budget: TheCfoQALesson,
    },
    design: {
        'three-color-rule': The3ColorRuleLesson,
        'color-psychology': ColorPsychologyLesson,
        'colorblind': DesigningForColorblindnessLesson,
        'typography': FontLayoutBasicsLesson,
    },
    cases: {
        'challenger': ChallengerLesson,
        'covid-dashboards': CovidDashboardWars2020Lesson,
        'boardroom-turnaround': BoardroomTurnaroundLesson,
        'bad-chart-hall': TheBadChartHallOfFameLesson,
        'data-context': ContextAccessibilityLesson,
    },
    ethics: {
        clarity: Level1ClarityLesson,
        emphasis: Level2EmphasisLesson,
        framing: Level3FramingLesson,
        distortion: Level4DistortionLesson,
        manipulation: Level5ManipulationLesson,
        assessment: CertificationAssessmentLesson,
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
