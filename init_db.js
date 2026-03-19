const { Pool } = require("pg");
const pool = new Pool({
  connectionString: "postgresql://postgres:postgres@localhost:5432/sql_playground"
});

async function init() {
  try {
    // Drop tables if they exist
    await pool.query("DROP TABLE IF EXISTS students");
    await pool.query("DROP TABLE IF EXISTS products");
    await pool.query("DROP TABLE IF EXISTS employees");

    // Create students table
    await pool.query(`
      CREATE TABLE students (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(100),
        gpa DECIMAL(3,2),
        major VARCHAR(50),
        gender VARCHAR(20),
        age INT,
        city VARCHAR(50),
        enrollment_year INT
      )
    `);

    // Create products table
    await pool.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        category VARCHAR(50),
        price DECIMAL(10,2),
        stock INT,
        rating DECIMAL(3,2),
        is_active BOOLEAN
      )
    `);

    // Create employees table
    await pool.query(`
      CREATE TABLE employees (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        department VARCHAR(50),
        salary DECIMAL(10,2),
        hire_year INT,
        is_manager BOOLEAN
      )
    `);

    // Insert student data
    await pool.query(`
      INSERT INTO students (first_name, last_name, email, gpa, major, gender, age, city, enrollment_year) VALUES
      ('John', 'Doe', 'john@example.com', 3.8, 'Computer Science', 'Male', 20, 'New York', 2021),
      ('Jane', 'Smith', 'jane@example.com', 3.6, 'Electrical Engineering', 'Female', 22, 'Los Angeles', 2020),
      ('Alice', 'Johnson', 'alice@school.edu', 3.9, 'Computer Science', 'Female', 19, 'Chicago', 2022),
      ('Bob', 'Brown', 'bob@example.com', 3.2, 'Mathematics', 'Male', 21, 'Houston', 2021),
      ('Charlie', 'Davis', 'charlie@test.org', 3.5, 'Physics', 'Male', 24, 'Phoenix', 2019),
      ('Diana', 'Miller', 'diana@example.com', 3.4, 'Computer Science', 'Female', 21, 'New York', 2021)
    `);

    // Insert product data
    await pool.query(`
      INSERT INTO products (name, category, price, stock, rating, is_active) VALUES
      ('Laptop Pro', 'Electronics', 1299.99, 50, 4.8, true),
      ('Wireless Mouse', 'Electronics', 49.99, 150, 4.5, true),
      ('Desk Chair', 'Furniture', 199.50, 30, 4.2, true),
      ('Coffee Mug', 'Kitchen', 15.00, 200, 4.9, true),
      ('Mechanical Keyboard', 'Electronics', 120.00, 75, 4.7, true),
      ('Standing Desk', 'Furniture', 499.00, 10, 4.4, false),
      ('Monitor Stand', 'Accessories', 35.50, 80, 4.1, true)
    `);

    // Insert employee data
    await pool.query(`
      INSERT INTO employees (first_name, last_name, department, salary, hire_year, is_manager) VALUES
      ('Michael', 'Scott', 'Sales', 65000.00, 2010, true),
      ('Jim', 'Halpert', 'Sales', 55000.00, 2012, false),
      ('Pam', 'Beesly', 'Sales', 48000.00, 2011, false),
      ('Dwight', 'Schrute', 'Sales', 58000.00, 2011, false),
      ('Angela', 'Martin', 'Accounting', 60000.00, 2010, true),
      ('Kevin', 'Malone', 'Accounting', 45000.00, 2013, false),
      ('Oscar', 'Martinez', 'Accounting', 52000.00, 2011, false)
    `);

    console.log("Students, products, and employees tables created and populated!");
    process.exit(0);
  } catch(err) {
    console.error("DB initialization Error:", err);
    process.exit(1);
  }
}

init();
