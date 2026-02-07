const mongoose = require('mongoose');
const GamifiedQuestion = require('./models/GamifiedQuestion');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI;

const orderingQuestions = [
  { question: 'Arrange in correct order:', items: ['Egg', 'Chick', 'Chicken'] },
  { question: 'Arrange in correct order:', items: ['Seed', 'Sapling', 'Tree'] },
  { question: 'Arrange in correct order:', items: ['Baby', 'Child', 'Adult'] },
  { question: 'Arrange in correct order:', items: ['Morning', 'Afternoon', 'Evening'] },
  { question: 'Arrange in correct order:', items: ['Spring', 'Summer', 'Autumn'] },
  { question: 'Arrange in correct order:', items: ['Caterpillar', 'Cocoon', 'Butterfly'] },
  { question: 'Arrange in correct order:', items: ['Flour', 'Dough', 'Bread'] },
  { question: 'Arrange in correct order:', items: ['Clouds', 'Rain', 'Rainbow'] },
  { question: 'Arrange in correct order:', items: ['Tadpole', 'Froglet', 'Frog'] },
  { question: 'Arrange in correct order:', items: ['Bud', 'Flower', 'Fruit'] },
  { question: 'Arrange in correct order:', items: ['Milk', 'Curd', 'Cheese'] },
  { question: 'Arrange in correct order:', items: ['Ice', 'Water', 'Steam'] },
  { question: 'Arrange in correct order:', items: ['Grape', 'Juice', 'Wine'] },
  { question: 'Arrange in correct order:', items: ['Clay', 'Mold', 'Pottery'] },
  { question: 'Arrange in correct order:', items: ['Calf', 'Heifer', 'Cow'] },
  { question: 'Arrange in correct order:', items: ['Puppy', 'Young Dog', 'Dog'] },
  { question: 'Arrange in correct order:', items: ['Kitten', 'Young Cat', 'Cat'] },
  { question: 'Arrange in correct order:', items: ['Lamb', 'Yearling', 'Sheep'] },
  { question: 'Arrange in correct order:', items: ['Acorn', 'Seedling', 'Oak Tree'] },
  { question: 'Arrange in correct order:', items: ['Coal', 'Pressure', 'Diamond'] }
];

const orderingQuestions5 = [
  { question: 'Arrange in correct order:', items: ['Infant', 'Toddler', 'Child', 'Teenager', 'Adult'] },
  { question: 'Arrange in correct order:', items: ['Dawn', 'Morning', 'Noon', 'Evening', 'Night'] },
  { question: 'Arrange in correct order:', items: ['Seed', 'Sprout', 'Sapling', 'Tree', 'Old Tree'] },
  { question: 'Arrange in correct order:', items: ['Winter', 'Spring', 'Summer', 'Autumn', 'Winter'] },
  { question: 'Arrange in correct order:', items: ['Egg', 'Larva', 'Pupa', 'Chrysalis', 'Butterfly'] },
  { question: 'Arrange in correct order:', items: ['Grain', 'Flour', 'Dough', 'Baked', 'Bread'] },
  { question: 'Arrange in correct order:', items: ['Evaporation', 'Condensation', 'Cloud', 'Rain', 'Collection'] },
  { question: 'Arrange in correct order:', items: ['Newborn', 'Infant', 'Baby', 'Toddler', 'Child'] },
  { question: 'Arrange in correct order:', items: ['Bud', 'Bloom', 'Flower', 'Pollination', 'Fruit'] },
  { question: 'Arrange in correct order:', items: ['Milk', 'Cream', 'Butter', 'Ghee', 'Clarified'] },
  { question: 'Arrange in correct order:', items: ['Solid', 'Melting', 'Liquid', 'Boiling', 'Gas'] },
  { question: 'Arrange in correct order:', items: ['Grape', 'Crush', 'Juice', 'Ferment', 'Wine'] },
  { question: 'Arrange in correct order:', items: ['Clay', 'Shape', 'Mold', 'Dry', 'Pottery'] },
  { question: 'Arrange in correct order:', items: ['Calf', 'Yearling', 'Heifer', 'Pregnant', 'Cow'] },
  { question: 'Arrange in correct order:', items: ['Puppy', 'Young', 'Adolescent', 'Adult', 'Senior Dog'] },
  { question: 'Arrange in correct order:', items: ['Kitten', 'Young', 'Junior', 'Adult', 'Senior Cat'] },
  { question: 'Arrange in correct order:', items: ['Lamb', 'Hogget', 'Yearling', 'Two-tooth', 'Sheep'] },
  { question: 'Arrange in correct order:', items: ['Acorn', 'Germinate', 'Seedling', 'Sapling', 'Oak Tree'] },
  { question: 'Arrange in correct order:', items: ['Carbon', 'Pressure', 'Heat', 'Crystal', 'Diamond'] },
  { question: 'Arrange in correct order:', items: ['Tadpole', 'Legs', 'Froglet', 'Tail Loss', 'Frog'] }
];

