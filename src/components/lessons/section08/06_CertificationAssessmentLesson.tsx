import { useState } from 'react';
import { CheckCircle, XCircle, Award } from 'lucide-react';
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

const QUESTIONS: Question[] = [
    {
        id: 1,
        text: 'A chart shows a y-axis that starts at 70% of the minimum data value. A viewer estimates that the highest bar is "five times taller" than the lowest bar. Which cognitive bias is most directly being exploited?',
        options: [
            'Cognitive Load — too many gridlines overwhelm working memory',
            'Anchoring & Framing — the truncated axis sets a false reference point that corrupts magnitude judgments',
            'Pre-attentive Processing — the color of the bars changes the perceived height',
            'Pattern Recognition — the viewer is seeing a trend that does not exist in the data',
        ],
        correctIndex: 1,
        explanation:
            'Axis truncation exploits Anchoring & Framing. The artificial baseline sets the anchor for all magnitude comparisons, causing viewers to perceive ratios that do not exist in the underlying data. Cleveland (1985) showed this produces systematic magnitude estimation errors.',
        topic: 'Cognitive Biases',
    },
    {
        id: 2,
        text: 'Which chart type is most appropriate for comparing part-to-whole composition across multiple categories where the total is meaningful?',
        options: [
            'Scatter plot — best for showing composition',
            'Stacked bar chart — shows each category\'s components and the total simultaneously',
            'Line chart — ideal for part-to-whole with many categories',
            'Bump chart — the standard for composition comparisons',
        ],
        correctIndex: 1,
        explanation:
            'Stacked bar charts encode both the individual component values and the total, making them the standard choice for part-to-whole composition comparisons when the total is decision-relevant. Pie charts serve a similar purpose but sacrifice accurate magnitude reading for most comparisons beyond 2-3 segments.',
        topic: 'Chart Types',
    },
    {
        id: 3,
        text: 'A presenter applies a 6-period rolling average to weekly sales data and then fits a linear trendline to the smoothed series. What compound problem does this create?',
        options: [
            'The trendline will have a lower R² than if fitted to raw data, making it weaker',
            'The smoothing eliminates the short-term variance that the trendline claims to summarize, and then the trendline is fitted to artificially regularized data — double-counting the smoothing and inflating the apparent predictability',
            'This is best practice — smoothing before trendline fitting reduces noise and improves accuracy',
            'The 6-period window is too short; the only problem is insufficient smoothing',
        ],
        correctIndex: 1,
        explanation:
            'Heavy smoothing followed by a trendline creates double manipulation. The smoothing hides real variance, then the trendline is fitted to the already-smoothed data, producing an artificially high R² that suggests predictability that does not exist in the actual series. The credibility scoring system applies an interaction penalty for this combination.',
        topic: 'Manipulation Techniques',
    },
    {
        id: 4,
        text: 'According to the ethical framework in this playbook, which combination of techniques crosses from Ethical Level 3 (Framing) into Level 4 (Distortion)?',
        options: [
            'Sorting bars by value and highlighting the highest bar with a different color',
            'Adding an accurate annotation identifying the peak period',
            'Applying axis truncation above 20% of the data minimum, introducing systematic magnitude errors that corrupt pre-attentive length perception',
            'Removing one data point that falls more than 3 standard deviations from the mean',
        ],
        correctIndex: 2,
        explanation:
            'Level 4 (Distortion) is defined by systematic perceptual errors. Axis truncation above 20% corrupts the pre-attentive channel of bar length, causing viewers to form inaccurate magnitude judgments regardless of intent. Sorting and highlighting (Level 2), accurate annotation (Level 1), and defensible statistical exclusion (minor Level 2) do not produce systematic perceptual errors.',
        topic: 'Ethical Levels',
    },
    {
        id: 5,
        text: 'Pre-attentive processing detects visual attributes in under 200ms, before conscious analysis. Which visual channel is MOST accurately decoded for comparing bar heights, according to Cleveland & McGill (1984)?',
        options: [
            'Area — the filled area of a bar encodes the value most precisely',
            'Color saturation — the intensity of bar color encodes magnitude pre-attentively',
            'Position on a common scale — lengths along a shared axis are the most accurately decoded visual channel',
            'Angle — the angle of the bar relative to vertical encodes the value',
        ],
        correctIndex: 2,
        explanation:
            'Cleveland & McGill (1984) ranked visual channels by accuracy: position on a common scale is at the top, followed by length, angle, area, and finally color hue/saturation. Bar charts exploit position on a common scale (the y-axis), which is why they are so effective for magnitude comparison — and why axis truncation, which corrupts this channel, is so damaging.',
        topic: 'Cognitive Biases',
    },
    {
        id: 6,
        text: 'A chart uses heavy color dimming (opacity 0.15) on seven out of eight bars while highlighting one bar in a vivid color. The highlighted bar shows the one quarter where the company hit its target. What ethical level does this represent?',
        options: [
            'Level 1 — Clarity, because all bars are still visible',
            'Level 2 — Emphasis, appropriate editorial direction of attention to a decision-relevant element',
            'Level 3 — Framing, because the extreme dimming effectively suppresses context and favors a selective reading of the data',
            'Level 5 — Manipulation, because any highlighting is deceptive',
        ],
        correctIndex: 2,
        explanation:
            'At opacity 0.15, the seven non-highlighted bars are nearly invisible. While technically present, they cannot be read or compared. This crosses from Level 2 (legitimate emphasis) into Level 3 (Framing) because the technique suppresses the context that would allow the viewer to assess whether the highlighted quarter is exceptional or typical.',
        topic: 'Ethical Levels',
    },
    {
        id: 7,
        text: 'The "firefighter" executive archetype responds to a chart with a credibility score of -4 (critical band). What is the most likely behavioral outcome?',
        options: [
            'The firefighter will verify the methodology before acting',
            'The firefighter will present the chart to the board as supporting evidence for their preferred strategy',
            'The firefighter will mobilize maximum resources and escalate urgency in response to what they perceive as a crisis, even if the crisis is distorted or fabricated by the chart',
            'The firefighter will question the presenter\'s credibility and request an independent data audit',
        ],
        correctIndex: 2,
        explanation:
            'In the critical credibility band, the firefighter archetype — who is action-oriented and urgency-driven — responds with maximum escalation. They accept the distorted signal as real and mobilize resources disproportionate to the actual situation. This is one of the most organizationally harmful outcomes: legitimate resources redirected to address a non-existent crisis.',
        topic: 'Executive Archetypes',
    },
    {
        id: 8,
        text: 'A designer applies a 3D perspective effect to a bar chart. According to the research literature cited in this playbook, what magnitude estimation error does this typically introduce?',
        options: [
            'Approximately 5-10% error — negligible for most business decisions',
            'Approximately 50% error — Fischer (2000) demonstrated that 3D perspective foreshortening produces errors of this magnitude in bar height estimation',
            'Approximately 200% error — 3D effects triple the perceived bar height',
            '3D effects reduce error by making the chart more engaging and memorable',
        ],
        correctIndex: 1,
        explanation:
            'Fischer (2000) demonstrated that 3D perspective foreshortening introduces approximately 50% magnitude estimation errors in bar charts. The pre-attentive system uses bar length as the primary encoding channel; foreshortening corrupts this channel by altering the apparent length ratio between bars. This is why 3D bar charts receive a -4 contribution to the credibility score.',
        topic: 'Manipulation Techniques',
    },
    {
        id: 9,
        text: 'What distinguishes a trendline that improves a chart (Level 1/2) from a trendline that distorts it (Level 3/4)?',
        options: [
            'Color — honest trendlines must be green; misleading ones are red',
            'Statistical significance and R² — a trendline improves the chart when fitted to statistically significant data (R² ≥ 0.3) and distorts when it imposes a narrative on noise',
            'Length — a trendline should span at least 80% of the data range to be honest',
            'Style — dashed trendlines are always manipulative; solid lines are honest',
        ],
        correctIndex: 1,
        explanation:
            'The credibility scoring system evaluates trendlines on statistical merit: R² ≥ 0.3 with statistical significance earns a +1 contribution (honest summarization). Below that threshold, a trendline imposes a narrative on noise, earning a -2 contribution. The data does not support the directional claim the trendline makes.',
        topic: 'Manipulation Techniques',
    },
    {
        id: 10,
        text: 'A chart combines axis truncation at 65%, a 3D perspective effect, a 5-period rolling average, and a misleading annotation claiming "sustained exponential growth." Which ethical level does this represent and why?',
        options: [
            'Level 3 — Framing, because annotations are always Level 3',
            'Level 4 — Distortion, because axis truncation is present',
            'Level 5 — Manipulation, because three or more severe techniques (-3 or worse each) are combined with a false narrative, crossing from distortion into active manipulation',
            'Level 2 — Emphasis, because the annotation is simply directing attention',
        ],
        correctIndex: 2,
        explanation:
            'Level 5 (Manipulation) requires three or more severe manipulations combined with a false narrative. This chart has: severe axis truncation (-5), 3D effect (-4), heavy smoothing (-4), and a dishonest annotation (-3) with an interaction penalty for the axis+3D combination. The credibility score falls well below -5, and the combination is coordinated to produce a specific false conclusion. This is the ethical equivalent of data fabrication.',
        topic: 'Ethical Levels',
    },
];

