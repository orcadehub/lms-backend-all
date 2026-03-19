const { Pool } = require("pg");
const pool = new Pool({
  connectionString: "postgresql://postgres:postgres@localhost:5432/sql_playground"
});

async function init() {
  try {
    await pool.query("DROP TABLE IF EXISTS students");
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

    await pool.query(`
      INSERT INTO students (first_name, last_name, email, gpa, major, gender, age, city, enrollment_year) VALUES
      ('John', 'Doe', 'john@example.com', 3.8, 'Computer Science', 'Male', 20, 'New York', 2021),
      ('Jane', 'Smith', 'jane@example.com', 3.6, 'Electrical Engineering', 'Female', 22, 'Los Angeles', 2020),
      ('Alice', 'Johnson', 'alice@school.edu', 3.9, 'Computer Science', 'Female', 19, 'Chicago', 2022),
      ('Bob', 'Brown', 'bob@example.com', 3.2, 'Mathematics', 'Male', 21, 'Houston', 2021),
      ('Charlie', 'Davis', 'charlie@test.org', 3.5, 'Physics', 'Male', 24, 'Phoenix', 2019),
      ('Diana', 'Miller', 'diana@example.com', 3.4, 'Computer Science', 'Female', 21, 'New York', 2021)
    `);

    console.log("Students table created and populated!");
    process.exit(0);
  } catch(err) {
    console.error("DB initialization Error:", err);
    process.exit(1);
  }
}

init();
