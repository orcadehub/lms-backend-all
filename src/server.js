const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', studentAuthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/quiz-questions', quizQuestionRoutes);
app.use('/api/questions', quizQuestionRoutes);
app.use('/api/quiz-attempts', quizAttemptRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'LMS API is running' });
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

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});