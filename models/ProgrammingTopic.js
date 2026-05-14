const mongoose = require('mongoose');

const programmingTopicSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

programmingTopicSchema.index({ order: 1 });
programmingTopicSchema.index({ isActive: 1 });

module.exports = mongoose.model('ProgrammingTopic', programmingTopicSchema);
