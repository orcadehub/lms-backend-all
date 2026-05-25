const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('./models/Course');
const Student = require('./models/Student');

async function run() {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';
  await mongoose.connect(mongoURI);

  try {
    const courses = await Course.find();
    console.log(`Total Courses in DB: ${courses.length}`);
    for (const c of courses) {
      console.log(`- Title: "${c.title}"`);
      console.log(`  Course ID: ${c.courseId}`);
      console.log(`  Is Free: ${c.isFree}`);
      console.log(`  Enrollments Count: ${c.enrollments.length}`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
}

run();
