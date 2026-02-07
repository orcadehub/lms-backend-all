const express = require('express');
const router = express.Router();
const GamifiedAttempt = require('../models/GamifiedAttempt');
const { auth } = require('../middleware/auth');

// Start gamified attempt
router.post('/start', auth, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { questionId, maxScore, totalLevels, timeLimit } = req.body;

    // Check if there's an existing in-progress attempt
    let attempt = await GamifiedAttempt.findOne({
      userId,
      questionId,
      status: 'in-progress'
    });

    if (attempt) {
      return res.json({ attemptId: attempt._id, resumed: true });
    }

    // Create new attempt
    attempt = new GamifiedAttempt({
      userId,
      questionId,
      maxScore,
      totalLevels,
      timeLimit,
      startTime: new Date()
    });

    await attempt.save();
    res.json({ attemptId: attempt._id, resumed: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save answer for a level
router.post('/:attemptId/answer', auth, async (req, res) => {
  try {
    const { attemptId } = req.params;
    const { levelNumber, question, selectedAnswer, correctAnswer, isCorrect, pointsEarned, hintsUsed } = req.body;

    const attempt = await GamifiedAttempt.findById(attemptId);
    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    // Add level answer
    attempt.levelAnswers.push({
      levelNumber,
      question,
      selectedAnswer,
      correctAnswer,
      isCorrect,
      pointsEarned,
      hintsUsed: hintsUsed || []
    });

    attempt.totalScore += pointsEarned;
    attempt.currentLevel = levelNumber;
    attempt.completedLevels = levelNumber;
    attempt.totalHintsUsed += (hintsUsed || []).length;

    await attempt.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Complete attempt
router.post('/:attemptId/complete', auth, async (req, res) => {
  try {
    const { attemptId } = req.params;
    const { totalScore, completedLevels, totalTimeSpent } = req.body;

    const attempt = await GamifiedAttempt.findById(attemptId);
    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    attempt.status = 'completed';
    attempt.isCompleted = true;
    attempt.completedAt = new Date();
    attempt.endTime = new Date();
    attempt.totalScore = totalScore;
    attempt.completedLevels = completedLevels;
    attempt.totalTimeSpent = totalTimeSpent;

    // Calculate accuracy
    const correctAnswers = attempt.levelAnswers.filter(a => a.isCorrect).length;
    attempt.accuracy = attempt.levelAnswers.length > 0 
      ? Math.round((correctAnswers / attempt.levelAnswers.length) * 100) 
      : 0;

    await attempt.save();
    res.json({ success: true, attempt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's attempts for a question
router.get('/question/:questionId', auth, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { questionId } = req.params;

    const attempts = await GamifiedAttempt.find({
      userId,
      questionId
    }).sort({ createdAt: -1 });

    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
