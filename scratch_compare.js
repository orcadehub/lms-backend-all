const mongoose = require('mongoose');
require('dotenv').config();

const Student = require('./models/Student');
const Course = require('./models/Course');

async function run() {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';
  await mongoose.connect(mongoURI);

  try {
    const mernCourse = await Course.findOne({
      $or: [
        { title: /mern/i },
        { courseId: /mern/i }
      ]
    });

    if (!mernCourse) {
      console.log('No MERN course found.');
      return;
    }

    console.log(`MERN Course ID: ${mernCourse._id}`);
    console.log(`Course enrollments list has: ${mernCourse.enrollments.length} students.`);

    // Query students who have MERN in enrolledCourses
    const studentsByStudentModel = await Student.find({
      'enrolledCourses.course': mernCourse._id
    });
    console.log(`Student model enrolledCourses has: ${studentsByStudentModel.length} students.`);

    // Compare lists
    const courseEnrollmentIds = new Set(mernCourse.enrollments.map(e => e.student.toString()));
    const studentModelIds = new Set(studentsByStudentModel.map(s => s._id.toString()));

    const inCourseButNotStudent = [...courseEnrollmentIds].filter(id => !studentModelIds.has(id));
    const inStudentButNotCourse = [...studentModelIds].filter(id => !courseEnrollmentIds.has(id));

    console.log(`\nIn Course.enrollments but NOT in Student.enrolledCourses: ${inCourseButNotStudent.length}`);
    console.log(`In Student.enrolledCourses but NOT in Course.enrollments: ${inStudentButNotCourse.length}`);

    if (inStudentButNotCourse.length > 0) {
      console.log('\nExamples of In Student but NOT in Course:');
      const examples = await Student.find({ _id: { $in: inStudentButNotCourse.slice(0, 5) } });
      for (const s of examples) {
        console.log(`  - ${s.name} (${s.email})`);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
}

run();
