const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PracticeSubmission = require('../models/PracticeSubmission');
const ProgrammingQuestion = require('../models/ProgrammingQuestion');
const { auth } = require('../middleware/auth');

// Submit practice solution
router.post('/submit', auth, async (req, res) => {
  try {
    const { questionId, subTopicId, topicId, code, language, status, passedTests, totalTests, executionTime, memoryUsed } = req.body;
    const userId = req.user._id || req.user.id;
    
    let practiceSubmission = await PracticeSubmission.findOne({ userId, questionId });
    if (!practiceSubmission) {
      const question = await ProgrammingQuestion.findById(questionId);
      practiceSubmission = new PracticeSubmission({
        userId, questionId, subTopicId, topicId,
        maxCoinsAvailable: question?.points || 10,
        difficulty: question?.difficulty,
        topic: question?.topic // Store topic name for statistics
      });
    }
    
    practiceSubmission.submissions.push({ code, language, status, passedTests, totalTests, executionTime, memoryUsed });
    practiceSubmission.totalAttempts += 1;
    if (!practiceSubmission.languagesUsed.includes(language)) practiceSubmission.languagesUsed.push(language);
    
    const isNewCompletion = status === 'accepted' && !practiceSubmission.isCompleted;
    if (isNewCompletion) {
      practiceSubmission.isCompleted = true;
      practiceSubmission.completedAt = new Date();
      practiceSubmission.successfulSubmissions += 1;
      practiceSubmission.coinsEarned = practiceSubmission.maxCoinsAvailable;
    } else if (status === 'accepted') {
      practiceSubmission.successfulSubmissions += 1;
    }
    
    if (executionTime && (!practiceSubmission.bestExecutionTime || executionTime < practiceSubmission.bestExecutionTime)) practiceSubmission.bestExecutionTime = executionTime;
    if (memoryUsed && (!practiceSubmission.bestMemoryUsage || memoryUsed < practiceSubmission.bestMemoryUsage)) practiceSubmission.bestMemoryUsage = memoryUsed;
    
    await practiceSubmission.save();
    
    if (isNewCompletion) {
      const io = req.app.get('io');
      if (io) {
        const question = await ProgrammingQuestion.findById(questionId);
        io.emit('practice_completion', {
          username: req.user.name,
          problemTitle: question?.title || 'Unknown Problem',
          coins: practiceSubmission.coinsEarned || 0,
          timestamp: new Date()
        });
      }
    }
    
    res.json({ success: true, coinsEarned: practiceSubmission.coinsEarned, isFirstCompletion: isNewCompletion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/save-code', auth, async (req, res) => {
  try {
    const { questionId, subTopicId, topicId, code, language } = req.body;
    let practiceSubmission = await PracticeSubmission.findOne({ userId: req.user.id, questionId });
    if (!practiceSubmission) {
      const question = await ProgrammingQuestion.findById(questionId);
      practiceSubmission = new PracticeSubmission({ userId: req.user.id, questionId, subTopicId, topicId, difficulty: question?.difficulty, topic: question?.topic });
    }
    practiceSubmission.codeHistory.set(language, { code, lastUpdated: new Date() });
    practiceSubmission.lastExecutedCodes.set(language, { code, executedAt: new Date() });
    practiceSubmission.currentLanguage = language;
    practiceSubmission.totalRuns += 1;
    await practiceSubmission.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/question/:questionId', auth, async (req, res) => {
  try {
    const practiceSubmission = await PracticeSubmission.findOne({ userId: req.user.id, questionId: req.params.questionId });
    res.json(practiceSubmission || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/coins', auth, async (req, res) => {
  try {
    const result = await PracticeSubmission.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id), isCompleted: true } },
      { $group: { _id: null, totalCoins: { $sum: '$coinsEarned' } } }
    ]);
    res.json({ totalCoins: result.length > 0 ? result[0].totalCoins : 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/completed', auth, async (req, res) => {
  try {
    const subs = await PracticeSubmission.find({ userId: new mongoose.Types.ObjectId(req.user.id), isCompleted: true }).select('questionId');
    res.json({ completedQuestionIds: subs.map(s => s.questionId.toString()) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/stats', auth, async (req, res) => {
  try {
    const solvedCount = await PracticeSubmission.countDocuments({ userId: new mongoose.Types.ObjectId(req.user.id), isCompleted: true });
    const totalQuestions = await AssessmentQuestion.countDocuments({ assessmentType: 'programming', isActive: true });
    
    // Aggregate by topic name since topicId might not be consistent
    const topicStats = await PracticeSubmission.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id), isCompleted: true } },
      { $lookup: { from: 'assessmentquestions', localField: 'questionId', foreignField: '_id', as: 'q' } },
      { $unwind: '$q' },
      { $group: { _id: '$q.topic', solvedCount: { $sum: 1 } } }
    ]);

    const topicMap = {};
    topicStats.forEach(s => { topicMap[s._id] = s.solvedCount; });

    res.json({ solvedCount, totalQuestions, topicStats: topicMap });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;