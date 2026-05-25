const mongoose = require('mongoose');
require('dotenv').config();

const Student = require('./models/Student');
const Course = require('./models/Course');
const Message = require('./models/Message');

async function run() {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';
  await mongoose.connect(mongoURI);

  try {
    // 1. Find the most recently active student
    const activeStudent = await Student.findOne().sort({ lastActiveAt: -1 });
    if (!activeStudent) {
      console.log('No students found in the database.');
      return;
    }

    console.log('Active Student:');
    console.log('  ID:', activeStudent._id.toString());
    console.log('  Name:', activeStudent.name);
    console.log('  Email:', activeStudent.email);
    console.log('  Tenant:', activeStudent.tenant ? activeStudent.tenant.toString() : 'None');
    console.log('  Last Active:', activeStudent.lastActiveAt);

    // 2. Check their enrolled courses
    console.log('\nEnrolled Courses on Student Model:');
    if (activeStudent.enrolledCourses && activeStudent.enrolledCourses.length > 0) {
      for (const ec of activeStudent.enrolledCourses) {
        const course = await Course.findById(ec.course);
        console.log(`  - ${course ? course.title : 'Unknown Course'} (${ec.course.toString()})`);
      }
    } else {
      console.log('  None');
    }

    // 3. Find if they are in any Course's enrollments array
    console.log('\nCourse Enrollments Array check:');
    const courses = await Course.find();
    let foundInCourses = [];
    for (const c of courses) {
      const isEnrolled = c.enrollments && c.enrollments.some(e => e.student.toString() === activeStudent._id.toString());
      if (isEnrolled) {
        foundInCourses.push(c.title);
        console.log(`  - Enrolled in "${c.title}" (${c.courseId})`);
      }
    }
    if (foundInCourses.length === 0) {
      console.log('  Not found in any Course enrollments list.');
    }

    // 4. Check the messages sent to this student
    console.log('\nMessages for this Student:');
    const messages = await Message.find({ recipient: activeStudent._id }).sort({ createdAt: -1 });
    console.log(`  Total Messages: ${messages.length}`);
    for (const msg of messages) {
      console.log(`  - Title: "${msg.title}"`);
      console.log(`    Recipient: ${msg.recipient.toString()}`);
      console.log(`    Tenant: ${msg.tenant.toString()}`);
      console.log(`    isRead: ${msg.isRead}`);
      console.log(`    Date: ${msg.createdAt}`);
    }

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
}

run();
