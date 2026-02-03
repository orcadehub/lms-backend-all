const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  videoUrl: String,
  duration: Number, // in minutes
  order: {
    type: Number,
    required: true
  },
  resources: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['pdf', 'video', 'link', 'document']
    }
  }]
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  duration: {
    type: Number, // in weeks
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  thumbnail: String,
  lessons: [lessonSchema],
  enrolledStudents: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0
    }
  }],
  tags: [String],
  isPublished: {
    type: Boolean,
    default: false
  },
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for search
courseSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Additional indexes for API optimization
courseSchema.index({ instructor: 1, isPublished: 1 }); // Get courses by instructor
courseSchema.index({ category: 1, level: 1, isPublished: 1 }); // Filter by category and level
courseSchema.index({ isPublished: 1, 'rating.average': -1 }); // Get published courses sorted by rating
courseSchema.index({ 'enrolledStudents.student': 1 }); // Find courses by enrolled student
courseSchema.index({ price: 1, isPublished: 1 }); // Filter by price
courseSchema.index({ tags: 1, isPublished: 1 }); // Filter by tags

module.exports = mongoose.model('Course', courseSchema);