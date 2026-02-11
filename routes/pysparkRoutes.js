const express = require('express');
const router = express.Router();
const pysparkController = require('../controllers/pysparkController');
const { auth } = require('../middleware/auth');

// Student routes
router.get('/questions', auth, pysparkController.getQuestions);
router.get('/questions/:id', auth, pysparkController.getQuestion);
router.post('/submit', auth, pysparkController.submitCode);
router.get('/attempts/:questionId', auth, pysparkController.getAttempts);

// Admin routes
router.post('/admin/questions', auth, pysparkController.createQuestion);
router.put('/admin/questions/:id', auth, pysparkController.updateQuestion);
router.delete('/admin/questions/:id', auth, pysparkController.deleteQuestion);

module.exports = router;
