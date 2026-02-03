const mongoose = require('mongoose');

const codeHistorySchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ['python', 'cpp', 'java', 'c', 'javascript']
  },
  code: {
    type: String,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const submissionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ['python', 'cpp', 'java', 'c', 'javascript']
  },
  status: {
    type: String,
    enum: ['accepted', 'wrong_answer', 'runtime_error', 'compile_error', 'time_limit_exceeded'],
    required: true
  },
  passedTests: {
    type: Number,
    default: 0
  },
  totalTests: {
    type: Number,
    default: 0
  },
  executionTime: {
    type: Number, // in milliseconds
    default: 0
  },
  memoryUsed: {
    type: Number, // in KB
    default: 0
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const practiceSubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  subTopicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubTopic',
    required: true
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  
  // Completion status
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  
  // Coins and scoring
  coinsEarned: {
    type: Number,
    default: 0
  },
  maxCoinsAvailable: {
    type: Number,
    default: 0
  },
  
  // Multi-language code storage
  codeHistory: {
    type: Map,
    of: {
      code: String,
      lastUpdated: Date
    },
    default: new Map()
  },
  
  // Submissions array
  submissions: {
    type: [submissionSchema],
    default: []
  },
  
  // Current active language
  currentLanguage: {
    type: String,
    enum: ['python', 'cpp', 'java', 'c', 'javascript'],
    default: 'python'
  },
  
  // Last executed code for each language (run button)
  lastExecutedCodes: {
    type: Map,
    of: {
      code: String,
      executedAt: Date
    },
    default: new Map()
  },
  
  // Timer data
  timerUsed: {
    type: Boolean,
    default: false
  },
  totalTimeSpent: {
    type: Number, // in seconds
    default: 0
  },
  timeToComplete: {
    type: Number, // in seconds (time when first accepted)
    default: null
  },
  
  // Attempt metrics
  totalAttempts: {
    type: Number,
    default: 0
  },
  successfulSubmissions: {
    type: Number,
    default: 0
  },
  
  // Code runs (test executions)
  totalRuns: {
    type: Number,
    default: 0
  },
  
  // Difficulty and performance
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard']
  },
  
  // Session data
  sessionsCount: {
    type: Number,
    default: 1
  },
  firstAttemptAt: {
    type: Date,
    default: Date.now
  },
  lastActivityAt: {
    type: Date,
    default: Date.now
  },
  
  // Language preferences
  languagesUsed: [{
    type: String,
    enum: ['python', 'cpp', 'java', 'c', 'javascript']
  }],
  
  // Hints and help
  hintsViewed: {
    type: Number,
    default: 0
  },
  intuitionViewed: {
    type: Boolean,
    default: false
  },
  
  // Performance metrics
  bestExecutionTime: {
    type: Number, // in milliseconds
    default: null
  },
  bestMemoryUsage: {
    type: Number, // in KB
    default: null
  }
}, {
  timestamps: true
});

// Indexes for better query performance
practiceSubmissionSchema.index({ userId: 1, questionId: 1 }, { unique: true });
practiceSubmissionSchema.index({ userId: 1, isCompleted: 1 });
practiceSubmissionSchema.index({ userId: 1, topicId: 1 });
practiceSubmissionSchema.index({ userId: 1, subTopicId: 1 });
// Additional indexes for API optimization
practiceSubmissionSchema.index({ userId: 1, coinsEarned: -1 }); // Sort by coins earned
practiceSubmissionSchema.index({ topicId: 1, isCompleted: 1 }); // Topic completion stats
practiceSubmissionSchema.index({ questionId: 1, isCompleted: 1 }); // Question completion stats
practiceSubmissionSchema.index({ completedAt: 1 }); // Sort by completion time
practiceSubmissionSchema.index({ lastActivityAt: 1 }); // Sort by last activity

// Update lastActivityAt on save
practiceSubmissionSchema.pre('save', function(next) {
  this.lastActivityAt = new Date();
  next();
});

module.exports = mongoose.model('PracticeSubmission', practiceSubmissionSchema);