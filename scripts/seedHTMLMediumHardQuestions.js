const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const htmlQuestions = [
  {
    title: "Which HTML5 semantic element should be used for a self-contained composition that could be independently distributed?",
    language: "html",
    topic: "HTML",
    options: [{text: "<section>"}, {text: "<article>"}, {text: "<aside>"}, {text: "<div>"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the correct way to make a text input field required and limit it to 10 characters?",
    language: "html",
    topic: "HTML",
    options: [{text: "<input type='text' required length='10'>"}, {text: "<input type='text' required maxlength='10'>"}, {text: "<input type='text' mandatory max='10'>"}, {text: "<input type='text' validate='required' size='10'>"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which attribute is used to specify that a video should start playing as soon as it is ready?",
    language: "html",
    topic: "HTML",
    options: [{text: "autostart"}, {text: "autoplay"}, {text: "play"}, {text: "start"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the 'defer' attribute do when used in a <script> tag?",
    language: "html",
    topic: "HTML",
    options: [{text: "Delays script execution by 5 seconds"}, {text: "Executes script after page is parsed"}, {text: "Prevents script from executing"}, {text: "Loads script asynchronously"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which input type provides a color picker interface?",
    language: "html",
    topic: "HTML",
    options: [{text: "type='picker'"}, {text: "type='color'"}, {text: "type='palette'"}, {text: "type='rgb'"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the purpose of the <datalist> element?",
    language: "html",
    topic: "HTML",
    options: [{text: "Creates a dropdown list"}, {text: "Provides autocomplete suggestions for input"}, {text: "Stores data in browser"}, {text: "Displays tabular data"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which meta tag is essential for responsive web design?",
    language: "html",
    topic: "HTML",
    options: [{text: "<meta name='responsive' content='true'>"}, {text: "<meta name='viewport' content='width=device-width'>"}, {text: "<meta name='screen' content='mobile'>"}, {text: "<meta name='device' content='responsive'>"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the 'contenteditable' attribute do?",
    language: "html",
    topic: "HTML",
    options: [{text: "Makes element draggable"}, {text: "Allows user to edit element content"}, {text: "Enables copy-paste"}, {text: "Makes element selectable"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which element is used to define a description list?",
    language: "html",
    topic: "HTML",
    options: [{text: "<dl>"}, {text: "<desc>"}, {text: "<list>"}, {text: "<define>"}],
    correctAnswer: 0,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the correct way to embed an SVG directly in HTML5?",
    language: "html",
    topic: "HTML",
    options: [{text: "<img src='image.svg'>"}, {text: "<svg>...</svg>"}, {text: "<embed type='svg'>...</embed>"}, {text: "Both A and B"}],
    correctAnswer: 3,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which attribute makes an input field accept only numbers within a range?",
    language: "html",
    topic: "HTML",
    options: [{text: "type='number' range='1-100'"}, {text: "type='number' min='1' max='100'"}, {text: "type='range' values='1-100'"}, {text: "type='numeric' limit='1,100'"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the 'preload' attribute in <video> tag do?",
    language: "html",
    topic: "HTML",
    options: [{text: "Plays video before page loads"}, {text: "Specifies if/how video should be loaded on page load"}, {text: "Loads video in background"}, {text: "Caches video permanently"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which element represents a scalar measurement within a known range?",
    language: "html",
    topic: "HTML",
    options: [{text: "<progress>"}, {text: "<meter>"}, {text: "<gauge>"}, {text: "<measure>"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the purpose of the 'aria-label' attribute?",
    language: "html",
    topic: "HTML",
    options: [{text: "Creates a visible label"}, {text: "Provides accessible name for screen readers"}, {text: "Adds tooltip text"}, {text: "Links to label element"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which element is used to define a container for external application or interactive content?",
    language: "html",
    topic: "HTML",
    options: [{text: "<object>"}, {text: "<embed>"}, {text: "<iframe>"}, {text: "All of the above"}],
    correctAnswer: 3,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the 'download' attribute do in an <a> tag?",
    language: "html",
    topic: "HTML",
    options: [{text: "Downloads file automatically"}, {text: "Prompts user to download instead of navigate"}, {text: "Enables right-click download"}, {text: "Compresses file before download"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which element should be used to mark text that is highlighted for reference purposes?",
    language: "html",
    topic: "HTML",
    options: [{text: "<highlight>"}, {text: "<mark>"}, {text: "<em>"}, {text: "<strong>"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the correct way to specify multiple video formats for cross-browser compatibility?",
    language: "html",
    topic: "HTML",
    options: [{text: "Multiple <video> tags"}, {text: "Multiple <source> tags inside <video>"}, {text: "Comma-separated src attribute"}, {text: "Use formats attribute"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which attribute specifies the relationship between current document and linked document?",
    language: "html",
    topic: "HTML",
    options: [{text: "relation"}, {text: "rel"}, {text: "link"}, {text: "type"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the <template> element do?",
    language: "html",
    topic: "HTML",
    options: [{text: "Creates page layout"}, {text: "Holds HTML that won't render until activated by JavaScript"}, {text: "Defines reusable CSS"}, {text: "Creates form template"}],
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

    await QuizQuestion.deleteMany({ topic: 'HTML', difficulty: { $in: ['medium', 'hard'] } });
    console.log('Deleted existing medium/hard HTML quiz questions');

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
