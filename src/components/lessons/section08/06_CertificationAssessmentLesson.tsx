import { useState } from 'react';
import { CheckCircle, XCircle, Award } from 'lucide-react';
import { useLang } from '../../../contexts/LanguageContext';
import { t } from '../../../lib/i18n';
import LessonPage from '../../layout/LessonPage';

interface CrossRef {
    sectionId: string;
    slug: string;
    label: string;
}

interface Question {
    id: number;
    text: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    topic: string;
}

const GET_QUESTIONS = (lang: any): Question[] => [
    {
        id: 1,
        text: t(lang, 's8.assessment.q1.text'),
        options: [
            t(lang, 's8.assessment.q1.opt0'),
            t(lang, 's8.assessment.q1.opt1'),
            t(lang, 's8.assessment.q1.opt2'),
            t(lang, 's8.assessment.q1.opt3'),
        ],
        correctIndex: 1,
        explanation: t(lang, 's8.assessment.q1.exp'),
        topic: t(lang, 's8.assessment.topic.bias'),
    },
    {
        id: 2,
        text: t(lang, 's8.assessment.q2.text'),
        options: [
            t(lang, 's8.assessment.q2.opt0'),
            t(lang, 's8.assessment.q2.opt1'),
            t(lang, 's8.assessment.q2.opt2'),
            t(lang, 's8.assessment.q2.opt3'),
        ],
        correctIndex: 1,
        explanation: t(lang, 's8.assessment.q2.exp'),
        topic: t(lang, 's8.assessment.topic.chartTypes'),
    },
    {
        id: 3,
        text: t(lang, 's8.assessment.q3.text'),
        options: [
            t(lang, 's8.assessment.q3.opt0'),
            t(lang, 's8.assessment.q3.opt1'),
            t(lang, 's8.assessment.q3.opt2'),
            t(lang, 's8.assessment.q3.opt3'),
        ],
        correctIndex: 1,
        explanation: t(lang, 's8.assessment.q3.exp'),
        topic: t(lang, 's8.assessment.topic.manipulation'),
    },
    {
        id: 4,
        text: t(lang, 's8.assessment.q4.text'),
        options: [
            t(lang, 's8.assessment.q4.opt0'),
            t(lang, 's8.assessment.q4.opt1'),
            t(lang, 's8.assessment.q4.opt2'),
            t(lang, 's8.assessment.q4.opt3'),
        ],
        correctIndex: 2,
        explanation: t(lang, 's8.assessment.q4.exp'),
        topic: t(lang, 's8.assessment.topic.ethical'),
    },
    {
        id: 5,
        text: t(lang, 's8.assessment.q5.text'),
        options: [
            t(lang, 's8.assessment.q5.opt0'),
            t(lang, 's8.assessment.q5.opt1'),
            t(lang, 's8.assessment.q5.opt2'),
            t(lang, 's8.assessment.q5.opt3'),
        ],
        correctIndex: 2,
        explanation: t(lang, 's8.assessment.q5.exp'),
        topic: t(lang, 's8.assessment.topic.bias'),
    },
    {
        id: 6,
        text: t(lang, 's8.assessment.q6.text'),
        options: [
            t(lang, 's8.assessment.q6.opt0'),
            t(lang, 's8.assessment.q6.opt1'),
            t(lang, 's8.assessment.q6.opt2'),
            t(lang, 's8.assessment.q6.opt3'),
        ],
        correctIndex: 2,
        explanation: t(lang, 's8.assessment.q6.exp'),
        topic: t(lang, 's8.assessment.topic.ethical'),
    },
    {
        id: 7,
        text: t(lang, 's8.assessment.q7.text'),
        options: [
            t(lang, 's8.assessment.q7.opt0'),
            t(lang, 's8.assessment.q7.opt1'),
            t(lang, 's8.assessment.q7.opt2'),
            t(lang, 's8.assessment.q7.opt3'),
        ],
        correctIndex: 2,
        explanation: t(lang, 's8.assessment.q7.exp'),
        topic: t(lang, 's8.assessment.topic.archetypes'),
    },
    {
        id: 8,
        text: t(lang, 's8.assessment.q8.text'),
        options: [
            t(lang, 's8.assessment.q8.opt0'),
            t(lang, 's8.assessment.q8.opt1'),
            t(lang, 's8.assessment.q8.opt2'),
            t(lang, 's8.assessment.q8.opt3'),
        ],
        correctIndex: 1,
        explanation: t(lang, 's8.assessment.q8.exp'),
        topic: t(lang, 's8.assessment.topic.manipulation'),
    },
    {
        id: 9,
        text: t(lang, 's8.assessment.q9.text'),
        options: [
            t(lang, 's8.assessment.q9.opt0'),
            t(lang, 's8.assessment.q9.opt1'),
            t(lang, 's8.assessment.q9.opt2'),
            t(lang, 's8.assessment.q9.opt3'),
        ],
        correctIndex: 1,
        explanation: t(lang, 's8.assessment.q9.exp'),
        topic: t(lang, 's8.assessment.topic.manipulation'),
    },
    {
        id: 10,
        text: t(lang, 's8.assessment.q10.text'),
        options: [
            t(lang, 's8.assessment.q10.opt0'),
            t(lang, 's8.assessment.q10.opt1'),
            t(lang, 's8.assessment.q10.opt2'),
            t(lang, 's8.assessment.q10.opt3'),
        ],
        correctIndex: 2,
        explanation: t(lang, 's8.assessment.q10.exp'),
        topic: t(lang, 's8.assessment.topic.ethical'),
    },
];

