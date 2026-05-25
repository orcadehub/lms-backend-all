const mongoose = require('mongoose');
require('dotenv').config();
const Assessment = require('./models/Assessment');

const deleteExtraAssessments = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to DB');

    const result = await Assessment.deleteMany({ title: { $in: ['ORCA_D0002', 'ORCA_D0003'] } });
    console.log(`Deleted ${result.deletedCount} extra assessments.`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

deleteExtraAssessments();
