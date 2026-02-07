const mongoose = require('mongoose');
require('dotenv').config();

const GamifiedQuestion = require('./models/GamifiedQuestion');
const SubTopic = require('./models/SubTopic');

async function seedFillBlankGame() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const subtopic = await SubTopic.findOne({ title: 'Fill in the Blank Games' });
    
    if (!subtopic) {
      console.log('❌ Subtopic not found. Run seedGamifiedAptitude.js first');
      process.exit(1);
    }

    const fillBlankGame = {
      subTopicId: subtopic._id,
      title: 'Word Master Challenge',
      description: 'Complete sentences by filling in the missing words',
      difficulty: 'Medium',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      hasTimer: true,
      totalTimeLimit: 1200,
      maxScore: 40,
      passingScore: 24,
      levels: [
        {
          levelNumber: 1,
          question: 'The sun _____ in the east.',
          questionType: 'FillBlank',
          correctAnswer: 'rises',
          hints: [{ hintNumber: 1, hintText: 'Think about what the sun does every morning', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 2,
          question: 'Water _____ at 100 degrees Celsius.',
          questionType: 'FillBlank',
          correctAnswer: 'boils',
          hints: [{ hintNumber: 1, hintText: 'What happens to water when heated?', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 3,
          question: 'The capital of France is _____.',
          questionType: 'FillBlank',
          correctAnswer: 'Paris',
          hints: [{ hintNumber: 1, hintText: 'City of lights', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 4,
          question: 'A group of lions is called a _____.',
          questionType: 'FillBlank',
          correctAnswer: 'pride',
          hints: [{ hintNumber: 1, hintText: 'Also means self-respect', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 5,
          question: 'The opposite of hot is _____.',
          questionType: 'FillBlank',
          correctAnswer: 'cold',
          hints: [{ hintNumber: 1, hintText: 'Temperature antonym', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 6,
          question: 'The largest planet in our solar system is _____.',
          questionType: 'FillBlank',
          correctAnswer: 'Jupiter',
          hints: [{ hintNumber: 1, hintText: 'Named after Roman king of gods', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 7,
          question: 'The process by which plants make food is called _____.',
          questionType: 'FillBlank',
          correctAnswer: 'photosynthesis',
          hints: [{ hintNumber: 1, hintText: 'Uses sunlight and chlorophyll', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 8,
          question: 'The longest river in the world is the _____.',
          questionType: 'FillBlank',
          correctAnswer: 'Nile',
          hints: [{ hintNumber: 1, hintText: 'Flows through Egypt', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 9,
          question: 'The speed of light is approximately _____ km/s.',
          questionType: 'FillBlank',
          correctAnswer: '300000',
          hints: [{ hintNumber: 1, hintText: '3 followed by five zeros', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 10,
          question: 'The chemical symbol for gold is _____.',
          questionType: 'FillBlank',
          correctAnswer: 'Au',
          hints: [{ hintNumber: 1, hintText: 'From Latin "Aurum"', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 11,
          question: 'The smallest unit of life is a _____.',
          questionType: 'FillBlank',
          correctAnswer: 'cell',
          hints: [{ hintNumber: 1, hintText: 'Building block of organisms', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 12,
          question: 'The study of earthquakes is called _____.',
          questionType: 'FillBlank',
          correctAnswer: 'seismology',
          hints: [{ hintNumber: 1, hintText: 'Seismo- means earthquake', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 13,
          question: 'The hardest natural substance on Earth is _____.',
          questionType: 'FillBlank',
          correctAnswer: 'diamond',
          hints: [{ hintNumber: 1, hintText: 'A precious gemstone', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 14,
          question: 'The human body has _____ bones.',
          questionType: 'FillBlank',
          correctAnswer: '206',
          hints: [{ hintNumber: 1, hintText: 'Between 200 and 210', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 15,
          question: 'The inventor of the telephone was _____.',
          questionType: 'FillBlank',
          correctAnswer: 'Bell',
          hints: [{ hintNumber: 1, hintText: 'Alexander Graham ___', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 16,
          question: 'The currency of Japan is the _____.',
          questionType: 'FillBlank',
          correctAnswer: 'Yen',
          hints: [{ hintNumber: 1, hintText: 'Starts with Y', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 17,
          question: 'The largest ocean on Earth is the _____ Ocean.',
          questionType: 'FillBlank',
          correctAnswer: 'Pacific',
          hints: [{ hintNumber: 1, hintText: 'Means peaceful', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 18,
          question: 'The square root of 144 is _____.',
          questionType: 'FillBlank',
          correctAnswer: '12',
          hints: [{ hintNumber: 1, hintText: '12 × 12 = 144', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 19,
          question: 'The author of "Romeo and Juliet" is William _____.',
          questionType: 'FillBlank',
          correctAnswer: 'Shakespeare',
          hints: [{ hintNumber: 1, hintText: 'Famous English playwright', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        },
        {
          levelNumber: 20,
          question: 'The freezing point of water is _____ degrees Celsius.',
          questionType: 'FillBlank',
          correctAnswer: '0',
          hints: [{ hintNumber: 1, hintText: 'Zero degrees', pointsDeduction: 1 }],
          pointsForLevel: 2,
          shuffleOptions: false
        }
      ],
      speedBonus: {
        enabled: true,
        maxBonus: 20,
        timeThreshold: 300
      },
      streakBonus: {
        enabled: true,
        bonusPerStreak: 5
      },
      tags: ['fill-blank', 'vocabulary', 'general-knowledge'],
      isActive: true
    };

    await GamifiedQuestion.create(fillBlankGame);
    console.log('✅ Fill in the Blank Game seeded successfully!');
    console.log(`Game: ${fillBlankGame.title}`);
    console.log(`Levels: ${fillBlankGame.totalLevels}`);
    console.log(`Points per level: 2`);
    console.log(`Total Points: ${fillBlankGame.points}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedFillBlankGame();
