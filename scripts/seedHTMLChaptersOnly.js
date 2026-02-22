const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

const htmlMaterial = {
  title: "HTML",
  description: "Complete HTML course from basics to advanced",
  category: "Web Development",
  difficultyLevel: "Beginner",
  estimatedDuration: "15 hours",
  chapters: [
    { title: "Introduction to HTML", order: 1, lessons: [] },
    { title: "Syntax of HTML", order: 2, lessons: [] },
    { title: "Tags", order: 3, lessons: [] },
    { title: "Links", order: 4, lessons: [] },
    { title: "Media", order: 5, lessons: [] },
    { title: "Lists", order: 6, lessons: [] },
    { title: "Tables", order: 7, lessons: [] },
    { title: "Forms", order: 8, lessons: [] },
    { title: "Semantic HTML", order: 9, lessons: [] },
    { title: "I-Frames", order: 10, lessons: [] }
  ]
};

async function seedHTML() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');
    
    const material = await StudyMaterial.create(htmlMaterial);
    console.log(`Created HTML material with ${material.chapters.length} chapters`);
    console.log('Material ID:', material._id);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedHTML();
