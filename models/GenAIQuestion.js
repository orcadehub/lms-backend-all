const mongoose = require('mongoose');

const genAIQuestionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  problemStatement: { type: String, required: true },
  starterCode: { type: String, default: '' },
  requiredLibraries: [{ type: String }],
  testCode: { type: String, required: true }, // hidden unittest code appended after student code
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
  tags: [String],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('GenAIQuestion', genAIQuestionSchema);
