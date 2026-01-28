const { validationResult } = require('express-validator');
const Quiz = require('../models/Quiz');

const quizController = {
  // Get all quizzes for tenant
  getAllQuizzes: async (req, res) => {
    try {
      const { tenantId } = req.query;
      const quizzes = await Quiz.find({ tenant: tenantId })
        .populate('questions', 'title difficulty')
        .populate('batches', 'name students')
        .populate('createdBy', 'name')
        .select('+startTime')
        .sort({ createdAt: -1 });
      
      // Calculate participant count from batches
      const quizzesWithParticipants = quizzes.map(quiz => {
        const participantCount = quiz.batches.reduce((total, batch) => {
          return total + (batch.students ? batch.students.length : 0);
        }, 0);
        
        return {
          ...quiz.toObject(),
          participantCount
        };
      });
      
      res.json(quizzesWithParticipants);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Create new quiz
  createQuiz: async (req, res) => {
    try {
      console.log('Create quiz request body:', req.body);
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Quiz validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, duration, questions, batches, students } = req.body;
      const tenantId = req.user.assignedTenants[0];

      // Handle 'all' batches case
      let batchIds = [];
      if (batches === 'all') {
        const Batch = require('../models/Batch');
        const allBatches = await Batch.find({ tenant: tenantId });
        batchIds = allBatches.map(batch => batch._id);
      } else {
        batchIds = batches;
      }

      // Populate answers map with correct answers
      const QuizQuestion = require('../models/QuizQuestion');
      const questionDocs = await QuizQuestion.find({ _id: { $in: questions } });
      const answersMap = new Map();
      
      questionDocs.forEach(question => {
        if (question.options && question.options[question.correctAnswer]) {
          answersMap.set(question._id.toString(), question.options[question.correctAnswer].text);
        }
      });

      const quiz = new Quiz({
        title,
        description,
        duration,
        maxTabSwitches: req.body.maxTabSwitches || 3,
        questions,
        answers: answersMap,
        batches: batchIds,
        students,
        tenant: tenantId,
        createdBy: req.user._id,
        status: 'draft'
      });

      await quiz.save();
      res.status(201).json({ message: 'Quiz created successfully', quiz });
    } catch (error) {
      console.error('Error creating quiz:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update quiz
  updateQuiz: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, duration, questions, batches, students, status } = req.body;

      const quiz = await Quiz.findByIdAndUpdate(
        id,
        { title, description, duration, questions, batches, students, status },
        { new: true }
      );

      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }

      res.json({ message: 'Quiz updated successfully', quiz });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Delete quiz
  deleteQuiz: async (req, res) => {
    try {
      const { id } = req.params;
      
      const quiz = await Quiz.findByIdAndDelete(id);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }

      res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Go live quiz
  goLiveQuiz: async (req, res) => {
    try {
      const { id } = req.params;
      const { startTime } = req.body;
      
      const quiz = await Quiz.findByIdAndUpdate(
        id,
        { 
          status: 'active',
          startTime: startTime ? new Date(startTime) : new Date()
        },
        { new: true }
      );
      
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }

      res.json({ message: 'Quiz is now live', quiz });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get quiz by ID
  getQuizById: async (req, res) => {
    try {
      const { id } = req.params;
      const quiz = await Quiz.findById(id)
        .populate('questions')
        .populate('batches', 'name students')
        .populate('createdBy', 'name')
        .select('+startTime');
      
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get quiz attempts for instructor monitoring
  getQuizAttempts: async (req, res) => {
    try {
      const { id } = req.params;
      const QuizAttempt = require('../models/QuizAttempt');
      
      const attempts = await QuizAttempt.find({ quiz: id })
        .populate('student', 'name email')
        .sort({ createdAt: -1 });
      
      const formattedAttempts = attempts.map(attempt => ({
        ...attempt.toObject(),
        studentName: attempt.student?.name,
        studentEmail: attempt.student?.email,
        studentId: attempt.student?._id
      }));
      
      res.json(formattedAttempts);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update quiz settings
  updateQuizTime: async (req, res) => {
    try {
      console.log('Update quiz request body:', req.body);
      const { id } = req.params;
      const { startTime, earlyStartBuffer, maxTabSwitches, status, allowedIPs } = req.body;
      
      const updateData = {
        earlyStartBuffer: earlyStartBuffer || 0
      };
      
      if (startTime) {
        updateData.startTime = new Date(startTime);
      }
      
      if (maxTabSwitches !== undefined) {
        updateData.maxTabSwitches = maxTabSwitches;
      }
      
      if (status) {
        updateData.status = status;
      }
      
      if (allowedIPs !== undefined) {
        updateData.allowedIPs = Array.isArray(allowedIPs) ? allowedIPs : [allowedIPs];
        console.log('Setting allowedIPs to:', updateData.allowedIPs);
      }
      
      console.log('Final update data:', updateData);
      const quiz = await Quiz.findByIdAndUpdate(id, updateData, { new: true });
      
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      
      // Save again to ensure allowedIPs is persisted
      if (allowedIPs !== undefined) {
        quiz.allowedIPs = allowedIPs;
        await quiz.save();
      }
      
      console.log('Updated quiz allowedIPs:', quiz.allowedIPs);
      res.json({ message: 'Quiz updated successfully', quiz });
    } catch (error) {
      console.error('Error updating quiz:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update question in quiz
  updateQuizQuestion: async (req, res) => {
    try {
      const { questionId } = req.params;
      const QuizQuestion = require('../models/QuizQuestion');
      
      const question = await QuizQuestion.findByIdAndUpdate(
        questionId,
        req.body,
        { new: true }
      );
      
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      
      res.json({ message: 'Question updated successfully', question });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = quizController;