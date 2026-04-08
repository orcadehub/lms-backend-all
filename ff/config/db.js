const mongoose = require('mongoose');

const ffConnection = mongoose.createConnection(process.env.FF_MONGODB_URI || 'mongodb://localhost:27017/ff_db', {
  retryWrites: true,
  w: 'majority'
});

ffConnection.on('connected', () => {
  console.log('MongoDB (Free Fire) connected');
});

ffConnection.on('error', (err) => {
  console.error('MongoDB (Free Fire) connection error:', err);
});

module.exports = ffConnection;
