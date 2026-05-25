const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('../models/Course');
const Student = require('../models/Student');
const { sendCustomEmail } = require('../utils/emailService');

async function run() {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';
  console.log('Connecting to MongoDB...');
  await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 10000, socketTimeoutMS: 45000 });
  console.log('Connected.');

  try {
    // 1️⃣ Find MERN stack courses
    const mernCourses = await Course.find({
      $or: [{ title: /mern/i }, { courseId: /mern/i }, { description: /mern/i }]
    });
    if (!mernCourses.length) {
      console.log('No MERN courses found.');
      return;
    }
    console.log(`Found ${mernCourses.length} MERN courses.`);

    // 2️⃣ Identify the anniversary batch (name containing "anniversary", case‑insensitive)
    const anniversaryBatches = [];
    for (const c of mernCourses) {
      if (c.batches && c.batches.length) {
        c.batches.forEach(b => {
          if (/anniversary/i.test(b.name)) {
            anniversaryBatches.push({ courseId: c._id, batchName: b.name, tenant: c.tenant });
          }
        });
      }
    }
    if (!anniversaryBatches.length) {
      console.log('No anniversary batch found in MERN courses.');
      return;
    }
    console.log(`Found ${anniversaryBatches.length} anniversary batch(es).`);

    // 3️⃣ Gather unique student IDs from those batches' enrollments
    const studentIds = new Set();
    for (const { courseId, batchName, tenant } of anniversaryBatches) {
      const course = await Course.findById(courseId).select('enrollments tenant');
      const enrolls = course.enrollments.filter(e => e.batch && /anniversary/i.test(e.batch));
      enrolls.forEach(e => studentIds.add(e.student.toString()));
    }
    console.log(`Unique students to notify: ${studentIds.size}`);

    // 4️⃣ Send email to each student
    const emailSubject = '🎉 Congratulations on Joining the MERN Anniversary Batch!';
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e293b;">MERN Anniversary Batch – Welcome!</h2>
        <p>Dear Student,</p>
        <p>We are thrilled to have you in our MERN anniversary batch. Your classes start on <strong>1st June</strong> at <strong>7:00 PM – 8:00 PM IST</strong> daily (Mon‑Fri) with weekend assessments and projects.</p>
        <p>Attendance is mandatory to earn your certificate. By completing the program you’ll receive five certifications:</p>
        <ul>
          <li>Frontend Developer</li>
          <li>Backend Developer</li>
          <li>Database Operations</li>
          <li>Full‑Stack Web Developer</li>
          <li>CI/CD using GitHub & AWS/Render</li>
        </ul>
        <p>Mark your calendar and get ready to build amazing full‑stack applications!</p>
        <p>Best regards,<br/>Orca Learning Team</p>
      </div>`;

    for (const sid of studentIds) {
      const student = await Student.findById(sid).select('email name');
      if (!student?.email) continue;
      await sendCustomEmail(student.email, emailSubject, emailHtml);
    }
    console.log('All announcement emails sent.');
  } catch (err) {
    console.error('Error during script execution:', err);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

run();
