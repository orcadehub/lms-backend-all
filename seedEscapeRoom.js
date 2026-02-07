const mongoose = require('mongoose');
const GamifiedQuestion = require('./models/GamifiedQuestion');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI;

const roomThemes = [
  'Haunted Mansion', 'Secret Laboratory', 'Ancient Temple', 'Pirate Ship',
  'Space Station', 'Wizard Tower', 'Jungle Ruins', 'Ice Castle',
  'Desert Pyramid', 'Underwater Base', 'Dragon Lair', 'Time Machine',
  'Vampire Castle', 'Robot Factory', 'Magic Library', 'Ghost Ship',
  'Crystal Cave', 'Alien Spaceship', 'Medieval Dungeon', 'Treasure Vault'
];

const generateComplexMath = (seed) => {
  const rng = (s) => (s * 9301 + 49297) % 233280 / 233280;
  const a = Math.floor(rng(seed) * 20) + 5;
  const b = Math.floor(rng(seed + 1) * 10) + 2;
  const c = Math.floor(rng(seed + 2) * 15) + 3;
  const d = Math.floor(rng(seed + 3) * 8) + 2;
  
  const type = Math.floor(rng(seed + 4) * 4);
  let question, answer;
  
  if (type === 0) {
    question = `(${a} + ${b}) × ${c}`;
    answer = (a + b) * c;
  } else if (type === 1) {
    question = `${a} × ${b} + ${c}`;
    answer = a * b + c;
  } else if (type === 2) {
    question = `${a} + ${b} × ${c} - ${d}`;
    answer = a + b * c - d;
  } else {
    question = `(${a} - ${b}) × ${c} + ${d}`;
    answer = (a - b) * c + d;
  }
  
  const wrongAnswers = [
    answer + Math.floor(rng(seed + 5) * 10) + 1,
    answer - Math.floor(rng(seed + 6) * 10) - 1,
    Math.floor(rng(seed + 7) * 100) + 10
  ];
  
  const options = [answer, ...wrongAnswers].sort(() => rng(seed + 8) - 0.5);
  return { question, answer: answer.toString(), options };
};

const generatePath = (gridSize, puzzleCount, seed) => {
  const rng = (s) => (s * 9301 + 49297) % 233280 / 233280;
  const path = [];
  
  // Start position
  let row = 0;
  let col = 0;
  path.push({ row, col, type: 'start' });
  
  // Generate path through grid
  for (let i = 0; i < puzzleCount; i++) {
    // Move right or down randomly
    const moveRight = rng(seed + i) > 0.5 && col < gridSize - 1;
    const moveDown = !moveRight && row < gridSize - 1;
    
    let doorWall;
    if (moveRight) {
      doorWall = 'right';
      col++;
    } else if (moveDown) {
      doorWall = 'bottom';
      row++;
    } else if (col < gridSize - 1) {
      doorWall = 'right';
      col++;
    } else if (row < gridSize - 1) {
      doorWall = 'bottom';
      row++;
    }
    
    path.push({ 
      row, 
      col, 
      type: i === puzzleCount - 1 ? 'exit' : 'room',
      doorWall,
      doorIndex: i
    });
  }
  
  return path;
};

const generateEscapeRoom = (puzzleCount, seed) => {
  const theme = roomThemes[seed % roomThemes.length];
  const gridSize = 10;
  const puzzles = [];
  
  for (let i = 0; i < puzzleCount; i++) {
    const mathPuzzle = generateComplexMath(seed + i * 100);
    puzzles.push({
      type: 'math',
      question: `Solve: ${mathPuzzle.question} = ?`,
      answer: mathPuzzle.answer,
      options: mathPuzzle.options
    });
  }
  
  const path = generatePath(gridSize, puzzleCount, seed);
  
  return { theme, puzzles, gridSize, path };
};

