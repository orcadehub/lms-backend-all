const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: {
    format: {
      type: String,
      required: true // e.g., "array,integer" or "string"
    },
    dataType: {
      type: String,
      required: true,
      enum: ['string', 'integer', 'array', 'boolean', 'float', 'object']
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      default: '' // Allow empty strings
    }
  },
  output: {
    dataType: {
      type: String,
      required: true,
      enum: ['string', 'integer', 'array', 'boolean', 'float', 'object']
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      default: '' // Allow empty strings
    }
  },
  isPublic: {
    type: Boolean,
    required: true
  },
  explanation: {
    type: String,
    default: ''
  }
});

const intuitionSchema = new mongoose.Schema({
  approach: {
    type: String,
    required: true
  },
  timeComplexity: {
    type: String,
    required: true
  },
  spaceComplexity: {
    type: String,
    required: true
  },
  keyInsights: [{
    type: String
  }],
  algorithmSteps: [{
    type: String
  }]
});

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  subTopicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubTopic',
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  points: {
    type: Number,
    default: 10
  },
  example: {
    input: {
      type: String,
      required: true
    },
    output: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    explanation: {
      type: String,
      required: true
    }
  },
  testCases: [testCaseSchema],
  intuition: intuitionSchema,
  constraints: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Ensure at least 3 public test cases
questionSchema.pre('save', function(next) {
  const publicTestCases = this.testCases.filter(tc => tc.isPublic);
  if (publicTestCases.length < 3) {
    return next(new Error('At least 3 public test cases are required'));
  }
  next();
});

module.exports = mongoose.model('Question', questionSchema);