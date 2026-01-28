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
    
    if (decoded.role === 'admin') {
      user = await Admin.findById(decoded.userId).select('-password');
    } else if (decoded.role === 'instructor') {
      user = await Instructor.findById(decoded.userId).select('-password');
    } else if (decoded.role === 'student') {
      user = await Student.findById(decoded.userId).select('-password');
    }
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.userId = decoded.userId;
    req.user = user;
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