const { validationResult } = require('express-validator');
const Batch = require('../models/Batch');
const Student = require('../models/Student');

const batchController = {
  // Get all batches for tenant
  getAllBatches: async (req, res) => {
    try {
      const { tenantId } = req.query;
      const batches = await Batch.find({ tenant: tenantId }).populate('students', 'name email');
      res.json(batches);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Create new batch
  createBatch: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, description, tenantId } = req.body;
      const finalTenantId = tenantId || req.user.assignedTenants[0];

      const batch = new Batch({
        name,
        description,
        tenant: finalTenantId
      });

      await batch.save();
      res.status(201).json({ message: 'Batch created successfully', batch });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update batch
  updateBatch: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const batch = await Batch.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );

      if (!batch) {
        return res.status(404).json({ message: 'Batch not found' });
      }

      res.json({ message: 'Batch updated successfully', batch });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Delete batch
  deleteBatch: async (req, res) => {
    try {
      const { id } = req.params;
      
      const batch = await Batch.findByIdAndDelete(id);
      if (!batch) {
        return res.status(404).json({ message: 'Batch not found' });
      }

      res.json({ message: 'Batch deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Add students to batch
  addStudentsToBatch: async (req, res) => {
    try {
      const { id } = req.params;
      const { studentIds } = req.body;

      const batch = await Batch.findByIdAndUpdate(
        id,
        { $addToSet: { students: { $each: studentIds } } },
        { new: true }
      ).populate('students', 'name email');

      if (!batch) {
        return res.status(404).json({ message: 'Batch not found' });
      }

      res.json({ message: 'Students added to batch successfully', batch });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Remove students from batch
  removeStudentsFromBatch: async (req, res) => {
    try {
      const { id } = req.params;
      const { studentIds } = req.body;

      const batch = await Batch.findByIdAndUpdate(
        id,
        { $pull: { students: { $in: studentIds } } },
        { new: true }
      ).populate('students', 'name email');

      if (!batch) {
        return res.status(404).json({ message: 'Batch not found' });
      }

      res.json({ message: 'Students removed from batch successfully', batch });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Validate students from Excel file
  validateStudentsFromFile: async (req, res) => {
    try {
      const tenantId = req.user.assignedTenants[0];
      
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Read Excel file
      const XLSX = require('xlsx');
      const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const validStudents = [];
      const nonExistentStudents = [];

      for (const row of data) {
        const name = row.name || row.Name || row.NAME;
        const email = row.email || row.Email || row.EMAIL;
        
        if (!name || !email) continue;

        // Check if student exists in tenant
        const student = await Student.findOne({ email, tenant: tenantId });
        
        if (student) {
          validStudents.push(student);
        } else {
          nonExistentStudents.push({ name, email });
        }
      }

      res.json({
        validStudents,
        nonExistentStudents,
        message: `Found ${validStudents.length} valid students, ${nonExistentStudents.length} not found`
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Upload students to existing batch from Excel file
  uploadStudentsToBatch: async (req, res) => {
    try {
      const { id } = req.params;
      const tenantId = req.user.assignedTenants[0];
      
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Read Excel file
      const XLSX = require('xlsx');
      const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const validStudentIds = [];
      const nonExistentStudents = [];

      for (const row of data) {
        const name = row.name || row.Name || row.NAME;
        const email = row.email || row.Email || row.EMAIL;
        
        if (!name || !email) continue;

        // Check if student exists in tenant
        const student = await Student.findOne({ email, tenant: tenantId });
        
        if (student) {
          validStudentIds.push(student._id);
        } else {
          nonExistentStudents.push({ name, email });
        }
      }

      // Add valid students to batch
      const batch = await Batch.findByIdAndUpdate(
        id,
        { $addToSet: { students: { $each: validStudentIds } } },
        { new: true }
      ).populate('students', 'name email');

      if (!batch) {
        return res.status(404).json({ message: 'Batch not found' });
      }

      res.json({
        batch,
        addedCount: validStudentIds.length,
        nonExistentStudents,
        message: `${validStudentIds.length} students added to batch`
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = batchController;