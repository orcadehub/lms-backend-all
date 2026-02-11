const mongoose = require('mongoose');

const pysparkQuestionSchema = new mongoose.Schema({
  tenantId: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  csvData: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    default: '/datasets/data.csv'
  },
  expectedOutput: {
    type: String,
    required: true
  },
  starterCode: {
    type: String,
    default: ''
  },
  hints: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

pysparkQuestionSchema.index({ tenantId: 1, isActive: 1 });

module.exports = mongoose.model('PySparkQuestion', pysparkQuestionSchema);
