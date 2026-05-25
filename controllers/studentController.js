const { validationResult } = require('express-validator');
const Student = require('../models/Student');
const Batch = require('../models/Batch');
const Tenant = require('../models/Tenant');
const Assessment = require('../models/Assessment');
const AssessmentAttempt = require('../models/AssessmentAttempt');
const XLSX = require('xlsx');
const multer = require('multer');
const path = require('path');
const { deleteStudentsAndRelatedData } = require('../services/studentDeletionService');
const {
  assertStudentCapacity,
  buildStudentScope,
  ensureInstructorTenantAccess,
  getInstitutionFromEmail
} = require('../utils/studentAccess');

const escapeRegex = (value = '') => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

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
      const { tenantId, institution } = req.query;
      const scope = await buildStudentScope(req.user, tenantId, institution);
      const students = await Student.find(scope).select('-password');
      res.json(students);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || 'Server error', error: error.message });
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
      const institution = getInstitutionFromEmail(email);
      const access = await ensureInstructorTenantAccess(req.user, selectedTenantId, institution);
      await assertStudentCapacity({
        tenantId: selectedTenantId,
        instructorId: req.user.role === 'instructor' ? req.user._id : null,
        grant: access?.grant,
        requestedCount: 1
      });

      // Check if student already exists
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: 'Student already exists' });
      }

      const student = new Student({
        name,
        email,
        password,
        tenant: selectedTenantId,
        institution,
        createdByInstructor: req.user.role === 'instructor' ? req.user._id : undefined
      });

      await student.save();
      res.status(201).json({ message: 'Student created successfully', student });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || 'Server error', error: error.message });
    }
  },

  // Update student
  updateStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, password, tenantId } = req.body;

      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      await ensureInstructorTenantAccess(req.user, tenantId || student.tenant, student.institution || getInstitutionFromEmail(student.email));

      if (name) student.name = name;
      if (password && password.trim() !== '') student.password = password;
      
      await student.save();

      res.json({ message: 'Student updated successfully', student: { _id: student._id, name: student.name, email: student.email } });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || 'Server error', error: error.message });
    }
  },

  // Bulk upload students
  bulkUploadStudents: async (req, res) => {
    try {
      const { defaultPassword, tenantId } = req.body;
      const selectedTenantId = tenantId || req.user.assignedTenants[0];
      const access = await ensureInstructorTenantAccess(req.user, selectedTenantId);
      
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Read Excel file
      const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const validRows = [];
      const failedUploads = [];

      for (const row of data) {
        const name = row.name || row.Name || row.NAME || row.student_name || row['Student Name'];
        const email = row.email || row.Email || row.EMAIL || row.student_email || row['Student Email'];
        const institution = getInstitutionFromEmail(email);
        
        if (!name || !email) {
          failedUploads.push({ name: name || 'N/A', email: email || 'N/A', reason: 'Missing name or email' });
          continue;
        }

        if (access.allowedInstitutions.length > 0 && !access.allowedInstitutions.includes(institution)) {
          failedUploads.push({ name, email, reason: 'Institution is not allowed for this instructor' });
          continue;
        }

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
          failedUploads.push({ name, email, reason: 'Student already exists' });
          continue;
        }

        validRows.push({ name, email, institution });
      }

      await assertStudentCapacity({
        tenantId: selectedTenantId,
        instructorId: req.user.role === 'instructor' ? req.user._id : null,
        grant: access?.grant,
        requestedCount: validRows.length
      });

      let successCount = 0;
      for (const row of validRows) {
        const student = new Student({
          name: row.name,
          email: row.email,
          password: defaultPassword,
          tenant: selectedTenantId,
          institution: row.institution,
          createdByInstructor: req.user.role === 'instructor' ? req.user._id : undefined
        });
        await student.save();
        successCount++;
      }

      res.json({
        message: `Bulk upload completed. ${successCount} students added successfully.`,
        successCount,
        failedUploads
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || 'Server error', error: error.message });
    }
  },

  // Delete student
  deleteStudent: async (req, res) => {
    try {
      res.status(403).json({ message: 'Only admins can delete students' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  adminDeleteStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.findById(id).select('_id');
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      const result = await deleteStudentsAndRelatedData([student._id]);
      res.json({ message: 'Student and related data deleted successfully', result });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  adminDeleteStudentsByBatch: async (req, res) => {
    try {
      const { batchId } = req.params;
      const batch = await Batch.findById(batchId).select('students');
      if (!batch) {
        return res.status(404).json({ message: 'Batch not found' });
      }
      const result = await deleteStudentsAndRelatedData(batch.students || []);
      res.json({ message: 'Batch students and related data deleted successfully', result });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  adminDeleteStudentsByInstitution: async (req, res) => {
    try {
      const { tenantId, institution } = req.params;
      const students = await Student.find({
        tenant: tenantId,
        $or: [
          { institution: institution.toLowerCase() },
          { email: new RegExp(`@${escapeRegex(institution)}$`, 'i') }
        ]
      }).select('_id');
      const result = await deleteStudentsAndRelatedData(students.map((student) => student._id));
      res.json({ message: 'Institution students and related data deleted successfully', result });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  adminDeleteStudentsByTenant: async (req, res) => {
    try {
      const { tenantId } = req.params;
      const students = await Student.find({ tenant: tenantId }).select('_id');
      const result = await deleteStudentsAndRelatedData(students.map((student) => student._id));
      res.json({ message: 'Tenant students and related data deleted successfully', result });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  adminSetBatchAccess: async (req, res) => {
    try {
      const { batchId } = req.params;
      const { blocked } = req.body;
      const batch = await Batch.findByIdAndUpdate(
        batchId,
        { accessBlocked: Boolean(blocked), isActive: !Boolean(blocked) },
        { new: true }
      );
      if (!batch) {
        return res.status(404).json({ message: 'Batch not found' });
      }
      res.json({ message: `Batch access ${blocked ? 'blocked' : 'enabled'} successfully`, batch });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  adminSetInstitutionAccess: async (req, res) => {
    try {
      const { tenantId, institution } = req.params;
      const { blocked } = req.body;
      const update = blocked
        ? { $addToSet: { blockedInstitutions: institution.toLowerCase() } }
        : { $pull: { blockedInstitutions: institution.toLowerCase() } };
      const tenant = await Tenant.findByIdAndUpdate(tenantId, update, { new: true });
      if (!tenant) {
        return res.status(404).json({ message: 'Tenant not found' });
      }
      res.json({ message: `Institution access ${blocked ? 'blocked' : 'enabled'} successfully`, tenant });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  getTenantAnalytics: async (req, res) => {
    try {
      const { tenantId } = req.params;
      const tenant = await Tenant.findById(tenantId).lean();
      if (!tenant) {
        return res.status(404).json({ message: 'Tenant not found' });
      }

      const students = await Student.find({ tenant: tenantId }).select('name email institution isActive').lean();
      const institutions = {};
      students.forEach((student) => {
        const institution = student.institution || getInstitutionFromEmail(student.email) || 'unknown';
        institutions[institution] = institutions[institution] || { name: institution, students: 0, activeStudents: 0, blocked: false };
        institutions[institution].students++;
        if (student.isActive) institutions[institution].activeStudents++;
        institutions[institution].blocked = (tenant.blockedInstitutions || []).includes(institution);
      });

      const [batches, assessments, attempts] = await Promise.all([
        Batch.find({ tenant: tenantId }).select('name students isActive accessBlocked').lean(),
        Assessment.countDocuments({ tenantId }),
        AssessmentAttempt.countDocuments({ tenantId })
      ]);

      res.json({
        tenant,
        metrics: {
          totalStudents: students.length,
          activeStudents: students.filter((student) => student.isActive).length,
          maxStudents: tenant.maxStudents || 0,
          totalInstitutions: Object.keys(institutions).length,
          totalBatches: batches.length,
          blockedBatches: batches.filter((batch) => batch.accessBlocked || !batch.isActive).length,
          totalAssessments: assessments,
          totalAssessmentAttempts: attempts
        },
        institutions: Object.values(institutions).sort((a, b) => a.name.localeCompare(b.name)),
        batches,
        students
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get student profile
  getProfile: async (req, res) => {
    try {
      const student = await Student.findById(req.user.id).select('-password');
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update student profile (for students themselves)
  updateProfile: async (req, res) => {
    try {
      const { name, phone, address, surname, firstName, lastName, collegeName, rollNumber, dateOfBirth } = req.body;
      const student = await Student.findById(req.user.id);

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      if (name) student.name = name;
      
      if (!student.profile) student.profile = {};
      if (phone !== undefined) student.profile.phone = phone;
      if (address !== undefined) student.profile.address = address;
      if (surname !== undefined) student.profile.surname = surname;
      if (firstName !== undefined) student.profile.firstName = firstName;
      if (lastName !== undefined) student.profile.lastName = lastName;
      if (collegeName !== undefined) student.profile.collegeName = collegeName;
      if (rollNumber !== undefined) student.profile.rollNumber = rollNumber;
      if (dateOfBirth !== undefined) student.profile.dateOfBirth = dateOfBirth;

      await student.save();

      res.json({ message: 'Profile updated successfully', student: student.toJSON() });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Connect coding profiles
  connectCodingProfiles: async (req, res) => {
    try {
      const { leetcodeUsername, hackerrankUsername, codechefUsername, codeforcesUsername } = req.body;
      
      const student = await Student.findById(req.user.id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      if (!student.codingProfiles) {
        student.codingProfiles = {};
      }

      // Fetch LeetCode stats
      if (leetcodeUsername) {
        try {
          const leetcodeResponse = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: `
                query {
                  matchedUser(username: "${leetcodeUsername}") {
                    username
                    profile {
                      ranking
                      reputation
                    }
                    submitStats {
                      acSubmissionNum {
                        difficulty
                        count
                      }
                    }
                  }
                }
              `
            })
          });
          const leetcodeData = await leetcodeResponse.json();
          const userData = leetcodeData?.data?.matchedUser;
          
          if (userData) {
            const submissions = userData.submitStats?.acSubmissionNum || [];
            const totalSolved = submissions.find(s => s.difficulty === 'All')?.count || 0;
            const easySolved = submissions.find(s => s.difficulty === 'Easy')?.count || 0;
            const mediumSolved = submissions.find(s => s.difficulty === 'Medium')?.count || 0;
            const hardSolved = submissions.find(s => s.difficulty === 'Hard')?.count || 0;
            
            student.codingProfiles.leetcode = {
              username: leetcodeUsername,
              connected: true,
              totalSolved,
              easySolved,
              mediumSolved,
              hardSolved,
              ranking: userData.profile?.ranking || 0,
              reputation: userData.profile?.reputation || 0,
              acceptanceRate: 0,
              lastSynced: new Date()
            };
          }
        } catch (error) {
          console.error('LeetCode fetch error:', error);
          student.codingProfiles.leetcode = {
            username: leetcodeUsername,
            connected: true,
            totalSolved: 0,
            easySolved: 0,
            mediumSolved: 0,
            hardSolved: 0,
            ranking: 0,
            reputation: 0,
            acceptanceRate: 0,
            lastSynced: new Date()
          };
        }
      }

      // Fetch Codeforces stats
      if (codeforcesUsername) {
        try {
          const [userResponse, statusResponse] = await Promise.all([
            fetch(`https://codeforces.com/api/user.info?handles=${codeforcesUsername}`),
            fetch(`https://codeforces.com/api/user.status?handle=${codeforcesUsername}`)
          ]);
          
          const userData = await userResponse.json();
          const statusData = await statusResponse.json();
          
          if (userData.status === 'OK' && statusData.status === 'OK') {
            const user = userData.result[0];
            const solvedProblems = new Set();
            
            statusData.result.forEach(submission => {
              if (submission.verdict === 'OK') {
                solvedProblems.add(`${submission.problem.contestId}-${submission.problem.index}`);
              }
            });
            
            student.codingProfiles.codeforces = {
              username: codeforcesUsername,
              connected: true,
              totalSolved: solvedProblems.size,
              rating: user.rating || 0,
              rank: user.rank || 'unrated',
              maxRating: user.maxRating || 0,
              lastSynced: new Date()
            };
          }
        } catch (error) {
          console.error('Codeforces fetch error:', error);
          student.codingProfiles.codeforces = {
            username: codeforcesUsername,
            connected: true,
            totalSolved: 0,
            rating: 0,
            rank: 'unrated',
            maxRating: 0,
            lastSynced: new Date()
          };
        }
      }

      if (hackerrankUsername) {
        try {
          const hrResponse = await fetch(`https://www.hackerrank.com/rest/hackers/${hackerrankUsername}/badges`);
          const hrData = await hrResponse.json();
          
          if (hrData.status && hrData.models) {
            let totalSolved = 0;
            let badges = 0;
            
            hrData.models.forEach(model => {
              if (model.solved) totalSolved += model.solved;
              if (model.stars) badges += model.stars;
            });
            
            student.codingProfiles.hackerrank = {
              username: hackerrankUsername,
              connected: true,
              totalSolved,
              badges,
              rank: 'N/A',
              score: 0,
              lastSynced: new Date()
            };
          } else {
            student.codingProfiles.hackerrank = {
              username: hackerrankUsername,
              connected: true,
              totalSolved: 0,
              badges: 0,
              rank: 'N/A',
              score: 0,
              lastSynced: new Date()
            };
          }
        } catch (error) {
          console.error('HackerRank fetch error:', error);
          student.codingProfiles.hackerrank = {
            username: hackerrankUsername,
            connected: true,
            totalSolved: 0,
            badges: 0,
            rank: 'N/A',
            score: 0,
            lastSynced: new Date()
          };
        }
      }

      // Fetch CodeChef stats
      if (codechefUsername) {
        try {
          const ccResponse = await fetch(`https://codechef-api.vercel.app/${codechefUsername}`);
          const ccData = await ccResponse.json();
          
          if (ccData.success) {
            student.codingProfiles.codechef = {
              username: codechefUsername,
              connected: true,
              rating: ccData.currentRating || 0,
              globalRank: ccData.globalRank || 0,
              stars: ccData.stars || '0★',
              lastSynced: new Date()
            };
          } else {
            student.codingProfiles.codechef = {
              username: codechefUsername,
              connected: true,
              rating: 0,
              globalRank: 0,
              stars: '0★',
              lastSynced: new Date()
            };
          }
        } catch (error) {
          console.error('CodeChef fetch error:', error);
          student.codingProfiles.codechef = {
            username: codechefUsername,
            connected: true,
            rating: 0,
            globalRank: 0,
            stars: '0★',
            lastSynced: new Date()
          };
        }
      }

      student.markModified('codingProfiles');
      await student.save();
      res.json({ message: 'Coding profiles connected successfully', student });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Bulk reset passwords for all students in a tenant
  bulkResetPasswords: async (req, res) => {
    try {
      const { tenantId, newPassword } = req.body;
      const selectedTenantId = tenantId || req.user.assignedTenants[0];
      await ensureInstructorTenantAccess(req.user, selectedTenantId);

      if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }

      const scope = await buildStudentScope(req.user, selectedTenantId);
      const students = await Student.find(scope);
      
      if (students.length === 0) {
        return res.status(404).json({ message: 'No students found for this tenant' });
      }

      // We use save() in a loop to trigger the password hashing pre-save hook
      for (const student of students) {
        student.password = newPassword;
        await student.save();
      }

      res.json({ message: `Successfully reset passwords for ${students.length} students.` });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || 'Server error', error: error.message });
    }
  },

  // Toggle DSA solved status for a user
  toggleDSASolved: async (req, res) => {
    try {
      const { title } = req.body;
      if (!title) return res.status(400).json({ message: 'Title is required' });

      const student = await Student.findById(req.user.id);
      if (!student) return res.status(404).json({ message: 'Student not found' });

      if (!student.selfSolvedDSA) {
        student.selfSolvedDSA = [];
      }

      const index = student.selfSolvedDSA.indexOf(title);
      if (index === -1) {
        student.selfSolvedDSA.push(title);
      } else {
        student.selfSolvedDSA.splice(index, 1);
      }

      await student.save();
      res.json({ success: true, selfSolvedDSA: student.selfSolvedDSA });
    } catch (error) {
      console.error('toggleDSASolved error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = studentController;
