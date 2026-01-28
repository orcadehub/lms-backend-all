const express = require('express');
const { auth } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissions');
const QuizAttempt = require('../models/QuizAttempt');

const router = express.Router();

// Allow resume for interrupted attempt
router.patch('/:attemptId/allow-resume', auth, checkPermission('create_quizzes'), async (req, res) => {
  try {
    const { attemptId } = req.params;
    const instructorId = req.user._id; // Get instructor ID from JWT token
    
    console.log('Allow resume request:', { attemptId, instructorId });
    
    const attempt = await QuizAttempt.findByIdAndUpdate(
      attemptId,
      { 
        attemptStatus: 'RESUME_ALLOWED',
        resumeAllowedBy: instructorId,
        resumeAllowedAt: new Date(),
        tabSwitchCount: 0, // Reset tab switches to zero
        $inc: { resumeCount: 1 } // Increment resume count
      },
      { new: true }
    );
    
    if (!attempt) {
      console.log('Attempt not found:', attemptId);
      return res.status(404).json({ message: 'Attempt not found' });
    }
    
    console.log('Resume allowed successfully for attempt:', attemptId);
    res.json({ message: 'Resume allowed - tab switches reset to zero', attempt });
  } catch (error) {
    console.error('Error allowing resume:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Allow retake for completed/terminated attempt
router.patch('/:attemptId/allow-retake', auth, checkPermission('create_quizzes'), async (req, res) => {
  try {
    const { attemptId } = req.params;
    const instructorId = req.user._id; // Get instructor ID from JWT token
    
    const attempt = await QuizAttempt.findByIdAndUpdate(
      attemptId,
      { 
        attemptStatus: 'RETAKE_ALLOWED',
        resumeAllowedBy: instructorId,
        resumeAllowedAt: new Date()
      },
      { new: true }
    );
    
    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }
    
    res.json({ message: 'Retake allowed', attempt });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Terminate active attempt
router.patch('/:attemptId/terminate', auth, checkPermission('create_quizzes'), async (req, res) => {
  try {
    const { attemptId } = req.params;
    const instructorId = req.user._id; // Get instructor ID from JWT token
    
    const attempt = await QuizAttempt.findByIdAndUpdate(
      attemptId,
      { 
        attemptStatus: 'TERMINATED',
        completedAt: new Date(),
        submissionReason: 'INSTRUCTOR_TERMINATED'
      },
      { new: true }
    );
    
    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }
    
    res.json({ message: 'Attempt terminated', attempt });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;