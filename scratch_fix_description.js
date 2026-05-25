const mongoose = require('mongoose');
require('dotenv').config();
const Assessment = require('./models/Assessment');

const fixDescriptionDate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to DB');

    const globalContest = await Assessment.findOne({ title: 'ORCA_D0001' });
    if (globalContest && globalContest.startTime) {
      const formattedDate = new Date(globalContest.startTime).toLocaleDateString('en-GB');
      globalContest.description = `Automated daily contest for ${formattedDate}`;
      await globalContest.save();
      console.log(`Updated description to: ${globalContest.description}`);
    }

  } catch (error) {
    console.error('Error fixing description date:', error);
  } finally {
    await mongoose.disconnect();
  }
};

fixDescriptionDate();
