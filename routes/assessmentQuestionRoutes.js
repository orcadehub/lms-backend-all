const express = require('express');
const assessmentQuestionController = require('../controllers/assessmentQuestionController');
const { auth } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissions');

const router = express.Router();

// Get questions by type (public for practice)
router.get('/', assessmentQuestionController.getQuestionsByType);

// Create new question
router.post('/', auth, checkPermission('create_quizzes'), assessmentQuestionController.createQuestion);

// Get question by ID
router.get('/:id', assessmentQuestionController.getQuestionById);

// Update question
router.put('/:id', auth, checkPermission('create_quizzes'), assessmentQuestionController.updateQuestion);

// Delete question
router.delete('/:id', auth, checkPermission('create_quizzes'), assessmentQuestionController.deleteQuestion);

module.exports = router;