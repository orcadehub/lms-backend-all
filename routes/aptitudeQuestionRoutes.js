const express = require('express');
const router = express.Router();
const multer = require('multer');
const aptitudeQuestionController = require('../controllers/aptitudeQuestionController');
const { auth } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissions');

const upload = multer({ storage: multer.memoryStorage() });

// Get all aptitude questions
router.get('/', auth, checkPermission('manage_aptitude_questions'), aptitudeQuestionController.getAllQuestions);

// Get all unique topics (public for student practice)
router.get('/topics', aptitudeQuestionController.getAllTopics);

// Get questions by topic (public for student practice)
router.get('/questions/:topic', aptitudeQuestionController.getQuestionsByTopic);

// Generate random test
router.post('/generate-test', aptitudeQuestionController.generateTest);

// Create single aptitude question
router.post('/', auth, checkPermission('manage_aptitude_questions'), aptitudeQuestionController.createQuestion);

// Update aptitude question
router.put('/:id', auth, checkPermission('manage_aptitude_questions'), aptitudeQuestionController.updateQuestion);

// Get single question (public for student practice)
router.get('/:id', aptitudeQuestionController.getQuestionById);

// Delete aptitude question
router.delete('/:id', auth, checkPermission('manage_aptitude_questions'), aptitudeQuestionController.deleteQuestion);

// Bulk upload aptitude questions
router.post('/bulk-upload', auth, checkPermission('manage_aptitude_questions'), upload.single('file'), aptitudeQuestionController.bulkUpload);

module.exports = router;
