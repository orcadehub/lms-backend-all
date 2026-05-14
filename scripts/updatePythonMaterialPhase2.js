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
  .tip-box i { color: #2196F3; margin-right: 10px; }
  .example-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
  @media (max-width: 600px) { .example-grid { grid-template-columns: 1fr; } }
  .highlight { color: #d73a49; font-weight: bold; }
</style>
`;

const phase2Content = [
  {
    chapterTitle: "Type Casting",
    lessons: [
      {
        title: "Implicit vs Explicit Casting",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">What is Type Casting?</h3>
            <p>Casting is when you convert a variable from one data type to another. In Python, there are two types:</p>
            <div class="example-grid">
              <div class="concept-card">
                <h5>1. Implicit (Automatic)</h5>
                <p>Python automatically converts one type to another without your help.</p>
                <div class="code-block">
                  <span class="code-label">python</span>
                  <code>x = 10&nbsp;&nbsp;&nbsp;&nbsp;# int<br>y = 2.5&nbsp;&nbsp;&nbsp;# float<br>z = x + y&nbsp;# z becomes float!</code>
                </div>
              </div>
              <div class="concept-card">
                <h5>2. Explicit (Manual)</h5>
                <p>You use pre-defined functions like <code>int()</code>, <code>float()</code>, or <code>str()</code>.</p>
                <div class="code-block">
                  <span class="code-label">python</span>
                  <code>x = int("10") # string to int</code>
                </div>
              </div>
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Operators in Python",
    lessons: [
      {
        title: "Arithmetic & Logic",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Beyond Basic Math</h3>
            <p>Python includes some special operators you should know:</p>
            <div class="concept-card">
              <ul>
                <li><strong>Modulus (<code>%</code>):</strong> Returns the remainder. <code>10 % 3 = 1</code></li>
                <li><strong>Floor Division (<code>//</code>):</strong> Returns the whole number. <code>10 // 3 = 3</code></li>
                <li><strong>Exponentiation (<code>**</code>):</strong> Power. <code>2 ** 3 = 8</code></li>
              </ul>
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Python Input & Output",
    lessons: [
      {
        title: "The input() Function",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Talking to Your Program</h3>
            <p>The <code>input()</code> function allows you to get data from the user. <strong>Note:</strong> It always returns a string!</p>
            <div class="code-block">
              <span class="code-label">python</span>
              <code>name = input("Enter your name: ")<br>print("Hi " + name)</code>
            </div>
            <div class="tip-box">
              <strong>💡 Pro Tip:</strong> If you need a number from the user, you MUST cast it: <code>age = int(input("Age: "))</code>
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "If Statements",
    lessons: [
      {
        title: "Decision Making",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Conditional Logic</h3>
            <p>Use <code>if</code>, <code>elif</code> (else if), and <code>else</code> to control the flow of your code based on conditions.</p>
            <div class="code-block">
              <span class="code-label">python</span>
              <code>age = 18<br>if age >= 18:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Eligible to vote")<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Too young!")</code>
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Loops in Python",
    lessons: [
      {
        title: "For & While Loops",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Repeating Tasks</h3>
            <div class="example-grid">
              <div class="concept-card">
                <h5>🔄 For Loop</h5>
                <p>Used for iterating over a sequence (list, string, range).</p>
                <div class="code-block">
                  <code>for i in range(3):<br>&nbsp;&nbsp;&nbsp;&nbsp;print(i) # 0, 1, 2</code>
                </div>
              </div>
              <div class="concept-card">
                <h5>♻️ While Loop</h5>
                <p>Repeats as long as a condition is true.</p>
                <div class="code-block">
                  <code>while x < 5:<br>&nbsp;&nbsp;&nbsp;&nbsp;x += 1</code>
                </div>
              </div>
            </div>
          </div>
        `
      }
    ]
  }
];

async function updatePythonMaterialPhase2() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');

    const material = await StudyMaterial.findOne({ title: "Python Programming" });
    if (!material) {
      console.error('Material not found!');
      process.exit(1);
    }

    for (const phaseContent of phase2Content) {
      const chapter = material.chapters.find(c => c.title === phaseContent.chapterTitle);
      if (chapter) {
        console.log(`Updating chapter: ${chapter.title}`);
        chapter.lessons = phaseContent.lessons;
      } else {
        console.warn(`Chapter not found: ${phaseContent.chapterTitle}`);
      }
    }

    await material.save();
    console.log('Successfully updated Chapters 6-10 with rich content!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating material:', error);
    process.exit(1);
  }
}

updatePythonMaterialPhase2();
