export const section03 = {
    zoomingIn: {
        crossRefs: [
            { label: "1.3 — Anchoring: how axis choice sets the frame" },
            { label: "5.4 — Distortion: systematic perceptual errors from axis manipulation" },
            { label: "3.5 — Full Lab: combine all manipulation techniques" }
        ]
    },
    hidingBadNews: {
        crossRefs: [
            { label: "1.4 — Pattern Recognition: how smoothing exploits our pattern-seeking bias" },
            { label: "5.3 — Framing: selective data presentation as a framing technique" },
            { label: "3.5 — Full Lab: combine all manipulation techniques" }
        ]
    },
    spotlightEffect: {
        crossRefs: [
            { label: "1.1 — Pre-attentive Attributes: the visual channels emphasis exploits" },
            { label: "5.2 — Emphasis: when editorial direction becomes manipulation" },
            { label: "3.5 — Full Lab: combine all manipulation techniques" }
        ]
    },
    magicWords: {
        crossRefs: [
            { label: "1.3 — Anchoring: how annotations lock in a frame of reference" },
            { label: "1.2 — Cognitive Load: how honest annotations reduce interpretive effort" },
            { label: "5.5 — Manipulation: compound distortion with false narrative" },
            { label: "3.5 — Full Lab: combine all manipulation techniques" }
        ]
    },
    fullLab: {
        crossRefs: [
            { label: "3.1 — Axis & Scale manipulation" },
            { label: "3.2 — Data Transformation manipulation" },
            { label: "3.3 — Visual Emphasis manipulation" },
            { label: "3.4 — Annotation & Trend manipulation" },
            { label: "4.1 — Revenue scenario: honest vs. manipulated" },
            { label: "5.6 — Assessment: test your manipulation detection skills" }
        ]
    },
    signalNoise: {
        crossRefs: [
            { label: "1.4 — Spotting the Signal: how the brain manufactures false trends" },
            { label: "3.6 — Design Patterns: data presentation choices" },
            { label: "3.7 — Full Lab: combine all manipulation techniques" }
        ]
    },
    signalVsNoise: {
        demo: {
            title: "1. Signal vs. Noise Over Time",
            desc: "Toggle the trendline on/off to see how smoothing separates signal from noise.",
            chartLabel: "DAILY USER ENGAGEMENTS",
            chartLabelSmoothed: "SMOOTHED TREND",
            btnApply: "Apply Trendline",
            btnRemove: "Remove Trendline",
            noteRaw: "The raw data line is 100% faithful to every data point — but the visual noise makes it almost impossible to discern the underlying trend. This is the analyst's challenge.",
            noteSmoothed: "The smoothed trendline strips away measurement noise and reveals the true underlying signal: a steady, sustained upward trajectory over the period.",
            rawText: "A raw time-series plot often contains significant high-frequency noise. The jagged, connected lines draw maximum visual attention to the variance, making it almost impossible to discern the underlying trend.",
            smoothedText: "By fading the noisy scatter and overlaying a <strong>smoothed trendline</strong>, the true \"signal\" is instantly obvious: a steady upward trajectory. The analytical focus shifts from day-to-day volatility to the macro trend."
        },
        noiseDemo: {
            title: "2. Interactive Noise Level",
            desc: "Drag the slider to increase noise and watch the true signal get buried.",
            chartLabel: "TRUE SIGNAL VS. NOISY OBSERVATION",
            sliderLabel: "Noise Level",
            legendNoisy: "Observed (noisy)",
            legendSignal: "True Signal",
            noteLow: "Low noise: the true signal (orange dashed) is clearly visible. The blue observed line closely tracks the real trend.",
            noteMed: "Medium noise: the signal is still recoverable with careful analysis, but casual viewers may misinterpret the variance.",
            noteHigh: "High noise: the true underlying signal is almost completely buried. Without statistical smoothing, the reader sees only chaos."
        },
        tip: {
            title: "The Smoothing Dilemma",
            rule: "When should you smooth? Apply smoothing when the <em>measurement error or natural variance is known to be high</em> and the long-term trend is the decision-relevant insight. Never smooth if the individual data points (and their outliers) are the story. Over-smoothing is as misleading as no smoothing."
        },
        intro1: "A fundamental principle of data visualization is helping the viewer distinguish between <strong>Signal</strong> (the underlying reality or trend) and <strong>Noise</strong> (random variance or measurement error). In many datasets, the noise visually overwhelms the signal if plotted raw.",
        intro2: "A common mistake is producing a \"spaghetti chart\" or a jagged line chart that connects every single noisy data point. This forces the viewer's brain to process massive amounts of high-frequency visual information, only to realize the variance isn't the story. Strategic visual smoothing is required.",
        intro3: "However, smoothing carries an ethical risk. Aggressive smoothing (like a high-degree polynomial fit or an excessive moving average window) can completely invent trends that do not exist, or erase genuine outliers that are crucial to the story. The visualization designer must ensure the trendline is a faithful mathematical representation of the data, not just an aesthetic brush stroke."
    },
    designPatterns: {
        crossRefs: [
            { label: "2.4 — Distribution: why shape matters more than averages" },
            { label: "3.5 — Signal vs Noise: separating signal from statistical variance" },
            { label: "3.7 — Full Lab: combine all manipulation techniques" }
        ],
        meanVsMedian: {
            title: "Mean vs Median",
            btnMean: "Switch to Mean (Average)",
            btnMedian: "Switch to Median",
            adjustLabel: "Adjust Group B's Top Earner: ${0}k",
            teamA: "Team A",
            teamB: "Team B",
            offChart: "Off chart!",
            lieTitle: "The \"Average\" Lie",
            descMedian: "The Median is robust to outliers. Even if the top earner makes $500k, the 'typical' person in Team B still makes $50k, making it identical to Team A.",
            descMean: "The Mean is highly sensitive to outliers. Drag the slider to $500k. The average skyrockets to $140k, implying Team B is vastly richer, even though 4 out of 5 people make exactly the same as Team A."
        },
        showGroups: {
            title: "Show the Groups (Gestalt Proximity)",
            btnAddSpacing: "Add Spacing",
            btnGroupTouching: "Group by Touching",
            spacedLabel: "All arbitrarily spaced",
            descTouching: "By removing the padding between related bars (and adding padding between groups), the Gestalt principle of Proximity takes over. The brain instantly sees three distinct pairs (Q1, Q2, Q3) comparing blue vs green.",
            descSpaced: "When bars are evenly spaced, the brain sees six independent bars. The user has to actively read the legend and X-axis to figure out which bars 'belong' to each other."
        },
        audienceContext: {
            title: "Audience Context: The \"So What?\"",
            btnScientific: "Switch to Scientific Mode",
            btnExecutive: "Switch to Executive Mode",
            headlineBusiness: "Direct ROI trumps Marketing in Q3",
            salesLabel: "Sales",
            marketingLabel: "Marketing",
            fig1Title: "Figure 1. Operational Efficacy by Dept",
            descBusiness: "Executives have 3 seconds. They need the horizontal bar for fast readability, the conclusion written out as an active headline, and the noise completely removed. Colors tell them where to look.",
            descScientific: "Scientists need methodology defensibility. They require error bars (confidence intervals), generic titles ('Figure X'), explicit axes, and prefer austere styling to present the data neutrally."
        },
        sortedHighlight: {
            title: "The Sorted Highlight (Leaderboard)",
            headline: "Our Model Achieves SOTA vs Open Weights",
            desc: "Sorting dramatically reduces cognitive load (the eye doesn't have to jump around to rank items). Highlighting the target variable (Our Model) in a bright color while muting the rest instantly draws the eye to the hero of the story, even if it's not #1 overall."
        },
        explainingVariance: {
            title: "Explaining Variance",
            btnRaw: "1. Raw Data",
            btnBaseline: "2. The Baseline",
            btnSeasonality: "3. Expected Seasonality",
            btnAnomaly: "4. The Anomaly",
            flatBaselineLabel: "Flat Baseline",
            holidaySpikeLabel: "Holiday Spike",
            viralVideoLabel: "Viral Video",
            descRaw: "Looking at raw data, everything looks like a spike or a dip. It's up to the analyst to deconstruct the signal from the noise.",
            descBaseline: "First, establish the baseline. What is the fundamental run-rate of the business when nothing special is happening? Here, it's flat.",
            descSeasonality: "Second, highlight known structural variance. We expect Q4 to spike every year. That's not news, that's seasonality.",
            descAnomaly: "Finally, what's left is the true anomaly. By stripping away baseline and seasonality, we isolate the specific event (the viral video in July) that actually requires executive attention."
        },
        analystChoices: {
            title: "Analyst Choice: Emphasizing Totals vs Deltas",
            btnStacked: "Stacked Bar (Totals)",
            btnDumbbell: "Dumbbell (Deltas)",
            descDumbbell: "The Dumbbell plot specifically emphasizes the magnitude and direction of CHANGE. The eye immediately sees that APAC grew the fastest, and EU actually shrank.",
            descStacked: "The Stacked Bar emphasizes TOTAL volume. Changes between segments become very hard to compare visually because the starting points of the second segments keep shifting based on the first."
        },
        purpleCow: {
            title: "The \"Purple Cow\" (Aesthetic Novelty)",
            btnMakePurpleCow: "Make it a Purple Cow",
            btnMakeBoring: "Make it Boring",
            chartTitleBoring: "Market Share 2024",
            chartTitleCow: "Global Control 2024",
            coreLabel: "CORE",
            descBoring: "The Horizontal Bar chart is the most mathematically efficient, clear, and boring way to present this data. If your audience is internal analysts trying to extract exact numbers quickly, use this.",
            descCow: "The 'Purple Cow' (Seth Godin's concept of standing out). This abstract layered sunburst/rose chart is mathematically inferior for comparing values, but it is visually arresting. If this is page 1 of a marketing PDF, the goal isn't analytical precision—it's getting them to stop scrolling."
        },
        audiencePersonas: {
            title: "Designing for the Persona",
            btnScientist: "The Scientist",
            btnConsultant: "The Consultant",
            btnExecutive: "The Executive",
            sciFig: "Fig 1. Distribution of Conversion Efficacy by Variant (n=10,492)",
            sciControl: "Control (A)",
            sciTreatment: "Treatment (B)",
            conMatrix: "Strategic Value Matrix",
            conRisk: "Risk Avoidance",
            conGrowth: "Growth Engine",
            conDivest: "Divest",
            conMaintain: "Maintain",
            conYAxis: "Expected ROI →",
            conXAxis: "Implementation Complexity →",
            execSubtitle: "Variant B Revenue Impact",
            execDecision: "Decision: Rollout to 100%",
            descScientist: "Scientists and analysts value nuance, methodology, and strict mathematical truths. They want to see the distribution, the sample size, and the p-value. They don't want you to make the decision for them.",
            descConsultant: "Consultants and Strategists value conceptual framing. They don't just want the data; they want it mapped onto a framework (like a 2x2 matrix) that assigns strategic meaning (e.g., 'Growth Engine') to the numbers.",
            descExecutive: "Executives value bottom-line impact and velocity. They do not want to see the box plot. They want to know the ultimate outcome in dollars, and they want the recommended action plainly stated."
        },
        intro: {
            title: "Design Patterns & Analyst Choices",
            p1: "Data visualization is a series of active choices. The exact same dataset can tell completely contrary stories depending on how you group it, summarize it, and frame it for your specific audience."
        }
    },
    labLesson: {
        intro: {
            axisScale: "Axis truncation is one of the most common forms of chart manipulation. By setting the y-axis baseline above zero, differences between bars appear dramatically larger than they are in reality. A chart where the actual difference is 5% can be made to look like a 300% difference. The 3D perspective effect adds a second layer of distortion — foreshortening alters the pre-attentive attribute of bar length, introducing up to 50% magnitude estimation error. Use the controls below to observe how axis choices alone can transform a chart from transparent to deceptive.",
            dataTransform: "Data transformation decisions — smoothing, sample size, and outlier handling — happen before the chart is drawn, making them invisible to most viewers. A rolling average that spans a full quarter eliminates the within-quarter variance that often contains the most actionable signals. Cherry-picking which data points to exclude as \"outliers\" without a documented statistical criterion is a form of data fabrication. Use the controls below to see how these upstream choices affect what the chart appears to say.",
            visualEmphasis: "Visual emphasis techniques redirect attention without changing the underlying data. Sorting bars by value creates a natural ranking narrative. Highlighting one bar while dimming others focuses the viewer's pre-attentive system on a single element, suppressing context. These techniques sit between honest editorial choice and manipulation — the line depends on whether the emphasis reflects a real decision-relevant distinction or a desired conclusion. Use the controls to experiment with emphasis levels.",
            annotationTrend: "Annotations and trendlines are powerful tools for adding interpretive context — and powerful tools for implanting false narratives. A misleading annotation exploits anchoring bias: once a viewer reads \"strong upward trajectory,\" they interpret all subsequent data through that lens. A trendline fitted to data with low R² imposes a narrative where the data contains only noise. Use the controls below to observe how annotation framing and trendline choices interact with the viewer's interpretive process.",
            full: "This lab gives you access to all manipulation controls simultaneously. Real-world chart deception often combines multiple techniques — axis truncation paired with 3D effects, heavy smoothing paired with a misleading annotation. The scoring system evaluates each parameter individually and then applies interaction penalties when multiple severe manipulations compound. Explore how the credibility score changes as you layer techniques, and observe how executive reactions shift at different score thresholds."
        },
        ui: {
            datasetLabel: "Dataset",
            editorialNoteLabel: "Editorial Note: ",
            noteCurrentVsPast: "Highlighting current year performance against historical context.",
            noteOutperformance: "Highlighting periods of significant market outperformance.",
            noteCustom: "Highlight applies custom editorial emphasis to key data points.",
            underlyingDataset: "Underlying Dataset",
            colPeriod: "Period",
            colValue: "Value",
            totalPoints: "Total Points",
            integrityEvaluation: "Integrity Evaluation",
            executiveReactions: "Executive Reactions"
        },
        fallbackScenario: {
            title: "Monthly Revenue",
            description: "Monthly revenue figures for the past 12 months"
        }
    }
};
