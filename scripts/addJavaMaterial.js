const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const javaChapters = [
  {
    title: 'Introduction to Java',
    order: 1,
    lessons: [
      { title: 'What is Java', order: 1, content: '<h2>What is Java</h2><p>Content will be added here.</p>' },
      { title: 'History of Java', order: 2, content: '<h2>History of Java</h2><p>Content will be added here.</p>' },
      { title: 'Features of Java', order: 3, content: '<h2>Features of Java</h2><p>Content will be added here.</p>' },
      { title: 'Applications of Java', order: 4, content: '<h2>Applications of Java</h2><p>Content will be added here.</p>' },
      { title: 'Java vs Other Languages', order: 5, content: '<h2>Java vs Other Languages</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Java Installation & Setup',
    order: 2,
    lessons: [
      { title: 'Installing JDK', order: 1, content: '<h2>Installing JDK</h2><p>Content will be added here.</p>' },
      { title: 'Setting Environment Variables', order: 2, content: '<h2>Setting Environment Variables</h2><p>Content will be added here.</p>' },
      { title: 'Installing IDE (IntelliJ/Eclipse/VS Code)', order: 3, content: '<h2>Installing IDE</h2><p>Content will be added here.</p>' },
      { title: 'First Java Program', order: 4, content: '<h2>First Java Program</h2><p>Content will be added here.</p>' },
      { title: 'Java Program Structure', order: 5, content: '<h2>Java Program Structure</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Java Basics',
    order: 3,
    lessons: [
      { title: 'Java Syntax', order: 1, content: '<h2>Java Syntax</h2><p>Content will be added here.</p>' },
      { title: 'Keywords in Java', order: 2, content: '<h2>Keywords in Java</h2><p>Content will be added here.</p>' },
      { title: 'Identifiers', order: 3, content: '<h2>Identifiers</h2><p>Content will be added here.</p>' },
      { title: 'Comments in Java', order: 4, content: '<h2>Comments in Java</h2><p>Content will be added here.</p>' },
      { title: 'Print Statements', order: 5, content: '<h2>Print Statements</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Variables in Java',
    order: 4,
    lessons: [
      { title: 'What are Variables', order: 1, content: '<h2>What are Variables</h2><p>Content will be added here.</p>' },
      { title: 'Types of Variables', order: 2, content: '<h2>Types of Variables</h2><p>Content will be added here.</p>' },
      { title: 'Declaring Variables', order: 3, content: '<h2>Declaring Variables</h2><p>Content will be added here.</p>' },
      { title: 'Variable Scope', order: 4, content: '<h2>Variable Scope</h2><p>Content will be added here.</p>' },
      { title: 'Constants (final keyword)', order: 5, content: '<h2>Constants (final keyword)</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Data Types in Java',
    order: 5,
    lessons: [
      { title: 'Primitive Data Types', order: 1, content: '<h2>Primitive Data Types</h2><p>Content will be added here.</p>' },
      { title: 'Non-Primitive Data Types', order: 2, content: '<h2>Non-Primitive Data Types</h2><p>Content will be added here.</p>' },
      { title: 'Type Casting', order: 3, content: '<h2>Type Casting</h2><p>Content will be added here.</p>' },
      { title: 'Wrapper Classes', order: 4, content: '<h2>Wrapper Classes</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Operators in Java',
    order: 6,
    lessons: [
      { title: 'Arithmetic Operators', order: 1, content: '<h2>Arithmetic Operators</h2><p>Content will be added here.</p>' },
      { title: 'Assignment Operators', order: 2, content: '<h2>Assignment Operators</h2><p>Content will be added here.</p>' },
      { title: 'Comparison Operators', order: 3, content: '<h2>Comparison Operators</h2><p>Content will be added here.</p>' },
      { title: 'Logical Operators', order: 4, content: '<h2>Logical Operators</h2><p>Content will be added here.</p>' },
      { title: 'Bitwise Operators', order: 5, content: '<h2>Bitwise Operators</h2><p>Content will be added here.</p>' },
      { title: 'Ternary Operator', order: 6, content: '<h2>Ternary Operator</h2><p>Content will be added here.</p>' },
      { title: 'Operator Precedence', order: 7, content: '<h2>Operator Precedence</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Control Statements',
    order: 7,
    lessons: [
      { title: 'if Statement', order: 1, content: '<h2>if Statement</h2><p>Content will be added here.</p>' },
      { title: 'if-else Statement', order: 2, content: '<h2>if-else Statement</h2><p>Content will be added here.</p>' },
      { title: 'Nested if', order: 3, content: '<h2>Nested if</h2><p>Content will be added here.</p>' },
      { title: 'Switch Statement', order: 4, content: '<h2>Switch Statement</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Loops in Java',
    order: 8,
    lessons: [
      { title: 'for Loop', order: 1, content: '<h2>for Loop</h2><p>Content will be added here.</p>' },
      { title: 'while Loop', order: 2, content: '<h2>while Loop</h2><p>Content will be added here.</p>' },
      { title: 'do-while Loop', order: 3, content: '<h2>do-while Loop</h2><p>Content will be added here.</p>' },
      { title: 'Nested Loops', order: 4, content: '<h2>Nested Loops</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Jump Statements',
    order: 9,
    lessons: [
      { title: 'break Statement', order: 1, content: '<h2>break Statement</h2><p>Content will be added here.</p>' },
      { title: 'continue Statement', order: 2, content: '<h2>continue Statement</h2><p>Content will be added here.</p>' },
      { title: 'return Statement', order: 3, content: '<h2>return Statement</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Arrays in Java',
    order: 10,
    lessons: [
      { title: 'Single Dimensional Arrays', order: 1, content: '<h2>Single Dimensional Arrays</h2><p>Content will be added here.</p>' },
      { title: 'Multi Dimensional Arrays', order: 2, content: '<h2>Multi Dimensional Arrays</h2><p>Content will be added here.</p>' },
      { title: 'Array Methods', order: 3, content: '<h2>Array Methods</h2><p>Content will be added here.</p>' },
      { title: 'Array Iteration', order: 4, content: '<h2>Array Iteration</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Strings in Java',
    order: 11,
    lessons: [
      { title: 'Creating Strings', order: 1, content: '<h2>Creating Strings</h2><p>Content will be added here.</p>' },
      { title: 'String Methods', order: 2, content: '<h2>String Methods</h2><p>Content will be added here.</p>' },
      { title: 'String Comparison', order: 3, content: '<h2>String Comparison</h2><p>Content will be added here.</p>' },
      { title: 'StringBuilder & StringBuffer', order: 4, content: '<h2>StringBuilder & StringBuffer</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Methods in Java',
    order: 12,
    lessons: [
      { title: 'Defining Methods', order: 1, content: '<h2>Defining Methods</h2><p>Content will be added here.</p>' },
      { title: 'Method Parameters', order: 2, content: '<h2>Method Parameters</h2><p>Content will be added here.</p>' },
      { title: 'Return Values', order: 3, content: '<h2>Return Values</h2><p>Content will be added here.</p>' },
      { title: 'Method Overloading', order: 4, content: '<h2>Method Overloading</h2><p>Content will be added here.</p>' },
      { title: 'Recursion', order: 5, content: '<h2>Recursion</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Object Oriented Programming (OOP)',
    order: 13,
    lessons: [
      { title: 'OOP Concepts', order: 1, content: '<h2>OOP Concepts</h2><p>Content will be added here.</p>' },
      { title: 'Classes and Objects', order: 2, content: '<h2>Classes and Objects</h2><p>Content will be added here.</p>' },
      { title: 'Constructors', order: 3, content: '<h2>Constructors</h2><p>Content will be added here.</p>' },
      { title: 'this Keyword', order: 4, content: '<h2>this Keyword</h2><p>Content will be added here.</p>' },
      { title: 'Static Keyword', order: 5, content: '<h2>Static Keyword</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Inheritance',
    order: 14,
    lessons: [
      { title: 'Types of Inheritance', order: 1, content: '<h2>Types of Inheritance</h2><p>Content will be added here.</p>' },
      { title: 'Method Overriding', order: 2, content: '<h2>Method Overriding</h2><p>Content will be added here.</p>' },
      { title: 'super Keyword', order: 3, content: '<h2>super Keyword</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Polymorphism',
    order: 15,
    lessons: [
      { title: 'Compile-Time Polymorphism', order: 1, content: '<h2>Compile-Time Polymorphism</h2><p>Content will be added here.</p>' },
      { title: 'Runtime Polymorphism', order: 2, content: '<h2>Runtime Polymorphism</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Encapsulation',
    order: 16,
    lessons: [
      { title: 'Access Modifiers', order: 1, content: '<h2>Access Modifiers</h2><p>Content will be added here.</p>' },
      { title: 'Getter and Setter Methods', order: 2, content: '<h2>Getter and Setter Methods</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Abstraction',
    order: 17,
    lessons: [
      { title: 'Abstract Classes', order: 1, content: '<h2>Abstract Classes</h2><p>Content will be added here.</p>' },
      { title: 'Interfaces', order: 2, content: '<h2>Interfaces</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Packages',
    order: 18,
    lessons: [
      { title: 'Built-in Packages', order: 1, content: '<h2>Built-in Packages</h2><p>Content will be added here.</p>' },
      { title: 'Creating Packages', order: 2, content: '<h2>Creating Packages</h2><p>Content will be added here.</p>' },
      { title: 'Importing Packages', order: 3, content: '<h2>Importing Packages</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Exception Handling',
    order: 19,
    lessons: [
      { title: 'Types of Exceptions', order: 1, content: '<h2>Types of Exceptions</h2><p>Content will be added here.</p>' },
      { title: 'try-catch Block', order: 2, content: '<h2>try-catch Block</h2><p>Content will be added here.</p>' },
      { title: 'finally Block', order: 3, content: '<h2>finally Block</h2><p>Content will be added here.</p>' },
      { title: 'throw & throws', order: 4, content: '<h2>throw & throws</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'File Handling',
    order: 20,
    lessons: [
      { title: 'File Class', order: 1, content: '<h2>File Class</h2><p>Content will be added here.</p>' },
      { title: 'Reading Files', order: 2, content: '<h2>Reading Files</h2><p>Content will be added here.</p>' },
      { title: 'Writing Files', order: 3, content: '<h2>Writing Files</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Collections Framework',
    order: 21,
    lessons: [
      { title: 'List Interface', order: 1, content: '<h2>List Interface</h2><p>Content will be added here.</p>' },
      { title: 'Set Interface', order: 2, content: '<h2>Set Interface</h2><p>Content will be added here.</p>' },
      { title: 'Map Interface', order: 3, content: '<h2>Map Interface</h2><p>Content will be added here.</p>' },
      { title: 'Iterators', order: 4, content: '<h2>Iterators</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Multithreading',
    order: 22,
    lessons: [
      { title: 'Thread Class', order: 1, content: '<h2>Thread Class</h2><p>Content will be added here.</p>' },
      { title: 'Runnable Interface', order: 2, content: '<h2>Runnable Interface</h2><p>Content will be added here.</p>' },
      { title: 'Thread Lifecycle', order: 3, content: '<h2>Thread Lifecycle</h2><p>Content will be added here.</p>' },
      { title: 'Synchronization', order: 4, content: '<h2>Synchronization</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Java 8 Features',
    order: 23,
    lessons: [
      { title: 'Lambda Expressions', order: 1, content: '<h2>Lambda Expressions</h2><p>Content will be added here.</p>' },
      { title: 'Streams API', order: 2, content: '<h2>Streams API</h2><p>Content will be added here.</p>' },
      { title: 'Functional Interfaces', order: 3, content: '<h2>Functional Interfaces</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Java Applications',
    order: 24,
    lessons: [
      { title: 'Web Development', order: 1, content: '<h2>Web Development</h2><p>Content will be added here.</p>' },
      { title: 'Android Development', order: 2, content: '<h2>Android Development</h2><p>Content will be added here.</p>' },
      { title: 'Desktop Applications', order: 3, content: '<h2>Desktop Applications</h2><p>Content will be added here.</p>' },
      { title: 'Enterprise Applications', order: 4, content: '<h2>Enterprise Applications</h2><p>Content will be added here.</p>' }
    ]
  }
];

async function addJavaMaterial() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const javaMaterial = new StudyMaterial({
      title: 'Java Programming',
      description: 'Complete Java programming course from basics to advanced',
      category: 'Programming',
      estimatedDuration: '45 hours',
      chapters: javaChapters
    });

    await javaMaterial.save();

    const totalLessons = javaChapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
    console.log(`Successfully created Java Programming with ${javaChapters.length} chapters and ${totalLessons} lessons`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

addJavaMaterial();
