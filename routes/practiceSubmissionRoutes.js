const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PracticeSubmission = require('../models/PracticeSubmission');
const Question = require('../models/Question');
const { auth } = require('../middleware/auth');

// Submit practice solution
router.post('/submit', auth, async (req, res) => {
  try {
    console.log('Submit request received:', req.body);
    console.log('User from auth:', req.user);
    
    const { 
      questionId, 
      subTopicId, 
      topicId, 
      code, 
      language, 
      status, 
      passedTests, 
      totalTests, 
      executionTime, 
      memoryUsed 
    } = req.body;
    
    const userId = req.user._id || req.user.id;
    console.log('Using userId:', userId);
    
    // Find or create practice submission record
    let practiceSubmission = await PracticeSubmission.findOne({ userId, questionId });
    console.log('Existing submission:', practiceSubmission);
    
    if (!practiceSubmission) {
      // Get question details for coins
      const question = await Question.findById(questionId);
      console.log('Question found:', question);
      
      practiceSubmission = new PracticeSubmission({
        userId,
        questionId,
        subTopicId,
        topicId,
        maxCoinsAvailable: question?.points || 10,
        difficulty: question?.difficulty
      });
      console.log('Created new submission:', practiceSubmission);
    }
    
    // Add submission to array
    const submission = {
      code,
      language,
      status,
      passedTests,
      totalTests,
      executionTime,
      memoryUsed
    };
    
    if (!practiceSubmission.submissions) {
      practiceSubmission.submissions = [];
    }
    practiceSubmission.submissions.push(submission);
    practiceSubmission.totalAttempts += 1;
    
    // Update language usage
    if (!practiceSubmission.languagesUsed.includes(language)) {
      practiceSubmission.languagesUsed.push(language);
    }
    
    // If successful and not already completed
    if (status === 'accepted' && !practiceSubmission.isCompleted) {
      practiceSubmission.isCompleted = true;
      practiceSubmission.completedAt = new Date();
      practiceSubmission.successfulSubmissions += 1;
      practiceSubmission.coinsEarned = practiceSubmission.maxCoinsAvailable;
      
      // Set time to complete if timer was used
      if (req.body.timeToComplete) {
        practiceSubmission.timeToComplete = req.body.timeToComplete;
        practiceSubmission.timerUsed = true;
      }
    } else if (status === 'accepted') {
      practiceSubmission.successfulSubmissions += 1;
    }
    
    // Update performance metrics
    if (executionTime && (!practiceSubmission.bestExecutionTime || executionTime < practiceSubmission.bestExecutionTime)) {
      practiceSubmission.bestExecutionTime = executionTime;
    }
    
    if (memoryUsed && (!practiceSubmission.bestMemoryUsage || memoryUsed < practiceSubmission.bestMemoryUsage)) {
      practiceSubmission.bestMemoryUsage = memoryUsed;
    }
    
    await practiceSubmission.save();
    console.log('Saved submission:', practiceSubmission);
    
    res.json({
      success: true,
      coinsEarned: practiceSubmission.coinsEarned,
      isFirstCompletion: status === 'accepted' && practiceSubmission.successfulSubmissions === 1,
      practiceSubmission
    });
    
  } catch (error) {
    console.error('Practice submission error:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: error.message, error: error.toString() });
  }
});

// Save code execution (run button)
router.post('/save-code', auth, async (req, res) => {
  try {
    const { questionId, subTopicId, topicId, code, language } = req.body;
    const userId = req.user.id;
    
    let practiceSubmission = await PracticeSubmission.findOne({ userId, questionId });
    
    if (!practiceSubmission) {
      const question = await Question.findById(questionId);
      practiceSubmission = new PracticeSubmission({
        userId,
        questionId,
        subTopicId,
        topicId,
        maxCoinsAvailable: question.points || 10,
        difficulty: question.difficulty
      });
    }
    
    // Update code history
    practiceSubmission.codeHistory.set(language, {
      code,
      lastUpdated: new Date()
    });
    
    // Update last executed code
    practiceSubmission.lastExecutedCodes.set(language, {
      code,
      executedAt: new Date()
    });
    
    practiceSubmission.currentLanguage = language;
    practiceSubmission.totalRuns += 1;
    
    await practiceSubmission.save();
    
    res.json({ success: true });
    
  } catch (error) {
    console.error('Save code error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get user's practice submission for a question
router.get('/question/:questionId', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { questionId } = req.params;
    
    const practiceSubmission = await PracticeSubmission.findOne({ userId, questionId });
    
    res.json(practiceSubmission || null);
    
  } catch (error) {
    console.error('Get practice submission error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get user's total coins
router.get('/coins', auth, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    
    const result = await PracticeSubmission.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), isCompleted: true } },
      { $group: { _id: null, totalCoins: { $sum: '$coinsEarned' } } }
    ]);
    
    const totalCoins = result.length > 0 ? result[0].totalCoins : 0;
    
    res.json({ totalCoins });
    
  } catch (error) {
    console.error('Get coins error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get user's completed questions
router.get('/completed', auth, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    
    const completedSubmissions = await PracticeSubmission.find({
      userId: new mongoose.Types.ObjectId(userId),
      isCompleted: true
    }).select('questionId');
    
    const completedQuestionIds = completedSubmissions.map(sub => sub.questionId.toString());
    
    res.json({ completedQuestionIds });
    
  } catch (error) {
    console.error('Get completed questions error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;