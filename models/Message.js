const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  batches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batch'
  }],
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
}, {
  timestamps: true
});

// Indexes for query optimization
messageSchema.index({ batches: 1 });
messageSchema.index({ tenant: 1 });

module.exports = mongoose.model('Message', messageSchema);
