const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const QuizQuestion = require('../models/QuizQuestion');
const multer = require('multer');
const xlsx = require('xlsx');

const upload = multer({ storage: multer.memoryStorage() });

router.use(auth);

// GET template
router.get('/template', (req, res) => {
  try {
    const ws_data = [
      ['title', 'language', 'topic', 'codeSnippet', 'image', 'option1', 'option2', 'option3', 'option4', 'correctAnswer', 'difficulty'],
      ['Sample Question', 'javascript', 'basics', 'console.log("Hello");', '', 'Option A', 'Option B', 'Option C', 'Option D', 1, 'easy']
    ];
    const ws = xlsx.utils.aoa_to_sheet(ws_data);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Template");
    
    const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
    
    res.setHeader('Content-Disposition', 'attachment; filename="quiz_template.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buf);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST import from excel
router.post('/import-excel', upload.single('excel'), async (req, res) => {
  try {
    const tenantId = req.body.tenantId;
    if (!tenantId) return res.status(400).json({ message: 'tenantId is required' });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    
    const wb = xlsx.read(req.file.buffer, { type: 'buffer' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(ws);
    
    const successQuestions = [];
    const failedQuestions = [];
    
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      try {
        if (!row.title || !row.language || !row.topic || !row.option1 || !row.option2 || !row.option3 || !row.option4 || row.correctAnswer === undefined || !row.difficulty) {
           throw new Error('Missing required fields');
        }
        
        const options = [
          { text: String(row.option1), image: '' },
          { text: String(row.option2), image: '' },
          { text: String(row.option3), image: '' },
          { text: String(row.option4), image: '' }
        ];
        
        let correctAnswer = parseInt(row.correctAnswer);
        if (isNaN(correctAnswer) || correctAnswer < 1 || correctAnswer > 4) {
           throw new Error('correctAnswer must be between 1 and 4');
        }
        correctAnswer = correctAnswer - 1; // Convert to 0-index
        
        const q = new QuizQuestion({
           title: String(row.title),
           language: String(row.language),
           topic: String(row.topic),
           codeSnippet: row.codeSnippet ? String(row.codeSnippet) : '',
           image: row.image ? String(row.image) : '',
           options,
           correctAnswer,
           difficulty: String(row.difficulty).toLowerCase(),
           tenant: tenantId,
           createdBy: req.userId || req.user._id
        });
        await q.save();
        successQuestions.push(q);
      } catch (err) {
        failedQuestions.push({ row: i + 2, data: row, error: err.message });
      }
    }
    
    res.json({
      successCount: successQuestions.length,
      failedCount: failedQuestions.length,
      questions: successQuestions,
      failedQuestions
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

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
