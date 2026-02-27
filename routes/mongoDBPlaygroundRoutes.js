const express = require('express');
const router = express.Router();
const { validateApiKey } = require('../middleware/apiKeyAuth');
const { getPlaygroundDb } = require('../config/playgroundDb');

// Get expected output by executing expectedQuery
router.post('/expected-output', validateApiKey, async (req, res) => {
  try {
    const { expectedQuery, collectionName } = req.body;

    if (!expectedQuery || !collectionName) {
      return res.status(400).json({ message: 'expectedQuery and collectionName are required' });
    }

    try {
      // Block all data-altering operations
      const blockedOperations = [
        'insert', 'update', 'delete', 'remove', 'drop', 'create',
        'replace', 'save', 'deleteone', 'deletemany', 'updateone', 
        'updatemany', 'insertone', 'insertmany', 'findoneandupdate',
        'findoneandreplace', 'findoneanddelete', 'bulkwrite', 'rename',
        'createindex', 'dropindex', 'createindexes', 'dropindexes'
      ];
      const lowerQuery = expectedQuery.toLowerCase();
      
      for (const op of blockedOperations) {
        if (lowerQuery.includes(op)) {
          return res.json({ success: false, error: 'Only read operations are allowed' });
        }
      }

      const playgroundDb = getPlaygroundDb();
      const collection = playgroundDb.collection(collectionName);

      const queryStr = expectedQuery.replace(`db.${collectionName}.`, '');
      
      // Execute query using eval in a safe context
      const result = await eval(`collection.${queryStr}`);
      const finalResult = Array.isArray(result) ? result : await result.toArray();
      
      res.json({ success: true, result: finalResult });
    } catch (queryError) {
      res.json({ success: false, error: queryError.message });
    }
  } catch (error) {
    console.error('Error executing expected query:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Execute MongoDB query against playground database
router.post('/execute', validateApiKey, async (req, res) => {
  try {
    const { query, collectionName } = req.body;

    if (!query || !collectionName) {
      return res.status(400).json({ message: 'Query and collectionName are required' });
    }

    try {
      // Block all data-altering operations
      const blockedOperations = [
        'insert', 'update', 'delete', 'remove', 'drop', 'create',
        'replace', 'save', 'deleteone', 'deletemany', 'updateone', 
        'updatemany', 'insertone', 'insertmany', 'findoneandupdate',
        'findoneandreplace', 'findoneanddelete', 'bulkwrite', 'rename',
        'createindex', 'dropindex', 'createindexes', 'dropindexes'
      ];
      const lowerQuery = query.toLowerCase();
      
      for (const op of blockedOperations) {
        if (lowerQuery.includes(op)) {
          return res.json({ success: false, error: 'Only read operations are allowed' });
        }
      }

      const playgroundDb = getPlaygroundDb();
      const collection = playgroundDb.collection(collectionName);

      const queryStr = query.replace(`db.${collectionName}.`, '');
      
      // Execute query using eval in a safe context
      const result = await eval(`collection.${queryStr}`);
      const finalResult = Array.isArray(result) ? result : await result.toArray();
      
      res.json({ success: true, result: finalResult });
    } catch (queryError) {
      res.json({ success: false, error: queryError.message });
    }
  } catch (error) {
    console.error('Error executing MongoDB query:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
