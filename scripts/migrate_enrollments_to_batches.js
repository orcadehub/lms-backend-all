// file: /Users/itity/Documents/orcadehub/LMS_MUI/be/scripts/migrate_enrollments_to_batches.js
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Batch = require('../models/Batch');
const Enrollment = require('../models/Enrollment');

(async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';
  await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 10000, socketTimeoutMS: 45000 });
  console.log('Connected to MongoDB – starting migration');

  const courses = await Course.find({});
  console.log(`Found ${courses.length} course(s) to process`);

  let totalBatches = 0;
  let totalEnrollments = 0;

  for (const course of courses) {
    // ----- 1. Create Batch documents from course.batches -----
    const batchIdMap = {}; // name -> Batch._id
    if (Array.isArray(course.batches) && course.batches.length) {
      for (const b of course.batches) {
        const newBatch = await Batch.create({
          name: b.name,
          startDate: b.startDate,
          endDate: b.endDate,
          maxSeats: b.maxSeats,
          enrolledCount: 0,
          timing: b.timing,
          classDays: b.classDays,
          status: b.status,
          isActive: b.isActive,
          course: course._id,
          tenant: course.tenant
        });
        batchIdMap[b.name] = newBatch._id;
        totalBatches++;
      }
    }

    // ----- 2. Migrate enrollments into Enrollment collection -----
    if (Array.isArray(course.enrollments) && course.enrollments.length) {
      for (const enr of course.enrollments) {
        const batchId = batchIdMap[enr.batch];
        if (!batchId) {
          console.warn(`⚠️  Enrollment for student ${enr.student} references unknown batch "${enr.batch}" – skipping`);
          continue;
        }
        await Enrollment.create({
          student: enr.student,
          batch: batchId,
          status: enr.status,
          progress: enr.progress,
          enrolledAt: enr.enrolledAt,
          certificateRequested: enr.certificateRequested,
          certificatePaid: enr.certificatePaid,
          surname: enr.surname,
          firstName: enr.firstName,
          lastName: enr.lastName,
          phoneNumber: enr.phoneNumber,
          collegeName: enr.collegeName,
          rollNumber: enr.rollNumber,
          tenant: course.tenant
        });
        totalEnrollments++;
        // Increment batch's enrolledCount
        await Batch.findByIdAndUpdate(batchId, { $inc: { enrolledCount: 1 } });
      }
    }

    // OPTIONAL: clear old enrollments array – uncomment when migration verified
    // await Course.findByIdAndUpdate(course._id, { $set: { enrollments: [] } });
  }

  console.log(`✅ Migration complete – created ${totalBatches} batch(es) and ${totalEnrollments} enrollment record(s)`);
  await mongoose.disconnect();
  console.log('Connection closed');
})();
