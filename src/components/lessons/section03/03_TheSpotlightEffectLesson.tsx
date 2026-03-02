import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LabLesson from './LabLesson';

export default function TheSpotlightEffectLesson() {
    const { lang } = useLang();
    const crossRefs = [
        { sectionId: 'perception', slug: 'preattentive', label: t(lang, 's3.spotlightEffect.crossRefs.0.label') },
        { sectionId: 'ethics', slug: 'emphasis', label: t(lang, 's3.spotlightEffect.crossRefs.1.label') },
        { sectionId: 'lab', slug: 'full-lab', label: t(lang, 's3.spotlightEffect.crossRefs.2.label') },
    ];
    return <LabLesson mode="visual-emphasis" crossRefs={crossRefs} />;
}
