const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const quizRoutes = require('./routes/quizRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const studentRoutes = require('./routes/studentRoutes');
const batchRoutes = require('./routes/batchRoutes');
const quizQuestionRoutes = require('./routes/quizQuestionRoutes');
const quizAttemptRoutes = require('./routes/quizAttemptRoutes');
const studentAuthRoutes = require('./routes/studentAuthRoutes');
const practiceRoutes = require('./routes/practiceRoutes');
const adminPracticeRoutes = require('./routes/adminPracticeRoutes');
const studentPracticeRoutes = require('./routes/studentPracticeRoutes');
const practiceSubmissionRoutes = require('./routes/practiceSubmissionRoutes');
const pistonRoutes = require('./routes/pistonRoutes');
const assessmentQuestionRoutes = require('./routes/assessmentQuestionRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Make io available to routes
app.set('io', io);

const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:3001', 
    'https://orcode.in',
    'http://orcode.in.s3-website.ap-south-2.amazonaws.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'x-tenant-id']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection with serverless optimization
let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }
  
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms', {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 1,
      minPoolSize: 0,
      maxIdleTimeMS: 30000,
      retryWrites: true
    });
    
    cachedConnection = conn;
    console.log('MongoDB connected');
    return conn;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', studentAuthRoutes);
app.use('/api/auth', practiceRoutes);
app.use('/api/admin/practice', adminPracticeRoutes);
app.use('/api/student/practice', studentPracticeRoutes);
app.use('/api/practice-submissions', practiceSubmissionRoutes);
app.use('/api/piston', pistonRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/quiz-questions', quizQuestionRoutes);
app.use('/api/questions', quizQuestionRoutes);
app.use('/api/assessment-questions', assessmentQuestionRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/quiz-attempts', quizAttemptRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Debug environment variables endpoint
app.get('/api/debug/env', (req, res) => {
  res.json({
    environment: {
      NODE_ENV: process.env.NODE_ENV || 'undefined',
      PORT: process.env.PORT || 'undefined',
      MONGODB_URI: process.env.MONGODB_URI ? 'Present' : 'Missing',
      JWT_SECRET: process.env.JWT_SECRET ? 'Present' : 'Missing'
    },
    mongodb: {
      connectionState: mongoose.connection.readyState,
      connectionStates: {
        0: 'disconnected',
        1: 'connected', 
        2: 'connecting',
        3: 'disconnecting'
      },
      currentState: {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting', 
        3: 'disconnecting'
      }[mongoose.connection.readyState],
      host: mongoose.connection.host || 'undefined',
      name: mongoose.connection.name || 'undefined'
    },
    timestamp: new Date().toISOString()
  });
});

// Connection test endpoint
app.get('/api/test-connection', async (req, res) => {
  try {
    await connectDB();
    const Tenant = require('./models/Tenant');
    const count = await Tenant.countDocuments();
    res.json({ 
      status: 'Connected',
      tenantCount: count,
      mongoUri: process.env.MONGODB_URI ? 'Present' : 'Missing'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Failed',
      error: error.message,
      mongoUri: process.env.MONGODB_URI ? 'Present' : 'Missing'
    });
  }
});
app.get('/api/test-hash', (req, res) => {
  const crypto = require('crypto');
  const apiKey = '9331c6d98ac526818d3a4a477fdeed3440e864069c6057c70f2573dee8ca405a';
  const calculatedHash = crypto.createHash('sha256').update(apiKey).digest('hex');
  const expectedHash = '84cba0832327384c77b3952f4a77102f497e0326eba9ea35ef9febb5027700f9';
  
  res.json({
    apiKey: apiKey,
    calculatedHash: calculatedHash,
    expectedHash: expectedHash,
    match: calculatedHash === expectedHash
  });
});

// Debug hash checker
app.get('/api/debug/hash/:apikey', async (req, res) => {
  try {
    const crypto = require('crypto');
    const apiKey = req.params.apikey;
    const calculatedHash = crypto.createHash('sha256').update(apiKey).digest('hex');
    
    await connectDB();
    const Tenant = require('./models/Tenant');
    const tenant = await Tenant.findOne({ apiKey: apiKey });
    
    res.json({
      providedKey: apiKey,
      calculatedHash: calculatedHash,
      tenantFound: !!tenant,
      storedHash: tenant?.apiKeyHash || 'Not found',
      hashMatch: tenant?.apiKeyHash === calculatedHash
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/debug/tenants', async (req, res) => {
  try {
    await connectDB();
    const Tenant = require('./models/Tenant');
    const tenants = await Tenant.find({}, { name: 1, domain: 1, apiKey: 1, isActive: 1 }).limit(5);
    res.json({ 
      count: tenants.length,
      tenants: tenants.map(t => ({
        name: t.name,
        domain: t.domain,
        apiKey: t.apiKey ? t.apiKey.substring(0, 8) + '...' : 'None',
        isActive: t.isActive
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin endpoint to create tenant in production
app.post('/api/admin/create-tenant', async (req, res) => {
  try {
    await connectDB();
    const Tenant = require('./models/Tenant');
    
    // Check if tenant already exists
    const existing = await Tenant.findOne({ domain: 'localhost:3001' });
    if (existing) {
      return res.json({ 
        message: 'Tenant already exists',
        apiKey: existing.apiKey,
        tenantId: existing._id
      });
    }

    // Create tenant with specific API key
    const tenant = new Tenant({
      name: 'Customer A',
      companyName: 'Customer A Company', 
      adminEmail: 'orcadehub2@gmail.com',
      domain: 'localhost:3001',
      apiEndpoint: 'https://lms-backend-all.vercel.app/api',
      allowedDomains: ['localhost:3001', 'orcode.in'],
      themeColor: '#1976d2',
      logoUrl: 'https://coffee-geographical-ape-289.mypinata.cloud/ipfs/bafkreidw4alnkntpnmcqnpc3fck7utrjgxjgao5ocltqdsgyhf4ux6kyua',
      apiKey: 'fb8c49afd8d76d45b016100f1e5fb820de63d927305b7c13459be512645da278',
      settings: {
        allowedOrigins: ['http://localhost:3001', 'https://orcode.in'],
        features: ['quizzes', 'assessments', 'reports'],
        apiUsageLimit: 10000
      }
    });

    await tenant.save();
    res.json({ 
      message: 'Tenant created successfully',
      apiKey: tenant.apiKey,
      tenantId: tenant._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check IP access for quiz
app.post('/api/check-quiz-access', async (req, res) => {
  try {
    const { quizId, userIP } = req.body;
    
    const Quiz = require('./models/Quiz');
    const quiz = await Quiz.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    const hasAccess = !quiz.allowedIPs || quiz.allowedIPs.length === 0 || quiz.allowedIPs.includes(userIP);
    
    res.json({
      hasAccess,
      userIP,
      allowedIPs: quiz.allowedIPs || [],
      message: hasAccess ? 'Access granted' : 'Access denied - IP not authorized'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Check IP access for assessment
app.post('/api/check-assessment-access', async (req, res) => {
  try {
    const { assessmentId, userIP } = req.body;
    
    const Assessment = require('./models/Assessment');
    const assessment = await Assessment.findById(assessmentId);
    
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    
    const hasAccess = !assessment.allowedIPs || assessment.allowedIPs.length === 0 || assessment.allowedIPs.includes(userIP);
    
    res.json({
      hasAccess,
      userIP,
      allowedIPs: assessment.allowedIPs || [],
      message: hasAccess ? 'Access granted' : 'Access denied - IP not authorized'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});