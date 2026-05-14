const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('./models/Student');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const hashedPassword = await bcrypt.hash('password', 10);
  
  // Create orcode test user
  await Student.findOneAndUpdate(
    { email: 'test@test.com' },
    { 
      name: 'Test Student', 
      email: 'test@test.com', 
      password: hashedPassword,
      phone: '1234567890',
      role: 'student',
      tenantId: '65f8a0b5c1234567890abcde' // Use a generic or find Orcode's
    },
    { upsert: true, new: true }
  );
  
  console.log('Test user created successfully!');
  mongoose.disconnect();
});
