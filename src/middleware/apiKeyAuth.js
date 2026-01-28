const Tenant = require('../models/Tenant');
const crypto = require('crypto');
const mongoose = require('mongoose');

// API Key validation middleware
const validateApiKey = async (req, res, next) => {
  try {
    // Ensure database connection
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000
      });
    }

    const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
    
    console.log('API Key validation - Headers:', {
      'x-api-key': req.headers['x-api-key'] ? 'Present' : 'Missing',
      'authorization': req.headers['authorization'] ? 'Present' : 'Missing',
      'received-key': apiKey ? apiKey.substring(0, 8) + '...' : 'None'
    });
    
    if (!apiKey) {
      console.log('API Key validation failed: No API key provided');
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'API key is required' 
      });
    }

    // Hash the provided API key to compare with stored hash
    const hashedKey = crypto.createHash('sha256').update(apiKey).digest('hex');
    console.log('Looking for tenant with hashed key:', hashedKey.substring(0, 16) + '...');
    
    const tenant = await Tenant.findOne({ 
      apiKeyHash: hashedKey,
      isActive: true
    }).maxTimeMS(5000);

    if (!tenant) {
      console.log('API Key validation failed: No matching tenant found');
      // Also try to find by plain API key for debugging
      const tenantByPlainKey = await Tenant.findOne({ apiKey: apiKey }).maxTimeMS(5000);
      if (tenantByPlainKey) {
        console.log('Found tenant by plain key - hash mismatch issue');
      }
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'Invalid or expired API key' 
      });
    }

    console.log('API Key validation successful for tenant:', tenant.name);

    // Update last access
    await Tenant.findByIdAndUpdate(tenant._id, {
      lastAccess: new Date(),
      lastAccessIP: req.ip
    }).maxTimeMS(5000);

    // Attach tenant to request
    req.tenant = tenant;
    req.tenantId = tenant._id;
    
    next();
  } catch (error) {
    console.error('API Key validation error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'API key validation failed' 
    });
  }
};

module.exports = { validateApiKey };