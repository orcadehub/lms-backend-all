const express = require('express');
const router = express.Router();
const FFSupportChat = require('../models/FFSupportChat');
const FFUser = require('../models/FFUser');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// Middleware to verify Admin/FFModerator Token (Copied from moderators.js for convenience)
const adminAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token, access denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.role || !['admin', 'superadmin'].includes(decoded.role)) {
      throw new Error();
    }
    req.moderator = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid admin token' });
  }
};

// --- TEST ROUTE ---
router.get('/test', (req, res) => res.json({ status: 'Support router is active' }));

// --- USER ROUTES ---

// Get current user's chat history
router.get('/my-chat', auth, async (req, res) => {
  try {
    let chat = await FFSupportChat.findOne({ user: req.user._id });
    if (!chat) {
      // Create a fresh chat if it doesn't exist
      chat = await FFSupportChat.create({ 
        user: req.user._id,
        messages: [{
          sender: 'admin',
          text: 'Welcome to FF Tourney Support! How can we help you today?',
          timestamp: new Date()
        }]
      });
    }
    // Mark as read for user
    chat.unreadCount.user = 0;
    await chat.save();
    
    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Send message as user
router.post('/send', auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Message text is required' });

    let chat = await FFSupportChat.findOne({ user: req.user._id });
    if (!chat) {
      chat = new FFSupportChat({ user: req.user._id, messages: [] });
    }

    chat.messages.push({
      sender: 'user',
      text,
      timestamp: new Date()
    });
    chat.lastMessageAt = new Date();
    chat.unreadCount.admin += 1;
    
    await chat.save();

    // Emit socket event (handled in server.js)
    const io = req.app.get('io');
    if (io) {
      // Notify admins
      io.emit('new_support_request', { userId: req.user._id, text });
      // Notify the user room (if multiple tabs)
      io.to(req.user._id.toString()).emit('receive_support_message', { sender: 'user', text, timestamp: new Date() });
    }

    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- ADMIN ROUTES ---

// List all support chats
router.get('/admin/chats', adminAuth, async (req, res) => {
  try {
    const chats = await FFSupportChat.find()
      .populate('user', 'inGameName ffUid')
      .sort({ lastMessageAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get specific chat for admin
router.get('/admin/chats/:userId', adminAuth, async (req, res) => {
  try {
    const chat = await FFSupportChat.findOne({ user: req.params.userId })
      .populate('user', 'inGameName ffUid');
    
    if (!chat) return res.status(404).json({ error: 'Chat not found' });

    // Mark as read for admin
    chat.unreadCount.admin = 0;
    await chat.save();

    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Send message as admin
router.post('/admin/send/:userId', adminAuth, async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.params.userId;

    const chat = await FFSupportChat.findOne({ user: userId });
    if (!chat) return res.status(404).json({ error: 'Chat not found' });

    chat.messages.push({
      sender: 'admin',
      text,
      timestamp: new Date()
    });
    chat.lastMessageAt = new Date();
    chat.unreadCount.user += 1;
    
    await chat.save();

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.to(userId.toString()).emit('receive_support_message', { sender: 'admin', text, timestamp: new Date() });
    }

    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;
