const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

const dsaMaterial = {
  title: "Data Structures & Algorithms",
  description: "Complete DSA course covering all essential data structures and algorithms",
  category: "Programming",
  difficultyLevel: "Intermediate",
  estimatedDuration: "50 hours",
  chapters: [
    { title: "Arrays", order: 1, lessons: [] },
    { title: "Strings", order: 2, lessons: [] },
    { title: "Matrix", order: 3, lessons: [] },
    { title: "Recursions & BackTracking", order: 4, lessons: [] },
    { title: "Time & Space Complexities", order: 5, lessons: [] },
    { title: "Searching", order: 6, lessons: [] },
    { title: "Sorting", order: 7, lessons: [] },
    { title: "HashMap", order: 8, lessons: [] },
    { title: "HashSet", order: 9, lessons: [] },
    { title: "Class & Objects", order: 10, lessons: [] },
    { title: "Intro to DS", order: 11, lessons: [] },
    { title: "Linked List", order: 12, lessons: [] },
    { title: "Stack", order: 13, lessons: [] },
    { title: "Queue", order: 14, lessons: [] },
    { title: "Trees", order: 15, lessons: [] },
    { title: "Graphs", order: 16, lessons: [] }
  ]
};

async function seedDSA() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');
    
    const material = await StudyMaterial.create(dsaMaterial);
    console.log(`Created DSA material with ${material.chapters.length} chapters`);
    console.log('Material ID:', material._id);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedDSA();
