require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const htmlQuestion = {
  title: "Create a Simple Profile Card",
  problemStatement: "Build a profile card with an image, name, title, and description using only HTML.",
  requirements: [
    "Create a div with class='profile-card'",
    "Add an img tag with src='profile.jpg' and alt='Profile Picture'",
    "Add an h2 tag with the name 'John Doe'",
    "Add a p tag with class='title' containing 'Software Engineer'",
    "Add a p tag with class='description' containing a brief bio"
  ],
  acceptanceCriteria: [
    "Profile card div exists with correct class",
    "Image tag exists with correct attributes",
    "Name heading exists with correct text",
    "Title paragraph exists with correct class",
    "Description paragraph exists with correct class"
  ],
  jestTestFile: `describe('Simple Profile Card', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('profile card exists', () => {
    const card = document.querySelector('.profile-card');
    expect(card).toBeTruthy();
  });

  test('image exists with correct attributes', () => {
    const img = document.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('profile.jpg');
    expect(img.getAttribute('alt')).toBe('Profile Picture');
  });

  test('name heading exists', () => {
    const heading = document.querySelector('h2');
    expect(heading).toBeTruthy();
    expect(heading.textContent).toBe('John Doe');
  });

  test('title paragraph exists', () => {
    const title = document.querySelector('.title');
    expect(title).toBeTruthy();
    expect(title.textContent).toBe('Software Engineer');
  });

  test('description paragraph exists', () => {
    const desc = document.querySelector('.description');
    expect(desc).toBeTruthy();
  });
});`,
  defaultFiles: {
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Profile Card</title>
</head>
<body>
  <!-- Create your profile card here -->
</body>
</html>`,
    css: '',
    js: ''
  },
  allowedFiles: ['html'],
  difficulty: 'easy',
  tags: ['HTML', 'Basics']
};

async function seedHTMLQuestion() {
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
      ...htmlQuestion,
      tenant: tenant._id,
      createdBy: instructor._id
    });

    console.log('Created HTML question:', question.title);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedHTMLQuestion();
