require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Student = require('../models/Student');
(async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';
  await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 10000, socketTimeoutMS: 45000 });
  const mernCourses = await Course.find({ $or: [{ title: /mern/i }, { courseId: /mern/i }, { description: /mern/i }] });
  let total = 0;
  for (const c of mernCourses) {
    const anniversaryBatches = (c.batches || []).filter(b => /anniversary/i.test(b.name));
    for (const b of anniversaryBatches) {
      const enrollments = (c.enrollments || []).filter(e => e.batch === b.name);
      total += enrollments.length;
    }
  }
  console.log('Total students in MERN anniversary batches:', total);
  await mongoose.disconnect();
})();
