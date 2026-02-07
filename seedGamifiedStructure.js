require('dotenv').config();
const mongoose = require('mongoose');
const Topic = require('./models/Topic');
const SubTopic = require('./models/SubTopic');

const seedGamifiedStructure = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create Gamified topic
    const topic = await Topic.create({
      title: 'Gamified',
      description: 'Interactive gamified learning experiences',
      difficulty: 'Medium',
      order: 2
    });
    console.log('✅ Created Gamified topic');

    // Create subtopics for each game type
    const subtopics = [
      {
        title: 'MCQ Games',
        description: 'Multiple choice question based games',
        topicId: topic._id,
        difficulty: 'Easy',
        order: 1
      },
      {
        title: 'Fill in the Blank Games',
        description: 'Text input based puzzle games',
        topicId: topic._id,
        difficulty: 'Easy',
        order: 2
      },
      {
        title: 'Drag & Drop Games',
        description: 'Interactive drag and drop challenges',
        topicId: topic._id,
        difficulty: 'Medium',
        order: 3
      },
      {
        title: 'Ordering Games',
        description: 'Sequence arrangement puzzles',
        topicId: topic._id,
        difficulty: 'Medium',
        order: 4
      },
      {
        title: 'Matching Games',
        description: 'Match pairs and patterns',
        topicId: topic._id,
        difficulty: 'Medium',
        order: 5
      },
      {
        title: 'Interactive Games',
        description: 'Advanced interactive challenges',
        topicId: topic._id,
        difficulty: 'Hard',
        order: 6
      }
    ];

    for (const subtopicData of subtopics) {
      await SubTopic.create(subtopicData);
      console.log(`✅ Created ${subtopicData.title} subtopic`);
    }

    console.log('\n🎮 Gamified structure created successfully!');
    console.log(`Topic ID: ${topic._id}`);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

seedGamifiedStructure();
