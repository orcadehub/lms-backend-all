const mongoose = require('mongoose');

const practiceQuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  constraints: [String],
  example: {
    input: String,
    output: String
  },
  explanation: String,
  testCases: {
    public: [{
      input: String,
      output: String,
      explanation: String
    }],
    private: [{
      input: String,
      output: String
    }]
  },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  order: { type: Number, required: true },
  tags: [String],
  points: { type: Number, default: 10 },
  solution: {
    approach: String,
    timeComplexity: String,
    spaceComplexity: String
  },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Indexes for API optimization
practiceQuestionSchema.index({ topicId: 1, order: 1 }); // Get questions by topic sorted by order
practiceQuestionSchema.index({ tenant: 1, topicId: 1 }); // Get questions by tenant and topic
practiceQuestionSchema.index({ difficulty: 1, topicId: 1 }); // Filter by difficulty within topic
practiceQuestionSchema.index({ tags: 1 }); // Search by tags
practiceQuestionSchema.index({ createdBy: 1, tenant: 1 }); // Get questions by creator
practiceQuestionSchema.index({ points: -1 }); // Sort by points (descending)

module.exports = mongoose.model('PracticeQuestion', practiceQuestionSchema);