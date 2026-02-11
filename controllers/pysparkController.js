const PySparkQuestion = require('../models/PySparkQuestion');
const PySparkAttempt = require('../models/PySparkAttempt');

// Get all PySpark questions for tenant
exports.getQuestions = async (req, res) => {
  try {
    console.log('User object:', req.user);
    console.log('User tenant:', req.user.tenant);
    const tenantId = req.user.tenant;
    console.log('Looking for questions with tenantId:', tenantId);
    const questions = await PySparkQuestion.find({
      tenantId: tenantId,
      isActive: true
    }).select('-csvData -expectedOutput').sort({ createdAt: -1 });
    console.log('Found questions:', questions.length);

    res.json(questions);
  } catch (error) {
    console.error('Error in getQuestions:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single question with dataset
exports.getQuestion = async (req, res) => {
  try {
    const tenantId = req.user.tenant;
    const question = await PySparkQuestion.findOne({
      _id: req.params.id,
      tenantId: tenantId,
      isActive: true
    });

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Submit code and validate
exports.submitCode = async (req, res) => {
  try {
    const { questionId, code, output } = req.body;
    const tenantId = req.user.tenant;

    const question = await PySparkQuestion.findOne({
      _id: questionId,
      tenantId: tenantId
    });

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Simple output validation (can be enhanced)
    const normalizedOutput = output.trim().replace(/\s+/g, ' ');
    const normalizedExpected = question.expectedOutput.trim().replace(/\s+/g, ' ');
    const status = normalizedOutput.includes(normalizedExpected) ? 'Passed' : 'Failed';

    const attempt = await PySparkAttempt.create({
      tenantId: tenantId,
      studentId: req.user._id,
      questionId,
      code,
      output,
      status
    });

    res.json({ status, attempt });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get student attempts
exports.getAttempts = async (req, res) => {
  try {
    const tenantId = req.user.tenant;
    const attempts = await PySparkAttempt.find({
      tenantId: tenantId,
      studentId: req.user._id,
      questionId: req.params.questionId
    }).sort({ createdAt: -1 }).limit(10);

    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin: Create question
exports.createQuestion = async (req, res) => {
  try {
    const tenantId = req.user.tenant;
    const question = await PySparkQuestion.create({
      ...req.body,
      tenantId: tenantId
    });

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin: Update question
exports.updateQuestion = async (req, res) => {
  try {
    const tenantId = req.user.tenant;
    const question = await PySparkQuestion.findOneAndUpdate(
      { _id: req.params.id, tenantId: tenantId },
      req.body,
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin: Delete question
exports.deleteQuestion = async (req, res) => {
  try {
    const tenantId = req.user.tenant;
    const question = await PySparkQuestion.findOneAndUpdate(
      { _id: req.params.id, tenantId: tenantId },
      { isActive: false },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
