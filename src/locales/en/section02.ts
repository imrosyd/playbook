export const section02 = {
    specialtyFrameworks: {
        intro1: "Beyond standard bars and lines, specific data questions require specific visual frameworks. These specialty charts solve complex multi-dimensional problems — from evaluating survey sentiment correctly to mapping entire market hierarchies.",
        contextRule: {
            title: "The Context Rule",
            rule: "Avoid using complex charts just for the sake of novelty. A specialty chart is only successful if it makes a complex relationship <strong>easier</strong> to understand than a standard bar chart."
        },
        demos: {
            standoutScatter: {
                title: "1. Show the Standout",
                chartLabel: "AD SPEND VS CONVERSIONS",
                note: "Instead of coloring every data point by category, map context points to gray. Reserve a high-contrast hue exclusively for the specific data point you want to highlight.",
                label1: "Campaign Alpha",
                label2: "High spend, massive return"
            },
            stripTier: {
                title: "2. 1D Strip / Dot Plot",
                desc: "Revealing every data point to show performance tiers.",
                btnShow: "Unpack to Strip Plot",
                btnHide: "Collapse to Average Bar",
                chartLabel: "SALARY SPREAD ($K)",
                noteShow: "A single aggregate bar chart hides the reality of the team. We know the average is $83k, but we know nothing about the spread.",
                noteHide: "A 1D strip plot reveals the entire distribution. Overlaying background shading creates instant performance tiers (Needs Review / Target / Top).",
                avgLabel: "Avg",
                tiers: ["NEEDS REVIEW", "TARGET ZONE", "TOP PERFORMERS"]
            },
            progressBars: {
                title: "3. Show the Evaluation (Progress)",
                chartLabel: "QUARTERLY PROGRESS",
                note: "Progress bars effectively communicate evaluation because they bake the 'denominator' (the 100% target) directly into the visual background framework.",
                labels: ["Q1 Target", "Q2 Target", "Q3 Target", "Q4 Target"]
            },
            quadrantScatter: {
                title: "4. Quadrant Meaning",
                chartLabel: "EFFORT VS REWARD",
                note: "By physically dividing a scatter plot into shaded colored quadrants and giving them conceptual names ('Stars', 'High Risk'), you relieve the user from having to mentally calculate what high-effort vs low-reward means.",
                quadrants: ["HIGH RISK", "STARS", "IGNORE", "POTENTIAL"],
                xAxis: "REWARD / ROI",
                yAxis: "EFFORT / COST"
            },
            wafflePie: {
                title: "5. Waffle vs Pie",
                desc: "Comparing area-based vs grid-based part-to-whole estimation.",
                btnShow: "Show Waffle Grid",
                btnHide: "Show Pie Chart",
                chartLabel: "MARKET SHARE",
                noteShow: "Humans are notoriously bad at estimating angles and areas. Without explicitly writing '68%' on this pie, most people would struggle to guess the fraction.",
                noteHide: "A 10x10 Waffle chart leverages our innate ability to quickly count discrete items and intuitively estimate grid proportions."
            },
            likertScale: {
                title: "6. Likert Scale Progression",
                modes: ["1. Stacked", "2. Diverging", "3. Split Neutral"],
                chartLabel: "SURVEY RESULTS: COURSE SATISFACTION",
                notes: [
                    "A standard stacked bar forces the 'Agree' segments to start at arbitrary positions based on the size of Negative and Neutral votes, making it impossible to compare true positivity across rows.",
                    "A diverging stacked bar aligns against the center point of Neutral on a fixed vertical axis. This allows easy visual left vs right net-sentiment comparison.",
                    "The Gold Standard: Extract the Neutral votes entirely. 'Neutral' fundamentally implies 'no opinion/abstain'. By injecting it into a left-vs-right ideological axis, you visually dilute the actual polarity."
                ],
                text1: "Center of positivity floats aimlessly &rarr;",
                text2: "Neutral Midpoint",
                text3: "15% Neutral Abstentions"
            }
        },
        toolbox: {
            title: "Toolbox Additions",
            desc: "Specialized tools that shine in very specific mathematical or hierarchical constraints.",
            cumulativeStep: {
                chartLabel: "CUMULATIVE STEP CHART",
                note: "Highlights state persistence. A value remains exactly flat until a discrete event triggers an instant change (unlike organic diagonal slopes)."
            },
            logScale: {
                chartLabel: "LOG-SCALE SCATTER",
                note: "Without a log scale, comparing variables with extreme outliers (10 vs 1 Billion) would squeeze 99% of points into a single useless cluster."
            },
            heatmap: {
                chartLabel: "CATEGORICAL HEATMAP",
                note: "Cross-tabulates two categories using color intensity to instantly reveal density clusters (hotspots)."
            },
            treemap: {
                chartLabel: "TREEMAP",
                note: "Displays vast hierarchical data by nesting rectangles. Size represents magnitude (e.g. Market Cap), color represents performance."
            },
            misleading: {
                chartLabel: "WARNING: MISLEADING % RECOVERY",
                note: "A common error in financial reporting: A stock drops 50% ($100 → $50). It then gains 50% ($50 → $75). Intuitively, audiences think they are back to $100. Always plot the absolute reality, not abstract percentages in a void.",
                stillDown: "Still down $25!"
            }
        },
        conclusion: {
            title: "When to Go Custom?",
            text: "Use specialty charts when the narrative depends on <strong>relativity</strong> (Quadrants), <strong>compositional precision</strong> (Waffle), or <strong>hierarchical scale</strong> (Treemap). If your audience looks confused for more than 5 seconds, revert to a simpler form and use annotations."
        }
    },
    distributionTechniques: {
        intro1: "Averages lie. Showing the mean without the variability hides the most important part of the data: the risk, the outliers, and the shape of reality. These techniques shift the conversation from \"what's the average?\" to \"what does the full spectrum look like?\"",
        averageFallacy: {
            title: "The Average Fallacy",
            rule: "If you have two people with a salary of $10k and $190k, the average is $100k. But <em>neither</em> of them makes $100k. Visualizing the distribution is about revealing the <strong>internal truth</strong> that an average obscures."
        },
        demos: {
            ridgeline: {
                title: "1. Ridgeline / Joyplot",
                chartLabel: "HOURS TO DELIVER BY METHOD",
                noteShow: "Ridgelines stack distributions vertically, allowing you to compare density peaks across multiple categories simultaneously without overlap chaos. Sorting them by peak creates a powerful cascading narrative.",
                noteHide: "Placing multiple density geometry on the exact same axis creates a tangled, overlapping 'spaghetti' chart where individual shapes are lost.",
                btnShow: "Stack as Ridgeline",
                btnHide: "Flatten to Overlay",
                labels: ["Standard", "Express", "Same-Day"]
            },
            boxPlotToggle: {
                title: "2. Show the Variability",
                desc: "Aggregating thousands of points into a clear statistical summary.",
                btnShow: "Show Raw Scatter",
                btnHide: "Show Box Plot",
                chartLabel: "BASE SALARY DISTRIBUTION",
                noteShow: "A Box Plot summarizes the distribution into quartiles and explicitly flags mathematical outliers (the red dots).",
                noteHide: "A raw 1D scatter/strip plot shows all the actual data points, ensuring no multi-modal phenomena are hidden by averages."
            },
            beeswarm: {
                title: "3. Beeswarm / Strip Plot",
                chartLabel: "CUSTOMER AGE",
                noteShow: "A beeswarm physically places every single data point without overlapping them. It provides the exact density of a histogram without grouping data into arbitrary bins, preserving maximum granularity.",
                noteHide: "A standard strip plot can obscure density. Without vertical jitter or swarming, hundreds of overlapping points look like a single dot, hiding the true cluster size.",
                btnShow: "Spread into Beeswarm",
                btnHide: "Condense to Strip Plot"
            },
            histogramShapes: {
                title: "4. Histogram Shapes Gallery",
                chartLabel: "COMMON DISTRIBUTIONS",
                note: "A gallery of common distribution shapes and what they typically represent in real-world data.",
                shapes: [
                    { name: "Left-skewed", desc: "Ceiling effects (e.g. test scores)" },
                    { name: "Right-skewed", desc: "Floor effects (e.g. income)" },
                    { name: "Bimodal", desc: "Two distinct groups mixed" },
                    { name: "Bell Curve", desc: "Normal distribution" },
                    { name: "Uniform", desc: "Equal probability" },
                    { name: "Multimodal", desc: "Complex mixed phenomena" }
                ]
            },
            kdeButterflyBox: {
                title: "5. Comparing A vs B Distributions",
                chartLabel: "COMPARISON PATTERNS",
                note: "When you need to compare exactly two groups, these are the four most common techniques depending on your focus.",
                items: [
                    { title: "1. KDE Overlap", desc: "Shows continuous density overlap. Best for smooth, vast continuous data.", groupA: "Group A", groupB: "Group B" },
                    { title: "2. Butterfly Bar", desc: "Back-to-back bars prevent messy overlaps and are great for population pyramids." },
                    { title: "3. Parallel Box Plots", desc: "Summary statistics side-by-side. Focuses on quartiles rather than density shape." },
                    { title: "4. Stacked Histogram", desc: "Shows totals for the bin, stacked by proportion. Good for raw volumes." }
                ]
            },
            violin: {
                title: "6. Violin Plot",
                chartLabel: "VIOLIN PLOT ANATOMY",
                note: "A Violin plot combines the summary statistical markers of a box plot with the continuous density shape of a KDE curve (mirrored symmetrically). It explicitly reveals multi-modal data clusters that a simple box plot would obscure."
            }
        },
        conclusion: {
            title: "Choosing the Distribution Chart",
            text: "For executive audiences, the <strong>Box Plot</strong> is the standard for summarizing risk. For analytical audiences where specific clusters matter, the <strong>Beeswarm</strong> or <strong>Ridgeline</strong> are superior as they don't lose the raw data points."
        }
    },
    signalBoosters: {
        intro1: "Line charts are the ubiquitous default for time-series data. However, a raw line chart often leaves too much interpretation up to the audience. By employing strategic annotations, gap treatments, and context shading, you can dramatically boost the \"signal\" of your chart — moving it from a raw data display to a guided narrative.",
        signalRule: {
            title: "The Signal Rule",
            rule: "Every chart should have a clear <em>narrative anchor</em>. If you show a spike or a dip, your job is to explain why it happened visually, not just numerically."
        },
        demos: {
            turningPoint: {
                title: "1. Highlight the Turning Point",
                desc: "Using vertical markers to anchor narrative events.",
                btnShow: "Hide Event Line",
                btnHide: "Add Event Context",
                chartLabel: "MONTHLY ACTIVE USERS (MAU)",
                noteShow: "Adding a vertical dashed line instantly provides context for the inflection point. The audience no longer has to guess why the trend reversed in July.",
                noteHide: "Without an anchor or event marker, the audience sees a sudden drop starting in July but has no narrative context for what caused it.",
                eventLabel: "Pricing Update"
            },
            legendInline: {
                title: "2. Legend Inline vs Box",
                desc: "Reducing eye travel by placing labels near data.",
                btnShow: "Show Separate Legend",
                btnHide: "Use Inline Labels",
                chartLabel: "SESSIONS BY TRAFFIC SOURCE",
                noteShow: "Labels placed directly at the end of lines completely eliminate eye travel. The viewer instantly knows which line represents which group.",
                noteHide: "A separate legend box forces 'ping-ponging'. The viewer looks at a line, memorizes the color, scans to the legend box, and looks back.",
                legendTitle: "Traffic Source",
                labels: ["Organic Search", "Paid Ads", "Direct Traffic"]
            },
            eventAnnotated: {
                title: "3. Show the Story (Annotations)",
                chartLabel: "CONVERSION RATE",
                noteShow: "Instead of just showing vertices and expecting the audience to know 'what happened in Week 3', annotate the peaks directly inside the chart. This turns a simple 'data dump' into a cohesive story.",
                noteHide: "A standard line chart shows the 'what' (a spike in W3, another in W6) but forces the audience to guess the 'why'.",
                btnShow: "Add Annotations",
                btnHide: "Hide Annotations",
                labels: ["Influencer Post", "Checkout Redesign"]
            },
            confidenceBand: {
                title: "4. Show the Confidence",
                chartLabel: "MRR FORECAST",
                noteShow: "Visualizing the confidence interval prevents false precision. By displaying a widening band, you explicitly communicate increasing risk.",
                noteHide: "A single thin line into the future implies absolute certainty, creating false precision and hiding potential variance.",
                btnShow: "Show Uncertainty",
                btnHide: "Hide Uncertainty"
            },
            missingData: {
                title: "5. Show the Transparency (Missing Data)",
                chartLabel: "API REQUESTS",
                noteShow: "The most ethically transparent approach is bridging the gap with a dashed line and an explicit 'Outage' label.",
                noteHide: "Connecting missing data with a solid line implies a smooth transition. Leaving a blank gap suggests zero values.",
                btnShow: "Show Reality",
                btnHide: "Hide Outage",
                label: "Sensor Outage"
            },
            differenceShading: {
                title: "6. Show the Difference",
                chartLabel: "REVENUE: TARGET VS ACTUAL",
                noteShow: "When comparing two lines, the most critical piece of information is the gap between them. Shading the area instantly draws the eye to the deficit or surplus.",
                noteHide: "Looking at two overlapping lines forces the brain to manually calculate the distance between them at every point.",
                btnShow: "Shade the Gap",
                btnHide: "Remove Shading",
                labels: ["Target", "Actual", "Surplus", "Deficit"]
            },
            shadedRegion: {
                title: "7. Contextual Region Shading",
                chartLabel: "DAILY SIGNUPS",
                noteShow: "Shading a vertical region clarifies that a specific spike isn't an organic anomaly, but the direct result of a known external period.",
                noteHide: "A sudden plateau in the middle of a chart looks like an unexplained anomaly, causing unnecessary confusion.",
                btnShow: "Add Context",
                btnHide: "Remove Context",
                label: "Flash Sale"
            },
        },
        conclusion: {
            title: "Choosing the Right Booster",
            text: "Don't use all these techniques at once. A chart with markers, bands, shading, and annotations will create excessive cognitive load. Choose the <em>one</em> booster that supports your primary takeaway. Highlighting a deficit? Use difference shading. Explaining an outage? Use transparency."
        }
    },
    howDidRanksChange: {
        intro1: "When the analytical question is \"How did ranks or values change from state A to state B?\", a standard multi-line chart or grouped bar chart often introduces massive cognitive load. Viewers must scan back and forth, mentally calculating differences and tracking overlapping trajectories.",
        intro2: "The <strong>Slopegraph</strong> (introduced by Edward Tufte) is specifically designed to solve this. It pre-attentively encodes both absolute value (vertical position) and rate of change (slope steepness) while maintaining perfectly readable text labels on both sides. Use it when comparing exact start-and-end states where the journey between them is irrelevant.",
        slopegraphDemo: {
            labels: ["Product A", "Product B", "Product C", "Product D"],
            yearStart: "2023",
            yearEnd: "2024",
            caption: "A <strong>Slopegraph</strong> strips away all intermediate noise to focus purely on the structural transition between two states. The steepness of the lines pre-attentively encodes the rate of change, and the labels are perfectly aligned with the data points."
        },
        sectionTitle: "State Transition: The Slopegraph"
    },
    aCaseForTables: {
        intro1: "In the push to make everything visual, one of the most powerful communication tools gets forgotten: the humble table. A well-formatted table beats a complex chart in several critical situations — particularly when the audience needs to look up, compare, or record specific numerical values rather than perceive broad patterns or trends. Knowing when to choose a table over a chart is a mark of a genuinely skilled data communicator who prioritizes audience needs over visual aesthetics.",
        intro2: "The fundamental distinction is between <strong>pattern communication</strong> and <strong>value lookup</strong>. Charts excel at communicating patterns, trends, and relative magnitudes — they let the visual system do the work of comparison. Tables excel at communicating exact values, enabling direct lookup, and supporting multiple simultaneous comparisons across many rows and columns. The error most data presenters make is defaulting to charts for emotional visual impact when the audience actually needs to make decisions based on precise numbers. A finance director approving a budget needs exact figures — a bar chart of approximate values actively impedes their work.",
        intro3: "The design of a table matters as much as its content. Stephen Few's research on table design shows that <strong>removing unnecessary gridlines</strong> dramatically improves reading speed and comprehension. A table with rules between every row and column forces the eye to track two navigation systems simultaneously (grid lines and spatial position) — which increases cognitive load without adding information. The minimal table — header separator line only, right-aligned numbers, consistent units — is not just aesthetically cleaner but measurably faster to read and less error-prone to interpret.",

        theoryBlock: {
            title: "When Tables Beat Charts (The Precision Principle)",
            theory: "Cleveland & McGill (1984) — Graphical Perception + Stephen Few, Show Me the Numbers",
            explanation: "Charts excel at communicating patterns, trends, and relative magnitudes. Tables excel at communicating exact values, enabling direct lookup, and supporting multiple simultaneous comparisons. The error most data presenters make is defaulting to charts for emotional visual impact when the audience actually needs to make decisions based on precise numbers."
        },

        whenTable: {
            title: "Table vs. Chart: Which to Use?",
            headers: ["Situation", "Example", "Use"],
            items: [
                { scenario: "Precise values matter more than trends", example: "A CFO reviewing exact revenue figures to 2 decimal places for budget approval.", recommendation: "Table", recType: "table" },
                { scenario: "You have many categories with similar values", example: "Comparing 15 product SKUs with revenue differences of <5% — a bar chart becomes unreadable.", recommendation: "Table", recType: "table" },
                { scenario: "The audience needs to look up individual values", example: "A manager referencing team performance data one person at a time.", recommendation: "Table", recType: "table" },
                { scenario: "You are showing a trend or pattern over time", example: "Monthly revenue over 12 months — the visual shape of the trend matters.", recommendation: "Line Chart", recType: "chart" },
                { scenario: "You want to show relative size at a glance", example: "Comparing 5 business units to quickly show which is largest.", recommendation: "Bar Chart", recType: "chart" },
                { scenario: "The audience needs to compare two measures simultaneously", example: "Revenue vs. Margin by region — two variables, direct comparison needed.", recommendation: "Scatter or Grouped Bar", recType: "chart" }
            ]
        },

        rules: {
            title: "The 5 Rules of a Great Business Table",
            items: [
                { rule: "1. Remove all gridlines except one", detail: "Use a single horizontal line only under the header row. All other lines add noise. White space between rows is enough to guide the eye." },
                { rule: "2. Right-align all numbers", detail: "Numbers must always be right-aligned so decimal places stack vertically, enabling instant comparison without reading each value individually." },
                { rule: "3. Highlight the critical row or column", detail: "Use a single light background color (e.g., yellow or blue) on the row or column that carries the key insight. Don't highlight multiple rows." },
                { rule: "4. Use consistent number formats", detail: "Don't mix \"$1,200,000\" with \"1.2M\" in the same table. Choose one format and apply it everywhere. Include units in the header, not in every cell." },
                { rule: "5. Sort by what matters, not A-Z", detail: "Default alphabetical sorting serves nobody. Sort by the most important metric (usually revenue, impact, or variance) to surface insights immediately." }
            ]
        },

        cognitiveLoad: {
            title: "Table design: cognitive load comparison",
            highLoad: {
                label: "High cognitive load",
                items: [
                    "Grid lines between every row/column",
                    "Left-aligned numbers",
                    "Mixed formats ($1.2M vs $1,200,000)",
                    "Alphabetical sort",
                    "No header emphasis"
                ]
            },
            lowLoad: {
                label: "Low cognitive load",
                items: [
                    "Single line under header only",
                    "Right-aligned numbers",
                    "Consistent format ($1.2M everywhere)",
                    "Sorted by primary metric",
                    "Bold header + 1 highlight row"
                ]
            }
        }
    },
    areWeOnSchedule: {
        intro1: "Operational and risk charts are purpose-built for specific analytical workflows: process monitoring, project management, conversion analysis, and multi-dimensional scoring. Unlike general-purpose comparison or distribution charts, each operational chart type carries strong structural assumptions about the data it visualizes. A Gantt chart assumes tasks have defined start dates and fixed durations. A control chart assumes a stable, repeating process with measurable variation. A funnel chart assumes a strictly sequential process where all items enter at the top stage. <strong>Misapplying these charts to data that violates their structural assumptions produces visualizations that look authoritative but actively mislead.</strong>",
        intro2: "The gauge chart — the half-circle dial with a needle pointing to a KPI value — is perhaps the most pervasive example of a chart optimized for aesthetics over information density. A gauge chart uses a semicircular area that could hold 5–10 bullet charts, yet encodes a single number in an angle encoding that ranks 5th in Cleveland & McGill's perceptual accuracy hierarchy. Stephen Few demonstrated that a bullet chart provides the same information (actual value, target, performance zones) in roughly 1/5 the space with superior perceptual accuracy. Gauge charts persist in dashboards not because they communicate more effectively but because they resemble familiar physical instruments and look appropriately \"technical.\"",
        intro3: "Radar/spider charts present a similar problem: the polygon area is determined as much by axis ordering as by data values. Rotating the axes of a radar chart produces a different polygon shape and area — implying different \"performance\" — even though none of the values change. This means that radar chart comparisons between entities or time periods can be manipulated simply by choosing an axis order that makes the desired entity's polygon appear larger, without changing any underlying data. For multi-dimensional performance comparison, a <strong>small multiple bar chart approach</strong> (one bar per dimension, displayed in a grid) offers superior accuracy with zero axis-ordering sensitivity.",

        gaugeVsBulletDemo: {
            title: "Density Conflict: Gauge vs. Bullet",
            note: "Both charts encode identical data: Actual (73%), Target (80%), and performance zones. The bullet chart offers superior spatial economy and higher decoding accuracy.",
            gaugeTitle: "Gauge: Meter Metaphor",
            gaugePoints: [
                "Uses +60% more vertical space",
                "Low-accuracy angle encoding",
                "Visual \"noise\" from heavy arcs"
            ],
            bulletTitle: "Bullet: High Density",
            bulletPoints: [
                "High-accuracy length/position",
                "Encodes zones + target + actual",
                "Easily stackable (Dashboard-ready)"
            ],
            goalLabel: "GOAL"
        },

        checklist: {
            title: "Structural Integrity Checklist",
            items: [
                { chart: "Gantt Chart", assumption: "Tasks have defined start/end dates and fixed durations. Agile sprints with fluid scope violate this." },
                { chart: "Control Chart (SPC)", assumption: "Process is stable and repeating with a historical baseline of ≥20 data points." },
                { chart: "Funnel Chart", assumption: "All items enter at stage 1 and progress forward-only. No re-entry or skipping." },
                { chart: "Radar Chart", assumption: "All axes share a common scale. Axis ordering is theoretically motivated, not arbitrary." }
            ]
        },

        clevelandNote: "Gauge and radar charts use angle as the primary encoding — one of the least accurately decoded channels in the Cleveland & McGill hierarchy. They are popular in executive dashboards despite their perceptual limitations, often because they resemble familiar physical instruments. Bullet charts (comparison family) outperform gauges on every measurable dimension of accuracy and information density.",

        charts: {
            gantt: {
                name: "Gantt Chart",
                whenToUse: [
                    "Project scheduling and timeline visualization showing task start dates, durations, and dependencies",
                    "Resource allocation dashboards where overlapping tasks reveal capacity conflicts",
                    "Communicating project status to stakeholders who need to see schedule at a glance"
                ],
                whenNotToUse: [
                    "Very long time horizons with many tasks — granularity becomes unreadable",
                    "Agile workflows where tasks are too fluid to represent as fixed bars",
                    "When the critical path or task dependencies are the primary analytical focus — PERT/network is better"
                ],
                interpretationRisk: "Gantt charts show planned duration but not completion percentage or quality. A task that appears \"on time\" as a full bar may be 0% complete internally. Without explicit progress overlays, Gantt charts are optimistic by default.",
                cognitiveRef: "Pre-attentive: length, position (time)",
                ethicalRef: "Risk: Planned vs. actual confusion"
            },
            controlChart: {
                name: "Control Chart (SPC)",
                whenToUse: [
                    "Statistical Process Control: monitoring whether a process is in control or exhibiting special-cause variation",
                    "Manufacturing, quality assurance, or service delivery metrics tracked over time",
                    "When distinguishing common-cause (random) variation from special-cause (assignable) variation is critical"
                ],
                whenNotToUse: [
                    "Data that is not generated by a stable, repeating process",
                    "Small samples where control limits cannot be reliably estimated (< 20 historical data points)",
                    "Audiences who will interpret the ±3σ limits as performance targets rather than statistical boundaries"
                ],
                interpretationRisk: "Control limits (±3σ) are statistical bounds for random variation, not performance targets. Communicating UCL/LCL to business audiences who interpret them as \"acceptable range\" goals corrupts the method — processes will be \"managed to the limits\" rather than continuously improved.",
                cognitiveRef: "Pre-attentive: position, color (alert)",
                ethicalRef: "Risk: Limits as targets"
            },
            funnel: {
                name: "Funnel Chart",
                whenToUse: [
                    "Sequential conversion or qualification processes where each stage filters the population from the previous",
                    "Sales pipeline, marketing attribution, or user activation flows with defined sequential stages",
                    "When identifying the stage with the largest drop-off is the primary analytical goal"
                ],
                whenNotToUse: [
                    "Non-sequential processes where items can enter or exit at any stage",
                    "When the total population at each stage is more important than the ratio between stages",
                    "Processes with feedback loops — funnels imply strictly linear, forward-only flow"
                ],
                interpretationRisk: "Funnel charts imply that all items enter at the top stage. In real pipelines, leads often enter mid-funnel, skip stages, or recycle through earlier stages. A funnel that makes a 30% overall conversion rate look visually impressive may hide a catastrophic early-stage drop-off.",
                cognitiveRef: "Pre-attentive: length (width)",
                ethicalRef: "Risk: Entry assumption"
            },
            radar: {
                name: "Radar / Spider Chart",
                whenToUse: [
                    "Comparing performance profiles across 5–8 dimensions for 2–3 entities simultaneously",
                    "Communicating trade-off profiles where no single axis dominates (e.g., risk-return across asset classes)",
                    "Qualitative scoring rubrics where the \"shape\" of the profile is the primary insight"
                ],
                whenNotToUse: [
                    "More than 3 overlapping polygons — the center fills with color and all shapes blur together",
                    "When individual axis values need to be read precisely — the radial scale is hard to decode",
                    "Axes with different units or scales that are not meaningfully comparable"
                ],
                interpretationRisk: "The area of the radar polygon is extremely sensitive to axis ordering. Two identical datasets with axes reordered produce different polygon shapes and areas, suggesting different \"performance\" even though no values changed. Axis order should be theoretically motivated, not arbitrary.",
                cognitiveRef: "Pre-attentive: area, shape",
                ethicalRef: "Risk: Axis ordering changes area"
            },
            gauge: {
                name: "Gauge / Dial Chart",
                whenToUse: [
                    "Single KPI display in an executive dashboard where the metaphor of \"progress toward a target\" is intuitive",
                    "When three qualitative performance zones (red/amber/green) need to be visible with the current value",
                    "Physical monitoring contexts where users are already familiar with dial metaphors (speed, pressure)"
                ],
                whenNotToUse: [
                    "Analytical reporting — gauges use space inefficiently and convey one number a bar could show better",
                    "Multiple KPIs side-by-side — comparisons between gauges require mental effort that a table eliminates",
                    "When historical trend matters — the gauge is a point-in-time reading with no trend context"
                ],
                interpretationRisk: "Gauge charts show a single value in a half-circle that uses roughly 50% more space than a bullet chart showing the same information. They are frequently used in dashboards to make reports appear more sophisticated while actually reducing information density and analytical clarity.",
                cognitiveRef: "Pre-attentive: angle, position",
                ethicalRef: "Risk: Space-to-information inefficiency"
            }
        }
    },
    howDoesItFlow: {
        intro1: "Hierarchy and network charts encode structural relationships — how entities are connected, nested, or flow between each other. Unlike quantitative charts where a specific axis encodes a specific variable with measurable accuracy, hierarchy charts encode topology: which nodes are connected, how deep the hierarchy is, and what flows between clusters. The Gestalt principles of <strong>connection</strong> (lines between nodes imply direct relationships) and <strong>proximity</strong> (nearby nodes appear related) are the dominant perceptual mechanisms, working automatically in the viewer's visual system before any conscious reading occurs.",
        intro2: "The most consequential risk in hierarchy charts is that <strong>visual layout algorithms impose structure that reflects computational convenience, not genuine data hierarchy</strong>. Force-directed graph layouts (the algorithm behind most network visualizations) place nodes in positions that minimize edge crossings and distribute nodes evenly — but these positions carry no semantic meaning. A node placed in the visual center appears more important, more central, and more powerful, even if it has the same number of connections as a node at the visual periphery. The same network data with different layout seeds or algorithms produces entirely different visual narratives about which node \"controls\" the structure.",
        intro3: "Choosing the right chart for hierarchical data requires understanding the structural type of the data itself: <strong>strict hierarchies</strong> (org charts, taxonomies, file systems) suit tree diagrams; <strong>hierarchical quantitative partitions</strong> (budget allocation, file size breakdown) suit treemaps or icicle charts; <strong>flow processes</strong> (conversion funnels, energy systems, money flows) suit Sankey diagrams; and <strong>genuine graph data</strong> (social networks, dependency graphs, biological pathways) suit network graphs. Choosing the wrong structural chart type imposes a false topology on the data — a tree diagram applied to graph-structured data creates false parent-child authority relationships that do not exist.",

        networkDemo: {
            title: "Layout-Implied Importance",
            note: "The internal connections are identical. By simply shifting which node occupies the geometric center, the visual narrative changes from 'CEO-centric' to 'Tech-driven.' Center = Power is a hardwired heuristic.",
            roles: ["CEO", "CTO", "CFO", "CMO", "COO", "CRO"],
            layoutA: {
                title: "Layout A",
                status: "Traditional Hierarchy",
                note: "Implies strict CEO authority"
            },
            layoutB: {
                title: "Layout B",
                status: "Matrix Perception",
                note: "Implies CTO as the strategic hub"
            }
        },

        treemapDemo: {
            title: "Cognitive Overload: Dense Treemaps",
            note: "Financial 'heatmaps' maximize density but create overwhelming load. Competing intensive colors cause visual vibration, and area comparisons across non-adjacent rectangles are perceptually imprecise.",
            frictionTitle: "Analysis Friction",
            points: [
                "Intense colors (red/green) create visual vibration",
                "Area estimation is significantly less accurate than length",
                "Rapid updates (live stock prices) saturate working memory"
            ]
        },

        guide: {
            title: "Topology Selection Matrix",
            chooseBtn: "CHOOSE",
            items: [
                { structure: "Strict parent-child hierarchy", chart: "Tree Diagram", note: "Single parent per node" },
                { structure: "Space-filling partition", chart: "Treemap / Icicle", note: "Quantitative nesting" },
                { structure: "Flow volumes between stages", chart: "Sankey Diagram", note: "Process conversion" },
                { structure: "Bidirectional flows", chart: "Chord Diagram", note: "Small node set matrix" },
                { structure: "Graph with cycles", chart: "Network (DAG)", note: "Interconnected web" },
                { structure: "Clustering results", chart: "Dendrogram", note: "Algorithmic distance" }
            ]
        },

        clevelandNote: "Connection and proximity (Gestalt) are not in Cleveland & McGill's original hierarchy, which focused on quantitative encodings. For structural/topological data, the standard accuracy rankings do not apply — but this also means there is no baseline for 'accurate decoding.' Hierarchy charts carry especially high risk of over-interpretation.",

        charts: {
            tree: {
                name: "Tree Diagram",
                whenToUse: [
                    "Representing strict parent-child hierarchies such as org charts, file systems, or taxonomies",
                    "When the direction of authority or inheritance flows clearly in one direction",
                    "Decision tree visualizations where each split leads to a defined set of outcomes"
                ],
                whenNotToUse: [
                    "Graphs where nodes have multiple parents (use a network/DAG instead)",
                    "Very deep or wide trees — nodes quickly become too small to label or read",
                    "When the sibling relationships between leaf nodes are as important as the parent-child links"
                ],
                interpretationRisk: "Tree diagrams imply strict hierarchical authority. Representing a cross-functional team as a tree imposes a command-structure reading that may not reflect how the team actually works, potentially misrepresenting shared or matrix reporting.",
                cognitiveRef: "Gestalt: connection, proximity",
                ethicalRef: "Risk: Hierarchy imposition"
            },
            dendrogram: {
                name: "Dendrogram",
                whenToUse: [
                    "Visualizing results of hierarchical clustering algorithms in statistical analysis",
                    "Phylogenetic trees in biology or evolutionary data",
                    "When the height of the merge point encodes the distance or dissimilarity between clusters"
                ],
                whenNotToUse: [
                    "Non-hierarchical clustering results — k-means or DBSCAN clusters have no tree structure",
                    "Very large datasets — with > 50 leaf nodes, labels overlap and the structure is unreadable",
                    "General business audiences unfamiliar with clustering methodology"
                ],
                interpretationRisk: "Dendrograms from agglomerative clustering are sensitive to linkage method (single, complete, average, Ward). Two identical datasets with different linkage methods can produce dramatically different tree shapes, implying different cluster structures.",
                cognitiveRef: "Gestalt: connection",
                ethicalRef: "Risk: Linkage method sensitivity"
            },
            icicle: {
                name: "Icicle / Partition Chart",
                whenToUse: [
                    "Hierarchical data where quantitative proportions at each level are meaningful",
                    "Visualizing directory structures, budget hierarchies, or nested categorical data",
                    "When the partition needs to be visually aligned with a linear scale"
                ],
                whenNotToUse: [
                    "When the hierarchy is deep (> 4 levels) — leaf rectangles become hairline slivers",
                    "Interactive-only contexts — horizontal space is consumed rapidly with many children",
                    "Audiences who find tree diagrams more intuitive than space-filling approaches"
                ],
                interpretationRisk: "Width encodes quantitative proportion but depth (level) is purely structural. Readers may misread a deep but narrow branch as having more total weight than a shallow but wide one, confusing structural depth with quantitative magnitude.",
                cognitiveRef: "Pre-attentive: length, area",
                ethicalRef: "Risk: Depth vs. width confusion"
            },
            sankey: {
                name: "Sankey Diagram",
                whenToUse: [
                    "Showing flow volumes between stages in a process (energy, money, traffic, conversions)",
                    "When the total flow is conserved and losses or gains at each stage are meaningful",
                    "Funnel-like processes where the magnitude of flow at each transition is the story"
                ],
                whenNotToUse: [
                    "Non-flow data — Sankey diagrams carry a strong \"flow\" implication that misrepresents static snapshots",
                    "More than 5–7 source or destination nodes — the diagram becomes a tangled ribbon",
                    "When the proportion of flow between specific nodes needs to be read precisely"
                ],
                interpretationRisk: "Flow width encodes magnitude, but the curved, organic ribbons make precise comparison extremely difficult. Designers sometimes adjust curvature or node ordering to make small flows appear more significant, a subtle but effective form of visual manipulation.",
                cognitiveRef: "Pre-attentive: width (flow)",
                ethicalRef: "Risk: Visual weight manipulation"
            },
            chord: {
                name: "Chord Diagram",
                whenToUse: [
                    "Symmetric matrix data showing bidirectional flows or relationships between a small set of entities",
                    "Migration, trade flow, or communication data between groups",
                    "Exploratory analysis of complex interconnections where the matrix structure would be hard to see"
                ],
                whenNotToUse: [
                    "More than 7–8 nodes — chord diagrams become unreadable with many overlapping ribbons",
                    "When precise flow values need to be read — chord widths are hard to decode",
                    "Non-symmetric relationships where directionality (A→B ≠ B→A) is critical"
                ],
                interpretationRisk: "Arc width at the node encodes total flow but ribbon width encodes bilateral flow between two specific nodes. These two encodings are often confused, leading readers to misread total connection strength as bilateral exchange.",
                cognitiveRef: "Pre-attentive: arc width",
                ethicalRef: "Risk: Total vs. bilateral flow confusion"
            },
            network: {
                name: "Network Graph",
                whenToUse: [
                    "Representing genuine graph-structured data: social networks, dependency graphs, knowledge graphs",
                    "When the topology (connectivity pattern, hubs, clusters) is the analytical focus",
                    "Exploratory visualization of relational data before quantitative network analysis"
                ],
                whenNotToUse: [
                    "Hierarchical data — a tree diagram is cleaner and more intuitive",
                    "Very dense networks (> 100 nodes) — \"hairball\" graphs convey nothing analytically",
                    "When the reader needs to count paths, measure distances, or compare centrality precisely"
                ],
                interpretationRisk: "Node positions in most network layouts (force-directed, Fruchterman-Reingold) are non-deterministic and change on every render. A node placed in the \"center\" appears more important, but centrality is a function of the algorithm, not the data.",
                cognitiveRef: "Gestalt: proximity, connection",
                ethicalRef: "Risk: Layout-implied importance"
            }
        }
    },
    whereIsTheMoneyGoing: {
        intro1: "Composition charts answer \"what is this made of?\" by encoding the parts that comprise a whole. They range from the ubiquitous but cognitively demanding pie chart to the space-efficient treemap and the narrative-friendly waterfall. The fundamental challenge with composition charts is that <strong>angle and area</strong> — their primary encoding channels — rank 5th and 6th in Cleveland & McGill's perceptual accuracy hierarchy. Humans are systematically poor at comparing non-aligned angles and areas with precision.",
        intro2: "This doesn't mean pie charts are always wrong. When a single segment is dramatically larger than the others (&gt;50%), the \"majority\" story is immediately visible and the angle comparison weakness is irrelevant. When only 2–3 segments exist and approximate proportions are sufficient, pie charts work well for general audiences. The problem arises when multiple similar-sized segments need to be compared, or when precise proportions matter — in these cases, a sorted horizontal bar chart on a common scale will always outperform a pie in terms of the viewer's ability to read accurate values.",
        intro3: "The most important composition chart decision is <strong>when to use bars versus sectors</strong>. Use bars when precise comparison between segments matters, when you have more than 5 categories, or when the chart will be used for data analysis. Use pie/donut when you have 2–4 segments, when part-to-whole relationship is the primary message, and when approximate proportions are sufficient. Treemaps and sunbursts are appropriate for hierarchical compositions but demand high cognitive load — use them only when the hierarchical structure itself is the story.",

        pieVsBar: {
            title: "Same Data: Pie vs. Bar",
            note: "When segments are within 5-10% of each other, angle discrimination fails. The bar chart makes the same comparison trivially accurate. Use pie charts only when segment sizes are sufficiently different that angle comparison succeeds.",
            pieTitle: "Pie chart — hard to compare B vs C",
            pieLabel: "35% vs 38% — indistinguishable",
            barTitle: "Bar chart — differences are clear",
            barLabel: "38% vs 35% — clearly visible",
            categories: ["Category A", "Category B", "Category C", "Category D"]
        },

        guide: {
            title: "Quick decision guide: composition chart selection",
            items: [
                { condition: "2–4 segments, approximate proportions OK", chart: "Pie or donut" },
                { condition: "1 segment clearly dominates (>50%)", chart: "Pie chart" },
                { condition: "5+ categories", chart: "Horizontal bar chart" },
                { condition: "Precise comparison between similar segments", chart: "Horizontal bar chart" },
                { condition: "Hierarchical composition (parent + child levels)", chart: "Treemap or sunburst" },
                { condition: "Finance: cumulative contributions to total", chart: "Waterfall chart" },
                { condition: "Want to embed a KPI in the center", chart: "Donut chart" }
            ]
        },

        waffleDemo: {
            sectionTitle: "Alternative to Pie Charts: The Waffle Chart",
            title: "Alternative: The Waffle Chart",
            note: "Waffle charts leverage our pre-attentive ability to count. Instead of asking the brain to calculate the angle of a pie slice, a waffle chart visually represents the exact proportion out of 100 discrete cells.",
            complete: "Complete",
            desc: "Showing individual unit counts makes statistics feel more tangible, honest, and precise compared to the cognitive abstraction of angles."
        },

        waterfallDemo: {
            sectionTitle: "Telling the Story of Change: The Waterfall Chart",
            title: "Story of Change: The Waterfall Chart",
            note: "The Waterfall Chart decomposes a net change into its constituent parts. Floating the intermediate bars perfectly aligns the 'start' of one metric with the 'end' of the previous, making the math visually obvious.",
            labels: ["Q1 Revenue", "New Sales", "Churn", "Upgrades", "Q2 Revenue"]
        },

        likertDemo: {
            sectionTitle: "Survey Data: Likert Scales",
            title: "Survey Patterns: Likert Scales",
            noteStandard: "A Standard Stacked Bar makes it difficult to compare the overall positive vs negative sentiment across questions, as the baseline is constantly shifting.",
            noteDiverging: "A Diverging Stacked Bar centers the neutral responses, explicitly comparing the total positive (right) vs total negative (left) sentiment.",
            noteSeparated: "Separating Neutral allows the specific polarization to become obvious. Neutral responses often indicate lack of engagement rather than a middle-ground opinion.",
            modes: ["Stacked", "Diverging", "Separated"],
            legend: ["Dis.", "Neu.", "Agr."],
            questions: ["Q1: Data quality", "Q2: Tool access", "Q3: Training", "Q4: Leadership"]
        },

        clevelandNote: "Angle and area encodings (used by pie, donut, treemap) rank 7th and 8th in perceptual accuracy — near the bottom of the hierarchy. Bars on a common scale (rank 1) are more accurately decoded for part-to-whole comparisons. Use composition charts only when part-to-whole relationship is genuinely the primary message.",

        charts: {
            pie: {
                name: "Pie Chart",
                whenToUse: [
                    "Showing part-to-whole composition for 2–5 segments when approximate proportions suffice",
                    "When one segment dominates (> 50%) and you want to emphasize that majority",
                    "Familiar general-audience contexts where a simple visual metaphor matters"
                ],
                whenNotToUse: [
                    "More than 5–6 slices — small slices become impossible to compare",
                    "When precise comparison between slices is needed — bars on a common scale are more accurate",
                    "Multiple pie charts side-by-side for comparison — the eye cannot compare angles across charts"
                ],
                interpretationRisk: "Humans are poor at comparing angles and arc lengths. Cleveland & McGill ranked angle as one of the least accurate encodings. Two slices of 30% and 35% are nearly indistinguishable in a pie chart but are easily separated in a bar chart.",
                cognitiveRef: "Pre-attentive: angle (inaccurate)",
                ethicalRef: "Risk: Angle comparison failure"
            },
            donut: {
                name: "Donut Chart",
                whenToUse: [
                    "Same contexts as a pie chart, with center space available for a summary statistic",
                    "Dashboard designs where a central KPI value needs to be embedded in the composition view",
                    "When the hole reduces the apparent dominance of the \"filled\" area illusion from a pie"
                ],
                whenNotToUse: [
                    "When the ring width varies or is used to encode an additional variable (distorts area)",
                    "More than 5–6 segments — same limitations as pie charts",
                    "When the central value would be misleading without full context"
                ],
                interpretationRisk: "The donut hole removes area information but readers still decode by arc length. A very thin ring width makes all arcs appear approximately equal regardless of actual proportions — the visual weight of the hole competes with the data.",
                cognitiveRef: "Pre-attentive: arc length",
                ethicalRef: "Risk: Ring width distortion"
            },
            treemap: {
                name: "Treemap",
                whenToUse: [
                    "Hierarchical part-to-whole data where both levels (parent and child) need to be visible simultaneously",
                    "Large numbers of categories (20+) where a bar chart would be too long",
                    "When relative area between categories is more important than precise values"
                ],
                whenNotToUse: [
                    "Flat (non-hierarchical) data — a bar chart is more accurately decoded",
                    "When the viewer needs to compare non-adjacent cells — spatial position varies with algorithm",
                    "Precise value reading — area is a weak encoding channel"
                ],
                interpretationRisk: "Treemap layout algorithms (squarified, slice-and-dice) change cell shape and adjacency each time data changes, making temporal comparison across snapshots extremely difficult. An identical dataset can produce dramatically different visual layouts.",
                cognitiveRef: "Pre-attentive: area, color",
                ethicalRef: "Risk: Layout instability"
            },
            sunburst: {
                name: "Sunburst Chart",
                whenToUse: [
                    "Multi-level hierarchical part-to-whole data where the radial structure aids navigation",
                    "Interactive dashboards where clicking into rings reveals sub-categories",
                    "When hierarchy depth and proportion at each level are both meaningful"
                ],
                whenNotToUse: [
                    "More than 3 levels — outer rings become tiny slices that are impossible to label",
                    "Static print or reports — the interactive drill-down that justifies sunbursts is unavailable",
                    "When comparing across multiple sunbursts — no common scale exists between charts"
                ],
                interpretationRisk: "Outer ring segments appear larger than inner ring segments of equal proportion because the circumference is longer. The same 10% slice at the outer ring has a visually longer arc than at the inner ring, implying greater importance.",
                cognitiveRef: "Pre-attentive: arc length (varies by radius)",
                ethicalRef: "Risk: Radius-dependent arc inflation"
            },
            waffle: {
                name: "Waffle Chart",
                whenToUse: [
                    "Making proportions intuitive for general audiences by showing individual unit counts",
                    "Small integer percentages (e.g., \"62 out of 100\") where counting supports the message",
                    "Infographic contexts where the chart is supplementary to narrative text"
                ],
                whenNotToUse: [
                    "Non-round percentages — a waffle of 62.7% is misleading if it rounds to 63 filled cells",
                    "More than 2–3 categories in the same waffle — color assignment becomes confusing",
                    "When the total unit count is not 100 — the metaphor breaks down"
                ],
                interpretationRisk: "Waffle charts work when the total is exactly 100 units. If the underlying data is 6,200 out of 10,000 (62%), the chart implies a simplicity of counting that hides the actual scale of the data.",
                cognitiveRef: "Pre-attentive: counting",
                ethicalRef: "Risk: Rounding misrepresentation"
            },
            mosaic: {
                name: "Mosaic / Marimekko",
                whenToUse: [
                    "Showing both composition within groups (tile height) and group size (tile width) simultaneously",
                    "Survey data cross-tabulations where the size of each group is meaningful",
                    "Two-way contingency tables in statistical or research reporting"
                ],
                whenNotToUse: [
                    "When either dimension's proportions are not meaningful to the audience",
                    "More than 4–5 categories per axis — tiles become slivers",
                    "Audiences unfamiliar with the chart form — mosaic charts require more explanation than bars"
                ],
                interpretationRisk: "Mosaic charts simultaneously encode two sets of proportions. Readers must track both width (group size) and height (composition) to understand the chart, creating high cognitive load. Often the two encodings are confused for each other.",
                cognitiveRef: "Pre-attentive: area (2D)",
                ethicalRef: "Risk: Dual-proportion confusion"
            },
            waterfall: {
                name: "Waterfall Chart",
                whenToUse: [
                    "Financial statements showing how individual positive and negative contributions build to a total",
                    "Revenue bridge charts, profit and loss breakdowns, or budget variance analysis",
                    "When both the direction (positive/negative) and magnitude of each component matters"
                ],
                whenNotToUse: [
                    "Time-series data — a line chart better shows trends; waterfall implies discrete contributions",
                    "More than 8–10 bars — the cumulative position becomes difficult to track",
                    "When the composition does not logically accumulate to a meaningful total"
                ],
                interpretationRisk: "Floating bars in a waterfall chart have no visual baseline. Readers must mentally track the running total, which requires working memory. Poorly ordered or unlabeled running-total bars lead to systematic misreading of intermediate values.",
                cognitiveRef: "Pre-attentive: length, position (floating)",
                ethicalRef: "Risk: Floating bar baseline confusion"
            }
        }
    },
    whatsTheRelationship: {
        intro1: "Relationship charts encode how two or more variables co-vary. The scatter plot is the foundational form, exploiting the most accurate visual encoding — position on a common scale — for both axes simultaneously. It is the most versatile exploratory tool in data visualization: it reveals correlation direction and strength, identifies outliers, exposes non-linear patterns, and reveals sub-groups that aggregate statistics would conceal. Yet the scatter plot is also one of the most commonly misinterpreted charts because of the fundamental confusion between <strong>visual correlation and causal relationship</strong>.",
        intro2: "A regression line on a scatter plot is among the most persuasive visual artifacts in data communication. It implies: (1) a linear relationship exists, (2) it extends across the full range shown, and (3) the relationship is stable enough to support extrapolation. All three implications can be false simultaneously while the line itself is technically \"correct\" for the observed data. The scale ratio between x and y axes directly controls how steep the regression line appears — a 45° line can be achieved with any data by adjusting axis ranges, making the apparent \"strength\" of the relationship a design choice as much as a data property.",
        intro3: "The deepest risk in relationship charts is <strong>spurious correlation</strong>: two variables may share a high correlation coefficient (r ≈ 0.95) with zero causal connection because both are driven by a third, unmeasured variable (a \"confound\"). Ice cream sales and drowning deaths correlate strongly across months — not because one causes the other, but because both are driven by temperature and seasonality. A scatter plot of the two variables would show a tight, apparently causal relationship. Always ask: \"What third variable could be driving both of these?\" before interpreting a correlation as meaningful.",

        spuriousDemo: {
            title: "Spurious correlation: r = 0.97, zero causal link",
            desc: "Both variables move in lockstep because summer drives both. A scatter plot of ice cream vs. drowning shows a near-perfect line — yet eating ice cream does not cause drowning. This is the canonical example of a confounded relationship. Always seek the confound.",
            iceCreamSales: "Ice cream sales",
            drowningDeaths: "Drowning deaths",
            correlationValue: "r = 0.97",
            confoundNote: "Confound: temperature drives BOTH variables. No causal link exists.",
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },

        manipulationPatterns: {
            title: "The three most common relationship chart manipulation patterns",
            patterns: [
                {
                    name: "Axis range selection",
                    desc: "Choosing x/y axis ranges to make a weak correlation appear strong or a strong one appear weak. A 45° regression line looks equally impressive regardless of actual r²."
                },
                {
                    name: "Extrapolation beyond data",
                    desc: "Extending the regression line beyond the observed data range implies the relationship holds in regions that have not been measured. This is often shown in forecasts."
                },
                {
                    name: "Cherry-picked subgroup",
                    desc: "Showing a regression for a specific subpopulation where the relationship is strong, while omitting the full dataset where no relationship exists."
                }
            ]
        },

        heatmapDemo: {
            title: "2D Density: Categorical Heatmaps",
            desc: "A <strong>Categorical Heatmap</strong> replaces the dots of a scatterplot with a matrix of colored tiles. It is the perfect chart for discovering \"hotspots\" across two categorical dimensions, such as the concentrated burst of activity on Friday evenings vs. Wednesday afternoons.",
            days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            times: ["Morning", "Afternoon", "Evening"]
        },

        clevelandNote: "Two-dimensional position encoding (scatter plots) simultaneously uses rank-1 perceptual accuracy on both axes. Bubble charts degrade the third variable to area perception (rank 6), which humans decode with roughly 20–30% systematic underestimation relative to the true ratio.",

        charts: {
            scatter: {
                name: "Scatter Plot",
                whenToUse: [
                    "Exploring the relationship, correlation, or clustering between two continuous variables",
                    "Identifying outliers, sub-groups, or non-linear patterns in bivariate data",
                    "As a first-pass exploratory tool before fitting statistical models"
                ],
                whenNotToUse: [
                    "Categorical x-axis — a dot plot or strip plot is more appropriate",
                    "When individual point identity matters — label a subset or use an interactive tooltip",
                    "Very large datasets (> 5,000 points) without overplotting mitigation (alpha, hexbin)"
                ],
                interpretationRisk: "Correlation visible in a scatter plot does not imply causation. The scale ratio of x to y axes determines the apparent steepness of any relationship — a 45° regression line can be achieved with any data by adjusting axis ranges.",
                cognitiveRef: "Pre-attentive: position (2D)",
                ethicalRef: "Risk: Correlation ≠ causation"
            },
            bubble: {
                name: "Bubble Chart",
                whenToUse: [
                    "Encoding three quantitative variables simultaneously (x position, y position, area)",
                    "Showing proportional relationships where the size variable is meaningful and large in range",
                    "Exploratory analysis of trivariate relationships in small-to-medium datasets"
                ],
                whenNotToUse: [
                    "When size differences are small — human area perception is logarithmic and imprecise",
                    "More than 30–40 bubbles — overlap makes the chart unreadable",
                    "When precise size comparison is needed — people underestimate area differences by 20–30%"
                ],
                interpretationRisk: "Area is one of the least accurately perceived visual channels. Bubble charts must encode radius linearly (not area) to avoid under-scaling. Many tools default to radius-proportional mapping which makes large values appear much larger than warranted.",
                cognitiveRef: "Pre-attentive: area (inaccurate)",
                ethicalRef: "Risk: Radius vs. area encoding"
            },
            regression: {
                name: "Scatter + Regression",
                whenToUse: [
                    "Communicating a statistical relationship and its direction in a single view",
                    "After confirming that a linear model is appropriate for the data",
                    "When showing the residuals or confidence interval around the fit is important"
                ],
                whenNotToUse: [
                    "Non-linear relationships — a linear regression line misrepresents the pattern",
                    "Small samples (< 10 points) where the regression is highly sensitive to individual points",
                    "When the regression was fitted on different data than is being shown"
                ],
                interpretationRisk: "A regression line implies a continuous, linear relationship across the full x-axis range. Extrapolating beyond the observed data range — visible when the line extends to axis edges — can lead to nonsensical predictions.",
                cognitiveRef: "Pre-attentive: slope",
                ethicalRef: "Risk: Extrapolation beyond data"
            },
            connectedScatter: {
                name: "Connected Scatter",
                whenToUse: [
                    "Showing how two variables co-evolve over time, making time a third implicit dimension",
                    "Exploratory analysis of cyclic or lagged relationships between two quantities",
                    "When the path and direction of change are as important as the endpoints"
                ],
                whenNotToUse: [
                    "Long time series with many points — the path becomes tangled and unreadable",
                    "When the temporal sequence isn't meaningful or the variables are not time-ordered",
                    "Audiences who need to read precise values — neither axis is easy to read with connecting lines"
                ],
                interpretationRisk: "The connecting line implies temporal or sequential ordering that may not exist in the underlying data. If points are connected by value rank rather than time, the apparent \"path\" suggests false directionality.",
                cognitiveRef: "Pre-attentive: slope, direction",
                ethicalRef: "Risk: Implied directionality"
            },
            hexbin: {
                name: "Hexbin Plot",
                whenToUse: [
                    "Large scatter datasets (> 5,000 points) where individual dots would form opaque blobs",
                    "Showing density of point concentration across a 2D space",
                    "When overplotting obscures genuine patterns in dense data"
                ],
                whenNotToUse: [
                    "Small datasets where individual observations are meaningful and should be visible",
                    "Audiences who need to identify specific data points or entities",
                    "Data with meaningful sub-clusters that the hexagonal binning would split or merge"
                ],
                interpretationRisk: "Hexbin cell size (bandwidth) is a free parameter analogous to histogram bin width. A cell size that is too large merges distinct clusters; one that is too small creates a sparse, noise-dominated grid.",
                cognitiveRef: "Pre-attentive: color (saturation)",
                ethicalRef: "Risk: Bin size choice"
            },
            heatmap: {
                name: "Heatmap",
                whenToUse: [
                    "Matrix data where rows, columns, and the intersection value are all meaningful",
                    "Large correlation matrices, confusion matrices, or co-occurrence tables",
                    "Pattern detection across two categorical dimensions where color gradient aids identification"
                ],
                whenNotToUse: [
                    "Precise value reading — color is one of the least accurately decoded channels for quantities",
                    "Diverging data without a meaningful midpoint — diverging color scales require a natural zero",
                    "Sequential data where order should be perceived as continuous rather than gridded"
                ],
                interpretationRisk: "Color scale choice determines which differences appear significant. A rainbow (jet) colormap creates false perceptual boundaries at transitions between hue bands; perceptually uniform colormaps (viridis, plasma) should be preferred.",
                cognitiveRef: "Pre-attentive: color hue/saturation",
                ethicalRef: "Risk: Rainbow colormap"
            }
        }
    },
    howIsItSpread: {
        intro1: "Distribution charts reveal the shape, spread, and center of a dataset — information that summary statistics like mean and standard deviation can entirely conceal. Francis Anscombe's famous 1973 quartet demonstrated this problem definitively: four datasets with <em>identical</em> means, variances, and correlation coefficients look radically different when plotted. The lesson is unambiguous: <strong>always visualize the underlying distribution before reporting any summary statistic</strong>. A mean of 7.5 ± 1.9 could describe a symmetric bell curve, a right-skewed distribution, or data that lies on a perfect line — the summary statistics alone cannot tell you which.",
        intro2: "The distribution chart family ranges from the familiar histogram to the statistically precise ECDF (Empirical Cumulative Distribution Function). Each form makes different trade-offs between analytical accuracy and audience accessibility. Histograms are easily understood but depend on a bin-width parameter that can hide or reveal bimodality at the analyst's discretion. Box plots are compact and allow group comparison but cannot reveal whether a distribution is bimodal, asymmetric, or concentrated at a few specific values. The choice of distribution chart should match the analytical question: showing shape requires histograms or violin plots; showing percentiles requires ECDFs; showing all raw data requires strip plots.",
        intro3: "The most consequential free parameter in distribution visualization is <strong>bin width for histograms</strong> and <strong>bandwidth for kernel density estimates (KDE)</strong>. These parameters are not derived from data — they are chosen by the analyst, and different choices can make the same dataset appear unimodal or bimodal, concentrated or spread out. A responsible distribution chart should show a range of bin widths or report the bandwidth explicitly. When data shows a suspicious \"smooth\" single peak, always check whether a narrower bandwidth would reveal multiple modes hiding beneath the smooth curve.",

        binWidthDemo: {
            title: "Bin width manipulation: same data, different shape",
            desc: "The underlying data is identical bimodal data. Narrow bins (left) reveal the two-peak structure. Wide bins (right) merge them into a single peak — hiding the bimodality entirely. Always request the full histogram with multiple bin widths when presented with a \"smooth\" distribution.",
            narrowLabel: "Narrow bins — bimodality visible",
            narrowNote: "10 bins",
            wideLabel: "Wide bins — bimodality hidden",
            wideNote: "5 bins"
        },

        accuracyChart: {
            title: "Distribution chart accuracy for conveying distributional shape",
            desc: "ECDF and strip plots are most accurate but require statistical literacy. Histograms balance accessibility with reasonable accuracy when bin width is appropriate. Box plots trade shape information for compactness — use them for comparison, not for characterizing individual distributions.",
            types: {
                ecdf: { name: "ECDF", note: "Bin-free, exact" },
                histogram: { name: "Histogram", note: "Bin-dependent" },
                violin: { name: "Violin (KDE)", note: "Bandwidth-dependent" },
                box: { name: "Box plot", note: "Hides shape" },
                strip: { name: "Strip plot", note: "Shows all points" }
            },
            label: "Perceptual accuracy for distributional shape"
        },

        shapeDemo: {
            title: "Revealing the Shape: Violin and Ridgeline alternatives",
            chartTitle: "The Danger of Hiding Shape",
            groupA: "Group A",
            groupB: "Group B",
            btnBoxplot: "Boxplot",
            btnViolin: "Violin",
            btnRidgeline: "Ridgeline",
            expBoxplot: "Both groups have the <strong>exact same box plot</strong> (same median, IQR, and range). A viewer would confidently assume the distributions are identical.",
            expViolin: "The <strong>Violin Plot</strong> reveals the truth: Group A is polarized (bimodal) while Group B is a normal bell curve. The box plot completely hid this crucial distinction.",
            expRidgeline: "The <strong>Ridgeline Plot</strong> is another excellent alternative, showing the density of groups while maintaining a clean, easily comparable baseline for each curve."
        },

        meanDemo: {
            title: "The Flaw of Averages",
            btnRemoveOutlier: "Remove the CEO",
            btnAddOutlier: "Add the CEO (Outlier)",
            medianLabel: "Median: $",
            meanLabel: "Mean: $",
            expOutlier: "When the CEO's $250k salary is added, the <strong>mean shifts dramatically</strong> to ${mean}k, which implies the \"average\" person makes ${mean}k. Notice how the <strong>median remains completely unchanged</strong> at $51k, accurately reflecting the typical worker's reality.",
            expNoOutlier: "In a symmetric distribution, the <strong>mean</strong> and <strong>median</strong> are nearly identical. Both accurately describe the \"typical\" value."
        },

        clevelandNote: "Distribution charts encode data through area and position — two encodings with different accuracy levels. Histograms (area) are less precisely decoded than ECDFs (position on a common scale), yet histograms are more intuitively understood by general audiences. Choose based on your audience's statistical literacy.",

        charts: {
            histogram: {
                name: "Histogram",
                whenToUse: [
                    "Showing the frequency distribution of a single continuous variable",
                    "Identifying modality (unimodal, bimodal), skewness, and outliers",
                    "Large datasets (> 30 observations) where individual point plotting is impractical"
                ],
                whenNotToUse: [
                    "Small datasets (< 20 points) — a strip plot or dot plot preserves more information",
                    "Comparing two or more distributions — overlapping histograms become visually complex",
                    "When exact values at individual observations need to be recoverable"
                ],
                interpretationRisk: "Bin width is a free parameter that dramatically shapes the perceived distribution. A narrow bin width produces a jagged, noisy histogram while a wide bin width can hide bimodality or outliers entirely.",
                cognitiveRef: "Pre-attentive: area (via height)",
                ethicalRef: "Risk: Bin width manipulation"
            },
            boxplot: {
                name: "Box Plot",
                whenToUse: [
                    "Compact comparison of distributional summaries across multiple groups",
                    "Highlighting median, quartiles, and outliers side by side",
                    "When a dashboard or report has limited space but group comparison is needed"
                ],
                whenNotToUse: [
                    "Small samples (< 15 per group) — box plots hide multi-modality and sample size",
                    "When the shape of the distribution (skew, peaks) is the primary message",
                    "Audiences unfamiliar with statistical quartile notation"
                ],
                interpretationRisk: "A symmetric box plot can describe both a uniform distribution and a bimodal one with the same quartile boundaries. Box plots are often used to imply normality in data that is actually multi-modal or highly skewed.",
                cognitiveRef: "Pre-attentive: length, position",
                ethicalRef: "Risk: Hidden bimodality"
            },
            violin: {
                name: "Violin Plot",
                whenToUse: [
                    "Showing both distributional shape and summary statistics for group comparisons",
                    "When bimodality or asymmetry within groups is part of the story",
                    "Medium-to-large samples (> 50 per group) where KDE estimation is meaningful"
                ],
                whenNotToUse: [
                    "Small samples — the KDE curve misrepresents distributions with few data points",
                    "Audiences who need to read precise values — violins are shape-focused",
                    "When the comparison group count exceeds 6 — violins become narrow and hard to read"
                ],
                interpretationRisk: "Kernel density estimation requires a bandwidth (smoothing parameter) choice. Over-smoothed violins hide peaks and bimodality; under-smoothed violins add spurious wiggles that look like real data features.",
                cognitiveRef: "Pre-attentive: shape, area",
                ethicalRef: "Risk: KDE bandwidth manipulation"
            },
            stripPlot: {
                name: "Strip Plot",
                whenToUse: [
                    "Small-to-medium datasets (< 200 per group) where showing every observation adds transparency",
                    "Supplement to a box plot or bar chart to reveal the underlying data",
                    "When checking for gaps, clusters, or unusual patterns is more important than summarizing"
                ],
                whenNotToUse: [
                    "Large datasets — overplotting makes the chart unreadable without jitter or transparency",
                    "When a clear summary statistic (mean, median) is the primary message",
                    "When exact horizontal position of points would be over-interpreted"
                ],
                interpretationRisk: "Random jitter prevents overplotting but creates the false impression that horizontal position encodes meaning. Readers may infer sub-group structure or trends from jitter noise.",
                cognitiveRef: "Pre-attentive: position",
                ethicalRef: "Risk: Jitter misinterpretation"
            },
            rugPlot: {
                name: "Rug Plot",
                whenToUse: [
                    "Augmenting a density curve or scatter plot with individual observation locations",
                    "Showing the actual data density along an axis without obscuring the primary chart",
                    "Small-to-medium datasets where the density curve alone would hide important point clustering"
                ],
                whenNotToUse: [
                    "Large datasets (> 500 points) — rug marks stack invisibly along the axis",
                    "As a standalone chart — rug plots are supplementary annotations, not primary displays",
                    "When the exact position of individual points has low analytical value"
                ],
                interpretationRisk: "Rug plots appear along the axis margin and can be mistaken for axis ticks. Dense rugs create the impression of a continuous region of data when the points are actually clustered at a few discrete values.",
                cognitiveRef: "Pre-attentive: position, density"
            },
            density: {
                name: "Density Plot (KDE)",
                whenToUse: [
                    "Smooth comparison of two or three distributions on the same axis",
                    "When the continuous shape of the distribution matters more than bin counts",
                    "Overlaying multiple groups where filled areas would obstruct each other"
                ],
                whenNotToUse: [
                    "Very small samples — KDE implies a continuous distribution from too few observations",
                    "Data with hard boundaries (e.g., 0–100 scores) where the KDE extends beyond bounds",
                    "Discrete count data that a histogram would represent more honestly"
                ],
                interpretationRisk: "KDE smooths over actual data gaps and extreme values. A density curve between 0 and 100 for a dataset with no values below 30 will still show a tapering tail toward 0, implying values that don't exist.",
                cognitiveRef: "Pre-attentive: shape, slope",
                ethicalRef: "Risk: KDE boundary artifacts"
            },
            ecdf: {
                name: "ECDF",
                whenToUse: [
                    "Comparing full cumulative distributions of two or more groups without binning choices",
                    "Statistical analysis where percentile positions need to be read directly",
                    "When a bin-free, assumption-free view of distribution is required"
                ],
                whenNotToUse: [
                    "General audiences unfamiliar with cumulative probability — the \"S-curve\" is counterintuitive",
                    "When the density or shape of the distribution (rather than cumulative probabilities) is the message",
                    "Presentations where the focus is on extremes or outliers — a box plot is more intuitive"
                ],
                interpretationRisk: "The step function is read top-to-bottom as a probability that a value is \"less than or equal to X.\" Readers unfamiliar with CDFs frequently read the height at a given x-value as a density or frequency, not a cumulative probability.",
                cognitiveRef: "Pre-attentive: slope, position",
                ethicalRef: "Risk: CDF vs. PDF confusion"
            }
        }
    },
    areWeGrowing: {
        intro1: "Time-series charts encode how quantitative variables change across an ordered temporal dimension. The line chart is the canonical form because it exploits the pre-attentive attribute of <strong>slope</strong>.",
        bankingRule: "The Banking Rule",
        bankingRuleDesc: "Maximize slope discrimination by banking segments to an average of <strong>45°</strong>. This prevents data \"spikes\" from appearing purely decorative and makes trends analytically legible.",
        choicesTitle: "Choosing the Right Form",
        choicesDesc: "Line charts allow position-based decoding — the most accurate perceptual channel. Use area charts only when the sum of parts is the primary story, and strictly avoid decorative \"wiggles\" in professional dashboards.",
        clevelandNote: "Slope perception is strongest when line angles fall between 30° and 60° from horizontal. The 'banking to 45°' principle (adjusting aspect ratio so the average slope is approximately 45°) maximizes slope discrimination.",

        bankingDemo: {
            title: "Aspect Ratio Banking",
            desc: "Cleveland's principle: bank to 45° for optimal slope perception.",
            btnNarrow: "Narrow",
            btnBanked: "Banked (45°)",
            label: "SLOPE PERCEPTION TEST",
            noteNarrow: "In this narrow layout, the slopes appear exaggeratedly steep. It's harder to distinguish between 'fast growth' and 'very fast growth' when everything looks like a vertical spike.",
            noteBanked: "Banked to 45°: When the average slope is roughly 45°, the human eye is most efficient at detecting small differences in the rate of change between segments.",
            amplified: "AMPLIFIED VARIANCE",
            optimal: "OPTIMAL DISCRIMINATION",
            check1: "✔ Avg slope ≈ 45°",
            check2: "✔ Precise comparison",
            warn1: "⚠ Slopes too steep",
            warn2: "⚠ False drama"
        },

        accuracyChart: {
            title: "Accuracy by Variant",
            desc: "Perceptual complexity vs decoding accuracy.",
            label: "PERCEPTUAL ACCURACY (%)",
            note: "Line charts enable position-based decoding, the most accurate channel. As we move down to stacked areas and streamgraphs, we force the audience to use area-based estimation, which has a much higher error rate.",
            types: {
                line: "Line chart",
                area: "Area chart",
                stackedArea: "Stacked area",
                streamgraph: "Streamgraph",
                bump: "Bump chart"
            }
        },

        charts: {
            line: {
                name: "Line Chart",
                whenToUse: [
                    "Continuous temporal data where each time point is connected to the next",
                    "Showing trends, momentum, and rate of change over time",
                    "One to four series that need to be compared across the same time axis"
                ],
                whenNotToUse: [
                    "Discrete, unordered categories — use a bar chart where connection implies continuity",
                    "When individual data points need emphasis over the trend — use a dot plot or connected scatter",
                    "Sparse data where interpolation between points would be misleading"
                ],
                interpretationRisk: "Connecting points with a line implies that interpolated values between observations are valid. When data is sampled infrequently, a smooth line suggests false precision about what happened between measurements.",
                cognitiveRef: "Pre-attentive: slope, direction",
                ethicalRef: "Risk: Implied interpolation"
            },
            multiLine: {
                name: "Multi-Line",
                whenToUse: [
                    "Comparing trends of 2–5 related series on the same scale over time",
                    "When relative ordering and crossover points between series matter",
                    "Longitudinal panel data where individual trajectories are the story"
                ],
                whenNotToUse: [
                    "More than 5–6 lines — lines cross and create a \"spaghetti chart\" that's unreadable",
                    "Series on dramatically different scales — a normalized or indexed view is needed",
                    "When the focus is on a single series — a simple line chart with annotation is clearer"
                ],
                interpretationRisk: "Color is the primary differentiator. With more than 5 lines, colorblind-safe palettes run out of distinguishable hues, and relying on color alone excludes a significant portion of the audience.",
                cognitiveRef: "Pre-attentive: color, slope",
                ethicalRef: "Risk: Color accessibility"
            },
            area: {
                name: "Area Chart",
                whenToUse: [
                    "Showing magnitude of change over time when the filled area communicates cumulative volume",
                    "When the absolute quantity at each point matters as much as the trend",
                    "Comparing a single series to a reference band or zero baseline"
                ],
                whenNotToUse: [
                    "Multiple overlapping series — filled areas obscure each other; use lines instead",
                    "When precise reading of values at individual points is required",
                    "Data with sharp peaks and valleys where the filled area creates ambiguous shapes"
                ],
                interpretationRisk: "The shaded area encodes the same information as the line but adds visual weight. Readers often interpret a larger filled area as representing \"more total quantity\" — this is only valid if the y-axis starts at zero.",
                cognitiveRef: "Pre-attentive: area (weak)",
                ethicalRef: "Risk: Area quantity confusion"
            },
            stackedArea: {
                name: "Stacked Area",
                whenToUse: [
                    "Showing how multiple components contribute to a changing total over time",
                    "When both individual series trends and the total are important",
                    "3–5 series with consistent, non-volatile patterns"
                ],
                whenNotToUse: [
                    "Series with high volatility — ripple effects between layers obscure individual trends",
                    "When series cross each other over time — consider small multiples instead",
                    "More than 5 layers — the upper layers become impossible to read accurately"
                ],
                interpretationRisk: "Upper layers in a stacked area chart use a moving, non-zero baseline. A layer that appears to grow steeply may actually be flat — it's simply being pushed up by growth in the layers below it.",
                cognitiveRef: "Pre-attentive: area",
                ethicalRef: "Risk: Floating baseline"
            },
            step: {
                name: "Step Chart",
                whenToUse: [
                    "Data that changes discretely rather than continuously (prices, policy rates, software versions)",
                    "When the value stays constant between observed change points",
                    "Process or event data where the transition is instantaneous"
                ],
                whenNotToUse: [
                    "Naturally continuous data — a regular line chart better represents smooth change",
                    "Very high-frequency data where step transitions become visually indistinct",
                    "When the timing of transitions is ambiguous or the data is noisy"
                ],
                interpretationRisk: "The horizontal segments imply that the exact value is known for every point in time between steps. For infrequently sampled data, this may overstate confidence in between-step values.",
                cognitiveRef: "Pre-attentive: slope (zero vs. non-zero)"
            },
            streamgraph: {
                name: "Streamgraph",
                whenToUse: [
                    "Artistic or editorial presentations of how multiple categories flow over time",
                    "Showing organic, wave-like trends where exact values are secondary to the visual narrative",
                    "Large datasets with many series where overlapping is unavoidable"
                ],
                whenNotToUse: [
                    "When precise values or baselines need to be read — the wiggle offset makes this impossible",
                    "Analytical dashboards or reports where accuracy is paramount",
                    "Fewer than 5 series — a stacked area chart communicates the same with more clarity"
                ],
                interpretationRisk: "The wiggle-offset baseline makes it impossible to accurately read individual series values. Streamgraphs are frequently used to make data look more impressive or \"alive\" at the expense of analytical accuracy.",
                cognitiveRef: "Pre-attentive: area (gestalt)",
                ethicalRef: "Risk: Decorative over informative"
            },
            bump: {
                name: "Bump Chart",
                whenToUse: [
                    "Tracking changes in rank or relative position over time for a small set of entities",
                    "League tables, rankings, or competitive standings across discrete time points",
                    "When the crossing and overtaking of entities is the main narrative"
                ],
                whenNotToUse: [
                    "More than 8–10 entities — line crossings become a tangled web",
                    "When absolute values matter — bump charts discard magnitude information entirely",
                    "Continuous time data — bump charts are designed for discrete ranked snapshots"
                ],
                interpretationRisk: "Bump charts show only ordinal rank, not the magnitude of the underlying metric. A team that moves from rank 1 to rank 2 by a tiny margin and one that drops 50 points look identical if they both drop one rank.",
                cognitiveRef: "Pre-attentive: slope, color",
                ethicalRef: "Risk: Magnitude loss"
            },
            sparkline: {
                name: "Sparkline",
                whenToUse: [
                    "Embedding trend indicators inline with text, tables, or dashboards",
                    "When the shape of the trend matters more than individual data values",
                    "High-density dashboards displaying many metrics simultaneously"
                ],
                whenNotToUse: [
                    "When specific values need to be read — sparklines have no axes or labels",
                    "Comparisons between sparklines with different scales — the shapes will mislead",
                    "Standalone charts — sparklines are designed as contextual micro-visualizations"
                ],
                interpretationRisk: "Sparklines auto-scale to fill available space. Two sparklines showing a 5% vs. 50% change can appear identical in shape if the axis scaling is independent, leading readers to equate very different magnitudes.",
                cognitiveRef: "Pre-attentive: slope",
                ethicalRef: "Risk: Scale normalization"
            },
            candlestick: {
                name: "Candlestick",
                whenToUse: [
                    "Financial data showing open, high, low, and close prices for a time period",
                    "When the intra-period price range and direction of movement both matter",
                    "Audiences familiar with financial charting conventions"
                ],
                whenNotToUse: [
                    "Non-financial data — the OHLC encoding is a domain-specific convention",
                    "Long date ranges where individual candles become too small to distinguish",
                    "When only closing prices are relevant — a simple line chart is cleaner"
                ],
                interpretationRisk: "The green/red color convention encodes gain/loss relative to the previous close, but many implementations color against the same-period open. These conventions are not universal and should always be explicitly labeled.",
                cognitiveRef: "Pre-attentive: color (hue)",
                ethicalRef: "Risk: Ambiguous color convention"
            },
            ohlc: {
                name: "OHLC Chart",
                whenToUse: [
                    "Financial data for technically sophisticated audiences who prefer OHLC to candlesticks",
                    "When print or greyscale rendering makes color-dependent candlesticks impractical",
                    "Compact display of price range data where candle bodies would be too wide"
                ],
                whenNotToUse: [
                    "Non-financial audiences — the tick-and-stem encoding is highly domain-specific",
                    "Very short time periods where individual bars have no visual separation",
                    "When simpler encoding (close price only) is sufficient for the decision at hand"
                ],
                interpretationRisk: "OHLC bars encode four values in a single glyph using position, length, and tick direction. Readers new to the format frequently misinterpret the opening tick as the low or the closing tick as the high.",
                cognitiveRef: "Pre-attentive: position",
                ethicalRef: "Risk: Glyph misinterpretation"
            }
        }
    },
    whoIsWinning: {
        intro1: "Comparison charts encode quantitative differences between discrete categories. William Cleveland and Robert McGill's landmark 1984 study established a perceptual accuracy hierarchy for visual encodings — ranking them by how precisely humans can decode the magnitude differences they represent. <strong>Position on a common scale</strong> (the foundation of bar charts) ranked first with approximately 95% accuracy, while angle (pie charts) ranked 5th at ~55% and area (treemaps, bubble charts) ranked 6th at ~42%. This hierarchy is not aesthetic preference — it was empirically validated through controlled experiments.",
        intro2: "The practical implications are significant. When the goal is comparison — \"which category is larger, and by how much?\" — bar charts on a shared baseline are the most perceptually efficient choice. The moment you deviate from position-on-common-scale (by stacking bars, using pie slices, or switching to bubble size), you introduce perceptual error. Sometimes this tradeoff is worth it for other reasons (part-to-whole relationship, spatial constraints, aesthetic context) but it should always be a conscious choice, not a default.",
        intro3: "Beyond the encoding channel, comparison chart accuracy is heavily influenced by the y-axis baseline. A bar chart's entire communicative power rests on the assumption that bar height is proportional to value — an assumption that requires the y-axis to start at zero. Truncating the axis to start above zero destroys this proportionality and turns the bars into a position-based encoding instead of a length-based one, effectively degrading accuracy to Cleveland & McGill's rank 2. This is why axis truncation is one of the most impactful single design decisions in comparison charts.",

        accuracyTitle: "Cleveland & McGill (1984): visual encoding accuracy hierarchy",
        accuracyNote: "This ranking is empirical, not aesthetic. For comparison tasks, always prefer encodings in the green zone (rank 1–3). Move to lower-ranked encodings only when other design constraints require it.",
        perceptualAccuracyLbl: "Perceptual accuracy (Cleveland & McGill, 1984)",

        designTitle: "Design decisions that most affect comparison accuracy",
        designDecision1Name: "Y-axis baseline",
        designDecision1Honest: "Start at zero — bar heights directly encode values",
        designDecision1Risk: "Truncation makes bars appear proportionally larger/smaller than actual values",
        designDecision2Name: "Sort order",
        designDecision2Honest: "Sort by value (descending) — highest priority comparison goes to the best spatial position",
        designDecision2Risk: "Alphabetical or arbitrary sorting buries the most important comparisons",
        designDecision3Name: "Bar width / spacing",
        designDecision3Honest: "Consistent widths — visual area does not add spurious information",
        designDecision3Risk: "Variable-width bars introduce an area encoding that conflicts with height encoding",
        designDecision4Name: "Color use",
        designDecision4Honest: "Single brand color — color is not an additional encoding channel",
        designDecision4Risk: "Multi-color bars hijack pre-attentive attention to specific bars before the viewer reads values",

        dumbbellLabTitle: "Alternative to Grouped Bars: The Dumbbell Chart",
        dumbbellChartTitle: "Adoption Rate: 2023 vs 2024",
        dumbbellChartDesc: "How did each region change year-over-year?",
        btnSwitchGrouped: "Switch to Grouped Bars",
        btnSwitchDumbbell: "Switch to Dumbbell Chart",

        dumbbellExp: "The <strong>Dumbbell chart</strong> encodes the <em>change</em> as the primary visual element (the connecting line). The colored lines instantly show which regions improved (green) or declined (red), and the length of the line shows the magnitude of the change.",
        groupedExp: "The <strong>Grouped Bar chart</strong> forces the viewer to jump back and forth between two bars to calculate the difference mentally. It is harder to quickly assess who improved the most or who declined.",

        clevelandNote: "Position along a common scale is the most accurately decoded visual encoding (rank 1). Stacked bars force readers to compare floating segments — only the bottom segment benefits from a common baseline, making all other segments rank 5 or lower in perceptual accuracy.",

        charts: {
            verticalBar: {
                name: "Vertical Bar",
                whenToUse: [
                    "Comparing discrete categories with a common baseline",
                    "Showing counts, totals, or proportions across a small set of groups (≤ 12)",
                    "When category labels are short enough to fit beneath each bar"
                ],
                whenNotToUse: [
                    "Many categories (> 12) — switch to horizontal bars",
                    "Continuous data — use a histogram instead",
                    "When the zero baseline is not meaningful or would compress the interesting range"
                ],
                interpretationRisk: "Truncating the y-axis to start above zero exaggerates differences. A bar whose top is twice as high implies exactly double the value — this logic breaks if the axis doesn't start at zero.",
                cognitiveRef: "Pre-attentive: length",
                ethicalRef: "Risk: Truncated axis"
            },
            horizontalBar: {
                name: "Horizontal Bar",
                whenToUse: [
                    "Long category labels that would be cramped or angled under vertical bars",
                    "Ranked data where the natural reading direction is top-to-bottom",
                    "More than 8–12 categories"
                ],
                whenNotToUse: [
                    "Time-series data — time flows left-to-right by convention",
                    "When vertical space is constrained and many categories must be shown",
                    "Negative values that need a centered axis — dumbbell or diverging bar is clearer"
                ],
                interpretationRisk: "Sorting order dramatically changes perceived rank importance. An alphabetically sorted horizontal bar can make an unimportant category appear prominent simply by its position.",
                cognitiveRef: "Pre-attentive: length",
                ethicalRef: "Risk: Misleading sort order"
            },
            groupedBar: {
                name: "Grouped Bar",
                whenToUse: [
                    "Comparing values across two or three sub-groups within each category",
                    "When absolute magnitudes of each sub-group matter more than the part-to-whole relationship",
                    "Side-by-side comparison of fewer than 4 series"
                ],
                whenNotToUse: [
                    "More than 3–4 groups — visual clutter makes comparison difficult",
                    "When part-to-whole proportions are the main message — use stacked or 100% stacked bars",
                    "When the series have very different scales — dual-axis charts introduce their own risks"
                ],
                interpretationRisk: "With 4+ groups, grouped bars become a visual \"comb\" that's hard to scan. The eye compares adjacent bars easily but struggles to compare bars of the same series across categories.",
                cognitiveRef: "Pre-attentive: length, color",
                ethicalRef: "Risk: Cognitive overload"
            },
            stackedBar: {
                name: "Stacked Bar",
                whenToUse: [
                    "Showing part-to-whole composition while also conveying the total magnitude",
                    "When the bottom segment is the primary comparison focus (it has a common baseline)",
                    "Two to five segments per bar"
                ],
                whenNotToUse: [
                    "When each segment needs precise comparison — only the bottom segment has a common baseline",
                    "More than five segments — the middle layers become impossible to decode accurately",
                    "When totals are irrelevant and only proportions matter — use 100% stacked instead"
                ],
                interpretationRisk: "Middle and upper segments float above different baselines, making their comparison across bars highly inaccurate. Cleveland & McGill showed this is one of the weakest visual encodings for comparison tasks.",
                cognitiveRef: "Pre-attentive: length (bottom only)",
                ethicalRef: "Risk: Floating baseline"
            },
            stackedBar100: {
                name: "100% Stacked Bar",
                whenToUse: [
                    "Comparing proportional composition across categories when absolute totals differ or are unimportant",
                    "Showing how the mix of components changes across groups",
                    "When all segments must add to 100% and that relationship is meaningful"
                ],
                whenNotToUse: [
                    "When absolute magnitudes matter — the normalization hides real differences in total scale",
                    "More than 5 segments — interior proportions become unreadable",
                    "Single-category data — a pie chart communicates the same with less visual work"
                ],
                interpretationRisk: "Normalization can hide dramatic differences in total scale. A category with 10 responses and one with 10,000 will look identical if their proportions match — always annotate the underlying totals.",
                cognitiveRef: "Pre-attentive: length (relative)",
                ethicalRef: "Risk: Hidden totals"
            },
            lollipop: {
                name: "Lollipop",
                whenToUse: [
                    "Same use cases as a bar chart but when the chart feels too heavy or dense",
                    "Many categories where filled bars create a visually noisy block",
                    "Emphasizing the endpoint value rather than the filled area"
                ],
                whenNotToUse: [
                    "Very small values — the thin stem becomes hard to see at low magnitudes",
                    "When negative and positive values exist on the same axis without a reference line",
                    "Dense multi-series comparisons — the stems overlap and obscure each other"
                ],
                interpretationRisk: "The dot draws attention to the absolute value while the stem encodes magnitude. If the baseline is not zero, readers may misread the dot position as a relative value rather than an absolute one.",
                cognitiveRef: "Pre-attentive: position"
            },
            dotPlot: {
                name: "Dot Plot",
                whenToUse: [
                    "Showing the distribution of individual data points within groups",
                    "Small-to-medium datasets where showing every point adds value",
                    "When you want to expose gaps, clusters, and outliers without aggregating"
                ],
                whenNotToUse: [
                    "Large datasets (> 200 points per group) — dots overlap into indecipherable blobs",
                    "When a summary statistic (mean, median) is the main message — use a bar or boxplot",
                    "Nominal categories with no meaningful point comparison across groups"
                ],
                interpretationRisk: "Jittering (adding random noise to reduce overlap) can imply precision that doesn't exist. Readers may interpret the horizontal position of jittered dots as carrying meaning.",
                cognitiveRef: "Pre-attentive: position",
                ethicalRef: "Risk: Jitter misread"
            },
            bullet: {
                name: "Bullet Chart",
                whenToUse: [
                    "KPI dashboards that need to show actual vs. target and qualitative performance bands in minimal space",
                    "Replacing speedometer/gauge charts — bullet charts use space more efficiently",
                    "When three performance zones (poor/acceptable/good) need to be visible simultaneously"
                ],
                whenNotToUse: [
                    "Audiences unfamiliar with the bullet chart format — always include a legend",
                    "More than three performance zones — decoding becomes too complex",
                    "When trend over time matters — bullet charts are point-in-time snapshots"
                ],
                interpretationRisk: "The three overlapping layers (performance bands, actual value, target marker) require explanation. Unfamiliar readers commonly misread the dark bar as the target or confuse the comparative bar for the actual value.",
                cognitiveRef: "Pre-attentive: length, position",
                ethicalRef: "Risk: Decoding complexity"
            },
            dumbbell: {
                name: "Dumbbell (Gap) Chart",
                whenToUse: [
                    "Showing the change or gap between two values for the same entity",
                    "Before/after comparisons across multiple items simultaneously",
                    "When the magnitude of the gap is more important than the absolute values"
                ],
                whenNotToUse: [
                    "More than two time points — a slope graph or multi-line chart is clearer",
                    "When absolute position rather than the gap size is the main message",
                    "Overlapping ranges that make the connecting line ambiguous"
                ],
                interpretationRisk: "Color coding the direction of change (increase/decrease) is essential but can encode editorial bias. The choice of which endpoint is colored \"good\" vs. \"bad\" reflects a value judgment that should be made explicit.",
                cognitiveRef: "Pre-attentive: length (gap), color",
                ethicalRef: "Risk: Color bias"
            },
            pareto: {
                name: "Pareto Chart",
                whenToUse: [
                    "Quality and process improvement: identifying the vital few causes that drive most of the effect",
                    "Prioritization when resources are limited and impact must be maximized",
                    "When both frequency and cumulative percentage are needed together"
                ],
                whenNotToUse: [
                    "When all categories have roughly equal frequency — the \"80/20 shape\" won't appear",
                    "Purely exploratory data analysis — the sorted order is prescriptive, not descriptive",
                    "When the category ordering should reflect natural sequence (e.g., time) not frequency rank"
                ],
                interpretationRisk: "The dual-axis design (counts left, cumulative % right) requires careful scale alignment. If the right axis does not end at 100% aligned with the full height, the cumulative line appears to show a different trend than it actually represents.",
                cognitiveRef: "Pre-attentive: length, position",
                ethicalRef: "Risk: Dual-axis misalignment"
            }
        },
        hierarchy: {
            enc1name: "Position (common scale)",
            enc1ex: "Bar chart, dot plot",
            enc2name: "Position (non-aligned)",
            enc2ex: "Stacked bar segments",
            enc3name: "Length",
            enc3ex: "Bar chart",
            enc4name: "Direction / slope",
            enc4ex: "Line chart",
            enc5name: "Angle",
            enc5ex: "Pie chart",
            enc6name: "Area",
            enc6ex: "Treemap, bubble",
            enc7name: "Volume",
            enc7ex: "3D chart",
            enc8name: "Color saturation",
            enc8ex: "Heatmap (single hue)",
        }
    }
};
