const mongoose = require('mongoose');

const labSubmissionSchema = new mongoose.Schema({
  labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lab', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  files: [{
    path: String,
    content: String
  }],
  testResults: [{
    testCaseIndex: Number,
    passed: Boolean,
    actualOutput: String,
    error: String
  }],
  score: Number,
  status: { type: String, enum: ['in-progress', 'submitted', 'passed', 'failed'], default: 'in-progress' },
  submittedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('LabSubmission', labSubmissionSchema);
