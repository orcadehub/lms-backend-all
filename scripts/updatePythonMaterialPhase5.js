const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

const LESSON_CSS = `
<style>
  .lesson-body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; }
  .lesson-header { border-bottom: 2px solid #3776ab; margin-bottom: 20px; padding-bottom: 10px; }
  .lesson-header h2 { color: #3776ab; margin: 0; }
  .section-title { color: #2b5b84; margin-top: 25px; border-left: 4px solid #ffd343; padding-left: 15px; }
  .concept-card { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #e9ecef; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
  .code-block { background: #282c34; border-radius: 6px; padding: 15px; margin: 15px 0; position: relative; overflow-x: auto; }
  .code-block code { color: #abb2bf; font-family: 'Consolas', 'Monaco', monospace; font-size: 14px; }
  .code-label { position: absolute; top: 0; right: 0; background: #ffd343; color: #2b5b84; padding: 2px 8px; font-size: 12px; font-weight: bold; border-bottom-left-radius: 6px; border-top-right-radius: 6px; }
  .tip-box { background: #e7f3fe; border-left: 6px solid #2196F3; padding: 15px; margin: 20px 0; border-radius: 4px; }
  .highlight { color: #d73a49; font-weight: bold; }
</style>
`;

const phase5Content = [
  {
    chapterTitle: "Abstraction",
    lessons: [
      {
        title: "ABC in Python",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Hiding Complexity</h3>
            <p>Abstraction is used to hide inner details and show only functionality. We use <code>abc</code> module for this.</p>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Modules & Packages",
    lessons: [
      {
        title: "Organizing Code",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Importing Power</h3>
            <p>Modules are files containing Python code that can be imported into other files.</p>
            <div class="code-block">
              <code>import math<br>print(math.sqrt(16))</code>
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "File Handling",
    lessons: [
      {
        title: "Read & Write",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Working with Local Data</h3>
            <p>Use <code>open()</code> to interact with files on your computer.</p>
            <div class="code-block">
              <code>f = open("test.txt", "r")<br>print(f.read())<br>f.close()</code>
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Exception Handling",
    lessons: [
      {
        title: "Try-Except Blocks",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Handling Errors Gracefully</h3>
            <p>Don't let your code crash! Use <code>try</code> and <code>except</code> to handle potential errors.</p>
            <div class="code-block">
              <code>try:<br>&nbsp;&nbsp;&nbsp;&nbsp;print(10 / 0)<br>except ZeroDivisionError:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Cannot divide by zero!")</code>
            </div>
          </div>
        `
      }
    ]
  }
];

async function updatePythonMaterialPhase5() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');

    const material = await StudyMaterial.findOne({ title: "Python Programming" });
    if (!material) {
      console.error('Material not found!');
      process.exit(1);
    }

    for (const phaseContent of phase5Content) {
      const chapter = material.chapters.find(c => c.title === phaseContent.chapterTitle);
      if (chapter) {
        console.log(`Updating chapter: ${chapter.title}`);
        chapter.lessons = phaseContent.lessons;
      } else {
        console.warn(`Chapter not found: ${phaseContent.chapterTitle}`);
      }
    }

    await material.save();
    console.log('Successfully updated the final Chapters 21-24!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating material:', error);
    process.exit(1);
  }
}

updatePythonMaterialPhase5();
