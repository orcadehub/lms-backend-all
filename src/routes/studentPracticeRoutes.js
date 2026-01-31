const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Topic = require('../models/Topic');
const SubTopic = require('../models/SubTopic');
const Question = require('../models/Question');
const PracticeSubmission = require('../models/PracticeSubmission');
const { auth } = require('../middleware/auth');

// Get all topics for student with user progress
router.get('/topics', auth, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const topics = await Topic.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    
    // Get user's completed questions
    const completedSubmissions = await PracticeSubmission.find({
      userId: new mongoose.Types.ObjectId(userId),
      isCompleted: true
    }).select('questionId');
    
    const completedQuestionIds = completedSubmissions.map(sub => sub.questionId.toString());
    
    const topicsWithProgress = await Promise.all(topics.map(async (topic) => {
      const subTopicCount = await SubTopic.countDocuments({ topicId: topic._id, isActive: true });
      const subTopicIds = await SubTopic.find({ topicId: topic._id, isActive: true }).select('_id');
      const questionCount = await Question.countDocuments({ 
        subTopicId: { $in: subTopicIds.map(st => st._id) }, 
        isActive: true 
      });
      const questionIds = await Question.find({ 
        subTopicId: { $in: subTopicIds.map(st => st._id) }, 
        isActive: true 
      }).select('_id');
      
      const questions = questionIds.map(q => q._id.toString());
      const completedCount = questions.filter(qId => completedQuestionIds.includes(qId)).length;
      const progress = questionCount > 0 ? Math.round((completedCount / questionCount) * 100) : 0;
      
      return {
        ...topic.toObject(),
        subTopicCount,
        questionCount,
        questions,
        completedCount,
        progress
      };
    }));
    
    res.json(topicsWithProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get subtopics by topic for student with user progress
router.get('/topics/:topicId/subtopics', auth, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const subtopics = await SubTopic.find({ 
      topicId: req.params.topicId, 
      isActive: true 
    }).sort({ order: 1, createdAt: 1 });
    
    // Get user's completed questions
    const completedSubmissions = await PracticeSubmission.find({
      userId: new mongoose.Types.ObjectId(userId),
      isCompleted: true
    }).select('questionId');
    
    const completedQuestionIds = completedSubmissions.map(sub => sub.questionId.toString());
    
    const subtopicsWithProgress = await Promise.all(subtopics.map(async (subtopic) => {
      const questionCount = await Question.countDocuments({ 
        subTopicId: subtopic._id, 
        isActive: true 
      });
      const questionIds = await Question.find({ 
        subTopicId: subtopic._id, 
        isActive: true 
      }).select('_id');
      
      const questions = questionIds.map(q => q._id.toString());
      const completedCount = questions.filter(qId => completedQuestionIds.includes(qId)).length;
      const progress = questionCount > 0 ? Math.round((completedCount / questionCount) * 100) : 0;
      
      return {
        ...subtopic.toObject(),
        questionCount,
        questions,
        completedCount,
        progress
      };
    }));
    
    res.json(subtopicsWithProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get questions by subtopic for student
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

// Get single question for student
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

// Get single topic for student
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

module.exports = router;