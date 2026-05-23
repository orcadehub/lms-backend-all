const mongoose = require('mongoose');

const lmsRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    whatsapp: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    tenantDomain: { type: String, trim: true },
    tenantName: { type: String, trim: true },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'closed'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

lmsRequestSchema.index({ createdAt: -1 });
lmsRequestSchema.index({ status: 1 });
lmsRequestSchema.index({ tenantDomain: 1 });

module.exports = mongoose.model('LmsRequest', lmsRequestSchema);
