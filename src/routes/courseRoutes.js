const express = require('express');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  res.json({ message: 'Get all courses - TODO' });
});

// Get course by ID
router.get('/:id', async (req, res) => {
  res.json({ message: 'Get course by ID - TODO' });
});

// Create course (instructor/admin only)
router.post('/', auth, authorize('instructor', 'admin'), async (req, res) => {
  res.json({ message: 'Create course - TODO' });
});

// Update course
router.put('/:id', auth, authorize('instructor', 'admin'), async (req, res) => {
  res.json({ message: 'Update course - TODO' });
});

// Delete course
router.delete('/:id', auth, authorize('instructor', 'admin'), async (req, res) => {
  res.json({ message: 'Delete course - TODO' });
});

// Enroll in course
router.post('/:id/enroll', auth, async (req, res) => {
  res.json({ message: 'Enroll in course - TODO' });
});

module.exports = router;