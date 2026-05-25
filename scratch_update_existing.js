const mongoose = require('mongoose');
require('dotenv').config();
const Assessment = require('./models/Assessment');

const updateExistingAssessments = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to DB');

    const result = await Assessment.updateMany(
      { title: { $regex: /^ORCA_/ } },
      {
        $set: {
          status: 'active',
          earlyStartBuffer: 30,
          maxTabSwitches: 3,
          allowedLanguages: ['c', 'cpp', 'java', 'python']
        }
      }
    );

    console.log(`Successfully updated ${result.modifiedCount} existing ORCA assessments.`);
  } catch (error) {
    console.error('Error updating existing assessments:', error);
  } finally {
    await mongoose.disconnect();
  }
};

updateExistingAssessments();
