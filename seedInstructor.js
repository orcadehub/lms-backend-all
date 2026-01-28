const mongoose = require('mongoose');
const Instructor = require('./src/models/Instructor');
require('dotenv').config();

const createInstructor = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const instructorExists = await Instructor.findOne({ email: 'ajithkumargurram@gmail.com' });
    if (instructorExists) {
      console.log('Instructor user already exists');
      return;
    }

    const instructor = new Instructor({
      name: 'Ajith Kumar Gurram',
      email: 'ajithkumargurram@gmail.com',
      password: 'AzzuDeepthi@143',
      permissions: ['create_quizzes', 'create_assessments', 'manage_students', 'view_reports']
    });

    await instructor.save();
    console.log('Instructor user created successfully');
    console.log('Email: ajithkumargurram@gmail.com');
    console.log('Password: AzzuDeepthi@143');
    
  } catch (error) {
    console.error('Error creating instructor:', error);
  } finally {
    mongoose.connection.close();
  }
};

createInstructor();