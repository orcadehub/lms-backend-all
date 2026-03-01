const mongoose = require('mongoose');
require('dotenv').config();

const AssessmentQuestion = require('../models/AssessmentQuestion');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

async function checkJSQuestions() {
  try {
    const jsQuestions = await AssessmentQuestion.find({
      tags: { $in: ['JavaScript', 'javascript', 'JS', 'js'] }
    }).sort({ createdAt: -1 });

    console.log(`\n=== Total JavaScript Questions: ${jsQuestions.length} ===\n`);

    jsQuestions.forEach((q, index) => {
      console.log(`${index + 1}. ${q.title}`);
      console.log(`   Difficulty: ${q.difficulty}`);
      console.log(`   Type: ${q.assessmentType}`);
      console.log(`   Tags: ${q.tags.join(', ')}`);
      console.log(`   Test Cases: ${q.testCases.length}`);
      console.log(`   Active: ${q.isActive}`);
      console.log(`   Created: ${q.createdAt.toLocaleDateString()}`);
      console.log('');
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkJSQuestions();
