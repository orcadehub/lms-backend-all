const express = require('express');
const { body } = require('express-validator');
const studentController = require('../controllers/studentController');
const { auth, authorize } = require('../middleware/auth');
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

// Admin-only analytics, blocking, and destructive cleanup routes
router.get('/admin/tenants/:tenantId/analytics', auth, authorize('admin'), studentController.getTenantAnalytics);
router.delete('/admin/:id', auth, authorize('admin'), studentController.adminDeleteStudent);
router.delete('/admin/tenant/:tenantId', auth, authorize('admin'), studentController.adminDeleteStudentsByTenant);
router.delete('/admin/tenant/:tenantId/institution/:institution', auth, authorize('admin'), studentController.adminDeleteStudentsByInstitution);
router.delete('/admin/batch/:batchId', auth, authorize('admin'), studentController.adminDeleteStudentsByBatch);
router.patch('/admin/batch/:batchId/access', auth, authorize('admin'), studentController.adminSetBatchAccess);
router.patch('/admin/tenant/:tenantId/institution/:institution/access', auth, authorize('admin'), studentController.adminSetInstitutionAccess);

// Get all students (instructor only)
router.get('/', auth, (req, res, next) => {
  if (req.user.role === 'admin') return next();
  return checkPermission('manage_students')(req, res, next);
}, studentController.getAllStudents);

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

// Bulk reset passwords (instructor only)
router.post('/bulk-reset-password', auth, checkPermission('manage_students'), studentController.bulkResetPasswords);

// Student profile routes (student only)
router.get('/profile', auth, studentController.getProfile);
router.put('/update-profile', auth, studentController.updateProfile);
router.post('/connect-coding-profiles', auth, studentController.connectCodingProfiles);
router.post('/dsa-solved', auth, studentController.toggleDSASolved);

module.exports = router;
