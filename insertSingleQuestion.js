const mongoose = require('mongoose');
require('dotenv').config();
const ProgrammingQuestion = require('./models/ProgrammingQuestion');

const question = {
  "title": "Sum of Two Numbers",
  "description": "Given two integers a and b, print their sum.",
  "difficulty": "Easy",
  "constraints": ["-1000 <= a, b <= 1000"],
  "testCases": [
    {"input": "5 3", "output": "8", "explanation": "5 + 3 = 8", "isPublic": true},
    {"input": "10 20", "output": "30", "explanation": "10 + 20 = 30", "isPublic": true},
    {"input": "0 0", "output": "0", "explanation": "0 + 0 = 0", "isPublic": true},
    {"input": "-5 5", "output": "0", "explanation": "-5 + 5 = 0", "isPublic": false},
    {"input": "-10 -20", "output": "-30", "explanation": "-10 + -20 = -30", "isPublic": false},
    {"input": "100 200", "output": "300", "explanation": "100 + 200 = 300", "isPublic": false},
    {"input": "1 1", "output": "2", "explanation": "1 + 1 = 2", "isPublic": false},
    {"input": "999 1", "output": "1000", "explanation": "999 + 1 = 1000", "isPublic": false},
    {"input": "-100 50", "output": "-50", "explanation": "-100 + 50 = -50", "isPublic": false},
    {"input": "0 -5", "output": "-5", "explanation": "0 + -5 = -5", "isPublic": false}
  ],
  "tags": ["Input", "Basic", "Math"],
  "assessmentType": "programming",
  "example": {
    "input": "a = 5, b = 3",
    "output": "8",
    "explanation": "Read two integers and output their sum."
  },
  "intuition": {
    "approach": "Direct Addition",
    "timeComplexity": "O(1)",
    "spaceComplexity": "O(1)",
    "keyInsights": ["Read two integers from input", "Add them together", "Print the result"],
    "algorithmSteps": ["Read integer a", "Read integer b", "Calculate sum = a + b", "Print sum"]
  },
  "topic": "Inputs",
  "isActive": true,
  "createdBy": "000000000000000000000001"
};

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    const result = await ProgrammingQuestion.create(question);
    console.log('Question inserted:', result.title);
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
