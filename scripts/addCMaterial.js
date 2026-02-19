const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const cChapters = [
  {
    title: 'Introduction to C',
    order: 1,
    lessons: [
      { title: 'What is C Language', order: 1, content: '<h2>What is C Language</h2><p>Content will be added here.</p>' },
      { title: 'History of C', order: 2, content: '<h2>History of C</h2><p>Content will be added here.</p>' },
      { title: 'Features of C', order: 3, content: '<h2>Features of C</h2><p>Content will be added here.</p>' },
      { title: 'Applications of C', order: 4, content: '<h2>Applications of C</h2><p>Content will be added here.</p>' },
      { title: 'C vs Other Languages', order: 5, content: '<h2>C vs Other Languages</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Installation & Setup',
    order: 2,
    lessons: [
      { title: 'Installing C Compiler', order: 1, content: '<h2>Installing C Compiler</h2><p>Content will be added here.</p>' },
      { title: 'Setting up IDE (CodeBlocks / VS Code)', order: 2, content: '<h2>Setting up IDE</h2><p>Content will be added here.</p>' },
      { title: 'Writing First C Program', order: 3, content: '<h2>Writing First C Program</h2><p>Content will be added here.</p>' },
      { title: 'Structure of a C Program', order: 4, content: '<h2>Structure of a C Program</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'C Basics',
    order: 3,
    lessons: [
      { title: 'C Syntax', order: 1, content: '<h2>C Syntax</h2><p>Content will be added here.</p>' },
      { title: 'Tokens in C', order: 2, content: '<h2>Tokens in C</h2><p>Content will be added here.</p>' },
      { title: 'Keywords in C', order: 3, content: '<h2>Keywords in C</h2><p>Content will be added here.</p>' },
      { title: 'Identifiers', order: 4, content: '<h2>Identifiers</h2><p>Content will be added here.</p>' },
      { title: 'Comments in C', order: 5, content: '<h2>Comments in C</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Variables in C',
    order: 4,
    lessons: [
      { title: 'What are Variables', order: 1, content: '<h2>What are Variables</h2><p>Content will be added here.</p>' },
      { title: 'Declaring Variables', order: 2, content: '<h2>Declaring Variables</h2><p>Content will be added here.</p>' },
      { title: 'Initialization of Variables', order: 3, content: '<h2>Initialization of Variables</h2><p>Content will be added here.</p>' },
      { title: 'Variable Scope', order: 4, content: '<h2>Variable Scope</h2><p>Content will be added here.</p>' },
      { title: 'Constants in C', order: 5, content: '<h2>Constants in C</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Data Types in C',
    order: 5,
    lessons: [
      { title: 'Basic Data Types', order: 1, content: '<h2>Basic Data Types</h2><p>Content will be added here.</p>' },
      { title: 'Derived Data Types', order: 2, content: '<h2>Derived Data Types</h2><p>Content will be added here.</p>' },
      { title: 'User-defined Data Types', order: 3, content: '<h2>User-defined Data Types</h2><p>Content will be added here.</p>' },
      { title: 'Type Modifiers', order: 4, content: '<h2>Type Modifiers</h2><p>Content will be added here.</p>' },
      { title: 'sizeof Operator', order: 5, content: '<h2>sizeof Operator</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Input and Output',
    order: 6,
    lessons: [
      { title: 'printf() Function', order: 1, content: '<h2>printf() Function</h2><p>Content will be added here.</p>' },
      { title: 'scanf() Function', order: 2, content: '<h2>scanf() Function</h2><p>Content will be added here.</p>' },
      { title: 'Format Specifiers', order: 3, content: '<h2>Format Specifiers</h2><p>Content will be added here.</p>' },
      { title: 'Escape Sequences', order: 4, content: '<h2>Escape Sequences</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Operators in C',
    order: 7,
    lessons: [
      { title: 'Arithmetic Operators', order: 1, content: '<h2>Arithmetic Operators</h2><p>Content will be added here.</p>' },
      { title: 'Relational Operators', order: 2, content: '<h2>Relational Operators</h2><p>Content will be added here.</p>' },
      { title: 'Logical Operators', order: 3, content: '<h2>Logical Operators</h2><p>Content will be added here.</p>' },
      { title: 'Assignment Operators', order: 4, content: '<h2>Assignment Operators</h2><p>Content will be added here.</p>' },
      { title: 'Increment and Decrement', order: 5, content: '<h2>Increment and Decrement</h2><p>Content will be added here.</p>' },
      { title: 'Bitwise Operators', order: 6, content: '<h2>Bitwise Operators</h2><p>Content will be added here.</p>' },
      { title: 'Ternary Operator', order: 7, content: '<h2>Ternary Operator</h2><p>Content will be added here.</p>' },
      { title: 'Operator Precedence', order: 8, content: '<h2>Operator Precedence</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Control Statements',
    order: 8,
    lessons: [
      { title: 'if Statement', order: 1, content: '<h2>if Statement</h2><p>Content will be added here.</p>' },
      { title: 'if-else Statement', order: 2, content: '<h2>if-else Statement</h2><p>Content will be added here.</p>' },
      { title: 'Nested if', order: 3, content: '<h2>Nested if</h2><p>Content will be added here.</p>' },
      { title: 'switch Statement', order: 4, content: '<h2>switch Statement</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Loops in C',
    order: 9,
    lessons: [
      { title: 'for Loop', order: 1, content: '<h2>for Loop</h2><p>Content will be added here.</p>' },
      { title: 'while Loop', order: 2, content: '<h2>while Loop</h2><p>Content will be added here.</p>' },
      { title: 'do-while Loop', order: 3, content: '<h2>do-while Loop</h2><p>Content will be added here.</p>' },
      { title: 'Nested Loops', order: 4, content: '<h2>Nested Loops</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Jump Statements',
    order: 10,
    lessons: [
      { title: 'break Statement', order: 1, content: '<h2>break Statement</h2><p>Content will be added here.</p>' },
      { title: 'continue Statement', order: 2, content: '<h2>continue Statement</h2><p>Content will be added here.</p>' },
      { title: 'goto Statement', order: 3, content: '<h2>goto Statement</h2><p>Content will be added here.</p>' },
      { title: 'return Statement', order: 4, content: '<h2>return Statement</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Functions in C',
    order: 11,
    lessons: [
      { title: 'What is a Function', order: 1, content: '<h2>What is a Function</h2><p>Content will be added here.</p>' },
      { title: 'Function Declaration', order: 2, content: '<h2>Function Declaration</h2><p>Content will be added here.</p>' },
      { title: 'Function Definition', order: 3, content: '<h2>Function Definition</h2><p>Content will be added here.</p>' },
      { title: 'Function Call', order: 4, content: '<h2>Function Call</h2><p>Content will be added here.</p>' },
      { title: 'Types of Functions', order: 5, content: '<h2>Types of Functions</h2><p>Content will be added here.</p>' },
      { title: 'Recursion', order: 6, content: '<h2>Recursion</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Arrays in C',
    order: 12,
    lessons: [
      { title: 'One Dimensional Arrays', order: 1, content: '<h2>One Dimensional Arrays</h2><p>Content will be added here.</p>' },
      { title: 'Multi Dimensional Arrays', order: 2, content: '<h2>Multi Dimensional Arrays</h2><p>Content will be added here.</p>' },
      { title: 'Array Initialization', order: 3, content: '<h2>Array Initialization</h2><p>Content will be added here.</p>' },
      { title: 'Passing Arrays to Functions', order: 4, content: '<h2>Passing Arrays to Functions</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Strings in C',
    order: 13,
    lessons: [
      { title: 'What is a String', order: 1, content: '<h2>What is a String</h2><p>Content will be added here.</p>' },
      { title: 'String Functions', order: 2, content: '<h2>String Functions</h2><p>Content will be added here.</p>' },
      { title: 'String Input and Output', order: 3, content: '<h2>String Input and Output</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Pointers in C',
    order: 14,
    lessons: [
      { title: 'What is a Pointer', order: 1, content: '<h2>What is a Pointer</h2><p>Content will be added here.</p>' },
      { title: 'Pointer Declaration', order: 2, content: '<h2>Pointer Declaration</h2><p>Content will be added here.</p>' },
      { title: 'Pointer Arithmetic', order: 3, content: '<h2>Pointer Arithmetic</h2><p>Content will be added here.</p>' },
      { title: 'Pointers and Arrays', order: 4, content: '<h2>Pointers and Arrays</h2><p>Content will be added here.</p>' },
      { title: 'Double Pointers', order: 5, content: '<h2>Double Pointers</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Structures in C',
    order: 15,
    lessons: [
      { title: 'What is a Structure', order: 1, content: '<h2>What is a Structure</h2><p>Content will be added here.</p>' },
      { title: 'Declaring Structures', order: 2, content: '<h2>Declaring Structures</h2><p>Content will be added here.</p>' },
      { title: 'Accessing Structure Members', order: 3, content: '<h2>Accessing Structure Members</h2><p>Content will be added here.</p>' },
      { title: 'Array of Structures', order: 4, content: '<h2>Array of Structures</h2><p>Content will be added here.</p>' },
      { title: 'Nested Structures', order: 5, content: '<h2>Nested Structures</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Unions in C',
    order: 16,
    lessons: [
      { title: 'What is a Union', order: 1, content: '<h2>What is a Union</h2><p>Content will be added here.</p>' },
      { title: 'Union vs Structure', order: 2, content: '<h2>Union vs Structure</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Enumerations',
    order: 17,
    lessons: [
      { title: 'enum Keyword', order: 1, content: '<h2>enum Keyword</h2><p>Content will be added here.</p>' },
      { title: 'Using Enumerations', order: 2, content: '<h2>Using Enumerations</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'File Handling in C',
    order: 18,
    lessons: [
      { title: 'File Operations', order: 1, content: '<h2>File Operations</h2><p>Content will be added here.</p>' },
      { title: 'fopen() and fclose()', order: 2, content: '<h2>fopen() and fclose()</h2><p>Content will be added here.</p>' },
      { title: 'Reading Files', order: 3, content: '<h2>Reading Files</h2><p>Content will be added here.</p>' },
      { title: 'Writing Files', order: 4, content: '<h2>Writing Files</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Dynamic Memory Allocation',
    order: 19,
    lessons: [
      { title: 'malloc()', order: 1, content: '<h2>malloc()</h2><p>Content will be added here.</p>' },
      { title: 'calloc()', order: 2, content: '<h2>calloc()</h2><p>Content will be added here.</p>' },
      { title: 'realloc()', order: 3, content: '<h2>realloc()</h2><p>Content will be added here.</p>' },
      { title: 'free()', order: 4, content: '<h2>free()</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Preprocessor Directives',
    order: 20,
    lessons: [
      { title: '#include', order: 1, content: '<h2>#include</h2><p>Content will be added here.</p>' },
      { title: '#define', order: 2, content: '<h2>#define</h2><p>Content will be added here.</p>' },
      { title: 'Macros', order: 3, content: '<h2>Macros</h2><p>Content will be added here.</p>' },
      { title: 'Conditional Compilation', order: 4, content: '<h2>Conditional Compilation</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'C Applications',
    order: 21,
    lessons: [
      { title: 'System Programming', order: 1, content: '<h2>System Programming</h2><p>Content will be added here.</p>' },
      { title: 'Embedded Systems', order: 2, content: '<h2>Embedded Systems</h2><p>Content will be added here.</p>' },
      { title: 'Game Development', order: 3, content: '<h2>Game Development</h2><p>Content will be added here.</p>' },
      { title: 'Operating Systems', order: 4, content: '<h2>Operating Systems</h2><p>Content will be added here.</p>' }
    ]
  }
];

async function addCMaterial() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const cMaterial = new StudyMaterial({
      title: 'C Programming',
      description: 'Complete C programming course from basics to advanced',
      category: 'Programming',
      estimatedDuration: '35 hours',
      chapters: cChapters
    });

    await cMaterial.save();

    const totalLessons = cChapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
    console.log(`Successfully created C Programming with ${cChapters.length} chapters and ${totalLessons} lessons`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

addCMaterial();
