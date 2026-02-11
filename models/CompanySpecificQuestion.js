const mongoose = require('mongoose');

const companySpecificQuestionSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  points: { 
    type: Number, 
    default: function() {
      if (this.difficulty === 'Easy') return 3;
      if (this.difficulty === 'Medium') return 6;
      if (this.difficulty === 'Hard') return 10;
      return 10;
    }
  },
  totalTimeLimit: { type: Number },
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
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true }
}, { timestamps: true });

companySpecificQuestionSchema.index({ company: 1, isActive: 1 });
companySpecificQuestionSchema.index({ createdBy: 1, isActive: 1 });
companySpecificQuestionSchema.index({ assessmentType: 1, difficulty: 1 });
companySpecificQuestionSchema.index({ tags: 1 });

module.exports = mongoose.model('CompanySpecificQuestion', companySpecificQuestionSchema);
