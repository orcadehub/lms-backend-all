const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

const pythonMaterial = {
  title: "Python Programming",
  description: "Complete Python programming course from basics to advanced",
  category: "Programming",
  difficultyLevel: "Beginner",
  estimatedDuration: "40 hours",
  chapters: [
    { title: "Introduction to Python", order: 1, lessons: [] },
    { title: "Python Installation & Setup", order: 2, lessons: [] },
    { title: "Python Syntax", order: 3, lessons: [] },
    { title: "Variables in Python", order: 4, lessons: [] },
    { title: "Data Types in Python", order: 5, lessons: [] },
    { title: "Type Casting", order: 6, lessons: [] },
    { title: "Operators in Python", order: 7, lessons: [] },
    { title: "Python Input & Output", order: 8, lessons: [] },
    { title: "If Statements", order: 9, lessons: [] },
    { title: "Loops in Python", order: 10, lessons: [] },
    { title: "Lists in Python", order: 11, lessons: [] },
    { title: "Strings in Python", order: 12, lessons: [] },
    { title: "Tuples in Python", order: 13, lessons: [] },
    { title: "Sets in Python", order: 14, lessons: [] },
    { title: "Dictionaries in Python", order: 15, lessons: [] },
    { title: "Functions in Python", order: 16, lessons: [] },
    { title: "Classes & Objects", order: 17, lessons: [] },
    { title: "Inheritance", order: 18, lessons: [] },
    { title: "Polymorphism", order: 19, lessons: [] },
    { title: "Encapsulation", order: 20, lessons: [] },
    { title: "Abstraction", order: 21, lessons: [] },
    { title: "Modules & Packages", order: 22, lessons: [] },
    { title: "File Handling", order: 23, lessons: [] },
    { title: "Exception Handling", order: 24, lessons: [] }
  ]
};

async function seedPython() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');
    
    const material = await StudyMaterial.create(pythonMaterial);
    console.log(`Created Python material with ${material.chapters.length} chapters`);
    console.log('Material ID:', material._id);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedPython();
