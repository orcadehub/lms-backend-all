const mongoose = require('mongoose');
require('dotenv').config();
const Assessment = require('./models/Assessment');

const checkContests = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to DB');

    // Any assessment that is a contest
    const contests = await Assessment.find({ contestType: { $in: ['daily', 'weekly'] } });
    console.log(`\nFound ${contests.length} contests in total:`);
    contests.forEach(c => console.log(`- [${c._id}] ${c.title} (Type: ${c.contestType}, Tenant: ${c.tenantId || 'Global'})`));

  } catch (error) {
    console.error('Error checking contests:', error);
  } finally {
    await mongoose.disconnect();
  }
};

checkContests();
