const mongoose = require('mongoose');
require('dotenv').config();

const GamifiedQuestion = require('./models/GamifiedQuestion');
const SubTopic = require('./models/SubTopic');

async function seedDragDropGame() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const subtopic = await SubTopic.findOne({ title: 'Drag & Drop Games' });
    
    if (!subtopic) {
      console.log('❌ Subtopic not found');
      process.exit(1);
    }

    const levels = [
      { question: 'Match animals to their habitats', items: ['Fish', 'Bird', 'Lion'], zones: ['Water', 'Sky', 'Land'], correct: { 'Fish': 'Water', 'Bird': 'Sky', 'Lion': 'Land' } },
      { question: 'Match fruits to their colors', items: ['Apple', 'Banana', 'Grape'], zones: ['Red', 'Yellow', 'Purple'], correct: { 'Apple': 'Red', 'Banana': 'Yellow', 'Grape': 'Purple' } },
      { question: 'Match shapes to their sides', items: ['Triangle', 'Square', 'Pentagon'], zones: ['3 sides', '4 sides', '5 sides'], correct: { 'Triangle': '3 sides', 'Square': '4 sides', 'Pentagon': '5 sides' } },
      { question: 'Match countries to continents', items: ['India', 'Brazil', 'France'], zones: ['Asia', 'South America', 'Europe'], correct: { 'India': 'Asia', 'Brazil': 'South America', 'France': 'Europe' } },
      { question: 'Match instruments to types', items: ['Guitar', 'Flute', 'Drum'], zones: ['String', 'Wind', 'Percussion'], correct: { 'Guitar': 'String', 'Flute': 'Wind', 'Drum': 'Percussion' } },
      { question: 'Match planets to order from sun', items: ['Earth', 'Mars', 'Venus'], zones: ['3rd', '4th', '2nd'], correct: { 'Earth': '3rd', 'Mars': '4th', 'Venus': '2nd' } },
      { question: 'Match sports to equipment', items: ['Cricket', 'Tennis', 'Football'], zones: ['Bat', 'Racket', 'Goal'], correct: { 'Cricket': 'Bat', 'Tennis': 'Racket', 'Football': 'Goal' } },
      { question: 'Match seasons to months', items: ['Summer', 'Winter', 'Spring'], zones: ['June', 'December', 'March'], correct: { 'Summer': 'June', 'Winter': 'December', 'Spring': 'March' } },
      { question: 'Match food to category', items: ['Carrot', 'Chicken', 'Apple'], zones: ['Vegetable', 'Meat', 'Fruit'], correct: { 'Carrot': 'Vegetable', 'Chicken': 'Meat', 'Apple': 'Fruit' } },
      { question: 'Match numbers to words', items: ['5', '10', '15'], zones: ['Five', 'Ten', 'Fifteen'], correct: { '5': 'Five', '10': 'Ten', '15': 'Fifteen' } },
      { question: 'Match vehicles to travel', items: ['Car', 'Boat', 'Plane'], zones: ['Road', 'Water', 'Air'], correct: { 'Car': 'Road', 'Boat': 'Water', 'Plane': 'Air' } },
      { question: 'Match colors to objects', items: ['Sun', 'Grass', 'Sky'], zones: ['Yellow', 'Green', 'Blue'], correct: { 'Sun': 'Yellow', 'Grass': 'Green', 'Sky': 'Blue' } },
      { question: 'Match body parts to senses', items: ['Eye', 'Ear', 'Nose'], zones: ['Sight', 'Hearing', 'Smell'], correct: { 'Eye': 'Sight', 'Ear': 'Hearing', 'Nose': 'Smell' } },
      { question: 'Match materials to state', items: ['Ice', 'Water', 'Steam'], zones: ['Solid', 'Liquid', 'Gas'], correct: { 'Ice': 'Solid', 'Water': 'Liquid', 'Steam': 'Gas' } },
      { question: 'Match baby animals to adults', items: ['Puppy', 'Kitten', 'Calf'], zones: ['Dog', 'Cat', 'Cow'], correct: { 'Puppy': 'Dog', 'Kitten': 'Cat', 'Calf': 'Cow' } },
      { question: 'Match weather to season', items: ['Snow', 'Rain', 'Heat'], zones: ['Winter', 'Monsoon', 'Summer'], correct: { 'Snow': 'Winter', 'Rain': 'Monsoon', 'Heat': 'Summer' } },
      { question: 'Match time to activity', items: ['Morning', 'Afternoon', 'Night'], zones: ['Breakfast', 'Lunch', 'Dinner'], correct: { 'Morning': 'Breakfast', 'Afternoon': 'Lunch', 'Night': 'Dinner' } },
      { question: 'Match symbols to meaning', items: ['+', '-', '×'], zones: ['Add', 'Subtract', 'Multiply'], correct: { '+': 'Add', '-': 'Subtract', '×': 'Multiply' } },
      { question: 'Match directions to arrows', items: ['North', 'South', 'East'], zones: ['↑', '↓', '→'], correct: { 'North': '↑', 'South': '↓', 'East': '→' } },
      { question: 'Match emotions to faces', items: ['Happy', 'Sad', 'Angry'], zones: ['😊', '😢', '😠'], correct: { 'Happy': '😊', 'Sad': '😢', 'Angry': '😠' } }
    ];

    const dragDropGame = {
      subTopicId: subtopic._id,
      title: 'Match Master',
      description: 'Drag items to correct drop zones',
      difficulty: 'Medium',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      hasTimer: true,
      totalTimeLimit: 1200,
      maxScore: 40,
      passingScore: 24,
      levels: levels.map((level, i) => ({
        levelNumber: i + 1,
        question: level.question,
        questionType: 'DragDrop',
        correctAnswer: JSON.stringify(level),
        hints: [{ hintNumber: 1, hintText: 'Think about the logical connection', pointsDeduction: 1 }],
        pointsForLevel: 2,
        shuffleOptions: false
      })),
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 300 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      tags: ['drag-drop', 'matching', 'interactive'],
      isActive: true
    };

    await GamifiedQuestion.create(dragDropGame);
    console.log('✅ Drag & Drop Game seeded successfully!');
    console.log(`Game: ${dragDropGame.title}`);
    console.log(`Levels: ${dragDropGame.totalLevels}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedDragDropGame();
