export const section07 = {
    "challenger": {
        "chart": {
            "title": "The chart that should have been presented \u2014 temperature vs. O-ring damage (all 23 launches)",
            "dangerZone": "Danger zone",
            "launchDay": "Launch day: 26\u00b0F",
            "trendAnnotation": "As temperature rises, damage approaches zero",
            "yAxis": "O-ring damage",
            "legend": {
                "noDamage": "No damage",
                "damage": "O-ring damage recorded"
            }
        },
        "theory": {
            "title": "What Went Wrong: The Wrong Chart for the Wrong Question",
            "subtitle": "Edward Tufte's Visual Explanations (1997) \u2014 Challenger Case Study",
            "explanation": "Tufte's analysis showed that engineers sorted their O-ring damage data by launch order \u2014 not by temperature. This completely hid the critical variable. When all 23 launches are plotted correctly (temperature on X, damage on Y), the correlation is unmistakable. Instead, they presented a chart that made the pattern invisible. High noise-to-signal obscured the one variable that mattered."
        },
        "wrongChart": {
            "title": "What the engineers showed",
            "items": {
                "0": "Data sorted by chronological launch order \u2014 hiding temperature patterns.",
                "1": "Only damaged O-ring incidents shown \u2014 zero-damage launches omitted.",
                "2": "Temperature not on any axis \u2014 buried in footnotes."
            }
        },
        "rightChart": {
            "title": "What Tufte showed was needed",
            "items": {
                "0": "Temperature on the X-axis, damage on Y \u2014 instantly revealing the correlation.",
                "1": "All 24 launches included \u2014 the complete comparative picture.",
                "2": "26\u00b0F clearly marked \u2014 far outside the range of any previous launch."
            }
        },
        "intro1": "On January 27, 1986, the night before the Space Shuttle Challenger launch, NASA engineers at Morton Thiokol presented data showing that cold temperatures increased the risk of O-ring failure. Seven astronauts' lives depended on that presentation. The decision was made to launch. Challenger broke apart 73 seconds after takeoff.",
        "intro2": "The data was correct. The chart was wrong.",
        "takeaway": {
            "title": "The lesson for every professional",
            "desc": "The engineers had the right data, the right concern, and the right conclusion \u2014 but the wrong chart. A visualization that doesn't make the critical variable immediately visible can be more dangerous than no chart at all. Before you present: ask yourself, \"Does this chart answer the decision-maker's actual question?\""
        },
        "crossRefs": {
            "0": {
                "label": "Spotting the Signal"
            },
            "1": {
                "label": "Signal vs Noise"
            }
        }
    },
    "covidDashboard": {
        "chart": {
            "countries": {
                "0": "US",
                "1": "Brazil",
                "2": "India",
                "3": "UK",
                "4": "Germany",
                "5": "S. Korea"
            }
        },
        "intro": "During the COVID-19 pandemic, the same underlying data was visualized in dozens of different ways \u2014 producing dramatically different narratives. Some countries looked catastrophically worse than others depending on whether you saw absolute cases, per-capita rates, or rolling averages. The data didn't change. The chart did.",
        "theory": {
            "title": "The Normalization Problem",
            "subtitle": "Eurostat Principle of Comparability + Darrell Huff's 'How to Lie with Statistics' (1954)",
            "explanation": "Absolute numbers favor populous nations; per-capita rates favor low-density ones. Neither is 'correct' in isolation \u2014 they answer different questions. The ethical responsibility of a chart presenter is to show the metric that corresponds to the decision being made, and to make the normalization choice explicit and visible."
        },
        "demo": {
            "descCapita": "On a per-capita basis, India \u2014 one of the countries that appeared worst by absolute cases \u2014 ranks among the lowest. The US and UK have significantly higher burden per person.",
            "descAbsolute": "On absolute counts, the US, India, and Brazil appear as the world's worst-hit nations \u2014 which shaped early international aid decisions and travel restrictions.",
            "btnAbsolute": "Switch to absolute",
            "btnCapita": "Switch to per-capita",
            "titleAbsolute": "Total cumulative cases (millions)",
            "titleCapita": "Per-capita cases (per 100 people)"
        },
        "dashboardChoices": {
            "title": "The four dashboard choices that changed public perception",
            "items": {
                "0": {
                    "choice": "Absolute vs. per-capita cases",
                    "impact": "Made populous countries look worse regardless of actual severity."
                },
                "1": {
                    "choice": "Cumulative vs. daily new cases",
                    "impact": "Cumulative charts never declined \u2014 creating permanent visual alarm even during genuine recovery."
                },
                "2": {
                    "choice": "7-day rolling average vs. raw daily count",
                    "impact": "Raw counts showed jagged spikes; smoothing hid early warning signals."
                },
                "3": {
                    "choice": "Log scale vs. linear scale",
                    "impact": "Log scale showed parallel trajectories between countries; linear scale showed explosive divergence."
                }
            }
        },
        "crossRefs": {
            "0": {
                "label": "The 3-Color Rule"
            },
            "1": {
                "label": "Ethical Level 1: Clarity"
            }
        },
        "takeaway": {
            "title": "The professional obligation",
            "desc": "Every chart embeds decisions: what to show, what to normalize by, which time range to use, where to start the axis. These decisions shape perception before the viewer reads a single data point. Responsible presenters make these choices visible \u2014 in subtitles, footnotes, and in the way they verbally introduce the chart."
        }
    },
    "boardroom": {
        "chart": {
            "metrics": {
                "0": {
                    "metric": "Revenue forecast (yr 1)",
                    "unit": "$M"
                },
                "1": {
                    "metric": "Time to breakeven",
                    "unit": " mo"
                },
                "2": {
                    "metric": "Market share target",
                    "unit": "%"
                },
                "3": {
                    "metric": "Customer acq. cost",
                    "unit": "$"
                }
            },
            "title": "How the forecast changed when the chart was restructured",
            "before": "Before: {val}{unit}",
            "after": "After: {val}{unit}",
            "legend": {
                "initial": "Initial projection",
                "restated": "Restated projection"
            }
        },
        "purpleCow": {
            "labels": {
                "0": "Platform",
                "1": "Services",
                "2": "Data API",
                "3": "Hardware",
                "4": "Consulting"
            },
            "title": "The \"Purple Cow\" Effect",
            "descRadial": {
                "title": "Striking, Memorable, Different",
                "body": "The exact same data presented in a radial or 'Nightingale Rose' format. While Cleveland and McGill proved that radial charts are mathematically harder to decode accurately, Seth Godin notes that to be effective, you must first be noticed. A 'Purple Cow' chart commands attention in a 50-slide deck of boring bar charts."
            },
            "descStandard": {
                "title": "Standard, Safe, Invisible",
                "body": "This is the default, mathematically correct way to show the data. It is safe. It is also completely forgettable. If you are Slide #42 in a long boardroom meeting, a standard bar chart fails at the first requirement of communication: getting the audience to look at the screen."
            },
            "btnRadial": "Show Radial Chart (Purple Cow)",
            "btnStandard": "Show Standard Chart"
        },
        "intro": "In 2019, a growth-stage SaaS company presented to its board of directors seeking Series B funding. The first presentation was rejected \u2014 not because the business metrics were bad, but because the charts made them look uncertain and scattered. Three weeks later, the exact same data, restructured with Power Titles and a clear decision framing, was approved. No numbers changed.",
        "theory": {
            "title": "Framing and Prospect Theory",
            "subtitle": "Kahneman & Tversky's Prospect Theory (1979) + Framing Effect",
            "explanation": "People respond differently to the same information depending on how it is framed. 'We lost $400K' and 'We are $400K behind a plan that grows 4\u00d7 by Year 3' are mathematically identical \u2014 but produce different emotional and cognitive responses. The second frame activates opportunity orientation; the first activates loss aversion. Charts that frame data correctly do not change the numbers; they change the question the decision-maker is answering."
        },
        "changes": {
            "title": "What changed between the two versions",
            "col1": "Version 1 (rejected)",
            "col2": "Version 2 (approved)",
            "items": {
                "0": {
                    "v1": "Slide title: \"Q3 Performance\"",
                    "v2": "Slide title: \"Revenue is 15% behind plan \u2014 and recoverable by Q1\""
                },
                "1": {
                    "v1": "12-series chart with quarterly breakdown by product line",
                    "v2": "Single annotated line chart showing the gap and the recovery curve"
                },
                "2": {
                    "v1": "Buried takeaway in slide 14 closing thoughts",
                    "v2": "Action framed as first bullet: \"$4M bridge request enables breakeven by Month 18\""
                },
                "3": {
                    "v1": "Descriptive axis: \"Revenue USD 000s\"",
                    "v2": "Annotated: \"Target\" reference line, current position labeled, gap labeled \"$1.2M\""
                }
            }
        },
        "crossRefs": {
            "0": {
                "label": "Power Titles"
            },
            "1": {
                "label": "Crafting the \"So What\""
            }
        },
        "takeaway": {
            "title": "Why this matters beyond fundraising",
            "desc": "Every internal budget request, project approval, and hiring decision is a form of fundraising. You are asking someone to allocate scarce resources based on the picture you paint with data. The chart that makes the decision obvious will always outperform the chart that makes the decision possible."
        }
    },
    "badChart": {
        "charts": {
            "truncated": {
                "name": "The Truncated Axis",
                "flaw": "Y-axis starts at 96% instead of 0%, making a 1% difference look like a 4\u00d7 gap.",
                "why": "Exploits pre-attentive length perception. The bar that is 4\u00d7 taller appears to represent 4\u00d7 the value.",
                "fix": "Always start bar chart Y-axes at zero. Use annotations if you need to highlight a small difference within a narrow range."
            },
            "area": {
                "name": "The Irrelevant Area Explosion",
                "flaw": "A circle's area is scaled to a value, but area perception is the weakest visual encoding.",
                "why": "Cleveland & McGill (1984): area is rank 6 of 8 in perceptual accuracy. A circle that is 2\u00d7 the area appears ~1.4\u00d7 larger, not 2\u00d7 larger.",
                "fix": "Use length (bar chart) instead of area for quantity comparison. Reserve area charts for geographic maps where spatial area carries meaning."
            },
            "3d": {
                "name": "The 3D Perspective Trap",
                "flaw": "3D perspective causes rear bars to appear shorter and angles to distort proportional reading.",
                "why": "Perspective foreshortening applies non-linear transformations to length \u2014 the primary channel for bar charts. Bars at the back of a 3D chart appear shorter than identical bars in the front.",
                "fix": "Never use 3D for data charts. Dimensionality adds cognitive load with zero informational value."
            },
            "pie": {
                "name": "The 11-Slice Pie Chart",
                "flaw": "A pie chart with 11 slices forces angle comparison \u2014 the second-weakest encoding after volume.",
                "why": "Humans cannot accurately compare angles for slices separated by other slices. The same data in a sorted horizontal bar chart would be decoded in under 2 seconds; the pie requires 8\u201310 seconds of scanning.",
                "fix": "Use a sorted horizontal bar chart for category comparison. Reserve pie charts for 2\u20133 segment share comparisons where the part-to-whole relationship is the only message."
            }
        },
        "truncated": {
            "axisStarts": "Y-axis starts at:",
            "descTruncated": "The bars look dramatically different. But the actual difference is only 1.7 percentage points.",
            "descHonest": "Starting at zero shows the truth: all bars are nearly identical.",
            "btnHonest": "0 (honest)",
            "btnTruncated": "96 (truncated)"
        },
        "area": {
            "countryA": "Country A",
            "countryB": "Country B",
            "countryC": "Country C",
            "description": "When radius is used directly (left), Country C looks 4\u00d7 bigger than Country A, but the actual difference should only appear 4\u00d7 in area \u2014 which is half the visual size. The correct version (right) shows the true 4\u00d7 relationship.",
            "correctLabel": "Correct (by area)",
            "wrongLabel": "Wrong (by radius)"
        },
        "3d": {
            "description": "All four bars represent nearly identical values (48\u201351). The 3D perspective makes Q1 appear significantly shorter than Q4 \u2014 a visual lie created entirely by angle, not data.",
            "labels": {
                "0": "Q1",
                "1": "Q2",
                "2": "Q3",
                "3": "Q4"
            }
        },
        "pie": {
            "pieLabel": "11-slice pie (weak)",
            "barLabel": "Sorted bar chart (clear)",
            "description": "The pie makes it nearly impossible to compare slices G\u2013K. The sorted bar chart makes rank immediately obvious \u2014 in under 2 seconds."
        },
        "intro": "The most effective way to internalize what you should not do is to study real examples of failure. Every chart type below has appeared legitimately in major business publications, government reports, and corporate earnings calls. Each one distorts perception in a specific, identifiable way.",
        "theory": {
            "title": "Why Bad Charts Persist",
            "subtitle": "Alberto Cairo's 'The Functional Art' + Status Quo Bias",
            "explanation": "Many chart design errors are not malicious \u2014 they are defaults. Software defaults to 3D charts, truncated axes, and pie charts because they look visually impressive. Status quo bias means that once a chart format is embedded in a template, it persists unchallenged. The antidote is a checklist applied before finalizing any chart."
        },
        "selectPrompt": "Select a chart type to dissect",
        "details": {
            "flaw": "The flaw",
            "why": "Why the brain is fooled",
            "fix": "How to fix it"
        },
        "crossRefs": {
            "0": {
                "label": "Axis & Scale Manipulation"
            },
            "1": {
                "label": "Level 4: Distortion"
            }
        }
    },
    "context": {
        "crossRefs": {
            "0": {
                "label": "2.5 \u2014 Color semantics"
            }
        },
        "accessibility": {
            "title": "1. Make it Accessible (Dual Encoding)",
            "btnColorOnly": "1. Color Only",
            "btnColorblind": "2. Colorblind View",
            "btnDualEncoding": "3. Dual Encoding",
            "chartLabel": "CUSTOMER SEGMENTS",
            "noteColorOnly": "Relying purely on hue to distinguish 4 categories makes the chart vulnerable to color vision deficiencies and black-and-white printing.",
            "noteColorblind": "In simulated Protanopia (red/green blindness), the red, green, and yellow categories collapse into indistinguishable muddy browns.",
            "noteDualEncoding": "Dual Encoding pairs color with a secondary visual channel (like shape or pattern). Even if the colors are stripped away, the categories remain distinct."
        },
        "smoothing": {
            "title": "2. Scatter Smoothing",
            "btnLines": "Connecting Lines",
            "btnPoints": "Points + Trend",
            "chartLabel": "MONTHLY ENGAGEMENT",
            "noteLines": "Connecting every single data point in a highly volatile dataset creates a visually overwhelming zigzag pattern ('spaghetti chart'). The intense visual noise completely obscures the underlying trend.",
            "notePoints": "By demoting individual observations to faded scatter points and deriving a single smoothed trend line, you eliminate the cognitive load of the noise and clearly reveal the upward trajectory."
        },
        "introDesc": "Data visualizations do not exist in a vacuum. They must be legible to all users regardless of visual impairment, and they must present data in a way that aligns with human cognitive processing rather than raw mathematical plotting.",
        "introTitle": "Context & Accessibility"
    }
};
