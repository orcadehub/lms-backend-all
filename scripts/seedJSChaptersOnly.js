const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

const jsMaterial = {
  title: "JavaScript",
  description: "Complete JavaScript (ES6) course from basics to advanced",
  category: "Web Development",
  difficultyLevel: "Beginner",
  estimatedDuration: "40 hours",
  chapters: [
    { title: "Introduction to JS", order: 1, lessons: [] },
    { title: "JS Installation & Setup", order: 2, lessons: [] },
    { title: "JS Syntax", order: 3, lessons: [] },
    { title: "Variables in JS", order: 4, lessons: [] },
    { title: "Data Types in JS", order: 5, lessons: [] },
    { title: "Type Casting", order: 6, lessons: [] },
    { title: "Operators in JS", order: 7, lessons: [] },
    { title: "JS Input & Output", order: 8, lessons: [] },
    { title: "If Statements", order: 9, lessons: [] },
    { title: "Loops in JS", order: 10, lessons: [] },
    { title: "Functions & Scopes", order: 11, lessons: [] },
    { title: "Arrays in JS", order: 12, lessons: [] },
    { title: "Strings in JS", order: 13, lessons: [] },
    { title: "JSON", order: 14, lessons: [] },
    { title: "DOM", order: 15, lessons: [] },
    { title: "Events", order: 16, lessons: [] },
    { title: "Dates", order: 17, lessons: [] },
    { title: "Classes & Objects", order: 18, lessons: [] },
    { title: "Exception Handling", order: 19, lessons: [] },
    { title: "AJAX", order: 20, lessons: [] },
    { title: "Asyncronous", order: 21, lessons: [] }
  ]
};

async function seedJS() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');
    
    const material = await StudyMaterial.create(jsMaterial);
    console.log(`Created JavaScript material with ${material.chapters.length} chapters`);
    console.log('Material ID:', material._id);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedJS();
