const mongoose = require('mongoose');
const MongoDBPlaygroundQuestion = require('../models/MongoDBPlaygroundQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const mongoDBUsersQuestions = [
  {
    title: "Find Users with Age Greater Than 30",
    problemStatement: "Write a MongoDB query to find all users whose age is greater than 30.",
    collectionName: "users",
    starterCode: "",
    testCases: [
      {
        description: "Should return users with age > 30",
        expectedQuery: "db.users.find({ age: { $gt: 30 } })",
        isPublic: true
      }
    ],
    difficulty: "easy",
    tags: ["find", "comparison operators", "$gt"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Users from New York with Salary Between 70000 and 90000",
    problemStatement: "Write a MongoDB query to find all users from New York whose salary is between 70000 and 90000 (inclusive).",
    collectionName: "users",
    starterCode: "",
    testCases: [
      {
        description: "Should return users from New York with salary between 70000-90000",
        expectedQuery: "db.users.find({ city: 'New York', salary: { $gte: 70000, $lte: 90000 } })",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["find", "comparison operators", "$gte", "$lte"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Users with Salary Less Than 65000 or Age Less Than 25",
    problemStatement: "Write a MongoDB query to find all users who have either salary less than 65000 OR age less than 25.",
    collectionName: "users",
    starterCode: "",
    testCases: [
      {
        description: "Should return users with salary < 65000 or age < 25",
        expectedQuery: "db.users.find({ $or: [{ salary: { $lt: 65000 } }, { age: { $lt: 25 } }] })",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["find", "logical operators", "$or", "$lt"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Users from San Francisco or Seattle",
    problemStatement: "Write a MongoDB query to find all users who are from either San Francisco or Seattle.",
    collectionName: "users",
    starterCode: "",
    testCases: [
      {
        description: "Should return users from San Francisco or Seattle",
        expectedQuery: "db.users.find({ city: { $in: ['San Francisco', 'Seattle'] } })",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["find", "logical operators", "$in"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Count Users by City",
    problemStatement: "Write a MongoDB aggregation query to count the number of users in each city.",
    collectionName: "users",
    starterCode: "",
    testCases: [
      {
        description: "Should return count of users grouped by city",
        expectedQuery: "db.users.aggregate([{ $group: { _id: '$city', count: { $sum: 1 } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$group", "$sum"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Average Salary by City",
    problemStatement: "Write a MongoDB aggregation query to find the average salary for each city. Round the average to 2 decimal places using $round.",
    collectionName: "users",
    starterCode: "",
    testCases: [
      {
        description: "Should return average salary grouped by city with 2 decimals",
        expectedQuery: "db.users.aggregate([{ $group: { _id: '$city', avgSalary: { $avg: '$salary' } } }, { $project: { _id: 1, avgSalary: { $round: ['$avgSalary', 2] } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$group", "$avg", "$round", "$project"],
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedMongoDBUsersQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const insertedQuestions = await MongoDBPlaygroundQuestion.insertMany(mongoDBUsersQuestions);
    console.log(`Inserted ${insertedQuestions.length} MongoDB users questions`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding MongoDB users questions:', error);
    process.exit(1);
  }
}

seedMongoDBUsersQuestions();
