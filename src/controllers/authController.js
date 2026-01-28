const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const Instructor = require('../models/Instructor');
const Student = require('../models/Student');

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '7d'
  });
};

const authController = {
  // Login user
  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      let user = null;
      let userModel = null;

      // Check in Admin collection
      user = await Admin.findOne({ email });
      if (user) userModel = 'Admin';

      // Check in Instructor collection if not found in Admin
      if (!user) {
        user = await Instructor.findOne({ email });
        if (user) userModel = 'Instructor';
      }

      // Check in Student collection if not found in others
      if (!user) {
        user = await Student.findOne({ email });
        if (user) userModel = 'Student';
      }

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user._id, user.role);

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get current user
  getCurrentUser: async (req, res) => {
    try {
      let user = null;
      
      if (req.user.role === 'admin') {
        user = await Admin.findById(req.userId).select('-password');
      } else if (req.user.role === 'instructor') {
        user = await Instructor.findById(req.userId).select('-password');
      } else if (req.user.role === 'student') {
        user = await Student.findById(req.userId).select('-password');
      }

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = authController;