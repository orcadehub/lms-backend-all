const mongoose = require('mongoose');

const weekSchema = new mongoose.Schema({
  week: { type: Number, required: true },
  title: { type: String, required: true },
  topics: [String],
  project: { type: String, default: '' }, // Weekend project
  assignment: { type: String, default: '' }, // Weekly assignment
  isAssessmentWeek: { type: Boolean, default: false }
}, { _id: false });

const batchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: Date,
  maxSeats: { type: Number, default: 50 },
  enrolledCount: { type: Number, default: 0 },
  timing: { type: String, default: '6 PM - 9 PM IST' },
  classDays: { type: String, default: 'Mon - Fri' },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
  isActive: { type: Boolean, default: true }
});

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  batch: { type: String, required: true },
  enrolledAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'completed', 'dropped'], default: 'active' },
  progress: { type: Number, default: 0 },
  certificateRequested: { type: Boolean, default: false },
  certificatePaid: { type: Boolean, default: false },
  agreedToTerms: { type: Boolean, default: true }
});

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: String,
  description: {
    type: String,
    required: true
  },
  longDescription: String,
  category: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
    default: 'Beginner'
  },
  duration: {
    weeks: { type: Number, default: 8 },
    hoursPerDay: { type: Number, default: 1 },
    daysPerWeek: { type: Number, default: 5 }
  },
  price: {
    type: Number,
    default: 0
  },
  originalPrice: {
    type: Number,
    default: 0
  },
  isFree: {
    type: Boolean,
    default: false
  },
  currency: {
    type: String,
    default: 'INR'
  },
  icon: String,
  color: { type: String, default: '#6366f1' },
  bgColor: { type: String, default: '#eef2ff' },
  tags: [String],

  // Roadmap: 8 weeks structure
  roadmap: [weekSchema],

  // Batches
  batches: [batchSchema],

  // Enrollments
  enrollments: [enrollmentSchema],

  // What students will learn
  learningOutcomes: [String],

  // Prerequisites
  prerequisites: [String],

  // Technologies covered
  technologies: [String],

  // Terms and conditions
  termsAndConditions: {
    type: String,
    default: `TERMS AND CONDITIONS

1. ENROLLMENT & COMMITMENT
   - By enrolling, you agree to attend all scheduled classes regularly.
   - Students must maintain professional behavior during all sessions.
   - Classes are held Monday to Friday; Saturday & Sunday are reserved for projects and assessments.

2. ATTENDANCE & PARTICIPATION
   - Minimum 80% attendance is required to receive a completion certificate.
   - Active participation in class discussions and assignments is expected.
   - Students who miss more than 20% of sessions without prior notice may be removed.

3. COURSE MATERIALS
   - All course materials, recordings, and resources are for personal use only.
   - Redistribution or sharing of course content is strictly prohibited.
   - Materials remain the intellectual property of Orcadehub Innovations LLP.

4. CERTIFICATE & CHARGES
   - Course completion certificates are available upon successfully finishing the course.
   - To download/receive the certificate, a nominal fee of ₹99 is applicable towards server and platform maintenance charges.
   - This fee is ONLY required if the student wishes to obtain the certificate; it is NOT mandatory.
   - Students who do not wish to pay are NOT obligated to do so — the learning is completely free.

5. CODE OF CONDUCT
   - Students must maintain professional decorum at all times.
   - Harassment, discrimination, or disruptive behavior will result in immediate removal.
   - Respect fellow learners and instructors during all interactions.

6. INTELLECTUAL PROPERTY
   - Projects built during the course belong to the student, but course methodology and curriculum remain with Orcadehub Innovations LLP.
   - Students may showcase projects in their portfolio with proper attribution.

7. REFUND POLICY
   - Free courses: No refund applicable.
   - Paid courses: Refund requests must be made within 7 days of enrollment.
   - Certificate fee (₹99) is non-refundable once paid.

8. MODIFICATIONS
   - Orcadehub Innovations LLP reserves the right to modify course content, schedule, or these terms at any time.
   - Students will be notified of any significant changes via email.

By enrolling in this course, you acknowledge that you have read, understood, and agree to these Terms and Conditions.

© Orcadehub Innovations LLP`
  },

  // Metadata
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  totalEnrollments: {
    type: Number,
    default: 0
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Indexes
courseSchema.index({ courseId: 1 }, { unique: true });
courseSchema.index({ tenant: 1, isPublished: 1, isActive: 1 });
courseSchema.index({ 'enrollments.student': 1 });
courseSchema.index({ category: 1, level: 1 });
courseSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Virtual for active batch count
courseSchema.virtual('activeBatchCount').get(function() {
  return this.batches ? this.batches.filter(b => b.isActive).length : 0;
});

courseSchema.set('toJSON', { virtuals: true });
courseSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Course', courseSchema);