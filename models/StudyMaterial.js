const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: 'Content coming soon...' },
  order: { type: Number, required: true }
});

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  lessons: [lessonSchema],
  order: { type: Number, required: true }
});

const studyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  estimatedDuration: String,
  chapters: [chapterSchema],
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant'
  },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);
