/*
  # Seed Reference Data

  1. Cognitive Principles (4 entries)
    - Pre-attentive Processing, Cognitive Load, Anchoring & Framing, Pattern Recognition

  2. Ethical Levels (5 entries)
    - Clarity, Emphasis, Framing, Distortion, Manipulation

  3. Scenarios (3 entries)
    - Revenue Growth, Customer Churn, Marketing ROI

  4. Executive Reactions (48+ entries)
    - 4 archetypes x 4 credibility bands x 3+ manipulation-specific templates
*/

INSERT INTO cognitive_principles (principle_key, title, description, research_citation, sort_order) VALUES
('preattentive', 'Pre-attentive Processing', 'The visual system processes certain attributes (length, color, position, orientation) in under 250ms before conscious attention. Charts exploit these channels to communicate magnitude comparisons. When a chart distorts length through 3D perspective or truncated axes, it corrupts this automatic processing — the viewer forms an incorrect magnitude judgment before they can consciously correct it.', 'Cleveland & McGill (1984). Graphical Perception: Theory, Experimentation, and Application to the Development of Graphical Methods. JASA.', 1),
('cognitive_load', 'Cognitive Load Theory', 'Working memory holds 4±1 chunks simultaneously. Every visual element in a chart consumes cognitive capacity. Excessive gridlines, labels, or decorative elements exhaust working memory, forcing the viewer to rely on heuristic shortcuts rather than careful analysis. Conversely, strategically reducing non-essential elements allows the viewer to focus on the data that matters.', 'Sweller, J. (1988). Cognitive Load During Problem Solving. Cognitive Science, 12(2).', 2),
('anchoring', 'Anchoring & Framing Effects', 'The first piece of information encountered disproportionately influences subsequent judgments. In charts, the axis baseline serves as a perceptual anchor — a truncated axis reframes small absolute changes as visually dramatic relative changes. Annotations create interpretive anchors that direct the viewer toward a specific conclusion before they form their own.', 'Tversky, A. & Kahneman, D. (1974). Judgment under Uncertainty: Heuristics and Biases. Science, 185(4157).', 3),
('pattern_recognition', 'Pattern Recognition & Clustering Illusion', 'Humans are hardwired to detect patterns even in random data. Data smoothing, trendlines, and small sample sizes all amplify this tendency by reducing the noise that would otherwise signal randomness. The clustering illusion is strongest at small sample sizes, where spurious patterns are most likely to appear real. Trendlines impose a mathematical narrative on data that may contain no actual trend.', 'Gilovich, T., Vallone, R., & Tversky, A. (1985). The Hot Hand in Basketball. Cognitive Psychology, 17(3).', 4)
ON CONFLICT (principle_key) DO NOTHING;

INSERT INTO ethical_levels (level, name, description, example_text, color_code) VALUES
(1, 'Clarity', 'The chart accurately represents the data and facilitates correct interpretation. All design choices serve comprehension. Annotations are factual. The viewer forms an accurate mental model of the underlying data.', 'A bar chart with a zero baseline, clear labels, appropriate gridlines, and a factual annotation noting the key finding.', '#10B981'),
(2, 'Emphasis', 'The chart accurately represents the data but uses visual emphasis to direct attention toward specific elements. The emphasis does not distort perception — it prioritizes it. The viewer sees the full picture but is guided toward a particular aspect.', 'Highlighting one bar in a contrasting color to draw attention to the best-performing region, while all bars remain accurately scaled.', '#3B82F6'),
(3, 'Framing', 'The chart presents accurate data but makes design choices that favor one interpretation over alternatives. The viewer could reach a different conclusion from the same data presented differently. No data is falsified, but the frame constrains the interpretation space.', 'Sorting bars to place underperforming categories in the middle where they receive less visual scrutiny, or choosing a chart type that de-emphasizes unfavorable comparisons.', '#F59E0B'),
(4, 'Distortion', 'The chart alters the visual representation in ways that cause the viewer to form incorrect magnitude judgments. The data itself may be accurate, but the visual encoding produces systematic perceptual errors. The viewer''s pre-attentive system is being fed incorrect signals.', 'Truncating the Y-axis to start at 50% of the minimum value, making a 3% decline appear as a 60% visual drop. Adding 3D perspective that foreshortens rear elements.', '#EF4444'),
(5, 'Manipulation', 'The chart combines multiple distortions, removes inconvenient data, or adds deliberately misleading annotations to construct a false narrative. The viewer cannot form an accurate understanding of the data without independent verification. Trust is weaponized.', 'Combining axis truncation, manual outlier removal, heavy smoothing, and a misleading annotation to present declining revenue as stable growth.', '#991B1B');

