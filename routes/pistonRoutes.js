const express = require('express');
const router = express.Router();

router.post('/execute', async (req, res) => {
  try {
    const response = await fetch('http://3.111.147.142:2000/api/v2/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;