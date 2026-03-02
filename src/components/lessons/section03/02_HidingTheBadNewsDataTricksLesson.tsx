import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LabLesson from './LabLesson';

export default function HidingTheBadNewsDataTricksLesson() {
    const { lang } = useLang();
    const crossRefs = [
        { sectionId: 'perception', slug: 'pattern', label: t(lang, 's3.hidingBadNews.crossRefs.0.label') },
        { sectionId: 'ethics', slug: 'framing', label: t(lang, 's3.hidingBadNews.crossRefs.1.label') },
        { sectionId: 'lab', slug: 'full-lab', label: t(lang, 's3.hidingBadNews.crossRefs.2.label') },
    ];
    return <LabLesson mode="data-transform" crossRefs={crossRefs} />;
}
