const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController'); // Not really but for some instructor-only checks
const programmingQuestionController = require('../controllers/programmingQuestionController');
const { auth } = require('../middleware/auth');

// Get all topics with question counts (public for student practice)
router.get('/topics', programmingQuestionController.getProgrammingTopics);

// Get questions by topic
router.get('/questions/:topic', programmingQuestionController.getQuestionsByTopic);

// Get single question
router.get('/question/:id', programmingQuestionController.getQuestionById);

// POST /add - Add new programming question (instructor/admin only)
router.post('/add', auth, programmingQuestionController.addProgrammingQuestion);

module.exports = router;
