const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const pythonChapters = [
  {
    title: 'Introduction to Python',
    order: 1,
    lessons: [
      { title: 'What is Python', order: 1, content: '<h2>What is Python</h2><p>Content will be added here.</p>' },
      { title: 'History of Python', order: 2, content: '<h2>History of Python</h2><p>Content will be added here.</p>' },
      { title: 'Features of Python', order: 3, content: '<h2>Features of Python</h2><p>Content will be added here.</p>' },
      { title: 'Applications of Python', order: 4, content: '<h2>Applications of Python</h2><p>Content will be added here.</p>' },
      { title: 'Python vs Other Languages', order: 5, content: '<h2>Python vs Other Languages</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Python Installation & Setup',
    order: 2,
    lessons: [
      { title: 'Installing Python on Windows', order: 1, content: '<h2>Installing Python on Windows</h2><p>Content will be added here.</p>' },
      { title: 'Installing Python on macOS', order: 2, content: '<h2>Installing Python on macOS</h2><p>Content will be added here.</p>' },
      { title: 'Installing Python on Linux', order: 3, content: '<h2>Installing Python on Linux</h2><p>Content will be added here.</p>' },
      { title: 'Setting Environment Variables', order: 4, content: '<h2>Setting Environment Variables</h2><p>Content will be added here.</p>' },
      { title: 'Running Python in Terminal', order: 5, content: '<h2>Running Python in Terminal</h2><p>Content will be added here.</p>' },
      { title: 'Python IDEs & Editors', order: 6, content: '<h2>Python IDEs & Editors</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Python Syntax',
    order: 3,
    lessons: [
      { title: 'Python Syntax Rules', order: 1, content: '<h2>Python Syntax Rules</h2><p>Content will be added here.</p>' },
      { title: 'Python Indentation', order: 2, content: '<h2>Python Indentation</h2><p>Content will be added here.</p>' },
      { title: 'Writing First Python Program', order: 3, content: '<h2>Writing First Python Program</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Comments in Python',
    order: 4,
    lessons: [
      { title: 'Single-line Comments', order: 1, content: '<h2>Single-line Comments</h2><p>Content will be added here.</p>' },
      { title: 'Multi-line Comments', order: 2, content: '<h2>Multi-line Comments</h2><p>Content will be added here.</p>' },
      { title: 'Why Comments are Important', order: 3, content: '<h2>Why Comments are Important</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Variables in Python',
    order: 5,
    lessons: [
      { title: 'Creating Variables', order: 1, content: '<h2>Creating Variables</h2><p>Content will be added here.</p>' },
      { title: 'Variable Naming Rules', order: 2, content: '<h2>Variable Naming Rules</h2><p>Content will be added here.</p>' },
      { title: 'Multiple Variable Assignment', order: 3, content: '<h2>Multiple Variable Assignment</h2><p>Content will be added here.</p>' },
      { title: 'Variable Scope', order: 4, content: '<h2>Variable Scope</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Data Types in Python',
    order: 6,
    lessons: [
      { title: 'Built-in Data Types', order: 1, content: '<h2>Built-in Data Types</h2><p>Content will be added here.</p>' },
      { title: 'Numeric Data Types', order: 2, content: '<h2>Numeric Data Types</h2><p>Content will be added here.</p>' },
      { title: 'Text Data Type', order: 3, content: '<h2>Text Data Type</h2><p>Content will be added here.</p>' },
      { title: 'Boolean Data Type', order: 4, content: '<h2>Boolean Data Type</h2><p>Content will be added here.</p>' },
      { title: 'None Type', order: 5, content: '<h2>None Type</h2><p>Content will be added here.</p>' },
      { title: 'Type Checking', order: 6, content: '<h2>Type Checking</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Type Casting',
    order: 7,
    lessons: [
      { title: 'Implicit Type Conversion', order: 1, content: '<h2>Implicit Type Conversion</h2><p>Content will be added here.</p>' },
      { title: 'Explicit Type Conversion', order: 2, content: '<h2>Explicit Type Conversion</h2><p>Content will be added here.</p>' },
      { title: 'int(), float(), str()', order: 3, content: '<h2>int(), float(), str()</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Operators in Python',
    order: 8,
    lessons: [
      { title: 'Arithmetic Operators', order: 1, content: '<h2>Arithmetic Operators</h2><p>Content will be added here.</p>' },
      { title: 'Assignment Operators', order: 2, content: '<h2>Assignment Operators</h2><p>Content will be added here.</p>' },
      { title: 'Comparison Operators', order: 3, content: '<h2>Comparison Operators</h2><p>Content will be added here.</p>' },
      { title: 'Logical Operators', order: 4, content: '<h2>Logical Operators</h2><p>Content will be added here.</p>' },
      { title: 'Bitwise Operators', order: 5, content: '<h2>Bitwise Operators</h2><p>Content will be added here.</p>' },
      { title: 'Membership Operators', order: 6, content: '<h2>Membership Operators</h2><p>Content will be added here.</p>' },
      { title: 'Identity Operators', order: 7, content: '<h2>Identity Operators</h2><p>Content will be added here.</p>' },
      { title: 'Operator Precedence', order: 8, content: '<h2>Operator Precedence</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Python Input & Output',
    order: 9,
    lessons: [
      { title: 'input() Function', order: 1, content: '<h2>input() Function</h2><p>Content will be added here.</p>' },
      { title: 'print() Function', order: 2, content: '<h2>print() Function</h2><p>Content will be added here.</p>' },
      { title: 'Formatted Output', order: 3, content: '<h2>Formatted Output</h2><p>Content will be added here.</p>' },
      { title: 'Escape Characters', order: 4, content: '<h2>Escape Characters</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'If Statements',
    order: 10,
    lessons: [
      { title: 'if Statement', order: 1, content: '<h2>if Statement</h2><p>Content will be added here.</p>' },
      { title: 'if-else Statement', order: 2, content: '<h2>if-else Statement</h2><p>Content will be added here.</p>' },
      { title: 'if-elif-else Statement', order: 3, content: '<h2>if-elif-else Statement</h2><p>Content will be added here.</p>' },
      { title: 'Nested if', order: 4, content: '<h2>Nested if</h2><p>Content will be added here.</p>' },
      { title: 'match-case', order: 5, content: '<h2>match-case</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Loops in Python',
    order: 11,
    lessons: [
      { title: 'for Loop', order: 1, content: '<h2>for Loop</h2><p>Content will be added here.</p>' },
      { title: 'while Loop', order: 2, content: '<h2>while Loop</h2><p>Content will be added here.</p>' },
      { title: 'range() Function', order: 3, content: '<h2>range() Function</h2><p>Content will be added here.</p>' },
      { title: 'Nested Loops', order: 4, content: '<h2>Nested Loops</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Break, Continue & Pass',
    order: 12,
    lessons: [
      { title: 'break Statement', order: 1, content: '<h2>break Statement</h2><p>Content will be added here.</p>' },
      { title: 'continue Statement', order: 2, content: '<h2>continue Statement</h2><p>Content will be added here.</p>' },
      { title: 'pass Statement', order: 3, content: '<h2>pass Statement</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Strings in Python',
    order: 13,
    lessons: [
      { title: 'Creating Strings', order: 1, content: '<h2>Creating Strings</h2><p>Content will be added here.</p>' },
      { title: 'String Indexing', order: 2, content: '<h2>String Indexing</h2><p>Content will be added here.</p>' },
      { title: 'String Slicing', order: 3, content: '<h2>String Slicing</h2><p>Content will be added here.</p>' },
      { title: 'String Methods', order: 4, content: '<h2>String Methods</h2><p>Content will be added here.</p>' },
      { title: 'String Formatting', order: 5, content: '<h2>String Formatting</h2><p>Content will be added here.</p>' },
      { title: 'Escape Characters', order: 6, content: '<h2>Escape Characters</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Lists in Python',
    order: 14,
    lessons: [
      { title: 'Creating Lists', order: 1, content: '<h2>Creating Lists</h2><p>Content will be added here.</p>' },
      { title: 'Accessing List Elements', order: 2, content: '<h2>Accessing List Elements</h2><p>Content will be added here.</p>' },
      { title: 'List Methods', order: 3, content: '<h2>List Methods</h2><p>Content will be added here.</p>' },
      { title: 'Adding & Removing Elements', order: 4, content: '<h2>Adding & Removing Elements</h2><p>Content will be added here.</p>' },
      { title: 'List Comprehension', order: 5, content: '<h2>List Comprehension</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Tuples in Python',
    order: 15,
    lessons: [
      { title: 'Creating Tuples', order: 1, content: '<h2>Creating Tuples</h2><p>Content will be added here.</p>' },
      { title: 'Accessing Tuple Elements', order: 2, content: '<h2>Accessing Tuple Elements</h2><p>Content will be added here.</p>' },
      { title: 'Tuple Methods', order: 3, content: '<h2>Tuple Methods</h2><p>Content will be added here.</p>' },
      { title: 'Tuple Packing & Unpacking', order: 4, content: '<h2>Tuple Packing & Unpacking</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Sets in Python',
    order: 16,
    lessons: [
      { title: 'Creating Sets', order: 1, content: '<h2>Creating Sets</h2><p>Content will be added here.</p>' },
      { title: 'Set Methods', order: 2, content: '<h2>Set Methods</h2><p>Content will be added here.</p>' },
      { title: 'Set Operations', order: 3, content: '<h2>Set Operations</h2><p>Content will be added here.</p>' },
      { title: 'Frozen Sets', order: 4, content: '<h2>Frozen Sets</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Dictionaries in Python',
    order: 17,
    lessons: [
      { title: 'Creating Dictionaries', order: 1, content: '<h2>Creating Dictionaries</h2><p>Content will be added here.</p>' },
      { title: 'Accessing Dictionary Items', order: 2, content: '<h2>Accessing Dictionary Items</h2><p>Content will be added here.</p>' },
      { title: 'Dictionary Methods', order: 3, content: '<h2>Dictionary Methods</h2><p>Content will be added here.</p>' },
      { title: 'Updating & Deleting Keys', order: 4, content: '<h2>Updating & Deleting Keys</h2><p>Content will be added here.</p>' },
      { title: 'Nested Dictionaries', order: 5, content: '<h2>Nested Dictionaries</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Functions in Python',
    order: 18,
    lessons: [
      { title: 'Defining Functions', order: 1, content: '<h2>Defining Functions</h2><p>Content will be added here.</p>' },
      { title: 'Calling Functions', order: 2, content: '<h2>Calling Functions</h2><p>Content will be added here.</p>' },
      { title: 'Function Arguments', order: 3, content: '<h2>Function Arguments</h2><p>Content will be added here.</p>' },
      { title: 'Return Statement', order: 4, content: '<h2>Return Statement</h2><p>Content will be added here.</p>' },
      { title: 'Default Arguments', order: 5, content: '<h2>Default Arguments</h2><p>Content will be added here.</p>' },
      { title: 'Keyword Arguments', order: 6, content: '<h2>Keyword Arguments</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Lambda Functions',
    order: 19,
    lessons: [
      { title: 'What is Lambda', order: 1, content: '<h2>What is Lambda</h2><p>Content will be added here.</p>' },
      { title: 'Syntax of Lambda', order: 2, content: '<h2>Syntax of Lambda</h2><p>Content will be added here.</p>' },
      { title: 'Lambda with map()', order: 3, content: '<h2>Lambda with map()</h2><p>Content will be added here.</p>' },
      { title: 'Lambda with filter()', order: 4, content: '<h2>Lambda with filter()</h2><p>Content will be added here.</p>' },
      { title: 'Lambda with reduce()', order: 5, content: '<h2>Lambda with reduce()</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Recursion',
    order: 20,
    lessons: [
      { title: 'Recursive Functions', order: 1, content: '<h2>Recursive Functions</h2><p>Content will be added here.</p>' },
      { title: 'Base Condition', order: 2, content: '<h2>Base Condition</h2><p>Content will be added here.</p>' },
      { title: 'Recursive Examples', order: 3, content: '<h2>Recursive Examples</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Modules in Python',
    order: 21,
    lessons: [
      { title: 'What is a Module', order: 1, content: '<h2>What is a Module</h2><p>Content will be added here.</p>' },
      { title: 'Importing Modules', order: 2, content: '<h2>Importing Modules</h2><p>Content will be added here.</p>' },
      { title: 'Built-in Modules', order: 3, content: '<h2>Built-in Modules</h2><p>Content will be added here.</p>' },
      { title: 'Creating Custom Modules', order: 4, content: '<h2>Creating Custom Modules</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Packages in Python',
    order: 22,
    lessons: [
      { title: 'What is a Package', order: 1, content: '<h2>What is a Package</h2><p>Content will be added here.</p>' },
      { title: 'Creating Packages', order: 2, content: '<h2>Creating Packages</h2><p>Content will be added here.</p>' },
      { title: 'Importing Packages', order: 3, content: '<h2>Importing Packages</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'File Handling',
    order: 23,
    lessons: [
      { title: 'Opening Files', order: 1, content: '<h2>Opening Files</h2><p>Content will be added here.</p>' },
      { title: 'Reading Files', order: 2, content: '<h2>Reading Files</h2><p>Content will be added here.</p>' },
      { title: 'Writing Files', order: 3, content: '<h2>Writing Files</h2><p>Content will be added here.</p>' },
      { title: 'File Modes', order: 4, content: '<h2>File Modes</h2><p>Content will be added here.</p>' },
      { title: 'Working with CSV Files', order: 5, content: '<h2>Working with CSV Files</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Exception Handling',
    order: 24,
    lessons: [
      { title: 'Errors vs Exceptions', order: 1, content: '<h2>Errors vs Exceptions</h2><p>Content will be added here.</p>' },
      { title: 'try-except Block', order: 2, content: '<h2>try-except Block</h2><p>Content will be added here.</p>' },
      { title: 'Multiple Exceptions', order: 3, content: '<h2>Multiple Exceptions</h2><p>Content will be added here.</p>' },
      { title: 'finally Block', order: 4, content: '<h2>finally Block</h2><p>Content will be added here.</p>' },
      { title: 'Raising Exceptions', order: 5, content: '<h2>Raising Exceptions</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Classes & Objects',
    order: 25,
    lessons: [
      { title: 'OOP Concepts', order: 1, content: '<h2>OOP Concepts</h2><p>Content will be added here.</p>' },
      { title: 'Creating Classes', order: 2, content: '<h2>Creating Classes</h2><p>Content will be added here.</p>' },
      { title: 'Creating Objects', order: 3, content: '<h2>Creating Objects</h2><p>Content will be added here.</p>' },
      { title: '__init__ Constructor', order: 4, content: '<h2>__init__ Constructor</h2><p>Content will be added here.</p>' },
      { title: 'Instance Variables', order: 5, content: '<h2>Instance Variables</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Inheritance',
    order: 26,
    lessons: [
      { title: 'Single Inheritance', order: 1, content: '<h2>Single Inheritance</h2><p>Content will be added here.</p>' },
      { title: 'Multiple Inheritance', order: 2, content: '<h2>Multiple Inheritance</h2><p>Content will be added here.</p>' },
      { title: 'Multilevel Inheritance', order: 3, content: '<h2>Multilevel Inheritance</h2><p>Content will be added here.</p>' },
      { title: 'super() Function', order: 4, content: '<h2>super() Function</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Polymorphism',
    order: 27,
    lessons: [
      { title: 'Method Overriding', order: 1, content: '<h2>Method Overriding</h2><p>Content will be added here.</p>' },
      { title: 'Operator Overloading', order: 2, content: '<h2>Operator Overloading</h2><p>Content will be added here.</p>' },
      { title: 'Polymorphism Examples', order: 3, content: '<h2>Polymorphism Examples</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Encapsulation',
    order: 28,
    lessons: [
      { title: 'Public Members', order: 1, content: '<h2>Public Members</h2><p>Content will be added here.</p>' },
      { title: 'Protected Members', order: 2, content: '<h2>Protected Members</h2><p>Content will be added here.</p>' },
      { title: 'Private Members', order: 3, content: '<h2>Private Members</h2><p>Content will be added here.</p>' },
      { title: 'Getter & Setter Methods', order: 4, content: '<h2>Getter & Setter Methods</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Abstraction',
    order: 29,
    lessons: [
      { title: 'Abstract Classes', order: 1, content: '<h2>Abstract Classes</h2><p>Content will be added here.</p>' },
      { title: 'abstractmethod', order: 2, content: '<h2>abstractmethod</h2><p>Content will be added here.</p>' },
      { title: 'Abstraction Examples', order: 3, content: '<h2>Abstraction Examples</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Iterators',
    order: 30,
    lessons: [
      { title: 'Iterable vs Iterator', order: 1, content: '<h2>Iterable vs Iterator</h2><p>Content will be added here.</p>' },
      { title: 'iter() and next()', order: 2, content: '<h2>iter() and next()</h2><p>Content will be added here.</p>' },
      { title: 'Custom Iterators', order: 3, content: '<h2>Custom Iterators</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Generators',
    order: 31,
    lessons: [
      { title: 'Generator Functions', order: 1, content: '<h2>Generator Functions</h2><p>Content will be added here.</p>' },
      { title: 'yield Keyword', order: 2, content: '<h2>yield Keyword</h2><p>Content will be added here.</p>' },
      { title: 'Generator Expressions', order: 3, content: '<h2>Generator Expressions</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Decorators',
    order: 32,
    lessons: [
      { title: 'Function Decorators', order: 1, content: '<h2>Function Decorators</h2><p>Content will be added here.</p>' },
      { title: 'Nested Functions', order: 2, content: '<h2>Nested Functions</h2><p>Content will be added here.</p>' },
      { title: 'Decorator Examples', order: 3, content: '<h2>Decorator Examples</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Python Virtual Environment',
    order: 33,
    lessons: [
      { title: 'What is Virtual Environment', order: 1, content: '<h2>What is Virtual Environment</h2><p>Content will be added here.</p>' },
      { title: 'Creating Virtual Environment', order: 2, content: '<h2>Creating Virtual Environment</h2><p>Content will be added here.</p>' },
      { title: 'Activating Virtual Environment', order: 3, content: '<h2>Activating Virtual Environment</h2><p>Content will be added here.</p>' },
      { title: 'Installing Packages', order: 4, content: '<h2>Installing Packages</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Python Libraries Introduction',
    order: 34,
    lessons: [
      { title: 'What are Libraries', order: 1, content: '<h2>What are Libraries</h2><p>Content will be added here.</p>' },
      { title: 'Installing Libraries using pip', order: 2, content: '<h2>Installing Libraries using pip</h2><p>Content will be added here.</p>' },
      { title: 'Popular Python Libraries', order: 3, content: '<h2>Popular Python Libraries</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Python Applications',
    order: 35,
    lessons: [
      { title: 'Web Development with Python', order: 1, content: '<h2>Web Development with Python</h2><p>Content will be added here.</p>' },
      { title: 'Automation Scripts', order: 2, content: '<h2>Automation Scripts</h2><p>Content will be added here.</p>' },
      { title: 'Data Science Basics', order: 3, content: '<h2>Data Science Basics</h2><p>Content will be added here.</p>' },
      { title: 'Machine Learning Overview', order: 4, content: '<h2>Machine Learning Overview</h2><p>Content will be added here.</p>' }
    ]
  }
];

async function updatePythonMaterial() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await StudyMaterial.deleteMany({ title: /Python/i });
    console.log('Deleted old Python materials');

    const pythonMaterial = new StudyMaterial({
      title: 'Python Programming',
      description: 'Complete Python programming course from basics to advanced',
      category: 'Programming',
      estimatedDuration: '50 hours',
      chapters: pythonChapters
    });

    await pythonMaterial.save();

    const totalLessons = pythonChapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
    console.log(`Successfully created Python Programming with ${pythonChapters.length} chapters and ${totalLessons} lessons`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

updatePythonMaterial();
