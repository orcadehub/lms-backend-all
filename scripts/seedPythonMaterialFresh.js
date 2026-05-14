const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

const LESSON_CSS = `
<style>
  .lesson-body { font-family: 'Inter', system-ui, -apple-system, sans-serif; line-height: 1.7; color: #334155; max-width: 900px; margin: 0 auto; padding: 15px; }
  .lesson-header { border-bottom: 3px solid #6366f1; margin-bottom: 30px; padding-bottom: 15px; }
  .lesson-header h2 { color: #1e293b; margin: 0; font-size: 2.2rem; font-weight: 800; }
  .section-title { color: #4338ca; margin-top: 35px; margin-bottom: 15px; font-size: 1.5rem; font-weight: 700; border-left: 5px solid #fbbf24; padding-left: 15px; }
  .concept-card { background: #ffffff; border-radius: 12px; padding: 25px; margin: 25px 0; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
  .code-block { background: #1e293b; border-radius: 10px; padding: 20px; margin: 20px 0; position: relative; overflow-x: auto; }
  .code-block code { color: #e2e8f0; font-family: 'JetBrains Mono', monospace; font-size: 14px; }
  .code-label { position: absolute; top: 0; right: 0; background: #fbbf24; color: #4338ca; padding: 4px 12px; font-size: 12px; font-weight: 800; border-bottom-left-radius: 10px; border-top-right-radius: 10px; }
  .tip-box { background: #f0f9ff; border-left: 6px solid #0ea5e9; padding: 20px; margin: 25px 0; border-radius: 8px; }
  .highlight { color: #6366f1; font-weight: 700; background: #f5f3ff; padding: 2px 6px; border-radius: 4px; }
  .interactive-btn { background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; }
</style>
`;

const pythonChapters = [
  {
    title: "Introduction to Python",
    order: 1,
    lessons: [
      {
        title: "What is Python?",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <div class="lesson-header"><h2>Exploring Python</h2></div>
            <p>Python is a <span class="highlight">high-level</span> language famous for being powerful yet simple.</p>
            <div class="concept-card">
              <h3>Key Features:</h3>
              <ul>
                <li>Readable Syntax</li>
                <li>Dynamic Typing</li>
                <li>Versatile (AI, Web, Data Science)</li>
              </ul>
            </div>
          </div>
        `
      }
    ]
  },
  {
    title: "Python Installation & Setup",
    order: 2,
    lessons: [{ title: "Lab Setup", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>How to install Python and VS Code</h3></div>` }]
  },
  {
    title: "Python Syntax",
    order: 3,
    lessons: [{ title: "Indentation", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Indentation rules in Python</h3></div>` }]
  },
  {
    title: "Variables in Python",
    order: 4,
    lessons: [{ title: "Assignments", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Naming and assigning variables</h3></div>` }]
  },
  {
    title: "Data Types in Python",
    order: 5,
    lessons: [{ title: "Core Types", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Int, Float, String, and Boolean</h3></div>` }]
  },
  {
    title: "Type Casting",
    order: 6,
    lessons: [{ title: "Casting", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Converting between types</h3></div>` }]
  },
  {
    title: "Operators in Python",
    order: 7,
    lessons: [{ title: "Operators", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Arithmetic, Comparison, and Logic</h3></div>` }]
  },
  {
    title: "Python Input & Output",
    order: 8,
    lessons: [{ title: "I/O", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>input() and print()</h3></div>` }]
  },
  {
    title: "If Statements",
    order: 9,
    lessons: [{ title: "Decisions", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Conditional branching</h3></div>` }]
  },
  {
    title: "Loops in Python",
    order: 10,
    lessons: [{ title: "Loops", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>For and While loops</h3></div>` }]
  },
  {
    title: "Lists in Python",
    order: 11,
    lessons: [{ title: "Lists", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Everything about Lists</h3></div>` }]
  },
  {
    title: "Strings in Python",
    order: 12,
    lessons: [{ title: "Strings", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Advanced string processing</h3></div>` }]
  },
  {
    title: "Tuples in Python",
    order: 13,
    lessons: [{ title: "Tuples", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Immutable collections</h3></div>` }]
  },
  {
    title: "Sets in Python",
    order: 14,
    lessons: [{ title: "Sets", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Unique data storage</h3></div>` }]
  },
  {
    title: "Dictionaries in Python",
    order: 15,
    lessons: [{ title: "Dictionaries", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Key-Value mapping</h3></div>` }]
  },
  {
    title: "Functions in Python",
    order: 16,
    lessons: [{ title: "Functions", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Reusable code blocks</h3></div>` }]
  },
  {
    title: "Classes & Objects",
    order: 17,
    lessons: [{ title: "OOP Basics", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Blueprints and Instances</h3></div>` }]
  },
  {
    title: "Inheritance",
    order: 18,
    lessons: [{ title: "Inheritance", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Class Hierarchies</h3></div>` }]
  },
  {
    title: "Polymorphism",
    order: 19,
    lessons: [{ title: "Polymorphism", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Multi-form methods</h3></div>` }]
  },
  {
    title: "Encapsulation",
    order: 20,
    lessons: [{ title: "Encapsulation", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Private & Protected members</h3></div>` }]
  },
  {
    title: "Abstraction",
    order: 21,
    lessons: [{ title: "Abstraction", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Hiding implementation details</h3></div>` }]
  },
  {
    title: "Modules & Packages",
    order: 22,
    lessons: [{ title: "Modules", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Imports and packages</h3></div>` }]
  },
  {
    title: "File Handling",
    order: 23,
    lessons: [{ title: "File I/O", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Reading and writing files</h3></div>` }]
  },
  {
    title: "Exception Handling",
    order: 24,
    lessons: [{ title: "Error Handling", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Try-Except blocks</h3></div>` }]
  }
];

async function seedPythonFresh() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');

    await StudyMaterial.deleteMany({ title: "Python Programming" });
    console.log('Cleaned up existing Python materials');

    const material = new StudyMaterial({
      title: "Python Programming",
      description: "Complete Python programming course with premium interactive content.",
      category: "Programming",
      estimatedDuration: "40 hours",
      chapters: pythonChapters,
      isActive: true
    });

    await material.save();
    console.log('Successfully seeded Python material from scratch!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedPythonFresh();
