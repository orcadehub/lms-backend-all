const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner', required: true },
  product: { type: String, required: true },
  clientName: { type: String, required: true, trim: true },
  location: { type: String, trim: true },
  contactPerson: { type: String, trim: true },
  contactPhone: { type: String, trim: true },
  contactEmail: { type: String, trim: true },
  department: { type: String, trim: true },
  usersInterested: { type: Number, default: 0 },
  usersJoined: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['visited', 'interested', 'follow_up', 'converted', 'rejected'],
    default: 'visited'
  },
  callsMade: { type: Number, default: 0 },
  demosGiven: { type: Number, default: 0 },
  meetingsScheduled: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  notes: { type: String },
  followUpDate: { type: Date }
}, { timestamps: true });

clientSchema.index({ partnerId: 1, product: 1, clientName: 1 }, { unique: true });

const { getPartnersDb } = require('../config/partnersDb');
const partnersDb = getPartnersDb();
module.exports = partnersDb.model('Client', clientSchema);


