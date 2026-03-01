const mongoose = require('mongoose');
require('dotenv').config();

const AssessmentQuestion = require('../models/AssessmentQuestion');
const FrontendQuestion = require('../models/FrontendQuestion');
const QuizQuestion = require('../models/QuizQuestion');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

async function checkAllJSQuestions() {
  try {
    // Check AssessmentQuestion (Programming questions)
    const programmingJS = await AssessmentQuestion.find({
      tags: { $in: ['JavaScript', 'javascript', 'JS', 'js'] }
    }).sort({ createdAt: -1 });

    console.log(`\n=== Programming Questions (JavaScript): ${programmingJS.length} ===\n`);
    programmingJS.forEach((q, i) => {
      console.log(`${i + 1}. ${q.title} [${q.difficulty}] - ${q.testCases.length} test cases`);
    });

    // Check FrontendQuestion (HTML/CSS/JS questions)
    const frontendJS = await FrontendQuestion.find({
      $or: [
        { tags: { $in: ['JavaScript', 'javascript', 'JS', 'js'] } },
        { allowedFiles: 'js' }
      ]
    }).sort({ createdAt: -1 });

    console.log(`\n=== Frontend Questions (JavaScript): ${frontendJS.length} ===\n`);
    frontendJS.forEach((q, i) => {
      console.log(`${i + 1}. ${q.title} [${q.difficulty}]`);
      console.log(`   Tags: ${q.tags.join(', ')}`);
      console.log(`   Allowed Files: ${q.allowedFiles.join(', ')}`);
      console.log('');
    });

    // Check QuizQuestion (MCQ questions)
    const quizJS = await QuizQuestion.find({
      tags: { $in: ['JavaScript', 'javascript', 'JS', 'js'] }
    }).sort({ createdAt: -1 });

    console.log(`\n=== Quiz Questions (JavaScript): ${quizJS.length} ===\n`);
    quizJS.forEach((q, i) => {
      console.log(`${i + 1}. ${q.question} [${q.difficulty}]`);
    });

    console.log(`\n=== TOTAL JavaScript Questions: ${programmingJS.length + frontendJS.length + quizJS.length} ===`);
    console.log(`Programming: ${programmingJS.length}`);
    console.log(`Frontend: ${frontendJS.length}`);
    console.log(`Quiz: ${quizJS.length}\n`);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkAllJSQuestions();
