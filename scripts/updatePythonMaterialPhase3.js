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

const phase3Content = [
  {
    chapterTitle: "Lists in Python",
    lessons: [
      {
        title: "Mastering Lists",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">What is a List?</h3>
            <p>Lists are used to store multiple items in a single variable. They are ordered, changeable, and allow duplicate values.</p>
            <div class="code-block">
              <code>fruits = ["apple", "banana", "cherry"]<br>fruits[1] = "mango" # Changeable!<br>print(fruits)</code>
            </div>
            <div class="tip-box">
              <strong>💡 List Methods:</strong> Use <code>.append()</code> to add items and <code>.remove()</code> to delete them.
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Strings in Python",
    lessons: [
      {
        title: "String Manipulation",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">The Power of Strings</h3>
            <p>Strings are actually arrays of bytes representing unicode characters.</p>
            <div class="concept-card">
              <h5>Common Operations:</h5>
              <ul>
                <li><strong>Slicing:</strong> <code>name[0:5]</code> gets the first 5 characters.</li>
                <li><strong>Upper/Lower:</strong> <code>text.upper()</code></li>
                <li><strong>Length:</strong> <code>len(text)</code></li>
              </ul>
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Tuples in Python",
    lessons: [
      {
        title: "Immutable Collections",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Why use Tuples?</h3>
            <p>Unlike lists, Tuples are <span class="highlight">Immutable</span> (cannot be changed). They are faster and safer for data that shouldn't change.</p>
            <div class="code-block">
              <code>mytuple = ("apple", "banana")<br># mytuple[0] = "kiwi"  -> This will error!</code>
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Sets in Python",
    lessons: [
      {
        title: "Unique Elements",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Sets & Uniqueness</h3>
            <p>Sets are unordered and do NOT allow duplicate items.</p>
            <div class="code-block">
              <code>myset = {"a", "b", "a"}<br>print(myset) # Results in {"a", "b"}</code>
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "Dictionaries in Python",
    lessons: [
      {
        title: "Key-Value Pairs",
        order: 1,
        content: `
          ${LESSON_CSS}
          <div class="lesson-body">
            <h3 class="section-title">Mapping Data</h3>
            <p>Dictionaries store data as <code>key:value</code> pairs. Think of it like a real dictionary where words are keys and definitions are values.</p>
            <div class="code-block">
              <code>car = {"brand": "Tesla", "year": 2023}<br>print(car["brand"])</code>
            </div>
          </div>
        `
      }
    ]
  }
];

async function updatePythonMaterialPhase3() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');

    const material = await StudyMaterial.findOne({ title: "Python Programming" });
    if (!material) {
      console.error('Material not found!');
      process.exit(1);
    }

    for (const phaseContent of phase3Content) {
      const chapter = material.chapters.find(c => c.title === phaseContent.chapterTitle);
      if (chapter) {
        console.log(`Updating chapter: ${chapter.title}`);
        chapter.lessons = phaseContent.lessons;
      } else {
        console.warn(`Chapter not found: ${phaseContent.chapterTitle}`);
      }
    }

    await material.save();
    console.log('Successfully updated Chapters 11-15 (Collections)!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating material:', error);
    process.exit(1);
  }
}

updatePythonMaterialPhase3();
