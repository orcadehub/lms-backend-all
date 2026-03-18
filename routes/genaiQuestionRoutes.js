const express = require('express');
const router = express.Router();
const GenAIQuestion = require('../models/GenAIQuestion');

// GET /api/genai-questions — list all active questions (no testCode exposed)
router.get('/', async (req, res) => {
  try {
    const questions = await GenAIQuestion.find({ isActive: true })
      .select('-testCode')
      .sort({ order: 1, createdAt: 1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/genai-questions/:id — single question (no testCode)
router.get('/:id', async (req, res) => {
  try {
    const q = await GenAIQuestion.findById(req.params.id).select('-testCode');
    if (!q) return res.status(404).json({ error: 'Question not found' });
    res.json(q);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
