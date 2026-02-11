const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true,
    default: 0
  },
  allowedTenants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Company', companySchema);
