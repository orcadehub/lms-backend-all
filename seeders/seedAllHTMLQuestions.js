require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const htmlQuestions = [
  // Introduction to HTML
  {
    title: "HTML Basic Structure",
    problemStatement: "Create a basic HTML document with proper structure including DOCTYPE, html, head, and body tags.",
    requirements: [
      "Add DOCTYPE declaration",
      "Create html tag with lang='en'",
      "Add head section with title 'My First Page'",
      "Add body section with h1 'Welcome to HTML'",
      "Add a paragraph with text 'This is my first webpage.'"
    ],
    acceptanceCriteria: [
      "DOCTYPE exists",
      "html tag has lang attribute",
      "title tag exists in head",
      "h1 exists in body",
      "paragraph exists in body"
    ],
    expectedOutput: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>My First Page</title>
  <style>body{font-family:Arial;padding:20px;background:#f5f5f5;}h1{color:#1976d2;}</style>
</head>
<body>
  <h1>Welcome to HTML</h1>
  <p>This is my first webpage.</p>
</body>
</html>`,
    jestTestFile: `describe('HTML Basic Structure', () => {
  test('DOCTYPE exists', () => {
    expect(window.__HTML__.toLowerCase()).toContain('<!doctype html>');
  });
  test('html tag has lang attribute', () => {
    expect(window.__HTML__).toMatch(/<html[^>]*lang=['"]en['"]/i);
  });
  test('title exists', () => {
    const title = document.querySelector('title');
    expect(title).toBeTruthy();
    expect(title.textContent).toBe('My First Page');
  });
  test('h1 exists', () => {
    const h1 = document.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toBe('Welcome to HTML');
  });
  test('paragraph exists', () => {
    const p = document.querySelector('p');
    expect(p).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: ''
    },
    allowedFiles: ['html'],
    difficulty: 'easy',
    tags: ['HTML', 'Structure', 'Basics']
  },
  
  // Links
  {
    title: "HTML Links - Anchor Tags",
    problemStatement: "Create different types of links including external, internal, and email links.",
    requirements: [
      "Create a link to 'https://www.google.com' with text 'Visit Google'",
      "Create a link with href='#section1' and text 'Go to Section 1'",
      "Create an email link to 'contact@example.com' with text 'Email Us'",
      "Create a link that opens in new tab to 'https://www.github.com' with text 'GitHub'"
    ],
    acceptanceCriteria: [
      "External link exists with correct href",
      "Internal anchor link exists",
      "Email link uses mailto protocol",
      "New tab link has target='_blank'"
    ],
    expectedOutput: `<div style="padding:20px;font-family:Arial;">
  <a href="https://www.google.com" style="color:#1976d2;margin:10px;display:block;">Visit Google</a>
  <a href="#section1" style="color:#1976d2;margin:10px;display:block;">Go to Section 1</a>
  <a href="mailto:contact@example.com" style="color:#1976d2;margin:10px;display:block;">Email Us</a>
  <a href="https://www.github.com" target="_blank" style="color:#1976d2;margin:10px;display:block;">GitHub</a>
</div>`,
    jestTestFile: `describe('HTML Links', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });
  test('external link exists', () => {
    const links = document.querySelectorAll('a');
    const googleLink = Array.from(links).find(a => a.href.includes('google.com'));
    expect(googleLink).toBeTruthy();
  });
  test('internal anchor exists', () => {
    const links = document.querySelectorAll('a');
    const anchorLink = Array.from(links).find(a => a.getAttribute('href') === '#section1');
    expect(anchorLink).toBeTruthy();
  });
  test('email link exists', () => {
    const links = document.querySelectorAll('a');
    const emailLink = Array.from(links).find(a => a.href.includes('mailto:'));
    expect(emailLink).toBeTruthy();
  });
  test('new tab link exists', () => {
    const links = document.querySelectorAll('a');
    const newTabLink = Array.from(links).find(a => a.target === '_blank');
    expect(newTabLink).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: ''
    },
    allowedFiles: ['html'],
    difficulty: 'easy',
    tags: ['HTML', 'Links', 'Anchor']
  },

  // Media
  {
    title: "HTML Media - Images and Videos",
    problemStatement: "Add images and videos to a webpage with proper attributes.",
    requirements: [
      "Add an img tag with src='logo.png' and alt='Company Logo'",
      "Add an img with width='300' and height='200'",
      "Add a video tag with src='video.mp4' and controls attribute",
      "Add an audio tag with src='audio.mp3' and controls attribute"
    ],
    acceptanceCriteria: [
      "Image with alt text exists",
      "Image with dimensions exists",
      "Video with controls exists",
      "Audio with controls exists"
    ],
    expectedOutput: `<div style="padding:20px;font-family:Arial;background:#f5f5f5;">
  <img src="https://via.placeholder.com/150" alt="Company Logo" style="margin:10px;border-radius:8px;">
  <img src="https://via.placeholder.com/300x200" width="300" height="200" style="margin:10px;border-radius:8px;">
  <video controls style="width:300px;margin:10px;border-radius:8px;">
    <source src="video.mp4" type="video/mp4">
  </video>
  <audio controls style="margin:10px;">
    <source src="audio.mp3" type="audio/mp3">
  </audio>
</div>`,
    jestTestFile: `describe('HTML Media', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });
  test('image with alt exists', () => {
    const imgs = document.querySelectorAll('img');
    const logoImg = Array.from(imgs).find(img => img.alt === 'Company Logo');
    expect(logoImg).toBeTruthy();
  });
  test('image with dimensions exists', () => {
    const imgs = document.querySelectorAll('img');
    const sizedImg = Array.from(imgs).find(img => img.width === 300);
    expect(sizedImg).toBeTruthy();
  });
  test('video with controls exists', () => {
    const video = document.querySelector('video[controls]');
    expect(video).toBeTruthy();
  });
  test('audio with controls exists', () => {
    const audio = document.querySelector('audio[controls]');
    expect(audio).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: ''
    },
    allowedFiles: ['html'],
    difficulty: 'easy',
    tags: ['HTML', 'Media', 'Images', 'Video', 'Audio']
  },

  // Lists
  {
    title: "HTML Lists - Ordered and Unordered",
    problemStatement: "Create ordered and unordered lists with multiple items.",
    requirements: [
      "Create an unordered list with 3 items: 'Apple', 'Banana', 'Orange'",
      "Create an ordered list with 3 items: 'First', 'Second', 'Third'",
      "Create a nested list inside the first unordered list item"
    ],
    acceptanceCriteria: [
      "Unordered list exists with 3 items",
      "Ordered list exists with 3 items",
      "Nested list exists"
    ],
    expectedOutput: `<div style="padding:20px;font-family:Arial;">
  <h3>Unordered List:</h3>
  <ul style="line-height:1.8;">
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
  </ul>
  <h3>Ordered List:</h3>
  <ol style="line-height:1.8;">
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
  </ol>
</div>`,
    jestTestFile: `describe('HTML Lists', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });
  test('unordered list exists', () => {
    const ul = document.querySelector('ul');
    expect(ul).toBeTruthy();
    expect(ul.querySelectorAll('li').length).toBeGreaterThanOrEqual(3);
  });
  test('ordered list exists', () => {
    const ol = document.querySelector('ol');
    expect(ol).toBeTruthy();
    expect(ol.querySelectorAll('li').length).toBeGreaterThanOrEqual(3);
  });
  test('nested list exists', () => {
    const nestedList = document.querySelector('ul li ul, ul li ol');
    expect(nestedList).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: ''
    },
    allowedFiles: ['html'],
    difficulty: 'easy',
    tags: ['HTML', 'Lists', 'UL', 'OL']
  },

  // Forms
  {
    title: "HTML Forms - Basic Input Types",
    problemStatement: "Create a form with various input types including text, email, password, and submit button.",
    requirements: [
      "Create a form with action='/submit' and method='post'",
      "Add text input with name='username' and placeholder='Enter username'",
      "Add email input with name='email' and required attribute",
      "Add password input with name='password'",
      "Add submit button with text 'Submit'"
    ],
    acceptanceCriteria: [
      "Form exists with correct action and method",
      "Text input exists",
      "Email input exists with required",
      "Password input exists",
      "Submit button exists"
    ],
    expectedOutput: `<div style="padding:20px;font-family:Arial;background:#f5f5f5;">
  <form style="max-width:400px;background:white;padding:20px;border-radius:8px;">
    <input type="text" name="username" placeholder="Enter username" style="width:100%;padding:10px;margin:10px 0;border:1px solid #ddd;border-radius:4px;">
    <input type="email" name="email" required placeholder="Email" style="width:100%;padding:10px;margin:10px 0;border:1px solid #ddd;border-radius:4px;">
    <input type="password" name="password" placeholder="Password" style="width:100%;padding:10px;margin:10px 0;border:1px solid #ddd;border-radius:4px;">
    <button type="submit" style="background:#1976d2;color:white;padding:10px 20px;border:none;border-radius:4px;cursor:pointer;">Submit</button>
  </form>
</div>`,
    jestTestFile: `describe('HTML Forms', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });
  test('form exists', () => {
    const form = document.querySelector('form');
    expect(form).toBeTruthy();
    expect(form.method.toLowerCase()).toBe('post');
  });
  test('text input exists', () => {
    const input = document.querySelector('input[type="text"]');
    expect(input).toBeTruthy();
  });
  test('email input with required exists', () => {
    const email = document.querySelector('input[type="email"][required]');
    expect(email).toBeTruthy();
  });
  test('password input exists', () => {
    const password = document.querySelector('input[type="password"]');
    expect(password).toBeTruthy();
  });
  test('submit button exists', () => {
    const submit = document.querySelector('button[type="submit"], input[type="submit"]');
    expect(submit).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: ''
    },
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Forms', 'Input']
  },

  // Semantic HTML
  {
    title: "HTML Semantic Elements",
    problemStatement: "Create a webpage using semantic HTML5 elements for better structure and accessibility.",
    requirements: [
      "Create a header element with a nav inside",
      "Create a main element with an article inside",
      "Create an aside element",
      "Create a footer element",
      "Add a section inside the article"
    ],
    acceptanceCriteria: [
      "header element exists",
      "nav exists inside header",
      "main element exists",
      "article exists inside main",
      "aside element exists",
      "footer element exists",
      "section exists inside article"
    ],
    expectedOutput: `<div style="font-family:Arial;">
  <header style="background:#1976d2;color:white;padding:20px;">
    <nav><a href="#" style="color:white;margin:0 10px;">Home</a><a href="#" style="color:white;margin:0 10px;">About</a></nav>
  </header>
  <main style="padding:20px;">
    <article style="background:#f5f5f5;padding:20px;margin:10px 0;border-radius:8px;">
      <section><h2>Article Section</h2><p>Content here</p></section>
    </article>
  </main>
  <aside style="background:#e3f2fd;padding:20px;margin:10px;">Sidebar content</aside>
  <footer style="background:#333;color:white;padding:20px;text-align:center;">Footer</footer>
</div>`,
    jestTestFile: `describe('HTML Semantic Elements', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });
  test('header exists', () => {
    expect(document.querySelector('header')).toBeTruthy();
  });
  test('nav inside header exists', () => {
    expect(document.querySelector('header nav')).toBeTruthy();
  });
  test('main exists', () => {
    expect(document.querySelector('main')).toBeTruthy();
  });
  test('article inside main exists', () => {
    expect(document.querySelector('main article')).toBeTruthy();
  });
  test('aside exists', () => {
    expect(document.querySelector('aside')).toBeTruthy();
  });
  test('footer exists', () => {
    expect(document.querySelector('footer')).toBeTruthy();
  });
  test('section inside article exists', () => {
    expect(document.querySelector('article section')).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: ''
    },
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Semantic', 'HTML5']
  },

  // IFrames
  {
    title: "HTML IFrames",
    problemStatement: "Embed external content using iframe elements.",
    requirements: [
      "Create an iframe with src='https://www.example.com'",
      "Set iframe width to '600' and height to '400'",
      "Add title attribute 'External Content' to iframe",
      "Create another iframe for embedding a YouTube video"
    ],
    acceptanceCriteria: [
      "iframe exists with src",
      "iframe has width and height",
      "iframe has title attribute",
      "Second iframe exists"
    ],
    expectedOutput: `<div style="padding:20px;font-family:Arial;">
  <iframe src="https://www.example.com" width="600" height="400" title="External Content" style="border:1px solid #ddd;border-radius:8px;margin:10px;"></iframe>
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="600" height="400" style="border:1px solid #ddd;border-radius:8px;margin:10px;"></iframe>
</div>`,
    jestTestFile: `describe('HTML IFrames', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });
  test('iframe exists', () => {
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeTruthy();
  });
  test('iframe has dimensions', () => {
    const iframe = document.querySelector('iframe');
    expect(iframe.width).toBeTruthy();
    expect(iframe.height).toBeTruthy();
  });
  test('iframe has title', () => {
    const iframe = document.querySelector('iframe[title]');
    expect(iframe).toBeTruthy();
  });
  test('multiple iframes exist', () => {
    const iframes = document.querySelectorAll('iframe');
    expect(iframes.length).toBeGreaterThanOrEqual(2);
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: ''
    },
    allowedFiles: ['html'],
    difficulty: 'easy',
    tags: ['HTML', 'IFrame', 'Embed']
  }
];

async function seedHTMLQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    // Delete existing HTML questions
    await FrontendQuestion.deleteMany({ tags: 'HTML' });
    console.log('Removed existing HTML questions');

    // Insert new questions
    for (const question of htmlQuestions) {
      await FrontendQuestion.create({
        ...question,
        tenant: tenant._id,
        createdBy: instructor._id
      });
      console.log(`Created: ${question.title}`);
    }

    console.log(`\nAll ${htmlQuestions.length} HTML questions created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedHTMLQuestions();
