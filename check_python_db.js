const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

async function checkDB() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
  const material = await StudyMaterial.findOne({ title: "Python Programming" });
  if (material) {
    console.log("Material Title:", material.title);
    console.log("Number of Chapters:", material.chapters.length);
    if (material.chapters.length > 0) {
      console.log("Chapter 1 Title:", material.chapters[0].title);
      console.log("Number of Lessons in Chapter 1:", material.chapters[0].lessons.length);
      if (material.chapters[0].lessons.length > 0) {
        console.log("Lesson 1 Title:", material.chapters[0].lessons[0].title);
        console.log("Lesson 1 Content Length:", material.chapters[0].lessons[0].content.length);
        console.log("Lesson 1 Content Preview:", material.chapters[0].lessons[0].content.substring(0, 100));
      }
    }
  } else {
    console.log("Python Programming material NOT FOUND!");
  }
  process.exit(0);
}
checkDB();
