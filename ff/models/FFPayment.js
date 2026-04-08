const ffConnection = require('../config/db');
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'FFUser', required: true },
  tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'FFTournament' },
  gatewayOrderId: { type: String, required: true },
  gatewayPaymentId: { type: String },
  merchantTransactionId: { type: String, unique: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Created', 'Success', 'Failed'], default: 'Created' },
  gateway: { type: String, default: 'Razorpay' }
}, { timestamps: true });

module.exports = ffConnection.model('FFPayment', PaymentSchema);