const orderingQuestions7 = [
  { question: 'Arrange in correct order:', items: ['Newborn', 'Infant', 'Toddler', 'Child', 'Teenager', 'Adult', 'Senior'] },
  { question: 'Arrange in correct order:', items: ['Midnight', 'Dawn', 'Morning', 'Noon', 'Afternoon', 'Evening', 'Night'] },
  { question: 'Arrange in correct order:', items: ['Seed', 'Germinate', 'Sprout', 'Sapling', 'Young Tree', 'Mature Tree', 'Old Tree'] },
  { question: 'Arrange in correct order:', items: ['January', 'March', 'May', 'July', 'September', 'November', 'December'] },
  { question: 'Arrange in correct order:', items: ['Egg', 'Larva', 'Pupa', 'Chrysalis', 'Emerge', 'Butterfly', 'Mate'] },
  { question: 'Arrange in correct order:', items: ['Harvest', 'Grain', 'Mill', 'Flour', 'Dough', 'Bake', 'Bread'] },
  { question: 'Arrange in correct order:', items: ['Ocean', 'Evaporation', 'Cloud', 'Rain', 'River', 'Lake', 'Ocean'] },
  { question: 'Arrange in correct order:', items: ['Birth', 'Crawl', 'Walk', 'Run', 'Jump', 'Climb', 'Dance'] },
  { question: 'Arrange in correct order:', items: ['Bud', 'Bloom', 'Open', 'Pollinate', 'Fertilize', 'Fruit', 'Seed'] },
  { question: 'Arrange in correct order:', items: ['Milk', 'Separate', 'Cream', 'Churn', 'Butter', 'Heat', 'Ghee'] },
  { question: 'Arrange in correct order:', items: ['Ice', 'Melt', 'Water', 'Heat', 'Boil', 'Steam', 'Condense'] },
  { question: 'Arrange in correct order:', items: ['Grape', 'Harvest', 'Crush', 'Juice', 'Ferment', 'Age', 'Wine'] },
  { question: 'Arrange in correct order:', items: ['Mine', 'Clay', 'Clean', 'Shape', 'Dry', 'Fire', 'Pottery'] },
  { question: 'Arrange in correct order:', items: ['Birth', 'Calf', 'Yearling', 'Heifer', 'Breed', 'Pregnant', 'Cow'] },
  { question: 'Arrange in correct order:', items: ['Birth', 'Puppy', 'Young', 'Adolescent', 'Adult', 'Mature', 'Senior'] },
  { question: 'Arrange in correct order:', items: ['Birth', 'Kitten', 'Young', 'Junior', 'Adult', 'Mature', 'Senior'] },
  { question: 'Arrange in correct order:', items: ['Birth', 'Lamb', 'Hogget', 'Yearling', 'Two-tooth', 'Adult', 'Sheep'] },
  { question: 'Arrange in correct order:', items: ['Fall', 'Acorn', 'Germinate', 'Seedling', 'Sapling', 'Young', 'Oak'] },
  { question: 'Arrange in correct order:', items: ['Carbon', 'Bury', 'Pressure', 'Heat', 'Crystal', 'Form', 'Diamond'] },
  { question: 'Arrange in correct order:', items: ['Egg', 'Tadpole', 'Legs', 'Arms', 'Froglet', 'Tail Loss', 'Frog'] }
];

