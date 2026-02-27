const mongoose = require('mongoose');
require('dotenv').config();

const QuizQuestion = require('../models/QuizQuestion');

const htmlQuestions = [
  {
    title: 'What does HTML stand for?',
    language: 'HTML',
    topic: 'Basics',
    options: [
      { text: 'Hyper Text Markup Language', image: '' },
      { text: 'High Tech Modern Language', image: '' },
      { text: 'Home Tool Markup Language', image: '' },
      { text: 'Hyperlinks and Text Markup Language', image: '' }
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    tags: ['HTML', 'Basics']
  },
  {
    title: 'Which tag is used to create a hyperlink?',
    language: 'HTML',
    topic: 'Links',
    options: [
      { text: '<link>', image: '' },
      { text: '<a>', image: '' },
      { text: '<href>', image: '' },
      { text: '<hyperlink>', image: '' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['HTML', 'Links']
  },
  {
    title: 'Which tag is used to define an unordered list?',
    language: 'HTML',
    topic: 'Lists',
    options: [
      { text: '<ol>', image: '' },
      { text: '<ul>', image: '' },
      { text: '<list>', image: '' },
      { text: '<li>', image: '' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['HTML', 'Lists']
  },
  {
    title: 'What is the correct HTML element for the largest heading?',
    language: 'HTML',
    topic: 'Headings',
    options: [
      { text: '<heading>', image: '' },
      { text: '<h6>', image: '' },
      { text: '<h1>', image: '' },
      { text: '<head>', image: '' }
    ],
    correctAnswer: 2,
    difficulty: 'easy',
    tags: ['HTML', 'Headings']
  },
  {
    title: 'Which attribute specifies an alternate text for an image?',
    language: 'HTML',
    topic: 'Images',
    options: [
      { text: 'title', image: '' },
      { text: 'alt', image: '' },
      { text: 'src', image: '' },
      { text: 'text', image: '' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['HTML', 'Images']
  },
  {
    title: 'Which tag is used to create a table row?',
    language: 'HTML',
    topic: 'Tables',
    options: [
      { text: '<td>', image: '' },
      { text: '<tr>', image: '' },
      { text: '<table>', image: '' },
      { text: '<th>', image: '' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['HTML', 'Tables']
  },
  {
    title: 'Which input type is used for email addresses?',
    language: 'HTML',
    topic: 'Forms',
    options: [
      { text: 'text', image: '' },
      { text: 'email', image: '' },
      { text: 'mail', image: '' },
      { text: 'input', image: '' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['HTML', 'Forms']
  },
  {
    title: 'Which tag defines a division or section?',
    language: 'HTML',
    topic: 'Structure',
    options: [
      { text: '<section>', image: '' },
      { text: '<div>', image: '' },
      { text: '<span>', image: '' },
      { text: '<container>', image: '' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['HTML', 'Structure']
  },
  {
    title: 'Which tag is used to embed a video?',
    language: 'HTML',
    topic: 'Media',
    options: [
      { text: '<media>', image: '' },
      { text: '<movie>', image: '' },
      { text: '<video>', image: '' },
      { text: '<embed>', image: '' }
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    tags: ['HTML', 'Media']
  },
  {
    title: 'What is the correct HTML for creating a checkbox?',
    language: 'HTML',
    topic: 'Forms',
    codeSnippet: '<input type="checkbox">',
    options: [
      { text: '<input type="check">', image: '' },
      { text: '<input type="checkbox">', image: '' },
      { text: '<checkbox>', image: '' },
      { text: '<input type="box">', image: '' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['HTML', 'Forms']
  },
  {
    title: 'Which HTML5 element defines navigation links?',
    language: 'HTML',
    topic: 'Semantic HTML',
    options: [
      { text: '<navigation>', image: '' },
      { text: '<nav>', image: '' },
      { text: '<navigate>', image: '' },
      { text: '<menu>', image: '' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['HTML', 'HTML5', 'Semantic']
  },
  {
    title: 'Which attribute makes an input field required?',
    language: 'HTML',
    topic: 'Forms',
    options: [
      { text: 'validate', image: '' },
      { text: 'required', image: '' },
      { text: 'mandatory', image: '' },
      { text: 'needed', image: '' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['HTML', 'Forms']
  },
  {
    title: 'Which tag is used to define a footer for a document?',
    language: 'HTML',
    topic: 'Semantic HTML',
    options: [
      { text: '<bottom>', image: '' },
      { text: '<footer>', image: '' },
      { text: '<section>', image: '' },
      { text: '<end>', image: '' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['HTML', 'HTML5', 'Semantic']
  },
  {
    title: 'What is the correct HTML for inserting a line break?',
    language: 'HTML',
    topic: 'Text Formatting',
    options: [
      { text: '<break>', image: '' },
      { text: '<br>', image: '' },
      { text: '<lb>', image: '' },
      { text: '<newline>', image: '' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['HTML', 'Formatting']
  },
  {
    title: 'Which tag is used to define emphasized text?',
    language: 'HTML',
    topic: 'Text Formatting',
    options: [
      { text: '<italic>', image: '' },
      { text: '<i>', image: '' },
      { text: '<em>', image: '' },
      { text: '<strong>', image: '' }
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    tags: ['HTML', 'Formatting']
  },
  {
    title: 'Which attribute specifies the URL of an image?',
    language: 'HTML',
    topic: 'Images',
    options: [
      { text: 'href', image: '' },
      { text: 'src', image: '' },
      { text: 'url', image: '' },
      { text: 'link', image: '' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['HTML', 'Images']
  },
  {
    title: 'Which HTML5 element is used for audio content?',
    language: 'HTML',
    topic: 'Media',
    options: [
      { text: '<sound>', image: '' },
      { text: '<audio>', image: '' },
      { text: '<music>', image: '' },
      { text: '<mp3>', image: '' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['HTML', 'HTML5', 'Media']
  },
  {
    title: 'Which tag defines a header for a document or section?',
    language: 'HTML',
    topic: 'Semantic HTML',
    options: [
      { text: '<head>', image: '' },
      { text: '<header>', image: '' },
      { text: '<top>', image: '' },
      { text: '<section>', image: '' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['HTML', 'HTML5', 'Semantic']
  },
  {
    title: 'What is the correct HTML for creating a dropdown list?',
    language: 'HTML',
    topic: 'Forms',
    options: [
      { text: '<list>', image: '' },
      { text: '<select>', image: '' },
      { text: '<dropdown>', image: '' },
      { text: '<input type="dropdown">', image: '' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['HTML', 'Forms']
  },
  {
    title: 'Which tag is used to define a table header cell?',
    language: 'HTML',
    topic: 'Tables',
    options: [
      { text: '<td>', image: '' },
      { text: '<th>', image: '' },
      { text: '<header>', image: '' },
      { text: '<thead>', image: '' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['HTML', 'Tables']
  }
];

async function seedHTMLQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');

    // Delete all existing quiz questions
    const deleteResult = await QuizQuestion.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing quiz questions`);

    // Get first tenant and instructor
    const Tenant = require('../models/Tenant');
    const Instructor = require('../models/Instructor');
    
    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found. Please create them first.');
      process.exit(1);
    }

    // Add tenant and createdBy to all questions
    const questionsWithRefs = htmlQuestions.map(q => ({
      ...q,
      tenant: tenant._id,
      createdBy: instructor._id
    }));

    // Insert questions
    const result = await QuizQuestion.insertMany(questionsWithRefs);
    console.log(`Successfully seeded ${result.length} HTML quiz questions`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  }
}

seedHTMLQuestions();
