const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
require('dotenv').config();

async function removeDefaultCode() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const result = await FrontendQuestion.updateMany(
      {},
      { 
        $set: { 
          'defaultFiles.html': '',
          'defaultFiles.css': '',
          'defaultFiles.js': ''
        } 
      }
    );

    console.log(`Updated ${result.modifiedCount} frontend questions with empty default files`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error updating frontend questions:', error);
    process.exit(1);
  }
}

removeDefaultCode();
