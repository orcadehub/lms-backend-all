const mongoose = require('mongoose');
require('dotenv').config();

const deleteCollections = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const collections = [
      'gamifiedquestions',
      'practicequestions',
      'pysparkquestions',
      'pysparkattempts',
      'questions',
      'quizattempts',
      'quizquestions',
      'quizzes',
      'userprogresses'
    ];

    for (const collection of collections) {
      await mongoose.connection.db.dropCollection(collection).catch(() => {
        console.log(`Collection ${collection} does not exist`);
      });
      console.log(`Dropped collection: ${collection}`);
    }

    console.log('All collections deleted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

deleteCollections();
