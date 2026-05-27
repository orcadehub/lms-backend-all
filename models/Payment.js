const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  merchantOrderId: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number, // in paise (e.g. 1000 paise = 10 Rs), or 0 for free
    required: true
  },
  status: {
    type: String,
    enum: ['SUCCESS', 'FAILED', 'PENDING'],
    default: 'PENDING'
  },
  type: {
    type: String,
    enum: ['free', 'paid'],
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
