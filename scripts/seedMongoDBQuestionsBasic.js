const mongoose = require('mongoose');
const MongoDBPlaygroundQuestion = require('../models/MongoDBPlaygroundQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const basicAggregationQuestions = [
  {
    title: "Calculate Total Marks for Each Student",
    problemStatement: "Write a MongoDB aggregation query to add a new field 'totalMarks' which is the sum of maths, physics, and chemistry for each student. Use $addFields.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should add totalMarks field",
        expectedQuery: "db.students.aggregate([{ $addFields: { totalMarks: { $add: ['$maths', '$physics', '$chemistry'] } } }])",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["aggregation", "$addFields", "$add"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Calculate Average Marks and Multiply by 10",
    problemStatement: "Write a MongoDB aggregation query to calculate average of maths, physics, and chemistry, then multiply by 10 for each student. Use $project.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should calculate average and multiply by 10",
        expectedQuery: "db.students.aggregate([{ $project: { name: 1, avgMarks: { $avg: ['$maths', '$physics', '$chemistry'] }, weightedScore: { $multiply: [{ $avg: ['$maths', '$physics', '$chemistry'] }, 10] } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$project", "$avg", "$multiply"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Students with Maths Greater Than 85 and Sort by Chemistry",
    problemStatement: "Write a MongoDB aggregation query to match students with maths > 85, then sort by chemistry in descending order.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should match and sort students",
        expectedQuery: "db.students.aggregate([{ $match: { maths: { $gt: 85 } } }, { $sort: { chemistry: -1 } }])",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["aggregation", "$match", "$sort"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Calculate Percentage for Each Student",
    problemStatement: "Write a MongoDB aggregation query to calculate percentage for each student. Total marks = maths + physics + chemistry, percentage = (totalMarks / 300) * 100. Use $project with $divide and $multiply.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should calculate percentage",
        expectedQuery: "db.students.aggregate([{ $project: { name: 1, totalMarks: { $add: ['$maths', '$physics', '$chemistry'] }, percentage: { $multiply: [{ $divide: [{ $add: ['$maths', '$physics', '$chemistry'] }, 300] }, 100] } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$project", "$add", "$divide", "$multiply"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Count Total Students by Branch and Sort",
    problemStatement: "Write a MongoDB aggregation query to count total students in each branch and sort by count in descending order.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should count and sort by branch",
        expectedQuery: "db.students.aggregate([{ $group: { _id: '$branch', totalStudents: { $sum: 1 } } }, { $sort: { totalStudents: -1 } }])",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["aggregation", "$group", "$sum", "$sort"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Average Attendance by City with Limit",
    problemStatement: "Write a MongoDB aggregation query to find average attendance for each city, sort by average attendance descending, and limit to top 3 cities.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return top 3 cities by average attendance",
        expectedQuery: "db.students.aggregate([{ $group: { _id: '$city', avgAttendance: { $avg: '$attendance' } } }, { $sort: { avgAttendance: -1 } }, { $limit: 3 }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$group", "$avg", "$sort", "$limit"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Skip First 5 Students and Get Next 10 with Projection",
    problemStatement: "Write a MongoDB aggregation query to skip first 5 students, get next 10, and project only name, roll, and branch fields.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should skip 5, limit 10, and project fields",
        expectedQuery: "db.students.aggregate([{ $skip: 5 }, { $limit: 10 }, { $project: { name: 1, roll: 1, branch: 1, _id: 0 } }])",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["aggregation", "$skip", "$limit", "$project"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Max and Min Maths Score by Gender",
    problemStatement: "Write a MongoDB aggregation query to find maximum and minimum maths score for each gender.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return max and min maths by gender",
        expectedQuery: "db.students.aggregate([{ $group: { _id: '$gender', maxMaths: { $max: '$maths' }, minMaths: { $min: '$maths' } } }])",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["aggregation", "$group", "$max", "$min"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Get First and Last Student by Attendance in Each Branch",
    problemStatement: "Write a MongoDB aggregation query to get the first and last student (by attendance) in each branch. Sort by branch and attendance first.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return first and last student by attendance per branch",
        expectedQuery: "db.students.aggregate([{ $sort: { branch: 1, attendance: 1 } }, { $group: { _id: '$branch', firstStudent: { $first: '$name' }, lastStudent: { $last: '$name' } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$sort", "$group", "$first", "$last"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Calculate Total and Average Marks by Branch for Female Students",
    problemStatement: "Write a MongoDB aggregation query to match only female students, calculate total marks (sum of all three subjects) and average marks for each branch.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return total and average marks by branch for females",
        expectedQuery: "db.students.aggregate([{ $match: { gender: 'Female' } }, { $addFields: { totalMarks: { $add: ['$maths', '$physics', '$chemistry'] } } }, { $group: { _id: '$branch', totalSum: { $sum: '$totalMarks' }, avgMarks: { $avg: '$totalMarks' } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$match", "$addFields", "$group", "$sum", "$avg", "$add"],
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedBasicAggregationQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const insertedQuestions = await MongoDBPlaygroundQuestion.insertMany(basicAggregationQuestions);
    console.log(`Inserted ${insertedQuestions.length} basic aggregation questions`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding basic aggregation questions:', error);
    process.exit(1);
  }
}

seedBasicAggregationQuestions();
