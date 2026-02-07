const mongoose = require('mongoose');

const mcqAttemptSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
    index: true
  },
  dataset: {
    type: String,
    required: true,
    index: true
  },
  questionIndex: {
    type: Number,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

mcqAttemptSchema.index({ studentId: 1, dataset: 1, questionIndex: 1 });

module.exports = mongoose.model('MCQAttempt', mcqAttemptSchema);
