const express = require('express');
const router = express.Router();
const MCQAttempt = require('../models/MCQAttempt');
const { auth } = require('../middleware/auth');

// Save MCQ attempt
router.post('/attempt', auth, async (req, res) => {
  try {
    const { dataset, questionIndex, isCorrect } = req.body;
    
    const attempt = new MCQAttempt({
      studentId: req.user._id,
      dataset,
      questionIndex,
      isCorrect
    });
    
    await attempt.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student progress for a dataset
router.get('/progress/:dataset', auth, async (req, res) => {
  try {
    const attempts = await MCQAttempt.find({
      studentId: req.user._id,
      dataset: req.params.dataset
    }).select('questionIndex isCorrect');
    
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
