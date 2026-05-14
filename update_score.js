require('dotenv').config();
const mongoose = require('mongoose');
const AssessmentAttempt = require('./models/AssessmentAttempt');

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const result = await AssessmentAttempt.updateMany(
      { assessment: new mongoose.Types.ObjectId("69b962f2639b71d9b1041e40") },
      [{
        $set: {
          overallPercentage: {
            $divide: [
              {
                $add: [
                  { $ifNull: ["$quizPercentage", 0] },
                  { $ifNull: ["$mongodbPercentage", 0] }
                ]
              },
              2
            ]
          }
        }
      }]
    );

    console.log('Update result:', result);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

run();
