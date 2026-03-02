export const section08 = {
    "level1": {
        "crossRefs": {
            "0": { "label": "3.5 \u2014 Full Lab: compare honest vs. distorted versions" },
            "1": { "label": "4.1 \u2014 Revenue: honest presentation in practice" },
            "2": { "label": "5.2 \u2014 Level 2: Emphasis (next level)" }
        }
    },
    "level2": {
        "crossRefs": {
            "0": { "label": "1.1 \u2014 Pre-attentive: visual channels that emphasis exploits" },
            "1": { "label": "3.3 \u2014 Visual Emphasis lab: build emphasis techniques" },
            "2": { "label": "5.1 \u2014 Level 1: Clarity (previous level)" },
            "3": { "label": "5.3 \u2014 Level 3: Framing (next level)" }
        }
    },
    "level3": {
        "labTitle": "Hands-on Lab",
        "demo": {
            "title": "The 3 Stories of 1 Chart",
            "titles": {
                "complete": "14 Years of Volatility",
                "golden": "The Unstoppable Growth Era",
                "collapse": "The Sudden Collapse"
            },
            "desc": {
                "complete": "Showing the complete 14-year history reveals massive early growth followed by a complete collapse. This is the neutral, unfiltered dataset.",
                "golden": "By cherry-picking the X-axis to only show 2010-2015, the presenter completely hides the eventual failure. The chart is 'factually accurate' but ethically manipulative.",
                "collapse": "By slicing the X-axis completely differently (2019-2024), the presenter frames a narrative of disastrous failure, hiding the fact that the company still operates above its original 2010 baseline."
            }
        },
        "crossRefs": {
            "0": { "label": "1.3 \u2014 Anchoring: how framing exploits first-impression bias" },
            "1": { "label": "3.4 \u2014 Annotation & Trend: build framing techniques" },
            "2": { "label": "5.2 \u2014 Level 2: Emphasis (previous level)" },
            "3": { "label": "5.4 \u2014 Level 4: Distortion (next level)" }
        }
    },
    "level4": {
        "crossRefs": {
            "0": { "label": "1.1 \u2014 Pre-attentive: how 3D and axis errors corrupt visual channels" },
            "1": { "label": "3.1 \u2014 Axis & Scale lab: observe axis truncation in action" },
            "2": { "label": "5.3 \u2014 Level 3: Framing (previous level)" },
            "3": { "label": "5.5 \u2014 Level 5: Manipulation (next level)" }
        }
    },
    "level5": {
        "labTitle": "Hands-on Lab",
        "demo": {
            "title": "Narrative Axis Toggle",
            "btnHonest": "Scale: Honest (0 - 80)",
            "btnManipulated": "Scale: Manipulated (58 - 66)",
            "honestTitle": "The Truth: Flat Revenue",
            "lieTitle": "The Lie: Exponential Growth",
            "honestDesc": "With a zero-baseline, the actual magnitude of the data is clear. Revenue has grown from 61 to 65 \u2014 a modest ~6.5% increase over four quarters. The trend is stable, but flat.",
            "lieDesc": "By truncating the Y-axis to start at 58, the tiny 4-point increase is multiplied perceptually. Q4's bar (height: 7) looks mathematically 3.5\u00d7 larger than Q1's bar (height: 3). The visual implies massive momentum."
        },
        "crossRefs": {
            "0": { "label": "3.5 \u2014 Full Lab: reproduce Level 5 charts yourself" },
            "1": { "label": "4.1 \u2014 Revenue Simulator: see manipulated version side-by-side" },
            "2": { "label": "5.4 \u2014 Level 4: Distortion (previous level)" },
            "3": { "label": "5.6 \u2014 Assessment: test your ability to identify manipulation levels" }
        }
    },
    "ethicalLevel": {
        "demoLabel": "Demonstration",
        "techniquesTitle": "Techniques at this level",
        "realWorldTitle": "Real-World Example",
        "brightLineTitle": "Bright-Line Tests",
        "guidelineTitle": "Ethical Guideline",
        "level1": {
            "name": "Clarity",
            "tagline": "Accurate representation \u2014 the gold standard",
            "desc": "Level 1 charts present data with complete fidelity to the underlying numbers. The y-axis starts at zero, no smoothing is applied, all data points are visible, and any annotations directly reflect the data. The viewer's conclusions will align with the actual evidence. This is the professional standard for any chart used in a decision-making context.",
            "manip1": "None \u2014 this is the baseline of honest visualization",
            "manip2": "Minor editorial choices (annotation placement, color palette) that do not distort magnitude",
            "manip3": "Appropriate use of annotations to reduce cognitive load without implanting false frames",
            "example": "A CFO presents quarterly revenue with a zero-based y-axis, shows all 8 quarters without filtering, and adds an annotation noting that Q6 exceeded forecast by 3.2% \u2014 a factually accurate statement.",
            "test1": "Does the y-axis start at zero (or is the deviation from zero explicitly labeled)?",
            "test2": "Are all data points in the relevant period shown?",
            "test3": "Do annotations reflect what the data actually shows, not what you want it to show?",
            "test4": "Would a statistician reviewing raw data reach the same conclusion as a viewer of this chart?",
            "guideline": "This is where every chart should start. Deviations from Level 1 require explicit justification and disclosure. The burden of proof is always on the presenter to explain why a deviation is necessary."
        },
        "level2": {
            "name": "Emphasis",
            "tagline": "Directing attention without distorting magnitude",
            "desc": "Level 2 charts use emphasis techniques \u2014 highlighting, sorting, or color differentiation \u2014 to direct the viewer's attention toward a specific element. The underlying magnitudes remain accurate, but the pre-attentive system is being deliberately guided. This is editorially legitimate when the highlighted element is genuinely decision-relevant. It crosses into manipulation when emphasis is used to suppress context rather than illuminate it.",
            "manip1": "Color highlighting of a specific bar to draw attention to a result",
            "manip2": "Sorting data by value to create a ranking narrative",
            "manip3": "Selective labeling (showing only the highest and lowest values)",
            "manip4": "Using emphasis to guide the viewer toward a pre-determined conclusion",
            "example": "A marketing analyst highlights the single highest-performing channel in blue while showing all others in grey \u2014 directing attention to a success story while keeping other channels visible but visually subordinate.",
            "test1": "Is the emphasized element genuinely the most decision-relevant piece of information?",
            "test2": "Are non-emphasized elements still visible and readable (not hidden)?",
            "test3": "Would you be comfortable if the audience knew you were directing their attention?",
            "test4": "Is the emphasis consistent with the analytical question being answered?",
            "guideline": "Emphasis is a legitimate editorial tool when applied honestly. Disclose what you are highlighting and why. If you cannot articulate a decision-relevant reason for the emphasis, reconsider."
        },
        "level3": {
            "name": "Framing",
            "tagline": "Favoring one interpretation of the same data",
            "desc": "Level 3 charts present accurate data in a frame that systematically favors one interpretation. The numbers are correct, but the combination of sorting, emphasis, selective annotation, and minor smoothing creates a perception that diverges from a neutral reading. This is the most common form of business chart manipulation \u2014 it operates below the threshold of obvious deception but reliably shifts viewer conclusions in the presenter's preferred direction.",
            "manip1": "Annotations that lead the viewer toward a conclusion rather than describing the data",
            "manip2": "Sorting combined with heavy emphasis to create a \"best case\" narrative",
            "manip3": "Minor axis truncation (under 20%) to make flat trends appear as growth",
            "manip4": "Framing labels that use positive language for negative results",
            "example": "A product manager shows flat user engagement data sorted highest-first, highlights the one outlier month, and adds the annotation \"Engagement momentum building\" \u2014 technically accurate individual elements combined to create a misleading overall impression.",
            "test1": "Would the same data, presented with neutral defaults, tell the same story?",
            "test2": "Is the annotation phrased to describe what happened, or to advocate for a conclusion?",
            "test3": "Have you suppressed any elements (via opacity, ordering, exclusion) that contradict the framing?",
            "test4": "Would a skeptical analyst reach the same conclusion from raw numbers?",
            "guideline": "Framing is where professional responsibility diverges from legality. The chart is defensible in isolation, but the intent is to guide the audience to a conclusion the data does not fully support. If you are making choices specifically to favor one reading, you are in Level 3 territory."
        },
        "level4": {
            "name": "Distortion",
            "tagline": "Systematic perceptual errors through axis and 3D manipulation",
            "desc": "Level 4 charts introduce systematic perceptual errors. Axis truncation above 20% causes the viewer's pre-attentive system to receive a corrupted signal \u2014 bar lengths no longer accurately encode the data values. The 3D perspective effect adds foreshortening distortion on top of truncation. Cleveland and McGill (1985) demonstrated that length is among the most accurately decoded visual channels; Level 4 techniques specifically corrupt this channel. Decisions based on Level 4 charts will be predictably wrong.",
            "manip1": "Axis truncation above 20% baseline \u2014 magnifies apparent differences 3-5x",
            "manip2": "3D perspective effect \u2014 introduces ~50% magnitude estimation error",
            "manip3": "Combination of truncation and 3D (compound distortion)",
            "manip4": "Excessive smoothing that hides meaningful variance",
            "example": "A division head presents a chart where sales increased from $980K to $1,020K \u2014 a 4% gain \u2014 but the y-axis starts at $950K with a 3D perspective applied. The bars appear to show one quarter as 4x the height of another, and the room approves a budget expansion that wasn't warranted by the actual data.",
            "test1": "Does the y-axis baseline exceed 20% of the minimum data value?",
            "test2": "Is a 3D effect applied to any chart encoding magnitude as bar length?",
            "test3": "Would removing the truncation or 3D effect change the viewer's conclusion?",
            "test4": "Could a viewer accurately estimate the ratio between any two values from this chart?",
            "guideline": "Level 4 techniques cross the line from framing into distortion. The viewer cannot form accurate magnitude judgments, and the chart will produce systematically wrong decisions. These techniques are indefensible in professional contexts regardless of intent."
        },
        "level5": {
            "name": "Manipulation",
            "tagline": "Compound distortions with false narrative",
            "desc": "Level 5 charts combine multiple severe manipulation techniques with narrative elements specifically designed to prevent critical analysis. Three or more severe distortions compound to create a chart where the viewer's pre-attentive system, pattern recognition, and anchoring bias are all simultaneously exploited. The annotation, smoothing, and axis choices are coordinated to produce a specific false conclusion. This is the ethical equivalent of falsifying data.",
            "manip1": "Axis truncation + 3D effect (compound magnitude distortion)",
            "manip2": "Heavy smoothing + misleading trendline (false trend narrative)",
            "manip3": "Misleading annotation that anchors the viewer before they can form an independent judgment",
            "manip4": "Cherry-picked outlier exclusion from already small sample",
            "manip5": "Custom sort order to bury unfavorable periods",
            "example": "A startup founder presents a revenue chart to investors with 65% axis truncation, a 3D effect, a 5-period rolling average, and the annotation \"Hockey-stick growth trajectory confirmed.\" The chart shows what appears to be 400% growth over 4 quarters. The actual growth was 11%. The company raises funding at a valuation reflecting the false trajectory.",
            "test1": "Are three or more severe manipulation techniques (each scoring -3 or worse) combined?",
            "test2": "Does the annotation explicitly advocate for a decision rather than describe data?",
            "test3": "Is a trendline applied to data that has been smoothed, filtered, and selectively sampled?",
            "test4": "Would a transparent presentation of the same data reach the opposite conclusion?",
            "guideline": "Level 5 is active manipulation. The chart is not a representation of data \u2014 it is a weapon for extracting a specific decision. In regulated contexts (financial reporting, clinical trials, government data) this constitutes fraud. In business contexts, it is a breach of fiduciary duty. There is no legitimate use case for a Level 5 chart."
        }
    },
    "assessment": {
        "desc": "This assessment tests your understanding of cognitive biases, chart type selection, manipulation techniques, and the ethical level framework. Answer all 10 questions and submit to see your score. A score of 80% or higher demonstrates mastery of the visualization integrity principles covered in this playbook.",
        "correctLabel": "correct",
        "passedMsg": "Mastery achieved \u2014 you have demonstrated strong visualization integrity principles",
        "failedMsg": "Review the sections below and retake the assessment to reach mastery (80%)",
        "answeredLabel": "answered",
        "hideExp": "Hide Explanation",
        "showExp": "Show Explanation",
        "btnSubmit": "Submit Assessment",
        "submitNote": "Answer all {count} questions to submit",
        "btnRetake": "Retake Assessment",
        "badgeEarned": "Mastery badge earned",
        "crossRefs": {
            "0": { "label": "5.1 \u2014 Level 1: Clarity" },
            "1": { "label": "5.2 \u2014 Level 2: Emphasis" },
            "2": { "label": "5.3 \u2014 Level 3: Framing" },
            "3": { "label": "5.4 \u2014 Level 4: Distortion" },
            "4": { "label": "5.5 \u2014 Level 5: Manipulation" },
            "5": { "label": "3.5 \u2014 Full Lab" }
        },
        "topic": {
            "bias": "Cognitive Biases",
            "chartTypes": "Chart Types",
            "manipulation": "Manipulation Techniques",
            "ethical": "Ethical Levels",
            "archetypes": "Executive Archetypes"
        },
        "q1": {
            "text": "A chart shows a y-axis that starts at 70% of the minimum data value. A viewer estimates that the highest bar is \"five times taller\" than the lowest bar. Which cognitive bias is most directly being exploited?",
            "opt0": "Cognitive Load \u2014 too many gridlines overwhelm working memory",
            "opt1": "Anchoring & Framing \u2014 the truncated axis sets a false reference point that corrupts magnitude judgments",
            "opt2": "Pre-attentive Processing \u2014 the color of the bars changes the perceived height",
            "opt3": "Pattern Recognition \u2014 the viewer is seeing a trend that does not exist in the data",
            "exp": "Axis truncation exploits Anchoring & Framing. The artificial baseline sets the anchor for all magnitude comparisons, causing viewers to perceive ratios that do not exist in the underlying data. Cleveland (1985) showed this produces systematic magnitude estimation errors."
        },
        "q2": {
            "text": "Which chart type is most appropriate for comparing part-to-whole composition across multiple categories where the total is meaningful?",
            "opt0": "Scatter plot \u2014 best for showing composition",
            "opt1": "Stacked bar chart \u2014 shows each category's components and the total simultaneously",
            "opt2": "Line chart \u2014 ideal for part-to-whole with many categories",
            "opt3": "Bump chart \u2014 the standard for composition comparisons",
            "exp": "Stacked bar charts encode both the individual component values and the total, making them the standard choice for part-to-whole composition comparisons when the total is decision-relevant. Pie charts serve a similar purpose but sacrifice accurate magnitude reading for most comparisons beyond 2-3 segments."
        },
        "q3": {
            "text": "A presenter applies a 6-period rolling average to weekly sales data and then fits a linear trendline to the smoothed series. What compound problem does this create?",
            "opt0": "The trendline will have a lower R\u00b2 than if fitted to raw data, making it weaker",
            "opt1": "The smoothing eliminates the short-term variance that the trendline claims to summarize, and then the trendline is fitted to artificially regularized data \u2014 double-counting the smoothing and inflating the apparent predictability",
            "opt2": "This is best practice \u2014 smoothing before trendline fitting reduces noise and improves accuracy",
            "opt3": "The 6-period window is too short; the only problem is insufficient smoothing",
            "exp": "Heavy smoothing followed by a trendline creates double manipulation. The smoothing hides real variance, then the trendline is fitted to the already-smoothed data, producing an artificially high R\u00b2 that suggests predictability that does not exist in the actual series. The credibility scoring system applies an interaction penalty for this combination."
        },
        "q4": {
            "text": "According to the ethical framework in this playbook, which combination of techniques crosses from Ethical Level 3 (Framing) into Level 4 (Distortion)?",
            "opt0": "Sorting bars by value and highlighting the highest bar with a different color",
            "opt1": "Adding an accurate annotation identifying the peak period",
            "opt2": "Applying axis truncation above 20% of the data minimum, introducing systematic magnitude errors that corrupt pre-attentive length perception",
            "opt3": "Removing one data point that falls more than 3 standard deviations from the mean",
            "exp": "Level 4 (Distortion) is defined by systematic perceptual errors. Axis truncation above 20% corrupts the pre-attentive channel of bar length, causing viewers to form inaccurate magnitude judgments regardless of intent. Sorting and highlighting (Level 2), accurate annotation (Level 1), and defensible statistical exclusion (minor Level 2) do not produce systematic perceptual errors."
        },
        "q5": {
            "text": "Pre-attentive processing detects visual attributes in under 200ms, before conscious analysis. Which visual channel is MOST accurately decoded for comparing bar heights, according to Cleveland & McGill (1984)?",
            "opt0": "Area \u2014 the filled area of a bar encodes the value most precisely",
            "opt1": "Color saturation \u2014 the intensity of bar color encodes magnitude pre-attentively",
            "opt2": "Position on a common scale \u2014 lengths along a shared axis are the most accurately decoded visual channel",
            "opt3": "Angle \u2014 the angle of the bar relative to vertical encodes the value",
            "exp": "Cleveland & McGill (1984) ranked visual channels by accuracy: position on a common scale is at the top, followed by length, angle, area, and finally color hue/saturation. Bar charts exploit position on a common scale (the y-axis), which is why they are so effective for magnitude comparison \u2014 and why axis truncation, which corrupts this channel, is so damaging."
        },
        "q6": {
            "text": "A chart uses heavy color dimming (opacity 0.15) on seven out of eight bars while highlighting one bar in a vivid color. The highlighted bar shows the one quarter where the company hit its target. What ethical level does this represent?",
            "opt0": "Level 1 \u2014 Clarity, because all bars are still visible",
            "opt1": "Level 2 \u2014 Emphasis, appropriate editorial direction of attention to a decision-relevant element",
            "opt2": "Level 3 \u2014 Framing, because the extreme dimming effectively suppresses context and favors a selective reading of the data",
            "opt3": "Level 5 \u2014 Manipulation, because any highlighting is deceptive",
            "exp": "At opacity 0.15, the seven non-highlighted bars are nearly invisible. While technically present, they cannot be read or compared. This crosses from Level 2 (legitimate emphasis) into Level 3 (Framing) because the technique suppresses the context that would allow the viewer to assess whether the highlighted quarter is exceptional or typical."
        },
        "q7": {
            "text": "The \"firefighter\" executive archetype responds to a chart with a credibility score of -4 (critical band). What is the most likely behavioral outcome?",
            "opt0": "The firefighter will verify the methodology before acting",
            "opt1": "The firefighter will present the chart to the board as supporting evidence for their preferred strategy",
            "opt2": "The firefighter will mobilize maximum resources and escalate urgency in response to what they perceive as a crisis, even if the crisis is distorted or fabricated by the chart",
            "opt3": "The firefighter will question the presenter's credibility and request an independent data audit",
            "exp": "In the critical credibility band, the firefighter archetype \u2014 who is action-oriented and urgency-driven \u2014 responds with maximum escalation. They accept the distorted signal as real and mobilize resources disproportionate to the actual situation. This is one of the most organizationally harmful outcomes: legitimate resources redirected to address a non-existent crisis."
        },
        "q8": {
            "text": "A designer applies a 3D perspective effect to a bar chart. According to the research literature cited in this playbook, what magnitude estimation error does this typically introduce?",
            "opt0": "Approximately 5-10% error \u2014 negligible for most business decisions",
            "opt1": "Approximately 50% error \u2014 Fischer (2000) demonstrated that 3D perspective foreshortening produces errors of this magnitude in bar height estimation",
            "opt2": "Approximately 200% error \u2014 3D effects triple the perceived bar height",
            "opt3": "3D effects reduce error by making the chart more engaging and memorable",
            "exp": "Fischer (2000) demonstrated that 3D perspective foreshortening introduces approximately 50% magnitude estimation errors in bar charts. The pre-attentive system uses bar length as the primary encoding channel; foreshortening corrupts this channel by altering the apparent length ratio between bars. This is why 3D bar charts receive a -4 contribution to the credibility score."
        },
        "q9": {
            "text": "What distinguishes a trendline that improves a chart (Level 1/2) from a trendline that distorts it (Level 3/4)?",
            "opt0": "Color \u2014 honest trendlines must be green; misleading ones are red",
            "opt1": "Statistical significance and R\u00b2 \u2014 a trendline improves the chart when fitted to statistically significant data (R\u00b2 \u2265 0.3) and distorts when it imposes a narrative on noise",
            "opt2": "Length \u2014 a trendline should span at least 80% of the data range to be honest",
            "opt3": "Style \u2014 dashed trendlines are always manipulative; solid lines are honest",
            "exp": "The credibility scoring system evaluates trendlines on statistical merit: R\u00b2 \u2265 0.3 with statistical significance earns a +1 contribution (honest summarization). Below that threshold, a trendline imposes a narrative on noise, earning a -2 contribution. The data does not support the directional claim the trendline makes."
        },
        "q10": {
            "text": "A chart combines axis truncation at 65%, a 3D perspective effect, a 5-period rolling average, and a misleading annotation claiming \"sustained exponential growth.\" Which ethical level does this represent and why?",
            "opt0": "Level 3 \u2014 Framing, because annotations are always Level 3",
            "opt1": "Level 4 \u2014 Distortion, because axis truncation is present",
            "opt2": "Level 5 \u2014 Manipulation, because three or more severe techniques (-3 or worse each) are combined with a false narrative, crossing from distortion into active manipulation",
            "opt3": "Level 2 \u2014 Emphasis, because the annotation is simply directing attention",
            "exp": "Level 5 (Manipulation) requires three or more severe manipulations combined with a false narrative. This chart has: severe axis truncation (-5), 3D effect (-4), heavy smoothing (-4), and a dishonest annotation (-3) with an interaction penalty for the axis+3D combination. The credibility score falls well below -5, and the combination is coordinated to produce a specific false conclusion. This is the ethical equivalent of data fabrication."
        }
    }
};
