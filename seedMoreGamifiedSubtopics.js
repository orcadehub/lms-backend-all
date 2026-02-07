require('dotenv').config();
const mongoose = require('mongoose');
const SubTopic = require('./models/SubTopic');

const seedMoreGamifiedSubtopics = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const topicId = '6985e55edd5c00afec6158e2';

    const subtopics = [
      {
        title: 'Maze Games',
        description: 'Navigate through challenging mazes',
        topicId,
        difficulty: 'Medium',
        order: 7
      },
      {
        title: 'Balloon Pop Games',
        description: 'Pop balloons to solve puzzles',
        topicId,
        difficulty: 'Easy',
        order: 8
      },
      {
        title: 'Memory Games',
        description: 'Test and improve your memory',
        topicId,
        difficulty: 'Medium',
        order: 9
      },
      {
        title: 'Puzzle Games',
        description: 'Solve visual and logic puzzles',
        topicId,
        difficulty: 'Hard',
        order: 10
      },
      {
        title: 'Card Games',
        description: 'Card matching and strategy games',
        topicId,
        difficulty: 'Medium',
        order: 11
      },
      {
        title: 'Word Games',
        description: 'Word search and crossword challenges',
        topicId,
        difficulty: 'Easy',
        order: 12
      },
      {
        title: 'Number Games',
        description: 'Math and number pattern games',
        topicId,
        difficulty: 'Medium',
        order: 13
      },
      {
        title: 'Speed Games',
        description: 'Fast-paced timed challenges',
        topicId,
        difficulty: 'Hard',
        order: 14
      },
      {
        title: 'Pattern Games',
        description: 'Identify and complete patterns',
        topicId,
        difficulty: 'Medium',
        order: 15
      },
      {
        title: 'Treasure Hunt Games',
        description: 'Multi-level treasure hunting adventures',
        topicId,
        difficulty: 'Hard',
        order: 16
      },
      {
        title: 'Escape Room Games',
        description: 'Solve puzzles to escape rooms',
        topicId,
        difficulty: 'Hard',
        order: 17
      },
      {
        title: 'Trivia Games',
        description: 'General knowledge trivia challenges',
        topicId,
        difficulty: 'Easy',
        order: 18
      },
      {
        title: 'Reaction Games',
        description: 'Test your reflexes and reaction time',
        topicId,
        difficulty: 'Medium',
        order: 19
      },
      {
        title: 'Strategy Games',
        description: 'Plan and execute winning strategies',
        topicId,
        difficulty: 'Hard',
        order: 20
      }
    ];

    for (const subtopicData of subtopics) {
      await SubTopic.create(subtopicData);
      console.log(`✅ Created ${subtopicData.title} subtopic`);
    }

    console.log('\n🎮 Additional gamified subtopics created successfully!');
    console.log(`Total new subtopics: ${subtopics.length}`);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

seedMoreGamifiedSubtopics();
