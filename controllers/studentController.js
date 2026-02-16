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
      const { name, email, password } = req.body;

      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      if (name) student.name = name;
      if (email) student.email = email;
      if (password && password.trim() !== '') student.password = password;
      
      await student.save();

      res.json({ message: 'Student updated successfully', student: { _id: student._id, name: student.name, email: student.email } });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Bulk upload students
  bulkUploadStudents: async (req, res) => {
    try {
      const { defaultPassword, tenantId } = req.body;
      const selectedTenantId = tenantId || req.user.assignedTenants[0];
      
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
            tenant: selectedTenantId
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

      await student.save();
      res.json({ message: 'Coding profiles connected successfully', student });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = studentController;