const mongoose = require('mongoose');
const crypto = require('crypto');

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  adminEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  domain: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  apiEndpoint: {
    type: String,
    required: true
  },
  apiKey: {
    type: String,
    unique: true
  },
  apiKeyHash: {
    type: String,
    unique: true
  },
  apiKeyExpiry: {
    type: Date,
    default: null
  },
  logoUrl: {
    type: String,
    trim: true
  },
  themeColor: {
    type: String,
    default: '#1976d2'
  },
  allowedDomains: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastAccess: {
    type: Date
  },
  lastAccessIP: {
    type: String
  },
  instructors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor'
  }],
  settings: {
    allowedOrigins: [String],
    features: [String],
    apiUsageLimit: {
      type: Number,
      default: 10000
    }
  }
}, {
  timestamps: true
});

// Generate API key before saving
tenantSchema.pre('save', function(next) {
  if (this.isNew && !this.apiKey) {
    this.apiKey = crypto.randomBytes(32).toString('hex');
    this.apiKeyHash = crypto.createHash('sha256').update(this.apiKey).digest('hex');
  } else if (this.isModified('apiKey') && this.apiKey) {
    this.apiKeyHash = crypto.createHash('sha256').update(this.apiKey).digest('hex');
  }
  next();
});

// Method to regenerate API key
tenantSchema.methods.regenerateApiKey = function() {
  this.apiKey = crypto.randomBytes(32).toString('hex');
  this.apiKeyHash = crypto.createHash('sha256').update(this.apiKey).digest('hex');
  return this.apiKey;
};

module.exports = mongoose.model('Tenant', tenantSchema);