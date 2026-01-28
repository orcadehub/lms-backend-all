const mongoose = require('mongoose');
const Instructor = require('./src/models/Instructor');
require('dotenv').config();

const createInstructor = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const instructorExists = await Instructor.findOne({ email: 'instructor@lms.com' });
    if (instructorExists) {
      console.log('Instructor user already exists');
      return;
    }

    const instructor = new Instructor({
      name: 'Test Instructor',
      email: 'instructor@lms.com',
      password: 'instructor123',
      permissions: ['create_quizzes', 'create_assessments', 'manage_students', 'view_reports']
    });

    await instructor.save();
    console.log('Instructor user created successfully');
    console.log('Email: instructor@lms.com');
    console.log('Password: instructor123');
    
  } catch (error) {
    console.error('Error creating instructor:', error);
  } finally {
    mongoose.connection.close();
  }
};

createInstructor();