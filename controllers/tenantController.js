const multiTenantService = require('../services/multiTenantService');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');
const multer = require('multer');
const path = require('path');

// Configure multer for logo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = process.env.NODE_ENV === 'production' ? '/tmp/uploads/logos/' : 'uploads/logos/';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

const tenantController = {
  // Create new tenant with enhanced security
  createTenant: async (req, res) => {
    try {
      const { name, companyName, adminEmail, domain, allowedDomains, themeColor, logoStyle } = req.body;
      
      const tenant = new Tenant({
        name,
        companyName: companyName || name,
        adminEmail: adminEmail || 'admin@example.com',
        domain,
        apiEndpoint: `${req.protocol}://${req.get('host')}/api`,
        allowedDomains: allowedDomains ? allowedDomains.split(',').map(d => d.trim()) : [],
        themeColor: themeColor || '#1976d2',
        logoUrl: req.file ? `/uploads/logos/${req.file.filename}` : null,
        logoStyle: typeof logoStyle === 'string' ? JSON.parse(logoStyle) : logoStyle,
        settings: {
          allowedOrigins: [domain],
          features: ['quizzes', 'assessments', 'reports'],
          apiUsageLimit: 10000
        }
      });

      await tenant.save();
      
      // Return API key only once
      const response = {
        message: 'Tenant created successfully',
        tenant: {
          ...tenant.toObject(),
          apiKey: tenant.apiKey // Show only once
        }
      };
      
      res.status(201).json(response);
    } catch (error) {
      console.error('Tenant creation error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Regenerate API key
  regenerateApiKey: async (req, res) => {
    try {
      const { id } = req.params;
      
      const tenant = await Tenant.findById(id);
      if (!tenant) {
        return res.status(404).json({ message: 'Tenant not found' });
      }

      const newApiKey = tenant.regenerateApiKey();
      await tenant.save();

      res.json({ 
        message: 'API key regenerated successfully',
        apiKey: newApiKey // Show only once
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get tenant configuration (for frontend)
  getTenantConfig: async (req, res) => {
    try {
      const { domain } = req.query;
      
      if (!domain) {
        return res.status(400).json({ message: 'Domain parameter is required' });
      }
      
      const tenant = await Tenant.findOne({ domain, isActive: true });
      
      if (!tenant) {
        return res.status(404).json({ message: 'Tenant not found for domain' });
      }
      
      // Return only public config data
      res.json({
        tenantId: tenant._id,
        tenantName: tenant.name,
        companyName: tenant.companyName,
        apiKey: tenant.apiKey,
        apiEndpoint: tenant.apiEndpoint,
        domain: tenant.domain,
        logoUrl: tenant.logoUrl,
        faviconUrl: tenant.faviconUrl || tenant.logoUrl,
        themeColor: tenant.themeColor || '#1976d2',
        logoStyle: tenant.logoStyle,
        allowedDomains: tenant.allowedDomains
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get all tenants (admin only)
  getAllTenants: async (req, res) => {
    try {
      const tenants = await Tenant.find().sort({ createdAt: 1 });
      res.json(tenants);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Public client list for OrcadeHub landing (no secrets)
  getPublicClients: async (req, res) => {
    try {
      const clients = await Tenant.find(
        { isActive: true, domain: { $ne: 'orcadehub.com' } },
        { name: 1, domain: 1, logoUrl: 1, faviconUrl: 1, companyName: 1, themeColor: 1 }
      ).sort({ name: 1 });

      res.json(clients);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update tenant (admin only)
  updateTenant: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const tenant = await Tenant.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!tenant) {
        return res.status(404).json({ message: 'Tenant not found' });
      }

      res.json({ message: 'Tenant updated successfully', tenant });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Delete tenant (admin only)
  deleteTenant: async (req, res) => {
    try {
      const { id } = req.params;
      
      const tenant = await Tenant.findByIdAndDelete(id);
      if (!tenant) {
        return res.status(404).json({ message: 'Tenant not found' });
      }

      res.json({ message: 'Tenant deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get instructor's tenants (returns all active tenants for simplicity)
  getInstructorTenants: async (req, res) => {
    try {
      // For MVP/Simplicity: Return all tenants so instructors can access newly created ones
      const tenants = await Tenant.find().sort({ createdAt: 1 });
      res.json(tenants);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get students from all tenant domains
  getAllStudents: async (req, res) => {
    try {
      const students = await multiTenantService.getAllTenantStudents(req.userId);
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Create quiz for multiple tenants
  createQuizForTenants: async (req, res) => {
    try {
      const { quizData, tenantIds } = req.body;
      const results = await multiTenantService.createQuizForTenants(req.userId, quizData, tenantIds);
      res.json({ message: 'Quiz creation completed', results });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = tenantController;