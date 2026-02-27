const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const QuizQuestion = require('../models/QuizQuestion');

router.use(auth);

// GET all quiz questions
router.get('/', async (req, res) => {
  try {
    const questions = await QuizQuestion.find().sort({ createdAt: -1 }).lean();
    // Transform old format to new format if needed
    const transformedQuestions = questions.map(q => {
      if (!q.options || q.options.length === 0) {
        q.options = [
          { text: q.option1 || '', image: '' },
          { text: q.option2 || '', image: '' },
          { text: q.option3 || '', image: '' },
          { text: q.option4 || '', image: '' }
        ];
      }
      return q;
    });
    res.json(transformedQuestions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT update quiz question
router.put('/:id', async (req, res) => {
  try {
    const question = await QuizQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
