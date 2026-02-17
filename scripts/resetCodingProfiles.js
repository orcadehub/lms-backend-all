const mongoose = require('mongoose');
const Student = require('../models/Student');
require('dotenv').config();

async function resetCodingProfiles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const result = await Student.updateMany(
      {},
      {
        $set: {
          'codingProfiles.leetcode.connected': false,
          'codingProfiles.leetcode.totalSolved': 0,
          'codingProfiles.leetcode.easySolved': 0,
          'codingProfiles.leetcode.mediumSolved': 0,
          'codingProfiles.leetcode.hardSolved': 0,
          'codingProfiles.leetcode.ranking': 0,
          'codingProfiles.leetcode.acceptanceRate': 0,
          'codingProfiles.leetcode.reputation': 0,
          'codingProfiles.hackerrank.connected': false,
          'codingProfiles.hackerrank.totalSolved': 0,
          'codingProfiles.hackerrank.badges': 0,
          'codingProfiles.hackerrank.score': 0,
          'codingProfiles.codeforces.connected': false,
          'codingProfiles.codeforces.totalSolved': 0,
          'codingProfiles.codeforces.rating': 0,
          'codingProfiles.codeforces.maxRating': 0
        },
        $unset: {
          'codingProfiles.leetcode.username': '',
          'codingProfiles.leetcode.lastSynced': '',
          'codingProfiles.hackerrank.username': '',
          'codingProfiles.hackerrank.rank': '',
          'codingProfiles.hackerrank.lastSynced': '',
          'codingProfiles.codeforces.username': '',
          'codingProfiles.codeforces.rank': '',
          'codingProfiles.codeforces.lastSynced': ''
        }
      }
    );

    console.log(`Reset coding profiles for ${result.modifiedCount} students`);
    
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error resetting coding profiles:', error);
    process.exit(1);
  }
}

resetCodingProfiles();
