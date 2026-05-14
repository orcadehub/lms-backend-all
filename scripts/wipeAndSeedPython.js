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
</style>
`;

const pythonChapters = [
  {
    title: "Introduction to Python",
    order: 1,
    lessons: [
      {
        title: "The Python Phenomenon",
        order: 1,
        content: `${LESSON_CSS}<div class="lesson-body"><div class="lesson-header"><h2>Welcome to Python</h2></div><p>Python is a versatile, high-level language that powers everything from massive web platforms like Instagram to complex scientific research at NASA.</p><div class="concept-card"><h3>Why Python?</h3><ul><li><b>Readability:</b> Designed to be easy to write and even easier to read.</li><li><b>Batteries Included:</b> Massive standard library for every task.</li></ul></div></div>`
      }
    ]
  },
  {
    title: "Python Installation & Setup",
    order: 2,
    lessons: [{ title: "Lab Environment", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Setting up your machine</h3><div class="tip-box">Always check <b>"Add to PATH"</b> during installation!</div></div>` }]
  },
  {
    title: "Python Syntax",
    order: 3,
    lessons: [{ title: "Indentation Rules", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3 class="section-title">The Power of Whitespace</h3><p>Python uses indentation to define code blocks. Consistency is king!</p></div>` }]
  },
  {
    title: "Variables in Python",
    order: 4,
    lessons: [{ title: "Dynamic Memory", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3 class="section-title">Implicit Assignments</h3><p>Python variables don't need explicit declarations. They are created the moment you assign a value.</p></div>` }]
  },
  {
    title: "Data Types in Python",
    order: 5,
    lessons: [{ title: "Fundamental Types", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3 class="section-title">Integers, Floats, and Strings</h3><p>Every piece of data in Python has a specific type that defines what you can do with it.</p></div>` }]
  },
  {
    title: "Type Casting",
    order: 6,
    lessons: [{ title: "Converting Data", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Explicitly changing types using built-in functions.</h3></div>` }]
  },
  {
    title: "Operators in Python",
    order: 7,
    lessons: [{ title: "The Toolkit", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Arithmetic, Comparison, and Logic Operators.</h3></div>` }]
  },
  {
    title: "Python Input & Output",
    order: 8,
    lessons: [{ title: "Interacting with Users", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Mastering the input() and print() functions.</h3></div>` }]
  },
  {
    title: "If Statements",
    order: 9,
    lessons: [{ title: "Conditional Flows", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Building logic with if, elif, and else.</h3></div>` }]
  },
  {
    title: "Loops in Python",
    order: 10,
    lessons: [{ title: "Iteration", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Automating tasks with for-loops and while-loops.</h3></div>` }]
  },
  {
    title: "Lists in Python",
    order: 11,
    lessons: [{ title: "Dynamic Arrays", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Working with ordered, mutable collections.</h3></div>` }]
  },
  {
    title: "Strings in Python",
    order: 12,
    lessons: [{ title: "Advanced Text Ops", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Slicing, formatting, and string methods.</h3></div>` }]
  },
  {
    title: "Tuples in Python",
    order: 13,
    lessons: [{ title: "Guardians of Data", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>When to use immutable Tuple collections.</h3></div>` }]
  },
  {
    title: "Sets in Python",
    order: 14,
    lessons: [{ title: "Mathematical Collections", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Working with unique, unordered elements.</h3></div>` }]
  },
  {
    title: "Dictionaries in Python",
    order: 15,
    lessons: [{ title: "The Hash Map", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Efficient data lookup with Key-Value pairs.</h3></div>` }]
  },
  {
    title: "Functions in Python",
    order: 16,
    lessons: [{ title: "Architecting Code", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Defining reusable blocks and parameters.</h3></div>` }]
  },
  {
    title: "Classes & Objects",
    order: 17,
    lessons: [{ title: "OOP Architecture", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Understanding Classes, Objects, and __init__.</h3></div>` }]
  },
  {
    title: "Inheritance",
    order: 18,
    lessons: [{ title: "Class Hierarchies", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Extending functionality across classes.</h3></div>` }]
  },
  {
    title: "Polymorphism",
    order: 19,
    lessons: [{ title: "Dynamic Overriding", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Multiple forms of methods across classes.</h3></div>` }]
  },
  {
    title: "Encapsulation",
    order: 20,
    lessons: [{ title: "Security & Purity", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Data hiding and internal class protection.</h3></div>` }]
  },
  {
    title: "Abstraction",
    order: 21,
    lessons: [{ title: "Design Blueprints", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Implementing interface-like logic with ABCs.</h3></div>` }]
  },
  {
    title: "Modules & Packages",
    order: 22,
    lessons: [{ title: "System Growth", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Managing imports and large scale code bases.</h3></div>` }]
  },
  {
    title: "File Handling",
    order: 23,
    lessons: [{ title: "Persistence", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Reading and Writing to local storage.</h3></div>` }]
  },
  {
    title: "Exception Handling",
    order: 24,
    lessons: [{ title: "Robustness", order: 1, content: `${LESSON_CSS}<div class="lesson-body"><h3>Mastering Try-Except for crash-proof code.</h3></div>` }]
  }
];

async function wipeAndSeed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');

    // Wipe ALL study materials
    const deleteResult = await StudyMaterial.deleteMany({});
    console.log(`Successfully wiped ${deleteResult.deletedCount} study material records.`);

    // Seed Python
    const material = new StudyMaterial({
      title: "Python Programming",
      description: "Complete Python track with premium interactive content.",
      category: "Programming",
      estimatedDuration: "40 hours",
      chapters: pythonChapters,
      isActive: true
    });

    await material.save();
    console.log('Python Programming has been seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during wipe and seed:', error);
    process.exit(1);
  }
}

wipeAndSeed();
