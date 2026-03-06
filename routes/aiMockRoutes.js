const express = require('express');
const router = express.Router();
const aiMockController = require('../controllers/aiMockController');
const { auth } = require('../middleware/auth');

router.post('/analyze-resume', auth, aiMockController.analyzeResume);
router.get('/interview/:id', auth, aiMockController.getInterview);
router.post('/submit-answer', auth, aiMockController.submitAnswer);
router.post('/complete/:id', auth, aiMockController.completeInterview);

module.exports = router;
