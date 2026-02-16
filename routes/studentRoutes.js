const express = require('express');
const { body } = require('express-validator');
const studentController = require('../controllers/studentController');
const { auth } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissions');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.xlsx' || ext === '.xls') {
      cb(null, true);
    } else {
      cb(new Error('Only Excel files are allowed'), false);
    }
  }
});

const router = express.Router();

// Get all students (instructor only)
router.get('/', auth, checkPermission('manage_students'), studentController.getAllStudents);

// Create student (instructor only)
router.post('/', auth, checkPermission('manage_students'), [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], studentController.createStudent);

// Update student (instructor only)
router.put('/:id', auth, checkPermission('manage_students'), [
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], studentController.updateStudent);

// Bulk upload students (instructor only)
router.post('/bulk-upload', auth, checkPermission('manage_students'), upload.single('file'), studentController.bulkUploadStudents);

// Delete student (instructor only)
router.delete('/:id', auth, checkPermission('manage_students'), studentController.deleteStudent);

// Student profile routes (student only)
router.get('/profile', auth, studentController.getProfile);
router.post('/connect-coding-profiles', auth, studentController.connectCodingProfiles);

module.exports = router;