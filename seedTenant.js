const mongoose = require('mongoose');
const Tenant = require('./src/models/Tenant');
const Instructor = require('./src/models/Instructor');
require('dotenv').config();

const createTestTenant = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create test tenant
    const tenant = new Tenant({
      name: 'Test Customer',
      domain: 'test-customer.com',
      apiEndpoint: 'https://test-customer.com/api',
      apiKey: require('crypto').randomBytes(32).toString('hex'),
      settings: {
        allowedOrigins: ['test-customer.com'],
        features: ['quizzes', 'assessments']
      }
    });

    await tenant.save();
    console.log('Test tenant created:', tenant.name);

    // Assign tenant to instructor
    const instructor = await Instructor.findOne({ email: 'instructor@lms.com' });
    if (instructor) {
      instructor.assignedTenants = [tenant._id];
      await instructor.save();
      console.log('Tenant assigned to instructor');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
};

createTestTenant();