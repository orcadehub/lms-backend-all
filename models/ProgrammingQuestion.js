const mongoose = require('mongoose');

const programmingQuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  constraints: { type: [String], required: true },
  testCases: [{
    input: { type: mongoose.Schema.Types.Mixed, required: true },
    output: { type: mongoose.Schema.Types.Mixed, required: true },
    explanation: { type: String },
    isPublic: { type: Boolean, required: true }
  }],
  tags: { type: [String], required: true },
  assessmentType: { type: String, enum: ['programming', 'frontend', 'backend', 'fullstack', 'database', 'system-design', 'aptitude', 'technical', 'behavioral'], required: true },
  example: {
    input: { type: String, required: true },
    output: { type: String, required: true },
    explanation: { type: String, required: true }
  },
  intuition: {
    approach: { type: String, required: true },
    timeComplexity: { type: String, required: true },
    spaceComplexity: { type: String, required: true },
    keyInsights: { type: [String], required: true },
    algorithmSteps: { type: [String], required: true }
  },
  topic: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true }
}, { timestamps: true });

programmingQuestionSchema.index({ createdBy: 1, isActive: 1 });
programmingQuestionSchema.index({ assessmentType: 1, difficulty: 1 });
programmingQuestionSchema.index({ tags: 1 });
programmingQuestionSchema.index({ difficulty: 1, isActive: 1 });
programmingQuestionSchema.index({ isActive: 1 });
programmingQuestionSchema.index({ topic: 1, isActive: 1 });

module.exports = mongoose.model('ProgrammingQuestion', programmingQuestionSchema);
