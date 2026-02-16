const mongoose = require('mongoose');

const frontendQuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  problemStatement: {
    type: String,
    required: true
  },
  requirements: [{
    type: String,
    required: true
  }],
  acceptanceCriteria: [{
    type: String,
    required: true
  }],
  jestTestFile: {
    type: String,
    required: true
  },
  defaultFiles: {
    html: {
      type: String,
      default: '<!DOCTYPE html>\n<html>\n<head>\n\t<title>Solution</title>\n\t<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n\t<script src="script.js"></script>\n</body>\n</html>'
    },
    css: {
      type: String,
      default: '/* Write your CSS here */\n'
    },
    js: {
      type: String,
      default: '// Write your JavaScript here\n'
    }
  },
  allowedFiles: [{
    type: String,
    enum: ['html', 'css', 'js'],
    default: ['html', 'css', 'js']
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  tags: [{
    type: String
  }],
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

frontendQuestionSchema.index({ tenant: 1, isActive: 1 });
frontendQuestionSchema.index({ difficulty: 1, tags: 1 });

module.exports = mongoose.model('FrontendQuestion', frontendQuestionSchema);
