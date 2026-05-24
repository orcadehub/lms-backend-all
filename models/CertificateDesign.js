const mongoose = require('mongoose');

const certificateDesignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  designConfig: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for fast querying
certificateDesignSchema.index({ tenantId: 1 });
certificateDesignSchema.index({ createdBy: 1 });

module.exports = mongoose.model('CertificateDesign', certificateDesignSchema);
