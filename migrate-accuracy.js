const mongoose = require('mongoose');
require('dotenv').config();

const AssessmentAttempt = require('./models/AssessmentAttempt');

async function migrateAccuracyFields() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update all existing attempts to add accuracy fields
    const result = await AssessmentAttempt.updateMany(
      { accuracy: { $exists: false } },
      { 
        $set: { 
          accuracy: 0,
          problemAccuracies: {}
        } 
      }
    );

    console.log(`Updated ${result.modifiedCount} assessment attempts with accuracy fields`);
    
    await mongoose.disconnect();
    console.log('Migration completed');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateAccuracyFields();
