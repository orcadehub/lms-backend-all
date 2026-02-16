const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Instructor = require('../models/Instructor');
const Tenant = require('../models/Tenant');
require('dotenv').config();

const questions = [
  // HTML Only - Question 1
  {
    title: "Create a Student Registration Form",
    problemStatement: "Build a student registration form with proper HTML5 semantic elements and form validation attributes.",
    requirements: [
      "Form must have id='registration-form'",
      "Include input fields: name (text), email (email), age (number), course (select with 3 options)",
      "Add a submit button with text 'Register'",
      "Use proper HTML5 input types and required attributes"
    ],
    acceptanceCriteria: [
      "Form element exists with correct id",
      "All input fields are present with correct types",
      "Select dropdown has at least 3 options",
      "Submit button is present"
    ],
    jestTestFile: `describe('Student Registration Form', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('form exists with correct id', () => {
    const form = document.getElementById('registration-form');
    expect(form).toBeTruthy();
    expect(form.tagName).toBe('FORM');
  });

  test('name input exists and is required', () => {
    const nameInput = document.querySelector('input[type="text"]');
    expect(nameInput).toBeTruthy();
    expect(nameInput.hasAttribute('required')).toBe(true);
  });

  test('email input exists with correct type', () => {
    const emailInput = document.querySelector('input[type="email"]');
    expect(emailInput).toBeTruthy();
  });

  test('age input exists with number type', () => {
    const ageInput = document.querySelector('input[type="number"]');
    expect(ageInput).toBeTruthy();
  });

  test('course select exists with at least 3 options', () => {
    const select = document.querySelector('select');
    expect(select).toBeTruthy();
    expect(select.options.length).toBeGreaterThanOrEqual(3);
  });

  test('submit button exists', () => {
    const button = document.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
    expect(button.textContent).toBe('Register');
  });
});`,
    defaultFiles: {
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Student Registration</title>
</head>
<body>
  <!-- Create your form here -->
</body>
</html>`,
      css: '',
      js: ''
    },
    difficulty: 'medium',
    tags: ['html', 'forms', 'html5']
  },

  // HTML Only - Question 2
  {
    title: "Build a Product Card Structure",
    problemStatement: "Create a semantic HTML structure for a product card with image, title, description, price, and action button.",
    requirements: [
      "Use article tag with class='product-card'",
      "Include an img tag with alt text",
      "Add h2 for product title",
      "Add p tag with class='description' for product description",
      "Add span with class='price' for price display",
      "Include a button with class='buy-btn'"
    ],
    acceptanceCriteria: [
      "Article element exists with correct class",
      "Image has alt attribute",
      "All required elements are present",
      "Proper semantic HTML structure is used"
    ],
    jestTestFile: `describe('Product Card Structure', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('article element exists with product-card class', () => {
    const article = document.querySelector('article.product-card');
    expect(article).toBeTruthy();
  });

  test('image exists with alt attribute', () => {
    const img = document.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.hasAttribute('alt')).toBe(true);
  });

  test('h2 title exists', () => {
    const title = document.querySelector('h2');
    expect(title).toBeTruthy();
  });

  test('description paragraph exists', () => {
    const desc = document.querySelector('p.description');
    expect(desc).toBeTruthy();
  });

  test('price span exists', () => {
    const price = document.querySelector('span.price');
    expect(price).toBeTruthy();
  });

  test('buy button exists', () => {
    const btn = document.querySelector('button.buy-btn');
    expect(btn).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Product Card</title>
</head>
<body>
  <!-- Create your product card here -->
</body>
</html>`,
      css: '',
      js: ''
    },
    difficulty: 'medium',
    tags: ['html', 'semantic-html', 'structure']
  },

  // HTML + CSS - Question 1
  {
    title: "Style a Navigation Bar",
    problemStatement: "Create a horizontal navigation bar with hover effects using HTML and CSS.",
    requirements: [
      "Create nav element with id='navbar'",
      "Add ul with at least 4 li items containing links",
      "Style nav with background color #333 and height 60px",
      "Make list items display horizontally",
      "Add hover effect that changes link color to #ffd700"
    ],
    acceptanceCriteria: [
      "Navigation bar has correct structure",
      "CSS applies proper styling",
      "Hover effects work correctly",
      "Links are horizontally aligned"
    ],
    jestTestFile: `describe('Navigation Bar', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('nav element exists with correct id', () => {
    const nav = document.getElementById('navbar');
    expect(nav).toBeTruthy();
    expect(nav.tagName).toBe('NAV');
  });

  test('ul exists with at least 4 list items', () => {
    const ul = document.querySelector('ul');
    const items = document.querySelectorAll('li');
    expect(ul).toBeTruthy();
    expect(items.length).toBeGreaterThanOrEqual(4);
  });

  test('nav has correct background color', () => {
    const nav = document.getElementById('navbar');
    const styles = window.getComputedStyle(nav);
    expect(styles.backgroundColor).toBe('rgb(51, 51, 51)');
  });

  test('nav has correct height', () => {
    const nav = document.getElementById('navbar');
    const styles = window.getComputedStyle(nav);
    expect(styles.height).toBe('60px');
  });

  test('all li items contain links', () => {
    const items = document.querySelectorAll('li');
    items.forEach(item => {
      const link = item.querySelector('a');
      expect(link).toBeTruthy();
    });
  });
});`,
    defaultFiles: {
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Navigation Bar</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Create your navigation bar here -->
</body>
</html>`,
      css: `/* Add your CSS styles here */`,
      js: ''
    },
    difficulty: 'medium',
    tags: ['html', 'css', 'navigation', 'hover-effects']
  },

  // HTML + CSS - Question 2
  {
    title: "Create a Centered Login Card",
    problemStatement: "Build a centered login card with styled input fields and button using flexbox.",
    requirements: [
      "Create div with class='login-card' containing form",
      "Center the card using flexbox on body",
      "Card should have width 300px, padding 30px, border-radius 10px",
      "Add box-shadow: 0 4px 6px rgba(0,0,0,0.1)",
      "Style input fields with border, padding, and margin",
      "Style button with background #007bff and white text"
    ],
    acceptanceCriteria: [
      "Login card is centered on page",
      "Card has correct dimensions and styling",
      "Input fields are properly styled",
      "Button has correct colors"
    ],
    jestTestFile: `describe('Centered Login Card', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('login card exists', () => {
    const card = document.querySelector('.login-card');
    expect(card).toBeTruthy();
  });

  test('body uses flexbox for centering', () => {
    const bodyStyles = window.getComputedStyle(document.body);
    expect(bodyStyles.display).toBe('flex');
  });

  test('card has correct width', () => {
    const card = document.querySelector('.login-card');
    const styles = window.getComputedStyle(card);
    expect(styles.width).toBe('300px');
  });

  test('card has correct padding', () => {
    const card = document.querySelector('.login-card');
    const styles = window.getComputedStyle(card);
    expect(styles.padding).toBe('30px');
  });

  test('card has border radius', () => {
    const card = document.querySelector('.login-card');
    const styles = window.getComputedStyle(card);
    expect(styles.borderRadius).toBe('10px');
  });

  test('button has correct background color', () => {
    const button = document.querySelector('button');
    const styles = window.getComputedStyle(button);
    expect(styles.backgroundColor).toBe('rgb(0, 123, 255)');
  });

  test('button has white text', () => {
    const button = document.querySelector('button');
    const styles = window.getComputedStyle(button);
    expect(styles.color).toBe('rgb(255, 255, 255)');
  });
});`,
    defaultFiles: {
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Login Card</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Create your login card here -->
</body>
</html>`,
      css: `/* Add your CSS styles here */`,
      js: ''
    },
    difficulty: 'medium',
    tags: ['html', 'css', 'flexbox', 'forms']
  },

  // HTML + CSS + JS - Question 1
  {
    title: "Build a Counter App",
    problemStatement: "Create a counter application with increment, decrement, and reset buttons.",
    requirements: [
      "Display counter value in element with id='counter' (initial value 0)",
      "Create button with id='increment' to increase counter",
      "Create button with id='decrement' to decrease counter",
      "Create button with id='reset' to reset counter to 0",
      "Update display when buttons are clicked"
    ],
    acceptanceCriteria: [
      "Counter displays correctly",
      "Increment button increases value by 1",
      "Decrement button decreases value by 1",
      "Reset button sets value to 0"
    ],
    jestTestFile: `describe('Counter App', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
    eval(window.__JS__);
  });

  test('counter element exists with initial value 0', () => {
    const counter = document.getElementById('counter');
    expect(counter).toBeTruthy();
    expect(counter.textContent).toBe('0');
  });

  test('increment button increases counter', () => {
    const counter = document.getElementById('counter');
    const incrementBtn = document.getElementById('increment');
    
    incrementBtn.click();
    expect(counter.textContent).toBe('1');
    
    incrementBtn.click();
    expect(counter.textContent).toBe('2');
  });

  test('decrement button decreases counter', () => {
    const counter = document.getElementById('counter');
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');
    
    incrementBtn.click();
    incrementBtn.click();
    decrementBtn.click();
    expect(counter.textContent).toBe('1');
  });

  test('reset button sets counter to 0', () => {
    const counter = document.getElementById('counter');
    const incrementBtn = document.getElementById('increment');
    const resetBtn = document.getElementById('reset');
    
    incrementBtn.click();
    incrementBtn.click();
    incrementBtn.click();
    resetBtn.click();
    expect(counter.textContent).toBe('0');
  });

  test('all buttons exist', () => {
    expect(document.getElementById('increment')).toBeTruthy();
    expect(document.getElementById('decrement')).toBeTruthy();
    expect(document.getElementById('reset')).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Counter App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Create your counter app here -->
  <script src="script.js"></script>
</body>
</html>`,
      css: `/* Add your CSS styles here */`,
      js: `// Add your JavaScript code here`
    },
    difficulty: 'medium',
    tags: ['html', 'css', 'javascript', 'dom-manipulation']
  },

  // HTML + CSS + JS - Question 2
  {
    title: "Create a Todo List",
    problemStatement: "Build a simple todo list where users can add and remove tasks.",
    requirements: [
      "Input field with id='todo-input' for entering tasks",
      "Button with id='add-btn' to add tasks",
      "Ul element with id='todo-list' to display tasks",
      "Each task should have a delete button with class='delete-btn'",
      "Clicking delete button removes that task from list"
    ],
    acceptanceCriteria: [
      "Tasks can be added to the list",
      "Each task displays with a delete button",
      "Delete button removes the correct task",
      "Input clears after adding task"
    ],
    jestTestFile: `describe('Todo List', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
    eval(window.__JS__);
  });

  test('all required elements exist', () => {
    expect(document.getElementById('todo-input')).toBeTruthy();
    expect(document.getElementById('add-btn')).toBeTruthy();
    expect(document.getElementById('todo-list')).toBeTruthy();
  });

  test('can add a task to the list', () => {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const list = document.getElementById('todo-list');
    
    input.value = 'Test Task';
    addBtn.click();
    
    expect(list.children.length).toBe(1);
    expect(list.textContent).toContain('Test Task');
  });

  test('input clears after adding task', () => {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    
    input.value = 'Test Task';
    addBtn.click();
    
    expect(input.value).toBe('');
  });

  test('each task has a delete button', () => {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    
    input.value = 'Test Task';
    addBtn.click();
    
    const deleteBtn = document.querySelector('.delete-btn');
    expect(deleteBtn).toBeTruthy();
  });

  test('delete button removes task', () => {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const list = document.getElementById('todo-list');
    
    input.value = 'Task 1';
    addBtn.click();
    input.value = 'Task 2';
    addBtn.click();
    
    expect(list.children.length).toBe(2);
    
    const deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.click();
    
    expect(list.children.length).toBe(1);
  });

  test('can add multiple tasks', () => {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const list = document.getElementById('todo-list');
    
    input.value = 'Task 1';
    addBtn.click();
    input.value = 'Task 2';
    addBtn.click();
    input.value = 'Task 3';
    addBtn.click();
    
    expect(list.children.length).toBe(3);
  });
});`,
    defaultFiles: {
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Todo List</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Create your todo list here -->
  <script src="script.js"></script>
</body>
</html>`,
      css: `/* Add your CSS styles here */`,
      js: `// Add your JavaScript code here`
    },
    difficulty: 'medium',
    tags: ['html', 'css', 'javascript', 'dom-manipulation', 'events']
  }
];

async function seedFrontendQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const instructor = await Instructor.findOne();
    const tenant = await Tenant.findOne();

    if (!instructor || !tenant) {
      console.error('No instructor or tenant found in database');
      process.exit(1);
    }

    await FrontendQuestion.deleteMany({});
    console.log('Cleared existing frontend questions');

    const questionsWithRefs = questions.map(q => ({
      ...q,
      tenant: tenant._id,
      createdBy: instructor._id
    }));

    const inserted = await FrontendQuestion.insertMany(questionsWithRefs);
    console.log(`Seeded ${inserted.length} frontend questions successfully`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding frontend questions:', error);
    process.exit(1);
  }
}

seedFrontendQuestions();
