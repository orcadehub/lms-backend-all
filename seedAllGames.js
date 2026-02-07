const mongoose = require('mongoose');
require('dotenv').config();

const GamifiedQuestion = require('./models/GamifiedQuestion');
const SubTopic = require('./models/SubTopic');

const games = [
  {
    subtopicName: 'Drag & Drop Games',
    title: 'Sequence Sorter',
    description: 'Arrange items in correct order',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: `Arrange the numbers in ascending order: ${[5, 2, 8, 1].sort(() => Math.random() - 0.5).join(', ')}`,
      questionType: 'MCQ',
      options: [
        { id: 'A', text: '1, 2, 5, 8', isCorrect: true },
        { id: 'B', text: '8, 5, 2, 1', isCorrect: false },
        { id: 'C', text: '2, 1, 5, 8', isCorrect: false },
        { id: 'D', text: '5, 8, 1, 2', isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'Start with smallest number', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Ordering Games',
    title: 'Timeline Master',
    description: 'Put events in chronological order',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: 'Which comes first in the alphabet?',
      questionType: 'MCQ',
      options: [
        { id: 'A', text: 'Apple', isCorrect: true },
        { id: 'B', text: 'Banana', isCorrect: false },
        { id: 'C', text: 'Cherry', isCorrect: false },
        { id: 'D', text: 'Date', isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'Check first letter', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Matching Games',
    title: 'Pair Perfect',
    description: 'Match related items',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: 'Match the capital: France - ?',
      questionType: 'MCQ',
      options: [
        { id: 'A', text: 'Paris', isCorrect: true },
        { id: 'B', text: 'London', isCorrect: false },
        { id: 'C', text: 'Berlin', isCorrect: false },
        { id: 'D', text: 'Rome', isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'City of lights', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Maze Games',
    title: 'Path Finder',
    description: 'Navigate through mazes',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: 'To reach the exit, which direction should you go first?',
      questionType: 'MCQ',
      options: [
        { id: 'A', text: 'Right', isCorrect: true },
        { id: 'B', text: 'Left', isCorrect: false },
        { id: 'C', text: 'Up', isCorrect: false },
        { id: 'D', text: 'Down', isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'Look for open path', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Balloon Pop Games',
    title: 'Pop Master',
    description: 'Pop balloons with correct answers',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: `What is ${i + 1} + ${i + 1}?`,
      questionType: 'MCQ',
      options: [
        { id: 'A', text: `${(i + 1) * 2}`, isCorrect: true },
        { id: 'B', text: `${(i + 1) * 2 + 1}`, isCorrect: false },
        { id: 'C', text: `${(i + 1) * 2 - 1}`, isCorrect: false },
        { id: 'D', text: `${(i + 1) * 3}`, isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'Add the numbers', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Memory Games',
    title: 'Memory Champion',
    description: 'Remember and recall patterns',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: 'Which color was shown first? (Red, Blue, Green)',
      questionType: 'MCQ',
      options: [
        { id: 'A', text: 'Red', isCorrect: true },
        { id: 'B', text: 'Blue', isCorrect: false },
        { id: 'C', text: 'Green', isCorrect: false },
        { id: 'D', text: 'Yellow', isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'First in sequence', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Puzzle Games',
    title: 'Puzzle Solver',
    description: 'Solve challenging puzzles',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: 'Complete the pattern: 2, 4, 6, 8, ?',
      questionType: 'MCQ',
      options: [
        { id: 'A', text: '10', isCorrect: true },
        { id: 'B', text: '9', isCorrect: false },
        { id: 'C', text: '12', isCorrect: false },
        { id: 'D', text: '7', isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'Even numbers', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Card Games',
    title: 'Card Master',
    description: 'Play card-based challenges',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: 'Which card is higher in poker?',
      questionType: 'MCQ',
      options: [
        { id: 'A', text: 'Ace', isCorrect: true },
        { id: 'B', text: 'King', isCorrect: false },
        { id: 'C', text: 'Queen', isCorrect: false },
        { id: 'D', text: 'Jack', isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'Highest card', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Word Games',
    title: 'Word Wizard',
    description: 'Word puzzles and challenges',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: 'Which word means happy?',
      questionType: 'MCQ',
      options: [
        { id: 'A', text: 'Joyful', isCorrect: true },
        { id: 'B', text: 'Sad', isCorrect: false },
        { id: 'C', text: 'Angry', isCorrect: false },
        { id: 'D', text: 'Tired', isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'Synonym of happy', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Number Games',
    title: 'Number Ninja',
    description: 'Mathematical challenges',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: `What is ${i + 5} × 2?`,
      questionType: 'MCQ',
      options: [
        { id: 'A', text: `${(i + 5) * 2}`, isCorrect: true },
        { id: 'B', text: `${(i + 5) * 2 + 1}`, isCorrect: false },
        { id: 'C', text: `${(i + 5) * 2 - 1}`, isCorrect: false },
        { id: 'D', text: `${(i + 5) * 3}`, isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'Multiply by 2', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Speed Games',
    title: 'Speed Demon',
    description: 'Answer as fast as you can',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: `Quick! ${i + 1} + 1 = ?`,
      questionType: 'MCQ',
      options: [
        { id: 'A', text: `${i + 2}`, isCorrect: true },
        { id: 'B', text: `${i + 1}`, isCorrect: false },
        { id: 'C', text: `${i + 3}`, isCorrect: false },
        { id: 'D', text: `${i}`, isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'Add one', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Pattern Games',
    title: 'Pattern Pro',
    description: 'Identify and complete patterns',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: 'What comes next: ○ ● ○ ● ?',
      questionType: 'MCQ',
      options: [
        { id: 'A', text: '○', isCorrect: true },
        { id: 'B', text: '●', isCorrect: false },
        { id: 'C', text: '◆', isCorrect: false },
        { id: 'D', text: '■', isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'Alternating pattern', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Treasure Hunt Games',
    title: 'Treasure Hunter',
    description: 'Find hidden treasures',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: 'Where is the treasure hidden?',
      questionType: 'MCQ',
      options: [
        { id: 'A', text: 'Under the tree', isCorrect: true },
        { id: 'B', text: 'In the cave', isCorrect: false },
        { id: 'C', text: 'By the river', isCorrect: false },
        { id: 'D', text: 'On the mountain', isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'Look for X mark', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Escape Room Games',
    title: 'Escape Artist',
    description: 'Solve puzzles to escape',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: 'What is the code to unlock the door? (Hint: 1+2+3)',
      questionType: 'MCQ',
      options: [
        { id: 'A', text: '6', isCorrect: true },
        { id: 'B', text: '5', isCorrect: false },
        { id: 'C', text: '7', isCorrect: false },
        { id: 'D', text: '8', isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'Sum of numbers', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Trivia Games',
    title: 'Trivia Master',
    description: 'Test your general knowledge',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: 'How many continents are there?',
      questionType: 'MCQ',
      options: [
        { id: 'A', text: '7', isCorrect: true },
        { id: 'B', text: '5', isCorrect: false },
        { id: 'C', text: '6', isCorrect: false },
        { id: 'D', text: '8', isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'Lucky number', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Reaction Games',
    title: 'Quick Reflex',
    description: 'Test your reaction time',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: 'Click when you see GREEN!',
      questionType: 'MCQ',
      options: [
        { id: 'A', text: 'Green', isCorrect: true },
        { id: 'B', text: 'Red', isCorrect: false },
        { id: 'C', text: 'Blue', isCorrect: false },
        { id: 'D', text: 'Yellow', isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'Look for green', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Strategy Games',
    title: 'Strategy Master',
    description: 'Plan your moves carefully',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: 'Best first move in chess?',
      questionType: 'MCQ',
      options: [
        { id: 'A', text: 'Move pawn', isCorrect: true },
        { id: 'B', text: 'Move king', isCorrect: false },
        { id: 'C', text: 'Move queen', isCorrect: false },
        { id: 'D', text: 'Castle', isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'Control center', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  },
  {
    subtopicName: 'Interactive Games',
    title: 'Interactive Challenge',
    description: 'Engage with interactive elements',
    gameType: 'MCQ',
    levels: Array.from({ length: 20 }, (_, i) => ({
      levelNumber: i + 1,
      question: 'Which button should you press?',
      questionType: 'MCQ',
      options: [
        { id: 'A', text: 'Start', isCorrect: true },
        { id: 'B', text: 'Stop', isCorrect: false },
        { id: 'C', text: 'Pause', isCorrect: false },
        { id: 'D', text: 'Reset', isCorrect: false }
      ],
      correctAnswer: 'A',
      hints: [{ hintNumber: 1, hintText: 'Begin the game', pointsDeduction: 1 }],
      pointsForLevel: 2,
      shuffleOptions: true
    }))
  }
];

async function seedAllGames() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const gameData of games) {
      const subtopic = await SubTopic.findOne({ title: gameData.subtopicName });
      
      if (!subtopic) {
        console.log(`❌ Subtopic "${gameData.subtopicName}" not found`);
        continue;
      }

      const game = {
        subTopicId: subtopic._id,
        title: gameData.title,
        description: gameData.description,
        difficulty: 'Medium',
        points: 40,
        gameType: gameData.gameType,
        isMultiLevel: true,
        totalLevels: 20,
        hasTimer: true,
        totalTimeLimit: 1200,
        maxScore: 40,
        passingScore: 24,
        levels: gameData.levels,
        speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 300 },
        streakBonus: { enabled: true, bonusPerStreak: 5 },
        tags: [gameData.subtopicName.toLowerCase().replace(/ /g, '-')],
        isActive: true
      };

      await GamifiedQuestion.create(game);
      console.log(`✅ ${gameData.title} seeded for ${gameData.subtopicName}`);
    }

    console.log('\n✅ All games seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedAllGames();
