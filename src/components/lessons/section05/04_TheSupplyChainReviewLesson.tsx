import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import SimulatorLesson from './SimulatorLesson';

const crossRefs = (lang: any) => [
    { sectionId: 'perception', slug: 'cognitive-load', label: t(lang, 's5.supplyChainReview.crossRefs.0.label') },
    { sectionId: 'lab', slug: 'annotation-trend', label: t(lang, 's5.supplyChainReview.crossRefs.1.label') },
    { sectionId: 'ethics', slug: 'clarity', label: t(lang, 's5.supplyChainReview.crossRefs.2.label') },
];

export default function TheSupplyChainReviewLesson() {
    const { lang } = useLang();
    return <SimulatorLesson scenarioKey="inventory" crossRefs={crossRefs(lang)} />;
}
