const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const partnerSchema = new mongoose.Schema({
  // Personal Info
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', ''],
    default: ''
  },

  // Address
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true }
  },

  // Identity (KYC)
  aadhaarNumber: {
    type: String,
    trim: true
  },
  panNumber: {
    type: String,
    trim: true,
    uppercase: true
  },

  // Bank Details
  bankDetails: {
    accountHolderName: { type: String, trim: true },
    accountNumber: { type: String, trim: true },
    ifscCode: { type: String, trim: true, uppercase: true },
    bankName: { type: String, trim: true }
  },

  // Professional Info
  role: {
    type: String,
    enum: ['partner', 'partner_admin'],
    default: 'partner'
  },
  allowedProducts: [{
    type: String,
    enum: ['ORCODE', 'ORCAMAIL', 'SHIPNGO'],
    default: ['ORCODE']
  }],
  region: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  previousOrganization: {
    type: String,
    trim: true
  },

  // Agreement
  termsAccepted: {
    type: Boolean,
    default: false
  },
  termsAcceptedAt: {
    type: Date
  },

  // Status
  avatar: {
    type: String,
    default: ''
  },
  target: {
    monthlyClients: { type: Number, default: 4 },
    monthlyUsers: { type: Number, default: 2500 }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner'
  },
  verifiedAt: {
    type: Date
  },
  rejectionReason: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

partnerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

partnerSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const { getPartnersDb } = require('../config/partnersDb');

partnerSchema.methods.toJSON = function() {
  const partner = this.toObject();
  delete partner.password;
  return partner;
};

const partnersDb = getPartnersDb();
module.exports = partnersDb.model('Partner', partnerSchema);

