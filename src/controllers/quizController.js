const { validationResult } = require('express-validator');
const Quiz = require('../models/Quiz');
const ExcelJS = require('exceljs');

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
      const { startTime, earlyStartBuffer, maxTabSwitches, status, allowedIPs, duration } = req.body;
      
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
      
      if (duration !== undefined && duration >= 1 && duration <= 300) {
        updateData.duration = duration;
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
      
      // Emit real-time update to all connected clients
      const io = req.app.get('io');
      if (io) {
        console.log('Emitting quiz-updated event for quiz:', id);
        io.emit('quiz-updated', { quizId: id, quiz });
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
  },

  // Export quiz results to Excel
  exportQuizResults: async (req, res) => {
    try {
      const { id } = req.params;
      const QuizAttempt = require('../models/QuizAttempt');
      
      const quiz = await Quiz.findById(id).populate('questions');
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      
      const attempts = await QuizAttempt.find({ quiz: id })
        .populate('student', 'name email')
        .sort({ createdAt: -1 });
      
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Quiz Results');
      
      // Define columns
      worksheet.columns = [
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Email', key: 'email', width: 25 },
        { header: 'Total Questions', key: 'totalQuestions', width: 15 },
        { header: 'Attempted', key: 'attempted', width: 12 },
        { header: 'Unattempted', key: 'unattempted', width: 12 },
        { header: 'Correct', key: 'correct', width: 10 },
        { header: 'Wrong', key: 'wrong', width: 10 },
        { header: 'Percentage', key: 'percentage', width: 12 },
        { header: 'Tab Switches', key: 'tabSwitches', width: 12 },
        { header: 'Fullscreen Exits', key: 'fullscreenExits', width: 15 },
        { header: 'Start IP', key: 'startIP', width: 15 },
        { header: 'End IP', key: 'endIP', width: 15 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Started At', key: 'startedAt', width: 20 },
        { header: 'Completed At', key: 'completedAt', width: 20 },
        { header: 'Time Used', key: 'timeUsed', width: 12 },
        { header: 'Remaining Time', key: 'remainingTime', width: 15 },
        { header: 'Resume Count', key: 'resumeCount', width: 12 },
        { header: 'Attempt Number', key: 'attemptNumber', width: 15 },
        { header: 'Session Data', key: 'sessionData', width: 50 }
      ];
      
      // Style header row
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      };
      
      // Sort attempts by percentage in descending order
      attempts.sort((a, b) => {
        const totalQuestionsA = a.totalQuestions || quiz.questions.length;
        const totalQuestionsB = b.totalQuestions || quiz.questions.length;
        const percentageA = totalQuestionsA > 0 ? ((a.score || 0) / totalQuestionsA) * 100 : 0;
        const percentageB = totalQuestionsB > 0 ? ((b.score || 0) / totalQuestionsB) * 100 : 0;
        return percentageB - percentageA;
      });
      
      // Add data rows
      attempts.forEach(attempt => {
        const totalQuestions = attempt.totalQuestions || quiz.questions.length;
        const attempted = Object.keys(attempt.answers || {}).length;
        const unattempted = totalQuestions - attempted;
        const correct = attempt.score || 0;
        const wrong = attempted - correct;
        const percentage = totalQuestions > 0 ? ((correct / totalQuestions) * 100).toFixed(2) : '0.00';
        
        const sessionData = [
          attempt.sessionData?.systemInfo?.map((info, index) => 
            `Session ${index + 1}: Browser: ${info.userAgent} | Platform: ${info.platform} | Screen: ${info.screenResolution} | Timezone: ${info.timezone} | Timestamp: ${new Date(info.timestamp).toLocaleString()}`
          ).join(' || ') || '',
          attempt.sessionData?.sessionStartTime ? `Session Start: ${new Date(attempt.sessionData.sessionStartTime).toLocaleString()}` : '',
          attempt.sessionData?.sessionEndTime ? `Session End: ${new Date(attempt.sessionData.sessionEndTime).toLocaleString()}` : ''
        ].filter(info => info).join(' | ');
        
        worksheet.addRow({
          name: attempt.student?.name || 'Unknown',
          email: attempt.student?.email || 'N/A',
          totalQuestions,
          attempted,
          unattempted,
          correct,
          wrong,
          percentage: percentage + '%',
          tabSwitches: attempt.tabSwitchCount || 0,
          fullscreenExits: attempt.fullscreenExitCount || 0,
          startIP: attempt.sessionData?.startIP || 'N/A',
          endIP: attempt.sessionData?.endIP || attempt.sessionData?.startIP || 'N/A',
          status: attempt.attemptStatus || 'N/A',
          startedAt: attempt.startedAt ? new Date(attempt.startedAt).toLocaleString() : 'N/A',
          completedAt: attempt.completedAt ? new Date(attempt.completedAt).toLocaleString() : 'N/A',
          timeUsed: attempt.timeUsedSeconds ? Math.floor(attempt.timeUsedSeconds / 60) + 'm ' + (attempt.timeUsedSeconds % 60) + 's' : '0m 0s',
          remainingTime: attempt.remainingTimeSeconds ? Math.floor(attempt.remainingTimeSeconds / 60) + 'm ' + (attempt.remainingTimeSeconds % 60) + 's' : '0m 0s',
          resumeCount: attempt.resumeCount || 0,
          attemptNumber: attempt.attemptNumber || 1,
          sessionData
        });
      });
      
      // Set response headers
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${quiz.title}_results.xlsx"`);
      
      // Write to response
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error('Error exporting quiz results:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = quizController;