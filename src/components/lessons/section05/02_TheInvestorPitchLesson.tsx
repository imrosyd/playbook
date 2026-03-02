import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import SimulatorLesson from './SimulatorLesson';

const crossRefs = (lang: any) => [
    { sectionId: 'perception', slug: 'pattern', label: t(lang, 's5.investorPitch.crossRefs.0.label') },
    { sectionId: 'lab', slug: 'data-transform', label: t(lang, 's5.investorPitch.crossRefs.1.label') },
    { sectionId: 'ethics', slug: 'framing', label: t(lang, 's5.investorPitch.crossRefs.2.label') },
];

export default function TheInvestorPitchLesson() {
    const { lang } = useLang();
    return <SimulatorLesson scenarioKey="churn" crossRefs={crossRefs(lang)} />;
}
