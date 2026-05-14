const mongoose = require('mongoose');
const AssessmentQuestion = require('./models/AssessmentQuestion');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const questions = await AssessmentQuestion.find({ assessmentType: 'programming' }, 'title topic');
  console.log("Found programming questions:", questions.length);
  questions.forEach(q => console.log(`- ${q.title} (Topic: ${q.topic})`));
  
  await AssessmentQuestion.deleteMany({ assessmentType: 'programming' });
  console.log(`Deleted ${questions.length} programming questions.`);
  process.exit(0);
}
run();
