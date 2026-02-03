const express = require('express');
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const quizQuestionController = require('../controllers/quizQuestionController');
const { auth } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissions');

const router = express.Router();

// Configure multer for Excel uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = process.env.NODE_ENV === 'production' ? '/tmp/uploads/excel' : 'uploads/excel';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.xlsx', '.xls'];
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(new Error('Only Excel files are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Get all quiz questions (instructor only)
router.get('/', auth, checkPermission('create_quizzes'), quizQuestionController.getAllQuestions);

// Create quiz question (instructor only)
router.post('/', auth, checkPermission('create_quizzes'), [
  body('title').trim().isLength({ min: 3 }).withMessage('Question title is required'),
  body('language').notEmpty().withMessage('Language is required'),
  body('topic').notEmpty().withMessage('Topic is required'),
  body('options').isArray({ min: 4, max: 4 }).withMessage('Must have exactly 4 options'),
  body('options.*.text').notEmpty().withMessage('All option texts are required'),
  body('correctAnswer').isInt({ min: 0, max: 3 }).withMessage('Correct answer must be between 0-3'),
  body('difficulty').isIn(['easy', 'medium', 'hard']).withMessage('Difficulty must be easy, medium, or hard')
], quizQuestionController.createQuestion);

// Update quiz question (instructor only)
router.put('/:id', auth, checkPermission('create_quizzes'), [
  body('title').trim().isLength({ min: 3 }).withMessage('Question title must be at least 3 characters'),
  body('options').isArray({ min: 4, max: 4 }).withMessage('Must have exactly 4 options'),
  body('correctAnswer').isInt({ min: 0, max: 3 }).withMessage('Correct answer must be between 0-3')
], quizQuestionController.updateQuestion);

// Update quiz question (PATCH - instructor only)
router.patch('/:id', auth, checkPermission('create_quizzes'), (req, res, next) => {
  console.log('PATCH /quiz-questions/:id called with ID:', req.params.id);
  console.log('Request body:', req.body);
  next();
}, [
  body('title').optional().trim().isLength({ min: 3 }).withMessage('Question title must be at least 3 characters'),
  body('options').optional().isArray({ min: 4, max: 4 }).withMessage('Must have exactly 4 options'),
  body('correctAnswer').optional().isInt({ min: 0, max: 3 }).withMessage('Correct answer must be between 0-3')
], quizQuestionController.updateQuestion);

// Delete quiz question (instructor only)
router.delete('/:id', auth, checkPermission('create_quizzes'), quizQuestionController.deleteQuestion);

// Import questions from Excel (instructor only)
router.post('/import-excel', auth, checkPermission('create_quizzes'), upload.single('excel'), quizQuestionController.importFromExcel);

module.exports = router;