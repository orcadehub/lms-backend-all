const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const htmlQuestions = [
  {
    title: "What is the purpose of the 'async' attribute in a <script> tag?",
    language: "html",
    topic: "HTML",
    options: [{text: "Loads script synchronously"}, {text: "Downloads script in parallel, executes when ready"}, {text: "Delays script execution"}, {text: "Prevents script from loading"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which HTML5 element is used to define navigation links?",
    language: "html",
    topic: "HTML",
    options: [{text: "<navigation>"}, {text: "<nav>"}, {text: "<menu>"}, {text: "<links>"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the 'novalidate' attribute do in a <form> tag?",
    language: "html",
    topic: "HTML",
    options: [{text: "Removes all form fields"}, {text: "Disables HTML5 form validation"}, {text: "Prevents form submission"}, {text: "Validates form on server only"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which attribute specifies that an input field must be filled before submitting?",
    language: "html",
    topic: "HTML",
    options: [{text: "mandatory"}, {text: "required"}, {text: "validate"}, {text: "must-fill"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the correct HTML for creating a checkbox?",
    language: "html",
    topic: "HTML",
    options: [{text: "<input type='check'>"}, {text: "<input type='checkbox'>"}, {text: "<checkbox>"}, {text: "<check>"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which element represents the result of a calculation?",
    language: "html",
    topic: "HTML",
    options: [{text: "<result>"}, {text: "<output>"}, {text: "<calc>"}, {text: "<compute>"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the 'spellcheck' attribute do?",
    language: "html",
    topic: "HTML",
    options: [{text: "Checks HTML syntax"}, {text: "Enables/disables spell checking for element"}, {text: "Validates form input"}, {text: "Corrects spelling automatically"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which input type creates a slider control?",
    language: "html",
    topic: "HTML",
    options: [{text: "type='slider'"}, {text: "type='range'"}, {text: "type='scroll'"}, {text: "type='bar'"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the purpose of the <figure> element?",
    language: "html",
    topic: "HTML",
    options: [{text: "Creates mathematical figures"}, {text: "Groups media content with caption"}, {text: "Displays numbers"}, {text: "Creates charts"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which attribute makes a text input accept only email format?",
    language: "html",
    topic: "HTML",
    options: [{text: "format='email'"}, {text: "type='email'"}, {text: "validate='email'"}, {text: "pattern='email'"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the 'hidden' attribute do?",
    language: "html",
    topic: "HTML",
    options: [{text: "Makes element transparent"}, {text: "Hides element from display and screen readers"}, {text: "Encrypts element content"}, {text: "Removes element from DOM"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which element defines a section that contains contact information?",
    language: "html",
    topic: "HTML",
    options: [{text: "<contact>"}, {text: "<address>"}, {text: "<info>"}, {text: "<details>"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the purpose of the 'autocomplete' attribute?",
    language: "html",
    topic: "HTML",
    options: [{text: "Completes code automatically"}, {text: "Enables/disables browser autocomplete for forms"}, {text: "Validates input automatically"}, {text: "Fills forms with default values"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which element is used to define keyboard input?",
    language: "html",
    topic: "HTML",
    options: [{text: "<keyboard>"}, {text: "<kbd>"}, {text: "<key>"}, {text: "<input>"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the 'draggable' attribute do?",
    language: "html",
    topic: "HTML",
    options: [{text: "Makes element scrollable"}, {text: "Enables drag and drop for element"}, {text: "Makes element movable"}, {text: "Allows element resizing"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which element represents a progress bar?",
    language: "html",
    topic: "HTML",
    options: [{text: "<bar>"}, {text: "<progress>"}, {text: "<loading>"}, {text: "<status>"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the purpose of the <time> element?",
    language: "html",
    topic: "HTML",
    options: [{text: "Displays current time"}, {text: "Represents date/time in machine-readable format"}, {text: "Creates timer"}, {text: "Sets timezone"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which attribute specifies the character encoding for an HTML document?",
    language: "html",
    topic: "HTML",
    options: [{text: "encoding"}, {text: "charset"}, {text: "char-set"}, {text: "encode"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the <details> element do?",
    language: "html",
    topic: "HTML",
    options: [{text: "Shows detailed information"}, {text: "Creates collapsible content widget"}, {text: "Displays metadata"}, {text: "Shows element properties"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which element is used to define sample output from a program?",
    language: "html",
    topic: "HTML",
    options: [{text: "<output>"}, {text: "<samp>"}, {text: "<code>"}, {text: "<pre>"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedHTMLQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const insertedQuestions = await QuizQuestion.insertMany(htmlQuestions);
    console.log(`Inserted ${insertedQuestions.length} HTML quiz questions`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding HTML questions:', error);
    process.exit(1);
  }
}

seedHTMLQuestions();
