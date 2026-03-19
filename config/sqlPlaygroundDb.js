const { Pool } = require('pg');

let sqlPool = null;

const getSqlPool = () => {
  if (!sqlPool) {
    sqlPool = new Pool({
      connectionString: process.env.POSTGRES_URI || 'postgresql://postgres:postgres@localhost:5432/sql_playground',
    });
  }
  return sqlPool;
};

module.exports = { getSqlPool };
