const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const pythonChapters = [
  { title: 'Introduction to Python', order: 1 },
  { title: 'Python Installation & Setup', order: 2 },
  { title: 'Python Syntax', order: 3 },
  { title: 'Comments in Python', order: 4 },
  { title: 'Variables in Python', order: 5 },
  { title: 'Data Types in Python', order: 6 },
  { title: 'Type Casting', order: 7 },
  { title: 'Operators in Python', order: 8 },
  { title: 'Python Input & Output', order: 9 },
  { title: 'If Statements', order: 10 },
  { title: 'Loops in Python', order: 11 },
  { title: 'Break, Continue & Pass', order: 12 },
  { title: 'Strings in Python', order: 13 },
  { title: 'Lists in Python', order: 14 },
  { title: 'Tuples in Python', order: 15 },
  { title: 'Sets in Python', order: 16 },
  { title: 'Dictionaries in Python', order: 17 },
  { title: 'Functions in Python', order: 18 },
  { title: 'Lambda Functions', order: 19 },
  { title: 'Recursion', order: 20 },
  { title: 'Modules in Python', order: 21 },
  { title: 'Packages in Python', order: 22 },
  { title: 'File Handling', order: 23 },
  { title: 'Exception Handling', order: 24 },
  { title: 'Classes & Objects', order: 25 },
  { title: 'Inheritance', order: 26 },
  { title: 'Polymorphism', order: 27 },
  { title: 'Encapsulation', order: 28 },
  { title: 'Abstraction', order: 29 },
  { title: 'Iterators', order: 30 },
  { title: 'Generators', order: 31 },
  { title: 'Decorators', order: 32 },
  { title: 'Python Virtual Environment', order: 33 },
  { title: 'Python Libraries Introduction', order: 34 },
  { title: 'Python Applications', order: 35 }
];

async function addChapters() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    let pythonMaterial = await StudyMaterial.findOne({ title: /Python/i });
    
    if (!pythonMaterial) {
      console.log('Python material not found, creating new one...');
      pythonMaterial = new StudyMaterial({
        title: 'Python Programming',
        description: 'Complete Python programming course from basics to advanced',
        category: 'Programming',
        estimatedDuration: '40 hours',
        chapters: []
      });
    }

    const chaptersWithLessons = pythonChapters.map(chapter => ({
      ...chapter,
      lessons: [{
        title: `${chapter.title} - Overview`,
        order: 1,
        content: `<h2>${chapter.title}</h2><p>Content for ${chapter.title} will be added here.</p>`
      }]
    }));

    pythonMaterial.chapters = chaptersWithLessons;
    await pythonMaterial.save();

    console.log(`Successfully added ${pythonChapters.length} chapters to Python Programming`);
    console.log('Total lessons:', pythonMaterial.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

addChapters();
