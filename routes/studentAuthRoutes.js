const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const { validateApiKey } = require('../middleware/apiKeyAuth');

const router = express.Router();

// Student login with tenant validation
router.post('/student/login', validateApiKey, async (req, res) => {
  try {
    const { email, password } = req.body;
    const tenantId = req.tenantId; // From API key middleware

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find student by email and verify they belong to the correct tenant
    const student = await Student.findOne({ 
      email: email.toLowerCase(),
      tenant: tenantId,
      isActive: true
    });

    if (!student) {
      return res.status(401).json({ 
        message: 'Invalid credentials or student not found in this tenant' 
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, student.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        studentId: student._id,
        tenantId: tenantId,
        email: student.email,
        role: 'student'
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        batch: student.profile?.batch || [],
        tenant: req.tenant.name
      }
    });

  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get student profile by token
router.get('/student/profile', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId;
    const tenantId = req.tenantId;

    const student = await Student.findOne({
      _id: studentId,
      tenant: tenantId,
      isActive: true
    }).select('-password');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({
      id: student._id,
      name: student.name,
      email: student.email,
      batch: student.profile?.batch || [],
      tenant: req.tenant.name
    });
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get student batches
router.get('/student/batches', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId;
    const tenantId = req.tenantId;

    // Find batches where this student is enrolled
    const Batch = require('../models/Batch');
    const batches = await Batch.find({
      tenant: tenantId,
      students: studentId,
      isActive: true
    }).select('name description');

    res.json(batches);
  } catch (error) {
    console.error('Error fetching student batches:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get student quizzes
router.get('/student/quizzes', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const tenantId = req.tenantId;

    const Quiz = require('../models/Quiz');
    const quizzes = await Quiz.find({
      tenant: tenantId
    }).select('title description duration questions status createdAt startTime').sort({ createdAt: -1 });

    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching student quizzes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get quiz details
router.get('/student/quiz/:quizId', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const tenantId = req.tenantId;
    const { quizId } = req.params;

    const Quiz = require('../models/Quiz');
    const quiz = await Quiz.findOne({
      _id: quizId,
      tenant: tenantId
    }).populate('questions').select('title description duration questions status createdAt startTime earlyStartBuffer maxTabSwitches');

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get quiz attempts
router.get('/student/quiz/:quizId/attempts', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId;
    const tenantId = req.tenantId;
    const { quizId } = req.params;

    const QuizAttempt = require('../models/QuizAttempt');
    const attempts = await QuizAttempt.find({
      student: studentId,
      quiz: quizId,
      tenant: tenantId
    }).sort({ createdAt: -1 });

    res.json(attempts);
  } catch (error) {
    console.error('Error fetching quiz attempts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current quiz attempt
router.get('/student/quiz/:quizId/attempt', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId;
    const tenantId = req.tenantId;
    const { quizId } = req.params;

    const QuizAttempt = require('../models/QuizAttempt');
    const attempt = await QuizAttempt.findOne({
      student: studentId,
      quiz: quizId,
      tenant: tenantId
    }).sort({ createdAt: -1 });

    res.json(attempt);
  } catch (error) {
    console.error('Error fetching quiz attempt:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start new quiz attempt
router.post('/student/quiz/:quizId/start', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId;
    const tenantId = req.tenantId;
    const { quizId } = req.params;

    const Quiz = require('../models/Quiz');
    const QuizAttempt = require('../models/QuizAttempt');
    
    // Check for existing attempts
    const existingAttempts = await QuizAttempt.find({
      student: studentId,
      quiz: quizId,
      tenant: tenantId
    }).sort({ attemptNumber: -1 });

    const latestAttempt = existingAttempts[0];
    
    // Check if user can start/resume
    if (latestAttempt) {
      if (latestAttempt.attemptStatus === 'IN_PROGRESS') {
        return res.json(latestAttempt);
      }
      if (latestAttempt.attemptStatus === 'RESUME_ALLOWED') {
        return res.json(latestAttempt);
      }
      if (latestAttempt.attemptStatus === 'RETAKE_ALLOWED') {
        // Create new attempt for retake
        const newAttemptNumber = existingAttempts.length + 1;
        const quiz = await Quiz.findById(quizId);
        
        const newAttempt = new QuizAttempt({
          student: studentId,
          quiz: quizId,
          tenant: tenantId,
          attemptNumber: newAttemptNumber,
          totalQuestions: quiz.questions.length,
          startedAt: new Date(),
          remainingTimeSeconds: quiz.duration * 60,
          attemptStatus: 'RETAKE_STARTED',
          instructorPermissionType: 'RETAKE'
        });
        
        await newAttempt.save();
        return res.json(newAttempt);
      }
      
      // User has completed/terminated attempts and no permission
      return res.status(403).json({ 
        message: 'Quiz already attempted. Contact instructor for retake permission.',
        latestAttempt: {
          status: latestAttempt.attemptStatus,
          completedAt: latestAttempt.completedAt
        }
      });
    }
    
    // First attempt
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Check timing
    const now = new Date();
    const startTime = new Date(quiz.startTime);
    const lateStartCutoff = new Date(startTime.getTime() + (quiz.earlyStartBuffer || 0) * 60 * 1000);
    
    if (now > lateStartCutoff) {
      return res.status(400).json({ message: 'Too late to start quiz' });
    }

    const attempt = new QuizAttempt({
      student: studentId,
      quiz: quizId,
      tenant: tenantId,
      attemptNumber: 1,
      totalQuestions: quiz.questions.length,
      startedAt: new Date(),
      remainingTimeSeconds: quiz.duration * 60,
      attemptStatus: 'STARTED'
    });

    await attempt.save();
    res.json(attempt);
  } catch (error) {
    console.error('Error starting quiz attempt:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save interrupted state
router.post('/student/attempt/:attemptId/interrupt', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const { attemptId } = req.params;
    const { lastActiveQuestionId, answers, timeUsedSeconds, remainingTimeSeconds, tabSwitchCount, interruptionReason } = req.body;

    const QuizAttempt = require('../models/QuizAttempt');
    await QuizAttempt.findByIdAndUpdate(attemptId, {
      attemptStatus: 'INTERRUPTED',
      lastActiveQuestionId: typeof lastActiveQuestionId === 'number' ? lastActiveQuestionId : 0,
      answers,
      timeUsedSeconds,
      remainingTimeSeconds,
      tabSwitchCount,
      interruptionReason
    });

    res.json({ message: 'Interrupted state saved' });
  } catch (error) {
    console.error('Error saving interrupted state:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save individual answer
router.patch('/student/attempt/:attemptId/answer', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const { attemptId } = req.params;
    const { questionId, selectedAnswer, lastUpdatedTime } = req.body;

    const QuizAttempt = require('../models/QuizAttempt');
    const attempt = await QuizAttempt.findById(attemptId);
    
    if (!attempt || attempt.student.toString() !== decoded.studentId) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    // Update answers object
    const answers = attempt.answers || {};
    answers[questionId] = selectedAnswer;
    
    await QuizAttempt.findByIdAndUpdate(attemptId, {
      answers,
      updatedAt: new Date()
    });

    res.json({ message: 'Answer saved' });
  } catch (error) {
    console.error('Error saving answer:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update attempt status
router.patch('/student/attempt/:attemptId/status', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const { attemptId } = req.params;
    const { status } = req.body;

    const QuizAttempt = require('../models/QuizAttempt');
    await QuizAttempt.findByIdAndUpdate(attemptId, { attemptStatus: status });

    res.json({ message: 'Status updated' });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save progress
router.patch('/student/attempt/:attemptId/progress', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const { attemptId } = req.params;
    const { answers, lastActiveQuestionId, timeUsedSeconds, remainingTimeSeconds } = req.body;

    const QuizAttempt = require('../models/QuizAttempt');
    await QuizAttempt.findByIdAndUpdate(attemptId, {
      answers,
      lastActiveQuestionId: typeof lastActiveQuestionId === 'number' ? lastActiveQuestionId : 0,
      timeUsedSeconds,
      remainingTimeSeconds
    });

    res.json({ message: 'Progress saved' });
  } catch (error) {
    console.error('Error saving progress:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Resume quiz
router.post('/student/attempt/:attemptId/resume', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const { attemptId } = req.params;

    console.log('Resume quiz request for attempt:', attemptId);

    const QuizAttempt = require('../models/QuizAttempt');
    const attempt = await QuizAttempt.findById(attemptId);
    
    console.log('Found attempt:', attempt ? attempt.attemptStatus : 'Not found');
    
    if (!attempt || attempt.attemptStatus !== 'RESUME_ALLOWED') {
      console.log('Resume not allowed. Status:', attempt?.attemptStatus);
      return res.status(400).json({ message: 'Resume not allowed' });
    }

    // Update attempt status and reset tab switches to 0
    const updatedAttempt = await QuizAttempt.findByIdAndUpdate(
      attemptId,
      {
        attemptStatus: 'IN_PROGRESS',
        resumeCount: (attempt.resumeCount || 0) + 1,
        resumedAt: new Date(),
        resumeToken: null,
        tabSwitchCount: 0 // Reset tab switches to zero on resume
      },
      { new: true }
    );
    
    console.log('Resume successful for attempt:', attemptId, 'Tab switches reset to 0');
    res.json({ 
      message: 'Quiz resumed successfully - tab switches reset to zero',
      attempt: updatedAttempt 
    });
  } catch (error) {
    console.error('Error resuming quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update system info periodically
router.post('/student/attempt/:attemptId/system-info', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const { attemptId } = req.params;
    const { systemInfo } = req.body;

    const QuizAttempt = require('../models/QuizAttempt');
    await QuizAttempt.findByIdAndUpdate(attemptId, {
      $push: { 'sessionData.systemInfo': { ...systemInfo, timestamp: new Date() } }
    });

    res.json({ message: 'System info updated' });
  } catch (error) {
    console.error('Error updating system info:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Store session start info
router.post('/student/quiz/:quizId/session-start', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId;
    const tenantId = req.tenantId;
    const { quizId } = req.params;
    const { startIP, systemInfo, startTime } = req.body;

    const QuizAttempt = require('../models/QuizAttempt');
    const attempt = await QuizAttempt.findOne({
      student: studentId,
      quiz: quizId,
      tenant: tenantId
    }).sort({ createdAt: -1 });

    if (attempt) {
      await QuizAttempt.findByIdAndUpdate(attempt._id, {
        'sessionData.startIP': startIP,
        $push: { 'sessionData.systemInfo': { ...systemInfo, timestamp: new Date(startTime) } },
        'sessionData.sessionStartTime': new Date(startTime)
      });
    }

    res.json({ message: 'Session start data stored' });
  } catch (error) {
    console.error('Error storing session start:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

    // Submit quiz
    router.post('/student/attempt/:attemptId/submit', validateApiKey, async (req, res) => {
      try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
          return res.status(401).json({ message: 'No token provided' });
        }

        const { attemptId } = req.params;
        const { answers, submissionReason, timeUsedSeconds, endIP, endTime } = req.body;

        const QuizAttempt = require('../models/QuizAttempt');
        const Quiz = require('../models/Quiz');
        
        const attempt = await QuizAttempt.findById(attemptId).populate('quiz');
        if (!attempt) {
          return res.status(404).json({ message: 'Attempt not found' });
        }

        // Calculate actual time used if not provided
        let actualTimeUsed = timeUsedSeconds;
        if (!actualTimeUsed) {
          const startTime = new Date(attempt.startedAt);
          const now = new Date();
          actualTimeUsed = Math.floor((now - startTime) / 1000);
        }

        // Calculate score from answers array (only attempted questions)
        let score = 0;
        const quiz = attempt.quiz;
        
        // Always use the submitted answers for score calculation
        console.log('Using quiz answers map for score calculation');
        console.log('Quiz answers map:', quiz.answers);
        
        Object.entries(answers).forEach(([questionId, selectedAnswer]) => {
          const correctAnswer = quiz.answers?.get(questionId);
          console.log('Question ID:', questionId);
          console.log('Selected answer:', selectedAnswer);
          console.log('Correct answer:', correctAnswer);
          console.log('Match:', selectedAnswer === correctAnswer);
          
          if (selectedAnswer === correctAnswer) {
            score++;
          }
          console.log('---');
        });
        console.log('Final score:', score);

        // Update attempt
        attempt.answers = Object.entries(answers).map(([questionId, selectedAnswer]) => {
          // Skip invalid entries
          if (!selectedAnswer || typeof selectedAnswer === 'object') {
            return null;
          }
          
          const question = quiz.questions.find(q => q._id.toString() === questionId);
          let isCorrect = false;
          
          console.log('Processing question:', questionId);
          console.log('Selected answer:', selectedAnswer);
          console.log('Question found:', !!question);
          
          if (question && selectedAnswer && question.options && question.options[question.correctAnswer]) {
            // Get the correct answer text from the options array using the correctAnswer index
            const correctAnswerText = question.options[question.correctAnswer].text;
            console.log('Correct answer index:', question.correctAnswer);
            console.log('Correct answer text:', correctAnswerText);
            console.log('Match:', selectedAnswer === correctAnswerText);
            isCorrect = selectedAnswer === correctAnswerText;
          }
          
          return {
            questionId,
            selectedAnswer,
            isCorrect
          };
        }).filter(answer => answer !== null);
        
        attempt.score = score;
        attempt.timeTaken = Math.ceil(actualTimeUsed / 60);
        attempt.timeUsedSeconds = actualTimeUsed;
        attempt.completedAt = new Date();
        attempt.attemptStatus = ['TAB_SWITCH_VIOLATION', 'FULLSCREEN_EXIT_VIOLATION', 'SYSTEM_CHANGE_VIOLATION'].includes(submissionReason) ? 'TAB_SWITCH_VIOLATION' : 'COMPLETED';
    attempt.submissionReason = submissionReason;
        
        // Store end session data
        if (endIP || endTime) {
          attempt.sessionData = attempt.sessionData || {};
          if (endIP) attempt.sessionData.endIP = endIP;
          if (endTime) attempt.sessionData.sessionEndTime = new Date(endTime);
        }
        
        await attempt.save();
        res.json({ message: 'Quiz submitted successfully', score, totalQuestions: quiz.questions.length });
      } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });

// Update tab switch count
router.patch('/student/attempt/:attemptId/tab-switch', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const { attemptId } = req.params;

    const AssessmentAttempt = require('../models/AssessmentAttempt');
    const updated = await AssessmentAttempt.findByIdAndUpdate(
      attemptId, 
      { $inc: { tabSwitchCount: 1 } },
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    res.json({ message: 'Tab switch count updated', count: updated.tabSwitchCount });
  } catch (error) {
    console.error('Error updating tab switch count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update fullscreen exit count
router.patch('/student/attempt/:attemptId/fullscreen-exit', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const { attemptId } = req.params;

    const AssessmentAttempt = require('../models/AssessmentAttempt');
    const updated = await AssessmentAttempt.findByIdAndUpdate(
      attemptId, 
      { $inc: { fullscreenExitCount: 1 } },
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    res.json({ message: 'Fullscreen exit count updated', count: updated.fullscreenExitCount });
  } catch (error) {
    console.error('Error updating fullscreen exit count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get quiz results (only after quiz time expires)
router.get('/student/quiz/:quizId/results', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId;
    const tenantId = req.tenantId;
    const { quizId } = req.params;

    const Quiz = require('../models/Quiz');
    const QuizAttempt = require('../models/QuizAttempt');
    
    // Get quiz details
    const quiz = await Quiz.findOne({
      _id: quizId,
      tenant: tenantId
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Check if quiz time has expired
    const now = new Date().getTime();
    const startTime = new Date(quiz.startTime).getTime();
    const endTime = startTime + (quiz.duration * 60 * 1000);
    
    if (now < endTime) {
      return res.status(403).json({ 
        message: 'Quiz results not available yet. Please wait until quiz time expires.',
        timeRemaining: endTime - now
      });
    }

    // Get student's attempt
    const attempt = await QuizAttempt.findOne({
      student: studentId,
      quiz: quizId,
      tenant: tenantId,
      attemptStatus: { $in: ['COMPLETED', 'TAB_SWITCH_VIOLATION'] }
    }).populate('quiz');

    if (!attempt) {
      return res.status(404).json({ message: 'No completed attempt found' });
    }

    res.json(attempt);
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get leaderboard data
router.get('/student/leaderboard', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const tenantId = req.tenantId;
    const { type = 'overall' } = req.query;

    const Student = require('../models/Student');
    const Quiz = require('../models/Quiz');
    const QuizAttempt = require('../models/QuizAttempt');

    // Get all students in this tenant
    const students = await Student.find({ tenant: tenantId, isActive: true }).select('name email');
    
    // Get total quizzes based on type
    let quizFilter = { tenant: tenantId, status: 'active' };
    if (type === 'quiz') {
      quizFilter.type = { $in: ['quiz', null] }; // Include quizzes without type field
    } else if (type === 'assessment') {
      quizFilter.type = 'assessment';
    }
    
    const totalQuizzes = await Quiz.countDocuments(quizFilter);
    const quizIds = await Quiz.find(quizFilter).distinct('_id');
    
    console.log(`Leaderboard request - Type: ${type}, Total quizzes: ${totalQuizzes}, Students: ${students.length}`);
    
    // Calculate leaderboard data for each student
    const leaderboardData = await Promise.all(
      students.map(async (student) => {
        let attemptFilter = {
          student: student._id,
          tenant: tenantId,
          attemptStatus: { $in: ['COMPLETED', 'TAB_SWITCH_VIOLATION'] }
        };
        
        // Filter attempts by quiz type if specified
        if (type !== 'overall') {
          attemptFilter.quiz = { $in: quizIds };
        }
        
        const attempts = await QuizAttempt.find(attemptFilter);
        
        const totalAttempted = attempts.length;
        const totalScore = attempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0);
        const totalPossible = attempts.reduce((sum, attempt) => sum + (attempt.totalQuestions || 0), 0);
        const averageScore = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;
        const participationRate = totalQuizzes > 0 ? (totalAttempted / totalQuizzes) : 0;
        
        // Effective Score: 70% performance + 30% participation
        const effectiveScore = (averageScore * 0.7) + (participationRate * 100 * 0.3);
        
        return {
          id: student._id,
          name: student.name,
          email: student.email,
          totalQuizzes: totalAttempted,
          totalAvailable: totalQuizzes,
          averageScore,
          participationRate: Math.round(participationRate * 100),
          effectiveScore: Math.round(effectiveScore * 100) / 100,
          totalScore
        };
      })
    );
    
    // Sort by effective score descending, exclude students with 0 participation or 0 effective score
    const sortedLeaderboard = leaderboardData
      .filter(student => student.participationRate > 0 || student.effectiveScore > 0)
      .sort((a, b) => b.effectiveScore - a.effectiveScore);
    
    console.log(`Returning ${sortedLeaderboard.length} students in leaderboard`);
    res.json(sortedLeaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get student assessments
router.get('/student/assessments', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId;
    const tenantId = req.tenantId;

    const Assessment = require('../models/Assessment');
    const Batch = require('../models/Batch');
    
    // Find batches where this student is enrolled
    const studentBatches = await Batch.find({
      tenant: tenantId,
      students: studentId
    }).select('_id');
    
    const batchIds = studentBatches.map(b => b._id);
    
    // Find assessments where:
    // 1. Assessment has no batches (empty array) - available to all students
    // 2. Assessment has batches and student is in one of those batches
    const assessments = await Assessment.find({
      tenantId: tenantId,
      $or: [
        { batches: { $size: 0 } },
        { batches: { $in: batchIds } }
      ]
    }).sort({ createdAt: -1 });

    const populatedAssessments = await Assessment.populate(assessments, [
      { path: 'questions' },
      { path: 'quizQuestions' }
    ]);

    res.json(populatedAssessments);
  } catch (error) {
    console.error('Error fetching student assessments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get assessment details
router.get('/student/assessment/:assessmentId', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const tenantId = req.tenantId;
    const { assessmentId } = req.params;

    const Assessment = require('../models/Assessment');
    const assessment = await Assessment.findOne({
      _id: assessmentId,
      tenantId: tenantId
    })
    .populate('questions')
    .populate('frontendQuestions')
    .populate('quizQuestions');

    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    res.json(assessment);
  } catch (error) {
    console.error('Error fetching assessment details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get assessment questions without answers (for caching)
router.get('/student/assessment/:assessmentId/questions', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const tenantId = req.tenantId;
    const { assessmentId } = req.params;

    const Assessment = require('../models/Assessment');
    const assessment = await Assessment.findOne({
      _id: assessmentId,
      tenantId: tenantId
    })
    .populate({
      path: 'questions',
      select: '-solution' // Exclude only solutions, keep testCases
    })
    .populate({
      path: 'frontendQuestions'
    })
    .populate({
      path: 'quizQuestions',
      select: '-correctAnswer' // Exclude correct answers
    });

    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    res.json({
      programmingQuestions: assessment.questions,
      frontendQuestions: assessment.frontendQuestions,
      quizQuestions: assessment.quizQuestions
    });
  } catch (error) {
    console.error('Error fetching assessment questions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get assessment attempts
router.get('/student/assessment/:assessmentId/attempts', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId;
    const tenantId = req.tenantId;
    const { assessmentId } = req.params;

    const AssessmentAttempt = require('../models/AssessmentAttempt');
    const attempts = await AssessmentAttempt.find({
      student: studentId,
      assessment: assessmentId,
      tenantId: tenantId
    }).sort({ createdAt: -1 });

    res.json(attempts);
  } catch (error) {
    console.error('Error fetching assessment attempts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current assessment attempt
router.get('/student/assessment/:assessmentId/attempt', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId;
    const tenantId = req.tenantId;
    const { assessmentId } = req.params;

    const AssessmentAttempt = require('../models/AssessmentAttempt');
    const attempt = await AssessmentAttempt.findOne({
      student: studentId,
      assessment: assessmentId,
      tenantId: tenantId
    }).sort({ createdAt: -1 });

    res.json(attempt);
  } catch (error) {
    console.error('Error fetching assessment attempt:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start new assessment attempt
router.post('/student/assessment/:assessmentId/start', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId;
    const tenantId = req.tenantId;
    const { assessmentId } = req.params;
    const { systemInfo, startIP } = req.body;

    const Assessment = require('../models/Assessment');
    const AssessmentAttempt = require('../models/AssessmentAttempt');
    
    // Check for existing attempts
    const existingAttempts = await AssessmentAttempt.find({
      student: studentId,
      assessment: assessmentId,
      tenantId: tenantId
    }).sort({ attemptNumber: -1 });

    const latestAttempt = existingAttempts[0];
    
    // Check if user can start/resume
    if (latestAttempt) {
      if (latestAttempt.attemptStatus === 'IN_PROGRESS') {
        return res.json(latestAttempt);
      }
      if (latestAttempt.attemptStatus === 'RESUME_ALLOWED') {
        // Update status to IN_PROGRESS and return the attempt
        latestAttempt.attemptStatus = 'IN_PROGRESS';
        latestAttempt.resumeCount = (latestAttempt.resumeCount || 0) + 1;
        latestAttempt.resumedAt = new Date();
        await latestAttempt.save();
        return res.json(latestAttempt);
      }
      if (latestAttempt.attemptStatus === 'RETAKE_ALLOWED') {
        // Reset the existing attempt for retake instead of creating new one
        const assessment = await Assessment.findById(assessmentId);
        
        latestAttempt.attemptStatus = 'IN_PROGRESS';
        latestAttempt.startedAt = new Date();
        latestAttempt.remainingTimeSeconds = assessment.duration * 60;
        latestAttempt.completedAt = null;
        latestAttempt.answers = [];
        latestAttempt.score = null;
        latestAttempt.timeTaken = null;
        latestAttempt.timeUsedSeconds = null;
        latestAttempt.submissionReason = null;
        latestAttempt.tabSwitchCount = 0;
        latestAttempt.fullscreenExitCount = 0;
        latestAttempt.lastExecutedCode = {};
        latestAttempt.successfulCodes = {};
        latestAttempt.retakeCount = (latestAttempt.retakeCount || 0) + 1;
        latestAttempt.retakenAt = new Date();
        
        await latestAttempt.save();
        return res.json(latestAttempt);
      }
      
      // User has completed/terminated attempts and no permission
      return res.status(403).json({ 
        message: 'Assessment already attempted. Contact instructor for retake permission.',
        latestAttempt: {
          status: latestAttempt.attemptStatus,
          completedAt: latestAttempt.completedAt
        }
      });
    }
    
    // First attempt
    const assessment = await Assessment.findById(assessmentId)
      .populate('questions')
      .populate('frontendQuestions')
      .populate('quizQuestions');
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    // Check if assessment can be started based on startTime and earlyStartBuffer
    if (assessment.startTime) {
      const now = new Date();
      const earlyStartBuffer = assessment.earlyStartBuffer || 0;
      const allowedStartTime = new Date(assessment.startTime.getTime() - (earlyStartBuffer * 60 * 1000));
      
      if (now < allowedStartTime) {
        return res.status(403).json({ 
          message: `Assessment cannot be started yet. It will be available from ${allowedStartTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
          startTime: assessment.startTime,
          earlyStartBuffer: earlyStartBuffer,
          allowedStartTime: allowedStartTime
        });
      }
    }

    const totalProgrammingQuestions = (assessment.questions && assessment.questions.length) || 0;
    const totalFrontendQuestions = (assessment.frontendQuestions && assessment.frontendQuestions.length) || 0;
    const totalQuizQuestions = (assessment.quizQuestions && assessment.quizQuestions.length) || 0;
    const totalQuestions = totalProgrammingQuestions + totalFrontendQuestions + totalQuizQuestions;

    console.log('Assessment counts:', {
      totalProgrammingQuestions,
      totalQuizQuestions,
      totalQuestions,
      programmingQuestionsArray: assessment.questions,
      quizQuestionsArray: assessment.quizQuestions
    });

    const attempt = new AssessmentAttempt({
      student: studentId,
      assessment: assessmentId,
      tenantId: tenantId,
      attemptNumber: 1,
      totalQuestions: totalQuestions,
      totalProgrammingQuestions: totalProgrammingQuestions,
      totalFrontendQuestions: totalFrontendQuestions,
      totalQuizQuestions: totalQuizQuestions,
      startedAt: new Date(),
      remainingTimeSeconds: assessment.duration * 60,
      attemptStatus: 'IN_PROGRESS'
    });

    await attempt.save();
    
    // Update with session data after save
    await AssessmentAttempt.findByIdAndUpdate(attempt._id, {
      'sessionData.startIP': startIP,
      $push: { 'sessionData.systemInfo': { ...systemInfo, timestamp: new Date() } },
      'sessionData.sessionStartTime': new Date()
    });
    
    res.json(attempt);
  } catch (error) {
    console.error('Error starting assessment attempt:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit assessment
router.post('/student/assessment/:assessmentId/submit', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const { assessmentId } = req.params;
    const { answers, submissionReason, timeUsedSeconds, endIP, endTime, attemptId } = req.body;

    const AssessmentAttempt = require('../models/AssessmentAttempt');
    
    const attempt = await AssessmentAttempt.findById(attemptId);
    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    // Calculate actual time used if not provided
    let actualTimeUsed = timeUsedSeconds;
    if (!actualTimeUsed) {
      const startTime = new Date(attempt.startedAt);
      const now = new Date();
      actualTimeUsed = Math.floor((now - startTime) / 1000);
    }

    // Update attempt
    attempt.answers = answers;
    attempt.timeTaken = Math.ceil(actualTimeUsed / 60);
    attempt.timeUsedSeconds = actualTimeUsed;
    attempt.completedAt = new Date();
    attempt.attemptStatus = ['TAB_SWITCH_VIOLATION', 'FULLSCREEN_EXIT_VIOLATION', 'SYSTEM_CHANGE_VIOLATION'].includes(submissionReason) ? 'TAB_SWITCH_VIOLATION' : 'COMPLETED';
    attempt.submissionReason = submissionReason;
    
    // Store end session data
    if (endIP || endTime) {
      attempt.sessionData = attempt.sessionData || {};
      if (endIP) attempt.sessionData.endIP = endIP;
      if (endTime) attempt.sessionData.sessionEndTime = new Date(endTime);
    }
    
    await attempt.save();
    res.json({ message: 'Assessment submitted successfully' });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update system info for assessment
router.post('/student/assessment-attempt/:attemptId/system-info', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const { attemptId } = req.params;
    const { systemInfo, endIP, connectionLost, reason, heartbeat, timestamp } = req.body;

    const AssessmentAttempt = require('../models/AssessmentAttempt');
    
    const updateData = {};
    
    // Handle different types of system events
    if (connectionLost) {
      updateData['$push'] = { 'sessionData.connectionEvents': { 
        type: 'CONNECTION_LOST', 
        timestamp: new Date(timestamp || Date.now()) 
      }};
    } else if (reason === 'BROWSER_CLOSE') {
      updateData['$push'] = { 'sessionData.connectionEvents': { 
        type: 'BROWSER_CLOSE', 
        timestamp: new Date(timestamp || Date.now()) 
      }};
    } else if (heartbeat) {
      updateData['sessionData.lastHeartbeat'] = new Date(timestamp || Date.now());
    } else if (systemInfo) {
      updateData['$push'] = { 'sessionData.systemInfo': { ...systemInfo, timestamp: new Date() } };
    }
    
    // Update end IP if provided
    if (endIP) {
      updateData['sessionData.endIP'] = endIP;
    }
    
    await AssessmentAttempt.findByIdAndUpdate(attemptId, updateData);

    res.json({ message: 'System info updated' });
  } catch (error) {
    console.error('Error updating assessment system info:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Heartbeat endpoint for assessment attempts
router.post('/student/assessment-attempt/:attemptId/heartbeat', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const { attemptId } = req.params;
    const { timestamp } = req.body;

    const AssessmentAttempt = require('../models/AssessmentAttempt');
    
    await AssessmentAttempt.findByIdAndUpdate(attemptId, {
      'sessionData.lastHeartbeat': new Date(timestamp || Date.now())
    });

    res.json({ message: 'Heartbeat recorded' });
  } catch (error) {
    console.error('Error recording heartbeat:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get last executed code
router.get('/student/assessment-attempt/:attemptId/last-code', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const { attemptId } = req.params
    const AssessmentAttempt = require('../models/AssessmentAttempt')
    const attempt = await AssessmentAttempt.findById(attemptId)
    
    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' })
    }

    res.json({ lastExecutedCode: attempt.lastExecutedCode || {} })
  } catch (error) {
    console.error('Error getting last executed code:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Save code to backend
router.post('/student/assessment-attempt/:attemptId/save-code', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const { attemptId } = req.params
    const { questionId, language, code, isSuccessful, testResults } = req.body

    const AssessmentAttempt = require('../models/AssessmentAttempt')
    const Assessment = require('../models/Assessment')
    
    const attempt = await AssessmentAttempt.findById(attemptId).populate('assessment')
    
    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' })
    }

    // Update last executed code
    const lastExecutedCode = attempt.lastExecutedCode || {}
    if (!lastExecutedCode[questionId]) lastExecutedCode[questionId] = {}
    lastExecutedCode[questionId][language] = code
    
    // Update successful codes if submission was successful
    const successfulCodes = attempt.successfulCodes || {}
    if (isSuccessful) {
      if (!successfulCodes[questionId]) successfulCodes[questionId] = {}
      successfulCodes[questionId][language] = code
    }
    
    // Calculate percentage for this question if testResults provided
    const questionPercentages = attempt.questionPercentages || {}
    const problemAccuracies = attempt.problemAccuracies || {}
    
    if (testResults && testResults.length > 0) {
      const passedTests = testResults.filter(result => result.passed === true).length
      const totalTests = testResults.length
      const percentage = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0
      questionPercentages[questionId] = percentage
      
      // Store accuracy data for this problem
      problemAccuracies[questionId] = {
        passed: passedTests,
        total: totalTests,
        accuracy: percentage
      }
    }
    
    // Get assessment to identify programming questions
    const assessment = await Assessment.findById(attempt.assessment).populate('questions')
    const programmingQuestionIds = assessment.questions.map(q => q._id.toString())
    
    // Calculate programming percentage (sum of all programming question percentages / total programming questions)
    const programmingPercentages = Object.entries(questionPercentages)
      .filter(([qId]) => programmingQuestionIds.includes(qId))
      .map(([, percentage]) => percentage)
    
    const programmingPercentageSum = programmingPercentages.reduce((sum, p) => sum + p, 0)
    const totalProgrammingQuestions = attempt.totalProgrammingQuestions || 0
    const programmingPercentage = totalProgrammingQuestions > 0
      ? Math.round(programmingPercentageSum / totalProgrammingQuestions)
      : 0
    
    // Calculate overall percentage (average of programming and quiz percentages)
    const quizPercentage = attempt.quizPercentage || 0
    const attemptTotalQuizQuestions = attempt.totalQuizQuestions || 0
    const attemptTotalProgrammingQuestions = attempt.totalProgrammingQuestions || 0
    
    let overallPercentage = 0
    if (attemptTotalQuizQuestions > 0 && attemptTotalProgrammingQuestions > 0) {
      // Both quiz and programming questions exist
      overallPercentage = Math.round((programmingPercentage + quizPercentage) / 2)
    } else if (attemptTotalProgrammingQuestions > 0) {
      // Only programming questions
      overallPercentage = programmingPercentage
    } else if (attemptTotalQuizQuestions > 0) {
      // Only quiz questions
      overallPercentage = quizPercentage
    }
    
    // Calculate overall accuracy (average of all problem accuracies)
    const accuracyValues = Object.values(problemAccuracies).map(p => p.accuracy)
    const accuracy = accuracyValues.length > 0
      ? Math.round(accuracyValues.reduce((sum, acc) => sum + acc, 0) / accuracyValues.length)
      : 0
    
    console.log('💯 Saving accuracy:', { accuracy, problemAccuracies })
    
    await AssessmentAttempt.findByIdAndUpdate(attemptId, {
      lastExecutedCode,
      successfulCodes,
      questionPercentages,
      problemAccuracies,
      accuracy,
      programmingPercentage,
      overallPercentage
    })

    res.json({ 
      message: 'Code saved successfully',
      questionPercentage: questionPercentages[questionId] || 0,
      accuracy,
      programmingPercentage,
      overallPercentage
    })
  } catch (error) {
    console.error('Error saving code:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Save frontend code
router.post('/student/assessment-attempt/:attemptId/save-frontend-code', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const { attemptId } = req.params
    const { questionId, html, css, js, testResults } = req.body

    const AssessmentAttempt = require('../models/AssessmentAttempt')
    const Assessment = require('../models/Assessment')
    
    const attempt = await AssessmentAttempt.findById(attemptId)
    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' })
    }

    // Update last executed frontend code
    const lastExecutedFrontendCode = attempt.lastExecutedFrontendCode || {}
    lastExecutedFrontendCode[questionId] = { html, css, js }
    
    // Calculate percentage for this question if testResults provided
    const questionPercentages = attempt.questionPercentages || {}
    
    if (testResults && testResults.tests && testResults.tests.length > 0) {
      const passedTests = testResults.tests.filter(test => test.status === 'passed').length
      const totalTests = testResults.tests.length
      const percentage = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0
      questionPercentages[questionId] = percentage
    }
    
    // Get assessment to identify frontend questions
    const assessment = await Assessment.findById(attempt.assessment).populate('frontendQuestions')
    const frontendQuestionIds = assessment.frontendQuestions.map(q => q._id.toString())
    
    // Calculate frontend percentage
    const frontendPercentages = Object.entries(questionPercentages)
      .filter(([qId]) => frontendQuestionIds.includes(qId))
      .map(([, percentage]) => percentage)
    
    const frontendPercentageSum = frontendPercentages.reduce((sum, p) => sum + p, 0)
    const totalFrontendQuestions = attempt.totalFrontendQuestions || 0
    const frontendPercentage = totalFrontendQuestions > 0
      ? Math.round(frontendPercentageSum / totalFrontendQuestions)
      : 0
    
    // Calculate overall percentage
    const programmingPercentage = attempt.programmingPercentage || 0
    const quizPercentage = attempt.quizPercentage || 0
    const totalProgramming = attempt.totalProgrammingQuestions || 0
    const totalQuiz = attempt.totalQuizQuestions || 0
    const totalFrontend = attempt.totalFrontendQuestions || 0
    
    let overallPercentage = 0
    let count = 0
    if (totalProgramming > 0) { overallPercentage += programmingPercentage; count++ }
    if (totalQuiz > 0) { overallPercentage += quizPercentage; count++ }
    if (totalFrontend > 0) { overallPercentage += frontendPercentage; count++ }
    overallPercentage = count > 0 ? Math.round(overallPercentage / count) : 0
    
    await AssessmentAttempt.findByIdAndUpdate(attemptId, {
      lastExecutedFrontendCode,
      questionPercentages,
      frontendPercentage,
      overallPercentage
    })

    res.json({ 
      message: 'Frontend code saved successfully',
      questionPercentage: questionPercentages[questionId] || 0,
      frontendPercentage,
      overallPercentage
    })
  } catch (error) {
    console.error('Error saving frontend code:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Save quiz answer
router.post('/student/assessment-attempt/:attemptId/save-quiz-answer', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const { attemptId } = req.params
    const { questionId, selectedAnswer } = req.body

    const AssessmentAttempt = require('../models/AssessmentAttempt')
    const Assessment = require('../models/Assessment')
    
    const attempt = await AssessmentAttempt.findById(attemptId)
    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' })
    }

    // Get assessment to find the correct answer
    const assessment = await Assessment.findById(attempt.assessment).populate('quizQuestions')
    const quizQuestion = assessment.quizQuestions.find(q => q._id.toString() === questionId)
    
    if (!quizQuestion) {
      return res.status(404).json({ message: 'Quiz question not found' })
    }

    const isCorrect = selectedAnswer === quizQuestion.correctAnswer
    const questionPercentage = isCorrect ? 100 : 0

    // Update quiz answers
    const quizAnswers = attempt.quizAnswers || {}
    quizAnswers[questionId] = { selectedAnswer, isCorrect }

    // Update question percentages
    const questionPercentages = attempt.questionPercentages || {}
    questionPercentages[questionId] = questionPercentage

    // Calculate quiz percentage (sum of all quiz question percentages / total quiz questions)
    const quizQuestionIds = assessment.quizQuestions.map(q => q._id.toString())
    const quizPercentageSum = Object.entries(questionPercentages)
      .filter(([qId]) => quizQuestionIds.includes(qId))
      .reduce((sum, [, percentage]) => sum + percentage, 0)
    
    const totalQuizQuestions = attempt.totalQuizQuestions || 0
    const quizPercentage = totalQuizQuestions > 0
      ? Math.round(quizPercentageSum / totalQuizQuestions)
      : 0

    // Calculate overall percentage
    const programmingPercentage = attempt.programmingPercentage || 0
    const attemptTotalQuizQuestions = attempt.totalQuizQuestions || 0
    const attemptTotalProgrammingQuestions = attempt.totalProgrammingQuestions || 0
    
    let overallPercentage = 0
    if (attemptTotalQuizQuestions > 0 && attemptTotalProgrammingQuestions > 0) {
      // Both quiz and programming questions exist
      overallPercentage = Math.round((programmingPercentage + quizPercentage) / 2)
    } else if (attemptTotalProgrammingQuestions > 0) {
      // Only programming questions
      overallPercentage = programmingPercentage
    } else if (attemptTotalQuizQuestions > 0) {
      // Only quiz questions
      overallPercentage = quizPercentage
    }

    await AssessmentAttempt.findByIdAndUpdate(attemptId, {
      quizAnswers,
      questionPercentages,
      quizPercentage,
      overallPercentage
    })

    res.json({ 
      message: 'Quiz answer saved successfully',
      isCorrect,
      questionPercentage,
      quizPercentage,
      overallPercentage
    })
  } catch (error) {
    console.error('Error saving quiz answer:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get total students count (public endpoint)
router.get('/student/practice/student-count', async (req, res) => {
  try {
    const Student = require('../models/Student');
    const totalStudents = await Student.countDocuments({ isActive: true });
    res.json({ totalStudents });
  } catch (error) {
    console.error('Error fetching student count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Change password
router.post('/student/change-password', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, student.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Set new password directly - the pre-save hook will hash it
    student.password = newPassword;
    await student.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;