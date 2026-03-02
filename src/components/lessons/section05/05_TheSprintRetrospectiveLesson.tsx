import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import SimulatorLesson from './SimulatorLesson';

const crossRefs = (lang: any) => [
    { sectionId: 'perception', slug: 'pattern', label: t(lang, 's5.sprintRetrospective.crossRefs.0.label') },
    { sectionId: 'lab', slug: 'data-transform', label: t(lang, 's5.sprintRetrospective.crossRefs.1.label') },
    { sectionId: 'ethics', slug: 'manipulation', label: t(lang, 's5.sprintRetrospective.crossRefs.2.label') },
];

export default function TheSprintRetrospectiveLesson() {
    const { lang } = useLang();
    return <SimulatorLesson scenarioKey="project" crossRefs={crossRefs(lang)} />;
}
