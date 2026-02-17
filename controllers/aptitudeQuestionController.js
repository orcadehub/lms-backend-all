const AptitudeQuestion = require('../models/AptitudeQuestion');
const XLSX = require('xlsx');

const aptitudeQuestionController = {
  // Get all aptitude questions for a tenant
  getAllQuestions: async (req, res) => {
    try {
      const tenantId = req.user.assignedTenants[0];
      const questions = await AptitudeQuestion.find({ tenant: tenantId })
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 });
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Create single aptitude question
  createQuestion: async (req, res) => {
    try {
      const { question, options, correctAnswer, topic, difficulty, explanation } = req.body;
      const tenantId = req.user.assignedTenants[0];
      const instructorId = req.user._id;

      const newQuestion = new AptitudeQuestion({
        question,
        options,
        correctAnswer,
        topic,
        difficulty,
        explanation,
        createdBy: instructorId,
        tenant: tenantId
      });

      await newQuestion.save();
      res.status(201).json({ message: 'Question created successfully', question: newQuestion });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update aptitude question
  updateQuestion: async (req, res) => {
    try {
      const { id } = req.params;
      const { question, options, correctAnswer, topic, difficulty, explanation } = req.body;

      const updatedQuestion = await AptitudeQuestion.findByIdAndUpdate(
        id,
        { question, options, correctAnswer, topic, difficulty, explanation },
        { new: true }
      );

      if (!updatedQuestion) {
        return res.status(404).json({ message: 'Question not found' });
      }

      res.json({ message: 'Question updated successfully', question: updatedQuestion });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Delete aptitude question
  deleteQuestion: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedQuestion = await AptitudeQuestion.findByIdAndDelete(id);

      if (!deletedQuestion) {
        return res.status(404).json({ message: 'Question not found' });
      }

      res.json({ message: 'Question deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Bulk upload aptitude questions from Excel
  bulkUpload: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const tenantId = req.user.assignedTenants[0];
      const instructorId = req.user._id;

      const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const questions = [];
      const errors = [];

      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        
        // Normalize keys to lowercase for case-insensitive matching
        const normalizedRow = {};
        Object.keys(row).forEach(key => {
          normalizedRow[key.toLowerCase().trim()] = row[key];
        });

        try {
          const topic = normalizedRow['topic'];
          const question = normalizedRow['question'];
          const option1 = normalizedRow['option1'];
          const option2 = normalizedRow['option2'];
          const option3 = normalizedRow['option3'];
          const option4 = normalizedRow['option4'];
          const correctAnswer = parseInt(normalizedRow['correctanswer']) - 1;
          const difficulty = normalizedRow['difficulty']?.toLowerCase() || 'medium';
          const explanation = normalizedRow['explanation'] || '';

          if (!topic || !question || !option1 || !option2 || !option3 || !option4 || isNaN(correctAnswer)) {
            errors.push(`Row ${i + 2}: Missing required fields`);
            continue;
          }

          if (correctAnswer < 0 || correctAnswer > 3) {
            errors.push(`Row ${i + 2}: CorrectAnswer must be between 1 and 4`);
            continue;
          }

          if (!['easy', 'medium', 'hard'].includes(difficulty)) {
            errors.push(`Row ${i + 2}: Difficulty must be easy, medium, or hard`);
            continue;
          }

          questions.push({
            topic,
            question,
            options: [option1, option2, option3, option4],
            correctAnswer,
            difficulty,
            explanation,
            createdBy: instructorId,
            tenant: tenantId
          });
        } catch (error) {
          errors.push(`Row ${i + 2}: ${error.message}`);
        }
      }

      if (questions.length > 0) {
        await AptitudeQuestion.insertMany(questions);
      }

      res.json({
        message: `Successfully uploaded ${questions.length} questions`,
        uploaded: questions.length,
        errors: errors.length > 0 ? errors : undefined
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = aptitudeQuestionController;
