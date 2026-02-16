const express = require('express');
const router = express.Router();
const {
  createFrontendQuestion,
  getFrontendQuestions,
  getFrontendQuestionById,
  updateFrontendQuestion,
  deleteFrontendQuestion
} = require('../controllers/frontendQuestionController');
const { auth } = require('../middleware/auth');
const { runFrontendTests } = require('../utils/frontendTestRunner');

router.use(auth);

router.post('/', createFrontendQuestion);
router.get('/', getFrontendQuestions);
router.get('/:id', getFrontendQuestionById);
router.put('/:id', updateFrontendQuestion);
router.delete('/:id', deleteFrontendQuestion);

router.post('/run-tests', async (req, res) => {
  try {
    const { html, css, js, testFile } = req.body;
    const results = await runFrontendTests(html, css, js, testFile);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
