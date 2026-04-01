const mongoose = require('mongoose');

const certificateCounterSchema = new mongoose.Schema({
  dateStr: {
    type: String,
    required: true,
    unique: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('CertificateCounter', certificateCounterSchema);
