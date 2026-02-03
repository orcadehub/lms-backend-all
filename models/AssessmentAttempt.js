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
    enum: ['STARTED', 'IN_PROGRESS', 'INTERRUPTED', 'RESUME_ALLOWED', 'RESUMED', 'COMPLETED', 'AUTO_SUBMITTED', 'TERMINATED', 'TAB_SWITCH_VIOLATION', 'RETAKE_ALLOWED', 'RETAKE_STARTED'],
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
  successfulCodes: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  questionPercentages: {
    type: mongoose.Schema.Types.Mixed,
    default: {} // { questionId: percentage }
  },
  overallPercentage: {
    type: Number,
    default: 0
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
    sessionStartTime: {
      type: Date
    },
    sessionEndTime: {
      type: Date
    }
  }
}, {
  timestamps: true
});

// Ensure unique attempt numbers per student per assessment
assessmentAttemptSchema.index({ student: 1, assessment: 1, attemptNumber: 1 }, { unique: true });

module.exports = mongoose.model('AssessmentAttempt', assessmentAttemptSchema);