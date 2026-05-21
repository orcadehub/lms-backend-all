const express = require('express');
const router = express.Router();
const axios = require('axios');
const { auth } = require('../middleware/auth');

// Piston API configuration - Array of fallback servers
const PISTON_SERVERS = (process.env.PISTON_URLS || 'http://150.241.244.176:2000,http://65.0.185.100:2000,http://52.66.57.225:2000,http://13.233.245.83:2000').split(',');

// Separate the servers based on their roles
// Utho is tuned for Heavy workloads like Java. AWS is for lightweight workloads like Python.
const UTHO_SERVERS = PISTON_SERVERS.filter(url => url.includes('150.241.244.176'));
const AWS_SERVERS = PISTON_SERVERS.filter(url => !url.includes('150.241.244.176'));

// Simple async queue for global concurrency limiting
class AsyncQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  async add(task) {
    if (this.running >= this.concurrency) {
      await new Promise(resolve => this.queue.push(resolve));
    }
    this.running++;
    try {
      return await task();
    } finally {
      this.running--;
      if (this.queue.length > 0) {
        const next = this.queue.shift();
        next();
      }
    }
  }
}

// Global limit of 50 concurrent executions
const pistonExecutionQueue = new AsyncQueue(50);

let currentAwsIndex = 0;

router.post('/execute', auth, async (req, res) => {
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

router.post('/execute-batch', auth, async (req, res) => {
  const { language, version, files, testCases } = req.body;
  const lang = (language || '').toLowerCase();
  console.log(`[Piston] Batch request received for language: ${lang} with ${testCases?.length || 0} test cases`);

  if (!testCases || !Array.isArray(testCases)) {
    return res.status(400).json({ error: 'testCases array is required' });
  }

  // Create an array of promises to execute concurrently, limited by the global queue
  const executePromises = testCases.map((tc) => {
    return pistonExecutionQueue.add(async () => {
      const requestBody = {
        language,
        version,
        files,
        stdin: tc.input || '',
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1
      };

      // Determine the primary target pool based on the requested language
      let targetPool = [];
      if (lang === 'java') {
        targetPool = [...UTHO_SERVERS, ...AWS_SERVERS];
      } else {
        const rotatedAws = [];
        for (let i = 0; i < AWS_SERVERS.length; i++) {
            rotatedAws.push(AWS_SERVERS[(currentAwsIndex + i) % AWS_SERVERS.length]);
        }
        if (AWS_SERVERS.length > 0) {
            currentAwsIndex = (currentAwsIndex + 1) % AWS_SERVERS.length;
        }
        targetPool = [...rotatedAws, ...UTHO_SERVERS];
      }

      let success = false;
      let response = null;
      let lastError = null;

      for (let i = 0; i < targetPool.length; i++) {
        const currentURL = targetPool[i];
        try {
          response = await axios.post(`${currentURL}/api/v2/execute`, requestBody, {
            timeout: 20000,
            headers: { 'Content-Type': 'application/json' }
          });
          success = true;
          break;
        } catch (error) {
          lastError = error;
        }
      }

      if (success) {
        return { success: true, data: response.data, originalTestCase: tc };
      } else {
        return { success: false, error: lastError?.message || 'Execution failed', originalTestCase: tc };
      }
    });
  });

  try {
    const results = await Promise.all(executePromises);
    res.json(results);
  } catch (error) {
    console.error(`[Piston] Batch execution failed:`, error);
    res.status(500).json({ error: 'Batch execution failed', details: error.message });
  }
});

module.exports = router;