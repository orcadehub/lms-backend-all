const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    default: 'student'
  },
  profile: {
    dateOfBirth: Date,
    phone: String,
    address: String,
    batch: [String],
    profilePic: String
  },
  codingProfiles: {
    leetcode: {
      username: { type: String, unique: true, sparse: true },
      connected: { type: Boolean, default: false },
      totalSolved: { type: Number, default: 0 },
      easySolved: { type: Number, default: 0 },
      mediumSolved: { type: Number, default: 0 },
      hardSolved: { type: Number, default: 0 },
      ranking: { type: Number, default: 0 },
      acceptanceRate: { type: Number, default: 0 },
      reputation: { type: Number, default: 0 },
      lastSynced: Date
    },
    hackerrank: {
      username: { type: String, unique: true, sparse: true },
      connected: { type: Boolean, default: false },
      totalSolved: { type: Number, default: 0 },
      badges: { type: Number, default: 0 },
      rank: String,
      score: { type: Number, default: 0 },
      lastSynced: Date
    },
    codeforces: {
      username: { type: String, unique: true, sparse: true },
      connected: { type: Boolean, default: false },
      totalSolved: { type: Number, default: 0 },
      rating: { type: Number, default: 0 },
      rank: String,
      maxRating: { type: Number, default: 0 },
      lastSynced: Date
    }
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  enrolledCourses: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
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
  quizResults: [{
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz'
    },
    score: Number,
    completedAt: Date
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for login optimization
studentSchema.index({ email: 1, tenant: 1 }); // Compound index for multi-tenant login
studentSchema.index({ tenant: 1, isActive: 1 }); // Index for active students by tenant

studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

studentSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

studentSchema.methods.toJSON = function() {
  const student = this.toObject();
  delete student.password;
  return student;
};

module.exports = mongoose.model('Student', studentSchema);