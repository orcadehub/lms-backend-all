const ffConnection = require('../config/db');
const mongoose = require('mongoose');

const ModeratorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin'
  }
}, { timestamps: true });

module.exports = ffConnection.model('FFModerator', ModeratorSchema);
