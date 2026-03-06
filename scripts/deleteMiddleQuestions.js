require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');

async function deleteMiddleQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all questions sorted by creation date
    const allQuestions = await FrontendQuestion.find().sort({ createdAt: 1 });
    console.log(`Total questions: ${allQuestions.length}`);

    if (allQuestions.length <= 50) {
      console.log('Not enough questions to delete. Need more than 50 questions.');
      process.exit(0);
    }

    // Keep first 20 and last 30
    const keepFirst = allQuestions.slice(0, 20);
    const keepLast = allQuestions.slice(-30);
    const toDelete = allQuestions.slice(20, -30);

    console.log(`Keeping first 20 questions`);
    console.log(`Keeping last 30 questions`);
    console.log(`Deleting ${toDelete.length} middle questions`);

    // Delete middle questions
    const deleteIds = toDelete.map(q => q._id);
    const result = await FrontendQuestion.deleteMany({ _id: { $in: deleteIds } });

    console.log(`Deleted ${result.deletedCount} questions successfully`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

deleteMiddleQuestions();
