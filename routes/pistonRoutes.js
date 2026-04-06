const express = require('express');
const router = express.Router();
const axios = require('axios');

// Piston API configuration - Array of fallback servers
const PISTON_SERVERS = (process.env.PISTON_URLS || 'http://150.241.244.176:2000,http://65.0.185.100:2000,http://52.66.57.225:2000').split(',');

let currentServerIndex = 0;

// Languages that need longer compile/run timeouts (JVM, compiled langs)
const HEAVY_LANGUAGES = ['java', 'kotlin', 'c', 'c++', 'rust', 'go', 'typescript', 'fortran', 'd'];

router.post('/execute', async (req, res) => {
  const lang = (req.body.language || '').toLowerCase();
  console.log(`[Piston] Request received for language: ${lang}`);

  // Set generous timeouts within Piston's server limits
  const requestBody = {
    ...req.body,
    compile_timeout: 10000,      // Max allowed by Piston server
    run_timeout: 3000,           // Max allowed by Piston server
    compile_memory_limit: -1,    // No memory limit for compilation
    run_memory_limit: -1         // No memory limit for execution
  };
  
  let success = false;
  let response = null;
  let lastError = null;

  // Try each server starting from the current index
  for (let i = 0; i < PISTON_SERVERS.length; i++) {
    const serverIndex = (currentServerIndex + i) % PISTON_SERVERS.length;
    const currentURL = PISTON_SERVERS[serverIndex];
    
    console.log(`[Piston] Targeting URL: ${currentURL}/api/v2/execute`);
    
    try {
      response = await axios.post(`${currentURL}/api/v2/execute`, requestBody, {
        timeout: 30000, // 30 second timeout per request
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log(`[Piston] Success on ${currentURL}: Status ${response.status}`);
      
      // Update global index to round-robin for the next incoming request
      currentServerIndex = (serverIndex + 1) % PISTON_SERVERS.length;
      success = true;
      break; 
    } catch (error) {
      const errorMsg = error.response ? 
        `Status ${error.response.status}: ${JSON.stringify(error.response.data)}` : 
        error.message;
      
      console.error(`[Piston] Error on ${currentURL}: ${errorMsg}`);
      lastError = error;
    }
  }
  
  if (success) {
    res.json(response.data);
  } else {
    // All servers failed
    console.error(`[Piston] All ${PISTON_SERVERS.length} servers failed to execute the request.`);
    const errorMsg = lastError?.response ? 
      `Status ${lastError.response.status}: ${JSON.stringify(lastError.response.data)}` : 
      lastError?.message || 'Unknown error';
      
    res.status(500).json({ 
      error: 'All Piston execution servers are currently unavailable. Please try again later.',
      details: errorMsg,
      code: lastError?.code || 'UNKNOWN'
    });
  }
});

module.exports = router;