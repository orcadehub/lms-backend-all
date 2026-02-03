const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  codeSnippet: {
    type: String,
    trim: true
  },
  image: {
    type: String, // URL or file path
    trim: true
  },
  language: {
    type: String,
    trim: true
  },
  topic: {
    type: String,
    trim: true
  },
  options: [{
    text: {
      type: String,
      trim: true
    },
    image: {
      type: String, // URL or file path for image-based options
      trim: true
    }
  }],
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  },
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
  tags: [String], // For categorization
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Indexes for API optimization
quizQuestionSchema.index({ tenant: 1, isActive: 1 }); // Get questions by tenant
quizQuestionSchema.index({ createdBy: 1, tenant: 1 }); // Get questions by instructor
quizQuestionSchema.index({ topic: 1, difficulty: 1 }); // Filter by topic and difficulty
quizQuestionSchema.index({ tags: 1 }); // Search by tags
quizQuestionSchema.index({ difficulty: 1 }); // Filter by difficulty

module.exports = mongoose.model('QuizQuestion', quizQuestionSchema);