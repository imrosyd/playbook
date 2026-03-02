import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LabLesson from './LabLesson';

export default function ZoomingInAxisTricksLesson() {
    const { lang } = useLang();
    const crossRefs = [
        { sectionId: 'perception', slug: 'anchoring', label: t(lang, 's3.zoomingIn.crossRefs.0.label') },
        { sectionId: 'ethics', slug: 'distortion', label: t(lang, 's3.zoomingIn.crossRefs.1.label') },
        { sectionId: 'lab', slug: 'full-lab', label: t(lang, 's3.zoomingIn.crossRefs.2.label') },
    ];
    return <LabLesson mode="axis-scale" crossRefs={crossRefs} />;
}
