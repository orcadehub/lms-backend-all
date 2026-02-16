require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const headingsQuestion = {
  title: "HTML Headings",
  problemStatement: "Create a webpage that demonstrates all six HTML heading levels (h1 to h6) with appropriate content.",
  requirements: [
    "Create an h1 heading with text 'Main Title'",
    "Create an h2 heading with text 'Section Heading'",
    "Create an h3 heading with text 'Subsection Heading'",
    "Create an h4 heading with text 'Minor Heading'",
    "Create an h5 heading with text 'Small Heading'",
    "Create an h6 heading with text 'Smallest Heading'"
  ],
  acceptanceCriteria: [
    "All six heading tags (h1-h6) exist in the document",
    "Each heading contains the exact text specified",
    "Headings are in sequential order (h1, h2, h3, h4, h5, h6)"
  ],
  jestTestFile: `describe('HTML Headings', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('h1 exists with correct text', () => {
    const h1 = document.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toBe('Main Title');
  });

  test('h2 exists with correct text', () => {
    const h2 = document.querySelector('h2');
    expect(h2).toBeTruthy();
    expect(h2.textContent).toBe('Section Heading');
  });

  test('h3 exists with correct text', () => {
    const h3 = document.querySelector('h3');
    expect(h3).toBeTruthy();
    expect(h3.textContent).toBe('Subsection Heading');
  });

  test('h4 exists with correct text', () => {
    const h4 = document.querySelector('h4');
    expect(h4).toBeTruthy();
    expect(h4.textContent).toBe('Minor Heading');
  });

  test('h5 exists with correct text', () => {
    const h5 = document.querySelector('h5');
    expect(h5).toBeTruthy();
    expect(h5.textContent).toBe('Small Heading');
  });

  test('h6 exists with correct text', () => {
    const h6 = document.querySelector('h6');
    expect(h6).toBeTruthy();
    expect(h6.textContent).toBe('Smallest Heading');
  });
});`,
  defaultFiles: {
    html: `<!DOCTYPE html>
<html>
<head>
  <title>HTML Headings</title>
</head>
<body>
  <!-- Create your headings here -->
</body>
</html>`,
    css: '',
    js: ''
  },
  allowedFiles: ['html'],
  difficulty: 'easy',
  tags: ['HTML', 'Headings', 'Basics']
};

async function seedQuestion() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    const question = await FrontendQuestion.create({
      ...headingsQuestion,
      tenant: tenant._id,
      createdBy: instructor._id
    });

    console.log('Created question:', question.title);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedQuestion();
