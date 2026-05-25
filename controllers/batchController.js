const { validationResult } = require('express-validator');
const Batch = require('../models/Batch');
const Student = require('../models/Student');
const { ensureInstructorTenantAccess, getScopedStudentIds } = require('../utils/studentAccess');

const resolveTenantId = (req, fallback) => req.query.tenantId || req.body.tenantId || req.headers['x-tenant-id'] || fallback || req.user.assignedTenants?.[0];

const assertBatchAccess = async (req, batch) => {
  await ensureInstructorTenantAccess(req.user, batch.tenant);
  return getScopedStudentIds(req.user, batch.tenant);
};

const batchController = {
  // Get all batches for tenant
  getAllBatches: async (req, res) => {
    try {
      const tenantId = resolveTenantId(req);
      await ensureInstructorTenantAccess(req.user, tenantId);
      const scopedStudentIds = await getScopedStudentIds(req.user, tenantId);
      const scopedStudentIdSet = new Set(scopedStudentIds.map((id) => String(id)));

      const batches = await Batch.find({ tenant: tenantId }).populate('students', 'name email institution').lean({ virtuals: true });
      const scopedBatches = batches
        .map((batch) => ({
          ...batch,
          students: (batch.students || []).filter((student) => scopedStudentIdSet.has(String(student._id))),
          enrolledCount: (batch.students || []).filter((student) => scopedStudentIdSet.has(String(student._id))).length
        }));

      res.json(scopedBatches);
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
      const finalTenantId = resolveTenantId(req, tenantId);
      await ensureInstructorTenantAccess(req.user, finalTenantId);

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
      const existing = await Batch.findById(id);
      if (!existing) {
        return res.status(404).json({ message: 'Batch not found' });
      }
      await ensureInstructorTenantAccess(req.user, existing.tenant);

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
      const existing = await Batch.findById(id);
      if (!existing) {
        return res.status(404).json({ message: 'Batch not found' });
      }
      await ensureInstructorTenantAccess(req.user, existing.tenant);

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
      const batchDoc = await Batch.findById(id);
      if (!batchDoc) {
        return res.status(404).json({ message: 'Batch not found' });
      }
      const scopedStudentIds = await assertBatchAccess(req, batchDoc);
      const scopedStudentIdSet = new Set(scopedStudentIds.map((sid) => String(sid)));
      const forbiddenStudentIds = studentIds.filter((sid) => !scopedStudentIdSet.has(String(sid)));
      if (forbiddenStudentIds.length > 0) {
        return res.status(403).json({ message: 'Some students are outside your allowed institutions' });
      }

      const batch = await Batch.findByIdAndUpdate(
        id,
        { $addToSet: { students: { $each: studentIds } } },
        { new: true }
      ).populate('students', 'name email');

      if (!batch) {
        return res.status(404).json({ message: 'Batch not found' });
      }
      batch.students = (batch.students || []).filter((student) => scopedStudentIdSet.has(String(student._id)));

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
      const batchDoc = await Batch.findById(id);
      if (!batchDoc) {
        return res.status(404).json({ message: 'Batch not found' });
      }
      const scopedStudentIds = await assertBatchAccess(req, batchDoc);
      const scopedStudentIdSet = new Set(scopedStudentIds.map((sid) => String(sid)));
      const allowedStudentIds = studentIds.filter((sid) => scopedStudentIdSet.has(String(sid)));

      const batch = await Batch.findByIdAndUpdate(
        id,
        { $pull: { students: { $in: allowedStudentIds } } },
        { new: true }
      ).populate('students', 'name email');

      if (!batch) {
        return res.status(404).json({ message: 'Batch not found' });
      }
      batch.students = (batch.students || []).filter((student) => scopedStudentIdSet.has(String(student._id)));

      res.json({ message: 'Students removed from batch successfully', batch });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Validate students from Excel file
  validateStudentsFromFile: async (req, res) => {
    try {
      const tenantId = resolveTenantId(req);
      await ensureInstructorTenantAccess(req.user, tenantId);
      const scopedStudentIds = await getScopedStudentIds(req.user, tenantId);
      const scopedStudentIdSet = new Set(scopedStudentIds.map((id) => String(id)));
      
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
        
        if (student && scopedStudentIdSet.has(String(student._id))) {
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
      
      // Get batch first to find its tenant
      const batch = await Batch.findById(id);
      if (!batch) {
        return res.status(404).json({ message: 'Batch not found' });
      }
      const scopedStudentIds = await assertBatchAccess(req, batch);
      const scopedStudentIdSet = new Set(scopedStudentIds.map((sid) => String(sid)));
      
      const tenantId = batch.tenant;
      
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
        
        if (student && scopedStudentIdSet.has(String(student._id))) {
          validStudentIds.push(student._id);
        } else {
          nonExistentStudents.push({ name, email });
        }
      }

      // Add valid students to batch
      const updatedBatch = await Batch.findByIdAndUpdate(
        id,
        { $addToSet: { students: { $each: validStudentIds } } },
        { new: true }
      ).populate('students', 'name email');
      updatedBatch.students = (updatedBatch.students || []).filter((student) => scopedStudentIdSet.has(String(student._id)));

      res.json({
        batch: updatedBatch,
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
