const mongoose = require('mongoose');

const gamifiedQuestionSchema = new mongoose.Schema({
  subTopicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubTopic',
    required: true
  },
  
  // Basic Info
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  points: { type: Number, default: 10 },
  
  // Game Type
  gameType: {
    type: String,
    enum: [
      'MCQ', 'TreasureHunt', 'EscapeRoom', 'SpeedRun', 'BossBattle',
      'PatternMatch', 'SequenceMemory', 'LogicPuzzle', 'MathChallenge',
      'CodeDebug', 'DataInterpretation', 'VerbalReasoning', 'SpatialReasoning'
    ],
    required: true
  },
  
  // Multi-level support (for games like Treasure Hunt, Escape Room)
  isMultiLevel: { type: Boolean, default: false },
  totalLevels: { type: Number, default: 1 },
  
  // Levels array - each level is a separate challenge
  levels: [{
    levelNumber: { type: Number, required: true },
    levelTitle: { type: String },
    levelDescription: { type: String },
    
    // Question data (flexible structure)
    questionType: {
      type: String,
      enum: ['MCQ', 'MultiSelect', 'TrueFalse', 'FillBlank', 'Matching', 'Ordering', 'Interactive', 'DragDrop', 'BalloonPop', 'MemoryCard', 'SlidingPuzzle', 'EscapeRoom']
    },
    
    // Question content
    question: { type: String, required: true },
    questionImage: { type: String }, // Optional image URL
    
    // Options (for MCQ, MultiSelect, Matching)
    options: [{
      id: String,
      text: String,
      image: String,
      isCorrect: Boolean
    }],
    
    // Correct answer (flexible format)
    correctAnswer: mongoose.Schema.Types.Mixed, // Can be string, array, object
    
    // Hints (progressive hints)
    hints: [{
      hintNumber: Number,
      hintText: String,
      pointsDeduction: { type: Number, default: 2 }
    }],
    
    // Level-specific settings
    timeLimit: { type: Number }, // seconds for this level
    pointsForLevel: { type: Number, default: 10 },
    
    // Shuffle settings
    shuffleOptions: { type: Boolean, default: true },
    
    // Next level unlock condition
    minScoreToUnlock: { type: Number, default: 0 }
  }],
  
  // Timer settings
  hasTimer: { type: Boolean, default: true },
  totalTimeLimit: { type: Number, default: 300 }, // Total time in seconds (5 min default)
  timeLimitPerLevel: { type: Number }, // Optional: time per level
  
  // Scoring
  maxScore: { type: Number, default: 100 },
  passingScore: { type: Number, default: 60 },
  
  // Bonus points
  speedBonus: {
    enabled: { type: Boolean, default: false },
    maxBonus: { type: Number, default: 20 },
    timeThreshold: { type: Number, default: 60 } // Complete within X seconds for bonus
  },
  
  streakBonus: {
    enabled: { type: Boolean, default: false },
    bonusPerStreak: { type: Number, default: 5 }
  },
  
  // AI Shuffle Configuration
  aiShuffle: {
    enabled: { type: Boolean, default: false },
    shuffleType: {
      type: String,
      enum: ['random', 'adaptive', 'difficulty-based', 'performance-based'],
      default: 'random'
    },
    // Adaptive: Next level difficulty based on current performance
    adaptiveSettings: {
      increaseOnSuccess: { type: Boolean, default: true },
      decreaseOnFailure: { type: Boolean, default: true }
    }
  },
  
  // Power-ups/Boosters
  powerUps: [{
    type: {
      type: String,
      enum: ['50-50', 'ExtraTime', 'SkipLevel', 'DoublePoints', 'Hint']
    },
    cost: { type: Number, default: 10 }, // Cost in coins/points
    available: { type: Boolean, default: true }
  }],
  
  // Metadata
  tags: [String],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  
  // Analytics
  totalAttempts: { type: Number, default: 0 },
  successRate: { type: Number, default: 0 },
  averageTime: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 }
  
}, { timestamps: true });

// Index for faster queries
gamifiedQuestionSchema.index({ subTopicId: 1, gameType: 1 });
gamifiedQuestionSchema.index({ difficulty: 1, isActive: 1 });

module.exports = mongoose.model('GamifiedQuestion', gamifiedQuestionSchema);
