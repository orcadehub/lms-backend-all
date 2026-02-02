const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['programming', 'frontend', 'backend', 'fullstack', 'database', 'system-design', 'aptitude', 'technical', 'behavioral']
  },
  duration: {
    type: Number,
    required: true,
    min: 30,
    max: 300
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssessmentQuestion'
  }],
  batches: {
    type: mongoose.Schema.Types.Mixed, // Can be 'all' or array of batch IDs
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'completed'],
    default: 'draft'
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  earlyStartBuffer: {
    type: Number,
    default: 0,
    min: 0,
    max: 60
  },
  maxTabSwitches: {
    type: Number,
    default: 3,
    min: -1,
    max: 10
  },
  allowedIPs: [{
    type: String,
    trim: true
  }],
  allowedLanguages: [{
    type: String,
    enum: ['python', 'cpp', 'java', 'c', 'javascript', 'typescript'],
    default: ['python', 'cpp', 'java', 'c']
  }],
  showKeyInsights: {
    type: Boolean,
    default: false
  },
  showAlgorithmSteps: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Assessment', assessmentSchema);