const createOrderingGame = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const SubTopic = require('./models/SubTopic');
    const orderingSubtopic = await SubTopic.findOne({ title: 'Ordering Games' });
    
    if (!orderingSubtopic) {
      console.log('❌ Ordering Games subtopic not found');
      process.exit(1);
    }

    await GamifiedQuestion.deleteMany({ title: { $in: ['Sequence Master', 'Advanced Sequence Master', 'Expert Sequence Master'] } });

    // Create 3-item ordering game
    const levels3 = orderingQuestions.map((q, i) => ({
      levelNumber: i + 1,
      question: q.question,
      questionType: 'Ordering',
      options: q.items.map((item, idx) => ({ id: String.fromCharCode(65 + idx), text: item, isCorrect: false })),
      correctAnswer: JSON.stringify(q.items),
      pointsForLevel: 2,
      timeLimit: 30,
      hints: [{ hintNumber: 1, hintText: 'Think about the natural progression', pointsDeduction: 1 }],
      shuffleOptions: false
    }));

    const orderingGame3 = new GamifiedQuestion({
      subTopicId: orderingSubtopic._id,
      title: 'Sequence Master',
      description: 'Arrange 3 items in correct chronological order',
      difficulty: 'Easy',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels: levels3,
      hasTimer: true,
      totalTimeLimit: 600,
      maxScore: 40,
      passingScore: 24,
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 300 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });

    await orderingGame3.save();
    console.log('✅ 3-item ordering game created');

    // Create 5-item ordering game
    const levels5 = orderingQuestions5.map((q, i) => ({
      levelNumber: i + 1,
      question: q.question,
      questionType: 'Ordering',
      options: q.items.map((item, idx) => ({ id: String.fromCharCode(65 + idx), text: item, isCorrect: false })),
      correctAnswer: JSON.stringify(q.items),
      pointsForLevel: 3,
      timeLimit: 45,
      hints: [{ hintNumber: 1, hintText: 'Think about the natural progression', pointsDeduction: 1 }],
      shuffleOptions: false
    }));

    const orderingGame5 = new GamifiedQuestion({
      subTopicId: orderingSubtopic._id,
      title: 'Advanced Sequence Master',
      description: 'Arrange 5 items in correct chronological order',
      difficulty: 'Hard',
      points: 60,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels: levels5,
      hasTimer: true,
      totalTimeLimit: 900,
      maxScore: 60,
      passingScore: 36,
      speedBonus: { enabled: true, maxBonus: 30, timeThreshold: 450 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });

    await orderingGame5.save();
    console.log('✅ 5-item ordering game created');

    // Create 7-item ordering game
    const levels7 = orderingQuestions7.map((q, i) => ({
      levelNumber: i + 1,
      question: q.question,
      questionType: 'Ordering',
      options: q.items.map((item, idx) => ({ id: String.fromCharCode(65 + idx), text: item, isCorrect: false })),
      correctAnswer: JSON.stringify(q.items),
      pointsForLevel: 4,
      timeLimit: 60,
      hints: [{ hintNumber: 1, hintText: 'Think about the natural progression', pointsDeduction: 1 }],
      shuffleOptions: false
    }));

    const orderingGame7 = new GamifiedQuestion({
      subTopicId: orderingSubtopic._id,
      title: 'Expert Sequence Master',
      description: 'Arrange 7 items in correct chronological order',
      difficulty: 'Hard',
      points: 80,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      levels: levels7,
      hasTimer: true,
      totalTimeLimit: 1200,
      maxScore: 80,
      passingScore: 48,
      speedBonus: { enabled: true, maxBonus: 40, timeThreshold: 600 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      isActive: true
    });

    await orderingGame7.save();
    console.log('✅ 7-item ordering game created');
    console.log('\nAll 3 ordering games created successfully');
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createOrderingGame();