INSERT INTO scenarios (title, domain, description, decision_timeframe, data_spans_orders_of_magnitude, base_data, sort_order) VALUES
('Q3 Revenue Trajectory', 'revenue', 'Your company reported $12.4M in Q2 revenue. The board wants to see Q3 monthly performance to decide whether to approve a $2M expansion budget. The data shows modest growth with some monthly volatility.', 'month', false,
'[{"label":"Jul W1","value":3.05},{"label":"Jul W2","value":3.12},{"label":"Jul W3","value":2.98},{"label":"Jul W4","value":3.21},{"label":"Aug W1","value":3.08},{"label":"Aug W2","value":3.35},{"label":"Aug W3","value":3.18},{"label":"Aug W4","value":2.95},{"label":"Sep W1","value":3.42},{"label":"Sep W2","value":3.15},{"label":"Sep W3","value":3.28},{"label":"Sep W4","value":3.51}]', 1),

('Customer Churn Analysis', 'churn', 'Monthly customer churn rate over the past year. The CEO believes churn is improving and wants to present this to investors. The data shows a slight downward trend but with significant month-to-month variance and two outlier months.', 'month', false,
'[{"label":"Jan","value":4.2},{"label":"Feb","value":3.8},{"label":"Mar","value":5.1},{"label":"Apr","value":3.5},{"label":"May","value":3.9},{"label":"Jun","value":3.2},{"label":"Jul","value":4.8},{"label":"Aug","value":3.1},{"label":"Sep","value":3.6},{"label":"Oct","value":2.9},{"label":"Nov","value":3.3},{"label":"Dec","value":3.0}]', 2),

('Marketing Channel ROI', 'marketing', 'Quarterly ROI comparison across 6 marketing channels. The marketing VP wants to justify doubling the social media budget. Social shows moderate ROI but email marketing significantly outperforms it. The decision affects $500K in budget allocation.', 'quarter', false,
'[{"label":"Email","value":4.2},{"label":"Social Media","value":2.8},{"label":"Paid Search","value":3.5},{"label":"Content","value":2.1},{"label":"Events","value":1.8},{"label":"Referral","value":3.9}]', 3);

INSERT INTO executive_reactions (archetype, credibility_band, dominant_manipulation, template_text, decision_tendency) VALUES
-- SKEPTIC reactions
('skeptic', 'high', 'general', 'The data looks solid. Walk me through the methodology briefly so I can reference it in my notes.', 'Proceeds cautiously. Requests methodology documentation before formal approval.'),
('skeptic', 'moderate', 'general', 'Can you show me this with the axis starting at zero? I want to see the full scale before I draw any conclusions.', 'Delays decision. Requests chart be redrawn with neutral parameters.'),
('skeptic', 'moderate', 'axis_baseline', 'Why does the Y-axis start at {axis_min_value}? That makes a {actual_diff_pct}% difference look like a {apparent_diff_pct}x visual change.', 'Delays decision. Explicitly flags the axis truncation and requests a corrected version.'),
('skeptic', 'low', 'general', 'I have concerns about the analytical rigor here. Several design choices in this chart are inflating the apparent trend. Can we see the raw numbers?', 'Blocks the decision. Requests raw data table and an independently produced chart.'),
('skeptic', 'low', 'data_smoothing', 'What is the R-squared on the unsmoothed data? This rolling average is hiding the actual variance, and I suspect the real picture is much noisier.', 'Blocks the decision. Requests unsmoothed data overlay.'),
('skeptic', 'low', 'outlier_removal', 'Which data points were excluded and why? I want to see the full dataset including outliers before we proceed.', 'Blocks the decision. Insists on seeing all data points.'),
('skeptic', 'critical', 'general', 'I am not comfortable making any decision based on this presentation. The data needs to be reconstructed from source with neutral visualization choices. Can someone else independently verify this?', 'Vetoes the proposal. Requests independent data audit.'),

