const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
require('dotenv').config();

const questions = [
  {
    title: "Interactive Contact Form with Validation",
    problemStatement: "Create a contact form with real-time validation that shows error messages when fields are invalid and success message on submission.",
    requirements: [
      "Create a form with name, email, and message fields",
      "Add CSS styling with proper layout and colors",
      "Implement JavaScript validation for all fields",
      "Show error messages below invalid fields",
      "Display success message on valid submission"
    ],
    acceptanceCriteria: [
      "Form should have proper labels and input fields",
      "Email validation should check for @ symbol",
      "Error messages should appear in red color",
      "Success message should appear in green",
      "Form should prevent submission if validation fails"
    ],
    jestTestFile: `describe('Contact Form Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div class="container">
        <h1>Contact Us</h1>
        <form id="contactForm">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name">
            <span class="error" id="nameError"></span>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email">
            <span class="error" id="emailError"></span>
          </div>
          <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" name="message"></textarea>
            <span class="error" id="messageError"></span>
          </div>
          <button type="submit">Submit</button>
        </form>
        <div id="successMessage" class="success"></div>
      </div>
    \`;
  });

  test('Form elements exist', () => {
    expect(document.getElementById('contactForm')).toBeTruthy();
    expect(document.getElementById('name')).toBeTruthy();
    expect(document.getElementById('email')).toBeTruthy();
    expect(document.getElementById('message')).toBeTruthy();
  });

  test('Error span elements exist', () => {
    expect(document.getElementById('nameError')).toBeTruthy();
    expect(document.getElementById('emailError')).toBeTruthy();
    expect(document.getElementById('messageError')).toBeTruthy();
  });

  test('Success message element exists', () => {
    expect(document.getElementById('successMessage')).toBeTruthy();
  });

  test('Submit button exists', () => {
    const button = document.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
  });
});`,
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['forms', 'validation', 'javascript']
  },
  {
    title: "Todo List with Add and Delete",
    problemStatement: "Create an interactive todo list where users can add new tasks and delete existing ones with proper styling.",
    requirements: [
      "Create an input field and add button",
      "Display todo items in a list",
      "Add delete button for each todo item",
      "Style the todo list with CSS",
      "Implement add and delete functionality with JavaScript"
    ],
    acceptanceCriteria: [
      "Input field should clear after adding a todo",
      "Each todo should have a delete button",
      "Clicking delete should remove the todo",
      "Empty input should not add a todo",
      "List should be styled with proper spacing"
    ],
    defaultFiles: {
      html: '',
      css: '',
      js: ''
    },
    jestTestFile: `describe('Todo List Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div class="container">
        <h1>My Todo List</h1>
        <div class="input-section">
          <input type="text" id="todoInput" placeholder="Enter a task">
          <button id="addBtn">Add</button>
        </div>
        <ul id="todoList"></ul>
      </div>
    \`;
  });

  test('Todo input exists', () => {
    expect(document.getElementById('todoInput')).toBeTruthy();
  });

  test('Add button exists', () => {
    expect(document.getElementById('addBtn')).toBeTruthy();
  });

  test('Todo list exists', () => {
    expect(document.getElementById('todoList')).toBeTruthy();
  });

  test('Container has proper structure', () => {
    expect(document.querySelector('.container')).toBeTruthy();
    expect(document.querySelector('.input-section')).toBeTruthy();
  });
});`,
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['todo', 'list', 'javascript']
  },
  {
    title: "Image Gallery with Modal",
    problemStatement: "Create an image gallery where clicking on an image opens it in a modal overlay with close functionality.",
    requirements: [
      "Create a grid of thumbnail images",
      "Style the gallery with CSS grid",
      "Create a modal overlay for full-size images",
      "Implement click to open modal",
      "Add close button functionality"
    ],
    acceptanceCriteria: [
      "Gallery should display images in a grid",
      "Modal should appear on image click",
      "Modal should show full-size image",
      "Close button should hide modal",
      "Modal should have dark overlay background"
    ],
    defaultFiles: {
      html: '',
      css: '',
      js: ''
    },
    jestTestFile: `describe('Image Gallery Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div class="container">
        <h1>Photo Gallery</h1>
        <div class="gallery">
          <img src="https://via.placeholder.com/200" alt="Image 1" class="gallery-img">
          <img src="https://via.placeholder.com/200" alt="Image 2" class="gallery-img">
          <img src="https://via.placeholder.com/200" alt="Image 3" class="gallery-img">
          <img src="https://via.placeholder.com/200" alt="Image 4" class="gallery-img">
        </div>
      </div>
      <div id="modal" class="modal">
        <span class="close">&times;</span>
        <img id="modalImg" class="modal-content">
      </div>
    \`;
  });

  test('Gallery exists', () => {
    expect(document.querySelector('.gallery')).toBeTruthy();
  });

  test('Gallery images exist', () => {
    const images = document.querySelectorAll('.gallery-img');
    expect(images.length).toBeGreaterThanOrEqual(4);
  });

  test('Modal exists', () => {
    expect(document.getElementById('modal')).toBeTruthy();
  });

  test('Modal image exists', () => {
    expect(document.getElementById('modalImg')).toBeTruthy();
  });

  test('Close button exists', () => {
    expect(document.querySelector('.close')).toBeTruthy();
  });
});`,
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['gallery', 'modal', 'images']
  },
  {
    title: "Accordion FAQ Section",
    problemStatement: "Create an accordion-style FAQ section where clicking a question reveals its answer and hides others.",
    requirements: [
      "Create multiple FAQ items with questions and answers",
      "Style with CSS for proper layout",
      "Implement toggle functionality with JavaScript",
      "Show/hide answers on click",
      "Add visual indicators (+ and -)"
    ],
    acceptanceCriteria: [
      "Questions should be clickable",
      "Clicking a question should toggle its answer",
      "Only one answer should be visible at a time",
      "Visual indicator should change on toggle",
      "Smooth transitions should be applied"
    ],
    defaultFiles: {
      html: '',
      css: '',
      js: ''
    },
    jestTestFile: `describe('Accordion Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div class="container">
        <h1>Frequently Asked Questions</h1>
        <div class="accordion">
          <div class="accordion-item">
            <div class="accordion-header">
              <span>What is HTML?</span>
              <span class="icon">+</span>
            </div>
            <div class="accordion-content">
              <p>HTML stands for HyperText Markup Language.</p>
            </div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header">
              <span>What is CSS?</span>
              <span class="icon">+</span>
            </div>
            <div class="accordion-content">
              <p>CSS stands for Cascading Style Sheets.</p>
            </div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header">
              <span>What is JavaScript?</span>
              <span class="icon">+</span>
            </div>
            <div class="accordion-content">
              <p>JavaScript is a programming language for web development.</p>
            </div>
          </div>
        </div>
      </div>
    \`;
  });

  test('Accordion exists', () => {
    expect(document.querySelector('.accordion')).toBeTruthy();
  });

  test('Accordion items exist', () => {
    const items = document.querySelectorAll('.accordion-item');
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  test('Accordion headers exist', () => {
    const headers = document.querySelectorAll('.accordion-header');
    expect(headers.length).toBeGreaterThanOrEqual(3);
  });

  test('Accordion content exists', () => {
    const contents = document.querySelectorAll('.accordion-content');
    expect(contents.length).toBeGreaterThanOrEqual(3);
  });

  test('Icons exist', () => {
    const icons = document.querySelectorAll('.icon');
    expect(icons.length).toBeGreaterThanOrEqual(3);
  });
});`,
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['accordion', 'faq', 'toggle']
  },
  {
    title: "Login Form with Show/Hide Password",
    problemStatement: "Create a login form with username and password fields, including a toggle to show/hide the password.",
    requirements: [
      "Create form with username and password fields",
      "Add a checkbox or button to toggle password visibility",
      "Style the form with CSS",
      "Implement password toggle with JavaScript",
      "Add form validation"
    ],
    acceptanceCriteria: [
      "Password field should be type='password' by default",
      "Toggle should change password field to type='text'",
      "Form should have proper labels",
      "Submit button should exist",
      "Visual feedback on toggle state"
    ],
    defaultFiles: {
      html: '',
      css: '',
      js: ''
    },
    jestTestFile: `describe('Login Form Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div class="container">
        <h1>Login</h1>
        <form id="loginForm">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username">
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password">
            <label class="toggle-password">
              <input type="checkbox" id="showPassword">
              Show Password
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    \`;
  });

  test('Login form exists', () => {
    expect(document.getElementById('loginForm')).toBeTruthy();
  });

  test('Username field exists', () => {
    expect(document.getElementById('username')).toBeTruthy();
  });

  test('Password field exists', () => {
    const password = document.getElementById('password');
    expect(password).toBeTruthy();
    expect(password.type).toBe('password');
  });

  test('Show password checkbox exists', () => {
    expect(document.getElementById('showPassword')).toBeTruthy();
  });

  test('Submit button exists', () => {
    const button = document.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
  });
});`,
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'easy',
    tags: ['login', 'form', 'password']
  }
];

async function seedQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const Tenant = require('../models/Tenant');
    const Instructor = require('../models/Instructor');
    
    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    // Delete existing HTML+CSS+JS questions
    await FrontendQuestion.deleteMany({ 
      allowedFiles: { $all: ['html', 'css', 'js'] }
    });
    console.log('Deleted existing HTML+CSS+JS questions');

    // Insert new questions with empty default files
    const questionsWithDefaults = questions.map(q => ({
      ...q,
      defaultFiles: {
        html: '',
        css: '',
        js: ''
      },
      tenant: tenant._id,
      createdBy: instructor._id
    }));
    
    const inserted = await FrontendQuestion.insertMany(questionsWithDefaults);
    console.log(`Inserted ${inserted.length} HTML+CSS+JS questions`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  }
}

seedQuestions();
