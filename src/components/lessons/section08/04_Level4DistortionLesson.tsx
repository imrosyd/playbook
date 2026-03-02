import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import EthicalLevelLesson from './EthicalLevelLesson';

const crossRefs = (lang: any) => [
    { sectionId: 'perception', slug: 'preattentive', label: t(lang, 's8.level4.crossRefs.0.label') },
    { sectionId: 'lab', slug: 'axis-scale', label: t(lang, 's8.level4.crossRefs.1.label') },
    { sectionId: 'ethics', slug: 'framing', label: t(lang, 's8.level4.crossRefs.2.label') },
    { sectionId: 'ethics', slug: 'manipulation', label: t(lang, 's8.level4.crossRefs.3.label') },
];

export default function Level4DistortionLesson() {
    const { lang } = useLang();
    return <EthicalLevelLesson levelIndex={3} crossRefs={crossRefs(lang)} />;
}
