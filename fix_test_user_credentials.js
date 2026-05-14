const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('./models/Student');
require('dotenv').config();

async function fixTestUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const hashedPassword = await bcrypt.hash('test@123', 10);
    const tenantId = '697a3d4173c9d3c273aef570'; // Orcode Tenant ID

    const student = await Student.findOneAndUpdate(
      { email: 'test@test.com' },
      { 
        name: 'Test Student', 
        email: 'test@test.com', 
        password: hashedPassword,
        phone: '1234567890',
        role: 'student',
        tenant: tenantId,
        isActive: true
      },
      { upsert: true, new: true }
    );

    console.log('Test user updated successfully with password: test@123 and tenant: Orcode');
    console.log('Student ID:', student._id);
    
    process.exit(0);
  } catch (error) {
    console.error('Error fixing test user:', error);
    process.exit(1);
  }
}

fixTestUser();
