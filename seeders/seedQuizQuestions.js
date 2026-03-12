require('dotenv').config();
const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const quizQuestions = [
  // CSS Questions
  {
    title: 'What does the CSS property "display: flex" do?',
    codeSnippet: `.container {\n  display: flex;\n}`,
    language: 'css',
    topic: 'Flexbox',
    options: [
      { text: 'Makes the element a flex container' },
      { text: 'Hides the element from display' },
      { text: 'Converts the element to inline' },
      { text: 'Applies a flexible width to the element' }
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    tags: ['CSS', 'Flexbox', 'Display']
  },
  {
    title: 'Which CSS property is used to change the text color?',
    codeSnippet: `p {\n  ??? : red;\n}`,
    language: 'css',
    topic: 'Text Styling',
    options: [
      { text: 'text-color' },
      { text: 'color' },
      { text: 'font-color' },
      { text: 'text-style' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['CSS', 'Text', 'Color']
  },
  {
    title: 'What is the correct syntax for CSS Grid?',
    codeSnippet: `.grid {\n  display: grid;\n  grid-template-columns: ???;\n}`,
    language: 'css',
    topic: 'Grid',
    options: [
      { text: '1fr 1fr 1fr' },
      { text: 'repeat(3, 1fr)' },
      { text: 'Both A and B are correct' },
      { text: 'Neither A nor B' }
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    tags: ['CSS', 'Grid', 'Layout']
  },
  {
    title: 'What does "position: absolute" do?',
    codeSnippet: `.box {\n  position: absolute;\n  top: 10px;\n  left: 20px;\n}`,
    language: 'css',
    topic: 'Positioning',
    options: [
      { text: 'Positions element relative to the viewport' },
      { text: 'Positions element relative to its nearest positioned ancestor' },
      { text: 'Removes element from document flow' },
      { text: 'Both B and C are correct' }
    ],
    correctAnswer: 3,
    difficulty: 'medium',
    tags: ['CSS', 'Positioning', 'Layout']
  },
  {
    title: 'Which property creates a smooth transition effect?',
    codeSnippet: `.button {\n  background-color: blue;\n  ??? : all 0.3s ease;\n}\n.button:hover {\n  background-color: red;\n}`,
    language: 'css',
    topic: 'Transitions',
    options: [
      { text: 'animation' },
      { text: 'transition' },
      { text: 'transform' },
      { text: 'translate' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['CSS', 'Transitions', 'Effects']
  },
  {
    title: 'What is the correct way to define CSS variables?',
    codeSnippet: `:root {\n  ??? : #3498db;\n}\n\np {\n  color: var(--primary-color);\n}`,
    language: 'css',
    topic: 'CSS Variables',
    options: [
      { text: '$primary-color' },
      { text: '@primary-color' },
      { text: '--primary-color' },
      { text: '#primary-color' }
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    tags: ['CSS', 'Variables', 'Custom Properties']
  },
  {
    title: 'What does "z-index" control?',
    codeSnippet: `.box1 {\n  position: absolute;\n  z-index: 10;\n}\n.box2 {\n  position: absolute;\n  z-index: 5;\n}`,
    language: 'css',
    topic: 'Stacking',
    options: [
      { text: 'The horizontal position of an element' },
      { text: 'The vertical position of an element' },
      { text: 'The stacking order of overlapping elements' },
      { text: 'The zoom level of an element' }
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    tags: ['CSS', 'Positioning', 'Z-index']
  },
  {
    title: 'Which media query is correct for mobile devices?',
    codeSnippet: `??? {\n  .container {\n    width: 100%;\n  }\n}`,
    language: 'css',
    topic: 'Responsive Design',
    options: [
      { text: '@media (max-width: 768px)' },
      { text: '@media screen and (max-width: 768px)' },
      { text: 'Both A and B are correct' },
      { text: '@media mobile' }
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    tags: ['CSS', 'Media Queries', 'Responsive']
  },
  {
    title: 'What is the default value of the "position" property?',
    codeSnippet: `div {\n  ??? : static;\n}`,
    language: 'css',
    topic: 'Positioning',
    options: [
      { text: 'relative' },
      { text: 'absolute' },
      { text: 'static' },
      { text: 'fixed' }
    ],
    correctAnswer: 2,
    difficulty: 'easy',
    tags: ['CSS', 'Positioning', 'Defaults']
  },
  {
    title: 'Which property is used to add space inside an element?',
    codeSnippet: `.box {\n  ??? : 20px;\n}`,
    language: 'css',
    topic: 'Box Model',
    options: [
      { text: 'margin' },
      { text: 'padding' },
      { text: 'border' },
      { text: 'spacing' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['CSS', 'Box Model', 'Spacing']
  },

  // JavaScript Questions
  {
    title: 'What does "let" declare in JavaScript?',
    codeSnippet: `let x = 10;\nlet x = 20; // Error or OK?`,
    language: 'javascript',
    topic: 'Variables',
    options: [
      { text: 'A global variable' },
      { text: 'A block-scoped variable' },
      { text: 'A function-scoped variable' },
      { text: 'A constant variable' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['JavaScript', 'Variables', 'Let']
  },
  {
    title: 'What is the output of this code?',
    codeSnippet: `console.log(typeof undefined);`,
    language: 'javascript',
    topic: 'Data Types',
    options: [
      { text: '"undefined"' },
      { text: '"object"' },
      { text: 'undefined' },
      { text: 'null' }
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    tags: ['JavaScript', 'Data Types', 'Typeof']
  },
  {
    title: 'What does Array.map() do?',
    codeSnippet: `const arr = [1, 2, 3];\nconst result = arr.map(x => x * 2);`,
    language: 'javascript',
    topic: 'Array Methods',
    options: [
      { text: 'Modifies the original array' },
      { text: 'Creates a new array with transformed elements' },
      { text: 'Filters the array' },
      { text: 'Sorts the array' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['JavaScript', 'Arrays', 'Map']
  },
  {
    title: 'What is the correct way to create an object in JavaScript?',
    codeSnippet: `const person = ???`,
    language: 'javascript',
    topic: 'Objects',
    options: [
      { text: '{ name: "John", age: 30 }' },
      { text: 'new Object()' },
      { text: 'Both A and B are correct' },
      { text: 'Neither A nor B' }
    ],
    correctAnswer: 2,
    difficulty: 'easy',
    tags: ['JavaScript', 'Objects', 'Literals']
  },
  {
    title: 'What does the "this" keyword refer to?',
    codeSnippet: `const obj = {\n  name: "John",\n  greet: function() {\n    console.log(this.name);\n  }\n};\nobj.greet();`,
    language: 'javascript',
    topic: 'This Keyword',
    options: [
      { text: 'The global object' },
      { text: 'The object that called the method' },
      { text: 'The function itself' },
      { text: 'undefined' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['JavaScript', 'This', 'Context']
  },
  {
    title: 'What is a closure in JavaScript?',
    codeSnippet: `function outer() {\n  let x = 10;\n  function inner() {\n    console.log(x);\n  }\n  return inner;\n}`,
    language: 'javascript',
    topic: 'Closures',
    options: [
      { text: 'A function that closes the program' },
      { text: 'A function that has access to variables from its outer scope' },
      { text: 'A function that cannot be called' },
      { text: 'A function that returns nothing' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['JavaScript', 'Closures', 'Scope']
  },
  {
    title: 'What is the difference between "==" and "==="?',
    codeSnippet: `console.log(5 == "5");  // true or false?\nconsole.log(5 === "5"); // true or false?`,
    language: 'javascript',
    topic: 'Operators',
    options: [
      { text: '"==" checks type, "===" checks value' },
      { text: '"==" checks value, "===" checks type and value' },
      { text: 'They are the same' },
      { text: '"===" is deprecated' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['JavaScript', 'Operators', 'Comparison']
  },
  {
    title: 'What does Promise.then() do?',
    codeSnippet: `fetch('/api/data')\n  .then(response => response.json())\n  .then(data => console.log(data));`,
    language: 'javascript',
    topic: 'Promises',
    options: [
      { text: 'Executes code immediately' },
      { text: 'Handles the result when the promise resolves' },
      { text: 'Cancels the promise' },
      { text: 'Waits for user input' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['JavaScript', 'Promises', 'Async']
  },
  {
    title: 'What is the output of this code?',
    codeSnippet: `const arr = [1, 2, 3];\nconst [a, b] = arr;\nconsole.log(a, b);`,
    language: 'javascript',
    topic: 'Destructuring',
    options: [
      { text: '[1, 2]' },
      { text: '1 2' },
      { text: '1, 2' },
      { text: 'undefined undefined' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['JavaScript', 'Destructuring', 'ES6']
  },
  {
    title: 'What does Array.filter() return?',
    codeSnippet: `const arr = [1, 2, 3, 4, 5];\nconst result = arr.filter(x => x > 2);`,
    language: 'javascript',
    topic: 'Array Methods',
    options: [
      { text: 'A single value' },
      { text: 'A new array with elements that pass the test' },
      { text: 'A boolean value' },
      { text: 'The original array' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['JavaScript', 'Arrays', 'Filter']
  }
];

async function seedQuizQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    let createdCount = 0;
    for (const question of quizQuestions) {
      await QuizQuestion.create({
        ...question,
        tenant: tenant._id,
        createdBy: instructor._id
      });
      createdCount++;
      console.log(`✓ Created: ${question.title}`);
    }

    console.log(`\n✓ All ${createdCount} quiz questions created successfully!`);
    console.log(`  - 10 CSS Questions`);
    console.log(`  - 10 JavaScript Questions`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedQuizQuestions();
