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

const phase4Content = [
  {
    chapterTitle: "Functions in Python",
    lessons: [
      {
        title: "Defining & Calling",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Reusable Code</h3>
            <p>A function is a block of code that only runs when it is called. You can pass data, known as parameters, into a function.</p>
            <div class="code-block">
              <code>def my_function(name):<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Hello " + name)<br><br>my_function("Alice")</code>
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Classes & Objects",
    lessons: [
      {
        title: "Intro to OOP",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Classes as Blueprints</h3>
            <p>Python is an object-oriented programming language. Almost everything in Python is an object, with its properties and methods.</p>
            <div class="concept-card">
              <div class="code-block">
                <code>class Person:<br>&nbsp;&nbsp;&nbsp;&nbsp;def __init__(self, name):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.name = name<br><br>p1 = Person("John")</code>
              </div>
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Inheritance",
    lessons: [
      {
        title: "Parent & Child Classes",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Inheriting Features</h3>
            <p>Inheritance allows us to define a class that inherits all the methods and properties from another class.</p>
            <div class="code-block">
              <code>class Student(Person):<br>&nbsp;&nbsp;&nbsp;&nbsp;pass</code>
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Polymorphism",
    lessons: [
      {
        title: "Many Forms",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">One Method, Many Actions</h3>
            <p>Polymorphism allows different classes to have methods with the same name, but different behaviors.</p>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Encapsulation",
    lessons: [
      {
        title: "Data Hiding",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Private Members</h3>
            <p>In Python, we use underscores to suggest that a variable or method should be private.</p>
          </div>
        `
      }
    ]
  }
];

async function updatePythonMaterialPhase4() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');

    const material = await StudyMaterial.findOne({ title: "Python Programming" });
    if (!material) {
      console.error('Material not found!');
      process.exit(1);
    }

    for (const phaseContent of phase4Content) {
      const chapter = material.chapters.find(c => c.title === phaseContent.chapterTitle);
      if (chapter) {
        console.log(`Updating chapter: ${chapter.title}`);
        chapter.lessons = phaseContent.lessons;
      } else {
        console.warn(`Chapter not found: ${phaseContent.chapterTitle}`);
      }
    }

    await material.save();
    console.log('Successfully updated Chapters 16-20 (OOP)!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating material:', error);
    process.exit(1);
  }
}

updatePythonMaterialPhase4();
