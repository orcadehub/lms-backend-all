const express = require('express');
const router = express.Router();
const axios = require('axios');

// Piston API configuration - Array of fallback servers
const PISTON_SERVERS = (process.env.PISTON_URLS || 'http://150.241.244.176:2000,http://65.0.185.100:2000,http://52.66.57.225:2000').split(',');

// Separate the servers based on their roles
// Utho is tuned for Heavy workloads like Java. AWS is for lightweight workloads like Python.
const UTHO_SERVERS = PISTON_SERVERS.filter(url => url.includes('150.241.244.176'));
const AWS_SERVERS = PISTON_SERVERS.filter(url => !url.includes('150.241.244.176'));

let currentAwsIndex = 0;

router.post('/execute', async (req, res) => {
  const lang = (req.body.language || '').toLowerCase();
  console.log(`[Piston] Request received for language: ${lang}`);

  const requestBody = {
    ...req.body,
    compile_timeout: 10000,
    run_timeout: 3000,
    compile_memory_limit: -1,
    run_memory_limit: -1
  };
  
  let success = false;
  let response = null;
  let lastError = null;

  // Determine the primary target pool based on the requested language
  let targetPool = [];
  
  if (lang === 'java') {
    // Java exclusively targets the heavy-workload Utho server
    targetPool = [...UTHO_SERVERS, ...AWS_SERVERS]; // Fallback to AWS if Utho dies
  } else {
    // Python/Others prioritize the 2 AWS Lightsail servers using Round Robin
    const rotatedAws = [];
    for (let i = 0; i < AWS_SERVERS.length; i++) {
        rotatedAws.push(AWS_SERVERS[(currentAwsIndex + i) % AWS_SERVERS.length]);
    }
    // Update global AWS index for the next incoming Python request
    if (AWS_SERVERS.length > 0) {
        currentAwsIndex = (currentAwsIndex + 1) % AWS_SERVERS.length;
    }
    
    // Target AWS first, fallback to Utho if AWS dies
    targetPool = [...rotatedAws, ...UTHO_SERVERS];
  }

  // Execute against the chosen pool
  for (let i = 0; i < targetPool.length; i++) {
    const currentURL = targetPool[i];
    console.log(`[Piston] Targeting URL: ${currentURL}/api/v2/execute`);
    
    try {
      response = await axios.post(`${currentURL}/api/v2/execute`, requestBody, {
        timeout: 20000, // 20s overall timeout to failover swiftly
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log(`[Piston] Success on ${currentURL}: Status ${response.status}`);
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
    console.error(`[Piston] All ${targetPool.length} servers failed to execute the request.`);
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