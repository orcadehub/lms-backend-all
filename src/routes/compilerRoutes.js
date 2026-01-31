const express = require('express')
const axios = require('axios')
const rateLimit = require('express-rate-limit')
const auth = require('../middleware/auth')
const router = express.Router()

// Judge0 API configuration
const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'http://localhost:2358'
const JUDGE0_TIMEOUT = parseInt(process.env.JUDGE0_TIMEOUT) || 10000
const MAX_RETRIES = parseInt(process.env.JUDGE0_MAX_RETRIES) || 3

// Rate limiting for code execution
const executeRateLimit = rateLimit({
  windowMs: 1000, // 1 second
  max: 1000, // 1000 requests per second
  message: 'Too many requests',
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => true // Skip rate limiting entirely
})

// Language mapping for Judge0
const languageMap = {
  'python': { id: 71, name: 'Python (3.8.1)' },
  'javascript': { id: 63, name: 'JavaScript (Node.js 12.14.0)' },
  'java': { id: 62, name: 'Java (OpenJDK 13.0.1)' },
  'cpp': { id: 54, name: 'C++ (GCC 9.2.0)' },
  'c': { id: 50, name: 'C (GCC 9.2.0)' }
}

// Input validation and sanitization
const validateInput = (code, language, input) => {
  if (!code || typeof code !== 'string') {
    throw new Error('Invalid code provided')
  }
  if (code.length > 50000) { // 50KB limit
    throw new Error('Code too large (max 50KB)')
  }
  if (!languageMap[language]) {
    throw new Error('Unsupported language')
  }
  if (input && input.length > 10000) { // 10KB input limit
    throw new Error('Input too large (max 10KB)')
  }
  return true
}

// Execute code with Judge0
const executeWithJudge0 = async (code, languageId, input) => {
  try {
    // Create submission
    const submissionData = {
      source_code: Buffer.from(code).toString('base64'),
      language_id: languageId,
      stdin: input ? Buffer.from(input).toString('base64') : null,
      wait: true
    }

    const response = await axios.post(`${JUDGE0_API_URL}/submissions`, submissionData, {
      timeout: JUDGE0_TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        base64_encoded: true,
        wait: true
      }
    })

    return response.data
  } catch (error) {
    throw error
  }
}

// Execute code endpoint
router.post('/execute', auth, executeRateLimit, async (req, res) => {
  const startTime = Date.now()
  
  try {
    const { code, language, input = '' } = req.body
    
    // Validate input
    validateInput(code, language, input)
    
    const judge0Lang = languageMap[language]
    
    const result = await executeWithJudge0(code, judge0Lang.id, input)
    const executionTime = Date.now() - startTime
    
    // Process result
    const output = {
      success: true,
      stdout: result.stdout ? Buffer.from(result.stdout, 'base64').toString() : '',
      stderr: result.stderr ? Buffer.from(result.stderr, 'base64').toString() : '',
      compile_output: result.compile_output ? Buffer.from(result.compile_output, 'base64').toString() : '',
      compile_error: result.compile_output ? Buffer.from(result.compile_output, 'base64').toString() : '',
      exit_code: result.status?.id || 0,
      execution_time: parseFloat(result.time) * 1000 || executionTime, // Convert to ms
      language: language,
      status: result.status?.description || 'Completed'
    }
    
    // Log execution for monitoring
    console.log(`Code execution: ${language} | Time: ${output.execution_time}ms | User: ${req.user.id}`)
    
    res.json(output)
    
  } catch (error) {
    const executionTime = Date.now() - startTime
    
    console.error('Code execution error:', {
      error: error.message,
      user: req.user.id,
      language: req.body.language,
      time: executionTime
    })
    
    // Don't expose internal errors to client
    const clientError = error.response?.status === 400 
      ? 'Invalid code or input' 
      : 'Code execution service temporarily unavailable'
    
    res.status(500).json({
      success: false,
      error: clientError,
      execution_time: executionTime
    })
  }
})

// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    const response = await axios.get(`${JUDGE0_API_URL}/languages`, {
      timeout: 5000
    })
    
    res.json({
      status: 'healthy',
      judge0_status: 'connected',
      available_languages: Object.keys(languageMap),
      judge0_languages: response.data.length
    })
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      judge0_status: 'disconnected',
      error: 'Cannot connect to code execution service'
    })
  }
})

module.exports = router