const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { auth, authorize } = require('../middleware/auth');

// Public: Get approved testimonials (no auth required)
router.get('/approved', feedbackController.getApprovedFeedback);

// Authenticated student: Submit feedback
router.post('/', auth, feedbackController.submitFeedback);

// Authenticated student: Check if user has already submitted feedback
router.get('/status', auth, feedbackController.checkUserFeedback);

// Admin only: Get all feedback
router.get('/', auth, authorize('admin'), feedbackController.getAllFeedback);

// Admin only: Approve feedback
router.put('/:id/approve', auth, authorize('admin'), feedbackController.approveFeedback);

// Admin only: Reject/delete feedback
router.delete('/:id', auth, authorize('admin'), feedbackController.rejectFeedback);

module.exports = router;
