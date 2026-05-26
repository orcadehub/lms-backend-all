const { validationResult } = require('express-validator');
const Instructor = require('../models/Instructor');
const { normalizeTenantPermissions } = require('../utils/studentAccess');

const instructorController = {
  // Get all instructors
  getAllInstructors: async (req, res) => {
    try {
      const instructors = await Instructor.find()
        .populate('assignedTenants', 'name domain maxStudents blockedInstitutions')
        .populate('tenantPermissions.tenant', 'name domain')
        .select('-password');
      res.json(instructors);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Create new instructor
  createInstructor: async (req, res) => {
    try {
      console.log('Creating instructor with data:', req.body);
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, expertise, permissions, assignedTenants, tenantPermissions } = req.body;
      const normalizedAssignedTenants = Array.isArray(assignedTenants) ? assignedTenants : [];

      // Check if instructor already exists
      const existingInstructor = await Instructor.findOne({ email });
      if (existingInstructor) {
        return res.status(400).json({ message: 'Instructor already exists' });
      }

      const instructor = new Instructor({
        name,
        email,
        password,
        profile: { expertise: Array.isArray(expertise) ? expertise : [expertise] },
        permissions: Array.isArray(permissions) ? permissions : [],
        assignedTenants: normalizedAssignedTenants,
        tenantPermissions: normalizeTenantPermissions(tenantPermissions, normalizedAssignedTenants)
      });

      await instructor.save();
      res.status(201).json({ message: 'Instructor created successfully', instructor });
    } catch (error) {
      console.error('Error creating instructor:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update instructor
  updateInstructor: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, expertise, permissions, assignedTenants, tenantPermissions } = req.body;
      const normalizedAssignedTenants = Array.isArray(assignedTenants) ? assignedTenants : [];

      const instructor = await Instructor.findByIdAndUpdate(
        id,
        {
          name,
          email,
          'profile.expertise': expertise,
          permissions,
          assignedTenants: normalizedAssignedTenants,
          tenantPermissions: normalizeTenantPermissions(tenantPermissions, normalizedAssignedTenants)
        },
        { new: true }
      ).populate('assignedTenants', 'name domain maxStudents blockedInstitutions')
        .populate('tenantPermissions.tenant', 'name domain')
        .select('-password');

      if (!instructor) {
        return res.status(404).json({ message: 'Instructor not found' });
      }

      res.json({ message: 'Instructor updated successfully', instructor });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Delete instructor
  deleteInstructor: async (req, res) => {
    try {
      const { id } = req.params;
      
      const instructor = await Instructor.findByIdAndDelete(id);
      if (!instructor) {
        return res.status(404).json({ message: 'Instructor not found' });
      }

      res.json({ message: 'Instructor deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Proxy payout details from internal.campuscredentials.com
  getPayoutDetails: async (req, res) => {
    try {
      const { m, y, t_id } = req.body;
      
      if (!m || !y || !t_id) {
        return res.status(400).json({ message: 'Month (m), Year (y), and Trainer ID (t_id) are required.' });
      }

      // We use native fetch to call the API
      const response = await fetch('https://internal.campuscredentials.com/trainer/my_monthly_payout.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=fetch_payout_ajax&m=${encodeURIComponent(m)}&y=${encodeURIComponent(y)}&t_id=${encodeURIComponent(t_id)}`
      });

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching payout details:', error);
      res.status(500).json({ message: 'Failed to fetch payout data from campuscredentials', error: error.message });
    }
  }
};

module.exports = instructorController;
