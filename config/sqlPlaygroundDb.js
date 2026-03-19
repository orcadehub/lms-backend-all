const { Pool } = require('pg');
require('dotenv').config();

let sqlPool = null;

const getSqlPool = () => {
  if (!sqlPool) {
    sqlPool = new Pool({
      connectionString: process.env.POSTGRES_URI || 'postgresql://postgres:postgres@localhost:5432/sql_playground',
      max: 200, // Handle up to 200 concurrent users connection pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  return sqlPool;
};

module.exports = { getSqlPool };
