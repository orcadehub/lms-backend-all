const mongoose = require('mongoose');
const Student = require('./models/Student');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const student = await Student.findOne();
  if (student) {
    console.log("Student found:", student._id, "Tenant:", student.tenant);
    try {
      student.codingProfiles = { leetcode: { username: "" }, hackerrank: { username: "" } };
      student.markModified('codingProfiles');
      await student.save();
      console.log("Save successful!");
    } catch (e) {
      console.log("Save error:", e.message);
    }
  } else {
    console.log("No student found");
  }
  process.exit(0);
}
run();
