const mongoose = require('mongoose');

const gamifiedAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GamifiedQuestion',
    required: true
  },
  
  // Attempt details
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'abandoned'],
    default: 'in-progress'
  },
  
  // Score tracking
  totalScore: { type: Number, default: 0 },
  maxScore: { type: Number, required: true },
  
  // Level progress
  currentLevel: { type: Number, default: 0 },
  totalLevels: { type: Number, required: true },
  completedLevels: { type: Number, default: 0 },
  
  // Level-wise answers
  levelAnswers: [{
    levelNumber: Number,
    question: String,
    selectedAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean,
    pointsEarned: Number,
    hintsUsed: [Number],
    timeSpent: Number
  }],
  
  // Time tracking
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  totalTimeSpent: { type: Number, default: 0 }, // in seconds
  timeLimit: { type: Number }, // in seconds
  
  // Hints and bonuses
  totalHintsUsed: { type: Number, default: 0 },
  speedBonus: { type: Number, default: 0 },
  
  // Completion
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date },
  
  // Performance metrics
  accuracy: { type: Number, default: 0 }, // percentage
  averageTimePerLevel: { type: Number, default: 0 }
  
}, { timestamps: true });

// Indexes
gamifiedAttemptSchema.index({ userId: 1, questionId: 1 });
gamifiedAttemptSchema.index({ userId: 1, status: 1 });
gamifiedAttemptSchema.index({ isCompleted: 1, completedAt: -1 });

module.exports = mongoose.model('GamifiedAttempt', gamifiedAttemptSchema);
