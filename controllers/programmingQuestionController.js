const AssessmentQuestion = require('../models/AssessmentQuestion');

const programmingQuestionController = {
  // Get all topics with question counts
  getProgrammingTopics: async (req, res) => {
    try {
      const topicOrder = [
        'Inputs', 'Operators', 'Conditions', 'Nested Conditions', 'Loops', 
        'While Loop', 'Nested Loops', 'Pattern Printing', 'Arrays', 'Strings', 
        '2D Arrays', 'Functions', 'Class & Objects', 'Recursion', 'Hashing',
        'Two Pointers', 'Sliding Window', 'Linked List', 'Stack', 'Queue', 
        'Binary Search', 'Bit Manipulation', 'Tree', 'Graph', 'Backtracking',
        'Dynamic Programming', 'Greedy'
      ];
      
      const questionCounts = await AssessmentQuestion.aggregate([
        { $match: { assessmentType: 'programming', isActive: true } },
        { $group: { _id: '$topic', count: { $sum: 1 } } }
      ]);
      
      const countsMap = {};
      questionCounts.forEach(item => {
        countsMap[item._id] = item.count;
      });
      
      const allTopics = topicOrder.map(topicName => ({
        topic: topicName,
        count: countsMap[topicName] || 0
      }));
      
      res.json(allTopics);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get questions by topic
  getQuestionsByTopic: async (req, res) => {
    try {
      const { topic } = req.params;
      const questions = await AssessmentQuestion.find({ 
        topic, 
        assessmentType: 'programming',
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
      const question = await AssessmentQuestion.findById(id);
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

      const newQuestion = new AssessmentQuestion({
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
