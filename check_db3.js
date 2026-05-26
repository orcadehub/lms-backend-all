const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
const Student = require('./models/Student');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  let cpCount = 0;
  const students = await Student.find({}).select('codingProfiles');
  students.forEach(s => {
    if (s.codingProfiles) {
      const cp = s.codingProfiles;
      if ((cp.leetcode?.connected) || (cp.hackerrank?.connected) || (cp.codeforces?.connected) || (cp.codechef?.connected)) {
        cpCount++;
      }
    }
  });
  console.log("Students with connected coding profiles:", cpCount);
  process.exit(0);
}
run();
