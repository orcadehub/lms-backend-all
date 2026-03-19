const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');

// Explicitly use the ws library to avoid standard node native fetch/websocket bugs
neonConfig.webSocketConstructor = ws;

require('dotenv').config();

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
