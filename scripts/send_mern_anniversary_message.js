const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('../models/Course');
const Batch = require('../models/Batch');
const Student = require('../models/Student');
const Message = require('../models/Message');
const Admin = require('../models/Admin');

async function run() {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';
  console.log('Connecting to MongoDB...');
  await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 10000, socketTimeoutMS: 45000 });
  console.log('Connected.');

  try {
    // Find MERN courses
    const mernCourses = await Course.find({
      $or: [{ title: /mern/i }, { courseId: /mern/i }, { description: /mern/i }]
    });
    if (!mernCourses.length) {
      console.log('No MERN courses found.');
      return;
    }
    console.log(`Found ${mernCourses.length} MERN courses.`);

    // Identify anniversary batches via Batch collection
    const tenantIds = mernCourses.map(c => c.tenant);
    const anniversaryBatches = await Batch.find({
      name: /anniversary/i,
      tenant: { $in: tenantIds }
    }).select('students tenant');
    if (!anniversaryBatches.length) {
      console.log('No anniversary batch found.');
      return;
    }
    console.log(`Found ${anniversaryBatches.length} anniversary batch(es).`);

    // Gather unique student IDs from Batch.students
    const studentIds = new Set();
    anniversaryBatches.forEach(b => {
      b.students.forEach(sid => studentIds.add(sid.toString()));
    });
    console.log(`Unique students to notify: ${studentIds.size}`);

    // Find a sender admin (or any system user)
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin({
        name: 'Orca System',
        email: 'system@orcadehub.com',
        password: 'default_admin_password_123',
        role: 'admin',
        permissions: []
      });
      await admin.save();
    }

    const title = '🎉 Congratulations on Joining the MERN Anniversary Batch!';
    const content = `
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

    let sentCount = 0;
    for (const sid of studentIds) {
      // Fetch student to obtain tenant (fallback to admin tenant if defined)
      const student = await Student.findById(sid).select('tenant');
      const tenantId = student?.tenant || admin.tenant;
      if (!tenantId) {
        console.warn(`Student ${sid} missing tenant, skipping.`);
        continue;
      }
      const message = new Message({
        sender: admin._id,
        recipient: sid,
        tenant: tenantId,
        title,
        content,
        isRead: false
      });
      await message.save();
      sentCount++;
    }
    console.log(`Inserted ${sentCount} internal message(s).`);
  } catch (err) {
    console.error('Error during script execution:', err);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

run();
