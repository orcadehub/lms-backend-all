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

    console.log('=== LOGIN DEBUG ===');
    console.log('Email:', email);
    console.log('Tenant ID from API key:', tenantId);
    console.log('Tenant name:', req.tenant.name);
    console.log('==================');

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find student by email and verify they belong to the correct tenant
    const student = await Student.findOne({ 
      email: email.toLowerCase(),
      tenant: tenantId,
      isActive: true
    });

    console.log('Student found:', !!student);
    if (student) {
      console.log('Student tenant:', student.tenant);
      console.log('Expected tenant:', tenantId);
      console.log('Tenant match:', student.tenant.toString() === tenantId.toString());
    }

    if (!student) {
      console.log('Student not found or not in tenant:', email);
      return res.status(401).json({ 
        message: 'Invalid credentials or student not found in this tenant' 
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, student.password);
    console.log('Password valid:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('Invalid password for student:', email);
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

    console.log('Student login successful:', email);

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
    }).select('title description duration questions status createdAt startTime');

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

// Submit quiz
router.post('/student/attempt/:attemptId/submit', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const { attemptId } = req.params;
    const { answers, submissionReason, timeUsedSeconds } = req.body;

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
    attempt.attemptStatus = submissionReason === 'TAB_SWITCH_VIOLATION' ? 'TAB_SWITCH_VIOLATION' : 'COMPLETED';
    
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
    const { tabSwitchCount } = req.body;

    const QuizAttempt = require('../models/QuizAttempt');
    await QuizAttempt.findByIdAndUpdate(attemptId, { tabSwitchCount });

    res.json({ message: 'Tab switch count updated' });
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
    const { fullscreenExitCount } = req.body;

    const QuizAttempt = require('../models/QuizAttempt');
    await QuizAttempt.findByIdAndUpdate(attemptId, { fullscreenExitCount });

    res.json({ message: 'Fullscreen exit count updated' });
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

module.exports = router;