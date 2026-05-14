const mongoose = require('mongoose');
const ProgrammingQuestion = require('./models/ProgrammingQuestion');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const questions = await ProgrammingQuestion.find({}, 'title topic');
  console.log("Found questions:");
  questions.forEach(q => console.log(`- ${q.title} (Topic: ${q.topic})`));
  
  await ProgrammingQuestion.deleteMany({});
  console.log(`Deleted ${questions.length} questions.`);
  process.exit(0);
}
run();
