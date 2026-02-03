const mongoose = require('mongoose');

const subTopicSchema = new mongoose.Schema({
  title: {
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
subTopicSchema.index({ topicId: 1, isActive: 1, order: 1 }); // Get subtopics by topic sorted by order
subTopicSchema.index({ topicId: 1, difficulty: 1 }); // Filter by topic and difficulty
subTopicSchema.index({ isActive: 1, order: 1 }); // Get active subtopics sorted by order

module.exports = mongoose.model('SubTopic', subTopicSchema);