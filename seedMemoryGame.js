const mongoose = require('mongoose');
const GamifiedQuestion = require('./models/GamifiedQuestion');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI;

const emojiSets = [
  ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍒', '🍑', '🥝', '🍍', '🥭', '🍋', '🍈', '🫐', '🥥', '🍅', '🥑', '🥦'],
  ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🦆'],
  ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🥊', '🥋', '⛳', '🎯'],
  ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🛵', '🏍️', '🚲', '🛴', '🚁'],
  ['🌸', '🌺', '🌻', '🌷', '🌹', '🏵️', '🌼', '💐', '🌾', '🌿', '🍀', '🍁', '🍂', '🍃', '🌱', '🌴', '🌵', '🌳'],
  ['⭐', '🌟', '✨', '💫', '🌙', '☀️', '🌈', '☁️', '⛅', '🌤️', '⛈️', '🌥️', '🌦️', '🌧️', '🌨️', '🌩️', '❄️', '☃️'],
  ['🎨', '🎭', '🎪', '🎬', '🎤', '🎧', '🎼', '🎹', '🎺', '🎸', '🎻', '🥁', '🎲', '🎯', '🎳', '🎮', '🎰', '🧩'],
  ['📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '💾', '💿', '📀', '📷', '📹', '📺', '📻', '⏰', '⌚', '📡', '🔋', '💡']
];

const generateMemoryGrid = (rows, cols, seed) => {
  const totalPairs = (rows * cols) / 2;
  const rng = (s) => (s * 9301 + 49297) % 233280 / 233280;
  
  const emojiSet = emojiSets[seed % emojiSets.length];
  const selectedEmojis = [];
  let s = seed;
  
  while (selectedEmojis.length < totalPairs) {
    const idx = Math.floor(rng(s) * emojiSet.length);
    if (!selectedEmojis.includes(emojiSet[idx])) {
      selectedEmojis.push(emojiSet[idx]);
    }
    s++;
  }
  
  const cards = [...selectedEmojis, ...selectedEmojis];
  
  // Shuffle cards
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(rng(s++) * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  
  return { rows, cols, cards };
};

const createMemoryGames = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const SubTopic = require('./models/SubTopic');
    const memorySubtopic = await SubTopic.findOne({ title: 'Memory Games' });
    
    if (!memorySubtopic) {
      console.log('❌ Memory Games subtopic not found');
      process.exit(1);
    }

    await GamifiedQuestion.deleteMany({ subTopicId: memorySubtopic._id });

    // Game 1: Easy - 4x5 grid (10 pairs)
    const easyLevels = [];
    for (let i = 1; i <= 20; i++) {
      easyLevels.push({
        levelNumber: i,
        question: `Match all pairs in the 4x5 grid (Level ${i})`,
        questionType: 'MemoryCard',
        options: [],
        correctAnswer: JSON.stringify({ rows: 4, cols: 5 }),
        pointsForLevel: 2,
        timeLimit: 90,
        hints: [{ hintNumber: 1, hintText: 'Focus on remembering card positions', pointsDeduction: 1 }],
        shuffleOptions: false
      });
    }

    const easyGame = new GamifiedQuestion({
      subTopicId: memorySubtopic._id,
      title: 'Memory Match - Easy (4x5)',
      description: 'Match pairs in a 4x5 grid',
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
    console.log('✅ Easy Memory game created (4x5 grid)');

    // Game 2: Medium - 5x6 grid (15 pairs)
    const mediumLevels = [];
    for (let i = 1; i <= 20; i++) {
      mediumLevels.push({
        levelNumber: i,
        question: `Match all pairs in the 5x6 grid (Level ${i})`,
        questionType: 'MemoryCard',
        options: [],
        correctAnswer: JSON.stringify({ rows: 5, cols: 6 }),
        pointsForLevel: 2,
        timeLimit: 120,
        hints: [{ hintNumber: 1, hintText: 'Take your time to memorize positions', pointsDeduction: 1 }],
        shuffleOptions: false
      });
    }

    const mediumGame = new GamifiedQuestion({
      subTopicId: memorySubtopic._id,
      title: 'Memory Match - Medium (5x6)',
      description: 'Match pairs in a 5x6 grid',
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
    console.log('✅ Medium Memory game created (5x6 grid)');

    // Game 3: Hard - 6x6 grid (18 pairs)
    const hardLevels = [];
    for (let i = 1; i <= 20; i++) {
      hardLevels.push({
        levelNumber: i,
        question: `Match all pairs in the 6x6 grid (Level ${i})`,
        questionType: 'MemoryCard',
        options: [],
        correctAnswer: JSON.stringify({ rows: 6, cols: 6 }),
        pointsForLevel: 2,
        timeLimit: 150,
        hints: [{ hintNumber: 1, hintText: 'Use memory techniques to remember patterns', pointsDeduction: 1 }],
        shuffleOptions: false
      });
    }

    const hardGame = new GamifiedQuestion({
      subTopicId: memorySubtopic._id,
      title: 'Memory Match - Hard (6x6)',
      description: 'Match pairs in a 6x6 grid',
      difficulty: 'Hard',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels: hardLevels,
      hasTimer: true,
      totalTimeLimit: 3000,
      maxScore: 40,
      passingScore: 24,
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 1500 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });
    await hardGame.save();
    console.log('✅ Hard Memory game created (6x6 grid)');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createMemoryGames();
