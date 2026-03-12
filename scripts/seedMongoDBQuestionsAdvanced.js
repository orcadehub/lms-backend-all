const mongoose = require('mongoose');
const MongoDBPlaygroundQuestion = require('../models/MongoDBPlaygroundQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const advancedMongoDBQuestions = [
  {
    title: "Find Students with Chemistry Score Greater Than Average",
    problemStatement: "Write a MongoDB aggregation query to find all students whose chemistry score is greater than the average chemistry score. Use $facet to calculate average and filter in one pipeline.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return students with chemistry > average",
        expectedQuery: "db.students.aggregate([{ $facet: { avgScore: [{ $group: { _id: null, avg: { $avg: '$chemistry' } } }], allStudents: [{ $project: { name: 1, chemistry: 1, roll: 1 } }] } }, { $unwind: '$avgScore' }, { $unwind: '$allStudents' }, { $match: { $expr: { $gt: ['$allStudents.chemistry', '$avgScore.avg'] } } }, { $replaceRoot: { newRoot: '$allStudents' } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$facet", "$group", "$avg", "$match"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Maximum Maths Score by Branch",
    problemStatement: "Write a MongoDB aggregation query to find the maximum maths score for each branch.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return max maths score grouped by branch",
        expectedQuery: "db.students.aggregate([{ $group: { _id: '$branch', maxMaths: { $max: '$maths' } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$group", "$max"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Minimum Physics Score by City",
    problemStatement: "Write a MongoDB aggregation query to find the minimum physics score for each city.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return min physics score grouped by city",
        expectedQuery: "db.students.aggregate([{ $group: { _id: '$city', minPhysics: { $min: '$physics' } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$group", "$min"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Calculate Total Marks by Gender",
    problemStatement: "Write a MongoDB aggregation query to calculate the sum of all maths, physics, and chemistry scores for each gender. Use $project to add a totalMarks field first.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return sum of total marks grouped by gender",
        expectedQuery: "db.students.aggregate([{ $project: { gender: 1, totalMarks: { $add: ['$maths', '$physics', '$chemistry'] } } }, { $group: { _id: '$gender', totalSum: { $sum: '$totalMarks' } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$project", "$group", "$sum", "$add"],
    createdBy: instructorId,
    tenant: tenantId
  },

  {
    title: "Count Students by Branch and Gender",
    problemStatement: "Write a MongoDB aggregation query to count students grouped by both branch and gender.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return count grouped by branch and gender",
        expectedQuery: "db.students.aggregate([{ $group: { _id: { branch: '$branch', gender: '$gender' }, count: { $sum: 1 } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$group", "$sum", "compound grouping"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Top 3 Students by Total Marks in Each Branch",
    problemStatement: "Write a MongoDB aggregation query to find the top 3 students by total marks (maths + physics + chemistry) in each branch. Sort by totalMarks descending.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return top 3 students per branch by total marks",
        expectedQuery: "db.students.aggregate([{ $project: { name: 1, branch: 1, totalMarks: { $add: ['$maths', '$physics', '$chemistry'] } } }, { $sort: { branch: 1, totalMarks: -1 } }, { $group: { _id: '$branch', students: { $push: '$$ROOT' } } }, { $project: { top3: { $slice: ['$students', 3] } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$project", "$group", "$push", "$slice", "$sort"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Calculate Average Score Across All Subjects by Branch",
    problemStatement: "Write a MongoDB aggregation query to calculate the average score across all three subjects (maths, physics, chemistry) for each branch.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return average of all subjects by branch",
        expectedQuery: "db.students.aggregate([{ $group: { _id: '$branch', avgMaths: { $avg: '$maths' }, avgPhysics: { $avg: '$physics' }, avgChemistry: { $avg: '$chemistry' } } }, { $project: { branch: '$_id', overallAvg: { $avg: ['$avgMaths', '$avgPhysics', '$avgChemistry'] } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$group", "$avg", "$project"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Students with Highest and Lowest Attendance by City",
    problemStatement: "Write a MongoDB aggregation query to find the maximum and minimum attendance for each city.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return max and min attendance by city",
        expectedQuery: "db.students.aggregate([{ $group: { _id: '$city', maxAttendance: { $max: '$attendance' }, minAttendance: { $min: '$attendance' } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$group", "$max", "$min"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Count Students with Attendance Greater Than 95 by Branch",
    problemStatement: "Write a MongoDB aggregation query to count how many students in each branch have attendance greater than 95. Use $match before $group.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return count of students with attendance > 95 by branch",
        expectedQuery: "db.students.aggregate([{ $match: { attendance: { $gt: 95 } } }, { $group: { _id: '$branch', count: { $sum: 1 } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$match", "$group", "$sum"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find First and Last Student Name by Branch (Alphabetically)",
    problemStatement: "Write a MongoDB aggregation query to find the first and last student name alphabetically for each branch using $first and $last accumulators.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return first and last student name by branch",
        expectedQuery: "db.students.aggregate([{ $sort: { branch: 1, name: 1 } }, { $group: { _id: '$branch', firstName: { $first: '$name' }, lastName: { $last: '$name' } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$sort", "$group", "$first", "$last"],
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedAdvancedMongoDBQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const insertedQuestions = await MongoDBPlaygroundQuestion.insertMany(advancedMongoDBQuestions);
    console.log(`Inserted ${insertedQuestions.length} advanced MongoDB questions`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding advanced MongoDB questions:', error);
    process.exit(1);
  }
}

seedAdvancedMongoDBQuestions();
