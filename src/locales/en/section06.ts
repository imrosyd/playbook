export const section06 = {
    "colorsRule": {
        "chart": {
            "colorsLabel": "colors"
        },
        "intro1": "Open a typical corporate slide deck and count the colors. You'll find eight, twelve, sometimes more. Each color signal tells the viewer's brain: \"this thing is different from that thing.\" At three hues, the brain can maintain an effortless mapping. At five or six, the legend must be consulted repeatedly. At eight, colors stop encoding categories and start creating visual noise \u2014 the chart looks busy, not insightful.",
        "theory": {
            "title": "Why 3 Colors is the Cognitive Limit",
            "subtitle": "Miller's Law + Pre-attentive Attribute Theory (Ware, 2004)",
            "explanation": "Color is processed pre-attentively \u2014 it takes zero deliberate effort to perceive. But discriminating between colors requires working memory. Studies show that beyond 5\u20136 hues, categorical discrimination degrades sharply. For charts, 3 colors (primary, secondary, accent/highlight) is the practical limit for fast, accurate decoding."
        },
        "demo": {
            "title": "Watch how comprehension degrades as color count increases",
            "countLabel": "Color count:",
            "descRecommended": "Your viewer can see the full palette in a single glance and immediately map each color to a category.",
            "descBorderline": "Marginally acceptable for simple bar charts. Requires a visible, well-positioned legend.",
            "descTooMany": "At this count, the chart is almost certainly over-designed. Simplify by grouping or removing series.",
            "statusBorderline": "Borderline",
            "statusRecommended": "Recommended",
            "statusTooMany": "Too many"
        },
        "system": {
            "title": "The 3-color system",
            "roles": {
                "0": {
                    "name": "Primary",
                    "use": "Main data series. The thing you are measuring."
                },
                "1": {
                    "name": "Secondary",
                    "use": "Comparison or baseline. Previous period, target, or benchmark."
                },
                "2": {
                    "name": "Accent",
                    "use": "One specific highlight \u2014 outlier, insight, or call to action. Use sparingly."
                }
            }
        },
        "crossRefs": {
            "0": {
                "label": "Color Psychology"
            },
            "1": {
                "label": "Designing for Colorblindness"
            }
        },
        "intro2": "The 3-Color Rule is not a stylistic preference \u2014 it is grounded in the cognitive science of <strong>working memory capacity and categorical color discrimination</strong>. Pre-attentive processing handles color automatically, but category matching (\"which color corresponds to which label in the legend?\") consumes working memory. Miller's Law shows working memory can hold approximately 7\u00b12 items simultaneously. A 6-color chart with a legend forces the viewer to hold 6 color-to-label mappings in working memory while also reading the chart \u2014 saturating cognitive capacity before any insight is communicated.",
        "intro3": "The correct 3-color framework assigns <strong>specific semantic roles</strong> to each color: primary (the main data series \u2014 your current year, your metric, your entity of interest), secondary (context or comparison \u2014 prior year, target, or benchmark), and accent (a single highlight that draws the eye to the critical actionable insight). Accent color should appear on at most one element per chart. When everything is highlighted, nothing is highlighted. The professional discipline of restricting the accent to a single element is what creates the visual hierarchy that guides the viewer directly to the takeaway."
    },
    "colorPsychology": {
        "emotionChart": {
            "title": "Color emotional associations in a business context",
            "colors": {
                "0": {
                    "label": "Red",
                    "primary": "Danger / Loss",
                    "secondary": "Urgency, warning"
                },
                "1": {
                    "label": "Green",
                    "primary": "Growth / Success",
                    "secondary": "Safe, positive"
                },
                "2": {
                    "label": "Blue",
                    "primary": "Trust / Stability",
                    "secondary": "Calm, professional"
                },
                "3": {
                    "label": "Amber",
                    "primary": "Caution / Energy",
                    "secondary": "Neutral alert"
                },
                "4": {
                    "label": "Purple",
                    "primary": "Premium / Insight",
                    "secondary": "Forecasts, AI"
                },
                "5": {
                    "label": "Grey",
                    "primary": "Neutral / Context",
                    "secondary": "Background, comparison"
                }
            }
        },
        "culturalChart": {
            "title": "Color conventions differ across cultures \u2014 international audiences require care",
            "colors": {
                "0": {
                    "color": "Red",
                    "meanings": {
                        "0": {
                            "culture": "West",
                            "meaning": "Danger/loss"
                        },
                        "1": {
                            "culture": "China",
                            "meaning": "Luck/prosperity"
                        }
                    }
                },
                "1": {
                    "color": "Green",
                    "meanings": {
                        "0": {
                            "culture": "West",
                            "meaning": "Go/positive"
                        },
                        "1": {
                            "culture": "Middle East",
                            "meaning": "Holy/religion"
                        }
                    }
                },
                "2": {
                    "color": "White",
                    "meanings": {
                        "0": {
                            "culture": "West",
                            "meaning": "Purity/clean"
                        },
                        "1": {
                            "culture": "East Asia",
                            "meaning": "Mourning"
                        }
                    }
                }
            }
        },
        "intro1": "Red doesn't just mean \"stop.\" It means \"danger,\" \"loss,\" \"debt,\" and \"underperformance\" \u2014 in that sequence \u2014 before the viewer has read a single data label. Color is the fastest pre-attentive channel, which means it carries meaning <em>before</em> conscious thought. If the meaning it carries is wrong, no label can override it.",
        "theory1": {
            "title": "Color as Pre-Attentive Signal",
            "subtitle": "Faber Birren's Color Psychology + Ecological Valence Theory (Palmer & Schloss, 2010)",
            "explanation": "Ecological Valence Theory holds that color preferences are learned from repeated associations in the environment \u2014 red with fire and blood, green with healthy plants, blue with clear skies. These associations are deeply embedded and largely involuntary. Charts that violate them force extra cognitive work to override the first impression."
        },
        "theory2": {
            "title": "The Cultural Relativity Problem",
            "subtitle": "Cross-Cultural Color Studies (Madden, Hewett & Roth, 2000)",
            "explanation": "A 2000 study across 8 countries found that color associations varied significantly for the same hue. Red means luck in China, danger in the US. White means purity in the West, mourning in East Asia. Global dashboards cannot rely on culturally-specific color codes without explicit legends."
        },
        "rules": {
            "title": "Use color deliberately \u2014 three rules",
            "items": {
                "0": {
                    "rule": "Never use red and green as the only signal for good/bad.",
                    "reason": "8% of men are red-green colorblind. These colors look the same to them."
                },
                "1": {
                    "rule": "Blue is the safest universal color for \"primary\" data.",
                    "reason": "It has the fewest conflicting cultural associations and is least affected by common colorblindness types."
                },
                "2": {
                    "rule": "Use grey as your default. Reserve color for the one thing that matters most.",
                    "reason": "Grey communicates \"context.\" Color communicates \"pay attention here.\" Both should be intentional."
                }
            }
        },
        "crossRefs": {
            "0": {
                "label": "The 3-Color Rule"
            },
            "1": {
                "label": "Designing for Colorblindness"
            }
        }
    },
    "colorblindness": {
        "chart": {
            "bars": {
                "0": {
                    "label": "Achieved"
                },
                "1": {
                    "label": "At risk"
                },
                "2": {
                    "label": "Behind target"
                }
            },
            "yAxis": "% of target"
        },
        "palettes": {
            "0": {
                "name": "The 'Safe' Diverging Palette (Blue/Orange)",
                "description": "Replaces traditional Red/Green for showing positive/negative variance or good/bad states.",
                "colors": {
                    "0": {
                        "label": "Warning / Negative (Orange)"
                    },
                    "1": {
                        "label": "Good / Positive (Blue)"
                    },
                    "2": {
                        "label": "Neutral (Slate)"
                    }
                }
            },
            "1": {
                "name": "The Okabe-Ito Categorical Palette",
                "description": "A meticulously tested palette designed to be distinguishable by all types of human color vision.",
                "colors": {
                    "0": {
                        "label": "Orange"
                    },
                    "1": {
                        "label": "Sky Blue"
                    },
                    "2": {
                        "label": "Bluish Green"
                    },
                    "3": {
                        "label": "Yellow"
                    },
                    "4": {
                        "label": "Blue"
                    },
                    "5": {
                        "label": "Vermilion"
                    },
                    "6": {
                        "label": "Reddish Purple"
                    }
                }
            }
        },
        "showcase": {
            "title": "Copy-Paste Accessible Palettes",
            "description": "Stop guessing which colors to use. Standardize your organization's charts around these proven, mathematically tested accessible palettes."
        },
        "theory": {
            "title": "Why Color Alone Fails",
            "subtitle": "Ishihara (1917) + WCAG 2.1 Accessibility Guidelines",
            "explanation": "Color vision deficiency is caused by the absence or dysfunction of one or more cone photoreceptors. The three most common types affect red-green discrimination (deuteranopia, protanopia). WCAG 2.1 Success Criterion 1.4.1 requires that color is not used as the only visual means of conveying information."
        },
        "demo": {
            "title": "Simulate how this chart looks to different viewers",
            "notice": "Notice how the bars lose their distinct meaning under color vision deficiency. A person with {filter} cannot distinguish performance levels by color alone."
        },
        "fix": {
            "title": "How to fix it",
            "items": {
                "0": {
                    "fix": "Add direct labels to every bar, line, or segment.",
                    "detail": "The label makes the chart readable even if the color is invisible."
                },
                "1": {
                    "fix": "Use Blue + Orange instead of Red + Green.",
                    "detail": "This palette is distinguishable by all common colorblindness types."
                },
                "2": {
                    "fix": "Add pattern fills or line dashing for critical distinctions.",
                    "detail": "Patterns communicate category through texture, not only color."
                },
                "3": {
                    "fix": "Check your chart in greyscale before publishing.",
                    "detail": "If it is readable in greyscale, it passes the baseline accessibility test."
                }
            }
        },
        "crossRefs": {
            "0": {
                "label": "Color Psychology"
            },
            "1": {
                "label": "The 3-Color Rule"
            }
        },
        "filters": {
            "deuteranopia": {
                "label": "Deuteranopia",
                "prevalence": "6% of men"
            },
            "monochromacy": {
                "label": "Monochromacy",
                "prevalence": "rare"
            },
            "normal": {
                "label": "Normal vision"
            },
            "protanopia": {
                "label": "Protanopia",
                "prevalence": "2% of men"
            },
            "tritanopia": {
                "label": "Tritanopia",
                "prevalence": "0.01%"
            }
        },
        "intro1": "Approximately 1 in 12 men and 1 in 200 women have some form of color vision deficiency. In any meeting of 10 people, statistically one person cannot distinguish red from green. Using red for \"bad\" and green for \"good\" \u2014 as most presentations do \u2014 creates a chart that is literally unreadable for a portion of your audience without them ever knowing or telling you, since people with color vision deficiency rarely announce it in professional settings.",
        "intro2": "The WCAG 2.1 accessibility guidelines \u2014 adopted by governments and major institutions worldwide \u2014 mandate at Success Criterion 1.4.1 that <strong>color must not be used as the only visual means of conveying information</strong>. This standard was designed for digital interfaces, but its logic applies directly to business charts. A chart that uses only color hue to distinguish between categories fails both ethically (it excludes some viewers) and practically (printed in greyscale or viewed through a projector with color shifting, the chart becomes ambiguous to everyone).",
        "intro3": "The solution is not to abandon color but to <strong>add redundant encodings</strong>. Add direct text labels so the category is named, not just colored. Use shapes (circle vs. triangle) in scatter plots. Use line dashing patterns in line charts. Use the Blue + Orange palette instead of Red + Green \u2014 blue and orange are distinguishable by all common colorblindness types including both deuteranopia and protanopia. Treating accessibility as a design constraint produces charts that are universally clearer, not just accessible to specific viewers.",

    },
    "fontLayout": {
        "hierarchyChart": {
            "title": "Typographic hierarchy in data presentations",
            "levels": {
                "0": {
                    "role": "Primary headline",
                    "size": "20–24pt",
                    "weight": "Black / 900",
                    "example": "Revenue Down 23%"
                },
                "1": {
                    "role": "Sub-headline / insight",
                    "size": "14–16pt",
                    "weight": "Bold / 700",
                    "example": "Driven by SMB churn acceleration"
                },
                "2": {
                    "role": "Data label",
                    "size": "11–13pt",
                    "weight": "Semibold / 600",
                    "example": "$1.2M shortfall"
                },
                "3": {
                    "role": "Axis labels & ticks",
                    "size": "9–11pt",
                    "weight": "Regular / 400",
                    "example": "Q1  Q2  Q3  Q4"
                },
                "4": {
                    "role": "Footnote / source",
                    "size": "8–9pt",
                    "weight": "Regular / 400",
                    "example": "Source: Finance BI, as of Aug 2025"
                }
            }
        },
        "spacingChart": {
            "cramped": "Cramped \u2014 verbose, low contrast",
            "correct": "Correct \u2014 concise, spacious",
            "labels": {
                "0": "Q1 Revenue",
                "1": "Q2 Revenue",
                "2": "Q3 Revenue",
                "3": "Q4 Revenue"
            },
            "shortLabels": {
                "0": "Q1",
                "1": "Q2",
                "2": "Q3",
                "3": "Q4"
            }
        },
        "theory": {
            "title": "Why Hierarchy Aids Comprehension",
            "subtitle": "Visual Hierarchy Theory (Lidwell, Holden & Butler, Universal Principles of Design)",
            "explanation": "Visual hierarchy allows viewers to extract the most important information first, then progressively acquire supporting details. In typography, this translates to: size signals importance, weight signals urgency, spacing signals grouping. A well-established hierarchy means zero wasted cognitive effort on navigation."
        },
        "rules": {
            "title": "Practical rules",
            "items": {
                "0": {
                    "rule": "Minimum 11pt for any text a decision-maker must read.",
                    "note": "At 10pt and below, reading effort shifts from unconscious to conscious \u2014 and attention drops."
                },
                "1": {
                    "rule": "Maximum 2 font families per deck.",
                    "note": "One for headings, one for body. More than two signals lack of editorial discipline."
                },
                "2": {
                    "rule": "Left-align body text. Center only chart titles.",
                    "note": "Centered body text creates ragged rhythms that slow reading."
                },
                "3": {
                    "rule": "Line length: 60\u201380 characters max for annotations.",
                    "note": "Beyond 80 characters, the eye loses its way returning to the next line."
                }
            }
        },
        "crossRefs": {
            "0": {
                "label": "Color Psychology"
            },
            "1": {
                "label": "The Language of Authority"
            }
        },
        "intro1": "The choice of typeface and type size is not aesthetic \u2014 it is functional. Typography carries hierarchy. Hierarchy carries authority. When a data presenter uses the same font size for the headline and the footnote, their brain communicates \"all of this is equally important.\" The audience unconsciously agrees \u2014 and stops paying attention to any of it. Typographic hierarchy is the first thing a sophisticated viewer notices about a chart or slide, before reading a single data value: it signals whether the presenter has made decisions about what matters most.",
        "intro2": "The science behind this comes from eye-tracking research in reading comprehension. When viewers encounter a page with clear typographic hierarchy \u2014 large bold headline, smaller sub-headline, small body text \u2014 they process information in a <strong>structured sequence</strong>: skimming the headline, pausing at the sub-headline, then deciding whether to invest the attention required to read the body. This \"skim-to-decide\" pattern is the default behavior of time-constrained decision-makers. A chart that forces an executive to read every line of text before understanding the point has already lost the communication. The hierarchy must do the work of navigation automatically, directing the eye with field and weight before reading begins.",
        "intro3": "Typeface selection plays a secondary but important role. <strong>Sans-serif fonts</strong> (Inter, Roboto, IBM Plex Sans) are optimal for screens and projected slides: their letterforms are designed for screen rendering at all sizes. <strong>Serif fonts</strong> (Georgia, Merriweather) work in dense print documents where the serifs help guide horizontal reading. The critical mistake is using decorative or novelty fonts (\"creative\" fonts, script typefaces) in data contexts \u2014 they add visual stimulation that competes with the data itself, and signal informality in environments that require credibility. One font family with 3\u20134 weight steps provides all the hierarchy variation any presentation needs."
    }
};
