const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const cArraysStringsQuestions3 = [
  {
    title: "What is the output? int arr[] = {10, 20, 30}; printf(\"%d\", sizeof(arr)/sizeof(arr[0]));",
    language: "c",
    topic: "C Programming",
    options: [{text: "12"}, {text: "3"}, {text: "4"}, {text: "Compilation error"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which function compares two strings case-insensitively?",
    language: "c",
    topic: "C Programming",
    options: [{text: "strcmp()"}, {text: "strcasecmp()"}, {text: "strncmp()"}, {text: "stricmp()"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? char str[5] = \"Hello\"; printf(\"%s\", str);",
    language: "c",
    topic: "C Programming",
    options: [{text: "Hello"}, {text: "Hell"}, {text: "Garbage value"}, {text: "Compilation error"}],
    correctAnswer: 0,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does memset(arr, 0, sizeof(arr)) do?",
    language: "c",
    topic: "C Programming",
    options: [{text: "Deletes array"}, {text: "Sets all bytes to 0"}, {text: "Allocates memory"}, {text: "Frees memory"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? char *str = \"World\"; printf(\"%c\", *(str+1));",
    language: "c",
    topic: "C Programming",
    options: [{text: "W"}, {text: "o"}, {text: "r"}, {text: "Compilation error"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which function reverses a string in C standard library?",
    language: "c",
    topic: "C Programming",
    options: [{text: "strrev()"}, {text: "reverse()"}, {text: "No standard function"}, {text: "strinv()"}],
    correctAnswer: 2,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? int arr[2][3] = {{1,2,3},{4,5,6}}; printf(\"%d\", arr[1][2]);",
    language: "c",
    topic: "C Programming",
    options: [{text: "3"}, {text: "6"}, {text: "5"}, {text: "2"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does strstr(str1, str2) return?",
    language: "c",
    topic: "C Programming",
    options: [{text: "Concatenated string"}, {text: "Pointer to first occurrence of str2 in str1"}, {text: "Length of str2"}, {text: "Boolean value"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? char str[] = \"ABC\"; str[0] = 'Z'; printf(\"%s\", str);",
    language: "c",
    topic: "C Programming",
    options: [{text: "ABC"}, {text: "ZBC"}, {text: "Compilation error"}, {text: "Runtime error"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which is true about array name in C?",
    language: "c",
    topic: "C Programming",
    options: [{text: "It's a variable"}, {text: "It's a constant pointer"}, {text: "It can be reassigned"}, {text: "It stores array size"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedCArraysStringsQuestions3() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const insertedQuestions = await QuizQuestion.insertMany(cArraysStringsQuestions3);
    console.log(`Inserted ${insertedQuestions.length} more C Programming quiz questions`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding C Programming questions:', error);
    process.exit(1);
  }
}

seedCArraysStringsQuestions3();