const createEscapeRoomGames = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const SubTopic = require('./models/SubTopic');
    const escapeSubtopic = await SubTopic.findOne({ title: 'Escape Room Games' });
    
    if (!escapeSubtopic) {
      console.log('❌ Escape Room Games subtopic not found');
      process.exit(1);
    }

    await GamifiedQuestion.deleteMany({ subTopicId: escapeSubtopic._id });

    // Game 1: Easy - 3 puzzles
    const easyLevels = [];
    for (let i = 1; i <= 20; i++) {
      const { theme, puzzles, gridSize, path } = generateEscapeRoom(3, i * 100);
      
      easyLevels.push({
        levelNumber: i,
        question: `Escape from the ${theme}! Solve puzzles to open doors.`,
        questionType: 'EscapeRoom',
        options: [],
        correctAnswer: JSON.stringify({ theme, puzzles, gridSize, path }),
        pointsForLevel: 2,
        timeLimit: 180,
        hints: [{ hintNumber: 1, hintText: 'BODMAS: Brackets, Orders, Division/Multiplication, Addition/Subtraction', pointsDeduction: 1 }],
        shuffleOptions: false
      });
    }

    const easyGame = new GamifiedQuestion({
      subTopicId: escapeSubtopic._id,
      title: 'Escape Room - Easy (3 Doors)',
      description: 'Navigate through rooms and solve puzzles',
      difficulty: 'Easy',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels: easyLevels,
      hasTimer: true,
      totalTimeLimit: 3600,
      maxScore: 40,
      passingScore: 24,
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 1800 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });
    await easyGame.save();
    console.log('✅ Easy Escape Room game created');

    // Game 2: Medium - 4 puzzles
    const mediumLevels = [];
    for (let i = 1; i <= 20; i++) {
      const { theme, puzzles, gridSize, path } = generateEscapeRoom(4, i * 200);
      
      mediumLevels.push({
        levelNumber: i,
        question: `Escape from the ${theme}! Solve puzzles to open doors.`,
        questionType: 'EscapeRoom',
        options: [],
        correctAnswer: JSON.stringify({ theme, puzzles, gridSize, path }),
        pointsForLevel: 2,
        timeLimit: 240,
        hints: [{ hintNumber: 1, hintText: 'BODMAS: Brackets, Orders, Division/Multiplication, Addition/Subtraction', pointsDeduction: 1 }],
        shuffleOptions: false
      });
    }

    const mediumGame = new GamifiedQuestion({
      subTopicId: escapeSubtopic._id,
      title: 'Escape Room - Medium (4 Doors)',
      description: 'Navigate through rooms and solve puzzles',
      difficulty: 'Medium',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels: mediumLevels,
      hasTimer: true,
      totalTimeLimit: 4800,
      maxScore: 40,
      passingScore: 24,
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 2400 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });
    await mediumGame.save();
    console.log('✅ Medium Escape Room game created');

    // Game 3: Hard - 5 puzzles
    const hardLevels = [];
    for (let i = 1; i <= 20; i++) {
      const { theme, puzzles, gridSize, path } = generateEscapeRoom(5, i * 300);
      
      hardLevels.push({
        levelNumber: i,
        question: `Escape from the ${theme}! Solve puzzles to open doors.`,
        questionType: 'EscapeRoom',
        options: [],
        correctAnswer: JSON.stringify({ theme, puzzles, gridSize, path }),
        pointsForLevel: 2,
        timeLimit: 300,
        hints: [{ hintNumber: 1, hintText: 'BODMAS: Brackets, Orders, Division/Multiplication, Addition/Subtraction', pointsDeduction: 1 }],
        shuffleOptions: false
      });
    }

    const hardGame = new GamifiedQuestion({
      subTopicId: escapeSubtopic._id,
      title: 'Escape Room - Hard (5 Doors)',
      description: 'Navigate through rooms and solve puzzles',
      difficulty: 'Hard',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels: hardLevels,
      hasTimer: true,
      totalTimeLimit: 6000,
      maxScore: 40,
      passingScore: 24,
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 3000 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });
    await hardGame.save();
    console.log('✅ Hard Escape Room game created');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createEscapeRoomGames();
