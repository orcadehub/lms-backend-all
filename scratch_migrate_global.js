const mongoose = require('mongoose');
require('dotenv').config();
const Assessment = require('./models/Assessment');

const migrateGlobalContests = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to DB');

    const contests = await Assessment.find({ title: { $regex: /^ORCA_/ } });
    
    if (contests.length > 0) {
      // Keep the first one, delete the rest
      const globalContest = contests[0];
      const duplicates = contests.slice(1);

      if (duplicates.length > 0) {
        const duplicateIds = duplicates.map(d => d._id);
        const result = await Assessment.deleteMany({ _id: { $in: duplicateIds } });
        console.log(`Deleted ${result.deletedCount} duplicate ORCA assessments.`);
      }

      // Unset tenantId for the global contest
      await Assessment.updateOne(
        { _id: globalContest._id },
        { $unset: { tenantId: 1, batches: 1 } }
      );
      console.log('Successfully updated the remaining contest to be completely global (no tenantId).');
    } else {
      console.log('No ORCA assessments found.');
    }

  } catch (error) {
    console.error('Error migrating global contests:', error);
  } finally {
    await mongoose.disconnect();
  }
};

migrateGlobalContests();
