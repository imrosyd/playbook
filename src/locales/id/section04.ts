export const section04 = {
    craftingSoWhat: {
        crossRefs: [
            { label: "1.3 — The Anchor Effect" },
            { label: "3.4 — The Magic Words" }
        ],
        chart: {
            title: "What most presentations include — Deloitte research, n=2,200 executives",
            bars: [
                { label: "Data presented" },
                { label: "Context given" },
                { label: "\"So what\" stated" },
                { label: "Action requested" }
            ],
            caption: "Only 8% of data presentations include a clear, specific action request — yet that is what executives need to make a decision."
        },
        intro1: "You've just spent three hours pulling together data, building charts, and verifying the numbers. The presentation is tight. But when you stand up in the meeting, the CFO leans back and asks: <strong>\"So what do you want me to do with this?\"</strong>",
        intro2: "That question is the single biggest failure point in data presentations. Most people present data beautifully — and then leave the room without a decision.",
        frameworkTitle: "The 3-Question Framework",
        frameworkDesc: "Before presenting any chart, answer these three questions in writing. If you can't answer all three, you're not ready to present.",
        questions: [
            { q: "What happened?", a: "The factual observation.", example: "Revenue dropped 15% in August." },
            { q: "Why does it matter?", a: "The business consequence.", example: "At this rate, we miss Q3 target by $400K." },
            { q: "What should we do?", a: "The specific action needed.", example: "Approve the churn reduction budget today." }
        ],
        beforeAfterTitle: "Before & After",
        examples: [
            { before: "Here is the revenue data for the last quarter.", after: "Revenue dropped 15% in August — churn in SMB is the root cause. Approve the intervention budget today." },
            { before: "This chart shows our marketing ROI across channels.", after: "Email delivers 4x the ROI of paid social. Shifting 20% of budget to email generates an estimated $80K uplift this quarter." }
        ],
        labels: {
            descriptive: "Descriptive",
            decisionDriving: "Decision-driving"
        }
    },
    slideStructure: {
        crossRefs: [
            { label: "4.1 — Crafting the \"So What\"" },
            { label: "4.3 — Power Titles" }
        ],
        pyramid: {
            title: "The Minto Pyramid — answer first, then justify",
            layers: [
                "Answer / Recommendation",
                "Key argument (why?)",
                "Supporting evidence",
                "Context & background"
            ],
            caption: "Most presentations build bottom-up (context first, answer last). Executives want top-down (answer first, context as needed)."
        },
        attention: {
            title: "Audience attention during a presentation (typical arc)",
            labels: {
                opening: "Opening",
                ending: "Ending",
                trough: "Attention trough"
            },
            caption: "Audiences pay closest attention at the start and end. The 3-part structure exploits both peaks: conclusion at the top, action at the close."
        },
        intro1: "Most presentations fail before Slide 2. Not because the data is wrong, but because the structure is backwards. People open with context, build up slowly, and reveal the conclusion at the end — right when executives have already decided to check their phones.",
        formulaTitle: "The 3-Part Slide Formula",
        formula: [
            { label: "Power Headline", rule: "State the conclusion, not the topic.", bad: "Q3 Revenue Performance", good: "Revenue Missed Target by 15% — Churn in SMB is the Primary Driver" },
            { label: "The Chart", rule: "Show only what proves the headline.", bad: "A 12-series chart with 3 years of data and 4 benchmarks.", good: "One clear line with the drop highlighted and the culprit segment annotated." },
            { label: "The Takeaway", rule: "End with the exact action needed.", bad: "Something must be done about churn.", good: "Approve the $80K churn intervention budget today to protect Q4." }
        ],
        labels: {
            weak: "Weak",
            stronger: "Stronger"
        }
    },
    powerTitles: {
        crossRefs: [
            { label: "4.2 — The 3-Part Structure" },
            { label: "3.4 — Annotation in the Lab" }
        ],
        chart: {
            headlineLabel: "Slide headline",
            poweredTitle: "Revenue has declined 24% in 8 months — churn acceleration is the root cause",
            descTitle: "Monthly Revenue Q1–Q3 2025",
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            labelDesc: "Descriptive title"
        },
        intro1: "Every slide has a title. A Power Title is different — it states the conclusion, not the topic. It makes the decision implicit. When your audience reads it, they already know what you're asking before they see the chart.",
        toggleLabelTitle: "Live example — toggle the title",
        btnPowerOn: "Power Title ON",
        btnDescriptive: "Descriptive Title",
        toggleDesc: "Notice how the title frames the red line as a problem and \"churn acceleration\" as the cause — before the decision-maker has read a single axis label.",
        rewriteTitle: "The rewrite formula",
        labels: {
            descriptive: "Descriptive (avoidable)",
            powerTitle: "Power Title (what to use)"
        },
        examples: [
            { d: "Q3 Revenue", p: "Revenue missed target by $400K in Q3 — churn in SMB is accelerating" },
            { d: "Customer Satisfaction Trend", p: "NPS dropped 12 pts in 6 months — enterprise renewal risk is $1.2M" },
            { d: "Marketing Channel ROI", p: "Email returns 4× paid social ROI — reallocating 20% of budget adds $80K" },
            { d: "Headcount by Department", p: "Engineering is 31% over target while Sales is 18% under — hiring strategy is misaligned" }
        ]
    },
    languageAuthority: {
        crossRefs: [
            { label: "4.3 — Power Titles" },
            { label: "4.7 — Bridging the Jargon Gap" }
        ],
        chart: {
            title: "Word precision vs perceived credibility (audience survey)",
            yAxis: "Credibility",
            xAxis: "Precision of language used",
            vagueLabel: "Vague language",
            preciseLabel: "Precise language"
        },
        intro1: "Two analysts present the same finding. One says: \"Revenue has been declining quite significantly over the past few months.\" The other says: \"Revenue declined 23% over 8 months — the fastest drop since 2019.\" Both are describing the same chart. Which analyst sounds like they know what they're talking about?",
        upgradeTitle: "Upgrade your language",
        labels: {
            vague: "Vague (loses authority)",
            precise: "Precise (builds credibility)"
        },
        examples: [
            { weak: "The line goes up in Q3", strong: "Q3 seasonality drove a 14% lift in active users, breaking the historical trend" },
            { weak: "There is a big gap between the bars", strong: "Enterprise accounts generated 3x the LTV of SMB accounts this year" },
            { weak: "Revenue fell significantly", strong: "Revenue fell 23% — the steepest 8-month drop since 2019" },
            { weak: "Customers are very unhappy", strong: "NPS dropped from 42 to 29 — a 13-point decline over two quarters" },
            { weak: "Our conversion rate is low", strong: "Conversion sits at 2.1%, putting us in the bottom quartile against industry median (3.8%)" },
            { weak: "Results were mixed", strong: "Email outperformed target (+18%); while paid social dragged overall metrics (−9%)" }
        ],
        rulesTitle: "The 3 precision rules",
        rules: [
            "Use a specific number whenever you have one. \"23%\" beats \"about a quarter.\" \"11 days\" beats \"nearly two weeks.\"",
            "Name the comparison. \"Revenue fell\" is a statement. \"Revenue fell 23% vs. Q3 last year\" is evidence.",
            "State the implication in the same sentence. Don't leave the listener to figure out why the number matters."
        ]
    },
    narrativeScale: {
        crossRefs: [
            { label: "3.1 — Zooming In (Axis Tricks)" }
        ],
        introTitle: "Narrative & Scale",
        intro1: "How you frame the bounds of your chart creates the psychological context for the data inside it. A line is just a line until you tell the user where \"Today\" is, and a scatter plot's density is entirely defined by its axis limits.",
        domainDemo: {
            title: "Scale Domain Narrative",
            btnDomain2: "Domain [-2, 2]",
            btnDomain5: "Domain [-5, 5]",
            desc5: "When the axis domain is excessively wide [-5, 5], the data cluster appears tightly packed in the center. The narrative implied is: 'Everything is normal, variance is low, the correlation is negligible compared to the total bounds.'",
            desc2: "When the axis limits exactly bound the data [-2, 2], the variance looks extreme. The points scatter wildly across the entire canvas. The narrative implied is: 'Look at this massive volatility and strong diagonal correlation!'"
        },
        economistDemo: {
            title: "The \"Economist\" Prediction Anchor",
            chartTitle: "Global Ev Adoption",
            chartSubtitle: "% of new car sales",
            todayLabel: "TODAY",
            desc: "Publications like <em>The Economist</em> frequently project trends into the future. By placing a stark, undeniable \"TODAY\" anchor line vertically in the chart, and immediately switching the line style from solid (verified fact) to dashed (speculative forecast), they maintain extreme academic honesty while still telling a compelling story about tomorrow."
        },
        annotationsDemo: {
            title: "Contextual Annotations",
            days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            annotationText1: "Landing Page 500 Error",
            annotationText2: "(Resolved Friday 2PM)",
            desc: "Data without a timeline of events forces the viewer to guess <em>why</em> a drop occurred. A simple SVG bracket grouping the anomalous bars, paired with a direct text explanation, instantly transforms the chart from a 'What happened?' mystery into a 'Here is the root cause' answer."
        },
        aestheticDemo: {
            title: "Aesthetic vs Purpose",
            btnFlatten: "Flatten to 2D",
            btn3D: "Make it 3D",
            labels: { q1: "Q1", q2: "Q2", quota: "Sales Quota" },
            desc3D: "3D effects are aesthetic sugar. Because of forced perspective, the audience cannot reliably trace the top of the bar back to the Y-axis. The data is fundamentally illegible.",
            desc2D: "Flat, 2D design is inherently purposeful. Without the distraction of extruded polygons, we can layer precise operational data—like a dotted Sales Quota line—allowing instant variance evaluation (Q1 missed, Q2 beat)."
        },
        slopegraphDemo: {
            title: "The Slopegraph Overlap Problem",
            btnRevert: "Revert to Messy",
            btnFix: "Fix Overlaps (Stagger)",
            chartTitle: "Market Share: 2023 vs 2024",
            labels: { year23: "2023", year24: "2024" },
            desc: "Slopegraphs are incredible for showing changes in rank. But they instantly break when values cluster together, causing text overlap. The professional fix is a collision-detection algorithm (or manual nudging) that staggers the labels and connects them with faint leader lines, preserving readability without altering the math."
        }
    },
    wordsPsychology: {
        introTitle: "Words & Psychology",
        intro1: "Visualizing categorical data and text requires overcoming deeply ingrained (but often bad) habits like Wordclouds and Venn Diagrams. Modern charting replaces these with robust, sortable, and psychologically impactful alternatives.",
        wordcloudDemo: {
            title: "Wordcloud vs. Bar Chart",
            btnBar: "Convert to Bar Chart",
            btnCloud: "Revert to Wordcloud",
            chartTitle: "Top Customer Values (Q1 Survey)",
            descCloud: "Word clouds are popular but analytically useless. The human eye cannot accurately compare the area of text, length of words confounds the size calculation (longer words look bigger), and placement is completely random.",
            descBar: "A sorted horizontal bar chart delivers exactly what the user actually wants when they ask for a word cloud: an ordered ranking of the most frequent categorical observations. It is boring, but it works.",
            words: [
                { word: "Reliability" },
                { word: "Speed" },
                { word: "Support" },
                { word: "Price" },
                { word: "Features" },
                { word: "Design" },
                { word: "Brand" }
            ]
        },
        differencesDemo: {
            title: "Psychology of Differences",
            btnVenn: "1. The Venn Diagram",
            btnParallel: "2. Parallel Lines",
            btnCrossing: "3. Crossing Context",
            labels: {
                vennTitle: "Segment Overlap", mobile: "Mobile", desktop: "Desktop", both: "Both",
                parallelTitle: "Usage by Device Type", mobileOnly: "Mobile Only", desktopOnly: "Desktop Only",
                demoA: "Demographic A", demoB: "Demographic B", demoC: "Demographic C",
                crossingTitle: "The Inversion (Crossing Context)", seniors: "Seniors"
            },
            descVenn: "Venn diagrams are notoriously difficult for audiences to parse when comparing more than 3 sets. The intersection areas rarely scale proportionally to the data, turning them into conceptual illustrations rather than data visualizations.",
            descParallel: "By abandoning the Venn diagram for a structural layout (like a dumbbell or slopegraph), we can introduce other dimensions. Here, parallel lines imply stability across cohorts—everyone behaves roughly the same way.",
            descCrossing: "The human eye is hypersensitive to intersecting lines. By using a slopegraph, we instantly highlight 'The Inversion'—the one demographic cohort (Seniors) whose behavior completely contradicts the rest of the market. The crossing line becomes the immediate focal point of the presentation."
        }
    },
    jargonGap: {
        crossRefs: [
            { label: "4.4 — The Language of Authority" },
            { label: "1.2 — Cognitive Load" }
        ],
        chart: {
            title: "Estimated comprehension of technical jargon by audience distance",
            groups: [
                "Your team",
                "Adjacent teams",
                "Other functions",
                "C-suite",
                "Board / investors"
            ],
            caption: "The higher the stakes of your audience, the less technical domain knowledge they have. Jargon creates distance exactly when you need to close it."
        },
        intro1: "Every function develops its own dialect. Engineers say \"refactor.\" Finance says \"haircut.\" Marketing says \"CAC.\" When you're presenting to the C-suite or board, you are crossing dialect boundaries. Jargon that signals expertise to your team signals opacity to everyone else.",
        theory: {
            title: "Why Jargon Backfires Under Pressure",
            subtitle: "Cognitive Load Theory + Communication Accommodation Theory",
            explanation: "When a listener doesn't understand a word, they divert cognitive resources to decoding it \u2014 at the expense of processing your argument. Communication Accommodation Theory shows that audiences cognitively 'distance' themselves from speakers who don't adapt. Jargon signals in-group membership \u2014 which is a problem when the audience is outside your group."
        },
        jargonReferenceTitle: "Jargon quick-reference",
        jargonReferenceDesc: "Select a term to see its plain-English translation and an example in context.",
        ruleTitle: "The translation rule",
        ruleDesc: "Before every presentation, identify three terms your audience might not share with you, and prepare a plain-English version. Use the plain version by default. Use the jargon term only when speaking to an audience that you are certain shares your vocabulary.",
        jargonMap: [
            { jargon: "Statistically significant", plain: "Not a coincidence", context: "\"This drop is statistically significant\" = \"We are confident this drop is real, not just random chance\"" },
            { jargon: "Orthogonal", plain: "Unrelated", context: "\"That metric is orthogonal\" = \"That metric is unrelated to what we are discussing\"" },
            { jargon: "Over-indexed", plain: "Higher than average", context: "\"We over-index on mobile users\" = \"We have a higher proportion of mobile users than average\"" },
            { jargon: "Directionally correct", plain: "Roughly accurate", context: "\"The data is directionally correct\" = \"The exact numbers might be off, but the trend is right\"" },
            { jargon: "Delta", plain: "Difference / Change", context: "\"What is the delta between Q1 and Q2?\" = \"How much did performance change from Q1 to Q2?\"" },
            { jargon: "Cohort", plain: "Group of users", context: "\"The Q1 cohort retained better\" = \"The users who joined in Q1 stayed with us longer\"" },
            { jargon: "Priors", plain: "Existing assumption", context: "\"Update my priors\" = \"Change my mind based on this new data\"" },
            { jargon: "Granular", plain: "Detailed", context: "\"Let's get more granular\" = \"Let's look at the detailed breakdown\"" }
        ]
    }
};
