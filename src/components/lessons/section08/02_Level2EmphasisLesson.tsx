import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import EthicalLevelLesson from './EthicalLevelLesson';

const crossRefs = (lang: any) => [
    { sectionId: 'perception', slug: 'preattentive', label: t(lang, 's8.level2.crossRefs.0.label') },
    { sectionId: 'lab', slug: 'visual-emphasis', label: t(lang, 's8.level2.crossRefs.1.label') },
    { sectionId: 'ethics', slug: 'clarity', label: t(lang, 's8.level2.crossRefs.2.label') },
    { sectionId: 'ethics', slug: 'framing', label: t(lang, 's8.level2.crossRefs.3.label') },
];

export default function Level2EmphasisLesson() {
    const { lang } = useLang();
    return <EthicalLevelLesson levelIndex={1} crossRefs={crossRefs(lang)} />;
}
