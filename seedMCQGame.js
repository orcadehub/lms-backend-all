const mongoose = require('mongoose');
require('dotenv').config();

const GamifiedQuestion = require('./models/GamifiedQuestion');
const SubTopic = require('./models/SubTopic');

async function seedMCQGame() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find a subtopic (e.g., MCQ Games)
    const subtopic = await SubTopic.findOne({ title: 'MCQ Games' });
    
    if (!subtopic) {
      console.log('❌ Subtopic not found. Run seedGamifiedAptitude.js first');
      process.exit(1);
    }

    // Delete existing games
    await GamifiedQuestion.deleteMany({ subTopicId: subtopic._id });

    const games = [
      {
        title: 'General Aptitude MCQs',
        description: 'General aptitude questions from dataset',
        dataset: 'clean_general_aptitude_dataset.csv'
      },
      {
        title: 'CSE Technical MCQs',
        description: 'Computer Science and Engineering questions',
        dataset: 'cse_dataset.csv'
      },
      {
        title: 'Logical Reasoning MCQs',
        description: 'Logical reasoning questions',
        dataset: 'logical_reasoning_questions.csv'
      }
    ];

    for (const gameData of games) {
      const levels = [];
      for (let i = 1; i <= 50; i++) {
        levels.push({
          levelNumber: i,
          question: `Question ${i}`,
          questionType: 'MCQ',
          options: [],
          correctAnswer: JSON.stringify({ dataset: gameData.dataset }),
          pointsForLevel: 2,
          timeLimit: 60,
          hints: [],
          shuffleOptions: true
        });
      }

      const mcqGame = {
        subTopicId: subtopic._id,
        title: gameData.title,
        description: gameData.description,
        difficulty: 'Medium',
        points: 100,
        gameType: 'MCQ',
        isMultiLevel: true,
        totalLevels: 50,
        levels,
        hasTimer: true,
        totalTimeLimit: 3000,
        maxScore: 100,
        passingScore: 60,
        speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 1500 },
        streakBonus: { enabled: true, bonusPerStreak: 5 },
        isActive: true
      };

      await GamifiedQuestion.create(mcqGame);
      console.log(`✅ ${gameData.title} created with 50 levels`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedMCQGame();
