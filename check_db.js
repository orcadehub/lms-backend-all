const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
  ssl: { rejectUnauthorized: false }
});

async function checkSchemaAndData() {
  try {
    const res = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'students'
      ORDER BY ordinal_position;
    `);
    console.log('--- SCHEMA ---');
    console.table(res.rows);

    const dataRes = await pool.query('SELECT * FROM students LIMIT 5;');
    console.log('\n--- DATA (SAMPLE) ---');
    console.table(dataRes.rows);

    const countRes = await pool.query('SELECT COUNT(*) FROM students;');
    console.log('\n--- TOTAL COUNT ---');
    console.log(countRes.rows[0].count);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

checkSchemaAndData();
