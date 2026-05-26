const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const PracticeSubmission = require('./models/PracticeSubmission');
const Student = require('./models/Student');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);

  const practiceCount = await PracticeSubmission.countDocuments({ isCompleted: true });
  console.log("Completed Practice Submissions:", practiceCount);
  
  const sample = await PracticeSubmission.findOne({ isCompleted: true });
  if (sample) {
    const student = await Student.findById(sample.userId);
    console.log("Sample student found?", !!student);
  }

  process.exit(0);
}
run();
