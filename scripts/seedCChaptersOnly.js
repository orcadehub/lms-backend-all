const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

const cMaterial = {
  title: "C Programming",
  description: "Complete C programming course from basics to advanced",
  category: "Programming",
  difficultyLevel: "Beginner",
  estimatedDuration: "35 hours",
  chapters: [
    { title: "Introduction to C", order: 1, lessons: [] },
    { title: "C Installation & Setup", order: 2, lessons: [] },
    { title: "C Syntax", order: 3, lessons: [] },
    { title: "Comments in C", order: 4, lessons: [] },
    { title: "Variables in C", order: 5, lessons: [] },
    { title: "Data Types in C", order: 6, lessons: [] },
    { title: "Type Casting", order: 7, lessons: [] },
    { title: "Operators in C", order: 8, lessons: [] },
    { title: "C Input & Output", order: 9, lessons: [] },
    { title: "If Statements", order: 10, lessons: [] },
    { title: "Loops in C", order: 11, lessons: [] },
    { title: "Break, Continue & Return", order: 12, lessons: [] },
    { title: "Functions & Recursions", order: 13, lessons: [] },
    { title: "Arrays in C", order: 14, lessons: [] },
    { title: "Strings in C", order: 15, lessons: [] },
    { title: "Pointers", order: 16, lessons: [] },
    { title: "CLA", order: 17, lessons: [] },
    { title: "Bit Manipulations", order: 18, lessons: [] },
    { title: "DMA", order: 19, lessons: [] },
    { title: "Structures & Unions", order: 20, lessons: [] },
    { title: "Error Handling", order: 21, lessons: [] },
    { title: "File Handling", order: 22, lessons: [] }
  ]
};

async function seedC() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');
    
    const material = await StudyMaterial.create(cMaterial);
    console.log(`Created C material with ${material.chapters.length} chapters`);
    console.log('Material ID:', material._id);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedC();
