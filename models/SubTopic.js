const mongoose = require('mongoose');

const subTopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
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
subTopicSchema.index({ topicId: 1, isActive: 1, order: 1 });
subTopicSchema.index({ tenant: 1, topicId: 1 });
subTopicSchema.index({ isActive: 1, order: 1 });

module.exports = mongoose.model('SubTopic', subTopicSchema);