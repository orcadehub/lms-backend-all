const mongoose = require('mongoose');
const MongoDBPlaygroundQuestion = require('../models/MongoDBPlaygroundQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const mongoDBUsersQuestions2 = [
  {
    title: "Find Top 5 Users by Salary",
    problemStatement: "Write a MongoDB query to find the top 5 users with the highest salary. Sort by salary in descending order.",
    collectionName: "users",
    starterCode: "",
    testCases: [
      {
        description: "Should return top 5 users by salary",
        expectedQuery: "db.users.find().sort({ salary: -1 }).limit(5)",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["find", "sort", "limit"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Users from Chicago or Boston with Age Greater Than 28",
    problemStatement: "Write a MongoDB query to find all users from Chicago or Boston who are older than 28. Return only name, city, and age fields.",
    collectionName: "users",
    starterCode: "",
    testCases: [
      {
        description: "Should return users from Chicago or Boston with age > 28 with projection",
        expectedQuery: "db.users.find({ city: { $in: ['Chicago', 'Boston'] }, age: { $gt: 28 } }, { name: 1, city: 1, age: 1, _id: 0 })",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["find", "logical operators", "$in", "$gt", "projection"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Maximum and Minimum Salary by City",
    problemStatement: "Write a MongoDB aggregation query to find the maximum and minimum salary for each city.",
    collectionName: "users",
    starterCode: "",
    testCases: [
      {
        description: "Should return max and min salary by city",
        expectedQuery: "db.users.aggregate([{ $group: { _id: '$city', maxSalary: { $max: '$salary' }, minSalary: { $min: '$salary' } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$group", "$max", "$min"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Average Age by City with Salary Greater Than 75000",
    problemStatement: "Write a MongoDB aggregation query to match only users with salary > 75000, then calculate average age for each city. Round the average to 2 decimal places.",
    collectionName: "users",
    starterCode: "",
    testCases: [
      {
        description: "Should return average age by city for users with salary > 75000 with 2 decimals",
        expectedQuery: "db.users.aggregate([{ $match: { salary: { $gt: 75000 } } }, { $group: { _id: '$city', avgAge: { $avg: '$age' } } }, { $project: { _id: 1, avgAge: { $round: ['$avgAge', 2] } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$match", "$group", "$avg", "$round", "$project"],
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedMongoDBUsersQuestions2() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const insertedQuestions = await MongoDBPlaygroundQuestion.insertMany(mongoDBUsersQuestions2);
    console.log(`Inserted ${insertedQuestions.length} more MongoDB users questions`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding MongoDB users questions:', error);
    process.exit(1);
  }
}

seedMongoDBUsersQuestions2();
