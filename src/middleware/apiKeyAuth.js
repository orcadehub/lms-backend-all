const Tenant = require('../models/Tenant');
const crypto = require('crypto');

// API Key validation middleware
const validateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
    
    if (!apiKey) {
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'API key is required' 
      });
    }

    // Hash the provided API key to compare with stored hash
    const hashedKey = crypto.createHash('sha256').update(apiKey).digest('hex');
    
    const tenant = await Tenant.findOne({ 
      apiKeyHash: hashedKey,
      isActive: true
    });

    if (!tenant) {
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'Invalid or expired API key' 
      });
    }

    // Update last access
    await Tenant.findByIdAndUpdate(tenant._id, {
      lastAccess: new Date(),
      lastAccessIP: req.ip
    });

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