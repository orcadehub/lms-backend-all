const ffConnection = require('../config/db');
const mongoose = require('mongoose');

const supportChatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FFUser',
    required: true,
    unique: true
  },
  messages: [{
    sender: {
      type: String,
      enum: ['user', 'admin'],
      required: true
    },
    text: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  lastMessageAt: {
    type: Date,
    default: Date.now
  },
  unreadCount: {
    admin: { type: Number, default: 0 },
    user: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = ffConnection.model('FFSupportChat', supportChatSchema);
