const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const cArraysStringsQuestions4 = [
  // 4 Easy Questions
  {
    title: "What is the correct syntax to declare a character array?",
    language: "c",
    topic: "C Programming",
    options: [{text: "char arr[];"}, {text: "char arr[10];"}, {text: "string arr[10];"}, {text: "array char[10];"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which header file is required for string functions?",
    language: "c",
    topic: "C Programming",
    options: [{text: "stdio.h"}, {text: "string.h"}, {text: "stdlib.h"}, {text: "ctype.h"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? int arr[5] = {1}; printf(\"%d\", arr[1]);",
    language: "c",
    topic: "C Programming",
    options: [{text: "1"}, {text: "0"}, {text: "Garbage"}, {text: "Error"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which function converts string to uppercase?",
    language: "c",
    topic: "C Programming",
    options: [{text: "strupr()"}, {text: "toupper()"}, {text: "upper()"}, {text: "No standard function"}],
    correctAnswer: 3,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  
  // 4 Medium Questions
  {
    title: "What is the output? char str[] = \"Test\"; printf(\"%lu\", strlen(str));",
    language: "c",
    topic: "C Programming",
    options: [{text: "5"}, {text: "4"}, {text: "3"}, {text: "Compilation error"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does memcpy(dest, src, n) do?",
    language: "c",
    topic: "C Programming",
    options: [{text: "Copies n strings"}, {text: "Copies n bytes from src to dest"}, {text: "Compares memory"}, {text: "Allocates memory"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? int arr[] = {5, 10, 15}; int *ptr = arr; printf(\"%d\", *(ptr+2));",
    language: "c",
    topic: "C Programming",
    options: [{text: "5"}, {text: "15"}, {text: "10"}, {text: "Error"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does strncmp(str1, str2, n) return if first n characters are equal?",
    language: "c",
    topic: "C Programming",
    options: [{text: "1"}, {text: "0"}, {text: "-1"}, {text: "n"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  
  // 2 Hard Questions
  {
    title: "What is the output? char *arr[] = {\"Hello\", \"World\"}; printf(\"%c\", arr[1][1]);",
    language: "c",
    topic: "C Programming",
    options: [{text: "H"}, {text: "o"}, {text: "W"}, {text: "e"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What happens with char str[3] = \"ABC\";?",
    language: "c",
    topic: "C Programming",
    options: [{text: "Works fine"}, {text: "No null terminator stored"}, {text: "Compilation error"}, {text: "Runtime error"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedCArraysStringsQuestions4() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const insertedQuestions = await QuizQuestion.insertMany(cArraysStringsQuestions4);
    console.log(`Inserted ${insertedQuestions.length} C Programming quiz questions (4 easy, 4 medium, 2 hard)`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding C Programming questions:', error);
    process.exit(1);
  }
}

seedCArraysStringsQuestions4();
