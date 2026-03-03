const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const cArraysStringsQuestions = [
  {
    title: "What is the correct way to declare an integer array of size 5 in C?",
    language: "c",
    topic: "C Programming",
    options: [{text: "int arr[5];"}, {text: "array int arr[5];"}, {text: "int arr(5);"}, {text: "int[5] arr;"}],
    correctAnswer: 0,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the index of the first element in a C array?",
    language: "c",
    topic: "C Programming",
    options: [{text: "1"}, {text: "0"}, {text: "-1"}, {text: "Depends on declaration"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "How do you access the third element of an array named 'arr'?",
    language: "c",
    topic: "C Programming",
    options: [{text: "arr[3]"}, {text: "arr[2]"}, {text: "arr(2)"}, {text: "arr.2"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the following code print? char str[] = \"Hello\"; printf(\"%d\", sizeof(str));",
    language: "c",
    topic: "C Programming",
    options: [{text: "5"}, {text: "6"}, {text: "4"}, {text: "Compilation error"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which function is used to find the length of a string in C?",
    language: "c",
    topic: "C Programming",
    options: [{text: "length()"}, {text: "strlen()"}, {text: "size()"}, {text: "len()"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the correct way to initialize a string in C?",
    language: "c",
    topic: "C Programming",
    options: [{text: "char str[] = \"Hello\";"}, {text: "string str = \"Hello\";"}, {text: "char str = \"Hello\";"}, {text: "str[] = \"Hello\";"}],
    correctAnswer: 0,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which function copies one string to another in C?",
    language: "c",
    topic: "C Programming",
    options: [{text: "strcat()"}, {text: "strcmp()"}, {text: "strcpy()"}, {text: "strdup()"}],
    correctAnswer: 2,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? int arr[] = {1, 2, 3, 4, 5}; printf(\"%d\", arr[4]);",
    language: "c",
    topic: "C Programming",
    options: [{text: "4"}, {text: "5"}, {text: "Garbage value"}, {text: "Compilation error"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does strcmp(str1, str2) return if str1 and str2 are equal?",
    language: "c",
    topic: "C Programming",
    options: [{text: "1"}, {text: "0"}, {text: "-1"}, {text: "true"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the null character that terminates a string in C?",
    language: "c",
    topic: "C Programming",
    options: [{text: "'\\n'"}, {text: "'\\0'"}, {text: "NULL"}, {text: "0"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedCArraysStringsQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await QuizQuestion.deleteMany({ topic: 'C Programming', language: 'c' });
    console.log('Deleted existing C Programming quiz questions');

    const insertedQuestions = await QuizQuestion.insertMany(cArraysStringsQuestions);
    console.log(`Inserted ${insertedQuestions.length} C Programming quiz questions`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding C Programming questions:', error);
    process.exit(1);
  }
}

seedCArraysStringsQuestions();