const getCrossRefs = (lang: any): CrossRef[] => [
    { sectionId: 'ethics', slug: 'clarity', label: t(lang, 's8.assessment.crossRefs.0.label') },
    { sectionId: 'ethics', slug: 'emphasis', label: t(lang, 's8.assessment.crossRefs.1.label') },
    { sectionId: 'ethics', slug: 'framing', label: t(lang, 's8.assessment.crossRefs.2.label') },
    { sectionId: 'ethics', slug: 'distortion', label: t(lang, 's8.assessment.crossRefs.3.label') },
    { sectionId: 'ethics', slug: 'manipulation', label: t(lang, 's8.assessment.crossRefs.4.label') },
    { sectionId: 'lab', slug: 'full-lab', label: t(lang, 's8.assessment.crossRefs.5.label') },
];

interface AssessmentLessonProps {
    crossRefs?: CrossRef[];
}

export default function CertificationAssessmentLesson({ crossRefs: propCrossRefs }: AssessmentLessonProps = {}) {
    const { lang } = useLang();
    const QUESTIONS = GET_QUESTIONS(lang);
    const refs = propCrossRefs ?? getCrossRefs(lang);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [submitted, setSubmitted] = useState(false);
    const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({});

    const handleSelect = (questionId: number, optionIndex: number) => {
        if (submitted) return;
        setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    };

    const handleSubmit = () => {
        if (Object.keys(answers).length < QUESTIONS.length) return;
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleExplanation = (questionId: number) => {
        setShowExplanations((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
    };

    const correctCount = submitted
        ? QUESTIONS.filter((q) => answers[q.id] === q.correctIndex).length
        : 0;

    const score = submitted ? Math.round((correctCount / QUESTIONS.length) * 100) : 0;
    const passed = score >= 80;

    const topicBreakdown = submitted
        ? QUESTIONS.reduce<Record<string, { correct: number; total: number }>>((acc, q) => {
            if (!acc[q.topic]) acc[q.topic] = { correct: 0, total: 0 };
            acc[q.topic].total++;
            if (answers[q.id] === q.correctIndex) acc[q.topic].correct++;
            return acc;
        }, {})
        : {};

    const answeredCount = Object.keys(answers).length;
    const allAnswered = answeredCount === QUESTIONS.length;

    return (
        <LessonPage crossRefs={refs}>
            <div className="space-y-8">
                <p className="text-[15px] text-stone-600 leading-relaxed">
                    {t(lang, 's8.assessment.desc')}
                </p>

                {/* Results panel — shown after submission */}
                {submitted && (
                    <div
                        className={`rounded-2xl border p-6 ${passed
                            ? 'bg-emerald-50 border-emerald-200'
                            : 'bg-amber-50 border-amber-200'
                            }`}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            {passed ? (
                                <Award size={40} className="text-emerald-600 shrink-0" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center shrink-0">
                                    <span className="text-amber-700 font-bold text-sm">?</span>
                                </div>
                            )}
                            <div>
                                <p className={`text-xl font-bold ${passed ? 'text-emerald-800' : 'text-amber-800'}`}>
                                    {score}% — {correctCount} / {QUESTIONS.length} {t(lang, 's8.assessment.correctLabel')}
                                </p>
                                <p className={`text-sm mt-0.5 ${passed ? 'text-emerald-700' : 'text-amber-700'}`}>
                                    {passed
                                        ? t(lang, 's8.assessment.passedMsg')
                                        : t(lang, 's8.assessment.failedMsg')}
                                </p>
                            </div>
                        </div>

                        {/* Topic breakdown */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                            {Object.entries(topicBreakdown).map(([topic, stats]) => (
                                <div key={topic} className="bg-white rounded-lg border border-stone-200 px-3 py-2.5">
                                    <p className="text-xs font-semibold text-stone-500 mb-1">{topic}</p>
                                    <p className={`text-sm font-bold ${stats.correct === stats.total ? 'text-emerald-700' : 'text-amber-700'}`}>
                                        {stats.correct}/{stats.total}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Progress indicator when not submitted */}
                {!submitted && (
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                                style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
                            />
                        </div>
                        <span className="text-xs font-medium text-stone-500 shrink-0">
                            {answeredCount}/{QUESTIONS.length} {t(lang, 's8.assessment.answeredLabel')}
                        </span>
                    </div>
                )}

                {/* Questions */}
                <div className="space-y-6">
                    {QUESTIONS.map((question, qi) => {
                        const selectedIndex = answers[question.id];
                        const isCorrect = submitted && selectedIndex === question.correctIndex;
                        const isWrong = submitted && selectedIndex !== undefined && selectedIndex !== question.correctIndex;
                        const showExp = showExplanations[question.id];

                        return (
                            <div
                                key={question.id}
                                className={`rounded-xl border p-5 transition-colors ${isCorrect
                                    ? 'border-emerald-200 bg-emerald-50/60'
                                    : isWrong
                                        ? 'border-red-200 bg-red-50/40'
                                        : 'border-stone-200 bg-white'
                                    }`}
                            >
                                {/* Question header */}
                                <div className="flex items-start gap-3 mb-4">
                                    <div
                                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${isCorrect
                                            ? 'bg-emerald-600 text-white'
                                            : isWrong
                                                ? 'bg-red-500 text-white'
                                                : 'bg-stone-100 text-stone-500'
                                            }`}
                                    >
                                        {submitted ? (
                                            isCorrect ? <CheckCircle size={14} /> : <XCircle size={14} />
                                        ) : (
                                            qi + 1
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                                            {question.topic}
                                        </span>
                                        <p className="text-[14px] font-medium text-stone-800 leading-relaxed">
                                            {question.text}
                                        </p>
                                    </div>
                                </div>

                                {/* Options */}
                                <div className="space-y-2 ml-10">
                                    {question.options.map((option, oi) => {
                                        const isSelected = selectedIndex === oi;
                                        const isThisCorrect = submitted && oi === question.correctIndex;
                                        const isThisWrong = submitted && isSelected && oi !== question.correctIndex;

                                        return (
                                            <button
                                                key={oi}
                                                onClick={() => handleSelect(question.id, oi)}
                                                disabled={submitted}
                                                className={`w-full text-left px-4 py-3 rounded-lg border text-[13px] transition-all ${isThisCorrect
                                                    ? 'bg-emerald-100 border-emerald-400 text-emerald-800 font-medium'
                                                    : isThisWrong
                                                        ? 'bg-red-100 border-red-400 text-red-800'
                                                        : isSelected && !submitted
                                                            ? 'bg-blue-50 border-blue-400 text-blue-800 font-medium'
                                                            : submitted
                                                                ? 'bg-stone-50 border-stone-100 text-stone-400 cursor-default'
                                                                : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-white cursor-pointer'
                                                    }`}
                                            >
                                                <span className="font-bold mr-2">
                                                    {String.fromCharCode(65 + oi)}.
                                                </span>
                                                {option}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Explanation (after submission) */}
                                {submitted && (
                                    <div className="ml-10 mt-3">
                                        <button
                                            onClick={() => toggleExplanation(question.id)}
                                            className="text-xs font-semibold text-stone-500 hover:text-stone-700 transition-colors"
                                        >
                                            {showExp ? t(lang, 's8.assessment.hideExp') : t(lang, 's8.assessment.showExp')}
                                        </button>
                                        {showExp && (
                                            <div className="mt-2 rounded-lg bg-stone-50 border border-stone-200 px-4 py-3">
                                                <p className="text-[13px] text-stone-700 leading-relaxed">
                                                    {question.explanation}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Submit / Reset */}
                {!submitted ? (
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleSubmit}
                            disabled={!allAnswered}
                            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${allAnswered
                                ? 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm hover:shadow-md'
                                : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                                }`}
                        >
                            {t(lang, 's8.assessment.btnSubmit')}
                        </button>
                        {!allAnswered && (
                            <span className="text-xs text-stone-400">
                                {t(lang, 's8.assessment.submitNote').replace('{count}', String(QUESTIONS.length))}
                            </span>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                setAnswers({});
                                setSubmitted(false);
                                setShowExplanations({});
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-6 py-3 rounded-xl text-sm font-semibold bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
                        >
                            {t(lang, 's8.assessment.btnRetake')}
                        </button>
                        {passed && (
                            <div className="flex items-center gap-2 text-emerald-700">
                                <Award size={16} />
                                <span className="text-sm font-semibold">{t(lang, 's8.assessment.badgeEarned')}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </LessonPage>
    );
}
