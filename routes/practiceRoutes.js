const express = require('express');
const jwt = require('jsonwebtoken');
const Topic = require('../models/Topic');
const PracticeQuestion = require('../models/PracticeQuestion');
const UserProgress = require('../models/UserProgress');
const { validateApiKey } = require('../middleware/apiKeyAuth');

const router = express.Router();

// Get all topics for student
router.get('/student/practice/topics', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const tenantId = req.tenantId;

    const topics = await Topic.find({ tenant: tenantId }).sort({ order: 1 });
    res.json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get questions for a topic
router.get('/student/practice/topics/:topicId/questions', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const tenantId = req.tenantId;
    const { topicId } = req.params;

    const questions = await PracticeQuestion.find({ 
      topicId, 
      tenant: tenantId 
    }).sort({ order: 1 });
    
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user progress
router.get('/student/practice/progress', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId;
    const tenantId = req.tenantId;

    let progress = await UserProgress.findOne({ 
      student: studentId, 
      tenant: tenantId 
    }).populate('completedQuestions', 'title difficulty points');
    
    if (!progress) {
      progress = new UserProgress({ 
        student: studentId, 
        tenant: tenantId 
      });
      await progress.save();
    }
    
    res.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save code
router.post('/student/practice/save-code', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId;
    const tenantId = req.tenantId;
    const { questionId, code, language } = req.body;
    
    let progress = await UserProgress.findOne({ 
      student: studentId, 
      tenant: tenantId 
    });
    
    if (!progress) {
      progress = new UserProgress({ 
        student: studentId, 
        tenant: tenantId 
      });
    }
    
    const existingCodeIndex = progress.currentCodes.findIndex(
      c => c.questionId.toString() === questionId && c.language === language
    );
    
    if (existingCodeIndex >= 0) {
      progress.currentCodes[existingCodeIndex] = {
        questionId,
        code,
        language,
        lastUpdated: new Date()
      };
    } else {
      progress.currentCodes.push({
        questionId,
        code,
        language,
        lastUpdated: new Date()
      });
    }
    
    progress.totalRuns += 1;
    progress.lastActive = new Date();
    
    await progress.save();
    res.json({ message: 'Code saved' });
  } catch (error) {
    console.error('Error saving code:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit solution
router.post('/student/practice/submit', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId;
    const tenantId = req.tenantId;
    const { questionId, code, language, status, runtime, memory, testCasesPassed, totalTestCases } = req.body;
    
    let progress = await UserProgress.findOne({ 
      student: studentId, 
      tenant: tenantId 
    });
    
    if (!progress) {
      progress = new UserProgress({ 
        student: studentId, 
        tenant: tenantId 
      });
    }
    
    const question = await PracticeQuestion.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    const submission = {
      questionId,
      code,
      language,
      status,
      runtime,
      memory,
      testCasesPassed,
      totalTestCases
    };
    
    progress.submissions.push(submission);
    progress.totalSubmissions += 1;
    progress.lastActive = new Date();
    
    const hasAttempted = progress.submissions.some(s => 
      s.questionId.toString() === questionId && s !== submission
    );
    if (!hasAttempted) {
      progress.questionsAttempted += 1;
    }
    
    if (status === 'accepted') {
      progress.successfulSubmissions += 1;
      
      if (!progress.completedQuestions.includes(questionId)) {
        progress.completedQuestions.push(questionId);
        progress.questionsCompleted += 1;
        
        if (question.points) {
          progress.totalCoins += question.points;
        }
      }
    }
    
    progress.accuracy = progress.totalSubmissions > 0 
      ? Math.round((progress.successfulSubmissions / progress.totalSubmissions) * 100)
      : 0;
    
    await progress.save();
    res.json({ message: 'Submission recorded', progress });
  } catch (error) {
    console.error('Error submitting solution:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get student count
router.get('/student/practice/student-count', validateApiKey, async (req, res) => {
  try {
    const tenantId = req.tenantId;
    const Student = require('../models/Student');
    const totalStudents = await Student.countDocuments({ tenant: tenantId });
    res.json({ totalStudents });
  } catch (error) {
    console.error('Error fetching student count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;