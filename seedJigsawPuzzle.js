const mongoose = require('mongoose');
const GamifiedQuestion = require('./models/GamifiedQuestion');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI;

const imagePatterns = [
  { emoji: '🌄', name: 'Landscape' },
  { emoji: '🏖️', name: 'Beach' },
  { emoji: '🌃', name: 'City Night' },
  { emoji: '🌅', name: 'Sunrise' },
  { emoji: '🏔️', name: 'Mountains' },
  { emoji: '🌊', name: 'Ocean' },
  { emoji: '🌲', name: 'Forest' },
  { emoji: '🏰', name: 'Castle' },
  { emoji: '🎡', name: 'Ferris Wheel' },
  { emoji: '🌉', name: 'Bridge' },
  { emoji: '🏝️', name: 'Island' },
  { emoji: '🌌', name: 'Galaxy' },
  { emoji: '🎨', name: 'Art' },
  { emoji: '🌺', name: 'Flowers' },
  { emoji: '🦋', name: 'Butterfly' },
  { emoji: '🐠', name: 'Fish' },
  { emoji: '🦜', name: 'Parrot' },
  { emoji: '🌈', name: 'Rainbow' },
  { emoji: '🎪', name: 'Circus' },
  { emoji: '🚀', name: 'Rocket' }
];

const generateJigsawPuzzle = (rows, cols, seed) => {
  const totalPieces = rows * cols;
  const pattern = imagePatterns[seed % imagePatterns.length];
  
  // Create ordered pieces
  const pieces = [];
  for (let i = 0; i < totalPieces; i++) {
    pieces.push({ id: i, correctPosition: i });
  }
  
  // Shuffle pieces
  const rng = (s) => (s * 9301 + 49297) % 233280 / 233280;
  let s = seed;
  const shuffled = [...pieces];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng(s++) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return { rows, cols, pieces: shuffled, pattern };
};

const createJigsawGames = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const SubTopic = require('./models/SubTopic');
    const puzzleSubtopic = await SubTopic.findOne({ title: 'Puzzle Games' });
    
    if (!puzzleSubtopic) {
      console.log('❌ Puzzle Games subtopic not found');
      process.exit(1);
    }

    await GamifiedQuestion.deleteMany({ subTopicId: puzzleSubtopic._id });

    // Game 1: Easy - 3x3 grid (9 pieces)
    const easyLevels = [];
    for (let i = 1; i <= 20; i++) {
      const { rows, cols, pieces, pattern } = generateJigsawPuzzle(3, 3, i * 100);
      
      easyLevels.push({
        levelNumber: i,
        question: `Complete the ${pattern.name} jigsaw puzzle (3x3 grid)`,
        questionType: 'Jigsaw',
        options: [],
        correctAnswer: JSON.stringify({ rows, cols, pieces, pattern }),
        pointsForLevel: 2,
        timeLimit: 90,
        hints: [{ hintNumber: 1, hintText: 'Start with corner pieces', pointsDeduction: 1 }],
        shuffleOptions: false
      });
    }

    const easyGame = new GamifiedQuestion({
      subTopicId: puzzleSubtopic._id,
      title: 'Jigsaw Puzzle - Easy (3x3)',
      description: 'Solve 3x3 jigsaw puzzles',
      difficulty: 'Easy',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels: easyLevels,
      hasTimer: true,
      totalTimeLimit: 1800,
      maxScore: 40,
      passingScore: 24,
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 900 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });
    await easyGame.save();
    console.log('✅ Easy Jigsaw game created (3x3 grid)');

    // Game 2: Medium - 4x4 grid (16 pieces)
    const mediumLevels = [];
    for (let i = 1; i <= 20; i++) {
      const { rows, cols, pieces, pattern } = generateJigsawPuzzle(4, 4, i * 200);
      
      mediumLevels.push({
        levelNumber: i,
        question: `Complete the ${pattern.name} jigsaw puzzle (4x4 grid)`,
        questionType: 'Jigsaw',
        options: [],
        correctAnswer: JSON.stringify({ rows, cols, pieces, pattern }),
        pointsForLevel: 2,
        timeLimit: 120,
        hints: [{ hintNumber: 1, hintText: 'Build edges first, then fill center', pointsDeduction: 1 }],
        shuffleOptions: false
      });
    }

    const mediumGame = new GamifiedQuestion({
      subTopicId: puzzleSubtopic._id,
      title: 'Jigsaw Puzzle - Medium (4x4)',
      description: 'Solve 4x4 jigsaw puzzles',
      difficulty: 'Medium',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels: mediumLevels,
      hasTimer: true,
      totalTimeLimit: 2400,
      maxScore: 40,
      passingScore: 24,
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 1200 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });
    await mediumGame.save();
    console.log('✅ Medium Jigsaw game created (4x4 grid)');

    // Game 3: Hard - 5x5 grid (25 pieces)
    const hardLevels = [];
    for (let i = 1; i <= 20; i++) {
      const { rows, cols, pieces, pattern } = generateJigsawPuzzle(5, 5, i * 300);
      
      hardLevels.push({
        levelNumber: i,
        question: `Complete the ${pattern.name} jigsaw puzzle (5x5 grid)`,
        questionType: 'Jigsaw',
        options: [],
        correctAnswer: JSON.stringify({ rows, cols, pieces, pattern }),
        pointsForLevel: 2,
        timeLimit: 180,
        hints: [{ hintNumber: 1, hintText: 'Group similar pieces together', pointsDeduction: 1 }],
        shuffleOptions: false
      });
    }

    const hardGame = new GamifiedQuestion({
      subTopicId: puzzleSubtopic._id,
      title: 'Jigsaw Puzzle - Hard (5x5)',
      description: 'Solve 5x5 jigsaw puzzles',
      difficulty: 'Hard',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels: hardLevels,
      hasTimer: true,
      totalTimeLimit: 3600,
      maxScore: 40,
      passingScore: 24,
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 1800 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });
    await hardGame.save();
    console.log('✅ Hard Jigsaw game created (5x5 grid)');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createJigsawGames();
