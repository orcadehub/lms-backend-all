const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
require('dotenv').config();

async function removeJSQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');
    
    const result = await FrontendQuestion.deleteMany({ 
      tags: { $in: ['JavaScript', 'JS'] } 
    });
    
    console.log(`Deleted ${result.deletedCount} JavaScript questions`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

removeJSQuestions();
