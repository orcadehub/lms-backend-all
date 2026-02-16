const AssessmentQuestion = require('../models/AssessmentQuestion');
const Instructor = require('../models/Instructor');

const assessmentQuestionController = {
  // Get all assessment questions by type
  getQuestionsByType: async (req, res) => {
    try {
      const { type } = req.query;
      const filter = { isActive: true };
      
      if (type && type !== 'all') {
        filter.assessmentType = type;
      }
      
      const questions = await AssessmentQuestion.find(filter).sort({ createdAt: -1 });
      
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Create new assessment question
  createQuestion: async (req, res) => {
    try {
      console.log('Creating question with data:', JSON.stringify(req.body, null, 2));
      console.log('User from token:', req.user);
      
      const question = new AssessmentQuestion({
        ...req.body,
        createdBy: req.user._id || req.user.id
      });

      const savedQuestion = await question.save();
      console.log('Question saved successfully:', savedQuestion._id);
      
      res.status(201).json(savedQuestion);
    } catch (error) {
      console.error('Error creating question:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get question by ID
  getQuestionById: async (req, res) => {
    try {
      const { id } = req.params;
      const question = await AssessmentQuestion.findById(id);
      
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update question
  updateQuestion: async (req, res) => {
    try {
      const { id } = req.params;
      const question = await AssessmentQuestion.findByIdAndUpdate(
        id,
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

  // Delete question
  deleteQuestion: async (req, res) => {
    try {
      const { id } = req.params;
      const question = await AssessmentQuestion.findByIdAndDelete(id);
      
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      
      res.json({ message: 'Question deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = assessmentQuestionController;