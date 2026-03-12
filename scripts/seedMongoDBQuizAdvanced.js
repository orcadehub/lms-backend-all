const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const mongoDBAdvancedQuestions = [
  // CRUD Operations (3 questions)
  {
    title: "Which method is used to find documents and return only specific fields?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "find() with projection"}, {text: "select()"}, {text: "fields()"}, {text: "project()"}],
    correctAnswer: 0,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does findOneAndUpdate() return by default?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "Updated document"}, {text: "Original document"}, {text: "Boolean"}, {text: "Update count"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which method combines find and delete operations?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "deleteOne()"}, {text: "findAndDelete()"}, {text: "findOneAndDelete()"}, {text: "removeOne()"}],
    correctAnswer: 2,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },

  // Comparison and Logical Operators (4 questions)
  {
    title: "Which operator checks if a field exists in a document?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "$exists"}, {text: "$has"}, {text: "$contains"}, {text: "$present"}],
    correctAnswer: 0,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does { age: { $gte: 18, $lte: 60 } } match?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "age > 18 and age < 60"}, {text: "age >= 18 and age <= 60"}, {text: "age = 18 or age = 60"}, {text: "age between 18 to 60 exclusive"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which operator matches documents where field value matches a regex pattern?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "$pattern"}, {text: "$regex"}, {text: "$match"}, {text: "$like"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does $all operator do in arrays?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "Matches all documents"}, {text: "Matches if array contains all specified elements"}, {text: "Returns all fields"}, {text: "Selects all collections"}],
    correctAnswer: 1,
    difficulty: "hard",
    createdBy: instructorId,
    tenant: tenantId
  },

  // Aggregation Pipeline (8 questions)
  {
    title: "What is the first stage typically used in aggregation pipeline?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "$group"}, {text: "$match"}, {text: "$project"}, {text: "$sort"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which operator is used to group documents in aggregation?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "$group"}, {text: "$collect"}, {text: "$aggregate"}, {text: "$combine"}],
    correctAnswer: 0,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does $project stage do in aggregation?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "Creates new collection"}, {text: "Reshapes documents by including/excluding fields"}, {text: "Projects data to screen"}, {text: "Predicts values"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which accumulator calculates the sum in $group stage?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "$sum"}, {text: "$total"}, {text: "$add"}, {text: "$count"}],
    correctAnswer: 0,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does $addFields stage do?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "Adds new documents"}, {text: "Adds new fields to documents"}, {text: "Adds collections"}, {text: "Adds indexes"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which operator divides one number by another in aggregation?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "$div"}, {text: "$divide"}, {text: "$split"}, {text: "$mod"}],
    correctAnswer: 1,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does $multiply operator do?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "Multiplies documents"}, {text: "Multiplies numeric values"}, {text: "Creates multiple copies"}, {text: "Joins collections"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Which accumulator returns the first document in a group?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "$first"}, {text: "$top"}, {text: "$initial"}, {text: "$start"}],
    correctAnswer: 0,
    difficulty: "medium",
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "What does $skip stage do in aggregation pipeline?",
    language: "mongodb",
    topic: "MongoDB",
    options: [{text: "Skips errors"}, {text: "Skips specified number of documents"}, {text: "Skips fields"}, {text: "Skips collections"}],
    correctAnswer: 1,
    difficulty: "easy",
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedMongoDBAdvancedQuizQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const insertedQuestions = await QuizQuestion.insertMany(mongoDBAdvancedQuestions);
    console.log(`Inserted ${insertedQuestions.length} advanced MongoDB quiz questions`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding advanced MongoDB quiz questions:', error);
    process.exit(1);
  }
}

seedMongoDBAdvancedQuizQuestions();
