import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 17482;

app.get('/api/scenarios', async (req, res) => {
    try {
        const scenarios = await prisma.scenario.findMany({
            orderBy: { sort_order: 'asc' },
        });
        // Parse the base_data from String to JSON if needed
        res.json(scenarios.map(s => ({
            ...s,
            base_data: JSON.parse(s.base_data),
        })));
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
});

app.get('/api/executive_reactions', async (req, res) => {
    try {
        const reactions = await prisma.executiveReaction.findMany({
            orderBy: { created_at: 'asc' },
        });
        res.json(reactions);
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
});

app.get('/api/cognitive_principles', async (req, res) => {
    try {
        const principles = await prisma.cognitivePrinciple.findMany({
            orderBy: { sort_order: 'asc' },
        });
        res.json(principles);
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
});

app.get('/api/ethical_levels', async (req, res) => {
    try {
        const levels = await prisma.ethicalLevel.findMany({
            orderBy: { level: 'asc' },
        });
        res.json(levels);
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
});

app.post('/api/user_lab_sessions', async (req, res) => {
    try {
        const { user_id, scenario_id, chart_state, credibility_score, score_breakdown } = req.body;
        const session = await prisma.userLabSession.create({
            data: {
                user_id,
                scenario_id,
                chart_state: JSON.stringify(chart_state || {}),
                credibility_score: credibility_score || 0,
                score_breakdown: JSON.stringify(score_breakdown || []),
            },
        });
        res.json({
            ...session,
            chart_state: JSON.parse(session.chart_state),
            score_breakdown: JSON.parse(session.score_breakdown),
        });
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
});

app.put('/api/user_lab_sessions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { chart_state, credibility_score, score_breakdown } = req.body;

        // We only update the dynamic fields
        const updated = await prisma.userLabSession.update({
            where: { id },
            data: {
                ...(chart_state !== undefined && { chart_state: JSON.stringify(chart_state) }),
                ...(credibility_score !== undefined && { credibility_score }),
                ...(score_breakdown !== undefined && { score_breakdown: JSON.stringify(score_breakdown) }),
            },
        });
        res.json({
            ...updated,
            chart_state: JSON.parse(updated.chart_state),
            score_breakdown: JSON.parse(updated.score_breakdown),
        });
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
});

// For any other unexpected requests
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`Server API listening on http://localhost:${PORT}`);
});
