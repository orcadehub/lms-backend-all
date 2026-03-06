require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const jsQuestions = [
  {
    title: 'Display Current Date and Time',
    problemStatement: 'Use JavaScript to display the current date and time in a div element when the page loads.',
    requirements: [
      'Select div with id="datetime"',
      'Create new Date object',
      'Format date as readable string',
      'Set innerHTML of div to formatted date',
      'Include both date and time',
      'Code should run on page load'
    ],
    acceptanceCriteria: [
      'Div element is selected correctly',
      'Date object is created',
      'Date is formatted properly',
      'Content is displayed in div',
      'Both date and time are shown'
    ],
    jestTestFile: `describe('Display Date Time', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="datetime"></div>';
  });
  test('datetime div exists', () => {
    expect(document.getElementById('datetime')).toBeTruthy();
  });
  test('datetime div has content', () => {
    eval(window.__JS__);
    const div = document.getElementById('datetime');
    expect(div.innerHTML.length).toBeGreaterThan(0);
  });
  test('content includes date elements', () => {
    eval(window.__JS__);
    const div = document.getElementById('datetime');
    const content = div.innerHTML;
    expect(content).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: '<div id="datetime"></div>',
      css: '#datetime { font-size: 20px; padding: 20px; text-align: center; }',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'easy',
    tags: ['JavaScript', 'DOM', 'Date']
  },
  {
    title: 'Toggle Button Text on Click',
    problemStatement: 'Create a button that toggles its text between "ON" and "OFF" when clicked.',
    requirements: [
      'Select button with id="toggleBtn"',
      'Add click event listener to button',
      'Check current button text',
      'If text is "ON", change to "OFF"',
      'If text is "OFF", change to "ON"',
      'Use textContent property'
    ],
    acceptanceCriteria: [
      'Button is selected correctly',
      'Event listener is attached',
      'Text toggles on click',
      'Logic handles both states',
      'Uses textContent property'
    ],
    jestTestFile: `describe('Toggle Button', () => {
  beforeEach(() => {
    document.body.innerHTML = '<button id="toggleBtn">ON</button>';
    eval(window.__JS__);
  });
  test('button exists', () => {
    expect(document.getElementById('toggleBtn')).toBeTruthy();
  });
  test('button has initial text', () => {
    const btn = document.getElementById('toggleBtn');
    expect(btn.textContent).toBe('ON');
  });
  test('button toggles on click', () => {
    const btn = document.getElementById('toggleBtn');
    btn.click();
    expect(btn.textContent).toBe('OFF');
    btn.click();
    expect(btn.textContent).toBe('ON');
  });
});`,
    defaultFiles: {
      html: '<button id="toggleBtn">ON</button>',
      css: '#toggleBtn { padding: 10px 20px; font-size: 16px; cursor: pointer; }',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'easy',
    tags: ['JavaScript', 'Events', 'DOM']
  },
  {
    title: 'Calculate Sum of Array Numbers',
    problemStatement: 'Write a function that calculates and displays the sum of numbers in an array.',
    requirements: [
      'Create array: [10, 20, 30, 40, 50]',
      'Create function calculateSum(arr)',
      'Use loop or reduce to sum all numbers',
      'Return the sum',
      'Display result in div with id="result"',
      'Call function with the array'
    ],
    acceptanceCriteria: [
      'Array is defined correctly',
      'Function exists and works',
      'Sum is calculated correctly',
      'Result is displayed in div',
      'Function is called'
    ],
    jestTestFile: `describe('Calculate Sum', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="result"></div>';
    eval(window.__JS__);
  });
  test('result div exists', () => {
    expect(document.getElementById('result')).toBeTruthy();
  });
  test('result shows correct sum', () => {
    const result = document.getElementById('result');
    expect(result.innerHTML).toContain('150');
  });
  test('calculateSum function exists', () => {
    expect(typeof calculateSum).toBe('function');
  });
  test('function returns correct sum', () => {
    expect(calculateSum([10, 20, 30, 40, 50])).toBe(150);
  });
});`,
    defaultFiles: {
      html: '<div id="result"></div>',
      css: '#result { font-size: 24px; padding: 20px; text-align: center; }',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'easy',
    tags: ['JavaScript', 'Arrays', 'Functions']
  },
  {
    title: 'Filter Even Numbers from Array',
    problemStatement: 'Create a function that filters even numbers from an array and displays them as a list.',
    requirements: [
      'Create array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]',
      'Create function filterEven(arr)',
      'Use filter method to get even numbers',
      'Return filtered array',
      'Create ul element with id="evenList"',
      'Loop through filtered array and create li for each number'
    ],
    acceptanceCriteria: [
      'Array is defined',
      'Function filters correctly',
      'Only even numbers returned',
      'List is created in DOM',
      'All even numbers displayed'
    ],
    jestTestFile: `describe('Filter Even Numbers', () => {
  beforeEach(() => {
    document.body.innerHTML = '<ul id="evenList"></ul>';
    eval(window.__JS__);
  });
  test('evenList exists', () => {
    expect(document.getElementById('evenList')).toBeTruthy();
  });
  test('list has items', () => {
    const items = document.querySelectorAll('#evenList li');
    expect(items.length).toBe(5);
  });
  test('filterEven function exists', () => {
    expect(typeof filterEven).toBe('function');
  });
  test('function returns even numbers', () => {
    const result = filterEven([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(result).toEqual([2, 4, 6, 8, 10]);
  });
});`,
    defaultFiles: {
      html: '<ul id="evenList"></ul>',
      css: '#evenList { list-style: none; padding: 20px; } #evenList li { padding: 8px; background: #f0f0f0; margin: 4px; }',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['JavaScript', 'Arrays', 'Filter']
  },
  {
    title: 'Change Background Color on Button Click',
    problemStatement: 'Create buttons that change the page background color when clicked.',
    requirements: [
      'Select all buttons with class "colorBtn"',
      'Add click event listener to each button',
      'Get data-color attribute from clicked button',
      'Set document.body.style.backgroundColor to that color',
      'Create at least 3 color buttons',
      'Use forEach to attach listeners'
    ],
    acceptanceCriteria: [
      'Buttons are selected correctly',
      'Event listeners attached to all',
      'Background changes on click',
      'Uses data attributes',
      'Multiple colors work'
    ],
    jestTestFile: `describe('Change Background Color', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <button class="colorBtn" data-color="red">Red</button>
      <button class="colorBtn" data-color="blue">Blue</button>
      <button class="colorBtn" data-color="green">Green</button>
    \`;
    eval(window.__JS__);
  });
  test('buttons exist', () => {
    const buttons = document.querySelectorAll('.colorBtn');
    expect(buttons.length).toBe(3);
  });
  test('clicking button changes background', () => {
    const btn = document.querySelector('[data-color="red"]');
    btn.click();
    expect(document.body.style.backgroundColor).toBe('red');
  });
  test('different buttons work', () => {
    const blueBtn = document.querySelector('[data-color="blue"]');
    blueBtn.click();
    expect(document.body.style.backgroundColor).toBe('blue');
  });
});`,
    defaultFiles: {
      html: '<button class="colorBtn" data-color="red">Red</button>\n<button class="colorBtn" data-color="blue">Blue</button>\n<button class="colorBtn" data-color="green">Green</button>',
      css: '.colorBtn { padding: 10px 20px; margin: 5px; cursor: pointer; }',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['JavaScript', 'Events', 'DOM']
  },
  {
    title: 'Form Validation for Email',
    problemStatement: 'Validate an email input field and show error message if invalid when form is submitted.',
    requirements: [
      'Select form with id="emailForm"',
      'Add submit event listener',
      'Prevent default form submission',
      'Get email input value',
      'Check if email contains "@" and "."',
      'Display error in div with id="error" if invalid',
      'Clear error if valid'
    ],
    acceptanceCriteria: [
      'Form submission is prevented',
      'Email value is retrieved',
      'Validation logic works',
      'Error message displays',
      'Valid emails pass'
    ],
    jestTestFile: `describe('Email Validation', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <form id="emailForm">
        <input type="text" id="email" />
        <button type="submit">Submit</button>
      </form>
      <div id="error"></div>
    \`;
    eval(window.__JS__);
  });
  test('form exists', () => {
    expect(document.getElementById('emailForm')).toBeTruthy();
  });
  test('invalid email shows error', () => {
    const input = document.getElementById('email');
    const form = document.getElementById('emailForm');
    input.value = 'invalidemail';
    form.dispatchEvent(new Event('submit'));
    const error = document.getElementById('error');
    expect(error.innerHTML.length).toBeGreaterThan(0);
  });
  test('valid email clears error', () => {
    const input = document.getElementById('email');
    const form = document.getElementById('emailForm');
    input.value = 'test@example.com';
    form.dispatchEvent(new Event('submit'));
    const error = document.getElementById('error');
    expect(error.innerHTML).toBe('');
  });
});`,
    defaultFiles: {
      html: '<form id="emailForm">\n  <input type="text" id="email" placeholder="Enter email" />\n  <button type="submit">Submit</button>\n</form>\n<div id="error"></div>',
      css: '#error { color: red; margin-top: 10px; } input { padding: 8px; margin: 5px; }',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['JavaScript', 'Forms', 'Validation']
  },
  {
    title: 'Create Dynamic Table from Array',
    problemStatement: 'Generate an HTML table dynamically from an array of objects containing user data.',
    requirements: [
      'Create array of 3 user objects with name and age properties',
      'Select table with id="userTable"',
      'Create thead with th elements for "Name" and "Age"',
      'Create tbody',
      'Loop through array and create tr with td for each user',
      'Append all elements to table'
    ],
    acceptanceCriteria: [
      'Array of objects exists',
      'Table is selected',
      'Headers are created',
      'Rows are generated dynamically',
      'All data is displayed'
    ],
    jestTestFile: `describe('Dynamic Table', () => {
  beforeEach(() => {
    document.body.innerHTML = '<table id="userTable"></table>';
    eval(window.__JS__);
  });
  test('table exists', () => {
    expect(document.getElementById('userTable')).toBeTruthy();
  });
  test('table has headers', () => {
    const headers = document.querySelectorAll('#userTable th');
    expect(headers.length).toBe(2);
  });
  test('table has data rows', () => {
    const rows = document.querySelectorAll('#userTable tbody tr');
    expect(rows.length).toBe(3);
  });
  test('each row has 2 cells', () => {
    const firstRow = document.querySelector('#userTable tbody tr');
    const cells = firstRow.querySelectorAll('td');
    expect(cells.length).toBe(2);
  });
});`,
    defaultFiles: {
      html: '<table id="userTable"></table>',
      css: 'table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid #ddd; padding: 12px; text-align: left; } th { background: #4CAF50; color: white; }',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['JavaScript', 'DOM', 'Tables']
  },
  {
    title: 'Countdown Timer',
    problemStatement: 'Create a countdown timer that counts down from 10 to 0 and displays "Time Up!" when finished.',
    requirements: [
      'Create variable count = 10',
      'Select div with id="timer"',
      'Use setInterval to decrease count every second',
      'Update div innerHTML with current count',
      'When count reaches 0, display "Time Up!"',
      'Clear interval when done'
    ],
    acceptanceCriteria: [
      'Timer starts at 10',
      'Count decreases every second',
      'Display updates correctly',
      'Shows "Time Up!" at end',
      'Interval is cleared'
    ],
    jestTestFile: `describe('Countdown Timer', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="timer"></div>';
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  test('timer div exists', () => {
    expect(document.getElementById('timer')).toBeTruthy();
  });
  test('timer shows initial value', () => {
    eval(window.__JS__);
    const timer = document.getElementById('timer');
    expect(timer.innerHTML).toContain('10');
  });
  test('timer counts down', () => {
    eval(window.__JS__);
    const timer = document.getElementById('timer');
    jest.advanceTimersByTime(1000);
    expect(timer.innerHTML).toContain('9');
  });
});`,
    defaultFiles: {
      html: '<div id="timer"></div>',
      css: '#timer { font-size: 48px; text-align: center; padding: 40px; font-weight: bold; }',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'hard',
    tags: ['JavaScript', 'Timers', 'setInterval']
  },
  {
    title: 'Search and Filter List Items',
    problemStatement: 'Create a search box that filters a list of items in real-time as user types.',
    requirements: [
      'Select input with id="searchBox"',
      'Select all li elements with class "item"',
      'Add input event listener to search box',
      'Get search value and convert to lowercase',
      'Loop through all items',
      'Hide items that don\'t match search (display: none)',
      'Show items that match (display: block)'
    ],
    acceptanceCriteria: [
      'Search box is selected',
      'Items are selected',
      'Input event listener works',
      'Filtering logic is correct',
      'Items hide/show properly'
    ],
    jestTestFile: `describe('Search Filter', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <input type="text" id="searchBox" />
      <ul>
        <li class="item">Apple</li>
        <li class="item">Banana</li>
        <li class="item">Orange</li>
      </ul>
    \`;
    eval(window.__JS__);
  });
  test('searchBox exists', () => {
    expect(document.getElementById('searchBox')).toBeTruthy();
  });
  test('items exist', () => {
    const items = document.querySelectorAll('.item');
    expect(items.length).toBe(3);
  });
  test('filtering works', () => {
    const searchBox = document.getElementById('searchBox');
    searchBox.value = 'app';
    searchBox.dispatchEvent(new Event('input'));
    const items = document.querySelectorAll('.item');
    expect(items[0].style.display).not.toBe('none');
    expect(items[1].style.display).toBe('none');
  });
});`,
    defaultFiles: {
      html: '<input type="text" id="searchBox" placeholder="Search..." />\n<ul>\n  <li class="item">Apple</li>\n  <li class="item">Banana</li>\n  <li class="item">Orange</li>\n  <li class="item">Grapes</li>\n  <li class="item">Mango</li>\n</ul>',
      css: '#searchBox { width: 100%; padding: 10px; margin-bottom: 10px; } .item { padding: 10px; background: #f0f0f0; margin: 5px 0; list-style: none; }',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'hard',
    tags: ['JavaScript', 'Search', 'Filter']
  },
  {
    title: 'Local Storage Todo List',
    problemStatement: 'Create a simple todo list that saves items to localStorage and loads them on page refresh.',
    requirements: [
      'Select input with id="todoInput" and button with id="addBtn"',
      'Add click event to button',
      'Get input value and add to array',
      'Save array to localStorage using JSON.stringify',
      'Display todos in ul with id="todoList"',
      'On page load, retrieve from localStorage using JSON.parse',
      'Display saved todos'
    ],
    acceptanceCriteria: [
      'Input and button are selected',
      'Todos are added to array',
      'localStorage is used',
      'Todos are displayed',
      'Data persists on reload'
    ],
    jestTestFile: `describe('Todo List with Storage', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <input type="text" id="todoInput" />
      <button id="addBtn">Add</button>
      <ul id="todoList"></ul>
    \`;
    localStorage.clear();
    eval(window.__JS__);
  });
  test('elements exist', () => {
    expect(document.getElementById('todoInput')).toBeTruthy();
    expect(document.getElementById('addBtn')).toBeTruthy();
    expect(document.getElementById('todoList')).toBeTruthy();
  });
  test('adding todo works', () => {
    const input = document.getElementById('todoInput');
    const btn = document.getElementById('addBtn');
    input.value = 'Test Todo';
    btn.click();
    const items = document.querySelectorAll('#todoList li');
    expect(items.length).toBeGreaterThan(0);
  });
  test('localStorage is used', () => {
    const input = document.getElementById('todoInput');
    const btn = document.getElementById('addBtn');
    input.value = 'Test Todo';
    btn.click();
    expect(localStorage.getItem('todos')).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: '<input type="text" id="todoInput" placeholder="Enter todo" />\n<button id="addBtn">Add Todo</button>\n<ul id="todoList"></ul>',
      css: '#todoInput { padding: 8px; width: 200px; } #addBtn { padding: 8px 16px; cursor: pointer; } #todoList { list-style: none; padding: 0; } #todoList li { padding: 10px; background: #f0f0f0; margin: 5px 0; }',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'hard',
    tags: ['JavaScript', 'localStorage', 'DOM']
  }
];

async function seed10JSQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    for (const question of jsQuestions) {
      await FrontendQuestion.create({
        ...question,
        tenant: tenant._id,
        createdBy: instructor._id
      });
      console.log(`Created: ${question.title}`);
    }

    console.log(`\nAll ${jsQuestions.length} JavaScript questions created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seed10JSQuestions();
