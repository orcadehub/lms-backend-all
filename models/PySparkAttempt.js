const mongoose = require('mongoose');

const pysparkAttemptSchema = new mongoose.Schema({
  tenantId: {
    type: String,
    required: true,
    index: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PySparkQuestion',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  output: {
    type: String
  },
  status: {
    type: String,
    enum: ['Passed', 'Failed', 'Error'],
    required: true
  },
  executionTime: {
    type: Number
  }
}, {
  timestamps: true
});

pysparkAttemptSchema.index({ tenantId: 1, studentId: 1, questionId: 1 });

module.exports = mongoose.model('PySparkAttempt', pysparkAttemptSchema);
