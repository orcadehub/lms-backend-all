const express = require('express');
const { body } = require('express-validator');
const instructorController = require('../controllers/instructorController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all instructors (admin only)
router.get('/', auth, authorize('admin'), instructorController.getAllInstructors);

// Create instructor (admin only)
router.post('/', auth, authorize('admin'), [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('permissions').isArray().withMessage('Permissions must be an array')
], instructorController.createInstructor);

// Update instructor (admin only)
router.put('/:id', auth, authorize('admin'), [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('permissions').isArray().withMessage('Permissions must be an array')
], instructorController.updateInstructor);

// Delete instructor (admin only)
router.delete('/:id', auth, authorize('admin'), instructorController.deleteInstructor);

module.exports = router;