const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const mongoDBQuestions = [
  // CRUD Operations (10 questions)
  {
    title: "Which MongoDB method is used to insert a single document?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "insertOne()"}, {text: "insert()"}, {text: "add()"}, {text: "create()"}],
    correctAnswer: 0,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the find() method return in MongoDB?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "A single document"}, {text: "A cursor to documents"}, {text: "An array of documents"}, {text: "A promise"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which method updates multiple documents in MongoDB?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "update()"}, {text: "updateOne()"}, {text: "updateMany()"}, {text: "modifyMany()"}],
    correctAnswer: 2,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What method is used to delete a single document in MongoDB?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "remove()"}, {text: "deleteOne()"}, {text: "delete()"}, {text: "removeOne()"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which method retrieves only one document from a collection?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "find()"}, {text: "findOne()"}, {text: "getOne()"}, {text: "fetchOne()"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does insertMany() return on successful insertion?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "Array of documents"}, {text: "Object with insertedIds"}, {text: "Boolean true"}, {text: "Number of documents"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which method replaces an entire document in MongoDB?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "updateOne()"}, {text: "replaceOne()"}, {text: "changeOne()"}, {text: "modifyOne()"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What happens if you use deleteMany() without a filter?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "Error is thrown"}, {text: "Nothing happens"}, {text: "Deletes all documents"}, {text: "Deletes first document"}],
    correctAnswer: 2,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which option in updateOne() creates a document if it doesn't exist?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "create: true"}, {text: "upsert: true"}, {text: "insert: true"}, {text: "new: true"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the countDocuments() method return?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "Array of counts"}, {text: "Promise with count"}, {text: "Cursor object"}, {text: "Boolean"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },

  // Comparison and Logical Operators (10 questions)
  {
    title: "Which operator checks if a field equals a value?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "$eq"}, {text: "$equal"}, {text: "$is"}, {text: "$match"}],
    correctAnswer: 0,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the $gt operator do?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "Greater than or equal"}, {text: "Greater than"}, {text: "Get total"}, {text: "Group together"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which operator is used for 'less than or equal to'?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "$lt"}, {text: "$lte"}, {text: "$le"}, {text: "$ltoe"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the $ne operator check?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "Not empty"}, {text: "Not equal"}, {text: "New entry"}, {text: "Next element"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which operator checks if a value is in an array?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "$in"}, {text: "$inside"}, {text: "$contains"}, {text: "$has"}],
    correctAnswer: 0,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the $and operator do?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "Adds values"}, {text: "Joins all conditions with AND logic"}, {text: "Appends documents"}, {text: "Aggregates data"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which operator performs logical OR operation?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "$or"}, {text: "$either"}, {text: "$any"}, {text: "$union"}],
    correctAnswer: 0,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does the $not operator do?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "Removes documents"}, {text: "Inverts query expression"}, {text: "Negates values"}, {text: "Excludes fields"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which operator checks if a value is NOT in an array?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "$notIn"}, {text: "$nin"}, {text: "$exclude"}, {text: "$without"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does $nor operator return?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "Normal results"}, {text: "Documents that fail all conditions"}, {text: "Normalized data"}, {text: "Northern region data"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },

  // Connection, Localhost, CLI/GUI (10 questions)
  {
    title: "What is the default MongoDB port?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "3000"}, {text: "5432"}, {text: "27017"}, {text: "8080"}],
    correctAnswer: 2,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which IP address is equivalent to localhost?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "192.168.1.1"}, {text: "127.0.0.1"}, {text: "0.0.0.0"}, {text: "10.0.0.1"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is the MongoDB command-line interface called?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "mongo shell"}, {text: "mongodb-cli"}, {text: "mongosh"}, {text: "Both A and C"}],
    correctAnswer: 3,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which is the official MongoDB GUI tool?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "MongoDB Workbench"}, {text: "MongoDB Compass"}, {text: "MongoUI"}, {text: "MongoDB Studio"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What protocol does MongoDB connection string start with?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "http://"}, {text: "mongodb://"}, {text: "mongo://"}, {text: "db://"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What is a valid localhost connection string?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "mongodb://localhost:27017"}, {text: "mongo://127.0.0.1"}, {text: "mongodb:localhost"}, {text: "connect://localhost"}],
    correctAnswer: 0,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which command shows all databases in mongo shell?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "show dbs"}, {text: "list databases"}, {text: "get dbs"}, {text: "display databases"}],
    correctAnswer: 0,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does 'use mydb' do in mongo shell?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "Creates and switches to mydb"}, {text: "Only switches to mydb"}, {text: "Deletes mydb"}, {text: "Imports mydb"}],
    correctAnswer: 0,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which command shows collections in current database?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "show collections"}, {text: "list collections"}, {text: "get collections"}, {text: "display tables"}],
    correctAnswer: 0,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does 127.0.0.1 represent?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "Remote server"}, {text: "Loopback address"}, {text: "Gateway address"}, {text: "Broadcast address"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedMongoDBQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await QuizQuestion.deleteMany({ topic: 'MongoDB' });
    console.log('Deleted existing MongoDB quiz questions');

    const insertedQuestions = await QuizQuestion.insertMany(mongoDBQuestions);
    console.log(`Inserted ${insertedQuestions.length} MongoDB quiz questions`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding MongoDB questions:', error);
    process.exit(1);
  }
}

seedMongoDBQuestions();
