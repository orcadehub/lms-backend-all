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

module.exports = mongoose.model('PracticeQuestion', practiceQuestionSchema);