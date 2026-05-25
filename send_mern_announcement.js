const mongoose = require('mongoose');
require('dotenv').config();

// Load models
const Course = require('./models/Course');
const Message = require('./models/Message');
const Admin = require('./models/Admin');
const Student = require('./models/Student');

async function run() {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';
  console.log('Connecting to database...');
  await mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000
  });
  console.log('Database connected!');

  try {
    // 1. Find all courses matching "mern"
    const courses = await Course.find({ 
      $or: [
        { title: /mern/i },
        { courseId: /mern/i },
        { description: /mern/i }
      ]
    });

    if (courses.length === 0) {
      console.log('No MERN stack courses found.');
      process.exit(0);
    }

    console.log(`Found ${courses.length} MERN courses:`, courses.map(c => c.title));

    // 2. Fetch or create a sender Admin
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin({
        name: 'Orca Admin',
        email: 'admin@orcadehub.com',
        password: 'default_admin_password_123',
        role: 'admin',
        permissions: ['user_management', 'course_management', 'system_settings', 'reports']
      });
      await admin.save();
      console.log('Created default Orca Admin.');
    }

    // 3. Prepare the announcement details
    const title = 'Congratulations on Enrolling in the MERN Stack Course!';
    const content = `Congratulations for enrolling in the course! We are absolutely thrilled to support you on your software engineering journey.

Please review the key details for the upcoming classes:

📅 SCHEDULE:
• Class Start Date: 1st June
• Timing: 7:00 PM to 8:00 PM IST daily
• Weekdays (Monday to Friday): Daily classes and interactive lectures
• Weekends (Saturday and Sunday): Structured assessments and practical projects to apply your knowledge

⚠️ MANDATORY ATTENDANCE:
• Attendance is strictly mandatory to be eligible to receive your certificate of completion.

🎓 TOTAL CERTIFICATIONS:
By successfully completing all modules, projects, and assessments in this course, you will earn a total of 5 valuable certifications:
1. Frontend Developer
2. Backend Developer
3. Database Operations related
4. Full Stack Web Developer
5. CI/CD using GitHub and AWS/Render

Make sure to mark your calendar and clear your schedule for 1st June at 7:00 PM. Let's work hard and build your path to becoming an expert Full Stack developer!

Best regards,
Orca Learning Team`;

    // 4. Send the message to all enrolled students across found MERN courses
    let totalMessagesSent = 0;
    const sentStudentIds = new Set();

    for (const course of courses) {
      const enrollments = course.enrollments || [];
      console.log(`Course "${course.title}" has ${enrollments.length} enrolled student(s).`);

      for (const enroll of enrollments) {
        const studentId = enroll.student.toString();
        
        // Avoid sending duplicate announcements to a student enrolled in multiple matching courses
        if (sentStudentIds.has(studentId)) continue;

        // Create and save message
        const message = new Message({
          sender: admin._id,
          recipient: enroll.student,
          tenant: course.tenant || admin.tenant,
          title,
          content,
          isRead: false
        });

        await message.save();
        sentStudentIds.add(studentId);
        totalMessagesSent++;
      }
    }

    console.log(`Successfully sent congratulatory messages to ${totalMessagesSent} students!`);

  } catch (error) {
    console.error('An error occurred during execution:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
}

run();
