require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const jsDataQuestions = [
  {
    title: "Display Student Data in Table",
    problemStatement: "Import student data from data.js and display it in an HTML table with proper headers.",
    requirements: [
      "Import students array from data.js",
      "Create table with headers: Name, Age, Grade, Email",
      "Loop through students array and create table rows",
      "Display all student information in table cells"
    ],
    acceptanceCriteria: [
      "Table element exists with id 'studentTable'",
      "Table has thead with 4 headers",
      "Table has tbody with student rows",
      "All student data is displayed correctly"
    ],
    jestTestFile: `describe('Student Table', () => {
  test('table exists', () => {
    expect(document.getElementById('studentTable')).toBeTruthy();
  });
  test('table has headers', () => {
    const headers = document.querySelectorAll('#studentTable thead th');
    expect(headers.length).toBe(4);
  });
  test('table has student rows', () => {
    const rows = document.querySelectorAll('#studentTable tbody tr');
    expect(rows.length).toBeGreaterThan(0);
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: `table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}
th {
  background-color: #1976d2;
  color: white;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}`,
      js: `// Import students from data.js
// Write your JavaScript here`,
      'data.js': `export const students = [
  { name: "John Doe", age: 20, grade: "A", email: "john@example.com" },
  { name: "Jane Smith", age: 22, grade: "B", email: "jane@example.com" },
  { name: "Mike Johnson", age: 21, grade: "A", email: "mike@example.com" },
  { name: "Sarah Williams", age: 23, grade: "B", email: "sarah@example.com" },
  { name: "Tom Brown", age: 20, grade: "C", email: "tom@example.com" }
];`
    },
    allowedFiles: ['html', 'css', 'js'],
    expectedOutput: `<div style="padding:20px;font-family:Arial,sans-serif;"><h1 style="color:#1976d2;margin-bottom:20px;">Student List</h1><table style="width:100%;border-collapse:collapse;"><thead><tr><th style="border:1px solid #ddd;padding:12px;background:#1976d2;color:white;text-align:left;">Name</th><th style="border:1px solid #ddd;padding:12px;background:#1976d2;color:white;text-align:left;">Age</th><th style="border:1px solid #ddd;padding:12px;background:#1976d2;color:white;text-align:left;">Grade</th><th style="border:1px solid #ddd;padding:12px;background:#1976d2;color:white;text-align:left;">Email</th></tr></thead><tbody><tr><td style="border:1px solid #ddd;padding:12px;">John Doe</td><td style="border:1px solid #ddd;padding:12px;">20</td><td style="border:1px solid #ddd;padding:12px;">A</td><td style="border:1px solid #ddd;padding:12px;">john@example.com</td></tr><tr style="background:#f2f2f2;"><td style="border:1px solid #ddd;padding:12px;">Jane Smith</td><td style="border:1px solid #ddd;padding:12px;">22</td><td style="border:1px solid #ddd;padding:12px;">B</td><td style="border:1px solid #ddd;padding:12px;">jane@example.com</td></tr><tr><td style="border:1px solid #ddd;padding:12px;">Mike Johnson</td><td style="border:1px solid #ddd;padding:12px;">21</td><td style="border:1px solid #ddd;padding:12px;">A</td><td style="border:1px solid #ddd;padding:12px;">mike@example.com</td></tr></tbody></table></div>`,
    difficulty: 'medium',
    tags: ['JavaScript', 'DOM', 'Tables', 'Data']
  },
  {
    title: "Filter and Display Student Cards",
    problemStatement: "Import student data from data.js and display students with grade 'A' as styled cards.",
    requirements: [
      "Import students array from data.js",
      "Filter students with grade 'A'",
      "Create a card div for each A-grade student",
      "Display name, age, and email in each card"
    ],
    acceptanceCriteria: [
      "Container div exists with id 'cardContainer'",
      "Only A-grade students are displayed",
      "Each student has a card with class 'student-card'",
      "Cards show name, age, and email"
    ],
    jestTestFile: `describe('Student Cards', () => {
  test('container exists', () => {
    expect(document.getElementById('cardContainer')).toBeTruthy();
  });
  test('cards exist', () => {
    const cards = document.querySelectorAll('.student-card');
    expect(cards.length).toBeGreaterThan(0);
  });
  test('only A-grade students shown', () => {
    const cards = document.querySelectorAll('.student-card');
    cards.forEach(card => {
      expect(card.textContent).toContain('Grade: A');
    });
  });
});`,
    defaultFiles: {
      html: '<!-- Write your HTML code here -->',
      css: `#cardContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}
.student-card {
  background: white;
  border: 2px solid #1976d2;
  border-radius: 8px;
  padding: 20px;
  width: 250px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.student-card h3 {
  color: #1976d2;
  margin-top: 0;
}
.student-card p {
  margin: 8px 0;
  color: #666;
}`,
      js: `// Import students from data.js
// Write your JavaScript here`,
      'data.js': `export const students = [
  { name: "John Doe", age: 20, grade: "A", email: "john@example.com" },
  { name: "Jane Smith", age: 22, grade: "B", email: "jane@example.com" },
  { name: "Mike Johnson", age: 21, grade: "A", email: "mike@example.com" },
  { name: "Sarah Williams", age: 23, grade: "B", email: "sarah@example.com" },
  { name: "Tom Brown", age: 20, grade: "C", email: "tom@example.com" }
];`
    },
    allowedFiles: ['html', 'css', 'js'],
    expectedOutput: `<div style="padding:20px;font-family:Arial,sans-serif;"><h1 style="color:#1976d2;margin-bottom:20px;">Top Students (Grade A)</h1><div style="display:flex;flex-wrap:wrap;gap:20px;"><div style="background:white;border:2px solid #1976d2;border-radius:8px;padding:20px;width:250px;box-shadow:0 2px 4px rgba(0,0,0,0.1);"><h3 style="color:#1976d2;margin-top:0;">John Doe</h3><p style="margin:8px 0;color:#666;">Age: 20</p><p style="margin:8px 0;color:#666;">Grade: A</p><p style="margin:8px 0;color:#666;">Email: john@example.com</p></div><div style="background:white;border:2px solid #1976d2;border-radius:8px;padding:20px;width:250px;box-shadow:0 2px 4px rgba(0,0,0,0.1);"><h3 style="color:#1976d2;margin-top:0;">Mike Johnson</h3><p style="margin:8px 0;color:#666;">Age: 21</p><p style="margin:8px 0;color:#666;">Grade: A</p><p style="margin:8px 0;color:#666;">Email: mike@example.com</p></div></div></div>`,
    difficulty: 'medium',
    tags: ['JavaScript', 'DOM', 'Filter', 'Data']
  }
];

async function seedJSDataQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    for (const question of jsDataQuestions) {
      await FrontendQuestion.create({
        ...question,
        tenant: tenant._id,
        createdBy: instructor._id
      });
      console.log(`Created: ${question.title}`);
    }

    console.log(`\nAll ${jsDataQuestions.length} JavaScript data questions created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedJSDataQuestions();
