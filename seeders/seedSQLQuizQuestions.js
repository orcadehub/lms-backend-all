require('dotenv').config();
const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const sqlQuizQuestions = [
  {
    title: 'Which SQL statement is used to retrieve data from a database?',
    language: 'sql',
    topic: 'Basics',
    options: [
      { text: 'GET' },
      { text: 'FETCH' },
      { text: 'SELECT' },
      { text: 'PULL' }
    ],
    correctAnswer: 2,
    difficulty: 'easy',
    tags: ['SQL', 'Basics', 'SELECT']
  },
  {
    title: 'What does the following query return?\n\nSELECT COUNT(*) FROM employees;',
    codeSnippet: 'SELECT COUNT(*) FROM employees;',
    language: 'sql',
    topic: 'Aggregate Functions',
    options: [
      { text: 'The first row of the employees table' },
      { text: 'The sum of all employee IDs' },
      { text: 'The names of all employees' },
      { text: 'The total number of rows in the employees table' }
    ],
    correctAnswer: 3,
    difficulty: 'easy',
    tags: ['SQL', 'Aggregate', 'COUNT']
  },
  {
    title: 'Which clause is used to filter rows in a SQL query?',
    codeSnippet: 'SELECT * FROM orders ??? status = \'active\';',
    language: 'sql',
    topic: 'Filtering',
    options: [
      { text: 'HAVING' },
      { text: 'WHERE' },
      { text: 'FILTER' },
      { text: 'LIMIT' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['SQL', 'WHERE', 'Filtering']
  },
  {
    title: 'What is the output of this query if the table has 5 rows?\n\nSELECT * FROM products LIMIT 3;',
    codeSnippet: 'SELECT * FROM products LIMIT 3;',
    language: 'sql',
    topic: 'LIMIT',
    options: [
      { text: 'All 5 rows' },
      { text: 'The last 3 rows' },
      { text: 'The first 3 rows' },
      { text: 'An error' }
    ],
    correctAnswer: 2,
    difficulty: 'easy',
    tags: ['SQL', 'LIMIT', 'Basics']
  },
  {
    title: 'Which JOIN returns only the rows that have matching values in both tables?',
    codeSnippet: 'SELECT * FROM a ??? JOIN b ON a.id = b.id;',
    language: 'sql',
    topic: 'Joins',
    options: [
      { text: 'LEFT' },
      { text: 'FULL OUTER' },
      { text: 'RIGHT' },
      { text: 'INNER' }
    ],
    correctAnswer: 3,
    difficulty: 'medium',
    tags: ['SQL', 'JOIN', 'INNER JOIN']
  },
  {
    title: 'What does GROUP BY do in SQL?',
    codeSnippet: 'SELECT department, COUNT(*)\nFROM employees\nGROUP BY department;',
    language: 'sql',
    topic: 'GROUP BY',
    options: [
      { text: 'Sorts the result in ascending order' },
      { text: 'Groups rows that have the same values into summary rows' },
      { text: 'Filters rows based on a condition' },
      { text: 'Removes duplicate rows' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['SQL', 'GROUP BY', 'Aggregate']
  },
  {
    title: 'Which clause is used to filter results after GROUP BY?',
    codeSnippet: 'SELECT department, COUNT(*)\nFROM employees\nGROUP BY department\n??? COUNT(*) > 5;',
    language: 'sql',
    topic: 'HAVING',
    options: [
      { text: 'WHERE' },
      { text: 'FILTER' },
      { text: 'HAVING' },
      { text: 'AND' }
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    tags: ['SQL', 'HAVING', 'GROUP BY']
  },
  {
    title: 'What does the DISTINCT keyword do?',
    codeSnippet: 'SELECT DISTINCT city FROM customers;',
    language: 'sql',
    topic: 'DISTINCT',
    options: [
      { text: 'Returns only the first occurrence of each city' },
      { text: 'Sorts cities alphabetically' },
      { text: 'Returns all cities including duplicates' },
      { text: 'Returns unique city values only' }
    ],
    correctAnswer: 3,
    difficulty: 'easy',
    tags: ['SQL', 'DISTINCT', 'Basics']
  },
  {
    title: 'Which SQL command is used to update existing records in a table?',
    codeSnippet: '??? employees SET salary = 50000 WHERE id = 1;',
    language: 'sql',
    topic: 'DML',
    options: [
      { text: 'MODIFY' },
      { text: 'UPDATE' },
      { text: 'ALTER' },
      { text: 'CHANGE' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['SQL', 'UPDATE', 'DML']
  },
  {
    title: 'What is the correct order of clauses in a SQL SELECT statement?',
    language: 'sql',
    topic: 'Query Structure',
    options: [
      { text: 'SELECT → FROM → GROUP BY → WHERE → HAVING → ORDER BY' },
      { text: 'FROM → SELECT → WHERE → GROUP BY → HAVING → ORDER BY' },
      { text: 'SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY' },
      { text: 'SELECT → WHERE → FROM → GROUP BY → ORDER BY → HAVING' }
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    tags: ['SQL', 'Query Structure', 'Clauses']
  }
];

async function seedSQLQuizQuestions() {
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
    for (const question of sqlQuizQuestions) {
      await QuizQuestion.create({
        ...question,
        tenant: tenant._id,
        createdBy: instructor._id
      });
      createdCount++;
      console.log(`✓ Created: ${question.title.substring(0, 60)}...`);
    }

    console.log(`\n✓ ${createdCount} SQL quiz questions seeded successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedSQLQuizQuestions();
