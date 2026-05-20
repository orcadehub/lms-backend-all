const express = require('express');
const jwt = require('jsonwebtoken');
const Course = require('../models/Course');
const { validateApiKey } = require('../middleware/apiKeyAuth');

const router = express.Router();

// Get all published courses (public)
router.get('/courses', validateApiKey, async (req, res) => {
  try {
    const tenantId = req.tenantId;
    const courses = await Course.find({
      tenant: tenantId,
      isPublished: true,
      isActive: true
    }).select('-termsAndConditions -roadmap');

    // Add enrollment count
    const coursesWithCounts = courses.map(c => {
      const obj = c.toObject();
      obj.totalEnrollments = c.totalEnrollments || 0;
      return obj;
    });

    res.json(coursesWithCounts);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get course detail by courseId (public)
router.get('/courses/:courseId', validateApiKey, async (req, res) => {
  try {
    const tenantId = req.tenantId;
    const { courseId } = req.params;

    const course = await Course.findOne({
      courseId,
      tenant: tenantId,
      isPublished: true,
      isActive: true
    }).populate('batches');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const courseObj = course.toObject();
    courseObj.totalEnrollments = course.totalEnrollments || 0;
    
    // Make sure we have Enrollment model required
    const Enrollment = require('../models/Enrollment');

    // Check if student is enrolled (if token provided)
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
        const studentId = (decoded.studentId || decoded.userId || decoded.id || decoded._id)?.toString();
        
        if (studentId && course.batches && course.batches.length > 0) {
          const batchIds = course.batches.map(b => b._id);
          const enrollment = await Enrollment.findOne({
            student: studentId,
            batch: { $in: batchIds }
          }).populate('student', 'name email profilePic');
          
          if (enrollment) {
            courseObj.isEnrolled = true;
            courseObj.enrollmentData = enrollment;
          } else {
            courseObj.isEnrolled = false;
          }
        } else {
          courseObj.isEnrolled = false;
        }
      } catch (e) {
        courseObj.isEnrolled = false;
      }
    } else {
      courseObj.isEnrolled = false;
    }

    // Only allow enrolled students or admins to see the full enrollment list
    if (courseObj.isEnrolled && course.batches && course.batches.length > 0) {
      const batchIds = course.batches.map(b => b._id);
      const enrollments = await Enrollment.find({
        batch: { $in: batchIds }
      }).populate('student', 'name email profilePic').lean();
      courseObj.enrollments = enrollments;
    }

    res.json(courseObj);
  } catch (error) {
    console.error('Error fetching course detail:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll in a course
router.post('/courses/:courseId/enroll', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Login required to enroll' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId || decoded.userId || decoded.id;
    const tenantId = req.tenantId;
    const { courseId } = req.params;
    const { batchName, agreedToTerms, surname, firstName, lastName, phoneNumber, collegeName, rollNumber } = req.body;

    if (!agreedToTerms) {
      return res.status(400).json({ message: 'You must agree to the Terms and Conditions' });
    }

    const course = await Course.findOne({
      courseId,
      tenant: tenantId,
      isPublished: true,
      isActive: true
    }).populate('batches');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const Enrollment = require('../models/Enrollment');
    const Batch = require('../models/Batch');

    // Check if already enrolled
    let batchIds = [];
    if (course.batches && course.batches.length > 0) {
      batchIds = course.batches.map(b => b._id);
    }
    const existing = await Enrollment.findOne({
      student: studentId,
      batch: { $in: batchIds },
      tenant: tenantId
    });

    if (existing) {
      return res.status(200).json({ 
        message: 'You are already enrolled in this course',
        alreadyEnrolled: true 
      });
    }

    // Find the batch
    const batch = course.batches?.find(b => b.name === batchName && b.isActive);
    if (!batch) {
      return res.status(400).json({ message: 'Selected batch not found or inactive' });
    }

    // Create Enrollment document
    const newEnrollment = new Enrollment({
      student: studentId,
      batch: batch._id,
      tenant: tenantId,
      enrolledAt: new Date(),
      status: 'active',
      agreedToTerms: true,
      surname,
      firstName,
      lastName,
      phoneNumber,
      collegeName,
      rollNumber
    });
    await newEnrollment.save();

    // Add student to Batch
    await Batch.findByIdAndUpdate(batch._id, {
      $addToSet: { students: studentId }
    });

    // Increment course totalEnrollments
    course.totalEnrollments = (course.totalEnrollments || 0) + 1;
    await course.save();

    // Update Student Profile
    const Student = require('../models/Student');
    await Student.findByIdAndUpdate(studentId, {
      'profile.surname': surname,
      'profile.firstName': firstName,
      'profile.lastName': lastName,
      'profile.phone': phoneNumber,
      'profile.collegeName': collegeName,
      'profile.rollNumber': rollNumber
    });

    res.status(201).json({
      message: 'Successfully enrolled!',
      enrollment: {
        courseId: course.courseId,
        courseTitle: course.title,
        batch: batchName,
        enrolledAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get student's enrolled courses
router.get('/my-courses', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Login required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId || decoded.userId || decoded.id;
    const tenantId = req.tenantId;

    const Enrollment = require('../models/Enrollment');
    const enrollments = await Enrollment.find({ student: studentId, tenant: tenantId }).populate('batch');
    const batchIds = enrollments.map(e => e.batch?._id || e.batch);

    const courses = await Course.find({
      tenant: tenantId,
      batches: { $in: batchIds }
    }).select('-termsAndConditions');

    const result = courses.map(c => {
      const obj = c.toObject();
      const courseBatchIds = (c.batches || []).map(b => b.toString());
      const myEnrollment = enrollments.find(e => {
        const eBatchId = e.batch?._id ? e.batch._id.toString() : e.batch.toString();
        return courseBatchIds.includes(eBatchId);
      });
      obj.myEnrollment = myEnrollment;
      obj.totalEnrollments = c.totalEnrollments || 0;
      return obj;
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update enrollment profile
router.put('/courses/:courseId/enrollment', validateApiKey, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Login required' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const studentId = decoded.studentId || decoded.userId || decoded.id;
    const { courseId } = req.params;
    const { surname, firstName, lastName, phoneNumber, collegeName, rollNumber } = req.body;

    const course = await Course.findOne({ courseId, tenant: req.tenantId }).populate('batches');
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const batchIds = course.batches ? course.batches.map(b => b._id) : [];

    const Enrollment = require('../models/Enrollment');
    const enrollment = await Enrollment.findOne({ student: studentId, batch: { $in: batchIds } });

    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

    // Update Enrollment
    enrollment.surname = surname;
    enrollment.firstName = firstName;
    enrollment.lastName = lastName;
    enrollment.phoneNumber = phoneNumber;
    enrollment.collegeName = collegeName;
    enrollment.rollNumber = rollNumber;

    await enrollment.save();

    // Update Student Profile
    const Student = require('../models/Student');
    await Student.findByIdAndUpdate(studentId, {
      'profile.surname': surname,
      'profile.firstName': firstName,
      'profile.lastName': lastName,
      'profile.phone': phoneNumber,
      'profile.collegeName': collegeName,
      'profile.rollNumber': rollNumber
    });

    res.json({ message: 'Profile updated successfully', enrollment });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
