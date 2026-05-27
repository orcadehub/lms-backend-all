const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema({
  subscriptionAmount: {
    type: Number,
    default: 2000, // Amount in paise (2000 = ₹20)
    min: 0
  },
  isFreeAccess: {
    type: Boolean,
    default: false
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    default: null
  }
}, {
  timestamps: true
});

// Ensure only one document exists (singleton pattern)
siteConfigSchema.statics.getConfig = async function() {
  let config = await this.findOne();
  if (!config) {
    config = await this.create({});
  }
  return config;
};

siteConfigSchema.statics.updateConfig = async function(updates, adminId) {
  const config = await this.findOneAndUpdate(
    {},
    { ...updates, updatedBy: adminId },
    { new: true, upsert: true, runValidators: true }
  );
  return config;
};

module.exports = mongoose.model('SiteConfig', siteConfigSchema);
