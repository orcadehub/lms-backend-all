const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const Student = require('./src/models/Student');
const Tenant = require('./src/models/Tenant');
const Batch = require('./src/models/Batch');

const createTestStudent = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');

    // Find the tenant
    const tenant = await Tenant.findById('69610731aa647e7426feba75');
    if (!tenant) {
      console.log('Tenant not found');
      return;
    }
    console.log('Found tenant:', tenant.name);

    // Create or find a batch for this tenant
    let batch = await Batch.findOne({ tenant: tenant._id });
    if (!batch) {
      batch = new Batch({
        name: 'Default Batch',
        description: 'Default batch for testing',
        tenant: tenant._id,
        students: []
      });
      await batch.save();
      console.log('Created batch:', batch.name);
    }

    // Check if test student already exists
    const existingStudent = await Student.findOne({ 
      email: 'student@test.com',
      tenant: tenant._id 
    });

    if (existingStudent) {
      console.log('Test student already exists:', existingStudent.email);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create test student
    const student = new Student({
      name: 'Test Student',
      email: 'student@test.com',
      password: hashedPassword,
      tenant: tenant._id,
      batch: batch._id,
      isActive: true
    });

    await student.save();
    console.log('Created test student:', student.email);

    // Add student to batch
    batch.students.push(student._id);
    await batch.save();
    console.log('Added student to batch');

    console.log('\nTest student created successfully!');
    console.log('Email: student@test.com');
    console.log('Password: password123');

  } catch (error) {
    console.error('Error creating test student:', error);
  } finally {
    await mongoose.disconnect();
  }
};

createTestStudent();