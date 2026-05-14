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
  .image-placeholder { background: #eee; border: 2px dashed #ccc; height: 200px; display: flex; align-items: center; justify-content: center; color: #999; margin: 20px 0; border-radius: 8px; }
</style>
`;

const phase1Content = [
  {
    chapterTitle: "Introduction to Python",
    lessons: [
      {
        title: "What is Python?",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <div class="lesson-header">
              <h2>Exploring the World of Python</h2>
            </div>
            <p>Python is a <strong>high-level, interpreted, general-purpose</strong> programming language. Imagine it as a bridge between human language and machine code—it's designed to be readable, concise, and incredibly powerful.</p>
            
            <h3 class="section-title">Why "Python"?</h3>
            <p>Contrary to popular belief, the name doesn't come from the snake! Creator Guido van Rossum named it after the BBC comedy series <em>"Monty Python's Flying Circus"</em>.</p>

            <div class="concept-card">
              <h4>Key Philosophy: The Zen of Python</h4>
              <ul>
                <li>Beautiful is better than ugly.</li>
                <li>Explicit is better than implicit.</li>
                <li>Simple is better than complex.</li>
                <li>Readability counts.</li>
              </ul>
            </div>

            <div class="tip-box">
              <strong>💡 Pro Tip:</strong> Python is the #1 language for Data Science and Artificial Intelligence today!
            </div>
          </div>
        `
      },
      {
        title: "Industry Usage",
        order: 2,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Where is Python used?</h3>
            <div class="example-grid">
              <div class="concept-card">
                <h5>🌐 Web Development</h5>
                <p>Powering backends for Instagram, Spotify, and Pinterest using frameworks like Django and Flask.</p>
              </div>
              <div class="concept-card">
                <h5>🤖 AI & Machine Learning</h5>
                <p>The industry standard for libraries like TensorFlow, PyTorch, and Scikit-learn.</p>
              </div>
            </div>
            <div class="image-placeholder">
              [Infographic: Python's Ecosystem]
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Python Installation & Setup",
    lessons: [
      {
        title: "Installing Python",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Step-by-Step Installation</h3>
            <ol>
              <li>Go to <a href="https://python.org" target="_blank">python.org</a></li>
              <li>Download the latest version for your OS (Windows, Mac, or Linux).</li>
              <li><strong>Crucial Step:</strong> During installation on Windows, check the box that says <strong>"Add Python to PATH"</strong>.</li>
            </ol>
            <div class="tip-box">
              <strong>⚠️ Warning:</strong> If you forget to "Add to PATH", your terminal won't recognize the <code>python</code> command!
            </div>
          </div>
        `
      },
      {
        title: "Writing Your First Script",
        order: 2,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">The "Hello World" Tradition</h3>
            <p>Open your favorite text editor (we recommend VS Code) and type the following:</p>
            <div class="code-block">
              <span class="code-label">hello.py</span>
              <code>print("Hello, Python World!")</code>
            </div>
            <p>To run it, open your terminal and type:</p>
            <div class="code-block">
              <span class="code-label">terminal</span>
              <code>python hello.py</code>
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Python Syntax",
    lessons: [
      {
        title: "Indentation & Whitespace",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">The Power of the Tab</h3>
            <p>In most languages, curly braces <code>{}</code> define blocks. In Python, we use <span class="highlight">Indentation</span>.</p>
            <div class="concept-card">
              <div class="code-block">
                <span class="code-label">Valid Syntax</span>
                <code>if 5 > 2:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Five is greater than two!")</code>
              </div>
              <div class="code-block" style="border: 2px solid #ff4d4d;">
                <span class="code-label" style="background: #ff4d4d; color: white;">Syntax Error</span>
                <code>if 5 > 2:<br>print("This will crash!")</code>
              </div>
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Variables in Python",
    lessons: [
      {
        title: "Assignment & Dynamic Typing",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Dynamic Typing</h3>
            <p>Python is dynamically typed, meaning you don't need to declare the variable type (like int or string). Python "knows" it automatically.</p>
            <div class="code-block">
              <span class="code-label">python</span>
              <code>x = 5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# x is an integer<br>x = "Hello"&nbsp;&nbsp;&nbsp;# Now x is a string!<br>print(x)</code>
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Data Types in Python",
    lessons: [
      {
        title: "Numbers & Strings",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Interactive Type Explorer</h3>
            <p>Click the buttons below to see how Python identifies different data types!</p>
            
            <div class="concept-card">
              <div id="type-display" class="code-block">
                <span class="code-label">Output</span>
                <code id="output-text">Select a type above...</code>
              </div>
              
              <div class="example-grid" style="grid-template-columns: repeat(3, 1fr);">
                <button onclick="exploreType('5', 'int')" style="padding: 10px; cursor: pointer;">Integer</button>
                <button onclick="exploreType('3.14', 'float')" style="padding: 10px; cursor: pointer;">Float</button>
                <button onclick="exploreType('\'Python\'', 'str')" style="padding: 10px; cursor: pointer;">String</button>
              </div>
            </div>

            <script>
              function exploreType(val, typeName) {
                document.getElementById('output-text').innerHTML = '>>> type(' + val + ')<br>&lt;class \\'' + typeName + '\\'&gt;';
              }
            </script>

            <h3 class="section-title">The Core Types</h3>
            <div class="example-grid">
              <div class="concept-card">
                <h5>🔢 Numbers</h5>
                <ul>
                  <li><strong>int:</strong> 10, -5, 1000</li>
                  <li><strong>float:</strong> 3.14, -0.001</li>
                </ul>
              </div>
              <div class="concept-card">
                <h5>🔤 Strings</h5>
                <p>Enclosed in 'single' or "double" quotes.</p>
              </div>
            </div>
          </div>
        `
      }
    ]
  }
];

async function updatePythonMaterial() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');

    const material = await StudyMaterial.findOne({ title: "Python Programming" });
    if (!material) {
      console.error('Material not found!');
      process.exit(1);
    }

    for (const phaseContent of phase1Content) {
      const chapter = material.chapters.find(c => c.title === phaseContent.chapterTitle);
      if (chapter) {
        console.log(`Updating chapter: ${chapter.title}`);
        chapter.lessons = phaseContent.lessons;
      } else {
        console.warn(`Chapter not found: ${phaseContent.chapterTitle}`);
      }
    }

    await material.save();
    console.log('Successfully updated the first 5 chapters with rich content!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating material:', error);
    process.exit(1);
  }
}

updatePythonMaterial();
