const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminExists = await Admin.findOne({ email: 'admin@lms.com' });
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    const admin = new Admin({
      name: 'Admin User',
      email: 'admin@lms.com',
      password: 'admin123',
      permissions: ['user_management', 'course_management', 'system_settings', 'reports']
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@lms.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();