const mongoose = require('mongoose');
const SubTopic = require('./models/SubTopic');
const GamifiedQuestion = require('./models/GamifiedQuestion');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI;

async function deleteInteractiveGames() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Find Interactive/Maze Games subtopic
    const subtopic = await SubTopic.findOne({ title: /maze games/i });
    
    if (!subtopic) {
      console.log('❌ Interactive/Maze Games subtopic not found');
      process.exit(0);
    }

    console.log(`Found subtopic: ${subtopic.title} (ID: ${subtopic._id})`);

    // Delete all games with this subTopicId
    const deleteResult = await GamifiedQuestion.deleteMany({ 
      subTopicId: subtopic._id
    });
    console.log(`✅ Deleted ${deleteResult.deletedCount} Interactive/Maze games`);

    // Delete the subtopic
    await SubTopic.deleteOne({ _id: subtopic._id });
    console.log(`✅ Deleted Interactive/Maze Games subtopic`);

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

deleteInteractiveGames();
