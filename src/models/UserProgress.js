const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'PracticeQuestion', required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  status: { type: String, enum: ['accepted', 'failed'], required: true },
  runtime: { type: Number },
  memory: { type: Number },
  testCasesPassed: { type: Number, default: 0 },
  totalTestCases: { type: Number, default: 0 },
  submittedAt: { type: Date, default: Date.now }
});

const userProgressSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  totalCoins: { type: Number, default: 0 },
  questionsAttempted: { type: Number, default: 0 },
  questionsCompleted: { type: Number, default: 0 },
  totalSubmissions: { type: Number, default: 0 },
  successfulSubmissions: { type: Number, default: 0 },
  totalRuns: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  completedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PracticeQuestion' }],
  submissions: [submissionSchema],
  currentCodes: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'PracticeQuestion', required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now }
  }],
  lastActive: { type: Date, default: Date.now }
}, { timestamps: true });

userProgressSchema.index({ student: 1, tenant: 1 }, { unique: true });

module.exports = mongoose.model('UserProgress', userProgressSchema);