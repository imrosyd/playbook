import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import SimulatorLesson from './SimulatorLesson';

const crossRefs = (lang: any) => [
    { sectionId: 'perception', slug: 'anchoring', label: t(lang, 's5.cfoQA.crossRefs.0.label') },
    { sectionId: 'lab', slug: 'visual-emphasis', label: t(lang, 's5.cfoQA.crossRefs.1.label') },
    { sectionId: 'ethics', slug: 'framing', label: t(lang, 's5.cfoQA.crossRefs.2.label') },
];

export default function TheCfoQALesson() {
    const { lang } = useLang();
    return <SimulatorLesson scenarioKey="budget" crossRefs={crossRefs(lang)} />;
}
