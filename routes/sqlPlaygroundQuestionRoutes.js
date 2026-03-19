const express = require('express');
const router = express.Router();
const SQLPlaygroundQuestion = require('../models/SQLPlaygroundQuestion');
const { auth } = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const questions = await SQLPlaygroundQuestion.find({ 
      isActive: true 
    }).sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
