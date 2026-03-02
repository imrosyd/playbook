import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LabLesson from './LabLesson';

export default function TheMagicWordsLesson() {
    const { lang } = useLang();
    const crossRefs = [
        { sectionId: 'perception', slug: 'anchoring', label: t(lang, 's3.magicWords.crossRefs.0.label') },
        { sectionId: 'perception', slug: 'cognitive-load', label: t(lang, 's3.magicWords.crossRefs.1.label') },
        { sectionId: 'ethics', slug: 'manipulation', label: t(lang, 's3.magicWords.crossRefs.2.label') },
        { sectionId: 'lab', slug: 'full-lab', label: t(lang, 's3.magicWords.crossRefs.3.label') },
    ];
    return <LabLesson mode="annotation-trend" crossRefs={crossRefs} />;
}
