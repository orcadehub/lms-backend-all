const mongoose = require('mongoose');
const SubTopic = require('./models/SubTopic');
const Topic = require('./models/Topic');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI;

async function createMazeSubtopic() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const topic = await Topic.findOne({ title: 'Gamified' });
    
    if (!topic) {
      console.log('❌ Games topic not found');
      process.exit(1);
    }

    const subtopic = new SubTopic({
      title: 'Maze Games',
      description: 'Navigate through challenging mazes',
      topicId: topic._id
    });

    await subtopic.save();
    console.log(`✅ Created Maze Games subtopic (ID: ${subtopic._id})`);

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createMazeSubtopic();
