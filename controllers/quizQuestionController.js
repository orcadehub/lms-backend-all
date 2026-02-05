const { validationResult } = require('express-validator');
const QuizQuestion = require('../models/QuizQuestion');
const XLSX = require('xlsx');

const quizQuestionController = {
  // Get all quiz questions for tenant
  getAllQuestions: async (req, res) => {
    try {
      const questions = await QuizQuestion.find({})
        .populate('createdBy', 'name')
        .sort({ createdAt: -1 });
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Create new quiz question
  createQuestion: async (req, res) => {
    try {
      console.log('Request body:', req.body);
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, codeSnippet, image, language, topic, options, correctAnswer, tags, difficulty } = req.body;
      const tenantId = req.user.assignedTenants[0];

      const question = new QuizQuestion({
        title,
        codeSnippet,
        image,
        language,
        topic,
        options,
        correctAnswer,
        tags,
        difficulty,
        tenant: tenantId,
        createdBy: req.user._id
      });

      await question.save();
      res.status(201).json({ message: 'Question created successfully', question });
    } catch (error) {
      console.error('Error creating question:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update quiz question
  updateQuestion: async (req, res) => {
    try {
      console.log('Update question request:', req.params.id, req.body);
      const { id } = req.params;
      const { title, codeSnippet, image, language, topic, options, correctAnswer, tags, difficulty } = req.body;

      const question = await QuizQuestion.findByIdAndUpdate(
        id,
        { title, codeSnippet, image, language, topic, options, correctAnswer, tags, difficulty },
        { new: true }
      );

      if (!question) {
        console.log('Question not found:', id);
        return res.status(404).json({ message: 'Question not found' });
      }

      console.log('Question updated successfully:', question._id);
      res.json({ message: 'Question updated successfully', question });
    } catch (error) {
      console.error('Error updating question:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Delete quiz question
  deleteQuestion: async (req, res) => {
    try {
      const { id } = req.params;
      
      const question = await QuizQuestion.findByIdAndDelete(id);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }

      res.json({ message: 'Question deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Import questions from Excel
  importFromExcel: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No Excel file uploaded' });
      }

      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const tenantId = req.user.assignedTenants[0];
      const successfulQuestions = [];
      const failedQuestions = [];

      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        try {
          // Validate required fields
          if (!row.title || !row.language || !row.topic || !row.option1 || !row.option2 || !row.option3 || !row.option4 || !row.correctAnswer || !row.difficulty) {
            failedQuestions.push({
              row: i + 2, // +2 for header and 0-based index
              data: row,
              error: 'Missing required fields'
            });
            continue;
          }

          // Validate correctAnswer
          const correctAnswer = parseInt(row.correctAnswer) - 1; // Convert 1-4 to 0-3
          if (correctAnswer < 0 || correctAnswer > 3) {
            failedQuestions.push({
              row: i + 2,
              data: row,
              error: 'correctAnswer must be between 1-4'
            });
            continue;
          }

          // Validate difficulty
          if (!['easy', 'medium', 'hard'].includes(row.difficulty)) {
            failedQuestions.push({
              row: i + 2,
              data: row,
              error: 'difficulty must be easy, medium, or hard'
            });
            continue;
          }

          const question = new QuizQuestion({
            title: row.title,
            codeSnippet: row.codeSnippet || '',
            image: row.image || '',
            language: row.language,
            topic: row.topic,
            options: [
              { text: row.option1, image: '' },
              { text: row.option2, image: '' },
              { text: row.option3, image: '' },
              { text: row.option4, image: '' }
            ],
            correctAnswer,
            difficulty: row.difficulty,
            tenant: tenantId,
            createdBy: req.user._id
          });

          await question.save();
          successfulQuestions.push(question);
        } catch (error) {
          failedQuestions.push({
            row: i + 2,
            data: row,
            error: error.message
          });
        }
      }

      // Clean up uploaded file
      require('fs').unlinkSync(req.file.path);

      res.json({
        message: `Import completed. ${successfulQuestions.length} questions added successfully.`,
        questions: successfulQuestions,
        successCount: successfulQuestions.length,
        failedCount: failedQuestions.length,
        failedQuestions
      });
    } catch (error) {
      // Clean up file if it exists
      if (req.file && require('fs').existsSync(req.file.path)) {
        require('fs').unlinkSync(req.file.path);
      }
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = quizQuestionController;