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
    }).select('-enrollments -termsAndConditions -roadmap');

    // Add enrollment count
    const coursesWithCounts = courses.map(c => {
      const obj = c.toObject();
      obj.totalEnrollments = c.enrollments ? c.enrollments.length : c.totalEnrollments || 0;
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
      });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const courseObj = course.toObject();
    courseObj.totalEnrollments = course.enrollments ? course.enrollments.length : course.totalEnrollments || 0;

    // Check if student is enrolled (if token provided)
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
        const studentId = decoded.studentId || decoded.userId || decoded.id;
        const enrollment = course.enrollments?.find(
          e => e.student.toString() === studentId
        );
        courseObj.isEnrolled = !!enrollment;
        courseObj.enrollmentData = enrollment || null;
      } catch {
        courseObj.isEnrolled = false;
      }
    } else {
      courseObj.isEnrolled = false;
    }

    // Remove raw enrollments array from response
    delete courseObj.enrollments;

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
    const { batchName, agreedToTerms } = req.body;

    if (!agreedToTerms) {
      return res.status(400).json({ message: 'You must agree to the Terms and Conditions' });
    }

    const course = await Course.findOne({
      courseId,
      tenant: tenantId,
      isPublished: true,
      isActive: true
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const existing = course.enrollments?.find(
      e => e.student.toString() === studentId
    );
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

    // Check batch capacity
    if (batch.enrolledCount >= batch.maxSeats) {
      return res.status(400).json({ message: 'This batch is full. Please select another batch.' });
    }

    // Add enrollment
    course.enrollments.push({
      student: studentId,
      batch: batchName,
      enrolledAt: new Date(),
      status: 'active',
      agreedToTerms: true
    });

    // Increment batch enrolled count
    batch.enrolledCount += 1;
    course.totalEnrollments = course.enrollments.length;

    await course.save();

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

    const courses = await Course.find({
      tenant: tenantId,
      'enrollments.student': studentId
    }).select('-termsAndConditions');

    const result = courses.map(c => {
      const obj = c.toObject();
      const enrollment = c.enrollments.find(e => e.student.toString() === studentId);
      obj.myEnrollment = enrollment;
      obj.totalEnrollments = c.enrollments.length;
      delete obj.enrollments;
      return obj;
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
