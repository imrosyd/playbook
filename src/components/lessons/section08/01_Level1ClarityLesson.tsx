import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import EthicalLevelLesson from './EthicalLevelLesson';

const crossRefs = (lang: any) => [
    { sectionId: 'lab', slug: 'full-lab', label: t(lang, 's8.level1.crossRefs.0.label') },
    { sectionId: 'simulator', slug: 'revenue', label: t(lang, 's8.level1.crossRefs.1.label') },
    { sectionId: 'ethics', slug: 'emphasis', label: t(lang, 's8.level1.crossRefs.2.label') },
];

export default function Level1ClarityLesson() {
    const { lang } = useLang();
    return <EthicalLevelLesson levelIndex={0} crossRefs={crossRefs(lang)} />;
}
