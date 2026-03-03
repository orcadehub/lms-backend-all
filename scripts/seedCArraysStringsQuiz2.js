const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const cArraysStringsQuestions2 = [
  {
    title: "What is the output? int arr[3] = {1, 2}; printf(\"%d\", arr[2]);",
    language: "c",
    topic: "C Programming",
    options: [{text: "Garbage value"}, {text: "0"}, {text: "2"}, {text: "Compilation error"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which function concatenates two strings in C?",
    language: "c",
    topic: "C Programming",
    options: [{text: "strcpy()"}, {text: "strcat()"}, {text: "strjoin()"}, {text: "strmerge()"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the size of char array? char name[10];",
    language: "c",
    topic: "C Programming",
    options: [{text: "9 bytes"}, {text: "10 bytes"}, {text: "11 bytes"}, {text: "Depends on compiler"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does strncpy(dest, src, n) do?",
    language: "c",
    topic: "C Programming",
    options: [{text: "Copies entire src to dest"}, {text: "Copies first n characters from src to dest"}, {text: "Copies n strings"}, {text: "Creates n copies"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? char str[] = \"Test\"; printf(\"%c\", str[0]);",
    language: "c",
    topic: "C Programming",
    options: [{text: "Test"}, {text: "T"}, {text: "t"}, {text: "str[0]"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "How do you pass an array to a function in C?",
    language: "c",
    topic: "C Programming",
    options: [{text: "By value only"}, {text: "By reference only"}, {text: "Both by value and reference"}, {text: "Cannot pass arrays"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does strchr(str, 'a') return?",
    language: "c",
    topic: "C Programming",
    options: [{text: "Index of 'a'"}, {text: "Pointer to first occurrence of 'a'"}, {text: "Count of 'a'"}, {text: "Boolean value"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the maximum index for int arr[5]?",
    language: "c",
    topic: "C Programming",
    options: [{text: "5"}, {text: "4"}, {text: "3"}, {text: "6"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which is correct to declare a 2D array?",
    language: "c",
    topic: "C Programming",
    options: [{text: "int arr[3,4];"}, {text: "int arr[3][4];"}, {text: "int arr(3)(4);"}, {text: "array int[3][4];"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does strtok(str, \" \") do?",
    language: "c",
    topic: "C Programming",
    options: [{text: "Converts string to token"}, {text: "Splits string by delimiter"}, {text: "Removes spaces"}, {text: "Counts words"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedCArraysStringsQuestions2() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const insertedQuestions = await QuizQuestion.insertMany(cArraysStringsQuestions2);
    console.log(`Inserted ${insertedQuestions.length} additional C Programming quiz questions`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding C Programming questions:', error);
    process.exit(1);
  }
}

seedCArraysStringsQuestions2();
