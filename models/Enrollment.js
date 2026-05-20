const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  student:   { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  batch:     { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },

  // Replicated fields from the old enrollment sub‑doc
  status:          { type: String, enum: ['active','completed','dropped'], default: 'active' },
  progress:        { type: Number, default: 0 },
  enrolledAt:      { type: Date, default: Date.now },
  certificateRequested: { type: Boolean, default: false },
  certificatePaid:      { type: Boolean, default: false },

  // Optional personal details (kept for backwards compatibility)
  surname:     String,
  firstName:   String,
  lastName:    String,
  phoneNumber: String,
  collegeName: String,
  rollNumber:  String,

  tenant:   { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true }
},
{ timestamps: true });

// Indexes for fast look‑ups
enrollmentSchema.index({ student: 1, batch: 1, tenant: 1 });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
