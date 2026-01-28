const express = require('express');
const { body } = require('express-validator');
const batchController = require('../controllers/batchController');
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

// Get all batches (instructor only)
router.get('/', auth, checkPermission('manage_students'), batchController.getAllBatches);

// Create batch (instructor only)
router.post('/', auth, checkPermission('manage_students'), [
  body('name').trim().isLength({ min: 2 }).withMessage('Batch name must be at least 2 characters'),
  body('description').optional().trim()
], batchController.createBatch);

// Update batch (instructor only)
router.put('/:id', auth, checkPermission('manage_students'), [
  body('name').trim().isLength({ min: 2 }).withMessage('Batch name must be at least 2 characters'),
  body('description').optional().trim()
], batchController.updateBatch);

// Delete batch (instructor only)
router.delete('/:id', auth, checkPermission('manage_students'), batchController.deleteBatch);

// Add students to batch (instructor only)
router.post('/:id/students', auth, checkPermission('manage_students'), [
  body('studentIds').isArray().withMessage('Student IDs must be an array')
], batchController.addStudentsToBatch);

// Remove students from batch (instructor only)
router.delete('/:id/students', auth, checkPermission('manage_students'), [
  body('studentIds').isArray().withMessage('Student IDs must be an array')
], batchController.removeStudentsFromBatch);

// Validate students from Excel file (instructor only)
router.post('/validate-students', auth, checkPermission('manage_students'), upload.single('file'), batchController.validateStudentsFromFile);

// Upload students to existing batch from Excel file (instructor only)
router.post('/:id/upload-students', auth, checkPermission('manage_students'), upload.single('file'), batchController.uploadStudentsToBatch);

module.exports = router;