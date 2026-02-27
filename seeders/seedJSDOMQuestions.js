require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const jsDOMQuestions = [
  {
    title: "Interactive Button Click Counter",
    problemStatement: "Create a button that displays how many times it has been clicked. The count should update in real-time.",
    requirements: [
      "Create a button with id 'clickBtn'",
      "Button should display initial text 'Clicked 0 times'",
      "Add click event listener to the button",
      "Update button text with count on each click"
    ],
    acceptanceCriteria: [
      "Button exists with correct id",
      "Click event listener is attached",
      "Counter increments on each click",
      "Button text updates correctly"
    ],
    jestTestFile: `describe('Button Click Counter', () => {
  test('button exists', () => {
    const btn = document.getElementById('clickBtn');
    expect(btn).toBeTruthy();
  });
  test('button has initial text', () => {
    const btn = document.getElementById('clickBtn');
    expect(btn.textContent).toContain('0');
  });
  test('counter increments on click', () => {
    const btn = document.getElementById('clickBtn');
    btn.click();
    expect(btn.textContent).toContain('1');
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: '// Write your JavaScript here'
    },
    allowedFiles: ['html', 'js'],
    expectedOutput: `<div style="padding:20px;font-family:Arial,sans-serif;"><button style="padding:12px 24px;font-size:16px;background:#007bff;color:white;border:none;border-radius:5px;cursor:pointer;">Clicked 3 times</button><p style="margin-top:10px;color:#666;font-size:14px;">Button updates count on each click</p></div>`,
    difficulty: 'easy',
    tags: ['JavaScript', 'DOM', 'Events']
  },
  {
    title: "Dynamic List Item Addition",
    problemStatement: "Create an input field and button that adds new items to an unordered list when clicked.",
    requirements: [
      "Create input field with id 'itemInput'",
      "Create button with id 'addBtn'",
      "Create empty ul with id 'itemList'",
      "Add click event to create and append li elements",
      "Clear input after adding item"
    ],
    acceptanceCriteria: [
      "Input and button exist",
      "Items are added to list on click",
      "Empty input is not added",
      "Input clears after adding"
    ],
    jestTestFile: `describe('Dynamic List', () => {
  test('elements exist', () => {
    expect(document.getElementById('itemInput')).toBeTruthy();
    expect(document.getElementById('addBtn')).toBeTruthy();
    expect(document.getElementById('itemList')).toBeTruthy();
  });
  test('adds item to list', () => {
    const input = document.getElementById('itemInput');
    const btn = document.getElementById('addBtn');
    const list = document.getElementById('itemList');
    input.value = 'Test';
    btn.click();
    expect(list.children.length).toBeGreaterThan(0);
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: '// Write your JavaScript here'
    },
    allowedFiles: ['html', 'js'],
    expectedOutput: `<div style="padding:20px;font-family:Arial,sans-serif;"><input type="text" placeholder="Enter item" style="padding:8px;border:1px solid #ddd;border-radius:4px;margin-right:8px;"><button style="padding:8px 16px;background:#28a745;color:white;border:none;border-radius:4px;cursor:pointer;">Add Item</button><ul style="margin-top:15px;list-style:disc;padding-left:20px;"><li style="margin:5px 0;">Buy groceries</li><li style="margin:5px 0;">Walk the dog</li><li style="margin:5px 0;">Read a book</li></ul></div>`,
    difficulty: 'easy',
    tags: ['JavaScript', 'DOM', 'Events', 'Lists']
  },
  {
    title: "Toggle Visibility",
    problemStatement: "Create a button that toggles the visibility of a paragraph. The button text should change between 'Show' and 'Hide'.",
    requirements: [
      "Create button with id 'toggleBtn'",
      "Create paragraph with id 'content'",
      "Toggle display property between 'none' and 'block'",
      "Update button text based on visibility state"
    ],
    acceptanceCriteria: [
      "Button and paragraph exist",
      "Click toggles visibility",
      "Button text changes correctly",
      "Toggle works repeatedly"
    ],
    jestTestFile: `describe('Toggle Visibility', () => {
  test('elements exist', () => {
    expect(document.getElementById('toggleBtn')).toBeTruthy();
    expect(document.getElementById('content')).toBeTruthy();
  });
  test('toggles display', () => {
    const btn = document.getElementById('toggleBtn');
    const content = document.getElementById('content');
    btn.click();
    expect(content.style.display).toBe('none');
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: '// Write your JavaScript here'
    },
    allowedFiles: ['html', 'js'],
    expectedOutput: `<div style="padding:20px;font-family:Arial,sans-serif;"><button style="padding:10px 20px;background:#6c757d;color:white;border:none;border-radius:4px;cursor:pointer;margin-bottom:10px;">Show</button><p style="color:#666;line-height:1.6;display:none;">This is some content that can be hidden or shown.</p><p style="margin-top:10px;font-size:14px;color:#999;">Content is currently hidden</p></div>`,
    difficulty: 'easy',
    tags: ['JavaScript', 'DOM', 'Events', 'Visibility']
  },
  {
    title: "Change Background Color",
    problemStatement: "Create three buttons (Red, Green, Blue) that change the background color of a div when clicked.",
    requirements: [
      "Create div with id 'colorBox'",
      "Create three buttons with ids 'redBtn', 'greenBtn', 'blueBtn'",
      "Add click events to each button",
      "Change div background color based on button clicked"
    ],
    acceptanceCriteria: [
      "Div and three buttons exist",
      "Red button changes color to red",
      "Green button changes color to green",
      "Blue button changes color to blue"
    ],
    jestTestFile: `describe('Color Changer', () => {
  test('elements exist', () => {
    expect(document.getElementById('colorBox')).toBeTruthy();
    expect(document.getElementById('redBtn')).toBeTruthy();
    expect(document.getElementById('greenBtn')).toBeTruthy();
    expect(document.getElementById('blueBtn')).toBeTruthy();
  });
  test('changes color', () => {
    const box = document.getElementById('colorBox');
    const redBtn = document.getElementById('redBtn');
    redBtn.click();
    expect(box.style.backgroundColor).toBe('red');
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: '// Write your JavaScript here'
    },
    allowedFiles: ['html', 'js'],
    expectedOutput: `<div style="padding:20px;font-family:Arial,sans-serif;"><div style="width:200px;height:200px;border:2px solid #333;background:green;margin-bottom:15px;border-radius:8px;"></div><button style="padding:10px 20px;background:#dc3545;color:white;border:none;border-radius:4px;margin:5px;cursor:pointer;">Red</button><button style="padding:10px 20px;background:#28a745;color:white;border:none;border-radius:4px;margin:5px;cursor:pointer;">Green</button><button style="padding:10px 20px;background:#007bff;color:white;border:none;border-radius:4px;margin:5px;cursor:pointer;">Blue</button></div>`,
    difficulty: 'easy',
    tags: ['JavaScript', 'DOM', 'Events', 'Styling']
  },
  {
    title: "Form Input Validation",
    problemStatement: "Create a form with a text input and submit button. Display an error message if the input is empty when submitted.",
    requirements: [
      "Create form with id 'myForm'",
      "Create input with id 'nameInput'",
      "Create paragraph with id 'error' for error messages",
      "Prevent form submission with preventDefault",
      "Validate input is not empty",
      "Display error message if empty"
    ],
    acceptanceCriteria: [
      "Form submission is prevented",
      "Empty input shows error",
      "Valid input clears error",
      "Whitespace-only input is invalid"
    ],
    jestTestFile: `describe('Form Validation', () => {
  test('elements exist', () => {
    expect(document.getElementById('myForm')).toBeTruthy();
    expect(document.getElementById('nameInput')).toBeTruthy();
    expect(document.getElementById('error')).toBeTruthy();
  });
  test('shows error on empty submit', () => {
    const form = document.getElementById('myForm');
    const error = document.getElementById('error');
    form.dispatchEvent(new Event('submit'));
    expect(error.textContent).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: '// Write your JavaScript here'
    },
    allowedFiles: ['html', 'js'],
    expectedOutput: `<div style="padding:20px;font-family:Arial,sans-serif;"><form style="display:flex;flex-direction:column;gap:10px;max-width:300px;"><input type="text" placeholder="Enter your name" style="padding:10px;border:1px solid #ddd;border-radius:4px;"><button type="submit" style="padding:10px;background:#007bff;color:white;border:none;border-radius:4px;cursor:pointer;">Submit</button><p style="color:#dc3545;margin:0;font-size:14px;">Name is required!</p></form></div>`,
    difficulty: 'medium',
    tags: ['JavaScript', 'DOM', 'Forms', 'Validation']
  },
  {
    title: "Dynamic Class Toggle",
    problemStatement: "Create a button that toggles a CSS class on a div. The class should change the div's appearance (add border and background).",
    requirements: [
      "Create div with id 'box'",
      "Create button with id 'toggleBtn'",
      "Define CSS class 'highlight' with styling",
      "Use classList.toggle to add/remove class"
    ],
    acceptanceCriteria: [
      "Div and button exist",
      "Click toggles 'highlight' class",
      "Class affects visual appearance",
      "Toggle works repeatedly"
    ],
    jestTestFile: `describe('Class Toggle', () => {
  test('elements exist', () => {
    expect(document.getElementById('box')).toBeTruthy();
    expect(document.getElementById('toggleBtn')).toBeTruthy();
  });
  test('toggles class', () => {
    const box = document.getElementById('box');
    const btn = document.getElementById('toggleBtn');
    btn.click();
    expect(box.classList.contains('highlight')).toBe(true);
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: `.highlight {
  background-color: yellow;
  border: 3px solid orange;
  padding: 20px;
}`,
      js: '// Write your JavaScript here'
    },
    allowedFiles: ['html', 'css', 'js'],
    expectedOutput: `<div style="padding:20px;font-family:Arial,sans-serif;"><div style="background:yellow;border:3px solid orange;padding:20px;margin-bottom:15px;border-radius:4px;">This is a box</div><button style="padding:10px 20px;background:#6c757d;color:white;border:none;border-radius:4px;cursor:pointer;">Toggle Highlight</button><p style="margin-top:10px;font-size:14px;color:#666;">Click button to toggle highlight class</p></div>`,
    difficulty: 'medium',
    tags: ['JavaScript', 'DOM', 'CSS', 'classList']
  },
  {
    title: "Live Character Counter",
    problemStatement: "Create a textarea with a character counter that updates in real-time as the user types. Show remaining characters out of 100.",
    requirements: [
      "Create textarea with id 'textArea' and maxlength 100",
      "Create paragraph with id 'counter'",
      "Add input event listener to textarea",
      "Update counter with format 'X / 100'"
    ],
    acceptanceCriteria: [
      "Textarea and counter exist",
      "Counter updates on input",
      "Counter shows correct format",
      "Counter updates on deletion"
    ],
    jestTestFile: `describe('Character Counter', () => {
  test('elements exist', () => {
    expect(document.getElementById('textArea')).toBeTruthy();
    expect(document.getElementById('counter')).toBeTruthy();
  });
  test('counter updates', () => {
    const textArea = document.getElementById('textArea');
    const counter = document.getElementById('counter');
    textArea.value = 'Hello';
    textArea.dispatchEvent(new Event('input'));
    expect(counter.textContent).toContain('5');
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: '// Write your JavaScript here'
    },
    allowedFiles: ['html', 'js'],
    expectedOutput: `<div style="padding:20px;font-family:Arial,sans-serif;"><textarea rows="4" style="width:100%;max-width:400px;padding:10px;border:1px solid #ddd;border-radius:4px;font-family:Arial,sans-serif;resize:vertical;">Hello, this is a sample text to demonstrate the character counter feature.</textarea><p style="margin-top:8px;color:#666;font-size:14px;">73 / 100 characters</p></div>`,
    difficulty: 'medium',
    tags: ['JavaScript', 'DOM', 'Events', 'Input']
  },
  {
    title: "Remove List Items",
    problemStatement: "Create a list where each item has a delete button. Clicking the delete button should remove that specific item from the list.",
    requirements: [
      "Create ul with id 'itemList'",
      "Create li elements with delete buttons",
      "Use event delegation on ul",
      "Remove li when delete button clicked"
    ],
    acceptanceCriteria: [
      "List with items exists",
      "Each item has delete button",
      "Clicking delete removes correct item",
      "Event delegation is used"
    ],
    jestTestFile: `describe('Remove List Items', () => {
  test('list exists', () => {
    expect(document.getElementById('itemList')).toBeTruthy();
  });
  test('removes item', () => {
    const list = document.getElementById('itemList');
    const initialCount = list.children.length;
    const deleteBtn = list.querySelector('.deleteBtn');
    deleteBtn.click();
    expect(list.children.length).toBe(initialCount - 1);
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: '// Write your JavaScript here'
    },
    allowedFiles: ['html', 'js'],
    expectedOutput: `<div style="padding:20px;font-family:Arial,sans-serif;"><ul style="list-style:none;padding:0;"><li style="padding:10px;border:1px solid #ddd;margin:5px 0;border-radius:4px;display:flex;justify-content:space-between;align-items:center;">Item 1 <button style="padding:5px 12px;background:#dc3545;color:white;border:none;border-radius:4px;cursor:pointer;font-size:12px;">Delete</button></li><li style="padding:10px;border:1px solid #ddd;margin:5px 0;border-radius:4px;display:flex;justify-content:space-between;align-items:center;">Item 3 <button style="padding:5px 12px;background:#dc3545;color:white;border:none;border-radius:4px;cursor:pointer;font-size:12px;">Delete</button></li></ul><p style="margin-top:10px;font-size:14px;color:#999;">Item 2 was deleted</p></div>`,
    difficulty: 'medium',
    tags: ['JavaScript', 'DOM', 'Events', 'Event Delegation']
  }
];

async function seedJSDOMQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    await FrontendQuestion.deleteMany({ tags: 'DOM' });
    console.log('Deleted existing JS DOM questions');

    for (const question of jsDOMQuestions) {
      await FrontendQuestion.create({
        ...question,
        tenant: tenant._id,
        createdBy: instructor._id
      });
      console.log(`Created: ${question.title}`);
    }

    console.log(`\nAll ${jsDOMQuestions.length} JavaScript DOM questions created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedJSDOMQuestions();
