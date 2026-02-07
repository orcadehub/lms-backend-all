const mongoose = require('mongoose');
const GamifiedQuestion = require('./models/GamifiedQuestion');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI;

const generateSlidingPuzzle = (rows, cols, seed) => {
  const totalCells = rows * cols;
  const tiles = [];
  
  // Create ordered tiles (1 to n-1, last is empty)
  for (let i = 1; i < totalCells; i++) {
    tiles.push(i);
  }
  tiles.push(0); // 0 represents empty space
  
  // Shuffle with valid moves only
  const rng = (s) => (s * 9301 + 49297) % 233280 / 233280;
  let s = seed;
  let emptyIndex = totalCells - 1;
  
  // Make 100 random valid moves to shuffle
  for (let i = 0; i < 200; i++) {
    const emptyRow = Math.floor(emptyIndex / cols);
    const emptyCol = emptyIndex % cols;
    const validMoves = [];
    
    if (emptyRow > 0) validMoves.push(emptyIndex - cols); // Up
    if (emptyRow < rows - 1) validMoves.push(emptyIndex + cols); // Down
    if (emptyCol > 0) validMoves.push(emptyIndex - 1); // Left
    if (emptyCol < cols - 1) validMoves.push(emptyIndex + 1); // Right
    
    const moveIndex = validMoves[Math.floor(rng(s++) * validMoves.length)];
    [tiles[emptyIndex], tiles[moveIndex]] = [tiles[moveIndex], tiles[emptyIndex]];
    emptyIndex = moveIndex;
  }
  
  return { rows, cols, tiles };
};

const createSlidingPuzzleGames = async () => {
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

    // Game 1: Easy - 3x3 grid (8 tiles + 1 empty)
    const easyLevels = [];
    for (let i = 1; i <= 20; i++) {
      const { rows, cols, tiles } = generateSlidingPuzzle(3, 3, i * 100);
      
      easyLevels.push({
        levelNumber: i,
        question: `Arrange the tiles in order by sliding them into the empty space (Level ${i})`,
        questionType: 'SlidingPuzzle',
        options: [],
        correctAnswer: JSON.stringify({ rows, cols, tiles }),
        pointsForLevel: 2,
        timeLimit: 120,
        hints: [{ hintNumber: 1, hintText: 'Solve row by row from top to bottom', pointsDeduction: 1 }],
        shuffleOptions: false
      });
    }

    const easyGame = new GamifiedQuestion({
      subTopicId: puzzleSubtopic._id,
      title: 'Sliding Puzzle - Easy (3x3)',
      description: 'Solve 8-puzzle sliding games',
      difficulty: 'Easy',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels: easyLevels,
      hasTimer: true,
      totalTimeLimit: 2400,
      maxScore: 40,
      passingScore: 24,
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 1200 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });
    await easyGame.save();
    console.log('✅ Easy Sliding Puzzle game created (3x3 grid)');

    // Game 2: Medium - 4x4 grid (15 tiles + 1 empty)
    const mediumLevels = [];
    for (let i = 1; i <= 20; i++) {
      const { rows, cols, tiles } = generateSlidingPuzzle(4, 4, i * 200);
      
      mediumLevels.push({
        levelNumber: i,
        question: `Arrange the tiles in order by sliding them into the empty space (Level ${i})`,
        questionType: 'SlidingPuzzle',
        options: [],
        correctAnswer: JSON.stringify({ rows, cols, tiles }),
        pointsForLevel: 2,
        timeLimit: 180,
        hints: [{ hintNumber: 1, hintText: 'Focus on positioning corner tiles first', pointsDeduction: 1 }],
        shuffleOptions: false
      });
    }

    const mediumGame = new GamifiedQuestion({
      subTopicId: puzzleSubtopic._id,
      title: 'Sliding Puzzle - Medium (4x4)',
      description: 'Solve 15-puzzle sliding games',
      difficulty: 'Medium',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels: mediumLevels,
      hasTimer: true,
      totalTimeLimit: 3600,
      maxScore: 40,
      passingScore: 24,
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 1800 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });
    await mediumGame.save();
    console.log('✅ Medium Sliding Puzzle game created (4x4 grid)');

    // Game 3: Hard - 5x5 grid (24 tiles + 1 empty)
    const hardLevels = [];
    for (let i = 1; i <= 20; i++) {
      const { rows, cols, tiles } = generateSlidingPuzzle(5, 5, i * 300);
      
      hardLevels.push({
        levelNumber: i,
        question: `Arrange the tiles in order by sliding them into the empty space (Level ${i})`,
        questionType: 'SlidingPuzzle',
        options: [],
        correctAnswer: JSON.stringify({ rows, cols, tiles }),
        pointsForLevel: 2,
        timeLimit: 240,
        hints: [{ hintNumber: 1, hintText: 'Work systematically from top-left to bottom-right', pointsDeduction: 1 }],
        shuffleOptions: false
      });
    }

    const hardGame = new GamifiedQuestion({
      subTopicId: puzzleSubtopic._id,
      title: 'Sliding Puzzle - Hard (5x5)',
      description: 'Solve 24-puzzle sliding games',
      difficulty: 'Hard',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels: hardLevels,
      hasTimer: true,
      totalTimeLimit: 4800,
      maxScore: 40,
      passingScore: 24,
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 2400 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });
    await hardGame.save();
    console.log('✅ Hard Sliding Puzzle game created (5x5 grid)');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createSlidingPuzzleGames();
