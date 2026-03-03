const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const cArraysStringsQuestions6 = [
  {
    title: "What is the output? int arr[] = {5, 10, 15, 20}; printf(\"%d\", arr[2] + arr[0]);",
    language: "c",
    topic: "C Programming",
    options: [{text: "15"}, {text: "20"}, {text: "25"}, {text: "10"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which function finds the last occurrence of a character in a string?",
    language: "c",
    topic: "C Programming",
    options: [{text: "strchr()"}, {text: "strrchr()"}, {text: "strlast()"}, {text: "strfind()"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? char str[] = \"Program\"; printf(\"%d\", str[3] - str[0]);",
    language: "c",
    topic: "C Programming",
    options: [{text: "3"}, {text: "13"}, {text: "16"}, {text: "0"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does memmove(dest, src, n) do differently than memcpy?",
    language: "c",
    topic: "C Programming",
    options: [{text: "Faster execution"}, {text: "Handles overlapping memory"}, {text: "Copies strings only"}, {text: "No difference"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? int arr[3] = {10, 20, 30}; int *p = &arr[1]; printf(\"%d\", *p);",
    language: "c",
    topic: "C Programming",
    options: [{text: "10"}, {text: "20"}, {text: "30"}, {text: "Address"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "How do you declare a constant array in C?",
    language: "c",
    topic: "C Programming",
    options: [{text: "const int arr[5] = {1,2,3,4,5};"}, {text: "constant int arr[5];"}, {text: "final int arr[5];"}, {text: "readonly int arr[5];"}],
    correctAnswer: 0,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does atoi(\"123\") return?",
    language: "c",
    topic: "C Programming",
    options: [{text: "\"123\""}, {text: "123"}, {text: "Error"}, {text: "NULL"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? char str[] = \"Test\"; printf(\"%d\", sizeof(str) - strlen(str));",
    language: "c",
    topic: "C Programming",
    options: [{text: "0"}, {text: "1"}, {text: "4"}, {text: "5"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? int arr[][3] = {{1,2,3},{4,5,6}}; printf(\"%d\", arr[0][2] + arr[1][0]);",
    language: "c",
    topic: "C Programming",
    options: [{text: "5"}, {text: "7"}, {text: "6"}, {text: "9"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the difference between char *str = \"Hello\" and char str[] = \"Hello\"?",
    language: "c",
    topic: "C Programming",
    options: [{text: "No difference"}, {text: "First is read-only, second is modifiable"}, {text: "First is modifiable, second is read-only"}, {text: "Both are read-only"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedCArraysStringsQuestions6() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const insertedQuestions = await QuizQuestion.insertMany(cArraysStringsQuestions6);
    console.log(`Inserted ${insertedQuestions.length} C Programming quiz questions (4 easy, 4 medium, 2 hard)`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding C Programming questions:', error);
    process.exit(1);
  }
}

seedCArraysStringsQuestions6();
