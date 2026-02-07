const mongoose = require('mongoose');
const GamifiedQuestion = require('./models/GamifiedQuestion');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI;

const generateBalloons = (count, seed) => {
  const rng = (s) => (s * 9301 + 49297) % 233280 / 233280;
  const nums = [];
  let s = seed;
  while (nums.length < count) {
    const num = Math.floor(rng(s) * 100) + 1;
    if (!nums.includes(num)) nums.push(num);
    s++;
  }
  return nums;
};

const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
  return true;
};

const createBalloonGames = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const SubTopic = require('./models/SubTopic');
    const balloonSubtopic = await SubTopic.findOne({ title: 'Balloon Pop Games' });
    
    if (!balloonSubtopic) {
      console.log('❌ Balloon Pop Games subtopic not found');
      process.exit(1);
    }

    await GamifiedQuestion.deleteMany({ subTopicId: balloonSubtopic._id });

    // Game 1: Easy - 5 balloons
    const easyLevels = [];
    const easyTypes = ['ascending', 'descending', 'min', 'max'];
    for (let i = 1; i <= 20; i++) {
      const balloons = generateBalloons(5, i * 100);
      const type = easyTypes[(i - 1) % 4];
      let question, answer;
      
      if (type === 'ascending') {
        question = 'Pop the balloons in ascending order';
        answer = [...balloons].sort((a, b) => a - b);
      } else if (type === 'descending') {
        question = 'Pop the balloons in descending order';
        answer = [...balloons].sort((a, b) => b - a);
      } else if (type === 'min') {
        question = 'Pop the balloon with the smallest number';
        answer = [Math.min(...balloons)];
      } else {
        question = 'Pop the balloon with the largest number';
        answer = [Math.max(...balloons)];
      }

      easyLevels.push({
        levelNumber: i,
        question,
        questionType: 'BalloonPop',
        options: [],
        correctAnswer: JSON.stringify({ balloons, answer, type }),
        pointsForLevel: 2,
        timeLimit: 30,
        hints: [{ hintNumber: 1, hintText: 'Look at the numbers carefully', pointsDeduction: 1 }],
        shuffleOptions: false
      });
    }

    const easyGame = new GamifiedQuestion({
      subTopicId: balloonSubtopic._id,
      title: 'Balloon Pop - Easy (5 Balloons)',
      description: 'Pop balloons in correct order',
      difficulty: 'Easy',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels: easyLevels,
      hasTimer: true,
      totalTimeLimit: 600,
      maxScore: 40,
      passingScore: 24,
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 300 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });
    await easyGame.save();
    console.log('✅ Easy Balloon Pop game created (5 balloons)');

    // Game 2: Medium - 7 balloons
    const mediumLevels = [];
    const mediumTypes = ['ascending', 'descending', 'even', 'odd', 'prime'];
    for (let i = 1; i <= 20; i++) {
      const balloons = generateBalloons(7, i * 200);
      const type = mediumTypes[(i - 1) % 5];
      let question, answer;
      
      if (type === 'ascending') {
        question = 'Pop the balloons in ascending order';
        answer = [...balloons].sort((a, b) => a - b);
      } else if (type === 'descending') {
        question = 'Pop the balloons in descending order';
        answer = [...balloons].sort((a, b) => b - a);
      } else if (type === 'even') {
        question = 'Pop all balloons with even numbers';
        answer = balloons.filter(n => n % 2 === 0).sort((a, b) => a - b);
      } else if (type === 'odd') {
        question = 'Pop all balloons with odd numbers';
        answer = balloons.filter(n => n % 2 !== 0).sort((a, b) => a - b);
      } else {
        question = 'Pop all balloons with prime numbers';
        answer = balloons.filter(isPrime).sort((a, b) => a - b);
      }

      mediumLevels.push({
        levelNumber: i,
        question,
        questionType: 'BalloonPop',
        options: [],
        correctAnswer: JSON.stringify({ balloons, answer, type }),
        pointsForLevel: 2,
        timeLimit: 45,
        hints: [{ hintNumber: 1, hintText: 'Think about the number properties', pointsDeduction: 1 }],
        shuffleOptions: false
      });
    }

    const mediumGame = new GamifiedQuestion({
      subTopicId: balloonSubtopic._id,
      title: 'Balloon Pop - Medium (7 Balloons)',
      description: 'Pop balloons based on number properties',
      difficulty: 'Medium',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels: mediumLevels,
      hasTimer: true,
      totalTimeLimit: 900,
      maxScore: 40,
      passingScore: 24,
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 450 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });
    await mediumGame.save();
    console.log('✅ Medium Balloon Pop game created (7 balloons)');

    // Game 3: Hard - 10 balloons
    const hardLevels = [];
    const hardTypes = ['ascending', 'descending', 'prime', 'divisibleBy3', 'perfectSquare'];
    for (let i = 1; i <= 20; i++) {
      const balloons = generateBalloons(10, i * 300);
      const type = hardTypes[(i - 1) % 5];
      let question, answer;
      
      if (type === 'ascending') {
        question = 'Pop the balloons in ascending order';
        answer = [...balloons].sort((a, b) => a - b);
      } else if (type === 'descending') {
        question = 'Pop the balloons in descending order';
        answer = [...balloons].sort((a, b) => b - a);
      } else if (type === 'prime') {
        question = 'Pop all prime number balloons in ascending order';
        answer = balloons.filter(isPrime).sort((a, b) => a - b);
      } else if (type === 'divisibleBy3') {
        question = 'Pop all balloons divisible by 3 in ascending order';
        answer = balloons.filter(n => n % 3 === 0).sort((a, b) => a - b);
      } else {
        question = 'Pop all perfect square balloons in ascending order';
        const isPerfectSquare = (n) => Math.sqrt(n) === Math.floor(Math.sqrt(n));
        answer = balloons.filter(isPerfectSquare).sort((a, b) => a - b);
      }

      hardLevels.push({
        levelNumber: i,
        question,
        questionType: 'BalloonPop',
        options: [],
        correctAnswer: JSON.stringify({ balloons, answer, type }),
        pointsForLevel: 2,
        timeLimit: 60,
        hints: [{ hintNumber: 1, hintText: 'Analyze the mathematical properties', pointsDeduction: 1 }],
        shuffleOptions: false
      });
    }

    const hardGame = new GamifiedQuestion({
      subTopicId: balloonSubtopic._id,
      title: 'Balloon Pop - Hard (10 Balloons)',
      description: 'Pop balloons with complex number patterns',
      difficulty: 'Hard',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels: hardLevels,
      hasTimer: true,
      totalTimeLimit: 1200,
      maxScore: 40,
      passingScore: 24,
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 600 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });
    await hardGame.save();
    console.log('✅ Hard Balloon Pop game created (10 balloons)');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createBalloonGames();
