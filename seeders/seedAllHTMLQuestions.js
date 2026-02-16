require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const questions = [
  // 3. Links and Anchors
  {
    title: "HTML Links and Anchors",
    problemStatement: "Create a webpage with different types of links.",
    requirements: [
      "Create an anchor tag with href='https://example.com' and text 'Visit Example'",
      "Create an anchor tag with href='#section' and text 'Go to Section'",
      "Create an anchor tag with href='mailto:test@example.com' and text 'Email Us'",
      "Create a div with id='section' containing text 'Target Section'"
    ],
    acceptanceCriteria: [
      "External link exists with correct href and text",
      "Internal link exists with correct href and text",
      "Email link exists with correct href and text",
      "Target section exists with correct id"
    ],
    jestTestFile: `describe('HTML Links', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('external link exists', () => {
    const links = document.querySelectorAll('a');
    const externalLink = Array.from(links).find(a => a.href.includes('example.com'));
    expect(externalLink).toBeTruthy();
    expect(externalLink.textContent).toBe('Visit Example');
  });

  test('internal link exists', () => {
    const links = document.querySelectorAll('a');
    const internalLink = Array.from(links).find(a => a.getAttribute('href') === '#section');
    expect(internalLink).toBeTruthy();
    expect(internalLink.textContent).toBe('Go to Section');
  });

  test('email link exists', () => {
    const links = document.querySelectorAll('a');
    const emailLink = Array.from(links).find(a => a.href.includes('mailto:'));
    expect(emailLink).toBeTruthy();
    expect(emailLink.textContent).toBe('Email Us');
  });

  test('target section exists', () => {
    const section = document.getElementById('section');
    expect(section).toBeTruthy();
    expect(section.textContent).toBe('Target Section');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'easy',
    tags: ['HTML', 'Links', 'Anchors']
  },

  // 4. Images
  {
    title: "HTML Images",
    problemStatement: "Create a webpage with images using proper attributes.",
    requirements: [
      "Create an img tag with src='logo.png', alt='Company Logo', and width='200'",
      "Create an img tag with src='banner.jpg' and alt='Website Banner'",
      "Create a figure tag containing an img with src='photo.jpg' and a figcaption with text 'Photo Caption'"
    ],
    acceptanceCriteria: [
      "First image exists with correct src, alt, and width",
      "Second image exists with correct src and alt",
      "Figure with image and figcaption exists"
    ],
    jestTestFile: `describe('HTML Images', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('first image exists with attributes', () => {
    const images = document.querySelectorAll('img');
    const logo = Array.from(images).find(img => img.getAttribute('src') === 'logo.png');
    expect(logo).toBeTruthy();
    expect(logo.getAttribute('alt')).toBe('Company Logo');
    expect(logo.getAttribute('width')).toBe('200');
  });

  test('second image exists', () => {
    const images = document.querySelectorAll('img');
    const banner = Array.from(images).find(img => img.getAttribute('src') === 'banner.jpg');
    expect(banner).toBeTruthy();
    expect(banner.getAttribute('alt')).toBe('Website Banner');
  });

  test('figure with image and caption exists', () => {
    const figure = document.querySelector('figure');
    expect(figure).toBeTruthy();
    const img = figure.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('photo.jpg');
    const caption = figure.querySelector('figcaption');
    expect(caption).toBeTruthy();
    expect(caption.textContent).toBe('Photo Caption');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'easy',
    tags: ['HTML', 'Images', 'Figure']
  },

  // 5. Lists
  {
    title: "HTML Lists - Ordered and Unordered",
    problemStatement: "Create a webpage with both ordered and unordered lists.",
    requirements: [
      "Create an h2 with text 'Shopping List'",
      "Create a ul with three li items: 'Apples', 'Bananas', 'Oranges'",
      "Create an h2 with text 'Steps to Follow'",
      "Create an ol with three li items: 'First Step', 'Second Step', 'Third Step'"
    ],
    acceptanceCriteria: [
      "Unordered list exists with 3 items",
      "Ordered list exists with 3 items",
      "Both lists have correct content"
    ],
    jestTestFile: `describe('HTML Lists', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('unordered list exists with items', () => {
    const ul = document.querySelector('ul');
    expect(ul).toBeTruthy();
    const items = ul.querySelectorAll('li');
    expect(items.length).toBe(3);
    expect(items[0].textContent).toBe('Apples');
    expect(items[1].textContent).toBe('Bananas');
    expect(items[2].textContent).toBe('Oranges');
  });

  test('ordered list exists with items', () => {
    const ol = document.querySelector('ol');
    expect(ol).toBeTruthy();
    const items = ol.querySelectorAll('li');
    expect(items.length).toBe(3);
    expect(items[0].textContent).toBe('First Step');
    expect(items[1].textContent).toBe('Second Step');
    expect(items[2].textContent).toBe('Third Step');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'easy',
    tags: ['HTML', 'Lists', 'UL', 'OL']
  },

  // 6. Tables
  {
    title: "HTML Tables",
    problemStatement: "Create a simple table with headers and data rows.",
    requirements: [
      "Create a table element",
      "Add a thead with tr containing th elements: 'Name', 'Age', 'City'",
      "Add a tbody with two tr elements",
      "First row: td elements with 'John', '25', 'New York'",
      "Second row: td elements with 'Jane', '30', 'London'"
    ],
    acceptanceCriteria: [
      "Table exists with thead and tbody",
      "Header row has 3 columns",
      "Two data rows exist with correct content"
    ],
    jestTestFile: `describe('HTML Tables', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('table exists with structure', () => {
    const table = document.querySelector('table');
    expect(table).toBeTruthy();
    const thead = table.querySelector('thead');
    expect(thead).toBeTruthy();
    const tbody = table.querySelector('tbody');
    expect(tbody).toBeTruthy();
  });

  test('header row exists', () => {
    const headers = document.querySelectorAll('th');
    expect(headers.length).toBe(3);
    expect(headers[0].textContent).toBe('Name');
    expect(headers[1].textContent).toBe('Age');
    expect(headers[2].textContent).toBe('City');
  });

  test('data rows exist', () => {
    const tbody = document.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    expect(rows.length).toBe(2);
    const firstRowCells = rows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent).toBe('John');
    expect(firstRowCells[1].textContent).toBe('25');
    expect(firstRowCells[2].textContent).toBe('New York');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Tables', 'Table Structure']
  },

  // 7. Forms - Basic
  {
    title: "HTML Forms - Basic Input Types",
    problemStatement: "Create a basic form with different input types.",
    requirements: [
      "Create a form with id='userForm'",
      "Add an input with type='text', name='username', and placeholder='Enter username'",
      "Add an input with type='email', name='email', and placeholder='Enter email'",
      "Add an input with type='password', name='password'",
      "Add a button with type='submit' and text 'Submit'"
    ],
    acceptanceCriteria: [
      "Form exists with correct id",
      "Text input exists with correct attributes",
      "Email input exists",
      "Password input exists",
      "Submit button exists"
    ],
    jestTestFile: `describe('HTML Forms', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('form exists', () => {
    const form = document.getElementById('userForm');
    expect(form).toBeTruthy();
    expect(form.tagName).toBe('FORM');
  });

  test('text input exists', () => {
    const textInput = document.querySelector('input[type="text"]');
    expect(textInput).toBeTruthy();
    expect(textInput.getAttribute('name')).toBe('username');
    expect(textInput.getAttribute('placeholder')).toBe('Enter username');
  });

  test('email input exists', () => {
    const emailInput = document.querySelector('input[type="email"]');
    expect(emailInput).toBeTruthy();
    expect(emailInput.getAttribute('name')).toBe('email');
  });

  test('password input exists', () => {
    const passwordInput = document.querySelector('input[type="password"]');
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.getAttribute('name')).toBe('password');
  });

  test('submit button exists', () => {
    const button = document.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
    expect(button.textContent).toBe('Submit');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Forms', 'Input']
  },

  // 8. Forms - Advanced
  {
    title: "HTML Forms - Select, Textarea, and Radio",
    problemStatement: "Create a form with select dropdown, textarea, and radio buttons.",
    requirements: [
      "Create a select with name='country' and three options: 'USA', 'UK', 'India'",
      "Create a textarea with name='message' and placeholder='Enter your message'",
      "Create two radio inputs with name='gender', values 'male' and 'female', with labels 'Male' and 'Female'"
    ],
    acceptanceCriteria: [
      "Select exists with 3 options",
      "Textarea exists with correct attributes",
      "Two radio buttons exist with same name"
    ],
    jestTestFile: `describe('HTML Forms Advanced', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('select exists with options', () => {
    const select = document.querySelector('select');
    expect(select).toBeTruthy();
    expect(select.getAttribute('name')).toBe('country');
    const options = select.querySelectorAll('option');
    expect(options.length).toBe(3);
    expect(options[0].textContent).toBe('USA');
    expect(options[1].textContent).toBe('UK');
    expect(options[2].textContent).toBe('India');
  });

  test('textarea exists', () => {
    const textarea = document.querySelector('textarea');
    expect(textarea).toBeTruthy();
    expect(textarea.getAttribute('name')).toBe('message');
    expect(textarea.getAttribute('placeholder')).toBe('Enter your message');
  });

  test('radio buttons exist', () => {
    const radios = document.querySelectorAll('input[type="radio"]');
    expect(radios.length).toBe(2);
    expect(radios[0].getAttribute('name')).toBe('gender');
    expect(radios[1].getAttribute('name')).toBe('gender');
    expect(radios[0].getAttribute('value')).toBe('male');
    expect(radios[1].getAttribute('value')).toBe('female');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Forms', 'Select', 'Textarea', 'Radio']
  },

  // 9. Semantic HTML
  {
    title: "HTML Semantic Elements",
    problemStatement: "Create a webpage using semantic HTML5 elements.",
    requirements: [
      "Create a header element with an h1 containing 'Website Title'",
      "Create a nav element with a ul containing two li with anchor tags",
      "Create a main element with an article containing an h2 and a paragraph",
      "Create a footer element with text 'Copyright 2024'"
    ],
    acceptanceCriteria: [
      "Header, nav, main, and footer elements exist",
      "Each semantic element contains required content",
      "Proper nesting of elements"
    ],
    jestTestFile: `describe('HTML Semantic Elements', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('header exists with h1', () => {
    const header = document.querySelector('header');
    expect(header).toBeTruthy();
    const h1 = header.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toBe('Website Title');
  });

  test('nav exists with list', () => {
    const nav = document.querySelector('nav');
    expect(nav).toBeTruthy();
    const ul = nav.querySelector('ul');
    expect(ul).toBeTruthy();
    const items = ul.querySelectorAll('li');
    expect(items.length).toBe(2);
  });

  test('main with article exists', () => {
    const main = document.querySelector('main');
    expect(main).toBeTruthy();
    const article = main.querySelector('article');
    expect(article).toBeTruthy();
    const h2 = article.querySelector('h2');
    expect(h2).toBeTruthy();
    const p = article.querySelector('p');
    expect(p).toBeTruthy();
  });

  test('footer exists', () => {
    const footer = document.querySelector('footer');
    expect(footer).toBeTruthy();
    expect(footer.textContent).toBe('Copyright 2024');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Semantic', 'HTML5']
  },

  // 10. Combination - Heading, Paragraph, Image
  {
    title: "HTML Combination - Heading, Paragraph, and Image",
    problemStatement: "Create a simple article with heading, paragraph, and image.",
    requirements: [
      "Create an h1 with text 'Article Title'",
      "Create a paragraph with text 'This is the article content.'",
      "Create an img with src='article.jpg' and alt='Article Image'",
      "Create another paragraph with text 'More content here.'"
    ],
    acceptanceCriteria: [
      "Heading exists with correct text",
      "Two paragraphs exist with correct text",
      "Image exists with correct attributes"
    ],
    jestTestFile: `describe('HTML Combination', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('heading exists', () => {
    const h1 = document.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toBe('Article Title');
  });

  test('paragraphs exist', () => {
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
    expect(paragraphs[0].textContent).toBe('This is the article content.');
    expect(paragraphs[1].textContent).toBe('More content here.');
  });

  test('image exists', () => {
    const img = document.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('article.jpg');
    expect(img.getAttribute('alt')).toBe('Article Image');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'easy',
    tags: ['HTML', 'Combination', 'Basics']
  },

  // 11. Divs and Spans
  {
    title: "HTML Divs and Spans",
    problemStatement: "Create a webpage using div and span elements for structure and inline styling.",
    requirements: [
      "Create a div with class='container'",
      "Inside the div, add a paragraph with text 'This is a ' followed by a span with class='highlight' containing 'highlighted' followed by ' word.'",
      "Create another div with id='footer' containing text 'Footer Content'"
    ],
    acceptanceCriteria: [
      "Container div exists",
      "Paragraph with span exists",
      "Footer div exists with correct id"
    ],
    jestTestFile: `describe('HTML Divs and Spans', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('container div exists', () => {
    const container = document.querySelector('.container');
    expect(container).toBeTruthy();
    expect(container.tagName).toBe('DIV');
  });

  test('paragraph with span exists', () => {
    const p = document.querySelector('p');
    expect(p).toBeTruthy();
    const span = p.querySelector('.highlight');
    expect(span).toBeTruthy();
    expect(span.textContent).toBe('highlighted');
  });

  test('footer div exists', () => {
    const footer = document.getElementById('footer');
    expect(footer).toBeTruthy();
    expect(footer.textContent).toBe('Footer Content');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'easy',
    tags: ['HTML', 'Div', 'Span', 'Structure']
  }
];

async function seedAllQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    for (const questionData of questions) {
      const question = await FrontendQuestion.create({
        ...questionData,
        defaultFiles: {
          html: `<!DOCTYPE html>
<html>
<head>
  <title>${questionData.title}</title>
</head>
<body>
  <!-- Create your solution here -->
</body>
</html>`,
          css: '',
          js: ''
        },
        tenant: tenant._id,
        createdBy: instructor._id
      });
      console.log('Created:', question.title);
    }

    console.log('\nAll questions created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedAllQuestions();
