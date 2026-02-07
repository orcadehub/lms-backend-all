const mongoose = require('mongoose');
const GamifiedQuestion = require('./models/GamifiedQuestion');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI;

const generateMaze = (rows, cols, seed) => {
  const grid = Array(rows).fill(null).map(() => Array(cols).fill(1));
  let rng = seed;
  const random = () => (rng = (rng * 9301 + 49297) % 233280) / 233280;
  
  const startRow = Math.floor(random() * rows);
  const endRow = Math.floor(random() * rows);
  
  // Create path with exactly 2 turns
  let row = startRow;
  let col = 0;
  
  // First segment - move right
  const turn1Col = Math.floor(random() * (cols - 2)) + 1;
  for (let c = 0; c <= turn1Col; c++) {
    grid[row][c] = 0;
  }
  
  // Second segment - move up or down
  const turn2Row = row < endRow ? Math.min(endRow, row + Math.floor(random() * (endRow - row + 1))) : Math.max(endRow, row - Math.floor(random() * (row - endRow + 1)));
  const step = row < turn2Row ? 1 : -1;
  for (let r = row; r !== turn2Row; r += step) {
    grid[r][turn1Col] = 0;
  }
  row = turn2Row;
  grid[row][turn1Col] = 0;
  
  // Third segment - move right to end
  for (let c = turn1Col; c < cols; c++) {
    grid[row][c] = 0;
  }
  
  // Add complex dead-end branches
  const numBranches = Math.floor(rows * cols * 0.3);
  for (let i = 0; i < numBranches; i++) {
    const r = Math.floor(random() * rows);
    const c = Math.floor(random() * cols);
    const branchLength = 2 + Math.floor(random() * 4);
    
    let br = r, bc = c;
    for (let j = 0; j < branchLength; j++) {
      if (br >= 0 && br < rows && bc >= 0 && bc < cols) {
        grid[br][bc] = 0;
        const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        const dir = dirs[Math.floor(random() * 4)];
        br += dir[0];
        bc += dir[1];
      }
    }
  }
  
  return { grid, start: [startRow, 0], end: [endRow, cols - 1] };
};

const createMazeGame = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const SubTopic = require('./models/SubTopic');
    const mazeSubtopic = await SubTopic.findOne({ title: 'Maze Games' });
    
    if (!mazeSubtopic) {
      console.log('❌ Maze Games subtopic not found');
      process.exit(1);
    }

    await GamifiedQuestion.deleteMany({ title: 'Maze Challenge - Medium (6x6)' });

    const levels = [];
    for (let i = 1; i <= 20; i++) {
      levels.push({
        levelNumber: i,
        question: `Navigate through the 6x6 maze from red to green (Level ${i})`,
        questionType: 'Interactive',
        options: [],
        correctAnswer: JSON.stringify({ type: 'maze', rows: 6, cols: 6 }),
        pointsForLevel: 2,
        timeLimit: 75,
        hints: [{ hintNumber: 1, hintText: 'Follow the open paths to reach the goal', pointsDeduction: 1 }],
        shuffleOptions: false
      });
    }

    const mazeGame = new GamifiedQuestion({
      subTopicId: mazeSubtopic._id,
      title: 'Maze Challenge - Medium (6x6)',
      description: 'Navigate through 6x6 mazes',
      difficulty: 'Medium',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels,
      hasTimer: true,
      totalTimeLimit: 1500,
      maxScore: 40,
      passingScore: 24,
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 350 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });

    await mazeGame.save();
    console.log('6x6 Maze game created successfully with 20 levels');
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createMazeGame();
