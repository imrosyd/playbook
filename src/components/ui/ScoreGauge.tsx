import type { EvaluationResult } from '../../types/chart';

interface ScoreGaugeProps {
    evaluation: EvaluationResult;
}

function getScoreColor(score: number): string {
    if (score >= 3) return '#10b981';
    if (score >= 1) return '#3b82f6';
    if (score >= -1) return '#f59e0b';
    if (score >= -3) return '#ef4444';
    return '#991b1b';
}

function getEthicalColor(level: number): string {
    const colors: Record<number, string> = {
        1: '#10b981',
        2: '#3b82f6',
        3: '#f59e0b',
        4: '#ef4444',
        5: '#991b1b',
    };
    return colors[level] || '#6b7280';
}

export default function ScoreGauge({ evaluation }: ScoreGaugeProps) {
    const { credibilityScore, ethicalLevel, biasesTriggered, perceptionShiftText, scoreBreakdown, interactionPenalties } = evaluation;
    const color = getScoreColor(credibilityScore);
    const ethColor = getEthicalColor(ethicalLevel);
    const pct = ((credibilityScore + 5) / 10) * 100;

    const ethicalLabels: Record<number, string> = {
        1: 'Clarity',
        2: 'Emphasis',
        3: 'Framing',
        4: 'Distortion',
        5: 'Manipulation',
    };

    return (
        <div className="space-y-5">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">Credibility Score</span>
                    <span className="text-2xl font-bold" style={{ color }}>
                        {credibilityScore > 0 ? '+' : ''}{credibilityScore.toFixed(1)}
                    </span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${Math.max(2, pct)}%`, backgroundColor: color }}
                    />
                </div>
                <div className="flex justify-between mt-1 text-xs text-slate-400">
                    <span>-5 (Deceptive)</span>
                    <span>0 (Neutral)</span>
                    <span>+5 (Transparent)</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: ethColor }}
                />
                <span className="text-sm font-medium text-slate-700">
                    Ethical Level {ethicalLevel}: {ethicalLabels[ethicalLevel]}
                </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">{perceptionShiftText}</p>

            {biasesTriggered.length > 0 && (
                <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Biases Triggered</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {biasesTriggered.map((bias) => (
                            <span
                                key={bias}
                                className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200"
                            >
                                {bias}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Score Breakdown</span>
                <div className="mt-2 space-y-1.5">
                    {scoreBreakdown
                        .filter((b) => b.contribution !== 0)
                        .sort((a, b) => a.contribution - b.contribution)
                        .map((entry) => (
                            <div key={entry.parameter} className="flex items-center justify-between group">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-slate-600">{entry.parameter}</span>
                                    <span className="text-xs text-slate-400 hidden group-hover:inline">
                                        {entry.state}
                                    </span>
                                </div>
                                <span
                                    className="text-xs font-bold tabular-nums"
                                    style={{ color: entry.contribution > 0 ? '#10b981' : '#ef4444' }}
                                >
                                    {entry.contribution > 0 ? '+' : ''}{entry.contribution}
                                </span>
                            </div>
                        ))}
                    {interactionPenalties.map((penalty) => (
                        <div key={penalty.combination} className="flex items-center justify-between">
                            <span className="text-xs font-medium text-red-600">{penalty.combination}</span>
                            <span className="text-xs font-bold text-red-600">{penalty.penalty}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
