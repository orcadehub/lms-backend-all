const express = require('express');
const router = express.Router();
const ProgrammingQuestion = require('../models/ProgrammingQuestion');

// Get all topics with question counts
router.get('/topics', async (req, res) => {
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
    
    // Sort by predefined order
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
});

// Get questions by topic
router.get('/questions/:topic', async (req, res) => {
  try {
    const questions = await ProgrammingQuestion.find({ 
      topic: req.params.topic, 
      isActive: true 
    }).select('title description difficulty tags');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single question
router.get('/question/:id', async (req, res) => {
  try {
    const question = await ProgrammingQuestion.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
