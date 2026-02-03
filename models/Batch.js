const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for API optimization
batchSchema.index({ tenant: 1, isActive: 1 }); // Get active batches by tenant
batchSchema.index({ students: 1 }); // Find batches for specific student
batchSchema.index({ name: 1, tenant: 1 }); // Find batch by name within tenant

module.exports = mongoose.model('Batch', batchSchema);