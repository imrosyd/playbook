import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LabLesson from './LabLesson';

export default function DesignPatternsLesson() {
    const { lang } = useLang();
    const crossRefs = [
        { sectionId: 'mechanics', slug: 'distribution', label: t(lang, 's3.designPatterns.crossRefs.0.label') },
        { sectionId: 'lab', slug: 'signal-noise', label: t(lang, 's3.designPatterns.crossRefs.1.label') },
        { sectionId: 'lab', slug: 'full-lab', label: t(lang, 's3.designPatterns.crossRefs.2.label') },
    ];
    return <LabLesson mode="design-patterns" crossRefs={crossRefs} />;
}
