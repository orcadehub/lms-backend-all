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
    type: String,
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
      type: String,
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
  tags: [String],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  }
}, {
  timestamps: true
});

quizQuestionSchema.index({ tenant: 1, isActive: 1 });
quizQuestionSchema.index({ createdBy: 1, tenant: 1 });
quizQuestionSchema.index({ topic: 1, difficulty: 1 });
quizQuestionSchema.index({ tags: 1 });
quizQuestionSchema.index({ difficulty: 1 });

module.exports = mongoose.model('QuizQuestion', quizQuestionSchema);
