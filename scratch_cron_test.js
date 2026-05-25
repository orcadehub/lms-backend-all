const mongoose = require('mongoose');
require('dotenv').config();
const { createContestForTenant, generateUniqueTitle } = require('./services/cronJobs');
const Tenant = require('./models/Tenant');
const Assessment = require('./models/Assessment');

const runTest = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to DB');

    console.log('Testing title generation...');
    const dailyTitle = await generateUniqueTitle('ORCA_D');
    const weeklyTitle = await generateUniqueTitle('ORCA_W');
    console.log(`Generated Daily: ${dailyTitle}`);
    console.log(`Generated Weekly: ${weeklyTitle}`);

    console.log('Fetching active tenants...');
    const activeTenants = await Tenant.find({ isActive: true });
    
    if (activeTenants.length > 0) {
      console.log(`Creating daily contest for first tenant: ${activeTenants[0].name}`);
      await createContestForTenant(activeTenants[0], 'daily', dailyTitle, '09:00');
      
      const createdAssessment = await Assessment.findOne({ title: dailyTitle });
      if (createdAssessment) {
        console.log('Assessment created successfully!');
        console.log('Title:', createdAssessment.title);
        console.log('Type:', createdAssessment.type);
        console.log('ContestType:', createdAssessment.contestType);
        console.log('StartTime:', createdAssessment.startTime);
        
        // Clean up test
        await Assessment.deleteOne({ _id: createdAssessment._id });
        console.log('Cleaned up test assessment.');
      } else {
        console.error('Assessment creation failed.');
      }
    } else {
      console.log('No active tenants found for testing.');
    }

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from DB');
  }
};

runTest();
