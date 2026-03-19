const { Pool } = require('pg');
require('dotenv').config();

let sqlPool = null;

const getSqlPool = () => {
  if (!sqlPool) {
    sqlPool = new Pool({
      connectionString: process.env.POSTGRES_URI || 'postgresql://postgres:postgres@localhost:5432/sql_playground',
      ssl: process.env.POSTGRES_URI ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000, // 10 seconds
    });
  }
  return sqlPool;
};

module.exports = { getSqlPool };
