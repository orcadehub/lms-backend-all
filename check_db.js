const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const PracticeSubmission = require('./models/PracticeSubmission');
const GamifiedAttempt = require('./models/GamifiedAttempt');
const MCQAttempt = require('./models/MCQAttempt');
const LabSubmission = require('./models/LabSubmission');
const Student = require('./models/Student');
const AssessmentAttempt = require('./models/AssessmentAttempt');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("DB connected");

  console.log("Students:", await Student.countDocuments());
  console.log("Assessment Attempts:", await AssessmentAttempt.countDocuments());
  console.log("Practice Submissions:", await PracticeSubmission.countDocuments());
  console.log("Gamified Attempts:", await GamifiedAttempt.countDocuments());
  console.log("MCQ Attempts:", await MCQAttempt.countDocuments());
  console.log("Lab Submissions:", await LabSubmission.countDocuments());
  
  process.exit(0);
}
run();