const crossRefs: CrossRef[] = [
    { sectionId: 'ethics', slug: 'clarity', label: '5.1 — Level 1: Clarity' },
    { sectionId: 'ethics', slug: 'emphasis', label: '5.2 — Level 2: Emphasis' },
    { sectionId: 'ethics', slug: 'framing', label: '5.3 — Level 3: Framing' },
    { sectionId: 'ethics', slug: 'distortion', label: '5.4 — Level 4: Distortion' },
    { sectionId: 'ethics', slug: 'manipulation', label: '5.5 — Level 5: Manipulation' },
    { sectionId: 'lab', slug: 'full-lab', label: '3.5 — Full Lab' },
];

interface AssessmentLessonProps {
    crossRefs?: CrossRef[];
}

export default function CertificationAssessmentLesson({ crossRefs: propCrossRefs }: AssessmentLessonProps = {}) {
    const refs = propCrossRefs ?? crossRefs;
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
                    This assessment tests your understanding of cognitive biases, chart type selection, manipulation
                    techniques, and the ethical level framework. Answer all 10 questions and submit to see your score.
                    A score of 80% or higher demonstrates mastery of the visualization integrity principles covered
                    in this playbook.
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
                                    {score}% — {correctCount} / {QUESTIONS.length} correct
                                </p>
                                <p className={`text-sm mt-0.5 ${passed ? 'text-emerald-700' : 'text-amber-700'}`}>
                                    {passed
                                        ? 'Mastery achieved — you have demonstrated strong visualization integrity principles'
                                        : 'Review the sections below and retake the assessment to reach mastery (80%)'}
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
                            {answeredCount}/{QUESTIONS.length} answered
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
                                            {showExp ? 'Hide' : 'Show'} explanation
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
                            Submit Assessment
                        </button>
                        {!allAnswered && (
                            <span className="text-xs text-stone-400">
                                Answer all {QUESTIONS.length} questions to submit
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
                            Retake Assessment
                        </button>
                        {passed && (
                            <div className="flex items-center gap-2 text-emerald-700">
                                <Award size={16} />
                                <span className="text-sm font-semibold">Mastery badge earned</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </LessonPage>
    );
}
