const mongoose = require('mongoose');

const sqlPlaygroundQuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  problemStatement: {
    type: String,
    required: true
  },
  tableName: {
    type: String,
    required: true
  },
  starterCode: {
    type: String,
    default: 'SELECT * FROM table_name;'
  },
  testCases: [{
    description: String,
    expectedQuery: {
      type: String,
      required: true
    },
    isPublic: {
      type: Boolean,
      default: true
    }
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  tags: [String],
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
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SQLPlaygroundQuestion', sqlPlaygroundQuestionSchema);
