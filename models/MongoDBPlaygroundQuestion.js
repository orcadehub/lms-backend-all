const mongoose = require('mongoose');

const mongoDBPlaygroundQuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  problemStatement: {
    type: String,
    required: true
  },
  collectionName: {
    type: String,
    required: true,
    enum: ['users', 'products', 'students']
  },
  starterCode: {
    type: String,
    default: 'db.collection.find({})'
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

module.exports = mongoose.model('MongoDBPlaygroundQuestion', mongoDBPlaygroundQuestionSchema);
