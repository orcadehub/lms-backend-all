const { validationResult } = require('express-validator');
const Student = require('../models/Student');
const XLSX = require('xlsx');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.xlsx' || ext === '.xls') {
      cb(null, true);
    } else {
      cb(new Error('Only Excel files are allowed'), false);
    }
  }
});

const studentController = {
  // Get all students for instructor's selected tenant
  getAllStudents: async (req, res) => {
    try {
      const { tenantId } = req.query;
      const students = await Student.find({ tenant: tenantId }).select('-password');
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Create new student
  createStudent: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, tenantId } = req.body;
      const selectedTenantId = tenantId || req.user.assignedTenants[0]; // Use provided tenantId or fallback to first assigned tenant

      // Check if student already exists
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: 'Student already exists' });
      }

      const student = new Student({
        name,
        email,
        password,
        tenant: selectedTenantId
      });

      await student.save();
      res.status(201).json({ message: 'Student created successfully', student });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update student
  updateStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const { password } = req.body;

      if (!password || password.trim() === '') {
        return res.status(400).json({ message: 'Password is required' });
      }

      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      student.password = password;
      await student.save();

      res.json({ message: 'Student updated successfully', student: { _id: student._id, name: student.name, email: student.email } });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Bulk upload students
  bulkUploadStudents: async (req, res) => {
    try {
      const { defaultPassword } = req.body;
      const tenantId = req.user.assignedTenants[0];
      
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Read Excel file
      const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const failedUploads = [];
      const successCount = { count: 0 };

      for (const row of data) {
        try {
          // Handle different case variations of column names
          const name = row.name || row.Name || row.NAME || row.student_name || row['Student Name'];
          const email = row.email || row.Email || row.EMAIL || row.student_email || row['Student Email'];
          
          if (!name || !email) {
            failedUploads.push({ name: name || 'N/A', email: email || 'N/A', reason: 'Missing name or email' });
            continue;
          }

          // Check if student already exists
          const existingStudent = await Student.findOne({ email });
          if (existingStudent) {
            failedUploads.push({ name, email, reason: 'Student already exists' });
            continue;
          }

          const student = new Student({
            name,
            email,
            password: defaultPassword,
            tenant: tenantId
          });

          await student.save();
          successCount.count++;
        } catch (error) {
          failedUploads.push({ name: row.name || 'N/A', email: row.email || 'N/A', reason: error.message });
        }
      }

      res.json({
        message: `Bulk upload completed. ${successCount.count} students added successfully.`,
        successCount: successCount.count,
        failedUploads
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Delete student
  deleteStudent: async (req, res) => {
    try {
      const { id } = req.params;
      
      const student = await Student.findByIdAndDelete(id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      res.json({ message: 'Student deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = studentController;