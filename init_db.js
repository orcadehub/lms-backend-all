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
      ('John', 'Doe', 'john.doe@example.com', 3.8, 'Computer Science', 'Male', 20, 'New York', 2021),
      ('Jane', 'Smith', 'jane.smith@example.com', 3.6, 'Electrical Engineering', 'Female', 22, 'Los Angeles', 2020),
      ('Alice', 'Johnson', 'alice.j@school.edu', 3.9, 'Computer Science', 'Female', 19, 'Chicago', 2022),
      ('Bob', 'Brown', 'bob.b@example.com', 3.2, 'Mathematics', 'Male', 21, 'Houston', 2021),
      ('Charlie', 'Davis', 'charlie.d@test.org', 3.5, 'Physics', 'Male', 24, 'Phoenix', 2019),
      ('Diana', 'Miller', 'diana.m@example.com', 3.4, 'Computer Science', 'Female', 21, 'New York', 2021),
      ('Ethan', 'Wilson', 'ethan.w@school.edu', 3.7, 'Chemistry', 'Male', 23, 'Dallas', 2020),
      ('Fiona', 'Moore', 'fiona.m@test.org', 2.9, 'Biology', 'Female', 20, 'San Diego', 2022),
      ('George', 'Taylor', 'george.t@example.com', 3.1, 'Mathematics', 'Male', 19, 'Austin', 2023),
      ('Hannah', 'Anderson', 'hannah.a@school.edu', 4.0, 'Computer Science', 'Female', 21, 'San Francisco', 2021),
      ('Ian', 'Thomas', 'ian.t@example.com', 2.8, 'Business', 'Male', 22, 'Seattle', 2020),
      ('Jenny', 'Jackson', 'jenny.j@test.org', 3.5, 'Economics', 'Female', 20, 'Denver', 2022),
      ('Kevin', 'White', 'kevin.w@school.edu', 3.3, 'Physics', 'Male', 23, 'Boston', 2019),
      ('Laura', 'Harris', 'laura.h@example.com', 3.8, 'Biology', 'Female', 21, 'Miami', 2021),
      ('Mike', 'Martin', 'mike.m@test.org', 2.7, 'Chemistry', 'Male', 19, 'Atlanta', 2023),
      ('Nina', 'Thompson', 'nina.t@school.edu', 3.6, 'Computer Science', 'Female', 22, 'Portland', 2020),
      ('Oscar', 'Garcia', 'oscar.g@example.com', 3.9, 'Engineering', 'Male', 20, 'San Jose', 2022),
      ('Paula', 'Martinez', 'paula.m@test.org', 3.4, 'Mathematics', 'Female', 21, 'Las Vegas', 2021),
      ('Quinn', 'Robinson', 'quinn.r@school.edu', 3.1, 'Business', 'Male', 24, 'Orlando', 2019),
      ('Rachel', 'Clark', 'rachel.c@example.com', 3.7, 'Economics', 'Female', 19, 'Detroit', 2023),
      ('Sam', 'Rodriguez', 'sam.r@test.org', 3.2, 'Computer Science', 'Male', 22, 'Columbus', 2020),
      ('Tina', 'Lewis', 'tina.l@school.edu', 3.5, 'Physics', 'Female', 20, 'Charlotte', 2022),
      ('Uma', 'Lee', 'uma.l@example.com', 3.8, 'Biology', 'Female', 21, 'Indianapolis', 2021),
      ('Victor', 'Walker', 'victor.w@test.org', 2.6, 'Chemistry', 'Male', 23, 'Seattle', 2019),
      ('Wendy', 'Hall', 'wendy.h@school.edu', 3.9, 'Engineering', 'Female', 19, 'Denver', 2023),
      ('Xavier', 'Allen', 'xavier.a@example.com', 3.3, 'Business', 'Male', 20, 'Austin', 2022),
      ('Yara', 'Young', 'yara.y@test.org', 3.0, 'Economics', 'Female', 22, 'Dallas', 2020),
      ('Zane', 'Hernandez', 'zane.h@school.edu', 3.4, 'Computer Science', 'Male', 21, 'San Diego', 2021),
      ('Liam', 'King', 'liam.k@example.com', 3.7, 'Mathematics', 'Male', 24, 'New York', 2019),
      ('Mia', 'Wright', 'mia.w@test.org', 4.0, 'Physics', 'Female', 19, 'Los Angeles', 2023)
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
      ('Monitor Stand', 'Accessories', 35.50, 80, 4.1, true),
      ('Smartphone', 'Electronics', 899.99, 100, 4.6, true),
      ('Tablet', 'Electronics', 499.99, 60, 4.3, true),
      ('Headphones', 'Electronics', 199.99, 120, 4.8, true),
      ('Bookshelf', 'Furniture', 150.00, 25, 4.0, true),
      ('Sofa', 'Furniture', 799.00, 15, 4.5, true),
      ('Blender', 'Kitchen', 89.99, 40, 4.2, true),
      ('Toaster', 'Kitchen', 39.99, 60, 4.1, true),
      ('Microwave', 'Kitchen', 120.00, 30, 4.4, true),
      ('Mouse Pad', 'Accessories', 19.99, 300, 4.7, true),
      ('Webcam', 'Electronics', 79.99, 85, 4.3, true),
      ('USB Hub', 'Accessories', 25.00, 150, 4.5, true),
      ('External Hard Drive', 'Electronics', 149.99, 50, 4.6, true),
      ('Flash Drive', 'Accessories', 15.99, 500, 4.8, true),
      ('Ergonomic Keyboard', 'Electronics', 99.99, 45, 4.2, true),
      ('Office Lamp', 'Furniture', 45.00, 100, 4.3, true),
      ('Coffee Maker', 'Kitchen', 250.00, 20, 4.6, true),
      ('Air Fryer', 'Kitchen', 120.00, 35, 4.5, true),
      ('Water Bottle', 'Accessories', 25.00, 400, 4.8, true),
      ('Notebook', 'Office', 5.00, 1000, 4.9, true),
      ('Pens (10 Pack)', 'Office', 10.00, 800, 4.7, true),
      ('Stapler', 'Office', 12.00, 150, 4.6, true),
      ('Printer', 'Electronics', 199.99, 40, 4.1, true),
      ('Printer Ink', 'Accessories', 59.99, 200, 4.4, true)
    `);

    // Insert employee data
    await pool.query(`
      INSERT INTO employees (first_name, last_name, department, salary, hire_year, is_manager) VALUES
      ('Michael', 'Scott', 'Manager', 65000.00, 2010, true),
      ('Jim', 'Halpert', 'Sales', 55000.00, 2012, false),
      ('Pam', 'Beesly', 'Sales', 48000.00, 2011, false),
      ('Dwight', 'Schrute', 'Sales', 58000.00, 2011, false),
      ('Angela', 'Martin', 'Accounting', 60000.00, 2010, true),
      ('Kevin', 'Malone', 'Accounting', 45000.00, 2013, false),
      ('Oscar', 'Martinez', 'Accounting', 52000.00, 2011, false),
      ('Stanley', 'Hudson', 'Sales', 54000.00, 2008, false),
      ('Phyllis', 'Vance', 'Sales', 53000.00, 2009, false),
      ('Andy', 'Bernard', 'Sales', 51000.00, 2014, false),
      ('Creed', 'Bratton', 'Quality Assurance', 40000.00, 2005, false),
      ('Meredith', 'Palmer', 'Supplier Relations', 42000.00, 2007, false),
      ('Kelly', 'Kapoor', 'Customer Service', 41000.00, 2012, false),
      ('Toby', 'Flenderson', 'Human Resources', 50000.00, 2009, true),
      ('Ryan', 'Howard', 'Temp', 35000.00, 2015, false),
      ('Darryl', 'Philbin', 'Warehouse', 58000.00, 2008, true),
      ('Roy', 'Anderson', 'Warehouse', 45000.00, 2010, false),
      ('Jan', 'Levinson', 'Executive', 95000.00, 2006, true),
      ('David', 'Wallace', 'Executive', 120000.00, 2005, true),
      ('Gabe', 'Lewis', 'Executive', 70000.00, 2013, false),
      ('Holly', 'Flax', 'Human Resources', 55000.00, 2014, true),
      ('Clark', 'Green', 'Customer Service', 38000.00, 2016, false),
      ('Pete', 'Miller', 'Customer Service', 38000.00, 2016, false),
      ('Nellie', 'Bertram', 'Manager', 62000.00, 2015, true),
      ('Jo', 'Bennett', 'Executive', 150000.00, 2012, true),
      ('Robert', 'California', 'Executive', 140000.00, 2015, true),
      ('Todd', 'Packer', 'Sales', 60000.00, 2006, false),
      ('Charles', 'Miner', 'Executive', 90000.00, 2014, true),
      ('Deangelo', 'Vickers', 'Manager', 63000.00, 2015, true),
      ('Erin', 'Hannon', 'Reception', 36000.00, 2014, false)
    `);

    console.log("Students, products, and employees tables created and populated!");
    process.exit(0);
  } catch(err) {
    console.error("DB initialization Error:", err);
    process.exit(1);
  }
}

init();
