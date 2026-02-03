const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Instructor = require('../models/Instructor');
const Student = require('../models/Student');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    let user = null;
    let userId = decoded.userId || decoded.studentId; // Handle both formats
    
    if (decoded.role === 'admin') {
      user = await Admin.findById(userId).select('-password');
    } else if (decoded.role === 'instructor') {
      user = await Instructor.findById(userId).select('-password');
    } else if (decoded.role === 'student') {
      user = await Student.findById(userId).select('-password');
    }
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.userId = userId;
    req.user = { ...user.toObject(), id: userId, _id: userId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Access denied. Insufficient permissions.' 
      });
    }
    next();
  };
};

module.exports = { auth, authorize };