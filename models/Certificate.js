const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  type: {
    type: String,
    enum: ['Course', 'Workshop', 'Internship', 'Hackathon', 'Other'],
    required: true,
    default: 'Course'
  },
  title: {
    type: String,
    required: true
  },
  duration: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  issueDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  description: {
    type: String,
  },
  skills: [{
    type: String
  }],
  signatureName: {
    type: String,
    required: true,
    default: 'Instructor'
  },
  signatureDesignation: {
    type: String,
    required: true,
    default: 'Authorized Signatory'
  },
  status: {
    type: String,
    enum: ['active', 'revoked'],
    default: 'active'
  }
}, {
  timestamps: true
});

const CertificateCounter = require('./CertificateCounter');

// Create index for efficient lookups by certificateId
certificateSchema.index({ certificateId: 1 });
certificateSchema.index({ student: 1 });
certificateSchema.index({ tenantId: 1 });

certificateSchema.pre('validate', async function(next) {
  if (this.certificateId) return next();

  try {
    const issueDate = this.issueDate || new Date();
    const day = String(issueDate.getDate()).padStart(2, '0');
    const month = String(issueDate.getMonth() + 1).padStart(2, '0');
    const year = issueDate.getFullYear();
    const dateStr = `${day}${month}${year}`; // e.g., 01042026

    // Atomically find, update sequence, or insert for this specific date string
    const counter = await CertificateCounter.findOneAndUpdate(
      { dateStr },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    // Format the number to exactly 5 digits: e.g., 00001
    const seqStr = String(counter.seq).padStart(5, '0');
    
    // Set the OH-DDMMYYYY-XXXXX ID
    this.certificateId = `OH-${dateStr}-${seqStr}`;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Certificate', certificateSchema);
