const mongoose = require('mongoose');
const Student = require('./models/Student');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const student = await Student.findOne({ email: 'test@test.com' });
  console.log('Student:', student ? 'Found' : 'Not found');
  if (student) {
    console.log('Tenant:', student.tenantId);
  }
  mongoose.disconnect();
});
