const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const Student = require('../models/Student');
const PracticeSubmission = require('../models/PracticeSubmission');
const GamifiedAttempt = require('../models/GamifiedAttempt');
const MCQAttempt = require('../models/MCQAttempt');
const LabSubmission = require('../models/LabSubmission');
const Tenant = require('../models/Tenant');

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB. Seeding analytics data...");

    // Get a subset of students to seed data for (e.g. 500 random students)
    const students = await Student.find({}).select('_id').limit(500).lean();
    const studentIds = students.map(s => s._id);

    if (studentIds.length === 0) {
      console.log("No students found. Exiting.");
      process.exit(0);
    }

    const dummyQuestionId = new mongoose.Types.ObjectId();
    const dummyTopicId = new mongoose.Types.ObjectId();
    const now = new Date();

    console.log(`Seeding data for ${studentIds.length} students...`);

    // 1. Seed Gamified Attempts
    const gamifiedDocs = [];
    for (let i = 0; i < 500; i++) {
      const sid = studentIds[Math.floor(Math.random() * studentIds.length)];
      gamifiedDocs.push({
        userId: sid,
        questionId: dummyQuestionId,
        status: 'completed',
        totalScore: Math.floor(Math.random() * 50) + 50,
        maxScore: 100,
        totalLevels: 5,
        completedLevels: 5,
        isCompleted: true,
        completedAt: new Date(now.getTime() - Math.random() * 10 * 24 * 60 * 60 * 1000), // last 10 days
        accuracy: Math.floor(Math.random() * 30) + 65 // 65-95%
      });
    }
    await GamifiedAttempt.insertMany(gamifiedDocs);
    console.log(`Inserted ${gamifiedDocs.length} GamifiedAttempts.`);

    // 2. Seed MCQ Attempts (Aptitude)
    const mcqDocs = [];
    for (let i = 0; i < 1500; i++) {
      const sid = studentIds[Math.floor(Math.random() * studentIds.length)];
      mcqDocs.push({
        studentId: sid,
        dataset: 'Aptitude-Quiz-' + Math.floor(Math.random() * 5),
        questionIndex: Math.floor(Math.random() * 20),
        isCorrect: Math.random() > 0.3, // 70% chance to be correct
        timestamp: new Date(now.getTime() - Math.random() * 10 * 24 * 60 * 60 * 1000)
      });
    }
    await MCQAttempt.insertMany(mcqDocs);
    console.log(`Inserted ${mcqDocs.length} MCQAttempts.`);

    // 3. Seed Lab Submissions
    const labDocs = [];
    for (let i = 0; i < 300; i++) {
      const sid = studentIds[Math.floor(Math.random() * studentIds.length)];
      labDocs.push({
        studentId: sid,
        labId: dummyQuestionId,
        status: 'passed',
        score: Math.floor(Math.random() * 25) + 75, // 75-100 score
        submittedAt: new Date(now.getTime() - Math.random() * 10 * 24 * 60 * 60 * 1000)
      });
    }
    await LabSubmission.insertMany(labDocs);
    console.log(`Inserted ${labDocs.length} LabSubmissions.`);

    // 4. Seed Orca Practice Submissions
    const orcaDocs = [];
    // We want avgOrca to be around 6 for these 500 students, so 3000 submissions
    for (let i = 0; i < 4000; i++) {
      const sid = studentIds[Math.floor(Math.random() * studentIds.length)];
      orcaDocs.push({
        userId: sid,
        questionId: new mongoose.Types.ObjectId(), // unique question
        topicId: dummyTopicId,
        isCompleted: true,
        completedAt: new Date(now.getTime() - Math.random() * 10 * 24 * 60 * 60 * 1000),
        language: 'python',
        status: 'accepted'
      });
    }
    await PracticeSubmission.insertMany(orcaDocs);
    console.log(`Inserted ${orcaDocs.length} PracticeSubmissions.`);

    // 5. Connect Coding Profiles for 300 of these students
    let profileUpdates = 0;
    for (let i = 0; i < 300; i++) {
      const sid = studentIds[i];
      await Student.updateOne(
        { _id: sid },
        { 
          $set: { 
            "codingProfiles.leetcode.connected": true,
            "codingProfiles.leetcode.username": "coder" + i,
            "codingProfiles.leetcode.totalSolved": Math.floor(Math.random() * 150) + 50
          }
        }
      );
      profileUpdates++;
    }
    console.log(`Updated ${profileUpdates} students with LeetCode coding profiles.`);

    console.log("Analytics seed complete! The radar chart should now look beautifully populated.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
}
run();
