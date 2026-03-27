const ProgrammingQuestion = require('../models/ProgrammingQuestion');

const programmingQuestionController = {
  // Get all topics with question counts
  getProgrammingTopics: async (req, res) => {
    try {
      const topicOrder = [
        'Inputs', 'Operators', 'Basic Conditions', 'Nested Conditions', 'Loops', 
        'Nested Loops', 'Pattern Printing', 'Arrays', 'Strings', '2D Arrays', 
        'Two Pointers', 'Sliding Window Fixed', 'Sliding Window Variable', 
        'HashMap', 'Stack', 'Queue'
      ];
      
      const topics = await ProgrammingQuestion.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$topic', count: { $sum: 1 } } },
        { $project: { topic: '$_id', count: 1, _id: 0 } }
      ]);
      
      const sortedTopics = topics.sort((a, b) => {
        const indexA = topicOrder.indexOf(a.topic);
        const indexB = topicOrder.indexOf(b.topic);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });
      
      res.json(sortedTopics);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get questions by topic
  getQuestionsByTopic: async (req, res) => {
    try {
      const { topic } = req.params;
      const questions = await ProgrammingQuestion.find({ 
        topic, 
        isActive: true 
      }).select('title description difficulty tags');
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single question
  getQuestionById: async (req, res) => {
    try {
      const { id } = req.params;
      const question = await ProgrammingQuestion.findById(id);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add new programming question
  addProgrammingQuestion: async (req, res) => {
    try {
      const { 
        title, description, difficulty, constraints, testCases, 
        tags, assessmentType, example, intuition, topic 
      } = req.body;

      // Extract instructor ID from token (provided by auth middleware)
      const instructorId = req.user.id || req.user._id;

      const newQuestion = new ProgrammingQuestion({
        title,
        description,
        difficulty,
        constraints,
        testCases,
        tags,
        assessmentType: assessmentType || 'programming',
        example,
        intuition,
        topic,
        isActive: true,
        createdBy: instructorId
      });

      await newQuestion.save();
      res.status(201).json({ message: 'Question added successfully', question: newQuestion });
    } catch (error) {
      console.error('Error adding programming question:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = programmingQuestionController;
