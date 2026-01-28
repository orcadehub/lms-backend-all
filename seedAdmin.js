const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminExists = await Admin.findOne({ email: 'orcadehub2@gmail.com' });
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    const admin = new Admin({
      name: 'OrcadeHub Admin',
      email: 'orcadehub2@gmail.com',
      password: 'AzzuDeepthi@143',
      permissions: ['user_management', 'course_management', 'system_settings', 'reports']
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Email: orcadehub2@gmail.com');
    console.log('Password: AzzuDeepthi@143');
    
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();