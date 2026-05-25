const mongoose = require('mongoose');
const Course = require('../models/Course');
const Batch = require('../models/Batch');
require('dotenv').config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to DB.');

    // 1. Delete all courses
    await Course.deleteMany({});
    console.log('Deleted all existing courses.');

    // 2. Find the MERN Anniversary Batch
    const mernBatch = await Batch.findOne({ name: 'MERN-ANNIVERSARY-BATCH' });
    
    if (!mernBatch) {
      console.error('Could not find MERN-ANNIVERSARY-BATCH. Please make sure the batch exists.');
      process.exit(1);
    }

    // Also get a tenant id from the batch to associate with the course
    const tenantId = mernBatch.tenant;

    // 3. Create the single MERN course
    const mernCourse = new Course({
      courseId: 'mern',
      title: 'MERN Stack Anniversary Edition',
      subtitle: 'Master Full Stack Web Development',
      description: 'The ultimate MERN stack bootcamp covering MongoDB, Express, React, and Node.js.',
      longDescription: 'Join our special anniversary edition MERN stack course. Learn to build modern, scalable web applications from scratch.',
      category: 'Web Development',
      level: 'Beginner',
      duration: { weeks: 8, hoursPerDay: 2, daysPerWeek: 5 },
      price: 0,
      originalPrice: 15000,
      isFree: true,
      currency: 'INR',
      icon: 'IconCode',
      color: '#6366f1',
      bgColor: '#eef2ff',
      tags: ['MERN', 'React', 'Node.js', 'MongoDB', 'Express', 'Web Development'],
      batches: [mernBatch._id], // Connect the batch
      totalEnrollments: mernBatch.students.length,
      tenant: tenantId,
      isPublished: true,
      isActive: true,
      learningOutcomes: [
        'Build full-stack web applications',
        'Create RESTful APIs with Node and Express',
        'Design interactive UIs with React',
        'Manage databases with MongoDB'
      ],
      prerequisites: ['Basic HTML, CSS, and JavaScript knowledge'],
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js']
    });

    await mernCourse.save();
    console.log(`Successfully created course: ${mernCourse.title} and linked it to batch: ${mernBatch.name}`);
    console.log(`Course total enrollments set to: ${mernCourse.totalEnrollments}`);

  } catch (error) {
    console.error('Error during setup:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from DB.');
  }
}

run();
