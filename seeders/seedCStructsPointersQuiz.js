require('dotenv').config();
const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const cStructsPointersQuestions = [
  {
    title: 'What is the output of this code involving pointers?',
    codeSnippet: `#include <stdio.h>\n\nint main() {\n    int a = 10;\n    int *ptr = &a;\n    *ptr = 20;\n    printf("%d", a);\n    return 0;\n}`,
    language: 'c',
    topic: 'Pointers',
    options: [
      { text: '10' },
      { text: '20' },
      { text: 'Address of a' },
      { text: 'Error' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['C', 'Pointers', 'Dereferencing']
  },
  {
    title: 'How do you access a member of a structure using a pointer?',
    codeSnippet: `#include <stdio.h>\n\nstruct Point {\n    int x, y;\n};\n\nint main() {\n    struct Point p = {1, 2};\n    struct Point *ptr = &p;\n    // Which of the following is correct?\n    return 0;\n}`,
    language: 'c',
    topic: 'Structures',
    options: [
      { text: 'ptr.x' },
      { text: 'ptr->x' },
      { text: '*ptr.x' },
      { text: 'ptr.point->x' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['C', 'Structures', 'Pointers', 'Member Access']
  },
  {
    title: 'What is the size of this union on a system where int is 4 bytes and char is 1 byte?',
    codeSnippet: `union Data {\n    int i;\n    char c;\n    float f;\n};`,
    language: 'c',
    topic: 'Unions',
    options: [
      { text: '5 bytes' },
      { text: '9 bytes' },
      { text: '4 bytes' },
      { text: '1 byte' }
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    tags: ['C', 'Unions', 'SizeOf', 'Memory']
  },
  {
    title: 'What will be the output of the following pointer arithmetic?',
    codeSnippet: `#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40};\n    int *ptr = arr;\n    printf("%d", *(ptr + 2));\n    return 0;\n}`,
    language: 'c',
    topic: 'Pointers',
    options: [
      { text: '10' },
      { text: '20' },
      { text: '30' },
      { text: '40' }
    ],
    correctAnswer: 2,
    difficulty: 'easy',
    tags: ['C', 'Pointers', 'Arithmetic', 'Arrays']
  },
  {
    title: 'What is the correct way to declare a pointer to a pointer?',
    codeSnippet: `int a = 10;\nint *ptr = &a;\n// Declare pptr as pointer to ptr`,
    language: 'c',
    topic: 'Pointers',
    options: [
      { text: 'int *pptr = &ptr;' },
      { text: 'int **pptr = &ptr;' },
      { text: 'int pptr = &&ptr;' },
      { text: 'int *&pptr = &ptr;' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['C', 'Pointers', 'Double Pointers']
  },
  {
    title: 'In a union, if you modify one member, what happens to the others?',
    codeSnippet: `union Data {\n    int i;\n    float f;\n} d;\nd.i = 100;\nd.f = 2.5;`,
    language: 'c',
    topic: 'Unions',
    options: [
      { text: 'Both keep their separate values' },
      { text: 'The value of i is overwritten by f' },
      { text: 'The value of f is ignored' },
      { text: 'Compile error' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['C', 'Unions', 'Overlap']
  },
  {
    title: 'What is the output of this structure initialization?',
    codeSnippet: `#include <stdio.h>\n\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\nint main() {\n    struct Node n1 = {10, NULL};\n    struct Node n2 = {20, &n1};\n    printf("%d", n2.next->data);\n    return 0;\n}`,
    language: 'c',
    topic: 'Structures',
    options: [
      { text: '10' },
      { text: '20' },
      { text: 'Address of n1' },
      { text: 'Error' }
    ],
    correctAnswer: 0,
    difficulty: 'medium',
    tags: ['C', 'Structures', 'Linked List', 'Pointers']
  },
  {
    title: 'What does the NULL pointer represent in C?',
    codeSnippet: `int *ptr = NULL;`,
    language: 'c',
    topic: 'Pointers',
    options: [
      { text: 'Memory address 1' },
      { text: 'Pointer that points to nothing (address 0)' },
      { text: 'A pointer that points to itself' },
      { text: 'A wild pointer' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['C', 'Pointers', 'NULL']
  },
  {
    title: 'What is bit-field in C structures?',
    codeSnippet: `struct Flags {\n    unsigned int is_ready : 1;\n    unsigned int is_error : 1;\n};`,
    language: 'c',
    topic: 'Structures',
    options: [
      { text: 'A way to allocate specific number of bits to a member' },
      { text: 'A way to store binary data' },
      { text: 'A way to encrypt structure data' },
      { text: 'A method to increase processing speed' }
    ],
    correctAnswer: 0,
    difficulty: 'hard',
    tags: ['C', 'Structures', 'Bit-fields', 'Optimization']
  },
  {
    title: 'What is the output of this pointer and array code?',
    codeSnippet: `#include <stdio.h>\n\nint main() {\n    char *s = "Hello";\n    printf("%c", *(s + 4));\n    return 0;\n}`,
    language: 'c',
    topic: 'Pointers',
    options: [
      { text: 'H' },
      { text: 'e' },
      { text: 'o' },
      { text: 'l' }
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    tags: ['C', 'Pointers', 'Strings', 'Arithmetic']
  }
];

async function seedCStructsPointersQuiz() {
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
    for (const question of cStructsPointersQuestions) {
      await QuizQuestion.create({
        ...question,
        tenant: tenant._id,
        createdBy: instructor._id
      });
      createdCount++;
      console.log(`✓ Created: ${question.title.substring(0, 60)}...`);
    }

    console.log(`\n✓ All ${createdCount} C Structures, Pointers & Unions quiz questions created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedCStructsPointersQuiz();
