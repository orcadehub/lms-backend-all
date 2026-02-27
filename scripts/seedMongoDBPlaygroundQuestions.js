const mongoose = require('mongoose');
const MongoDBPlaygroundQuestion = require('../models/MongoDBPlaygroundQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const mongoDBPlaygroundQuestions = [
  {
    title: "Find All Users Above Age 25",
    problemStatement: "Write a MongoDB query to find all users whose age is greater than 25.",
    collectionName: "users",
    starterCode: "db.users.find()",
    testCases: [
      {
        description: "Should return users with age > 25",
        expectedQuery: "db.users.find({ age: { $gt: 25 } })",
        isPublic: true
      }
    ],
    difficulty: "easy",
    tags: ["find", "comparison"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Users in New York",
    problemStatement: "Write a MongoDB query to find all users who live in 'New York'.",
    collectionName: "users",
    starterCode: "db.users.find()",
    testCases: [
      {
        description: "Should return users from New York",
        expectedQuery: "db.users.find({ city: 'New York' })",
        isPublic: true
      }
    ],
    difficulty: "easy",
    tags: ["find", "equality"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Products by Price Range",
    problemStatement: "Write a MongoDB query to find all products with price between 100 and 300 (inclusive).",
    collectionName: "products",
    starterCode: "db.products.find()",
    testCases: [
      {
        description: "Should return products in price range 100-300",
        expectedQuery: "db.products.find({ price: { $gte: 100, $lte: 300 } })",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["find", "range"],
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedMongoDBPlaygroundQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await MongoDBPlaygroundQuestion.deleteMany({});
    console.log('Deleted existing MongoDB playground questions');

    const insertedQuestions = await MongoDBPlaygroundQuestion.insertMany(mongoDBPlaygroundQuestions);
    console.log(`Inserted ${insertedQuestions.length} MongoDB playground questions`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding MongoDB playground questions:', error);
    process.exit(1);
  }
}

seedMongoDBPlaygroundQuestions();
