import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LabLesson from './LabLesson';

export default function FullLabLesson() {
    const { lang } = useLang();
    const crossRefs = [
        { sectionId: 'lab', slug: 'axis-scale', label: t(lang, 's3.fullLab.crossRefs.0.label') },
        { sectionId: 'lab', slug: 'data-transform', label: t(lang, 's3.fullLab.crossRefs.1.label') },
        { sectionId: 'lab', slug: 'visual-emphasis', label: t(lang, 's3.fullLab.crossRefs.2.label') },
        { sectionId: 'lab', slug: 'annotation-trend', label: t(lang, 's3.fullLab.crossRefs.3.label') },
        { sectionId: 'simulator', slug: 'revenue', label: t(lang, 's3.fullLab.crossRefs.4.label') },
        { sectionId: 'ethics', slug: 'assessment', label: t(lang, 's3.fullLab.crossRefs.5.label') },
    ];
    return <LabLesson mode="full" crossRefs={crossRefs} />;
}
