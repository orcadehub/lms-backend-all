const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const cArraysStringsQuestions7 = [
  {
    title: "What is the output? int arr[5] = {1, 2, 3}; printf(\"%d\", arr[4]);",
    language: "c",
    topic: "C Programming",
    options: [{text: "3"}, {text: "0"}, {text: "Garbage"}, {text: "Error"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which function converts a string to lowercase?",
    language: "c",
    topic: "C Programming",
    options: [{text: "strlwr()"}, {text: "tolower()"}, {text: "lower()"}, {text: "No standard function"}],
    correctAnswer: 3,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? char str[] = \"ABC\"; printf(\"%d\", str[1] - 'A');",
    language: "c",
    topic: "C Programming",
    options: [{text: "0"}, {text: "1"}, {text: "66"}, {text: "32"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does memcmp(arr1, arr2, n) return if arrays are equal?",
    language: "c",
    topic: "C Programming",
    options: [{text: "1"}, {text: "0"}, {text: "true"}, {text: "-1"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? int arr[] = {2, 4, 6}; int *p = arr + 2; printf(\"%d\", *p);",
    language: "c",
    topic: "C Programming",
    options: [{text: "2"}, {text: "6"}, {text: "4"}, {text: "8"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the correct way to get array length?",
    language: "c",
    topic: "C Programming",
    options: [{text: "sizeof(arr)/sizeof(arr[0])"}, {text: "length(arr)"}, {text: "arr.length"}, {text: "size(arr)"}],
    correctAnswer: 0,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does sscanf(\"123\", \"%d\", &num) do?",
    language: "c",
    topic: "C Programming",
    options: [{text: "Prints to string"}, {text: "Reads formatted input from string"}, {text: "Scans file"}, {text: "Allocates memory"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? char str[6] = \"Hello\"; printf(\"%d\", strlen(str));",
    language: "c",
    topic: "C Programming",
    options: [{text: "6"}, {text: "5"}, {text: "4"}, {text: "7"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the output? int arr[2][2] = {1, 2, 3, 4}; printf(\"%d\", arr[1][1]);",
    language: "c",
    topic: "C Programming",
    options: [{text: "2"}, {text: "4"}, {text: "3"}, {text: "1"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What happens with char *p = \"Test\"; p[0] = 'B';?",
    language: "c",
    topic: "C Programming",
    options: [{text: "Works fine"}, {text: "Undefined behavior/Segmentation fault"}, {text: "Compilation error"}, {text: "Changes to \"Best\""}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedCArraysStringsQuestions7() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const insertedQuestions = await QuizQuestion.insertMany(cArraysStringsQuestions7);
    console.log(`Inserted ${insertedQuestions.length} C Programming quiz questions (4 easy, 4 medium, 2 hard)`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding C Programming questions:', error);
    process.exit(1);
  }
}

seedCArraysStringsQuestions7();
