const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const SubTopic = require('../models/SubTopic');
const Question = require('../models/Question');

// Get all topics
router.get('/topics', async (req, res) => {
  try {
    const topics = await Topic.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    
    // Add counts for each topic
    const topicsWithCounts = await Promise.all(topics.map(async (topic) => {
      const subTopicCount = await SubTopic.countDocuments({ topicId: topic._id, isActive: true });
      const subTopicIds = await SubTopic.find({ topicId: topic._id, isActive: true }).select('_id');
      const questionCount = await Question.countDocuments({ 
        subTopicId: { $in: subTopicIds.map(st => st._id) }, 
        isActive: true 
      });
      
      return {
        ...topic.toObject(),
        subTopicCount,
        questionCount,
        progress: Math.floor(Math.random() * 30) // Placeholder progress
      };
    }));
    
    res.json(topicsWithCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single topic
router.get('/topics/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create topic
router.post('/topics', async (req, res) => {
  try {
    console.log('Creating topic with data:', req.body);
    const topic = new Topic(req.body);
    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    console.error('Topic creation error:', error);
    res.status(400).json({ message: error.message, details: error });
  }
});

// Update topic
router.put('/topics/:id', async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.json(topic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get subtopics by topic
router.get('/topics/:topicId/subtopics', async (req, res) => {
  try {
    const subtopics = await SubTopic.find({ 
      topicId: req.params.topicId, 
      isActive: true 
    }).sort({ order: 1, createdAt: 1 });
    
    // Add question counts for each subtopic
    const subtopicsWithCounts = await Promise.all(subtopics.map(async (subtopic) => {
      const questionCount = await Question.countDocuments({ 
        subTopicId: subtopic._id, 
        isActive: true 
      });
      
      return {
        ...subtopic.toObject(),
        questionCount,
        progress: 0 // Placeholder progress
      };
    }));
    
    res.json(subtopicsWithCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create subtopic
router.post('/subtopics', async (req, res) => {
  try {
    const subtopic = new SubTopic(req.body);
    await subtopic.save();
    res.status(201).json(subtopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update subtopic
router.put('/subtopics/:id', async (req, res) => {
  try {
    const subtopic = await SubTopic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subtopic) {
      return res.status(404).json({ message: 'Subtopic not found' });
    }
    res.json(subtopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get questions by subtopic
router.get('/subtopics/:subtopicId/questions', async (req, res) => {
  try {
    const questions = await Question.find({ 
      subTopicId: req.params.subtopicId, 
      isActive: true 
    }).sort({ order: 1, createdAt: 1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single question
router.get('/questions/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create question
router.post('/questions', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update question
router.put('/questions/:id', async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;