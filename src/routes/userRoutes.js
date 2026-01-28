const express = require('express');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/', auth, authorize('admin'), async (req, res) => {
  res.json({ message: 'Get all users - TODO' });
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  res.json({ message: 'Get user profile - TODO' });
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  res.json({ message: 'Update user profile - TODO' });
});

module.exports = router;