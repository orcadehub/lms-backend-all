const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
require('dotenv').config();

async function updateFrontendQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const result = await FrontendQuestion.updateMany(
      {},
      { $set: { allowedFiles: ['html', 'css', 'js'] } }
    );

    console.log(`Updated ${result.modifiedCount} frontend questions with allowedFiles: ['html', 'css', 'js']`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error updating frontend questions:', error);
    process.exit(1);
  }
}

updateFrontendQuestions();
