const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizQuestion'
  }],
  answers: {
    type: Map,
    of: String, // questionId -> correct answer text
    default: new Map()
  },
  batches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batch'
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'completed'],
    default: 'draft'
  },
  type: {
    type: String,
    enum: ['quiz', 'assessment'],
    default: 'quiz'
  },
  startTime: {
    type: Date
  },
  earlyStartBuffer: {
    type: Number,
    default: 0, // Minutes after start time when students can still begin
    min: 0,
    max: 60
  },
  maxTabSwitches: {
    type: Number,
    default: 3, // Maximum allowed tab switches
    min: -1,
    max: 10
  },
  allowedIPs: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for API optimization
quizSchema.index({ tenant: 1, isActive: 1 }); // Get active quizzes by tenant
quizSchema.index({ tenant: 1, status: 1 }); // Get quizzes by status and tenant
quizSchema.index({ createdBy: 1, tenant: 1 }); // Get quizzes by instructor
quizSchema.index({ students: 1 }); // Find quizzes for specific student
quizSchema.index({ batches: 1 }); // Find quizzes for specific batch
quizSchema.index({ startTime: 1, status: 1 }); // Time-based queries

module.exports = mongoose.model('Quiz', quizSchema);