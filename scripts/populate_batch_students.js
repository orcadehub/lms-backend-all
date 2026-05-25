// file: /Users/itity/Documents/orcadehub/LMS_MUI/be/scripts/populate_batch_students.js
require('dotenv').config();
const mongoose = require('mongoose');
const Batch = require('../models/Batch');
const Enrollment = require('../models/Enrollment');

(async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';
  await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 10000, socketTimeoutMS: 45000 });
  console.log('Connected to MongoDB – populating Batch.students');

  // Get all enrollments
  const enrollments = await Enrollment.find({}).select('student batch');
  console.log(`Found ${enrollments.length} enrollment records`);

  // Group student IDs by batch
  const batchMap = {};
  enrollments.forEach(e => {
    const batchId = e.batch?.toString();
    if (!batchId) return;
    if (!batchMap[batchId]) batchMap[batchId] = new Set();
    batchMap[batchId].add(e.student.toString());
  });

  // Update each batch with $addToSet for each student
  let updatedCount = 0;
  for (const [batchId, studentSet] of Object.entries(batchMap)) {
    const studentsArray = Array.from(studentSet);
    await Batch.findByIdAndUpdate(batchId, { $addToSet: { students: { $each: studentsArray } } });
    updatedCount++;
  }

  console.log(`✅ Updated ${updatedCount} batch(es) with student references`);
  await mongoose.disconnect();
  console.log('Connection closed');
})();
