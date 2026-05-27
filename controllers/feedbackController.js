const Feedback = require('../models/Feedback');

/**
 * Student submits feedback (authenticated)
 */
exports.submitFeedback = async (req, res) => {
  try {
    const studentId = req.userId || req.user?.id || req.user?._id;
    if (!studentId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const { fullName, collegeName, description, rating } = req.body;

    // Validate required fields
    if (!fullName || !collegeName || !description || !rating) {
      return res.status(400).json({ message: 'All fields are required: fullName, collegeName, description, rating' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    if (description.length > 500) {
      return res.status(400).json({ message: 'Description must be 500 characters or less' });
    }

    // Check if student already submitted feedback
    const existingFeedback = await Feedback.findOne({ studentId });
    if (existingFeedback) {
      return res.status(409).json({ message: 'You have already submitted feedback. Only one submission per user is allowed.' });
    }

    const feedback = await Feedback.create({
      studentId,
      fullName: fullName.trim(),
      collegeName: collegeName.trim(),
      description: description.trim(),
      rating: Number(rating)
    });

    res.status(201).json({
      message: 'Feedback submitted successfully! It will be reviewed by the admin.',
      feedback
    });
  } catch (error) {
    console.error('Submit feedback error:', error.message);
    res.status(500).json({ message: 'Failed to submit feedback' });
  }
};

/**
 * Admin: Get all feedback with optional filters
 */
exports.getAllFeedback = async (req, res) => {
  try {
    const { status } = req.query; // 'pending', 'approved', or undefined for all
    
    const filter = {};
    if (status === 'pending') filter.isApproved = false;
    if (status === 'approved') filter.isApproved = true;

    const feedbacks = await Feedback.find(filter)
      .sort({ createdAt: -1 })
      .populate('studentId', 'name email')
      .lean();

    const counts = {
      total: await Feedback.countDocuments(),
      pending: await Feedback.countDocuments({ isApproved: false }),
      approved: await Feedback.countDocuments({ isApproved: true })
    };

    res.json({ feedbacks, counts });
  } catch (error) {
    console.error('Get all feedback error:', error.message);
    res.status(500).json({ message: 'Failed to fetch feedback' });
  }
};

/**
 * Admin: Approve a feedback entry
 */
exports.approveFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.userId || req.user?.id || req.user?._id;

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { 
        isApproved: true, 
        approvedBy: adminId,
        approvedAt: new Date()
      },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json({ message: 'Feedback approved and will now appear in testimonials', feedback });
  } catch (error) {
    console.error('Approve feedback error:', error.message);
    res.status(500).json({ message: 'Failed to approve feedback' });
  }
};

/**
 * Admin: Reject (delete) a feedback entry
 */
exports.rejectFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndDelete(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json({ message: 'Feedback rejected and removed' });
  } catch (error) {
    console.error('Reject feedback error:', error.message);
    res.status(500).json({ message: 'Failed to reject feedback' });
  }
};

/**
 * Public: Get all approved feedback for testimonials display
 */
exports.getApprovedFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ isApproved: true })
      .sort({ approvedAt: -1 })
      .select('fullName collegeName description rating approvedAt')
      .lean();

    res.json(feedbacks);
  } catch (error) {
    console.error('Get approved feedback error:', error.message);
    res.status(500).json({ message: 'Failed to fetch testimonials' });
  }
};

/**
 * Check if the authenticated student has already submitted a testimonial
 */
exports.checkUserFeedback = async (req, res) => {
  try {
    const studentId = req.userId || req.user?.id || req.user?._id;
    if (!studentId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const feedback = await Feedback.findOne({ studentId });
    res.json({ submitted: !!feedback });
  } catch (error) {
    console.error('Check feedback status error:', error.message);
    res.status(500).json({ message: 'Server error checking feedback status' });
  }
};
