const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('./models/Student');
const Tenant = require('./models/Tenant');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  // First, find or create the Orcode tenant
  let tenant = await Tenant.findOne({ domain: 'orcode.in' });
  if (!tenant) {
    console.log('Orcode tenant not found, creating one...');
    tenant = new Tenant({
      name: 'Orcode',
      companyName: 'Orcode',
      domain: 'orcode.in',
      allowedDomains: ['orcode.in', 'localhost'],
      themeColor: '#7c3aed',
      apiKey: 'test-api-key-orcode'
    });
    await tenant.save();
    console.log('Tenant created with ID:', tenant._id);
  } else {
    console.log('Found Orcode tenant with ID:', tenant._id);
  }

  // Next, update or create the test user
  const hashedPassword = await bcrypt.hash('password', 10);
  const student = await Student.findOneAndUpdate(
    { email: 'test@test.com' },
    { 
      name: 'Test Student', 
      email: 'test@test.com', 
      password: hashedPassword,
      phone: '1234567890',
      role: 'student',
      tenant: tenant._id,
      institution: 'Orcode Academy',
      degree: 'B.Tech',
      branch: 'Computer Science',
      graduationYear: '2026'
    },
    { upsert: true, new: true }
  );

  console.log('Test user created/updated successfully with tenant ID!', student.tenant);
  mongoose.disconnect();
}).catch(console.error);
