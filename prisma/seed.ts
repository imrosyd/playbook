import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Cognitive Principles...');
    const principles = [
        {
            principle_key: 'preattentive',
            title: 'Pre-attentive Processing',
            description: 'The visual system processes certain attributes (length, color, position, orientation) in under 250ms before conscious attention. Charts exploit these channels to communicate magnitude comparisons. When a chart distorts length through 3D perspective or truncated axes, it corrupts this automatic processing — the viewer forms an incorrect magnitude judgment before they can consciously correct it.',
            research_citation: 'Cleveland & McGill (1984). Graphical Perception: Theory, Experimentation, and Application to the Development of Graphical Methods. JASA.',
            sort_order: 1
        },
        {
            principle_key: 'cognitive_load',
            title: 'Cognitive Load Theory',
            description: 'Working memory holds 4±1 chunks simultaneously. Every visual element in a chart consumes cognitive capacity. Excessive gridlines, labels, or decorative elements exhaust working memory, forcing the viewer to rely on heuristic shortcuts rather than careful analysis. Conversely, strategically reducing non-essential elements allows the viewer to focus on the data that matters.',
            research_citation: 'Sweller, J. (1988). Cognitive Load During Problem Solving. Cognitive Science, 12(2).',
            sort_order: 2
        },
        {
            principle_key: 'anchoring',
            title: 'Anchoring & Framing Effects',
            description: 'The first piece of information encountered disproportionately influences subsequent judgments. In charts, the axis baseline serves as a perceptual anchor — a truncated axis reframes small absolute changes as visually dramatic relative changes. Annotations create interpretive anchors that direct the viewer toward a specific conclusion before they form their own.',
            research_citation: 'Tversky, A. & Kahneman (1974). Judgment under Uncertainty: Heuristics and Biases. Science, 185(4157).',
            sort_order: 3
        },
        {
            principle_key: 'pattern_recognition',
            title: 'Pattern Recognition & Clustering Illusion',
            description: 'Humans are hardwired to detect patterns even in random data. Data smoothing, trendlines, and small sample sizes all amplify this tendency by reducing the noise that would otherwise signal randomness. The clustering illusion is strongest at small sample sizes, where spurious patterns are most likely to appear real. Trendlines impose a mathematical narrative on data that may contain no actual trend.',
            research_citation: 'Gilovich, T., Vallone, R., & Tversky, A. (1985). The Hot Hand in Basketball. Cognitive Psychology, 17(3).',
            sort_order: 4
        }
    ];

    for (const p of principles) {
        await prisma.cognitivePrinciple.upsert({
            where: { principle_key: p.principle_key },
            update: {},
            create: p,
        });
    }

    console.log('Seeding Ethical Levels...');
    const levels = [
        {
            level: 1,
            name: 'Clarity',
            description: 'The chart accurately represents the data and facilitates correct interpretation. All design choices serve comprehension. Annotations are factual. The viewer forms an accurate mental model of the underlying data.',
            example_text: 'A bar chart with a zero baseline, clear labels, appropriate gridlines, and a factual annotation noting the key finding.',
            color_code: '#10B981'
        },
        {
            level: 2,
            name: 'Emphasis',
            description: 'The chart accurately represents the data but uses visual emphasis to direct attention toward specific elements. The emphasis does not distort perception — it prioritizes it. The viewer sees the full picture but is guided toward a particular aspect.',
            example_text: 'Highlighting one bar in a contrasting color to draw attention to the best-performing region, while all bars remain accurately scaled.',
            color_code: '#3B82F6'
        },
        {
            level: 3,
            name: 'Framing',
            description: 'The chart presents accurate data but makes design choices that favor one interpretation over alternatives. The viewer could reach a different conclusion from the same data presented differently. No data is falsified, but the frame constrains the interpretation space.',
            example_text: 'Sorting bars to place underperforming categories in the middle where they receive less visual scrutiny, or choosing a chart type that de-emphasizes unfavorable comparisons.',
            color_code: '#F59E0B'
        },
        {
            level: 4,
            name: 'Distortion',
            description: 'The chart alters the visual representation in ways that cause the viewer to form incorrect magnitude judgments. The data itself may be accurate, but the visual encoding produces systematic perceptual errors. The viewer\'s pre-attentive system is being fed incorrect signals.',
            example_text: 'Truncating the Y-axis to start at 50% of the minimum value, making a 3% decline appear as a 60% visual drop. Adding 3D perspective that foreshortens rear elements.',
            color_code: '#EF4444'
        },
        {
            level: 5,
            name: 'Manipulation',
            description: 'The chart combines multiple distortions, removes inconvenient data, or adds deliberately misleading annotations to construct a false narrative. The viewer cannot form an accurate understanding of the data without independent verification. Trust is weaponized.',
            example_text: 'Combining axis truncation, manual outlier removal, heavy smoothing, and a misleading annotation to present declining revenue as stable growth.',
            color_code: '#991B1B'
        }
    ];

    for (const l of levels) {
        await prisma.ethicalLevel.create({ data: l });
    }

    console.log('Seeding Scenarios...');
    const scenarios = [
        {
            title: '1-Year Revenue Trend',
            domain: 'revenue' as any,
            description: 'Monthly revenue figures for the past 12 months. Contains high variance and multiple notable outliers (both positive and negative) that require careful statistical handling to determine the true underlying growth rate.',
            decision_timeframe: 'month',
            data_spans_orders_of_magnitude: false,
            base_data: JSON.stringify([
                { "label": "Jan", "value": 112 },
                { "label": "Feb", "value": 105 },
                { "label": "Mar", "value": 240 },
                { "label": "Apr", "value": 115 },
                { "label": "May", "value": 121 },
                { "label": "Jun", "value": 118 },
                { "label": "Jul", "value": 125 },
                { "label": "Aug", "value": 40 },
                { "label": "Sep", "value": 130 },
                { "label": "Oct", "value": 128 },
                { "label": "Nov", "value": 135 },
                { "label": "Dec", "value": 132 }
            ]),
            preferred_chart_types: 'line,area',
            sort_order: 0
        },
        {
            title: 'Q3 Revenue Trajectory',
            domain: 'revenue' as any,
            description: 'Your company reported $12.4M in Q2 revenue. The board wants to see Q3 monthly performance to decide whether to approve a $2M expansion budget. The data shows modest growth with some monthly volatility.',
            decision_timeframe: 'month',
            data_spans_orders_of_magnitude: false,
            base_data: JSON.stringify([{ "label": "Jul W1", "value": 3.05 }, { "label": "Jul W2", "value": 3.12 }, { "label": "Jul W3", "value": 2.98 }, { "label": "Jul W4", "value": 3.21 }, { "label": "Aug W1", "value": 3.08 }, { "label": "Aug W2", "value": 3.35 }, { "label": "Aug W3", "value": 3.18 }, { "label": "Aug W4", "value": 2.95 }, { "label": "Sep W1", "value": 3.42 }, { "label": "Sep W2", "value": 3.15 }, { "label": "Sep W3", "value": 3.28 }, { "label": "Sep W4", "value": 3.51 }]),
            preferred_chart_types: 'line,bar',
            sort_order: 1
        },
        {
            title: 'Customer Churn Analysis',
            domain: 'churn' as any,
            description: 'Monthly customer churn rate over the past year. The CEO believes churn is improving and wants to present this to investors. The data shows a slight downward trend but with significant month-to-month variance and two outlier months.',
            decision_timeframe: 'month',
            data_spans_orders_of_magnitude: false,
            base_data: JSON.stringify([{ "label": "Jan", "value": 4.2 }, { "label": "Feb", "value": 3.8 }, { "label": "Mar", "value": 5.1 }, { "label": "Apr", "value": 3.5 }, { "label": "May", "value": 3.9 }, { "label": "Jun", "value": 3.2 }, { "label": "Jul", "value": 4.8 }, { "label": "Aug", "value": 3.1 }, { "label": "Sep", "value": 3.6 }, { "label": "Oct", "value": 2.9 }, { "label": "Nov", "value": 3.3 }, { "label": "Dec", "value": 3.0 }]),
            preferred_chart_types: 'line',
            sort_order: 2
        },
        {
            title: 'Market Share 2025',
            domain: 'marketing' as any,
            description: 'Current market share distribution among key competitors. Useful for part-to-whole analysis and competitive ranking.',
            decision_timeframe: 'year',
            data_spans_orders_of_magnitude: false,
            base_data: JSON.stringify([
                { "label": "Our Company", "value": 34 },
                { "label": "Competitor A", "value": 28 },
                { "label": "Competitor B", "value": 15 },
                { "label": "Competitor C", "value": 12 },
                { "label": "Others", "value": 11 }
            ]),
            preferred_chart_types: 'pie,bar',
            sort_order: 3
        },
        {
            title: 'Ad Spend Correlation',
            domain: 'marketing' as any,
            description: 'Relationship between monthly digital ad spend ($K) and new customer acquisitions. High-variance data aimed at identifying correlation patterns.',
            decision_timeframe: 'month',
            data_spans_orders_of_magnitude: false,
            base_data: JSON.stringify([
                { "label": "Jan", "value": 12 }, { "label": "Feb", "value": 15 }, { "label": "Mar", "value": 18 },
                { "label": "Apr", "value": 14 }, { "label": "May", "value": 22 }, { "label": "Jun", "value": 25 },
                { "label": "Jul", "value": 20 }, { "label": "Aug", "value": 28 }, { "label": "Sep", "value": 32 },
                { "label": "Oct", "value": 30 }, { "label": "Nov", "value": 35 }, { "label": "Dec", "value": 40 }
            ]),
            preferred_chart_types: 'scatter',
            sort_order: 4
        }
    ];

    for (const s of scenarios) {
        await prisma.scenario.create({ data: s });
    }

    console.log('Seeding Executive Reactions...');
    const reactions = [
        { archetype: 'skeptic', credibility_band: 'high', dominant_manipulation: 'general', template_text: 'The data looks solid. Walk me through the methodology briefly so I can reference it in my notes.', decision_tendency: 'Proceeds cautiously. Requests methodology documentation before formal approval.' },
        { archetype: 'skeptic', credibility_band: 'moderate', dominant_manipulation: 'general', template_text: 'Can you show me this with the axis starting at zero? I want to see the full scale before I draw any conclusions.', decision_tendency: 'Delays decision. Requests chart be redrawn with neutral parameters.' },
        { archetype: 'skeptic', credibility_band: 'moderate', dominant_manipulation: 'axis_baseline', template_text: 'Why does the Y-axis start at {axis_min_value}? That makes a {actual_diff_pct}% difference look like a {apparent_diff_pct}x visual change.', decision_tendency: 'Delays decision. Explicitly flags the axis truncation and requests a corrected version.' },
        { archetype: 'skeptic', credibility_band: 'low', dominant_manipulation: 'general', template_text: 'I have concerns about the analytical rigor here. Several design choices in this chart are inflating the apparent trend. Can we see the raw numbers?', decision_tendency: 'Blocks the decision. Requests raw data table and an independently produced chart.' },
        { archetype: 'skeptic', credibility_band: 'low', dominant_manipulation: 'data_smoothing', template_text: 'What is the R-squared on the unsmoothed data? This rolling average is hiding the actual variance, and I suspect the real picture is much noisier.', decision_tendency: 'Blocks the decision. Requests unsmoothed data overlay.' },
        { archetype: 'skeptic', credibility_band: 'low', dominant_manipulation: 'outlier_removal', template_text: 'Which data points were excluded and why? I want to see the full dataset including outliers before we proceed.', decision_tendency: 'Blocks the decision. Insists on seeing all data points.' },
        { archetype: 'skeptic', credibility_band: 'critical', dominant_manipulation: 'general', template_text: 'I am not comfortable making any decision based on this presentation. The data needs to be reconstructed from source with neutral visualization choices. Can someone else independently verify this?', decision_tendency: 'Vetoes the proposal. Requests independent data audit.' },

        { archetype: 'optimist', credibility_band: 'high', dominant_manipulation: 'general', template_text: 'This is great progress. The numbers support what we have been building toward. Let us talk about how we scale this.', decision_tendency: 'Accelerates decision. Proposes expanding scope or increasing targets.' },
        { archetype: 'optimist', credibility_band: 'moderate', dominant_manipulation: 'general', template_text: 'I like what I see here. The trajectory is encouraging. What resources do we need to maintain this momentum?', decision_tendency: 'Approves budget. Asks for resource plan to capitalize on the trend.' },
        { archetype: 'optimist', credibility_band: 'moderate', dominant_manipulation: 'color_emphasis', template_text: 'That {highlighted_category} number is strong. What is driving it? I want to double down on whatever is working there.', decision_tendency: 'Anchors on the highlighted element. Proposes increased investment in that specific area.' },
        { archetype: 'optimist', credibility_band: 'moderate', dominant_manipulation: 'trendline', template_text: 'The trend is clearly positive. I think we should accelerate our investment timeline based on this trajectory.', decision_tendency: 'Accelerates timeline. Uses trendline as justification for earlier action.' },
        { archetype: 'optimist', credibility_band: 'low', dominant_manipulation: 'general', template_text: 'The overall direction is positive. There is always some noise in the data, but the story here is one of growth. I say we move forward.', decision_tendency: 'Approves despite data quality issues. Does not detect manipulation.' },
        { archetype: 'optimist', credibility_band: 'critical', dominant_manipulation: 'general', template_text: 'Excellent. This supports our Q3 thesis. I think we have the evidence we need to make the case to the board.', decision_tendency: 'Fully commits to action. Uses manipulated chart as board-level evidence.' },

        { archetype: 'firefighter', credibility_band: 'high', dominant_manipulation: 'general', template_text: 'Good catch flagging this data. What is our response plan? I want action items and owners by end of day.', decision_tendency: 'Immediately assigns action items. Creates task force if data shows any decline.' },
        { archetype: 'firefighter', credibility_band: 'moderate', dominant_manipulation: 'general', template_text: 'Something does not look right in this data. I want a war room session this afternoon to dig into the root cause.', decision_tendency: 'Escalates urgency. Convenes emergency meeting.' },
        { archetype: 'firefighter', credibility_band: 'moderate', dominant_manipulation: 'axis_baseline', template_text: 'That drop looks significant. We need to understand what happened in {worst_period} and make sure it does not happen again.', decision_tendency: 'Overreacts to visually amplified decline. Diverts resources to address a minor issue.' },
        { archetype: 'firefighter', credibility_band: 'low', dominant_manipulation: 'three_d', template_text: 'The front numbers are dramatically different from the back. We have a serious inconsistency problem across these categories.', decision_tendency: 'Misreads 3D perspective distortion as real magnitude differences. Initiates cross-departmental investigation.' },
        { archetype: 'firefighter', credibility_band: 'low', dominant_manipulation: 'general', template_text: 'This is a crisis. We need to freeze discretionary spending and convene the leadership team. I want a recovery plan by Friday.', decision_tendency: 'Full crisis response activated by distorted chart. Freezes budgets. Reassigns staff.' },
        { archetype: 'firefighter', credibility_band: 'critical', dominant_manipulation: 'general', template_text: 'We need an emergency budget review. Pull the team together — I want hourly updates on this until we have a handle on it.', decision_tendency: 'Maximum escalation. Disrupts normal operations based on fabricated urgency.' },

        { archetype: 'strategist', credibility_band: 'high', dominant_manipulation: 'general', template_text: 'What does this mean for our positioning next quarter? How should we adjust the strategic plan based on what we are seeing here?', decision_tendency: 'Integrates data into long-term strategy. Adjusts quarterly objectives.' },
        { archetype: 'strategist', credibility_band: 'moderate', dominant_manipulation: 'general', template_text: 'Before we discuss implications, I want to understand the data construction. What timeframe are we looking at and what was excluded?', decision_tendency: 'Pauses to validate methodology before incorporating into strategy.' },
        { archetype: 'strategist', credibility_band: 'moderate', dominant_manipulation: 'sorting', template_text: 'Interesting choice to present the categories in this order. Can we see them sorted by performance? I think the ranking tells a different story.', decision_tendency: 'Challenges the framing. Requests alternative presentation before deciding.' },
        { archetype: 'strategist', credibility_band: 'low', dominant_manipulation: 'general', template_text: 'I think we need to separate what the data actually shows from the story this chart is telling. Can we rebuild this from the raw numbers?', decision_tendency: 'Reframes the discussion. Demands separation of data from narrative.' },
        { archetype: 'strategist', credibility_band: 'low', dominant_manipulation: 'data_smoothing', template_text: 'The smoothing combined with the axis range is giving me a very different picture than I think the raw data would. Let us unpack this layer by layer.', decision_tendency: 'Deconstructs the chart systematically. Identifies compound manipulation effects.' },
        { archetype: 'strategist', credibility_band: 'critical', dominant_manipulation: 'general', template_text: 'I want to understand whether this presentation was reviewed before it reached us. The visual choices here are concerning and I question the intent behind them.', decision_tendency: 'Questions presenter credibility. Recommends governance review of analytical practices.' }
    ];

    for (const r of reactions) {
        await prisma.executiveReaction.create({ data: r });
    }

    console.log('Seeding complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