-- OPTIMIST reactions
('optimist', 'high', 'general', 'This is great progress. The numbers support what we have been building toward. Let us talk about how we scale this.', 'Accelerates decision. Proposes expanding scope or increasing targets.'),
('optimist', 'moderate', 'general', 'I like what I see here. The trajectory is encouraging. What resources do we need to maintain this momentum?', 'Approves budget. Asks for resource plan to capitalize on the trend.'),
('optimist', 'moderate', 'color_emphasis', 'That {highlighted_category} number is strong. What is driving it? I want to double down on whatever is working there.', 'Anchors on the highlighted element. Proposes increased investment in that specific area.'),
('optimist', 'moderate', 'trendline', 'The trend is clearly positive. I think we should accelerate our investment timeline based on this trajectory.', 'Accelerates timeline. Uses trendline as justification for earlier action.'),
('optimist', 'low', 'general', 'The overall direction is positive. There is always some noise in the data, but the story here is one of growth. I say we move forward.', 'Approves despite data quality issues. Does not detect manipulation.'),
('optimist', 'critical', 'general', 'Excellent. This supports our Q3 thesis. I think we have the evidence we need to make the case to the board.', 'Fully commits to action. Uses manipulated chart as board-level evidence.'),

-- FIREFIGHTER reactions
('firefighter', 'high', 'general', 'Good catch flagging this data. What is our response plan? I want action items and owners by end of day.', 'Immediately assigns action items. Creates task force if data shows any decline.'),
('firefighter', 'moderate', 'general', 'Something does not look right in this data. I want a war room session this afternoon to dig into the root cause.', 'Escalates urgency. Convenes emergency meeting.'),
('firefighter', 'moderate', 'axis_baseline', 'That drop looks significant. We need to understand what happened in {worst_period} and make sure it does not happen again.', 'Overreacts to visually amplified decline. Diverts resources to address a minor issue.'),
('firefighter', 'low', 'three_d', 'The front numbers are dramatically different from the back. We have a serious inconsistency problem across these categories.', 'Misreads 3D perspective distortion as real magnitude differences. Initiates cross-departmental investigation.'),
('firefighter', 'low', 'general', 'This is a crisis. We need to freeze discretionary spending and convene the leadership team. I want a recovery plan by Friday.', 'Full crisis response activated by distorted chart. Freezes budgets. Reassigns staff.'),
('firefighter', 'critical', 'general', 'We need an emergency budget review. Pull the team together — I want hourly updates on this until we have a handle on it.', 'Maximum escalation. Disrupts normal operations based on fabricated urgency.'),

-- STRATEGIST reactions
('strategist', 'high', 'general', 'What does this mean for our positioning next quarter? How should we adjust the strategic plan based on what we are seeing here?', 'Integrates data into long-term strategy. Adjusts quarterly objectives.'),
('strategist', 'moderate', 'general', 'Before we discuss implications, I want to understand the data construction. What timeframe are we looking at and what was excluded?', 'Pauses to validate methodology before incorporating into strategy.'),
('strategist', 'moderate', 'sorting', 'Interesting choice to present the categories in this order. Can we see them sorted by performance? I think the ranking tells a different story.', 'Challenges the framing. Requests alternative presentation before deciding.'),
('strategist', 'low', 'general', 'I think we need to separate what the data actually shows from the story this chart is telling. Can we rebuild this from the raw numbers?', 'Reframes the discussion. Demands separation of data from narrative.'),
('strategist', 'low', 'data_smoothing', 'The smoothing combined with the axis range is giving me a very different picture than I think the raw data would. Let us unpack this layer by layer.', 'Deconstructs the chart systematically. Identifies compound manipulation effects.'),
('strategist', 'critical', 'general', 'I want to understand whether this presentation was reviewed before it reached us. The visual choices here are concerning and I question the intent behind them.', 'Questions presenter credibility. Recommends governance review of analytical practices.');
