require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');

(async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';
  await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 10000, socketTimeoutMS: 45000 });
  console.log('Connected to MongoDB – cleaning old enrollment data');

  // Remove embedded enrollments array from all courses
  const resultEnroll = await Course.updateMany({}, { $set: { enrollments: [] } });
  console.log(`✅ Cleared enrollments array in ${resultEnroll.nModified} course(s)`);

  // Optionally, also clear the old batches array if no longer needed
  const resultBatches = await Course.updateMany({}, { $set: { batches: [] } });
  console.log(`✅ Cleared batches array in ${resultBatches.nModified} course(s)`);

  await mongoose.disconnect();
  console.log('Connection closed');
})();
