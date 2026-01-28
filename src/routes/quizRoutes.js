const express = require('express');
const { body } = require('express-validator');
const quizController = require('../controllers/quizController');
const { auth } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissions');

const router = express.Router();

// Get all quizzes (instructor only)
router.get('/', auth, checkPermission('create_quizzes'), quizController.getAllQuizzes);

// Create quiz (instructor only)
router.post('/', auth, checkPermission('create_quizzes'), [
  body('title').trim().isLength({ min: 3 }).withMessage('Quiz title is required'),
  body('description').trim().isLength({ min: 10 }).withMessage('Quiz description must be at least 10 characters'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be at least 1 minute'),
  body('questions').isArray({ min: 1 }).withMessage('At least one question is required')
], quizController.createQuiz);

// Get quiz by ID (instructor only)
router.get('/:id', auth, checkPermission('create_quizzes'), quizController.getQuizById);

// Update quiz (instructor only)
router.put('/:id', auth, checkPermission('create_quizzes'), [
  body('title').trim().isLength({ min: 3 }).withMessage('Quiz title is required'),
  body('description').trim().isLength({ min: 10 }).withMessage('Quiz description must be at least 10 characters'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be at least 1 minute')
], quizController.updateQuiz);

// Delete quiz (instructor only)
router.delete('/:id', auth, checkPermission('create_quizzes'), quizController.deleteQuiz);

// Get quiz attempts for instructor monitoring
router.get('/:id/attempts', auth, checkPermission('create_quizzes'), quizController.getQuizAttempts);

// Update quiz start time
router.patch('/:id/update-time', auth, checkPermission('create_quizzes'), quizController.updateQuizTime);

// Update question in quiz
router.patch('/:quizId/questions/:questionId', auth, checkPermission('create_quizzes'), quizController.updateQuizQuestion);

// Update question in quiz
router.patch('/:quizId/questions/:questionId', auth, checkPermission('create_quizzes'), quizController.updateQuizQuestion);

// Go live quiz (instructor only)
router.patch('/:id/go-live', auth, checkPermission('create_quizzes'), quizController.goLiveQuiz);

module.exports = router;