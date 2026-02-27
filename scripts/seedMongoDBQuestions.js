const mongoose = require('mongoose');
const MongoDBPlaygroundQuestion = require('../models/MongoDBPlaygroundQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const mongoDBPlaygroundQuestions = [
  {
    title: "Find Students with Maths Score Greater Than 90",
    problemStatement: "Write a MongoDB query to find all students whose maths score is greater than 90.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return students with maths > 90",
        expectedQuery: "db.students.find({ maths: { $gt: 90 } })",
        isPublic: true
      }
    ],
    difficulty: "easy",
    tags: ["find", "comparison operators", "$gt"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Female Students from CSE Branch",
    problemStatement: "Write a MongoDB query to find all female students from the CSE branch. Return only name, roll, and branch fields.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return female CSE students with projection",
        expectedQuery: "db.students.find({ gender: 'Female', branch: 'CSE' }, { name: 1, roll: 1, branch: 1, _id: 0 })",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["find", "logical operators", "projection"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Top 5 Students by Attendance",
    problemStatement: "Write a MongoDB query to find the top 5 students with the highest attendance. Sort by attendance in descending order.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return top 5 students by attendance",
        expectedQuery: "db.students.find().sort({ attendance: -1 }).limit(5)",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["find", "sort", "limit"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Students from Bhubaneswar with Physics Score Between 80 and 90",
    problemStatement: "Write a MongoDB query to find all students from Bhubaneswar whose physics score is between 80 and 90 (inclusive).",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return students from Bhubaneswar with physics between 80-90",
        expectedQuery: "db.students.find({ city: 'Bhubaneswar', physics: { $gte: 80, $lte: 90 } })",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["find", "comparison operators", "$gte", "$lte"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Skip First 10 Students and Get Next 5",
    problemStatement: "Write a MongoDB query to skip the first 10 students and return the next 5 students.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should skip 10 and return 5 students",
        expectedQuery: "db.students.find().skip(10).limit(5)",
        isPublic: true
      }
    ],
    difficulty: "easy",
    tags: ["find", "skip", "limit"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Students with Chemistry Less Than 85 or Attendance Less Than 90",
    problemStatement: "Write a MongoDB query to find all students who have either chemistry score less than 85 OR attendance less than 90.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return students with chemistry < 85 or attendance < 90",
        expectedQuery: "db.students.find({ $or: [{ chemistry: { $lt: 85 } }, { attendance: { $lt: 90 } }] })",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["find", "logical operators", "$or", "$lt"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Male Students from IT or ECE Branch",
    problemStatement: "Write a MongoDB query to find all male students who are from either IT or ECE branch.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return male students from IT or ECE",
        expectedQuery: "db.students.find({ gender: 'Male', branch: { $in: ['IT', 'ECE'] } })",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["find", "logical operators", "$in"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Count Students by Branch",
    problemStatement: "Write a MongoDB aggregation query to count the number of students in each branch.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return count of students grouped by branch",
        expectedQuery: "db.students.aggregate([{ $group: { _id: '$branch', count: { $sum: 1 } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$group", "$sum"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Average Maths Score by Gender",
    problemStatement: "Write a MongoDB aggregation query to find the average maths score for each gender.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return average maths score grouped by gender",
        expectedQuery: "db.students.aggregate([{ $group: { _id: '$gender', avgMaths: { $avg: '$maths' } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$group", "$avg"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Students with All Subjects Above 85 Sorted by Name",
    problemStatement: "Write a MongoDB query to find all students who have scored above 85 in all three subjects (maths, physics, chemistry). Sort the results by name in ascending order.",
    collectionName: "students",
    starterCode: "",
    testCases: [
      {
        description: "Should return students with all subjects > 85, sorted by name",
        expectedQuery: "db.students.find({ maths: { $gt: 85 }, physics: { $gt: 85 }, chemistry: { $gt: 85 } }).sort({ name: 1 })",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["find", "comparison operators", "sort", "$gt"],
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedMongoDBPlaygroundQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

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
