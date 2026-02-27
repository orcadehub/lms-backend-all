const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
require('dotenv').config();

async function deleteAllQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');
    
    const result = await FrontendQuestion.deleteMany({});
    
    console.log(`Deleted ${result.deletedCount} frontend questions`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

deleteAllQuestions();
