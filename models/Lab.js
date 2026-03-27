const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: String,
  expectedOutput: String,
  isPublic: { type: Boolean, default: true },
  description: String
});

const labSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  technology: { 
    type: String, 
    enum: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'React', 'MongoDB', 'MySQL', 'PostgreSQL', 'HTML/CSS', 'AI', 'ML', 'IoT', 'Cyber Security', 'Data Science', 'Data Structures'], 
    required: true 
  },
  category: { type: String, required: true },
  srs: {
    objectives: [String],
    requirements: [String],
    constraints: [String],
    deliverables: [String]
  },
  testCases: [testCaseSchema],
  initialFiles: [{
    path: String,
    content: String,
    readOnly: { type: Boolean, default: false }
  }],
  allowedCommands: [String],
  timeLimit: Number,
  points: { type: Number, default: 100 },
  requiredSoftware: [{
    name: String,
    command: String,
    versionCommand: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Lab', labSchema);
