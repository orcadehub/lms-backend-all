const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

async function compareChapters() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    
    const python = await StudyMaterial.findOne({ title: 'Python Programming' });
    const java = await StudyMaterial.findOne({ title: 'Java Programming' });
    
    console.log('\n=== PYTHON vs JAVA CHAPTERS COMPARISON ===\n');
    console.log(`Python: ${python?.chapters.length || 0} chapters`);
    console.log(`Java: ${java?.chapters.length || 0} chapters\n`);
    
    const maxChapters = Math.max(python?.chapters.length || 0, java?.chapters.length || 0);
    
    console.log('No. | Python Chapter                    | Java Chapter');
    console.log('----+-----------------------------------+-----------------------------------');
    
    for (let i = 0; i < maxChapters; i++) {
      const pythonChapter = python?.chapters[i]?.title || '-';
      const javaChapter = java?.chapters[i]?.title || '-';
      const num = String(i + 1).padStart(2, ' ');
      const pyCol = pythonChapter.padEnd(33, ' ');
      const javaCol = javaChapter.padEnd(33, ' ');
      console.log(`${num}  | ${pyCol} | ${javaCol}`);
    }
    
    console.log('\n=== SUMMARY ===');
    console.log(`Python: ${python?.chapters.length} chapters, ${python?.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)} lessons`);
    console.log(`Java: ${java?.chapters.length} chapters, ${java?.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)} lessons`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

compareChapters();
