require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const jsQuestions = [
  {
    title: 'JavaScript Variables and Data Types',
    problemStatement: 'Create variables of different data types and display them in the HTML.',
    requirements: [
      "Create a string variable 'name' with value 'John'",
      "Create a number variable 'age' with value 25",
      "Create a boolean variable 'isStudent' with value true",
      "Display all variables in elements with ids 'nameDisplay', 'ageDisplay', 'isStudentDisplay'",
      "Add a button with id 'showBtn' that triggers the display"
    ],
    acceptanceCriteria: [
      'Variables are created correctly',
      'Button exists',
      'Click displays name',
      'Click displays age',
      'Click displays boolean'
    ],
    jestTestFile: `describe('JavaScript Variables', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
    eval(window.__JS__);
  });

  test('button exists', () => {
    expect(document.getElementById('showBtn')).toBeTruthy();
  });

  test('name display element exists', () => {
    expect(document.getElementById('nameDisplay')).toBeTruthy();
  });

  test('clicking button displays name', () => {
    const btn = document.getElementById('showBtn');
    btn.click();
    const nameDisplay = document.getElementById('nameDisplay');
    expect(nameDisplay.textContent).toContain('John');
  });

  test('clicking button displays age', () => {
    const btn = document.getElementById('showBtn');
    btn.click();
    const ageDisplay = document.getElementById('ageDisplay');
    expect(ageDisplay.textContent).toContain('25');
  });

  test('clicking button displays boolean', () => {
    const btn = document.getElementById('showBtn');
    btn.click();
    const isStudentDisplay = document.getElementById('isStudentDisplay');
    expect(isStudentDisplay.textContent).toContain('true');
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['js'],
    difficulty: 'easy',
    tags: ['JavaScript', 'Variables', 'Data Types']
  },

  {
    title: 'JavaScript Functions and Event Handling',
    problemStatement: 'Create a function that handles button click events and updates the DOM.',
    requirements: [
      "Create a function 'greetUser' that takes a name parameter",
      "Function should display greeting in element with id 'greeting'",
      "Add click event listener to button with id 'greetBtn'",
      "On click, call greetUser with name 'Alice'",
      "Greeting should say 'Hello, Alice!'"
    ],
    acceptanceCriteria: [
      'Function is defined',
      'Button exists',
      'Click event is attached',
      'Greeting is displayed',
      'Greeting text is correct'
    ],
    jestTestFile: `describe('JavaScript Functions', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
    eval(window.__JS__);
  });

  test('button exists', () => {
    expect(document.getElementById('greetBtn')).toBeTruthy();
  });

  test('greeting element exists', () => {
    expect(document.getElementById('greeting')).toBeTruthy();
  });

  test('clicking button displays greeting', () => {
    const btn = document.getElementById('greetBtn');
    btn.click();
    const greeting = document.getElementById('greeting');
    expect(greeting.textContent.length).toBeGreaterThan(0);
  });

  test('greeting contains Hello', () => {
    const btn = document.getElementById('greetBtn');
    btn.click();
    const greeting = document.getElementById('greeting');
    expect(greeting.textContent).toContain('Hello');
  });

  test('greeting contains Alice', () => {
    const btn = document.getElementById('greetBtn');
    btn.click();
    const greeting = document.getElementById('greeting');
    expect(greeting.textContent).toContain('Alice');
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['js'],
    difficulty: 'easy',
    tags: ['JavaScript', 'Functions', 'Events']
  },

  {
    title: 'JavaScript Arrays and Loops',
    problemStatement: 'Create an array, loop through it, and display items in a list.',
    requirements: [
      "Create an array 'fruits' with ['Apple', 'Banana', 'Orange']",
      "Loop through the array using for loop",
      "Create li elements for each fruit",
      "Append li elements to ul with id 'fruitList'",
      "Add a button with id 'displayBtn' to trigger the display"
    ],
    acceptanceCriteria: [
      'Array is created',
      'Button exists',
      'List is populated on click',
      'All fruits are displayed',
      'List items are created'
    ],
    jestTestFile: `describe('JavaScript Arrays and Loops', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
    eval(window.__JS__);
  });

  test('button exists', () => {
    expect(document.getElementById('displayBtn')).toBeTruthy();
  });

  test('fruit list exists', () => {
    expect(document.getElementById('fruitList')).toBeTruthy();
  });

  test('clicking button populates list', () => {
    const btn = document.getElementById('displayBtn');
    btn.click();
    const list = document.getElementById('fruitList');
    expect(list.children.length).toBeGreaterThan(0);
  });

  test('list contains Apple', () => {
    const btn = document.getElementById('displayBtn');
    btn.click();
    const list = document.getElementById('fruitList');
    const text = list.textContent;
    expect(text).toContain('Apple');
  });

  test('list contains all three fruits', () => {
    const btn = document.getElementById('displayBtn');
    btn.click();
    const list = document.getElementById('fruitList');
    expect(list.children.length).toBeGreaterThanOrEqual(3);
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['js'],
    difficulty: 'medium',
    tags: ['JavaScript', 'Arrays', 'Loops']
  },

  {
    title: 'JavaScript DOM Manipulation',
    problemStatement: 'Manipulate DOM elements by changing styles, classes, and content.',
    requirements: [
      "Get element with id 'box'",
      "On button click, change box background-color to 'blue'",
      "Change box textContent to 'Changed!'",
      "Add class 'active' to the box",
      "Button should have id 'changeBtn'"
    ],
    acceptanceCriteria: [
      'Button exists',
      'Box element exists',
      'Background color changes',
      'Text content changes',
      'Class is added'
    ],
    jestTestFile: `describe('JavaScript DOM Manipulation', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
    eval(window.__JS__);
  });

  test('button exists', () => {
    expect(document.getElementById('changeBtn')).toBeTruthy();
  });

  test('box element exists', () => {
    expect(document.getElementById('box')).toBeTruthy();
  });

  test('clicking button changes background', () => {
    const btn = document.getElementById('changeBtn');
    const box = document.getElementById('box');
    btn.click();
    const bgColor = window.getComputedStyle(box).backgroundColor;
    expect(bgColor).toBe('rgb(0, 0, 255)');
  });

  test('clicking button changes text', () => {
    const btn = document.getElementById('changeBtn');
    const box = document.getElementById('box');
    btn.click();
    expect(box.textContent).toContain('Changed');
  });

  test('clicking button adds class', () => {
    const btn = document.getElementById('changeBtn');
    const box = document.getElementById('box');
    btn.click();
    expect(box.classList.contains('active')).toBe(true);
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '.active { border: 2px solid red; }',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['js'],
    difficulty: 'medium',
    tags: ['JavaScript', 'DOM', 'Manipulation']
  },

  {
    title: 'JavaScript Form Validation',
    problemStatement: 'Validate form input and display error messages.',
    requirements: [
      "Get input with id 'email'",
      "Get button with id 'submitBtn'",
      "On click, check if email contains '@'",
      "If valid, display 'Valid email' in element with id 'message'",
      "If invalid, display 'Invalid email' in red color"
    ],
    acceptanceCriteria: [
      'Form elements exist',
      'Validation function works',
      'Valid email shows success',
      'Invalid email shows error',
      'Message is displayed'
    ],
    jestTestFile: `describe('JavaScript Form Validation', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
    eval(window.__JS__);
  });

  test('email input exists', () => {
    expect(document.getElementById('email')).toBeTruthy();
  });

  test('submit button exists', () => {
    expect(document.getElementById('submitBtn')).toBeTruthy();
  });

  test('valid email shows success message', () => {
    const input = document.getElementById('email');
    const btn = document.getElementById('submitBtn');
    input.value = 'test@example.com';
    btn.click();
    const message = document.getElementById('message');
    expect(message.textContent).toContain('Valid');
  });

  test('invalid email shows error message', () => {
    const input = document.getElementById('email');
    const btn = document.getElementById('submitBtn');
    input.value = 'invalid';
    btn.click();
    const message = document.getElementById('message');
    expect(message.textContent).toContain('Invalid');
  });

  test('message element exists', () => {
    expect(document.getElementById('message')).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['js'],
    difficulty: 'medium',
    tags: ['JavaScript', 'Forms', 'Validation']
  },

  {
    title: 'JavaScript Objects and Methods',
    problemStatement: 'Create an object with properties and methods, then display the data.',
    requirements: [
      "Create object 'person' with properties: name='Bob', age=30",
      "Add method 'introduce' that returns 'Hi, I am Bob'",
      "On button click, call introduce method",
      "Display result in element with id 'intro'",
      "Button should have id 'introBtn'"
    ],
    acceptanceCriteria: [
      'Object is created',
      'Object has properties',
      'Method exists',
      'Button triggers method',
      'Introduction is displayed'
    ],
    jestTestFile: `describe('JavaScript Objects', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
    eval(window.__JS__);
  });

  test('button exists', () => {
    expect(document.getElementById('introBtn')).toBeTruthy();
  });

  test('intro element exists', () => {
    expect(document.getElementById('intro')).toBeTruthy();
  });

  test('clicking button displays introduction', () => {
    const btn = document.getElementById('introBtn');
    btn.click();
    const intro = document.getElementById('intro');
    expect(intro.textContent.length).toBeGreaterThan(0);
  });

  test('introduction contains Hi', () => {
    const btn = document.getElementById('introBtn');
    btn.click();
    const intro = document.getElementById('intro');
    expect(intro.textContent).toContain('Hi');
  });

  test('introduction contains Bob', () => {
    const btn = document.getElementById('introBtn');
    btn.click();
    const intro = document.getElementById('intro');
    expect(intro.textContent).toContain('Bob');
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['js'],
    difficulty: 'medium',
    tags: ['JavaScript', 'Objects', 'Methods']
  },

  {
    title: 'JavaScript Conditional Statements',
    problemStatement: 'Use if-else statements to check conditions and display results.',
    requirements: [
      "Get input with id 'numberInput'",
      "On button click, check if number is greater than 10",
      "If yes, display 'Greater than 10' in element with id 'result'",
      "If no, display 'Less than or equal to 10'",
      "Button should have id 'checkBtn'"
    ],
    acceptanceCriteria: [
      'Input exists',
      'Button exists',
      'Greater than 10 works',
      'Less than or equal works',
      'Result is displayed'
    ],
    jestTestFile: `describe('JavaScript Conditionals', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
    eval(window.__JS__);
  });

  test('input exists', () => {
    expect(document.getElementById('numberInput')).toBeTruthy();
  });

  test('button exists', () => {
    expect(document.getElementById('checkBtn')).toBeTruthy();
  });

  test('number greater than 10 shows correct message', () => {
    const input = document.getElementById('numberInput');
    const btn = document.getElementById('checkBtn');
    input.value = '15';
    btn.click();
    const result = document.getElementById('result');
    expect(result.textContent).toContain('Greater');
  });

  test('number less than 10 shows correct message', () => {
    const input = document.getElementById('numberInput');
    const btn = document.getElementById('checkBtn');
    input.value = '5';
    btn.click();
    const result = document.getElementById('result');
    expect(result.textContent).toContain('Less');
  });

  test('result element exists', () => {
    expect(document.getElementById('result')).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['js'],
    difficulty: 'easy',
    tags: ['JavaScript', 'Conditionals', 'If-Else']
  },

  {
    title: 'JavaScript String Methods',
    problemStatement: 'Use string methods to manipulate and display text.',
    requirements: [
      "Get input with id 'textInput'",
      "On button click, convert text to uppercase",
      "Display uppercase text in element with id 'upperText'",
      "Display text length in element with id 'lengthText'",
      "Button should have id 'convertBtn'"
    ],
    acceptanceCriteria: [
      'Input exists',
      'Button exists',
      'Text converts to uppercase',
      'Length is displayed',
      'Both outputs are shown'
    ],
    jestTestFile: `describe('JavaScript String Methods', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
    eval(window.__JS__);
  });

  test('input exists', () => {
    expect(document.getElementById('textInput')).toBeTruthy();
  });

  test('button exists', () => {
    expect(document.getElementById('convertBtn')).toBeTruthy();
  });

  test('text converts to uppercase', () => {
    const input = document.getElementById('textInput');
    const btn = document.getElementById('convertBtn');
    input.value = 'hello';
    btn.click();
    const upperText = document.getElementById('upperText');
    expect(upperText.textContent).toBe('HELLO');
  });

  test('length is displayed', () => {
    const input = document.getElementById('textInput');
    const btn = document.getElementById('convertBtn');
    input.value = 'hello';
    btn.click();
    const lengthText = document.getElementById('lengthText');
    expect(lengthText.textContent).toContain('5');
  });

  test('both output elements exist', () => {
    expect(document.getElementById('upperText')).toBeTruthy();
    expect(document.getElementById('lengthText')).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: '',
      js: '// Write your JavaScript here\n'
    },
    allowedFiles: ['js'],
    difficulty: 'easy',
    tags: ['JavaScript', 'Strings', 'Methods']
  }
];

async function seedJSQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    // Delete existing JS questions
    await FrontendQuestion.deleteMany({ tags: 'JavaScript' });
    console.log('Removed existing JavaScript questions');

    // Insert new questions
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

seedJSQuestions();
