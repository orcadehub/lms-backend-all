const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for API optimization
topicSchema.index({ isActive: 1, order: 1 }); // Get active topics sorted by order
topicSchema.index({ difficulty: 1, isActive: 1 }); // Filter by difficulty
topicSchema.index({ order: 1 }); // Sort by order

module.exports = mongoose.model('Topic', topicSchema);