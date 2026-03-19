const express = require('express');
const router = express.Router();
const { validateApiKey } = require('../middleware/apiKeyAuth');
const { getSqlPool } = require('../config/sqlPlaygroundDb');

// Get expected output by executing expectedQuery
router.post('/expected-output', validateApiKey, async (req, res) => {
  try {
    const { expectedQuery, tableName } = req.body;

    if (!expectedQuery || !tableName) {
      return res.status(400).json({ message: 'expectedQuery and tableName are required' });
    }

    try {
      // Block all data-altering operations (case-insensitive check)
      const blockedOperations = [
        'insert', 'update', 'delete', 'drop', 'create', 'truncate', 
        'alter', 'grant', 'revoke', 'vacuum', 'analyze', 'copy'
      ];
      const lowerQuery = expectedQuery.toLowerCase();
      
      for (const op of blockedOperations) {
        // Use regex for word boundary to avoid false positives (e.g., 'select' vs 'insert')
        const regex = new RegExp(`\\b${op}\\b`, 'i');
        if (regex.test(lowerQuery)) {
          return res.json({ success: false, error: 'Only read operations are allowed' });
        }
      }

      const pool = getSqlPool();
      const result = await pool.query(expectedQuery);
      
      res.json({ success: true, result: result.rows });
    } catch (queryError) {
      res.json({ success: false, error: queryError.message });
    }
  } catch (error) {
    console.error('Error executing expected query:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Execute SQL query against playground database
router.post('/execute', validateApiKey, async (req, res) => {
  try {
    const { query, tableName } = req.body;

    if (!query || !tableName) {
      return res.status(400).json({ message: 'Query and tableName are required' });
    }

    try {
      // Block all data-altering operations
      const blockedOperations = [
        'insert', 'update', 'delete', 'drop', 'create', 'truncate', 
        'alter', 'grant', 'revoke', 'vacuum', 'analyze', 'copy'
      ];
      const lowerQuery = query.toLowerCase();
      
      for (const op of blockedOperations) {
        const regex = new RegExp(`\\b${op}\\b`, 'i');
        if (regex.test(lowerQuery)) {
          return res.json({ success: false, error: 'Only read operations are allowed' });
        }
      }

      const pool = getSqlPool();
      const result = await pool.query(query);
      
      res.json({ success: true, result: result.rows });
    } catch (queryError) {
      res.json({ success: false, error: queryError.message });
    }
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
