const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  }
}, {
  timestamps: true
});

// Indexes for API optimization
topicSchema.index({ tenant: 1, isActive: 1, order: 1 });
topicSchema.index({ domain: 1, tenant: 1 });
topicSchema.index({ order: 1 });

module.exports = mongoose.model('Topic', topicSchema);