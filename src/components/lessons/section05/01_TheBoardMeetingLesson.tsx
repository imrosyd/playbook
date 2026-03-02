import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import SimulatorLesson from './SimulatorLesson';

const crossRefs = (lang: any) => [
    { sectionId: 'perception', slug: 'anchoring', label: t(lang, 's5.boardMeeting.crossRefs.0.label') },
    { sectionId: 'lab', slug: 'axis-scale', label: t(lang, 's5.boardMeeting.crossRefs.1.label') },
    { sectionId: 'ethics', slug: 'distortion', label: t(lang, 's5.boardMeeting.crossRefs.2.label') },
];

export default function TheBoardMeetingLesson() {
    const { lang } = useLang();
    return <SimulatorLesson scenarioKey="revenue" crossRefs={crossRefs(lang)} />;
}
