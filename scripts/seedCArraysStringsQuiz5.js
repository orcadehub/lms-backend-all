const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const cArraysStringsQuestions5 = [
  {
    title: "What is the output? int arr[4] = {2, 4, 6, 8}; printf(\"%d\", arr[3] - arr[0]);",
    language: "c",
    topic: "C Programming",
    options: [{text: "2"}, {text: "6"}, {text: "8"}, {text: "4"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which function compares first n characters of two strings?",
    language: "c",
    topic: "C Programming",
    options: [{text: "strcmp()"}, {text: "strncmp()"}, {text: "strchr()"}, {text: "strncpy()"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? char str[] = \"Code\"; printf(\"%c\", str[strlen(str)-1]);",
    language: "c",
    topic: "C Programming",
    options: [{text: "C"}, {text: "e"}, {text: "d"}, {text: "\\0"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does sprintf(buffer, \"%d\", 123) do?",
    language: "c",
    topic: "C Programming",
    options: [{text: "Prints to screen"}, {text: "Writes formatted string to buffer"}, {text: "Scans input"}, {text: "Allocates memory"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? int arr[] = {10, 20, 30, 40}; printf(\"%d\", *(arr+1));",
    language: "c",
    topic: "C Programming",
    options: [{text: "10"}, {text: "20"}, {text: "30"}, {text: "Address"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which is correct to initialize all elements to zero?",
    language: "c",
    topic: "C Programming",
    options: [{text: "int arr[5] = {0};"}, {text: "int arr[5] = 0;"}, {text: "int arr[5] = {};"}, {text: "int arr[5]();"}],
    correctAnswer: 0,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does strncat(dest, src, n) do?",
    language: "c",
    topic: "C Programming",
    options: [{text: "Copies n characters"}, {text: "Appends first n characters of src to dest"}, {text: "Compares strings"}, {text: "Splits string"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? char str[10] = \"Hi\"; printf(\"%d\", sizeof(str));",
    language: "c",
    topic: "C Programming",
    options: [{text: "2"}, {text: "10"}, {text: "3"}, {text: "11"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? int arr[3][2] = {{1,2},{3,4},{5,6}}; printf(\"%d\", arr[2][0]);",
    language: "c",
    topic: "C Programming",
    options: [{text: "2"}, {text: "5"}, {text: "6"}, {text: "4"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What happens when accessing arr[10] in int arr[5]?",
    language: "c",
    topic: "C Programming",
    options: [{text: "Returns 0"}, {text: "Undefined behavior"}, {text: "Compilation error"}, {text: "Returns NULL"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedCArraysStringsQuestions5() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const insertedQuestions = await QuizQuestion.insertMany(cArraysStringsQuestions5);
    console.log(`Inserted ${insertedQuestions.length} C Programming quiz questions (4 easy, 4 medium, 2 hard)`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding C Programming questions:', error);
    process.exit(1);
  }
}

seedCArraysStringsQuestions5();
