const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const instructorSchema = new mongoose.Schema({
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
    default: 'instructor'
  },
  profile: {
    bio: String,
    expertise: [String],
    experience: Number,
    qualification: String
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  assignedTenants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant'
  }],
  permissions: [{
    type: String,
    enum: ['create_quizzes', 'create_assessments', 'manage_students', 'view_reports']
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

instructorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

instructorSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

instructorSchema.methods.toJSON = function() {
  const instructor = this.toObject();
  delete instructor.password;
  return instructor;
};

module.exports = mongoose.model('Instructor', instructorSchema);