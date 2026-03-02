import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LabLesson from './LabLesson';

export default function SignalVsNoiseLesson() {
    const { lang } = useLang();
    const crossRefs = [
        { sectionId: 'perception', slug: 'spotting-the-signal', label: t(lang, 's3.signalNoise.crossRefs.0.label') },
        { sectionId: 'lab', slug: 'design-patterns', label: t(lang, 's3.signalNoise.crossRefs.1.label') },
        { sectionId: 'lab', slug: 'full-lab', label: t(lang, 's3.signalNoise.crossRefs.2.label') },
    ];
    return <LabLesson mode="signal-noise" crossRefs={crossRefs} />;
}
