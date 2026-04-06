const express = require('express');
const router = express.Router();
const axios = require('axios');

// Piston API configuration - Use environment variable or fallback to current hardcoded IP
const PISTON_URL = process.env.PISTON_URL || 'http://52.66.57.225:2000';

router.post('/execute', async (req, res) => {
  console.log(`[Piston] Request received for language: ${req.body.language}`);
  console.log(`[Piston] Targeting URL: ${PISTON_URL}/api/v2/execute`);
  
  try {
    const response = await axios.post(`${PISTON_URL}/api/v2/execute`, req.body, {
      timeout: 20000, // 20 second timeout
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`[Piston] Success: Status ${response.status}`);
    res.json(response.data);
  } catch (error) {
    const errorMsg = error.response ? 
      `Status ${error.response.status}: ${JSON.stringify(error.response.data)}` : 
      error.message;
    
    console.error(`[Piston] Error: ${errorMsg}`);
    
    // Provide more helpful error messages for common connection issues
    let userMessage = 'Piston code execution failed';
    if (error.code === 'ECONNREFUSED') {
      userMessage = `Connection refused at ${PISTON_URL}. Please ensure the Piston server is running and port 2000 is open in AWS Lightsail firewall.`;
    } else if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
      userMessage = `Connection timed out at ${PISTON_URL}. Please check your server's network settings.`;
    } else if (error.code === 'ENOTFOUND') {
      userMessage = `Piston server address ${PISTON_URL} not found. Please check the IP.`;
    }

    res.status(500).json({ 
      error: userMessage,
      details: errorMsg,
      code: error.code || 'UNKNOWN'
    });
  }
});

module.exports = router;