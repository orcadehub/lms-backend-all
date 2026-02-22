const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

const javaMaterial = {
  title: "Java Programming",
  description: "Complete Java programming course from basics to advanced",
  category: "Programming",
  difficultyLevel: "Beginner",
  estimatedDuration: "45 hours",
  chapters: [
    { title: "Introduction to Java", order: 1, lessons: [] },
    { title: "Java Installation & Setup", order: 2, lessons: [] },
    { title: "Java Syntax", order: 3, lessons: [] },
    { title: "Comments in Java", order: 4, lessons: [] },
    { title: "Variables in Java", order: 5, lessons: [] },
    { title: "Data Types in Java", order: 6, lessons: [] },
    { title: "Type Casting", order: 7, lessons: [] },
    { title: "Operators in Java", order: 8, lessons: [] },
    { title: "Java Input & Output", order: 9, lessons: [] },
    { title: "If Statements", order: 10, lessons: [] },
    { title: "Loops in Java", order: 11, lessons: [] },
    { title: "Break, Continue & Return", order: 12, lessons: [] },
    { title: "Arrays in Java", order: 13, lessons: [] },
    { title: "Strings in Java", order: 14, lessons: [] },
    { title: "Bit Manipulations", order: 15, lessons: [] },
    { title: "Access Modifiers", order: 16, lessons: [] },
    { title: "Classes & Objects", order: 17, lessons: [] },
    { title: "Methods in Java", order: 18, lessons: [] },
    { title: "Inheritance", order: 19, lessons: [] },
    { title: "Polymorphism", order: 20, lessons: [] },
    { title: "Encapsulation", order: 21, lessons: [] },
    { title: "Abstraction", order: 22, lessons: [] },
    { title: "Interfaces", order: 23, lessons: [] },
    { title: "Exception Handling", order: 24, lessons: [] },
    { title: "File Handling", order: 25, lessons: [] },
    { title: "Collection FrameWork", order: 26, lessons: [] },
    { title: "Multi Threading", order: 27, lessons: [] }
  ]
};

async function seedJava() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');
    
    const material = await StudyMaterial.create(javaMaterial);
    console.log(`Created Java material with ${material.chapters.length} chapters`);
    console.log('Material ID:', material._id);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedJava();
