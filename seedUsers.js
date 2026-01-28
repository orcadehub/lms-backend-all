const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');
const Instructor = require('./src/models/Instructor');
require('dotenv').config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create Admin
    const adminExists = await Admin.findOne({ email: 'orcadehub2@gmail.com' });
    if (!adminExists) {
      const admin = new Admin({
        name: 'OrcadeHub Admin',
        email: 'orcadehub2@gmail.com',
        password: 'AzzuDeepthi@143',
        permissions: ['user_management', 'course_management', 'system_settings', 'reports']
      });
      await admin.save();
      console.log('✅ Admin user created successfully');
      console.log('📧 Email: orcadehub2@gmail.com');
      console.log('🔑 Password: AzzuDeepthi@143');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create Instructor
    const instructorExists = await Instructor.findOne({ email: 'ajithkumargurram@gmail.com' });
    if (!instructorExists) {
      const instructor = new Instructor({
        name: 'Ajith Kumar Gurram',
        email: 'ajithkumargurram@gmail.com',
        password: 'AzzuDeepthi@143',
        permissions: ['create_quizzes', 'create_assessments', 'manage_students', 'view_reports']
      });
      await instructor.save();
      console.log('✅ Instructor user created successfully');
      console.log('📧 Email: ajithkumargurram@gmail.com');
      console.log('🔑 Password: AzzuDeepthi@143');
    } else {
      console.log('ℹ️  Instructor user already exists');
    }

    console.log('\n🎉 Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();