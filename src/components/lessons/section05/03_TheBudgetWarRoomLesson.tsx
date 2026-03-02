import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import SimulatorLesson from './SimulatorLesson';

const crossRefs = (lang: any) => [
    { sectionId: 'perception', slug: 'preattentive', label: t(lang, 's5.budgetWarRoom.crossRefs.0.label') },
    { sectionId: 'lab', slug: 'visual-emphasis', label: t(lang, 's5.budgetWarRoom.crossRefs.1.label') },
    { sectionId: 'ethics', slug: 'emphasis', label: t(lang, 's5.budgetWarRoom.crossRefs.2.label') },
];

export default function TheBudgetWarRoomLesson() {
    const { lang } = useLang();
    return <SimulatorLesson scenarioKey="marketing" crossRefs={crossRefs(lang)} />;
}
