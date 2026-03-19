const mongoose = require('mongoose');
require('dotenv').config();

// Use actual schema mapping
const sqlPlaygroundQuestionSchema = new mongoose.Schema({
  title: String,
  problemStatement: String,
  tableName: String,
  starterCode: String,
  testCases: [{
    description: String,
    expectedQuery: String,
    isPublic: { type: Boolean, default: true }
  }],
  difficulty: String,
  tags: [String],
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const SQLPlaygroundQuestion = mongoose.models.SQLPlaygroundQuestion || mongoose.model('SQLPlaygroundQuestion', sqlPlaygroundQuestionSchema);

const TENANT_ID = '697a3d4173c9d3c273aef570';
const INSTRUCTOR_ID = '697a3c92903954e2291a2d89';

async function syncQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing
    const deleteRes = await SQLPlaygroundQuestion.deleteMany({});
    console.log(`Deleted ${deleteRes.deletedCount} existing questions.`);

    const questions = [
      {
        title: "Introduction to Students",
        problemStatement: "Write a query to retrieve all columns for all students in the database.",
        tableName: "students",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "All columns", expectedQuery: "SELECT * FROM students;" }],
        difficulty: "easy",
        tags: ["Basic"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Focusing on Names",
        problemStatement: "Retrieve only the 'first_name' and 'last_name' of all students.",
        tableName: "students",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Names only", expectedQuery: "SELECT first_name, last_name FROM students;" }],
        difficulty: "easy",
        tags: ["Projection"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Filtering by GPA",
        problemStatement: "Find all students who have a GPA higher than 3.5.",
        tableName: "students",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "GPA filter", expectedQuery: "SELECT * FROM students WHERE gpa > 3.5;" }],
        difficulty: "easy",
        tags: ["Filtering"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Major Specifics",
        problemStatement: "Retrieve the first name and email of all students whose major is 'Computer Science'.",
        tableName: "students",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Major filter", expectedQuery: "SELECT first_name, email FROM students WHERE major = 'Computer Science';" }],
        difficulty: "easy",
        tags: ["Filtering"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Geographic Distribution",
        problemStatement: "List all distinct cities where students reside.",
        tableName: "students",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Distinct cities", expectedQuery: "SELECT DISTINCT city FROM students;" }],
        difficulty: "easy",
        tags: ["Aggregation"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Enrollment Trends",
        problemStatement: "Count the total number of students who enrolled in the year 2021.",
        tableName: "students",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Yearly count", expectedQuery: "SELECT COUNT(*) FROM students WHERE enrollment_year = 2021;" }],
        difficulty: "medium",
        tags: ["Aggregation"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "High Achievers",
        problemStatement: "Find the student(s) with the maximum GPA in the entire table. Return all their details.",
        tableName: "students",
        starterCode: "/* Write your query here */", 
        testCases: [{ description: "Max GPA", expectedQuery: "SELECT * FROM students WHERE gpa = (SELECT MAX(gpa) FROM students);" }],
        difficulty: "medium",
        tags: ["Subqueries"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Gender Representative",
        problemStatement: "Write a query to find the number of 'Female' students in each major. Group by 'major'.",
        tableName: "students",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Grouped by major", expectedQuery: "SELECT major, COUNT(*) FROM students WHERE gender = 'Female' GROUP BY major;" }],
        difficulty: "medium",
        tags: ["Grouping"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Age Demographics",
        problemStatement: "Select students who are either younger than 20 or older than 23.",
        tableName: "students",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Age range", expectedQuery: "SELECT * FROM students WHERE age < 20 OR age > 23;" }],
        difficulty: "medium",
        tags: ["Filtering"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Performance by Major",
        problemStatement: "Calculate the average GPA for each major, but only show majors where the average GPA is greater than 3.4.",
        tableName: "students",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Having clause", expectedQuery: "SELECT major, AVG(gpa) FROM students GROUP BY major HAVING AVG(gpa) > 3.4;" }],
        difficulty: "hard",
        tags: ["Having Clause"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Finding Patterns",
        problemStatement: "Find all students whose email addresses end with '@example.com'.",
        tableName: "students",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Pattern match", expectedQuery: "SELECT * FROM students WHERE email LIKE '%@example.com';" }],
        difficulty: "medium",
        tags: ["Pattern Matching"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Sorting Seniority",
        problemStatement: "Retrieve all students sorted by their enrollment year in descending order (newest first), then by their GPA in descending order.",
        tableName: "students",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Multi-sort", expectedQuery: "SELECT * FROM students ORDER BY enrollment_year DESC, gpa DESC;" }],
        difficulty: "medium",
        tags: ["Ordering"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      }
    ];

    const insertRes = await SQLPlaygroundQuestion.insertMany(questions);
    console.log(`Successfully created ${insertRes.length} new SQL questions with HIDDEN answers (starterCode replaced with comment).`);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.connection.close();
  }
}

syncQuestions();
