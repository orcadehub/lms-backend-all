const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Partner = require('../models/Partner');
const Client = require('../models/Client');

// ============ AUTH MIDDLEWARE ============
const partnerAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    const partner = await Partner.findById(decoded.partnerId).select('-password');
    if (!partner || !partner.isActive) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    req.partner = partner;
    req.partnerId = partner._id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.partner.role !== 'partner_admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// ============ AUTH ROUTES ============

// Register a partner (public — requires admin verification)
router.post('/register', async (req, res) => {
  try {
    const {
      name, email, password, phone, dateOfBirth, gender,
      address, aadhaarNumber, panNumber, bankDetails,
      region, experience, previousOrganization, termsAccepted
    } = req.body;

    if (!termsAccepted) {
      return res.status(400).json({ message: 'You must accept the Terms & Conditions to register' });
    }

    const existing = await Partner.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const partner = new Partner({
      name, email, password, phone, dateOfBirth, gender,
      address, aadhaarNumber, panNumber, bankDetails,
      region, experience, previousOrganization,
      termsAccepted: true,
      termsAcceptedAt: new Date(),
      role: 'partner',
      isVerified: false
    });
    await partner.save();

    res.status(201).json({
      message: 'Registration successful! Your account is under review. You will be able to login once an admin verifies your account.',
      partner: partner.toJSON()
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const partner = await Partner.findOne({ email });
    if (!partner) return res.status(400).json({ message: 'Invalid credentials' });
    if (!partner.isActive) return res.status(403).json({ message: 'Account is deactivated. Contact admin.' });
    if (!partner.isVerified) {
      return res.status(403).json({ message: 'Your account is pending verification by admin. Please wait for approval.' });
    }

    const isMatch = await partner.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { partnerId: partner._id, role: partner.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.json({ token, partner: partner.toJSON() });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current partner profile
router.get('/me', partnerAuth, (req, res) => {
  res.json({ partner: req.partner });
});

// ============ CLIENT ROUTES ============

// Get all clients
router.get('/clients', partnerAuth, async (req, res) => {
  try {
    const { product } = req.query;
    if (!product) return res.status(400).json({ message: 'Product is required' });
    
    const clients = await Client.find({ partnerId: req.partnerId, product }).sort({ lastUpdated: -1 });
    res.json({ clients });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a new client
router.post('/clients', partnerAuth, async (req, res) => {
  try {
    const { product } = req.body;
    if (!product) return res.status(400).json({ message: 'Product is required' });
    if (!req.partner.allowedProducts.includes(product)) {
      return res.status(403).json({ message: 'You do not have permission for this product' });
    }

    const client = new Client({
      ...req.body,
      partnerId: req.partnerId,
      lastUpdated: new Date()
    });

    await client.save();
    res.status(201).json({ client });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: 'Client with this name already exists' });
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a client
router.put('/clients/:id', partnerAuth, async (req, res) => {
  try {
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id, partnerId: req.partnerId },
      { ...req.body, lastUpdated: new Date() },
      { new: true }
    );
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json({ client });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a client
router.delete('/clients/:id', partnerAuth, async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({ _id: req.params.id, partnerId: req.partnerId });
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Get my stats
router.get('/stats/my', partnerAuth, async (req, res) => {
  try {
    const { product } = req.query;
    const query = { partnerId: req.partnerId };
    if (product) query.product = product;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const clients = await Client.find(query);

    const monthlyClients = clients.filter(c => c.lastUpdated >= startOfMonth && c.lastUpdated <= endOfMonth);

    const monthlyStats = {
      totalClientsVisited: monthlyClients.length,
      totalUsersApproached: monthlyClients.reduce((s, c) => s + (c.usersInterested || 0), 0),
      totalUsersJoined: monthlyClients.reduce((s, c) => s + (c.usersJoined || 0), 0),
      totalCallsMade: monthlyClients.reduce((s, c) => s + (c.callsMade || 0), 0),
      totalDemos: monthlyClients.reduce((s, c) => s + (c.demosGiven || 0), 0),
      totalMeetings: monthlyClients.reduce((s, c) => s + (c.meetingsScheduled || 0), 0),
      totalRevenue: monthlyClients.reduce((s, c) => s + (c.revenue || 0), 0),
      daysReported: new Set(monthlyClients.map(c => new Date(c.lastUpdated).toDateString())).size
    };

    const allTimeStats = {
      totalClientsVisited: clients.length,
      totalUsersApproached: clients.reduce((s, c) => s + (c.usersInterested || 0), 0),
      totalUsersJoined: clients.reduce((s, c) => s + (c.usersJoined || 0), 0),
      totalCallsMade: clients.reduce((s, c) => s + (c.callsMade || 0), 0),
      totalDemos: clients.reduce((s, c) => s + (c.demosGiven || 0), 0),
      totalRevenue: clients.reduce((s, c) => s + (c.revenue || 0), 0),
      daysReported: new Set(clients.map(c => new Date(c.lastUpdated).toDateString())).size
    };

    res.json({ monthlyStats, allTimeStats, target: req.partner.target });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ============ ADMIN ROUTES ============

// Get all partners (admin)
router.get('/admin/partners', partnerAuth, adminOnly, async (req, res) => {
  try {
    const partners = await Partner.find({ role: 'partner' }).select('-password').sort({ createdAt: -1 });
    res.json({ partners });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create partner (admin) — auto-verified
router.post('/admin/partners', partnerAuth, adminOnly, async (req, res) => {
  try {
    const { name, email, password, phone, region, role, target } = req.body;
    const existing = await Partner.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const partner = new Partner({
      name, email, password, phone, region,
      role: role || 'partner', target,
      isVerified: true,
      verifiedBy: req.partnerId,
      verifiedAt: new Date()
    });
    await partner.save();
    res.status(201).json({ partner: partner.toJSON() });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Verify partner (admin)
router.patch('/admin/partners/:id/verify', partnerAuth, adminOnly, async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    partner.isVerified = true;
    partner.verifiedBy = req.partnerId;
    partner.verifiedAt = new Date();
    partner.rejectionReason = '';
    await partner.save();
    res.json({ partner: partner.toJSON() });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Reject partner verification (admin)
router.patch('/admin/partners/:id/reject', partnerAuth, adminOnly, async (req, res) => {
  try {
    const { reason } = req.body;
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    partner.isVerified = false;
    partner.rejectionReason = reason || 'Verification rejected by admin';
    await partner.save();
    res.json({ partner: partner.toJSON() });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle partner status (admin)
router.patch('/admin/partners/:id/toggle', partnerAuth, adminOnly, async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    partner.isActive = !partner.isActive;
    await partner.save();
    res.json({ partner: partner.toJSON() });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin dashboard stats
router.get('/admin/dashboard', partnerAuth, adminOnly, async (req, res) => {
  try {
    const { product } = req.query;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const totalPartners = await Partner.countDocuments({ role: 'partner' });
    const activePartners = await Partner.countDocuments({ isActive: true, role: 'partner' });

    const productQuery = product ? { product } : {};
    
    const clients = await Client.find(productQuery);
    
    const todayUpdates = clients.filter(c => c.lastUpdated >= today).length;
    const pendingApprovals = 0;

    const monthlyClients = clients.filter(c => c.lastUpdated >= startOfMonth && c.lastUpdated <= endOfMonth);

    const monthlyAgg = {
      totalClientsVisited: monthlyClients.length,
      totalUsersApproached: monthlyClients.reduce((s, c) => s + (c.usersInterested || 0), 0),
      totalUsersJoined: monthlyClients.reduce((s, c) => s + (c.usersJoined || 0), 0),
      totalCallsMade: monthlyClients.reduce((s, c) => s + (c.callsMade || 0), 0),
      totalDemos: monthlyClients.reduce((s, c) => s + (c.demosGiven || 0), 0),
      totalRevenue: monthlyClients.reduce((s, c) => s + (c.revenue || 0), 0)
    };

    // Per-partner performance
    const partners = await Partner.find({ role: 'partner' }).select('name email region target allowedProducts');
    const partnerPerformance = await Promise.all(partners.map(async (p) => {
      const partnerClients = monthlyClients.filter(c => c.partnerId.toString() === p._id.toString());
      return {
        partner: p,
        clients: partnerClients.length,
        usersApproached: partnerClients.reduce((s, c) => s + (c.usersInterested || 0), 0),
        usersJoined: partnerClients.reduce((s, c) => s + (c.usersJoined || 0), 0),
        calls: partnerClients.reduce((s, c) => s + (c.callsMade || 0), 0),
        demos: partnerClients.reduce((s, c) => s + (c.demosGiven || 0), 0),
        revenue: partnerClients.reduce((s, c) => s + (c.revenue || 0), 0),
        daysReported: new Set(partnerClients.map(c => new Date(c.lastUpdated).toDateString())).size,
        lastUpdate: partnerClients.length > 0 ? partnerClients[0].lastUpdated : null
      };
    }));

    // Last 7 days trend
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const dayEnd = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
      
      const dayClients = clients.filter(c => c.lastUpdated >= dayStart && c.lastUpdated <= dayEnd);
      last7Days.push({
        date: dayStart.toISOString().split('T')[0],
        clients: dayClients.length,
        users: dayClients.reduce((s, c) => s + (c.usersJoined || 0), 0),
        calls: dayClients.reduce((s, c) => s + (c.callsMade || 0), 0),
        revenue: dayClients.reduce((s, c) => s + (c.revenue || 0), 0)
      });
    }

    res.json({
      totalPartners,
      activePartners,
      todayUpdates,
      pendingApprovals,
      monthlyAgg,
      partnerPerformance,
      last7Days
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
