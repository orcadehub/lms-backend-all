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
      },
      // --- PRODUCTS QUESTIONS ---
      {
        title: "List All Products",
        problemStatement: "Retrieve the name and price of all products.",
        tableName: "products",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Name and price", expectedQuery: "SELECT name, price FROM products;" }],
        difficulty: "easy",
        tags: ["Basic"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Active Electronics",
        problemStatement: "Find all 'Electronics' products that are currently active (is_active is true).",
        tableName: "products",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Active electronics", expectedQuery: "SELECT * FROM products WHERE category = 'Electronics' AND is_active = true;" }],
        difficulty: "easy",
        tags: ["Filtering"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Expensive Items",
        problemStatement: "Retrieve products with a price greater than 100.",
        tableName: "products",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Price > 100", expectedQuery: "SELECT * FROM products WHERE price > 100;" }],
        difficulty: "easy",
        tags: ["Filtering"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Total Inventory Value",
        problemStatement: "Calculate the total value of stock (price * stock) for each category.",
        tableName: "products",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Inventory value", expectedQuery: "SELECT category, SUM(price * stock) FROM products GROUP BY category;" }],
        difficulty: "medium",
        tags: ["Aggregation", "Grouping"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Stock Warnings",
        problemStatement: "Find the names of all products that have less than 50 items in stock.",
        tableName: "products",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Low stock", expectedQuery: "SELECT name FROM products WHERE stock < 50;" }],
        difficulty: "medium",
        tags: ["Filtering"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Top Rated per Category",
        problemStatement: "Find the maximum rating for products in each category.",
        tableName: "products",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Max rating", expectedQuery: "SELECT category, MAX(rating) FROM products GROUP BY category;" }],
        difficulty: "medium",
        tags: ["Grouping", "Aggregation"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Average Furniture Price",
        problemStatement: "Calculate the average price of all 'Furniture' products.",
        tableName: "products",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Avg price", expectedQuery: "SELECT AVG(price) FROM products WHERE category = 'Furniture';" }],
        difficulty: "hard",
        tags: ["Aggregation"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Products Above Average",
        problemStatement: "Retrieve the names of products whose price is strictly greater than the overall average price of all products.",
        tableName: "products",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Above avg", expectedQuery: "SELECT name FROM products WHERE price > (SELECT AVG(price) FROM products);" }],
        difficulty: "hard",
        tags: ["Subqueries"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Top 3 Expensive Products",
        problemStatement: "Retrieve the 3 most expensive products, sorted by price in descending order. Use LIMIT.",
        tableName: "products",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Top 3 price", expectedQuery: "SELECT * FROM products ORDER BY price DESC LIMIT 3;" }],
        difficulty: "hard",
        tags: ["Ordering", "Limits"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Category Value Breakdown",
        problemStatement: "List categories that have a total stock sum of over 100 items.",
        tableName: "products",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Having clause sum", expectedQuery: "SELECT category FROM products GROUP BY category HAVING SUM(stock) > 100;" }],
        difficulty: "hard",
        tags: ["Having Clause"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      
      // --- EMPLOYEES QUESTIONS ---
      {
        title: "List All Employees",
        problemStatement: "Retrieve all details of every employee.",
        tableName: "employees",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Select all", expectedQuery: "SELECT * FROM employees;" }],
        difficulty: "easy",
        tags: ["Basic"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Sales Team",
        problemStatement: "Retrieve the first name and last name of all employees in the 'Sales' department.",
        tableName: "employees",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Sales department", expectedQuery: "SELECT first_name, last_name FROM employees WHERE department = 'Sales';" }],
        difficulty: "easy",
        tags: ["Filtering"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Find The Managers",
        problemStatement: "Find all employees who are a manager (is_manager is true).",
        tableName: "employees",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Managers", expectedQuery: "SELECT * FROM employees WHERE is_manager = true;" }],
        difficulty: "easy",
        tags: ["Filtering"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Department Payroll",
        problemStatement: "Calculate the total salary expense for each department.",
        tableName: "employees",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Sum of salary", expectedQuery: "SELECT department, SUM(salary) FROM employees GROUP BY department;" }],
        difficulty: "medium",
        tags: ["Aggregation", "Grouping"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Senior Employees",
        problemStatement: "Find all employees hired before the year 2012.",
        tableName: "employees",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Hired before 2012", expectedQuery: "SELECT * FROM employees WHERE hire_year < 2012;" }],
        difficulty: "medium",
        tags: ["Filtering"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Highest Earner",
        problemStatement: "Find the highest salary among all employees.",
        tableName: "employees",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Max salary", expectedQuery: "SELECT MAX(salary) FROM employees;" }],
        difficulty: "medium",
        tags: ["Aggregation"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Counting Employees",
        problemStatement: "Count the total number of employees in the 'Accounting' department.",
        tableName: "employees",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Accounting count", expectedQuery: "SELECT COUNT(*) FROM employees WHERE department = 'Accounting';" }],
        difficulty: "hard",
        tags: ["Aggregation"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "High Paying Departments",
        problemStatement: "Find departments where the average salary is greater than 50000.",
        tableName: "employees",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Having clause salary", expectedQuery: "SELECT department FROM employees GROUP BY department HAVING AVG(salary) > 50000;" }],
        difficulty: "hard",
        tags: ["Having Clause"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Above Department Average",
        problemStatement: "Retrieve the first names of employees whose salary is over 60000.",
        // Keeping it simpler than a correlated subquery for now unless required.
        tableName: "employees",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "High salary names", expectedQuery: "SELECT first_name FROM employees WHERE salary > 60000;" }],
        difficulty: "hard",
        tags: ["Filtering"],
        tenant: new mongoose.Types.ObjectId(TENANT_ID),
        createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
      },
      {
        title: "Management Hierarchy",
        problemStatement: "Retrieve all manager names sorted by their hire year (oldest first).",
        tableName: "employees",
        starterCode: "/* Write your query here */",
        testCases: [{ description: "Ordered managers", expectedQuery: "SELECT first_name, last_name FROM employees WHERE is_manager = true ORDER BY hire_year ASC;" }],
        difficulty: "hard",
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
