const mongoose = require('mongoose');
require('dotenv').config();

const Student = require('./models/Student');
const Course = require('./models/Course');
const Message = require('./models/Message');

async function run() {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';
  await mongoose.connect(mongoURI);

  try {
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const activeStudents = await Student.find({
      lastActiveAt: { $gte: fifteenMinutesAgo }
    }).sort({ lastActiveAt: -1 });

    console.log(`Found ${activeStudents.length} students active in the last 15 minutes:`);
    for (const student of activeStudents) {
      console.log(`\nStudent: ${student.name} (${student.email})`);
      console.log(`  ID: ${student._id.toString()}`);
      console.log(`  Last Active: ${student.lastActiveAt}`);
      
      // Check MERN course enrollment
      const courses = await Course.find({
        'enrollments.student': student._id
      });
      console.log(`  Enrolled in:`, courses.map(c => c.title));

      // Check messages
      const msgs = await Message.find({ recipient: student._id });
      console.log(`  Messages in DB: ${msgs.length}`);
      const mernMsg = msgs.find(m => m.title.includes('MERN'));
      console.log(`  Has MERN Congratulatory Msg:`, !!mernMsg);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
}

run();
