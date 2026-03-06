const mongoose = require('mongoose');

const aiMockInterviewSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  type: { type: String, enum: ['resume-based', 'jd-based', 'language-based', 'topic-based', 'code-optimization', 'coding-challenge'], required: true },
  resumeText: String,
  questions: [{
    question: String,
    category: String,
    difficulty: String,
    answer: String,
    feedback: String
  }],
  duration: Number,
  difficulty: String,
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  score: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AIMockInterview', aiMockInterviewSchema);
