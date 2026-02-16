require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const textElementsQuestion = {
  title: "HTML Text Elements - Headings, Paragraphs, and Preformatted Text",
  problemStatement: "Create a webpage that demonstrates the use of headings, paragraphs, and preformatted text tags.",
  requirements: [
    "Create an h1 heading with text 'HTML Text Elements'",
    "Create a paragraph with text 'This is a regular paragraph.'",
    "Create an h2 heading with text 'Code Example'",
    "Create a pre tag containing the text 'function hello() {\\n  console.log('Hello');\\n}'",
    "Create another paragraph with text 'Preformatted text preserves spaces and line breaks.'"
  ],
  acceptanceCriteria: [
    "h1 heading exists with correct text",
    "First paragraph exists with correct text",
    "h2 heading exists with correct text",
    "Pre tag exists with the code example",
    "Second paragraph exists with correct text"
  ],
  jestTestFile: `describe('HTML Text Elements', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('h1 exists with correct text', () => {
    const h1 = document.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toBe('HTML Text Elements');
  });

  test('first paragraph exists', () => {
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBeGreaterThanOrEqual(2);
    expect(paragraphs[0].textContent).toBe('This is a regular paragraph.');
  });

  test('h2 exists with correct text', () => {
    const h2 = document.querySelector('h2');
    expect(h2).toBeTruthy();
    expect(h2.textContent).toBe('Code Example');
  });

  test('pre tag exists with code', () => {
    const pre = document.querySelector('pre');
    expect(pre).toBeTruthy();
  });

  test('second paragraph exists', () => {
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs[1]).toBeTruthy();
    expect(paragraphs[1].textContent).toBe('Preformatted text preserves spaces and line breaks.');
  });
});`,
  defaultFiles: {
    html: `<!DOCTYPE html>
<html>
<head>
  <title>HTML Text Elements</title>
</head>
<body>
  <!-- Create your text elements here -->
</body>
</html>`,
    css: '',
    js: ''
  },
  allowedFiles: ['html'],
  difficulty: 'easy',
  tags: ['HTML', 'Headings', 'Paragraph', 'Pre', 'Text Elements']
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
      ...textElementsQuestion,
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
