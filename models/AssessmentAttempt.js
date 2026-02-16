const mongoose = require('mongoose');

const assessmentAttemptSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  assessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  attemptNumber: {
    type: Number,
    required: true,
    default: 1
  },
  answers: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  score: {
    type: Number,
    default: 0
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  totalProgrammingQuestions: {
    type: Number,
    default: 0
  },
  totalQuizQuestions: {
    type: Number,
    default: 0
  },
  totalFrontendQuestions: {
    type: Number,
    default: 0
  },
  timeTaken: {
    type: Number,
    default: 0
  },
  startedAt: {
    type: Date,
    required: true
  },
  completedAt: {
    type: Date
  },
  attemptStatus: {
    type: String,
    enum: ['STARTED', 'IN_PROGRESS', 'INTERRUPTED', 'RESUME_ALLOWED', 'RESUMED', 'COMPLETED', 'AUTO_SUBMITTED', 'TERMINATED', 'TAB_SWITCH_VIOLATION', 'FULLSCREEN_EXIT_VIOLATION', 'RETAKE_ALLOWED', 'RETAKE_STARTED'],
    default: 'STARTED'
  },
  lastActiveQuestionId: {
    type: Number,
    default: 0
  },
  timeUsedSeconds: {
    type: Number,
    default: 0
  },
  remainingTimeSeconds: {
    type: Number,
    required: true
  },
  interruptionReason: {
    type: String,
    enum: ['BROWSER_CLOSE', 'TAB_CLOSE', 'PAGE_REFRESH', 'INTERNET_DISCONNECT', 'SYSTEM_CRASH']
  },
  terminationReason: {
    type: String
  },
  submissionReason: {
    type: String,
    enum: ['MANUAL_SUBMIT', 'AUTO_SUBMIT', 'TIME_UP', 'TAB_SWITCH_VIOLATION', 'FULLSCREEN_EXIT_VIOLATION', 'SYSTEM_CHANGE_VIOLATION', 'INSTRUCTOR_TERMINATED']
  },
  instructorPermissionType: {
    type: String,
    enum: ['RESUME', 'RETAKE']
  },
  resumeAllowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor'
  },
  resumeAllowedAt: {
    type: Date
  },
  resumeToken: {
    type: String
  },
  resumeCount: {
    type: Number,
    default: 0
  },
  resumedAt: {
    type: Date
  },
  tabSwitchCount: {
    type: Number,
    default: 0
  },
  fullscreenExitCount: {
    type: Number,
    default: 0
  },
  instructorRemarks: {
    type: String
  },
  lastExecutedCode: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  lastExecutedFrontendCode: {
    type: mongoose.Schema.Types.Mixed,
    default: {} // { questionId: { html: '', css: '', js: '' } }
  },
  successfulCodes: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  questionPercentages: {
    type: mongoose.Schema.Types.Mixed,
    default: {} // { questionId: percentage }
  },
  quizAnswers: {
    type: mongoose.Schema.Types.Mixed,
    default: {} // { questionId: { selectedAnswer: index, isCorrect: boolean } }
  },
  programmingPercentage: {
    type: Number,
    default: 0
  },
  quizPercentage: {
    type: Number,
    default: 0
  },
  frontendPercentage: {
    type: Number,
    default: 0
  },
  overallPercentage: {
    type: Number,
    default: 0 // Average of programmingPercentage, quizPercentage, and frontendPercentage
  },
  accuracy: {
    type: Number,
    default: 0 // Average accuracy across all problems based on test cases passed
  },
  problemAccuracies: {
    type: mongoose.Schema.Types.Mixed,
    default: {} // { questionId: { passed: number, total: number, accuracy: number } }
  },
  sessionData: {
    startIP: {
      type: String
    },
    endIP: {
      type: String
    },
    systemInfo: [{
      userAgent: String,
      platform: String,
      language: String,
      screenResolution: String,
      timezone: String,
      cookieEnabled: Boolean,
      onlineStatus: Boolean,
      timestamp: Date
    }],
    lastHeartbeat: {
      type: Date
    },
    connectionEvents: [{
      type: {
        type: String,
        enum: ['CONNECTION_LOST', 'BROWSER_CLOSE', 'RECONNECTED']
      },
      timestamp: Date
    }],
    sessionStartTime: {
      type: Date
    },
    sessionEndTime: {
      type: Date
    }
  },
  retakeCount: {
    type: Number,
    default: 0
  },
  retakenAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Ensure unique attempt numbers per student per assessment
assessmentAttemptSchema.index({ student: 1, assessment: 1, attemptNumber: 1 }, { unique: true });

// Additional indexes for API optimization
assessmentAttemptSchema.index({ student: 1, assessment: 1 }); // Get attempts by student and assessment
assessmentAttemptSchema.index({ assessment: 1, attemptStatus: 1 }); // Get attempts by assessment and status
assessmentAttemptSchema.index({ tenantId: 1, attemptStatus: 1 }); // Get attempts by tenant and status
assessmentAttemptSchema.index({ student: 1, attemptStatus: 1 }); // Get attempts by student and status
assessmentAttemptSchema.index({ completedAt: 1 }); // Sort by completion time
assessmentAttemptSchema.index({ startedAt: 1 }); // Sort by start time
assessmentAttemptSchema.index({ overallPercentage: -1 }); // Sort by percentage (descending)
assessmentAttemptSchema.index({ score: -1 }); // Sort by score (descending)

module.exports = mongoose.model('AssessmentAttempt', assessmentAttemptSchema);