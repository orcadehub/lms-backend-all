const express = require('express');
const router = express.Router();
const GamifiedAttempt = require('../models/GamifiedAttempt');
const { auth } = require('../middleware/auth');

// Start gamified attempt
router.post('/start', auth, async (req, res) => {
  try {
    const { questionId, maxScore, totalLevels } = req.body;
    const userId = req.user._id || req.user.id;
    
    if (!questionId) {
      return res.status(400).json({ message: 'Question ID is required' });
    }

    // Find existing in-progress attempt or create a new one
    let attempt = await GamifiedAttempt.findOne({
      userId,
      questionId,
      status: 'in-progress'
    });
    
    if (!attempt) {
      attempt = new GamifiedAttempt({
        userId,
        questionId,
        maxScore: maxScore || 100,
        totalLevels: totalLevels || 1,
        status: 'in-progress',
        startTime: new Date()
      });
      await attempt.save();
    }
    
    res.json({ success: true, attemptId: attempt._id, attempt });
  } catch (error) {
    console.error('Error starting gamified attempt:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save level answer
router.post('/:attemptId/answer', auth, async (req, res) => {
  try {
    const { attemptId } = req.params;
    const { levelNumber, question, selectedAnswer, correctAnswer, isCorrect, pointsEarned, timeSpent } = req.body;
    const userId = req.user._id || req.user.id;
    
    const attempt = await GamifiedAttempt.findById(attemptId);
    if (!attempt || attempt.userId.toString() !== userId.toString()) {
      return res.status(404).json({ message: 'Attempt not found' });
    }
    
    // Check if level answer already exists and update, or push new
    const levelAnswerIndex = attempt.levelAnswers.findIndex(la => la.levelNumber === levelNumber);
    const newAnswer = {
      levelNumber,
      question,
      selectedAnswer,
      correctAnswer,
      isCorrect,
      pointsEarned: pointsEarned || 0,
      timeSpent: timeSpent || 0
    };
    
    if (levelAnswerIndex > -1) {
      attempt.levelAnswers[levelAnswerIndex] = newAnswer;
    } else {
      attempt.levelAnswers.push(newAnswer);
    }
    
    // Update attempt details
    attempt.totalScore = attempt.levelAnswers.reduce((sum, la) => sum + (la.pointsEarned || 0), 0);
    attempt.currentLevel = Math.max(attempt.currentLevel, levelNumber);
    attempt.completedLevels = attempt.levelAnswers.filter(la => la.isCorrect).length;
    
    await attempt.save();
    res.json({ success: true, attempt });
  } catch (error) {
    console.error('Error saving gamified answer:', error);
    res.status(500).json({ error: error.message });
  }
});

// Complete gamified attempt
router.post('/:attemptId/complete', auth, async (req, res) => {
  try {
    const { attemptId } = req.params;
    const { totalScore, isCompleted } = req.body;
    const userId = req.user._id || req.user.id;
    
    const attempt = await GamifiedAttempt.findById(attemptId);
    if (!attempt || attempt.userId.toString() !== userId.toString()) {
      return res.status(404).json({ message: 'Attempt not found' });
    }
    
    attempt.status = 'completed';
    attempt.isCompleted = isCompleted !== undefined ? isCompleted : true;
    attempt.completedAt = new Date();
    attempt.endTime = new Date();
    if (totalScore !== undefined) {
      attempt.totalScore = totalScore;
    }
    
    // Calculate final metrics
    if (attempt.totalLevels > 0) {
      const correctCount = attempt.levelAnswers.filter(la => la.isCorrect).length;
      attempt.accuracy = Math.round((correctCount / attempt.totalLevels) * 100);
    }
    
    if (attempt.startTime) {
      attempt.totalTimeSpent = Math.round((attempt.endTime - attempt.startTime) / 1000);
    }
    
    await attempt.save();
    res.json({ success: true, attempt });
  } catch (error) {
    console.error('Error completing gamified attempt:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
