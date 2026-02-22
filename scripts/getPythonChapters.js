const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

async function getChapters() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    
    const material = await StudyMaterial.findOne({ title: 'Python Programming' });
    
    if (material) {
      console.log('\n=== PYTHON CHAPTERS & LESSONS ===\n');
      material.chapters.forEach((chapter, i) => {
        console.log(`${i + 1}. ${chapter.title}`);
        chapter.lessons.forEach((lesson, j) => {
          console.log(`   ${i + 1}.${j + 1}. ${lesson.title}`);
        });
        console.log('');
      });
    } else {
      console.log('Python material not found');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

getChapters();
